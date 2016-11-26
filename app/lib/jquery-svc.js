(function(w) {
	var k = function(obj) {
	if (obj instanceof k) return obj;
	if (!(this instanceof k)) return new k(obj);
		this._wrapped = obj;
	};
	if (typeof exports !== 'undefined') {
	if (typeof module !== 'undefined' && module.exports) {
		exports = module.exports = k;
	}
		exports.$svc = k;
	}
	else {
		w.$svc = k;
	}
	_.templateSettings = {evaluate:/\{\{(.+?)\}\}/g,interpolate: /\{\{=(.+?)\}\}/g, escape: /\{\{-(.+?)\}\}/g};


	var callService={}, callView={}, callPopup={}, bootStrap={};
	k.debug=true,
	k.bootstrap=function(n,l){
		n&&(bootStrap={name:n,lib:l})
	},
	k.init=function(f){
		$(document).ready(f)
	},
	k.get=function(n){
		return callService[n]();
	},
	k.bind=function(obj){
		return callService.bind(obj)
	},
	k.service=function(n,f){
		callService[n]&&error('duplicate service name: '+n),
		callService[n]=f
	},
	k.view=function(n,f){
		callView[n]&&error('duplicate view name: '+n),
		callView[n]=f
	},
	k.popup=function(n,f){
		callPopup[n]&&error('duplicate view name: '+n),
		callPopup[n]=f
	},
	k.browser = function() {
		var m=document.documentMode,a=navigator.userAgent,
		b=_.find({'Chrome/':'C','Safari/':'S','Firefox/':'F','OPR':'O','Opera':'O','Trident/':'I','MSIE':'I'},function(x,y){return a.indexOf(y)>-1})||'N',
		v=_.find({'Trident/4.0':8,'Trident/5.0':9,'Trident/6.0':10,'Trident/7.0':11},function(x,y){return a.indexOf(y)>-1})||7;
		return b=='I'?(m?['I',v,m]:['I',7,7]):[b,99,99];
	}();

	callService.bind=function(cfg){
		!_.isObject(cfg) && error('bind type error:: type is object'),
		!cfg.name && error('undefined view element name');
		var lc=_.clone(cfg), collee={}, eachTemp={}, eachData={};

		return {
			render:function(func){
				$vi(lc.name).length < 1 && error('not found view element: '+lc.name),
				$vi(lc.name).length > 1 && error('duplicate view element: '+lc.name),
				getTpl(lc.url).then(function(rsTpl){
					lc.url && rsTpl && $vi(lc.name).html(rsTpl);
					_.each($vi(lc.name, 'each'), function(v){
						_.each($(v).find('[data-bind-click]'), function(v1){
							$(v1).attr('data-bind-item', $(v).data('bindEach')+',{{=$index}}')
						}),
						_.each($(v).find('[data-bind-change]'), function(v1){
							$(v1).attr('data-bind-item', $(v).data('bindEach')+',{{=$index}}')
						});
						eachTemp[$(v).data('bindEach')] = _.template($(v).html());
						$(v).html('');
					}),
					_.each($vi(lc.name, 'visible'), function(v){
						$(v).hide()
					}),
					_.isFunction(func)&&func(),
					update()
				});
			},
			event:function(){
				return collee={}
			},
			pull:function(o){
				var vo={}, point='';
				function typeCheck(t){return (t=='radio'||t=='checkbox')&&true}
				return _.each($vi(lc.name, 'value'), function(v){
					return function(target, type){
						$log('1', target);
						obj(target, vo),
						Function('a', 'b', typeCheck(type) ? 
							'_.isEmpty(b.'+target+')&&(b.'+target+'=[]), $(a).is(":checked")&&b.'+target+'.push($(a).val())':
							'b.'+target+'=$(a).val()'
						)(v,vo),
						o && (
							typeCheck(type) ?
							$vi(lc.name).find('[data-bind-value="'+target+'"]:checked').length<=0 && !point && (point=target) :
							!$(v).val() && !point && (point=target)
						)
					}($(v).data('bindValue'), $(v).attr('type'))
				}), function(){
					var msg=Function('a', 'return a.'+point)(o);
					return o&&point ?
					(msg && $svc.get('popup').alert(msg).then(function(){
						$vi(lc.name).find('[data-bind-value="'+point+'"]')[0].focus()
					}), null) :
					vo
				}()
			},
			push:function(o){
				if(!_.isObject(o)) return;
				w.$index=0, w.$data={};
				_.each($vi(lc.name, 'text'), function(v){
					return function(target){
						obj(target, o),
						Function('a','b','!_.isEmpty(b.'+target+')&&$(a).text(b.'+target+')')(v,o)
					}($(v).data('bindText'))
				}),
				_.each($vi(lc.name, 'html'), function(v){
					return function(target){
						obj(target, o),
						Function('a','b','!_.isEmpty(b.'+target+')&&$(a).html(b.'+target+')')(v,o)
					}($(v).data('bindHtml'))
				}),
				_.each($vi(lc.name, 'each'), function(v){
					return function(target){
						var txt='', tmp=eachTemp[target],
						data=Function('a', 'return a.'+target)(o);
						obj(target, o),
						!_.isEmpty(data) && ((eachData[target]=data),
						_.each(data, function(v1,k1){
							w.$index=k1, w.$data=v1, txt+=tmp(v1)
						}),
						$(v).html(txt))
					}($(v).data('bindEach'))
				}),
				_.each($vi(lc.name, 'visible'), function(v){
					return function(target){
						var vo = function(){
							return target.indexOf('==')<0 ?
							(obj(target, o), Function('a', 'return _.isBoolean(a.'+target+')?a.'+target+':undefined')(o)) :
							(function(s){
								return obj(s[0],o),
								Function('a', 'b', 'return _.isObject(a.'+s[0]+')&&_.isEmpty(a.'+s[0]+')?undefined:a.'+s[0]+'==b')(o, s[1].replace(/'/g,''))
							})(target.split('=='))
						}();
						vo != undefined && (vo ? $(v).show() : $(v).hide())
					}($(v).data('bindVisible'))
				});

				delete w.$index, delete w.$data;
			}
		};
		function getTpl(url){
			return url ? callService.ajax().html(url, false, false) : function(d){return d.resolve(null), d.promise()}($.Deferred())
		}
		function update(){
			$vi(lc.name, 'click').off('click').on('click', function(e){
				return execute({n:lc.name, t:$(e.currentTarget).data('bindClick'), v:$(e.currentTarget).data('bindItem')}),
				!$(e.currentTarget).data('bindClick')
			}),
			$vi(lc.name, 'change').off('change').on('change', function(e){
				return execute({n:lc.name, t:$(e.currentTarget).data('bindChange'), v:$(e.currentTarget).data('bindItem')}),
				!$(e.currentTarget).data('bindChange')
			});
			function execute(e) {
				var d=e.v && e.v.split(',');
				return Function('$c', '$d', '$c.'+e.t.replace('(','.call('+(e.v ? '$d' : '$c') + (e.t.indexOf('()')<0 ? ',' : '')) + ';')
				(collee, d && eachData[d[0]][d[1]])
			}
		}
		function $vi(n,t){return t?$('[data-bind-view='+n+'] [data-bind-'+t+']'):$('[data-bind-view='+n+']')}
		function obj(t,v){
			var a=v;
			_.each(t.split('.'), function(b){
				return b.indexOf('[')<0 ?
				(a[b]==undefined&&(a[b]={}), a=a[b]) :
				_.each(b.replace(/\']/g,'').split('[\''), function(c){
					(a[c]==undefined&&(a[c]={}), a=a[c])
				})
			})
		}
	};
	callService.ajax=function(){
		return {
			html:function(url,sync,cache){
				return function(d){
					return url ? 
						$.ajax({
							async:!sync,
							type: cache?'get':'post',
							contentType:'text/html',
							url:uri(url,cache),
							success:d.resolve,
							error:function(){d.resolve(null)}
						}) :
						d.resolve(null),
					d.promise()
				}($.Deferred())
			}
		}
		function uri(p,c){return(c=!c?'?v='+_.now():''), p+c}
		function serialize(data){return _.map(data,function(v,k){return [k,'=',v].join('');}).join('&')}
	};
	callService.view=function(){
		return {
			load:function(obj){
				_.isFunction(callView[obj.name]) && callView[obj.name](obj.param);
			},
			remove:function(){
			}
		}
	};
	callService.popup=function(){
		var dm=callService.dimmed(), o={}, d=$.Deferred();
		return {
			open:create,
			alert:function(msg){
				return create({name:'lpAlert', param:{message:msg}}, 'alert')
			},
			confirm:function(msg){
				return create({name:'lpConfirm', param:{message:msg}}, 'confirm')
			}
		}
		function create(c,k){
			return o=c,
			$('[data-bind-view='+o.name+']').length>0 && error('duplicate popup element: '+o.name),
			$('#__flying_partition__').append('<div data-bind-view="'+o.name+'">'+makeHtml(k)+'</div>'),
			dm.volume(),
			callPopup[o.name](o.param, close),
			d.promise()
		}
		function makeHtml(k){
			return {
				alert:
					'<div class="alert alert-warning" style="position:absolute;top:10%;left:10%;width:80%;">'+
					'<div data-bind-html="message"></div>'+
					'<div style="margin-top:20px;text-align:center;">'+
					'<button class="btn btn-default btn-sm" data-bind-click="ok()">확인</button>'+
					'</div>'+
					'</div>',
				confirm:
					'<div class="alert alert-warning" style="position:absolute;top:10%;left:10%;width:80%;">'+
					'<div data-bind-html="message"></div>'+
					'<div style="margin-top:20px;text-align:center;">'+
					'<button class="btn btn-primary btn-sm" data-bind-click="yes()">확인</button><i style="margin-left:10px;"></i>'+
					'<button class="btn btn-default btn-sm" data-bind-click="no()">취소</button>'+
					'</div>'+
					'</div>'
			}[k]||''
		}
		function close(p){
			$('#__flying_partition__ [data-bind-view="'+o.name+'"]').remove(), dm.volume(), d.resolve(p)
		}
	};
	callService.dimmed=function(){
		var cnt=0;
		$('#__flying_partition__').length<1 && $('body').append('<div id="__flying_partition__"></div>');
		return {
			on:function(){
				cnt++ < 1 && 
				setTimeout(function(){
					progress(true), volume()
				},1)
			},
			off:function(){
				--cnt < 1 && 
				setTimeout(function(){
					cnt=0, progress(false), volume()
				},1)
			},
			clear:function(){
				setTimeout(function(){
					cnt=0, progress(false), volume()
				},1)
			},
			volume:volume
		}
		function volume(){
			$('#__flying_partition__ [data-party-dimmed]').remove();
			$('#__flying_partition__ >div:last').before('<div data-party-dimmed style="position:fixed;top:0;left:0;width:100%;height:100%;background-color:#333;opacity:.5;"></div>');
		}
		function progress(is){
			$('#__flying_partition__ [data-party-message]').remove();
			return is && (
				$('#__flying_partition__').append(
					'<div data-party-message style="position:absolute;top:30%;font-size:2em;color:#fff;">'+
					'<div class="_w8_">'+
					'<div class="b b1" id="wBall_1"><div class="i"></div></div>'+
					'<div class="b b2" id="wBall_2"><div class="i"></div></div>'+
					'<div class="b b3" id="wBall_3"><div class="i"></div></div>'+
					'<div class="b b4" id="wBall_4"><div class="i"></div></div>'+
					'<div class="b b5" id="wBall_5"><div class="i"></div></div>'+
					'</div>'+
					'</div>'
				),
				$('#__flying_partition__ [data-party-message]').css('left', (
					$(w).width() - $('#__flying_partition__ [data-party-message]').width()
				)/2)
			)
		}
	};


	w.$log=function() {
		k.debug && ('I'==k.browser[0] ? console.log(JSON.stringify(_.toArray(arguments))) : console.log.apply(console, _.toArray(arguments)))
	};
	function error(msg) {throw new Error(msg)}

	$(document).ready(function(){
		_.each($('[data-bind-include]'), function(v){
			callService.ajax().html($(v).data('bindInclude'), true, false).then(function(rs){$(v).html(rs)})
		}),
		_.each(bootStrap.lib, function(v){
			var h=document.getElementsByTagName('head')[0],e=document.createElement('script');
			e.setAttribute('src',v), h.appendChild(e)
		}),
		$svc.get('view').load({name:bootStrap.name, param:Function('return '+$('[data-bind-param]').data('bindParam'))()}),
		$('[data-bind-param]').remove()
	});

	$svc.popup('lpAlert', function(param, $close){
		var vo=$svc.bind({name:'lpAlert'})
		on=vo.event();
		vo.render(function(){vo.push(param)}),
		on.ok=function(){$close()}
	}),
	$svc.popup('lpConfirm', function(param, $close){
		var vo=$svc.bind({name:'lpConfirm'})
		on=vo.event();
		vo.render(function(){vo.push(param)}),
		on.yes=function(){$close(true)},
		on.no=function(){$close(false)}
	});
})(window);

(function() {
})();

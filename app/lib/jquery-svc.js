(function(w) {
	var k = function(obj) {
	if (obj instanceof k) return obj;
	if (!(this instanceof k)) return new k(obj);
		this._svc = obj;
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
	// 에러
	function error(msg) {throw new Error(msg)}
	function arrange(){
		$('#__flying_partition__ [data-party-dimmed]').remove();
		$('#__flying_partition__ >div:last').before('<div data-party-dimmed style="position:fixed;top:0;left:0;width:100%;height:100%;background-color:#333;opacity:.5;"></div>');
	}
	// 셀렉터반환
	function $vi(attr,name,bind){
		return bind ? $('[data-'+attr+'-view='+name+'] [data-'+attr+'-'+bind+']'):$('[data-'+attr+'-view='+name+']')
	}
	function getTpl(url){
		return url ? callService.http().html(url) : function(d){return d.resolve(null), d.promise()}($.Deferred())
	}
	function core(type,cfg){
		!_.isObject(cfg) && error('bind type error:: type is object'),
		!cfg.name && error('undefined view element name:: '+type);
		var lc=_.clone(cfg), collee={}, eachTemp={}, eachData={};

		return {
			render:function(func){
				$vi(type, lc.name).length < 1 && error('not found view element:: '+type+':: '+lc.name),
				$vi(type, lc.name).length > 1 && error('duplicate view element:: '+type+':: '+lc.name),
				getTpl(lc.url).then(function(rsTpl){
					lc.url && rsTpl && $vi(type, lc.name).html(rsTpl),
					lc.plugin && $vi(type, lc.name).html(lc.plugin),
					$vi(type, lc.name).show(),

					_.each($vi(type, lc.name, 'each'), function(v){
						_.each($(v).find('[data-'+type+'-click]'), function(v1){
							$(v1).attr('data-'+type+'-item', $(v).data(type+'Each')+',{{=$index}}')
						});
						_.each($(v).find('[data-'+type+'-change]'), function(v1){
							$(v1).attr('data-'+type+'-item', $(v).data(type+'Each')+',{{=$index}}')
						});
						_.each($(v).find('[data-'+type+'-each]'), function(v1){
							$(v1).html('{{_.each('+$(v1).data(type+'Each')+',function($v,$k){}}'+$(v1).html()+'{{})}}');
						});
						eachTemp[$(v).data(type+'Each')] = _.template($(v).html());
						$(v).html('');
					}),
					_.each($vi(type, lc.name, 'visible'), function(v){
						$(v).hide()
					}),
					_.isFunction(func)&&func(),
					update()
				});
			},
			pull:function(o){
				var vo={}, point='';
				function typeCheck(t){return (t=='radio'||t=='checkbox')&&true}
				return _.each($vi(type, lc.name, 'value'), function(v){
					return function(target, type){
						obj(target, vo);
						Function('a', 'b', typeCheck(type) ? 
							'_.isEmpty(b.'+target+')&&(b.'+target+'=[]), $(a).is(":checked")&&b.'+target+'.push($(a).val())':
							'b.'+target+'=$(a).val()'
						)(v,vo)
					}($(v).data(type+'Value'), $(v).attr('type'))
				}), vo
			},
			push:function(o){
				if(!_.isObject(o)) return;
				var o=_.clone(o);
				w.$index=0, w.$data={};
				_.each($vi(type, lc.name, 'each'), function(v){
					return function(target){
						obj(target, o);
						var txt='', tmp=eachTemp[target],
						data=Function('a', 'return a.'+target)(o);
						!_.isEmpty(data) && ((eachData[target]=data),
						_.each(data, function(v1,k1){
							w.$index=k1,
							w.$data=v1,
							txt+=tmp(v1);
						}),
						$(v).html(txt))
					}($(v).data(type+'Each'))
				}),
				_.each($vi(type, lc.name, 'text'), function(v){
					return function(target){
						obj(target, o),
						Function('a','b','!_.isEmpty(b.'+target+')&&$(a).text(b.'+target+')')(v,o)
					}($(v).data(type+'Text'))
				}),
				_.each($vi(type, lc.name, 'html'), function(v){
					return function(target){
						obj(target, o),
						Function('a','b','!_.isEmpty(b.'+target+')&&$(a).html(b.'+target+')')(v,o)
					}($(v).data(type+'Html'))
				}),
				_.each($vi(type, lc.name, 'value'), function(v){
					return function(target){
						obj(target, o),
						Function('a','b','!_.isEmpty(b.'+target+')&&$(a).val(b.'+target+')')(v,o)
					}($(v).data(type+'Value'))
				}),
				_.each($vi(type, lc.name, 'attr'), function(v){
					return function(target){
						obj(target, o),
						Function('a','b','!_.isEmpty(b.'+target+')&&$(a).attr(b.'+target+')')(v,o)
					}($(v).data(type+'Attr'))
				}),
				_.each($vi(type, lc.name, 'class'), function(v){
					return function(target){
						_.each(target.split(','), function(v1){
							var t=v1.split(':');
							t=t[1].replace(/'/g,'').split('==').concat(t[0]),
							obj(t[0], o),
							Function('a','b','c','!_.isEmpty(b.'+t[0]+')&& b.'+t[0]+'==c[1] ? $(a).addClass(c[2]) : $(a).removeClass(c[2])')(v,o,t)
						});
					}($(v).data(type+'Class'))
				}),
				_.each($vi(type, lc.name, 'visible'), function(v){
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
					}($(v).data(type+'Visible'))
				});
				delete w.$index, delete w.$data, update();
			},
			event:function(){
				return collee={}
			},
			focus:function(name){
				$vi(type, lc.name).find('[data-'+type+'-focus='+name+']')[0].focus()
			}
		};
		function update(){
			$vi(type, lc.name, 'click').off('click').on('click', function(e){
				return execute({n:lc.name, t:$(e.currentTarget).data(type+'Click'), v:$(e.currentTarget).data(type+'Item'), e:e}),
				!$(e.currentTarget).data(type+'Click')
			}),
			$vi(type, lc.name, 'change').off('change').on('change', function(e){
				return execute({n:lc.name, t:$(e.currentTarget).data(type+'Change'), v:$(e.currentTarget).data(type+'Item'), e:e}),
				!$(e.currentTarget).data(type+'Change')
			});
			function execute(e) {
				var d=e.v && e.v.split(',');
				return Function('a', 'b', 'c', 'a.'+e.t.replace('(','.call('+(e.v ? 'b' : 'a') + (e.t.indexOf('()')<0 ? ',' : '')).replace(')',',c)'))
				(collee, d && eachData[d[0]][d[1]], e.e)
			}
		}
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

	var callService={}, callView={}, callPlug={}, callPopup={}, bootStrap={}, dimCnt=0/* 딤드카운트 */;
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
		return core(obj.plugin ? 'plugin' : 'bind', obj)
	},
	k.service=function(n,f){
		callService[n]&&error('duplicate service name: '+n),
		callService[n]=f
	},
	k.view=function(n,f){
		callView[n]&&error('duplicate view name: '+n),
		callView[n]=f
	},
	k.plugin=function(n,f){
		callPlug[n]&&error('duplicate plugin name: '+n),
		callPlug[n]=f
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
							success:function(data){
								d.resolve(data)
							},
							error:function(){d.resolve()}
						}) :
						d.resolve(),
					d.promise()
				}($.Deferred())
			},
			get:function(url,pm,sync,cache){
				return function(d){
					return url ? 
						$.ajax({
							async:!sync,
							type: 'get',
							contentType:'application/json',
							url:uri(url,cache),
							data:serialize(pm),
							success:function(data){
								d.resolve({data:data||{},status:200})
							},
							error:function(r){
								d.resolve({status:r.status==200?500:r.status,data:r.responseText})
							}
						}) :
						d.resolve(),
					d.promise()
				}($.Deferred())
			},
			post:function(url,pm,sync){
				return function(d){
					return url ? 
						$.ajax({
							async:!sync,
							type: 'post',
							contentType:'application/json',
							url:uri(url,cache),
							data:JSON.stringify(pm),
							success:function(data){
								d.resolve({data:data||{},status:200})
							},
							error:function(r){
								d.resolve({status:r.status==200?500:r.status,data:r.responseText})
							}
						}) :
						d.resolve(),
					d.promise()
				}($.Deferred())
			},
			form:function(url,pm,sync){
				return function(d){
					return url ? 
						$.ajax({
							async:!sync,
							type: 'post',
							contentType:'application/x-www-form-urlencoded;charset=utf-8',
							url:uri(url,cache),
							data:serialize(pm),
							success:function(data){
								d.resolve({data:data||{},status:200})
							},
							error:function(r){
								d.resolve({status:r.status==200?500:r.status})
							}
						}) :
						d.resolve(),
					d.promise()
				}($.Deferred())
			}
		}
		function uri(p,c){return(c=!c?'?v='+_.now():''), p+c}
		function serialize(data){return _.map(data,function(v,k){return [k,'=',v].join('');}).join('&')}
	};

	callService.http=function(){
		$('#__flying_partition__').length<1 && $('body').append('<div id="__flying_partition__"></div>');
		return {
			html:function(url){
				on();
				return callService.ajax().html(url,false,false).then(function(r){off();return r||''});
			},
			get:function(url,param,loading){
				return function(d){
					on(loading);
					callService.ajax().get(url,param).then(function(rs){
						off(loading);
						if(rs.status!=200){
							d.reject();
							return;
						}
						d.resolve(rs.data);
					});
					return d.promise();
				}($.Deferred())
			},
			post:function(url,param,loading){
				return function(d){
					callService.ajax().get(url,param).then(function(rs){
						off(loading);
						if(rs.status!=200){
							d.reject();
							return;
						}
						d.resolve(rs.data);
					})
				}($.Deferred())
				on(loading);
			}
		}
		function on(chain){
			setTimeout(function(){
				dimCnt++ < 1 && spinner(true), arrange(),
				chain&&chain=='on'&&dimCnt++
			},1)
		}
		function off(chain){
			setTimeout(function(){
				chain&&chain=='off'&&--dimCnt,
				--dimCnt < 1 && (dimCnt=0, spinner(), arrange())
			},1)
		}
		function spinner(is){
			$('#__flying_partition__ [data-party-message]').remove();
			return is && (
				$('#__flying_partition__').append(
					'<div data-party-message style="position:absolute;top:30%;font-size:2em;color:#fff;">'+
					'<div class="spinner"></div>'+
					'</div>'
				),
				$('#__flying_partition__ [data-party-message]').css('left', (
					$(w).width() - $('#__flying_partition__ [data-party-message]').width()
				)/2)
			)
		}
	};
	callService.view=function(){
		var d=$.Deferred();
		return {
			load:function(obj){
				return !callView[obj.name] && error('undefined view name: '+obj.name),
				!obj.append && $('[data-bind-view]').hide(),
				_.isFunction(callView[obj.name]) &&
				callView[obj.name](obj.param, function(p){ // close
					$vi('bind', obj.name).html(''),
					p&&$vi('bind', p).show(),
					d.resolve()
				}),
				d.promise()
			}
		}
	};
	callService.plugin=function(){
		return {
			load:function(obj, fn){
				return !callPlug[obj.name] && error('undefined plug name: '+obj.name),
					_.isFunction(callPlug[obj.name]) &&
					callPlug[obj.name](obj.param, fn)
			}
		}
	};
	callService.popup=function(){
		$('#__flying_partition__').length<1 && $('body').append('<div id="__flying_partition__"></div>');
		var o={}, d=$.Deferred();
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
			$vi('bind', o.name).length>0 && error('duplicate popup element: '+o.name),
			$('#__flying_partition__').append('<div data-bind-view="'+o.name+'">'+makeHtml(k)+'</div>'),
			arrange(),
			callPopup[o.name](o.param, function(p){	// close
				$('#__flying_partition__ [data-bind-view="'+o.name+'"]').remove(),
				arrange(),
				d.resolve(p)
			}),
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
	};


	w.$log=function() {
		k.debug && ('I'==k.browser[0] ? console.log(JSON.stringify(_.toArray(arguments))) : console.log.apply(console, _.toArray(arguments)))
	};
	$(document).ready(function(){
		var sync=0;
		$('body').hide();
		_.each(bootStrap.lib, function(v){
			var h=document.getElementsByTagName('head')[0],e=document.createElement('script');
			e.setAttribute('src',v), h.appendChild(e)
		});
		$svc.get('view').load({name:bootStrap.name, param:Function('return '+$('[data-bind-param]').data('bindParam'))()});
		$('[data-bind-param]').remove();
		$('body').show();
		setTimeout(function(){_.each(['bootstrap','service','view','popup'],function(v){delete k[v]})}, 200);
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

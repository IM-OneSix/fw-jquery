(function(root) {
	var k$ = function(obj) {
		if (obj instanceof k$) return obj;
		if (!(this instanceof k$)) return new k$(obj);
		this._wrapped = obj;
	};
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = k$;
		}
		exports.k$ = k$;
	}
	else {
		root.k$ = k$;
	}

	_.templateSettings = {evaluate:/\{\{(.+?)\}\}/g,interpolate: /\{\{=(.+?)\}\}/g, escape: /\{\{-(.+?)\}\}/g};//, variable:'$data'
	var controller={}, service={};
	k$.debug=true,
	k$.browser = function() {
		var m=document.documentMode,a=navigator.userAgent,
		b=_.find({'Chrome/':'C','Safari/':'S','Firefox/':'F','OPR':'O','Opera':'O','Trident/':'I','MSIE':'I'},function(x,y){return a.indexOf(y)>-1})||'N',
		v=_.find({'Trident/4.0':8,'Trident/5.0':9,'Trident/6.0':10,'Trident/7.0':11},function(x,y){return a.indexOf(y)>-1})||7;
		return b=='I'?(m?['I',v,m]:['I',7,7]):[b,99,99];
	}();
	k$.main = function(func){
		$(document).ready(function() {
			_.each(['main','controller', 'service'],function(v){delete k$[v]});
			addController('main', func);
			loadController('main');
		});
	},
	k$.controller = addController,
	k$.service = function(name, func) {
		if(service[name]) {
			error('duplicated service name: ', name);return;
		}
		service[name]=func;
	};
	function addController(name, func) {
		controller[name] && error('duplicated controller name: '+name);
		controller[name] = {
			collee: func,
			$vo: {},
			$if: {},
			$each: {}
		};
	}
	function loadController(name) {
		$('[data-bind-view='+name+']').length < 1 && (delete controller[name],error('bind-view: not found name: '+name));
		$('[data-bind-view='+name+']').length > 1 && (delete controller[name],error('bind-view: duplicated name: '+name));

		var $c=controller[name];
		var collee=$c['collee'],$vo=$c['$vo'],$each=$c['$each'];

		// 템플릿 저장
		// if

		// each
		_.each($('[data-bind-view='+name+'] [data-bind-each]'), function(v,k) {
			var h=$(v).html();
			_.each($(v).find('[data-bind-click]'), function(a){
				$(a).attr('data-bind-item', $(v).data('bindEach')+',{{=$index}}');
			}),
			_.each($(v).find('[data-bind-change]'), function(a){
				$(a).attr('data-bind-item', $(v).data('bindEach')+',{{=$index}}');
			});
			$each[$(v).data('bindEach')]=_.template($(v).html());
		});
		collee($vo, svc(name)), wacth(name);
	}
	function wacth(name) {
		var $c=controller[name];

		// visible
		_.each($('[data-bind-view='+name+'] [data-bind-visible]'), function(v,k) {
			(function(a){
				if(a=='true') return $(v).show();
				var sh=eval('$c.$vo.'+a);
				(sh==true||sh=='true') ? $(v).show():$(v).hide();
			})($(v).data('bindVisible'))
		});
		// class
		_.each($('[data-bind-view='+name+'] [data-bind-class]'), function(v,k) {
			(function(a){
				_.each(a.replace(/vl/g,'$c.$vo.vl').split(','), function(v1){
					var t=v1.split(':');
					eval(t[1])?$(v).addClass(t[0]):$(v).removeClass(t[0]);
				});
			})($(v).data('bindClass'))
		});


		// attribute
		_.each($('[data-bind-view='+name+'] [data-bind-attr]'), function(v) {
			(function(a){
				_.each(atVo({n:name,t:a}),function(t,a) {
					$(v).attr(a,t)
				})
			})($(v).data('bindAttr'))
		});
		// text
		_.each($('[data-bind-view='+name+'] [data-bind-text]'), function(v) {
			(function(target){
				_.isUndefined(atVo({n:name,t:target})) ?  error('bind-text: undefined: '+target) : $(v).text(atVo({n:name,t:target}));
			})($(v).data('bindText'))
		});
		// html
		_.each($('[data-bind-view='+name+'] [data-bind-html]'), function(v) {
			(function(target){
				_.isUndefined(atVo({n:name,t:target})) ?  error('bind-html: undefined: '+target) : $(v).html(atVo({n:name,t:target}));
			})($(v).data('bindHtml'))
		});
		// each
		_.each($('[data-bind-view='+name+'] [data-bind-each]'), function(v) {
			root.$index=0,root.$data={};
			(function(a){
				var tx='',
				tp=controller[name]['$each'][a],
				dt=atVo({n:name,t:a});

				_.each(dt, function(d,i){
					root.$index=i,
					root.$data=d,
					tx+=tp(d);
				}),

				$(v).html(tx);
			})($(v).data('bindEach'))
			delete root.$index, delete root.$data;
		});

		// 이벤트 바인딩
		$('[data-bind-view='+name+'] [data-bind-click]').off('click').on('click', function(e){
			exec({n:name,t:$(e.currentTarget).data('bindClick'),v:$(e.currentTarget).data('bindItem')}), wacth(name);
			return !$(e.currentTarget).data('bindClick');
		});
		$('[data-bind-view='+name+'] [data-bind-change]').off('change').on('change', function(e){
			exec({n:name,t:$(e.currentTarget).data('bindChange'),v:$(e.currentTarget).data('bindItem')}), wacth(name);
			return !$(e.currentTarget).data('bindChange');
		});
		function exec(o) {
			var data= o.v && atVo({n:o.n,t:o.v.split(',')[0]})[o.v.split(',')[1]];
			return Function('$vo','$data', '$vo.'+o.t.replace('(','.call(' + (o.v?'$data':'$vo') + (o.t.indexOf('()')<0?',':''))+';')
			(controller[o.n]['$vo'],data);
		}
	}
	function svc(ct) {
		var c=ct;
		return {
			get: function(name) {return service[name](svc(),c)}
		}
	}

	// 서비스 구현
	// ==================================================
	// k$.loadView 화면 출력 후 컨트롤러 로드
	// k$.closeView 화면 히든 또는 삭제 후 컨트롤러 삭제
	// k$.moveView 호출한 컨트롤러 히든 또는 삭제, 화면 출력 후 컨트롤러 로드
	service.log=function($svc){
		return {
			group:function(b){'I'!=k$.browser[0] && b && console.group(b)},
			groupEnd:function(){'I'!=k$.browser[0] && console.groupEnd()}
		}
	};
	service.form=function($svc,name){
		return {
			pull:function(){
				if(!controller[name]) error('undefined controller: '+name);
	
				_.each($('[data-bind-view='+name+'] [data-bind-value]'), function(v) {
					(function(target,type){
						// edit box
						if(type=='text') _.isUndefined(atVo({n:name,t:target})) ? error('bind-value: undefined: '+target) : atVo({n:name,t:target,v:$(v).val()});
					})($(v).data('bindValue'), $(v).attr('type'));
				});
			},
			push:function(){
				if(!controller[name]) error('undefined controller: '+name);

				_.each($('[data-bind-view='+name+'] [data-bind-value]'), function(v) {
					(function(target,type){
						// edit box
						if(type=='text') _.isUndefined(atVo({n:name,t:target})) ? error('bind-value: undefined: '+target) : $(v).val(atVo({n:name,t:target}));
						else if(type=='radio'){
						}
					})($(v).data('bindValue'), $(v).attr('type'))
				});
			},
			focus:function(target){
			}
		}
	};

	function error(msg) {throw new Error(msg)}
	function atVo(o) {
		return Function('$vo','a', o.v ? '$vo.'+o.t+'=a;' : 'return $vo.'+o.t+';')(controller[o.n]['$vo'],o.v);
	}

	// window
	root.$log=function() {
		k$.debug && ('I'==k$.browser[0]?console.log(JSON.stringify(_.toArray(arguments))):console.log.apply(root, _.toArray(arguments)));
	};
})(window);

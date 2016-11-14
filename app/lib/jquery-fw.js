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
			error('서비스 중복: ', name);return;
		}
		service[name]=func;
	};
	function addController(name, func) {
		controller[name] && error('컨트롤러 중복 선언: '+name);
		controller[name] = {
			$bind: func,
			$vo: {},
			$if: {},
			$each: {}
		};
	}
	function loadController(name) {
		$('[data-bind-view='+name+']').length < 1 && (delete controller[name],error('뷰 엘리먼트 미존재: '+name));
		$('[data-bind-view='+name+']').length > 1 && (delete controller[name],error('뷰 엘리먼트 중복: '+name));

		// element-if, each
		// data-bind-link: 바인딩 참조된 객체 이름
		// _.each($('[data-bind-view='+n+'] [data-bind-if]'), function(v,k) {
		// 	_controller[n]['bindIf'][k]=$(v).html(), $(v).html('');
		// });

		var $c=controller[name];
		var $bind=$c['$bind'],$vo=$c['$vo'],$each=$c['$each'];

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
		$bind($vo, svc()), wacth(name);
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
		// each
		_.each($('[data-bind-view='+name+'] [data-bind-each]'), function(v) {
			root.$index=0,root.$data={};
			(function(a){
				var tx='',
				tp=eval('$c.$each[\''+a+'\']'),
				dt=eval('$c.$vo.'+a);

				_.each(dt, function(d,i){
					root.$index=i,
					root.$data=d,
					tx+=tp(d);
				}),
				$(v).html(tx);
			})($(v).data('bindEach'))
			delete root.$index, delete root.$data;
		});
		// attribute
		_.each($('[data-bind-view='+name+'] [data-bind-attr]'), function(v) {
			(function(a){
				_.each(eval('$c.$vo.'+a),function(t,a) {
					$(v).attr(a,t)
				})
			})($(v).data('bindAttr'))
		});
		// text
		_.each($('[data-bind-view='+name+'] [data-bind-text]'), function(v) {
			(function(a){
				$(v).text(eval('$c.$vo.'+a))
			})($(v).data('bindText'))
		});
		// html
		_.each($('[data-bind-view='+name+'] [data-bind-html]'), function(v) {
			(function(a){
				$(v).html(eval('$c.$vo.'+a))
			})($(v).data('bindHtml'))
		});

		// 이벤트 바인딩
		$('[data-bind-view='+name+'] [data-bind-click]').off('click').on('click', function(e){
			return execute(name, $(e.currentTarget).data('bindClick'), $(e.currentTarget).data('bindItem'));
		});
		$('[data-bind-view='+name+'] [data-bind-change]').off('change').on('change', function(e){
			return execute(name, $(e.currentTarget).data('bindChange'), $(e.currentTarget).data('bindItem'));
		});
		function execute(name,target,item) {
			if(!target)return!0;

			var $c=controller[name], func='', arg='';
			var e=$vo=$c['$vo'];

			// 함수부, 파라메터부 파싱
			(function(s){
				s.length<2 ? null : (func=s[0].split('.'), arg=s[1].split(')')[0].replace(/'/g,'').split(','))
			})(target.split('('));

			// 함수 선언여부 체크
			_.each(func,function(v){e[v]&&(e=e[v])});
			!_.isFunction(e) && error('undefined function: $vo.'+func.join('.'));

			// 함수 호출시 넘겨줄 데이타 파싱
			var i = item&&item.split(',');
			_.isArray(i) && ($vo=eval('$c.$vo.'+i[0])[i[1]]);

			e.apply($vo,arg),wacth(name);
			return!1;
		}
	}
	function svc() {
		return {
			get: function(name) {return service[name](svc())}
		}
	}

	// 서비스 구현
	// ==================================================
	// k$.loadView 화면 출력 후 컨트롤러 로드
	// k$.closeView 화면 히든 또는 삭제 후 컨트롤러 삭제
	// k$.moveView 호출한 컨트롤러 히든 또는 삭제, 화면 출력 후 컨트롤러 로드
	service.log=function(){
		return {
			group:function(b){'I'!=k$.browser[0] && b && console.group(b)},
			groupEnd:function(){'I'!=k$.browser[0] && console.groupEnd()}
		}
	};
	service.form=function(){
		return {
			pull:function(name){
				name = name||'main';
				if(!controller[name]) error('undefined controller: '+name);

				var $c=controller[name];
				_.each($('[data-bind-view='+name+'] [data-bind-value]'), function(v) {
					(function(a,b){
						var gt=Function('a','return $vo.'+a+';')(a);
						var st=Function('v','$vo.'+a+'=v;')();
						var $vo=$c['$vo'];
						var vl2= Function('a','$log($vo.'+a+');');
						var v13=Function('a','return $vo.'+a+';')(a);
						// v12.call(this,a);
						$log(a,b,gt,vl2,v13);
						vl2.call(this,a);
						// edit box
						if(b=='text') {
							!_.isUndefined(Function('a','return $vo.'+a+';')(a))&&Function('v','$vo.'+a+'=v;')($(v).val());
							// $log(vl, $vo);
							// eval('$vo.'+a+'="'+vl+'"');
						}
					})($(v).data('bindValue'), $(v).attr('type'))
				});
			},
			push:function(name){
				name = name||'main';
				var $c=controller[name] && controller[name];
				$log(name, $vo);
				_.each($('[data-bind-view='+name+'] [data-bind-value]'), function(v) {
					(function(a,b){
						var vl=eval('$vo.'+a);
						// edit box
						if(b=='text') {
							vl&&$(v).val(vl);
						}
						else if(b=='radio'){
						}
					})($(v).data('bindValue'), $(v).attr('type'))
				});
			}
		}
	};

	root.$log=function() {
		k$.debug && ('I'==k$.browser[0]?console.log(JSON.stringify(_.toArray(arguments))):console.log.apply(root, _.toArray(arguments)));
	};
	function error(msg) {throw new Error(msg)}
})(window);


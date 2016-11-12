(function(root) {
	var j$ = function(obj) {
		if (obj instanceof j$) return obj;
		if (!(this instanceof j$)) return new j$(obj);
		this._wrapped = obj;
	};
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = j$;
		}
		exports.j$ = j$;
	}
	else {
		root.j$ = j$;
	}

	_.templateSettings = {evaluate:/\{\{(.+?)\}\}/g,interpolate: /\{\{=(.+?)\}\}/g, escape: /\{\{-(.+?)\}\}/g};//, variable:'$data'
	var controller={}, service={};
	j$.debug=true,
	j$.browser = function() {
		var m=document.documentMode,a=navigator.userAgent,
		b=_.find({'Chrome/':'C','Safari/':'S','Firefox/':'F','OPR':'O','Opera':'O','Trident/':'I','MSIE':'I'},function(x,y){return a.indexOf(y)>-1})||'N',
		v=_.find({'Trident/4.0':8,'Trident/5.0':9,'Trident/6.0':10,'Trident/7.0':11},function(x,y){return a.indexOf(y)>-1})||7;
		return b=='I'?(m?['I',v,m]:['I',7,7]):[b,99,99];
	}();
	j$.main = function(func){
		$(document).ready(function() {
			_.each(['main','controller', 'service'],function(v){delete j$[v]});
			addController('main', func);
			loadController('main');
		});
	};
	j$.controller = addController;
	j$.service = function(name, func) {
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

		_.each($('[data-bind-view='+name+'] [data-bind-each]'), function(v,k) {
			var h=$(v).html();
			_.each($(v).find('[data-bind-click]'), function(a){
				$(a).attr('data-bind-item', $(v).data('bindEach')+',{{=$index}}');
			});
			_.each($(v).find('[data-bind-change]'), function(a){
				$(a).attr('data-bind-item', $(v).data('bindEach')+',{{=$index}}');
			});
			$each[$(v).data('bindEach')]=_.template($(v).html());
		});
		$bind($vo, svc()), wacth(name);
	}
	function wacth(name) {
		var $c=controller[name];

// attr
// class
		_.each($('[data-bind-view='+name+'] [data-bind-text]'), function(v) {
			(function(a){
				$(v).text(eval('$c.$vo.'+a))
			})($(v).data('bindText'))
		});
		_.each($('[data-bind-view='+name+'] [data-bind-html]'), function(v) {
			(function(a){
				$(v).html(eval('$c.$vo.'+a))
			})($(v).data('bindHtml'))
		});
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
		_.each($('[data-bind-view='+name+'] [data-bind-visible]'), function(v,k) {
			(function(a){
				if(a=='true') return $(v).show();
				var vl=(eval('$c.$vo.'+a)+'')!='false';
				a.indexOf('==')>0 && (vl=eval('$c.$vo.'+a.split('==')[0])==a.split('==')[1].replace(/'/g,''));
				vl ? $(v).show():$(v).hide();
			})($(v).data('bindVisible'))
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
				s.length<2 ? null : (func=s[0].split('.'), arg=s[1].split(')')[0].split(','))
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
	// j$.loadView 화면 출력 후 컨트롤러 로드
	// j$.closeView 화면 히든 또는 삭제 후 컨트롤러 삭제
	// j$.moveView 호출한 컨트롤러 히든 또는 삭제, 화면 출력 후 컨트롤러 로드
	service.log=function(){
		return {
			group:function(b){'I'!=j$.browser[0] && b && console.group(b)},
			groupEnd:function(){'I'!=j$.browser[0] && console.groupEnd()}
		}
	};

	root.$log=function() {
		j$.debug && ('I'==j$.browser[0]?console.log(JSON.stringify(_.toArray(arguments))):console.log.apply(root, _.toArray(arguments)));
	};
	function error(msg) {throw new Error(msg)}
})(window);


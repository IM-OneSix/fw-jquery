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

	_.templateSettings = {evaluate:/\{\{(.+?)\}\}/g,interpolate: /\{\{=(.+?)\}\}/g, escape: /\{\{-(.+?)\}\}/g};
	var controller={}, service={};
	j$.browser = function() {
		var m=document.documentMode,a=navigator.userAgent,
		b=_.find({'Chrome/':'C','Safari/':'S','Firefox/':'F','OPR':'O','Opera':'O','Trident/':'I','MSIE':'I'},function(x,y){return a.indexOf(y)>-1})||'N',
		v=_.find({'Trident/4.0':8,'Trident/5.0':9,'Trident/6.0':10,'Trident/7.0':11},function(x,y){return a.indexOf(y)>-1})||7;
		return b=='I'?(m?['I',v,m]:['I',7,7]):[b,99,99];
	}();
	j$.main = function(func){
		delete j$.main;

		$(document).ready(function() {
			if($('[data-bind-view=main]').length < 1) {
				error('main이 존재하지 않습니다.');return;
			}

			_.each(['controller', 'service'],function(v){delete j$[v]});
			$('[data-bind-view]').on('click', function(e) {
				return execute($(e.currentTarget).data('bindView'), $(e.target).data('bindClick'));
			}).on('change', function(e) {
				return execute($(e.currentTarget).data('bindView'), $(e.target).data('bindChange'));
			});

			addController('main', func);
			loadController('main');
		});
		function execute(name,target) {
			if(!target)return!0;
			var e=$vo=controller[name]['vo'],
			f=function(s){return s.length<2 ? null : [s[0].split('.'),s[1].split(')')[0].split(',')]}(target.split('('));
			_.each(f[0],function(v){e[v]&&(e=e[v])}), _.isFunction(e)?e.apply($vo,f[1]):error('undefined function', '$vo.'+f[0]);
			return!1;
		}
	};
	// j$.loadView 화면 출력 후 컨트롤러 로드
	// j$.closeView 화면 히든 또는 삭제 후 컨트롤러 삭제
	// j$.moveView 호출한 컨트롤러 히든 또는 삭제, 화면 출력 후 컨트롤러 로드
	j$.controller = addController;
	j$.service = function(name, func) {
		if(service[name]) {
			error('서비스 중복: ', name);return;
		}
		service[name]=func;
	};
	function addController(name, func) {
		if(controller[name]) {
			error('컨트롤러 중복: ', name);return;
		}
		controller[name] = {
			bind: func,
			vo: {},
			tIf: {},
			tEach: {}
		};
	}
	function loadController(name) {
		// element-if, each
		// data-bind-link: 바인딩 참조된 객체 이름
		// _.each($('[data-bind-view='+n+'] [data-bind-if]'), function(v,k) {
		// 	_controller[n]['bindIf'][k]=$(v).html(), $(v).html('');
		// });
		// _.each($('[data-bind-view='+n+'] [data-bind-each]'), function(v,k) {
		// 	_controller[n]['bindEach'][k]=$(v).html(), $(v).html('');
		// });
		var con = controller[name];
		con['bind'](con['vo'], svc());//, updateData(n);
	}



	function svc() {
		return {
			get: function(name) {return service[name](svc())}
		}
	}
	service.log=function(){
		return {
			group:function(b){'I'!=j$.browser[0] && b && console.group(b)},
			groupEnd:function(){'I'!=j$.browser[0] && console.groupEnd()}
		}
	};

	root.$log=function() {
		'I'==j$.browser[0]?console.log(JSON.stringify(_.toArray(arguments))):console.log.apply(root, _.toArray(arguments));
	};
	function error() {
		'I'==j$.browser[0]?console.log('error', JSON.stringify(_.toArray(arguments))):console.error.apply(root, _.toArray(arguments));
	}
})(window);


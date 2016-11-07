(function(w) {
	var _w={
		browser: function() {
			var m=document.documentMode,a=navigator.userAgent,
			b=_.find({'Chrome/':'C','Safari/':'S','Firefox/':'F','OPR':'O','Opera':'O','Trident/':'I','MSIE':'I'},function(x,y){return a.indexOf(y)>-1})||'N',
			v=_.find({'Trident/4.0':8,'Trident/5.0':9,'Trident/6.0':10,'Trident/7.0':11},function(x,y){return a.indexOf(y)>-1})||7;
			return b=='I'?(m?['I',v,m]:['I',7,7]):[b,99,99];
		}()
	};
	var _controller={};
	var _service={};

	_w.main= function(f) {
		$(document).ready(function() {
			_.each(['controller', 'service'],function(v){delete _w[v]});
			if($('[data-bind-view=main]').length < 1) {
				alert('main이 존재하지 않습니다.');
				return;
			}

			$('[data-bind-view]').on('click', function(e) {
				return (function(c,t){
					var $vo=_controller[c]['vo'];
					t && (eval('$vo.'+t),updateData(c));
					return !t;
				})($(e.currentTarget).data('bindView'), $(e.target).data('bindClick'));
			}).on('change', function(e) {
				(function(c,t){
					var $vo=_controller[c]['vo'];
					t && (eval('$vo.'+t),updateData(c));
				})($(e.currentTarget).data('bindView'), $(e.target).data('bindChange'));
			});

			addController('main', f);
			loadController('main');
		});
	};
	_w.loadView= function(n) {
		_.isArray(n) && _.each(n, function(v){loadController(n);});
	};

	_w.controller= function(n,f) {
		addController(n,f);
	};
	function loadController(n) {
		var func=_controller[n]['func'], vo=_controller[n]['vo'];
		// bindIf
		// bindEach
		func(vo), updateData(n);
		// _controller[n]['func'](_controller[n]['vo'], svc()), updateData(n);
	}
	function addController(n, f) {
		if(_controller[n]) {
			alert(n+': 컨트롤러가 중복됩니다.');
			return;
		}
		_controller[n] = {
			func: f,
			vo: {},
			bindIf: {},
			bindEach: {}
		};
	}
	function updateData(n) {
		var $view = $($('[data-bind-view='+n+']')[0]);
		// text
		_.each($view.find('[data-bind-text]'), function(v) {
			(function($vo,t){
				t.text(eval('$vo.'+t.data('bindText')))
			})(_controller[n]['vo'], $(v));
		});
		// html
		_.each($view.find('[data-bind-html]'), function(v) {
			(function($vo,t){
				t.html(eval('$vo.'+t.data('bindHtml')))
			})(_controller[n]['vo'], $(v));
		});
	}

	w.root=_w;
	w.$log=function() {
		w.console || {log:function(){}};
		var a = _.toArray(arguments);
		(function(ie){ie&&console.log(JSON.stringify(a)),!ie&&console.log.apply(w, a)})('I'==_w.browser[0])
	};
})(window);
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
			addController('main', f);
			loadController('main');
		});
	};
	_w.controller= function(n,f) {
		addController(n,f);
	};
	_w.service= function(name, fn) {
		_service[name]=fn;
		$log.out('_service', name, _service);
	};

	function svc() {
		return {
			get: function(name) {return _service[name](svc())}
		}
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
		$log.out('addController', _controller);
	}
	function loadController(n) {
		// event
		$($('[data-bind-view='+n+']')[0]).click(function(e) {
			if($(e.target).data('bindClick')) {
				(function($vo){eval('$vo.'+$(e.target).data('bindClick'))})(_controller[n]['vo']);
				updateData(n);
			}
			return false;
		});
		// element-if, each
		_.each($('[data-bind-view='+n+'] [data-bind-if]'), function(v,k) {
			_controller[n]['bindIf'][k]=$(v).html(), $(v).html('');
		});
		_.each($('[data-bind-view='+n+'] [data-bind-each]'), function(v,k) {
			_controller[n]['bindEach'][k]=$(v).html(), $(v).html('');
		});

		$log.out('loadController', _controller);

		_controller[n]['func'](_controller[n]['vo'], svc()), updateData(n);
	}
	function updateData(n) {
		// if
		_.each($('[data-bind-view='+n+'] [data-bind-if]'), function(v,k) {
			(function($vo,a){
				(a==true || eval('$vo.'+a)) ? $(v).html(_controller[n]['bindIf'][k]):$(v).html('')
			})(_controller[n]['vo'], $(v).data('bindIf'));
		});
		// each
		_.each($('[data-bind-view='+n+'] [data-bind-each]'), function(v,k) {
			$(v).html('');
			(function($vo,a){
				_.each(eval('$vo.'+a), function(v2,k2) {
					$(v).append(_controller[n]['bindEach'][k].replace(/\$data/g, a+'['+k2+']').replace(/\$index/g, k2));
				});
			})(_controller[n]['vo'], $(v).data('bindEach'));
		});
		// visibled
		_.each($('[data-bind-view='+n+'] [data-bind-visible]'), function(v) {
			(function($vo,a){
				(a==true || eval('$vo.'+a))?$(v).show():$(v).hide()
			})(_controller[n]['vo'], $(v).data('bindVisible'));
		});
		// class
		_.each($('[data-bind-view='+n+'] [data-bind-class]'), function(v) {
			_.each($(v).data('bindClass').split(','), function(v2) {
				(function($vo,a){
					(a[1]=='true' || eval('$vo.'+a[1]))?$(v).addClass(a[0]):$(v).removeClass(a[0])
				})(_controller[n]['vo'], v2.split(':'));
			});
		});
		// text
		_.each($('[data-bind-view='+n+'] [data-bind-text]'), function(v) {
			(function($vo,a){
				$(v).text(eval('$vo.'+a))
			})(_controller[n]['vo'], $(v).data('bindText'));
		});
		// html
		_.each($('[data-bind-view='+n+'] [data-bind-html]'), function(v) {
			(function($vo,a){
				$(v).html(eval('$vo.'+a))
			})(_controller[n]['vo'], $(v).data('bindHtml'));
		});
	}

	w._w=_w;
	w.$log={
		out: function() {
			w.console || {log:function(){}};
			var a = _.toArray(arguments);
			(function(ie){ie&&console.log(JSON.stringify(a)),!ie&&console.log.apply(w, a)})('I'==_w.browser[0])
		}
	};


_w.service('io', function($svc) {
	return {
		// pull
		// push
		push: function($vo) {
		}
	}
});
_w.service('lpopup', function($svc) {
});

})(window);
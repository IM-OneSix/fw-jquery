(function(w) {
	var _w={
		browser: function() {
			var m=document.documentMode,a=navigator.userAgent,
			b=_.find({'Chrome/':'C','Safari/':'S','Firefox/':'F','OPR':'O','Opera':'O','Trident/':'I','MSIE':'I'},function(x,y){return a.indexOf(y)>-1})||'N',
			v=_.find({'Trident/4.0':8,'Trident/5.0':9,'Trident/6.0':10,'Trident/7.0':11},function(x,y){return a.indexOf(y)>-1})||7;
			return b=='I'?(m?['I',v,m]:['I',7,7]):[b,99,99];
		}()
	};
	var _view={};
	var _service={};

	_w.main= function(fn) {
		$(document).ready(function() {
			if($('[data-bind-view=main]').length < 1) {
				alert('main이 존재하지 않습니다.');
				return;
			}
			_w.view('main', fn);
			_.each(['controller', 'service'],function(v){delete _w[v]});

			loadView('main');
		});
	};
	_w.view= function(name, fn) {
		_view[name]={
			controller: fn,
			model: {$name:name}
		};
		$log.out('view', _view);
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
	function loadView(name) {
		// $(element).off('keydown.SIE#Pw keyup.SIE#Pw').on('keydown.SIE#Pw keyup.SIE#Pw',function(e){
		// 	var v=valueAccessor();
		// 	var keyCode = e.keyCode || e.which;
		// 	if(typeof v==='function'){
		// 		v($(e.target).val());
		// 	}
		// });

		$($('[data-bind-view='+name+']')[0]).click(function(e) {
			$(e.target).data('bindClick') && eval('_view.'+name+'.model.'+$(e.target).data('bindClick'));
		});
		_view[name]['controller'](_view[name]['model'], svc());
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
		push: function($vo) {
			var vi= $('[data-bind-view='+$vo.$name+']')[0];
			// if
			// visible
			// each

			// text
			_.each($(vi).find('[data-bind-text]'), function(v) {
				$(v).text(eval('$vo.'+$(v).data('bindText')));
			});
			// html
			_.each($(vi).find('[data-bind-html]'), function(v) {
				$(v).html(eval('$vo.'+$(v).data('bindHtml')));
			});
			// value
		}
	}
});
_w.service('lpopup', function($svc) {
});

})(window);
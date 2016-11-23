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


	var collee={}, callService={}, callView={}, callPopup={}, repeatData={};
	k.debug=true,
	k.init=function(f){
		$(document).ready(f)
	},
	k.get=function(n){
		return callService[n]();
	},
	k.service=function(n,f){
		callService[n]&&error('duplicate service name: '+n), callService[n]=f;
	},
	k.bind=function(obj){
		return callService.bind(obj)
	},
	k.view=function(n,f){
		callView[n]&&error('duplicate view name: '+n), callView[n]=f;
	},
	k.popup=function(n,f){
		callPopup[n]&&error('duplicate view name: '+n), callPopup[n]=f;
	},
	k.browser = function() {
		var m=document.documentMode,a=navigator.userAgent,
		b=_.find({'Chrome/':'C','Safari/':'S','Firefox/':'F','OPR':'O','Opera':'O','Trident/':'I','MSIE':'I'},function(x,y){return a.indexOf(y)>-1})||'N',
		v=_.find({'Trident/4.0':8,'Trident/5.0':9,'Trident/6.0':10,'Trident/7.0':11},function(x,y){return a.indexOf(y)>-1})||7;
		return b=='I'?(m?['I',v,m]:['I',7,7]):[b,99,99];
	}();

	callService.bind=function(obj){
		var lc=_.clone(obj);
		return {
			load:function(func){
				collee={}, getTpl(lc.url).then(function(rsTpl){
					lc.url && rsTpl && selector(lc.name).html(rsTpl);
					_.each(selector(lc.name, 'each'), function(v){
					});
					_.isFunction(func) && (func(), update())
				});
			},
			pull:function(){},
			push:function(){},
			event:function(n,f){
				collee[n]=f;
			}
		};
		function getTpl(url){
			return url ? callService.ajax().html(url, false, false) : function(d){return d.resolve(null), d.promise()}($.Deferred())
		}
		function update(){
			selector(lc.name, 'click').off('click').on('click', function(e){
				return execute({n:lc.name, t:$(e.currentTarget).data('bindClick'), v:$(e.currentTarget).data('bindItem')}),
				!$(e.currentTarget).data('bindClick')
			}),
			selector(lc.name, 'change').off('change').on('change', function(e){
				return execute({n:lc.name, t:$(e.currentTarget).data('bindChange'), v:$(e.currentTarget).data('bindItem')}),
				!$(e.currentTarget).data('bindChange')
			});
			function execute(e) {
				var d=e.v && e.v.split(',');
				return Function('$c', '$d', '$c.'+e.t.replace('(','.call('+(e.v ? '$d' : '$c') + (e.t.indexOf('()')<0 ? ',' : '')) + ';')
				(collee, d && repeatData[d[0]][d[1]])
			}
		}
		function selector(n,t){return t?$('[data-bind-view='+n+'] [data-bind-'+t+']'):$('[data-bind-view='+n+']')}
	};
	callService.ajax=function(){
		return {
			html:function(url,sync,cache){
				return function(d){
					if(url)
						$.ajax({
							async:!sync,
							type: cache?'get':'post',
							contentType:'text/html',
							url:uri(url,cache),
							success:d.resolve,
							error:function(){d.resolve(null)}
						});
					else
						d.resolve(null);
					return d.promise();
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
			}
		}
	};


	function error(msg) {throw new Error(msg)}
	w.$log=function() {
		k.debug && ('I'==k.browser[0] ? console.log(JSON.stringify(_.toArray(arguments))) : console.log.apply(console, _.toArray(arguments)))
	};
})(window);

(function() {
})();

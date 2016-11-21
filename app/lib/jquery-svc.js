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
		exports.k$ = k;
	}
	else {
		w.k$ = k;
	}
	_.templateSettings = {evaluate:/\{\{(.+?)\}\}/g,interpolate: /\{\{=(.+?)\}\}/g, escape: /\{\{-(.+?)\}\}/g};

	var collee={}, svc={}, callView={}, callPopup={};
	k.get=function(){
	},
	k.bind=function(){
	},
	k.view=function(){
	},
	k.popup=function(){
	};

	svc.bind=function(){
		return {
			load:function(){},
			text:function(){},
			html:function(){},
			value:function(){},
			visible:function(){},
			each:function(){},
			event:function(){}
		};
	};


	function error(msg) {throw new Error(msg)}
	w.$log=function() {
		k$.debug && ('I'==k$.browser[0]?console.log(JSON.stringify(_.toArray(arguments))):console.log.apply(w, _.toArray(arguments)));
	};
})(window);
(function(){
$svc.bootstrap('view');

$svc.view('view',function(param){
	var vo=$svc.bind({name:'view'});
	var on=vo.event();
	vo.render(function(){
		vo.push({
			txt:{out:'text: '},
			html:{out:'html: '},
			lst:{
				table:[
					{c1:'a1', c2:'b1'},
					{c1:'a2', c2:'b2'},
					{c1:'a3', c2:'b3'}
				]
			}
		});
	});

	on.clickText=function(){
		vo.push({txt:{out:'text: out text'}});
	};
	on.clickHtml=function(){
		vo.push({html:{out:'html: <strong>out html</strong>'}});
	};
	on.clickEach=function(){
		var lst=[];
		for(var i=1; i<=100; i++)
			lst.push({c1:'a'+i, c2:'b'+i});
		vo.push({lst:{table:lst}});
	};
	on.clickTable=function(p){
		$log(p, this);
	};
	on.clickVisible=function(is, p){
		$log(is);
		vo.push({show:{type1:is, type2:p}});
	};

});
})()
(function(){
$svc.bootstrap('index');
$svc.view('index',function(){
	var vo=$svc.bind({name:'index'});
	// vo.observe({
	// 	a01:function(){},
	// 	a02:function(){}
	// });

	vo.render();
	vo.observe('a01', function(v){
		$log('a01', v);
		if(v==''){
			return true;
		}
	});
	vo.observe('a02', function(v){
		$log('a02', v);
		if(v==''){
			return true;
		}
	});
});
})();
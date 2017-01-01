(function(){
$svc.bootstrap('index');
$svc.view('index',function(){
	var vo=$svc.bind({name:'index'});
	var on=vo.event();
	vo.render();
	vo.watch('a01', function(v){
		if(v==''){
			return true;
		}
	});
	vo.watch('a02', function(v){
		if(v.length<=0){
			return true;
		}
	});

	on.ckA=function(){
		$log('ckA');
	};
});
})();
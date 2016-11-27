(function(){
$svc.bootstrap('index');

$svc.view('index',function(param){
	var vo=$svc.bind({name:'index'});
	var on=vo.event();
	vo.render();

	on.log=function(){
		$log('파라메터', param);
	};
	on.alert=function(){
		$svc.get('popup').alert('alert message');
	};
	on.confirm=function(){
		$svc.get('popup').confirm('confirm message').then(function(yn){
			$log('결과값', yn);
		});
	};
	on.loading=function(){
		var dm = $svc.get('dimmed');
		dm.on();
		setTimeout(function(){
			dm.off();
		}, 2000);

	}
});
})()
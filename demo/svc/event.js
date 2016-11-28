(function(){
$svc.bootstrap('event');

$svc.view('event',function(param){
	var vo=$svc.bind({name:'event'});
	var on=vo.event();
	vo.render();

	on.click=function(p){
		$log('param', p);
	};
	on.change=function(){
		var v=vo.pull();
		$log('param', v.sel);
	};
});
})()
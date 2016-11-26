(function(){
$svc.bootstrap('index');

$svc.view('index',function(param){
	var vo=$svc.bind({name:'index'});
	var on=vo.event();
	vo.render();

	on.log=function(){
		$log('파라메터', param);
	};
});
})()
(function(){
$svc.popup('lpFormPopup',function(param, $close){
	var vo=$svc.bind({name:'lpFormPopup', url:'//im-onesix.github.io/fw-jquery/demo/svc/formPopup.html'});
	var on=vo.event();
	vo.render();

	on.close=function(){
		$log('close');
		$close({test:'-'});
	};
});
})()
(function(){
$svc.popup('lpFormPopup',function(param, $close){
	var vo=$svc.bind({name:'lpFormPopup', url:'formPopup.html'});
	var on=vo.event();
	vo.render(function(){
		$log('popup', param);
		vo.push(param);
	});

	on.close=function(){
		$close(vo.pull());
	};
});
})()
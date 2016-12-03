(function(){
$svc.popup('popup01',function($param, $close){
	var vo=$svc.bind({name:'popup01', url:'popup01.html'});
	var on=vo.event();
	vo.render(function(){
		$log('popup01 init', $param);
		vo.push($param);
	});

	on.close=function(){
		$close();
	};
	on.submit=function(){
		$close(vo.pull());
	};
});

})()
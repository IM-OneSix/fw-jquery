(function(){
$svc.popup('plug01',function($param, $close){
	var vo=$svc.bind({name:'plug01', url:'plug01.html'});
	var on=vo.event();
	vo.render(function(){
		$log('plug01 init', $param);
		vo.push($param);

		$svc.get('plugin').load({name:'plugin'}, function(rs){
			$log('plugin result', rs);
		});
	});

	on.close=function(){
		$close();
	};
	on.submit=function(){
		$close(vo.pull());
	};
});

})()
(function(){
$svc.view('plug02',function($param,$close){
	var vo=$svc.bind({name:'plug02', url:'plug02.html'});
	var on=vo.event();
	vo.render(function(){
		$log('plug02 init', $param);
		$svc.get('plugin').load({name:'plugin'}, function(rs){
			$log('plugin result', rs);
		});
	});

	on.prev=function(){
		$close('plug');
	};
	on.next=function(){
		$svc.get('popup').alert('다음처리');
	};
});
})()
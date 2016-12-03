(function(){
$svc.view('view01',function($param,$close){
	var vo=$svc.bind({name:'view01', url:'view01.html'});
	var on=vo.event();
	vo.render(function(){
		$log('view01 init', $param);
	});

	on.prev=function(){
		$close('view');
	};
	on.next=function(){
		$svc.get('popup').alert('다음처리');
	};
});
})()
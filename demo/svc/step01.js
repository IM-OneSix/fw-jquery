(function(){
$svc.view('step01',function($param,$close){
	var vo=$svc.bind({name:'step01', url:'step01.html', append:true});
	var on=vo.event();
	vo.render(function(){
	});

	on.prev=function(){
		$log('--');
		$close();
	};
	on.next=function(){
		$svc.get('popup').alert('다음처리');
	};
});
})()
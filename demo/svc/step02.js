(function(){
$svc.view('step02',function($param,$close){
	var vo=$svc.bind({name:'step02', url:'step02.html'});
	var on=vo.event();
	vo.render(function(){
	});

	on.prev=function(){
		$close();
	};
	on.next=function(){
		$svc.get('popup').alert('다음처리');
	};
});
})()
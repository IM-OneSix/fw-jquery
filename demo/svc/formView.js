(function(){
$svc.view('formView',function(param){
	var vo=$svc.bind({name:'formView', url:'formView.html'});
	var on=vo.event();
	vo.render(function(){
		vo.push(param);
	});

});
})()
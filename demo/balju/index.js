(function(){
$svc.bootstrap('index');
$svc.view('index',function(){
	var vo=$svc.bind({name:'index'});
	vo.render();
});
})();
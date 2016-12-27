(function(){
$svc.bootstrap('view');
$svc.view('view',function(){
	var vo=$svc.bind({name:'view'});
	vo.render(function(){
		init();
	});

	function init(){
	}
});
})();
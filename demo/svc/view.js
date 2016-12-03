(function(){
$svc.bootstrap('view', [
	'view01.js'
]);

$svc.view('view',function(param){
	var vo=$svc.bind({name:'view'});
	var on=vo.event();
	vo.render();

	on.append=function(){
		$svc.get('view').load({name:'view01', param:{a:'append'}, append:true}).then(function(){
			$log('append view after');
		});
	};
	on.move=function(){
		$svc.get('view').load({name:'view01', param:{a:'move'}}).then(function(){
			$log('move view after');
		});
	};
});
})()

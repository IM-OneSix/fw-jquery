(function(){
$svc.bootstrap('step', [
	'step01.js',
	'step02.js'
]);

$svc.view('step',function($param, $remove){
	var vo=$svc.bind({name:'step'});
	var on=vo.event();
	vo.render(function(){
	});

	on.multi=function(){
		$svc.get('view').load({name:'step01'}).then(function(){
			$log('prev view');
		});
	};
	on.single=function(){
		$svc.get('view').load({name:'step02', back:'step'});
	};
});

})()
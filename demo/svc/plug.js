(function(){
$svc.bootstrap('plug', [
	'plug01.js',
	'plug02.js'
]);
$svc.view('plug',function($param, $close){
	var vo=$svc.bind({name:'plug'});
	var on=vo.event();
	vo.render(function(){
		$log('plug init', $param);
	});

	on.plug01=function(){
		$svc.get('popup').open({name:'plug01'});
	};
	on.plug02=function(){
		$svc.get('view').load({name:'plug02'});
	};
	on.submit=function(){
		$log(plugin);
	};

	// var plugin = {};
	// $svc.get('plugin').load({name:'plugin', param:{a:'a'}}, function(rs){
	// 	plugin = rs;
	// 	$log('plgu01 after',rs);
	// });
});
})()
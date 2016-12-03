(function(){
$svc.bootstrap('popup', [
	'popup01.js'
]);

$svc.view('popup',function($param, $remove){
	var vo=$svc.bind({name:'popup'});
	var on=vo.event();
	vo.render(function(){
		$log('popup init');
	});

	on.popup=function(){
		var v=vo.pull();
		$svc.get('popup').open({name:'popup01', param:v}).then(function(rs){
			vo.push(rs);
		});
	};
});

})()
(function(){
$svc.bootstrap('form', [
	'formPopup.js',
	'formView.js'
]);

$svc.view('form',function(param){
	var vo=$svc.bind({name:'form'});
	var on=vo.event();
	vo.render();

	on.clickPopup=function(){
		var v=vo.pull();
		$svc.get('popup').open({name:'lpFormPopup', param:v}).then(function(rs){
			$log(rs);
			vo.push(rs);
		});
	};
	on.clickView=function(){
		// var v=vo.pull({
		// 	frm:{
		// 		text:'edit box 미입력'
		// 	}
		// });
		var v=vo.pull();
		$log('view', v);
		$svc.get('view').load({name:'formView', param:vo.pull()});
	};
	on.clickAjax=function(){
		$svc.get('http').get('form.json').then(function(rsHttp){
			$log(rsHttp);
			vo.push(rsHttp);
		});
	};
});
})()
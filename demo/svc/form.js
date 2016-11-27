(function(){
$svc.bootstrap('form', [
	'formPopup.js'
]);

$svc.view('form',function(param){
	var vo=$svc.bind({name:'form'});
	var on=vo.event();
	vo.render();

	on.clickPopup=function(){
		$.ajax({
			type:'get',
			contentType:'application/json',
			url:'formPopup.html',
			success:function(d){
				$log('s', d);
			},
			error:function(d){
				$log('e', d);
			}
		});

		$svc.get('popup').open({name:'lpFormPopup'}).then(function(rs){
			$log(rs);
		});
	};
	on.clickView=function(){
		var v=vo.pull({
			frm:{
				text:'edit box 미입력'
			}
		});
		$log('view', v);
	};
});
})()
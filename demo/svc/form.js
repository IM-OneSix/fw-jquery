(function(){
$svc.bootstrap('form', [
	'formPopup.js'
]);

$svc.view('form',function(param){
	var vo=$svc.bind({name:'form'});
	var on=vo.event();
	vo.render();

	on.clickPopup=function(){
		// $.ajax({
		// 					type:'post',
		// 					contentType:'text/html',
		// 					url:uri(url,cache),
		// 					success:d.resolve,
		// 					error:function(){d.resolve(null)}
		// });
$.post("formPopup.html", function(data) {
   $log('-', data);
 });
		// $svc.get('popup').open({name:'lpFormPopup'}).then(function(rs){
		// 	$log(rs);
		// });
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
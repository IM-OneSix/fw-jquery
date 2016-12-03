(function(){
$svc.plugin('plugin',function($param, $return){
	var tpl=''+
'<hr/>\n'+
'<div class="panel panel-default">\n'+
	'<div class="panel-heading"><h3 class="panel-title">플러그인</h3></div>\n'+
	'<div class="panel-body">\n'+
		'<p>\n'+
			'<div>\n'+
				'<div class="form-group">\n'+
					'<input type="text" class="form-control" data-plugin-value="text">\n'+
				'</div>\n'+
				'<div class="form-group">\n'+
					'<label class="radio-inline"><input type="radio" name="r01" value="b" data-plugin-value="radio"> b</label>\n'+
					'<label class="radio-inline"><input type="radio" name="r01" value="c" data-plugin-value="radio"> c</label>\n'+
					'<label class="radio-inline"><input type="radio" name="r01" value="a" data-plugin-value="radio"> a</label>\n'+
				'</div>\n'+
			'</div>\n'+
			'<button class="btn btn-default" data-plugin-click="ajax()">ajax</button>\n'+
			'<button class="btn btn-primary" data-plugin-click="submit()">확인</button>\n'+
		'</p>\n'+
	'</div>\n'+
'</div>\n';


	var vo=$svc.bind({name:'plugin', plugin:tpl});
	var on=vo.event();
	vo.render(function(){
		$log('plugin init', $param);
	});

	on.submit=function(){
		$return(vo.pull());
	};
	on.ajax=function(){
		$svc.get('http').get('form.json').then(function(rsHttp){
			$log('succ', rsHttp);
		}, function(){
			$log('fale');
		});
	};
});
})()
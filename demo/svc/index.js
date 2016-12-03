(function(){
$svc.bootstrap('index');

$svc.view('index',function($param,$close){
	var vo=$svc.bind({name:'index'});
	var on=vo.event();
	vo.render(function(){
		$log('index', $param);
	});

	on.log=function(){
		$log('파라메터', $param);
	};
	on.alert=function(){
		$svc.get('popup').alert('alert message');
	};
	on.confirm=function(){
		$svc.get('popup').confirm('confirm message').then(function(yn){
			$log('결과값', yn);
		});
	};

	on.push=function(){
		vo.push({
			out:{
				text:'out text',
				html:'<strong>out html</strong>',
				show:true,
				attr:{class:'form-control'},
				tab:'a',
				list:[
					{c1:'a1',c2:'b1',c3:[{v:'a',t:'01. a'},{v:'b',t:'02. b'},{v:'c',t:'03. c'}]},
					{c1:'a2',c2:'b2',c3:[{v:'A',t:'01. A'},{v:'B',t:'02. B'},{v:'C',t:'03. C'}]}
				]
			},
			vl:{
				eidt:'edit out',
				chkeck:['1','2'],
				radio:['b']
			}
		});
	};
	on.pull=function(){
		$log(vo.pull());
	};
	on.tab=function(t){
		vo.push({out:{tab:t}});
	};
});
})()
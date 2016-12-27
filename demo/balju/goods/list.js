(function(){
$svc.bootstrap('list');
$svc.view('list',function(){
	var vo=$svc.bind({name:'list'});
	vo.render(function(){
		init();
	});

	function init(){
		var list = [
			{subject:'1. Cras justo odio, dapibus ac facilisis in, egestas eget quam.', price1:'20,000', price2:'10,000', img:'http://www.matcl.com/files/attach/images/2791205/267/834/002/a2b0437320119d96b2fe49dde4b27816.jpg'},
			{subject:'2. Cras justo odio, dapibus ac facilisis in, egestas eget quam.', price1:'20,000', price2:'10,000', img:'http://www.matcl.com/files/attach/images/2791205/267/834/002/b067985730afe2981501cb087c3ac954.jpg'},
			{subject:'1. Cras justo odio, dapibus ac facilisis in, egestas eget quam.', price1:'20,000', price2:'10,000', img:'http://www.matcl.com/files/attach/images/2791205/267/834/002/a2b0437320119d96b2fe49dde4b27816.jpg'},
			{subject:'2. Cras justo odio, dapibus ac facilisis in, egestas eget quam.', price1:'20,000', price2:'10,000', img:'http://www.matcl.com/files/attach/images/2791205/267/834/002/b067985730afe2981501cb087c3ac954.jpg'}
		];
		_.each(list,function(v){
			v.img='<img src="'+v.img+'" alt="'+v.subject+'"/>'
		});
		vo.push({
			list:list
		});
	}
});
})();
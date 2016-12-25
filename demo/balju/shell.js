(function(){
$svc.plugin('viewTop',function($param,$close){
var tpl=''
+'<nav class="navbar navbar-inverse navbar-fixed-top">'
+	'<div class="container">'
+		'<div class="navbar-header">'
+			'<button type="button" class="navbar-toggle collapsed" data-plugin-click="showMene()">'
+				'<span class="sr-only">Toggle navigation</span>'
+				'<span class="icon-bar"></span>'
+				'<span class="icon-bar"></span>'
+				'<span class="icon-bar"></span>'
+			'</button>'
+			'<a class="navbar-brand" href="#">상품주문</a>'
+		'</div>'
+		'<div id="navbar" class="navbar-collapse collapse">'
+			'<ul class="nav navbar-nav">'
+				'<li><a href="event.html">이벤트</a></li>'
+				'<li class="active"><a href="#">화면제어</a></li>'
+				'<li><a href="form.html">폼제어</a></li>'
+			'</ul>'
+		'</div>'
+	'</div>'
+'</nav>'

+'<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static">'
+	'<div class="modal-dialog modal-lg" role="document">'
+		'<div class="modal-content">'
+			'<div class="modal-header">'
+				'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
+				'<h4 class="modal-title" id="myModalLabel">상품주문</h4>'
+			'</div>'
+			'<div class="modal-body">'
+				'<div class="list-group">'
+					'<a href="goods/list.html" class="list-group-item active">패션/잡화</a>'
+					'<a href="#" class="list-group-item">메뉴2</a>'
+					'<a href="#" class="list-group-item">메뉴3</a>'
+				'</div>'
+			'</div>'
+		'</div>'
+	'</div>'
+'</div>';

	var vo = $svc.bind({name:'viewTop', tpl:tpl, plugin:true});
	var on = vo.event();
	vo.render();

	on.showMene=function(){
		$('#myModal').modal('show');
	};
});

$svc.plugin('viewFooter',function($param,$close){
var tpl=''
+'<div class="container">'
+	'레이아웃 하단영역'
+'</div>';

	var vo = $svc.bind({name:'viewFooter', tpl:tpl, plugin:true});
	var on = vo.event();
	vo.render();
});

})();
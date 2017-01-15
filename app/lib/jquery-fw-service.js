(function(w) {

// ==============================
window.open('https://twitter.com/intent/tweet?text=[%EA%B3%B5%EC%9C%A0]%20'
+encodeURIComponent(document.URL)+'%20-%20'+encodeURIComponent(document.title), 'twittersharedialog',
 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
window.open('https://www.facebook.com/sharer/sharer.php?u='
+encodeURIComponent(document.URL)+'&t='+encodeURIComponent(document.title), 'facebooksharedialog',
 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
window.open('https://plus.google.com/share?url='+encodeURIComponent(document.URL), 'googleplussharedialog','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=350,width=600');
window.open('https://story.kakao.com/s/share?url='+encodeURIComponent(document.URL), 'kakaostorysharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
window.open('http://share.naver.com/web/shareView.nhn?url='
+encodeURIComponent(document.URL)+'&title='+encodeURIComponent(document.title),
 'naversharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');

  var firstImg=$(".imageblock:first-of-type img");
    var contents="";
    if(firstImg.attr("src")){
        var firstImgSrc=firstImg.attr("src");
        var firstImgRatio = parseInt(firstImg.css("height"))/parseInt(firstImg.css("width"));
        if (firstImgRatio <=0.27) var firstImgRatio=0.27;
    }else{var firstImgSrc=location.origin+"/favicon.ico";var firstImgRatio=1}
  
    Kakao.init('카카오톡 API');

    function sendLink() {
      Kakao.Link.sendTalkLink({
        label: '[##_page_title_##]',
         image: {
        src: firstImgSrc,
        width: '300',
        height: parseInt(300*firstImgRatio)
      }
        ,
      webButton: {
        text: '블로그에서 이어보기',
         url : document.URL
      }
      });
    } 
/*
// Share on Twitter
<a href="#" onclick="javascript:window.open('https://twitter.com/intent/tweet?text=[%EA%B3%B5%EC%9C%A0]%20'
+encodeURIComponent(document.URL)+'%20-%20'+encodeURIComponent(document.title), 'twittersharedialog',
 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;" target="_blank"
alt="Share on Twitter" ><img src="./images/Twitter.png"></a>

// Share on Facebook
<a href="#" onclick="javascript:window.open('https://www.facebook.com/sharer/sharer.php?u='
+encodeURIComponent(document.URL)+'&t='+encodeURIComponent(document.title), 'facebooksharedialog',
 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;" target="_blank"
 alt="Share on Facebook" >
<img src="./images/Facebook.png"></a>
        
// Share on Google+
<a href="#" onclick="javascript:window.open('https://plus.google.com/share?url='+encodeURIComponent(document.URL), 'googleplussharedialog','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=350,width=600');return false;" target="_blank" alt="Share on Google+">
<img src="./images/Google_Plus.png"></a>

// Share on Kakaostory
<a href="#" onclick="javascript:window.open('https://story.kakao.com/s/share?url='+encodeURIComponent(document.URL), 'kakaostorysharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');return false;" target="_blank" alt="Share on kakaostory">
<img src="./images/Kakao_Story.png"></a>

// Share on Naver
<a href="#" onclick="javascript:window.open('http://share.naver.com/web/shareView.nhn?url='
+encodeURIComponent(document.URL)+'&title='+encodeURIComponent(document.title),
 'naversharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;" 
 target="_blank" alt="Share on Naver" >
<img src="./images/Naver.png"></a>

// Share on KakaoTalk
<a href="javascript:sendLink()"><img src="./images/Kakao.png"></a>

<script>
  var firstImg=$(".imageblock:first-of-type img");
    var contents="";
    if(firstImg.attr("src")){
        var firstImgSrc=firstImg.attr("src");
        var firstImgRatio = parseInt(firstImg.css("height"))/parseInt(firstImg.css("width"));
        if (firstImgRatio <=0.27) var firstImgRatio=0.27;
    }else{var firstImgSrc=location.origin+"/favicon.ico";var firstImgRatio=1}
  
    Kakao.init('카카오톡 API');

    function sendLink() {
      Kakao.Link.sendTalkLink({
        label: '[##_page_title_##]',
         image: {
        src: firstImgSrc,
        width: '300',
        height: parseInt(300*firstImgRatio)
      }
        ,
      webButton: {
        text: '블로그에서 이어보기',
         url : document.URL
      }
      });
    } 
</script> 
*/
// ==============================


function uri(p,c){return(c=!c?'?v='+v():''),fw.A.root+p+c}

si.provider('ajax',function(){
return{$this:$this,html:html,get:get,post:post,form:form};
function $this(){
  return{html:html,get:get,post:post,form:form};
}
function html(url,sync,cache){
  var d=$.Deferred();
  if(url)$.ajax({
      async:!sync,type:cache?'get':'post',contentType:'text/html',url:si.util.uri(url,cache),
      success:d.resolve,error:function(){d.resolve(null)}
    });
  else d.resolve(null);
  return d.promise();
}
function get(url,pm,sync,cache){
  var d=$.Deferred();
  if(url)$.ajax({
      async:!sync,type:'get',contentType:'application/json',url:si.util.uri(url,cache),data:serialize(pm),
      success:function(data){d.resolve({data:data||{},status:200})},error:function(r){d.resolve({status:r.status==200?500:r.status})}
    });
  else d.resolve(null);
  return d.promise();
}
function post(url,pm,sync){
  var d=$.Deferred();
  if(url&&pm)$.ajax({
      async:!sync,type:'post',contentType:'application/json',url:si.util.uri(url),data:JSON.stringify(pm),
      success:function(data){d.resolve({data:data||{},status:200})},error:function(r){d.resolve({status:r.status==200?500:r.status,data:r.responseText})}
    });
  else d.resolve(null);
  return d.promise();
}
function form(url,pm,sync){
  var d=$.Deferred();
  if(url&&pm)$.ajax({
      async:!sync,type:'post',contentType:'application/x-www-form-urlencoded;charset=utf-8',url:si.util.uri(url),data:serialize(pm),
      success:function(data){d.resolve({data:data||{},status:200})},error:function(r){d.resolve({status:r.status==200?500:r.status})}
    });
  else d.resolve(null);
  return d.promise();
}
function serialize(data){return _.map(data,function(v,k){return [k,'=',v].join('');}).join('&')}
});


si.service('http',function($svc){
var log = $svc.logger('http');
var ajax = $svc.get('ajax');
var util = $svc.get('util');
var lpopup = $svc.get('lpopup');
var uiloading = $svc.get('uiLoading');

return {post:post,$post:$post,html:html};

function post(url,param,loading,nofilter,sync){return purePost(url,param,loading,true,sync).then(function(data){return nofilter?data:data.body})}
function $post(url,param,loading,sync){return purePost(url,param,loading,false,sync)}
function html(url,cache){
  cache=cache==undefined?true:cache;
  var data='';
  ajax.html(url,true,cache).then(function(r){data=r||''});
  return data;
}
function purePost(url,param,loading,filtering,sync){
  loading=(loading==undefined?true:!!loading);
  loading&&uiloading.on();

  var d=$.Deferred(),s_tm=new Date,data=parameter(param);

  ajax.post(url,data,sync).then(function(r){
    loading&&uiloading.off();
    var r_tm=new Date;
    if(!r){
      // 입력오류
      logError(s_tm,loading,'S',url,data),logError(r_tm,loading,'R',url,'NULL');
      !url && alert('URL이 입력되지 않았습니다.');
      d.reject();
      return;
    }
    if(!filtering){
      // 필터링없음
      logInfor(s_tm,loading,'S',url,data),logInfor(r_tm,loading,'R',url,r);
      d.resolve(r);
      return;
    }
    if(r.status != 200){
      // 404,500에러
      logError(s_tm,loading,'S',url,data),logError(r_tm,loading,'R',url,r.status);

      var msg=['[ERROR:'+(r.status||500)+']','http('+url+') 에러가 발생하였습니다.'];
      if(r.data&&r.data.indexOf('<pre error-message>')>=0){
        msg.push(r.data.substring(r.data.indexOf('<pre error-message>')+19,r.data.indexOf('</pre>')));
      }
      msg=msg.join('\r\n');
      si.app.st()=='L'&&alert(msg);
      page.error(msg);
      return;
    }
    if(!r.data.header){
      // 전문규격 에러
      logError(s_tm,loading,'S',url,data),logError(r_tm,loading,'R',url,r.data);
      var msg=['[ERROR:500]','전문규격 에러가 발생하였습니다.','url:'+url].join('\r\n');
      si.app.st()=='L'&&alert(msg);
      page.error(msg);
      return;
    }
    if(r.data.header && r.data.header.RCD != 0){
      // 에러
      uiloading.clear();
      logError(s_tm,loading,'S',url,data),logError(r_tm,loading,'R',url,r.data);
      lpopup.alert(r.data.header.MSG||'데이터 처리도중 오류가 발생하였습니다.').then(function(){d.reject()});
      return;
    }

    logInfor(s_tm,loading,'S',url,data),logInfor(r_tm,loading,'R',url,r.data);
    d.resolve(r.data);
  });
  return d.promise();
}
function parameter(data){return {header:{TCD:'S',SDT:util.formatDate(new Date(), 'yyyyMMddhh24missms'),SVW:location.pathname},body:data||{}}}
function logInfor(time,ui,type,url,data){log.isLog&&log(util.formatDate(time,'hh24:mi'),(ui?'+':'-'),[type,'(',url,')'].join(''), data)}
function logError(time,ui,type,url,data){log.isLog&&log(':error', util.formatDate(time,'hh24:mi'),(ui?'+':'-'),[type,'(',url,')'].join(''), data)}
});


_es.controller('$http', function($vo) {
  var d=$.Deferred();
  $vo.request=function(url, pm, loading) {
    loading=(loading==undefined?true:!!loading);
    loading && _es.loading.on();
    _es.ajax.post(url, pm, false).then(function(rs) {
      loading&&_es.loading.off();

      if('200' != rs.status) {
        return;
      }
      d.resolve(rs.data);
    });
    return d.promise();
  };
});



// ==============================
function load(b,p,c,as,cs){
  c=c==undefined?true:c,b=_.compact(_.flatten((b||'').split('/'))).join('/'),b=(b?'/'+b:'');
  _.each(_.compact(_.flatten([p])),function(v){
    var u=b+'/'+_.compact(_.flatten(v.split('/'))).join('/');
    var e=_.last(u.split('.')).toUpperCase();
    e=='JS'&&loadJS(u,c,as,cs);
    e=='CSS'&&loadCSS(u,c,as);
  })
}
function loadJS(p,c,as,cs){var o={src:uri(p,c)};cs&&(o.charset=cs);addTag('script',o,as)}
function loadCSS(p,c,as){addTag('link',{href:uri(p,c),rel:'stylesheet'},as)}
function addTag(n,a,as){
  var h=document.getElementsByTagName('head')[0],e=document.createElement(n);
  _.each(a,function(v,k){e.setAttribute(k,v)});
  as?h.appendChild(e):document.write(out(e));
}


})(window);
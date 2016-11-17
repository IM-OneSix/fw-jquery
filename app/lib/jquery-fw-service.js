(function(w) {

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
si.provider('uiLoading',function(){
var _m='로딩중',_c=0;
return {message:message,$this:$this};
function message(m){_m=m}
function $this(){
  if(!$('#ui-loading').length){
    $('body').append(
    	'<div id="ui-loading" class="ui-loading" style="display:none">'+
    	'<div class="dimmed" style="display:block;z-index:99999;">'+
    	'</div><div class="ui-loading-m" style="z-index:99999;">'+
    	m+'</div></div>');
  }
  return {on:on,off:off,clear:clear};
  function on(){
    _c++;
    setTimeout(function(){_c&&$('#ui-loading').css('display','block')},1);
  }
  function off(){
    _c--;
    if(_c<1){
      _c=0;
      $('#ui-loading').css('display','none');
    }
  }
  function clear(){
    _c=0;
    off();
  }
}

});

// ==============================
function _getS(n){
  return( fw.P[n] ? fw.P[n].$this : fw.S[n] )(_svc('S'))
}
function _svc(t){
  return{
    app:fw.APP,
    get:function(n){return _getS(n)},
    logger:function(n,c){return logger(n,c||C[t])},
    $bind:function(n,e){_bindV(n,e)},
    $controller:function(n,f){_bindC(n,f)},
    $destroy:function(n){_removeC(n)}
  }
}

// ==============================
si.provider('lpopup',function(){
var lp=layerPopup(),_beforeLoadController=function(){};
return {setBeforeLoadController:setBeforeLoadController,$this:$this};

function setBeforeLoadController(beforeLoadController){beforeLoadController && (_beforeLoadController=beforeLoadController)}
function $this($svc){
  var log = $svc.logger('lpopup');
  var ajax = $svc.get('ajax');
  var uiHelper = $svc.get('uiHelper');

  return {
    open:open,
    close:close,
    getParam:getParam,
    alert:alert,
    confirm:confirm,
    tip:tip
  };

  function open(name,tpl,param,noUpdateUI){
    var d = $.Deferred();
    if(lp.get(name)){
      log(name+' 레이어팝업 중복 호출!');
      d.reject();
      return d.promise();
    }

    param=param||{}
    lp.set(name,{d:d,param:_.clone(param)});

    ajax.html(tpl,false,true).then(function(data){
      if(data){
        lp.set(name,{d:d,param:_.clone(param)});

        var $el=$(data);

        $svc.$bind(name,$el);

        $('#layer .dimmed').remove();
        $('#layer').append('<div class="dimmed" style="display:block;z-index:9999;"></div>');
        $('#layer').append($el);

        $svc.$controller(name,function(element){
          if(!noUpdateUI) {
            uiHelper.updateUI(element);
          }
          _beforeLoadController(element);
        });

        $.openDimPop(name);
      }else{
        var msg=['[ERROR:404]','lpopup('+name+')화면템플릿 파일이 존재하지 않습니다.','FILENAME:'+tpl].join('\r\n');
        si.app.st()=='L' && alert(msg);
        page.error(msg);
      }
    });

    return d.promise();
  }

  function getParam($vo){return lp.get($vo.$name()).param}

  function close($vo,data) {
    var d = lp.get($vo.$name()).d;
    var p = getParam($vo).parent||{};

    p.id && $('#'+p.id).focus();
    lp.remove($vo.$name());
    $svc.$destroy($vo.$name());

    $('#layer .dimmed').remove();
    $('#layer .dimmed').hide();
    lp.size()>0 && $('<div class="dimmed" style="display:block;z-index:9999;"></div>').insertBefore($('#layer >div').last());

    $('#container .dimmed').hide();
    
    d.resolve(data);
  }

  function alert(m,e){return open('layerAlert','/siw/common/biz/common/lypop-alert.html',{message:m}, true).then(function() {e && $('#'+(typeof e === 'string' ? e : e.target.id)).focus()})}
  function confirm(m){return open('layerConfirm','/siw/common/biz/common/lypop-confirm.html',{message:m}, true)}
}
function layerPopup(){
  var LPINF={};
  return {get:get,set:set,remove:remove,size:size};
  function get(name){return LPINF[name]}
  function set(name,data){LPINF[name]=data}
  function remove(name){delete LPINF[name]}
  function size(){return _.size(LPINF)}
}
});


})(window);
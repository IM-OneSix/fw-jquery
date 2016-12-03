!function(n){
  function t(n){throw new Error(n)}
  function e(){
    $("#__flying_partition__ [data-party-dimmed]").remove(),
    $("#__flying_partition__ >div:last")
    .before('<div data-party-dimmed style="position:fixed;top:0;left:0;width:100%;height:100%;background-color:#333;opacity:.5;"></div>')
  }
  function a(n,t,e){
    return e?
    $("[data-"+n+"-view="+t+"] [data-"+n+"-"+e+"]"):
    $("[data-"+n+"-view="+t+"]")
  }
  function i(n){
    return n?
    u.http().html(n):
    function(n){
      return n.resolve(null),
      n.promise()
    }($.Deferred())
  }
  function r(e,r){
    function o(){
      function n(n){
        var t=n.v&&n.v.split(",");
        return Function(
          "a","b","c",
          "a."+n.t.replace("(",".call("+(n.v?"b":"a")+(n.t.indexOf("()")<0?",":"")).replace(")",",c)")
        )(d,t&&f[t[0]][t[1]],n.e)
      }
      a(e,c.name,"click").off("click").on("click",function(t){
        return n({
          n:c.name,
          t:$(t.currentTarget).data(e+"Click"),
          v:$(t.currentTarget).data(e+"Item"),
          e:t
        }),
        !$(t.currentTarget).data(e+"Click")
      }),
      a(e,c.name,"change").off("change").on("change",function(t){
        return n({
          n:c.name,
          t:$(t.currentTarget).data(e+"Change"),
          v:$(t.currentTarget).data(e+"Item"),
          e:t
        }),
        !$(t.currentTarget).data(e+"Change")
      })
    }
    function u(n,t){
      var e=t;
      _.each(n.split("."),function(n){
        return n.indexOf("[")<0?
        (void 0==e[n]&&(e[n]={}),e=e[n]):
        _.each(n.replace(/\']/g,"").split("['"),function(n){
          void 0==e[n]&&(e[n]={}),e=e[n]
        })
      })
    }
    !_.isObject(r)&&t("bind type error:: type is object"),
    !r.name&&t("undefined view element name:: "+e);
    var c=_.clone(r),d={},s={},f={};
    return{
      render:function(n){
        a(e,c.name).length<1&&t("not found view element:: "+e+":: "+c.name),
        a(e,c.name).length>1&&t("duplicate view element:: "+e+":: "+c.name),
        i(c.url).then(function(t){
          c.url&&t&&a(e,c.name).html(t),
          c.plugin&&a(e,c.name).html(c.plugin),
          a(e,c.name).show(),
          _.each(a(e,c.name,"each"),function(n){
            _.each($(n).find("[data-"+e+"-click]"),function(t){
              $(t).attr("data-"+e+"-item",$(n).data(e+"Each")+",{{=$index}}")
            }),
            _.each($(n).find("[data-"+e+"-change]"),function(t){
              $(t).attr("data-"+e+"-item",$(n).data(e+"Each")+",{{=$index}}")
            }),
            _.each($(n).find("[data-"+e+"-each]"),function(n){
              $(n).html("{{_.each("+$(n).data(e+"Each")+",function($v,$k){}}"+$(n).html()+"{{})}}")
            }),
            s[$(n).data(e+"Each")]=_.template($(n).html()),
            $(n).html("")
          }),
          _.each(a(e,c.name,"visible"),function(n){
            $(n).hide()
          }),
          _.isFunction(n)&&n(),
          o()
        })
      },
      pull:function(n){
        function t(n){
          return("radio"==n||"checkbox"==n)&&!0
        }
        var i={};
        return _.each(a(e,c.name,"value"),function(n){
          return function(e,a){
            u(e,i),
            Function("a","b",
              t(a)?"_.isEmpty(b."+e+")&&(b."+e+'=[]), $(a).is(":checked")&&b.'+e+".push($(a).val())":"b."+e+"=$(a).val()"
            )(n,i)
          }($(n).data(e+"Value"),$(n).attr("type"))
        }),
        i
      },
      push:function(t){
        if(_.isObject(t)){
          var t=_.clone(t);
          n.$index=0,n.$data={},
          _.each(a(e,c.name,"each"),function(a){
            return function(e){
              u(e,t);
              var i="",r=s[e],
              o=Function("a","return a."+e)(t);
              !_.isEmpty(o)&&(f[e]=o,_.each(o,function(t,e){n.$index=e,n.$data=t,i+=r(t)}),$(a).html(i))
            }($(a).data(e+"Each"))
          }),
          _.each(a(e,c.name,"text"),function(n){
            return function(e){
              u(e,t),
              Function("a","b","!_.isEmpty(b."+e+")&&$(a).text(b."+e+")")(n,t)
            }($(n).data(e+"Text"))
          }),
          _.each(a(e,c.name,"html"),function(n){
            return function(e){
              u(e,t),
              Function("a","b","!_.isEmpty(b."+e+")&&$(a).html(b."+e+")")(n,t)
            }($(n).data(e+"Html"))
          }),
          _.each(a(e,c.name,"value"),function(n){
            return function(e){
              u(e,t),
              Function("a","b","!_.isEmpty(b."+e+")&&$(a).val(b."+e+")")(n,t)
            }($(n).data(e+"Value"))
          }),
          _.each(a(e,c.name,"attr"),function(n){
            return function(e){
              u(e,t),
              Function("a","b","!_.isEmpty(b."+e+")&&$(a).attr(b."+e+")")(n,t)
            }($(n).data(e+"Attr"))
          }),
          _.each(a(e,c.name,"class"),function(n){
            return function(e){
              _.each(e.split(","),function(e){
                var a=e.split(":");
                a=a[1].replace(/'/g,"").split("==").concat(a[0]),
                u(a[0],t),
                Function("a","b","c",
                  "!_.isEmpty(b."+a[0]+")&& b."+a[0]+"==c[1] ? $(a).addClass(c[2]) : $(a).removeClass(c[2])"
                )(n,t,a)
              })
            }($(n).data(e+"Class"))
          }),
          _.each(a(e,c.name,"visible"),function(n){
            return function(e){
              var a=function(){
                return e.indexOf("==")<0?
                (u(e,t),Function("a","return _.isBoolean(a."+e+")?a."+e+":undefined")(t)):
                function(n){
                  return u(n[0],t),
                  Function("a","b",
                    "return _.isObject(a."+n[0]+")&&_.isEmpty(a."+n[0]+")?undefined:a."+n[0]+"==b"
                  )(t,n[1].replace(/'/g,""))
                }(e.split("=="))
              }();
              void 0!=a&&(a?$(n).show():$(n).hide())
            }($(n).data(e+"Visible"))
          }),
          delete n.$index,delete n.$data,o()
        }
      },
      event:function(){
        return d={}
      },
      focus:function(n){
        a(e,c.name).find("[data-"+e+"-focus="+n+"]")[0].focus()
      }
    }
  }
  var o=function(n){
    return n instanceof o?n:this instanceof o?void(this._svc=n):new o(n)
  };
  "undefined"!=typeof exports?
  ("undefined"!=typeof module&&module.exports&&(exports=module.exports=o),exports.$svc=o):
  n.$svc=o,
  _.templateSettings={evaluate:/\{\{(.+?)\}\}/g,interpolate:/\{\{=(.+?)\}\}/g,escape:/\{\{-(.+?)\}\}/g};
  var u={},c={},d={},s={},f={},l=0;
  o.debug=!0,
  o.bootstrap=function(n,t){
    n&&(f={name:n,lib:t})
  },
  o.init=function(n){
    $(document).ready(n)
  },
  o.get=function(n){
    return u[n]()
  },
  o.bind=function(n){
    return r(n.plugin?"plugin":"bind",n)
  },
  o.service=function(n,e){
    u[n]&&t("duplicate service name: "+n),
    u[n]=e
  },
  o.view=function(n,e){
    c[n]&&t("duplicate view name: "+n),
    c[n]=e
  },
  o.plugin=function(n,e){
    d[n]&&t("duplicate plugin name: "+n),
    d[n]=e
  },
  o.popup=function(n,e){
    s[n]&&t("duplicate view name: "+n),
    s[n]=e
  },
  o.browser=function(){
    var n=document.documentMode,
    t=navigator.userAgent,
    e=_.find({"Chrome/":"C","Safari/":"S","Firefox/":"F",OPR:"O",Opera:"O","Trident/":"I",MSIE:"I"},function(n,e){
      return t.indexOf(e)>-1
    })||"N",
    a=_.find({"Trident/4.0":8,"Trident/5.0":9,"Trident/6.0":10,"Trident/7.0":11},function(n,e){
      return t.indexOf(e)>-1
    })||7;
    return"I"==e?n?["I",a,n]:["I",7,7]:[e,99,99]
  }(),
  u.ajax=function(){
    function n(n,t){
      return t=t?"":"?v="+_.now(),n+t
    }
    function t(n){
      return _.map(n,function(n,t){
        return[t,"=",n].join("")
      }).join("&")
    }
    return{
      html:function(t,e,a){
        return function(i){
          return t?$.ajax({
            async:!e,type:a?"get":"post",contentType:"text/html",
            url:n(t,a),
            success:function(n){i.resolve(n)},
            error:function(){i.resolve()}
          }):i.resolve(),
          i.promise()
        }($.Deferred())
      },
      get:function(e,a,i,r){
        return function(o){
          return e?$.ajax({
            async:!i,type:"get",contentType:"application/json",
            url:n(e,r),
            data:t(a),
            success:function(n){o.resolve({data:n||{},status:200})},
            error:function(n){o.resolve({status:200==n.status?500:n.status,data:n.responseText})}
          }):o.resolve(),
          o.promise()
        }($.Deferred())
      },
      post:function(t,e,a){
        return function(i){
          return t?$.ajax({
            async:!a,type:"post",contentType:"application/json",
            url:n(t,cache),
            data:JSON.stringify(e),
            success:function(n){i.resolve({data:n||{},status:200})},
            error:function(n){i.resolve({status:200==n.status?500:n.status,data:n.responseText})}
          }):i.resolve(),
          i.promise()
        }($.Deferred())
      },
      form:function(e,a,i){
        return function(r){
          return e?$.ajax({
            async:!i,type:"post",
            contentType:"application/x-www-form-urlencoded;charset=utf-8",
            url:n(e,cache),
            data:t(a),
            success:function(n){r.resolve({data:n||{},status:200})},
            error:function(n){r.resolve({status:200==n.status?500:n.status})}
          }):r.resolve(),
          r.promise()
        }($.Deferred())
      }
    }
  },
  u.http=function(){
    function t(n){
      setTimeout(function(){
        l++<1&&i(!0),e(),n&&"on"==n&&l++
      },1)
    }
    function a(n){
      setTimeout(function(){
        n&&"off"==n&&--l,--l<1&&(l=0,i(),e())
      },1)
    }
    function i(t){
      return $("#__flying_partition__ [data-party-message]").remove(),
      t&&($("#__flying_partition__").append('<div data-party-message style="position:absolute;top:30%;font-size:2em;color:#fff;"><div class="spinner"></div></div>'),
        $("#__flying_partition__ [data-party-message]").css("left",($(n).width()-$("#__flying_partition__ [data-party-message]").width())/2))
    }
    return $("#__flying_partition__").length<1&&$("body").append('<div id="__flying_partition__"></div>'),
    {
      html:function(n){
        return t(),
        u.ajax().html(n,!1,!1).then(function(n){
          return a(),n||""
        })
      },
      get:function(n,e,i){
        return function(r){
          return t(i),
          u.ajax().get(n,e).then(function(n){
            return a(i),
            200!=n.status?void r.reject():void r.resolve(n.data)
          }),
          r.promise()
        }($.Deferred())
      },
      post:function(n,t,e){
        return function(i){
          u.ajax().get(n,t).then(function(n){
            return a(e),
            200!=n.status?void i.reject():void i.resolve(n.data)
          })
        }($.Deferred())
      }
    }
  },
  u.view=function(){
    var n=$.Deferred();
    return{
      load:function(e){
        return!c[e.name]&&t("undefined view name: "+e.name),
        !e.append&&$("[data-bind-view]").hide(),
        _.isFunction(c[e.name])&&c[e.name](e.param,function(t){
          a("bind",e.name).html(""),
          t&&a("bind",t).show(),
          n.resolve()
        }),
        n.promise()
      }
    }
  },
  u.plugin=function(){
    return{
      load:function(n,e){
        return !d[n.name]&&t("undefined plug name: "+n.name),
        _.isFunction(d[n.name])&&d[n.name](n.param,e)
      }
    }
  },
  u.popup=function(){
    function n(n,u){
      return r=n,
      a("bind",r.name).length>0&&t("duplicate popup element: "+r.name),
      $("#__flying_partition__").append('<div data-bind-view="'+r.name+'">'+i(u)+"</div>"),
      e(),
      s[r.name](r.param,function(n){
        $('#__flying_partition__ [data-bind-view="'+r.name+'"]').remove(),
        e(),
        o.resolve(n)
      }),
      o.promise()
    }
    function i(n){
      return{
        alert:'<div class="alert alert-warning" style="position:absolute;top:10%;left:10%;width:80%;"><div data-bind-html="message"></div><div style="margin-top:20px;text-align:center;"><button class="btn btn-default btn-sm" data-bind-click="ok()">확인</button></div></div>',
        confirm:'<div class="alert alert-warning" style="position:absolute;top:10%;left:10%;width:80%;"><div data-bind-html="message"></div><div style="margin-top:20px;text-align:center;"><button class="btn btn-primary btn-sm" data-bind-click="yes()">확인</button><i style="margin-left:10px;"></i><button class="btn btn-default btn-sm" data-bind-click="no()">취소</button></div></div>'
      }[n]||""
    }
    $("#__flying_partition__").length<1&&$("body").append('<div id="__flying_partition__"></div>');
    var r={},o=$.Deferred();
    return{
      open:n,
      alert:function(t){
        return n({name:"lpAlert",param:{message:t}},"alert")
      },
      confirm:function(t){
        return n({name:"lpConfirm",param:{message:t}},"confirm")
      }
    }
  },
  n.$log=function(){
    o.debug&&("I"==o.browser[0]?
    console.log(JSON.stringify(_.toArray(arguments))):
    console.log.apply(console,_.toArray(arguments)))
  },
  $(document).ready(function(){
    $("body").hide(),
    _.each(f.lib,function(n){
      var t=document.getElementsByTagName("head")[0],
      e=document.createElement("script");
      e.setAttribute("src",n),t.appendChild(e)
    }),
    $svc.get("view").load({
      name:f.name,
      param:Function("return "+$("[data-bind-param]").data("bindParam"))()
    }),
    $("[data-bind-param]").remove(),
    $("body").show(),
    setTimeout(function(){
      _.each(["bootstrap","service","view","popup","plugin"],function(n){
        delete o[n]
      })
    },1000)
  }),
  $svc.popup("lpAlert",function(n,t){
    var e=$svc.bind({name:"lpAlert"});
    on=e.event(),
    e.render(function(){e.push(n)}),
    on.ok=function(){t()}
  }),
  $svc.popup("lpConfirm",function(n,t){
    var e=$svc.bind({name:"lpConfirm"});
    on=e.event(),
    e.render(function(){e.push(n)}),
    on.yes=function(){t(!0)},
    on.no=function(){t(!1)}
  })
}(window);
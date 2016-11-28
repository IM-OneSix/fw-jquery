!function(n){
  function t(n){throw new Error(n)}
  var e=function(n){
    return n instanceof e?n:this instanceof e?void(this._tmp=n):new e(n)};
    "undefined"!=typeof exports?
    ("undefined"!=typeof module&&module.exports&&(exports=module.exports=e),exports.$svc=e):
    n.$svc=e,
    _.templateSettings={evaluate:/\{\{(.+?)\}\}/g,interpolate:/\{\{=(.+?)\}\}/g,escape:/\{\{-(.+?)\}\}/g};
    var a={},i={},r={},o={};
    e.debug=!0,
    e.bootstrap=function(n,t){n&&(o={name:n,lib:t})},
    e.init=function(n){$(document).ready(n)},
    e.get=function(n){return a[n]()},
    e.bind=function(n){return a.bind(n)},
    e.service=function(n,e){a[n]&&t("duplicate service name: "+n),a[n]=e},
    e.view=function(n,e){i[n]&&t("duplicate view name: "+n),i[n]=e},
    e.popup=function(n,e){r[n]&&t("duplicate view name: "+n),r[n]=e},
    e.browser=function(){
      var n=document.documentMode,t=navigator.userAgent,
      e=_.find({"Chrome/":"C","Safari/":"S","Firefox/":"F",OPR:"O",Opera:"O","Trident/":"I",MSIE:"I"},function(n,e){
        return t.indexOf(e)>-1
      })||"N",
      a=_.find({"Trident/4.0":8,"Trident/5.0":9,"Trident/6.0":10,"Trident/7.0":11},function(n,e){
        return t.indexOf(e)>-1
      })||7;
      return"I"==e?n?["I",a,n]:["I",7,7]:[e,99,99]
    }(),

    a.bind=function(e){
      function i(n){
        return n?
        a.ajax().html(n,!1,!1):
        function(n){return n.resolve(null),n.promise()}($.Deferred())
      }
      function r(){
        function n(n){
          var t=n.v&&n.v.split(",");
          return Function("a","b","a."+n.t.replace("(",".call("+(n.v?"b":"a")+(n.t.indexOf("()")<0?",":""))+";")(d,t&&f[t[0]][t[1]])
        }
        o(c.name,"click").off("click").on("click",function(t){
          return n({n:c.name,t:$(t.currentTarget).data("bindClick"),v:$(t.currentTarget).data("bindItem")}),
          !$(t.currentTarget).data("bindClick")
        }),
        o(c.name,"change").off("change").on("change",function(t){
          return n({n:c.name,t:$(t.currentTarget).data("bindChange"),v:$(t.currentTarget).data("bindItem")}),
          !$(t.currentTarget).data("bindChange")
        })
      }
      function o(n,t){
        return t?$("[data-bind-view="+n+"] [data-bind-"+t+"]"):$("[data-bind-view="+n+"]")
      }
      function u(n,t){
        var e=t;
        _.each(n.split("."),function(n){
          return n.indexOf("[")<0?
          (void 0==e[n]&&(e[n]={}),e=e[n]):
          _.each(n.replace(/\']/g,"").split("['"),function(n){
            void 0==e[n]&&(e[n]={}),
            e=e[n]
          })
        })
      }
      !_.isObject(e)&&t("bind type error:: type is object"),
      !e.name&&t("undefined view element name");
      var c=_.clone(e),d={},l={},f={};
      return{
        render:function(n){
          o(c.name).length<1&&t("not found view element: "+c.name),
          o(c.name).length>1&&t("duplicate view element: "+c.name),
          i(c.url).then(function(t){
            c.url&&t&&o(c.name).html(t),
            _.each(o(c.name,"each"),function(n){
              _.each($(n).find("[data-bind-click]"),function(t){
                $(t).attr("data-bind-item",$(n).data("bindEach")+",{{=$index}}")
              }),
              _.each($(n).find("[data-bind-change]"),function(t){
                $(t).attr("data-bind-item",$(n).data("bindEach")+",{{=$index}}")
              }),
              l[$(n).data("bindEach")]=_.template($(n).html()),
              $(n).html("")
            }),
            _.each(o(c.name,"visible"),function(n){
              $(n).hide()}),
            _.isFunction(n)&&n(),r()
          })
        },
        pull:function(n){
          function t(n){
            return("radio"==n||"checkbox"==n)&&!0
          }
          var e={},a="";
          return _.each(o(c.name,"value"),function(i){
            return function(r,d){
              u(r,e),
              Function("a","b",
                t(d)?
                "_.isEmpty(b."+r+")&&(b."+r+'=[]), $(a).is(":checked")&&b.'+r+".push($(a).val())":
                "b."+r+"=$(a).val()"
              )(i,e),
              n&&(t(d)?
                o(c.name).find('[data-bind-value="'+r+'"]:checked').length<=0&&!a&&(a=r):
                !$(i).val()&&!a&&(a=r)
              )
            }($(i).data("bindValue"),$(i).attr("type"))
          }),
          function(){
            var t=n&&Function("a","return a."+a)(n);
            return n&&a?
            (t&&$svc.get("popup").alert(t).then(function(){
              o(c.name).find('[data-bind-value="'+a+'"]')[0].focus()
            }),  null):
            e
          }()
        },
        push:function(t){
          _.isObject(t)&&(
            n.$index=0,n.$data={},
            _.each(o(c.name,"text"),function(n){
              return function(e){
                u(e,t),
                Function("a","b","!_.isEmpty(b."+e+")&&$(a).text(b."+e+")")(n,t)
              }($(n).data("bindText"))
            }),
            _.each(o(c.name,"html"),function(n){
              return function(e){
                u(e,t),
                Function("a","b","!_.isEmpty(b."+e+")&&$(a).html(b."+e+")")(n,t)
              }($(n).data("bindHtml"))
            }),
            _.each(o(c.name,"value"),function(n){
              return function(e){
                u(e,t),
                Function("a","b","!_.isEmpty(b."+e+")&&$(a).val(b."+e+")")(n,t)
              }($(n).data("bindValue"))
            }),
            _.each(o(c.name,"attr"),function(n){
              return function(e){
                u(e,t),
                Function("a","b","!_.isEmpty(b."+e+")&&$(a).attr(b."+e+")")(n,t)
              }($(n).data("bindAttr"))
            }),
            _.each(o(c.name,"class"),function(n){
              return function(e){
                _.each(e.split(","),function(e){
                  var a=e.split(":");
                  a=a[1].replace(/'/g,"").split("==").concat(a[0]),
                  u(a[0],t),
                  Function("a","b","c",
                    "!_.isEmpty(b."+a[0]+")&& b."+a[0]+"==c[1] ? $(a).addClass(c[2]) : $(a).removeClass(c[2])"
                  )(n,t,a)
                })
              }($(n).data("bindClass"))
            }),
            _.each(o(c.name,"each"),function(e){
              return function(a){
                u(a,t);
                var i="",r=l[a],
                o=Function("a","return a."+a)(t);
                !_.isEmpty(o)&&(
                  f[a]=o,
                  _.each(o,function(t,e){
                    n.$index=e,n.$data=t,i+=r(t)
                  }),
                  $(e).html(i)
                )
              }($(e).data("bindEach"))
            }),
            _.each(o(c.name,"visible"),function(n){
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
              }($(n).data("bindVisible"))
            }),
            delete n.$index,delete n.$data
          )
        },
        event:function(){return d={}},
        focus:function(n){
          o(c.name).find("[data-bind-focus="+n+"]")[0].focus()
        }
      }
    },
    a.ajax=function(){
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
            return t?
            $.ajax({
              async:!e,
              type:"get",
              contentType:"text/html",
              url:n(t,a),
              success:i.resolve,
              error:function(){i.resolve(null)}
            }):
            i.resolve(null),
            i.promise()
          }($.Deferred())
        },
        get:function(e,a,i,r){
          return function(o){
            return e?
            $.ajax({
              async:!i,
              type:"get",
              contentType:"application/json",
              url:n(e,r),
              data:t(a),
              success:function(n){
                o.resolve({data:n||{},status:200})
              },
              error:function(n){
                o.resolve({status:200==n.status?500:n.status,data:n.responseText})
              }
            }):
            o.resolve(null),
            o.promise()
          }($.Deferred())
        }
      }
    },
    a.http=function(){
      var n=a.dimmed();
      return{
        http:function(){},
        get:function(t,e,i){
          return i=void 0==i?!0:!!i,
          i&&n.on(),
          a.ajax().get(t,e).then(function(t){
            return n.off(),t.data
          })
        },
        post:function(){}
      }
    },
    a.view=function(){
      return{
        load:function(n){
          _.isFunction(i[n.name])&&i[n.name](n.param)
        },
        remove:function(){}
      }
    },
    a.popup=function(){
      function n(n,a){
        return u=n,
        $("[data-bind-view="+u.name+"]").length>0&&t("duplicate popup element: "+u.name),
        $("#__flying_partition__").append('<div data-bind-view="'+u.name+'">'+e(a)+"</div>"),
        o.volume(),
        r[u.name](u.param,i),
        c.promise()
      }
      function e(n){
        return{
          alert:'<div class="alert alert-warning" style="position:absolute;top:10%;left:10%;width:80%;"><div data-bind-html="message"></div><div style="margin-top:20px;text-align:center;"><button class="btn btn-default btn-sm" data-bind-click="ok()">확인</button></div></div>',
          confirm:'<div class="alert alert-warning" style="position:absolute;top:10%;left:10%;width:80%;"><div data-bind-html="message"></div><div style="margin-top:20px;text-align:center;"><button class="btn btn-primary btn-sm" data-bind-click="yes()">확인</button><i style="margin-left:10px;"></i><button class="btn btn-default btn-sm" data-bind-click="no()">취소</button></div></div>'
        }[n]||""
      }
      function i(n){
        $('#__flying_partition__ [data-bind-view="'+u.name+'"]').remove(),
        o.volume(),
        c.resolve(n)
      }
      var o=a.dimmed(),u={},c=$.Deferred();
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
    a.dimmed=function(){
      function t(){
        $("#__flying_partition__ [data-party-dimmed]").remove(),
        $("#__flying_partition__ >div:last").before('<div data-party-dimmed style="position:fixed;top:0;left:0;width:100%;height:100%;background-color:#333;opacity:.5;"></div>')
      }
      function e(t){
        return $("#__flying_partition__ [data-party-message]").remove(),
        t&&($("#__flying_partition__").append('<div data-party-message style="position:absolute;top:30%;font-size:2em;color:#fff;"><div class="spinner"></div></div>'),
        $("#__flying_partition__ [data-party-message]").css("left",($(n).width()-$("#__flying_partition__ [data-party-message]").width())/2))
      }
      var a=0;
      return $("#__flying_partition__").length<1&&$("body").append('<div id="__flying_partition__"></div>'),{
        on:function(){
          a++<1&&setTimeout(function(){e(!0),t()},1)
        },
        off:function(){
          --a<1&&setTimeout(function(){a=0,e(!1),t()},1)
        },
        clear:function(){
          setTimeout(function(){a=0,e(!1),t()},1)
        },
        volume:t
      }
    },
    n.$log=function(){
      e.debug&&("I"==e.browser[0]?
      console.log(JSON.stringify(_.toArray(arguments))):
      console.log.apply(console,_.toArray(arguments)))
    },
    $(document).ready(function(){
      _.each($("[data-bind-include]"),function(n){
        a.ajax().html($(n).data("bindInclude"),!0,!1).then(function(t){
          $(n).html(t)
        })
      }),
      _.each(o.lib,function(n){
        var t=document.getElementsByTagName("head")[0],
        e=document.createElement("script");
        e.setAttribute("src",n),
        t.appendChild(e)
      }),
      $svc.get("view").load({
        name:o.name,
        param:Function("return "+$("[data-bind-param]").data("bindParam"))()
      }),
      $("[data-bind-param]").remove()
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
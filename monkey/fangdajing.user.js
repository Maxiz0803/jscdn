// ==UserScript==
// @name         weibo 放大镜
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       mxk-zwh
// @match        https://weibo.com/*/*
// @icon         https://avatars.githubusercontent.com/u/72368111?s=40&v=4
// @require      https://static.hdslb.com/js/jquery.min.js
// @run-at       document-end
// @grant        none
// ==/UserScript==
var a={
    ui:()=>{
        var html=`
            <div id="weibo_fangdajing" class="">
                <img src="">
                <span>🔍放大惊</span>
            </div>
        `
        var css=`
        <style>
            #weibo_fangdajing{
               padding:10px;
               background:rgb(255,247,209);
               position:absolute;
               display:none;
               box-shadow:
                  0px 0.8px 2.2px rgba(0, 0, 0, 0.011),
                  0px 2.4px 5.3px rgba(0, 0, 0, 0.016),
                  0px 5.1px 10px rgba(0, 0, 0, 0.02),
                  0px 9.9px 17.9px rgba(0, 0, 0, 0.024),
                  0px 19.7px 33.4px rgba(0, 0, 0, 0.029),
                  0px 48px 80px rgba(0, 0, 0, 0.04)
                ;
               z-index:100;
            }
            #weibo_fangdajing img{
                background:red;
               display: block;
            }
            #weibo_fangdajing span{
                text-align: center;
                display:block;
            }
            .left-top{
               left:40px;
               top:50px;
               right:unset;
               bottom:unset;
            }
            .right-top{
               right:40px;
               top:50px;
               left:unset;
               bottom:unset;
            }
            .left-bottom{
               left:40px;
               bottom:50px;
               right:unset;
               top:unset;
            }
            .right-bottom{
               right:40px;
               bottom:50px;
               left:unset;
               top:unset;
            }
        </style>
        `
        $('body').append(html)
        $('head').append(css)
    },
    test:async ()=>{
        var pic=await [];
        $('body').find('img.woo-picture-img').each(function(){
            let tmp=$(this).attr("src");

            let idx = tmp.lastIndexOf("/");
            tmp=tmp.slice(idx+1,tmp.length);
            var url1000=`https://wx4.sinaimg.cn/mw1000/${tmp}`
            var urllarge=`https://wx4.sinaimg.cn/large/${tmp}`
            $(this).on({
                mouseenter: function(e){
                    $('#weibo_fangdajing img').attr('src',url1000);
                    if((e.pageX<$(window).width()/2)){
                       $('#weibo_fangdajing').css({
                           display:'block',
                           left:(e.pageX+15)+'px',
                           top:(e.pageY+15)+'px',
                           right:'unset'
                       });
                    }else{
                       $('#weibo_fangdajing').css({
                           display:'block',
                           left:'unset',
                           top:(e.pageY+15) +'px',
                           right:($(window).width()-e.pageX+15) +'px',
                       });
                    }


                },
                mouseleave: function(e){
                    $('#weibo_fangdajing').css({display:'none'});
                },
            });
            pic.push(urllarge)
        })
        console.log(pic)

    }
}
setTimeout(function(){a.ui();a.test();},3000)

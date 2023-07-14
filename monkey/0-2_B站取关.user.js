// ==UserScript==
// @name         B站取关
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  慢慢取关，ctm rnm
// @author       You
// @require      https://static.hdslb.com/js/jquery.min.js
// @require      https://raw.iqiq.io/MonkSoul/Layx/master/layx.min.js
// @resource xcss https://raw.iqiq.io/MonkSoul/Layx/master/layx.min.css
// @require      https://raw.iqiq.io/mxk-zwh/jscdn/main/message.js
// @resource css https://raw.iqiq.io/mxk-zwh/jscdn/main/message.css
// @match        https://space.bilibili.com/*/fans/follow*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @connect      raw.iqiq.io
// @run-at       document-body
// @grant        GM_getResourceURL
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

var html=`
<link rel="stylesheet" href="//at.alicdn.com/t/font_1117508_wxidm5ry7od.css">
<div id="b-cancel-follow">
  <div class="b-btn cancel-hand">手动取关</div>
  <div class="b-btn clean_unuid">清理空号</div>
  <div class="b-btn next-page">下一页</div>
  <div class="b-btn cancel-auto">自动取关</div>
  <div class="b-btn auto-cancel">暂停取关</div>
</div>
`
layx.html('str','B站取关',html,{
    width:300,
    height:300,
    position:'rb'
});
var css=`
   <style>
  #b-cancel-follow {
    position: fixed;
    top: 50px;
    left: 50px;
    z-index: 11;
  }
  #b-cancel-follow .b-btn {
    width: 110px;
    height: 40px;
    background: pink;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    color: #fff;
    letter-spacing: 1px;
    border-radius: 23px;
    transform: scale(1);
     margin-bottom: 10px;
  }
  #b-cancel-follow .cancel-hand {

    background: linear-gradient(90deg, #e1c80f 0, #2cb3a5 100%);

  }
  #b-cancel-follow .clean_unuid{

    background: linear-gradient(50deg, #f1ffd7 0, #2cb3a5 100%);

  }
  #b-cancel-follow .next-page{
    background: linear-gradient(90deg, #8a6ff4 0, #f136f4 100%);
  }
  #b-cancel-follow .cancel-auto {
    background: linear-gradient(90deg, #d9d622 0, #e33131 100%);
  }
  #b-cancel-follow .cancel-hand:hover {
    margin-bottom: 10px;
    background: linear-gradient(90deg, #e2e231 0, #32e0ce 100%);
  }
  #b-cancel-follow .clean_unuid:hover {
    margin-bottom: 10px;
    background: linear-gradient(90deg, #e2e231 0, #32e0ce 100%);
  }
  #b-cancel-follow .next-page:hover{
    background: linear-gradient(90deg, #6a48f3 0, #fb04ff 100%);
  }
  #b-cancel-follow .cancel-auto:hover {
    background: linear-gradient(90deg, #e8e528 0, #e03030 100%);
  }
  #b-cancel-follow .cancel-hand:active {
    margin-bottom: 10px;
    background: linear-gradient(90deg, #e2e231 0, #32e0ce 100%);
    transform: scale(0.97);
  }
  #b-cancel-follow .cancel-auto:active {
    background: linear-gradient(90deg, #e8e528 0, #e03030 100%);
    transform: scale(0.97);
  }
  /* 取消 */
  #b-cancel-follow .auto-cancel {
    display: none;
    background: linear-gradient(270deg, #d9d622 0, #b32c2c 100%);
  }
  #b-cancel-follow .s-cancel:hover {
    margin-bottom: 10px;
    background: linear-gradient(270deg, #e2e231 0, #32e0ce 100%);
  }
  #b-cancel-follow .auto-cancel:hover {
    background: linear-gradient(270deg, #e8e528 0, #e03030 100%);
  }
  #b-cancel-follow .s-cancel:active {
    margin-bottom: 10px;
    background: linear-gradient(270deg, #e2e231 0, #32e0ce 100%);
    transform: scale(0.97);
  }
  #b-cancel-follow .next-page:active {
    margin-bottom: 10px;
    background: linear-gradient(270deg, #6a48f3 0, #fb04ff 100%);
    transform: scale(0.97);
  }
  #b-cancel-follow .auto-cancel:active {
    background: linear-gradient(270deg, #e8e528 0, #e03030 100%);
    transform: scale(0.97);
  }
</style>
  `


$('head').append(css)
const message = new Message();
GM_addStyle(GM_getResourceText("css"));
GM_addStyle(GM_getResourceText("xcss"));
var t;
$('#b-cancel-follow .cancel-hand').click(function(){
    a.unfollow_all()
})
$('#b-cancel-follow .clean_unuid').click(function(){
    a.clean_unuid()
})
$('#b-cancel-follow .next-page').click(function(){
    a.next()
})
$('#b-cancel-follow .cancel-auto').click(function(){
    $('#b-cancel-follow .cancel-auto').css('display','none')
    $('#b-cancel-follow .clean_unuid').css('display','none')
    $('#b-cancel-follow .next-page').css('display','none')
    $('#b-cancel-follow .auto-cancel').css('display','block')
    $('#b-cancel-follow .cancel-hand').css('display','none')
    t = setInterval(function(){a.unfollow_all()}, 5000)
    message.show({
        type: 'success',
        text: '已开启自动取关'
    });
})
$('#b-cancel-follow .auto-cancel').click(function(){
    $('#b-cancel-follow .auto-cancel').css('display','none')
    $('#b-cancel-follow .clean_unuid').css('display','')
    $('#b-cancel-follow .cancel-auto').css('display','block')
    $('#b-cancel-follow .cancel-hand').css('display','block')
    $('#b-cancel-follow .next-page').css('display','block')
    clearInterval(t)
    message.show({
        type: 'warning',
        text: '已关闭自动取关'
    });
})

var a={
    unfollow_all:()=>{
        if($(".be-dropdown-item:contains('取消关注')").length>0){
            $(".be-dropdown-item:contains('取消关注'):lt(4)").click();
            message.show({
                type: 'success',
                text: '已经取关'
            });
        }else{
            message.show({
                type: 'error',
                text: '取关没有了'
            });
        }

    },
    clean_unuid:()=>{
        var zx=$("span.fans-name:contains('账号已注销')").length

        if(zx>0){

            message.show({
                type: 'warning',
                text: '发现'+zx+'个空号'
            });
            $('span.fans-name:contains("账号已注销")').each(function(){
                // 找到对应的取消关注按钮并模拟点击
                try{
                    $(this).parents('.list-item').find(".be-dropdown-item:contains('取消关注')").click();
                    message.show({
                        type: 'success',
                        text: '已经取关'
                    });
                    a.next()
                }catch{
                    message.show({
                        type: 'error',
                        text: '取关失败'
                    });
                }
            });

        }else{
            message.show({
                type: 'warning',
                text: '未发现空号'
            });
            a.next()

        }
    },
    next:()=>{
        if(!($(".be-pager-next.be-pager-disabled").length>0)){
            $(".be-pager-next").click();
            message.show({
                text: '下一页'
            });
        }else{
            message.show({
                type: 'error',
                text: '已经见底了'
            });
            $('#b-cancel-follow .auto-cancel').css('display','none')
            $('#b-cancel-follow .clean_unuid').css('display','')
            $('#b-cancel-follow .cancel-auto').css('display','block')
            $('#b-cancel-follow .cancel-hand').css('display','block')
            $('#b-cancel-follow .next-page').css('display','block')
            clearInterval(t)
            message.show({
                type: 'warning',
                text: '已关闭自动取关'
            });
        }

    }
}

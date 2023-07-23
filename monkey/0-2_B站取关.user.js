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
// @icon         data:image/jpeg;base64,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
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

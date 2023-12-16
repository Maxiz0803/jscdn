// ==UserScript==
// @name         天天开播领奖励
// @namespace    https://space.bilibili.com/52758366
// @version      2.9
// @description  开播设置出现领金仓鼠，背景更换，查看每天开播任务,任务文字变白,前往自己的直播间以及自己主页,展示个人收益,调整了些
// @icon         data:image/png;base64,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
// @author       mxk-zwh
// @match        https://link.bilibili.com/*
// @match        https://link.bilibili.com/p/center/index*
// @match        https://live.bilibili.com/p/html/live-anchor-galaxy/task_center/*
// @match        https://live.bilibili.com/activity/live-activity-full/task_center/mobile.html*
// @grant        GM_xmlhttpRequest
// @grant        GM_addElement
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @connect      pay.bilibili.com
// @connect      api.bilibili.com
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require     https://ghproxy.net/https://raw.githubusercontent.com/mxk-zwh/jscdn/main/asset/echo.min.js
// @require     https://ghproxy.net/https://raw.githubusercontent.com/mxk-zwh/jscdn/main/asset/jquery-ui-1.9.2.custom.min.js
// @require     https://ghproxy.net/https://raw.githubusercontent.com/mxk-zwh/jscdn/main/asset/BilibiliAPI_mod.min.js

// ==/UserScript==
//金仓鼠
const img='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAoWSURBVHgB7VhpcFXlGX6+c87dF3JvEhIhkNUasNAsCoKAQGgdy+IganGpldqOrWXajlbqjMtYFUa0UAtq1XYsjDNWYSwiglJJWQLR0BiSIBCFkJUkN/cmd8ndzt733KA1Lm3C5Ud/+Mx8k9xzzn2/5zzv+l3gG6QHhosAf8sal32cea7OmWTHeOsHjP12CBcJaRMMNtyVX7f/7IFxuZ6C6Yumk0XTmSQvVWZm/i5i3D+249cZXR/WenTNFb9+XbUPY0TaBPc+Of+V5kMf3z7oC2PWDVfiqiWVgGB+1jmpUJSTWFb/t10l8WCYnd+sk+PYPhXapqWPHG4ajX0OacJkEWZl53lhd1nRtO8jqHTNmetdzTT5vtOHjl4a7vUzVVagqRp0XZ+safqPOXDH9jw2b/O+dVWZ/8t+2gSdHpvT5XGgcFoe7tq4Eu4cJ3RVhq5JaKs/ATEhQaKliDJUmbTTNDCeZ578wtW5ZeW79f5tTiLOEqHni+KDz0z+on0BaaJw+vgzyaiYc/k1JbCOs6P69Ua4M92YfnUxwn2DEEwCeIFP/XXnjkPJ3NmYVF4OwWIBNGVmZKD/oBD8axHHcRlMlRDvfmS7bSK3krFHNcN+2graXdxTld8rhtXO48jbLXjj+aMonuqFwKtwZDggiwrMDitKF1Ri4S/vQEHlFPCcCF2OQKOlDAUqtEQ4Q46FETzXj2Q0dpPUFV36qf20FIwfX/UDMPcLOkT0d4fw57VHcOeaq+DNNNOrK1j6m8WQkhop66LPdE0Kwu+LobOlH5VV5RQKQ+RuGbv/uBON1cdIUI2U5rHknmsWkPmdaREcPHLLekBfwwlZpIYfp+p7sXhlKeYvLgIFG92iWONUWKwCdClG/yehMx6vPPE2TESicv506GIYZosMf2cvkdVAbqZUZ+g60SMiHQVPv1x1OxOsa0wTqqArMSix05h/XT4Z5xDoDSMcMaGEkkZTwnSN8po21uneR3XnUPPWCTy3bzWVy3wwg7jahcrvTsFQIErhYoPLY4fHZjqYFsF4KHGnrXgpeC+ppRMHcwa0RC84axa2bdiO/duqsXH/X1BQQOSDDZQMHAnDYev6GsxbUoKc8RLUSBPUeAepLyMvz41Ly/JhJ7XtuvLxgifq96RFUFOEuWZPIVI5RtWXz5iSWq1NH6Ni0RzMun4RLq2YCoO9nvBBjXVAISHtDgHLf3Q5kaIkUX30UvFU+dESIvK95veoWNbJIWnz5/cacxbvf3S+wAlOszYU/tI9k9mEnrNdRvhh75a3YLA3Zc0G0xkEcvVjL1QhL99BYWGQGoAcS0CKxCGG4qSwtm7GQ3UPX/375v7P27ygVtf49HUDU1es8gqFpSOuU8GFIilUWiRwPAerw5a6rg6dgTbUBibYKRw89Bwg+poR6/4EYiSJUHcYsf7YDbPXNuz44l4X5OJowL9BDfSs1R0uhCUGizuOY3tbcKqmjbqGjOX3rUBeaf5nz/OuktQ6/xowdOFdxYi0bUQyHIIYTpKrFctX7XVBBEvuWfJa8+Gz9w00tnlzv+VB3Y42RPwiuWnYIe1NLSMIjsTwM0wwg1lzIMXOQYyKkBUlnBZBvaPG09fWslLwtmQ3H+i6X+WsTqvLgnefa6bdeHIpS21e8J0sTLvWiDMpReLrwSj+IogH45CTCmWD7kuL4EDfyZ/K4kfrT9T2QjU5EY/GUf/uGUoMM4SUFQ6ZE51YsOoyNFV3orxiPFyF3/pqYxSEciwE/8kTiPpjRuz2LNrU0nDBBGs3zvL6T+64cUgREBqkL1HfPbCtAxabbditFFYZXgeW3TsNbQ39NCREYdYC0OM5YBZ7qoAPE6P0NkqMGEfnezsR7BqkSzppyb34dXuPiqAVwjYxIV556FAfZlxbgq0bmqhF/YccZ9cpMWZSh5PQXN2OZb8qg0aBr3U0prqIEQKp2NOoGNK4dbqmBq0fvJ+yzTjuaAaifxg1Qb2r1sYmzU58+vnDp2fdzXStqvawD+UzJuDVTcdoxjOGz2Fyxny38NZiZOYKeOn+97Hi3nJYxCzEwhpMXhVMSw4rR0hGozi8ZQsS4bDx3QDjuWczBPP6OVsCyVERbN+1aXvv2ZYrupvemJs52S6YddxyfOtTPw8Fo0iKKur2d6G/J5IqyKmXIXJTZ2ZhzrIJ2Lf1OEorM5CZzUGiORDwgJt8OYwZTw/7aPlTxGKhIBVubcmK1wK7MQqM6CSib1CJtHYX2NXkWi6aOJAY8K1TxMSko/UDmJBjxdHaPqiqClmSIYlJUBnEktsK4W/1o/4fZzB3cS602BB4azfcBS6kqo7JCpZdAJY1iYghNa3QQBjCKDFCQV3Rz4DXIAajdzBfOxSPQC7UEQqJ4DsZFEUbjnejFZCPZs/LglmN4ZkHG/GTB8oh+gfI59R/VQFqWwNsRUmYc4enHObOhk5kjfZscvLHMEqMUFBhbC99nwonVXY6P0iDA+jsjMEzzoSm48FUKzPcqpGK49w8ykrt2Pd6CwoLzBR3UcTODSDeG4QyoMGcPTH1rNTXPjwf0lKoBZKMrcte6o1jlBhB0GFGva6xWCIQIlfqsLmz0N4Zh0VgCAyKqSZlkNRozZnpRV9HCHWHezFnhhsxfwQJmunEcJzG/SxYJ0yC2ZsF3kyqGXEYpxfw9RqDQw3GgBEEC1c9Stmk7QFNtzIlBWIyiipmIBaVhx8wFKTldgooLXbgn/v7MLMiAyp1AiUuQ6bTG8/GwWkUaFVJqcZZramZT/X3YLC7i2yob2IM+PK4pWtbDKmMAqomEpg/79soqrzisz5roGyqC/2+BKJDMi4rcqQmGONIyekmZJZUwGQj1TR6KWXYtWokCMnfj0BHW5iS7CDGgC8RnHL34+9QoDxJblxBRFuVRBJVC8vw+Ma7kHOJh+KdoXCCBQeO9GP5rdchp+z7EBxZxENH7rSrYR+fe1694aXStCJ1dKDn1Elqj9G/37w9GB4Lwf86DwZ2PTFRU5O76KlyqvjUtgR8ePQkwu2n8K+GPtz2wxthdVHPLXHBxkfguiTvfFtjqV8S5NAQxP5BaJJEZejN4NBAuOzm7b2duFgEDYTefsAjq8KLOmM3GZ85gYNgM1NPpmyNcFQTrXCXFsBtCVJCCBSLIh2iqApEEzC6rBF/ve2faK3NtUtvfNW/B2PEqCdq35sP38MJeIh2vQSpramwJ5keGWTMmp1BBx7Krzgdxo3DByUSR9nLuz1I+DqDpxsO3r5wY+OYyY2JoIHozrU5cSY+yEH7GcWoyThoBwMmOkIKcLjp0C1HRxhmJmtdfCiwsnDVC+24QFzQmaRn94P5vMx+oavq8mhYKJFlBpuTwczFhtWjyCAd1/OZuZtzr70/hjSQ9u+Dp19+eLMis9W8SYk5LGIzlad33Dz7k/vWDQFcBKT961ZY9t1r53IbVWaunnjbunZ8g/8z/BvNnMrISWWdUgAAAABJRU5ErkJggg=='
const taskcenter="https://live.bilibili.com/activity/live-activity-full/task_center/mobile.html?is_live_full_webview=1&no-jump=1&source_event=1#/";
const startLive="https://link.bilibili.com/p/center/index#/my-room/start-live";
const startliveReg=new RegExp("/my-room/start-live");
const taskcenterReg=new RegExp("live-activity-full/task_center");
// const cd=top.window.localStorage.PAGE_REFRESH_CD_CACHE
const mySpace="http://space.bilibili.com/"+GM_getValue('myuid');
const myRoom="http://live.bilibili.com/"+GM_getValue('myroomid');
//用于创建 天天开播领奖励 的按钮
let way={
    //进入任务中心的按钮
    taskcenter:function (){
        var mgll = $('<div>');
        mgll.attr('id', 'task_center_mgll');
        mgll.html('天天开播领奖励');
        mgll.css('left', '161px');
        mgll.css('top', '356px');
        mgll.css('textAlign', 'center');
        $('body').append(mgll);
        this.gototaskcenter()
        $('#task_center_mgll').draggable();
    },
    //任务弄成白色字
    whitetext: function(){
        setTimeout(function() {
            console.log("gray");
            $('.awards-text .awards-title>span').css('color', 'white');
            $('.awards-label').css('color', 'white');
            console.log("white");
        }, 1000);
    },
    //改变背景开播的背景
    changeBG:function(){
        var $app = $('#live-center-app');
        $app.css('background', 'linear-gradient(rgb(255 255 255 / 90%), rgb(41 147 245 / 74%)),url("https://www.loliapi.com/acg/") 0% 0% / cover no-repeat fixed');
        console.log('a');
    },
    //用于创建开播按钮
    startlive: function() {
        if (!$('#live_center_mgll').length) {
            var $mgll = $('<div id="live_center_mgll" class="awards-records slide-in">').html("开 播<br>设 置");
            $('body').append($mgll);
        }
        this.gotolivecenter();
    },
    myRoomBtn: function() {
        if (!$('#b_myroom').length) {
            var $mgll = $('<div id="b_myroom" class="awards-records slide-in">').html("我 的<br>直播间");
            $('body').append($mgll);
            console.log(myRoom);
        }
        this.gomyRoom();
    },
    myMoneyBtn: function() {
        if (!$('#b_mymoney').length) {
            var $mgll = $('<div id="b_mymoney" class="awards-records slide-in">').html('个 人<br>收 益');
            $('body').append($mgll);
        }
        this.getUserWalletInfo();
    },
    mySpaceBtn: function() {
        if (!$('#b_myspace').length) {
            var $mgll = $('<div id="b_myspace" class="awards-records slide-in">').html("我 的<br>主 页");
            $('body').append($mgll);
            console.log(mySpace);
        }
        this.gomySpace();
    },
    gototaskcenter: function() {
        $('#task_center_mgll').on('click', function() {
            window.open(taskcenter, '_self');
        });
    },
    gotolivecenter: function() {
        $('#live_center_mgll').on('click', function() {
            window.open(startLive, '_self');
        });
    },
    gomyRoom: function() {
        $('#b_myroom').on('click', function() {
            window.open(myRoom, '_blank');
        });
    },
    gomySpace: function() {
        $('#b_myspace').on('click', function() {
            window.open(mySpace, '_blank');
        });
    },
    showMoney:async function (a){

        var [total,common,quick]=await this.getAccountBalance();
        console.log(total,common,quick,a)
        var html=`
        <div class="income-info">
            <div class="item">
                <div class="income-detail-wrap">
                    <p class="info-title">贝壳账户</p>
                    <p class="pay-shell-index-num">${a}</p>
                    <p class="info-title">金仓鼠总账户</p>
                    <p class="value">${total.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")}
                       <span class="account-draw-num">（普快总 ${((total-0)/1000).toFixed(1)}元）</span>
                    </p>
                    <p class="info-title">金仓鼠普通用户</p>
                    <p class="value">${common.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")}
                        <span class="account-draw-num">（普本月 ${((common-0)/1000).toFixed(1)}元）</span>
                    </p>
                    <p class="info-title">金仓鼠快捷账户</p>

                    <p class="value">${quick.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")}
                     <span class="account-draw-num">（快未提 ${((quick-0)/1000).toFixed(1)}元）</span>
                     </p>
                    
                </div>
            </div>
        </div>`
        $('body').append(html)
        var flag=false;
        $('#b_mymoney').click(function(){
            if(flag){
                $('.income-info').css({display:''})
            }else{
                $('.income-info').css({display:'block'})
            }
            flag=!flag

        })


    },
    addstyle1:function(){
        // 开播设置 出现入口
        GM_addStyle(`
            #task_center_mgll{
                position: fixed;
                z-index: 1010;
                padding: 6px;
                width: 35px;
                background-color: #ff6699;
                box-shadow: 0 0 15px rgb(0 0 0 / 10%);
                border: 1px solid rgb(227, 229, 231);
                border-radius: 8px;
                font-size: 12px;
                font-weight:bold;
                line-height: 1.15;
                color:white;
                transition: background-color 0.3s ease-out, color 0.3s ease-out;
            }
            #task_center_mgll:before {
                width:25px;
                height: 25px;
                content:"";
                opacity:0.5;
                background-image:url('${img}');
                background-repeat:no-repeat;
                background-size:contain;
                display: inline-block;
            }
            #task_center_mgll:hover:before {
                opacity:1;
            }
            #task_center_mgll:hover {
                background-color:#fc8bab;
                box-shadow: 0 0 30px rgb(0 0 0 / 10%);
                cursor: pointer;
            }
        `)
    },
    addstyle2:function(face,pimg,vipimg){
        // 任务 样式
        GM_addStyle(`
            #live_center_mgll{
                bottom: 4.2rem;
            }
            #b_myroom{
                bottom: 5.9rem;
                color: #fff;
                text-shadow: 0px 1px 4px black;
            }
            #b_myspace{
                bottom: 7.6rem;
                color: #fff;
                text-shadow: 0px 1px 4px black;
            }
            #b_mymoney{
                bottom:9.4rem;
                color: #fff;
                text-shadow: 0px 1px 4px black;
            }
            .has-finish::before {
                content: '🙄';
                font-size: 30px;
            }
            #b_myroom::before,
            #b_myspace::before,
            #b_mymoney::before{
                content: '';
                position: absolute;
                background-image: url(${pimg});
                background-repeat: no-repeat;
                background-position: center;
                background-size: 108% 108%;
                width: 150%;
                height: 150%;

            }
            #b_myroom::after,
            #b_myspace::after,
            #b_mymoney::after {
                content: '';
                background-image: url(${face});
                width: 100%;
                height: 100%;
                border-radius: inherit;
                background-size: cover;
                position: absolute;
                z-index: -1;
            }
            .awards-records{
                box-sizing: border-box;
                width: 1.38667rem;
                height: 1.38667rem;
                font-size: 0.32rem;
                font-weight: 700;
                line-height: 1.5;
                position: fixed;
                right: 0.213333rem;
                color: #fff;
                background: rgb(70, 75, 98);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
            }
            .silde{
                animation: jello-horizontal 0.9s both;
            }
            @keyframes jello-horizontal {
                0% {
                    transform: scale3d(1, 1, 1);
                }
                30% {
                    transform: scale3d(1.25, 0.75, 1);
                }
                40% {
                    transform: scale3d(0.75, 1.25, 1);
                }
                50% {
                    transform: scale3d(1.15, 0.85, 1);
                }
                65% {
                    transform: scale3d(0.95, 1.05, 1);
                }
                75% {
                    transform: scale3d(1.05, 0.95, 1);
                }
                100% {
                    transform: scale3d(1, 1, 1);
                }
            }
            p {
                margin: 0;
                padding: 0;
            }

            .income-info {
                display:none;
                margin-top: 20px;
                margin-bottom: 20px;
                overflow: hidden;
                width: 264px;
                border-radius: 25px;
                position: fixed;
                box-shadow:
              0px 0px 20px rgba(0, 0, 0, 0.21)
            ;
                bottom: 3rem;
                right: 1.7rem;
            }
            .income-info .item {
                position: relative;
                width: 100%;
                padding: 21px;
                border-radius: inherit;
                background-color: #fff;
                box-sizing: border-box;
                border: 1px solid #e9eaec;
            }
            .income-info .item .income-detail-wrap {
                display: inline-block;
                width: 229px;
                vertical-align: top;
            }
            .income-info .item .info-title:nth-child(1)::after{
                content:'';
                background-image: url(${vipimg});
                background-size: cover;
                display: inline-block;
                background-position: center;
                width: 82px;
                height: 18px;
                margin-left: 15px;
            }
            .income-info .item .info-title {
                font-size: 18px;
                line-height: 26px;
                color: #333;
                font-weight: normal;
                vertical-align: bottom;
                position: relative;
            }
            .income-info .item .value {
                font-size: 20px;
                line-height: 37px;
                vertical-align: bottom;
                color: #23aee5;
                margin-bottom: 20px;
                margin-top: 2px;
            }
            .income-info .item .account-draw-num{
                font-size: 14px;
                color: #f7b500;
                font-style: normal;
            }
            .pay-shell-index-num {
                font-size: 38px;
                color: #01b5e7;
                margin-bottom: 20px;
                margin-top: 2px;
                font-weight: 700;
                font-family: Microsoft YaHei,Arial,Helvetica,sans-serif;
            }
            .pay-shell-index-num:after {
                content: "贝壳";
                font-size: 16px;
                font-weight: 400;
                margin-left: 5px;
            }
        `)
    },
    getAccountBalance:async function(){
        try{
            var csrftoken= decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent('bili_jct').replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;

            BAPI.setCommonArgs(csrftoken,'');
            var ai=await BAPI.ajaxWithCommonArgs({
                method: 'POST',
                url: 'xlive/revenue/v1/anchorAccount/getAccountBalance'
            })
            const { month_account: ma, quick_account: qa, total_account: ta } = ai.data.account_info;
            const maString = ma.toString();
            const qaString = qa.toString();
            const taString = ta.toString();
            return [taString,maString,qaString]
        }catch{
            console.log('可能未登录')
        }

    },
    getUserWalletInfo:function(){
        var brokerage;
        GM_xmlhttpRequest({
            method:     "GET",
            url:        `https://pay.bilibili.com/payplatform/getUserWalletInfo?platformType=3`,
            headers: {
                'accept': 'application/json, text/plain, */*',
            },
            onload: (res)=>{
                var json=JSON.parse(res.responseText);
                if (json.msg === 'SUCCESS') {
                    brokerage=json.data.accountInfo.brokerage.toFixed(2)
                    console.log(brokerage)
                    this.showMoney(brokerage)
                }
            },
            onerror:function (){
                console.log(`请求失败`);
            }
        });

    },
    nav:function(){
        var face,pimg,vipimg,mid;
        GM_xmlhttpRequest({
            method:     "GET",
            url:        `https://api.bilibili.com/x/web-interface/nav`,
            headers: {
                'accept': 'application/json, text/plain, */*',
            },
            onload:(res)=>{
                var json=JSON.parse(res.responseText);
                if (json.message === '0') {
                    face=json.data.face;
                    pimg=json.data.pendant.image;
                    mid=json.data.mid
                    console.log(mid)
                    GM_setValue('myuid',mid)
                    vipimg=json.data.vip.label.img_label_uri_hans_static;
                    this.addstyle2(face,pimg,vipimg);
                }
            },
            onerror:function (){
                console.log(`请求失败`);
            }
        });

    },
    start:function(){
        let urlcheck1=taskcenterReg.test(location.href)
        try{
            let router=document.querySelector('#live-center-app').__vue__.$router
            let urlcheck=startliveReg.test(top.location.href)
            router.afterHooks.push((to,from)=>{
                urlcheck=startliveReg.test(to.fullPath)
                if(urlcheck){
                    this.addstyle1()
                    this.taskcenter()
                    this.changeBG()
                    setTimeout(function() {
                        var myroomid = top.document.querySelector('#live-center-app a.blink.blue').innerText
                        GM_setValue('myroomid',myroomid)
                        myroomid=null;
                    }, 2500);
                }else{
                    $('#task_center_mgll').remove();
                }
            })
        }catch(e){
            console.log('不存在1',e)
        }
        try{
            if(urlcheck1){
                this.nav()
                this.startlive()
                this.myRoomBtn()
                this.mySpaceBtn()
                this.myMoneyBtn()
                this.whitetext();
            }
        }catch(e){
            console.log('不存在2')
        }

    }
}
$(document).ready(function() {
    way.start()
});


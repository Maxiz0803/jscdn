// ==UserScript==
// @name         天天开播领奖励
// @namespace    https://space.bilibili.com/52758366
// @version      2.6
// @description  开播设置出现领金仓鼠，背景更换，查看每天开播任务,任务文字变白,前往自己的直播间以及自己主页
// @author       mxk-zwh
// @match        https://link.bilibili.com/*
// @match        https://link.bilibili.com/p/center/index*
// @match        https://live.bilibili.com/p/html/live-anchor-galaxy/task_center/*
// @match        https://live.bilibili.com/activity/live-activity-full/task_center/mobile.html*
// @icon         data:image/png;base64,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
// @grant        GM_addElement
// @grant        GM_addStyle
// @require       https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://cdn.jsdelivr.net/gh/mxk-zwh/jscdn/asset/echo.min.js
// @require      https://cdn.jsdelivr.net/gh/mxk-zwh/jscdn/asset/jquery-ui-1.9.2.custom.min.js
// @require      https://cdn.jsdelivr.net/gh/andywang425/BLTH/assets/js/library/BilibiliAPI_Mod.min.js

// ==/UserScript==
//金仓鼠
const img='data:image/png;base64,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'
const taskcenter="https://live.bilibili.com/activity/live-activity-full/task_center/mobile.html?is_live_full_webview=1&no-jump=1&source_event=1#/";
const startLive="https://link.bilibili.com/p/center/index#/my-room/start-live";
const startliveReg=new RegExp("#/my-room/start-live");
const taskcenterReg=new RegExp("live-activity-full/task_center");
const cd=top.window.localStorage.PAGE_REFRESH_CD_CACHE
const myroomid=cd&&cd.split('"')[1].split('_')[0];
const myuid=cd&&cd.split('"')[1].split('_')[1];
const myRoom="http://live.bilibili.com/"+myroomid;
const mySpace="http://space.bilibili.com/"+myuid;
//用于创建 天天开播领奖励 的按钮
let way={
    taskcenter:function (data){
        let mgll=document.createElement("div");

        mgll.id="task_center_mgll";
        mgll.innerHTML=data;
        mgll.style.left='161px'
        mgll.style.top='356px'
        mgll.style.textAlign="center";
        document.body.appendChild(mgll);

        way.gototaskcenter()
        $('#task_center_mgll').draggable();
    },

    whitetext: ()=>{
        setTimeout(()=>{
            console.log("gray")
            let i,j;
            let a = document.querySelectorAll(".awards-text .awards-title>span");
            for(i=0;i<a.length;i++){
                a[i].style.color="white";
                console.log(i)
            }
            let b = document.querySelectorAll("span.awards-label");
            for(j=0;j<b.length;j++){
                b[j].style.color="white";
            }
            console.log("white")
        },1e3)
    },
    changeBG:()=>{
        let app=document.querySelector('#live-center-app');
        app.style.background=
            `linear-gradient(rgb(255 255 255 / 90%), rgb(41 147 245 / 74%)),url('https://www.loliapi.com/acg/') 0% 0% / cover no-repeat fixed`;
        console.log('a')
    },
    //用于创建开播按钮
    startlive:function (data){
        let mgll=document.createElement("div");
        let test=document.getElementById("live_center_mgll")
        mgll.id="live_center_mgll";
        mgll.className="awards-records slide-in"
        mgll.innerHTML=data;
        if(!test){
            document.body.appendChild(mgll);
        }
        way.gotolivecenter()
    },
    //创建前往本人直播间的按钮
    myRoomBtn:function (data){
        console.log(111)
        let mgll=document.createElement("div");
        let test=document.getElementById("b_myroom");
        mgll.id="b_myroom";
        mgll.className="awards-records slide-in"
        mgll.innerHTML=data;
        if(!test){
            document.body.appendChild(mgll);
            console.log(myRoom)
        }
        way.gomyRoom()

    },
    mySpaceBtn:(data)=>{
        let mgll=document.createElement("div");
        let test=document.getElementById("b_myspace");
        mgll.id="b_myspace";
        mgll.className="awards-records slide-in"
        mgll.innerHTML=data;
        if(!test){
            document.body.appendChild(mgll);
            console.log(mySpace)
        }
        way.gomySpace()
    },
    //点击按钮 跳转指定链接
    gototaskcenter:function (){
        let div=document.querySelector("#task_center_mgll")
        div.onclick=()=>{
            window.open(taskcenter,'_self')
        }
    },
    gotolivecenter:function (){
        let div=document.querySelector("#live_center_mgll")
        div.onclick=()=>{
            window.open(startLive,'_self')
        }
    },
    gomyRoom:function (){
        let mr=document.querySelector("#b_myroom")
        mr.onclick=()=>{
            window.open(myRoom,'_blank')
        }
    },
    gomySpace:function (){
        let ms=document.querySelector("#b_myspace")
        ms.onclick=()=>{
            window.open(mySpace,'_blank')
        }
    },
    addstyle1:()=>{
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
    addstyle2:()=>{
        GM_addStyle(`
            #live_center_mgll{
                bottom: 4.0rem;
            }
            #b_myroom{
                bottom: 5.6rem;
            }
            #b_myspace{
                bottom: 7.2rem;
            }
            .has-finish::before {
                content: '🙄';
                font-size: 30px;
            }
            .awards-records{
                box-sizing: border-box;
                width: 1.38667rem;
                height: 1.38667rem;
                font-size: 0.32rem;
                line-height: 1.5;
                position: fixed;
                right: 0.213333rem;
                color: rgb(255, 255, 255);
                background-color: rgb(70, 75, 98);
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

        `)
    },
    getAccountBalance:async()=>{
        BAPI.setCommonArgs('6a945c778cf93ec025300fa8be4dfcb8','');
        var ai=await BAPI.ajaxWithCommonArgs({
            method: 'POST',
            url: 'xlive/revenue/v1/anchorAccount/getAccountBalance'
        })
        var ma=ai.data.account_info.month_account.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")
        var qa=ai.data.account_info.quick_account.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")
        // var qal=ai.data.account_info.quick_account_lock
        var ta=ai.data.account_info.total_account.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")
        var text=`
           金仓鼠总账户
           ${ta}
           金仓鼠普通账户
           ${ma}
           金仓鼠快捷账户
           ${qa}

        `
        console.log(text)
    },
    start:()=>{
        let urlcheck=startliveReg.test(location.href)
        let urlcheck1=taskcenterReg.test(location.href)
        if(urlcheck){
            way.addstyle1()
            way.taskcenter("天天开播领奖励")
            way.changeBG()

        }
        if(urlcheck1){
            way.addstyle2();
            way.startlive("开播<br>设置")
            way.myRoomBtn("我的<br>直播间")
            way.mySpaceBtn("我的<br>主页")
            way.whitetext();

        }
        way.getAccountBalance()
    }
}

way.start()

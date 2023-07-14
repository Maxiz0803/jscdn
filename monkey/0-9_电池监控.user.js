// ==UserScript==
// @name         电池监控🪫
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  胶囊型电量显示 ,不阻碍点击，低电量页面提示/系统通知，尝试解决http不支持方案，防止被导航栏遮住
// @author       mxk-zwh
// @match        https://*/*
// @match        http://*/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAmCAYAAAC29NkdAAACWklEQVRYhe2YMU/bQBTH/3dJm0JBbS01hXoAIadKBw+MbQeGfoKuLB1ZWVkY+i06sDD0E3RgYchCVQZQCQhQM1SVUnUoqcAqbgH7eCZYcuO7cImTYJD/kiPr7Of7+d17z/fCBAkpFr9ugKuUASZVBphUqQfMa911KlD9TocDnIVjdwD7McN0kcltPIFanWwagBOO5YAJg+GVyTQnBtjVdVBgdd3Hiiu/Om3lMGvGx6tbHpZ/y23MpxzzJcWL6QK6Bz5WfwAN8sS3w4gXWpQvMDy/Fx+vOwINX2EUeH+YvFgAZqY4zEJHgLQ0Oz7e/1Ib9Vovyxxvnsg9Gk8SipvlAcIFWvtKserJr8VitXogEIbbBMXK7Fj/wDb3Kbb/4CKhqj9p2SWxHAN0I28ySRlnjPYPsHwfTcBg3jP5PQOogwIrnz0sfvGhKARtNRDA+l/y0DFVhC6s9eolxYhDE5y2jlPiGSPqQh3ahKvnBKWnnU13gAIfPvnYVGSZaVLRtVonFKhs+Ph4HBk6EVjaaFa0IYPjna0HqeVB+wFQO5Jc4Az2Q9lEDBaNGwQVeNC5dOFQvjmh9UiLTReQIOwcbP1nXsgscSyUgjMfSxWBvbsMcy/oq9Hhc27JbiaRaPcyTh4dZR17L9BAAMvP6OjSOvVLnAEmVVtA1Qe8V3IVxT+qWJJYI/RzWZTX9z3s1npMFZETccCkIb8nBmjQFnyGtvuVfwi+WP89pF8qFjleK7Z18p6EurjKNvUk1Ii4/fxribq88hjHW0vd5Wl0dderm53FaVAGmFQZYFKlHvAc2/G61yINYTgAAAAASUVORK5CYII=
// @require      https://static.hdslb.com/js/jquery.min.js
// @require      https://raw.kgithub.com/mxk-zwh/jscdn/main/message.js
// @resource css https://raw.kgithub.com/mxk-zwh/jscdn/main/message.css
// @connect      hamibot.cn
// @run-at       document-body
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_notification
// @grant        GM_getResourceText
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

// 低电量
var low=30
var i=1;
var baifenhao='<svg  class="uuuu" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="33" height="29" viewBox="0 0 33 29" fill="none"><g opacity="1"  transform="translate(0 0)  rotate(0)"><path id="圆形 1" fill-rule="evenodd" style="fill:#FFFFFF" opacity="1" d="M7,3.77c-1.62,0 -2.94,1.22 -2.94,2.73c0,1.51 1.32,2.73 2.94,2.73c1.62,0 2.94,-1.22 2.94,-2.73c0,-1.51 -1.32,-2.73 -2.94,-2.73zM14,6.5c0,3.59 -3.13,6.5 -7,6.5c-3.87,0 -7,-2.91 -7,-6.5c0,-3.59 3.13,-6.5 7,-6.5c3.87,0 7,2.91 7,6.5z"></path><path id="圆形 1" fill-rule="evenodd" style="fill:#FFFFFF" opacity="1" d="M26,19.77c-1.62,0 -2.94,1.22 -2.94,2.73c0,1.51 1.32,2.73 2.94,2.73c1.62,0 2.94,-1.22 2.94,-2.73c0,-1.51 -1.32,-2.73 -2.94,-2.73zM33,22.5c0,3.59 -3.13,6.5 -7,6.5c-3.87,0 -7,-2.91 -7,-6.5c0,-3.59 3.13,-6.5 7,-6.5c3.87,0 7,2.91 7,6.5z"></path><path id="路径 2" fill-rule="evenodd" style="fill:#FFFFFF" opacity="1" d="M9 27.5L28.5 1L24 1L4.5 27.5L9 27.5Z"></path><path  id="路径 2" style="fill:#FFFFFF; opacity:1;" d="M8.59728,27.2037l19.50002,-26.50004l0.4027,0.29634v0.5h-4.5v-0.5l0.4027,0.29634l-19.49998,26.49996l-0.40272,-0.2963v-0.5h4.5v0.5zM9.25286,28h-5.74156l20.2358,-27.5h5.7416l-20.08598,27.2963z"></path></g></svg>'
// 闪电图标
var icon='<svg xmlns="http://www.w3.org/2000/svg" class="vvvv" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="50" viewBox="0 0 28 50" fill="none"><path id="路径 1" fill-rule="evenodd" style="fill:#FFFFFF" opacity="1" d="M4.25 21.7106L11.3 21.7106C12.16 21.7006 12.63 22.7206 12.06 23.3706L1.44 35.5506C0.87 36.2006 1.34 37.2206 2.2 37.2106L10.13 37.2106C10.8 37.2106 11.28 37.8706 11.08 38.5106L7.5 49.7106L25.44 30.3906C26.03 29.7506 25.58 28.7106 24.71 28.7106L17.8 28.7106C16.93 28.7106 16.48 27.6706 17.07 27.0306L27.93 15.3906C28.52 14.7506 28.07 13.7106 27.2 13.7106L18.73 13.7106C18.1 13.7106 17.62 13.1306 17.75 12.5106L20 1.71063L3.5 20.0406C2.92 20.6906 3.38 21.7206 4.25 21.7106Z"></path></svg>'
// 网页内 消息提示 new一个
const message = new Message();
// 日期 缺零 补全
function dateFilter(date) {
    if (date < 10) {
        return "0" + date;
    }
    return date;
}
function jieliu(fn,delay){
    let timer=null
    return function(){
        const context=this;
        const args=arguments;
        if(!timer)
        {
            timer=setTimeout(function(){
                fn.apply(context,args);
                timer=null;
            },delay)
        }
    }
}
function BatteryLog(value){
    let bg_color,txt_color;
    if(value>low*2){
        bg_color='rgb(240,255,240)';
        txt_color='rgb(46,220,54)';
    }else if(value>low){
        bg_color='rgb(255,255,240)';
        txt_color='rgb(220,200,46)';
    }else{
        bg_color='rgb(255,240,240)';
        txt_color='rgb(220,54,46)';
    }
    console.log('%c 电量水平变化:'+value+ ' ',`background-color:${bg_color};border-radius:15px;padding:5px;font-weight:bold;color:${txt_color};border:1px solid ${txt_color};`)
}
// 电脑 系统 消息
var notification={
    warn:{
        text:"主人，电脑该充电了喵~",
        title:"低电量提醒",
        timeout:10000,
        image:"https://i0.hdslb.com/bfs/face/93bba0fb2fc3c1ad1ead9a5e4db031ef36f532d5.jpg"
    }
    ,danger:{
        text:"主人，电脑快没电了喵~",
        title:"低电量提醒",
        timeout:10000,
        image:"https://i0.hdslb.com/bfs/face/ba9ce36ef60a53e24a97f54429e62bdb951530a0.jpg"
    }
    ,success:{
        text:"主人，电脑快充满了喵~",
        title:"充满电提醒",
        timeout:10000,
        image:"https://c-ssl.dtstatic.com/uploads/blog/202207/05/20220705231022_cac23.thumb.400_0.jpeg"
    }
}
var way={
    battery:()=>{
        var pt = document.querySelector('.batteryShape .battery .bbb .ccc');// 电量
        var p = document.querySelector('.batteryShape .battery .dianliang');// 电量值
        try{
            // https
            navigator.getBattery().then(function(battery) {
                var time,cname,txtcolor;
                time=(
                    battery.dischargingTime!='Infinity'?
                    "剩余："+parseInt(battery.dischargingTime/3600)+'h'+parseInt(battery.dischargingTime%3600/60)+'m'+(battery.dischargingTime%3600%60)+'s'
                    :"可用（电源已接通）"
                )// 还能用多久
                //电量
                var value=battery.level
                var bfvalue=parseInt(value * 100)
                if(bfvalue){ GM_setValue('电量',bfvalue)}
                pt.style.width = bfvalue + "%";
                p.innerHTML = bfvalue
                //充电状态
                var charging = battery.charging ? "yes" : "no";
                if(charging){ GM_setValue('充电吗',charging)}
                if (charging === "yes"){
                    //充电颜色
                    pt.style.background="#49b216";
                    document.querySelector('.batteryShape .battery .batteryTime .vvvv').style.display = '';
                }else {
                    pt.style.background="";
                    document.querySelector('.batteryShape .battery .batteryTime .vvvv').style.display = "none";
                }
                //电量变化
                battery.addEventListener("levelchange", function(e) {
                    //电量
                    value=battery.level
                    bfvalue=parseInt(value * 100)
                    if(bfvalue){ GM_setValue('电量',bfvalue)}
                    BatteryLog(bfvalue)
                    pt.style.width = bfvalue + "%";
                    p.innerHTML = bfvalue
                    //电量系统通知 一次: 充满 没电
                    var cd = battery.charging?'yes':'no';
                    if (cd == 'yes'){
                        if (bfvalue>98){
                            GM_notification(notification.success)
                        }
                    }else {
                        jieliu(function(){
                            if (bfvalue==40){
                                GM_notification(notification.danger)
                                message.show({
                                    type: 'danger',
                                    text: "快没电了，快去充电啊~"
                                });
                            }
                            if(bfvalue<=low){
                                //低电量颜色
                                pt.style.background="#dc362e";
                                GM_notification(notification.warn)
                                message.show({
                                    type: 'warning',
                                    text: "电量少，快去充电啊~"
                                });
                            }
                        },3000)
                    }
                }, false);
                // 充电变化 页面内通知 一次:在充 没充
                battery.addEventListener("chargingchange", function (e) {
                    var cd = battery.charging?'yes':'no';
                    if(cd){ GM_setValue('充电吗',cd)}
                    if (cd == 'yes'){
                        message.show({
                            type: 'success',
                            text: "在充电"
                        });
                        //充电颜色
                        pt.style.background="#49b216";
                        document.querySelector('.batteryShape .battery .batteryTime .vvvv').style.display = "";

                    }else {
                        pt.style.background="";
                        document.querySelector('.batteryShape .battery .batteryTime .vvvv').style.display = "none";

                    }
                }, false);
            });
        }catch{
            // http 
            console.log('第一个失败，尝试第二个')
            setInterval(()=>{
                //电量
                var bfvalue=GM_getValue('电量')
                pt.style.width = bfvalue + "%";
                p.innerHTML = bfvalue
                BatteryLog(bfvalue);
                var cd=GM_getValue('充电吗')
                //充电
                if (cd == 'yes'){
                    //充电颜色
                    pt.style.background="#49b216";
                    document.querySelector('.batteryShape .battery .batteryTime .vvvv').style.display = "";
                }else {
                    pt.style.background="";
                    document.querySelector('.batteryShape .battery .batteryTime .vvvv').style.display = "none";
                }
            }, 10000);
        }
        //上下切换
        var counter=0;
        $('.batteryShape').bind("click", function() {
            counter++ % 2 ?
                (function() {
                $('.batteryShape').css("top",0);
                $('.batteryShape').css("bottom","unset");
                $('.batteryShape').css("border-bottom","1px solid #000dff");
                $('.batteryShape').css("border-top","unset");
            }()) :
            (function() {
                $('.batteryShape').css("bottom",0);
                $('.batteryShape').css("top","unset");
                $('.batteryShape').css("border-top","1px solid #000dff");
                $('.batteryShape').css("border-bottom","unset");
            }());
        });

    },
    html:function (){
        var html=`
        <link rel="stylesheet" href="//at.alicdn.com/t/font_1117508_wxidm5ry7od.css">
        <div class="batteryShape bflex">
            <div class="left bflex">
                <div class="ampm"></div>
                <div id="myclock"></div>
            </div>
            <div class="center">
            </div>
            <div class="right bflex">
                <div class="battery bflex">
                    <div class="bbb bflex">
                        <div class="ccc"></div>

                    </div>
                    <div class="batteryTime">
                    ${icon}
                    </div>
                    <div class="shabi">
                        <div class="dianliang">99</div>
                        <div class="baifenhao">${baifenhao}</div>
                    </div>
                </div>
            </div>
        </div>
        `
        $('body').append(html)
    },
    css:function (){
        GM_addStyle(`
             .batteryShape{
                    top: 0;
                    left: 0;
                    right: 0;
                    opacity: 0;
                    position: fixed;
                    z-index:8002;
                    width: 100%;
                    height: 36px;
                    margin: 0px;
                    color: #fff;
                    background-color: rgb(76 8 229 / 25%);
                    box-sizing: content-box;
                    border-bottom: 1px solid #000dff;
                    backdrop-filter: blur(10px);
                    justify-content: space-between;
                    transition: all .3s ease;
                }
                .batteryShape:hover{
                    opacity: 1;
                }
                .bflex{
                    display: flex;
                    align-items: center;
                }
                .batteryShape .left .ampm {
                    margin-left: 5px;
                    font-weight: bold;
                    letter-spacing: 1px;
                }
                .batteryShape .left #myclock{
                font-weight: bold;
                }
                .batteryShape .right .battery{
                     margin-right: 5px;

                }
                .shabi{
                    display:flex;
                }
                .batteryShape .right .battery .dianliang{
                    font-weight: bold;
                    font-size: 15px;
                    text-align: center;
                }
                .batteryShape .right .battery .baifenhao{
                    font-weight: bold;
                    font-size: 8px;
                    text-align: center;
                    display: flex;
                    height: 17px;
                    align-items: center;
                }
                .batteryShape .right .bbb{
                    margin-left: 5px;
                    margin-right: 5px;
                    width: 28px;
                    height: 10px;
                    border-radius: 10px!important;
                    border:2px solid #ed333300;
                    outline: 3px solid #fff;
                    box-sizing: content-box;
                    overflow: hidden;
                }
                .batteryShape .right .ccc{
                    height: 15px;
                    background: white;
                    background-size: 38px 26px;
                    box-sizing: content-box;
                    position: relative;
                    z-index: -1;
                    width: 100%;
                }
                .batteryShape .right .batteryTime{
                    font-size:20px;
                    display: flex;
                    align-items: center;
                }
                svg.vvvv {
                    width: 0.6em;
                    height: 0.7em;
                    fill: currentcolor;
                    overflow: hidden;
                    animation: infinite 3s blink;
                }
                svg.uuuu {
                    width: 1em;
                    height: 1em;
                    fill: currentcolor;
                }
                @keyframes blink {
                    0%{opacity: 0;}
                    60%{opacity: 1;}
                    100%{opacity: 0;}
                }
                @media screen and (width: 600px) {
                    body {
                        color: red;
                    }
                }
        `)
        GM_addStyle(GM_getResourceText("css"));
    },
    fun_clock:function(){
        var today = new Date();

        var month = today.getMonth() + 1;
        var date = today.getDate();
        var hour = today.getHours(); //获得小时、分钟、秒
        var minute = today.getMinutes();

        var weekday = 0;
        var ampm = document.querySelector(".batteryShape .left .ampm");
        if (hour < 6) {
            ampm.innerHTML = "凌晨";
        } else if (hour < 9) {
            ampm.innerHTML = "早上";
        } else if (hour < 12) {
            ampm.innerHTML = "上午";
        } else if (hour < 14) {
            ampm.innerHTML = "中午";
        } else if (hour < 17) {
            ampm.innerHTML = "下午";
        } else if (hour < 19) {
            ampm.innerHTML = "晚上";
        } else {
            ampm.innerHTML = "晚上";
        }

        switch (today.getDay()) {
            case 0:
                weekday = "星期日";
                break;
            case 1:
                weekday = "星期一";
                break;
            case 2:
                weekday = "星期二";
                break;
            case 3:
                weekday = "星期三";
                break;
            case 4:
                weekday = "星期四";
                break;
            case 5:
                weekday = "星期五";
                break;
            case 6:
                weekday = "星期六";
                break;
        }
        if (hour>12) //按12小时制显示  在前端页面用html做一个简单的时间显示（12小时制）
        {
            hour=hour-12;
        }
        /*设置当前时间*/
        document.getElementById("myclock").innerHTML =
            hour +
            ":"+
            dateFilter(minute) +
            "    "+
            month +
            "月" +
            date +
            "日" +
            weekday;
    }
}
// 只允许1次
if(i==1){
    way.css();
    way.html();
    way.battery()
    setInterval(()=>{way.fun_clock()}, 1000);
    i++;
}
// b..Shape 整个   left    时钟    right 电量
// .bbb 电池形状   b..Time 闪电

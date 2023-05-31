// ==UserScript==
// @name         电池监控🪫
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  胶囊型电量显示 ,不阻碍点击，低电量页面提示/系统通知，尝试解决http不支持方案，防止被导航栏遮住，换掉难看的背景
// @author       mxk-zwh
// @match        https://*/*
// @match        http://*/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAmCAYAAAC29NkdAAACWklEQVRYhe2YMU/bQBTH/3dJm0JBbS01hXoAIadKBw+MbQeGfoKuLB1ZWVkY+i06sDD0E3RgYchCVQZQCQhQM1SVUnUoqcAqbgH7eCZYcuO7cImTYJD/kiPr7Of7+d17z/fCBAkpFr9ugKuUASZVBphUqQfMa911KlD9TocDnIVjdwD7McN0kcltPIFanWwagBOO5YAJg+GVyTQnBtjVdVBgdd3Hiiu/Om3lMGvGx6tbHpZ/y23MpxzzJcWL6QK6Bz5WfwAN8sS3w4gXWpQvMDy/Fx+vOwINX2EUeH+YvFgAZqY4zEJHgLQ0Oz7e/1Ib9Vovyxxvnsg9Gk8SipvlAcIFWvtKserJr8VitXogEIbbBMXK7Fj/wDb3Kbb/4CKhqj9p2SWxHAN0I28ySRlnjPYPsHwfTcBg3jP5PQOogwIrnz0sfvGhKARtNRDA+l/y0DFVhC6s9eolxYhDE5y2jlPiGSPqQh3ahKvnBKWnnU13gAIfPvnYVGSZaVLRtVonFKhs+Ph4HBk6EVjaaFa0IYPjna0HqeVB+wFQO5Jc4Az2Q9lEDBaNGwQVeNC5dOFQvjmh9UiLTReQIOwcbP1nXsgscSyUgjMfSxWBvbsMcy/oq9Hhc27JbiaRaPcyTh4dZR17L9BAAMvP6OjSOvVLnAEmVVtA1Qe8V3IVxT+qWJJYI/RzWZTX9z3s1npMFZETccCkIb8nBmjQFnyGtvuVfwi+WP89pF8qFjleK7Z18p6EurjKNvUk1Ii4/fxribq88hjHW0vd5Wl0dderm53FaVAGmFQZYFKlHvAc2/G61yINYTgAAAAASUVORK5CYII=
// @require      https://static.hdslb.com/js/jquery.min.js
// @require      https://raw.iqiq.io/mxk-zwh/jscdn/main/message.js
// @resource css https://raw.iqiq.io/mxk-zwh/jscdn/main/message.css
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
var low=50
var i=1;
// 闪电图标
var icon='<svg class="vvvv"  style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2257"><path d="M719.383063 459.766775h-144.688432l28.505946-212.18018a4.612613 4.612613 0 0 0-8.210451-3.431784l-245.132685 317.347748a11.236324 11.236324 0 0 0 8.893118 18.099891h144.688432l-28.505946 212.180181a4.612613 4.612613 0 0 0 8.21045 3.431783l245.132685-317.347747a11.236324 11.236324 0 0 0-8.893117-18.099892z" p-id="2258"></path></svg>'
// 时间冒号 闪烁
var flag=true
// 网页内 消息提示 new一个
const message = new Message();
// 日期 缺零 补全
function dateFilter(date) {
    if (date < 10) {
        return "0" + date;
    }
    return date;
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
        var p = document.querySelector('.batteryShape .battery .percent');// 电量值
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
                p.innerHTML = bfvalue + "%"
                //充电
                var charging = battery.charging ? "yes" : "no";
                if(charging){ GM_setValue('充电吗',charging)}
                if (charging === "yes"){
                    document.querySelector('.batteryShape .battery .batteryTime .vvvv').style.display = '';
                }else {
                    document.querySelector('.batteryShape .battery .batteryTime .vvvv').style.display = "none";
                }
                //电量变化
                battery.addEventListener("levelchange", function(e) {
                    //电量
                    value=battery.level
                    bfvalue=parseInt(value * 100)
                    if(bfvalue){ GM_setValue('电量',bfvalue)}
                    console.log("电量水平变化: ", bfvalue);
                    pt.style.width = bfvalue + "%";
                    p.innerHTML = bfvalue + "%"
                    //电量系统通知 一次: 充满 没电
                    var cd = battery.charging?'yes':'no';
                    if (cd == 'yes'){
                        if (bfvalue>98){
                            GM_notification(notification.success)
                        }
                    }else {
                        if (bfvalue==40){
                            GM_notification(notification.danger)
                            message.show({
                                type: 'danger',
                                text: "快没电了，快去充电啊~"
                            });
                        }
                        if(bfvalue==low){
                            GM_notification(notification.warn)
                            message.show({
                                type: 'warning',
                                text: "电量少，快去充电啊~"
                            });
                        }
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
                        document.querySelector('.batteryShape .battery .batteryTime .vvvv').style.display = "";
                    }else {
                        document.querySelector('.batteryShape .battery .batteryTime .vvvv').style.display = "none";
                    }
                }, false);
            });
        }catch{
            // http set-get
            console.log('第一个失败，尝试第二个')
            setInterval(()=>{
                //电量
                var bfvalue=GM_getValue('电量')
                pt.style.width = bfvalue + "%";
                p.innerHTML = bfvalue + "%"
                console.log("电量水平变化: ", bfvalue);
                var cd=GM_getValue('充电吗')
                //充电
                if (cd == 'yes'){
                    document.querySelector('.batteryShape .battery .batteryTime .vvvv').style.display = "";
                }else {
                    document.querySelector('.batteryShape .battery .batteryTime .vvvv').style.display = "none";
                }
            }, 10000);
        }
        //避免挡住 上下跳
        var counter=0;
        $('.batteryShape').bind("click", function() {
            counter++ % 2 ?
                (function() {
                $('.batteryShape').css("top",0);
                $('.batteryShape').css("bottom","unset");
            }()) :
            (function() {
                $('.batteryShape').css("bottom",0);
                $('.batteryShape').css("top","unset");
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
                        <div class="batteryTime">${icon}</div>
                    </div>
                    <div class="percent">
                    ？%
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
                    width: 100%;
                    height: 36px;
                    border-radius: 10px;
                    margin: 0px;
                    background-color: #f08181;
                    opacity: 0.1;
                    position: fixed;
                    z-index:8002;
                    top: 0;
                    left: 0;
                    right: 0;
                    color: #fff;
                    font: 14px/1 'Microsoft Yahei',sans-serif,Arial,Verdana;
                    font-weight: bolder;
                    box-sizing: content-box;
                    justify-content: space-between;
                    transition: all .3s ease;
                }
                .batteryShape:hover{
                    opacity: 0.8;
                    filter: brightness(120%);
                }
                .bflex{
                    display: flex;
                    align-items: center;
                }
                .batteryShape .left .ampm {
                    margin-left: 5px;
                    letter-spacing: 1px;
                }
                .batteryShape .left #myclock{
                }
                .batteryShape .right .battery{
                     margin-right: 5px;

                }
                .batteryShape .right .battery .percent{
                }

                .batteryShape .right .bbb{
                    margin-left: 5px;
                    margin-right: 5px;
                    width: 28px;
                    height: 10px;
                    border-radius: 10px;
                    border:2px solid #ed333300;
                    outline: 3px solid #fff;
                    box-sizing: content-box;
                    overflow: hidden;
                }
                .batteryShape .right .ccc{
                    height: 15px;
                    background: linear-gradient(to right, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #007fff);
                    box-sizing: content-box;
                    position: relative;
                    z-index: -1;
                    width: 100%;
                }
                .batteryShape .right .batteryTime{
                    color: #f3f3f3;
                    position:absolute;
                    font-size:27px;
                }
                svg.vvvv {
                    width: 1em;
                    height: 1em;
                    vertical-align: middle;
                    fill: currentcolor;
                    overflow: hidden;
                    animation: infinite 3s blink;
                }
                @keyframes blink {
                    0%{opacity: 0.5;}
                    60%{opacity: 1;}
                    100%{opacity: 0.5;}
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
            (flag?":":" ")+
            dateFilter(minute) +
            "    " +
            weekday+
            "    "+
            month +
            "月" +
            date +
            "日 ";
        flag=!flag
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

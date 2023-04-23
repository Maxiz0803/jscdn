// ==UserScript==
// @name         电池监控🪫
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  低电量通知
// @author       mxk-zwh
// @match        https://*/*
// @match        http://*/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAmCAYAAAC29NkdAAACWklEQVRYhe2YMU/bQBTH/3dJm0JBbS01hXoAIadKBw+MbQeGfoKuLB1ZWVkY+i06sDD0E3RgYchCVQZQCQhQM1SVUnUoqcAqbgH7eCZYcuO7cImTYJD/kiPr7Of7+d17z/fCBAkpFr9ugKuUASZVBphUqQfMa911KlD9TocDnIVjdwD7McN0kcltPIFanWwagBOO5YAJg+GVyTQnBtjVdVBgdd3Hiiu/Om3lMGvGx6tbHpZ/y23MpxzzJcWL6QK6Bz5WfwAN8sS3w4gXWpQvMDy/Fx+vOwINX2EUeH+YvFgAZqY4zEJHgLQ0Oz7e/1Ib9Vovyxxvnsg9Gk8SipvlAcIFWvtKserJr8VitXogEIbbBMXK7Fj/wDb3Kbb/4CKhqj9p2SWxHAN0I28ySRlnjPYPsHwfTcBg3jP5PQOogwIrnz0sfvGhKARtNRDA+l/y0DFVhC6s9eolxYhDE5y2jlPiGSPqQh3ahKvnBKWnnU13gAIfPvnYVGSZaVLRtVonFKhs+Ph4HBk6EVjaaFa0IYPjna0HqeVB+wFQO5Jc4Az2Q9lEDBaNGwQVeNC5dOFQvjmh9UiLTReQIOwcbP1nXsgscSyUgjMfSxWBvbsMcy/oq9Hhc27JbiaRaPcyTh4dZR17L9BAAMvP6OjSOvVLnAEmVVtA1Qe8V3IVxT+qWJJYI/RzWZTX9z3s1npMFZETccCkIb8nBmjQFnyGtvuVfwi+WP89pF8qFjleK7Z18p6EurjKNvUk1Ii4/fxribq88hjHW0vd5Wl0dderm53FaVAGmFQZYFKlHvAc2/G61yINYTgAAAAASUVORK5CYII=
// @require      https://static.hdslb.com/js/jquery.min.js
// @connect      hamibot.cn
// @run-at       document-body
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==
//hamibot robotid  hmp
var low=30
var i=1;
var icon='<svg class="vvvv"  style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2257"><path d="M719.383063 459.766775h-144.688432l28.505946-212.18018a4.612613 4.612613 0 0 0-8.210451-3.431784l-245.132685 317.347748a11.236324 11.236324 0 0 0 8.893118 18.099891h144.688432l-28.505946 212.180181a4.612613 4.612613 0 0 0 8.21045 3.431783l245.132685-317.347747a11.236324 11.236324 0 0 0-8.893117-18.099892z" p-id="2258"></path></svg>'
var flag=true

function dateFilter(date) {
    if (date < 10) {
        return "0" + date;
    }
    return date;
}

/*设置调用间隔*/


var way={
    battery:()=>{
        var pt = document.querySelector('.batteryShape .battery .bbb .ccc');
        var p = document.querySelector('.batteryShape .battery .percent');
        navigator.getBattery().then(function(battery) {
            var time,cname,txtcolor;
            time=(
                battery.dischargingTime!='Infinity'?
                "剩余："+parseInt(battery.dischargingTime/3600)+'h'+parseInt(battery.dischargingTime%3600/60)+'m'+(battery.dischargingTime%3600%60)+'s'
                :"可用（电源已接通）"
            )
            var value=battery.level
            var bfvalue=parseInt(value * 100)
            pt.style.width = bfvalue + "%";
            p.innerHTML = bfvalue + "%"
            var charging = battery.charging ? "yes" : "no";
            if (charging === "yes"){
                pt.className='ccc success';
                document.querySelector('.batteryShape .battery .batteryTime .vvvv').style.display = '';
            }else {
                document.querySelector('.batteryShape .battery .batteryTime .vvvv').style.display = "none";
            }
            battery.addEventListener("levelchange", function(e) {
                value=battery.level
                bfvalue=parseInt(value * 100)
                console.log("电量水平变化: ", bfvalue);
                pt.style.width = bfvalue + "%";
                p.innerHTML = bfvalue + "%"

            }, false);

            battery.addEventListener("chargingchange", function (e) {
                var cd = battery.charging?'yes':'no';
                if (cd == 'yes'){
                    pt.className='ccc success';
                    document.querySelector('.batteryShape .battery .batteryTime .vvvv').style.display = "";
                }else {
                    if((bfvalue)<=100){cname="ccc";}
                    if((bfvalue)<=70){cname="ccc warning";}
                    if((bfvalue)<=20){cname="ccc danger";}
                    pt.className=cname;
                    document.querySelector('.batteryShape .battery .batteryTime .vvvv').style.display = "none";
                }
            }, false);
        });
    },
    html:function (){
        var html=`
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
                    height: 5%;
                    background-color: #33333300;
                    position: fixed;
                    z-index:1002;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    opacity:0;
                    color: black;
                    font: 14px/1 'Microsoft Yahei',sans-serif,Arial,Verdana;
                    font-weight: bolder;
                    box-sizing: content-box;
                    justify-content: space-between;
                    transition: all .3s cubic-bezier(0.215, 0.610, 0.355, 1);
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
                    letter-spacing: 1px;
                    text-shadow: 0 0 3px #fff;
                }
                .batteryShape .left #myclock{
                    text-shadow: 0 0 3px #fff;
                }
                .batteryShape .right .battery{
                     margin-right: 5px;

                }
                .batteryShape .right .battery .percent{
                    text-shadow: 0 0 3px #fff;
                }

                .batteryShape .right .bbb{
                    margin-left: 5px;
                    margin-right: 5px;
                    width: 28px;
                    box-shadow: 0 0 5px 1px white;
                    height: 10px;
                    border-radius: 10px;
                    border:2px solid #ed333300;
                    outline: 3px solid #000;
                    box-sizing: content-box;
                    overflow: hidden;
                }
                .batteryShape .right .ccc{
                    height: 15px;
                    background-color: #000;
                    box-sizing: content-box;
                    position: relative;
                    z-index: -1;
                    width: 100%;
                }
                .batteryShape .right  .ccc.warning{
                    background-color: #f8d15b;
                }
                .batteryShape .right  .ccc.success{
                    background-color: chartreuse;
                }
                .batteryShape .right  .ccc.danger{
                    background-color: #fd2c72;
                }
                .batteryShape .right .batteryTime{
                    color: #f3f3f3;
                    position:absolute;
                    font-size:27px;
                }
        `)
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
            "  " +
            month +
            "月" +
            date +
            "日 " +
            "  " +
            weekday;
        flag=!flag
    }
}
if(i==1){
    way.css();
    way.html();
    try{
        way.battery()
    }catch{
        console.log('不支持')
    }
    setInterval(()=>{way.fun_clock()}, 1000);
    i++;
}

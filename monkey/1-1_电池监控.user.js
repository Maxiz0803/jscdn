// ==UserScript==
// @name         电池监控🪫
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  低电量页面提示/系统通知
// @author       mxk-zwh
// @match        https://*/*
// @match        http://*/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAmCAYAAAC29NkdAAACWklEQVRYhe2YMU/bQBTH/3dJm0JBbS01hXoAIadKBw+MbQeGfoKuLB1ZWVkY+i06sDD0E3RgYchCVQZQCQhQM1SVUnUoqcAqbgH7eCZYcuO7cImTYJD/kiPr7Of7+d17z/fCBAkpFr9ugKuUASZVBphUqQfMa911KlD9TocDnIVjdwD7McN0kcltPIFanWwagBOO5YAJg+GVyTQnBtjVdVBgdd3Hiiu/Om3lMGvGx6tbHpZ/y23MpxzzJcWL6QK6Bz5WfwAN8sS3w4gXWpQvMDy/Fx+vOwINX2EUeH+YvFgAZqY4zEJHgLQ0Oz7e/1Ib9Vovyxxvnsg9Gk8SipvlAcIFWvtKserJr8VitXogEIbbBMXK7Fj/wDb3Kbb/4CKhqj9p2SWxHAN0I28ySRlnjPYPsHwfTcBg3jP5PQOogwIrnz0sfvGhKARtNRDA+l/y0DFVhC6s9eolxYhDE5y2jlPiGSPqQh3ahKvnBKWnnU13gAIfPvnYVGSZaVLRtVonFKhs+Ph4HBk6EVjaaFa0IYPjna0HqeVB+wFQO5Jc4Az2Q9lEDBaNGwQVeNC5dOFQvjmh9UiLTReQIOwcbP1nXsgscSyUgjMfSxWBvbsMcy/oq9Hhc27JbiaRaPcyTh4dZR17L9BAAMvP6OjSOvVLnAEmVVtA1Qe8V3IVxT+qWJJYI/RzWZTX9z3s1npMFZETccCkIb8nBmjQFnyGtvuVfwi+WP89pF8qFjleK7Z18p6EurjKNvUk1Ii4/fxribq88hjHW0vd5Wl0dderm53FaVAGmFQZYFKlHvAc2/G61yINYTgAAAAASUVORK5CYII=
// @require      https://static.hdslb.com/js/jquery.min.js
// @require      https://raw.kgithub.com/mxk-zwh/jscdn/main/message.js
// @resource css https://raw.kgithub.com/mxk-zwh/jscdn/main/message.css
// @run-at       document-body
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_notification
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

(function(){
    $('body').append(`<link rel="stylesheet" href="//at.alicdn.com/t/font_1117508_wxidm5ry7od.css"><bbb id="baba"></bbb>`);
    GM_addStyle(GM_getResourceText("css"));
    var message=new Message();
    function formateTime(time) {
        const h = parseInt(time / 3600)
        const minute = parseInt(time / 60 % 60)
        const second = Math.ceil(time % 60)

        const hours = h < 10 ? '0' + h : h
        const formatSecond = second > 59 ? 59 : second
        return `${hours > 0 ? `${hours}:` : ''}${minute < 10 ? '0' + minute : minute}:${formatSecond < 10 ? '0' + formatSecond : formatSecond}`
    }
    const tipsContent_win = {
        warning: {text: "该充电了,不足40",title: "充电",timeout: 10000,image: "https://i0.hdslb.com/bfs/face/93bba0fb2fc3c1ad1ead9a5e4db031ef36f532d5.jpg"}
        , danger: {text: "快没电了，不足20",title: "充电",timeout: 10000,image: "https://i0.hdslb.com/bfs/face/ba9ce36ef60a53e24a97f54429e62bdb951530a0.jpg"}
        , success: {text: "快充满了，超过90",title: "拔掉",timeout: 10000,image: "https://c-ssl.dtstatic.com/uploads/blog/202207/05/20220705231022_cac23.thumb.400_0.jpeg"}
    }
    function method1(){
        navigator.getBattery().then((battery) => {
            function updateAllBatteryInfo() {
                updateChargeInfo();
                updateLevelInfo();
                updateChargingInfo();
                updateDischargingInfo();
            }
            updateAllBatteryInfo();
            var isCharging,level,chargingTime,dischargingTime;
            battery.addEventListener("chargingchange", () => {
                updateChargeInfo();
            });
            function updateChargeInfo() {
                isCharging=battery.charging ? "Yes" : "No";
                if(battery.charging){
                    message.show({
                        type:'success',
                        text:`充电? ${isCharging}`
                })
                }
                console.log(`充电? ${isCharging}`);
            }

            battery.addEventListener("levelchange", () => {
                updateLevelInfo();
                save()
                notification();
            });
            function updateLevelInfo() {
                level=Math.floor(battery.level * 100)
                if(battery.level*100 <30){
                    message.show({
                        type:'danger',
                        text:`电量: ${level}%`
                })
                }else if(battery.level*100 <60){
                    message.show({
                        type:'warning',
                        text:`电量: ${level}%`
                })
                }else{
                    message.show({
                        type:'success',
                        text:`电量: ${level}%`
                })
                }
                console.log(`电量: ${level}%`);
            }

            // battery.addEventListener("chargingtimechange", () => {
            //     updateChargingInfo();
            // });
            function updateChargingInfo() {
                chargingTime=formateTime(battery.chargingTime);
                if(battery.chargingTime!=Infinity){
                    message.show({
                        type:'success',
                        text:`还有: ${chargingTime}`,
                    })
                }
                console.log(`还有: ${chargingTime}`);
            }

            // battery.addEventListener("dischargingtimechange", () => {
            //     updateDischargingInfo();
            // });
            function updateDischargingInfo() {
                dischargingTime=formateTime(battery.dischargingTime);
                if(battery.dischargingTime!=Infinity){
                    message.show({
                        type:'success',
                        text:`剩余: ${dischargingTime}`,
                    })
                }
                console.log(`剩余: ${dischargingTime}`);
            }
            function notification(){
                if(isCharging=="yes"){
                    if(level>90)GM_notification(tipsContent_win.success)
                }else{
                    if(level<=40){GM_notification(tipsContent_win.warning)}else if(level<=20){GM_notification(tipsContent_win.danger)}
                }
            }
            function save(){
                GM_setValue('isCharging',isCharging);
                GM_setValue("level",level);
                GM_setValue('chargingTime',chargingTime);
                GM_setValue('dischargingTime',dischargingTime);
            }
        });
    }
    function method2(){
        var isCharging= GM_getValue('isCharging');
        var level = GM_getValue("level");
        var chargingTime = GM_getValue('chargingTime');
        var dischargingTime = GM_getValue('dischargingTime');
        function updateAllBatteryInfo() {
            updateChargeInfo();
            updateLevelInfo();
            updateChargingInfo();
            updateDischargingInfo();
        }
        updateAllBatteryInfo();
        function updateChargeInfo() {
            message.show({
                type:'warning',
                text:`充电? ${isCharging}`
                })
            console.log(`充电? ${isCharging}`);
        }
        function updateLevelInfo() {
            if(level <30){
                message.show({
                    type:'danger',
                    text:`电量: ${level}%`
                })
            }else if(level <60){
                message.show({
                    type:'warning',
                    text:`电量: ${level}%`
                })
            }else{
                message.show({
                    type:'success',
                    text:`电量: ${level}%`
                })
            }
            console.log(`电量: ${level}%`);
        }
        function updateChargingInfo() {
            if(chargingTime!=Infinity){
                message.show({
                    type:'success',
                    text:`还有: ${chargingTime}`,
                })
            }
            console.log(`还有: ${chargingTime}`);
        }
        function updateDischargingInfo() {
            if(dischargingTime!=Infinity){
                message.show({
                    type:'success',
                    text:`剩余: ${dischargingTime}`,
                })
            }
            console.log(`剩余: ${dischargingTime}`);
        }
        function notification(){
            if(isCharging=="yes"){
                if(level>90)GM_notification(tipsContent_win.success)
            }else{
                if(level<=40){GM_notification(tipsContent_win.warning)}else if(level<=20){GM_notification(tipsContent_win.danger)}
            }
        }
    }
    try{
        console.log('method1')
        method1()
    }catch(e){
        console.log('method2')
        method2()
    }
})()

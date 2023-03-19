// ==UserScript==
// @name         电池监控🪫
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  低电量通知
// @author       mxk-zwh
// @match        https://*/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAmCAYAAAC29NkdAAACWklEQVRYhe2YMU/bQBTH/3dJm0JBbS01hXoAIadKBw+MbQeGfoKuLB1ZWVkY+i06sDD0E3RgYchCVQZQCQhQM1SVUnUoqcAqbgH7eCZYcuO7cImTYJD/kiPr7Of7+d17z/fCBAkpFr9ugKuUASZVBphUqQfMa911KlD9TocDnIVjdwD7McN0kcltPIFanWwagBOO5YAJg+GVyTQnBtjVdVBgdd3Hiiu/Om3lMGvGx6tbHpZ/y23MpxzzJcWL6QK6Bz5WfwAN8sS3w4gXWpQvMDy/Fx+vOwINX2EUeH+YvFgAZqY4zEJHgLQ0Oz7e/1Ib9Vovyxxvnsg9Gk8SipvlAcIFWvtKserJr8VitXogEIbbBMXK7Fj/wDb3Kbb/4CKhqj9p2SWxHAN0I28ySRlnjPYPsHwfTcBg3jP5PQOogwIrnz0sfvGhKARtNRDA+l/y0DFVhC6s9eolxYhDE5y2jlPiGSPqQh3ahKvnBKWnnU13gAIfPvnYVGSZaVLRtVonFKhs+Ph4HBk6EVjaaFa0IYPjna0HqeVB+wFQO5Jc4Az2Q9lEDBaNGwQVeNC5dOFQvjmh9UiLTReQIOwcbP1nXsgscSyUgjMfSxWBvbsMcy/oq9Hhc27JbiaRaPcyTh4dZR17L9BAAMvP6OjSOvVLnAEmVVtA1Qe8V3IVxT+qWJJYI/RzWZTX9z3s1npMFZETccCkIb8nBmjQFnyGtvuVfwi+WP89pF8qFjleK7Z18p6EurjKNvUk1Ii4/fxribq88hjHW0vd5Wl0dderm53FaVAGmFQZYFKlHvAc2/G61yINYTgAAAAASUVORK5CYII=
// @require      https://static.hdslb.com/js/jquery.min.js
// @connect      hamibot.cn
// @run-at       document-body
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==
//hamibot robotid  hmp
var robotid=""
var hmp=""
var low=30
var i=1;

var way={
    battery:()=>{
        navigator.getBattery().then(function(battery) {
            var time="还可以使用："+parseInt(battery.dischargingTime/3600)+'h '+parseInt(battery.dischargingTime%3600/60)+'m '+(battery.dischargingTime%3600%60)+'s'

            battery.addEventListener("levelchange", function() {
                way.alter("剩余电量: " + Math.round(battery.level * 100) + "%",'w');
                console.log((battery.dischargingTime!='Infinity' ? time:"电源已接通"))
                console.log(location.href)
                if((battery.level * 100)==(low+1)){
                    GM_xmlhttpRequest({
                        method:     "POST",
                        url:        `//hamibot.cn/api/v1/robots/${robotid}/messages`,
                        data:'{"title": "电脑电量低", "text": "该充电了"}',
                        headers: {
                            "Authorization":`${hmp}`,
                            'Content-Type': 'application/json'
                        },
                        onload:     function (response) {
                            if (res.code === 200) {
                                console.log('发送成功')
                            }
                        },
                        onerror:    function (){
                            alert(`发送失败`);
                        }
                    });

                }
            });

        });
    },
    alter:function (data,type,delay=4000){
        let lunbo=document.createElement("div");
        let test=top.document.querySelector(".lunbo");
        switch(type){
            case 'p':
                lunbo.className='lunbo primary';
                break;
            case 's':
                lunbo.className='lunbo success';
                break;
            case 'i':
                lunbo.className='lunbo info';
                break;
            case 'w':
                lunbo.className='lunbo warning';
                break;
            case 'd':
                lunbo.className='lunbo danger';
                break;
            default:
                lunbo.className='lunbo';
                break;
        }
        lunbo.innerHTML=data;
        if(!test){
            top.document.body.appendChild(lunbo);
            return new Promise(resolve=>{
                setTimeout(()=>{
                    top.document.body.removeChild(lunbo);
                },delay)
            })
        }
    },
    css:function (){
        GM_addStyle(`
           .lunbo{
                background:#ffffff;
                position: fixed;
                padding: 8px 15px;
                z-index: 1002;
                right: 10%;
                bottom: 10%;
                border-color:#dcdfe6;
                border-radius: 20px;
                color: white;
                font-size: 18px;
                text-align: center;
                animation: jello-horizontal 0.9s both;
            }
            .lunbo.primary{background: #409eff;border-color:#409eff;}
            .lunbo.success{background: #67c23a;border-color:#67c23a;}
            .lunbo.danger{background: #f56c6c;border-color:#f56c6c;}
            .lunbo.info{background: #909399;border-color:#909399;}
            .lunbo.warning{background: #e6a23c;border-color:#e6a23c}
            @keyframes jello-horizontal {
                0% {
                -webkit-transform: scale3d(1, 1, 1);
                        transform: scale3d(1, 1, 1);
                }
                30% {
                -webkit-transform: scale3d(1.25, 0.75, 1);
                        transform: scale3d(1.25, 0.75, 1);
                }
                40% {
                -webkit-transform: scale3d(0.75, 1.25, 1);
                        transform: scale3d(0.75, 1.25, 1);
                }
                50% {
                -webkit-transform: scale3d(1.15, 0.85, 1);
                        transform: scale3d(1.15, 0.85, 1);
                }
                65% {
                -webkit-transform: scale3d(0.95, 1.05, 1);
                        transform: scale3d(0.95, 1.05, 1);
                }
                75% {
                -webkit-transform: scale3d(1.05, 0.95, 1);
                        transform: scale3d(1.05, 0.95, 1);
                }
                100% {
                -webkit-transform: scale3d(1, 1, 1);
                        transform: scale3d(1, 1, 1);
                }
             }
        `)
    }
}
if(i==1){
    way.css();
    way.battery()

    i++;
}

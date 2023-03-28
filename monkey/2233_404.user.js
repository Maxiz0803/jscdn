// ==UserScript==
// @name         2233 404
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  2233 404 在天天奖励可见[没啥用]，自动换背景
// @author       mxk-zwh
// @match        https://live.bilibili.com/p/html/live-anchor-galaxy/task_center/*
// @match        https://live.bilibili.com/activity/live-activity-full/task_center/mobile.html*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMeSURBVHgBvZi/TxNhGMe/97al/DDYOvhjMJakg4MJ7UjQeEyuNf4B4OBmgm4uhhAnJ2VwBnaHjm4cQcJoSRwcaqhxMHGQihQEeu/r8xwtFnrXu/e9wic5uPS9H5+8z/P+eM6CJvbGfg7uYQkJaxxS2VDIwKKDUajTeQ2WVaO2VRzJsjOVrWk8nm6PKrK+M0NXT0ORhB4Ves2CMzm6FOXiUCF77Y8NIRfpNId41Oh182FigUL2ynYG6eQclHyGfmKJtzhozlMo677N8JfJIWWVKRfGcT7UcCin/PLL8pUZECuIHyIjKeuMTIZkPl2ATJtKS+okfOJUM+dMDJlHNwbw5s4ILiUjD95C653oEvKGdYwEnr6ZxtOxQRRGE1r38TvttW27S4ha5mAIy8zQwVQbErtNBS2EWDwl5PWOYag6ZZjKThMG5FoO7R5SszDgrAzzteHCCF4F+F9rmG9BkwdXU3iRH+r6/clmg8JmKCXkmEBKlKBJkAznjrEM44oSh8zWuSdIhqnuScSCVgZBsbsV9fpeMkzlt1FCd6DsJCKOrjAZ5u6VFAqXk4HtL7/shU0JGb47gxAKo8lQGSY/Inq2X08LVJs9cyzT+wmth7y6HS4TxuvqfqSE5x7ihS2wl3Zd1TNZed3KD4tQmQ8/jxCBergQxfz550bgE3hyzA+n0QcZpiZoY76KGPRK4ndbf3VkmG/c1xXEIChcy98P8P7HIbRQcAQSsgxD8iMJ370PyyzRoQ25CGciy3WUAwOuDfZRhiLFLsf9rdxlGMDzU59kCLnAfz0hZzK75FWcmnDI+iJD7/Yc0LljdOVjaNLersbrGfA2dr59eiLk3Ms6kFiABh9/Nb2hHUuGQtXuHcavDOKarICLgNNkSBadYkAZ5NVHQj40yScjGYtqsuLpkrprVjueBuTU+UqpTU9moruU9p1mvQsPZFE3p6JBw3tY2X4yTPjnmPVt+i4k6CtIzPKae5xGsjd4el4WEU9MiVm6Qy/hFa0ClrvcOZL6InQitkFlk4sSrMR9+pqWoyfk8H/7Uj8+SEK5m0igHBSaIP4B4tBBLQXrYhgAAAAASUVORK5CYII=
// @grant        GM_addStyle
// @require      https://static.hdslb.com/js/jquery.min.js
// @require      https://cdn.jsdelivr.net/gh/mxk-zwh/jscdn/asset/ribbons.min.js
// @require      https://cdn.jsdelivr.net/gh/mxk-zwh/jscdn/asset/echo.min.js
// ==/UserScript==
let o=[];
let s;
let way={
    quBeiJing:function (){
        document.querySelector('.task-center-container').style.backgroundColor='transparent';
        //自动 换背景
        document.body.style.background=`url(https://www.loliapi.com/acg/) fixed no-repeat`;
        document.body.style.backgroundSize=`cover`;
    },
    x:()=>{
        $.ajax({
            url:"//api.bilibili.com/x/activity/operation/list?source_id=630edcfddbd0b39ca7371ad2",
            type:"get",
            dataType:"json",
            async: !1,
            timeout:3e3,
            success:function(r){
                way.addarr(r)
            }
        });
    },
    addarr:(r)=>{
        s=parseInt(Math.random()*o.length)
        let t=r.data&&r.data.list;
        for (let e in t) o.push(t[e].object_id)
        way.getimg()
    },
    getimg:()=>{
        let g=o[s];
        way.recrp(g)
        setTimeout(()=>{
            way.quBeiJing()
            window.cnblogsConfig = {}
            new Ribbons(window.cnblogsConfig.backgroundAnimation);
            $('.apage').append(`<img class='imgs' src='${g}'><div class='lunbo'></div><a class='change-img-btn'>换一张</a>`)
            $(".change-img-btn").click(function(){
                s++;
                if (s<=o.length-1){
                    echo.log(s)
                    $('.imgs').attr("src",o[s])
                }else{
                    s=0;
                    echo.log(s)
                }

            });

        },1e3);
    },
    recrp:(g)=>{
        window.rec_rp =
            window.rec_rp ||
            function() { (rec_rp.q = rec_rp.q || []).push(arguments)},
            rec_rp("event", "errorpage_pageshow", {
            pic: g,
            url: window.location.href,
        })
    },
    ui:()=>{
        let l=$("#main");
        l.append("<div class='apage'><div class='error-split' id='up'></div></div>");
    },
    addstyles:()=>{
        GM_addStyle('.apage{display: flex;flex-direction: column;align-items: center;margin-bottom: 110px;}.error-split {width: 700px;height: 40px;background: url(https://static.hdslb.com/images/error/have_rest.png) center no-repeat; margin: 0px 0px 41px 0px;display: flex;}.imgs{display: flex;width: 700px;}')
        GM_addStyle('.change-img-btn{display: block;height: 48px;width: 150px;margin: 30px auto 0;line-height: 48px;vertical-align: middle;text-align: center;font-size: 16px;background: #00a1d6;color: #fff;border-radius: 4px;transition: 0.2s;}')
        GM_addStyle('#lunbo{background: #7b837e78;position: relative;padding: 12px 24px;display: flex;z-index: 10;border-radius: 24px;color: white;justify-content: center;bottom: 87px;font-size: 18px;}')
    },
    start:()=>{
        way.x()
        way.addstyles()
        way.ui()
    }
}
way.start()

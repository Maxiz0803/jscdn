// ==UserScript==
// @name         weibo 放大镜
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  头像放大，长图放大（除了动图，视频封面），手动找图/自动找图
// @author       mxk-zwh
// @match        https://weibo.com/mygroups*
// @match        https://weibo.com/u/*
// @icon         data:image/jpeg;base64,/9j/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIACgAKAMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AOimv7S1cLI21iM4wT/IU+K+gl5jdG9gRmua1wNBe2kgDFZQY2x82SPu4x35Ndv4d+GEKlb7XZpppW+ZbRZCqRj0Yjqfpx9a8mlSdTY6I5fhnhI13Uak76b7fd+ZnvqttCpZ2QAe4J/IVWPia2DY8iTH97AwP1run/4RO21+Lw6+n2YvZLY3KxtaAqYwSMliMdj19K4vxXo+grqF+uiQvBeWMSS3UMcbCFo36Mn8ORxkD39DW0sK4q97jweHwkpclVu72eiX6ln7UrdV/I0eevof0qtEqPhhIuOtTbI/+eg/KuO7PFZb0sRa54n023GnqkNszXjyY7oMKB/wJgfwr0iSRIYnlkYIiKWZicAAdTXm3gS8267Kr7QGgIJ9PmWu112SCfw1rCO5CLazJLxgqNhz+nNelg2nSujvhNygl2PLtW+PVkksw0fQ5LiRcpDc3DhAffaBnHfGR+FcZc/Fjxhd2csN5LaSW9yD8hgwNueQCD/jWv8ADzwTY69ZWl1dxxXGneU63KhtrrMHbAyPm+7s4zjnNZnxL0aw0G4t4LJlaCZi9tGrH9zHt5UgnnLc56+vUV1aGvK0rnoN1LbXn2W8tIVit7m2imSMcbQyg4qPaPQfnVy3vdMXwpoNrbyLI8dnHlhyR8g/rUf2mH1P5V5VWCU3ZnnVNJM7GSDRdEtXmFvbw7YyMhRuYenqav2caXcKTS4P2iHPlMPm2EcBueeD39a5rxf/AMeH4f1rpdP+7Z/9ei/0r0YtKTilojrjK7aOCstCg8JahdabaARWt/NvhDIcq+Dhdw5AIHfoRjoRUHxU8GLqnheznt8SalbuMTAcyKeoJ7+v4e9dF4q/5GDSv+viP/2atHxJ/wAgGD6r/KnJuMW0VOTUWzjNEsrPTtGsrWa2R54YVR3z1YDn9a0P9C/59VqovUVJXmc19Tz3OT6n/9k=
// @require      https://static.hdslb.com/js/jquery.min.js
// @run-at       document-end
// @grant        GM_cookie
// @grant        unsafeWindow
// ==/UserScript==
function getBody(doc){
    return doc.body || doc.querySelector('body') || doc;
}
function getWindowSize(){
    var de=document.documentElement;
    var body=getBody(document);
    var backCompat=document.compatMode=='BackCompat';
    return {
        h:backCompat? body.clientHeight : de.clientHeight,
        w:backCompat? body.clientWidth : de.clientWidth,
    };

}
function getScrolled(container){
    if(container){
        return {
            x:container.scrollLeft,
            y:container.scrollTop,
        };
    }
    return {
        x:'scrollX' in window ? window.scrollX : ('pageXOffset' in window ? window.pageXOffset : document.documentElement.scrollLeft || getBody(document).scrollLeft),
        y:'scrollY' in window ? window.scrollY : ('pageYOffset' in window ? window.pageYOffset : document.documentElement.scrollTop || getBody(document).scrollTop),
    };
}
function getContentClientRect(target){
    var rect=target.getBoundingClientRect();
    var compStyle=unsafeWindow.getComputedStyle(target);
    var pFloat=parseFloat;
    var top=rect.top + pFloat(compStyle.paddingTop) + pFloat(compStyle.borderTopWidth);
    var right=rect.right - pFloat(compStyle.paddingRight) - pFloat(compStyle.borderRightWidth);
    var bottom=rect.bottom - pFloat(compStyle.paddingBottom) - pFloat(compStyle.borderBottomWidth);
    var left=rect.left + pFloat(compStyle.paddingLeft) + pFloat(compStyle.borderLeftWidth);
    return {
        top:top,
        right:right,
        bottom:bottom,
        left:left,
        width:right-left,
        height:bottom-top,
    };
};

function getImageSize(url) {
    return new Promise(function (resolve, reject) {
        let image = new Image();
        image.onload = function () {
            resolve({
                width: image.width,
                height: image.height
            });
        };
        image.onerror = function () {
            reject(new Error('error'));
        };
        image.src = url;
    });
}
var a={
    ui:()=>{
        var html=`
            <div id="weibo_block" class="">
                <div class="imgbox">
                    <div style="padding-bottom:158%"></div>
                    <img src="" referrerpolicy=”no-referrer”>
                    <div class="cover"></div>
                </div>
                <div class="wimgbox">
                    <img src="" referrerpolicy=”no-referrer”>
                </div>
                <div class="avaterbox">
                    <img src="" referrerpolicy=”no-referrer”>
                </div>
                <span>🔍放大惊</span>
            </div>
            <div id="refresh-fdj">
                <div class="myButton">1️⃣</div>
                <div class="myButton2">▶️</div>
                <div class="myButton3" style="display:none;">⏸️</div>
            </div>
        `
        var css=`
        <style>
            #weibo_block{
               margin:15px;
               padding:10px;
               position:fixed;
               overflow: hidden;
               display:none;
               border-radius:8px;
               box-shadow:
                  0px 0px 10px rgba(0, 0, 0, 0.03)
                ;
               z-index:9999;
            }
            #weibo_block::after{
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: -1;
                background: #ffffff;
                filter: blur(0px);
                border: 3px solid red;
                border-radius:8px;
            }
            #weibo_block .imgbox{
                width:400px;

                vertical-align: top;
                overflow: hidden;
                border-radius:inherit;
                display:inline-block;
                position:relative;
                box-sizing:border-box;
            }
            #weibo_block .imgbox img{
                width:100%;
                height:100%;
                object-position: center 0;
                object-fit: cover;
                border-radius: inherit;
                left: 0;
                position: absolute;
                top: 0;
            }
            #weibo_block .wimgbox img{
                object-position: center 0;
                object-fit: cover;
                border-radius: inherit;
            }
            #weibo_block .imgbox .cover{
                border-radius: inherit;
                bottom: 0;
                box-sizing: border-box;
                left: 0;
                pointer-events: none;
                position: absolute;
                right: 0;
                top: 0;
            }
            #weibo_block .avaterbox img{
                object-position: center 0;
                object-fit: cover;
                border-radius: inherit;
            }
            #weibo_block span{
                text-align: center;
                display:block;
            }
            #refresh-fdj{
                position: fixed;
                left: 25px;
                z-index: 10001;
                bottom: 35px;
            }
            #refresh-fdj .myButton,
            #refresh-fdj .myButton2,
            #refresh-fdj .myButton3{
                box-shadow: 0px 10px 15px -7px #276873;
                background:linear-gradient(to bottom, #eaf593 5%, #9cf2ff 100%);
                background-color:#eaf593;
                border-radius:39px;
                display:inline-block;
                cursor:pointer;
                color:#ffffff;
                font-family:Arial;
                font-size:26px;
                font-weight:bold;
                padding:13px 13px;
                text-decoration:none;
                text-shadow:0px 1px 0px #3d768a;
            }
            #refresh-fdj .myButton:hover,
            #refresh-fdj .myButton2:hover,
            #refresh-fdj .myButton3:hover{
                background:linear-gradient(to bottom, #9cf2ff 5%, #eaf593 100%);
                background-color:#9cf2ff;
            }
            #refresh-fdj .myButton:active,
            #refresh-fdj .myButton2:active,
            #refresh-fdj .myButton3:active{
                position:relative;
                top:1px;
            }

        </style>
        `
        $('body').append(html)
        $('head').append(css)
    },
    fdj:()=>{
        $('#weibo_block').off('mouseenter')
        $('#weibo_block').off('mouseleave')
        $('#weibo_block').on({
            mouseenter:()=>{
                $('#weibo_block').css('display','block')
            },mouseleave:()=>{
                $('#weibo_block').css('display','none')
            }
        })
    },
    test:async ()=>{
        var pic= [];
        var avatar=[];
        $('body').find('img').each(function() {
            var src = $(this).attr('src');
            var cn = $(this).attr('class');
            //需要放大的图片
            if (cn&&(cn.startsWith('picture')||cn.startsWith('woo-picture')) && src.endsWith('.jpg')) {
                //默认短图
                var pic_real_width,pic_real_height;
                var newsrc=src
                var realsize=getImageSize(newsrc)
                var realbili
                realsize.then((result)=>{
                    realbili=(result.width/result.height).toFixed(2)
                })
                $(this).off("mouseenter")
                $(this).off("mousemove")
                $(this).off("mouseleave")

                $(this).on({
                    mouseenter: function(e){
                        $('#weibo_block .avaterbox').css({'display':'none'})
                        //
                        //正式大小 比例 需要的比例
                        var needbili
                        needbili=(3/4)
                        //比例为长图 否则宽
                        if(realbili<needbili){
                            newsrc=src.replace('orj360','mw690')
                            //显示 消失
                            $('#weibo_block .imgbox').css({'display':'inline-block'})
                            $('#weibo_block .wimgbox').css({'display':'none'})
                            $('#weibo_block .imgbox img').attr('src',newsrc)
                        }else{
                            //显示 消失
                            $('#weibo_block .imgbox').css({'display':'none'})
                            $('#weibo_block .wimgbox').css({'display':'inline-block'})
                            $('#weibo_block .wimgbox img').attr('src',newsrc)
                        }
                        if((e.pageX<$(window).width()/2)){
                            //鼠标在左半边
                            $('#weibo_block').css({
                                display:'block',
                                left:'unset',
                                right:0+'px',
                                top:0+'px'
                            });
                        }else{
                            //鼠标在右半边
                            $('#weibo_block').css({
                                display:'block',
                                left:0+'px',
                                right:'unset',
                                top:0+'px'
                            });
                        }

                    },
                    mousemove:function(e){
                        // var x = e.clientX;
                        // var y = e.clientY;
                        //图片起始坐标
                        var targetPosi=getContentClientRect(this.parentNode);
                        var bodyPosi=getContentClientRect(document.documentElement);
                        var windowSize=getWindowSize();
                        var scrolled=getScrolled();
                        targetPosi.top -= bodyPosi.top-0.4;
                        targetPosi.left -= bodyPosi.left-scrolled.x;
                        // console.log(targetPosi.top)
                        // console.log(targetPosi.left)
                        //差值
                        var 差值=e.pageY-targetPosi.top
                        // console.log('差值'+差值)
                        var 总值=$(this).parent('div').height()-4;
                        if(差值<0){差值=0}
                        if(差值>总值)
                        {
                            差值=总值
                        }
                        //长图判断
                        // console.log(`${差值/总值*100}%`)
                        //设置
                        $('#weibo_block .imgbox img').css('object-position',`center ${差值/总值*100}%`)


                        // console.log('y坐标是' + y)

                    },
                    mouseleave: function(e){
                        $('#weibo_block').css({display:'none'});
                    },
                })
                pic.push(newsrc)

            }

            if(cn&&cn.startsWith('woo-avatar-img')){
                try{
                    var match=src.match(/crop\.(.*)\//);
                    var crop=match[1]
                    if(crop==null)return;
                    var list=match[1].split('.')
                    list[4]='400'
                    var replace=list.join('.')
                    var newsrc1=src.replace(crop,replace)
                    $(this).parent('div').off("mouseenter")
                    $(this).parent('div').off("mouseleave")
                    $(this).parent('div').on('mouseenter', function(e){
                        $('#weibo_block .wimgbox').css({'display':'none'})
                        $('#weibo_block .imgbox').css({'display':'none'})
                        $('#weibo_block .avaterbox').css({'display':'inline-block'})
                        $('#weibo_block .avaterbox img').attr('src',newsrc1)
                        if((e.pageX<$(window).width()/2)){
                            //鼠标在左半边
                            $('#weibo_block').css({
                                display:'block',
                                left:'unset',
                                right:0+'px',
                                top:0+'px'
                            });
                        }else{
                            //鼠标在右半边
                            $('#weibo_block').css({
                                display:'block',
                                left:0+'px',
                                right:'unset',
                                top:0+'px'
                            });
                        }

                    })
                    $(this).parent('div').on('mouseleave',function(e){
                        $('#weibo_block').css({display:'none'});
                    })

                }catch{
                    console.log('找头像失败')
                }

            }

        })

        console.log('已载入')
    },

    refresh:()=>{
        let t;
        $('#refresh-fdj .myButton').click(function(){
            console.log('已开启手动找图')
            a.test();
            console.log('已关闭手动找图')
        })
        $('#refresh-fdj .myButton2').click(function(){
            $('#refresh-fdj .myButton2').css('display','none')
            $('#refresh-fdj .myButton3').css('display','inline-block')
            t = setInterval(function(){a.test()}, 5000)
            console.log('已开启自动找图')
        })
        $('#refresh-fdj .myButton3').click(function(){
            $('#refresh-fdj .myButton3').css('display','none')
            $('#refresh-fdj .myButton2').css('display','inline-block')
            clearInterval(t)
            console.log('已关闭自动找图')
        })
    }
}
var i=1
if(i==1){
    a.ui();
    a.fdj();
    // Retrieve all cookies for the current domain
    a.refresh()
    // setInterval(function(){a.test();},10e3)
    i++
}


// Your code here...
// https://wx4.sinaimg.cn/large/6544f080gy1gncw98ndsmj23480u0kjx.jpg
// https://wx4.sinaimg.cn/mw690/6544f080gy1gncw98ndsmj23480u0kjx.jpg
// https://wx4.sinaimg.cn/mw2000/6544f080gy1gncw98ndsmj23480u0kjx.jpg

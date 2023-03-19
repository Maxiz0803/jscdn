// ==UserScript==
// @name         weibo 放大镜
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  放大精
// @author       mxk-zwh
// @match        https://weibo.com/*/*
// @icon         data:image/jpeg;base64,/9j/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIACgAKAMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AOimv7S1cLI21iM4wT/IU+K+gl5jdG9gRmua1wNBe2kgDFZQY2x82SPu4x35Ndv4d+GEKlb7XZpppW+ZbRZCqRj0Yjqfpx9a8mlSdTY6I5fhnhI13Uak76b7fd+ZnvqttCpZ2QAe4J/IVWPia2DY8iTH97AwP1run/4RO21+Lw6+n2YvZLY3KxtaAqYwSMliMdj19K4vxXo+grqF+uiQvBeWMSS3UMcbCFo36Mn8ORxkD39DW0sK4q97jweHwkpclVu72eiX6ln7UrdV/I0eevof0qtEqPhhIuOtTbI/+eg/KuO7PFZb0sRa54n023GnqkNszXjyY7oMKB/wJgfwr0iSRIYnlkYIiKWZicAAdTXm3gS8267Kr7QGgIJ9PmWu112SCfw1rCO5CLazJLxgqNhz+nNelg2nSujvhNygl2PLtW+PVkksw0fQ5LiRcpDc3DhAffaBnHfGR+FcZc/Fjxhd2csN5LaSW9yD8hgwNueQCD/jWv8ADzwTY69ZWl1dxxXGneU63KhtrrMHbAyPm+7s4zjnNZnxL0aw0G4t4LJlaCZi9tGrH9zHt5UgnnLc56+vUV1aGvK0rnoN1LbXn2W8tIVit7m2imSMcbQyg4qPaPQfnVy3vdMXwpoNrbyLI8dnHlhyR8g/rUf2mH1P5V5VWCU3ZnnVNJM7GSDRdEtXmFvbw7YyMhRuYenqav2caXcKTS4P2iHPlMPm2EcBueeD39a5rxf/AMeH4f1rpdP+7Z/9ei/0r0YtKTilojrjK7aOCstCg8JahdabaARWt/NvhDIcq+Dhdw5AIHfoRjoRUHxU8GLqnheznt8SalbuMTAcyKeoJ7+v4e9dF4q/5GDSv+viP/2atHxJ/wAgGD6r/KnJuMW0VOTUWzjNEsrPTtGsrWa2R54YVR3z1YDn9a0P9C/59VqovUVJXmc19Tz3OT6n/9k=
// @require      https://static.hdslb.com/js/jquery.min.js
// @run-at       document-end
// @grant        none
// ==/UserScript==
// const pattern =  /\/\/(.*?)\//; // 匹配协议和域名部分
var a={
    ui:()=>{
        var html=`
            <div id="weibo_fangdajing" class="">
                <img src="" referrerpolicy=”no-referrer”>
                <span>🔍放大惊</span>
            </div>
        `
        var css=`
        <style>
            #weibo_fangdajing{
               padding:10px;
               background:rgb(255,247,209);
               position:absolute;
               display:none;
               box-shadow:
                  0px 0.8px 2.2px rgba(0, 0, 0, 0.011),
                  0px 2.4px 5.3px rgba(0, 0, 0, 0.016),
                  0px 5.1px 10px rgba(0, 0, 0, 0.02),
                  0px 9.9px 17.9px rgba(0, 0, 0, 0.024),
                  0px 19.7px 33.4px rgba(0, 0, 0, 0.029),
                  0px 48px 80px rgba(0, 0, 0, 0.04)
                ;
               z-index:10000;
            }
            #weibo_fangdajing img{
                background:red;
               display: block;
            }
            #weibo_fangdajing span{
                text-align: center;
                display:block;
            }
            .left-top{
               left:40px;
               top:50px;
               right:unset;
               bottom:unset;
            }
            .right-top{
               right:40px;
               top:50px;
               left:unset;
               bottom:unset;
            }
            .left-bottom{
               left:40px;
               bottom:50px;
               right:unset;
               top:unset;
            }
            .right-bottom{
               right:40px;
               bottom:50px;
               left:unset;
               top:unset;
            }
        </style>
        `
        $('body').append(html)
        $('head').append(css)
    },
    test:async ()=>{
        var pic=await [];
        $('body').find('img').each(function() {
            var src = $(this).attr('src');
            var cn = $(this).attr('class');
            if (cn&&cn.startsWith('picture') && src.endsWith('.jpg')) {
                var newsrc=src
                $(this).off("mouseenter")
                $(this).off("mouseleave")

                $(this).on({
                    mouseenter: function(e){
                        $('#weibo_fangdajing img').attr('src',newsrc);
                        var height=$('#weibo_fangdajing img')[0].height
                        if((e.pageX<$(window).width()/2)){

                            $('#weibo_fangdajing').css({
                                display:'block',
                                left:(e.pageX+15)+'px',
                                top:(e.pageY-parseInt(height/2))+'px',
                                right:'unset'
                            });
                        }else{
                            $('#weibo_fangdajing').css({
                                display:'block',
                                left:'unset',
                                top:(e.pageY-parseInt(height/2)) +'px',
                                right:($(window).width()-e.pageX+15) +'px',
                            });
                        }

                    },
                    mouseleave: function(e){
                        $('#weibo_fangdajing').css({display:'none'});
                    },
                })
                pic.push(newsrc)
            }
        })
        console.log(pic);
    }
}
var i=1
if(i==1){
    a.ui();
    setInterval(function(){a.test();},10e3)
    i++
}

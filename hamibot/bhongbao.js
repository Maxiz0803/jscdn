const {
  screen_pwd,
  SHOW_CONSOLE,
  double_open,
  Language
} = hamibot.env;
auto.waitFor();
if (SHOW_CONSOLE) {
  console.show();
  sleep(300);
  console.setPosition(0, 400);
  console.setSize(device.width / 2, device.height / 4)
}

console.log(["语言:中文","Language:English"][Language])
var g=0;
var b=0;
var hongbao = {};
hongbao.openscreen = function() {
  if (!device.isScreenOn()) {
    device.wakeUp();
    sleep(500);
    swipe(random(device.width / 3, device.width / 2), random(device.height * 8 / 10, device.height * 7 / 10), random(device.width / 3, device.width / 2), random(device.height * 2 / 10, device.height / 10), random(500, 1000));
    swipe(500,2000,500,1000,210);
    sleep(500);
    swipe(random(device.width / 3, device.width / 2), random(device.height * 8 / 10, device.height * 7 / 10), random(device.width / 3, device.width / 2), random(device.height * 2 / 10, device.height / 10), random(500, 1000));
    swipe(500,2000,500,1000,210);
    sleep(1000);
    var password = screen_pwd;
    for (var i = 0; i < password.length; i++) {
      var p = text(password[i].toString()).findOne().bounds();
      click(p.centerX(), p.centerY());
      sleep(100)
    }
    console.log(['解锁成功','Unlock successful'][Language]);
//     ['',''][Language]
    home();
    sleep(1000);
    hongbao.openapp()
  }
  home();
  sleep(1000);
  home();
  sleep(1000);
  hongbao.openapp()
}
hongbao.openapp = function() {
  sleep(1000);
  if (text("哔哩哔哩").exists()) {
    click("哔哩哔哩", (double_open - 1));
    var a = id('toolbar_menu_1').exists();
    if (!a) {
      console.log(['等待广告消失','Wait for ads to disappear'][Language]);
      sleep(10000)
    }
    className("android.widget.TextView").text("进入青少年模式 >").exists() ? click("我知道了") : console.log(['无青少年模式','No minor mode'][Language]);
    sleep(500);
    desc("首页,5之1,标签").exists() ? desc("首页,5之1,标签").findOne().click() : console.log(['没有首页','NO Home'][Language]);
    sleep(1000);
    className("android.view.ViewGroup").desc("直播,6之1,标签").exists() ? className("android.view.ViewGroup").desc("直播,6之1,标签").findOne().click() : console.log(['没有直播公开','no live public'][Language]);
//     sleep(1000);
//     className("android.widget.TextView").text("我的关注").exists() ? click("我的关注") : console.log(['没有我的关注','No, my followings'][Language]);
    sleep(3000);
    hongbao.findhongbao()
  } else {
    console.log(['没有哔哩哔哩','NO BiliBili'][Language])
  }
}
hongbao.findhongbao = function() {
  
   sleep(3000);
  className("android.widget.TextView").text("我的关注").exists() ? click("我的关注") : console.log(["没有我的关注","NO My Follow"][Language]);
  sleep(4000);
  var a = className("android.widget.TextView").text("红包").find().length||className('android.view.View').text('红包').find().length;
  console.log("==================");
  console.log(["找到 " + a + " 个直播间有红包","Found " + a + " LiveRoom With Lottery"][Language]);
  if (a != 0) {
    var i = Math.round(Math.random() * (a - 1));
    console.log(i);
    click("红包", i);
    sleep(5000);
    var 剩余红包数量 = '';
    var rp = id("iv_popular_rp_lottery").exists();
    var point = id("red_point").exists();
    if (rp || point) {
      剩余红包数量 = '1';
      hongbao.gethongbao(剩余红包数量);
      console.log(['在关注里没有红包','NO lottery in Follow'][Language]);
//       [,][Language]
      sleep(3000);
      hongbao.back();
      sleep(4000);
      console.log(['离开关注的直播间','Out Live in Follow'][Language])
    } else {
      sleep(3000);
      console.log(['在我的关注里没有红包','NO lottery in Follow'][Language]);
      sleep(500);
      hongbao.back()
      sleep(500);
      console.log(['离开关注的直播间','Out Live in Follow'][Language])
    }
  }
  sleep(2000);
  id("toolbar_back").findOne().click();
  sleep(3000);
  a = className("android.widget.TextView").text("红包").find().length||className('android.view.View').text('红包').find().length;
  console.log("==================");
  console.log(["找到 " + a + " 个直播间有红包","Found " + a + " LiveRoom With Lottery"][Language]);
  if (a != 0) {
    var i = Math.round(Math.random() * (a - 1));
    console.log(i);
    click("红包", i);
    sleep(5000);
    var 剩余红包数量 = '';
    var rp = id("iv_popular_rp_lottery").exists();
    var point = id("red_point").exists();
    if (rp || point) {
      剩余红包数量 = '1';
      hongbao.gethongbao(剩余红包数量);
      console.log(['公开的直播间没有红包','NO lottery in Public'][Language]);
      sleep(4000);
      hongbao.back();
       sleep(3000);
      console.log(['离开公开的直播间','Out Live 2 Public'][Language])
    } else {
      sleep(3000);
      console.log(['公开的直播间没有红包','NO lottery in Public'][Language]);
      sleep(4000);
      hongbao.back();
      sleep(3000);
      console.log(['离开公开的直播间','Out Live 2 Public'][Language])
    }
  }
 sleep(2000);
  className("android.view.ViewGroup").desc("直播,6之1,标签").exists() ? className("android.view.ViewGroup").desc("直播,6之1,标签").findOne().click() : console.log("no直播");
  sleep(4000);
  hongbao.findhongbao()
}
hongbao.gethongbao = function(剩余红包数量) {
  for (var i = 0; i < parseInt(剩余红包数量); i++) {
    if(id("red_point").exists()){
        if(parseInt(id("red_point").findOne().text())<2){
           console.log(['跳过','skip'][Language])
           continue;
        }
    }
    console.time("before");
    console.log("-----------------------------");
    console.log(["剩余:","Residue:"][Language] + (parseInt(剩余红包数量) - i));
    sleep(5000);
    var bb = className('android.widget.TextView').text("已开奖").exists();
    if (bb) {
      console.log(['等待红包出现','Waiting For Lottery'][Language]);
      sleep(2000)
    }
    console.time("gift1");
    hongbao.gift()
    console.timeEnd("gift1");
    sleep(2000);
    console.timeEnd("before");
    var aa = id("iv_popular_rp_lottery").exists();
    
    if (aa) {
      console.time('center')
      var a = id("iv_popular_rp_lottery").findOne().bounds();
      click(a.centerX(), a.centerY());
      sleep(5000);
      click("关注主播并参与")&&console.log(['关注并参与','Followed & Participated'][Language]);
      sleep(1000);
      click("一键参与")&&console.log(['已参与','Participated'][Language]);
      sleep(2000);
      click("关注主播并参与")&&console.log(['关注并参与','Followed & Participated'][Language]);
      sleep(1000);
      click("一键参与")&&console.log(['已参与','Participated'][Language]);
      sleep(2000);
      click("关注主播并参与")&&console.log(['关注并参与','Followed & Participated'][Language]);
      sleep(1000);
      click("一键参与")&&console.log(['已参与','Participated'][Language]);
      console.timeEnd('center')
      sleep(4000);
      
      var cc = className('android.widget.TextView').text("一键参与").exists()||className('android.view.View').text("一键参与").exists();
      var dd = className('android.widget.TextView').text("关注主播并参与").exists()||className('android.view.View').text("关注主播并参与").exists();
      if (cc || dd) {
        console.log(["你已达今日抽奖上限","You have reached the maximum draw for today"][Language]);
        if (className("android.widget.TextView").clickable(true).depth(15).exists()||className("android.view.View").clickable(true).depth(15).exists()){
            back()
        }
        device.vibrate(1000);
        hamibot.exit();
        break
      }
      
      
      console.time('gift2')
      hongbao.gift();
      console.timeEnd('gift2')
      
    } else {
      console.log(['退出','exit'][Language])
      break;
    }
  }
}
hongbao.gift = function() {
    sleep(500);
    var g = className("android.widget.TextView").text("当前直播已结束").exists()||className("android.view.View").text("当前直播已结束").exists();
    if (g) {
        id("enter_room_btn").findOne().click()
    }
    sleep(500);
    var c = className('android.widget.TextView').text("立即投喂").exists()||className('android.view.View').text("立即投喂").exists();
    if (c) {
        console.log(['抽中了','Drawn'][Language])
      g++
        back()
        //     var f = className("android.widget.TextView").clickable(true).depth(14).findOne().click();
        //     f ? console.log(["已关闭","CLOSED"][Language]) : console.log(["未关闭","NO CLOSE"][Language]);
    }
    sleep(500);
    var d = className("android.widget.TextView").text("很遗憾，没有抽中").exists()||className("android.view.View").text("很遗憾，没有抽中").exists()
;
    if (d) {
        console.log( ['未抽中','Didn\'t win'][Language])
      b++
        back()
    }
    sleep(500);
    var e = className("android.widget.TextView").text("下次参与抽奖，欧皇就是你~").exists()||className("android.view.View").text("下次参与抽奖，欧皇就是你~").exists();
    if (e) {
        console.log(["没有下次参与抽奖，欧皇就是你~","Without participating in the lottery next time, Ouhuang is you~"][Language]);
        back()
    }
    sleep(500);
    var c = className('android.widget.TextView').text("立即投喂").exists()||className('android.view.View').text("立即投喂").exists();
    if (c) {
        console.log(['抽中了','Drawn'][Language])
        g++
        back()
    }

    sleep(500);
    var d = className("android.widget.TextView").text("很遗憾，没有抽中").exists()||className("android.view.View").text("很遗憾，没有抽中").exists();
    if (d) {
        console.log( ['未抽中','Didn\'t win'][Language])
        b++
      back()
    }
    sleep(500);
    if(className("android.widget.TextView").text("规则").exists()||className("android.view.View").text("规则").exists()){
        back()
    }
    sleep(500);
    if (className("android.widget.TextView").clickable(true).depth(14).exists()||className("android.view.View").clickable(true).depth(14).exists()) {
       back()
        sleep(1000)
        if(id("anchor_card_fl").exists()){
            click(800,600)
        }
    }
    sleep(500);
    if (className("android.widget.TextView").clickable(true).depth(15).exists()||className("android.view.View").clickable(true).depth(15).exists()) {

        sleep(1000)
        if(id("rl_back").exists()){
            back()
        }
        if(!id("live_room_close").exists()){
            back()
        }

    }
}
hongbao.back=function(){
  var tui=3;
  for(var i=0;i<tui;i++){
   if(id("error_tips").exists()){
        back()
    }
    if(id("close_live_room").exists()){
        back()
    }
    if(id("toolbar_back").exists()){
        break
    }
    if(id("live_room_close").exists()){
        break
    }
    if(!id("live_room_close").exists()){
        back()
    }
    sleep(500)
  }
  if(id("live_room_close").exists()){
     id("live_room_close").findOne().click();
  }
}

hongbao.openscreen();

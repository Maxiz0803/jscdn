const {
    screen_pwd,
    SHOW_CONSOLE,
    double_open,
    Language,
} = hamibot.env;
importClass(android.content.Intent);
importClass(android.content.IntentFilter);
importClass(android.os.BatteryManager);
const WAIT_TIME = 500;
const MESSAGES = {
    'zh-CN': {
        UNLOCK_SUCCESS: '解锁成功',
        WAIT_AD_DISAPPEAR: '等待广告消失',
        NO_TEEN_MODE: '无青少年模式',
        NO_HOME_PAGE: '没有首页',
        BACK_TO_HOME: '回到首页',
        NO_LIVE_RECOMMEND: '没有直播推荐',
        NO_MY_FOLLOW: '没有我的关注',
        NO_BILI: '没有哔哩哔哩',
        FOUND_LIVE_WITH_RED_ENVELOPE: '找到{0}个直播间有红包',
        WELCOME: '欢迎来到{0}的直播间',
        NO_RED_ENVELOPE_IN_FOLLOW: '在关注里没有红包',
        LEAVE_FOLLOW_LIVE_ROOM: '离开关注的直播间',
        NO_RED_ENVELOPE_IN_RECOMMENDED_LIVE_ROOM: '推荐的直播间没有红包',
        LEAVE_RECOMMENDED_LIVE_ROOM: '离开推荐的直播间',
        NO_LIVE_BROADCAST: '没直播',
        LEAVE_LIVE_ROOM: '离开直播间',
        SKIP: '跳过',
        WAIT_RED_ENVELOPE_APPEAR: '等待红包出现',
        FOLLOW_AND_PARTICIPATE: '关注并参与',
        ALREADY_FOLLOWED: '已关注',
        DRAW_LIMIT_REACH: '你已达今日抽奖上限',
        DRAWN: '抽中了',
        DIDNT_WIN: '很遗憾，没有抽中',
        OUCHUANG_NEXT_TIME: '下次参与抽奖，欧皇就是你~',
        LIVE_BROADCAST_ENDED: '直播已结束',
        CHOSEN_BY_THE_HEAVENS: '天选之子'
    },
    'en-US': {
        UNLOCK_SUCCESS: 'Successful unlock',
        WAIT_AD_DISAPPEAR: 'Waiting for ad to disappear',
        NO_TEEN_MODE: 'No teenage mode',
        NO_HOME_PAGE: 'No home page',
        BACK_TO_HOME: 'Back to home',
        NO_LIVE_RECOMMEND: 'No live recommendations',
        NO_MY_FOLLOW: 'No my follow',
        NO_BILI: 'No Bilibili',
        WELCOME: 'Welcome to {0}\'s live room',
        FOUND_LIVE_WITH_RED_ENVELOPE: 'Found {0} room(s) with red envelopes',
        NO_RED_ENVELOPE_IN_FOLLOW: 'No red envelopes in follow',
        LEAVE_FOLLOW_LIVE_ROOM: 'Exit live room in follow',
        NO_RED_ENVELOPE_IN_RECOMMENDED_LIVE_ROOM: 'No red envelopes in recommended live room',
        LEAVE_RECOMMENDED_LIVE_ROOM: 'Exit recommended live room',
        NO_LIVE_BROADCAST: 'No live broadcast',
        LEAVE_LIVE_ROOM: 'Exit live room',
        SKIP: 'skip',
        WAIT_RED_ENVELOPE_APPEAR: 'Waiting for red envelope to appear',
        FOLLOW_AND_PARTICIPATE: 'Follow and participate',
        ALREADY_FOLLOWED: 'Already followed',
        DRAW_LIMIT_REACH: 'You have reached today\'s drawing limit',
        DRAWN: 'Drawn',
        DIDNT_WIN: 'Didn\'t win',
        OUCHUANG_NEXT_TIME: 'Without participating in the lottery next time, Ouhuang is you~',
        LIVE_BROADCAST_ENDED: 'Live broadcast has ended',
        CHOSEN_BY_THE_HEAVENS: 'Chosen by the heavens'
    }
}

let BatteryT; //电池温度
let BatteryTemp; //电池使用情况
let lastBatteryT;
let lastBatteryTemp;
let mBatInfoReceiver = new JavaAdapter(android.content.BroadcastReceiver, {
    onReceive: function (context, intent) {
        let action = intent.getAction();
        if (Intent.ACTION_BATTERY_CHANGED.equals(action)) {
            BatteryT = intent.getIntExtra("temperature", 0); //电池温度
            switch (intent.getIntExtra("health", BatteryManager.BATTERY_HEALTH_UNKNOWN)) {
                case BatteryManager.BATTERY_HEALTH_UNKNOWN:
                    BatteryTemp = "未知错误"; break;
                case BatteryManager.BATTERY_HEALTH_GOOD:
                    BatteryTemp = "状态良好"; break;
                case BatteryManager.BATTERY_HEALTH_DEAD:
                    BatteryTemp = "电池没有电"; break;
                case BatteryManager.BATTERY_HEALTH_OVER_VOLTAGE:
                    BatteryTemp = "电池电压过高"; break;
                case BatteryManager.BATTERY_HEALTH_OVERHEAT:
                    BatteryTemp = "电池过热"; break;
            }
        }
        if(BatteryTemp===lastBatteryTemp&&BatteryT===lastBatteryT){
            return;
        }
        lastBatteryT=BatteryT;
        lastBatteryTemp=BatteryTemp;
        log((BatteryT * 0.1).toFixed(2) +
            "℃" + "---" + BatteryTemp);
        
    }
})
auto.waitFor();
// 控制台显示
if (SHOW_CONSOLE) {
    console.show();
    sleep(300);
    console.setPosition(0, 400);
    console.setSize(device.width / 2, device.height / 4)
}


// 好坏

var good = 0;
var bad = 0;
var livesum = 0;
var uname, upname;
// 获取当前系统音量
var originalVolume = device.getMusicVolume();
var maxVolume = device.getMusicMaxVolume()
var newVolume = Math.floor(maxVolume * 0.2);
var audioDir = "/sdcard/AutoJS/"; // 音频文件保存目录
var audioPath = "/sdcard/AutoJS/today_limit.mp3"; // 音频文件保存路径
if (!files.exists(audioDir)) {
    files.createWithDirs(audioDir); // 如果目录不存在，就创建目录
}
if (!files.exists(audioPath)) {
    var url = "https://raw.iqiq.io/mxk-zwh/jscdn/main/today_limit.mp3"; // 音频文件下载地址
    var res = http.get(url);
    var audioData = res.body.bytes(); // 获取下载的数据
    files.writeBytes(audioPath, audioData); // 将数据写入文件
}
var url = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=31fc3a61-3cd1-4985-ba1c-f771fd05053d"; // 替换为实际的 Webhook 地址 2233
var json = {
    "msgtype": "markdown",
    "markdown": {
        "content": ""
    }
};

var tools = {
    openscreen: () => {
        if (!device.isScreenOn()) {
            device.wakeUp();
            sleep(500);
            swipe(random(device.width / 3, device.width / 2), random(device.height * 8 / 10, device.height * 7 / 10), random(device.width / 3, device.width / 2), random(device.height * 2 / 10, device.height / 10), random(500, 1000));
            swipe(500, 2000, 500, 1000, 210);
            sleep(500);
            swipe(random(device.width / 3, device.width / 2), random(device.height * 8 / 10, device.height * 7 / 10), random(device.width / 3, device.width / 2), random(device.height * 2 / 10, device.height / 10), random(500, 1000));
            swipe(500, 2000, 500, 1000, 210);
            sleep(1000);
            var password = screen_pwd;
            for (var i = 0; i < password.length; i++) {
                var p = text(password[i].toString()).findOne().bounds();
                click(p.centerX(), p.centerY());
                sleep(100)
            }
            console.log(MESSAGES[Language].UNLOCK_SUCCESS);
            //     MESSAGES[Language].
            home();
            sleep(1000);
            hongbao.openapp()
        }
        home();
        sleep(1000);
        home();
        sleep(1000);
        hongbao.openapp()
    },
    wait: (time) => {
        sleep(time)
    },
    repeater: (times, func) => {
        for (let i = 0; i < times; i++) {
            func()
        }
    },
    send: (text) => {
        json.markdown.content = text
        http.postJson(url, json);
    }
}
var hongbao = {
    openapp: () => {
        sleep(1000);
        if (text("哔哩哔哩").exists()) {
            click("哔哩哔哩", (double_open - 1));
            var a = id('toolbar_menu_1').exists();
            if (!a) {
                console.log(MESSAGES[Language].WAIT_AD_DISAPPEAR);
                sleep(10000)
            }
            className("android.widget.TextView").text("进入青少年模式 >").exists() ? click("我知道了") : console.log(MESSAGES[Language].NO_TEEN_MODE);
            sleep(500);

            sleep(1000);
            desc("首页,5之1,标签").exists() ? desc("首页,5之1,标签").findOne().click() : hongbao.back2home();
            sleep(1000);

            className("android.view.ViewGroup").desc("直播,6之1,标签").exists() ? className("android.view.ViewGroup").desc("直播,6之1,标签").findOne().click() : console.log(MESSAGES[Language].NO_LIVE_RECOMMEND);
            //     sleep(1000);
            //     className("android.widget.TextView").text("我的关注").exists() ? click("我的关注") : console.log(['没有我的关注','No, my followings'][Language]);
            sleep(3000);
            hongbao.hot2Wait()
            hongbao.findhongbao()
        } else {
            console.log(MESSAGES[Language].NO_BILI)
        }
    },
    findhongbao: () => {
        sleep(3000);
        className("android.widget.TextView").text("我的关注").exists() ? click("我的关注") : console.log(MESSAGES[Language].NO_MY_FOLLOW);
        sleep(4000);
        var a = className("android.widget.TextView").text("红包").find().length || className('android.view.View').text('红包').find().length;
        console.log("==================");
        log(MESSAGES[Language].FOUND_LIVE_WITH_RED_ENVELOPE.replace('{0}', a));
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
                console.log(MESSAGES[Language].NO_RED_ENVELOPE_IN_FOLLOW);
                //       [,][Language]
                sleep(3000);
                hongbao.back();
                sleep(4000);
                console.log(MESSAGES[Language].LEAVE_FOLLOW_LIVE_ROOM)
            } else {
                sleep(3000);
                console.log(MESSAGES[Language].NO_RED_ENVELOPE_IN_FOLLOW);
                sleep(500);
                hongbao.back()
                sleep(500);
                console.log(MESSAGES[Language].LEAVE_FOLLOW_LIVE_ROOM)
            }
        }
        sleep(2000);
        id("toolbar_back").findOne().click();
        sleep(3000);

        a = className("android.widget.TextView").text("红包").find().length || className('android.view.View').text('红包').find().length;
        console.log("==================");
        console.log(MESSAGES[Language].FOUND_LIVE_WITH_RED_ENVELOPE.replace('{0}', a));
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
                console.log(MESSAGES[Language].NO_RED_ENVELOPE_IN_RECOMMENDED_LIVE_ROOM);
                sleep(4000);
                hongbao.back();
                sleep(3000);
                console.log(MESSAGES[Language].LEAVE_RECOMMENDED_LIVE_ROOM)
            } else {
                sleep(3000);
                console.log(MESSAGES[Language].NO_RED_ENVELOPE_IN_RECOMMENDED_LIVE_ROOM);
                sleep(4000);
                hongbao.back();
                sleep(3000);
                console.log(MESSAGES[Language].LEAVE_RECOMMENDED_LIVE_ROOM)
            }
        }
        sleep(2000);
        className("android.view.ViewGroup").desc("直播,6之1,标签").exists() ? className("android.view.ViewGroup").desc("直播,6之1,标签").findOne().click() : console.log(MESSAGES[Language].NO_LIVE_BROADCAST);
        sleep(4000);
        if (parseFloat((BatteryT * 0.1).toFixed(1)) > 38.5) {
            toastLog('休息一会儿')
            tools.wait(60 * 1000);
        } else if (BatteryTemp == "电池过热") {
            toastLog('休息一会儿')
            tools.wait(120 * 1000);
        }
        hongbao.findhongbao()
    },
    gethongbao: (剩余红包数量) => {
        for (var i = 0; i < parseInt(剩余红包数量); i++) {
            if (id("red_point").exists()) {
                if (parseInt(id("red_point").findOne().text()) < 2) {
                    console.log(MESSAGES[Language].SKIP)
                    continue;
                }
            }
            console.time("before");
            console.log("-----------------------------");
            sleep(5000);

            if (className('android.widget.TextView').text("已开奖").exists()) {
                console.log(MESSAGES[Language].WAIT_RED_ENVELOPE_APPEAR);
                sleep(2000)
            }

            console.time("check1");
            hongbao.checkResult()
            toastLog(MESSAGES[Language].WELCOME.replace('{0}', upname))
            console.timeEnd("check1");

            sleep(2000);
            console.timeEnd("before");
            if (id("iv_popular_rp_lottery").exists()) {
                // 点红包
                console.time('center')
                var a = id("iv_popular_rp_lottery").findOne().bounds();
                click(a.centerX(), a.centerY());
                // 红包加载
                sleep(5000);
                livesum++;
                tools.repeater(3, function () {
                    click("关注主播并参与") && console.log(MESSAGES[Language].FOLLOW_AND_PARTICIPATE);
                    sleep(1000);
                    click("一键参与") && console.log(MESSAGES[Language].ALREADY_FOLLOWED);
                    sleep(2000);
                })
                console.timeEnd('center')
                sleep(4000);
                // 上限提醒
                if (text("一键参与").exists() || text("关注主播并参与").exists()) {
                    console.log(MESSAGES[Language].DRAW_LIMIT_REACH);
                    device.setMusicVolume(4)
                    // 播放音频文件
                    media.playMusic(audioPath);
                    // 等播放
                    sleep(media.getMusicDuration());
                    // 恢复原来的音量
                    device.setMusicVolume(originalVolume);
                    var md = "<font color='warning'>[b红包]今日领取已上限</font>\n<font color='comment'>今天点了" +
                        livesum + "个直播间</font>\n<font color='comment'>抽中" +
                        good + "次，没中" +
                        bad + "次</font>"
                    tools.send(md);

                    if (className("android.widget.TextView").clickable(true).depth(15).exists() || className("android.view.View").clickable(true).depth(15).exists()) {
                        back()
                    }
                    device.vibrate(1000);
                    hamibot.exit();
                    break
                }

                console.time('check2')
                hongbao.checkResult();
                console.timeEnd('check2')

            } else {
                console.log(MESSAGES[Language].LEAVE_LIVE_ROOM)
                break;
            }
        }
    },
    checkResult: () => {
        if (text("立即投喂").exists() || text("立即投喂").exists()) {
            console.log(MESSAGES[Language].DRAWN)
            good++;
            back()
        } else if (text("很遗憾，没有抽中").exists() || text("很遗憾，没有抽中").exists()) {
            console.log(MESSAGES[Language].DIDNT_WIN)
            bad++;
            back()
        } else if (text("下次参与抽奖，欧皇就是你~").exists() || text("下次参与抽奖，欧皇就是你~").exists()) {
            console.log(MESSAGES[Language].OUCHUANG_NEXT_TIME)
            back()
        }
        // 遇到直播结束
        tools.repeater(2, function () {
            tools.wait(WAIT_TIME)
            if (text("当前直播已结束").exists() || text("当前直播已结束").exists()) {
                console.log(MESSAGES[Language].LIVE_BROADCAST_ENDED)
                id("enter_room_btn").findOne().click();
            }
        })
        // 天选
        if (text("规则").exists()) {
            console.log(MESSAGES[Language].CHOSEN_BY_THE_HEAVENS)
            back()
        }
        tools.wait(WAIT_TIME)
        if (className("android.widget.TextView").clickable(true).depth(14).exists() || className("android.view.View").clickable(true).depth(14).exists()) {
            back()
            tools.wait(1000)
            if (id("anchor_card_fl").exists()) {
                click(800, 600)
            }
        }
        tools.wait(WAIT_TIME)
        if (className("android.widget.TextView").clickable(true).depth(15).exists() || className("android.view.View").clickable(true).depth(15).exists()) {
            tools.wait(1000)
            if (id("rl_back").exists()) {
                back()
            } else if (!id("live_room_close").exists()) {
                back()
            }
        }
        try {
            upname = id("anchor_nickname").find()[0].text()
        } catch (e) {
            upname = "未知"
        }
    },
    back: () => {
        var tui = 3;
        for (var i = 0; i < tui; i++) {
            if (id("error_tips").exists()) {
                back()
            } else if (id("close_live_room").exists()) {
                back()
            } else if (id("toolbar_back").exists()) {
                break
            } else if (id("live_room_close").exists()) {
                id("live_room_close").findOne().click();
                break
            } else if (!id("live_room_close").exists()) {
                back()
            }
            sleep(500)
        }
    },
    hot2Wait: () => {
        // 注册
        let filter = new IntentFilter();
        filter.addAction(Intent.ACTION_BATTERY_CHANGED);
        context.registerReceiver(mBatInfoReceiver, filter);
        // 监听退出 注册
        events.on("exit", function () { unregisterReceiver(); });
        function unregisterReceiver() {
            context.unregisterReceiver(mBatInfoReceiver); toastLog("关闭广播监听");
        }
    },
    back2home: () => {
        console.log(MESSAGES[Language].NO_HOME_PAGE)
        if (!desc("首页,5之1,标签").exists()) {
            back()
            sleep(WAIT_TIME)
            hongbao.back2home()
        } else {
            console.log(MESSAGES[Language].BACK_TO_HOME)
            desc("首页,5之1,标签").findOne().click()
        }
    }
};
tools.openscreen()

const { screen_pwd,game } = hamibot.env;
const mysapp = "米游社"
const mysapk = "com.mihoyo.hyperion"
console.show()
console.setPosition(200, 1400);
console.setSize(device.width/2, device.height / 4);
auto('fast');
//流程

toastLog("开始签到")
unlock()

// 截图权限()
restart_myshe()

home()
toastLog("结束签到")
console.hide()
sleep(2000)
hamibot.exit()


//test

//通用函数
function ScreenLock() {
    importClass(android.content.Context);
    var km = context.getSystemService(Context.KEYGUARD_SERVICE);
    return km.isKeyguardLocked() && km.isKeyguardSecure();
}
function unlock() {
    if (ScreenLock()) {
        log("屏幕锁了");
        if (!device.isScreenOn()) {
            device.wakeUp();
            sleep(1000);
            //小米解锁（防误触）
            swipe(random(device.width / 3, device.width / 2), random(device.height * 8 / 10, device.height * 7 / 10), random(device.width / 3, device.width / 2), random(device.height * 2 / 10, device.height / 10), random(500, 1000))
            sleep(1000);
            var password = screen_pwd;
            for (var i = 0; i < password.length; i++) {
                var p = text(password[i].toString()).findOne().bounds();
                click(p.centerX(), p.centerY());
                sleep(100);
            }
        }
    } else {
        log("未锁屏");
    }
}
function killApp(appName) {//填写包名或app名称都可以
    var name = getPackageName(appName);//通过app名称获取包名
    if (!name) {//如果无法获取到包名，判断是否填写的就是包名
        if (getAppName(appName)) {
            name = appName;//如果填写的就是包名，将包名赋值给变量
        } else {
            return false;
        }
    }
    log(name)
    app.openAppSetting(name);
    sleep(2000);
    if (text(app.getAppName(name)).exists()) {
        //       小米
        let is_sure = text("结束运行").findOne();
        if (is_sure.enabled()) {
            is_sure.parent().click();
            click("结束运行")
            sleep(500)
            click("确定", 0)
            log(app.getAppName(name) + "应用已被关闭");
            home()

        } else {
            log(app.getAppName(name) + "应用不能被正常关闭或不在后台运行");
            back();
        }
    } else {
        log("不对，重开")
        back()
        killApp(name)
    }
}
// 重启
function restart_myshe() {
    log("杀后台")
    killApp(mysapk)
    log("3s后启动 " + mysapp)
    sleep(3000)
    log("正在启动 " + mysapp)
    app.launch(mysapk);
    switch (game){
        case 'ys':
            ys();
            break;
        case 'xqtd':
            xqtd();
            break;
    }
}
// 启动页青少年
function 青少年() {

    var thread = threads.start(function () {
        setInterval(function () {
            if (className("android.widget.TextView").text("青少年模式").exists()) {
                id("tv_dialog_i_know").findOne().click()
            }
            if (id("mUpgradeDialogCancel").exists()) {
                id("mUpgradeDialogCancel").findOne().click()
            }
        }, 1000);
    });
    thread.waitFor()
    toastLog("检测青少年\n版本更新")
    sleep(2 * 1000)
    thread.interrupt()

}


function 绕过人机验证() {
    var thread = threads.start(function () {
        //在子线程执行的定时器
        setInterval(function () {
            if (textContains("人机验证").findOne()) {
                toastLog("发现人机验证")
                sleep(1000)
                className("android.widget.Button").text("关闭验证").waitFor()
                className("android.widget.Button").text("关闭验证").findOne().click()
            }
        }, 1000);
    });
    //等待子线程启动
    thread.waitFor();
    toastLog("正在检测人机验证")
    sleep(3 * 1000);
    thread.interrupt();
}
function 截图权限() {
    var thread = threads.start(function () {
        sleep(1000)//反悔时间
        var beginBtn;
        if (beginBtn = classNameContains("Button").textContains("立即开始").findOne(2000)) {
            beginBtn.click();
        }
    });
    thread.waitFor()
    log("请求截图权限")
    if (!requestScreenCapture()) {
        toastLog('没有授予 Hamibot 屏幕截图权限');
        hamibot.exit();
    }
    thread.interrupt()
}


// 特殊函数
function ys() {
    log("%s 已启动", mysapp)
    sleep(5000)
    青少年()
    sleep(2000)
    if (id("mHomeTabItemTvTitle").className('android.widget.TextView').exists()) {
        log("点原神")
        var d = id("mHomeTabItemTvTitle").className("android.widget.TextView")
        .text("原神").findOne().bounds();
        log("获取Rect: " + d)
        click(d.centerX(), d.centerY());
        sleep(2000)
        click("签到")
        sleep(2000)
      
        if(className("android.widget.TextView").depth(20).text('签到福利').find().length>1){
          var i=1;click('签到福利',i);
        }else{click('签到福利')}
        sleep(2000)
        var t = id("titleTextView").findOne().text()
        log(t)
        //绕过人机验证()
//         八天签到()
        sleep(10*1000)
        className("android.widget.TextView").clickable(true).depth(12).textContains('天').find().click()
    } else {
        log("3")
        sleep(1000)
        restart_myshe()

    }
}


function 八天签到() {
    sleep(3000)
    if (className("android.widget.TextView").text("补签").exists()) {
        每日签到()
    } else {
        退出重试()
    }
}
function 退出重试() {
    back()
    sleep(1000)
    click("签到福利",2)
    sleep(3000)
    //绕过人机验证()
    八天签到()
}
function 每日签到() {
    sleep(2000)
    log("证明在运行")
    var [x,y] = 找图()
    if (x && y) {

        log("坐标：%s , %s", x, y)
        click(x, y);
        sleep(2000)
        // 已获得
        var awards = className('android.widget.TextView').depth(13).indexInParent(4).find().get(0).text();
        if (awards) {
            toastLog('\t签到成功\n明天可获得：' + awards + '\n\t签到结束');
        }
    } else {
        toastLog("\t已经签过了\n明天再来")
        sleep(2000)
        toastLog("签到结束")
    }

}


function 找图() {
    sleep(2000)
    captureScreen('/sdcard/领取中' + '.jpg')
    toastLog("截图完成")
    var img = images.read('/sdcard/领取中.jpg')
    // var templ = images.read('/sdcard/screencapture/领.jpg')
    var templ = images.load('https://raw.githubusercontent.com/mxk-zwh/jscdn/main/ling.jpg')
    var p = images.findImage(img, templ)
    if (p) {
        toastLog('找到啦:' + p.x + "," + p.y);
        img.recycle();
        templ.recycle();
        return [(p.x - 64), (p.y + 180)];
    } else {
        toastLog('没找到');
        img.recycle();
        templ.recycle();
        return []
    }
}

function xqtd(){
    log("%s 已启动", mysapp)
    sleep(5000)
    青少年()
    sleep(2000)
    if (id("mHomeTabItemTvTitle").className('android.widget.TextView').exists()) {
        log("点星穹铁道")
        var d = id("mHomeTabItemTvTitle").className("android.widget.TextView")
        .text("崩坏：星穹铁道").findOne().bounds();
        log("获取Rect: " + d)
        click(d.centerX(), d.centerY());
        sleep(2000)
        click("签到")
        sleep(2000)
      click('签到福利',0);
        sleep(20000)
        className("android.widget.TextView").clickable(true).depth(13).textContains('天').find().click()
        //绕过人机验证()
        
    } else {
        log("3")
        sleep(1000)
        restart_myshe()

    }
}










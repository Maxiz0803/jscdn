//bhongbao v2.0
// 导入配置文件
const {
  screen_pwd,
  webhookUrl,
  SHOW_CONSOLE,
  double_open,
  Language,
  lowBattery,
} = hamibot.env;
// 导入安卓的包
importClass(android.content.Intent);
importClass(android.content.IntentFilter);
importClass(android.os.BatteryManager);
const WAIT_TIME = 500;
// 双语包
const MESSAGES = {
  "zh-CN": {
    UNLOCK_SUCCESS: "解锁成功",
    SCREEN_UNLOCKED: "未锁屏",
    WAIT_AD_DISAPPEAR: "等待广告消失",
    NO_TEEN_MODE: "无青少年模式",
    NO_HOME_PAGE: "没有首页",
    BACK_TO_HOME: "回到首页",
    NO_LIVE_RECOMMEND: "没有直播推荐",
    NO_MY_FOLLOW: "没有我的关注",
    NO_BILI: "没有哔哩哔哩",
    FOUND_LIVE_WITH_RED_ENVELOPE: "找到{0}个直播间有红包",
    WELCOME: "欢迎来到{0}的直播间",
    NO_RED_ENVELOPE_IN_FOLLOW: "在关注里没有红包",
    LEAVE_FOLLOW_LIVE_ROOM: "离开关注的直播间",
    NO_RED_ENVELOPE_IN_RECOMMENDED_LIVE_ROOM: "推荐的直播间没有红包",
    LEAVE_RECOMMENDED_LIVE_ROOM: "离开推荐的直播间",
    NO_LIVE_BROADCAST: "没直播",
    LEAVE_LIVE_ROOM: "离开直播间",
    SKIP: "跳过",
    WAIT_RED_ENVELOPE_APPEAR: "等待红包出现",
    FOLLOW_AND_PARTICIPATE: "关注并参与",
    ALREADY_FOLLOWED: "已关注",
    DRAW_LIMIT_REACH: "你已达今日抽奖上限",
    DRAWN: "抽中了",
    DIDNT_WIN: "很遗憾，没有抽中",
    OUCHUANG_NEXT_TIME: "下次参与抽奖，欧皇就是你~",
    LIVE_BROADCAST_ENDED: "直播已结束",
    CHOSEN_BY_THE_HEAVENS: "天选之子",
  },
  "en-US": {
    UNLOCK_SUCCESS: "Successful unlock",
    SCREEN_UNLOCKED: "Not Locked Screen",
    WAIT_AD_DISAPPEAR: "Waiting for ad to disappear",
    NO_TEEN_MODE: "No teenage mode",
    NO_HOME_PAGE: "No home page",
    BACK_TO_HOME: "Back to home",
    NO_LIVE_RECOMMEND: "No live recommendations",
    NO_MY_FOLLOW: "No my follow",
    NO_BILI: "No Bilibili",
    WELCOME: "Welcome to {0}'s live room",
    FOUND_LIVE_WITH_RED_ENVELOPE: "Found {0} room(s) with red envelopes",
    NO_RED_ENVELOPE_IN_FOLLOW: "No red envelopes in follow",
    LEAVE_FOLLOW_LIVE_ROOM: "Exit live room in follow",
    NO_RED_ENVELOPE_IN_RECOMMENDED_LIVE_ROOM:
      "No red envelopes in recommended live room",
    LEAVE_RECOMMENDED_LIVE_ROOM: "Exit recommended live room",
    NO_LIVE_BROADCAST: "No live broadcast",
    LEAVE_LIVE_ROOM: "Exit live room",
    SKIP: "skip",
    WAIT_RED_ENVELOPE_APPEAR: "Waiting for red envelope to appear",
    FOLLOW_AND_PARTICIPATE: "Follow and participate",
    ALREADY_FOLLOWED: "Already followed",
    DRAW_LIMIT_REACH: "You have reached today's drawing limit",
    DRAWN: "Drawn",
    DIDNT_WIN: "Didn't win",
    OUCHUANG_NEXT_TIME:
      "Without participating in the lottery next time, Ouhuang is you~",
    LIVE_BROADCAST_ENDED: "Live broadcast has ended",
    CHOSEN_BY_THE_HEAVENS: "Chosen by the heavens",
  },
};
// 电池的信息
let BatteryN; //目前电量
let BatteryT; //电池温度
let BatteryStatus; //电池状态
let BatteryTemp; //电池使用情况
let lastBatteryT;
let lastBatteryTemp;
// 电量信息接收 ali
let mBatInfoReceiver = new JavaAdapter(android.content.BroadcastReceiver, {
  onReceive(context, intent) {
    let action = intent.getAction();
    if (Intent.ACTION_BATTERY_CHANGED.equals(action)) {
      BatteryN = intent.getIntExtra("level", 0); //目前电量
      BatteryT = intent.getIntExtra("temperature", 0); //电池温度
      switch (
        intent.getIntExtra("status", BatteryManager.BATTERY_STATUS_UNKNOWN)
      ) {
        case BatteryManager.BATTERY_STATUS_CHARGING:
          BatteryStatus = "充电状态";
          break;
        case BatteryManager.BATTERY_STATUS_DISCHARGING:
          BatteryStatus = "放电状态";
          break;
        case BatteryManager.BATTERY_STATUS_NOT_CHARGING:
          BatteryStatus = "未充电";
          break;
        case BatteryManager.BATTERY_STATUS_FULL:
          BatteryStatus = "充满电";
          break;
        case BatteryManager.BATTERY_STATUS_UNKNOWN:
          BatteryStatus = "未知道状态";
          break;
      }
      switch (
        intent.getIntExtra("health", BatteryManager.BATTERY_HEALTH_UNKNOWN)
      ) {
        case BatteryManager.BATTERY_HEALTH_UNKNOWN:
          BatteryTemp = "未知错误";
          break;
        case BatteryManager.BATTERY_HEALTH_GOOD:
          BatteryTemp = "状态良好";
          break;
        case BatteryManager.BATTERY_HEALTH_DEAD:
          BatteryTemp = "电池没有电";
          break;
        case BatteryManager.BATTERY_HEALTH_OVER_VOLTAGE:
          BatteryTemp = "电池电压过高";
          break;
        case BatteryManager.BATTERY_HEALTH_OVERHEAT:
          BatteryTemp = "电池过热";
          break;
      }
    }
    if (BatteryTemp === lastBatteryTemp && BatteryT === lastBatteryT) {
      return;
    }
    lastBatteryT = BatteryT;
    lastBatteryTemp = BatteryTemp;
  },
});
// 打开无障碍
auto.waitFor();
// 控制台显示
if (SHOW_CONSOLE) {
  console.show();
  sleep(300);
  console.setPosition(0, 400);
  console.setSize(device.width / 2, device.height / 4);
}

const state = {
  // 红包直播间的信息
  good: 0,
  bad: 0,
  totalRooms: 0,
  // 用户信息
  userInfo: {
    uname: "帅哥",
    upname: "美妙",
    follow: "",
    fan: "",
  },
  //   日期
  date: {
    dateObj: {},
    year: 2000,
    month: 12,
    day: 30,
    hour: 12,
    minute: 59,
    second: 59,
    timeStr: "2023年8月14日20:46:03",
  },
  //   音量
  originalVolume: device.getMusicVolume(),
  lowBatteryThreshold: lowBattery,
  maxVolume: device.getMusicMaxVolume(),
  newVolume: Math.floor(this.maxVolume * 0.2),
  //
  basePath: "/sdcard/AutoJS/",
  urls: [
    "https://raw.iqiq.io/mxk-zwh/jscdn/main/today_limit.mp3", //今日上限
    "https://raw.iqiq.io/mxk-zwh/jscdn/main/low_battery_1.mp3", //低电量提示 再不充电，我就该离线了！
    "https://raw.iqiq.io/mxk-zwh/jscdn/main/low_battery_2.mp3", // 我好像开始变慢了，充电是良药！
    "https://raw.iqiq.io/mxk-zwh/jscdn/main/low_battery_3.mp3", //我知道你很忙，但是我真的要充电了。
    "https://raw.iqiq.io/mxk-zwh/jscdn/main/low_battery_4.mp3", //你还能承受关机的后果吗？赶紧充电吧！
  ],
  audioPaths: [
    this.basePath + "low_battery_1.mp3",
    this.basePath + "low_battery_2.mp3",
    this.basePath + "low_battery_3.mp3",
    this.basePath + "low_battery_4.mp3",
  ],
};
// 如果目录不存在，就创建目录
if (!files.exists(state.basePath)) {
  files.createWithDirs(state.basePath);
}
// 下载音频
for (var i = 0; i < state.urls.length; i++) {
  var url = state.urls[i];
  var fileName = files.getNameWithoutExtension(url);
  var extension = files.getExtension(url);
  var audioPath = state.basePath + fileName + "." + extension;

  if (files.exists(audioPath)) {
    toastLog("音频文件已存在,跳过下载：" + fileName + "." + extension);
  } else {
    var res = http.get(url);
    var audioData = res.body.bytes();

    files.writeBytes(audioPath, audioData);
    toastLog("音频文件下载完成：" + fileName);
  }
}
// 替换为实际的 Webhook 地址 2233
var wxurl = webhookUrl;
// 发送卡片
const json = {
  msgtype: "template_card",
  template_card: {
    card_type: "text_notice",
    source: {
      icon_url: "https://hamibot.com/icon.png",
      desc: "Hamibot",
      desc_color: 0,
    },
    emphasis_content: {
      title: "100",
      desc: "进入直播间数量",
    },
    quote_area: {
      type: 0,
      title: "抽取红包信息",
      quote_text: "",
    },
    sub_title_text: "您的脚本已停止",
    horizontal_content_list: [
      {
        keyname: "网名/关注/粉丝",
        value: "张三/404/9",
      },
      {
        keyname: "手机电量",
        value: "11%",
      },
      {
        keyname: "电量状态",
        value: "放电中",
      },
      {
        keyname: "电量温度",
        value: "35度",
      },
      {
        keyname: "结束时间",
        value: "",
      },
    ],
    card_action: {
      type: 1,
      url: "https://hamibot.com/dashboard/scripts/console",
      appid: "APPID",
      pagepath: "PAGEPATH",
    },
  },
};
var redbag;
const tools = {
  // 解锁
  openScreen() {
    if (!device.isScreenOn()) {
      // 息屏就亮屏
      device.wakeUp();
      sleep(500);
      //   滑动两次 有防误触
      swipe(
        random(device.width / 3, device.width / 2),
        random((device.height * 8) / 10, (device.height * 7) / 10),
        random(device.width / 3, device.width / 2),
        random((device.height * 2) / 10, device.height / 10),
        random(500, 1000)
      );
      swipe(500, 2000, 500, 1000, 210);
      sleep(500);
      swipe(
        random(device.width / 3, device.width / 2),
        random((device.height * 8) / 10, (device.height * 7) / 10),
        random(device.width / 3, device.width / 2),
        random((device.height * 2) / 10, device.height / 10),
        random(500, 1000)
      );
      swipe(500, 2000, 500, 1000, 210);
      sleep(1000);
      //   输入密码
      var password = screen_pwd;
      for (var i = 0; i < password.length; i++) {
        var p = text(password[i].toString()).findOne().bounds();
        click(p.centerX(), p.centerY());
        sleep(100);
      }
      console.log(MESSAGES[Language].UNLOCK_SUCCESS);
    } else {
      console.log(MESSAGES[Language].SCREEN_UNLOCKED);
    }
  },
  // 等待
  wait(time) {
    sleep(time);
  },
  // 循环
  repeater(times, func) {
    for (let i = 0; i < times; i++) {
      func();
    }
  },
  //   日期过滤
  dateFilter(date) {
    if (date < 10) {
      return "0" + date;
    }
    return date;
  },
  //  结束进程的时间
  getEndTime() {
    let dateObj = state.date.dateObj;
    let date = state.date;
    dateObj = new Date();
    date.year = dateObj.getFullYear();
    date.month = dateObj.getMonth() + 1;
    date.day = dateObj.getDate();
    date.hour = dateObj.getHours();
    date.minute = dateObj.getMinutes();
    date.second = dateObj.getSeconds();

    date.timeStr =
      date.year +
      "年" +
      date.month +
      "月" +
      date.day +
      "日" +
      date.hour +
      ":" +
      this.dateFilter(date.minute) +
      ":" +
      this.dateFilter(date.second);
    return date.timeStr;
  },
  // 发送
  send(a) {
    // 直播间数量
    // 抽中了么
    let TemplateCard = json.template_card;
    TemplateCard.emphasis_content.title = state.totalRooms.toString();
    TemplateCard.quote_area.quote_text =
      "抽中" + state.good + "次\n没中" + state.bad + "次";
    // 账号信息
    let horizontalContentList = TemplateCard.horizontal_content_list;
    let userInfo = state.userInfo;
    horizontalContentList[0].value =
      userInfo.uname + " / " + userInfo.follow + " / " + userInfo.fan;

    // 电量
    // 电量状态
    // 电量温度
    // 结束时间
    horizontalContentList[1].value = BatteryN + "%";
    horizontalContentList[2].value = BatteryStatus;
    horizontalContentList[3].value = (BatteryT * 0.1).toFixed(2) + "℃";
    horizontalContentList[4].value = this.getEndTime();
    if (a == 1) {
      TemplateCard.sub_title_text = "[b红包]今日领取已上限";
    } else {
      TemplateCard.sub_title_text = "您的脚本已停止";
    }
    // 把改好的模板发给机器人
    http.postJson(wxurl, json);
  },
  start() {
    this.openScreen();
    home();
    sleep(1000);
    home();
    sleep(1000);
    hongbao.openapp();
  },
};
const hongbao = {
  openapp() {
    sleep(1000);
    if (text("哔哩哔哩").exists()) {
      // 多开应用
      click("哔哩哔哩", double_open - 1);
      // 等待广告消失
      var a = id("toolbar_menu_1").exists();
      if (!a) {
        console.log(MESSAGES[Language].WAIT_AD_DISAPPEAR);
        sleep(10000);
      }
      // 关闭青少年
      className("android.widget.TextView").text("进入青少年模式 >").exists()
        ? click("我知道了")
        : console.log(MESSAGES[Language].NO_TEEN_MODE);
      sleep(500);
      // 获取自己的信息
      this.getUserInfo();
      sleep(1000);
      // 如果不在首页就返回首页
      desc("首页,5之1,标签").exists()
        ? desc("首页,5之1,标签").findOne().click()
        : this.back2home();
      sleep(1000);

      className("android.view.ViewGroup").desc("直播,6之1,标签").exists()
        ? className("android.view.ViewGroup")
            .desc("直播,6之1,标签")
            .findOne()
            .click()
        : console.log(MESSAGES[Language].NO_LIVE_RECOMMEND);
      //     sleep(1000);
      //     className("android.widget.TextView").text("我的关注").exists() ? click("我的关注") : console.log(['没有我的关注','No, my followings'][Language]);
      sleep(3000);
      //   注册电量
      this.register();
      //   找红包
      this.findhongbao();
    } else {
      console.log(MESSAGES[Language].NO_BILI);
    }
  },
  findhongbao() {
    // 跑到我的关注里面找红包
    sleep(3000);
    className("android.widget.TextView").text("我的关注").exists()
      ? click("我的关注")
      : toastLog(MESSAGES[Language].NO_MY_FOLLOW);
    sleep(4000);
    // 多少红包
    var a =
      className("android.widget.TextView").text("红包").find().length ||
      className("android.view.View").text("红包").find().length;
    console.log("==================");
    log(MESSAGES[Language].FOUND_LIVE_WITH_RED_ENVELOPE.replace("{0}", a));
    if (a != 0) {
      // 随便点一个
      var i = Math.round(Math.random() * (a - 1));
      console.log(i);
      click("红包", i);
      sleep(5000);
      var rp = id("iv_popular_rp_lottery").exists();
      var point = id("red_point").exists();
      if (rp || point) {
        this.gethongbao();
      } else {
        sleep(3000);
      }
      console.log(MESSAGES[Language].NO_RED_ENVELOPE_IN_FOLLOW);
      sleep(500);
      // 回到首页
      this.back2home();
      sleep(500);
      toastLog(MESSAGES[Language].LEAVE_FOLLOW_LIVE_ROOM);
    }

    sleep(3000);
    // 跑到首页找红包
    /* a = className("android.widget.TextView").text("红包").find().length || className('android.view.View').text('红包').find().length;
        console.log("==================");
        console.log(MESSAGES[Language].FOUND_LIVE_WITH_RED_ENVELOPE.replace('{0}', a));
        if (a != 0) {
            var i = Math.round(Math.random() * (a - 1));
            console.log(i);
            click("红包", i);
            sleep(5000);
            var rp = id("iv_popular_rp_lottery").exists();
            var point = id("red_point").exists();
            if (rp || point) {
                this.gethongbao();
            } else {
                sleep(3000);
            }
            console.log(MESSAGES[Language].NO_RED_ENVELOPE_IN_RECOMMENDED_LIVE_ROOM);
            sleep(500);
            this.back2home();
            sleep(500);
            toastLog(MESSAGES[Language].LEAVE_RECOMMENDED_LIVE_ROOM)
        }*/
    // this.back2home();
    sleep(2000);
    // 直播刷新
    className("android.view.ViewGroup").desc("直播,6之1,标签").exists()
      ? className("android.view.ViewGroup")
          .desc("直播,6之1,标签")
          .findOne()
          .click()
      : toastLog(MESSAGES[Language].NO_LIVE_BROADCAST);
    sleep(2000);
    // 手机状态：
    // 手机温度
    toastLog((BatteryT * 0.1).toFixed(2) + "℃" + "---" + BatteryTemp);

    sleep(2000);
    // 低电量或者太热休息
    if (parseFloat((BatteryT * 0.1).toFixed(1)) > 38.5) {
      this.lowBatteryTipAudio();
      toastLog("休息一会儿");
      tools.wait(60 * 1000);
    }
    // 回合
    this.findhongbao();
  },
  gethongbao() {
    console.time("before");
    console.log("-----------------------------");
    sleep(5000);
    // 红包已开奖，把倒计时等出来
    if (className("android.widget.TextView").text("已开奖").exists()) {
      console.log(MESSAGES[Language].WAIT_RED_ENVELOPE_APPEAR);
      sleep(2000);
    }

    console.time("check1");
    // 检查红包遮挡，天选之人遮挡
    this.checkResult();
    toastLog(MESSAGES[Language].WELCOME.replace("{0}", state.userInfo.upname));
    console.timeEnd("check1");

    sleep(2000);
    console.timeEnd("before");
    // 领取红包，点开等待再点；没有红包离开
    if (id("iv_popular_rp_lottery").exists()) {
      // 红包太少不要
      if (!id("red_point").exists()) {
        console.log(MESSAGES[Language].SKIP);
        return;
      }
      console.time("center");
      redbag = id("iv_popular_rp_lottery").findOne().bounds();
      click(redbag.centerX(), redbag.centerY());
      sleep(5000);
      state.totalRooms++;
      //   连点三次，防止没点出来
      tools.repeater(3, function () {
        click("关注主播并参与") &&
          console.log(MESSAGES[Language].FOLLOW_AND_PARTICIPATE);
        sleep(1000);
        click("一键参与") && console.log(MESSAGES[Language].ALREADY_FOLLOWED);
        sleep(2000);
      });
      console.timeEnd("center");
      sleep(4000);
      // 领完上限提醒，没有就继续
      if (text("一键参与").exists() || text("关注主播并参与").exists()) {
        // 音频提示上线
        toastLog(MESSAGES[Language].DRAW_LIMIT_REACH);
        device.setMusicVolume(4);
        var limitToday = state.basePath + "today_limit.mp3";
        media.playMusic(limitToday);
        sleep(media.getMusicDuration());
        device.setMusicVolume(state.originalVolume);
        // 发送到企业微信机器人
        tools.send(1);
        // 关闭红包的叉叉，震动后结束
        if (
          className("android.widget.TextView")
            .clickable(true)
            .depth(15)
            .exists() ||
          className("android.view.View").clickable(true).depth(15).exists()
        ) {
          back();
        }
        device.vibrate(1000);
        hamibot.exit();
        return;
      }
      // 二次点过的红包再次检查遮罩
      console.time("check2");
      hongbao.checkResult();
      console.timeEnd("check2");
    } else {
      console.log(MESSAGES[Language].LEAVE_LIVE_ROOM);
      return;
    }
  },
  checkResult() {
    // 出现投喂就是抽中，很遗憾没抽中，下次抽奖没有抽中
    if (text("立即投喂").exists()) {
      console.log(MESSAGES[Language].DRAWN);
      state.good++;
      back();
    } else if (text("很遗憾，没有抽中").exists()) {
      console.log(MESSAGES[Language].DIDNT_WIN);
      state.bad++;
      back();
    } else if (text("下次参与抽奖，欧皇就是你~").exists()) {
      console.log(MESSAGES[Language].OUCHUANG_NEXT_TIME);
      back();
    }
    // 遇到直播结束，点开进入直播间，里面可能有红包
    tools.repeater(2, function () {
      tools.wait(WAIT_TIME);
      if (text("当前直播已结束").exists()) {
        console.log(MESSAGES[Language].LIVE_BROADCAST_ENDED);
        id("enter_room_btn").findOne().click();
      }
    });
    // 有天选就关掉
    if (text("规则").exists()) {
      console.log(MESSAGES[Language].CHOSEN_BY_THE_HEAVENS);
      back();
    }
    tools.wait(WAIT_TIME);
    // 点旁边就能关闭遮罩
    if (
      className("android.widget.TextView").clickable(true).depth(14).exists() ||
      className("android.view.View").clickable(true).depth(14).exists()
    ) {
      back();
      tools.wait(1000);
      if (id("anchor_card_fl").exists()) {
        click(800, 600);
      }
    }
    tools.wait(WAIT_TIME);
    if (
      className("android.widget.TextView").clickable(true).depth(15).exists() ||
      className("android.view.View").clickable(true).depth(15).exists()
    ) {
      tools.wait(1000);
      if (id("rl_back").exists()) {
        back();
      } else if (!id("live_room_close").exists()) {
        back();
      }
    }
    // 主播的名字
    let userInfo = state.userInfo;
    try {
      userInfo.upname = id("anchor_nickname").find()[0].text();
    } catch (e) {
      userInfo.upname = "未知";
    }
  },
  register() {
    // 开始行动
    let filter = new IntentFilter();
    filter.addAction(Intent.ACTION_BATTERY_CHANGED);
    context.registerReceiver(mBatInfoReceiver, filter);
    // 监听退出 注销 取消行动
    events.on("exit", function () {
      unregisterReceiver();
    });
    function unregisterReceiver() {
      //
      tools.send(2);
      context.unregisterReceiver(mBatInfoReceiver);
      toastLog("关闭广播监听");
    }
  },
  back2home() {
    console.log(MESSAGES[Language].NO_HOME_PAGE);
    if (!desc("首页,5之1,标签").exists()) {
      back();
      sleep(WAIT_TIME);
      // 息屏开锁
      if (!device.isScreenOn()) tools.openScreen();
      this.back2home();
    } else {
      console.log(MESSAGES[Language].BACK_TO_HOME);
      desc("首页,5之1,标签").findOne().click();
    }
  },
  lowBatteryTipAudio() {
    // 放电 低电量警告
    if (BatteryStatus !== "放电状态") return;
    if (BatteryN <= state.lowBatteryThreshold) {
      // 随机播放音频
      let index = Math.floor(Math.random() * state.audioPaths.length);
      let audioPath = state.audioPaths[index];

      if (files.exists(audioPath)) {
        device.setMusicVolume(4);
        media.playMusic(audioPath);
        sleep(media.getMusicDuration());
        device.setMusicVolume(state.originalVolume);
        log("低电量提示音频已播放：" + audioPath);
      } else {
        log("低电量提示音频文件不存在：" + audioPath);
      }
    }
  },
  getUserInfo() {
    if (!desc("我的,5之5,标签").exists()) {
      this.back2home();
    }
    sleep(500);
    className("android.widget.FrameLayout")
      .desc("我的,5之5,标签")
      .findOne()
      .click();
    tools.wait(WAIT_TIME);
    let userInfo = state.userInfo;
    userInfo.uname = id("nick_name").findOne().text();
    userInfo.follow = id("attention_count").findOne().text();
    userInfo.fan = id("fans_count").findOne().text();
    log("当前账号为：" + userInfo.uname);
    log("账号关注量：" + userInfo.follow);
    log("账号粉丝数：" + userInfo.fan);
  },
};
tools.start();

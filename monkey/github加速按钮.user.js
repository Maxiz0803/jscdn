// ==UserScript==
// @name         GitHub加速按钮
// @namespace    yournamespace
// @version      1.0
// @description  在GitHub页面上生成加速按钮和复制Git命令按钮
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACEUExURUxpcRgWFhsYGBgWFhcWFh8WFhoYGBgWFiUlJRcVFRkWFhgVFRgWFhgVFRsWFhgWFigeHhkWFv////////////r6+h4eHv///xcVFfLx8SMhIUNCQpSTk/r6+jY0NCknJ97e3ru7u+fn51BOTsPCwqGgoISDg6empmpoaK2srNDQ0FhXV3eXcCcAAAAXdFJOUwCBIZXMGP70BuRH2Ze/LpIMUunHkpQR34sfygAAAVpJREFUOMt1U+magjAMDAVb5BDU3W25b9T1/d9vaYpQKDs/rF9nSNJkArDA9ezQZ8wPbc8FE6eAiQUsOO1o19JolFibKCdHGHC0IJezOMD5snx/yE+KOYYr42fPSufSZyazqDoseTPw4lGJNOu6LBXVUPBG3lqYAOv/5ZwnNUfUifzBt8gkgfgINmjxOpgqUA147QWNaocLniqq3QsSVbQHNp45N/BAwoYQz9oUJEiE4GMGfoBSMj5gjeWRIMMqleD/CAzUHFqTLyjOA5zjNnwa4UCEZ2YK3khEcBXHjVBtEFeIZ6+NxYbPqWp1DLKV42t6Ujn2ydyiPi9nX0TTNAkVVZ/gozsl6FbrktkwaVvL2TRK0C8Ca7Hck7f5OBT6FFbLATkL2ugV0tm0RLM9fedDvhWstl8Wp9AFDjFX7yOY/lJrv8AkYuz7fuP8dv9izCYH+x3/LBnj9fYPBTpJDNzX+7cAAAAASUVORK5CYII=
// @match        https://github.com/*
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    // 获取作者名字和仓库名字
    var author = window.location.pathname.split('/')[1];
    var repo = window.location.pathname.split('/')[2];

    // 创建包含按钮的容器
    var buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('style', 'position: fixed; top: 50%; right: 20px; transform: translateY(-50%); display: flex; flex-direction: column; align-items: flex-end; z-index: 9999;');
    document.body.appendChild(buttonContainer);

    // 创建加速按钮
    var speedUpButton = document.createElement('a');
    speedUpButton.setAttribute('href', 'https://gitcode.net/mirrors/' + author + '/' + repo);
    speedUpButton.setAttribute('target', '_blank');
    speedUpButton.setAttribute('class', 'btn');
    speedUpButton.innerHTML = 'GitHub加速';
    buttonContainer.appendChild(speedUpButton);

    // 创建复制Git命令按钮
    var cloneButton = document.createElement('a');
    cloneButton.setAttribute('href', 'javascript:void(0)');
    cloneButton.setAttribute('class', 'btn');
    cloneButton.innerHTML = '复制Git命令';
    cloneButton.addEventListener('click', function() {
        var gitCommand = 'git clone https://gitcode.net/mirrors/' + author + '/' + repo;
        GM_setClipboard(gitCommand);
        alert('Git命令已复制到剪贴板');
    });
    buttonContainer.appendChild(cloneButton);
})();

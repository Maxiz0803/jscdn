// ==UserScript==
// @name         GitHub加速按钮
// @namespace    yournamespace
// @version      1.0
// @description  在GitHub页面上生成加速按钮和复制Git命令按钮
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

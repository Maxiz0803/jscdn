// ==UserScript==
// @name         cmd命令生成
// @namespace    your-namespace
// @icon         cmd
// @version      1.0
// @description  在 gitcode.net 网页上显示悬浮窗口，并生成相应的命令
// @match        https://gitcode.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 创建悬浮小球
    var floatingBall = document.createElement('div');
    var ballText = document.createTextNode('cmd');  // 添加 "cmd" 文字
    floatingBall.style.position = 'fixed';
    floatingBall.style.width = '50px';
    floatingBall.style.height = '50px';
    floatingBall.style.background = '#ff0000';
    floatingBall.style.borderRadius = '50%';
    floatingBall.style.bottom = '20px';
    floatingBall.style.right = '20px';
    floatingBall.style.cursor = 'pointer';
    floatingBall.style.zIndex = 9999;
    floatingBall.style.display = 'flex';
    floatingBall.style.justifyContent = 'center';
    floatingBall.style.alignItems = 'center';
    floatingBall.style.color = '#ffffff';
    floatingBall.appendChild(ballText);
    document.body.appendChild(floatingBall);

    // 创建悬浮窗口
    var floatingWindow = document.createElement('div');
    floatingWindow.style.display = 'none';
    floatingWindow.style.position = 'fixed';
    floatingWindow.style.width = '400px';
    floatingWindow.style.height = '200px';
    floatingWindow.style.top = '50%';
    floatingWindow.style.left = '50%';
    floatingWindow.style.transform = 'translate(-50%, -50%)';
    floatingWindow.style.background = '#fff';
    floatingWindow.style.border = '1px solid #ccc';
    floatingWindow.style.padding = '10px';
    floatingWindow.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    floatingWindow.style.zIndex = 9999;
    document.body.appendChild(floatingWindow);

    // 创建上下两个框
    var inputBox = document.createElement('textarea');
    inputBox.style.width = '100%';
    inputBox.style.height = '40%';
    inputBox.style.resize = 'none';
    floatingWindow.appendChild(inputBox);

    var outputBox = document.createElement('textarea');
    outputBox.style.width = '100%';
    outputBox.style.height = '40%';
    outputBox.style.resize = 'none';
    floatingWindow.appendChild(outputBox);

    // 创建按钮
    var createFolderBtn = document.createElement('button');
    createFolderBtn.innerHTML = '生成新建文件夹命令';
    createFolderBtn.style.marginRight = '10px';
    floatingWindow.appendChild(createFolderBtn);

    var createFileBtn = document.createElement('button');
    createFileBtn.innerHTML = '生成新建文件命令';
    floatingWindow.appendChild(createFileBtn);

    // 点击小球显示悬浮窗口
    floatingBall.addEventListener('click', function() {
        floatingWindow.style.display = 'block';
    });

    // 关闭悬浮窗口
    function closeFloatingWindow() {
        floatingWindow.style.display = 'none';
    }

    // 生成新建文件夹命令
    createFolderBtn.addEventListener('click', function() {
        var folderNames = inputBox.value.trim().split(',');
        var cmdCommands = [];

        for (var i = 0; i < folderNames.length; i++) {
            var folderName = folderNames[i].trim();
            if (folderName !== '') {
                cmdCommands.push('mkdir "' + folderName + '"');
            }
        }

        var cmdCommandString = cmdCommands.join(';');
        outputBox.value = cmdCommandString;
    });

    // 生成新建文件命令
    createFileBtn.addEventListener('click', function() {
        var fileNames = inputBox.value.trim().split(',');
        var cmdCommands = [];

        for (var i = 0; i < fileNames.length; i++) {
            var fileName = fileNames[i].trim();
            if (fileName !== '') {
                cmdCommands.push('cd . > "' + fileName + '"');
            }
        }

        var cmdCommandString = cmdCommands.join(';');
        outputBox.value = cmdCommandString;
    });

    // 点击空白处关闭悬浮窗口
    document.addEventListener('click', function(event) {
        if (!floatingWindow.contains(event.target) && event.target !== floatingBall) {
            closeFloatingWindow();
        }
    });
})();

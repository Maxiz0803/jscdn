// ==UserScript==
// @name         hamibot编辑器 白色皮肤
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @require      https://static.hdslb.com/js/jquery.min.js
// @match        https://hamibot.com/dashboard/scripts/edit/*
// @match        https://hamibot.cn/dashboard/scripts/edit/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAPFJREFUOE+tk0FuwjAQRd+AyhZu0CtQBdbAvguw2DdHKCcATgBHSPdV6A2gaxK1V+AGsE1FB0EIWIqFGlJLliV7/p+ZP99CySU5vIl94Lgh9Lqn08Src1xA6AU2xkGwnoCMU4JW+m4iTUE6JWxP3ASXzNq53ZV8ApdK0gyDKEB4KSSH8sai5QvGKjlhxwMBolsnmUqDH3xq1LOWhOdoe7rY7zdIrcnHkxucMfa/GmjyTbX6SMJOcgIN111+ZekUsaI93tsrTPwKOjvGWAQyIvTm/Ing2vZ/tFBWxNJjzNQtZSR76LYvClk5V8m9n6mQn+EAOaWDlcoy3TEAAAAASUVORK5CYII=
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle(`
        body.transition-colors.duration-300.ease-linear div.CodeMirror.cm-s-nord.CodeMirror-simplescroll{
            color: rgb(7,70,161);

        }
        textarea{
           caret-color:red;
        }
        aside[data-v-330402b8], div[data-v-330402b8], h2[data-v-330402b8] {
            border-color: #d1d5db66;
        }
        div.cm-s-nord.CodeMirror {
            background: #ffffff;
            color: #d8dee9;
        }
        div.cm-s-nord span.cm-type, div.cm-s-nord span.cm-variable, div.cm-s-nord span.cm-variable-2, div.cm-s-nord span.cm-variable-3 {
            color: rgb(0 0 0);
        }
        div.cm-s-nord span.cm-builtin, div.cm-s-nord span.cm-keyword {
            color: rgb(0,49,187);
        }
        div.cm-s-nord span.cm-def {
            color: rgb(130,0,157);
        }
        div aside[data-v-0ef1534e],div  div[data-v-0ef1534e],div h2[data-v-0ef1534e] {
            border-color: rgb(217,217,217);
        }
        div.flex.flex-col.h-full.flex-grow {
    color: #ffb1b1 !important;
}
        div.cm-s-nord .CodeMirror-guttermarker, div.cm-s-nord .CodeMirror-guttermarker-subtle, div.cm-s-nord .CodeMirror-linenumber {
            color: rgb(172,194,217);
        }
        button[appearance=primary][data-v-69dd45b6] {
            background-color: rgb(77,138,201);
        }
        .formulate-input[data-classification=box] .formulate-input-element input[type=checkbox]:checked~.formulate-input-element-decorator {
            border-color: rgb(79,158,227);
            background-color: rgb(79,158,227);
        }
        .CodeMirror pre.CodeMirror-line, .CodeMirror pre.CodeMirror-line-like {
            background:rgba(255,255,255,0.8);
        }
        .CodeMirror-gutter, .CodeMirror-gutters, .CodeMirror-linenumber, .CodeMirror-scroll, .CodeMirror-sizer {
            background: rgb(255,255,255);
        }
        .cm-s-nord .CodeMirror-activeline-background {
            background: #b9ceff;
        }
        .cm-s-nord span.cm-comment {
            color: rgb(52,130,106);
        }
        .file[data-v-0ef1534e]:hover {
            background-color:  rgb(223,223,223);
        }
        div.cm-s-nord .CodeMirror-guttermarker, div.cm-s-nord .CodeMirror-guttermarker-subtle, div.cm-s-nord .CodeMirror-linenumber {
            color: rgb(172,194,217);
        }
        .CodeMirror-simplescroll-horizontal, .CodeMirror-simplescroll-vertical {
            background: #c3c6cc;
        }
        .CodeMirror-gutter, .CodeMirror-gutters, .CodeMirror-linenumber, .CodeMirror-scroll, .CodeMirror-sizer {
            background: #f5f5f5;
        }
        .active[data-v-0ef1534e] {
            background-color: #bcc3e8!important;
        }
        .cm-s-nord span.cm-attribute, .cm-s-nord span.cm-property {
            color: rgb(0,98,122);
        }
        .cm-s-nord span.cm-string {
            color: rgb(4,124,94);
        }
        .cm-s-nord span.cm-string.cm-property {
            color: rgb(134,15,164);
        }

`)



    // Your code here...


})();

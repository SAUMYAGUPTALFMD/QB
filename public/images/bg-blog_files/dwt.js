!function e(r,t,n){function o(a,c){if(!t[a]){if(!r[a]){var s="function"==typeof require&&require;if(!c&&s)return s(a,!0);if(i)return i(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var f=t[a]={exports:{}};r[a][0].call(f.exports,function(e){var t=r[a][1][e];return o(t?t:e)},f,f.exports,e,r,t,n)}return t[a].exports}for(var i="function"==typeof require&&require,a=0;a<n.length;a++)o(n[a]);return o}({1:[function(e,r,t){var n=e("../../libraries/js/xaxisLib"),o=function(e){var r=Math.floor(1e10*Math.random()),t={};for(var n in e)if(e.hasOwnProperty(n)){var o=n.slice(0,3);switch(o){case"act":t[n]="//gb-gmtdmp.mookie1.com/t/v2/activity?tagid="+e[n]+"&src.rand="+r;break;case"con":t[n]="https://secure.adnxs.com/px?id="+e[n]+"&t=2";break;case"seg":t[n]="https://secure.adnxs.com/seg?add="+e[n]+"&t=2";break;case"dwt":t[n]=1e3*e[n]}}return t},i=function(e){var r=[];for(var t in e)if(e.hasOwnProperty(t)){var n=parseInt(t.substring(3,4),10)-1,o=t.slice(0,3);if(!r[n]){for(;!r[n];)r.push({});r[n].urls=[]}"dwt"===o?r[n][o]=e[t]:r[n].urls.push(e[t])}return r.slice(0,3)},a=function(e){void 0!==e.dwt&&e.urls.forEach(function(r){window.setTimeout(function(){(0,n.createElement)("img",r)},e.dwt)})},c=(0,n.getThisScript)("xaxDwt"),s=(0,n.getParametersFromUrl)(c.src),u=o(s),f=i(u);f.forEach(a)},{"../../libraries/js/xaxisLib":2}],2:[function(e,r,t){function n(e){var r=e.split("?")[1];if(void 0===r)return console.info("No Query String Parameters found."),{};var t=r.split("&"),n={};return t.forEach(function(e){e=e.split("="),n[e[0]]=decodeURIComponent(e[1].replace(/\+/g,"%20")||"")}),JSON.parse(JSON.stringify(n))}function o(e,r,t){var n=document.createElement(e);n.src=r,t===!0&&(n.async=!0),"img"!==e&&"iframe"!==e||(n.width=0,n.height=0),"iframe"===e&&(n.frameBorder=0,n.marginWidth=0,n.marginHeight=0,n.scrolling="no",n.style.border="none",n.style.margin=0),document.body.appendChild(n)}function i(e){if("undefined"!=typeof document.currentScript)return document.currentScript;var r=void 0;if("function"==typeof document.querySelector&&(r=document.querySelector('script[data-name="'+e+'"]')),void 0!==r&&null!==r)return r;var t=document.getElementsByTagName("script");return t[t.length-1]}function a(){var e=Array.from(arguments),r=e.shift();window[r].apply(null,e)}function c(){if(!window[window.xaxObject].q)return void console.info("xax queue does not exist - processQueue");for(var e=window[window.xaxObject].q,r=0;r<e.length;r++)a.apply(null,e[r]);window[window.xaxObject]=a}function s(){try{return window.self!==window.top}catch(e){return!0}}function u(){return s()?"object"===f(window.location.ancestorOrigins)&&window.location.ancestorOrigins.length>1?{host:window.location.ancestorOrigins[window.location.ancestorOrigins.length-1],path:"/"}:document.referrer.length>0?{host:document.referrer.split("/")[2],path:"/"+document.referrer.substr(document.referrer.indexOf(document.referrer.split("/")[3]))}:{host:location.host,path:location.pathname}:{host:location.host,path:location.pathname}}Object.defineProperty(t,"__esModule",{value:!0});var f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.createElement=o,t.getParametersFromUrl=n,t.getThisScript=i,t.processQueue=c,t.getAncestorUrl=u},{}]},{},[1]);
//# sourceMappingURL=dwt.js.map

!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.AssetPicker=t()}}(function(){return function t(e,n,i){function s(o,a){if(!n[o]){if(!e[o]){var l="function"==typeof require&&require;if(!a&&l)return l(o,!0);if(r)return r(o,!0);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var d=n[o]={exports:{}};e[o][0].call(d.exports,function(t){var n=e[o][1][t];return s(n?n:t)},d,d.exports,t,e,n,i)}return n[o].exports}for(var r="function"==typeof require&&require,o=0;o<i.length;o++)s(i[o]);return s}({1:[function(t,e,n){"use strict";var i=Object.prototype.hasOwnProperty,s=Object.prototype.toString,r=function(t){return"function"==typeof Array.isArray?Array.isArray(t):"[object Array]"===s.call(t)},o=function(t){if(!t||"[object Object]"!==s.call(t))return!1;var e=i.call(t,"constructor"),n=t.constructor&&t.constructor.prototype&&i.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!e&&!n)return!1;var r;for(r in t);return"undefined"==typeof r||i.call(t,r)};e.exports=function a(){var t,e,n,i,s,l,c=arguments[0],d=1,u=arguments.length,h=!1;for("boolean"==typeof c?(h=c,c=arguments[1]||{},d=2):("object"!=typeof c&&"function"!=typeof c||null==c)&&(c={});d<u;++d)if(t=arguments[d],null!=t)for(e in t)n=c[e],i=t[e],c!==i&&(h&&i&&(o(i)||(s=r(i)))?(s?(s=!1,l=n&&r(n)?n:[]):l=n&&o(n)?n:{},c[e]=a(h,l,i)):"undefined"!=typeof i&&(c[e]=i));return c}},{}],2:[function(t,e,n){function i(){var t=document.createElement("style");return t.setAttribute("type","text/css"),t}var s=[],r=[];e.exports=function(t,e){e=e||{};var n=e.prepend===!0?"prepend":"append",o=void 0!==e.container?e.container:document.querySelector("head"),a=s.indexOf(o);a===-1&&(a=s.push(o)-1,r[a]={});var l;return void 0!==r[a]&&void 0!==r[a][n]?l=r[a][n]:(l=r[a][n]=i(),"prepend"===n?o.insertBefore(l,o.childNodes[0]):o.appendChild(l)),l.styleSheet?l.styleSheet.cssText+=t:l.textContent+=t,l}},{}],3:[function(t,e,n){e.exports=".assetpicker-modal {\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: rgba(0, 0, 0, 0);\n    z-index: -1;\n    transition: background 0.2s, z-index 0s 0.2s;\n}\n.assetpicker-modal.assetpicker-modal-open {\n    z-index:3000;\n    background: rgba(0, 0, 0, 0.8);\n    transition: background 0.2s\n}\n.assetpicker-modal .assetpicker-modal-inner {\n    position: absolute;\n    background: #fff;\n    width: 800px;\n    height: 500px;\n    max-width: calc(100% - 30px);\n    max-height: calc(100% - 30px);\n    left:50%;\n    top:50%;\n    transform: translateY(-50%) translateX(-50%);\n    opacity: 0;\n    transition: opacity 0.1s 0.1s;\n    border-radius: 4px;\n    overflow: hidden;\n}\n.assetpicker-modal.assetpicker-maximized .assetpicker-modal-inner {\n    width: 100%;\n    height: 100%;\n}\n.assetpicker-modal.assetpicker-modal-open .assetpicker-modal-inner {\n    opacity: 1;\n}\n.assetpicker-modal .assetpicker-modal-inner iframe {\n    position: absolute;\n    background: transparent;\n    top:0;\n    left:0;\n    width:100%;\n    height: 100%;\n    overflow: hidden;\n    border: none;\n}\n\n.assetpicker-loader {\n    border: 5px solid gray;\n    border-radius: 30px;\n    height: 30px;\n    left: 50%;\n    margin: -15px 0 0 -15px;\n    opacity: 0;\n    position: absolute;\n    top: 50%;\n    width: 30px;\n\n    animation: assetpicker-loader-pulsate 1s ease-out;\n    animation-iteration-count: infinite;\n}\n.assetpicker-ready .assetpicker-loader {\n    display: none;\n    animation: none;\n}\n\n@keyframes assetpicker-loader-pulsate {\n    0% {\n        transform: scale(.1);\n        opacity: 0.0;\n    }\n    50% {\n        opacity: 1;\n    }\n    100% {\n        transform: scale(1.2);\n        opacity: 0;\n    }\n}"},{}],4:[function(t,e,n){e.exports='<div class="assetpicker-modal">\n    <div class="assetpicker-modal-inner">\n        <div class="assetpicker-loader"></div>\n        <iframe src="about:blank" allowtransparency="true">\n            Ehm, without iframes i ain\'t do nothing.\n        </iframe>\n    </div>\n</div>\n'},{}],5:[function(t,e,n){var i=t("extend"),s=t("insert-css"),r=function(){var t=document.createElement("div"),e={transition:"transitionend",OTransition:"otransitionend",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(var n in e)if(e.hasOwnProperty(n)&&void 0!==t.style[n])return e[n]}(),o=function(t){var e=window.getComputedStyle(t,null),n=["transitionDuration","oTransitionDuration","MozTransitionDuration","webkitTransitionDuration"],i=n.filter(function(t){if("string"==typeof e[t]&&e[t].match(/[1-9]/))return!0});return!!i.length},a=t("../../../shared/util/messaging");e.exports=t("../../../shared/util/createClass")({construct:function(e){this.options=i({template:t("./index.html"),css:t("./index.css"),openClassName:"assetpicker-modal-open",src:null},e),this.modal=null,this.frame=null;var n=this.options.src.match(/^https?:\/\/[^\/]+/);this.messaging=new a(n?n[0]:document.location.origin)},render:function(){this.options.css&&s(this.options.css);var t=document.createElement("div");t.innerHTML=this.options.template,this.modal=t.children[0],this.modal.addEventListener("click",function(t){t.target===this.modal&&this.close()}.bind(this)),this.frame=this.modal.querySelector("iframe"),document.body.appendChild(this.modal),this._modalClass=this.modal.className},open:function(){if(!this.modal){this.render();var t=this;return this.frame.src=this.options.src,void window.setTimeout(function(){t.open()},1)}this.messaging.window=this.frame.contentWindow,this.addClass(this.options.openClassName)},_closed:function(){},close:function(){if(r&&o(this.modal)){var t=function(){this.modal.removeEventListener(r,t),this._closed()}.bind(this);this.modal.addEventListener(r,t)}else this._closed();this.removeClass(this.options.openClassName)},addClass:function(t){this.modal.className.split(" ").indexOf(t)===-1&&(this.modal.className+=" "+t)},removeClass:function(t){for(var e=this.modal.className.split(" "),n=[],i=0,s=e.length;i<s;i++)e[i]!==t&&n.push(e[i]);this.modal.className=n.join(" ")}})},{"../../../shared/util/createClass":7,"../../../shared/util/messaging":8,"./index.css":3,"./index.html":4,extend:1,"insert-css":2}],6:[function(t,e,n){var i=t("./components/modal"),s=t("../shared/util/uid"),r=t("extend"),o=function(){var t=document.getElementsByTagName("script");return t[t.length-1].src}();e.exports=t("../shared/util/createClass")({construct:function(t,e){e=r(!0,{selector:'[rel="assetpicker"]',modal:{src:null}},e||{}),e.modal.src||(e.modal.src=o.split("/").slice(0,-2).join("/")+"/"),(e.modal.src.match(/^https?:\/\/localhost/)||"localhost"===document.location.hostname)&&(e.modal.src+="?"+s()),this.config=t||{},this.options=e,this.modal=null,this.element=null,this._memoryEvents={ready:null},this._callbacks={},this.on("ready",function(){this.modal.modal.className+=" assetpicker-ready"}),this.on("resize",function(t){this.modal[t?"addClass":"removeClass"]("assetpicker-maximized")}),document.addEventListener("DOMContentLoaded",this._init.bind(this))},on:function(t,e){return this._callbacks.hasOwnProperty(t)||(this._callbacks[t]=[]),this._callbacks[t].push(e),this._memoryEvents[t]&&e.apply(this,this._memoryEvents[t]),this},_trigger:function(t){var e=Array.prototype.slice.call(arguments,1);this._callbacks[t]&&this._callbacks[t].forEach(function(t){return t.apply(this,e)}.bind(this)),this._memoryEvents.hasOwnProperty(t)&&(this._memoryEvents[t]=e)},_init:function(){this.modal=new i(this.options.modal),this.modal.messaging.registerServer("picker",this);for(var t=document.querySelectorAll(this.options.selector),e=0,n=t.length;e<n;e++)this._initInput(t[e])},_initInput:function(t){t.addEventListener("click",function(e){e.preventDefault(),this.element=t,this.modal.open(),this.on("ready",function(){this.modal.messaging.call("app.setPickConfig",{limit:t.hasAttribute("data-limit")?parseInt(t.getAttribute("data-limit")):1,types:t.hasAttribute("data-types")?t.getAttribute("data-types").split(","):["file"],extensions:t.hasAttribute("data-ext")?t.getAttribute("data-ext").split(","):[]})})}.bind(this))},getConfig:function(){return this.config},pick:function(t){var e=this.element.getAttribute("data-target"),n=this.element.getAttribute("data-name");if(e||n){var i=JSON.stringify(t);if(e){var s=document.createElement("textarea");s.innerText=i;for(var r=s.innerHTML,o=document.querySelectorAll(e),a=0,l=o.length;a<l;a++)"input"===o[a].tagName?o[a].setAttribute("value",i):o[a].innerHTML=r}if(n){var c=document.createElement("input");c.setAttribute("type","hidden"),c.setAttribute("name",n),c.setAttribute("value",i),this.element.parentNode.insertBefore(c,this.element)}}this._trigger("pick",t),this.modal.close()}})},{"../shared/util/createClass":7,"../shared/util/uid":9,"./components/modal":5,extend:1}],7:[function(t,e,n){e.exports=function(t){var e=function(){this.construct&&this.construct.apply(this,arguments)};return e.prototype=e,Object.keys(t).forEach(function(n){e.prototype[n]=t[n]}),e}},{}],8:[function(t,e,n){var i=t("./uid");e.exports=t("./createClass")({construct:function(t,e){var n=window.addEventListener?"addEventListener":"attachEvent",i=window[n],s="attachEvent"==n?"onmessage":"message";i(s,function(t){var e=t.origin||t.originalEvent.origin;(t.source===this.window&&e===this.origin||"*"===this.origin)&&this.handle(t.data)}.bind(this),!1),this.origin=t,this.window=e,this.servers={},this._handlers={}},registerServer:function(t,e){this.servers[t]=e},_createHandler:function(){var t={callbacks:[]};return t.then=function(e){return t.hasOwnProperty("_result")?e(t._result):t.callbacks.push(e),t},t},call:function(t){var arguments=Array.prototype.slice.call(arguments,1),e=i(),n=this._createHandler();return this._handlers[e]=n,this.window.postMessage({id:e,method:t,arguments:arguments},this.origin),n},handle:function(t){if("resolve"===t.method){if(this._handlers[t.id]){for(var e=this._handlers[t.id],n=0,i=e.callbacks.length;n<i;n++)e.callbacks[n](t.result);e._result=t.result,delete this._handlers[t.id]}}else{for(var s=t.method.split("."),r=s.pop(),o=this.servers;o&&s.length;)o=o[s.shift()];if(!o||!o[r])throw'Unknown method "'+t.method+'"';var a=o[r].apply(o,t.arguments),l=function(e){t.id&&this.window.postMessage({method:"resolve",id:t.id,result:e},this.origin)}.bind(this);"function"==typeof a?a(l):l(a)}}})},{"./createClass":7,"./uid":9}],9:[function(t,e,n){e.exports=function(){return""+Math.random().toString(36).substr(2,9)}},{}]},{},[6])(6)});
//# sourceMappingURL=maps/picker.js.map
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.AssetPicker=t()}}(function(){return function t(e,i,n){function s(o,a){if(!i[o]){if(!e[o]){var c="function"==typeof require&&require;if(!a&&c)return c(o,!0);if(r)return r(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var d=i[o]={exports:{}};e[o][0].call(d.exports,function(t){var i=e[o][1][t];return s(i?i:t)},d,d.exports,t,e,i,n)}return i[o].exports}for(var r="function"==typeof require&&require,o=0;o<n.length;o++)s(n[o]);return s}({1:[function(t,e,i){"use strict";var n=Object.prototype.hasOwnProperty,s=Object.prototype.toString,r=function(t){return"function"==typeof Array.isArray?Array.isArray(t):"[object Array]"===s.call(t)},o=function(t){if(!t||"[object Object]"!==s.call(t))return!1;var e=n.call(t,"constructor"),i=t.constructor&&t.constructor.prototype&&n.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!e&&!i)return!1;var r;for(r in t);return"undefined"==typeof r||n.call(t,r)};e.exports=function a(){var t,e,i,n,s,c,l=arguments[0],d=1,h=arguments.length,p=!1;for("boolean"==typeof l?(p=l,l=arguments[1]||{},d=2):("object"!=typeof l&&"function"!=typeof l||null==l)&&(l={});d<h;++d)if(t=arguments[d],null!=t)for(e in t)i=l[e],n=t[e],l!==n&&(p&&n&&(o(n)||(s=r(n)))?(s?(s=!1,c=i&&r(i)?i:[]):c=i&&o(i)?i:{},l[e]=a(p,c,n)):"undefined"!=typeof n&&(l[e]=n));return l}},{}],2:[function(t,e,i){function n(){var t=document.createElement("style");return t.setAttribute("type","text/css"),t}var s=[],r=[];e.exports=function(t,e){e=e||{};var i=e.prepend===!0?"prepend":"append",o=void 0!==e.container?e.container:document.querySelector("head"),a=s.indexOf(o);a===-1&&(a=s.push(o)-1,r[a]={});var c;return void 0!==r[a]&&void 0!==r[a][i]?c=r[a][i]:(c=r[a][i]=n(),"prepend"===i?o.insertBefore(c,o.childNodes[0]):o.appendChild(c)),c.styleSheet?c.styleSheet.cssText+=t:c.textContent+=t,c}},{}],3:[function(t,e,i){e.exports=".assetpicker-modal {\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: rgba(0, 0, 0, 0);\n    z-index: -1;\n    transition: background 0.2s, z-index 0s 0.2s;\n}\n.assetpicker-modal.assetpicker-modal-open {\n    z-index:3000;\n    background: rgba(0, 0, 0, 0.8);\n    transition: background 0.2s\n}\n.assetpicker-modal .assetpicker-modal-inner {\n    position: absolute;\n    background: #fff;\n    width: 800px;\n    height: 500px;\n    max-width: calc(100% - 30px);\n    max-height: calc(100% - 30px);\n    left:50%;\n    top:50%;\n    transform: translateY(-50%) translateX(-50%);\n    opacity: 0;\n    transition: opacity 0.1s 0.1s;\n    border-radius: 4px;\n    overflow: hidden;\n}\n.assetpicker-modal.assetpicker-maximized .assetpicker-modal-inner {\n    width: 100%;\n    height: 100%;\n}\n.assetpicker-modal.assetpicker-modal-open .assetpicker-modal-inner {\n    opacity: 1;\n}\n.assetpicker-modal .assetpicker-modal-inner iframe {\n    position: absolute;\n    background: transparent;\n    top:0;\n    left:0;\n    width:100%;\n    height: 100%;\n    overflow: hidden;\n    border: none;\n}\n\n.assetpicker-loader {\n    border: 5px solid gray;\n    border-radius: 30px;\n    height: 30px;\n    left: 50%;\n    margin: -15px 0 0 -15px;\n    opacity: 0;\n    position: absolute;\n    top: 50%;\n    width: 30px;\n\n    animation: assetpicker-loader-pulsate 1s ease-out;\n    animation-iteration-count: infinite;\n}\n.assetpicker-ready .assetpicker-loader {\n    display: none;\n    animation: none;\n}\n\n@keyframes assetpicker-loader-pulsate {\n    0% {\n        transform: scale(.1);\n        opacity: 0.0;\n    }\n    50% {\n        opacity: 1;\n    }\n    100% {\n        transform: scale(1.2);\n        opacity: 0;\n    }\n}"},{}],4:[function(t,e,i){e.exports='<div class="assetpicker-modal">\n    <div class="assetpicker-modal-inner">\n        <div class="assetpicker-loader"></div>\n        <iframe src="about:blank" allowtransparency="true">\n            Ehm, without iframes i ain\'t do nothing.\n        </iframe>\n    </div>\n</div>\n'},{}],5:[function(t,e,i){var n=t("extend"),s=t("../../util"),r=t("insert-css"),o=function(){var t=document.createElement("div"),e={transition:"transitionend",OTransition:"otransitionend",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(var i in e)if(e.hasOwnProperty(i)&&void 0!==t.style[i])return e[i]}(),a=function(t){var e=window.getComputedStyle(t,null),i=["transitionDuration","oTransitionDuration","MozTransitionDuration","webkitTransitionDuration"],n=i.filter(function(t){if("string"==typeof e[t]&&e[t].match(/[1-9]/))return!0});return!!n.length},c=t("../../../shared/util/messaging");e.exports=t("../../../shared/util/createClass")({construct:function(e){this.options=n({template:t("./index.html"),css:t("./index.css"),openClassName:"assetpicker-modal-open",src:null},e),this.modal=null,this.frame=null;var i=this.options.src.match(/^https?:\/\/[^\/]+/);this.messaging=new c(i?i[0]:document.location.origin)},render:function(){this.options.css&&r(this.options.css);var t=document.createElement("div");t.innerHTML=this.options.template,this.modal=t.children[0],this.modal.addEventListener("click",function(t){t.target===this.modal&&this.close()}.bind(this)),this.frame=this.modal.querySelector("iframe"),document.body.appendChild(this.modal),this._modalClass=this.modal.className},open:function(){if(!this.modal){this.render();var t=this;return this.frame.src=this.options.src,void window.setTimeout(function(){t.open()},1)}this.messaging.window=this.frame.contentWindow,s.addClass(this.modal,this.options.openClassName)},maximize:function(){s.addClass(this.modal,"assetpicker-maximized")},minimize:function(){s.removeClass(this.modal,"assetpicker-maximized")},_closed:function(){},close:function(){if(o&&a(this.modal)){var t=function(){this.modal.removeEventListener(o,t),this._closed()}.bind(this);this.modal.addEventListener(o,t)}else this._closed();s.removeClass(this.modal,this.options.openClassName)}})},{"../../../shared/util/createClass":9,"../../../shared/util/messaging":10,"../../util":8,"./index.css":3,"./index.html":4,extend:1,"insert-css":2}],6:[function(t,e,i){var n=!1,s=t("extend"),r=t("../../util");e.exports=t("../../../shared/util/createClass")({construct:function(t,e){n||r.loadCss(e.getDistUrl()+"/css/picker-ui.css"),this.config=s({unique:!0,readonly:!1},e.options.ui,{readonly:t.hasAttribute("data-ro")?["false","0"].indexOf(t.getAttribute("data-ro"))===-1:void 0,unique:t.hasAttribute("data-unique")?["false","0"].indexOf(t.getAttribute("data-unique"))===-1:void 0}),this.add=!1,this.propagate=!1,this.picker=e,this.element=t,this.picked=t.hasAttribute("value")?JSON.parse(t.getAttribute("value"))||[]:[],this.picked.constructor!==Array&&(this.picked=[this.picked]),this.render();var i=this;e.on("pick",function(e){if(!i.propagate&&this.element===t){var n=e.constructor!==Array?[e]:e;if(i.add){for(var s=0;s<n.length;s++){var r=!1;if(i.config.unique)for(var o=0;o<i.picked.length;o++)if(i.picked[o].storage===n[s].storage&&i.picked[o].id===n[s].id){r=!0;break}r||i.picked.push(n[s])}n=i.picked}return i.pick(n),!1}i.propagate=!1,i.add=!1})},pick:function(t){this.picked=t,this.propagate=!0,this.picker.element=this.element,this.picker.pick(1===this.picker._getPickConfig(this.element).limit?t.length?t[0]:void 0:t),this.render()},createElement:function(t,e){var i=document.createElement(t);return i.className="assetpicker-"+e.split(" ").join(" assetpicker-"),i},render:function(){if(this.container||(this.container=this.element.parentNode.insertBefore(this.createElement("div","ui"),this.element),this.element.parentNode.removeChild(this.element)),this.container.innerHTML="",this.renderItems(this.picked),r[(this.picked.length||this.config.readonly?"add":"remove")+"Class"](this.element,"assetpicker-hidden"),this.container.appendChild(this.element),this.picked.length&&!this.config.readonly){var t=this.picker._getPickConfig(this.element).limit;(0===t||1!==t&&this.picked.length<t)&&this.container.appendChild(this.createElement("span","add")).addEventListener("click",function(e){this.add=!0,this.element.setAttribute("data-limit",t-this.picked.length),this.picker.open(this.element),this.element.setAttribute("data-limit",t)}.bind(this))}},renderItems:function(t){for(var e=0,i=t.length;e<i;e++){var n=this.container.appendChild(this.createElement("div","item")),r=n.appendChild(this.createElement("div","preview")),o=s({name:"file"},t[e].mediaType),a="ft ft-"+o.name;r.appendChild(this.createElement("div",a)),o.iconBig&&(r.appendChild(this.createElement("div","icn")).style.backgroundImage="url("+o.iconBig+")"),t[e].thumbnail&&(r.appendChild(this.createElement("div","tn "+o.name)).style.backgroundImage="url("+t[e].thumbnail+")"),this.config.readonly||r.appendChild(this.createDeleteButton(t[e]));var c=n.appendChild(this.createElement("div","title"));o.icon?c.appendChild(this.createElement("img","icn")).src=o.icon:c.appendChild(this.createElement("span",a)),c.appendChild(document.createTextNode(t[e].name))}},createDeleteButton:function(t){var e=this.createElement("span","del");return e.addEventListener("click",function(){for(var e=[],i=0,n=this.picked.length;i<n;i++)this.picked[i]!==t&&e.push(this.picked[i]);this.pick(e)}.bind(this)),e}})},{"../../../shared/util/createClass":9,"../../util":8,extend:1}],7:[function(t,e,i){var n=t("./components/modal"),s=t("./components/ui"),r=t("../shared/util/uid"),o=t("extend"),a=function(){var t=document.getElementsByTagName("script");return t[t.length-1].src.split("/").slice(0,-2).join("/")}();e.exports=t("../shared/util/createClass")({construct:function(t,e){this.setConfig(t),e=o(!0,{distUrl:a,selector:'[rel="assetpicker"]',modal:{src:null},ui:{enabled:!0}},e||{}),e.modal.src||(e.modal.src=e.distUrl+"/index.html"),(e.modal.src.match(/^https?:\/\/localhost/)||"localhost"===document.location.hostname)&&(e.modal.src+="?"+r()),this.pickConfig={},this.options=e,this.modal=null,this.element=null,this.uis=[],this._memoryEvents={ready:null},this._callbacks={},this.on("ready",function(){this.modal.modal.className+=" assetpicker-ready"}),this.on("resize",function(t){this.modal[t?"maximize":"minimize"]()}),document.addEventListener("DOMContentLoaded",function(){for(var t=document.querySelectorAll(this.options.selector),e=0,i=t.length;e<i;e++)this.register(t[e])}.bind(this))},getDistUrl:function(){return this.options.distUrl},on:function(t,e){return this._callbacks.hasOwnProperty(t)||(this._callbacks[t]=[]),this._callbacks[t].push(e),this._memoryEvents[t]&&e.apply(this,this._memoryEvents[t]),this},_trigger:function(t){var e=Array.prototype.slice.call(arguments,1);this._callbacks[t]&&this._callbacks[t].forEach(function(t){return t.apply(this,e)}.bind(this)),this._memoryEvents.hasOwnProperty(t)&&(this._memoryEvents[t]=e)},register:function(t){t.hasAttribute("data-assetpicker")||(t.setAttribute("data-assetpicker",1),(t.hasAttribute("data-ui")||this.options.ui&&this.options.ui.enabled)&&this.uis.push(new s(t,this)),t.addEventListener("click",function(e){e.preventDefault(),this.open(t)}.bind(this)))},_getPickConfig:function(t){var e=function(e){var i=t.getAttribute(e);return i.length?i.split(","):[]};return o({},this.config.pick,{limit:t.hasAttribute("data-limit")?parseInt(t.getAttribute("data-limit")):void 0,types:t.hasAttribute("data-types")?e("data-types"):void 0,extensions:t.hasAttribute("data-ext")?e("data-ext"):void 0})},getUi:function(t){for(var e=0,i=this.uis.length;e<i;e++)if(this.uis[e].element===t)return this.uis[e]},open:function(t){if("object"==typeof HTMLElement&&t instanceof HTMLElement||t&&"object"==typeof t&&null!==t&&1===t.nodeType&&"string"==typeof t.nodeName?(this.element=t,this.pickConfig=this._getPickConfig(t)):(this.element=void 0,this.pickConfig=o({},this.config.pick,t)),this.modal)try{this.modal.messaging.call("app.setConfig",{pick:this.pickConfig})}catch(e){}else this.modal=new n(this.options.modal),this.modal.messaging.registerServer("picker",this),this.on("ready",function(){this.modal.messaging.call("app.setConfig",{pick:this.pickConfig})});this.modal.open()},getConfig:function(){return this.config},setConfig:function(t){this.config=o(!0,{pick:{limit:1,types:["file"],extensions:[]}},t),this.modal&&picker.modal.messaging.call("app.setConfig",this.config)},pick:function(t){if(this.element){var e=this.element.tagName.toLowerCase();("input"===e&&"button"===this.element.getAttribute("type")||"button"===e)&&this.element.setAttribute("value",t?JSON.stringify(t):"")}this._trigger("pick",t),this.modal&&this.modal.close()}})},{"../shared/util/createClass":9,"../shared/util/uid":11,"./components/modal":5,"./components/ui":6,extend:1}],8:[function(t,e,i){e.exports={addClass:function(t,e){t.className?t.className.split(" ").indexOf(e)===-1&&(t.className+=" "+e):t.className=e},removeClass:function(t,e){if(t.className){for(var i=t.className.split(" "),n=[],s=0,r=i.length;s<r;s++)i[s]!==e&&n.push(i[s]);t.className=n.join(" ")}},loadCss:function(t){var e=document.createElement("link");e.href=t,e.type="text/css",e.rel="stylesheet",e.media="screen,print",document.getElementsByTagName("head")[0].appendChild(e)}}},{}],9:[function(t,e,i){e.exports=function(t){var e=function(){this.construct&&this.construct.apply(this,arguments)};return e.prototype=e,Object.keys(t).forEach(function(i){e.prototype[i]=t[i]}),e}},{}],10:[function(t,e,i){var n=t("./uid");e.exports=t("./createClass")({construct:function(t,e){var i=window.addEventListener?"addEventListener":"attachEvent",n=window[i],s="attachEvent"==i?"onmessage":"message";n(s,function(t){var e=t.origin||t.originalEvent.origin;(t.source===this.window&&e===this.origin||"*"===this.origin)&&this.handle(t.data)}.bind(this),!1),this.origin=t,this.window=e,this.servers={},this._handlers={}},registerServer:function(t,e){this.servers[t]=e},_createHandler:function(){var t={callbacks:[]};return t.then=function(e){return t.hasOwnProperty("_result")?e(t._result):t.callbacks.push(e),t},t},call:function(t){var arguments=Array.prototype.slice.call(arguments,1),e=n(),i=this._createHandler();return this._handlers[e]=i,this.window.postMessage({id:e,method:t,arguments:arguments},this.origin),i},handle:function(t){if("resolve"===t.method){if(this._handlers[t.id]){for(var e=this._handlers[t.id],i=0,n=e.callbacks.length;i<n;i++)e.callbacks[i](t.result);e._result=t.result,delete this._handlers[t.id]}}else{for(var s=t.method.split("."),r=s.pop(),o=this.servers;o&&s.length;)o=o[s.shift()];if(!o||!o[r])throw'Unknown method "'+t.method+'"';var a=o[r].apply(o,t.arguments),c=function(e){t.id&&this.window.postMessage({method:"resolve",id:t.id,result:e},this.origin)}.bind(this);"function"==typeof a?a(c):c(a)}}})},{"./createClass":9,"./uid":11}],11:[function(t,e,i){e.exports=function(){return""+Math.random().toString(36).substr(2,9)}},{}]},{},[7])(7)});null//# sourceMappingURL=maps/picker.js.mapnull
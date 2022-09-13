!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react"),require("react-dom"),require("classnames")):"function"==typeof define&&define.amd?define(["exports","react","react-dom","classnames"],t):t((e=e||self).CookieConsent={},e.React,e.ReactDOM,e.classNames)}(this,function(e,t,n,r){function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function i(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t.indexOf(n=i[r])>=0||(o[n]=e[n]);return o}function a(e){var n=e.namespace,a=void 0===n?"cookie-consent":n,c=e.title,s=e.children,l=e.allowButtonLabel,u=e.denyButtonLabel,p=e.onAllow,d=e.onDeny,f=e.position,m=e.contentRef,w=e.className,b=i(e,["namespace","title","children","allowButtonLabel","denyButtonLabel","onAllow","onDeny","position","contentRef","className"]);return t.createElement("div",o({className:r(""+a,f&&a+"--"+f,w),role:"region","aria-live":"polite","aria-labelledby":a+"-title","aria-describedby":a+"-description"},b),t.createElement("div",{role:"document",className:a+"__container",tabIndex:"0",ref:m},t.createElement("h2",{id:a+"-title",className:a+"__title"},c),t.createElement("div",{id:a+"-description",className:a+"__description"},s),t.createElement("div",{className:a+"__button-group"},u&&t.createElement("button",{className:a+"__button "+a+"__button--deny",type:"button",onClick:d},u),l&&t.createElement("button",{className:a+"__button "+a+"__button--allow",type:"button",onClick:p},l))))}function c(e){var n=e.namespace,c=void 0===n?"cookie-consent":n,s=e.i18n,l=e.answer,u=e.setAnswer,p=e.constants,d=p.ALLOW,f=p.DENY,m=e.text,w=i(e,["namespace","i18n","answer","setAnswer","constants","text"]);return l?null:t.createElement(a,o({namespace:c,onAllow:function(){return u(d)},onDeny:function(){return u(f)},title:s("title"),allowButtonLabel:s("allow"),denyButtonLabel:s("deny")},w),m||t.createElement("p",null,s("text")," ",t.createElement("a",{href:s("readMoreURL"),className:r(c+"__more")},s("readMore"))))}function s(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function l(e){s(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function u(e,t){s(2,arguments);var n=l(e),r=l(t),o=n.getFullYear()-r.getFullYear(),i=n.getMonth()-r.getMonth();return 12*o+i}function p(e,t){s(2,arguments);var n=l(e),r=l(t),o=n.getTime()-r.getTime();return o<0?-1:o>0?1:o}t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t,n=n&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n,r=r&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r;var d,f,m,w,b,y,h,g,v,k="javascript/blocked",E={blacklist:window.YETT_BLACKLIST,whitelist:window.YETT_WHITELIST},L={blacklisted:[]},O=function(e,t){return e&&(!t||t!==k)&&(!E.blacklist||E.blacklist.some(function(t){return t.test(e)}))&&(!E.whitelist||E.whitelist.every(function(t){return!t.test(e)}))},S=function(e){var t=e.getAttribute("src");return E.blacklist&&E.blacklist.every(function(e){return!e.test(t)})||E.whitelist&&E.whitelist.some(function(e){return e.test(t)})},A=new MutationObserver(function(e){for(var t=0;t<e.length;t++)for(var n=e[t].addedNodes,r=function(e){var t=n[e];1===t.nodeType&&"SCRIPT"===t.tagName&&O(t.src,t.type)&&(L.blacklisted.push([t,t.type]),t.type=k,t.addEventListener("beforescriptexecute",function e(n){t.getAttribute("type")===k&&n.preventDefault(),t.removeEventListener("beforescriptexecute",e)}),t.parentElement&&t.parentElement.removeChild(t))},o=0;o<n.length;o++)r(o)}),N=document.createElement,j={src:Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype,"src"),type:Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype,"type")},D=new RegExp("[|\\{}()[\\]^$+*?.]","g"),_={en:{title:"This web site uses cookies",text:"We use cookies in order to enrich and personalize your experience, understand traffic and target ads. You can approve the default cookies, or fine tune them under Settings.",allow:"Allow",deny:"Deny",readMore:"Read more about cookies",readMoreURL:"/about-cookies"},sv:{title:"Vår webbplats använder cookies",text:"Vi använder cookies för att förbättra din upplevelse, analysera trafik och anpassa marknadsföring. Godkänn våra cookies eller finjustera under Inställningar.",allow:"Tillåt",deny:"Neka",readMore:"Läs mer om cookies",readMoreURL:"/om-cookies"}},x=!1,T=t.createRef(),M={answer:null,answeredOn:null};function R(e,t){localStorage.setItem("whitespace/cookie-consent",JSON.stringify(e)),P(t)}function C(){var e=function(){var e=localStorage.getItem("whitespace/cookie-consent");if(e)try{return JSON.parse(e)||M}catch(e){return M}return M}(),t=e.answer,n=e.answeredOn;return null!=t&&function(e,t){s(2,arguments);var n=l(e),r=l(t),o=p(n,r),i=Math.abs(u(n,r));n.setMonth(n.getMonth()-o*i);var a=p(n,r)===-o,c=o*(i-a);return 0===c?0:c}(new Date,new Date(n))<12?t:null}function I(e,t){R({answer:e,answeredOn:(new Date).toISOString()},t),b(e),"allow"===e?y():null!=e&&h()}function P(e){"allow"===C()&&(x&&(function(){var e=[].slice.call(arguments);e.length<1?(E.blacklist=[],E.whitelist=[]):(E.blacklist&&(E.blacklist=E.blacklist.filter(function(t){return e.every(function(e){return"string"==typeof e?!t.test(e):e instanceof RegExp?t.toString()!==e.toString():void 0})})),E.whitelist&&(E.whitelist=[].concat(E.whitelist,e.map(function(e){if("string"==typeof e){var t=".*"+e.replace(D,"\\$&")+".*";if(E.whitelist.every(function(e){return e.toString()!==t.toString()}))return new RegExp(t)}else if(e instanceof RegExp&&E.whitelist.every(function(t){return t.toString()!==e.toString()}))return e;return null}).filter(Boolean))));for(var t=document.querySelectorAll('script[type="'+k+'"]'),n=0;n<t.length;n++){var r=t[n];S(r)&&(L.blacklisted.push([r,"application/javascript"]),r.parentElement.removeChild(r))}var o=0;[].concat(L.blacklisted).forEach(function(e,t){var n=e[0],r=e[1];if(S(n)){var i=document.createElement("script");for(var a in i.setAttribute("src",n.src),i.setAttribute("type",r||"application/javascript"),n)a.startsWith("on")&&(i[a]=n[a]);document.head.appendChild(i),L.blacklisted.splice(t-o,1),o++}}),E.blacklist&&E.blacklist.length<1&&A.disconnect()}(),x=!1),g()),q(e)}function Y(e){return w[e]}function B(e){return"string"==typeof e?document.querySelector(e):e}function q(e){n.render(t.createElement(c,o({i18n:Y,answer:C(),setAnswer:I,constants:{ALLOW:"allow",DENY:"deny"},contentRef:T},v)),B(m),e)}function W(){R(null,function(){T.current&&T.current.focus()})}e.ALLOW="allow",e.DENY="deny",e.LOCALSTORAGE_ITEM="whitespace/cookie-consent",e.getAnswer=C,e.init=function(e,t){d=e.whitelist||[],f=e.resetElement||".js-cookie-consent-reset";var n=e.currentLanguage||"en";w=o({},_[n]||_.en,e.messages&&e.messages[n]||{}),b=e.onAnswer||function(){},y=e.onAllow||function(){},h=e.onDeny||function(){},g=e.onUnblockScripts||function(){},v=o({namespace:e.namespace||"cookie-consent",position:e.position||"bottom-left"},e.componentProps),"allow"!==C()&&(x||(window.location.origin&&d.push(window.location.origin+"/*"),function(e){var t=void 0===e?{}:e,n=t.blacklist,r=t.whitelist;E.blacklist=(E.blacklist||n)&&[].concat(E.blacklist||[],n||[]),E.whitelist=(E.whitelist||r)&&[].concat(E.whitelist||[],r||[]),A.observe(document.documentElement,{childList:!0,subtree:!0}),document.createElement=function(){var e=[].slice.call(arguments);if("script"!==e[0].toLowerCase())return N.bind(document).apply(void 0,e);var t=N.bind(document).apply(void 0,e);try{Object.defineProperties(t,{src:{get:function(){return j.src.get.call(this)},set:function(e){O(e,t.type)&&j.type.set.call(this,k),j.src.set.call(this,e)}},type:{set:function(e){var n=O(t.src,t.type)?k:e;j.type.set.call(this,n)}}}),t.setAttribute=function(e,n){"type"===e||"src"===e?t[e]=n:HTMLScriptElement.prototype.setAttribute.call(t,e,n)}}catch(e){console.warn("Yett: unable to prevent script execution for script src ",t.src,".\n",'A likely cause would be because you are using a third-party browser extension that monkey patches the "document.createElement" function.')}return t}}({whitelist:d=d.map(function(e){return new RegExp("^"+e.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*")+"$")})}),x=!0)),document.addEventListener("DOMContentLoaded",function(){var e;m||(m=document.createElement("div"),document.body.appendChild(m)),(e=B(f))&&e.addEventListener("click",function(){W()}),q(t)}),window.addEventListener("storage",function(e){null!=e.key&&"whitespace/cookie-consent"!==e.key||P()})},e.reset=W,e.setAnswer=I});
//# sourceMappingURL=cookie-consent.umd.js.map
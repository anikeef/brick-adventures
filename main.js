!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(e,n){!function(){const e=document.querySelector(".content"),n=e.offsetWidth/20,r=document.createElement("div");function o(e){return v=15,a=0,t=i(e),v*t+a*t*t/2}function u(t){return t*n+"px"}function i(t){return t/1e3}r.classList.add("ball"),r.style.width=u(1),r.style.height=u(1),r.style.left=0,r.style.bottom=0,e.appendChild(r),r.addEventListener("click",function(){start=performance.now(),requestAnimationFrame(function e(){console.log(parseInt(r.style.left),parseInt(r.style.bottom)),time=performance.now()-start,parseInt(r.style.bottom)>=0?(r.style.left=u(o(time)),r.style.bottom=u(function(e){return v=20,a=-40,t=i(e),v*t+a*t*t/2}(time)),requestAnimationFrame(e)):(r.style.left=u(o(time)),r.style.bottom=0)})})}()}]);
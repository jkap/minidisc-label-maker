!function(t){var e={};function n(i){if(e[i])return e[i].exports;var s=e[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(i,s,function(e){return t[e]}.bind(null,s));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),s=n(2),r=n(5);n(6);var o=document.querySelector("#minidisc"),a={artist:"glass beach",album:"the first glass beach album",year:"2019",artURL:i},c=new s.MinidiscLabeler(o,{width:36,height:51,ppm:11.811,fontSize:1.76,lineHeight:2.12,headerHeight:5},a),l=document.querySelector("#artist-name"),h=document.querySelector("#album-name"),u=document.querySelector("#year");function f(t){switch(t.target.id){case"artist-name":c.setArtist(t.target.value);break;case"album-name":c.setAlbum(t.target.value);break;case"year":c.setYear(t.target.value)}}l.addEventListener("input",f),h.addEventListener("input",f),u.addEventListener("input",f),document.querySelector("#art-picker").addEventListener("change",(function(t){var e=new FileReader;e.onload=function(){c.setAlbumArt(e.result)},e.readAsDataURL(t.target.files[0])})),document.querySelector("#download-link").addEventListener("click",(function(t){window.sa_event("download_art"),t.target.download=c.meta.album+"-label.png",t.target.href=c.getDataURL()})),document.querySelector("#redraw").addEventListener("click",(function(){window.sa_event("redraw_art"),c.draw()})),r.load({typekit:{id:"elb5ydo"},active:function(){return c.draw()}})},function(t,e,n){t.exports=n.p+"images/glass-beach.f7275453c3519f9e7598104a83e39c73.jpg"},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(3),s=n(4),r=function(){function t(t,e,n){this.canvas=t,this.ctx=t.getContext("2d"),this.settings=e,this.meta=n,this.setupDrawing()}return t.prototype.draw=function(){this.initCanvas(),this.drawArrow(),this.drawInsertText(),this.drawAlbumArt(),this.drawMDLogo(),this.drawMeta()},t.prototype.initCanvas=function(){this.ctx.fillStyle="#231F20",this.ctx.fillRect(0,0,this.settings.width*this.settings.ppm,this.settings.height*this.settings.ppm)},t.prototype.setupDrawing=function(){this.canvas.height=this.settings.height*this.settings.ppm,this.canvas.width=this.settings.width*this.settings.ppm},t.prototype.calculateCentering=function(t,e,n){return void 0===n&&(n=0),(t-e)/2+n},t.prototype.drawArrow=function(){var t=this.calculateCentering(this.settings.headerHeight*this.settings.ppm,1.2593*this.settings.ppm,0);this.ctx.fillStyle="white",this.ctx.beginPath(),this.ctx.moveTo(3.25*this.settings.ppm,t),this.ctx.lineTo(4.5*this.settings.ppm,t+1.2593*this.settings.ppm),this.ctx.lineTo(2*this.settings.ppm,t+1.2593*this.settings.ppm),this.ctx.fill()},t.prototype.drawInsertText=function(){this.ctx.font="bold "+this.settings.fontSize*this.settings.ppm+"px futura-pt-bold",this.ctx.fillStyle="white";var t=this.calculateCentering(this.settings.headerHeight*this.settings.ppm,this.settings.lineHeight*this.settings.ppm,0);this.ctx.fillText("INSERT THIS END",5.5*this.settings.ppm,Math.round(t+this.settings.fontSize*this.settings.ppm))},t.prototype.drawAlbumArt=function(){var t=this,e=new Image;e.crossOrigin="anonymous",e.addEventListener("load",(function(){t.ctx.fillStyle="#231F20",t.ctx.fillRect(0,5*t.settings.ppm,t.settings.width*t.settings.ppm,t.settings.width*t.settings.ppm);var n=e.width,i=t.settings.width*t.settings.ppm/n,s=e.height*i;t.ctx.drawImage(e,0,t.calculateCentering(t.settings.width*t.settings.ppm,s,t.settings.headerHeight*t.settings.ppm),t.settings.width*t.settings.ppm,s)}),!1),e.src=this.meta.artURL},t.prototype.drawMDLogo=function(){var t=this,e=new Image;e.crossOrigin="anonymous",e.addEventListener("load",(function(){var n=e.width,i=3.688*t.settings.ppm/n,s=e.height*i;t.ctx.drawImage(e,t.settings.width*t.settings.ppm-2*t.settings.ppm-3.688*t.settings.ppm,t.calculateCentering(t.settings.headerHeight*t.settings.ppm,s,0),3.688*t.settings.ppm,s)}),!1),e.src=s},t.prototype.drawMeta=function(){this.ctx.fillStyle="#231F20",this.ctx.fillRect(0,41*this.settings.ppm,this.settings.width*this.settings.ppm,10*this.settings.ppm),this.ctx.font="bold "+this.settings.fontSize*this.settings.ppm+"px futura-pt-bold",this.ctx.fillStyle="white";var t,e=(this.settings.lineHeight+this.settings.lineHeight+this.settings.fontSize)*this.settings.ppm;t=this.calculateCentering(10*this.settings.ppm,e,41*this.settings.ppm),console.log(t),this.ctx.fillText(this.meta.album.toUpperCase(),2*this.settings.ppm,Math.round(t+this.settings.fontSize*this.settings.ppm)),this.ctx.fillText(this.meta.artist.toUpperCase(),2*this.settings.ppm,Math.round(t+this.settings.lineHeight*this.settings.ppm+this.settings.fontSize*this.settings.ppm)),this.ctx.fillText(this.meta.year.toUpperCase(),2*this.settings.ppm,Math.round(t+this.settings.lineHeight*this.settings.ppm+this.settings.lineHeight*this.settings.ppm+this.settings.fontSize*this.settings.ppm))},t.prototype.setArtist=function(t){this.meta.artist=t,this.drawMeta()},t.prototype.setAlbum=function(t){this.meta.album=t,this.drawMeta()},t.prototype.setYear=function(t){this.meta.year=t,this.drawMeta()},t.prototype.setAlbumArt=function(t){this.meta.artURL=t,this.drawAlbumArt()},t.prototype.getDataURL=function(){var t=this.canvas.toDataURL("image/png");return t=i.changeDpiDataUrl(t,300)},t}();e.MinidiscLabeler=r},function(t,e,n){"use strict";function i(t){var e=-1;s||(s=function(){for(var t=new Int32Array(256),e=0;e<256;e++){for(var n=e,i=0;i<8;i++)n=1&n?3988292384^n>>>1:n>>>1;t[e]=n}return t}());for(var n=0;n<t.length;n++)e=s[255&(e^t[n])]^e>>>8;return-1^e}Object.defineProperty(e,"__esModule",{value:!0}),e.changeDpiBlob=function(t,e){var n=t.slice(0,33);return new Promise((function(i,s){var r=new FileReader;r.onload=function(){var n=new Uint8Array(r.result),s=t.slice(33),o=u(n,e,t.type);i(new Blob([o,s],{type:t.type}))},r.readAsArrayBuffer(n)}))},e.changeDpiDataUrl=function(t,e){var n=t.split(","),i=n[0],s=n[1],a=void 0,c=void 0,l=!1;if(-1!==i.indexOf(r)){a=r;var h=function(t){var e=t.indexOf("AAlwSFlz");-1===e&&(e=t.indexOf("AAAJcEhZ"));-1===e&&(e=t.indexOf("AAAACXBI"));return e}(s);h>=0?(c=4*Math.ceil((h+28)/3),l=!0):c=44}-1!==i.indexOf(o)&&(a=o,c=24);for(var f=s.substring(0,c),p=s.substring(c),d=atob(f),g=new Uint8Array(d.length),m=0;m<g.length;m++)g[m]=d.charCodeAt(m);var v=u(g,e,a,l),y=btoa(String.fromCharCode.apply(String,function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(v)));return[i,",",y,p].join("")};var s=void 0,r="image/png",o="image/jpeg",a="p".charCodeAt(0),c="H".charCodeAt(0),l="Y".charCodeAt(0),h="s".charCodeAt(0);function u(t,e,n,s){if(n===o)return t[13]=1,t[14]=e>>8,t[15]=255&e,t[16]=e>>8,t[17]=255&e,t;if(n===r){var u=new Uint8Array(13);e*=39.3701,u[0]=a,u[1]=c,u[2]=l,u[3]=h,u[4]=e>>>24,u[5]=e>>>16,u[6]=e>>>8,u[7]=255&e,u[8]=u[4],u[9]=u[5],u[10]=u[6],u[11]=u[7],u[12]=1;var f=i(u),p=new Uint8Array(4);if(p[0]=f>>>24,p[1]=f>>>16,p[2]=f>>>8,p[3]=255&f,s){var d=function(t){for(var e=t.length-1;e>=4;e--)if(9===t[e-4]&&t[e-3]===a&&t[e-2]===c&&t[e-1]===l&&t[e]===h)return e-3}(t);return t.set(u,d),t.set(p,d+13),t}var g=new Uint8Array(4);g[0]=0,g[1]=0,g[2]=0,g[3]=9;var m=new Uint8Array(54);return m.set(t,0),m.set(g,33),m.set(u,37),m.set(p,50),m}}},function(t,e,n){t.exports=n.p+"images/md-logo.75d9b8a1bbee992f515b2d5477df7dc8.svg"},function(t,e,n){var i;!function(){function s(t,e,n){return t.call.apply(t.bind,arguments)}function r(t,e,n){if(!t)throw Error();if(2<arguments.length){var i=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,i),t.apply(e,n)}}return function(){return t.apply(e,arguments)}}function o(t,e,n){return(o=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?s:r).apply(null,arguments)}var a=Date.now||function(){return+new Date};function c(t,e){this.a=t,this.o=e||t,this.c=this.o.document}var l=!!window.FontFace;function h(t,e,n,i){if(e=t.c.createElement(e),n)for(var s in n)n.hasOwnProperty(s)&&("style"==s?e.style.cssText=n[s]:e.setAttribute(s,n[s]));return i&&e.appendChild(t.c.createTextNode(i)),e}function u(t,e,n){(t=t.c.getElementsByTagName(e)[0])||(t=document.documentElement),t.insertBefore(n,t.lastChild)}function f(t){t.parentNode&&t.parentNode.removeChild(t)}function p(t,e,n){e=e||[],n=n||[];for(var i=t.className.split(/\s+/),s=0;s<e.length;s+=1){for(var r=!1,o=0;o<i.length;o+=1)if(e[s]===i[o]){r=!0;break}r||i.push(e[s])}for(e=[],s=0;s<i.length;s+=1){for(r=!1,o=0;o<n.length;o+=1)if(i[s]===n[o]){r=!0;break}r||e.push(i[s])}t.className=e.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function d(t,e){for(var n=t.className.split(/\s+/),i=0,s=n.length;i<s;i++)if(n[i]==e)return!0;return!1}function g(t,e,n){function i(){a&&s&&r&&(a(o),a=null)}e=h(t,"link",{rel:"stylesheet",href:e,media:"all"});var s=!1,r=!0,o=null,a=n||null;l?(e.onload=function(){s=!0,i()},e.onerror=function(){s=!0,o=Error("Stylesheet failed to load"),i()}):setTimeout((function(){s=!0,i()}),0),u(t,"head",e)}function m(t,e,n,i){var s=t.c.getElementsByTagName("head")[0];if(s){var r=h(t,"script",{src:e}),o=!1;return r.onload=r.onreadystatechange=function(){o||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(o=!0,n&&n(null),r.onload=r.onreadystatechange=null,"HEAD"==r.parentNode.tagName&&s.removeChild(r))},s.appendChild(r),setTimeout((function(){o||(o=!0,n&&n(Error("Script load timeout")))}),i||5e3),r}return null}function v(){this.a=0,this.c=null}function y(t){return t.a++,function(){t.a--,b(t)}}function w(t,e){t.c=e,b(t)}function b(t){0==t.a&&t.c&&(t.c(),t.c=null)}function x(t){this.a=t||"-"}function A(t,e){this.c=t,this.f=4,this.a="n";var n=(e||"n4").match(/^([nio])([1-9])$/i);n&&(this.a=n[1],this.f=parseInt(n[2],10))}function S(t){var e=[];t=t.split(/,\s*/);for(var n=0;n<t.length;n++){var i=t[n].replace(/['"]/g,"");-1!=i.indexOf(" ")||/^\d/.test(i)?e.push("'"+i+"'"):e.push(i)}return e.join(",")}function j(t){return t.a+t.f}function _(t){var e="normal";return"o"===t.a?e="oblique":"i"===t.a&&(e="italic"),e}function C(t){var e=4,n="n",i=null;return t&&((i=t.match(/(normal|oblique|italic)/i))&&i[1]&&(n=i[1].substr(0,1).toLowerCase()),(i=t.match(/([1-9]00|normal|bold)/i))&&i[1]&&(/bold/i.test(i[1])?e=7:/[1-9]00/.test(i[1])&&(e=parseInt(i[1].substr(0,1),10)))),n+e}function T(t,e){this.c=t,this.f=t.o.document.documentElement,this.h=e,this.a=new x("-"),this.j=!1!==e.events,this.g=!1!==e.classes}function k(t){if(t.g){var e=d(t.f,t.a.c("wf","active")),n=[],i=[t.a.c("wf","loading")];e||n.push(t.a.c("wf","inactive")),p(t.f,n,i)}M(t,"inactive")}function M(t,e,n){t.j&&t.h[e]&&(n?t.h[e](n.c,j(n)):t.h[e]())}function L(){this.c={}}function O(t,e){this.c=t,this.f=e,this.a=h(this.c,"span",{"aria-hidden":"true"},this.f)}function E(t){u(t.c,"body",t.a)}function U(t){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+S(t.c)+";font-style:"+_(t)+";font-weight:"+t.f+"00;"}function I(t,e,n,i,s,r){this.g=t,this.j=e,this.a=i,this.c=n,this.f=s||3e3,this.h=r||void 0}function N(t,e,n,i,s,r,o){this.v=t,this.B=e,this.c=n,this.a=i,this.s=o||"BESbswy",this.f={},this.w=s||3e3,this.u=r||null,this.m=this.j=this.h=this.g=null,this.g=new O(this.c,this.s),this.h=new O(this.c,this.s),this.j=new O(this.c,this.s),this.m=new O(this.c,this.s),t=U(t=new A(this.a.c+",serif",j(this.a))),this.g.a.style.cssText=t,t=U(t=new A(this.a.c+",sans-serif",j(this.a))),this.h.a.style.cssText=t,t=U(t=new A("serif",j(this.a))),this.j.a.style.cssText=t,t=U(t=new A("sans-serif",j(this.a))),this.m.a.style.cssText=t,E(this.g),E(this.h),E(this.j),E(this.m)}x.prototype.c=function(t){for(var e=[],n=0;n<arguments.length;n++)e.push(arguments[n].replace(/[\W_]+/g,"").toLowerCase());return e.join(this.a)},I.prototype.start=function(){var t=this.c.o.document,e=this,n=a(),i=new Promise((function(i,s){!function r(){a()-n>=e.f?s():t.fonts.load(function(t){return _(t)+" "+t.f+"00 300px "+S(t.c)}(e.a),e.h).then((function(t){1<=t.length?i():setTimeout(r,25)}),(function(){s()}))}()})),s=null,r=new Promise((function(t,n){s=setTimeout(n,e.f)}));Promise.race([r,i]).then((function(){s&&(clearTimeout(s),s=null),e.g(e.a)}),(function(){e.j(e.a)}))};var R={D:"serif",C:"sans-serif"},D=null;function H(){if(null===D){var t=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);D=!!t&&(536>parseInt(t[1],10)||536===parseInt(t[1],10)&&11>=parseInt(t[2],10))}return D}function P(t,e,n){for(var i in R)if(R.hasOwnProperty(i)&&e===t.f[R[i]]&&n===t.f[R[i]])return!0;return!1}function F(t){var e,n=t.g.a.offsetWidth,i=t.h.a.offsetWidth;(e=n===t.f.serif&&i===t.f["sans-serif"])||(e=H()&&P(t,n,i)),e?a()-t.A>=t.w?H()&&P(t,n,i)&&(null===t.u||t.u.hasOwnProperty(t.a.c))?B(t,t.v):B(t,t.B):function(t){setTimeout(o((function(){F(this)}),t),50)}(t):B(t,t.v)}function B(t,e){setTimeout(o((function(){f(this.g.a),f(this.h.a),f(this.j.a),f(this.m.a),e(this.a)}),t),0)}function q(t,e,n){this.c=t,this.a=e,this.f=0,this.m=this.j=!1,this.s=n}N.prototype.start=function(){this.f.serif=this.j.a.offsetWidth,this.f["sans-serif"]=this.m.a.offsetWidth,this.A=a(),F(this)};var z=null;function W(t){0==--t.f&&t.j&&(t.m?((t=t.a).g&&p(t.f,[t.a.c("wf","active")],[t.a.c("wf","loading"),t.a.c("wf","inactive")]),M(t,"active")):k(t.a))}function $(t){this.j=t,this.a=new L,this.h=0,this.f=this.g=!0}function J(t,e,n,i,s){var r=0==--t.h;(t.f||t.g)&&setTimeout((function(){var t=s||null,a=i||{};if(0===n.length&&r)k(e.a);else{e.f+=n.length,r&&(e.j=r);var c,l=[];for(c=0;c<n.length;c++){var h=n[c],u=a[h.c],f=e.a,d=h;if(f.g&&p(f.f,[f.a.c("wf",d.c,j(d).toString(),"loading")]),M(f,"fontloading",d),f=null,null===z)if(window.FontFace){d=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent);var g=/OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent)&&/Apple/.exec(window.navigator.vendor);z=d?42<parseInt(d[1],10):!g}else z=!1;f=z?new I(o(e.g,e),o(e.h,e),e.c,h,e.s,u):new N(o(e.g,e),o(e.h,e),e.c,h,e.s,t,u),l.push(f)}for(c=0;c<l.length;c++)l[c].start()}}),0)}function Y(t,e){this.c=t,this.a=e}function X(t,e){this.c=t,this.a=e}function G(t,e){this.c=t||K,this.a=[],this.f=[],this.g=e||""}q.prototype.g=function(t){var e=this.a;e.g&&p(e.f,[e.a.c("wf",t.c,j(t).toString(),"active")],[e.a.c("wf",t.c,j(t).toString(),"loading"),e.a.c("wf",t.c,j(t).toString(),"inactive")]),M(e,"fontactive",t),this.m=!0,W(this)},q.prototype.h=function(t){var e=this.a;if(e.g){var n=d(e.f,e.a.c("wf",t.c,j(t).toString(),"active")),i=[],s=[e.a.c("wf",t.c,j(t).toString(),"loading")];n||i.push(e.a.c("wf",t.c,j(t).toString(),"inactive")),p(e.f,i,s)}M(e,"fontinactive",t),W(this)},$.prototype.load=function(t){this.c=new c(this.j,t.context||this.j),this.g=!1!==t.events,this.f=!1!==t.classes,function(t,e,n){var i=[],s=n.timeout;!function(t){t.g&&p(t.f,[t.a.c("wf","loading")]),M(t,"loading")}(e);i=function(t,e,n){var i,s=[];for(i in e)if(e.hasOwnProperty(i)){var r=t.c[i];r&&s.push(r(e[i],n))}return s}(t.a,n,t.c);var r=new q(t.c,e,s);for(t.h=i.length,e=0,n=i.length;e<n;e++)i[e].load((function(e,n,i){J(t,r,e,n,i)}))}(this,new T(this.c,t),t)},Y.prototype.load=function(t){var e=this,n=e.a.projectId,i=e.a.version;if(n){var s=e.c.o;m(this.c,(e.a.api||"https://fast.fonts.net/jsapi")+"/"+n+".js"+(i?"?v="+i:""),(function(i){i?t([]):(s["__MonotypeConfiguration__"+n]=function(){return e.a},function e(){if(s["__mti_fntLst"+n]){var i,r=s["__mti_fntLst"+n](),o=[];if(r)for(var a=0;a<r.length;a++){var c=r[a].fontfamily;null!=r[a].fontStyle&&null!=r[a].fontWeight?(i=r[a].fontStyle+r[a].fontWeight,o.push(new A(c,i))):o.push(new A(c))}t(o)}else setTimeout((function(){e()}),50)}())})).id="__MonotypeAPIScript__"+n}else t([])},X.prototype.load=function(t){var e,n,i=this.a.urls||[],s=this.a.families||[],r=this.a.testStrings||{},o=new v;for(e=0,n=i.length;e<n;e++)g(this.c,i[e],y(o));var a=[];for(e=0,n=s.length;e<n;e++)if((i=s[e].split(":"))[1])for(var c=i[1].split(","),l=0;l<c.length;l+=1)a.push(new A(i[0],c[l]));else a.push(new A(i[0]));w(o,(function(){t(a,r)}))};var K="https://fonts.googleapis.com/css";function V(t){this.f=t,this.a=[],this.c={}}var Z={latin:"BESbswy","latin-ext":"çöüğş",cyrillic:"йяЖ",greek:"αβΣ",khmer:"កខគ",Hanuman:"កខគ"},Q={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},tt={i:"i",italic:"i",n:"n",normal:"n"},et=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;function nt(t,e){this.c=t,this.a=e}var it={Arimo:!0,Cousine:!0,Tinos:!0};function st(t,e){this.c=t,this.a=e}function rt(t,e){this.c=t,this.f=e,this.a=[]}nt.prototype.load=function(t){var e=new v,n=this.c,i=new G(this.a.api,this.a.text),s=this.a.families;!function(t,e){for(var n=e.length,i=0;i<n;i++){var s=e[i].split(":");3==s.length&&t.f.push(s.pop());var r="";2==s.length&&""!=s[1]&&(r=":"),t.a.push(s.join(r))}}(i,s);var r=new V(s);!function(t){for(var e=t.f.length,n=0;n<e;n++){var i=t.f[n].split(":"),s=i[0].replace(/\+/g," "),r=["n4"];if(2<=i.length){var o;if(o=[],a=i[1])for(var a,c=(a=a.split(",")).length,l=0;l<c;l++){var h;if((h=a[l]).match(/^[\w-]+$/))if(null==(f=et.exec(h.toLowerCase())))h="";else{if(h=null==(h=f[2])||""==h?"n":tt[h],null==(f=f[1])||""==f)f="4";else var u=Q[f],f=u||(isNaN(f)?"4":f.substr(0,1));h=[h,f].join("")}else h="";h&&o.push(h)}0<o.length&&(r=o),3==i.length&&(o=[],0<(i=(i=i[2])?i.split(","):o).length&&(i=Z[i[0]])&&(t.c[s]=i))}for(t.c[s]||(i=Z[s])&&(t.c[s]=i),i=0;i<r.length;i+=1)t.a.push(new A(s,r[i]))}}(r),g(n,function(t){if(0==t.a.length)throw Error("No fonts to load!");if(-1!=t.c.indexOf("kit="))return t.c;for(var e=t.a.length,n=[],i=0;i<e;i++)n.push(t.a[i].replace(/ /g,"+"));return e=t.c+"?family="+n.join("%7C"),0<t.f.length&&(e+="&subset="+t.f.join(",")),0<t.g.length&&(e+="&text="+encodeURIComponent(t.g)),e}(i),y(e)),w(e,(function(){t(r.a,r.c,it)}))},st.prototype.load=function(t){var e=this.a.id,n=this.c.o;e?m(this.c,(this.a.api||"https://use.typekit.net")+"/"+e+".js",(function(e){if(e)t([]);else if(n.Typekit&&n.Typekit.config&&n.Typekit.config.fn){e=n.Typekit.config.fn;for(var i=[],s=0;s<e.length;s+=2)for(var r=e[s],o=e[s+1],a=0;a<o.length;a++)i.push(new A(r,o[a]));try{n.Typekit.load({events:!1,classes:!1,async:!0})}catch(t){}t(i)}}),2e3):t([])},rt.prototype.load=function(t){var e=this.f.id,n=this.c.o,i=this;e?(n.__webfontfontdeckmodule__||(n.__webfontfontdeckmodule__={}),n.__webfontfontdeckmodule__[e]=function(e,n){for(var s=0,r=n.fonts.length;s<r;++s){var o=n.fonts[s];i.a.push(new A(o.name,C("font-weight:"+o.weight+";font-style:"+o.style)))}t(i.a)},m(this.c,(this.f.api||"https://f.fontdeck.com/s/css/js/")+function(t){return t.o.location.hostname||t.a.location.hostname}(this.c)+"/"+e+".js",(function(e){e&&t([])}))):t([])};var ot=new $(window);ot.a.c.custom=function(t,e){return new X(e,t)},ot.a.c.fontdeck=function(t,e){return new rt(e,t)},ot.a.c.monotype=function(t,e){return new Y(e,t)},ot.a.c.typekit=function(t,e){return new st(e,t)},ot.a.c.google=function(t,e){return new nt(e,t)};var at={load:o(ot.load,ot)};void 0===(i=function(){return at}.call(e,n,e,t))||(t.exports=i)}()},function(t,e,n){var i=n(7),s=n(8);"string"==typeof(s=s.__esModule?s.default:s)&&(s=[[t.i,s,""]]);var r={insert:"head",singleton:!1},o=(i(s,r),s.locals?s.locals:{});t.exports=o},function(t,e,n){"use strict";var i,s=function(){return void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i},r=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}(),o=[];function a(t){for(var e=-1,n=0;n<o.length;n++)if(o[n].identifier===t){e=n;break}return e}function c(t,e){for(var n={},i=[],s=0;s<t.length;s++){var r=t[s],c=e.base?r[0]+e.base:r[0],l=n[c]||0,h="".concat(c," ").concat(l);n[c]=l+1;var u=a(h),f={css:r[1],media:r[2],sourceMap:r[3]};-1!==u?(o[u].references++,o[u].updater(f)):o.push({identifier:h,updater:m(f,e),references:1}),i.push(h)}return i}function l(t){var e=document.createElement("style"),i=t.attributes||{};if(void 0===i.nonce){var s=n.nc;s&&(i.nonce=s)}if(Object.keys(i).forEach((function(t){e.setAttribute(t,i[t])})),"function"==typeof t.insert)t.insert(e);else{var o=r(t.insert||"head");if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(e)}return e}var h,u=(h=[],function(t,e){return h[t]=e,h.filter(Boolean).join("\n")});function f(t,e,n,i){var s=n?"":i.media?"@media ".concat(i.media," {").concat(i.css,"}"):i.css;if(t.styleSheet)t.styleSheet.cssText=u(e,s);else{var r=document.createTextNode(s),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(r,o[e]):t.appendChild(r)}}function p(t,e,n){var i=n.css,s=n.media,r=n.sourceMap;if(s?t.setAttribute("media",s):t.removeAttribute("media"),r&&btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}var d=null,g=0;function m(t,e){var n,i,s;if(e.singleton){var r=g++;n=d||(d=l(e)),i=f.bind(null,n,r,!1),s=f.bind(null,n,r,!0)}else n=l(e),i=p.bind(null,n,e),s=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else s()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=s());var n=c(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var i=0;i<n.length;i++){var s=a(n[i]);o[s].references--}for(var r=c(t,e),l=0;l<n.length;l++){var h=a(n[l]);0===o[h].references&&(o[h].updater(),o.splice(h,1))}n=r}}}},function(t,e,n){(e=n(9)(!1)).push([t.i,"body{background-color:#eee}@media(prefers-color-scheme: dark){body{background-color:#202123;color:#fff}body nav{background-color:#26a69a}body .card{background-color:rgba(255,255,255,.2)}body .btn{background-color:#ee6f73}body .divider{opacity:.2}body .sidenav{background-color:#2d2d31}body .sidenav li a:not(.subheader){color:#89b2f5}body .sidenav li a:not(.subheader):hover{background-color:#3b4043}body .sidenav li a.subheader{color:#9aa0a6}body .sidenav li a .material-icons{color:#9aa0a6}body .collection{border:1px solid rgba(255,255,255,.2)}body .collection .collection-item{background-color:rgba(255,255,255,.2);border-bottom:1px solid rgba(255,255,255,.2)}body input{color:#fff}}",""]),t.exports=e},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",i=t[3];if(!i)return n;if(e&&"function"==typeof btoa){var s=(o=i,a=btoa(unescape(encodeURIComponent(JSON.stringify(o)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),"/*# ".concat(c," */")),r=i.sources.map((function(t){return"/*# sourceURL=".concat(i.sourceRoot||"").concat(t," */")}));return[n].concat(r).concat([s]).join("\n")}var o,a,c;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(n,"}"):n})).join("")},e.i=function(t,n,i){"string"==typeof t&&(t=[[null,t,""]]);var s={};if(i)for(var r=0;r<this.length;r++){var o=this[r][0];null!=o&&(s[o]=!0)}for(var a=0;a<t.length;a++){var c=[].concat(t[a]);i&&s[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),e.push(c))}},e}}]);
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).tracker=t()}(this,(function(){"use strict";function e(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function t(t){for(var a=1;a<arguments.length;a++){var r=null!=arguments[a]?arguments[a]:{};a%2?e(Object(r),!0).forEach((function(e){n(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):e(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function n(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,t||"default");if("object"!=typeof a)return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}!function(e,t,n){"undefined"!=typeof window&&"function"==typeof define&&define.amd?define(n):"undefined"!=typeof module&&module.exports?module.exports=n():t.exports?t.exports=n():t.Fingerprint2=n()}(0,window,(function(){var e=function(e,t){e=[e[0]>>>16,65535&e[0],e[1]>>>16,65535&e[1]],t=[t[0]>>>16,65535&t[0],t[1]>>>16,65535&t[1]];var n=[0,0,0,0];return n[3]+=e[3]+t[3],n[2]+=n[3]>>>16,n[3]&=65535,n[2]+=e[2]+t[2],n[1]+=n[2]>>>16,n[2]&=65535,n[1]+=e[1]+t[1],n[0]+=n[1]>>>16,n[1]&=65535,n[0]+=e[0]+t[0],n[0]&=65535,[n[0]<<16|n[1],n[2]<<16|n[3]]},t=function(e,t){e=[e[0]>>>16,65535&e[0],e[1]>>>16,65535&e[1]],t=[t[0]>>>16,65535&t[0],t[1]>>>16,65535&t[1]];var n=[0,0,0,0];return n[3]+=e[3]*t[3],n[2]+=n[3]>>>16,n[3]&=65535,n[2]+=e[2]*t[3],n[1]+=n[2]>>>16,n[2]&=65535,n[2]+=e[3]*t[2],n[1]+=n[2]>>>16,n[2]&=65535,n[1]+=e[1]*t[3],n[0]+=n[1]>>>16,n[1]&=65535,n[1]+=e[2]*t[2],n[0]+=n[1]>>>16,n[1]&=65535,n[1]+=e[3]*t[1],n[0]+=n[1]>>>16,n[1]&=65535,n[0]+=e[0]*t[3]+e[1]*t[2]+e[2]*t[1]+e[3]*t[0],n[0]&=65535,[n[0]<<16|n[1],n[2]<<16|n[3]]},n=function(e,t){return 32==(t%=64)?[e[1],e[0]]:t<32?[e[0]<<t|e[1]>>>32-t,e[1]<<t|e[0]>>>32-t]:(t-=32,[e[1]<<t|e[0]>>>32-t,e[0]<<t|e[1]>>>32-t])},a=function(e,t){return 0==(t%=64)?e:t<32?[e[0]<<t|e[1]>>>32-t,e[1]<<t]:[e[1]<<t-32,0]},r=function(e,t){return[e[0]^t[0],e[1]^t[1]]},o=function(e){return e=r(e,[0,e[0]>>>1]),e=t(e,[4283543511,3981806797]),e=r(e,[0,e[0]>>>1]),e=t(e,[3301882366,444984403]),r(e,[0,e[0]>>>1])},i=function(i,c){c=c||0;for(var s=(i=i||"").length%16,u=i.length-s,l=[0,c],d=[0,c],f=[0,0],g=[0,0],h=[2277735313,289559509],p=[1291169091,658871167],m=0;m<u;m+=16)f=[255&i.charCodeAt(m+4)|(255&i.charCodeAt(m+5))<<8|(255&i.charCodeAt(m+6))<<16|(255&i.charCodeAt(m+7))<<24,255&i.charCodeAt(m)|(255&i.charCodeAt(m+1))<<8|(255&i.charCodeAt(m+2))<<16|(255&i.charCodeAt(m+3))<<24],g=[255&i.charCodeAt(m+12)|(255&i.charCodeAt(m+13))<<8|(255&i.charCodeAt(m+14))<<16|(255&i.charCodeAt(m+15))<<24,255&i.charCodeAt(m+8)|(255&i.charCodeAt(m+9))<<8|(255&i.charCodeAt(m+10))<<16|(255&i.charCodeAt(m+11))<<24],f=t(f,h),f=n(f,31),f=t(f,p),l=r(l,f),l=n(l,27),l=e(l,d),l=e(t(l,[0,5]),[0,1390208809]),g=t(g,p),g=n(g,33),g=t(g,h),d=r(d,g),d=n(d,31),d=e(d,l),d=e(t(d,[0,5]),[0,944331445]);switch(f=[0,0],g=[0,0],s){case 15:g=r(g,a([0,i.charCodeAt(m+14)],48));case 14:g=r(g,a([0,i.charCodeAt(m+13)],40));case 13:g=r(g,a([0,i.charCodeAt(m+12)],32));case 12:g=r(g,a([0,i.charCodeAt(m+11)],24));case 11:g=r(g,a([0,i.charCodeAt(m+10)],16));case 10:g=r(g,a([0,i.charCodeAt(m+9)],8));case 9:g=r(g,[0,i.charCodeAt(m+8)]),g=t(g,p),g=n(g,33),g=t(g,h),d=r(d,g);case 8:f=r(f,a([0,i.charCodeAt(m+7)],56));case 7:f=r(f,a([0,i.charCodeAt(m+6)],48));case 6:f=r(f,a([0,i.charCodeAt(m+5)],40));case 5:f=r(f,a([0,i.charCodeAt(m+4)],32));case 4:f=r(f,a([0,i.charCodeAt(m+3)],24));case 3:f=r(f,a([0,i.charCodeAt(m+2)],16));case 2:f=r(f,a([0,i.charCodeAt(m+1)],8));case 1:f=r(f,[0,i.charCodeAt(m)]),f=t(f,h),f=n(f,31),f=t(f,p),l=r(l,f)}return l=r(l,[0,i.length]),d=r(d,[0,i.length]),l=e(l,d),d=e(d,l),l=o(l),d=o(d),l=e(l,d),d=e(d,l),"00000000".concat((l[0]>>>0).toString(16)).slice(-8)+"00000000".concat((l[1]>>>0).toString(16)).slice(-8)+"00000000".concat((d[0]>>>0).toString(16)).slice(-8)+"00000000".concat((d[1]>>>0).toString(16)).slice(-8)},c={preprocessor:null,audio:{timeout:1e3,excludeIOS11:!0},fonts:{swfContainerId:"fingerprintjs2",swfPath:"flash/compiled/FontList.swf",userDefinedFonts:[],extendedJsFonts:!1},screen:{detectScreenOrientation:!0},plugins:{sortPluginsFor:[/palemoon/i],excludeIE:!1},extraComponents:[],excludes:{enumerateDevices:!0,pixelRatio:!0,doNotTrack:!0,fontsFlash:!0},NOT_AVAILABLE:"not available",ERROR:"error",EXCLUDED:"excluded"},s=function(e,t){if(Array.prototype.forEach&&e.forEach===Array.prototype.forEach)e.forEach(t);else if(e.length===+e.length)for(var n=0,a=e.length;n<a;n++)t(e[n],n,e);else for(var r in e)e.hasOwnProperty(r)&&t(e[r],r,e)},u=function(e,t){var n=[];return null==e?n:Array.prototype.map&&e.map===Array.prototype.map?e.map(t):(s(e,(function(e,a,r){n.push(t(e,a,r))})),n)},l=function(e){if(null==navigator.plugins)return e.NOT_AVAILABLE;for(var t=[],n=0,a=navigator.plugins.length;n<a;n++)navigator.plugins[n]&&t.push(navigator.plugins[n]);return d(e)&&(t=t.sort((function(e,t){return e.name>t.name?1:e.name<t.name?-1:0}))),u(t,(function(e){var t=u(e,(function(e){return[e.type,e.suffixes]}));return[e.name,e.description,t]}))},d=function(e){for(var t=!1,n=0,a=e.plugins.sortPluginsFor.length;n<a;n++){var r=e.plugins.sortPluginsFor[n];if(navigator.userAgent.match(r)){t=!0;break}}return t},f=function(){var e=document.createElement("canvas");return!(!e.getContext||!e.getContext("2d"))},g=function(){if(!f())return!1;var e=h();return!!window.WebGLRenderingContext&&!!e},h=function(){var e=document.createElement("canvas"),t=null;try{t=e.getContext("webgl")||e.getContext("experimental-webgl")}catch(e){}return t||(t=null),t},p=[{key:"userAgent",getData:function(e){e(navigator.userAgent)}},{key:"webdriver",getData:function(e,t){e(null==navigator.webdriver?t.NOT_AVAILABLE:navigator.webdriver)}},{key:"language",getData:function(e,t){e(navigator.language||navigator.userLanguage||navigator.browserLanguage||navigator.systemLanguage||t.NOT_AVAILABLE)}},{key:"colorDepth",getData:function(e,t){e(window.screen.colorDepth||t.NOT_AVAILABLE)}},{key:"deviceMemory",getData:function(e,t){e(navigator.deviceMemory||t.NOT_AVAILABLE)}},{key:"pixelRatio",getData:function(e,t){e(window.devicePixelRatio||t.NOT_AVAILABLE)}},{key:"hardwareConcurrency",getData:function(e,t){e(function(e){return navigator.hardwareConcurrency?navigator.hardwareConcurrency:e.NOT_AVAILABLE}(t))}},{key:"screenResolution",getData:function(e,t){e(function(e){var t=[window.screen.width,window.screen.height];return e.screen.detectScreenOrientation&&t.sort().reverse(),t}(t))}},{key:"availableScreenResolution",getData:function(e,t){e(function(e){if(window.screen.availWidth&&window.screen.availHeight){var t=[window.screen.availHeight,window.screen.availWidth];return e.screen.detectScreenOrientation&&t.sort().reverse(),t}return e.NOT_AVAILABLE}(t))}},{key:"timezoneOffset",getData:function(e){e((new Date).getTimezoneOffset())}},{key:"timezone",getData:function(e,t){window.Intl&&window.Intl.DateTimeFormat?e((new window.Intl.DateTimeFormat).resolvedOptions().timeZone):e(t.NOT_AVAILABLE)}},{key:"sessionStorage",getData:function(e,t){e(function(t){try{return!!window.sessionStorage}catch(e){return t.ERROR}}(t))}},{key:"localStorage",getData:function(e,t){e(function(t){try{return!!window.localStorage}catch(e){return t.ERROR}}(t))}},{key:"indexedDb",getData:function(e,t){e(function(t){try{return!!window.indexedDB}catch(e){return t.ERROR}}(t))}},{key:"addBehavior",getData:function(e){e(!(!document.body||!document.body.addBehavior))}},{key:"openDatabase",getData:function(e){e(!!window.openDatabase)}},{key:"cpuClass",getData:function(e,t){e(function(e){return navigator.cpuClass||e.NOT_AVAILABLE}(t))}},{key:"platform",getData:function(e,t){e(function(e){return navigator.platform?navigator.platform:e.NOT_AVAILABLE}(t))}},{key:"doNotTrack",getData:function(e,t){e(function(e){return navigator.doNotTrack?navigator.doNotTrack:navigator.msDoNotTrack?navigator.msDoNotTrack:window.doNotTrack?window.doNotTrack:e.NOT_AVAILABLE}(t))}},{key:"plugins",getData:function(e,t){"Microsoft Internet Explorer"===navigator.appName||"Netscape"===navigator.appName&&/Trident/.test(navigator.userAgent)?t.plugins.excludeIE?e(t.EXCLUDED):e(function(e){var t=[];return Object.getOwnPropertyDescriptor&&Object.getOwnPropertyDescriptor(window,"ActiveXObject")||"ActiveXObject"in window?t=u(["AcroPDF.PDF","Adodb.Stream","AgControl.AgControl","DevalVRXCtrl.DevalVRXCtrl.1","MacromediaFlashPaper.MacromediaFlashPaper","Msxml2.DOMDocument","Msxml2.XMLHTTP","PDF.PdfCtrl","QuickTime.QuickTime","QuickTimeCheckObject.QuickTimeCheck.1","RealPlayer","RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)","RealVideo.RealVideo(tm) ActiveX Control (32-bit)","Scripting.Dictionary","SWCtl.SWCtl","Shell.UIHelper","ShockwaveFlash.ShockwaveFlash","Skype.Detection","TDCCtl.TDCCtl","WMPlayer.OCX","rmocx.RealPlayer G2 Control","rmocx.RealPlayer G2 Control.1"],(function(t){try{return new window.ActiveXObject(t),t}catch(t){return e.ERROR}})):t.push(e.NOT_AVAILABLE),navigator.plugins&&(t=t.concat(l(e))),t}(t)):e(l(t))}},{key:"canvas",getData:function(e,t){f()?e(function(e){var t=[],n=document.createElement("canvas");n.width=2e3,n.height=200,n.style.display="inline";var a=n.getContext("2d");return a.rect(0,0,10,10),a.rect(2,2,6,6),t.push("canvas winding:".concat(!1===a.isPointInPath(5,5,"evenodd")?"yes":"no")),a.textBaseline="alphabetic",a.fillStyle="#f60",a.fillRect(125,1,62,20),a.fillStyle="#069",e.dontUseFakeFontInCanvas?a.font="11pt Arial":a.font="11pt no-real-font-123",a.fillText("Cwm fjordbank glyphs vext quiz, 😃",2,15),a.fillStyle="rgba(102, 204, 0, 0.2)",a.font="18pt Arial",a.fillText("Cwm fjordbank glyphs vext quiz, 😃",4,45),a.globalCompositeOperation="multiply",a.fillStyle="rgb(255,0,255)",a.beginPath(),a.arc(50,50,50,0,2*Math.PI,!0),a.closePath(),a.fill(),a.fillStyle="rgb(0,255,255)",a.beginPath(),a.arc(100,50,50,0,2*Math.PI,!0),a.closePath(),a.fill(),a.fillStyle="rgb(255,255,0)",a.beginPath(),a.arc(75,100,50,0,2*Math.PI,!0),a.closePath(),a.fill(),a.fillStyle="rgb(255,0,255)",a.arc(75,75,75,0,2*Math.PI,!0),a.arc(75,75,25,0,2*Math.PI,!0),a.fill("evenodd"),n.toDataURL&&t.push("canvas fp:".concat(n.toDataURL())),t}(t)):e(t.NOT_AVAILABLE)}},{key:"webgl",getData:function(e,t){g()?e(function(){var e,t=function(t){return e.clearColor(0,0,0,1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),"[".concat(t[0],", ").concat(t[1],"]")};if(!(e=h()))return null;var n=[],a=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,a);var r=new Float32Array([-.2,-.9,0,.4,-.26,0,0,.732134444,0]);e.bufferData(e.ARRAY_BUFFER,r,e.STATIC_DRAW),a.itemSize=3,a.numItems=3;var o=e.createProgram(),i=e.createShader(e.VERTEX_SHADER);e.shaderSource(i,"attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"),e.compileShader(i);var c=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(c,"precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"),e.compileShader(c),e.attachShader(o,i),e.attachShader(o,c),e.linkProgram(o),e.useProgram(o),o.vertexPosAttrib=e.getAttribLocation(o,"attrVertex"),o.offsetUniform=e.getUniformLocation(o,"uniformOffset"),e.enableVertexAttribArray(o.vertexPosArray),e.vertexAttribPointer(o.vertexPosAttrib,a.itemSize,e.FLOAT,!1,0,0),e.uniform2f(o.offsetUniform,1,1),e.drawArrays(e.TRIANGLE_STRIP,0,a.numItems);try{n.push(e.canvas.toDataURL())}catch(t){}n.push("extensions:".concat((e.getSupportedExtensions()||[]).join(";"))),n.push("webgl aliased line width range:".concat(t(e.getParameter(e.ALIASED_LINE_WIDTH_RANGE)))),n.push("webgl aliased point size range:".concat(t(e.getParameter(e.ALIASED_POINT_SIZE_RANGE)))),n.push("webgl alpha bits:".concat(e.getParameter(e.ALPHA_BITS))),n.push("webgl antialiasing:".concat(e.getContextAttributes().antialias?"yes":"no")),n.push("webgl blue bits:".concat(e.getParameter(e.BLUE_BITS))),n.push("webgl depth bits:".concat(e.getParameter(e.DEPTH_BITS))),n.push("webgl green bits:".concat(e.getParameter(e.GREEN_BITS))),n.push("webgl max anisotropy:".concat(function(e){var t=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic");if(t){var n=e.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT);return 0===n&&(n=2),n}return null}(e))),n.push("webgl max combined texture image units:".concat(e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS))),n.push("webgl max cube map texture size:".concat(e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE))),n.push("webgl max fragment uniform vectors:".concat(e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS))),n.push("webgl max render buffer size:".concat(e.getParameter(e.MAX_RENDERBUFFER_SIZE))),n.push("webgl max texture image units:".concat(e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS))),n.push("webgl max texture size:".concat(e.getParameter(e.MAX_TEXTURE_SIZE))),n.push("webgl max varying vectors:".concat(e.getParameter(e.MAX_VARYING_VECTORS))),n.push("webgl max vertex attribs:".concat(e.getParameter(e.MAX_VERTEX_ATTRIBS))),n.push("webgl max vertex texture image units:".concat(e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS))),n.push("webgl max vertex uniform vectors:".concat(e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS))),n.push("webgl max viewport dims:".concat(t(e.getParameter(e.MAX_VIEWPORT_DIMS)))),n.push("webgl red bits:".concat(e.getParameter(e.RED_BITS))),n.push("webgl renderer:".concat(e.getParameter(e.RENDERER))),n.push("webgl shading language version:".concat(e.getParameter(e.SHADING_LANGUAGE_VERSION))),n.push("webgl stencil bits:".concat(e.getParameter(e.STENCIL_BITS))),n.push("webgl vendor:".concat(e.getParameter(e.VENDOR))),n.push("webgl version:".concat(e.getParameter(e.VERSION)));try{var u=e.getExtension("WEBGL_debug_renderer_info");u&&(n.push("webgl unmasked vendor:".concat(e.getParameter(u.UNMASKED_VENDOR_WEBGL))),n.push("webgl unmasked renderer:".concat(e.getParameter(u.UNMASKED_RENDERER_WEBGL))))}catch(t){}return e.getShaderPrecisionFormat&&s(["FLOAT","INT"],(function(t){s(["VERTEX","FRAGMENT"],(function(a){s(["HIGH","MEDIUM","LOW"],(function(r){s(["precision","rangeMin","rangeMax"],(function(o){var i=e.getShaderPrecisionFormat(e["".concat(a,"_SHADER")],e["".concat(r,"_").concat(t)])[o];"precision"!==o&&(o="precision ".concat(o));var c=["webgl ",a.toLowerCase()," shader ",r.toLowerCase()," ",t.toLowerCase()," ",o,":",i].join("");n.push(c)}))}))}))})),n}()):e(t.NOT_AVAILABLE)}},{key:"webglVendorAndRenderer",getData:function(e){g()?e(function(){try{var t=h(),n=t.getExtension("WEBGL_debug_renderer_info");return"".concat(t.getParameter(n.UNMASKED_VENDOR_WEBGL),"~").concat(t.getParameter(n.UNMASKED_RENDERER_WEBGL))}catch(e){return null}}()):e()}},{key:"adBlock",getData:function(e){e(function(){var e=document.createElement("div");e.innerHTML="&nbsp;";var t=!(e.className="adsbox");try{document.body.appendChild(e),t=0===document.getElementsByClassName("adsbox")[0].offsetHeight,document.body.removeChild(e)}catch(e){t=!1}return t}())}},{key:"hasLiedLanguages",getData:function(e){e(function(){if(void 0!==navigator.languages)try{if(navigator.languages[0].substr(0,2)!==navigator.language.substr(0,2))return!0}catch(e){return!0}return!1}())}},{key:"hasLiedResolution",getData:function(e){e(window.screen.width<window.screen.availWidth||window.screen.height<window.screen.availHeight)}},{key:"hasLiedOs",getData:function(e){e(function(){var e,t=navigator.userAgent.toLowerCase(),n=navigator.oscpu,a=navigator.platform.toLowerCase();if(e=t.indexOf("windows phone")>=0?"Windows Phone":t.indexOf("win")>=0?"Windows":t.indexOf("android")>=0?"Android":t.indexOf("linux")>=0||t.indexOf("cros")>=0?"Linux":t.indexOf("iphone")>=0||t.indexOf("ipad")>=0?"iOS":t.indexOf("mac")>=0?"Mac":"Other",("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)&&"Windows Phone"!==e&&"Android"!==e&&"iOS"!==e&&"Other"!==e)return!0;if(void 0!==n){if((n=n.toLowerCase()).indexOf("win")>=0&&"Windows"!==e&&"Windows Phone"!==e)return!0;if(n.indexOf("linux")>=0&&"Linux"!==e&&"Android"!==e)return!0;if(n.indexOf("mac")>=0&&"Mac"!==e&&"iOS"!==e)return!0;if((-1===n.indexOf("win")&&-1===n.indexOf("linux")&&-1===n.indexOf("mac"))!=("Other"===e))return!0}return a.indexOf("win")>=0&&"Windows"!==e&&"Windows Phone"!==e||(a.indexOf("linux")>=0||a.indexOf("android")>=0||a.indexOf("pike")>=0)&&"Linux"!==e&&"Android"!==e||(a.indexOf("mac")>=0||a.indexOf("ipad")>=0||a.indexOf("ipod")>=0||a.indexOf("iphone")>=0)&&"Mac"!==e&&"iOS"!==e||(a.indexOf("win")<0&&a.indexOf("linux")<0&&a.indexOf("mac")<0&&a.indexOf("iphone")<0&&a.indexOf("ipad")<0)!=("Other"===e)||void 0===navigator.plugins&&"Windows"!==e&&"Windows Phone"!==e}())}},{key:"hasLiedBrowser",getData:function(e){e(function(){var e,t,n=navigator.userAgent.toLowerCase(),a=navigator.productSub;if(("Chrome"==(e=n.indexOf("firefox")>=0?"Firefox":n.indexOf("opera")>=0||n.indexOf("opr")>=0?"Opera":n.indexOf("chrome")>=0?"Chrome":n.indexOf("safari")>=0?"Safari":n.indexOf("trident")>=0?"Internet Explorer":"Other")||"Safari"===e||"Opera"===e)&&"20030107"!==a)return!0;var r=eval.toString().length;if(37===r&&"Safari"!==e&&"Firefox"!==e&&"Other"!==e)return!0;if(39===r&&"Internet Explorer"!==e&&"Other"!==e)return!0;if(33===r&&"Chrome"!==e&&"Opera"!==e&&"Other"!==e)return!0;try{throw"a"}catch(e){try{e.toSource(),t=!0}catch(e){t=!1}}return t&&"Firefox"!==e&&"Other"!==e}())}},{key:"touchSupport",getData:function(e){e(function(){var e,t=0;void 0!==navigator.maxTouchPoints?t=navigator.maxTouchPoints:void 0!==navigator.msMaxTouchPoints&&(t=navigator.msMaxTouchPoints);try{document.createEvent("TouchEvent"),e=!0}catch(t){e=!1}return[t,e,"ontouchstart"in window]}())}},{key:"fonts",getData:function(e,t){var n=["monospace","sans-serif","serif"],a=["Andale Mono","Arial","Arial Black","Arial Hebrew","Arial MT","Arial Narrow","Arial Rounded MT Bold","Arial Unicode MS","Bitstream Vera Sans Mono","Book Antiqua","Bookman Old Style","Calibri","Cambria","Cambria Math","Century","Century Gothic","Century Schoolbook","Comic Sans","Comic Sans MS","Consolas","Courier","Courier New","Geneva","Georgia","Helvetica","Helvetica Neue","Impact","Lucida Bright","Lucida Calligraphy","Lucida Console","Lucida Fax","LUCIDA GRANDE","Lucida Handwriting","Lucida Sans","Lucida Sans Typewriter","Lucida Sans Unicode","Microsoft Sans Serif","Monaco","Monotype Corsiva","MS Gothic","MS Outlook","MS PGothic","MS Reference Sans Serif","MS Sans Serif","MS Serif","MYRIAD","MYRIAD PRO","Palatino","Palatino Linotype","Segoe Print","Segoe Script","Segoe UI","Segoe UI Light","Segoe UI Semibold","Segoe UI Symbol","Tahoma","Times","Times New Roman","Times New Roman PS","Trebuchet MS","Verdana","Wingdings","Wingdings 2","Wingdings 3"];t.fonts.extendedJsFonts&&(a=a.concat(["Abadi MT Condensed Light","Academy Engraved LET","ADOBE CASLON PRO","Adobe Garamond","ADOBE GARAMOND PRO","Agency FB","Aharoni","Albertus Extra Bold","Albertus Medium","Algerian","Amazone BT","American Typewriter","American Typewriter Condensed","AmerType Md BT","Andalus","Angsana New","AngsanaUPC","Antique Olive","Aparajita","Apple Chancery","Apple Color Emoji","Apple SD Gothic Neo","Arabic Typesetting","ARCHER","ARNO PRO","Arrus BT","Aurora Cn BT","AvantGarde Bk BT","AvantGarde Md BT","AVENIR","Ayuthaya","Bandy","Bangla Sangam MN","Bank Gothic","BankGothic Md BT","Baskerville","Baskerville Old Face","Batang","BatangChe","Bauer Bodoni","Bauhaus 93","Bazooka","Bell MT","Bembo","Benguiat Bk BT","Berlin Sans FB","Berlin Sans FB Demi","Bernard MT Condensed","BernhardFashion BT","BernhardMod BT","Big Caslon","BinnerD","Blackadder ITC","BlairMdITC TT","Bodoni 72","Bodoni 72 Oldstyle","Bodoni 72 Smallcaps","Bodoni MT","Bodoni MT Black","Bodoni MT Condensed","Bodoni MT Poster Compressed","Bookshelf Symbol 7","Boulder","Bradley Hand","Bradley Hand ITC","Bremen Bd BT","Britannic Bold","Broadway","Browallia New","BrowalliaUPC","Brush Script MT","Californian FB","Calisto MT","Calligrapher","Candara","CaslonOpnface BT","Castellar","Centaur","Cezanne","CG Omega","CG Times","Chalkboard","Chalkboard SE","Chalkduster","Charlesworth","Charter Bd BT","Charter BT","Chaucer","ChelthmITC Bk BT","Chiller","Clarendon","Clarendon Condensed","CloisterBlack BT","Cochin","Colonna MT","Constantia","Cooper Black","Copperplate","Copperplate Gothic","Copperplate Gothic Bold","Copperplate Gothic Light","CopperplGoth Bd BT","Corbel","Cordia New","CordiaUPC","Cornerstone","Coronet","Cuckoo","Curlz MT","DaunPenh","Dauphin","David","DB LCD Temp","DELICIOUS","Denmark","DFKai-SB","Didot","DilleniaUPC","DIN","DokChampa","Dotum","DotumChe","Ebrima","Edwardian Script ITC","Elephant","English 111 Vivace BT","Engravers MT","EngraversGothic BT","Eras Bold ITC","Eras Demi ITC","Eras Light ITC","Eras Medium ITC","EucrosiaUPC","Euphemia","Euphemia UCAS","EUROSTILE","Exotc350 Bd BT","FangSong","Felix Titling","Fixedsys","FONTIN","Footlight MT Light","Forte","FrankRuehl","Fransiscan","Freefrm721 Blk BT","FreesiaUPC","Freestyle Script","French Script MT","FrnkGothITC Bk BT","Fruitger","FRUTIGER","Futura","Futura Bk BT","Futura Lt BT","Futura Md BT","Futura ZBlk BT","FuturaBlack BT","Gabriola","Galliard BT","Gautami","Geeza Pro","Geometr231 BT","Geometr231 Hv BT","Geometr231 Lt BT","GeoSlab 703 Lt BT","GeoSlab 703 XBd BT","Gigi","Gill Sans","Gill Sans MT","Gill Sans MT Condensed","Gill Sans MT Ext Condensed Bold","Gill Sans Ultra Bold","Gill Sans Ultra Bold Condensed","Gisha","Gloucester MT Extra Condensed","GOTHAM","GOTHAM BOLD","Goudy Old Style","Goudy Stout","GoudyHandtooled BT","GoudyOLSt BT","Gujarati Sangam MN","Gulim","GulimChe","Gungsuh","GungsuhChe","Gurmukhi MN","Haettenschweiler","Harlow Solid Italic","Harrington","Heather","Heiti SC","Heiti TC","HELV","Herald","High Tower Text","Hiragino Kaku Gothic ProN","Hiragino Mincho ProN","Hoefler Text","Humanst 521 Cn BT","Humanst521 BT","Humanst521 Lt BT","Imprint MT Shadow","Incised901 Bd BT","Incised901 BT","Incised901 Lt BT","INCONSOLATA","Informal Roman","Informal011 BT","INTERSTATE","IrisUPC","Iskoola Pota","JasmineUPC","Jazz LET","Jenson","Jester","Jokerman","Juice ITC","Kabel Bk BT","Kabel Ult BT","Kailasa","KaiTi","Kalinga","Kannada Sangam MN","Kartika","Kaufmann Bd BT","Kaufmann BT","Khmer UI","KodchiangUPC","Kokila","Korinna BT","Kristen ITC","Krungthep","Kunstler Script","Lao UI","Latha","Leelawadee","Letter Gothic","Levenim MT","LilyUPC","Lithograph","Lithograph Light","Long Island","Lydian BT","Magneto","Maiandra GD","Malayalam Sangam MN","Malgun Gothic","Mangal","Marigold","Marion","Marker Felt","Market","Marlett","Matisse ITC","Matura MT Script Capitals","Meiryo","Meiryo UI","Microsoft Himalaya","Microsoft JhengHei","Microsoft New Tai Lue","Microsoft PhagsPa","Microsoft Tai Le","Microsoft Uighur","Microsoft YaHei","Microsoft Yi Baiti","MingLiU","MingLiU_HKSCS","MingLiU_HKSCS-ExtB","MingLiU-ExtB","Minion","Minion Pro","Miriam","Miriam Fixed","Mistral","Modern","Modern No. 20","Mona Lisa Solid ITC TT","Mongolian Baiti","MONO","MoolBoran","Mrs Eaves","MS LineDraw","MS Mincho","MS PMincho","MS Reference Specialty","MS UI Gothic","MT Extra","MUSEO","MV Boli","Nadeem","Narkisim","NEVIS","News Gothic","News GothicMT","NewsGoth BT","Niagara Engraved","Niagara Solid","Noteworthy","NSimSun","Nyala","OCR A Extended","Old Century","Old English Text MT","Onyx","Onyx BT","OPTIMA","Oriya Sangam MN","OSAKA","OzHandicraft BT","Palace Script MT","Papyrus","Parchment","Party LET","Pegasus","Perpetua","Perpetua Titling MT","PetitaBold","Pickwick","Plantagenet Cherokee","Playbill","PMingLiU","PMingLiU-ExtB","Poor Richard","Poster","PosterBodoni BT","PRINCETOWN LET","Pristina","PTBarnum BT","Pythagoras","Raavi","Rage Italic","Ravie","Ribbon131 Bd BT","Rockwell","Rockwell Condensed","Rockwell Extra Bold","Rod","Roman","Sakkal Majalla","Santa Fe LET","Savoye LET","Sceptre","Script","Script MT Bold","SCRIPTINA","Serifa","Serifa BT","Serifa Th BT","ShelleyVolante BT","Sherwood","Shonar Bangla","Showcard Gothic","Shruti","Signboard","SILKSCREEN","SimHei","Simplified Arabic","Simplified Arabic Fixed","SimSun","SimSun-ExtB","Sinhala Sangam MN","Sketch Rockwell","Skia","Small Fonts","Snap ITC","Snell Roundhand","Socket","Souvenir Lt BT","Staccato222 BT","Steamer","Stencil","Storybook","Styllo","Subway","Swis721 BlkEx BT","Swiss911 XCm BT","Sylfaen","Synchro LET","System","Tamil Sangam MN","Technical","Teletype","Telugu Sangam MN","Tempus Sans ITC","Terminal","Thonburi","Traditional Arabic","Trajan","TRAJAN PRO","Tristan","Tubular","Tunga","Tw Cen MT","Tw Cen MT Condensed","Tw Cen MT Condensed Extra Bold","TypoUpright BT","Unicorn","Univers","Univers CE 55 Medium","Univers Condensed","Utsaah","Vagabond","Vani","Vijaya","Viner Hand ITC","VisualUI","Vivaldi","Vladimir Script","Vrinda","Westminster","WHITNEY","Wide Latin","ZapfEllipt BT","ZapfHumnst BT","ZapfHumnst Dm BT","Zapfino","Zurich BlkEx BT","Zurich Ex BT","ZWAdobeF"])),a=(a=a.concat(t.fonts.userDefinedFonts)).filter((function(e,t){return a.indexOf(e)===t}));var r=document.getElementsByTagName("body")[0],o=document.createElement("div"),i=document.createElement("div"),c={},s={},u=function(){var e=document.createElement("span");return e.style.position="absolute",e.style.left="-9999px",e.style.fontSize="72px",e.style.fontStyle="normal",e.style.fontWeight="normal",e.style.letterSpacing="normal",e.style.lineBreak="auto",e.style.lineHeight="normal",e.style.textTransform="none",e.style.textAlign="left",e.style.textDecoration="none",e.style.textShadow="none",e.style.whiteSpace="normal",e.style.wordBreak="normal",e.style.wordSpacing="normal",e.innerHTML="mmmmmmmmmmlli",e},l=function(e){for(var t=!1,a=0;a<n.length;a++)if(t=e[a].offsetWidth!==c[n[a]]||e[a].offsetHeight!==s[n[a]])return t;return t},d=function(){for(var e=[],t=0,a=n.length;t<a;t++){var r=u();r.style.fontFamily=n[t],o.appendChild(r),e.push(r)}return e}();r.appendChild(o);for(var f=0,g=n.length;f<g;f++)c[n[f]]=d[f].offsetWidth,s[n[f]]=d[f].offsetHeight;var h=function(){for(var e,t,r,o={},c=0,s=a.length;c<s;c++){for(var l=[],d=0,f=n.length;d<f;d++){var g=(e=a[c],t=n[d],r=void 0,(r=u()).style.fontFamily="'".concat(e,"',").concat(t),r);i.appendChild(g),l.push(g)}o[a[c]]=l}return o}();r.appendChild(i);for(var p=[],m=0,v=a.length;m<v;m++)l(h[a[m]])&&p.push(a[m]);r.removeChild(i),r.removeChild(o),e(p)},pauseBefore:!0},{key:"fontsFlash",getData:function(e,t){return void 0!==window.swfobject?window.swfobject.hasFlashPlayerVersion("9.0.0")?t.fonts.swfPath?void function(e,t){var n,a="___fp_swf_loaded";window[a]=function(t){e(t)};var r=t.fonts.swfContainerId;(n=document.createElement("div")).setAttribute("id",(void 0).fonts.swfContainerId),document.body.appendChild(n);var o={onReady:a};window.swfobject.embedSWF(t.fonts.swfPath,r,"1","1","9.0.0",!1,o,{allowScriptAccess:"always",menu:"false"},{})}((function(t){e(t)}),t):e("missing options.fonts.swfPath"):e("flash not installed"):e("swf object not loaded")},pauseBefore:!0},{key:"audio",getData:function(e,t){var n=t.audio;if(n.excludeIOS11&&navigator.userAgent.match(/OS 11.+Version\/11.+Safari/))return e(t.EXCLUDED);var a=window.OfflineAudioContext||window.webkitOfflineAudioContext;if(null==a)return e(t.NOT_AVAILABLE);var r=new a(1,44100,44100),o=r.createOscillator();o.type="triangle",o.frequency.setValueAtTime(1e4,r.currentTime);var i=r.createDynamicsCompressor();s([["threshold",-50],["knee",40],["ratio",12],["reduction",-20],["attack",0],["release",.25]],(function(e){void 0!==i[e[0]]&&"function"==typeof i[e[0]].setValueAtTime&&i[e[0]].setValueAtTime(e[1],r.currentTime)})),o.connect(i),i.connect(r.destination),o.start(0),r.startRendering();var c=setTimeout((function(){return console.warn('Audio fingerprint timed out. Please report bug at https://github.com/Valve/fingerprintjs2 with your user agent: "'.concat(navigator.userAgent,'".')),r.oncomplete=function(){},r=null,e("audioTimeout")}),n.timeout);r.oncomplete=function(t){var n;try{clearTimeout(c),n=t.renderedBuffer.getChannelData(0).slice(4500,5e3).reduce((function(e,t){return e+Math.abs(t)}),0).toString(),o.disconnect(),i.disconnect()}catch(t){return void e(t)}e(n)}}},{key:"enumerateDevices",getData:function(e,t){if(!navigator.mediaDevices||!navigator.mediaDevices.enumerateDevices)return e(t.NOT_AVAILABLE);navigator.mediaDevices.enumerateDevices().then((function(t){e(t.map((function(e){return"id=".concat(e.deviceId,";gid=").concat(e.groupId,";").concat(e.kind,";").concat(e.label)})))})).catch((function(t){e(t)}))}}],m=function(e){throw new Error("'new Fingerprint()' is deprecated, see https://github.com/Valve/fingerprintjs2#upgrade-guide-from-182-to-200")};return m.get=function(e,t){t?e||(e={}):(t=e,e={}),function(e,t){var n,a;if(null!=t)for(a in t)null==(n=t[a])||Object.prototype.hasOwnProperty.call(e,a)||(e[a]=n)}(e,c),e.components=e.extraComponents.concat(p);var n={data:[],addPreprocessedComponent:function(t,a){"function"==typeof e.preprocessor&&(a=e.preprocessor(t,a)),n.data.push({key:t,value:a})}},a=-1;!function r(o){if((a+=1)>=e.components.length)t(n.data);else{var i=e.components[a];if(e.excludes[i.key])r(!1);else{if(!o&&i.pauseBefore)return a-=1,void setTimeout((function(){r(!0)}),1);try{i.getData((function(e){n.addPreprocessedComponent(i.key,e),r(!1)}),e)}catch(o){n.addPreprocessedComponent(i.key,String(o)),r(!1)}}}}(!1)},m.getPromise=function(e){return new Promise((function(t,n){m.get(e,t)}))},m.getV18=function(e,t){return null==t&&(t=e,e={}),m.get(e,(function(n){for(var a=[],r=0;r<n.length;r++){var o=n[r];if(o.value===(e.NOT_AVAILABLE||"not available"))a.push({key:o.key,value:"unknown"});else if("plugins"===o.key)a.push({key:"plugins",value:u(o.value,(function(e){var t=u(e[2],(function(e){return e.join?e.join("~"):e})).join(",");return[e[0],e[1],t].join("::")}))});else if(-1!==["canvas","webgl"].indexOf(o.key))a.push({key:o.key,value:o.value.join("~")});else if(-1!==["sessionStorage","localStorage","indexedDb","addBehavior","openDatabase"].indexOf(o.key)){if(!o.value)continue;a.push({key:o.key,value:1})}else o.value?a.push(o.value.join?{key:o.key,value:o.value.join(";")}:o):a.push({key:o.key,value:o.value})}var c=i(u(a,(function(e){return e.value})).join("~~~"),31);t(c,a)}))},m.x64hash128=i,m.VERSION="2.1.0",m}));var o,i,c,s,u=/ /g,l=function(e,t){var n=0;return a(e).forEach((function(e){e.nodeName.toLowerCase()===t.nodeName.toLowerCase()&&(n+=1)})),n},d=function(e){for(var t=1;e=e.previousElementSibling;)t+=1;return t},f=function(e){var t=function(e){for(var t=[];e&&e!==document;e=e.parentNode)t.push(e);return t}(e);t=t.splice(0,t.length-1);for(var n=[],a=0;a<t.length;a+=1){var r=t[a],o=r.nodeName.toLowerCase(),i="",c="";if(r.id&&(i="#".concat(r.id)),i){c=i,n.push(c);break}c=o;var s=r.parentNode;if(s){var f=s.children,g=l(f,r);if(f.length>1&&g>1){var h=r.className?".".concat(r.className.replace(u,".")):"";if(h)c+=h;else{var p=d(r);c+=":nth-child(".concat(p,")")}}}n.push(c)}return n.reverse().join(" > ")},g=function(e,t){return fetch("".concat("https://ship-prod-627ed08f489a970013572f5d.paralect.net","/").concat(e),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()}))},h=function(e,n,a){return g(n,t(t({},a),{},{projectId:e.projectId,visitorId:e.visitorId,sessionId:e.sessionId})).then((function(t){return t.sessionId&&(e.sessionId=t.sessionId),t}))},p=function(e,t){t.forEach((function(t){return t(e)}))},m=function(e,t){var n;return function(a){clearTimeout(n),n=setTimeout((function(){return e(a)}),t)}},v=function(e,t){var n=!1;return function(a){n||(e(a),n=!0,setTimeout((function(){n=!1}),t))}},w=function(e){return function(e,t){return-1!==e.indexOf(t)}(navigator.userAgent.toLocaleLowerCase(),e)},T=function(){return w("windows")},y=function(){return!T()&&w("iphone")},A=function(){return w("ipod")},S=function(){var e="MacIntel"===navigator.platform&&navigator.maxTouchPoints>1;return w("ipad")||e},C=function(){return!T()&&w("android")},E=function(){return w("blackberry")||w("bb10")},B=function(){return T()&&w("phone")},b=function(){return(w("(mobile")||w("(tablet"))&&w(" rv:")},O=function(){return w("meego")},x=function(){return C()&&w("mobile")||y()||A()||B()||E()&&!w("tablet")||b()&&w("mobile")||O()},M=function(){return S()||C()&&!w("mobile")||E()&&w("tablet")||T()&&w("touch")&&!B()||b()&&w("tablet")},I=function(){return M()||x()?M()?"tablet":x()?"mobile":"unknown":"desktop"},P=function(){return y()||A()||S()?"ios":C()?"android":E()?"blackberry":w("mac")?"macos":T()?"windows":w("linux")?"linux":b()?"fxos":O()?"meego":"unknown"},L=function(){return navigator.userAgent.indexOf("Edge")>-1&&navigator.appVersion.indexOf("Edge")>-1?"Edge":-1!==navigator.userAgent.indexOf("Opera")||-1!==navigator.userAgent.indexOf("OPR")?"Opera":-1!==navigator.userAgent.indexOf("Chrome")?"Chrome":-1!==navigator.userAgent.indexOf("Safari")?"Safari":-1!==navigator.userAgent.indexOf("Firefox")?"Firefox":-1!==navigator.userAgent.indexOf("MSIE")||!0==!!document.documentMode?"IE":"unknown"},D=function(){return navigator&&navigator.connection&&navigator.connection.type},k={data:[],latestSend:Date.now()},R=function(e){var t=window.location.href,n={type:"pathChange",timestamp:Date.now(),payload:{value:t}};h(e,"waveActions",n)},N=function(e,t){for(var n=e.cloneNode(!0),a=n.getElementsByTagName(t);a.length;)a[0].parentNode.removeChild(a[0]);return n},_=function(e){var t=document.getElementsByTagName("html")[0];if(t){a(t.querySelectorAll("input")).forEach((function(e){!e.getAttribute("value")&&e.value&&e.setAttribute("value",e.value)}));var n,r=(n=N(t,"script"),N(n,"iframe")).outerHTML,c=t.offsetWidth,s=t.offsetHeight;o!==c&&i!==s&&(h(e,"waveRecords",{timestamp:Date.now(),payload:{size:{width:c,height:s},screen:r}}),o=c,i=s)}},F=function(e){new(window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver)(m((function(){return _(e)}),500)).observe(document,{subtree:!0,childList:!0,attributes:!0}),_(e)},G=[function(e){return window.addEventListener("click",(function(t){var n,a={type:"click",timestamp:Date.now(),payload:{position:{x:t.clientX,y:t.clientY},selector:f(t.target),value:(n=t.target,"".concat(n.value||n.innerText||""))}};h(e,"waveActions",{type:"pageScroll",timestamp:Date.now(),payload:{offset:{x:window.pageXOffset,y:window.pageYOffset}}}),h(e,"waveActions",a)}),{capture:!0,passive:!0})},function(e){window.addEventListener("resize",m((function(){return h(e,"waveActions",{type:"resize",timestamp:Date.now(),payload:{size:{width:window.innerWidth,height:window.innerHeight}}})}),500))},function(e){window.addEventListener("scroll",v((function(){return h(e,"waveActions",{type:"pageScroll",timestamp:Date.now(),payload:{offset:{x:window.pageXOffset,y:window.pageYOffset}}})}),100))},function(e){window.addEventListener("mousemove",v((function(t){var n=Date.now(),a={x:t.clientX,y:t.clientY,timestamp:n};if(k.data.push(a),n-k.latestSend>3e3){var r={type:"mouseMove",payload:{batch:k.data}};k.data=[],k.latestSend=Date.now(),h(e,"waveActions",r)}}),100))},function(e){var t;return window.history.pushState=(t=window.history.pushState,function(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];var r=t.apply(this,n);return window.dispatchEvent(new Event("locationchange")),r}),window.history.replaceState=function(e){return function(){for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];var r=e.apply(this,n);return window.dispatchEvent(new Event("locationchange")),r}}(window.history.replaceState),window.addEventListener("popstate",(function(){window.dispatchEvent(new Event("locationchange"))})),window.addEventListener("hashchange",(function(){window.dispatchEvent(new Event("locationchange"))})),window.addEventListener("pageshow",(function(){window.dispatchEvent(new Event("locationchange"))})),window.addEventListener("locationchange",(function(){return R(e)}))}],U=function(){return new Promise((function(e,t){Fingerprint2.getV18((function(n){n||t(new Error("Identificator not created!")),e(n)}))}))},V=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:G;return function(){var a=t({},e);return U().then((function(e){return a.visitorId=e,fetch("https://api.ipify.org").then((function(e){return e.text()})).then((function(t){var n={os:P(),browserName:L(),deviceType:I(),connectionType:D(),ipAddress:t,referrerUrl:document.referrer},r=JSON.parse(localStorage.getItem("wave_session"));return r&&r.sessionId&&new Date-new Date(r.updatedOn)<6e4?{sessionId:r.sessionId}:g("waveSessions/init",{visitorId:e,domain:window.location.hostname,payload:n,projectId:a.projectId})}))})).then((function(e){var t=e.sessionId;if(t){var r=function(){localStorage.setItem("wave_session",JSON.stringify({sessionId:t,updatedOn:new Date}))};r(),window.WAVE_SESSION_ID=t,setInterval(r,1e4),a.sessionId=t,p(a,n),F(a),R(a)}})).then((function(){return{userData:a}}))}};return c=window.wave&&window.wave.params,s={visitorId:null,sessionId:null,projectId:c&&c.pid},void(window.requestIdleCallback?requestIdleCallback(V(s)):setTimeout(V(s),500))}));
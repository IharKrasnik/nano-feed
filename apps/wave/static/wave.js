(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.tracker = factory());
})(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  // Fingerprintjs2 - Copyright (c) 2019 Valentin Vasilyev (valentin.vasilyev@outlook.com)
  // Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.

  !function (e, t, a) {
    typeof window !== 'undefined' && typeof define === 'function' && define.amd ? define(a) : typeof module !== 'undefined' && module.exports ? module.exports = a() : t.exports ? t.exports = a() : t.Fingerprint2 = a();
  }(0, window, function () {
    var d = function d(e, t) {
      e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
      var a = [0, 0, 0, 0];
      return a[3] += e[3] + t[3], a[2] += a[3] >>> 16, a[3] &= 65535, a[2] += e[2] + t[2], a[1] += a[2] >>> 16, a[2] &= 65535, a[1] += e[1] + t[1], a[0] += a[1] >>> 16, a[1] &= 65535, a[0] += e[0] + t[0], a[0] &= 65535, [a[0] << 16 | a[1], a[2] << 16 | a[3]];
    };
    var g = function g(e, t) {
      e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
      var a = [0, 0, 0, 0];
      return a[3] += e[3] * t[3], a[2] += a[3] >>> 16, a[3] &= 65535, a[2] += e[2] * t[3], a[1] += a[2] >>> 16, a[2] &= 65535, a[2] += e[3] * t[2], a[1] += a[2] >>> 16, a[2] &= 65535, a[1] += e[1] * t[3], a[0] += a[1] >>> 16, a[1] &= 65535, a[1] += e[2] * t[2], a[0] += a[1] >>> 16, a[1] &= 65535, a[1] += e[3] * t[1], a[0] += a[1] >>> 16, a[1] &= 65535, a[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0], a[0] &= 65535, [a[0] << 16 | a[1], a[2] << 16 | a[3]];
    };
    var f = function f(e, t) {
      return (t %= 64) === 32 ? [e[1], e[0]] : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t | e[0] >>> 32 - t] : (t -= 32, [e[1] << t | e[0] >>> 32 - t, e[0] << t | e[1] >>> 32 - t]);
    };
    var h = function h(e, t) {
      return (t %= 64) === 0 ? e : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t] : [e[1] << t - 32, 0];
    };
    var m = function m(e, t) {
      return [e[0] ^ t[0], e[1] ^ t[1]];
    };
    var T = function T(e) {
      return e = m(e, [0, e[0] >>> 1]), e = g(e, [4283543511, 3981806797]), e = m(e, [0, e[0] >>> 1]), e = g(e, [3301882366, 444984403]), e = m(e, [0, e[0] >>> 1]);
    };
    var l = function l(e, t) {
      t = t || 0;
      for (var a = (e = e || '').length % 16, n = e.length - a, r = [0, t], i = [0, t], o = [0, 0], l = [0, 0], s = [2277735313, 289559509], c = [1291169091, 658871167], u = 0; u < n; u += 16) o = [255 & e.charCodeAt(u + 4) | (255 & e.charCodeAt(u + 5)) << 8 | (255 & e.charCodeAt(u + 6)) << 16 | (255 & e.charCodeAt(u + 7)) << 24, 255 & e.charCodeAt(u) | (255 & e.charCodeAt(u + 1)) << 8 | (255 & e.charCodeAt(u + 2)) << 16 | (255 & e.charCodeAt(u + 3)) << 24], l = [255 & e.charCodeAt(u + 12) | (255 & e.charCodeAt(u + 13)) << 8 | (255 & e.charCodeAt(u + 14)) << 16 | (255 & e.charCodeAt(u + 15)) << 24, 255 & e.charCodeAt(u + 8) | (255 & e.charCodeAt(u + 9)) << 8 | (255 & e.charCodeAt(u + 10)) << 16 | (255 & e.charCodeAt(u + 11)) << 24], o = g(o, s), o = f(o, 31), o = g(o, c), r = m(r, o), r = f(r, 27), r = d(r, i), r = d(g(r, [0, 5]), [0, 1390208809]), l = g(l, c), l = f(l, 33), l = g(l, s), i = m(i, l), i = f(i, 31), i = d(i, r), i = d(g(i, [0, 5]), [0, 944331445]);
      switch (o = [0, 0], l = [0, 0], a) {
        case 15:
          l = m(l, h([0, e.charCodeAt(u + 14)], 48));
        case 14:
          l = m(l, h([0, e.charCodeAt(u + 13)], 40));
        case 13:
          l = m(l, h([0, e.charCodeAt(u + 12)], 32));
        case 12:
          l = m(l, h([0, e.charCodeAt(u + 11)], 24));
        case 11:
          l = m(l, h([0, e.charCodeAt(u + 10)], 16));
        case 10:
          l = m(l, h([0, e.charCodeAt(u + 9)], 8));
        case 9:
          l = m(l, [0, e.charCodeAt(u + 8)]), l = g(l, c), l = f(l, 33), l = g(l, s), i = m(i, l);
        case 8:
          o = m(o, h([0, e.charCodeAt(u + 7)], 56));
        case 7:
          o = m(o, h([0, e.charCodeAt(u + 6)], 48));
        case 6:
          o = m(o, h([0, e.charCodeAt(u + 5)], 40));
        case 5:
          o = m(o, h([0, e.charCodeAt(u + 4)], 32));
        case 4:
          o = m(o, h([0, e.charCodeAt(u + 3)], 24));
        case 3:
          o = m(o, h([0, e.charCodeAt(u + 2)], 16));
        case 2:
          o = m(o, h([0, e.charCodeAt(u + 1)], 8));
        case 1:
          o = m(o, [0, e.charCodeAt(u)]), o = g(o, s), o = f(o, 31), o = g(o, c), r = m(r, o);
      }
      return r = m(r, [0, e.length]), i = m(i, [0, e.length]), r = d(r, i), i = d(i, r), r = T(r), i = T(i), r = d(r, i), i = d(i, r), "00000000".concat((r[0] >>> 0).toString(16)).slice(-8) + "00000000".concat((r[1] >>> 0).toString(16)).slice(-8) + "00000000".concat((i[0] >>> 0).toString(16)).slice(-8) + "00000000".concat((i[1] >>> 0).toString(16)).slice(-8);
    };
    var e = {
      preprocessor: null,
      audio: {
        timeout: 1e3,
        excludeIOS11: !0
      },
      fonts: {
        swfContainerId: 'fingerprintjs2',
        swfPath: 'flash/compiled/FontList.swf',
        userDefinedFonts: [],
        extendedJsFonts: !1
      },
      screen: {
        detectScreenOrientation: !0
      },
      plugins: {
        sortPluginsFor: [/palemoon/i],
        excludeIE: !1
      },
      extraComponents: [],
      excludes: {
        enumerateDevices: !0,
        pixelRatio: !0,
        doNotTrack: !0,
        fontsFlash: !0
      },
      NOT_AVAILABLE: 'not available',
      ERROR: 'error',
      EXCLUDED: 'excluded'
    };
    var c = function c(e, t) {
      if (Array.prototype.forEach && e.forEach === Array.prototype.forEach) e.forEach(t);else if (e.length === +e.length) for (var _a = 0, _n = e.length; _a < _n; _a++) t(e[_a], _a, e);else for (var _r in e) e.hasOwnProperty(_r) && t(e[_r], _r, e);
    };
    var s = function s(e, n) {
      var r = [];
      return e == null ? r : Array.prototype.map && e.map === Array.prototype.map ? e.map(n) : (c(e, function (e, t, a) {
        r.push(n(e, t, a));
      }), r);
    };
    var a = function a() {
      return navigator.mediaDevices && navigator.mediaDevices.enumerateDevices;
    };
    var n = function n(e) {
      var t = [window.screen.width, window.screen.height];
      return e.screen.detectScreenOrientation && t.sort().reverse(), t;
    };
    var r = function r(e) {
      if (window.screen.availWidth && window.screen.availHeight) {
        var _t = [window.screen.availHeight, window.screen.availWidth];
        return e.screen.detectScreenOrientation && _t.sort().reverse(), _t;
      }
      return e.NOT_AVAILABLE;
    };
    var i = function i(e) {
      if (navigator.plugins == null) return e.NOT_AVAILABLE;
      for (var t = [], a = 0, n = navigator.plugins.length; a < n; a++) navigator.plugins[a] && t.push(navigator.plugins[a]);
      return u(e) && (t = t.sort(function (e, t) {
        return e.name > t.name ? 1 : e.name < t.name ? -1 : 0;
      })), s(t, function (e) {
        var t = s(e, function (e) {
          return [e.type, e.suffixes];
        });
        return [e.name, e.description, t];
      });
    };
    var o = function o(t) {
      var e = [];
      if (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, 'ActiveXObject') || 'ActiveXObject' in window) {
        e = s(['AcroPDF.PDF', 'Adodb.Stream', 'AgControl.AgControl', 'DevalVRXCtrl.DevalVRXCtrl.1', 'MacromediaFlashPaper.MacromediaFlashPaper', 'Msxml2.DOMDocument', 'Msxml2.XMLHTTP', 'PDF.PdfCtrl', 'QuickTime.QuickTime', 'QuickTimeCheckObject.QuickTimeCheck.1', 'RealPlayer', 'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)', 'RealVideo.RealVideo(tm) ActiveX Control (32-bit)', 'Scripting.Dictionary', 'SWCtl.SWCtl', 'Shell.UIHelper', 'ShockwaveFlash.ShockwaveFlash', 'Skype.Detection', 'TDCCtl.TDCCtl', 'WMPlayer.OCX', 'rmocx.RealPlayer G2 Control', 'rmocx.RealPlayer G2 Control.1'], function (e) {
          try {
            return new window.ActiveXObject(e), e;
          } catch (e) {
            return t.ERROR;
          }
        });
      } else e.push(t.NOT_AVAILABLE);
      return navigator.plugins && (e = e.concat(i(t))), e;
    };
    var u = function u(e) {
      for (var t = !1, a = 0, n = e.plugins.sortPluginsFor.length; a < n; a++) {
        var _r2 = e.plugins.sortPluginsFor[a];
        if (navigator.userAgent.match(_r2)) {
          t = !0;
          break;
        }
      }
      return t;
    };
    var p = function p(t) {
      try {
        return !!window.sessionStorage;
      } catch (e) {
        return t.ERROR;
      }
    };
    var v = function v(t) {
      try {
        return !!window.localStorage;
      } catch (e) {
        return t.ERROR;
      }
    };
    var A = function A(t) {
      try {
        return !!window.indexedDB;
      } catch (e) {
        return t.ERROR;
      }
    };
    var S = function S(e) {
      return navigator.hardwareConcurrency ? navigator.hardwareConcurrency : e.NOT_AVAILABLE;
    };
    var C = function C(e) {
      return navigator.cpuClass || e.NOT_AVAILABLE;
    };
    var B = function B(e) {
      return navigator.platform ? navigator.platform : e.NOT_AVAILABLE;
    };
    var w = function w(e) {
      return navigator.doNotTrack ? navigator.doNotTrack : navigator.msDoNotTrack ? navigator.msDoNotTrack : window.doNotTrack ? window.doNotTrack : e.NOT_AVAILABLE;
    };
    var t = function t() {
      var t;
      var e = 0;
      void 0 !== navigator.maxTouchPoints ? e = navigator.maxTouchPoints : void 0 !== navigator.msMaxTouchPoints && (e = navigator.msMaxTouchPoints);
      try {
        document.createEvent('TouchEvent'), t = !0;
      } catch (e) {
        t = !1;
      }
      return [e, t, 'ontouchstart' in window];
    };
    var y = function y(e) {
      var t = [];
      var a = document.createElement('canvas');
      a.width = 2e3, a.height = 200, a.style.display = 'inline';
      var n = a.getContext('2d');
      return n.rect(0, 0, 10, 10), n.rect(2, 2, 6, 6), t.push("canvas winding:".concat(!1 === n.isPointInPath(5, 5, 'evenodd') ? 'yes' : 'no')), n.textBaseline = 'alphabetic', n.fillStyle = '#f60', n.fillRect(125, 1, 62, 20), n.fillStyle = '#069', e.dontUseFakeFontInCanvas ? n.font = '11pt Arial' : n.font = '11pt no-real-font-123', n.fillText("Cwm fjordbank glyphs vext quiz, \uD83D\uDE03", 2, 15), n.fillStyle = 'rgba(102, 204, 0, 0.2)', n.font = '18pt Arial', n.fillText("Cwm fjordbank glyphs vext quiz, \uD83D\uDE03", 4, 45), n.globalCompositeOperation = 'multiply', n.fillStyle = 'rgb(255,0,255)', n.beginPath(), n.arc(50, 50, 50, 0, 2 * Math.PI, !0), n.closePath(), n.fill(), n.fillStyle = 'rgb(0,255,255)', n.beginPath(), n.arc(100, 50, 50, 0, 2 * Math.PI, !0), n.closePath(), n.fill(), n.fillStyle = 'rgb(255,255,0)', n.beginPath(), n.arc(75, 100, 50, 0, 2 * Math.PI, !0), n.closePath(), n.fill(), n.fillStyle = 'rgb(255,0,255)', n.arc(75, 75, 75, 0, 2 * Math.PI, !0), n.arc(75, 75, 25, 0, 2 * Math.PI, !0), n.fill('evenodd'), a.toDataURL && t.push("canvas fp:".concat(a.toDataURL())), t;
    };
    var E = function E() {
      var o;
      var e = function e(_e) {
        return o.clearColor(0, 0, 0, 1), o.enable(o.DEPTH_TEST), o.depthFunc(o.LEQUAL), o.clear(o.COLOR_BUFFER_BIT | o.DEPTH_BUFFER_BIT), "[".concat(_e[0], ", ").concat(_e[1], "]");
      };
      if (!(o = F())) return null;
      var l = [];
      var t = o.createBuffer();
      o.bindBuffer(o.ARRAY_BUFFER, t);
      var a = new Float32Array([-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0]);
      o.bufferData(o.ARRAY_BUFFER, a, o.STATIC_DRAW), t.itemSize = 3, t.numItems = 3;
      var n = o.createProgram();
      var r = o.createShader(o.VERTEX_SHADER);
      o.shaderSource(r, 'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}'), o.compileShader(r);
      var i = o.createShader(o.FRAGMENT_SHADER);
      o.shaderSource(i, 'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}'), o.compileShader(i), o.attachShader(n, r), o.attachShader(n, i), o.linkProgram(n), o.useProgram(n), n.vertexPosAttrib = o.getAttribLocation(n, 'attrVertex'), n.offsetUniform = o.getUniformLocation(n, 'uniformOffset'), o.enableVertexAttribArray(n.vertexPosArray), o.vertexAttribPointer(n.vertexPosAttrib, t.itemSize, o.FLOAT, !1, 0, 0), o.uniform2f(n.offsetUniform, 1, 1), o.drawArrays(o.TRIANGLE_STRIP, 0, t.numItems);
      try {
        l.push(o.canvas.toDataURL());
      } catch (e) {}
      l.push("extensions:".concat((o.getSupportedExtensions() || []).join(';'))), l.push("webgl aliased line width range:".concat(e(o.getParameter(o.ALIASED_LINE_WIDTH_RANGE)))), l.push("webgl aliased point size range:".concat(e(o.getParameter(o.ALIASED_POINT_SIZE_RANGE)))), l.push("webgl alpha bits:".concat(o.getParameter(o.ALPHA_BITS))), l.push("webgl antialiasing:".concat(o.getContextAttributes().antialias ? 'yes' : 'no')), l.push("webgl blue bits:".concat(o.getParameter(o.BLUE_BITS))), l.push("webgl depth bits:".concat(o.getParameter(o.DEPTH_BITS))), l.push("webgl green bits:".concat(o.getParameter(o.GREEN_BITS))), l.push("webgl max anisotropy:".concat(function (e) {
        var t = e.getExtension('EXT_texture_filter_anisotropic') || e.getExtension('WEBKIT_EXT_texture_filter_anisotropic') || e.getExtension('MOZ_EXT_texture_filter_anisotropic');
        if (t) {
          var _a2 = e.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
          return _a2 === 0 && (_a2 = 2), _a2;
        }
        return null;
      }(o))), l.push("webgl max combined texture image units:".concat(o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS))), l.push("webgl max cube map texture size:".concat(o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE))), l.push("webgl max fragment uniform vectors:".concat(o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS))), l.push("webgl max render buffer size:".concat(o.getParameter(o.MAX_RENDERBUFFER_SIZE))), l.push("webgl max texture image units:".concat(o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS))), l.push("webgl max texture size:".concat(o.getParameter(o.MAX_TEXTURE_SIZE))), l.push("webgl max varying vectors:".concat(o.getParameter(o.MAX_VARYING_VECTORS))), l.push("webgl max vertex attribs:".concat(o.getParameter(o.MAX_VERTEX_ATTRIBS))), l.push("webgl max vertex texture image units:".concat(o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS))), l.push("webgl max vertex uniform vectors:".concat(o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS))), l.push("webgl max viewport dims:".concat(e(o.getParameter(o.MAX_VIEWPORT_DIMS)))), l.push("webgl red bits:".concat(o.getParameter(o.RED_BITS))), l.push("webgl renderer:".concat(o.getParameter(o.RENDERER))), l.push("webgl shading language version:".concat(o.getParameter(o.SHADING_LANGUAGE_VERSION))), l.push("webgl stencil bits:".concat(o.getParameter(o.STENCIL_BITS))), l.push("webgl vendor:".concat(o.getParameter(o.VENDOR))), l.push("webgl version:".concat(o.getParameter(o.VERSION)));
      try {
        var _s = o.getExtension('WEBGL_debug_renderer_info');
        _s && (l.push("webgl unmasked vendor:".concat(o.getParameter(_s.UNMASKED_VENDOR_WEBGL))), l.push("webgl unmasked renderer:".concat(o.getParameter(_s.UNMASKED_RENDERER_WEBGL))));
      } catch (e) {}
      return o.getShaderPrecisionFormat && c(['FLOAT', 'INT'], function (i) {
        c(['VERTEX', 'FRAGMENT'], function (r) {
          c(['HIGH', 'MEDIUM', 'LOW'], function (n) {
            c(['precision', 'rangeMin', 'rangeMax'], function (e) {
              var t = o.getShaderPrecisionFormat(o["".concat(r, "_SHADER")], o["".concat(n, "_").concat(i)])[e];
              e !== 'precision' && (e = "precision ".concat(e));
              var a = ['webgl ', r.toLowerCase(), ' shader ', n.toLowerCase(), ' ', i.toLowerCase(), ' ', e, ':', t].join('');
              l.push(a);
            });
          });
        });
      }), l;
    };
    var M = function M() {
      try {
        var _e2 = F();
        var _t2 = _e2.getExtension('WEBGL_debug_renderer_info');
        return "".concat(_e2.getParameter(_t2.UNMASKED_VENDOR_WEBGL), "~").concat(_e2.getParameter(_t2.UNMASKED_RENDERER_WEBGL));
      } catch (e) {
        return null;
      }
    };
    var x = function x() {
      var e = document.createElement('div');
      e.innerHTML = '&nbsp;';
      var t = !(e.className = 'adsbox');
      try {
        document.body.appendChild(e), t = document.getElementsByClassName('adsbox')[0].offsetHeight === 0, document.body.removeChild(e);
      } catch (e) {
        t = !1;
      }
      return t;
    };
    var O = function O() {
      if (void 0 !== navigator.languages) try {
        if (navigator.languages[0].substr(0, 2) !== navigator.language.substr(0, 2)) return !0;
      } catch (e) {
        return !0;
      }
      return !1;
    };
    var b = function b() {
      return window.screen.width < window.screen.availWidth || window.screen.height < window.screen.availHeight;
    };
    var P = function P() {
      var e;
      var t = navigator.userAgent.toLowerCase();
      var a = navigator.oscpu;
      var n = navigator.platform.toLowerCase();
      if (e = t.indexOf('windows phone') >= 0 ? 'Windows Phone' : t.indexOf('win') >= 0 ? 'Windows' : t.indexOf('android') >= 0 ? 'Android' : t.indexOf('linux') >= 0 || t.indexOf('cros') >= 0 ? 'Linux' : t.indexOf('iphone') >= 0 || t.indexOf('ipad') >= 0 ? 'iOS' : t.indexOf('mac') >= 0 ? 'Mac' : 'Other', ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) && e !== 'Windows Phone' && e !== 'Android' && e !== 'iOS' && e !== 'Other') return !0;
      if (void 0 !== a) {
        if ((a = a.toLowerCase()).indexOf('win') >= 0 && e !== 'Windows' && e !== 'Windows Phone') return !0;
        if (a.indexOf('linux') >= 0 && e !== 'Linux' && e !== 'Android') return !0;
        if (a.indexOf('mac') >= 0 && e !== 'Mac' && e !== 'iOS') return !0;
        if ((a.indexOf('win') === -1 && a.indexOf('linux') === -1 && a.indexOf('mac') === -1) != (e === 'Other')) return !0;
      }
      return n.indexOf('win') >= 0 && e !== 'Windows' && e !== 'Windows Phone' || (n.indexOf('linux') >= 0 || n.indexOf('android') >= 0 || n.indexOf('pike') >= 0) && e !== 'Linux' && e !== 'Android' || (n.indexOf('mac') >= 0 || n.indexOf('ipad') >= 0 || n.indexOf('ipod') >= 0 || n.indexOf('iphone') >= 0) && e !== 'Mac' && e !== 'iOS' || (n.indexOf('win') < 0 && n.indexOf('linux') < 0 && n.indexOf('mac') < 0 && n.indexOf('iphone') < 0 && n.indexOf('ipad') < 0) !== (e === 'Other') || void 0 === navigator.plugins && e !== 'Windows' && e !== 'Windows Phone';
    };
    var L = function L() {
      var e;
      var t = navigator.userAgent.toLowerCase();
      var a = navigator.productSub;
      if (((e = t.indexOf('firefox') >= 0 ? 'Firefox' : t.indexOf('opera') >= 0 || t.indexOf('opr') >= 0 ? 'Opera' : t.indexOf('chrome') >= 0 ? 'Chrome' : t.indexOf('safari') >= 0 ? 'Safari' : t.indexOf('trident') >= 0 ? 'Internet Explorer' : 'Other') === 'Chrome' || e === 'Safari' || e === 'Opera') && a !== '20030107') return !0;
      var n;
      var r = eval.toString().length;
      if (r === 37 && e !== 'Safari' && e !== 'Firefox' && e !== 'Other') return !0;
      if (r === 39 && e !== 'Internet Explorer' && e !== 'Other') return !0;
      if (r === 33 && e !== 'Chrome' && e !== 'Opera' && e !== 'Other') return !0;
      try {
        throw 'a';
      } catch (e) {
        try {
          e.toSource(), n = !0;
        } catch (e) {
          n = !1;
        }
      }
      return n && e !== 'Firefox' && e !== 'Other';
    };
    var I = function I() {
      var e = document.createElement('canvas');
      return !(!e.getContext || !e.getContext('2d'));
    };
    var k = function k() {
      if (!I()) return !1;
      var e = F();
      return !!window.WebGLRenderingContext && !!e;
    };
    var R = function R() {
      return navigator.appName === 'Microsoft Internet Explorer' || !(navigator.appName !== 'Netscape' || !/Trident/.test(navigator.userAgent));
    };
    var D = function D() {
      return void 0 !== window.swfobject;
    };
    var N = function N() {
      return window.swfobject.hasFlashPlayerVersion('9.0.0');
    };
    var _ = function _(t, e) {
      var a = '___fp_swf_loaded';
      window[a] = function (e) {
        t(e);
      };
      var n;
      var r;
      var i = e.fonts.swfContainerId;
      (r = document.createElement('div')).setAttribute('id', n.fonts.swfContainerId), document.body.appendChild(r);
      var o = {
        onReady: a
      };
      window.swfobject.embedSWF(e.fonts.swfPath, i, '1', '1', '9.0.0', !1, o, {
        allowScriptAccess: 'always',
        menu: 'false'
      }, {});
    };
    var F = function F() {
      var e = document.createElement('canvas');
      var t = null;
      try {
        t = e.getContext('webgl') || e.getContext('experimental-webgl');
      } catch (e) {}
      return t || (t = null), t;
    };
    var G = [{
      key: 'userAgent',
      getData: function getData(e) {
        e(navigator.userAgent);
      }
    }, {
      key: 'webdriver',
      getData: function getData(e, t) {
        e(navigator.webdriver == null ? t.NOT_AVAILABLE : navigator.webdriver);
      }
    }, {
      key: 'language',
      getData: function getData(e, t) {
        e(navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || t.NOT_AVAILABLE);
      }
    }, {
      key: 'colorDepth',
      getData: function getData(e, t) {
        e(window.screen.colorDepth || t.NOT_AVAILABLE);
      }
    }, {
      key: 'deviceMemory',
      getData: function getData(e, t) {
        e(navigator.deviceMemory || t.NOT_AVAILABLE);
      }
    }, {
      key: 'pixelRatio',
      getData: function getData(e, t) {
        e(window.devicePixelRatio || t.NOT_AVAILABLE);
      }
    }, {
      key: 'hardwareConcurrency',
      getData: function getData(e, t) {
        e(S(t));
      }
    }, {
      key: 'screenResolution',
      getData: function getData(e, t) {
        e(n(t));
      }
    }, {
      key: 'availableScreenResolution',
      getData: function getData(e, t) {
        e(r(t));
      }
    }, {
      key: 'timezoneOffset',
      getData: function getData(e) {
        e(new Date().getTimezoneOffset());
      }
    }, {
      key: 'timezone',
      getData: function getData(e, t) {
        window.Intl && window.Intl.DateTimeFormat ? e(new window.Intl.DateTimeFormat().resolvedOptions().timeZone) : e(t.NOT_AVAILABLE);
      }
    }, {
      key: 'sessionStorage',
      getData: function getData(e, t) {
        e(p(t));
      }
    }, {
      key: 'localStorage',
      getData: function getData(e, t) {
        e(v(t));
      }
    }, {
      key: 'indexedDb',
      getData: function getData(e, t) {
        e(A(t));
      }
    }, {
      key: 'addBehavior',
      getData: function getData(e) {
        e(!(!document.body || !document.body.addBehavior));
      }
    }, {
      key: 'openDatabase',
      getData: function getData(e) {
        e(!!window.openDatabase);
      }
    }, {
      key: 'cpuClass',
      getData: function getData(e, t) {
        e(C(t));
      }
    }, {
      key: 'platform',
      getData: function getData(e, t) {
        e(B(t));
      }
    }, {
      key: 'doNotTrack',
      getData: function getData(e, t) {
        e(w(t));
      }
    }, {
      key: 'plugins',
      getData: function getData(e, t) {
        R() ? t.plugins.excludeIE ? e(t.EXCLUDED) : e(o(t)) : e(i(t));
      }
    }, {
      key: 'canvas',
      getData: function getData(e, t) {
        I() ? e(y(t)) : e(t.NOT_AVAILABLE);
      }
    }, {
      key: 'webgl',
      getData: function getData(e, t) {
        k() ? e(E()) : e(t.NOT_AVAILABLE);
      }
    }, {
      key: 'webglVendorAndRenderer',
      getData: function getData(e) {
        k() ? e(M()) : e();
      }
    }, {
      key: 'adBlock',
      getData: function getData(e) {
        e(x());
      }
    }, {
      key: 'hasLiedLanguages',
      getData: function getData(e) {
        e(O());
      }
    }, {
      key: 'hasLiedResolution',
      getData: function getData(e) {
        e(b());
      }
    }, {
      key: 'hasLiedOs',
      getData: function getData(e) {
        e(P());
      }
    }, {
      key: 'hasLiedBrowser',
      getData: function getData(e) {
        e(L());
      }
    }, {
      key: 'touchSupport',
      getData: function getData(e) {
        e(t());
      }
    }, {
      key: 'fonts',
      getData: function getData(e, t) {
        var u = ['monospace', 'sans-serif', 'serif'];
        var d = ['Andale Mono', 'Arial', 'Arial Black', 'Arial Hebrew', 'Arial MT', 'Arial Narrow', 'Arial Rounded MT Bold', 'Arial Unicode MS', 'Bitstream Vera Sans Mono', 'Book Antiqua', 'Bookman Old Style', 'Calibri', 'Cambria', 'Cambria Math', 'Century', 'Century Gothic', 'Century Schoolbook', 'Comic Sans', 'Comic Sans MS', 'Consolas', 'Courier', 'Courier New', 'Geneva', 'Georgia', 'Helvetica', 'Helvetica Neue', 'Impact', 'Lucida Bright', 'Lucida Calligraphy', 'Lucida Console', 'Lucida Fax', 'LUCIDA GRANDE', 'Lucida Handwriting', 'Lucida Sans', 'Lucida Sans Typewriter', 'Lucida Sans Unicode', 'Microsoft Sans Serif', 'Monaco', 'Monotype Corsiva', 'MS Gothic', 'MS Outlook', 'MS PGothic', 'MS Reference Sans Serif', 'MS Sans Serif', 'MS Serif', 'MYRIAD', 'MYRIAD PRO', 'Palatino', 'Palatino Linotype', 'Segoe Print', 'Segoe Script', 'Segoe UI', 'Segoe UI Light', 'Segoe UI Semibold', 'Segoe UI Symbol', 'Tahoma', 'Times', 'Times New Roman', 'Times New Roman PS', 'Trebuchet MS', 'Verdana', 'Wingdings', 'Wingdings 2', 'Wingdings 3'];
        t.fonts.extendedJsFonts && (d = d.concat(['Abadi MT Condensed Light', 'Academy Engraved LET', 'ADOBE CASLON PRO', 'Adobe Garamond', 'ADOBE GARAMOND PRO', 'Agency FB', 'Aharoni', 'Albertus Extra Bold', 'Albertus Medium', 'Algerian', 'Amazone BT', 'American Typewriter', 'American Typewriter Condensed', 'AmerType Md BT', 'Andalus', 'Angsana New', 'AngsanaUPC', 'Antique Olive', 'Aparajita', 'Apple Chancery', 'Apple Color Emoji', 'Apple SD Gothic Neo', 'Arabic Typesetting', 'ARCHER', 'ARNO PRO', 'Arrus BT', 'Aurora Cn BT', 'AvantGarde Bk BT', 'AvantGarde Md BT', 'AVENIR', 'Ayuthaya', 'Bandy', 'Bangla Sangam MN', 'Bank Gothic', 'BankGothic Md BT', 'Baskerville', 'Baskerville Old Face', 'Batang', 'BatangChe', 'Bauer Bodoni', 'Bauhaus 93', 'Bazooka', 'Bell MT', 'Bembo', 'Benguiat Bk BT', 'Berlin Sans FB', 'Berlin Sans FB Demi', 'Bernard MT Condensed', 'BernhardFashion BT', 'BernhardMod BT', 'Big Caslon', 'BinnerD', 'Blackadder ITC', 'BlairMdITC TT', 'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni 72 Smallcaps', 'Bodoni MT', 'Bodoni MT Black', 'Bodoni MT Condensed', 'Bodoni MT Poster Compressed', 'Bookshelf Symbol 7', 'Boulder', 'Bradley Hand', 'Bradley Hand ITC', 'Bremen Bd BT', 'Britannic Bold', 'Broadway', 'Browallia New', 'BrowalliaUPC', 'Brush Script MT', 'Californian FB', 'Calisto MT', 'Calligrapher', 'Candara', 'CaslonOpnface BT', 'Castellar', 'Centaur', 'Cezanne', 'CG Omega', 'CG Times', 'Chalkboard', 'Chalkboard SE', 'Chalkduster', 'Charlesworth', 'Charter Bd BT', 'Charter BT', 'Chaucer', 'ChelthmITC Bk BT', 'Chiller', 'Clarendon', 'Clarendon Condensed', 'CloisterBlack BT', 'Cochin', 'Colonna MT', 'Constantia', 'Cooper Black', 'Copperplate', 'Copperplate Gothic', 'Copperplate Gothic Bold', 'Copperplate Gothic Light', 'CopperplGoth Bd BT', 'Corbel', 'Cordia New', 'CordiaUPC', 'Cornerstone', 'Coronet', 'Cuckoo', 'Curlz MT', 'DaunPenh', 'Dauphin', 'David', 'DB LCD Temp', 'DELICIOUS', 'Denmark', 'DFKai-SB', 'Didot', 'DilleniaUPC', 'DIN', 'DokChampa', 'Dotum', 'DotumChe', 'Ebrima', 'Edwardian Script ITC', 'Elephant', 'English 111 Vivace BT', 'Engravers MT', 'EngraversGothic BT', 'Eras Bold ITC', 'Eras Demi ITC', 'Eras Light ITC', 'Eras Medium ITC', 'EucrosiaUPC', 'Euphemia', 'Euphemia UCAS', 'EUROSTILE', 'Exotc350 Bd BT', 'FangSong', 'Felix Titling', 'Fixedsys', 'FONTIN', 'Footlight MT Light', 'Forte', 'FrankRuehl', 'Fransiscan', 'Freefrm721 Blk BT', 'FreesiaUPC', 'Freestyle Script', 'French Script MT', 'FrnkGothITC Bk BT', 'Fruitger', 'FRUTIGER', 'Futura', 'Futura Bk BT', 'Futura Lt BT', 'Futura Md BT', 'Futura ZBlk BT', 'FuturaBlack BT', 'Gabriola', 'Galliard BT', 'Gautami', 'Geeza Pro', 'Geometr231 BT', 'Geometr231 Hv BT', 'Geometr231 Lt BT', 'GeoSlab 703 Lt BT', 'GeoSlab 703 XBd BT', 'Gigi', 'Gill Sans', 'Gill Sans MT', 'Gill Sans MT Condensed', 'Gill Sans MT Ext Condensed Bold', 'Gill Sans Ultra Bold', 'Gill Sans Ultra Bold Condensed', 'Gisha', 'Gloucester MT Extra Condensed', 'GOTHAM', 'GOTHAM BOLD', 'Goudy Old Style', 'Goudy Stout', 'GoudyHandtooled BT', 'GoudyOLSt BT', 'Gujarati Sangam MN', 'Gulim', 'GulimChe', 'Gungsuh', 'GungsuhChe', 'Gurmukhi MN', 'Haettenschweiler', 'Harlow Solid Italic', 'Harrington', 'Heather', 'Heiti SC', 'Heiti TC', 'HELV', 'Herald', 'High Tower Text', 'Hiragino Kaku Gothic ProN', 'Hiragino Mincho ProN', 'Hoefler Text', 'Humanst 521 Cn BT', 'Humanst521 BT', 'Humanst521 Lt BT', 'Imprint MT Shadow', 'Incised901 Bd BT', 'Incised901 BT', 'Incised901 Lt BT', 'INCONSOLATA', 'Informal Roman', 'Informal011 BT', 'INTERSTATE', 'IrisUPC', 'Iskoola Pota', 'JasmineUPC', 'Jazz LET', 'Jenson', 'Jester', 'Jokerman', 'Juice ITC', 'Kabel Bk BT', 'Kabel Ult BT', 'Kailasa', 'KaiTi', 'Kalinga', 'Kannada Sangam MN', 'Kartika', 'Kaufmann Bd BT', 'Kaufmann BT', 'Khmer UI', 'KodchiangUPC', 'Kokila', 'Korinna BT', 'Kristen ITC', 'Krungthep', 'Kunstler Script', 'Lao UI', 'Latha', 'Leelawadee', 'Letter Gothic', 'Levenim MT', 'LilyUPC', 'Lithograph', 'Lithograph Light', 'Long Island', 'Lydian BT', 'Magneto', 'Maiandra GD', 'Malayalam Sangam MN', 'Malgun Gothic', 'Mangal', 'Marigold', 'Marion', 'Marker Felt', 'Market', 'Marlett', 'Matisse ITC', 'Matura MT Script Capitals', 'Meiryo', 'Meiryo UI', 'Microsoft Himalaya', 'Microsoft JhengHei', 'Microsoft New Tai Lue', 'Microsoft PhagsPa', 'Microsoft Tai Le', 'Microsoft Uighur', 'Microsoft YaHei', 'Microsoft Yi Baiti', 'MingLiU', 'MingLiU_HKSCS', 'MingLiU_HKSCS-ExtB', 'MingLiU-ExtB', 'Minion', 'Minion Pro', 'Miriam', 'Miriam Fixed', 'Mistral', 'Modern', 'Modern No. 20', 'Mona Lisa Solid ITC TT', 'Mongolian Baiti', 'MONO', 'MoolBoran', 'Mrs Eaves', 'MS LineDraw', 'MS Mincho', 'MS PMincho', 'MS Reference Specialty', 'MS UI Gothic', 'MT Extra', 'MUSEO', 'MV Boli', 'Nadeem', 'Narkisim', 'NEVIS', 'News Gothic', 'News GothicMT', 'NewsGoth BT', 'Niagara Engraved', 'Niagara Solid', 'Noteworthy', 'NSimSun', 'Nyala', 'OCR A Extended', 'Old Century', 'Old English Text MT', 'Onyx', 'Onyx BT', 'OPTIMA', 'Oriya Sangam MN', 'OSAKA', 'OzHandicraft BT', 'Palace Script MT', 'Papyrus', 'Parchment', 'Party LET', 'Pegasus', 'Perpetua', 'Perpetua Titling MT', 'PetitaBold', 'Pickwick', 'Plantagenet Cherokee', 'Playbill', 'PMingLiU', 'PMingLiU-ExtB', 'Poor Richard', 'Poster', 'PosterBodoni BT', 'PRINCETOWN LET', 'Pristina', 'PTBarnum BT', 'Pythagoras', 'Raavi', 'Rage Italic', 'Ravie', 'Ribbon131 Bd BT', 'Rockwell', 'Rockwell Condensed', 'Rockwell Extra Bold', 'Rod', 'Roman', 'Sakkal Majalla', 'Santa Fe LET', 'Savoye LET', 'Sceptre', 'Script', 'Script MT Bold', 'SCRIPTINA', 'Serifa', 'Serifa BT', 'Serifa Th BT', 'ShelleyVolante BT', 'Sherwood', 'Shonar Bangla', 'Showcard Gothic', 'Shruti', 'Signboard', 'SILKSCREEN', 'SimHei', 'Simplified Arabic', 'Simplified Arabic Fixed', 'SimSun', 'SimSun-ExtB', 'Sinhala Sangam MN', 'Sketch Rockwell', 'Skia', 'Small Fonts', 'Snap ITC', 'Snell Roundhand', 'Socket', 'Souvenir Lt BT', 'Staccato222 BT', 'Steamer', 'Stencil', 'Storybook', 'Styllo', 'Subway', 'Swis721 BlkEx BT', 'Swiss911 XCm BT', 'Sylfaen', 'Synchro LET', 'System', 'Tamil Sangam MN', 'Technical', 'Teletype', 'Telugu Sangam MN', 'Tempus Sans ITC', 'Terminal', 'Thonburi', 'Traditional Arabic', 'Trajan', 'TRAJAN PRO', 'Tristan', 'Tubular', 'Tunga', 'Tw Cen MT', 'Tw Cen MT Condensed', 'Tw Cen MT Condensed Extra Bold', 'TypoUpright BT', 'Unicorn', 'Univers', 'Univers CE 55 Medium', 'Univers Condensed', 'Utsaah', 'Vagabond', 'Vani', 'Vijaya', 'Viner Hand ITC', 'VisualUI', 'Vivaldi', 'Vladimir Script', 'Vrinda', 'Westminster', 'WHITNEY', 'Wide Latin', 'ZapfEllipt BT', 'ZapfHumnst BT', 'ZapfHumnst Dm BT', 'Zapfino', 'Zurich BlkEx BT', 'Zurich Ex BT', 'ZWAdobeF']));
        d = (d = d.concat(t.fonts.userDefinedFonts)).filter(function (e, t) {
          return d.indexOf(e) === t;
        });
        var a = document.getElementsByTagName('body')[0];
        var r = document.createElement('div');
        var g = document.createElement('div');
        var n = {};
        var i = {};
        var f = function f() {
          var e = document.createElement('span');
          return e.style.position = 'absolute', e.style.left = '-9999px', e.style.fontSize = '72px', e.style.fontStyle = 'normal', e.style.fontWeight = 'normal', e.style.letterSpacing = 'normal', e.style.lineBreak = 'auto', e.style.lineHeight = 'normal', e.style.textTransform = 'none', e.style.textAlign = 'left', e.style.textDecoration = 'none', e.style.textShadow = 'none', e.style.whiteSpace = 'normal', e.style.wordBreak = 'normal', e.style.wordSpacing = 'normal', e.innerHTML = 'mmmmmmmmmmlli', e;
        };
        var o = function o(e) {
          for (var t = !1, a = 0; a < u.length; a++) if (t = e[a].offsetWidth !== n[u[a]] || e[a].offsetHeight !== i[u[a]]) return t;
          return t;
        };
        var l = function () {
          for (var e = [], t = 0, a = u.length; t < a; t++) {
            var _n2 = f();
            _n2.style.fontFamily = u[t], r.appendChild(_n2), e.push(_n2);
          }
          return e;
        }();
        a.appendChild(r);
        for (var _s2 = 0, _c = u.length; _s2 < _c; _s2++) n[u[_s2]] = l[_s2].offsetWidth, i[u[_s2]] = l[_s2].offsetHeight;
        var h = function () {
          for (var e, t, a, n = {}, r = 0, i = d.length; r < i; r++) {
            for (var o = [], l = 0, s = u.length; l < s; l++) {
              var _c2 = (e = d[r], t = u[l], a = void 0, (a = f()).style.fontFamily = "'".concat(e, "',").concat(t), a);
              g.appendChild(_c2), o.push(_c2);
            }
            n[d[r]] = o;
          }
          return n;
        }();
        a.appendChild(g);
        for (var m = [], T = 0, p = d.length; T < p; T++) o(h[d[T]]) && m.push(d[T]);
        a.removeChild(g), a.removeChild(r), e(m);
      },
      pauseBefore: !0
    }, {
      key: 'fontsFlash',
      getData: function getData(t, e) {
        return D() ? N() ? e.fonts.swfPath ? void _(function (e) {
          t(e);
        }, e) : t('missing options.fonts.swfPath') : t('flash not installed') : t('swf object not loaded');
      },
      pauseBefore: !0
    }, {
      key: 'audio',
      getData: function getData(a, e) {
        var t = e.audio;
        if (t.excludeIOS11 && navigator.userAgent.match(/OS 11.+Version\/11.+Safari/)) return a(e.EXCLUDED);
        var n = window.OfflineAudioContext || window.webkitOfflineAudioContext;
        if (n == null) return a(e.NOT_AVAILABLE);
        var r = new n(1, 44100, 44100);
        var i = r.createOscillator();
        i.type = 'triangle', i.frequency.setValueAtTime(1e4, r.currentTime);
        var o = r.createDynamicsCompressor();
        c([['threshold', -50], ['knee', 40], ['ratio', 12], ['reduction', -20], ['attack', 0], ['release', 0.25]], function (e) {
          void 0 !== o[e[0]] && typeof o[e[0]].setValueAtTime === 'function' && o[e[0]].setValueAtTime(e[1], r.currentTime);
        }), i.connect(o), o.connect(r.destination), i.start(0), r.startRendering();
        var l = setTimeout(function () {
          return console.warn("Audio fingerprint timed out. Please report bug at https://github.com/Valve/fingerprintjs2 with your user agent: \"".concat(navigator.userAgent, "\".")), r.oncomplete = function () {}, r = null, a('audioTimeout');
        }, t.timeout);
        r.oncomplete = function (e) {
          var t;
          try {
            clearTimeout(l), t = e.renderedBuffer.getChannelData(0).slice(4500, 5e3).reduce(function (e, t) {
              return e + Math.abs(t);
            }, 0).toString(), i.disconnect(), o.disconnect();
          } catch (e) {
            return void a(e);
          }
          a(t);
        };
      }
    }, {
      key: 'enumerateDevices',
      getData: function getData(t, e) {
        if (!a()) return t(e.NOT_AVAILABLE);
        navigator.mediaDevices.enumerateDevices().then(function (e) {
          t(e.map(function (e) {
            return "id=".concat(e.deviceId, ";gid=").concat(e.groupId, ";").concat(e.kind, ";").concat(e.label);
          }));
        })["catch"](function (e) {
          t(e);
        });
      }
    }];
    var U = function U(e) {
      throw new Error("'new Fingerprint()' is deprecated, see https://github.com/Valve/fingerprintjs2#upgrade-guide-from-182-to-200");
    };
    return U.get = function (a, n) {
      n ? a || (a = {}) : (n = a, a = {}), function (e, t) {
        if (t == null) return;
        var a;
        var n;
        for (n in t) (a = t[n]) == null || Object.prototype.hasOwnProperty.call(e, n) || (e[n] = a);
      }(a, e), a.components = a.extraComponents.concat(G);
      var r = {
        data: [],
        addPreprocessedComponent: function addPreprocessedComponent(e, t) {
          typeof a.preprocessor === 'function' && (t = a.preprocessor(e, t)), r.data.push({
            key: e,
            value: t
          });
        }
      };
      var i = -1;
      var o = function o(e) {
        if ((i += 1) >= a.components.length) n(r.data);else {
          var _t3 = a.components[i];
          if (a.excludes[_t3.key]) o(!1);else {
            if (!e && _t3.pauseBefore) return i -= 1, void setTimeout(function () {
              o(!0);
            }, 1);
            try {
              _t3.getData(function (e) {
                r.addPreprocessedComponent(_t3.key, e), o(!1);
              }, a);
            } catch (e) {
              r.addPreprocessedComponent(_t3.key, String(e)), o(!1);
            }
          }
        }
      };
      o(!1);
    }, U.getPromise = function (a) {
      return new Promise(function (e, t) {
        U.get(a, e);
      });
    }, U.getV18 = function (i, o) {
      return o == null && (o = i, i = {}), U.get(i, function (e) {
        for (var t = [], a = 0; a < e.length; a++) {
          var _n3 = e[a];
          if (_n3.value === (i.NOT_AVAILABLE || 'not available')) t.push({
            key: _n3.key,
            value: 'unknown'
          });else if (_n3.key === 'plugins') t.push({
            key: 'plugins',
            value: s(_n3.value, function (e) {
              var t = s(e[2], function (e) {
                return e.join ? e.join('~') : e;
              }).join(',');
              return [e[0], e[1], t].join('::');
            })
          });else if (['canvas', 'webgl'].indexOf(_n3.key) !== -1) t.push({
            key: _n3.key,
            value: _n3.value.join('~')
          });else if (['sessionStorage', 'localStorage', 'indexedDb', 'addBehavior', 'openDatabase'].indexOf(_n3.key) !== -1) {
            if (!_n3.value) continue;
            t.push({
              key: _n3.key,
              value: 1
            });
          } else _n3.value ? t.push(_n3.value.join ? {
            key: _n3.key,
            value: _n3.value.join(';')
          } : _n3) : t.push({
            key: _n3.key,
            value: _n3.value
          });
        }
        var r = l(s(t, function (e) {
          return e.value;
        }).join('~~~'), 31);
        o(r, t);
      });
    }, U.x64hash128 = l, U.VERSION = '2.1.0', U;
  });

  /*!
   Copyright 2018 Google Inc. All Rights Reserved.
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
  */
  /*! lifecycle.es5.js v0.1.1 */
  !function (e, t) {
    'object' == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.lifecycle = t();
  }(window, function () {

    var e = void 0;
    try {
      new EventTarget(), e = !1;
    } catch (t) {
      e = !1;
    }
    var t = 'function' == typeof Symbol && 'symbol' == _typeof(Symbol.iterator) ? function (e) {
        return _typeof(e);
      } : function (e) {
        return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : _typeof(e);
      },
      n = function n(e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
      },
      i = function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, 'value' in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
          }
        }
        return function (t, n, i) {
          return n && e(t.prototype, n), i && e(t, i), t;
        };
      }(),
      r = function r(e, t) {
        if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + _typeof(t));
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
      },
      a = function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || 'object' != _typeof(t) && 'function' != typeof t ? e : t;
      },
      s = function () {
        function e() {
          n(this, e), this._registry = {};
        }
        return i(e, [{
          key: 'addEventListener',
          value: function value(e, t) {
            this._getRegistry(e).push(t);
          }
        }, {
          key: 'removeEventListener',
          value: function value(e, t) {
            var n = this._getRegistry(e),
              i = n.indexOf(t);
            i > -1 && n.splice(i, 1);
          }
        }, {
          key: 'dispatchEvent',
          value: function value(e) {
            return e.target = this, Object.freeze(e), this._getRegistry(e.type).forEach(function (t) {
              return t(e);
            }), !0;
          }
        }, {
          key: '_getRegistry',
          value: function value(e) {
            return this._registry[e] = this._registry[e] || [];
          }
        }]), e;
      }(),
      o = e ? EventTarget : s,
      u = e ? Event : function e(t) {
        n(this, e), this.type = t;
      },
      f = function (e) {
        function t(e, i) {
          n(this, t);
          var r = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
          return r.newState = i.newState, r.oldState = i.oldState, r.originalEvent = i.originalEvent, r;
        }
        return r(t, u), t;
      }(),
      c = 'active',
      h = 'passive',
      d = 'hidden',
      l = 'frozen',
      p = 'terminated',
      v = 'object' === ('undefined' == typeof safari ? 'undefined' : t(safari)) && safari.pushNotification,
      y = ['focus', 'blur', 'visibilitychange', 'freeze', 'resume', 'pageshow', 'onpageshow' in self ? 'pagehide' : 'unload'],
      g = function g(e) {
        return e.preventDefault(), e.returnValue = 'Are you sure?';
      },
      _ = [[c, h, d, p], [c, h, d, l], [d, h, c], [l, d], [l, c], [l, h]].map(function (e) {
        return e.reduce(function (e, t, n) {
          return e[t] = n, e;
        }, {});
      }),
      b = function b() {
        return document.visibilityState === d ? d : document.hasFocus() ? c : h;
      };
    return new (function (e) {
      function t() {
        n(this, t);
        var e = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this)),
          i = b();
        return e._state = i, e._unsavedChanges = [], e._handleEvents = e._handleEvents.bind(e), y.forEach(function (t) {
          return addEventListener(t, e._handleEvents, !0);
        }), v && addEventListener('beforeunload', function (t) {
          e._safariBeforeUnloadTimeout = setTimeout(function () {
            t.defaultPrevented || t.returnValue.length > 0 || e._dispatchChangesIfNeeded(t, d);
          }, 0);
        }), e;
      }
      return r(t, o), i(t, [{
        key: 'addUnsavedChanges',
        value: function value(e) {
          !this._unsavedChanges.indexOf(e) > -1 && (0 === this._unsavedChanges.length && addEventListener('beforeunload', g), this._unsavedChanges.push(e));
        }
      }, {
        key: 'removeUnsavedChanges',
        value: function value(e) {
          var t = this._unsavedChanges.indexOf(e);
          t > -1 && (this._unsavedChanges.splice(t, 1), 0 === this._unsavedChanges.length && removeEventListener('beforeunload', g));
        }
      }, {
        key: '_dispatchChangesIfNeeded',
        value: function value(e, t) {
          if (t !== this._state) for (var n = function (e, t) {
              for (var n, i = 0; n = _[i]; ++i) {
                var r = n[e],
                  a = n[t];
                if (r >= 0 && a >= 0 && a > r) return Object.keys(n).slice(r, a + 1);
              }
              return [];
            }(this._state, t), i = 0; i < n.length - 1; ++i) {
            var r = n[i],
              a = n[i + 1];
            this._state = a, this.dispatchEvent(new f('statechange', {
              oldState: r,
              newState: a,
              originalEvent: e
            }));
          }
        }
      }, {
        key: '_handleEvents',
        value: function value(e) {
          switch (v && clearTimeout(this._safariBeforeUnloadTimeout), e.type) {
            case 'pageshow':
            case 'resume':
              this._dispatchChangesIfNeeded(e, b());
              break;
            case 'focus':
              this._dispatchChangesIfNeeded(e, c);
              break;
            case 'blur':
              this._state === c && this._dispatchChangesIfNeeded(e, b());
              break;
            case 'pagehide':
            case 'unload':
              this._dispatchChangesIfNeeded(e, e.persisted ? l : p);
              break;
            case 'visibilitychange':
              this._state !== l && this._state !== p && this._dispatchChangesIfNeeded(e, b());
              break;
            case 'freeze':
              this._dispatchChangesIfNeeded(e, l);
          }
        }
      }, {
        key: 'state',
        get: function get() {
          return this._state;
        }
      }, {
        key: 'pageWasDiscarded',
        get: function get() {
          return document.wasDiscarded || !1;
        }
      }]), t;
    }())();
  });

  var config = {
    API_URL: 'https://ship-prod-627ed08f489a970013572f5d.paralect.net',
    API_URL_DEV: 'https://ship-627ed08f489a970013572f5d.paralect.net'
  };

  var API_URL$1 = config.API_URL_DEV ;
  // const API_URL = config.API_URL_DEV;

  var CLASS_DIVIDER = / /g;
  var DEFAULT_DEBOUNCE_TIME = 500;
  var getParents = function getParents(element) {
    var parents = [];

    // eslint-disable-next-line no-param-reassign
    for (; element && element !== document; element = element.parentNode) {
      parents.push(element);
    }
    return parents;
  };
  var getCountSameNodeName = function getCountSameNodeName(elementsArray, element) {
    var count = 0;
    _toConsumableArray(elementsArray).forEach(function (currentElement) {
      if (currentElement.nodeName.toLowerCase() === element.nodeName.toLowerCase()) {
        count += 1;
      }
    });
    return count;
  };
  var getNthNumber = function getNthNumber(element) {
    var nth = 1;

    // eslint-disable-next-line no-cond-assign,no-param-reassign
    while (element = element.previousElementSibling) {
      nth += 1;
    }
    return nth;
  };
  var getCssPath = function getCssPath(element) {
    var elementParents = getParents(element);
    elementParents = elementParents.splice(0, elementParents.length - 1);
    var selectorsArray = [];
    for (var i = 0; i < elementParents.length; i += 1) {
      var elementItem = elementParents[i];
      var nodeName = elementItem.nodeName.toLowerCase();
      var id = '';
      var selector = '';
      if (elementItem.id) {
        id = "#".concat(elementItem.id);
      }
      if (id) {
        selector = id;
        selectorsArray.push(selector);
        break;
      } else {
        selector = nodeName;
        var parentNode = elementItem.parentNode;
        if (parentNode) {
          var sibling = parentNode.children;
          var countSameNodeName = getCountSameNodeName(sibling, elementItem);
          if (sibling.length > 1 && countSameNodeName > 1) {
            var classNames = elementItem.className ? ".".concat(elementItem.className.replace(CLASS_DIVIDER, '.')) : '';
            if (classNames) {
              selector += classNames;
            } else {
              var nthNumber = getNthNumber(elementItem);
              selector += ":nth-child(".concat(nthNumber, ")");
            }
          }
        }
      }
      selectorsArray.push(selector);
    }
    var resultPath = selectorsArray.reverse().join(' > ');
    return resultPath;
  };
  var getValue = function getValue(element) {
    return "".concat(element.value || element.innerText || '');
  };
  var sendData = function sendData(url, data) {
    return fetch("".concat(window.WAVE_API_URL || API_URL$1, "/").concat(url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function (response) {
      return response.json();
    });
  };
  var sendTrackData = function sendTrackData(userData, url, data) {
    var _window$MWAVE_CONFIG, _window$MWAVE_CONFIG2;
    return sendData(url, _objectSpread2(_objectSpread2({}, data), {}, {
      projectId: userData.projectId,
      visitorId: userData.visitorId,
      sessionId: userData.sessionId
    }, window.MWAVE_CONFIG ? {
      subProjectId: (_window$MWAVE_CONFIG = window.MWAVE_CONFIG) === null || _window$MWAVE_CONFIG === void 0 ? void 0 : _window$MWAVE_CONFIG.subProjectId,
      pageId: (_window$MWAVE_CONFIG2 = window.MWAVE_CONFIG) === null || _window$MWAVE_CONFIG2 === void 0 ? void 0 : _window$MWAVE_CONFIG2.pageId
    } : {})).then(function (trackData) {
      if (trackData.sessionId) {
        // eslint-disable-next-line no-param-reassign
        userData.sessionId = trackData.sessionId;
      }
      return trackData;
    });
  };
  var sendTrackEvent = function sendTrackEvent(_ref) {
    var _window$MWAVE_CONFIG3, _window$MWAVE_CONFIG4;
    var type = _ref.type,
      _ref$timestamp = _ref.timestamp,
      timestamp = _ref$timestamp === void 0 ? Date.now() : _ref$timestamp,
      payload = _ref.payload;
    var userData = window.WAVE_USER_DATA;
    return sendData('waveActions', _objectSpread2(_objectSpread2({
      projectId: userData.projectId,
      visitorId: userData.visitorId,
      sessionId: userData.sessionId
    }, window.MWAVE_CONFIG ? {
      subProjectId: (_window$MWAVE_CONFIG3 = window.MWAVE_CONFIG) === null || _window$MWAVE_CONFIG3 === void 0 ? void 0 : _window$MWAVE_CONFIG3.subProjectId,
      pageId: (_window$MWAVE_CONFIG4 = window.MWAVE_CONFIG) === null || _window$MWAVE_CONFIG4 === void 0 ? void 0 : _window$MWAVE_CONFIG4.pageId
    } : {}), {}, {
      type: type,
      timestamp: timestamp,
      payload: payload
    })).then(function (trackData) {
      if (trackData.sessionId) {
        // eslint-disable-next-line no-param-reassign
        userData.sessionId = trackData.sessionId;
      }
      return trackData;
    });
  };
  var sendPing = function sendPing() {
    var _window$MWAVE_CONFIG5, _window$MWAVE_CONFIG6;
    var userData = window.WAVE_USER_DATA;
    return sendData('waveActions/ping', _objectSpread2({
      projectId: userData.projectId,
      visitorId: userData.visitorId,
      sessionId: userData.sessionId
    }, window.MWAVE_CONFIG ? {
      subProjectId: (_window$MWAVE_CONFIG5 = window.MWAVE_CONFIG) === null || _window$MWAVE_CONFIG5 === void 0 ? void 0 : _window$MWAVE_CONFIG5.subProjectId,
      pageId: (_window$MWAVE_CONFIG6 = window.MWAVE_CONFIG) === null || _window$MWAVE_CONFIG6 === void 0 ? void 0 : _window$MWAVE_CONFIG6.pageId
    } : {}));
  };
  var registerHandlers = function registerHandlers(userData, handlers) {
    handlers.forEach(function (handler) {
      return handler(userData);
    });
  };
  var debounce = function debounce(func, delay) {
    var blockerId;
    return function (args) {
      clearTimeout(blockerId);
      blockerId = setTimeout(function () {
        return func(args);
      }, delay);
    };
  };
  var includes = function includes(haystack, needle) {
    return haystack.indexOf(needle) !== -1;
  };
  var find = function find(needle) {
    return includes(navigator.userAgent.toLocaleLowerCase(), needle);
  };
  var windows = function windows() {
    return find('windows');
  };
  var linux = function linux() {
    return find('linux');
  };
  var iphone = function iphone() {
    return !windows() && find('iphone');
  };
  var ipod = function ipod() {
    return find('ipod');
  };
  var ipad = function ipad() {
    var iPadOS13Up = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    return find('ipad') || iPadOS13Up;
  };
  var ios = function ios() {
    return iphone() || ipod() || ipad();
  };
  var macos = function macos() {
    return find('mac');
  };
  var android = function android() {
    return !windows() && find('android');
  };
  var androidPhone = function androidPhone() {
    return android() && find('mobile');
  };
  var androidTablet = function androidTablet() {
    return android() && !find('mobile');
  };
  var blackberry = function blackberry() {
    return find('blackberry') || find('bb10');
  };
  var blackberryPhone = function blackberryPhone() {
    return blackberry() && !find('tablet');
  };
  var blackberryTablet = function blackberryTablet() {
    return blackberry() && find('tablet');
  };
  var windowsPhone = function windowsPhone() {
    return windows() && find('phone');
  };
  var windowsTablet = function windowsTablet() {
    return windows() && find('touch') && !windowsPhone();
  };
  var fxos = function fxos() {
    return (find('(mobile') || find('(tablet')) && find(' rv:');
  };
  var fxosPhone = function fxosPhone() {
    return fxos() && find('mobile');
  };
  var fxosTablet = function fxosTablet() {
    return fxos() && find('tablet');
  };
  var meego = function meego() {
    return find('meego');
  };
  var mobile = function mobile() {
    return androidPhone() || iphone() || ipod() || windowsPhone() || blackberryPhone() || fxosPhone() || meego();
  };
  var tablet = function tablet() {
    return ipad() || androidTablet() || blackberryTablet() || windowsTablet() || fxosTablet();
  };
  var desktop = function desktop() {
    return !tablet() && !mobile();
  };
  var getDeviceType = function getDeviceType() {
    if (desktop()) {
      return 'desktop';
    }
    if (tablet()) {
      return 'tablet';
    }
    if (mobile()) {
      return 'mobile';
    }
    return 'unknown';
  };
  var getOS = function getOS() {
    if (ios()) {
      return 'ios';
    }
    if (android()) {
      return 'android';
    }
    if (blackberry()) {
      return 'blackberry';
    }
    if (macos()) {
      return 'macos';
    }
    if (windows()) {
      return 'windows';
    }
    if (linux()) {
      return 'linux';
    }
    if (fxos()) {
      return 'fxos';
    }
    if (meego()) {
      return 'meego';
    }
    return 'unknown';
  };
  var getBrowserName = function getBrowserName() {
    if (navigator.userAgent.indexOf('Edge') > -1 && navigator.appVersion.indexOf('Edge') > -1) {
      return 'Edge';
    }
    if (navigator.userAgent.indexOf('Opera') !== -1 || navigator.userAgent.indexOf('OPR') !== -1) {
      return 'Opera';
    }
    if (navigator.userAgent.indexOf('Chrome') !== -1) {
      return 'Chrome';
    }
    if (navigator.userAgent.indexOf('Safari') !== -1) {
      return 'Safari';
    }
    if (navigator.userAgent.indexOf('Firefox') !== -1) {
      return 'Firefox';
    }
    if (navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode === true) {
      // IF IE > 10{
      return 'IE';
    }
    return 'unknown';
  };
  var getConnectionType = function getConnectionType() {
    var connectionType = navigator && navigator.connection && navigator.connection.type; // https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API

    return connectionType;
  };

  var clickHandler = (function (userData) {
    if (window.WAVE_TRACK_CLICKS) {
      var handleClick = function handleClick(event) {
        var data = {
          type: 'click',
          timestamp: Date.now(),
          payload: {
            position: {
              x: event.clientX,
              y: event.clientY
            },
            selector: getCssPath(event.target),
            value: getValue(event.target)
          }
        };
        // corrects clicls after scrolling
        sendTrackData(userData, 'waveActions', {
          type: 'pageScroll',
          timestamp: Date.now(),
          payload: {
            offset: {
              x: window.pageXOffset,
              y: window.pageYOffset
            }
          }
        });
        sendTrackData(userData, 'waveActions', data);
      };
      return window.addEventListener('click', handleClick, {
        capture: true,
        passive: true
      });
    }
  });

  // clicks doesn't work on disabled elements.
  // https://www.w3.org/TR/2014/REC-html5-20141028/forms.html#concept-fe-disabled

  var pageResizeHandler = (function (userData) {
    // window.addEventListener(
    // 	'resize',
    // 	debounce(
    // 		() =>
    // 			sendTrackData(userData, 'waveActions', {
    // 				type: 'resize',
    // 				timestamp: Date.now(),
    // 				payload: {
    // 					size: {
    // 						width: window.innerWidth,
    // 						height: window.innerHeight
    // 					}
    // 				}
    // 			}),
    // 		DEFAULT_DEBOUNCE_TIME
    // 	)
    // );
  });

  var pageScrollingHandler = (function (userData) {
    // window.addEventListener(
    // 	'scroll',
    // 	throttle(
    // 		() =>
    // 			sendTrackData(userData, 'waveActions', {
    // 				type: 'pageScroll',
    // 				timestamp: Date.now(),
    // 				payload: {
    // 					offset: {
    // 						x: window.pageXOffset,
    // 						y: window.pageYOffset
    // 					}
    // 				}
    // 			}),
    // 		SCROLL_THROTTLE_TIME
    // 	)
    // );
  });

  var signupHandler = (function (userData) {
    if (window.WAVE_TRACK_FORMS) {
      document.querySelectorAll('form').forEach(function (form) {
        var emailEl = form.querySelectorAll('input[type=email]')[0];
        if (emailEl) {
          form.addEventListener('submit', function () {
            var actionData = {
              type: 'signup',
              timestamp: Date.now(),
              payload: {}
            };
            sendTrackData(userData, 'waveActions', actionData);
          });
        }
      });
    }
  });

  var mouseMoveHandler = function mouseMoveHandler(userData) {
    // function handleEvent(event) {
    // 	const timestamp = Date.now();
    // 	const record = {
    // 		x: event.clientX,
    // 		y: event.clientY,
    // 		timestamp
    // 	};
    // 	eventBuffer.data.push(record);
    // 	if (timestamp - eventBuffer.latestSend > ACTION_SEND_INTERVAL) {
    // 		const manyRecords = {
    // 			type: 'mouseMove',
    // 			payload: {
    // 				batch: eventBuffer.data
    // 			}
    // 		};
    // 		eventBuffer.data = [];
    // 		eventBuffer.latestSend = Date.now();
    // 		sendTrackData(userData, 'waveActions', manyRecords);
    // 	}
    // }
    // window.addEventListener('mousemove', throttle(handleEvent, MOUSE_MOVE_THROTTLE_TIME));
  };

  var handleLocationChange = function handleLocationChange(userData) {
    var href = window.location.href;
    var actionData = {
      type: 'pathChange',
      timestamp: Date.now(),
      payload: {
        value: href
      }
    };
    sendTrackData(userData, 'waveActions', actionData);
  };
  var pathChangeHandler = (function (userData) {
    window.history.pushState = function (f) {
      return function pushState() {
        for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
          arg[_key] = arguments[_key];
        }
        var ret = f.apply(this, arg);
        window.dispatchEvent(new Event('locationchange'));
        return ret;
      };
    }(window.history.pushState);
    window.history.replaceState = function (f) {
      return function replaceState() {
        for (var _len2 = arguments.length, arg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          arg[_key2] = arguments[_key2];
        }
        var ret = f.apply(this, arg);
        window.dispatchEvent(new Event('locationchange'));
        return ret;
      };
    }(window.history.replaceState);
    window.addEventListener('popstate', function () {
      window.dispatchEvent(new Event('locationchange'));
    });
    window.addEventListener('hashchange', function () {
      window.dispatchEvent(new Event('locationchange'));
    });
    window.addEventListener('pageshow', function () {
      window.dispatchEvent(new Event('locationchange'));
    });
    return window.addEventListener('locationchange', function () {
      var _window$MWAVE_CONFIG;
      var isSkipLocationChange = (_window$MWAVE_CONFIG = window.MWAVE_CONFIG) === null || _window$MWAVE_CONFIG === void 0 ? void 0 : _window$MWAVE_CONFIG.isSkipLocationChange;
      if (!isSkipLocationChange) {
        handleLocationChange(userData);
      }
    });
  });

  var API_URL = config.API_URL_DEV ;
  var onExit = {
    register: function register() {
      lifecycle.addEventListener('statechange', function (event) {
        if (event.newState === 'hidden') {
          var userData = window.WAVE_USER_DATA;
          if (userData) {
            var data = {
              projectId: userData.projectId,
              visitorId: userData.visitorId,
              sessionId: userData.sessionId
            };
            navigator.sendBeacon("".concat(window.WAVE_API_URL || API_URL, "/waveActions/ping"), JSON.stringify(data));
          }
        }
      });
    }
  };

  var removeTags = function removeTags(node, tagName) {
    var nodeCloned = node.cloneNode(true);
    var tags = nodeCloned.getElementsByTagName(tagName);
    while (tags.length) {
      tags[0].parentNode.removeChild(tags[0]);
    }
    return nodeCloned;
  };
  var removeDangerousTags = function removeDangerousTags(node) {
    var rootWithoutScripts = removeTags(node, 'script');
    var rootWithoutIframes = removeTags(rootWithoutScripts, 'iframe');
    return rootWithoutIframes;
  };
  var prevWidth;
  var prevHeight;
  var handleMutation = function handleMutation(userData) {
    var root = document.getElementsByTagName('html')[0];
    if (!root) {
      return;
    }
    _toConsumableArray(root.querySelectorAll('input')).forEach(function (el) {
      if (!el.getAttribute('value') && el.value) {
        el.setAttribute('value', el.value);
      }
    });
    var rootWithoutDangerousTags = removeDangerousTags(root);
    var screen = rootWithoutDangerousTags.outerHTML;
    var width = root.offsetWidth;
    var height = root.offsetHeight;
    if (prevWidth !== width && prevHeight !== height) {
      sendTrackData(userData, 'waveRecords', {
        timestamp: Date.now(),
        payload: {
          size: {
            width: width,
            height: height
          },
          screen: screen
        }
      });
      prevWidth = width;
      prevHeight = height;
    }
  };

  var init$1 = function init(userData) {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var observer = new MutationObserver(debounce(function () {
      return handleMutation(userData);
    }, DEFAULT_DEBOUNCE_TIME));
    observer.observe(document, {
      subtree: true,
      childList: true,
      attributes: true
    });
    handleMutation(userData);
  };
  var trackerMutationObserver = {
    init: init$1
  };

  try {
    onExit.register();
  } catch (err) {}
  window.mwave = {
    sendTrackEvent: sendTrackEvent,
    sendPing: sendPing
  };
  {
    if (Fingerprint2 && Fingerprint2.getV18) {
      console.log('Fingerprint2.getV18:', _typeof(Fingerprint2.getV18)); // eslint-disable-line
    } else {
      console.error('Fingerprint2 not loaded correctly!', Fingerprint2); // eslint-disable-line
    }
  }

  var defaultHandlers = [clickHandler, pageResizeHandler, pageScrollingHandler, signupHandler, mouseMoveHandler, pathChangeHandler];
  var calcIdentificator = function calcIdentificator() {
    return new Promise(function (res, rej) {
      Fingerprint2.getV18(function (result) {
        if (!result) {
          rej(new Error('Identificator not created!'));
        }
        res(result);
      });
    });
  };
  function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + (exdays == null ? '' : '; expires=' + exdate.toUTCString());
    document.cookie = c_name + '=' + c_value;
  }
  var init = function init(initialUserData) {
    var handlers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultHandlers;
    return function () {
      var userData = _objectSpread2({}, initialUserData);
      return calcIdentificator().then(function (visitorId) {
        userData.visitorId = visitorId;
        setCookie('wave_fingerprint', visitorId);
        window.WAVE_FINGERPRINT = visitorId;
        var searchQuery = window.location.search;
        return fetch('https://api.ipify.org').then(function (res) {
          return res.text();
        }).then(function (data) {
          var _window$MWAVE_CONFIG, _window$MWAVE_CONFIG2;
          var payload = {
            os: getOS(),
            browserName: getBrowserName(),
            deviceType: getDeviceType(),
            connectionType: getConnectionType(),
            ipAddress: data,
            referrerUrl: document.referrer,
            searchQuery: searchQuery
          };
          var session = JSON.parse(localStorage.getItem("wave_session_".concat(window.WAVE_SUBPROJECT_ID || '')));
          var TEN_MINUTES_MS = 1 * 60 * 1000;
          if (session && session.sessionId && new Date() - new Date(session.updatedOn) < TEN_MINUTES_MS) {
            return {
              sessionId: session.sessionId
            };
          }
          return sendData('waveSessions/init', _objectSpread2({
            visitorId: visitorId,
            domain: window.location.hostname,
            url: window.location.href,
            payload: payload,
            projectId: userData.projectId
          }, window.MWAVE_CONFIG ? {
            subProjectId: (_window$MWAVE_CONFIG = window.MWAVE_CONFIG) === null || _window$MWAVE_CONFIG === void 0 ? void 0 : _window$MWAVE_CONFIG.subProjectId,
            pageId: (_window$MWAVE_CONFIG2 = window.MWAVE_CONFIG) === null || _window$MWAVE_CONFIG2 === void 0 ? void 0 : _window$MWAVE_CONFIG2.pageId
          } : {}));
        });
      }).then(function (_ref) {
        var sessionId = _ref.sessionId;
        if (sessionId) {
          var setSession = function setSession() {
            localStorage.setItem('wave_session', JSON.stringify({
              sessionId: sessionId,
              updatedOn: new Date()
            }));
          };
          setSession();
          window.WAVE_SESSION_ID = sessionId;
          setInterval(setSession, 10 * 1000);
          userData.sessionId = sessionId;
          registerHandlers(userData, handlers);
          window.WAVE_USER_DATA = userData;
          trackerMutationObserver.init(userData);
          handleLocationChange(userData);
        } else {
          console.error('Something went wrong, sessionId not setted:', sessionId); // eslint-disable-line
        }
      }).then(function () {
        return {
          userData: userData
        };
      });
    };
  };
  var tracker = {
    init: init
  };

  var index = (function () {
    var params = window.wave && window.wave.params;
    {
      console.log('Wave script params:', params); // eslint-disable-line
    }

    // don't change object's link.
    var userData = {
      visitorId: null,
      sessionId: null,
      projectId: params && params.pid
    };
    if (window.requestIdleCallback) {
      requestIdleCallback(tracker.init(userData));
    } else {
      setTimeout(tracker.init(userData), 500);
    }
  })();

  return index;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F2ZS5qcyIsInNvdXJjZXMiOlsiLi4vdHJhY2tlci9zcmMvbGliL2ZpbmdlcnByaW50Mi5taW4uanMiLCIuLi90cmFja2VyL3NyYy9saWIvbGlmZWN5Y2xlLmpzIiwiLi4vdHJhY2tlci9zcmMvY29uZmlnLmpzIiwiLi4vdHJhY2tlci9zcmMvaGVscGVycy5qcyIsIi4uL3RyYWNrZXIvc3JjL2FjdGlvbnMvY2xpY2suanMiLCIuLi90cmFja2VyL3NyYy9hY3Rpb25zL3BhZ2VSZXNpemUuanMiLCIuLi90cmFja2VyL3NyYy9hY3Rpb25zL3BhZ2VTY3JvbGxpbmcuanMiLCIuLi90cmFja2VyL3NyYy9hY3Rpb25zL3NpZ251cC5qcyIsIi4uL3RyYWNrZXIvc3JjL2FjdGlvbnMvbW91c2VNb3ZlLmpzIiwiLi4vdHJhY2tlci9zcmMvYWN0aW9ucy9wYXRoQ2hhbmdlLmpzIiwiLi4vdHJhY2tlci9zcmMvYWN0aW9ucy9vbkV4aXQuanMiLCIuLi90cmFja2VyL3NyYy9yZWNvcmRzL211dGF0aW9uLmpzIiwiLi4vdHJhY2tlci9zcmMvcmVjb3Jkcy9vYnNlcnZlci5qcyIsIi4uL3RyYWNrZXIvc3JjL3RyYWNrZXIuanMiLCIuLi90cmFja2VyL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGaW5nZXJwcmludGpzMiAtIENvcHlyaWdodCAoYykgMjAxOSBWYWxlbnRpbiBWYXNpbHlldiAodmFsZW50aW4udmFzaWx5ZXZAb3V0bG9vay5jb20pXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIChodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocCkgbGljZW5zZS5cblxuIShmdW5jdGlvbiAoZSwgdCwgYSkge1xuICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoYSkgOiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cyA/IG1vZHVsZS5leHBvcnRzID0gYSgpIDogdC5leHBvcnRzID8gdC5leHBvcnRzID0gYSgpIDogdC5GaW5nZXJwcmludDIgPSBhKCk7XG59KDAsIHRoaXMsICgpID0+IHtcbiAgY29uc3QgZCA9IGZ1bmN0aW9uIChlLCB0KSB7IGUgPSBbZVswXSA+Pj4gMTYsIDY1NTM1ICYgZVswXSwgZVsxXSA+Pj4gMTYsIDY1NTM1ICYgZVsxXV0sIHQgPSBbdFswXSA+Pj4gMTYsIDY1NTM1ICYgdFswXSwgdFsxXSA+Pj4gMTYsIDY1NTM1ICYgdFsxXV07IGNvbnN0IGEgPSBbMCwgMCwgMCwgMF07IHJldHVybiBhWzNdICs9IGVbM10gKyB0WzNdLCBhWzJdICs9IGFbM10gPj4+IDE2LCBhWzNdICY9IDY1NTM1LCBhWzJdICs9IGVbMl0gKyB0WzJdLCBhWzFdICs9IGFbMl0gPj4+IDE2LCBhWzJdICY9IDY1NTM1LCBhWzFdICs9IGVbMV0gKyB0WzFdLCBhWzBdICs9IGFbMV0gPj4+IDE2LCBhWzFdICY9IDY1NTM1LCBhWzBdICs9IGVbMF0gKyB0WzBdLCBhWzBdICY9IDY1NTM1LCBbYVswXSA8PCAxNiB8IGFbMV0sIGFbMl0gPDwgMTYgfCBhWzNdXTsgfTsgY29uc3QgZyA9IGZ1bmN0aW9uIChlLCB0KSB7IGUgPSBbZVswXSA+Pj4gMTYsIDY1NTM1ICYgZVswXSwgZVsxXSA+Pj4gMTYsIDY1NTM1ICYgZVsxXV0sIHQgPSBbdFswXSA+Pj4gMTYsIDY1NTM1ICYgdFswXSwgdFsxXSA+Pj4gMTYsIDY1NTM1ICYgdFsxXV07IGNvbnN0IGEgPSBbMCwgMCwgMCwgMF07IHJldHVybiBhWzNdICs9IGVbM10gKiB0WzNdLCBhWzJdICs9IGFbM10gPj4+IDE2LCBhWzNdICY9IDY1NTM1LCBhWzJdICs9IGVbMl0gKiB0WzNdLCBhWzFdICs9IGFbMl0gPj4+IDE2LCBhWzJdICY9IDY1NTM1LCBhWzJdICs9IGVbM10gKiB0WzJdLCBhWzFdICs9IGFbMl0gPj4+IDE2LCBhWzJdICY9IDY1NTM1LCBhWzFdICs9IGVbMV0gKiB0WzNdLCBhWzBdICs9IGFbMV0gPj4+IDE2LCBhWzFdICY9IDY1NTM1LCBhWzFdICs9IGVbMl0gKiB0WzJdLCBhWzBdICs9IGFbMV0gPj4+IDE2LCBhWzFdICY9IDY1NTM1LCBhWzFdICs9IGVbM10gKiB0WzFdLCBhWzBdICs9IGFbMV0gPj4+IDE2LCBhWzFdICY9IDY1NTM1LCBhWzBdICs9IGVbMF0gKiB0WzNdICsgZVsxXSAqIHRbMl0gKyBlWzJdICogdFsxXSArIGVbM10gKiB0WzBdLCBhWzBdICY9IDY1NTM1LCBbYVswXSA8PCAxNiB8IGFbMV0sIGFbMl0gPDwgMTYgfCBhWzNdXTsgfTsgY29uc3QgZiA9IGZ1bmN0aW9uIChlLCB0KSB7IHJldHVybiAodCAlPSA2NCkgPT09IDMyID8gW2VbMV0sIGVbMF1dIDogdCA8IDMyID8gW2VbMF0gPDwgdCB8IGVbMV0gPj4+IDMyIC0gdCwgZVsxXSA8PCB0IHwgZVswXSA+Pj4gMzIgLSB0XSA6ICh0IC09IDMyLCBbZVsxXSA8PCB0IHwgZVswXSA+Pj4gMzIgLSB0LCBlWzBdIDw8IHQgfCBlWzFdID4+PiAzMiAtIHRdKTsgfTsgY29uc3QgaCA9IGZ1bmN0aW9uIChlLCB0KSB7IHJldHVybiAodCAlPSA2NCkgPT09IDAgPyBlIDogdCA8IDMyID8gW2VbMF0gPDwgdCB8IGVbMV0gPj4+IDMyIC0gdCwgZVsxXSA8PCB0XSA6IFtlWzFdIDw8IHQgLSAzMiwgMF07IH07IGNvbnN0IG0gPSBmdW5jdGlvbiAoZSwgdCkgeyByZXR1cm4gW2VbMF0gXiB0WzBdLCBlWzFdIF4gdFsxXV07IH07IGNvbnN0IFQgPSBmdW5jdGlvbiAoZSkgeyByZXR1cm4gZSA9IG0oZSwgWzAsIGVbMF0gPj4+IDFdKSwgZSA9IGcoZSwgWzQyODM1NDM1MTEsIDM5ODE4MDY3OTddKSwgZSA9IG0oZSwgWzAsIGVbMF0gPj4+IDFdKSwgZSA9IGcoZSwgWzMzMDE4ODIzNjYsIDQ0NDk4NDQwM10pLCBlID0gbShlLCBbMCwgZVswXSA+Pj4gMV0pOyB9OyBjb25zdCBsID0gZnVuY3Rpb24gKGUsIHQpIHsgdCA9IHQgfHwgMDsgZm9yICh2YXIgYSA9IChlID0gZSB8fCAnJykubGVuZ3RoICUgMTYsIG4gPSBlLmxlbmd0aCAtIGEsIHIgPSBbMCwgdF0sIGkgPSBbMCwgdF0sIG8gPSBbMCwgMF0sIGwgPSBbMCwgMF0sIHMgPSBbMjI3NzczNTMxMywgMjg5NTU5NTA5XSwgYyA9IFsxMjkxMTY5MDkxLCA2NTg4NzExNjddLCB1ID0gMDsgdSA8IG47IHUgKz0gMTYpbyA9IFsyNTUgJiBlLmNoYXJDb2RlQXQodSArIDQpIHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgNSkpIDw8IDggfCAoMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyA2KSkgPDwgMTYgfCAoMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyA3KSkgPDwgMjQsIDI1NSAmIGUuY2hhckNvZGVBdCh1KSB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDEpKSA8PCA4IHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgMikpIDw8IDE2IHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgMykpIDw8IDI0XSwgbCA9IFsyNTUgJiBlLmNoYXJDb2RlQXQodSArIDEyKSB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDEzKSkgPDwgOCB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDE0KSkgPDwgMTYgfCAoMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyAxNSkpIDw8IDI0LCAyNTUgJiBlLmNoYXJDb2RlQXQodSArIDgpIHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgOSkpIDw8IDggfCAoMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyAxMCkpIDw8IDE2IHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgMTEpKSA8PCAyNF0sIG8gPSBnKG8sIHMpLCBvID0gZihvLCAzMSksIG8gPSBnKG8sIGMpLCByID0gbShyLCBvKSwgciA9IGYociwgMjcpLCByID0gZChyLCBpKSwgciA9IGQoZyhyLCBbMCwgNV0pLCBbMCwgMTM5MDIwODgwOV0pLCBsID0gZyhsLCBjKSwgbCA9IGYobCwgMzMpLCBsID0gZyhsLCBzKSwgaSA9IG0oaSwgbCksIGkgPSBmKGksIDMxKSwgaSA9IGQoaSwgciksIGkgPSBkKGcoaSwgWzAsIDVdKSwgWzAsIDk0NDMzMTQ0NV0pOyBzd2l0Y2ggKG8gPSBbMCwgMF0sIGwgPSBbMCwgMF0sIGEpIHsgY2FzZSAxNTogbCA9IG0obCwgaChbMCwgZS5jaGFyQ29kZUF0KHUgKyAxNCldLCA0OCkpOyBjYXNlIDE0OiBsID0gbShsLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDEzKV0sIDQwKSk7IGNhc2UgMTM6IGwgPSBtKGwsIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgMTIpXSwgMzIpKTsgY2FzZSAxMjogbCA9IG0obCwgaChbMCwgZS5jaGFyQ29kZUF0KHUgKyAxMSldLCAyNCkpOyBjYXNlIDExOiBsID0gbShsLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDEwKV0sIDE2KSk7IGNhc2UgMTA6IGwgPSBtKGwsIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgOSldLCA4KSk7IGNhc2UgOTogbCA9IG0obCwgWzAsIGUuY2hhckNvZGVBdCh1ICsgOCldKSwgbCA9IGcobCwgYyksIGwgPSBmKGwsIDMzKSwgbCA9IGcobCwgcyksIGkgPSBtKGksIGwpOyBjYXNlIDg6IG8gPSBtKG8sIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgNyldLCA1NikpOyBjYXNlIDc6IG8gPSBtKG8sIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgNildLCA0OCkpOyBjYXNlIDY6IG8gPSBtKG8sIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgNSldLCA0MCkpOyBjYXNlIDU6IG8gPSBtKG8sIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgNCldLCAzMikpOyBjYXNlIDQ6IG8gPSBtKG8sIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgMyldLCAyNCkpOyBjYXNlIDM6IG8gPSBtKG8sIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgMildLCAxNikpOyBjYXNlIDI6IG8gPSBtKG8sIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgMSldLCA4KSk7IGNhc2UgMTogbyA9IG0obywgWzAsIGUuY2hhckNvZGVBdCh1KV0pLCBvID0gZyhvLCBzKSwgbyA9IGYobywgMzEpLCBvID0gZyhvLCBjKSwgciA9IG0ociwgbyk7IH0gcmV0dXJuIHIgPSBtKHIsIFswLCBlLmxlbmd0aF0pLCBpID0gbShpLCBbMCwgZS5sZW5ndGhdKSwgciA9IGQociwgaSksIGkgPSBkKGksIHIpLCByID0gVChyKSwgaSA9IFQoaSksIHIgPSBkKHIsIGkpLCBpID0gZChpLCByKSwgKGAwMDAwMDAwMCR7KHJbMF0gPj4+IDApLnRvU3RyaW5nKDE2KX1gKS5zbGljZSgtOCkgKyAoYDAwMDAwMDAwJHsoclsxXSA+Pj4gMCkudG9TdHJpbmcoMTYpfWApLnNsaWNlKC04KSArIChgMDAwMDAwMDAkeyhpWzBdID4+PiAwKS50b1N0cmluZygxNil9YCkuc2xpY2UoLTgpICsgKGAwMDAwMDAwMCR7KGlbMV0gPj4+IDApLnRvU3RyaW5nKDE2KX1gKS5zbGljZSgtOCk7IH07IGNvbnN0IGUgPSB7XG4gICAgcHJlcHJvY2Vzc29yOiBudWxsLFxuICAgIGF1ZGlvOiB7IHRpbWVvdXQ6IDFlMywgZXhjbHVkZUlPUzExOiAhMCB9LFxuICAgIGZvbnRzOiB7XG4gICAgICBzd2ZDb250YWluZXJJZDogJ2ZpbmdlcnByaW50anMyJywgc3dmUGF0aDogJ2ZsYXNoL2NvbXBpbGVkL0ZvbnRMaXN0LnN3ZicsIHVzZXJEZWZpbmVkRm9udHM6IFtdLCBleHRlbmRlZEpzRm9udHM6ICExLFxuICAgIH0sXG4gICAgc2NyZWVuOiB7IGRldGVjdFNjcmVlbk9yaWVudGF0aW9uOiAhMCB9LFxuICAgIHBsdWdpbnM6IHsgc29ydFBsdWdpbnNGb3I6IFsvcGFsZW1vb24vaV0sIGV4Y2x1ZGVJRTogITEgfSxcbiAgICBleHRyYUNvbXBvbmVudHM6IFtdLFxuICAgIGV4Y2x1ZGVzOiB7XG4gICAgICBlbnVtZXJhdGVEZXZpY2VzOiAhMCwgcGl4ZWxSYXRpbzogITAsIGRvTm90VHJhY2s6ICEwLCBmb250c0ZsYXNoOiAhMCxcbiAgICB9LFxuICAgIE5PVF9BVkFJTEFCTEU6ICdub3QgYXZhaWxhYmxlJyxcbiAgICBFUlJPUjogJ2Vycm9yJyxcbiAgICBFWENMVURFRDogJ2V4Y2x1ZGVkJyxcbiAgfTsgY29uc3QgYyA9IGZ1bmN0aW9uIChlLCB0KSB7IGlmIChBcnJheS5wcm90b3R5cGUuZm9yRWFjaCAmJiBlLmZvckVhY2ggPT09IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoKWUuZm9yRWFjaCh0KTsgZWxzZSBpZiAoZS5sZW5ndGggPT09ICtlLmxlbmd0aCkgZm9yIChsZXQgYSA9IDAsIG4gPSBlLmxlbmd0aDsgYSA8IG47IGErKyl0KGVbYV0sIGEsIGUpOyBlbHNlIGZvciAoY29uc3QgciBpbiBlKWUuaGFzT3duUHJvcGVydHkocikgJiYgdChlW3JdLCByLCBlKTsgfTsgY29uc3QgcyA9IGZ1bmN0aW9uIChlLCBuKSB7IGNvbnN0IHIgPSBbXTsgcmV0dXJuIGUgPT0gbnVsbCA/IHIgOiBBcnJheS5wcm90b3R5cGUubWFwICYmIGUubWFwID09PSBBcnJheS5wcm90b3R5cGUubWFwID8gZS5tYXAobikgOiAoYyhlLCAoZSwgdCwgYSkgPT4geyByLnB1c2gobihlLCB0LCBhKSk7IH0pLCByKTsgfTsgY29uc3QgYSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5hdmlnYXRvci5tZWRpYURldmljZXMgJiYgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzOyB9OyBjb25zdCBuID0gZnVuY3Rpb24gKGUpIHsgY29uc3QgdCA9IFt3aW5kb3cuc2NyZWVuLndpZHRoLCB3aW5kb3cuc2NyZWVuLmhlaWdodF07IHJldHVybiBlLnNjcmVlbi5kZXRlY3RTY3JlZW5PcmllbnRhdGlvbiAmJiB0LnNvcnQoKS5yZXZlcnNlKCksIHQ7IH07IGNvbnN0IHIgPSBmdW5jdGlvbiAoZSkgeyBpZiAod2luZG93LnNjcmVlbi5hdmFpbFdpZHRoICYmIHdpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQpIHsgY29uc3QgdCA9IFt3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0LCB3aW5kb3cuc2NyZWVuLmF2YWlsV2lkdGhdOyByZXR1cm4gZS5zY3JlZW4uZGV0ZWN0U2NyZWVuT3JpZW50YXRpb24gJiYgdC5zb3J0KCkucmV2ZXJzZSgpLCB0OyB9IHJldHVybiBlLk5PVF9BVkFJTEFCTEU7IH07IGNvbnN0IGkgPSBmdW5jdGlvbiAoZSkgeyBpZiAobmF2aWdhdG9yLnBsdWdpbnMgPT0gbnVsbCkgcmV0dXJuIGUuTk9UX0FWQUlMQUJMRTsgZm9yICh2YXIgdCA9IFtdLCBhID0gMCwgbiA9IG5hdmlnYXRvci5wbHVnaW5zLmxlbmd0aDsgYSA8IG47IGErKyluYXZpZ2F0b3IucGx1Z2luc1thXSAmJiB0LnB1c2gobmF2aWdhdG9yLnBsdWdpbnNbYV0pOyByZXR1cm4gdShlKSAmJiAodCA9IHQuc29ydCgoZSwgdCkgPT4geyByZXR1cm4gZS5uYW1lID4gdC5uYW1lID8gMSA6IGUubmFtZSA8IHQubmFtZSA/IC0xIDogMDsgfSkpLCBzKHQsIChlKSA9PiB7IGNvbnN0IHQgPSBzKGUsIChlKSA9PiB7IHJldHVybiBbZS50eXBlLCBlLnN1ZmZpeGVzXTsgfSk7IHJldHVybiBbZS5uYW1lLCBlLmRlc2NyaXB0aW9uLCB0XTsgfSk7IH07IGNvbnN0IG8gPSBmdW5jdGlvbiAodCkgeyBsZXQgZSA9IFtdOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHdpbmRvdywgJ0FjdGl2ZVhPYmplY3QnKSB8fCAnQWN0aXZlWE9iamVjdCcgaW4gd2luZG93KSB7IGUgPSBzKFsnQWNyb1BERi5QREYnLCAnQWRvZGIuU3RyZWFtJywgJ0FnQ29udHJvbC5BZ0NvbnRyb2wnLCAnRGV2YWxWUlhDdHJsLkRldmFsVlJYQ3RybC4xJywgJ01hY3JvbWVkaWFGbGFzaFBhcGVyLk1hY3JvbWVkaWFGbGFzaFBhcGVyJywgJ01zeG1sMi5ET01Eb2N1bWVudCcsICdNc3htbDIuWE1MSFRUUCcsICdQREYuUGRmQ3RybCcsICdRdWlja1RpbWUuUXVpY2tUaW1lJywgJ1F1aWNrVGltZUNoZWNrT2JqZWN0LlF1aWNrVGltZUNoZWNrLjEnLCAnUmVhbFBsYXllcicsICdSZWFsUGxheWVyLlJlYWxQbGF5ZXIodG0pIEFjdGl2ZVggQ29udHJvbCAoMzItYml0KScsICdSZWFsVmlkZW8uUmVhbFZpZGVvKHRtKSBBY3RpdmVYIENvbnRyb2wgKDMyLWJpdCknLCAnU2NyaXB0aW5nLkRpY3Rpb25hcnknLCAnU1dDdGwuU1dDdGwnLCAnU2hlbGwuVUlIZWxwZXInLCAnU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2gnLCAnU2t5cGUuRGV0ZWN0aW9uJywgJ1REQ0N0bC5URENDdGwnLCAnV01QbGF5ZXIuT0NYJywgJ3Jtb2N4LlJlYWxQbGF5ZXIgRzIgQ29udHJvbCcsICdybW9jeC5SZWFsUGxheWVyIEcyIENvbnRyb2wuMSddLCAoZSkgPT4geyB0cnkgeyByZXR1cm4gbmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KGUpLCBlOyB9IGNhdGNoIChlKSB7IHJldHVybiB0LkVSUk9SOyB9IH0pOyB9IGVsc2UgZS5wdXNoKHQuTk9UX0FWQUlMQUJMRSk7IHJldHVybiBuYXZpZ2F0b3IucGx1Z2lucyAmJiAoZSA9IGUuY29uY2F0KGkodCkpKSwgZTsgfTsgdmFyIHUgPSBmdW5jdGlvbiAoZSkgeyBmb3IgKHZhciB0ID0gITEsIGEgPSAwLCBuID0gZS5wbHVnaW5zLnNvcnRQbHVnaW5zRm9yLmxlbmd0aDsgYSA8IG47IGErKykgeyBjb25zdCByID0gZS5wbHVnaW5zLnNvcnRQbHVnaW5zRm9yW2FdOyBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaChyKSkgeyB0ID0gITA7IGJyZWFrOyB9IH0gcmV0dXJuIHQ7IH07IGNvbnN0IHAgPSBmdW5jdGlvbiAodCkgeyB0cnkgeyByZXR1cm4gISF3aW5kb3cuc2Vzc2lvblN0b3JhZ2U7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIHQuRVJST1I7IH0gfTsgY29uc3QgdiA9IGZ1bmN0aW9uICh0KSB7IHRyeSB7IHJldHVybiAhIXdpbmRvdy5sb2NhbFN0b3JhZ2U7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIHQuRVJST1I7IH0gfTsgY29uc3QgQSA9IGZ1bmN0aW9uICh0KSB7IHRyeSB7IHJldHVybiAhIXdpbmRvdy5pbmRleGVkREI7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIHQuRVJST1I7IH0gfTsgY29uc3QgUyA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBuYXZpZ2F0b3IuaGFyZHdhcmVDb25jdXJyZW5jeSA/IG5hdmlnYXRvci5oYXJkd2FyZUNvbmN1cnJlbmN5IDogZS5OT1RfQVZBSUxBQkxFOyB9OyBjb25zdCBDID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIG5hdmlnYXRvci5jcHVDbGFzcyB8fCBlLk5PVF9BVkFJTEFCTEU7IH07IGNvbnN0IEIgPSBmdW5jdGlvbiAoZSkgeyByZXR1cm4gbmF2aWdhdG9yLnBsYXRmb3JtID8gbmF2aWdhdG9yLnBsYXRmb3JtIDogZS5OT1RfQVZBSUxBQkxFOyB9OyBjb25zdCB3ID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIG5hdmlnYXRvci5kb05vdFRyYWNrID8gbmF2aWdhdG9yLmRvTm90VHJhY2sgOiBuYXZpZ2F0b3IubXNEb05vdFRyYWNrID8gbmF2aWdhdG9yLm1zRG9Ob3RUcmFjayA6IHdpbmRvdy5kb05vdFRyYWNrID8gd2luZG93LmRvTm90VHJhY2sgOiBlLk5PVF9BVkFJTEFCTEU7IH07IGNvbnN0IHQgPSBmdW5jdGlvbiAoKSB7IGxldCB0OyBsZXQgZSA9IDA7IHZvaWQgMCAhPT0gbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID8gZSA9IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA6IHZvaWQgMCAhPT0gbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgJiYgKGUgPSBuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cyk7IHRyeSB7IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdUb3VjaEV2ZW50JyksIHQgPSAhMDsgfSBjYXRjaCAoZSkgeyB0ID0gITE7IH0gcmV0dXJuIFtlLCB0LCAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3ddOyB9OyBjb25zdCB5ID0gZnVuY3Rpb24gKGUpIHsgY29uc3QgdCA9IFtdOyBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7IGEud2lkdGggPSAyZTMsIGEuaGVpZ2h0ID0gMjAwLCBhLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJzsgY29uc3QgbiA9IGEuZ2V0Q29udGV4dCgnMmQnKTsgcmV0dXJuIG4ucmVjdCgwLCAwLCAxMCwgMTApLCBuLnJlY3QoMiwgMiwgNiwgNiksIHQucHVzaChgY2FudmFzIHdpbmRpbmc6JHshMSA9PT0gbi5pc1BvaW50SW5QYXRoKDUsIDUsICdldmVub2RkJykgPyAneWVzJyA6ICdubyd9YCksIG4udGV4dEJhc2VsaW5lID0gJ2FscGhhYmV0aWMnLCBuLmZpbGxTdHlsZSA9ICcjZjYwJywgbi5maWxsUmVjdCgxMjUsIDEsIDYyLCAyMCksIG4uZmlsbFN0eWxlID0gJyMwNjknLCBlLmRvbnRVc2VGYWtlRm9udEluQ2FudmFzID8gbi5mb250ID0gJzExcHQgQXJpYWwnIDogbi5mb250ID0gJzExcHQgbm8tcmVhbC1mb250LTEyMycsIG4uZmlsbFRleHQoJ0N3bSBmam9yZGJhbmsgZ2x5cGhzIHZleHQgcXVpeiwgXFx1ZDgzZFxcdWRlMDMnLCAyLCAxNSksIG4uZmlsbFN0eWxlID0gJ3JnYmEoMTAyLCAyMDQsIDAsIDAuMiknLCBuLmZvbnQgPSAnMThwdCBBcmlhbCcsIG4uZmlsbFRleHQoJ0N3bSBmam9yZGJhbmsgZ2x5cGhzIHZleHQgcXVpeiwgXFx1ZDgzZFxcdWRlMDMnLCA0LCA0NSksIG4uZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ211bHRpcGx5Jywgbi5maWxsU3R5bGUgPSAncmdiKDI1NSwwLDI1NSknLCBuLmJlZ2luUGF0aCgpLCBuLmFyYyg1MCwgNTAsIDUwLCAwLCAyICogTWF0aC5QSSwgITApLCBuLmNsb3NlUGF0aCgpLCBuLmZpbGwoKSwgbi5maWxsU3R5bGUgPSAncmdiKDAsMjU1LDI1NSknLCBuLmJlZ2luUGF0aCgpLCBuLmFyYygxMDAsIDUwLCA1MCwgMCwgMiAqIE1hdGguUEksICEwKSwgbi5jbG9zZVBhdGgoKSwgbi5maWxsKCksIG4uZmlsbFN0eWxlID0gJ3JnYigyNTUsMjU1LDApJywgbi5iZWdpblBhdGgoKSwgbi5hcmMoNzUsIDEwMCwgNTAsIDAsIDIgKiBNYXRoLlBJLCAhMCksIG4uY2xvc2VQYXRoKCksIG4uZmlsbCgpLCBuLmZpbGxTdHlsZSA9ICdyZ2IoMjU1LDAsMjU1KScsIG4uYXJjKDc1LCA3NSwgNzUsIDAsIDIgKiBNYXRoLlBJLCAhMCksIG4uYXJjKDc1LCA3NSwgMjUsIDAsIDIgKiBNYXRoLlBJLCAhMCksIG4uZmlsbCgnZXZlbm9kZCcpLCBhLnRvRGF0YVVSTCAmJiB0LnB1c2goYGNhbnZhcyBmcDoke2EudG9EYXRhVVJMKCl9YCksIHQ7IH07IGNvbnN0IEUgPSBmdW5jdGlvbiAoKSB7IGxldCBvOyBjb25zdCBlID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIG8uY2xlYXJDb2xvcigwLCAwLCAwLCAxKSwgby5lbmFibGUoby5ERVBUSF9URVNUKSwgby5kZXB0aEZ1bmMoby5MRVFVQUwpLCBvLmNsZWFyKG8uQ09MT1JfQlVGRkVSX0JJVCB8IG8uREVQVEhfQlVGRkVSX0JJVCksIGBbJHtlWzBdfSwgJHtlWzFdfV1gOyB9OyBpZiAoIShvID0gRigpKSkgcmV0dXJuIG51bGw7IGNvbnN0IGwgPSBbXTsgY29uc3QgdCA9IG8uY3JlYXRlQnVmZmVyKCk7IG8uYmluZEJ1ZmZlcihvLkFSUkFZX0JVRkZFUiwgdCk7IGNvbnN0IGEgPSBuZXcgRmxvYXQzMkFycmF5KFstMC4yLCAtMC45LCAwLCAwLjQsIC0wLjI2LCAwLCAwLCAwLjczMjEzNDQ0NCwgMF0pOyBvLmJ1ZmZlckRhdGEoby5BUlJBWV9CVUZGRVIsIGEsIG8uU1RBVElDX0RSQVcpLCB0Lml0ZW1TaXplID0gMywgdC5udW1JdGVtcyA9IDM7IGNvbnN0IG4gPSBvLmNyZWF0ZVByb2dyYW0oKTsgY29uc3QgciA9IG8uY3JlYXRlU2hhZGVyKG8uVkVSVEVYX1NIQURFUik7IG8uc2hhZGVyU291cmNlKHIsICdhdHRyaWJ1dGUgdmVjMiBhdHRyVmVydGV4O3ZhcnlpbmcgdmVjMiB2YXJ5aW5UZXhDb29yZGluYXRlO3VuaWZvcm0gdmVjMiB1bmlmb3JtT2Zmc2V0O3ZvaWQgbWFpbigpe3ZhcnlpblRleENvb3JkaW5hdGU9YXR0clZlcnRleCt1bmlmb3JtT2Zmc2V0O2dsX1Bvc2l0aW9uPXZlYzQoYXR0clZlcnRleCwwLDEpO30nKSwgby5jb21waWxlU2hhZGVyKHIpOyBjb25zdCBpID0gby5jcmVhdGVTaGFkZXIoby5GUkFHTUVOVF9TSEFERVIpOyBvLnNoYWRlclNvdXJjZShpLCAncHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7dmFyeWluZyB2ZWMyIHZhcnlpblRleENvb3JkaW5hdGU7dm9pZCBtYWluKCkge2dsX0ZyYWdDb2xvcj12ZWM0KHZhcnlpblRleENvb3JkaW5hdGUsMCwxKTt9JyksIG8uY29tcGlsZVNoYWRlcihpKSwgby5hdHRhY2hTaGFkZXIobiwgciksIG8uYXR0YWNoU2hhZGVyKG4sIGkpLCBvLmxpbmtQcm9ncmFtKG4pLCBvLnVzZVByb2dyYW0obiksIG4udmVydGV4UG9zQXR0cmliID0gby5nZXRBdHRyaWJMb2NhdGlvbihuLCAnYXR0clZlcnRleCcpLCBuLm9mZnNldFVuaWZvcm0gPSBvLmdldFVuaWZvcm1Mb2NhdGlvbihuLCAndW5pZm9ybU9mZnNldCcpLCBvLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KG4udmVydGV4UG9zQXJyYXkpLCBvLnZlcnRleEF0dHJpYlBvaW50ZXIobi52ZXJ0ZXhQb3NBdHRyaWIsIHQuaXRlbVNpemUsIG8uRkxPQVQsICExLCAwLCAwKSwgby51bmlmb3JtMmYobi5vZmZzZXRVbmlmb3JtLCAxLCAxKSwgby5kcmF3QXJyYXlzKG8uVFJJQU5HTEVfU1RSSVAsIDAsIHQubnVtSXRlbXMpOyB0cnkgeyBsLnB1c2goby5jYW52YXMudG9EYXRhVVJMKCkpOyB9IGNhdGNoIChlKSB7fWwucHVzaChgZXh0ZW5zaW9uczokeyhvLmdldFN1cHBvcnRlZEV4dGVuc2lvbnMoKSB8fCBbXSkuam9pbignOycpfWApLCBsLnB1c2goYHdlYmdsIGFsaWFzZWQgbGluZSB3aWR0aCByYW5nZToke2Uoby5nZXRQYXJhbWV0ZXIoby5BTElBU0VEX0xJTkVfV0lEVEhfUkFOR0UpKX1gKSwgbC5wdXNoKGB3ZWJnbCBhbGlhc2VkIHBvaW50IHNpemUgcmFuZ2U6JHtlKG8uZ2V0UGFyYW1ldGVyKG8uQUxJQVNFRF9QT0lOVF9TSVpFX1JBTkdFKSl9YCksIGwucHVzaChgd2ViZ2wgYWxwaGEgYml0czoke28uZ2V0UGFyYW1ldGVyKG8uQUxQSEFfQklUUyl9YCksIGwucHVzaChgd2ViZ2wgYW50aWFsaWFzaW5nOiR7by5nZXRDb250ZXh0QXR0cmlidXRlcygpLmFudGlhbGlhcyA/ICd5ZXMnIDogJ25vJ31gKSwgbC5wdXNoKGB3ZWJnbCBibHVlIGJpdHM6JHtvLmdldFBhcmFtZXRlcihvLkJMVUVfQklUUyl9YCksIGwucHVzaChgd2ViZ2wgZGVwdGggYml0czoke28uZ2V0UGFyYW1ldGVyKG8uREVQVEhfQklUUyl9YCksIGwucHVzaChgd2ViZ2wgZ3JlZW4gYml0czoke28uZ2V0UGFyYW1ldGVyKG8uR1JFRU5fQklUUyl9YCksIGwucHVzaChgd2ViZ2wgbWF4IGFuaXNvdHJvcHk6JHsoZnVuY3Rpb24gKGUpIHsgY29uc3QgdCA9IGUuZ2V0RXh0ZW5zaW9uKCdFWFRfdGV4dHVyZV9maWx0ZXJfYW5pc290cm9waWMnKSB8fCBlLmdldEV4dGVuc2lvbignV0VCS0lUX0VYVF90ZXh0dXJlX2ZpbHRlcl9hbmlzb3Ryb3BpYycpIHx8IGUuZ2V0RXh0ZW5zaW9uKCdNT1pfRVhUX3RleHR1cmVfZmlsdGVyX2FuaXNvdHJvcGljJyk7IGlmICh0KSB7IGxldCBhID0gZS5nZXRQYXJhbWV0ZXIodC5NQVhfVEVYVFVSRV9NQVhfQU5JU09UUk9QWV9FWFQpOyByZXR1cm4gYSA9PT0gMCAmJiAoYSA9IDIpLCBhOyB9IHJldHVybiBudWxsOyB9KG8pKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggY29tYmluZWQgdGV4dHVyZSBpbWFnZSB1bml0czoke28uZ2V0UGFyYW1ldGVyKG8uTUFYX0NPTUJJTkVEX1RFWFRVUkVfSU1BR0VfVU5JVFMpfWApLCBsLnB1c2goYHdlYmdsIG1heCBjdWJlIG1hcCB0ZXh0dXJlIHNpemU6JHtvLmdldFBhcmFtZXRlcihvLk1BWF9DVUJFX01BUF9URVhUVVJFX1NJWkUpfWApLCBsLnB1c2goYHdlYmdsIG1heCBmcmFnbWVudCB1bmlmb3JtIHZlY3RvcnM6JHtvLmdldFBhcmFtZXRlcihvLk1BWF9GUkFHTUVOVF9VTklGT1JNX1ZFQ1RPUlMpfWApLCBsLnB1c2goYHdlYmdsIG1heCByZW5kZXIgYnVmZmVyIHNpemU6JHtvLmdldFBhcmFtZXRlcihvLk1BWF9SRU5ERVJCVUZGRVJfU0laRSl9YCksIGwucHVzaChgd2ViZ2wgbWF4IHRleHR1cmUgaW1hZ2UgdW5pdHM6JHtvLmdldFBhcmFtZXRlcihvLk1BWF9URVhUVVJFX0lNQUdFX1VOSVRTKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggdGV4dHVyZSBzaXplOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfVEVYVFVSRV9TSVpFKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggdmFyeWluZyB2ZWN0b3JzOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfVkFSWUlOR19WRUNUT1JTKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggdmVydGV4IGF0dHJpYnM6JHtvLmdldFBhcmFtZXRlcihvLk1BWF9WRVJURVhfQVRUUklCUyl9YCksIGwucHVzaChgd2ViZ2wgbWF4IHZlcnRleCB0ZXh0dXJlIGltYWdlIHVuaXRzOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfVkVSVEVYX1RFWFRVUkVfSU1BR0VfVU5JVFMpfWApLCBsLnB1c2goYHdlYmdsIG1heCB2ZXJ0ZXggdW5pZm9ybSB2ZWN0b3JzOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfVkVSVEVYX1VOSUZPUk1fVkVDVE9SUyl9YCksIGwucHVzaChgd2ViZ2wgbWF4IHZpZXdwb3J0IGRpbXM6JHtlKG8uZ2V0UGFyYW1ldGVyKG8uTUFYX1ZJRVdQT1JUX0RJTVMpKX1gKSwgbC5wdXNoKGB3ZWJnbCByZWQgYml0czoke28uZ2V0UGFyYW1ldGVyKG8uUkVEX0JJVFMpfWApLCBsLnB1c2goYHdlYmdsIHJlbmRlcmVyOiR7by5nZXRQYXJhbWV0ZXIoby5SRU5ERVJFUil9YCksIGwucHVzaChgd2ViZ2wgc2hhZGluZyBsYW5ndWFnZSB2ZXJzaW9uOiR7by5nZXRQYXJhbWV0ZXIoby5TSEFESU5HX0xBTkdVQUdFX1ZFUlNJT04pfWApLCBsLnB1c2goYHdlYmdsIHN0ZW5jaWwgYml0czoke28uZ2V0UGFyYW1ldGVyKG8uU1RFTkNJTF9CSVRTKX1gKSwgbC5wdXNoKGB3ZWJnbCB2ZW5kb3I6JHtvLmdldFBhcmFtZXRlcihvLlZFTkRPUil9YCksIGwucHVzaChgd2ViZ2wgdmVyc2lvbjoke28uZ2V0UGFyYW1ldGVyKG8uVkVSU0lPTil9YCk7IHRyeSB7IGNvbnN0IHMgPSBvLmdldEV4dGVuc2lvbignV0VCR0xfZGVidWdfcmVuZGVyZXJfaW5mbycpOyBzICYmIChsLnB1c2goYHdlYmdsIHVubWFza2VkIHZlbmRvcjoke28uZ2V0UGFyYW1ldGVyKHMuVU5NQVNLRURfVkVORE9SX1dFQkdMKX1gKSwgbC5wdXNoKGB3ZWJnbCB1bm1hc2tlZCByZW5kZXJlcjoke28uZ2V0UGFyYW1ldGVyKHMuVU5NQVNLRURfUkVOREVSRVJfV0VCR0wpfWApKTsgfSBjYXRjaCAoZSkge30gcmV0dXJuIG8uZ2V0U2hhZGVyUHJlY2lzaW9uRm9ybWF0ICYmIGMoWydGTE9BVCcsICdJTlQnXSwgKGkpID0+IHsgYyhbJ1ZFUlRFWCcsICdGUkFHTUVOVCddLCAocikgPT4geyBjKFsnSElHSCcsICdNRURJVU0nLCAnTE9XJ10sIChuKSA9PiB7IGMoWydwcmVjaXNpb24nLCAncmFuZ2VNaW4nLCAncmFuZ2VNYXgnXSwgKGUpID0+IHsgY29uc3QgdCA9IG8uZ2V0U2hhZGVyUHJlY2lzaW9uRm9ybWF0KG9bYCR7cn1fU0hBREVSYF0sIG9bYCR7bn1fJHtpfWBdKVtlXTsgZSAhPT0gJ3ByZWNpc2lvbicgJiYgKGUgPSBgcHJlY2lzaW9uICR7ZX1gKTsgY29uc3QgYSA9IFsnd2ViZ2wgJywgci50b0xvd2VyQ2FzZSgpLCAnIHNoYWRlciAnLCBuLnRvTG93ZXJDYXNlKCksICcgJywgaS50b0xvd2VyQ2FzZSgpLCAnICcsIGUsICc6JywgdF0uam9pbignJyk7IGwucHVzaChhKTsgfSk7IH0pOyB9KTsgfSksIGw7IH07IGNvbnN0IE0gPSBmdW5jdGlvbiAoKSB7IHRyeSB7IGNvbnN0IGUgPSBGKCk7IGNvbnN0IHQgPSBlLmdldEV4dGVuc2lvbignV0VCR0xfZGVidWdfcmVuZGVyZXJfaW5mbycpOyByZXR1cm4gYCR7ZS5nZXRQYXJhbWV0ZXIodC5VTk1BU0tFRF9WRU5ET1JfV0VCR0wpfX4ke2UuZ2V0UGFyYW1ldGVyKHQuVU5NQVNLRURfUkVOREVSRVJfV0VCR0wpfWA7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIG51bGw7IH0gfTsgY29uc3QgeCA9IGZ1bmN0aW9uICgpIHsgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyBlLmlubmVySFRNTCA9ICcmbmJzcDsnOyBsZXQgdCA9ICEoZS5jbGFzc05hbWUgPSAnYWRzYm94Jyk7IHRyeSB7IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZSksIHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhZHNib3gnKVswXS5vZmZzZXRIZWlnaHQgPT09IDAsIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZSk7IH0gY2F0Y2ggKGUpIHsgdCA9ICExOyB9IHJldHVybiB0OyB9OyBjb25zdCBPID0gZnVuY3Rpb24gKCkgeyBpZiAodm9pZCAwICE9PSBuYXZpZ2F0b3IubGFuZ3VhZ2VzKSB0cnkgeyBpZiAobmF2aWdhdG9yLmxhbmd1YWdlc1swXS5zdWJzdHIoMCwgMikgIT09IG5hdmlnYXRvci5sYW5ndWFnZS5zdWJzdHIoMCwgMikpIHJldHVybiAhMDsgfSBjYXRjaCAoZSkgeyByZXR1cm4gITA7IH0gcmV0dXJuICExOyB9OyBjb25zdCBiID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93LnNjcmVlbi53aWR0aCA8IHdpbmRvdy5zY3JlZW4uYXZhaWxXaWR0aCB8fCB3aW5kb3cuc2NyZWVuLmhlaWdodCA8IHdpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQ7IH07IGNvbnN0IFAgPSBmdW5jdGlvbiAoKSB7IGxldCBlOyBjb25zdCB0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpOyBsZXQgYSA9IG5hdmlnYXRvci5vc2NwdTsgY29uc3QgbiA9IG5hdmlnYXRvci5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpOyBpZiAoZSA9IHQuaW5kZXhPZignd2luZG93cyBwaG9uZScpID49IDAgPyAnV2luZG93cyBQaG9uZScgOiB0LmluZGV4T2YoJ3dpbicpID49IDAgPyAnV2luZG93cycgOiB0LmluZGV4T2YoJ2FuZHJvaWQnKSA+PSAwID8gJ0FuZHJvaWQnIDogdC5pbmRleE9mKCdsaW51eCcpID49IDAgfHwgdC5pbmRleE9mKCdjcm9zJykgPj0gMCA/ICdMaW51eCcgOiB0LmluZGV4T2YoJ2lwaG9uZScpID49IDAgfHwgdC5pbmRleE9mKCdpcGFkJykgPj0gMCA/ICdpT1MnIDogdC5pbmRleE9mKCdtYWMnKSA+PSAwID8gJ01hYycgOiAnT3RoZXInLCAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDAgfHwgbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgPiAwKSAmJiBlICE9PSAnV2luZG93cyBQaG9uZScgJiYgZSAhPT0gJ0FuZHJvaWQnICYmIGUgIT09ICdpT1MnICYmIGUgIT09ICdPdGhlcicpIHJldHVybiAhMDsgaWYgKHZvaWQgMCAhPT0gYSkgeyBpZiAoKGEgPSBhLnRvTG93ZXJDYXNlKCkpLmluZGV4T2YoJ3dpbicpID49IDAgJiYgZSAhPT0gJ1dpbmRvd3MnICYmIGUgIT09ICdXaW5kb3dzIFBob25lJykgcmV0dXJuICEwOyBpZiAoYS5pbmRleE9mKCdsaW51eCcpID49IDAgJiYgZSAhPT0gJ0xpbnV4JyAmJiBlICE9PSAnQW5kcm9pZCcpIHJldHVybiAhMDsgaWYgKGEuaW5kZXhPZignbWFjJykgPj0gMCAmJiBlICE9PSAnTWFjJyAmJiBlICE9PSAnaU9TJykgcmV0dXJuICEwOyBpZiAoKGEuaW5kZXhPZignd2luJykgPT09IC0xICYmIGEuaW5kZXhPZignbGludXgnKSA9PT0gLTEgJiYgYS5pbmRleE9mKCdtYWMnKSA9PT0gLTEpICE9IChlID09PSAnT3RoZXInKSkgcmV0dXJuICEwOyB9IHJldHVybiBuLmluZGV4T2YoJ3dpbicpID49IDAgJiYgZSAhPT0gJ1dpbmRvd3MnICYmIGUgIT09ICdXaW5kb3dzIFBob25lJyB8fCAoKG4uaW5kZXhPZignbGludXgnKSA+PSAwIHx8IG4uaW5kZXhPZignYW5kcm9pZCcpID49IDAgfHwgbi5pbmRleE9mKCdwaWtlJykgPj0gMCkgJiYgZSAhPT0gJ0xpbnV4JyAmJiBlICE9PSAnQW5kcm9pZCcgfHwgKChuLmluZGV4T2YoJ21hYycpID49IDAgfHwgbi5pbmRleE9mKCdpcGFkJykgPj0gMCB8fCBuLmluZGV4T2YoJ2lwb2QnKSA+PSAwIHx8IG4uaW5kZXhPZignaXBob25lJykgPj0gMCkgJiYgZSAhPT0gJ01hYycgJiYgZSAhPT0gJ2lPUycgfHwgKChuLmluZGV4T2YoJ3dpbicpIDwgMCAmJiBuLmluZGV4T2YoJ2xpbnV4JykgPCAwICYmIG4uaW5kZXhPZignbWFjJykgPCAwICYmIG4uaW5kZXhPZignaXBob25lJykgPCAwICYmIG4uaW5kZXhPZignaXBhZCcpIDwgMCkgIT09IChlID09PSAnT3RoZXInKSB8fCB2b2lkIDAgPT09IG5hdmlnYXRvci5wbHVnaW5zICYmIGUgIT09ICdXaW5kb3dzJyAmJiBlICE9PSAnV2luZG93cyBQaG9uZScpKSk7IH07IGNvbnN0IEwgPSBmdW5jdGlvbiAoKSB7IGxldCBlOyBjb25zdCB0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpOyBjb25zdCBhID0gbmF2aWdhdG9yLnByb2R1Y3RTdWI7IGlmICgoKGUgPSB0LmluZGV4T2YoJ2ZpcmVmb3gnKSA+PSAwID8gJ0ZpcmVmb3gnIDogdC5pbmRleE9mKCdvcGVyYScpID49IDAgfHwgdC5pbmRleE9mKCdvcHInKSA+PSAwID8gJ09wZXJhJyA6IHQuaW5kZXhPZignY2hyb21lJykgPj0gMCA/ICdDaHJvbWUnIDogdC5pbmRleE9mKCdzYWZhcmknKSA+PSAwID8gJ1NhZmFyaScgOiB0LmluZGV4T2YoJ3RyaWRlbnQnKSA+PSAwID8gJ0ludGVybmV0IEV4cGxvcmVyJyA6ICdPdGhlcicpID09PSAnQ2hyb21lJyB8fCBlID09PSAnU2FmYXJpJyB8fCBlID09PSAnT3BlcmEnKSAmJiBhICE9PSAnMjAwMzAxMDcnKSByZXR1cm4gITA7IGxldCBuOyBjb25zdCByID0gZXZhbC50b1N0cmluZygpLmxlbmd0aDsgaWYgKHIgPT09IDM3ICYmIGUgIT09ICdTYWZhcmknICYmIGUgIT09ICdGaXJlZm94JyAmJiBlICE9PSAnT3RoZXInKSByZXR1cm4gITA7IGlmIChyID09PSAzOSAmJiBlICE9PSAnSW50ZXJuZXQgRXhwbG9yZXInICYmIGUgIT09ICdPdGhlcicpIHJldHVybiAhMDsgaWYgKHIgPT09IDMzICYmIGUgIT09ICdDaHJvbWUnICYmIGUgIT09ICdPcGVyYScgJiYgZSAhPT0gJ090aGVyJykgcmV0dXJuICEwOyB0cnkgeyB0aHJvdyAnYSc7IH0gY2F0Y2ggKGUpIHsgdHJ5IHsgZS50b1NvdXJjZSgpLCBuID0gITA7IH0gY2F0Y2ggKGUpIHsgbiA9ICExOyB9IH0gcmV0dXJuIG4gJiYgZSAhPT0gJ0ZpcmVmb3gnICYmIGUgIT09ICdPdGhlcic7IH07IGNvbnN0IEkgPSBmdW5jdGlvbiAoKSB7IGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTsgcmV0dXJuICEoIWUuZ2V0Q29udGV4dCB8fCAhZS5nZXRDb250ZXh0KCcyZCcpKTsgfTsgY29uc3QgayA9IGZ1bmN0aW9uICgpIHsgaWYgKCFJKCkpIHJldHVybiAhMTsgY29uc3QgZSA9IEYoKTsgcmV0dXJuICEhd2luZG93LldlYkdMUmVuZGVyaW5nQ29udGV4dCAmJiAhIWU7IH07IGNvbnN0IFIgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuYXZpZ2F0b3IuYXBwTmFtZSA9PT0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlcicgfHwgIShuYXZpZ2F0b3IuYXBwTmFtZSAhPT0gJ05ldHNjYXBlJyB8fCAhL1RyaWRlbnQvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpOyB9OyBjb25zdCBEID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdm9pZCAwICE9PSB3aW5kb3cuc3dmb2JqZWN0OyB9OyBjb25zdCBOID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93LnN3Zm9iamVjdC5oYXNGbGFzaFBsYXllclZlcnNpb24oJzkuMC4wJyk7IH07IGNvbnN0IF8gPSBmdW5jdGlvbiAodCwgZSkgeyBjb25zdCBhID0gJ19fX2ZwX3N3Zl9sb2FkZWQnOyB3aW5kb3dbYV0gPSBmdW5jdGlvbiAoZSkgeyB0KGUpOyB9OyBsZXQgbjsgbGV0IHI7IGNvbnN0IGkgPSBlLmZvbnRzLnN3ZkNvbnRhaW5lcklkOyAociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKS5zZXRBdHRyaWJ1dGUoJ2lkJywgbi5mb250cy5zd2ZDb250YWluZXJJZCksIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocik7IGNvbnN0IG8gPSB7IG9uUmVhZHk6IGEgfTsgd2luZG93LnN3Zm9iamVjdC5lbWJlZFNXRihlLmZvbnRzLnN3ZlBhdGgsIGksICcxJywgJzEnLCAnOS4wLjAnLCAhMSwgbywgeyBhbGxvd1NjcmlwdEFjY2VzczogJ2Fsd2F5cycsIG1lbnU6ICdmYWxzZScgfSwge30pOyB9OyB2YXIgRiA9IGZ1bmN0aW9uICgpIHsgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOyBsZXQgdCA9IG51bGw7IHRyeSB7IHQgPSBlLmdldENvbnRleHQoJ3dlYmdsJykgfHwgZS5nZXRDb250ZXh0KCdleHBlcmltZW50YWwtd2ViZ2wnKTsgfSBjYXRjaCAoZSkge30gcmV0dXJuIHQgfHwgKHQgPSBudWxsKSwgdDsgfTsgY29uc3QgRyA9IFt7IGtleTogJ3VzZXJBZ2VudCcsIGdldERhdGEoZSkgeyBlKG5hdmlnYXRvci51c2VyQWdlbnQpOyB9IH0sIHsga2V5OiAnd2ViZHJpdmVyJywgZ2V0RGF0YShlLCB0KSB7IGUobmF2aWdhdG9yLndlYmRyaXZlciA9PSBudWxsID8gdC5OT1RfQVZBSUxBQkxFIDogbmF2aWdhdG9yLndlYmRyaXZlcik7IH0gfSwgeyBrZXk6ICdsYW5ndWFnZScsIGdldERhdGEoZSwgdCkgeyBlKG5hdmlnYXRvci5sYW5ndWFnZSB8fCBuYXZpZ2F0b3IudXNlckxhbmd1YWdlIHx8IG5hdmlnYXRvci5icm93c2VyTGFuZ3VhZ2UgfHwgbmF2aWdhdG9yLnN5c3RlbUxhbmd1YWdlIHx8IHQuTk9UX0FWQUlMQUJMRSk7IH0gfSwgeyBrZXk6ICdjb2xvckRlcHRoJywgZ2V0RGF0YShlLCB0KSB7IGUod2luZG93LnNjcmVlbi5jb2xvckRlcHRoIHx8IHQuTk9UX0FWQUlMQUJMRSk7IH0gfSwgeyBrZXk6ICdkZXZpY2VNZW1vcnknLCBnZXREYXRhKGUsIHQpIHsgZShuYXZpZ2F0b3IuZGV2aWNlTWVtb3J5IHx8IHQuTk9UX0FWQUlMQUJMRSk7IH0gfSwgeyBrZXk6ICdwaXhlbFJhdGlvJywgZ2V0RGF0YShlLCB0KSB7IGUod2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgdC5OT1RfQVZBSUxBQkxFKTsgfSB9LCB7IGtleTogJ2hhcmR3YXJlQ29uY3VycmVuY3knLCBnZXREYXRhKGUsIHQpIHsgZShTKHQpKTsgfSB9LCB7IGtleTogJ3NjcmVlblJlc29sdXRpb24nLCBnZXREYXRhKGUsIHQpIHsgZShuKHQpKTsgfSB9LCB7IGtleTogJ2F2YWlsYWJsZVNjcmVlblJlc29sdXRpb24nLCBnZXREYXRhKGUsIHQpIHsgZShyKHQpKTsgfSB9LCB7IGtleTogJ3RpbWV6b25lT2Zmc2V0JywgZ2V0RGF0YShlKSB7IGUoKG5ldyBEYXRlKCkpLmdldFRpbWV6b25lT2Zmc2V0KCkpOyB9IH0sIHsga2V5OiAndGltZXpvbmUnLCBnZXREYXRhKGUsIHQpIHsgd2luZG93LkludGwgJiYgd2luZG93LkludGwuRGF0ZVRpbWVGb3JtYXQgPyBlKChuZXcgd2luZG93LkludGwuRGF0ZVRpbWVGb3JtYXQoKSkucmVzb2x2ZWRPcHRpb25zKCkudGltZVpvbmUpIDogZSh0Lk5PVF9BVkFJTEFCTEUpOyB9IH0sIHsga2V5OiAnc2Vzc2lvblN0b3JhZ2UnLCBnZXREYXRhKGUsIHQpIHsgZShwKHQpKTsgfSB9LCB7IGtleTogJ2xvY2FsU3RvcmFnZScsIGdldERhdGEoZSwgdCkgeyBlKHYodCkpOyB9IH0sIHsga2V5OiAnaW5kZXhlZERiJywgZ2V0RGF0YShlLCB0KSB7IGUoQSh0KSk7IH0gfSwgeyBrZXk6ICdhZGRCZWhhdmlvcicsIGdldERhdGEoZSkgeyBlKCEoIWRvY3VtZW50LmJvZHkgfHwgIWRvY3VtZW50LmJvZHkuYWRkQmVoYXZpb3IpKTsgfSB9LCB7IGtleTogJ29wZW5EYXRhYmFzZScsIGdldERhdGEoZSkgeyBlKCEhd2luZG93Lm9wZW5EYXRhYmFzZSk7IH0gfSwgeyBrZXk6ICdjcHVDbGFzcycsIGdldERhdGEoZSwgdCkgeyBlKEModCkpOyB9IH0sIHsga2V5OiAncGxhdGZvcm0nLCBnZXREYXRhKGUsIHQpIHsgZShCKHQpKTsgfSB9LCB7IGtleTogJ2RvTm90VHJhY2snLCBnZXREYXRhKGUsIHQpIHsgZSh3KHQpKTsgfSB9LCB7IGtleTogJ3BsdWdpbnMnLCBnZXREYXRhKGUsIHQpIHsgUigpID8gdC5wbHVnaW5zLmV4Y2x1ZGVJRSA/IGUodC5FWENMVURFRCkgOiBlKG8odCkpIDogZShpKHQpKTsgfSB9LCB7IGtleTogJ2NhbnZhcycsIGdldERhdGEoZSwgdCkgeyBJKCkgPyBlKHkodCkpIDogZSh0Lk5PVF9BVkFJTEFCTEUpOyB9IH0sIHsga2V5OiAnd2ViZ2wnLCBnZXREYXRhKGUsIHQpIHsgaygpID8gZShFKCkpIDogZSh0Lk5PVF9BVkFJTEFCTEUpOyB9IH0sIHsga2V5OiAnd2ViZ2xWZW5kb3JBbmRSZW5kZXJlcicsIGdldERhdGEoZSkgeyBrKCkgPyBlKE0oKSkgOiBlKCk7IH0gfSwgeyBrZXk6ICdhZEJsb2NrJywgZ2V0RGF0YShlKSB7IGUoeCgpKTsgfSB9LCB7IGtleTogJ2hhc0xpZWRMYW5ndWFnZXMnLCBnZXREYXRhKGUpIHsgZShPKCkpOyB9IH0sIHsga2V5OiAnaGFzTGllZFJlc29sdXRpb24nLCBnZXREYXRhKGUpIHsgZShiKCkpOyB9IH0sIHsga2V5OiAnaGFzTGllZE9zJywgZ2V0RGF0YShlKSB7IGUoUCgpKTsgfSB9LCB7IGtleTogJ2hhc0xpZWRCcm93c2VyJywgZ2V0RGF0YShlKSB7IGUoTCgpKTsgfSB9LCB7IGtleTogJ3RvdWNoU3VwcG9ydCcsIGdldERhdGEoZSkgeyBlKHQoKSk7IH0gfSwgeyBrZXk6ICdmb250cycsIGdldERhdGEoZSwgdCkgeyBjb25zdCB1ID0gWydtb25vc3BhY2UnLCAnc2Fucy1zZXJpZicsICdzZXJpZiddOyBsZXQgZCA9IFsnQW5kYWxlIE1vbm8nLCAnQXJpYWwnLCAnQXJpYWwgQmxhY2snLCAnQXJpYWwgSGVicmV3JywgJ0FyaWFsIE1UJywgJ0FyaWFsIE5hcnJvdycsICdBcmlhbCBSb3VuZGVkIE1UIEJvbGQnLCAnQXJpYWwgVW5pY29kZSBNUycsICdCaXRzdHJlYW0gVmVyYSBTYW5zIE1vbm8nLCAnQm9vayBBbnRpcXVhJywgJ0Jvb2ttYW4gT2xkIFN0eWxlJywgJ0NhbGlicmknLCAnQ2FtYnJpYScsICdDYW1icmlhIE1hdGgnLCAnQ2VudHVyeScsICdDZW50dXJ5IEdvdGhpYycsICdDZW50dXJ5IFNjaG9vbGJvb2snLCAnQ29taWMgU2FucycsICdDb21pYyBTYW5zIE1TJywgJ0NvbnNvbGFzJywgJ0NvdXJpZXInLCAnQ291cmllciBOZXcnLCAnR2VuZXZhJywgJ0dlb3JnaWEnLCAnSGVsdmV0aWNhJywgJ0hlbHZldGljYSBOZXVlJywgJ0ltcGFjdCcsICdMdWNpZGEgQnJpZ2h0JywgJ0x1Y2lkYSBDYWxsaWdyYXBoeScsICdMdWNpZGEgQ29uc29sZScsICdMdWNpZGEgRmF4JywgJ0xVQ0lEQSBHUkFOREUnLCAnTHVjaWRhIEhhbmR3cml0aW5nJywgJ0x1Y2lkYSBTYW5zJywgJ0x1Y2lkYSBTYW5zIFR5cGV3cml0ZXInLCAnTHVjaWRhIFNhbnMgVW5pY29kZScsICdNaWNyb3NvZnQgU2FucyBTZXJpZicsICdNb25hY28nLCAnTW9ub3R5cGUgQ29yc2l2YScsICdNUyBHb3RoaWMnLCAnTVMgT3V0bG9vaycsICdNUyBQR290aGljJywgJ01TIFJlZmVyZW5jZSBTYW5zIFNlcmlmJywgJ01TIFNhbnMgU2VyaWYnLCAnTVMgU2VyaWYnLCAnTVlSSUFEJywgJ01ZUklBRCBQUk8nLCAnUGFsYXRpbm8nLCAnUGFsYXRpbm8gTGlub3R5cGUnLCAnU2Vnb2UgUHJpbnQnLCAnU2Vnb2UgU2NyaXB0JywgJ1NlZ29lIFVJJywgJ1NlZ29lIFVJIExpZ2h0JywgJ1NlZ29lIFVJIFNlbWlib2xkJywgJ1NlZ29lIFVJIFN5bWJvbCcsICdUYWhvbWEnLCAnVGltZXMnLCAnVGltZXMgTmV3IFJvbWFuJywgJ1RpbWVzIE5ldyBSb21hbiBQUycsICdUcmVidWNoZXQgTVMnLCAnVmVyZGFuYScsICdXaW5nZGluZ3MnLCAnV2luZ2RpbmdzIDInLCAnV2luZ2RpbmdzIDMnXTsgdC5mb250cy5leHRlbmRlZEpzRm9udHMgJiYgKGQgPSBkLmNvbmNhdChbJ0FiYWRpIE1UIENvbmRlbnNlZCBMaWdodCcsICdBY2FkZW15IEVuZ3JhdmVkIExFVCcsICdBRE9CRSBDQVNMT04gUFJPJywgJ0Fkb2JlIEdhcmFtb25kJywgJ0FET0JFIEdBUkFNT05EIFBSTycsICdBZ2VuY3kgRkInLCAnQWhhcm9uaScsICdBbGJlcnR1cyBFeHRyYSBCb2xkJywgJ0FsYmVydHVzIE1lZGl1bScsICdBbGdlcmlhbicsICdBbWF6b25lIEJUJywgJ0FtZXJpY2FuIFR5cGV3cml0ZXInLCAnQW1lcmljYW4gVHlwZXdyaXRlciBDb25kZW5zZWQnLCAnQW1lclR5cGUgTWQgQlQnLCAnQW5kYWx1cycsICdBbmdzYW5hIE5ldycsICdBbmdzYW5hVVBDJywgJ0FudGlxdWUgT2xpdmUnLCAnQXBhcmFqaXRhJywgJ0FwcGxlIENoYW5jZXJ5JywgJ0FwcGxlIENvbG9yIEVtb2ppJywgJ0FwcGxlIFNEIEdvdGhpYyBOZW8nLCAnQXJhYmljIFR5cGVzZXR0aW5nJywgJ0FSQ0hFUicsICdBUk5PIFBSTycsICdBcnJ1cyBCVCcsICdBdXJvcmEgQ24gQlQnLCAnQXZhbnRHYXJkZSBCayBCVCcsICdBdmFudEdhcmRlIE1kIEJUJywgJ0FWRU5JUicsICdBeXV0aGF5YScsICdCYW5keScsICdCYW5nbGEgU2FuZ2FtIE1OJywgJ0JhbmsgR290aGljJywgJ0JhbmtHb3RoaWMgTWQgQlQnLCAnQmFza2VydmlsbGUnLCAnQmFza2VydmlsbGUgT2xkIEZhY2UnLCAnQmF0YW5nJywgJ0JhdGFuZ0NoZScsICdCYXVlciBCb2RvbmknLCAnQmF1aGF1cyA5MycsICdCYXpvb2thJywgJ0JlbGwgTVQnLCAnQmVtYm8nLCAnQmVuZ3VpYXQgQmsgQlQnLCAnQmVybGluIFNhbnMgRkInLCAnQmVybGluIFNhbnMgRkIgRGVtaScsICdCZXJuYXJkIE1UIENvbmRlbnNlZCcsICdCZXJuaGFyZEZhc2hpb24gQlQnLCAnQmVybmhhcmRNb2QgQlQnLCAnQmlnIENhc2xvbicsICdCaW5uZXJEJywgJ0JsYWNrYWRkZXIgSVRDJywgJ0JsYWlyTWRJVEMgVFQnLCAnQm9kb25pIDcyJywgJ0JvZG9uaSA3MiBPbGRzdHlsZScsICdCb2RvbmkgNzIgU21hbGxjYXBzJywgJ0JvZG9uaSBNVCcsICdCb2RvbmkgTVQgQmxhY2snLCAnQm9kb25pIE1UIENvbmRlbnNlZCcsICdCb2RvbmkgTVQgUG9zdGVyIENvbXByZXNzZWQnLCAnQm9va3NoZWxmIFN5bWJvbCA3JywgJ0JvdWxkZXInLCAnQnJhZGxleSBIYW5kJywgJ0JyYWRsZXkgSGFuZCBJVEMnLCAnQnJlbWVuIEJkIEJUJywgJ0JyaXRhbm5pYyBCb2xkJywgJ0Jyb2Fkd2F5JywgJ0Jyb3dhbGxpYSBOZXcnLCAnQnJvd2FsbGlhVVBDJywgJ0JydXNoIFNjcmlwdCBNVCcsICdDYWxpZm9ybmlhbiBGQicsICdDYWxpc3RvIE1UJywgJ0NhbGxpZ3JhcGhlcicsICdDYW5kYXJhJywgJ0Nhc2xvbk9wbmZhY2UgQlQnLCAnQ2FzdGVsbGFyJywgJ0NlbnRhdXInLCAnQ2V6YW5uZScsICdDRyBPbWVnYScsICdDRyBUaW1lcycsICdDaGFsa2JvYXJkJywgJ0NoYWxrYm9hcmQgU0UnLCAnQ2hhbGtkdXN0ZXInLCAnQ2hhcmxlc3dvcnRoJywgJ0NoYXJ0ZXIgQmQgQlQnLCAnQ2hhcnRlciBCVCcsICdDaGF1Y2VyJywgJ0NoZWx0aG1JVEMgQmsgQlQnLCAnQ2hpbGxlcicsICdDbGFyZW5kb24nLCAnQ2xhcmVuZG9uIENvbmRlbnNlZCcsICdDbG9pc3RlckJsYWNrIEJUJywgJ0NvY2hpbicsICdDb2xvbm5hIE1UJywgJ0NvbnN0YW50aWEnLCAnQ29vcGVyIEJsYWNrJywgJ0NvcHBlcnBsYXRlJywgJ0NvcHBlcnBsYXRlIEdvdGhpYycsICdDb3BwZXJwbGF0ZSBHb3RoaWMgQm9sZCcsICdDb3BwZXJwbGF0ZSBHb3RoaWMgTGlnaHQnLCAnQ29wcGVycGxHb3RoIEJkIEJUJywgJ0NvcmJlbCcsICdDb3JkaWEgTmV3JywgJ0NvcmRpYVVQQycsICdDb3JuZXJzdG9uZScsICdDb3JvbmV0JywgJ0N1Y2tvbycsICdDdXJseiBNVCcsICdEYXVuUGVuaCcsICdEYXVwaGluJywgJ0RhdmlkJywgJ0RCIExDRCBUZW1wJywgJ0RFTElDSU9VUycsICdEZW5tYXJrJywgJ0RGS2FpLVNCJywgJ0RpZG90JywgJ0RpbGxlbmlhVVBDJywgJ0RJTicsICdEb2tDaGFtcGEnLCAnRG90dW0nLCAnRG90dW1DaGUnLCAnRWJyaW1hJywgJ0Vkd2FyZGlhbiBTY3JpcHQgSVRDJywgJ0VsZXBoYW50JywgJ0VuZ2xpc2ggMTExIFZpdmFjZSBCVCcsICdFbmdyYXZlcnMgTVQnLCAnRW5ncmF2ZXJzR290aGljIEJUJywgJ0VyYXMgQm9sZCBJVEMnLCAnRXJhcyBEZW1pIElUQycsICdFcmFzIExpZ2h0IElUQycsICdFcmFzIE1lZGl1bSBJVEMnLCAnRXVjcm9zaWFVUEMnLCAnRXVwaGVtaWEnLCAnRXVwaGVtaWEgVUNBUycsICdFVVJPU1RJTEUnLCAnRXhvdGMzNTAgQmQgQlQnLCAnRmFuZ1NvbmcnLCAnRmVsaXggVGl0bGluZycsICdGaXhlZHN5cycsICdGT05USU4nLCAnRm9vdGxpZ2h0IE1UIExpZ2h0JywgJ0ZvcnRlJywgJ0ZyYW5rUnVlaGwnLCAnRnJhbnNpc2NhbicsICdGcmVlZnJtNzIxIEJsayBCVCcsICdGcmVlc2lhVVBDJywgJ0ZyZWVzdHlsZSBTY3JpcHQnLCAnRnJlbmNoIFNjcmlwdCBNVCcsICdGcm5rR290aElUQyBCayBCVCcsICdGcnVpdGdlcicsICdGUlVUSUdFUicsICdGdXR1cmEnLCAnRnV0dXJhIEJrIEJUJywgJ0Z1dHVyYSBMdCBCVCcsICdGdXR1cmEgTWQgQlQnLCAnRnV0dXJhIFpCbGsgQlQnLCAnRnV0dXJhQmxhY2sgQlQnLCAnR2FicmlvbGEnLCAnR2FsbGlhcmQgQlQnLCAnR2F1dGFtaScsICdHZWV6YSBQcm8nLCAnR2VvbWV0cjIzMSBCVCcsICdHZW9tZXRyMjMxIEh2IEJUJywgJ0dlb21ldHIyMzEgTHQgQlQnLCAnR2VvU2xhYiA3MDMgTHQgQlQnLCAnR2VvU2xhYiA3MDMgWEJkIEJUJywgJ0dpZ2knLCAnR2lsbCBTYW5zJywgJ0dpbGwgU2FucyBNVCcsICdHaWxsIFNhbnMgTVQgQ29uZGVuc2VkJywgJ0dpbGwgU2FucyBNVCBFeHQgQ29uZGVuc2VkIEJvbGQnLCAnR2lsbCBTYW5zIFVsdHJhIEJvbGQnLCAnR2lsbCBTYW5zIFVsdHJhIEJvbGQgQ29uZGVuc2VkJywgJ0dpc2hhJywgJ0dsb3VjZXN0ZXIgTVQgRXh0cmEgQ29uZGVuc2VkJywgJ0dPVEhBTScsICdHT1RIQU0gQk9MRCcsICdHb3VkeSBPbGQgU3R5bGUnLCAnR291ZHkgU3RvdXQnLCAnR291ZHlIYW5kdG9vbGVkIEJUJywgJ0dvdWR5T0xTdCBCVCcsICdHdWphcmF0aSBTYW5nYW0gTU4nLCAnR3VsaW0nLCAnR3VsaW1DaGUnLCAnR3VuZ3N1aCcsICdHdW5nc3VoQ2hlJywgJ0d1cm11a2hpIE1OJywgJ0hhZXR0ZW5zY2h3ZWlsZXInLCAnSGFybG93IFNvbGlkIEl0YWxpYycsICdIYXJyaW5ndG9uJywgJ0hlYXRoZXInLCAnSGVpdGkgU0MnLCAnSGVpdGkgVEMnLCAnSEVMVicsICdIZXJhbGQnLCAnSGlnaCBUb3dlciBUZXh0JywgJ0hpcmFnaW5vIEtha3UgR290aGljIFByb04nLCAnSGlyYWdpbm8gTWluY2hvIFByb04nLCAnSG9lZmxlciBUZXh0JywgJ0h1bWFuc3QgNTIxIENuIEJUJywgJ0h1bWFuc3Q1MjEgQlQnLCAnSHVtYW5zdDUyMSBMdCBCVCcsICdJbXByaW50IE1UIFNoYWRvdycsICdJbmNpc2VkOTAxIEJkIEJUJywgJ0luY2lzZWQ5MDEgQlQnLCAnSW5jaXNlZDkwMSBMdCBCVCcsICdJTkNPTlNPTEFUQScsICdJbmZvcm1hbCBSb21hbicsICdJbmZvcm1hbDAxMSBCVCcsICdJTlRFUlNUQVRFJywgJ0lyaXNVUEMnLCAnSXNrb29sYSBQb3RhJywgJ0phc21pbmVVUEMnLCAnSmF6eiBMRVQnLCAnSmVuc29uJywgJ0plc3RlcicsICdKb2tlcm1hbicsICdKdWljZSBJVEMnLCAnS2FiZWwgQmsgQlQnLCAnS2FiZWwgVWx0IEJUJywgJ0thaWxhc2EnLCAnS2FpVGknLCAnS2FsaW5nYScsICdLYW5uYWRhIFNhbmdhbSBNTicsICdLYXJ0aWthJywgJ0thdWZtYW5uIEJkIEJUJywgJ0thdWZtYW5uIEJUJywgJ0tobWVyIFVJJywgJ0tvZGNoaWFuZ1VQQycsICdLb2tpbGEnLCAnS29yaW5uYSBCVCcsICdLcmlzdGVuIElUQycsICdLcnVuZ3RoZXAnLCAnS3Vuc3RsZXIgU2NyaXB0JywgJ0xhbyBVSScsICdMYXRoYScsICdMZWVsYXdhZGVlJywgJ0xldHRlciBHb3RoaWMnLCAnTGV2ZW5pbSBNVCcsICdMaWx5VVBDJywgJ0xpdGhvZ3JhcGgnLCAnTGl0aG9ncmFwaCBMaWdodCcsICdMb25nIElzbGFuZCcsICdMeWRpYW4gQlQnLCAnTWFnbmV0bycsICdNYWlhbmRyYSBHRCcsICdNYWxheWFsYW0gU2FuZ2FtIE1OJywgJ01hbGd1biBHb3RoaWMnLCAnTWFuZ2FsJywgJ01hcmlnb2xkJywgJ01hcmlvbicsICdNYXJrZXIgRmVsdCcsICdNYXJrZXQnLCAnTWFybGV0dCcsICdNYXRpc3NlIElUQycsICdNYXR1cmEgTVQgU2NyaXB0IENhcGl0YWxzJywgJ01laXJ5bycsICdNZWlyeW8gVUknLCAnTWljcm9zb2Z0IEhpbWFsYXlhJywgJ01pY3Jvc29mdCBKaGVuZ0hlaScsICdNaWNyb3NvZnQgTmV3IFRhaSBMdWUnLCAnTWljcm9zb2Z0IFBoYWdzUGEnLCAnTWljcm9zb2Z0IFRhaSBMZScsICdNaWNyb3NvZnQgVWlnaHVyJywgJ01pY3Jvc29mdCBZYUhlaScsICdNaWNyb3NvZnQgWWkgQmFpdGknLCAnTWluZ0xpVScsICdNaW5nTGlVX0hLU0NTJywgJ01pbmdMaVVfSEtTQ1MtRXh0QicsICdNaW5nTGlVLUV4dEInLCAnTWluaW9uJywgJ01pbmlvbiBQcm8nLCAnTWlyaWFtJywgJ01pcmlhbSBGaXhlZCcsICdNaXN0cmFsJywgJ01vZGVybicsICdNb2Rlcm4gTm8uIDIwJywgJ01vbmEgTGlzYSBTb2xpZCBJVEMgVFQnLCAnTW9uZ29saWFuIEJhaXRpJywgJ01PTk8nLCAnTW9vbEJvcmFuJywgJ01ycyBFYXZlcycsICdNUyBMaW5lRHJhdycsICdNUyBNaW5jaG8nLCAnTVMgUE1pbmNobycsICdNUyBSZWZlcmVuY2UgU3BlY2lhbHR5JywgJ01TIFVJIEdvdGhpYycsICdNVCBFeHRyYScsICdNVVNFTycsICdNViBCb2xpJywgJ05hZGVlbScsICdOYXJraXNpbScsICdORVZJUycsICdOZXdzIEdvdGhpYycsICdOZXdzIEdvdGhpY01UJywgJ05ld3NHb3RoIEJUJywgJ05pYWdhcmEgRW5ncmF2ZWQnLCAnTmlhZ2FyYSBTb2xpZCcsICdOb3Rld29ydGh5JywgJ05TaW1TdW4nLCAnTnlhbGEnLCAnT0NSIEEgRXh0ZW5kZWQnLCAnT2xkIENlbnR1cnknLCAnT2xkIEVuZ2xpc2ggVGV4dCBNVCcsICdPbnl4JywgJ09ueXggQlQnLCAnT1BUSU1BJywgJ09yaXlhIFNhbmdhbSBNTicsICdPU0FLQScsICdPekhhbmRpY3JhZnQgQlQnLCAnUGFsYWNlIFNjcmlwdCBNVCcsICdQYXB5cnVzJywgJ1BhcmNobWVudCcsICdQYXJ0eSBMRVQnLCAnUGVnYXN1cycsICdQZXJwZXR1YScsICdQZXJwZXR1YSBUaXRsaW5nIE1UJywgJ1BldGl0YUJvbGQnLCAnUGlja3dpY2snLCAnUGxhbnRhZ2VuZXQgQ2hlcm9rZWUnLCAnUGxheWJpbGwnLCAnUE1pbmdMaVUnLCAnUE1pbmdMaVUtRXh0QicsICdQb29yIFJpY2hhcmQnLCAnUG9zdGVyJywgJ1Bvc3RlckJvZG9uaSBCVCcsICdQUklOQ0VUT1dOIExFVCcsICdQcmlzdGluYScsICdQVEJhcm51bSBCVCcsICdQeXRoYWdvcmFzJywgJ1JhYXZpJywgJ1JhZ2UgSXRhbGljJywgJ1JhdmllJywgJ1JpYmJvbjEzMSBCZCBCVCcsICdSb2Nrd2VsbCcsICdSb2Nrd2VsbCBDb25kZW5zZWQnLCAnUm9ja3dlbGwgRXh0cmEgQm9sZCcsICdSb2QnLCAnUm9tYW4nLCAnU2Fra2FsIE1hamFsbGEnLCAnU2FudGEgRmUgTEVUJywgJ1Nhdm95ZSBMRVQnLCAnU2NlcHRyZScsICdTY3JpcHQnLCAnU2NyaXB0IE1UIEJvbGQnLCAnU0NSSVBUSU5BJywgJ1NlcmlmYScsICdTZXJpZmEgQlQnLCAnU2VyaWZhIFRoIEJUJywgJ1NoZWxsZXlWb2xhbnRlIEJUJywgJ1NoZXJ3b29kJywgJ1Nob25hciBCYW5nbGEnLCAnU2hvd2NhcmQgR290aGljJywgJ1NocnV0aScsICdTaWduYm9hcmQnLCAnU0lMS1NDUkVFTicsICdTaW1IZWknLCAnU2ltcGxpZmllZCBBcmFiaWMnLCAnU2ltcGxpZmllZCBBcmFiaWMgRml4ZWQnLCAnU2ltU3VuJywgJ1NpbVN1bi1FeHRCJywgJ1NpbmhhbGEgU2FuZ2FtIE1OJywgJ1NrZXRjaCBSb2Nrd2VsbCcsICdTa2lhJywgJ1NtYWxsIEZvbnRzJywgJ1NuYXAgSVRDJywgJ1NuZWxsIFJvdW5kaGFuZCcsICdTb2NrZXQnLCAnU291dmVuaXIgTHQgQlQnLCAnU3RhY2NhdG8yMjIgQlQnLCAnU3RlYW1lcicsICdTdGVuY2lsJywgJ1N0b3J5Ym9vaycsICdTdHlsbG8nLCAnU3Vid2F5JywgJ1N3aXM3MjEgQmxrRXggQlQnLCAnU3dpc3M5MTEgWENtIEJUJywgJ1N5bGZhZW4nLCAnU3luY2hybyBMRVQnLCAnU3lzdGVtJywgJ1RhbWlsIFNhbmdhbSBNTicsICdUZWNobmljYWwnLCAnVGVsZXR5cGUnLCAnVGVsdWd1IFNhbmdhbSBNTicsICdUZW1wdXMgU2FucyBJVEMnLCAnVGVybWluYWwnLCAnVGhvbmJ1cmknLCAnVHJhZGl0aW9uYWwgQXJhYmljJywgJ1RyYWphbicsICdUUkFKQU4gUFJPJywgJ1RyaXN0YW4nLCAnVHVidWxhcicsICdUdW5nYScsICdUdyBDZW4gTVQnLCAnVHcgQ2VuIE1UIENvbmRlbnNlZCcsICdUdyBDZW4gTVQgQ29uZGVuc2VkIEV4dHJhIEJvbGQnLCAnVHlwb1VwcmlnaHQgQlQnLCAnVW5pY29ybicsICdVbml2ZXJzJywgJ1VuaXZlcnMgQ0UgNTUgTWVkaXVtJywgJ1VuaXZlcnMgQ29uZGVuc2VkJywgJ1V0c2FhaCcsICdWYWdhYm9uZCcsICdWYW5pJywgJ1ZpamF5YScsICdWaW5lciBIYW5kIElUQycsICdWaXN1YWxVSScsICdWaXZhbGRpJywgJ1ZsYWRpbWlyIFNjcmlwdCcsICdWcmluZGEnLCAnV2VzdG1pbnN0ZXInLCAnV0hJVE5FWScsICdXaWRlIExhdGluJywgJ1phcGZFbGxpcHQgQlQnLCAnWmFwZkh1bW5zdCBCVCcsICdaYXBmSHVtbnN0IERtIEJUJywgJ1phcGZpbm8nLCAnWnVyaWNoIEJsa0V4IEJUJywgJ1p1cmljaCBFeCBCVCcsICdaV0Fkb2JlRiddKSk7IGQgPSAoZCA9IGQuY29uY2F0KHQuZm9udHMudXNlckRlZmluZWRGb250cykpLmZpbHRlcigoZSwgdCkgPT4geyByZXR1cm4gZC5pbmRleE9mKGUpID09PSB0OyB9KTsgY29uc3QgYSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07IGNvbnN0IHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgY29uc3QgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyBjb25zdCBuID0ge307IGNvbnN0IGkgPSB7fTsgY29uc3QgZiA9IGZ1bmN0aW9uICgpIHsgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTsgcmV0dXJuIGUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnLCBlLnN0eWxlLmxlZnQgPSAnLTk5OTlweCcsIGUuc3R5bGUuZm9udFNpemUgPSAnNzJweCcsIGUuc3R5bGUuZm9udFN0eWxlID0gJ25vcm1hbCcsIGUuc3R5bGUuZm9udFdlaWdodCA9ICdub3JtYWwnLCBlLnN0eWxlLmxldHRlclNwYWNpbmcgPSAnbm9ybWFsJywgZS5zdHlsZS5saW5lQnJlYWsgPSAnYXV0bycsIGUuc3R5bGUubGluZUhlaWdodCA9ICdub3JtYWwnLCBlLnN0eWxlLnRleHRUcmFuc2Zvcm0gPSAnbm9uZScsIGUuc3R5bGUudGV4dEFsaWduID0gJ2xlZnQnLCBlLnN0eWxlLnRleHREZWNvcmF0aW9uID0gJ25vbmUnLCBlLnN0eWxlLnRleHRTaGFkb3cgPSAnbm9uZScsIGUuc3R5bGUud2hpdGVTcGFjZSA9ICdub3JtYWwnLCBlLnN0eWxlLndvcmRCcmVhayA9ICdub3JtYWwnLCBlLnN0eWxlLndvcmRTcGFjaW5nID0gJ25vcm1hbCcsIGUuaW5uZXJIVE1MID0gJ21tbW1tbW1tbW1sbGknLCBlOyB9OyBjb25zdCBvID0gZnVuY3Rpb24gKGUpIHsgZm9yICh2YXIgdCA9ICExLCBhID0gMDsgYSA8IHUubGVuZ3RoOyBhKyspIGlmICh0ID0gZVthXS5vZmZzZXRXaWR0aCAhPT0gblt1W2FdXSB8fCBlW2FdLm9mZnNldEhlaWdodCAhPT0gaVt1W2FdXSkgcmV0dXJuIHQ7IHJldHVybiB0OyB9OyBjb25zdCBsID0gKGZ1bmN0aW9uICgpIHsgZm9yICh2YXIgZSA9IFtdLCB0ID0gMCwgYSA9IHUubGVuZ3RoOyB0IDwgYTsgdCsrKSB7IGNvbnN0IG4gPSBmKCk7IG4uc3R5bGUuZm9udEZhbWlseSA9IHVbdF0sIHIuYXBwZW5kQ2hpbGQobiksIGUucHVzaChuKTsgfSByZXR1cm4gZTsgfSgpKTsgYS5hcHBlbmRDaGlsZChyKTsgZm9yIChsZXQgcyA9IDAsIGMgPSB1Lmxlbmd0aDsgcyA8IGM7IHMrKyluW3Vbc11dID0gbFtzXS5vZmZzZXRXaWR0aCwgaVt1W3NdXSA9IGxbc10ub2Zmc2V0SGVpZ2h0OyBjb25zdCBoID0gKGZ1bmN0aW9uICgpIHsgZm9yICh2YXIgZSwgdCwgYSwgbiA9IHt9LCByID0gMCwgaSA9IGQubGVuZ3RoOyByIDwgaTsgcisrKSB7IGZvciAodmFyIG8gPSBbXSwgbCA9IDAsIHMgPSB1Lmxlbmd0aDsgbCA8IHM7IGwrKykgeyBjb25zdCBjID0gKGUgPSBkW3JdLCB0ID0gdVtsXSwgYSA9IHZvaWQgMCwgKGEgPSBmKCkpLnN0eWxlLmZvbnRGYW1pbHkgPSBgJyR7ZX0nLCR7dH1gLCBhKTsgZy5hcHBlbmRDaGlsZChjKSwgby5wdXNoKGMpOyB9bltkW3JdXSA9IG87IH0gcmV0dXJuIG47IH0oKSk7IGEuYXBwZW5kQ2hpbGQoZyk7IGZvciAodmFyIG0gPSBbXSwgVCA9IDAsIHAgPSBkLmxlbmd0aDsgVCA8IHA7IFQrKylvKGhbZFtUXV0pICYmIG0ucHVzaChkW1RdKTsgYS5yZW1vdmVDaGlsZChnKSwgYS5yZW1vdmVDaGlsZChyKSwgZShtKTsgfSwgcGF1c2VCZWZvcmU6ICEwIH0sIHsga2V5OiAnZm9udHNGbGFzaCcsIGdldERhdGEodCwgZSkgeyByZXR1cm4gRCgpID8gTigpID8gZS5mb250cy5zd2ZQYXRoID8gdm9pZCBfKChlKSA9PiB7IHQoZSk7IH0sIGUpIDogdCgnbWlzc2luZyBvcHRpb25zLmZvbnRzLnN3ZlBhdGgnKSA6IHQoJ2ZsYXNoIG5vdCBpbnN0YWxsZWQnKSA6IHQoJ3N3ZiBvYmplY3Qgbm90IGxvYWRlZCcpOyB9LCBwYXVzZUJlZm9yZTogITAgfSwgeyBrZXk6ICdhdWRpbycsIGdldERhdGEoYSwgZSkgeyBjb25zdCB0ID0gZS5hdWRpbzsgaWYgKHQuZXhjbHVkZUlPUzExICYmIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL09TIDExLitWZXJzaW9uXFwvMTEuK1NhZmFyaS8pKSByZXR1cm4gYShlLkVYQ0xVREVEKTsgY29uc3QgbiA9IHdpbmRvdy5PZmZsaW5lQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRPZmZsaW5lQXVkaW9Db250ZXh0OyBpZiAobiA9PSBudWxsKSByZXR1cm4gYShlLk5PVF9BVkFJTEFCTEUpOyBsZXQgciA9IG5ldyBuKDEsIDQ0MTAwLCA0NDEwMCk7IGNvbnN0IGkgPSByLmNyZWF0ZU9zY2lsbGF0b3IoKTsgaS50eXBlID0gJ3RyaWFuZ2xlJywgaS5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMWU0LCByLmN1cnJlbnRUaW1lKTsgY29uc3QgbyA9IHIuY3JlYXRlRHluYW1pY3NDb21wcmVzc29yKCk7IGMoW1sndGhyZXNob2xkJywgLTUwXSwgWydrbmVlJywgNDBdLCBbJ3JhdGlvJywgMTJdLCBbJ3JlZHVjdGlvbicsIC0yMF0sIFsnYXR0YWNrJywgMF0sIFsncmVsZWFzZScsIDAuMjVdXSwgKGUpID0+IHsgdm9pZCAwICE9PSBvW2VbMF1dICYmIHR5cGVvZiBvW2VbMF1dLnNldFZhbHVlQXRUaW1lID09PSAnZnVuY3Rpb24nICYmIG9bZVswXV0uc2V0VmFsdWVBdFRpbWUoZVsxXSwgci5jdXJyZW50VGltZSk7IH0pLCBpLmNvbm5lY3QobyksIG8uY29ubmVjdChyLmRlc3RpbmF0aW9uKSwgaS5zdGFydCgwKSwgci5zdGFydFJlbmRlcmluZygpOyBjb25zdCBsID0gc2V0VGltZW91dCgoKSA9PiB7IHJldHVybiBjb25zb2xlLndhcm4oYEF1ZGlvIGZpbmdlcnByaW50IHRpbWVkIG91dC4gUGxlYXNlIHJlcG9ydCBidWcgYXQgaHR0cHM6Ly9naXRodWIuY29tL1ZhbHZlL2ZpbmdlcnByaW50anMyIHdpdGggeW91ciB1c2VyIGFnZW50OiBcIiR7bmF2aWdhdG9yLnVzZXJBZ2VudH1cIi5gKSwgci5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge30sIHIgPSBudWxsLCBhKCdhdWRpb1RpbWVvdXQnKTsgfSwgdC50aW1lb3V0KTsgci5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKGUpIHsgbGV0IHQ7IHRyeSB7IGNsZWFyVGltZW91dChsKSwgdCA9IGUucmVuZGVyZWRCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoMCkuc2xpY2UoNDUwMCwgNWUzKS5yZWR1Y2UoKGUsIHQpID0+IHsgcmV0dXJuIGUgKyBNYXRoLmFicyh0KTsgfSwgMCkudG9TdHJpbmcoKSwgaS5kaXNjb25uZWN0KCksIG8uZGlzY29ubmVjdCgpOyB9IGNhdGNoIChlKSB7IHJldHVybiB2b2lkIGEoZSk7IH1hKHQpOyB9OyB9IH0sIHsga2V5OiAnZW51bWVyYXRlRGV2aWNlcycsIGdldERhdGEodCwgZSkgeyBpZiAoIWEoKSkgcmV0dXJuIHQoZS5OT1RfQVZBSUxBQkxFKTsgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKCkudGhlbigoZSkgPT4geyB0KGUubWFwKChlKSA9PiB7IHJldHVybiBgaWQ9JHtlLmRldmljZUlkfTtnaWQ9JHtlLmdyb3VwSWR9OyR7ZS5raW5kfTske2UubGFiZWx9YDsgfSkpOyB9KS5jYXRjaCgoZSkgPT4geyB0KGUpOyB9KTsgfSB9XTsgY29uc3QgVSA9IGZ1bmN0aW9uIChlKSB7IHRocm93IG5ldyBFcnJvcihcIiduZXcgRmluZ2VycHJpbnQoKScgaXMgZGVwcmVjYXRlZCwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9WYWx2ZS9maW5nZXJwcmludGpzMiN1cGdyYWRlLWd1aWRlLWZyb20tMTgyLXRvLTIwMFwiKTsgfTsgcmV0dXJuIFUuZ2V0ID0gZnVuY3Rpb24gKGEsIG4pIHsgbiA/IGEgfHwgKGEgPSB7fSkgOiAobiA9IGEsIGEgPSB7fSksIChmdW5jdGlvbiAoZSwgdCkgeyBpZiAodCA9PSBudWxsKSByZXR1cm47IGxldCBhOyBsZXQgbjsgZm9yIChuIGluIHQpKGEgPSB0W25dKSA9PSBudWxsIHx8IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLCBuKSB8fCAoZVtuXSA9IGEpOyB9KGEsIGUpKSwgYS5jb21wb25lbnRzID0gYS5leHRyYUNvbXBvbmVudHMuY29uY2F0KEcpOyB2YXIgciA9IHsgZGF0YTogW10sIGFkZFByZXByb2Nlc3NlZENvbXBvbmVudChlLCB0KSB7IHR5cGVvZiBhLnByZXByb2Nlc3NvciA9PT0gJ2Z1bmN0aW9uJyAmJiAodCA9IGEucHJlcHJvY2Vzc29yKGUsIHQpKSwgci5kYXRhLnB1c2goeyBrZXk6IGUsIHZhbHVlOiB0IH0pOyB9IH07IGxldCBpID0gLTE7IHZhciBvID0gZnVuY3Rpb24gKGUpIHsgaWYgKChpICs9IDEpID49IGEuY29tcG9uZW50cy5sZW5ndGgpbihyLmRhdGEpOyBlbHNlIHsgY29uc3QgdCA9IGEuY29tcG9uZW50c1tpXTsgaWYgKGEuZXhjbHVkZXNbdC5rZXldKW8oITEpOyBlbHNlIHsgaWYgKCFlICYmIHQucGF1c2VCZWZvcmUpIHJldHVybiBpIC09IDEsIHZvaWQgc2V0VGltZW91dCgoKSA9PiB7IG8oITApOyB9LCAxKTsgdHJ5IHsgdC5nZXREYXRhKChlKSA9PiB7IHIuYWRkUHJlcHJvY2Vzc2VkQ29tcG9uZW50KHQua2V5LCBlKSwgbyghMSk7IH0sIGEpOyB9IGNhdGNoIChlKSB7IHIuYWRkUHJlcHJvY2Vzc2VkQ29tcG9uZW50KHQua2V5LCBTdHJpbmcoZSkpLCBvKCExKTsgfSB9IH0gfTsgbyghMSk7IH0sIFUuZ2V0UHJvbWlzZSA9IGZ1bmN0aW9uIChhKSB7IHJldHVybiBuZXcgUHJvbWlzZSgoKGUsIHQpID0+IHsgVS5nZXQoYSwgZSk7IH0pKTsgfSwgVS5nZXRWMTggPSBmdW5jdGlvbiAoaSwgbykgeyByZXR1cm4gbyA9PSBudWxsICYmIChvID0gaSwgaSA9IHt9KSwgVS5nZXQoaSwgKGUpID0+IHsgZm9yICh2YXIgdCA9IFtdLCBhID0gMDsgYSA8IGUubGVuZ3RoOyBhKyspIHsgY29uc3QgbiA9IGVbYV07IGlmIChuLnZhbHVlID09PSAoaS5OT1RfQVZBSUxBQkxFIHx8ICdub3QgYXZhaWxhYmxlJykpdC5wdXNoKHsga2V5OiBuLmtleSwgdmFsdWU6ICd1bmtub3duJyB9KTsgZWxzZSBpZiAobi5rZXkgPT09ICdwbHVnaW5zJyl0LnB1c2goeyBrZXk6ICdwbHVnaW5zJywgdmFsdWU6IHMobi52YWx1ZSwgKGUpID0+IHsgY29uc3QgdCA9IHMoZVsyXSwgKGUpID0+IHsgcmV0dXJuIGUuam9pbiA/IGUuam9pbignficpIDogZTsgfSkuam9pbignLCcpOyByZXR1cm4gW2VbMF0sIGVbMV0sIHRdLmpvaW4oJzo6Jyk7IH0pIH0pOyBlbHNlIGlmIChbJ2NhbnZhcycsICd3ZWJnbCddLmluZGV4T2Yobi5rZXkpICE9PSAtMSl0LnB1c2goeyBrZXk6IG4ua2V5LCB2YWx1ZTogbi52YWx1ZS5qb2luKCd+JykgfSk7IGVsc2UgaWYgKFsnc2Vzc2lvblN0b3JhZ2UnLCAnbG9jYWxTdG9yYWdlJywgJ2luZGV4ZWREYicsICdhZGRCZWhhdmlvcicsICdvcGVuRGF0YWJhc2UnXS5pbmRleE9mKG4ua2V5KSAhPT0gLTEpIHsgaWYgKCFuLnZhbHVlKSBjb250aW51ZTsgdC5wdXNoKHsga2V5OiBuLmtleSwgdmFsdWU6IDEgfSk7IH0gZWxzZSBuLnZhbHVlID8gdC5wdXNoKG4udmFsdWUuam9pbiA/IHsga2V5OiBuLmtleSwgdmFsdWU6IG4udmFsdWUuam9pbignOycpIH0gOiBuKSA6IHQucHVzaCh7IGtleTogbi5rZXksIHZhbHVlOiBuLnZhbHVlIH0pOyB9IGNvbnN0IHIgPSBsKHModCwgKGUpID0+IHsgcmV0dXJuIGUudmFsdWU7IH0pLmpvaW4oJ35+ficpLCAzMSk7IG8ociwgdCk7IH0pOyB9LCBVLng2NGhhc2gxMjggPSBsLCBVLlZFUlNJT04gPSAnMi4xLjAnLCBVO1xufSkpO1xuIiwiLyohXG4gQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cbi8qISBsaWZlY3ljbGUuZXM1LmpzIHYwLjEuMSAqL1xuIShmdW5jdGlvbiAoZSwgdCkge1xuXHQnb2JqZWN0JyA9PSB0eXBlb2YgZXhwb3J0cyAmJiAndW5kZWZpbmVkJyAhPSB0eXBlb2YgbW9kdWxlXG5cdFx0PyAobW9kdWxlLmV4cG9ydHMgPSB0KCkpXG5cdFx0OiAnZnVuY3Rpb24nID09IHR5cGVvZiBkZWZpbmUgJiYgZGVmaW5lLmFtZFxuXHRcdD8gZGVmaW5lKHQpXG5cdFx0OiAoZS5saWZlY3ljbGUgPSB0KCkpO1xufSkodGhpcywgZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBlID0gdm9pZCAwO1xuXHR0cnkge1xuXHRcdG5ldyBFdmVudFRhcmdldCgpLCAoZSA9ICExKTtcblx0fSBjYXRjaCAodCkge1xuXHRcdGUgPSAhMTtcblx0fVxuXHR2YXIgdCA9XG5cdFx0XHQnZnVuY3Rpb24nID09IHR5cGVvZiBTeW1ib2wgJiYgJ3N5bWJvbCcgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvclxuXHRcdFx0XHQ/IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHlwZW9mIGU7XG5cdFx0XHRcdCAgfVxuXHRcdFx0XHQ6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZSAmJlxuXHRcdFx0XHRcdFx0XHQnZnVuY3Rpb24nID09IHR5cGVvZiBTeW1ib2wgJiZcblx0XHRcdFx0XHRcdFx0ZS5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmXG5cdFx0XHRcdFx0XHRcdGUgIT09IFN5bWJvbC5wcm90b3R5cGVcblx0XHRcdFx0XHRcdFx0PyAnc3ltYm9sJ1xuXHRcdFx0XHRcdFx0XHQ6IHR5cGVvZiBlO1xuXHRcdFx0XHQgIH0sXG5cdFx0biA9IGZ1bmN0aW9uIChlLCB0KSB7XG5cdFx0XHRpZiAoIShlIGluc3RhbmNlb2YgdCkpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpO1xuXHRcdH0sXG5cdFx0aSA9IChmdW5jdGlvbiAoKSB7XG5cdFx0XHRmdW5jdGlvbiBlKGUsIHQpIHtcblx0XHRcdFx0Zm9yICh2YXIgbiA9IDA7IG4gPCB0Lmxlbmd0aDsgbisrKSB7XG5cdFx0XHRcdFx0dmFyIGkgPSB0W25dO1xuXHRcdFx0XHRcdChpLmVudW1lcmFibGUgPSBpLmVudW1lcmFibGUgfHwgITEpLFxuXHRcdFx0XHRcdFx0KGkuY29uZmlndXJhYmxlID0gITApLFxuXHRcdFx0XHRcdFx0J3ZhbHVlJyBpbiBpICYmIChpLndyaXRhYmxlID0gITApLFxuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIGkua2V5LCBpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICh0LCBuLCBpKSB7XG5cdFx0XHRcdHJldHVybiBuICYmIGUodC5wcm90b3R5cGUsIG4pLCBpICYmIGUodCwgaSksIHQ7XG5cdFx0XHR9O1xuXHRcdH0pKCksXG5cdFx0ciA9IGZ1bmN0aW9uIChlLCB0KSB7XG5cdFx0XHRpZiAoJ2Z1bmN0aW9uJyAhPSB0eXBlb2YgdCAmJiBudWxsICE9PSB0KVxuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2YgdCk7XG5cdFx0XHQoZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHQgJiYgdC5wcm90b3R5cGUsIHtcblx0XHRcdFx0Y29uc3RydWN0b3I6IHsgdmFsdWU6IGUsIGVudW1lcmFibGU6ICExLCB3cml0YWJsZTogITAsIGNvbmZpZ3VyYWJsZTogITAgfVxuXHRcdFx0fSkpLFxuXHRcdFx0XHR0ICYmIChPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YoZSwgdCkgOiAoZS5fX3Byb3RvX18gPSB0KSk7XG5cdFx0fSxcblx0XHRhID0gZnVuY3Rpb24gKGUsIHQpIHtcblx0XHRcdGlmICghZSkgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuXHRcdFx0cmV0dXJuICF0IHx8ICgnb2JqZWN0JyAhPSB0eXBlb2YgdCAmJiAnZnVuY3Rpb24nICE9IHR5cGVvZiB0KSA/IGUgOiB0O1xuXHRcdH0sXG5cdFx0cyA9IChmdW5jdGlvbiAoKSB7XG5cdFx0XHRmdW5jdGlvbiBlKCkge1xuXHRcdFx0XHRuKHRoaXMsIGUpLCAodGhpcy5fcmVnaXN0cnkgPSB7fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRpKGUsIFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRrZXk6ICdhZGRFdmVudExpc3RlbmVyJyxcblx0XHRcdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAoZSwgdCkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9nZXRSZWdpc3RyeShlKS5wdXNoKHQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0a2V5OiAncmVtb3ZlRXZlbnRMaXN0ZW5lcicsXG5cdFx0XHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gKGUsIHQpIHtcblx0XHRcdFx0XHRcdFx0dmFyIG4gPSB0aGlzLl9nZXRSZWdpc3RyeShlKSxcblx0XHRcdFx0XHRcdFx0XHRpID0gbi5pbmRleE9mKHQpO1xuXHRcdFx0XHRcdFx0XHRpID4gLTEgJiYgbi5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRrZXk6ICdkaXNwYXRjaEV2ZW50Jyxcblx0XHRcdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0XHRcdChlLnRhcmdldCA9IHRoaXMpLFxuXHRcdFx0XHRcdFx0XHRcdE9iamVjdC5mcmVlemUoZSksXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fZ2V0UmVnaXN0cnkoZS50eXBlKS5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdChlKTtcblx0XHRcdFx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XHRcdFx0XHQhMFxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0a2V5OiAnX2dldFJlZ2lzdHJ5Jyxcblx0XHRcdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKHRoaXMuX3JlZ2lzdHJ5W2VdID0gdGhpcy5fcmVnaXN0cnlbZV0gfHwgW10pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XSksXG5cdFx0XHRcdGVcblx0XHRcdCk7XG5cdFx0fSkoKSxcblx0XHRvID0gZSA/IEV2ZW50VGFyZ2V0IDogcyxcblx0XHR1ID0gZVxuXHRcdFx0PyBFdmVudFxuXHRcdFx0OiBmdW5jdGlvbiBlKHQpIHtcblx0XHRcdFx0XHRuKHRoaXMsIGUpLCAodGhpcy50eXBlID0gdCk7XG5cdFx0XHQgIH0sXG5cdFx0ZiA9IChmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZnVuY3Rpb24gdChlLCBpKSB7XG5cdFx0XHRcdG4odGhpcywgdCk7XG5cdFx0XHRcdHZhciByID0gYSh0aGlzLCAodC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHQpKS5jYWxsKHRoaXMsIGUpKTtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQoci5uZXdTdGF0ZSA9IGkubmV3U3RhdGUpLFxuXHRcdFx0XHRcdChyLm9sZFN0YXRlID0gaS5vbGRTdGF0ZSksXG5cdFx0XHRcdFx0KHIub3JpZ2luYWxFdmVudCA9IGkub3JpZ2luYWxFdmVudCksXG5cdFx0XHRcdFx0clxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHIodCwgdSksIHQ7XG5cdFx0fSkoKSxcblx0XHRjID0gJ2FjdGl2ZScsXG5cdFx0aCA9ICdwYXNzaXZlJyxcblx0XHRkID0gJ2hpZGRlbicsXG5cdFx0bCA9ICdmcm96ZW4nLFxuXHRcdHAgPSAndGVybWluYXRlZCcsXG5cdFx0diA9XG5cdFx0XHQnb2JqZWN0JyA9PT0gKCd1bmRlZmluZWQnID09IHR5cGVvZiBzYWZhcmkgPyAndW5kZWZpbmVkJyA6IHQoc2FmYXJpKSkgJiZcblx0XHRcdHNhZmFyaS5wdXNoTm90aWZpY2F0aW9uLFxuXHRcdHkgPSBbXG5cdFx0XHQnZm9jdXMnLFxuXHRcdFx0J2JsdXInLFxuXHRcdFx0J3Zpc2liaWxpdHljaGFuZ2UnLFxuXHRcdFx0J2ZyZWV6ZScsXG5cdFx0XHQncmVzdW1lJyxcblx0XHRcdCdwYWdlc2hvdycsXG5cdFx0XHQnb25wYWdlc2hvdycgaW4gc2VsZiA/ICdwYWdlaGlkZScgOiAndW5sb2FkJ1xuXHRcdF0sXG5cdFx0ZyA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRyZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpLCAoZS5yZXR1cm5WYWx1ZSA9ICdBcmUgeW91IHN1cmU/Jyk7XG5cdFx0fSxcblx0XHRfID0gW1xuXHRcdFx0W2MsIGgsIGQsIHBdLFxuXHRcdFx0W2MsIGgsIGQsIGxdLFxuXHRcdFx0W2QsIGgsIGNdLFxuXHRcdFx0W2wsIGRdLFxuXHRcdFx0W2wsIGNdLFxuXHRcdFx0W2wsIGhdXG5cdFx0XS5tYXAoZnVuY3Rpb24gKGUpIHtcblx0XHRcdHJldHVybiBlLnJlZHVjZShmdW5jdGlvbiAoZSwgdCwgbikge1xuXHRcdFx0XHRyZXR1cm4gKGVbdF0gPSBuKSwgZTtcblx0XHRcdH0sIHt9KTtcblx0XHR9KSxcblx0XHRiID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA9PT0gZCA/IGQgOiBkb2N1bWVudC5oYXNGb2N1cygpID8gYyA6IGg7XG5cdFx0fTtcblx0cmV0dXJuIG5ldyAoKGZ1bmN0aW9uIChlKSB7XG5cdFx0ZnVuY3Rpb24gdCgpIHtcblx0XHRcdG4odGhpcywgdCk7XG5cdFx0XHR2YXIgZSA9IGEodGhpcywgKHQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZih0KSkuY2FsbCh0aGlzKSksXG5cdFx0XHRcdGkgPSBiKCk7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQoZS5fc3RhdGUgPSBpKSxcblx0XHRcdFx0KGUuX3Vuc2F2ZWRDaGFuZ2VzID0gW10pLFxuXHRcdFx0XHQoZS5faGFuZGxlRXZlbnRzID0gZS5faGFuZGxlRXZlbnRzLmJpbmQoZSkpLFxuXHRcdFx0XHR5LmZvckVhY2goZnVuY3Rpb24gKHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gYWRkRXZlbnRMaXN0ZW5lcih0LCBlLl9oYW5kbGVFdmVudHMsICEwKTtcblx0XHRcdFx0fSksXG5cdFx0XHRcdHYgJiZcblx0XHRcdFx0XHRhZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbiAodCkge1xuXHRcdFx0XHRcdFx0ZS5fc2FmYXJpQmVmb3JlVW5sb2FkVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHR0LmRlZmF1bHRQcmV2ZW50ZWQgfHwgdC5yZXR1cm5WYWx1ZS5sZW5ndGggPiAwIHx8IGUuX2Rpc3BhdGNoQ2hhbmdlc0lmTmVlZGVkKHQsIGQpO1xuXHRcdFx0XHRcdFx0fSwgMCk7XG5cdFx0XHRcdFx0fSksXG5cdFx0XHRcdGVcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHRyKHQsIG8pLFxuXHRcdFx0aSh0LCBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRrZXk6ICdhZGRVbnNhdmVkQ2hhbmdlcycsXG5cdFx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHQhdGhpcy5fdW5zYXZlZENoYW5nZXMuaW5kZXhPZihlKSA+IC0xICYmXG5cdFx0XHRcdFx0XHRcdCgwID09PSB0aGlzLl91bnNhdmVkQ2hhbmdlcy5sZW5ndGggJiYgYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZyksXG5cdFx0XHRcdFx0XHRcdHRoaXMuX3Vuc2F2ZWRDaGFuZ2VzLnB1c2goZSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGtleTogJ3JlbW92ZVVuc2F2ZWRDaGFuZ2VzJyxcblx0XHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdHZhciB0ID0gdGhpcy5fdW5zYXZlZENoYW5nZXMuaW5kZXhPZihlKTtcblx0XHRcdFx0XHRcdHQgPiAtMSAmJlxuXHRcdFx0XHRcdFx0XHQodGhpcy5fdW5zYXZlZENoYW5nZXMuc3BsaWNlKHQsIDEpLFxuXHRcdFx0XHRcdFx0XHQwID09PSB0aGlzLl91bnNhdmVkQ2hhbmdlcy5sZW5ndGggJiYgcmVtb3ZlRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGtleTogJ19kaXNwYXRjaENoYW5nZXNJZk5lZWRlZCcsXG5cdFx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIChlLCB0KSB7XG5cdFx0XHRcdFx0XHRpZiAodCAhPT0gdGhpcy5fc3RhdGUpXG5cdFx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdFx0dmFyIG4gPSAoZnVuY3Rpb24gKGUsIHQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgbiwgaSA9IDA7IChuID0gX1tpXSk7ICsraSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhciByID0gbltlXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGEgPSBuW3RdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChyID49IDAgJiYgYSA+PSAwICYmIGEgPiByKSByZXR1cm4gT2JqZWN0LmtleXMobikuc2xpY2UociwgYSArIDEpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0XHRcdFx0XHRcdH0pKHRoaXMuX3N0YXRlLCB0KSxcblx0XHRcdFx0XHRcdFx0XHRcdGkgPSAwO1xuXHRcdFx0XHRcdFx0XHRcdGkgPCBuLmxlbmd0aCAtIDE7XG5cdFx0XHRcdFx0XHRcdFx0KytpXG5cdFx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciByID0gbltpXSxcblx0XHRcdFx0XHRcdFx0XHRcdGEgPSBuW2kgKyAxXTtcblx0XHRcdFx0XHRcdFx0XHQodGhpcy5fc3RhdGUgPSBhKSxcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChcblx0XHRcdFx0XHRcdFx0XHRcdFx0bmV3IGYoJ3N0YXRlY2hhbmdlJywgeyBvbGRTdGF0ZTogciwgbmV3U3RhdGU6IGEsIG9yaWdpbmFsRXZlbnQ6IGUgfSlcblx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRrZXk6ICdfaGFuZGxlRXZlbnRzJyxcblx0XHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdHN3aXRjaCAoKHYgJiYgY2xlYXJUaW1lb3V0KHRoaXMuX3NhZmFyaUJlZm9yZVVubG9hZFRpbWVvdXQpLCBlLnR5cGUpKSB7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ3BhZ2VzaG93Jzpcblx0XHRcdFx0XHRcdFx0Y2FzZSAncmVzdW1lJzpcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kaXNwYXRjaENoYW5nZXNJZk5lZWRlZChlLCBiKCkpO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlICdmb2N1cyc6XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fZGlzcGF0Y2hDaGFuZ2VzSWZOZWVkZWQoZSwgYyk7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ2JsdXInOlxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX3N0YXRlID09PSBjICYmIHRoaXMuX2Rpc3BhdGNoQ2hhbmdlc0lmTmVlZGVkKGUsIGIoKSk7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ3BhZ2VoaWRlJzpcblx0XHRcdFx0XHRcdFx0Y2FzZSAndW5sb2FkJzpcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kaXNwYXRjaENoYW5nZXNJZk5lZWRlZChlLCBlLnBlcnNpc3RlZCA/IGwgOiBwKTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSAndmlzaWJpbGl0eWNoYW5nZSc6XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fc3RhdGUgIT09IGwgJiYgdGhpcy5fc3RhdGUgIT09IHAgJiYgdGhpcy5fZGlzcGF0Y2hDaGFuZ2VzSWZOZWVkZWQoZSwgYigpKTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSAnZnJlZXplJzpcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kaXNwYXRjaENoYW5nZXNJZk5lZWRlZChlLCBsKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRrZXk6ICdzdGF0ZScsXG5cdFx0XHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fc3RhdGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0a2V5OiAncGFnZVdhc0Rpc2NhcmRlZCcsXG5cdFx0XHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZG9jdW1lbnQud2FzRGlzY2FyZGVkIHx8ICExO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XSksXG5cdFx0XHR0XG5cdFx0KTtcblx0fSkoKSkoKTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGlmZWN5Y2xlLmVzNS5qcy5tYXBcbiIsImNvbnN0IGNvbmZpZyA9IHtcblx0QVBJX1VSTDogJ2h0dHBzOi8vc2hpcC1wcm9kLTYyN2VkMDhmNDg5YTk3MDAxMzU3MmY1ZC5wYXJhbGVjdC5uZXQnLFxuXHRBUElfVVJMX0RFVjogJ2h0dHBzOi8vc2hpcC02MjdlZDA4ZjQ4OWE5NzAwMTM1NzJmNWQucGFyYWxlY3QubmV0J1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5cbmNvbnN0IEFQSV9VUkwgPSBwcm9jZXNzLmVudi5CVUlMRCA9PT0gJ2RldicgPyBjb25maWcuQVBJX1VSTF9ERVYgOiBjb25maWcuQVBJX1VSTDtcbi8vIGNvbnN0IEFQSV9VUkwgPSBjb25maWcuQVBJX1VSTF9ERVY7XG5cbmNvbnN0IENMQVNTX0RJVklERVIgPSAvIC9nO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9ERUJPVU5DRV9USU1FID0gNTAwO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfVEhST1RUTEVfVElNRSA9IDEwMDA7XG5cbmNvbnN0IGdldFBhcmVudHMgPSAoZWxlbWVudCkgPT4ge1xuXHRjb25zdCBwYXJlbnRzID0gW107XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG5cdGZvciAoOyBlbGVtZW50ICYmIGVsZW1lbnQgIT09IGRvY3VtZW50OyBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlKSB7XG5cdFx0cGFyZW50cy5wdXNoKGVsZW1lbnQpO1xuXHR9XG5cblx0cmV0dXJuIHBhcmVudHM7XG59O1xuXG5jb25zdCBnZXRDb3VudFNhbWVOb2RlTmFtZSA9IChlbGVtZW50c0FycmF5LCBlbGVtZW50KSA9PiB7XG5cdGxldCBjb3VudCA9IDA7XG5cblx0Wy4uLmVsZW1lbnRzQXJyYXldLmZvckVhY2goKGN1cnJlbnRFbGVtZW50KSA9PiB7XG5cdFx0aWYgKGN1cnJlbnRFbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkge1xuXHRcdFx0Y291bnQgKz0gMTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBjb3VudDtcbn07XG5cbmNvbnN0IGdldE50aE51bWJlciA9IChlbGVtZW50KSA9PiB7XG5cdGxldCBudGggPSAxO1xuXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25kLWFzc2lnbixuby1wYXJhbS1yZWFzc2lnblxuXHR3aGlsZSAoKGVsZW1lbnQgPSBlbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcpKSB7XG5cdFx0bnRoICs9IDE7XG5cdH1cblxuXHRyZXR1cm4gbnRoO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldENzc1BhdGggPSAoZWxlbWVudCkgPT4ge1xuXHRsZXQgZWxlbWVudFBhcmVudHMgPSBnZXRQYXJlbnRzKGVsZW1lbnQpO1xuXHRlbGVtZW50UGFyZW50cyA9IGVsZW1lbnRQYXJlbnRzLnNwbGljZSgwLCBlbGVtZW50UGFyZW50cy5sZW5ndGggLSAxKTtcblxuXHRjb25zdCBzZWxlY3RvcnNBcnJheSA9IFtdO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudFBhcmVudHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRjb25zdCBlbGVtZW50SXRlbSA9IGVsZW1lbnRQYXJlbnRzW2ldO1xuXG5cdFx0Y29uc3Qgbm9kZU5hbWUgPSBlbGVtZW50SXRlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0bGV0IGlkID0gJyc7XG5cdFx0bGV0IHNlbGVjdG9yID0gJyc7XG5cblx0XHRpZiAoZWxlbWVudEl0ZW0uaWQpIHtcblx0XHRcdGlkID0gYCMke2VsZW1lbnRJdGVtLmlkfWA7XG5cdFx0fVxuXG5cdFx0aWYgKGlkKSB7XG5cdFx0XHRzZWxlY3RvciA9IGlkO1xuXHRcdFx0c2VsZWN0b3JzQXJyYXkucHVzaChzZWxlY3Rvcik7XG5cdFx0XHRicmVhaztcblx0XHR9IGVsc2Uge1xuXHRcdFx0c2VsZWN0b3IgPSBub2RlTmFtZTtcblx0XHRcdGNvbnN0IHsgcGFyZW50Tm9kZSB9ID0gZWxlbWVudEl0ZW07XG5cblx0XHRcdGlmIChwYXJlbnROb2RlKSB7XG5cdFx0XHRcdGNvbnN0IHNpYmxpbmcgPSBwYXJlbnROb2RlLmNoaWxkcmVuO1xuXHRcdFx0XHRjb25zdCBjb3VudFNhbWVOb2RlTmFtZSA9IGdldENvdW50U2FtZU5vZGVOYW1lKHNpYmxpbmcsIGVsZW1lbnRJdGVtKTtcblxuXHRcdFx0XHRpZiAoc2libGluZy5sZW5ndGggPiAxICYmIGNvdW50U2FtZU5vZGVOYW1lID4gMSkge1xuXHRcdFx0XHRcdGNvbnN0IGNsYXNzTmFtZXMgPSBlbGVtZW50SXRlbS5jbGFzc05hbWVcblx0XHRcdFx0XHRcdD8gYC4ke2VsZW1lbnRJdGVtLmNsYXNzTmFtZS5yZXBsYWNlKENMQVNTX0RJVklERVIsICcuJyl9YFxuXHRcdFx0XHRcdFx0OiAnJztcblxuXHRcdFx0XHRcdGlmIChjbGFzc05hbWVzKSB7XG5cdFx0XHRcdFx0XHRzZWxlY3RvciArPSBjbGFzc05hbWVzO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb25zdCBudGhOdW1iZXIgPSBnZXROdGhOdW1iZXIoZWxlbWVudEl0ZW0pO1xuXHRcdFx0XHRcdFx0c2VsZWN0b3IgKz0gYDpudGgtY2hpbGQoJHtudGhOdW1iZXJ9KWA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c2VsZWN0b3JzQXJyYXkucHVzaChzZWxlY3Rvcik7XG5cdH1cblxuXHRjb25zdCByZXN1bHRQYXRoID0gc2VsZWN0b3JzQXJyYXkucmV2ZXJzZSgpLmpvaW4oJyA+ICcpO1xuXG5cdHJldHVybiByZXN1bHRQYXRoO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFZhbHVlID0gKGVsZW1lbnQpID0+IHtcblx0cmV0dXJuIGAke2VsZW1lbnQudmFsdWUgfHwgZWxlbWVudC5pbm5lclRleHQgfHwgJyd9YDtcbn07XG5cbmV4cG9ydCBjb25zdCBzZW5kRGF0YSA9ICh1cmwsIGRhdGEpID0+XG5cdGZldGNoKGAke3dpbmRvdy5XQVZFX0FQSV9VUkwgfHwgQVBJX1VSTH0vJHt1cmx9YCwge1xuXHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdGhlYWRlcnM6IHtcblx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcblx0XHR9LFxuXHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXG5cdH0pLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xuXG5leHBvcnQgY29uc3Qgc2VuZFRyYWNrRGF0YSA9ICh1c2VyRGF0YSwgdXJsLCBkYXRhKSA9PlxuXHRzZW5kRGF0YSh1cmwsIHtcblx0XHQuLi5kYXRhLFxuXHRcdHByb2plY3RJZDogdXNlckRhdGEucHJvamVjdElkLFxuXHRcdHZpc2l0b3JJZDogdXNlckRhdGEudmlzaXRvcklkLFxuXHRcdHNlc3Npb25JZDogdXNlckRhdGEuc2Vzc2lvbklkLFxuXHRcdC4uLih3aW5kb3cuTVdBVkVfQ09ORklHXG5cdFx0XHQ/IHtcblx0XHRcdFx0XHRzdWJQcm9qZWN0SWQ6IHdpbmRvdy5NV0FWRV9DT05GSUc/LnN1YlByb2plY3RJZCxcblx0XHRcdFx0XHRwYWdlSWQ6IHdpbmRvdy5NV0FWRV9DT05GSUc/LnBhZ2VJZFxuXHRcdFx0ICB9XG5cdFx0XHQ6IHt9KVxuXHR9KS50aGVuKCh0cmFja0RhdGEpID0+IHtcblx0XHRpZiAodHJhY2tEYXRhLnNlc3Npb25JZCkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG5cdFx0XHR1c2VyRGF0YS5zZXNzaW9uSWQgPSB0cmFja0RhdGEuc2Vzc2lvbklkO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cmFja0RhdGE7XG5cdH0pO1xuXG5leHBvcnQgY29uc3Qgc2VuZFRyYWNrRXZlbnQgPSAoeyB0eXBlLCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpLCBwYXlsb2FkIH0pID0+IHtcblx0bGV0IHVzZXJEYXRhID0gd2luZG93LldBVkVfVVNFUl9EQVRBO1xuXG5cdHJldHVybiBzZW5kRGF0YSgnd2F2ZUFjdGlvbnMnLCB7XG5cdFx0cHJvamVjdElkOiB1c2VyRGF0YS5wcm9qZWN0SWQsXG5cdFx0dmlzaXRvcklkOiB1c2VyRGF0YS52aXNpdG9ySWQsXG5cdFx0c2Vzc2lvbklkOiB1c2VyRGF0YS5zZXNzaW9uSWQsXG5cblx0XHQuLi4od2luZG93Lk1XQVZFX0NPTkZJR1xuXHRcdFx0PyB7XG5cdFx0XHRcdFx0c3ViUHJvamVjdElkOiB3aW5kb3cuTVdBVkVfQ09ORklHPy5zdWJQcm9qZWN0SWQsXG5cdFx0XHRcdFx0cGFnZUlkOiB3aW5kb3cuTVdBVkVfQ09ORklHPy5wYWdlSWRcblx0XHRcdCAgfVxuXHRcdFx0OiB7fSksXG5cblx0XHR0eXBlLFxuXHRcdHRpbWVzdGFtcCxcblx0XHRwYXlsb2FkXG5cdH0pLnRoZW4oKHRyYWNrRGF0YSkgPT4ge1xuXHRcdGlmICh0cmFja0RhdGEuc2Vzc2lvbklkKSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cblx0XHRcdHVzZXJEYXRhLnNlc3Npb25JZCA9IHRyYWNrRGF0YS5zZXNzaW9uSWQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRyYWNrRGF0YTtcblx0fSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VuZFBpbmcgPSAoKSA9PiB7XG5cdGxldCB1c2VyRGF0YSA9IHdpbmRvdy5XQVZFX1VTRVJfREFUQTtcblxuXHRyZXR1cm4gc2VuZERhdGEoJ3dhdmVBY3Rpb25zL3BpbmcnLCB7XG5cdFx0cHJvamVjdElkOiB1c2VyRGF0YS5wcm9qZWN0SWQsXG5cdFx0dmlzaXRvcklkOiB1c2VyRGF0YS52aXNpdG9ySWQsXG5cdFx0c2Vzc2lvbklkOiB1c2VyRGF0YS5zZXNzaW9uSWQsXG5cblx0XHQuLi4od2luZG93Lk1XQVZFX0NPTkZJR1xuXHRcdFx0PyB7XG5cdFx0XHRcdFx0c3ViUHJvamVjdElkOiB3aW5kb3cuTVdBVkVfQ09ORklHPy5zdWJQcm9qZWN0SWQsXG5cdFx0XHRcdFx0cGFnZUlkOiB3aW5kb3cuTVdBVkVfQ09ORklHPy5wYWdlSWRcblx0XHRcdCAgfVxuXHRcdFx0OiB7fSlcblx0fSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJIYW5kbGVycyA9ICh1c2VyRGF0YSwgaGFuZGxlcnMpID0+IHtcblx0aGFuZGxlcnMuZm9yRWFjaCgoaGFuZGxlcikgPT4gaGFuZGxlcih1c2VyRGF0YSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlYm91bmNlID0gKGZ1bmMsIGRlbGF5KSA9PiB7XG5cdGxldCBibG9ja2VySWQ7XG5cblx0cmV0dXJuIChhcmdzKSA9PiB7XG5cdFx0Y2xlYXJUaW1lb3V0KGJsb2NrZXJJZCk7XG5cdFx0YmxvY2tlcklkID0gc2V0VGltZW91dCgoKSA9PiBmdW5jKGFyZ3MpLCBkZWxheSk7XG5cdH07XG59O1xuXG5leHBvcnQgY29uc3QgdGhyb3R0bGUgPSAoZnVuYywgbGltaXQpID0+IHtcblx0bGV0IGlzQmxvY2tlZCA9IGZhbHNlO1xuXG5cdHJldHVybiAoYXJncykgPT4ge1xuXHRcdGlmIChpc0Jsb2NrZWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRmdW5jKGFyZ3MpO1xuXG5cdFx0aXNCbG9ja2VkID0gdHJ1ZTtcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdGlzQmxvY2tlZCA9IGZhbHNlO1xuXHRcdH0sIGxpbWl0KTtcblx0fTtcbn07XG5cbmNvbnN0IGluY2x1ZGVzID0gKGhheXN0YWNrLCBuZWVkbGUpID0+IHtcblx0cmV0dXJuIGhheXN0YWNrLmluZGV4T2YobmVlZGxlKSAhPT0gLTE7XG59O1xuXG5jb25zdCBmaW5kID0gKG5lZWRsZSkgPT4ge1xuXHRyZXR1cm4gaW5jbHVkZXMobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvY2FsZUxvd2VyQ2FzZSgpLCBuZWVkbGUpO1xufTtcblxuY29uc3Qgd2luZG93cyA9ICgpID0+IHtcblx0cmV0dXJuIGZpbmQoJ3dpbmRvd3MnKTtcbn07XG5cbmNvbnN0IGxpbnV4ID0gKCkgPT4ge1xuXHRyZXR1cm4gZmluZCgnbGludXgnKTtcbn07XG5cbmNvbnN0IGlwaG9uZSA9ICgpID0+IHtcblx0cmV0dXJuICF3aW5kb3dzKCkgJiYgZmluZCgnaXBob25lJyk7XG59O1xuXG5jb25zdCBpcG9kID0gKCkgPT4ge1xuXHRyZXR1cm4gZmluZCgnaXBvZCcpO1xufTtcblxuY29uc3QgaXBhZCA9ICgpID0+IHtcblx0Y29uc3QgaVBhZE9TMTNVcCA9IG5hdmlnYXRvci5wbGF0Zm9ybSA9PT0gJ01hY0ludGVsJyAmJiBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAxO1xuXHRyZXR1cm4gZmluZCgnaXBhZCcpIHx8IGlQYWRPUzEzVXA7XG59O1xuXG5jb25zdCBpb3MgPSAoKSA9PiB7XG5cdHJldHVybiBpcGhvbmUoKSB8fCBpcG9kKCkgfHwgaXBhZCgpO1xufTtcblxuY29uc3QgbWFjb3MgPSAoKSA9PiB7XG5cdHJldHVybiBmaW5kKCdtYWMnKTtcbn07XG5cbmNvbnN0IGFuZHJvaWQgPSAoKSA9PiB7XG5cdHJldHVybiAhd2luZG93cygpICYmIGZpbmQoJ2FuZHJvaWQnKTtcbn07XG5cbmNvbnN0IGFuZHJvaWRQaG9uZSA9ICgpID0+IHtcblx0cmV0dXJuIGFuZHJvaWQoKSAmJiBmaW5kKCdtb2JpbGUnKTtcbn07XG5cbmNvbnN0IGFuZHJvaWRUYWJsZXQgPSAoKSA9PiB7XG5cdHJldHVybiBhbmRyb2lkKCkgJiYgIWZpbmQoJ21vYmlsZScpO1xufTtcblxuY29uc3QgYmxhY2tiZXJyeSA9ICgpID0+IHtcblx0cmV0dXJuIGZpbmQoJ2JsYWNrYmVycnknKSB8fCBmaW5kKCdiYjEwJyk7XG59O1xuXG5jb25zdCBibGFja2JlcnJ5UGhvbmUgPSAoKSA9PiB7XG5cdHJldHVybiBibGFja2JlcnJ5KCkgJiYgIWZpbmQoJ3RhYmxldCcpO1xufTtcblxuY29uc3QgYmxhY2tiZXJyeVRhYmxldCA9ICgpID0+IHtcblx0cmV0dXJuIGJsYWNrYmVycnkoKSAmJiBmaW5kKCd0YWJsZXQnKTtcbn07XG5cbmNvbnN0IHdpbmRvd3NQaG9uZSA9ICgpID0+IHtcblx0cmV0dXJuIHdpbmRvd3MoKSAmJiBmaW5kKCdwaG9uZScpO1xufTtcblxuY29uc3Qgd2luZG93c1RhYmxldCA9ICgpID0+IHtcblx0cmV0dXJuIHdpbmRvd3MoKSAmJiBmaW5kKCd0b3VjaCcpICYmICF3aW5kb3dzUGhvbmUoKTtcbn07XG5cbmNvbnN0IGZ4b3MgPSAoKSA9PiB7XG5cdHJldHVybiAoZmluZCgnKG1vYmlsZScpIHx8IGZpbmQoJyh0YWJsZXQnKSkgJiYgZmluZCgnIHJ2OicpO1xufTtcblxuY29uc3QgZnhvc1Bob25lID0gKCkgPT4ge1xuXHRyZXR1cm4gZnhvcygpICYmIGZpbmQoJ21vYmlsZScpO1xufTtcblxuY29uc3QgZnhvc1RhYmxldCA9ICgpID0+IHtcblx0cmV0dXJuIGZ4b3MoKSAmJiBmaW5kKCd0YWJsZXQnKTtcbn07XG5cbmNvbnN0IG1lZWdvID0gKCkgPT4ge1xuXHRyZXR1cm4gZmluZCgnbWVlZ28nKTtcbn07XG5cbmNvbnN0IG1vYmlsZSA9ICgpID0+IHtcblx0cmV0dXJuIChcblx0XHRhbmRyb2lkUGhvbmUoKSB8fFxuXHRcdGlwaG9uZSgpIHx8XG5cdFx0aXBvZCgpIHx8XG5cdFx0d2luZG93c1Bob25lKCkgfHxcblx0XHRibGFja2JlcnJ5UGhvbmUoKSB8fFxuXHRcdGZ4b3NQaG9uZSgpIHx8XG5cdFx0bWVlZ28oKVxuXHQpO1xufTtcblxuY29uc3QgdGFibGV0ID0gKCkgPT4ge1xuXHRyZXR1cm4gaXBhZCgpIHx8IGFuZHJvaWRUYWJsZXQoKSB8fCBibGFja2JlcnJ5VGFibGV0KCkgfHwgd2luZG93c1RhYmxldCgpIHx8IGZ4b3NUYWJsZXQoKTtcbn07XG5cbmNvbnN0IGRlc2t0b3AgPSAoKSA9PiB7XG5cdHJldHVybiAhdGFibGV0KCkgJiYgIW1vYmlsZSgpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldERldmljZVR5cGUgPSAoKSA9PiB7XG5cdGlmIChkZXNrdG9wKCkpIHtcblx0XHRyZXR1cm4gJ2Rlc2t0b3AnO1xuXHR9XG5cblx0aWYgKHRhYmxldCgpKSB7XG5cdFx0cmV0dXJuICd0YWJsZXQnO1xuXHR9XG5cblx0aWYgKG1vYmlsZSgpKSB7XG5cdFx0cmV0dXJuICdtb2JpbGUnO1xuXHR9XG5cblx0cmV0dXJuICd1bmtub3duJztcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRPUyA9ICgpID0+IHtcblx0aWYgKGlvcygpKSB7XG5cdFx0cmV0dXJuICdpb3MnO1xuXHR9XG5cblx0aWYgKGFuZHJvaWQoKSkge1xuXHRcdHJldHVybiAnYW5kcm9pZCc7XG5cdH1cblxuXHRpZiAoYmxhY2tiZXJyeSgpKSB7XG5cdFx0cmV0dXJuICdibGFja2JlcnJ5Jztcblx0fVxuXG5cdGlmIChtYWNvcygpKSB7XG5cdFx0cmV0dXJuICdtYWNvcyc7XG5cdH1cblxuXHRpZiAod2luZG93cygpKSB7XG5cdFx0cmV0dXJuICd3aW5kb3dzJztcblx0fVxuXG5cdGlmIChsaW51eCgpKSB7XG5cdFx0cmV0dXJuICdsaW51eCc7XG5cdH1cblxuXHRpZiAoZnhvcygpKSB7XG5cdFx0cmV0dXJuICdmeG9zJztcblx0fVxuXG5cdGlmIChtZWVnbygpKSB7XG5cdFx0cmV0dXJuICdtZWVnbyc7XG5cdH1cblxuXHRyZXR1cm4gJ3Vua25vd24nO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXJOYW1lID0gKCkgPT4ge1xuXHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdFZGdlJykgPiAtMSAmJiBuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKCdFZGdlJykgPiAtMSkge1xuXHRcdHJldHVybiAnRWRnZSc7XG5cdH1cblxuXHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdPcGVyYScpICE9PSAtMSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09QUicpICE9PSAtMSkge1xuXHRcdHJldHVybiAnT3BlcmEnO1xuXHR9XG5cblx0aWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lJykgIT09IC0xKSB7XG5cdFx0cmV0dXJuICdDaHJvbWUnO1xuXHR9XG5cblx0aWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignU2FmYXJpJykgIT09IC0xKSB7XG5cdFx0cmV0dXJuICdTYWZhcmknO1xuXHR9XG5cblx0aWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignRmlyZWZveCcpICE9PSAtMSkge1xuXHRcdHJldHVybiAnRmlyZWZveCc7XG5cdH1cblxuXHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdNU0lFJykgIT09IC0xIHx8ICEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlID09PSB0cnVlKSB7XG5cdFx0Ly8gSUYgSUUgPiAxMHtcblx0XHRyZXR1cm4gJ0lFJztcblx0fVxuXG5cdHJldHVybiAndW5rbm93bic7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q29ubmVjdGlvblR5cGUgPSAoKSA9PiB7XG5cdGNvbnN0IGNvbm5lY3Rpb25UeXBlID0gbmF2aWdhdG9yICYmIG5hdmlnYXRvci5jb25uZWN0aW9uICYmIG5hdmlnYXRvci5jb25uZWN0aW9uLnR5cGU7IC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9OZXR3b3JrX0luZm9ybWF0aW9uX0FQSVxuXG5cdHJldHVybiBjb25uZWN0aW9uVHlwZTtcbn07XG4iLCJpbXBvcnQgeyBzZW5kVHJhY2tEYXRhLCBnZXRDc3NQYXRoLCBnZXRWYWx1ZSB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCAodXNlckRhdGEpID0+IHtcblx0aWYgKHdpbmRvdy5XQVZFX1RSQUNLX0NMSUNLUykge1xuXHRcdGNvbnN0IGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRjb25zdCBkYXRhID0ge1xuXHRcdFx0XHR0eXBlOiAnY2xpY2snLFxuXHRcdFx0XHR0aW1lc3RhbXA6IERhdGUubm93KCksXG5cdFx0XHRcdHBheWxvYWQ6IHtcblx0XHRcdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRcdFx0eDogZXZlbnQuY2xpZW50WCxcblx0XHRcdFx0XHRcdHk6IGV2ZW50LmNsaWVudFlcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHNlbGVjdG9yOiBnZXRDc3NQYXRoKGV2ZW50LnRhcmdldCksXG5cdFx0XHRcdFx0dmFsdWU6IGdldFZhbHVlKGV2ZW50LnRhcmdldClcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdC8vIGNvcnJlY3RzIGNsaWNscyBhZnRlciBzY3JvbGxpbmdcblx0XHRcdHNlbmRUcmFja0RhdGEodXNlckRhdGEsICd3YXZlQWN0aW9ucycsIHtcblx0XHRcdFx0dHlwZTogJ3BhZ2VTY3JvbGwnLFxuXHRcdFx0XHR0aW1lc3RhbXA6IERhdGUubm93KCksXG5cdFx0XHRcdHBheWxvYWQ6IHtcblx0XHRcdFx0XHRvZmZzZXQ6IHtcblx0XHRcdFx0XHRcdHg6IHdpbmRvdy5wYWdlWE9mZnNldCxcblx0XHRcdFx0XHRcdHk6IHdpbmRvdy5wYWdlWU9mZnNldFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRzZW5kVHJhY2tEYXRhKHVzZXJEYXRhLCAnd2F2ZUFjdGlvbnMnLCBkYXRhKTtcblx0XHR9O1xuXHRcdHJldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDbGljaywgeyBjYXB0dXJlOiB0cnVlLCBwYXNzaXZlOiB0cnVlIH0pO1xuXHR9XG59O1xuXG4vLyBjbGlja3MgZG9lc24ndCB3b3JrIG9uIGRpc2FibGVkIGVsZW1lbnRzLlxuLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSLzIwMTQvUkVDLWh0bWw1LTIwMTQxMDI4L2Zvcm1zLmh0bWwjY29uY2VwdC1mZS1kaXNhYmxlZFxuIiwiaW1wb3J0IHsgc2VuZFRyYWNrRGF0YSwgZGVib3VuY2UsIERFRkFVTFRfREVCT1VOQ0VfVElNRSB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCAodXNlckRhdGEpID0+IHtcblx0Ly8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG5cdC8vIFx0J3Jlc2l6ZScsXG5cdC8vIFx0ZGVib3VuY2UoXG5cdC8vIFx0XHQoKSA9PlxuXHQvLyBcdFx0XHRzZW5kVHJhY2tEYXRhKHVzZXJEYXRhLCAnd2F2ZUFjdGlvbnMnLCB7XG5cdC8vIFx0XHRcdFx0dHlwZTogJ3Jlc2l6ZScsXG5cdC8vIFx0XHRcdFx0dGltZXN0YW1wOiBEYXRlLm5vdygpLFxuXHQvLyBcdFx0XHRcdHBheWxvYWQ6IHtcblx0Ly8gXHRcdFx0XHRcdHNpemU6IHtcblx0Ly8gXHRcdFx0XHRcdFx0d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuXHQvLyBcdFx0XHRcdFx0XHRoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodFxuXHQvLyBcdFx0XHRcdFx0fVxuXHQvLyBcdFx0XHRcdH1cblx0Ly8gXHRcdFx0fSksXG5cdC8vIFx0XHRERUZBVUxUX0RFQk9VTkNFX1RJTUVcblx0Ly8gXHQpXG5cdC8vICk7XG59O1xuIiwiaW1wb3J0IHsgc2VuZFRyYWNrRGF0YSwgdGhyb3R0bGUgfSBmcm9tICcuLi9oZWxwZXJzJztcblxuY29uc3QgU0NST0xMX1RIUk9UVExFX1RJTUUgPSAxMDA7XG5cbmV4cG9ydCBkZWZhdWx0ICh1c2VyRGF0YSkgPT4ge1xuXHQvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcblx0Ly8gXHQnc2Nyb2xsJyxcblx0Ly8gXHR0aHJvdHRsZShcblx0Ly8gXHRcdCgpID0+XG5cdC8vIFx0XHRcdHNlbmRUcmFja0RhdGEodXNlckRhdGEsICd3YXZlQWN0aW9ucycsIHtcblx0Ly8gXHRcdFx0XHR0eXBlOiAncGFnZVNjcm9sbCcsXG5cdC8vIFx0XHRcdFx0dGltZXN0YW1wOiBEYXRlLm5vdygpLFxuXHQvLyBcdFx0XHRcdHBheWxvYWQ6IHtcblx0Ly8gXHRcdFx0XHRcdG9mZnNldDoge1xuXHQvLyBcdFx0XHRcdFx0XHR4OiB3aW5kb3cucGFnZVhPZmZzZXQsXG5cdC8vIFx0XHRcdFx0XHRcdHk6IHdpbmRvdy5wYWdlWU9mZnNldFxuXHQvLyBcdFx0XHRcdFx0fVxuXHQvLyBcdFx0XHRcdH1cblx0Ly8gXHRcdFx0fSksXG5cdC8vIFx0XHRTQ1JPTExfVEhST1RUTEVfVElNRVxuXHQvLyBcdClcblx0Ly8gKTtcbn07XG4iLCJpbXBvcnQgeyBzZW5kVHJhY2tEYXRhIH0gZnJvbSAnLi4vaGVscGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0ICh1c2VyRGF0YSkgPT4ge1xuXHRpZiAod2luZG93LldBVkVfVFJBQ0tfRk9STVMpIHtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtJykuZm9yRWFjaCgoZm9ybSkgPT4ge1xuXHRcdFx0bGV0IGVtYWlsRWwgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9ZW1haWxdJylbMF07XG5cblx0XHRcdGlmIChlbWFpbEVsKSB7XG5cdFx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKCkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGFjdGlvbkRhdGEgPSB7XG5cdFx0XHRcdFx0XHR0eXBlOiAnc2lnbnVwJyxcblx0XHRcdFx0XHRcdHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcblx0XHRcdFx0XHRcdHBheWxvYWQ6IHt9XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdHNlbmRUcmFja0RhdGEodXNlckRhdGEsICd3YXZlQWN0aW9ucycsIGFjdGlvbkRhdGEpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufTtcbiIsImltcG9ydCB7IHNlbmRUcmFja0RhdGEsIHRocm90dGxlIH0gZnJvbSAnLi4vaGVscGVycyc7XG5cbi8vIFByb2JhYmx5IHdlIG5lZWQgaXQgbGVzcyB0aGFuIDIwMG1zXG4vLyBmb3IgYmV0dGVyIHF1YWxpdHkgb2YgXCJWaXNpdG9yIEFjdGlvbnMgUGxheWVyXCJcbmNvbnN0IE1PVVNFX01PVkVfVEhST1RUTEVfVElNRSA9IDEwMDtcblxuY29uc3QgQUNUSU9OX1NFTkRfSU5URVJWQUwgPSAzMDAwO1xuXG5jb25zdCBldmVudEJ1ZmZlciA9IHtcblx0ZGF0YTogW10sXG5cdGxhdGVzdFNlbmQ6IERhdGUubm93KClcbn07XG5cbmNvbnN0IG1vdXNlTW92ZUhhbmRsZXIgPSAodXNlckRhdGEpID0+IHtcblx0Ly8gZnVuY3Rpb24gaGFuZGxlRXZlbnQoZXZlbnQpIHtcblx0Ly8gXHRjb25zdCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuXHQvLyBcdGNvbnN0IHJlY29yZCA9IHtcblx0Ly8gXHRcdHg6IGV2ZW50LmNsaWVudFgsXG5cdC8vIFx0XHR5OiBldmVudC5jbGllbnRZLFxuXHQvLyBcdFx0dGltZXN0YW1wXG5cdC8vIFx0fTtcblx0Ly8gXHRldmVudEJ1ZmZlci5kYXRhLnB1c2gocmVjb3JkKTtcblx0Ly8gXHRpZiAodGltZXN0YW1wIC0gZXZlbnRCdWZmZXIubGF0ZXN0U2VuZCA+IEFDVElPTl9TRU5EX0lOVEVSVkFMKSB7XG5cdC8vIFx0XHRjb25zdCBtYW55UmVjb3JkcyA9IHtcblx0Ly8gXHRcdFx0dHlwZTogJ21vdXNlTW92ZScsXG5cdC8vIFx0XHRcdHBheWxvYWQ6IHtcblx0Ly8gXHRcdFx0XHRiYXRjaDogZXZlbnRCdWZmZXIuZGF0YVxuXHQvLyBcdFx0XHR9XG5cdC8vIFx0XHR9O1xuXHQvLyBcdFx0ZXZlbnRCdWZmZXIuZGF0YSA9IFtdO1xuXHQvLyBcdFx0ZXZlbnRCdWZmZXIubGF0ZXN0U2VuZCA9IERhdGUubm93KCk7XG5cdC8vIFx0XHRzZW5kVHJhY2tEYXRhKHVzZXJEYXRhLCAnd2F2ZUFjdGlvbnMnLCBtYW55UmVjb3Jkcyk7XG5cdC8vIFx0fVxuXHQvLyB9XG5cdC8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aHJvdHRsZShoYW5kbGVFdmVudCwgTU9VU0VfTU9WRV9USFJPVFRMRV9USU1FKSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtb3VzZU1vdmVIYW5kbGVyO1xuIiwiaW1wb3J0IHsgc2VuZFRyYWNrRGF0YSB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlTG9jYXRpb25DaGFuZ2UgPSAodXNlckRhdGEpID0+IHtcblx0Y29uc3QgeyBocmVmIH0gPSB3aW5kb3cubG9jYXRpb247XG5cblx0Y29uc3QgYWN0aW9uRGF0YSA9IHtcblx0XHR0eXBlOiAncGF0aENoYW5nZScsXG5cdFx0dGltZXN0YW1wOiBEYXRlLm5vdygpLFxuXHRcdHBheWxvYWQ6IHtcblx0XHRcdHZhbHVlOiBocmVmXG5cdFx0fVxuXHR9O1xuXG5cdHNlbmRUcmFja0RhdGEodXNlckRhdGEsICd3YXZlQWN0aW9ucycsIGFjdGlvbkRhdGEpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgKHVzZXJEYXRhKSA9PiB7XG5cdHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSA9ICgoZikgPT5cblx0XHRmdW5jdGlvbiBwdXNoU3RhdGUoLi4uYXJnKSB7XG5cdFx0XHRjb25zdCByZXQgPSBmLmFwcGx5KHRoaXMsIGFyZyk7XG5cblx0XHRcdHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9jYXRpb25jaGFuZ2UnKSk7XG5cblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fSkod2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKTtcblxuXHR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUgPSAoKGYpID0+XG5cdFx0ZnVuY3Rpb24gcmVwbGFjZVN0YXRlKC4uLmFyZykge1xuXHRcdFx0Y29uc3QgcmV0ID0gZi5hcHBseSh0aGlzLCBhcmcpO1xuXG5cdFx0XHR3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2xvY2F0aW9uY2hhbmdlJykpO1xuXG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH0pKHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgKCkgPT4ge1xuXHRcdHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9jYXRpb25jaGFuZ2UnKSk7XG5cdH0pO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgKCkgPT4ge1xuXHRcdHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9jYXRpb25jaGFuZ2UnKSk7XG5cdH0pO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwYWdlc2hvdycsICgpID0+IHtcblx0XHR3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2xvY2F0aW9uY2hhbmdlJykpO1xuXHR9KTtcblxuXHRyZXR1cm4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvY2F0aW9uY2hhbmdlJywgKCkgPT4ge1xuXHRcdGxldCBpc1NraXBMb2NhdGlvbkNoYW5nZSA9IHdpbmRvdy5NV0FWRV9DT05GSUc/LmlzU2tpcExvY2F0aW9uQ2hhbmdlO1xuXG5cdFx0aWYgKCFpc1NraXBMb2NhdGlvbkNoYW5nZSkge1xuXHRcdFx0aGFuZGxlTG9jYXRpb25DaGFuZ2UodXNlckRhdGEpO1xuXHRcdH1cblx0fSk7XG59O1xuIiwiaW1wb3J0IGNvbmZpZyBmcm9tICcuLy4uL2NvbmZpZyc7XG5cbmNvbnN0IEFQSV9VUkwgPSBwcm9jZXNzLmVudi5CVUlMRCA9PT0gJ2RldicgPyBjb25maWcuQVBJX1VSTF9ERVYgOiBjb25maWcuQVBJX1VSTDtcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRyZWdpc3RlcigpIHtcblx0XHRsaWZlY3ljbGUuYWRkRXZlbnRMaXN0ZW5lcignc3RhdGVjaGFuZ2UnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdGlmIChldmVudC5uZXdTdGF0ZSA9PT0gJ2hpZGRlbicpIHtcblx0XHRcdFx0bGV0IHVzZXJEYXRhID0gd2luZG93LldBVkVfVVNFUl9EQVRBO1xuXG5cdFx0XHRcdGlmICh1c2VyRGF0YSkge1xuXHRcdFx0XHRcdGxldCBkYXRhID0ge1xuXHRcdFx0XHRcdFx0cHJvamVjdElkOiB1c2VyRGF0YS5wcm9qZWN0SWQsXG5cdFx0XHRcdFx0XHR2aXNpdG9ySWQ6IHVzZXJEYXRhLnZpc2l0b3JJZCxcblx0XHRcdFx0XHRcdHNlc3Npb25JZDogdXNlckRhdGEuc2Vzc2lvbklkXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdG5hdmlnYXRvci5zZW5kQmVhY29uKFxuXHRcdFx0XHRcdFx0YCR7d2luZG93LldBVkVfQVBJX1VSTCB8fCBBUElfVVJMfS93YXZlQWN0aW9ucy9waW5nYCxcblx0XHRcdFx0XHRcdEpTT04uc3RyaW5naWZ5KGRhdGEpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59O1xuIiwiaW1wb3J0IHsgc2VuZFRyYWNrRGF0YSB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5jb25zdCByZW1vdmVUYWdzID0gKG5vZGUsIHRhZ05hbWUpID0+IHtcblx0Y29uc3Qgbm9kZUNsb25lZCA9IG5vZGUuY2xvbmVOb2RlKHRydWUpO1xuXHRjb25zdCB0YWdzID0gbm9kZUNsb25lZC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWdOYW1lKTtcblxuXHR3aGlsZSAodGFncy5sZW5ndGgpIHtcblx0XHR0YWdzWzBdLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGFnc1swXSk7XG5cdH1cblxuXHRyZXR1cm4gbm9kZUNsb25lZDtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVEYW5nZXJvdXNUYWdzID0gKG5vZGUpID0+IHtcblx0Y29uc3Qgcm9vdFdpdGhvdXRTY3JpcHRzID0gcmVtb3ZlVGFncyhub2RlLCAnc2NyaXB0Jyk7XG5cdGNvbnN0IHJvb3RXaXRob3V0SWZyYW1lcyA9IHJlbW92ZVRhZ3Mocm9vdFdpdGhvdXRTY3JpcHRzLCAnaWZyYW1lJyk7XG5cdHJldHVybiByb290V2l0aG91dElmcmFtZXM7XG59O1xuXG5sZXQgcHJldldpZHRoO1xubGV0IHByZXZIZWlnaHQ7XG5cbmNvbnN0IGhhbmRsZU11dGF0aW9uID0gKHVzZXJEYXRhKSA9PiB7XG5cdGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaHRtbCcpWzBdO1xuXHRpZiAoIXJvb3QpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRbLi4ucm9vdC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpXS5mb3JFYWNoKChlbCkgPT4ge1xuXHRcdGlmICghZWwuZ2V0QXR0cmlidXRlKCd2YWx1ZScpICYmIGVsLnZhbHVlKSB7XG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZWwudmFsdWUpO1xuXHRcdH1cblx0fSk7XG5cblx0Y29uc3Qgcm9vdFdpdGhvdXREYW5nZXJvdXNUYWdzID0gcmVtb3ZlRGFuZ2Vyb3VzVGFncyhyb290KTtcblx0Y29uc3Qgc2NyZWVuID0gcm9vdFdpdGhvdXREYW5nZXJvdXNUYWdzLm91dGVySFRNTDtcblxuXHRjb25zdCB3aWR0aCA9IHJvb3Qub2Zmc2V0V2lkdGg7XG5cdGNvbnN0IGhlaWdodCA9IHJvb3Qub2Zmc2V0SGVpZ2h0O1xuXG5cdGlmIChwcmV2V2lkdGggIT09IHdpZHRoICYmIHByZXZIZWlnaHQgIT09IGhlaWdodCkge1xuXHRcdHNlbmRUcmFja0RhdGEodXNlckRhdGEsICd3YXZlUmVjb3JkcycsIHtcblx0XHRcdHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcblx0XHRcdHBheWxvYWQ6IHtcblx0XHRcdFx0c2l6ZToge1xuXHRcdFx0XHRcdHdpZHRoLFxuXHRcdFx0XHRcdGhlaWdodFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzY3JlZW5cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHByZXZXaWR0aCA9IHdpZHRoO1xuXHRcdHByZXZIZWlnaHQgPSBoZWlnaHQ7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGhhbmRsZU11dGF0aW9uO1xuIiwiaW1wb3J0IHsgZGVib3VuY2UsIERFRkFVTFRfREVCT1VOQ0VfVElNRSB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5pbXBvcnQgaGFuZGxlTXV0YXRpb24gZnJvbSAnLi9tdXRhdGlvbic7XG5cbmNvbnN0IGluaXQgPSAodXNlckRhdGEpID0+IHtcbiAgY29uc3QgTXV0YXRpb25PYnNlcnZlciA9IHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyXG4gIHx8IHdpbmRvdy5XZWJLaXRNdXRhdGlvbk9ic2VydmVyXG4gIHx8IHdpbmRvdy5Nb3pNdXRhdGlvbk9ic2VydmVyO1xuXG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoXG4gICAgZGVib3VuY2UoKCkgPT4gaGFuZGxlTXV0YXRpb24odXNlckRhdGEpLCBERUZBVUxUX0RFQk9VTkNFX1RJTUUpLFxuICApO1xuICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCB7IHN1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgYXR0cmlidXRlczogdHJ1ZSB9KTtcbiAgaGFuZGxlTXV0YXRpb24odXNlckRhdGEpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0LFxufTtcbiIsImltcG9ydCAnLi9saWIvZmluZ2VycHJpbnQyLm1pbic7XG5pbXBvcnQgJy4vbGliL2xpZmVjeWNsZSc7XG5pbXBvcnQgY2xpY2tIYW5kbGVyIGZyb20gJy4vYWN0aW9ucy9jbGljayc7XG5pbXBvcnQgcGFnZVJlc2l6ZUhhbmRsZXIgZnJvbSAnLi9hY3Rpb25zL3BhZ2VSZXNpemUnO1xuaW1wb3J0IHBhZ2VTY3JvbGxpbmdIYW5kbGVyIGZyb20gJy4vYWN0aW9ucy9wYWdlU2Nyb2xsaW5nJztcbmltcG9ydCBzaWdudXBIYW5kbGVyIGZyb20gJy4vYWN0aW9ucy9zaWdudXAnO1xuaW1wb3J0IG1vdXNlTW92ZUhhbmRsZXIgZnJvbSAnLi9hY3Rpb25zL21vdXNlTW92ZSc7XG5pbXBvcnQgcGF0aENoYW5nZUhhbmRsZXIsIHsgaGFuZGxlTG9jYXRpb25DaGFuZ2UgfSBmcm9tICcuL2FjdGlvbnMvcGF0aENoYW5nZSc7XG5pbXBvcnQgb25FeGl0IGZyb20gJy4vYWN0aW9ucy9vbkV4aXQnO1xuXG5pbXBvcnQgdHJhY2tlck11dGF0aW9uT2JzZXJ2ZXIgZnJvbSAnLi9yZWNvcmRzL29ic2VydmVyJztcblxuaW1wb3J0IHtcblx0c2VuZERhdGEsXG5cdHJlZ2lzdGVySGFuZGxlcnMsXG5cdGdldERldmljZVR5cGUsXG5cdGdldEJyb3dzZXJOYW1lLFxuXHRnZXRDb25uZWN0aW9uVHlwZSxcblx0Z2V0T1MsXG5cdHNlbmRUcmFja0V2ZW50LFxuXHRzZW5kUGluZ1xufSBmcm9tICcuL2hlbHBlcnMnO1xuXG50cnkge1xuXHRvbkV4aXQucmVnaXN0ZXIoKTtcbn0gY2F0Y2ggKGVycikgeyB9XG5cbndpbmRvdy5td2F2ZSA9IHtcblx0c2VuZFRyYWNrRXZlbnQsXG5cdHNlbmRQaW5nXG59O1xuXG5pZiAocHJvY2Vzcy5lbnYuQlVJTEQgPT09ICdkZXYnKSB7XG5cdGlmIChGaW5nZXJwcmludDIgJiYgRmluZ2VycHJpbnQyLmdldFYxOCkge1xuXHRcdGNvbnNvbGUubG9nKCdGaW5nZXJwcmludDIuZ2V0VjE4OicsIHR5cGVvZiBGaW5nZXJwcmludDIuZ2V0VjE4KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXHR9IGVsc2Uge1xuXHRcdGNvbnNvbGUuZXJyb3IoJ0ZpbmdlcnByaW50MiBub3QgbG9hZGVkIGNvcnJlY3RseSEnLCBGaW5nZXJwcmludDIpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cdH1cbn1cblxuY29uc3QgZGVmYXVsdEhhbmRsZXJzID0gW1xuXHRjbGlja0hhbmRsZXIsXG5cdHBhZ2VSZXNpemVIYW5kbGVyLFxuXHRwYWdlU2Nyb2xsaW5nSGFuZGxlcixcblx0c2lnbnVwSGFuZGxlcixcblx0bW91c2VNb3ZlSGFuZGxlcixcblx0cGF0aENoYW5nZUhhbmRsZXJcbl07XG5cbmNvbnN0IGNhbGNJZGVudGlmaWNhdG9yID0gKCkgPT5cblx0bmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG5cdFx0RmluZ2VycHJpbnQyLmdldFYxOCgocmVzdWx0KSA9PiB7XG5cdFx0XHRpZiAoIXJlc3VsdCkge1xuXHRcdFx0XHRyZWoobmV3IEVycm9yKCdJZGVudGlmaWNhdG9yIG5vdCBjcmVhdGVkIScpKTtcblx0XHRcdH1cblxuXHRcdFx0cmVzKHJlc3VsdCk7XG5cdFx0fSk7XG5cdH0pO1xuXG5mdW5jdGlvbiBzZXRDb29raWUoY19uYW1lLCB2YWx1ZSwgZXhkYXlzKSB7XG5cdHZhciBleGRhdGUgPSBuZXcgRGF0ZSgpO1xuXHRleGRhdGUuc2V0RGF0ZShleGRhdGUuZ2V0RGF0ZSgpICsgZXhkYXlzKTtcblx0dmFyIGNfdmFsdWUgPSBlc2NhcGUodmFsdWUpICsgKGV4ZGF5cyA9PSBudWxsID8gJycgOiAnOyBleHBpcmVzPScgKyBleGRhdGUudG9VVENTdHJpbmcoKSk7XG5cdGRvY3VtZW50LmNvb2tpZSA9IGNfbmFtZSArICc9JyArIGNfdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldENvb2tpZShjX25hbWUpIHtcblx0dmFyIGksXG5cdFx0eCxcblx0XHR5LFxuXHRcdEFSUmNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcblx0Zm9yIChpID0gMDsgaSA8IEFSUmNvb2tpZXMubGVuZ3RoOyBpKyspIHtcblx0XHR4ID0gQVJSY29va2llc1tpXS5zdWJzdHIoMCwgQVJSY29va2llc1tpXS5pbmRleE9mKCc9JykpO1xuXHRcdHkgPSBBUlJjb29raWVzW2ldLnN1YnN0cihBUlJjb29raWVzW2ldLmluZGV4T2YoJz0nKSArIDEpO1xuXHRcdHggPSB4LnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcblx0XHRpZiAoeCA9PSBjX25hbWUpIHtcblx0XHRcdHJldHVybiB1bmVzY2FwZSh5KTtcblx0XHR9XG5cdH1cbn1cblxuY29uc3QgaW5pdCA9XG5cdChpbml0aWFsVXNlckRhdGEsIGhhbmRsZXJzID0gZGVmYXVsdEhhbmRsZXJzKSA9PlxuXHRcdCgpID0+IHtcblx0XHRcdGNvbnN0IHVzZXJEYXRhID0geyAuLi5pbml0aWFsVXNlckRhdGEgfTtcblxuXHRcdFx0cmV0dXJuIGNhbGNJZGVudGlmaWNhdG9yKClcblx0XHRcdFx0LnRoZW4oKHZpc2l0b3JJZCkgPT4ge1xuXHRcdFx0XHRcdHVzZXJEYXRhLnZpc2l0b3JJZCA9IHZpc2l0b3JJZDtcblx0XHRcdFx0XHRzZXRDb29raWUoJ3dhdmVfZmluZ2VycHJpbnQnLCB2aXNpdG9ySWQpO1xuXHRcdFx0XHRcdHdpbmRvdy5XQVZFX0ZJTkdFUlBSSU5UID0gdmlzaXRvcklkO1xuXG5cdFx0XHRcdFx0bGV0IHNlYXJjaFF1ZXJ5ID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcblxuXHRcdFx0XHRcdHJldHVybiBmZXRjaCgnaHR0cHM6Ly9hcGkuaXBpZnkub3JnJylcblx0XHRcdFx0XHRcdC50aGVuKChyZXMpID0+IHJlcy50ZXh0KCkpXG5cdFx0XHRcdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBwYXlsb2FkID0ge1xuXHRcdFx0XHRcdFx0XHRcdG9zOiBnZXRPUygpLFxuXHRcdFx0XHRcdFx0XHRcdGJyb3dzZXJOYW1lOiBnZXRCcm93c2VyTmFtZSgpLFxuXHRcdFx0XHRcdFx0XHRcdGRldmljZVR5cGU6IGdldERldmljZVR5cGUoKSxcblx0XHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uVHlwZTogZ2V0Q29ubmVjdGlvblR5cGUoKSxcblx0XHRcdFx0XHRcdFx0XHRpcEFkZHJlc3M6IGRhdGEsXG5cblx0XHRcdFx0XHRcdFx0XHRyZWZlcnJlclVybDogZG9jdW1lbnQucmVmZXJyZXIsXG5cdFx0XHRcdFx0XHRcdFx0c2VhcmNoUXVlcnlcblx0XHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0XHRjb25zdCBzZXNzaW9uID0gSlNPTi5wYXJzZShcblx0XHRcdFx0XHRcdFx0XHRsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgd2F2ZV9zZXNzaW9uXyR7d2luZG93LldBVkVfU1VCUFJPSkVDVF9JRCB8fCAnJ31gKVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRjb25zdCBURU5fTUlOVVRFU19NUyA9IDEgKiA2MCAqIDEwMDA7XG5cblx0XHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHRcdHNlc3Npb24gJiZcblx0XHRcdFx0XHRcdFx0XHRzZXNzaW9uLnNlc3Npb25JZCAmJlxuXHRcdFx0XHRcdFx0XHRcdG5ldyBEYXRlKCkgLSBuZXcgRGF0ZShzZXNzaW9uLnVwZGF0ZWRPbikgPCBURU5fTUlOVVRFU19NU1xuXHRcdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0c2Vzc2lvbklkOiBzZXNzaW9uLnNlc3Npb25JZFxuXHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gc2VuZERhdGEoJ3dhdmVTZXNzaW9ucy9pbml0Jywge1xuXHRcdFx0XHRcdFx0XHRcdHZpc2l0b3JJZCxcblx0XHRcdFx0XHRcdFx0XHRkb21haW46IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSxcblx0XHRcdFx0XHRcdFx0XHR1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuXHRcdFx0XHRcdFx0XHRcdHBheWxvYWQsXG5cdFx0XHRcdFx0XHRcdFx0cHJvamVjdElkOiB1c2VyRGF0YS5wcm9qZWN0SWQsXG5cblx0XHRcdFx0XHRcdFx0XHQuLi4od2luZG93Lk1XQVZFX0NPTkZJR1xuXHRcdFx0XHRcdFx0XHRcdFx0PyB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHN1YlByb2plY3RJZDogd2luZG93Lk1XQVZFX0NPTkZJRz8uc3ViUHJvamVjdElkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRwYWdlSWQ6IHdpbmRvdy5NV0FWRV9DT05GSUc/LnBhZ2VJZFxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0OiB7fSlcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LnRoZW4oKHsgc2Vzc2lvbklkIH0pID0+IHtcblx0XHRcdFx0XHRpZiAoc2Vzc2lvbklkKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBzZXRTZXNzaW9uID0gKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcblx0XHRcdFx0XHRcdFx0XHQnd2F2ZV9zZXNzaW9uJyxcblx0XHRcdFx0XHRcdFx0XHRKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdFx0XHRcdFx0XHRzZXNzaW9uSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHR1cGRhdGVkT246IG5ldyBEYXRlKClcblx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0c2V0U2Vzc2lvbigpO1xuXHRcdFx0XHRcdFx0d2luZG93LldBVkVfU0VTU0lPTl9JRCA9IHNlc3Npb25JZDtcblx0XHRcdFx0XHRcdHNldEludGVydmFsKHNldFNlc3Npb24sIDEwICogMTAwMCk7XG5cblx0XHRcdFx0XHRcdHVzZXJEYXRhLnNlc3Npb25JZCA9IHNlc3Npb25JZDtcblxuXHRcdFx0XHRcdFx0cmVnaXN0ZXJIYW5kbGVycyh1c2VyRGF0YSwgaGFuZGxlcnMpO1xuXHRcdFx0XHRcdFx0d2luZG93LldBVkVfVVNFUl9EQVRBID0gdXNlckRhdGE7XG5cdFx0XHRcdFx0XHR0cmFja2VyTXV0YXRpb25PYnNlcnZlci5pbml0KHVzZXJEYXRhKTtcblx0XHRcdFx0XHRcdGhhbmRsZUxvY2F0aW9uQ2hhbmdlKHVzZXJEYXRhKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHByb2Nlc3MuZW52LkJVSUxEID09PSAnZGV2Jykge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcsIHNlc3Npb25JZCBub3Qgc2V0dGVkOicsIHNlc3Npb25JZCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0dXNlckRhdGFcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9KTtcblx0XHR9O1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGluaXRcbn07XG4iLCJpbXBvcnQgdHJhY2tlciBmcm9tICcuL3RyYWNrZXInO1xuXG5leHBvcnQgZGVmYXVsdCAoKCkgPT4ge1xuXHRjb25zdCBwYXJhbXMgPSB3aW5kb3cud2F2ZSAmJiB3aW5kb3cud2F2ZS5wYXJhbXM7XG5cblx0aWYgKHByb2Nlc3MuZW52LkJVSUxEID09PSAnZGV2Jykge1xuXHRcdGNvbnNvbGUubG9nKCdXYXZlIHNjcmlwdCBwYXJhbXM6JywgcGFyYW1zKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXHR9XG5cblx0Ly8gZG9uJ3QgY2hhbmdlIG9iamVjdCdzIGxpbmsuXG5cdGNvbnN0IHVzZXJEYXRhID0ge1xuXHRcdHZpc2l0b3JJZDogbnVsbCxcblx0XHRzZXNzaW9uSWQ6IG51bGwsXG5cdFx0cHJvamVjdElkOiBwYXJhbXMgJiYgcGFyYW1zLnBpZFxuXHR9O1xuXG5cdGlmICh3aW5kb3cucmVxdWVzdElkbGVDYWxsYmFjaykge1xuXHRcdHJlcXVlc3RJZGxlQ2FsbGJhY2sodHJhY2tlci5pbml0KHVzZXJEYXRhKSk7XG5cdH0gZWxzZSB7XG5cdFx0c2V0VGltZW91dCh0cmFja2VyLmluaXQodXNlckRhdGEpLCA1MDApO1xuXHR9XG59KSgpO1xuIl0sIm5hbWVzIjpbImUiLCJ0IiwiYSIsIndpbmRvdyIsImRlZmluZSIsImFtZCIsIm1vZHVsZSIsImV4cG9ydHMiLCJGaW5nZXJwcmludDIiLCJ0aGlzIiwiZCIsImciLCJmIiwiaCIsIm0iLCJUIiwibCIsImxlbmd0aCIsIm4iLCJyIiwiaSIsIm8iLCJzIiwiYyIsInUiLCJjaGFyQ29kZUF0IiwidG9TdHJpbmciLCJzbGljZSIsInByZXByb2Nlc3NvciIsImF1ZGlvIiwidGltZW91dCIsImV4Y2x1ZGVJT1MxMSIsImZvbnRzIiwic3dmQ29udGFpbmVySWQiLCJzd2ZQYXRoIiwidXNlckRlZmluZWRGb250cyIsImV4dGVuZGVkSnNGb250cyIsInNjcmVlbiIsImRldGVjdFNjcmVlbk9yaWVudGF0aW9uIiwicGx1Z2lucyIsInNvcnRQbHVnaW5zRm9yIiwiZXhjbHVkZUlFIiwiZXh0cmFDb21wb25lbnRzIiwiZXhjbHVkZXMiLCJlbnVtZXJhdGVEZXZpY2VzIiwicGl4ZWxSYXRpbyIsImRvTm90VHJhY2siLCJmb250c0ZsYXNoIiwiTk9UX0FWQUlMQUJMRSIsIkVSUk9SIiwiRVhDTFVERUQiLCJBcnJheSIsInByb3RvdHlwZSIsImZvckVhY2giLCJoYXNPd25Qcm9wZXJ0eSIsIm1hcCIsInB1c2giLCJuYXZpZ2F0b3IiLCJtZWRpYURldmljZXMiLCJ3aWR0aCIsImhlaWdodCIsInNvcnQiLCJyZXZlcnNlIiwiYXZhaWxXaWR0aCIsImF2YWlsSGVpZ2h0IiwibmFtZSIsInR5cGUiLCJzdWZmaXhlcyIsImRlc2NyaXB0aW9uIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiQWN0aXZlWE9iamVjdCIsImNvbmNhdCIsInVzZXJBZ2VudCIsIm1hdGNoIiwicCIsInNlc3Npb25TdG9yYWdlIiwidiIsImxvY2FsU3RvcmFnZSIsIkEiLCJpbmRleGVkREIiLCJTIiwiaGFyZHdhcmVDb25jdXJyZW5jeSIsIkMiLCJjcHVDbGFzcyIsIkIiLCJwbGF0Zm9ybSIsInciLCJtc0RvTm90VHJhY2siLCJtYXhUb3VjaFBvaW50cyIsIm1zTWF4VG91Y2hQb2ludHMiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwieSIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsImRpc3BsYXkiLCJnZXRDb250ZXh0IiwicmVjdCIsImlzUG9pbnRJblBhdGgiLCJ0ZXh0QmFzZWxpbmUiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsImRvbnRVc2VGYWtlRm9udEluQ2FudmFzIiwiZm9udCIsImZpbGxUZXh0IiwiZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uIiwiYmVnaW5QYXRoIiwiYXJjIiwiTWF0aCIsIlBJIiwiY2xvc2VQYXRoIiwiZmlsbCIsInRvRGF0YVVSTCIsIkUiLCJjbGVhckNvbG9yIiwiZW5hYmxlIiwiREVQVEhfVEVTVCIsImRlcHRoRnVuYyIsIkxFUVVBTCIsImNsZWFyIiwiQ09MT1JfQlVGRkVSX0JJVCIsIkRFUFRIX0JVRkZFUl9CSVQiLCJGIiwiY3JlYXRlQnVmZmVyIiwiYmluZEJ1ZmZlciIsIkFSUkFZX0JVRkZFUiIsIkZsb2F0MzJBcnJheSIsImJ1ZmZlckRhdGEiLCJTVEFUSUNfRFJBVyIsIml0ZW1TaXplIiwibnVtSXRlbXMiLCJjcmVhdGVQcm9ncmFtIiwiY3JlYXRlU2hhZGVyIiwiVkVSVEVYX1NIQURFUiIsInNoYWRlclNvdXJjZSIsImNvbXBpbGVTaGFkZXIiLCJGUkFHTUVOVF9TSEFERVIiLCJhdHRhY2hTaGFkZXIiLCJsaW5rUHJvZ3JhbSIsInVzZVByb2dyYW0iLCJ2ZXJ0ZXhQb3NBdHRyaWIiLCJnZXRBdHRyaWJMb2NhdGlvbiIsIm9mZnNldFVuaWZvcm0iLCJnZXRVbmlmb3JtTG9jYXRpb24iLCJlbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSIsInZlcnRleFBvc0FycmF5IiwidmVydGV4QXR0cmliUG9pbnRlciIsIkZMT0FUIiwidW5pZm9ybTJmIiwiZHJhd0FycmF5cyIsIlRSSUFOR0xFX1NUUklQIiwiY2FudmFzIiwiZ2V0U3VwcG9ydGVkRXh0ZW5zaW9ucyIsImpvaW4iLCJnZXRQYXJhbWV0ZXIiLCJBTElBU0VEX0xJTkVfV0lEVEhfUkFOR0UiLCJBTElBU0VEX1BPSU5UX1NJWkVfUkFOR0UiLCJBTFBIQV9CSVRTIiwiZ2V0Q29udGV4dEF0dHJpYnV0ZXMiLCJhbnRpYWxpYXMiLCJCTFVFX0JJVFMiLCJERVBUSF9CSVRTIiwiR1JFRU5fQklUUyIsImdldEV4dGVuc2lvbiIsIk1BWF9URVhUVVJFX01BWF9BTklTT1RST1BZX0VYVCIsIk1BWF9DT01CSU5FRF9URVhUVVJFX0lNQUdFX1VOSVRTIiwiTUFYX0NVQkVfTUFQX1RFWFRVUkVfU0laRSIsIk1BWF9GUkFHTUVOVF9VTklGT1JNX1ZFQ1RPUlMiLCJNQVhfUkVOREVSQlVGRkVSX1NJWkUiLCJNQVhfVEVYVFVSRV9JTUFHRV9VTklUUyIsIk1BWF9URVhUVVJFX1NJWkUiLCJNQVhfVkFSWUlOR19WRUNUT1JTIiwiTUFYX1ZFUlRFWF9BVFRSSUJTIiwiTUFYX1ZFUlRFWF9URVhUVVJFX0lNQUdFX1VOSVRTIiwiTUFYX1ZFUlRFWF9VTklGT1JNX1ZFQ1RPUlMiLCJNQVhfVklFV1BPUlRfRElNUyIsIlJFRF9CSVRTIiwiUkVOREVSRVIiLCJTSEFESU5HX0xBTkdVQUdFX1ZFUlNJT04iLCJTVEVOQ0lMX0JJVFMiLCJWRU5ET1IiLCJWRVJTSU9OIiwiVU5NQVNLRURfVkVORE9SX1dFQkdMIiwiVU5NQVNLRURfUkVOREVSRVJfV0VCR0wiLCJnZXRTaGFkZXJQcmVjaXNpb25Gb3JtYXQiLCJ0b0xvd2VyQ2FzZSIsIk0iLCJ4IiwiaW5uZXJIVE1MIiwiY2xhc3NOYW1lIiwiYm9keSIsImFwcGVuZENoaWxkIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIm9mZnNldEhlaWdodCIsInJlbW92ZUNoaWxkIiwiTyIsImxhbmd1YWdlcyIsInN1YnN0ciIsImxhbmd1YWdlIiwiYiIsIlAiLCJvc2NwdSIsImluZGV4T2YiLCJMIiwicHJvZHVjdFN1YiIsImV2YWwiLCJ0b1NvdXJjZSIsIkkiLCJrIiwiV2ViR0xSZW5kZXJpbmdDb250ZXh0IiwiUiIsImFwcE5hbWUiLCJ0ZXN0IiwiRCIsInN3Zm9iamVjdCIsIk4iLCJoYXNGbGFzaFBsYXllclZlcnNpb24iLCJfIiwic2V0QXR0cmlidXRlIiwib25SZWFkeSIsImVtYmVkU1dGIiwiYWxsb3dTY3JpcHRBY2Nlc3MiLCJtZW51IiwiRyIsImtleSIsImdldERhdGEiLCJ3ZWJkcml2ZXIiLCJ1c2VyTGFuZ3VhZ2UiLCJicm93c2VyTGFuZ3VhZ2UiLCJzeXN0ZW1MYW5ndWFnZSIsImNvbG9yRGVwdGgiLCJkZXZpY2VNZW1vcnkiLCJkZXZpY2VQaXhlbFJhdGlvIiwiRGF0ZSIsImdldFRpbWV6b25lT2Zmc2V0IiwiSW50bCIsIkRhdGVUaW1lRm9ybWF0IiwicmVzb2x2ZWRPcHRpb25zIiwidGltZVpvbmUiLCJhZGRCZWhhdmlvciIsIm9wZW5EYXRhYmFzZSIsImZpbHRlciIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwicG9zaXRpb24iLCJsZWZ0IiwiZm9udFNpemUiLCJmb250U3R5bGUiLCJmb250V2VpZ2h0IiwibGV0dGVyU3BhY2luZyIsImxpbmVCcmVhayIsImxpbmVIZWlnaHQiLCJ0ZXh0VHJhbnNmb3JtIiwidGV4dEFsaWduIiwidGV4dERlY29yYXRpb24iLCJ0ZXh0U2hhZG93Iiwid2hpdGVTcGFjZSIsIndvcmRCcmVhayIsIndvcmRTcGFjaW5nIiwib2Zmc2V0V2lkdGgiLCJmb250RmFtaWx5IiwicGF1c2VCZWZvcmUiLCJPZmZsaW5lQXVkaW9Db250ZXh0Iiwid2Via2l0T2ZmbGluZUF1ZGlvQ29udGV4dCIsImNyZWF0ZU9zY2lsbGF0b3IiLCJmcmVxdWVuY3kiLCJzZXRWYWx1ZUF0VGltZSIsImN1cnJlbnRUaW1lIiwiY3JlYXRlRHluYW1pY3NDb21wcmVzc29yIiwiY29ubmVjdCIsImRlc3RpbmF0aW9uIiwic3RhcnQiLCJzdGFydFJlbmRlcmluZyIsInNldFRpbWVvdXQiLCJjb25zb2xlIiwid2FybiIsIm9uY29tcGxldGUiLCJjbGVhclRpbWVvdXQiLCJyZW5kZXJlZEJ1ZmZlciIsImdldENoYW5uZWxEYXRhIiwicmVkdWNlIiwiYWJzIiwiZGlzY29ubmVjdCIsInRoZW4iLCJkZXZpY2VJZCIsImdyb3VwSWQiLCJraW5kIiwibGFiZWwiLCJVIiwiRXJyb3IiLCJnZXQiLCJjYWxsIiwiY29tcG9uZW50cyIsImRhdGEiLCJhZGRQcmVwcm9jZXNzZWRDb21wb25lbnQiLCJ2YWx1ZSIsIlN0cmluZyIsImdldFByb21pc2UiLCJQcm9taXNlIiwiZ2V0VjE4IiwieDY0aGFzaDEyOCIsImxpZmVjeWNsZSIsIkV2ZW50VGFyZ2V0IiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJjb25zdHJ1Y3RvciIsIlR5cGVFcnJvciIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImRlZmluZVByb3BlcnR5IiwiY3JlYXRlIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJSZWZlcmVuY2VFcnJvciIsIl9yZWdpc3RyeSIsIl9nZXRSZWdpc3RyeSIsInNwbGljZSIsInRhcmdldCIsImZyZWV6ZSIsIkV2ZW50IiwiZ2V0UHJvdG90eXBlT2YiLCJuZXdTdGF0ZSIsIm9sZFN0YXRlIiwib3JpZ2luYWxFdmVudCIsInNhZmFyaSIsInB1c2hOb3RpZmljYXRpb24iLCJzZWxmIiwicHJldmVudERlZmF1bHQiLCJyZXR1cm5WYWx1ZSIsInZpc2liaWxpdHlTdGF0ZSIsImhhc0ZvY3VzIiwiX3N0YXRlIiwiX3Vuc2F2ZWRDaGFuZ2VzIiwiX2hhbmRsZUV2ZW50cyIsImJpbmQiLCJhZGRFdmVudExpc3RlbmVyIiwiX3NhZmFyaUJlZm9yZVVubG9hZFRpbWVvdXQiLCJkZWZhdWx0UHJldmVudGVkIiwiX2Rpc3BhdGNoQ2hhbmdlc0lmTmVlZGVkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImtleXMiLCJkaXNwYXRjaEV2ZW50IiwicGVyc2lzdGVkIiwid2FzRGlzY2FyZGVkIiwiY29uZmlnIiwiQVBJX1VSTCIsIkFQSV9VUkxfREVWIiwiQ0xBU1NfRElWSURFUiIsIkRFRkFVTFRfREVCT1VOQ0VfVElNRSIsImdldFBhcmVudHMiLCJlbGVtZW50IiwicGFyZW50cyIsInBhcmVudE5vZGUiLCJnZXRDb3VudFNhbWVOb2RlTmFtZSIsImVsZW1lbnRzQXJyYXkiLCJjb3VudCIsImN1cnJlbnRFbGVtZW50Iiwibm9kZU5hbWUiLCJnZXROdGhOdW1iZXIiLCJudGgiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwiZ2V0Q3NzUGF0aCIsImVsZW1lbnRQYXJlbnRzIiwic2VsZWN0b3JzQXJyYXkiLCJlbGVtZW50SXRlbSIsImlkIiwic2VsZWN0b3IiLCJzaWJsaW5nIiwiY2hpbGRyZW4iLCJjb3VudFNhbWVOb2RlTmFtZSIsImNsYXNzTmFtZXMiLCJyZXBsYWNlIiwibnRoTnVtYmVyIiwicmVzdWx0UGF0aCIsImdldFZhbHVlIiwiaW5uZXJUZXh0Iiwic2VuZERhdGEiLCJ1cmwiLCJmZXRjaCIsIldBVkVfQVBJX1VSTCIsIm1ldGhvZCIsImhlYWRlcnMiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzcG9uc2UiLCJqc29uIiwic2VuZFRyYWNrRGF0YSIsInVzZXJEYXRhIiwiX29iamVjdFNwcmVhZCIsInByb2plY3RJZCIsInZpc2l0b3JJZCIsInNlc3Npb25JZCIsIk1XQVZFX0NPTkZJRyIsInN1YlByb2plY3RJZCIsInBhZ2VJZCIsInRyYWNrRGF0YSIsInNlbmRUcmFja0V2ZW50IiwidGltZXN0YW1wIiwibm93IiwicGF5bG9hZCIsIldBVkVfVVNFUl9EQVRBIiwic2VuZFBpbmciLCJyZWdpc3RlckhhbmRsZXJzIiwiaGFuZGxlcnMiLCJoYW5kbGVyIiwiZGVib3VuY2UiLCJmdW5jIiwiZGVsYXkiLCJibG9ja2VySWQiLCJhcmdzIiwiaW5jbHVkZXMiLCJoYXlzdGFjayIsIm5lZWRsZSIsImZpbmQiLCJ0b0xvY2FsZUxvd2VyQ2FzZSIsIndpbmRvd3MiLCJsaW51eCIsImlwaG9uZSIsImlwb2QiLCJpcGFkIiwiaVBhZE9TMTNVcCIsImlvcyIsIm1hY29zIiwiYW5kcm9pZCIsImFuZHJvaWRQaG9uZSIsImFuZHJvaWRUYWJsZXQiLCJibGFja2JlcnJ5IiwiYmxhY2tiZXJyeVBob25lIiwiYmxhY2tiZXJyeVRhYmxldCIsIndpbmRvd3NQaG9uZSIsIndpbmRvd3NUYWJsZXQiLCJmeG9zIiwiZnhvc1Bob25lIiwiZnhvc1RhYmxldCIsIm1lZWdvIiwibW9iaWxlIiwidGFibGV0IiwiZGVza3RvcCIsImdldERldmljZVR5cGUiLCJnZXRPUyIsImdldEJyb3dzZXJOYW1lIiwiYXBwVmVyc2lvbiIsImRvY3VtZW50TW9kZSIsImdldENvbm5lY3Rpb25UeXBlIiwiY29ubmVjdGlvblR5cGUiLCJjb25uZWN0aW9uIiwiV0FWRV9UUkFDS19DTElDS1MiLCJoYW5kbGVDbGljayIsImV2ZW50IiwiY2xpZW50WCIsImNsaWVudFkiLCJvZmZzZXQiLCJwYWdlWE9mZnNldCIsInBhZ2VZT2Zmc2V0IiwiY2FwdHVyZSIsInBhc3NpdmUiLCJXQVZFX1RSQUNLX0ZPUk1TIiwicXVlcnlTZWxlY3RvckFsbCIsImZvcm0iLCJlbWFpbEVsIiwiYWN0aW9uRGF0YSIsIm1vdXNlTW92ZUhhbmRsZXIiLCJoYW5kbGVMb2NhdGlvbkNoYW5nZSIsImhyZWYiLCJsb2NhdGlvbiIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJhcmciLCJyZXQiLCJhcHBseSIsInJlcGxhY2VTdGF0ZSIsImlzU2tpcExvY2F0aW9uQ2hhbmdlIiwicmVnaXN0ZXIiLCJzZW5kQmVhY29uIiwicmVtb3ZlVGFncyIsIm5vZGUiLCJ0YWdOYW1lIiwibm9kZUNsb25lZCIsImNsb25lTm9kZSIsInRhZ3MiLCJyZW1vdmVEYW5nZXJvdXNUYWdzIiwicm9vdFdpdGhvdXRTY3JpcHRzIiwicm9vdFdpdGhvdXRJZnJhbWVzIiwicHJldldpZHRoIiwicHJldkhlaWdodCIsImhhbmRsZU11dGF0aW9uIiwicm9vdCIsImVsIiwiZ2V0QXR0cmlidXRlIiwicm9vdFdpdGhvdXREYW5nZXJvdXNUYWdzIiwib3V0ZXJIVE1MIiwic2l6ZSIsImluaXQiLCJNdXRhdGlvbk9ic2VydmVyIiwiV2ViS2l0TXV0YXRpb25PYnNlcnZlciIsIk1vek11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlciIsIm9ic2VydmUiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwiYXR0cmlidXRlcyIsIm9uRXhpdCIsImVyciIsIm13YXZlIiwibG9nIiwiZXJyb3IiLCJkZWZhdWx0SGFuZGxlcnMiLCJjbGlja0hhbmRsZXIiLCJwYWdlUmVzaXplSGFuZGxlciIsInBhZ2VTY3JvbGxpbmdIYW5kbGVyIiwic2lnbnVwSGFuZGxlciIsInBhdGhDaGFuZ2VIYW5kbGVyIiwiY2FsY0lkZW50aWZpY2F0b3IiLCJyZXMiLCJyZWoiLCJyZXN1bHQiLCJzZXRDb29raWUiLCJjX25hbWUiLCJleGRheXMiLCJleGRhdGUiLCJzZXREYXRlIiwiZ2V0RGF0ZSIsImNfdmFsdWUiLCJlc2NhcGUiLCJ0b1VUQ1N0cmluZyIsImNvb2tpZSIsImluaXRpYWxVc2VyRGF0YSIsIldBVkVfRklOR0VSUFJJTlQiLCJzZWFyY2hRdWVyeSIsInNlYXJjaCIsInRleHQiLCJvcyIsImJyb3dzZXJOYW1lIiwiZGV2aWNlVHlwZSIsImlwQWRkcmVzcyIsInJlZmVycmVyVXJsIiwicmVmZXJyZXIiLCJzZXNzaW9uIiwicGFyc2UiLCJnZXRJdGVtIiwiV0FWRV9TVUJQUk9KRUNUX0lEIiwiVEVOX01JTlVURVNfTVMiLCJ1cGRhdGVkT24iLCJkb21haW4iLCJob3N0bmFtZSIsInNldFNlc3Npb24iLCJzZXRJdGVtIiwiV0FWRV9TRVNTSU9OX0lEIiwic2V0SW50ZXJ2YWwiLCJ0cmFja2VyTXV0YXRpb25PYnNlcnZlciIsInBhcmFtcyIsIndhdmUiLCJwaWQiLCJyZXF1ZXN0SWRsZUNhbGxiYWNrIiwidHJhY2tlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBQUE7RUFDQTs7RUFFQSxDQUFFLFVBQVVBLENBQUMsRUFBRUMsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7SUFDbkIsT0FBT0MsTUFBTSxLQUFLLFdBQVcsSUFBSSxPQUFPQyxNQUFNLEtBQUssVUFBVSxJQUFJQSxNQUFNLENBQUNDLEdBQUcsR0FBR0QsTUFBTSxDQUFDRixDQUFDLENBQUMsR0FBRyxPQUFPSSxNQUFNLEtBQUssV0FBVyxJQUFJQSxNQUFNLENBQUNDLE9BQU8sR0FBR0QsTUFBTSxDQUFDQyxPQUFPLEdBQUdMLENBQUMsRUFBRSxHQUFHRCxDQUFDLENBQUNNLE9BQU8sR0FBR04sQ0FBQyxDQUFDTSxPQUFPLEdBQUdMLENBQUMsRUFBRSxHQUFHRCxDQUFDLENBQUNPLFlBQVksR0FBR04sQ0FBQyxFQUFFLENBQUE7RUFDdk4sQ0FBQyxDQUFDLENBQUMsRUFBRU8sTUFBSSxFQUFFLFlBQU07SUFDZixJQUFNQyxDQUFDLEdBQUcsU0FBSkEsQ0FBQyxDQUFhVixDQUFDLEVBQUVDLENBQUMsRUFBRTtFQUFFRCxJQUFBQSxDQUFDLEdBQUcsQ0FBQ0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLEdBQUcsQ0FBQ0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO01BQUUsSUFBTUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFBRSxJQUFBLE9BQU9BLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQ0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFHLENBQUE7SUFBRSxJQUFNUyxDQUFDLEdBQUcsU0FBSkEsQ0FBQyxDQUFhWCxDQUFDLEVBQUVDLENBQUMsRUFBRTtFQUFFRCxJQUFBQSxDQUFDLEdBQUcsQ0FBQ0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLEdBQUcsQ0FBQ0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO01BQUUsSUFBTUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFBRSxJQUFBLE9BQU9BLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQ0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFHLENBQUE7SUFBRSxJQUFNVSxDQUFDLEdBQUcsU0FBSkEsQ0FBQyxDQUFhWixDQUFDLEVBQUVDLENBQUMsRUFBRTtNQUFFLE9BQU8sQ0FBQ0EsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlDLENBQUMsR0FBR0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBR0MsQ0FBQyxFQUFFRCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlDLENBQUMsR0FBR0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBR0MsQ0FBQyxDQUFDLElBQUlBLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQyxDQUFDLEdBQUdELENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUdDLENBQUMsRUFBRUQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQyxDQUFDLEdBQUdELENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBRyxDQUFBO0lBQUUsSUFBTVksQ0FBQyxHQUFHLFNBQUpBLENBQUMsQ0FBYWIsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7TUFBRSxPQUFPLENBQUNBLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHRCxDQUFDLEdBQUdDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQyxDQUFDLEdBQUdELENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUdDLENBQUMsRUFBRUQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQyxDQUFDLENBQUMsR0FBRyxDQUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7S0FBRyxDQUFBO0lBQUUsSUFBTWEsQ0FBQyxHQUFHLFNBQUpBLENBQUMsQ0FBYWQsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7TUFBRSxPQUFPLENBQUNELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUcsQ0FBQTtFQUFFLEVBQUEsSUFBTWMsQ0FBQyxHQUFHLFNBQUpBLENBQUMsQ0FBYWYsQ0FBQyxFQUFFO0VBQUUsSUFBQSxPQUFPQSxDQUFDLEdBQUdjLENBQUMsQ0FBQ2QsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxHQUFHVyxDQUFDLENBQUNYLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUdjLENBQUMsQ0FBQ2QsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxHQUFHVyxDQUFDLENBQUNYLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUdjLENBQUMsQ0FBQ2QsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFHLENBQUE7RUFBRSxFQUFBLElBQU1nQixDQUFDLEdBQUcsU0FBQSxDQUFBLENBQVVoQixDQUFDLEVBQUVDLENBQUMsRUFBRTtNQUFFQSxDQUFDLEdBQUdBLENBQUMsSUFBSSxDQUFDLENBQUE7TUFBRSxLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFDRixDQUFDLEdBQUdBLENBQUMsSUFBSSxFQUFFLEVBQUVpQixNQUFNLEdBQUcsRUFBRSxFQUFFQyxDQUFDLEdBQUdsQixDQUFDLENBQUNpQixNQUFNLEdBQUdmLENBQUMsRUFBRWlCLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRWxCLENBQUMsQ0FBQyxFQUFFbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFbkIsQ0FBQyxDQUFDLEVBQUVvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUVMLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxFQUFFQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLEVBQUVDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR04sQ0FBQyxFQUFFTSxDQUFDLElBQUksRUFBRSxFQUFDSCxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUdyQixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUVSLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBR2hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUVILENBQUMsR0FBR1YsQ0FBQyxDQUFDVSxDQUFDLEVBQUVDLENBQUMsQ0FBQyxFQUFFRCxDQUFDLEdBQUdULENBQUMsQ0FBQ1MsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFQSxDQUFDLEdBQUdWLENBQUMsQ0FBQ1UsQ0FBQyxFQUFFRSxDQUFDLENBQUMsRUFBRUosQ0FBQyxHQUFHTCxDQUFDLENBQUNLLENBQUMsRUFBRUUsQ0FBQyxDQUFDLEVBQUVGLENBQUMsR0FBR1AsQ0FBQyxDQUFDTyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUVBLENBQUMsR0FBR1QsQ0FBQyxDQUFDUyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxFQUFFRCxDQUFDLEdBQUdULENBQUMsQ0FBQ0MsQ0FBQyxDQUFDUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxFQUFFSCxDQUFDLEdBQUdMLENBQUMsQ0FBQ0ssQ0FBQyxFQUFFTyxDQUFDLENBQUMsRUFBRVAsQ0FBQyxHQUFHSixDQUFDLENBQUNJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRUEsQ0FBQyxHQUFHTCxDQUFDLENBQUNLLENBQUMsRUFBRU0sQ0FBQyxDQUFDLEVBQUVGLENBQUMsR0FBR04sQ0FBQyxDQUFDTSxDQUFDLEVBQUVKLENBQUMsQ0FBQyxFQUFFSSxDQUFDLEdBQUdSLENBQUMsQ0FBQ1EsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFQSxDQUFDLEdBQUdWLENBQUMsQ0FBQ1UsQ0FBQyxFQUFFRCxDQUFDLENBQUMsRUFBRUMsQ0FBQyxHQUFHVixDQUFDLENBQUNDLENBQUMsQ0FBQ1MsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQTtFQUFFLElBQUEsUUFBUUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFTCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUVkLENBQUM7RUFBSSxNQUFBLEtBQUssRUFBRTtVQUFFYyxDQUFDLEdBQUdGLENBQUMsQ0FBQ0UsQ0FBQyxFQUFFSCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUViLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUFFLE1BQUEsS0FBSyxFQUFFO1VBQUVSLENBQUMsR0FBR0YsQ0FBQyxDQUFDRSxDQUFDLEVBQUVILENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRWIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQUUsTUFBQSxLQUFLLEVBQUU7VUFBRVIsQ0FBQyxHQUFHRixDQUFDLENBQUNFLENBQUMsRUFBRUgsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFYixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFBRSxNQUFBLEtBQUssRUFBRTtVQUFFUixDQUFDLEdBQUdGLENBQUMsQ0FBQ0UsQ0FBQyxFQUFFSCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUViLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUFFLE1BQUEsS0FBSyxFQUFFO1VBQUVSLENBQUMsR0FBR0YsQ0FBQyxDQUFDRSxDQUFDLEVBQUVILENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRWIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQUUsTUFBQSxLQUFLLEVBQUU7VUFBRVIsQ0FBQyxHQUFHRixDQUFDLENBQUNFLENBQUMsRUFBRUgsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFYixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7RUFBRSxNQUFBLEtBQUssQ0FBQztVQUFFUixDQUFDLEdBQUdGLENBQUMsQ0FBQ0UsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFaEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFUixDQUFDLEdBQUdMLENBQUMsQ0FBQ0ssQ0FBQyxFQUFFTyxDQUFDLENBQUMsRUFBRVAsQ0FBQyxHQUFHSixDQUFDLENBQUNJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRUEsQ0FBQyxHQUFHTCxDQUFDLENBQUNLLENBQUMsRUFBRU0sQ0FBQyxDQUFDLEVBQUVGLENBQUMsR0FBR04sQ0FBQyxDQUFDTSxDQUFDLEVBQUVKLENBQUMsQ0FBQyxDQUFBO0VBQUUsTUFBQSxLQUFLLENBQUM7VUFBRUssQ0FBQyxHQUFHUCxDQUFDLENBQUNPLENBQUMsRUFBRVIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFYixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFBRSxNQUFBLEtBQUssQ0FBQztVQUFFSCxDQUFDLEdBQUdQLENBQUMsQ0FBQ08sQ0FBQyxFQUFFUixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUViLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUFFLE1BQUEsS0FBSyxDQUFDO1VBQUVILENBQUMsR0FBR1AsQ0FBQyxDQUFDTyxDQUFDLEVBQUVSLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRWIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQUUsTUFBQSxLQUFLLENBQUM7VUFBRUgsQ0FBQyxHQUFHUCxDQUFDLENBQUNPLENBQUMsRUFBRVIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFYixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFBRSxNQUFBLEtBQUssQ0FBQztVQUFFSCxDQUFDLEdBQUdQLENBQUMsQ0FBQ08sQ0FBQyxFQUFFUixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUViLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUFFLE1BQUEsS0FBSyxDQUFDO1VBQUVILENBQUMsR0FBR1AsQ0FBQyxDQUFDTyxDQUFDLEVBQUVSLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRWIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQUUsTUFBQSxLQUFLLENBQUM7VUFBRUgsQ0FBQyxHQUFHUCxDQUFDLENBQUNPLENBQUMsRUFBRVIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFYixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7RUFBRSxNQUFBLEtBQUssQ0FBQztVQUFFSCxDQUFDLEdBQUdQLENBQUMsQ0FBQ08sQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFckIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVILENBQUMsR0FBR1YsQ0FBQyxDQUFDVSxDQUFDLEVBQUVDLENBQUMsQ0FBQyxFQUFFRCxDQUFDLEdBQUdULENBQUMsQ0FBQ1MsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFQSxDQUFDLEdBQUdWLENBQUMsQ0FBQ1UsQ0FBQyxFQUFFRSxDQUFDLENBQUMsRUFBRUosQ0FBQyxHQUFHTCxDQUFDLENBQUNLLENBQUMsRUFBRUUsQ0FBQyxDQUFDLENBQUE7RUFBQyxLQUFBO0VBQUcsSUFBQSxPQUFPRixDQUFDLEdBQUdMLENBQUMsQ0FBQ0ssQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFbkIsQ0FBQyxDQUFDaUIsTUFBTSxDQUFDLENBQUMsRUFBRUcsQ0FBQyxHQUFHTixDQUFDLENBQUNNLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRXBCLENBQUMsQ0FBQ2lCLE1BQU0sQ0FBQyxDQUFDLEVBQUVFLENBQUMsR0FBR1QsQ0FBQyxDQUFDUyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUdWLENBQUMsQ0FBQ1UsQ0FBQyxFQUFFRCxDQUFDLENBQUMsRUFBRUEsQ0FBQyxHQUFHSixDQUFDLENBQUNJLENBQUMsQ0FBQyxFQUFFQyxDQUFDLEdBQUdMLENBQUMsQ0FBQ0ssQ0FBQyxDQUFDLEVBQUVELENBQUMsR0FBR1QsQ0FBQyxDQUFDUyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUdWLENBQUMsQ0FBQ1UsQ0FBQyxFQUFFRCxDQUFDLENBQUMsRUFBRSxVQUFBLENBQUEsTUFBQSxDQUFZLENBQUNBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUVPLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFJQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFBLENBQUEsTUFBQSxDQUFZLENBQUNSLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUVPLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQSxD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

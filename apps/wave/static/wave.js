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
            referrerUrl: document.referrer
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F2ZS5qcyIsInNvdXJjZXMiOlsiLi4vdHJhY2tlci9zcmMvbGliL2ZpbmdlcnByaW50Mi5taW4uanMiLCIuLi90cmFja2VyL3NyYy9saWIvbGlmZWN5Y2xlLmpzIiwiLi4vdHJhY2tlci9zcmMvY29uZmlnLmpzIiwiLi4vdHJhY2tlci9zcmMvaGVscGVycy5qcyIsIi4uL3RyYWNrZXIvc3JjL2FjdGlvbnMvY2xpY2suanMiLCIuLi90cmFja2VyL3NyYy9hY3Rpb25zL3BhZ2VSZXNpemUuanMiLCIuLi90cmFja2VyL3NyYy9hY3Rpb25zL3BhZ2VTY3JvbGxpbmcuanMiLCIuLi90cmFja2VyL3NyYy9hY3Rpb25zL3NpZ251cC5qcyIsIi4uL3RyYWNrZXIvc3JjL2FjdGlvbnMvbW91c2VNb3ZlLmpzIiwiLi4vdHJhY2tlci9zcmMvYWN0aW9ucy9wYXRoQ2hhbmdlLmpzIiwiLi4vdHJhY2tlci9zcmMvYWN0aW9ucy9vbkV4aXQuanMiLCIuLi90cmFja2VyL3NyYy9yZWNvcmRzL211dGF0aW9uLmpzIiwiLi4vdHJhY2tlci9zcmMvcmVjb3Jkcy9vYnNlcnZlci5qcyIsIi4uL3RyYWNrZXIvc3JjL3RyYWNrZXIuanMiLCIuLi90cmFja2VyL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGaW5nZXJwcmludGpzMiAtIENvcHlyaWdodCAoYykgMjAxOSBWYWxlbnRpbiBWYXNpbHlldiAodmFsZW50aW4udmFzaWx5ZXZAb3V0bG9vay5jb20pXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIChodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocCkgbGljZW5zZS5cblxuIShmdW5jdGlvbiAoZSwgdCwgYSkge1xuICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoYSkgOiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cyA/IG1vZHVsZS5leHBvcnRzID0gYSgpIDogdC5leHBvcnRzID8gdC5leHBvcnRzID0gYSgpIDogdC5GaW5nZXJwcmludDIgPSBhKCk7XG59KDAsIHRoaXMsICgpID0+IHtcbiAgY29uc3QgZCA9IGZ1bmN0aW9uIChlLCB0KSB7IGUgPSBbZVswXSA+Pj4gMTYsIDY1NTM1ICYgZVswXSwgZVsxXSA+Pj4gMTYsIDY1NTM1ICYgZVsxXV0sIHQgPSBbdFswXSA+Pj4gMTYsIDY1NTM1ICYgdFswXSwgdFsxXSA+Pj4gMTYsIDY1NTM1ICYgdFsxXV07IGNvbnN0IGEgPSBbMCwgMCwgMCwgMF07IHJldHVybiBhWzNdICs9IGVbM10gKyB0WzNdLCBhWzJdICs9IGFbM10gPj4+IDE2LCBhWzNdICY9IDY1NTM1LCBhWzJdICs9IGVbMl0gKyB0WzJdLCBhWzFdICs9IGFbMl0gPj4+IDE2LCBhWzJdICY9IDY1NTM1LCBhWzFdICs9IGVbMV0gKyB0WzFdLCBhWzBdICs9IGFbMV0gPj4+IDE2LCBhWzFdICY9IDY1NTM1LCBhWzBdICs9IGVbMF0gKyB0WzBdLCBhWzBdICY9IDY1NTM1LCBbYVswXSA8PCAxNiB8IGFbMV0sIGFbMl0gPDwgMTYgfCBhWzNdXTsgfTsgY29uc3QgZyA9IGZ1bmN0aW9uIChlLCB0KSB7IGUgPSBbZVswXSA+Pj4gMTYsIDY1NTM1ICYgZVswXSwgZVsxXSA+Pj4gMTYsIDY1NTM1ICYgZVsxXV0sIHQgPSBbdFswXSA+Pj4gMTYsIDY1NTM1ICYgdFswXSwgdFsxXSA+Pj4gMTYsIDY1NTM1ICYgdFsxXV07IGNvbnN0IGEgPSBbMCwgMCwgMCwgMF07IHJldHVybiBhWzNdICs9IGVbM10gKiB0WzNdLCBhWzJdICs9IGFbM10gPj4+IDE2LCBhWzNdICY9IDY1NTM1LCBhWzJdICs9IGVbMl0gKiB0WzNdLCBhWzFdICs9IGFbMl0gPj4+IDE2LCBhWzJdICY9IDY1NTM1LCBhWzJdICs9IGVbM10gKiB0WzJdLCBhWzFdICs9IGFbMl0gPj4+IDE2LCBhWzJdICY9IDY1NTM1LCBhWzFdICs9IGVbMV0gKiB0WzNdLCBhWzBdICs9IGFbMV0gPj4+IDE2LCBhWzFdICY9IDY1NTM1LCBhWzFdICs9IGVbMl0gKiB0WzJdLCBhWzBdICs9IGFbMV0gPj4+IDE2LCBhWzFdICY9IDY1NTM1LCBhWzFdICs9IGVbM10gKiB0WzFdLCBhWzBdICs9IGFbMV0gPj4+IDE2LCBhWzFdICY9IDY1NTM1LCBhWzBdICs9IGVbMF0gKiB0WzNdICsgZVsxXSAqIHRbMl0gKyBlWzJdICogdFsxXSArIGVbM10gKiB0WzBdLCBhWzBdICY9IDY1NTM1LCBbYVswXSA8PCAxNiB8IGFbMV0sIGFbMl0gPDwgMTYgfCBhWzNdXTsgfTsgY29uc3QgZiA9IGZ1bmN0aW9uIChlLCB0KSB7IHJldHVybiAodCAlPSA2NCkgPT09IDMyID8gW2VbMV0sIGVbMF1dIDogdCA8IDMyID8gW2VbMF0gPDwgdCB8IGVbMV0gPj4+IDMyIC0gdCwgZVsxXSA8PCB0IHwgZVswXSA+Pj4gMzIgLSB0XSA6ICh0IC09IDMyLCBbZVsxXSA8PCB0IHwgZVswXSA+Pj4gMzIgLSB0LCBlWzBdIDw8IHQgfCBlWzFdID4+PiAzMiAtIHRdKTsgfTsgY29uc3QgaCA9IGZ1bmN0aW9uIChlLCB0KSB7IHJldHVybiAodCAlPSA2NCkgPT09IDAgPyBlIDogdCA8IDMyID8gW2VbMF0gPDwgdCB8IGVbMV0gPj4+IDMyIC0gdCwgZVsxXSA8PCB0XSA6IFtlWzFdIDw8IHQgLSAzMiwgMF07IH07IGNvbnN0IG0gPSBmdW5jdGlvbiAoZSwgdCkgeyByZXR1cm4gW2VbMF0gXiB0WzBdLCBlWzFdIF4gdFsxXV07IH07IGNvbnN0IFQgPSBmdW5jdGlvbiAoZSkgeyByZXR1cm4gZSA9IG0oZSwgWzAsIGVbMF0gPj4+IDFdKSwgZSA9IGcoZSwgWzQyODM1NDM1MTEsIDM5ODE4MDY3OTddKSwgZSA9IG0oZSwgWzAsIGVbMF0gPj4+IDFdKSwgZSA9IGcoZSwgWzMzMDE4ODIzNjYsIDQ0NDk4NDQwM10pLCBlID0gbShlLCBbMCwgZVswXSA+Pj4gMV0pOyB9OyBjb25zdCBsID0gZnVuY3Rpb24gKGUsIHQpIHsgdCA9IHQgfHwgMDsgZm9yICh2YXIgYSA9IChlID0gZSB8fCAnJykubGVuZ3RoICUgMTYsIG4gPSBlLmxlbmd0aCAtIGEsIHIgPSBbMCwgdF0sIGkgPSBbMCwgdF0sIG8gPSBbMCwgMF0sIGwgPSBbMCwgMF0sIHMgPSBbMjI3NzczNTMxMywgMjg5NTU5NTA5XSwgYyA9IFsxMjkxMTY5MDkxLCA2NTg4NzExNjddLCB1ID0gMDsgdSA8IG47IHUgKz0gMTYpbyA9IFsyNTUgJiBlLmNoYXJDb2RlQXQodSArIDQpIHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgNSkpIDw8IDggfCAoMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyA2KSkgPDwgMTYgfCAoMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyA3KSkgPDwgMjQsIDI1NSAmIGUuY2hhckNvZGVBdCh1KSB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDEpKSA8PCA4IHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgMikpIDw8IDE2IHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgMykpIDw8IDI0XSwgbCA9IFsyNTUgJiBlLmNoYXJDb2RlQXQodSArIDEyKSB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDEzKSkgPDwgOCB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDE0KSkgPDwgMTYgfCAoMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyAxNSkpIDw8IDI0LCAyNTUgJiBlLmNoYXJDb2RlQXQodSArIDgpIHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgOSkpIDw8IDggfCAoMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyAxMCkpIDw8IDE2IHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgMTEpKSA8PCAyNF0sIG8gPSBnKG8sIHMpLCBvID0gZihvLCAzMSksIG8gPSBnKG8sIGMpLCByID0gbShyLCBvKSwgciA9IGYociwgMjcpLCByID0gZChyLCBpKSwgciA9IGQoZyhyLCBbMCwgNV0pLCBbMCwgMTM5MDIwODgwOV0pLCBsID0gZyhsLCBjKSwgbCA9IGYobCwgMzMpLCBsID0gZyhsLCBzKSwgaSA9IG0oaSwgbCksIGkgPSBmKGksIDMxKSwgaSA9IGQoaSwgciksIGkgPSBkKGcoaSwgWzAsIDVdKSwgWzAsIDk0NDMzMTQ0NV0pOyBzd2l0Y2ggKG8gPSBbMCwgMF0sIGwgPSBbMCwgMF0sIGEpIHsgY2FzZSAxNTogbCA9IG0obCwgaChbMCwgZS5jaGFyQ29kZUF0KHUgKyAxNCldLCA0OCkpOyBjYXNlIDE0OiBsID0gbShsLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDEzKV0sIDQwKSk7IGNhc2UgMTM6IGwgPSBtKGwsIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgMTIpXSwgMzIpKTsgY2FzZSAxMjogbCA9IG0obCwgaChbMCwgZS5jaGFyQ29kZUF0KHUgKyAxMSldLCAyNCkpOyBjYXNlIDExOiBsID0gbShsLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDEwKV0sIDE2KSk7IGNhc2UgMTA6IGwgPSBtKGwsIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgOSldLCA4KSk7IGNhc2UgOTogbCA9IG0obCwgWzAsIGUuY2hhckNvZGVBdCh1ICsgOCldKSwgbCA9IGcobCwgYyksIGwgPSBmKGwsIDMzKSwgbCA9IGcobCwgcyksIGkgPSBtKGksIGwpOyBjYXNlIDg6IG8gPSBtKG8sIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgNyldLCA1NikpOyBjYXNlIDc6IG8gPSBtKG8sIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgNildLCA0OCkpOyBjYXNlIDY6IG8gPSBtKG8sIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgNSldLCA0MCkpOyBjYXNlIDU6IG8gPSBtKG8sIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgNCldLCAzMikpOyBjYXNlIDQ6IG8gPSBtKG8sIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgMyldLCAyNCkpOyBjYXNlIDM6IG8gPSBtKG8sIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgMildLCAxNikpOyBjYXNlIDI6IG8gPSBtKG8sIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgMSldLCA4KSk7IGNhc2UgMTogbyA9IG0obywgWzAsIGUuY2hhckNvZGVBdCh1KV0pLCBvID0gZyhvLCBzKSwgbyA9IGYobywgMzEpLCBvID0gZyhvLCBjKSwgciA9IG0ociwgbyk7IH0gcmV0dXJuIHIgPSBtKHIsIFswLCBlLmxlbmd0aF0pLCBpID0gbShpLCBbMCwgZS5sZW5ndGhdKSwgciA9IGQociwgaSksIGkgPSBkKGksIHIpLCByID0gVChyKSwgaSA9IFQoaSksIHIgPSBkKHIsIGkpLCBpID0gZChpLCByKSwgKGAwMDAwMDAwMCR7KHJbMF0gPj4+IDApLnRvU3RyaW5nKDE2KX1gKS5zbGljZSgtOCkgKyAoYDAwMDAwMDAwJHsoclsxXSA+Pj4gMCkudG9TdHJpbmcoMTYpfWApLnNsaWNlKC04KSArIChgMDAwMDAwMDAkeyhpWzBdID4+PiAwKS50b1N0cmluZygxNil9YCkuc2xpY2UoLTgpICsgKGAwMDAwMDAwMCR7KGlbMV0gPj4+IDApLnRvU3RyaW5nKDE2KX1gKS5zbGljZSgtOCk7IH07IGNvbnN0IGUgPSB7XG4gICAgcHJlcHJvY2Vzc29yOiBudWxsLFxuICAgIGF1ZGlvOiB7IHRpbWVvdXQ6IDFlMywgZXhjbHVkZUlPUzExOiAhMCB9LFxuICAgIGZvbnRzOiB7XG4gICAgICBzd2ZDb250YWluZXJJZDogJ2ZpbmdlcnByaW50anMyJywgc3dmUGF0aDogJ2ZsYXNoL2NvbXBpbGVkL0ZvbnRMaXN0LnN3ZicsIHVzZXJEZWZpbmVkRm9udHM6IFtdLCBleHRlbmRlZEpzRm9udHM6ICExLFxuICAgIH0sXG4gICAgc2NyZWVuOiB7IGRldGVjdFNjcmVlbk9yaWVudGF0aW9uOiAhMCB9LFxuICAgIHBsdWdpbnM6IHsgc29ydFBsdWdpbnNGb3I6IFsvcGFsZW1vb24vaV0sIGV4Y2x1ZGVJRTogITEgfSxcbiAgICBleHRyYUNvbXBvbmVudHM6IFtdLFxuICAgIGV4Y2x1ZGVzOiB7XG4gICAgICBlbnVtZXJhdGVEZXZpY2VzOiAhMCwgcGl4ZWxSYXRpbzogITAsIGRvTm90VHJhY2s6ICEwLCBmb250c0ZsYXNoOiAhMCxcbiAgICB9LFxuICAgIE5PVF9BVkFJTEFCTEU6ICdub3QgYXZhaWxhYmxlJyxcbiAgICBFUlJPUjogJ2Vycm9yJyxcbiAgICBFWENMVURFRDogJ2V4Y2x1ZGVkJyxcbiAgfTsgY29uc3QgYyA9IGZ1bmN0aW9uIChlLCB0KSB7IGlmIChBcnJheS5wcm90b3R5cGUuZm9yRWFjaCAmJiBlLmZvckVhY2ggPT09IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoKWUuZm9yRWFjaCh0KTsgZWxzZSBpZiAoZS5sZW5ndGggPT09ICtlLmxlbmd0aCkgZm9yIChsZXQgYSA9IDAsIG4gPSBlLmxlbmd0aDsgYSA8IG47IGErKyl0KGVbYV0sIGEsIGUpOyBlbHNlIGZvciAoY29uc3QgciBpbiBlKWUuaGFzT3duUHJvcGVydHkocikgJiYgdChlW3JdLCByLCBlKTsgfTsgY29uc3QgcyA9IGZ1bmN0aW9uIChlLCBuKSB7IGNvbnN0IHIgPSBbXTsgcmV0dXJuIGUgPT0gbnVsbCA/IHIgOiBBcnJheS5wcm90b3R5cGUubWFwICYmIGUubWFwID09PSBBcnJheS5wcm90b3R5cGUubWFwID8gZS5tYXAobikgOiAoYyhlLCAoZSwgdCwgYSkgPT4geyByLnB1c2gobihlLCB0LCBhKSk7IH0pLCByKTsgfTsgY29uc3QgYSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5hdmlnYXRvci5tZWRpYURldmljZXMgJiYgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzOyB9OyBjb25zdCBuID0gZnVuY3Rpb24gKGUpIHsgY29uc3QgdCA9IFt3aW5kb3cuc2NyZWVuLndpZHRoLCB3aW5kb3cuc2NyZWVuLmhlaWdodF07IHJldHVybiBlLnNjcmVlbi5kZXRlY3RTY3JlZW5PcmllbnRhdGlvbiAmJiB0LnNvcnQoKS5yZXZlcnNlKCksIHQ7IH07IGNvbnN0IHIgPSBmdW5jdGlvbiAoZSkgeyBpZiAod2luZG93LnNjcmVlbi5hdmFpbFdpZHRoICYmIHdpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQpIHsgY29uc3QgdCA9IFt3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0LCB3aW5kb3cuc2NyZWVuLmF2YWlsV2lkdGhdOyByZXR1cm4gZS5zY3JlZW4uZGV0ZWN0U2NyZWVuT3JpZW50YXRpb24gJiYgdC5zb3J0KCkucmV2ZXJzZSgpLCB0OyB9IHJldHVybiBlLk5PVF9BVkFJTEFCTEU7IH07IGNvbnN0IGkgPSBmdW5jdGlvbiAoZSkgeyBpZiAobmF2aWdhdG9yLnBsdWdpbnMgPT0gbnVsbCkgcmV0dXJuIGUuTk9UX0FWQUlMQUJMRTsgZm9yICh2YXIgdCA9IFtdLCBhID0gMCwgbiA9IG5hdmlnYXRvci5wbHVnaW5zLmxlbmd0aDsgYSA8IG47IGErKyluYXZpZ2F0b3IucGx1Z2luc1thXSAmJiB0LnB1c2gobmF2aWdhdG9yLnBsdWdpbnNbYV0pOyByZXR1cm4gdShlKSAmJiAodCA9IHQuc29ydCgoZSwgdCkgPT4geyByZXR1cm4gZS5uYW1lID4gdC5uYW1lID8gMSA6IGUubmFtZSA8IHQubmFtZSA/IC0xIDogMDsgfSkpLCBzKHQsIChlKSA9PiB7IGNvbnN0IHQgPSBzKGUsIChlKSA9PiB7IHJldHVybiBbZS50eXBlLCBlLnN1ZmZpeGVzXTsgfSk7IHJldHVybiBbZS5uYW1lLCBlLmRlc2NyaXB0aW9uLCB0XTsgfSk7IH07IGNvbnN0IG8gPSBmdW5jdGlvbiAodCkgeyBsZXQgZSA9IFtdOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHdpbmRvdywgJ0FjdGl2ZVhPYmplY3QnKSB8fCAnQWN0aXZlWE9iamVjdCcgaW4gd2luZG93KSB7IGUgPSBzKFsnQWNyb1BERi5QREYnLCAnQWRvZGIuU3RyZWFtJywgJ0FnQ29udHJvbC5BZ0NvbnRyb2wnLCAnRGV2YWxWUlhDdHJsLkRldmFsVlJYQ3RybC4xJywgJ01hY3JvbWVkaWFGbGFzaFBhcGVyLk1hY3JvbWVkaWFGbGFzaFBhcGVyJywgJ01zeG1sMi5ET01Eb2N1bWVudCcsICdNc3htbDIuWE1MSFRUUCcsICdQREYuUGRmQ3RybCcsICdRdWlja1RpbWUuUXVpY2tUaW1lJywgJ1F1aWNrVGltZUNoZWNrT2JqZWN0LlF1aWNrVGltZUNoZWNrLjEnLCAnUmVhbFBsYXllcicsICdSZWFsUGxheWVyLlJlYWxQbGF5ZXIodG0pIEFjdGl2ZVggQ29udHJvbCAoMzItYml0KScsICdSZWFsVmlkZW8uUmVhbFZpZGVvKHRtKSBBY3RpdmVYIENvbnRyb2wgKDMyLWJpdCknLCAnU2NyaXB0aW5nLkRpY3Rpb25hcnknLCAnU1dDdGwuU1dDdGwnLCAnU2hlbGwuVUlIZWxwZXInLCAnU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2gnLCAnU2t5cGUuRGV0ZWN0aW9uJywgJ1REQ0N0bC5URENDdGwnLCAnV01QbGF5ZXIuT0NYJywgJ3Jtb2N4LlJlYWxQbGF5ZXIgRzIgQ29udHJvbCcsICdybW9jeC5SZWFsUGxheWVyIEcyIENvbnRyb2wuMSddLCAoZSkgPT4geyB0cnkgeyByZXR1cm4gbmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KGUpLCBlOyB9IGNhdGNoIChlKSB7IHJldHVybiB0LkVSUk9SOyB9IH0pOyB9IGVsc2UgZS5wdXNoKHQuTk9UX0FWQUlMQUJMRSk7IHJldHVybiBuYXZpZ2F0b3IucGx1Z2lucyAmJiAoZSA9IGUuY29uY2F0KGkodCkpKSwgZTsgfTsgdmFyIHUgPSBmdW5jdGlvbiAoZSkgeyBmb3IgKHZhciB0ID0gITEsIGEgPSAwLCBuID0gZS5wbHVnaW5zLnNvcnRQbHVnaW5zRm9yLmxlbmd0aDsgYSA8IG47IGErKykgeyBjb25zdCByID0gZS5wbHVnaW5zLnNvcnRQbHVnaW5zRm9yW2FdOyBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaChyKSkgeyB0ID0gITA7IGJyZWFrOyB9IH0gcmV0dXJuIHQ7IH07IGNvbnN0IHAgPSBmdW5jdGlvbiAodCkgeyB0cnkgeyByZXR1cm4gISF3aW5kb3cuc2Vzc2lvblN0b3JhZ2U7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIHQuRVJST1I7IH0gfTsgY29uc3QgdiA9IGZ1bmN0aW9uICh0KSB7IHRyeSB7IHJldHVybiAhIXdpbmRvdy5sb2NhbFN0b3JhZ2U7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIHQuRVJST1I7IH0gfTsgY29uc3QgQSA9IGZ1bmN0aW9uICh0KSB7IHRyeSB7IHJldHVybiAhIXdpbmRvdy5pbmRleGVkREI7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIHQuRVJST1I7IH0gfTsgY29uc3QgUyA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBuYXZpZ2F0b3IuaGFyZHdhcmVDb25jdXJyZW5jeSA/IG5hdmlnYXRvci5oYXJkd2FyZUNvbmN1cnJlbmN5IDogZS5OT1RfQVZBSUxBQkxFOyB9OyBjb25zdCBDID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIG5hdmlnYXRvci5jcHVDbGFzcyB8fCBlLk5PVF9BVkFJTEFCTEU7IH07IGNvbnN0IEIgPSBmdW5jdGlvbiAoZSkgeyByZXR1cm4gbmF2aWdhdG9yLnBsYXRmb3JtID8gbmF2aWdhdG9yLnBsYXRmb3JtIDogZS5OT1RfQVZBSUxBQkxFOyB9OyBjb25zdCB3ID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIG5hdmlnYXRvci5kb05vdFRyYWNrID8gbmF2aWdhdG9yLmRvTm90VHJhY2sgOiBuYXZpZ2F0b3IubXNEb05vdFRyYWNrID8gbmF2aWdhdG9yLm1zRG9Ob3RUcmFjayA6IHdpbmRvdy5kb05vdFRyYWNrID8gd2luZG93LmRvTm90VHJhY2sgOiBlLk5PVF9BVkFJTEFCTEU7IH07IGNvbnN0IHQgPSBmdW5jdGlvbiAoKSB7IGxldCB0OyBsZXQgZSA9IDA7IHZvaWQgMCAhPT0gbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID8gZSA9IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA6IHZvaWQgMCAhPT0gbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgJiYgKGUgPSBuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cyk7IHRyeSB7IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdUb3VjaEV2ZW50JyksIHQgPSAhMDsgfSBjYXRjaCAoZSkgeyB0ID0gITE7IH0gcmV0dXJuIFtlLCB0LCAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3ddOyB9OyBjb25zdCB5ID0gZnVuY3Rpb24gKGUpIHsgY29uc3QgdCA9IFtdOyBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7IGEud2lkdGggPSAyZTMsIGEuaGVpZ2h0ID0gMjAwLCBhLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJzsgY29uc3QgbiA9IGEuZ2V0Q29udGV4dCgnMmQnKTsgcmV0dXJuIG4ucmVjdCgwLCAwLCAxMCwgMTApLCBuLnJlY3QoMiwgMiwgNiwgNiksIHQucHVzaChgY2FudmFzIHdpbmRpbmc6JHshMSA9PT0gbi5pc1BvaW50SW5QYXRoKDUsIDUsICdldmVub2RkJykgPyAneWVzJyA6ICdubyd9YCksIG4udGV4dEJhc2VsaW5lID0gJ2FscGhhYmV0aWMnLCBuLmZpbGxTdHlsZSA9ICcjZjYwJywgbi5maWxsUmVjdCgxMjUsIDEsIDYyLCAyMCksIG4uZmlsbFN0eWxlID0gJyMwNjknLCBlLmRvbnRVc2VGYWtlRm9udEluQ2FudmFzID8gbi5mb250ID0gJzExcHQgQXJpYWwnIDogbi5mb250ID0gJzExcHQgbm8tcmVhbC1mb250LTEyMycsIG4uZmlsbFRleHQoJ0N3bSBmam9yZGJhbmsgZ2x5cGhzIHZleHQgcXVpeiwgXFx1ZDgzZFxcdWRlMDMnLCAyLCAxNSksIG4uZmlsbFN0eWxlID0gJ3JnYmEoMTAyLCAyMDQsIDAsIDAuMiknLCBuLmZvbnQgPSAnMThwdCBBcmlhbCcsIG4uZmlsbFRleHQoJ0N3bSBmam9yZGJhbmsgZ2x5cGhzIHZleHQgcXVpeiwgXFx1ZDgzZFxcdWRlMDMnLCA0LCA0NSksIG4uZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ211bHRpcGx5Jywgbi5maWxsU3R5bGUgPSAncmdiKDI1NSwwLDI1NSknLCBuLmJlZ2luUGF0aCgpLCBuLmFyYyg1MCwgNTAsIDUwLCAwLCAyICogTWF0aC5QSSwgITApLCBuLmNsb3NlUGF0aCgpLCBuLmZpbGwoKSwgbi5maWxsU3R5bGUgPSAncmdiKDAsMjU1LDI1NSknLCBuLmJlZ2luUGF0aCgpLCBuLmFyYygxMDAsIDUwLCA1MCwgMCwgMiAqIE1hdGguUEksICEwKSwgbi5jbG9zZVBhdGgoKSwgbi5maWxsKCksIG4uZmlsbFN0eWxlID0gJ3JnYigyNTUsMjU1LDApJywgbi5iZWdpblBhdGgoKSwgbi5hcmMoNzUsIDEwMCwgNTAsIDAsIDIgKiBNYXRoLlBJLCAhMCksIG4uY2xvc2VQYXRoKCksIG4uZmlsbCgpLCBuLmZpbGxTdHlsZSA9ICdyZ2IoMjU1LDAsMjU1KScsIG4uYXJjKDc1LCA3NSwgNzUsIDAsIDIgKiBNYXRoLlBJLCAhMCksIG4uYXJjKDc1LCA3NSwgMjUsIDAsIDIgKiBNYXRoLlBJLCAhMCksIG4uZmlsbCgnZXZlbm9kZCcpLCBhLnRvRGF0YVVSTCAmJiB0LnB1c2goYGNhbnZhcyBmcDoke2EudG9EYXRhVVJMKCl9YCksIHQ7IH07IGNvbnN0IEUgPSBmdW5jdGlvbiAoKSB7IGxldCBvOyBjb25zdCBlID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIG8uY2xlYXJDb2xvcigwLCAwLCAwLCAxKSwgby5lbmFibGUoby5ERVBUSF9URVNUKSwgby5kZXB0aEZ1bmMoby5MRVFVQUwpLCBvLmNsZWFyKG8uQ09MT1JfQlVGRkVSX0JJVCB8IG8uREVQVEhfQlVGRkVSX0JJVCksIGBbJHtlWzBdfSwgJHtlWzFdfV1gOyB9OyBpZiAoIShvID0gRigpKSkgcmV0dXJuIG51bGw7IGNvbnN0IGwgPSBbXTsgY29uc3QgdCA9IG8uY3JlYXRlQnVmZmVyKCk7IG8uYmluZEJ1ZmZlcihvLkFSUkFZX0JVRkZFUiwgdCk7IGNvbnN0IGEgPSBuZXcgRmxvYXQzMkFycmF5KFstMC4yLCAtMC45LCAwLCAwLjQsIC0wLjI2LCAwLCAwLCAwLjczMjEzNDQ0NCwgMF0pOyBvLmJ1ZmZlckRhdGEoby5BUlJBWV9CVUZGRVIsIGEsIG8uU1RBVElDX0RSQVcpLCB0Lml0ZW1TaXplID0gMywgdC5udW1JdGVtcyA9IDM7IGNvbnN0IG4gPSBvLmNyZWF0ZVByb2dyYW0oKTsgY29uc3QgciA9IG8uY3JlYXRlU2hhZGVyKG8uVkVSVEVYX1NIQURFUik7IG8uc2hhZGVyU291cmNlKHIsICdhdHRyaWJ1dGUgdmVjMiBhdHRyVmVydGV4O3ZhcnlpbmcgdmVjMiB2YXJ5aW5UZXhDb29yZGluYXRlO3VuaWZvcm0gdmVjMiB1bmlmb3JtT2Zmc2V0O3ZvaWQgbWFpbigpe3ZhcnlpblRleENvb3JkaW5hdGU9YXR0clZlcnRleCt1bmlmb3JtT2Zmc2V0O2dsX1Bvc2l0aW9uPXZlYzQoYXR0clZlcnRleCwwLDEpO30nKSwgby5jb21waWxlU2hhZGVyKHIpOyBjb25zdCBpID0gby5jcmVhdGVTaGFkZXIoby5GUkFHTUVOVF9TSEFERVIpOyBvLnNoYWRlclNvdXJjZShpLCAncHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7dmFyeWluZyB2ZWMyIHZhcnlpblRleENvb3JkaW5hdGU7dm9pZCBtYWluKCkge2dsX0ZyYWdDb2xvcj12ZWM0KHZhcnlpblRleENvb3JkaW5hdGUsMCwxKTt9JyksIG8uY29tcGlsZVNoYWRlcihpKSwgby5hdHRhY2hTaGFkZXIobiwgciksIG8uYXR0YWNoU2hhZGVyKG4sIGkpLCBvLmxpbmtQcm9ncmFtKG4pLCBvLnVzZVByb2dyYW0obiksIG4udmVydGV4UG9zQXR0cmliID0gby5nZXRBdHRyaWJMb2NhdGlvbihuLCAnYXR0clZlcnRleCcpLCBuLm9mZnNldFVuaWZvcm0gPSBvLmdldFVuaWZvcm1Mb2NhdGlvbihuLCAndW5pZm9ybU9mZnNldCcpLCBvLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KG4udmVydGV4UG9zQXJyYXkpLCBvLnZlcnRleEF0dHJpYlBvaW50ZXIobi52ZXJ0ZXhQb3NBdHRyaWIsIHQuaXRlbVNpemUsIG8uRkxPQVQsICExLCAwLCAwKSwgby51bmlmb3JtMmYobi5vZmZzZXRVbmlmb3JtLCAxLCAxKSwgby5kcmF3QXJyYXlzKG8uVFJJQU5HTEVfU1RSSVAsIDAsIHQubnVtSXRlbXMpOyB0cnkgeyBsLnB1c2goby5jYW52YXMudG9EYXRhVVJMKCkpOyB9IGNhdGNoIChlKSB7fWwucHVzaChgZXh0ZW5zaW9uczokeyhvLmdldFN1cHBvcnRlZEV4dGVuc2lvbnMoKSB8fCBbXSkuam9pbignOycpfWApLCBsLnB1c2goYHdlYmdsIGFsaWFzZWQgbGluZSB3aWR0aCByYW5nZToke2Uoby5nZXRQYXJhbWV0ZXIoby5BTElBU0VEX0xJTkVfV0lEVEhfUkFOR0UpKX1gKSwgbC5wdXNoKGB3ZWJnbCBhbGlhc2VkIHBvaW50IHNpemUgcmFuZ2U6JHtlKG8uZ2V0UGFyYW1ldGVyKG8uQUxJQVNFRF9QT0lOVF9TSVpFX1JBTkdFKSl9YCksIGwucHVzaChgd2ViZ2wgYWxwaGEgYml0czoke28uZ2V0UGFyYW1ldGVyKG8uQUxQSEFfQklUUyl9YCksIGwucHVzaChgd2ViZ2wgYW50aWFsaWFzaW5nOiR7by5nZXRDb250ZXh0QXR0cmlidXRlcygpLmFudGlhbGlhcyA/ICd5ZXMnIDogJ25vJ31gKSwgbC5wdXNoKGB3ZWJnbCBibHVlIGJpdHM6JHtvLmdldFBhcmFtZXRlcihvLkJMVUVfQklUUyl9YCksIGwucHVzaChgd2ViZ2wgZGVwdGggYml0czoke28uZ2V0UGFyYW1ldGVyKG8uREVQVEhfQklUUyl9YCksIGwucHVzaChgd2ViZ2wgZ3JlZW4gYml0czoke28uZ2V0UGFyYW1ldGVyKG8uR1JFRU5fQklUUyl9YCksIGwucHVzaChgd2ViZ2wgbWF4IGFuaXNvdHJvcHk6JHsoZnVuY3Rpb24gKGUpIHsgY29uc3QgdCA9IGUuZ2V0RXh0ZW5zaW9uKCdFWFRfdGV4dHVyZV9maWx0ZXJfYW5pc290cm9waWMnKSB8fCBlLmdldEV4dGVuc2lvbignV0VCS0lUX0VYVF90ZXh0dXJlX2ZpbHRlcl9hbmlzb3Ryb3BpYycpIHx8IGUuZ2V0RXh0ZW5zaW9uKCdNT1pfRVhUX3RleHR1cmVfZmlsdGVyX2FuaXNvdHJvcGljJyk7IGlmICh0KSB7IGxldCBhID0gZS5nZXRQYXJhbWV0ZXIodC5NQVhfVEVYVFVSRV9NQVhfQU5JU09UUk9QWV9FWFQpOyByZXR1cm4gYSA9PT0gMCAmJiAoYSA9IDIpLCBhOyB9IHJldHVybiBudWxsOyB9KG8pKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggY29tYmluZWQgdGV4dHVyZSBpbWFnZSB1bml0czoke28uZ2V0UGFyYW1ldGVyKG8uTUFYX0NPTUJJTkVEX1RFWFRVUkVfSU1BR0VfVU5JVFMpfWApLCBsLnB1c2goYHdlYmdsIG1heCBjdWJlIG1hcCB0ZXh0dXJlIHNpemU6JHtvLmdldFBhcmFtZXRlcihvLk1BWF9DVUJFX01BUF9URVhUVVJFX1NJWkUpfWApLCBsLnB1c2goYHdlYmdsIG1heCBmcmFnbWVudCB1bmlmb3JtIHZlY3RvcnM6JHtvLmdldFBhcmFtZXRlcihvLk1BWF9GUkFHTUVOVF9VTklGT1JNX1ZFQ1RPUlMpfWApLCBsLnB1c2goYHdlYmdsIG1heCByZW5kZXIgYnVmZmVyIHNpemU6JHtvLmdldFBhcmFtZXRlcihvLk1BWF9SRU5ERVJCVUZGRVJfU0laRSl9YCksIGwucHVzaChgd2ViZ2wgbWF4IHRleHR1cmUgaW1hZ2UgdW5pdHM6JHtvLmdldFBhcmFtZXRlcihvLk1BWF9URVhUVVJFX0lNQUdFX1VOSVRTKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggdGV4dHVyZSBzaXplOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfVEVYVFVSRV9TSVpFKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggdmFyeWluZyB2ZWN0b3JzOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfVkFSWUlOR19WRUNUT1JTKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggdmVydGV4IGF0dHJpYnM6JHtvLmdldFBhcmFtZXRlcihvLk1BWF9WRVJURVhfQVRUUklCUyl9YCksIGwucHVzaChgd2ViZ2wgbWF4IHZlcnRleCB0ZXh0dXJlIGltYWdlIHVuaXRzOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfVkVSVEVYX1RFWFRVUkVfSU1BR0VfVU5JVFMpfWApLCBsLnB1c2goYHdlYmdsIG1heCB2ZXJ0ZXggdW5pZm9ybSB2ZWN0b3JzOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfVkVSVEVYX1VOSUZPUk1fVkVDVE9SUyl9YCksIGwucHVzaChgd2ViZ2wgbWF4IHZpZXdwb3J0IGRpbXM6JHtlKG8uZ2V0UGFyYW1ldGVyKG8uTUFYX1ZJRVdQT1JUX0RJTVMpKX1gKSwgbC5wdXNoKGB3ZWJnbCByZWQgYml0czoke28uZ2V0UGFyYW1ldGVyKG8uUkVEX0JJVFMpfWApLCBsLnB1c2goYHdlYmdsIHJlbmRlcmVyOiR7by5nZXRQYXJhbWV0ZXIoby5SRU5ERVJFUil9YCksIGwucHVzaChgd2ViZ2wgc2hhZGluZyBsYW5ndWFnZSB2ZXJzaW9uOiR7by5nZXRQYXJhbWV0ZXIoby5TSEFESU5HX0xBTkdVQUdFX1ZFUlNJT04pfWApLCBsLnB1c2goYHdlYmdsIHN0ZW5jaWwgYml0czoke28uZ2V0UGFyYW1ldGVyKG8uU1RFTkNJTF9CSVRTKX1gKSwgbC5wdXNoKGB3ZWJnbCB2ZW5kb3I6JHtvLmdldFBhcmFtZXRlcihvLlZFTkRPUil9YCksIGwucHVzaChgd2ViZ2wgdmVyc2lvbjoke28uZ2V0UGFyYW1ldGVyKG8uVkVSU0lPTil9YCk7IHRyeSB7IGNvbnN0IHMgPSBvLmdldEV4dGVuc2lvbignV0VCR0xfZGVidWdfcmVuZGVyZXJfaW5mbycpOyBzICYmIChsLnB1c2goYHdlYmdsIHVubWFza2VkIHZlbmRvcjoke28uZ2V0UGFyYW1ldGVyKHMuVU5NQVNLRURfVkVORE9SX1dFQkdMKX1gKSwgbC5wdXNoKGB3ZWJnbCB1bm1hc2tlZCByZW5kZXJlcjoke28uZ2V0UGFyYW1ldGVyKHMuVU5NQVNLRURfUkVOREVSRVJfV0VCR0wpfWApKTsgfSBjYXRjaCAoZSkge30gcmV0dXJuIG8uZ2V0U2hhZGVyUHJlY2lzaW9uRm9ybWF0ICYmIGMoWydGTE9BVCcsICdJTlQnXSwgKGkpID0+IHsgYyhbJ1ZFUlRFWCcsICdGUkFHTUVOVCddLCAocikgPT4geyBjKFsnSElHSCcsICdNRURJVU0nLCAnTE9XJ10sIChuKSA9PiB7IGMoWydwcmVjaXNpb24nLCAncmFuZ2VNaW4nLCAncmFuZ2VNYXgnXSwgKGUpID0+IHsgY29uc3QgdCA9IG8uZ2V0U2hhZGVyUHJlY2lzaW9uRm9ybWF0KG9bYCR7cn1fU0hBREVSYF0sIG9bYCR7bn1fJHtpfWBdKVtlXTsgZSAhPT0gJ3ByZWNpc2lvbicgJiYgKGUgPSBgcHJlY2lzaW9uICR7ZX1gKTsgY29uc3QgYSA9IFsnd2ViZ2wgJywgci50b0xvd2VyQ2FzZSgpLCAnIHNoYWRlciAnLCBuLnRvTG93ZXJDYXNlKCksICcgJywgaS50b0xvd2VyQ2FzZSgpLCAnICcsIGUsICc6JywgdF0uam9pbignJyk7IGwucHVzaChhKTsgfSk7IH0pOyB9KTsgfSksIGw7IH07IGNvbnN0IE0gPSBmdW5jdGlvbiAoKSB7IHRyeSB7IGNvbnN0IGUgPSBGKCk7IGNvbnN0IHQgPSBlLmdldEV4dGVuc2lvbignV0VCR0xfZGVidWdfcmVuZGVyZXJfaW5mbycpOyByZXR1cm4gYCR7ZS5nZXRQYXJhbWV0ZXIodC5VTk1BU0tFRF9WRU5ET1JfV0VCR0wpfX4ke2UuZ2V0UGFyYW1ldGVyKHQuVU5NQVNLRURfUkVOREVSRVJfV0VCR0wpfWA7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIG51bGw7IH0gfTsgY29uc3QgeCA9IGZ1bmN0aW9uICgpIHsgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyBlLmlubmVySFRNTCA9ICcmbmJzcDsnOyBsZXQgdCA9ICEoZS5jbGFzc05hbWUgPSAnYWRzYm94Jyk7IHRyeSB7IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZSksIHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhZHNib3gnKVswXS5vZmZzZXRIZWlnaHQgPT09IDAsIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZSk7IH0gY2F0Y2ggKGUpIHsgdCA9ICExOyB9IHJldHVybiB0OyB9OyBjb25zdCBPID0gZnVuY3Rpb24gKCkgeyBpZiAodm9pZCAwICE9PSBuYXZpZ2F0b3IubGFuZ3VhZ2VzKSB0cnkgeyBpZiAobmF2aWdhdG9yLmxhbmd1YWdlc1swXS5zdWJzdHIoMCwgMikgIT09IG5hdmlnYXRvci5sYW5ndWFnZS5zdWJzdHIoMCwgMikpIHJldHVybiAhMDsgfSBjYXRjaCAoZSkgeyByZXR1cm4gITA7IH0gcmV0dXJuICExOyB9OyBjb25zdCBiID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93LnNjcmVlbi53aWR0aCA8IHdpbmRvdy5zY3JlZW4uYXZhaWxXaWR0aCB8fCB3aW5kb3cuc2NyZWVuLmhlaWdodCA8IHdpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQ7IH07IGNvbnN0IFAgPSBmdW5jdGlvbiAoKSB7IGxldCBlOyBjb25zdCB0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpOyBsZXQgYSA9IG5hdmlnYXRvci5vc2NwdTsgY29uc3QgbiA9IG5hdmlnYXRvci5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpOyBpZiAoZSA9IHQuaW5kZXhPZignd2luZG93cyBwaG9uZScpID49IDAgPyAnV2luZG93cyBQaG9uZScgOiB0LmluZGV4T2YoJ3dpbicpID49IDAgPyAnV2luZG93cycgOiB0LmluZGV4T2YoJ2FuZHJvaWQnKSA+PSAwID8gJ0FuZHJvaWQnIDogdC5pbmRleE9mKCdsaW51eCcpID49IDAgfHwgdC5pbmRleE9mKCdjcm9zJykgPj0gMCA/ICdMaW51eCcgOiB0LmluZGV4T2YoJ2lwaG9uZScpID49IDAgfHwgdC5pbmRleE9mKCdpcGFkJykgPj0gMCA/ICdpT1MnIDogdC5pbmRleE9mKCdtYWMnKSA+PSAwID8gJ01hYycgOiAnT3RoZXInLCAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDAgfHwgbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgPiAwKSAmJiBlICE9PSAnV2luZG93cyBQaG9uZScgJiYgZSAhPT0gJ0FuZHJvaWQnICYmIGUgIT09ICdpT1MnICYmIGUgIT09ICdPdGhlcicpIHJldHVybiAhMDsgaWYgKHZvaWQgMCAhPT0gYSkgeyBpZiAoKGEgPSBhLnRvTG93ZXJDYXNlKCkpLmluZGV4T2YoJ3dpbicpID49IDAgJiYgZSAhPT0gJ1dpbmRvd3MnICYmIGUgIT09ICdXaW5kb3dzIFBob25lJykgcmV0dXJuICEwOyBpZiAoYS5pbmRleE9mKCdsaW51eCcpID49IDAgJiYgZSAhPT0gJ0xpbnV4JyAmJiBlICE9PSAnQW5kcm9pZCcpIHJldHVybiAhMDsgaWYgKGEuaW5kZXhPZignbWFjJykgPj0gMCAmJiBlICE9PSAnTWFjJyAmJiBlICE9PSAnaU9TJykgcmV0dXJuICEwOyBpZiAoKGEuaW5kZXhPZignd2luJykgPT09IC0xICYmIGEuaW5kZXhPZignbGludXgnKSA9PT0gLTEgJiYgYS5pbmRleE9mKCdtYWMnKSA9PT0gLTEpICE9IChlID09PSAnT3RoZXInKSkgcmV0dXJuICEwOyB9IHJldHVybiBuLmluZGV4T2YoJ3dpbicpID49IDAgJiYgZSAhPT0gJ1dpbmRvd3MnICYmIGUgIT09ICdXaW5kb3dzIFBob25lJyB8fCAoKG4uaW5kZXhPZignbGludXgnKSA+PSAwIHx8IG4uaW5kZXhPZignYW5kcm9pZCcpID49IDAgfHwgbi5pbmRleE9mKCdwaWtlJykgPj0gMCkgJiYgZSAhPT0gJ0xpbnV4JyAmJiBlICE9PSAnQW5kcm9pZCcgfHwgKChuLmluZGV4T2YoJ21hYycpID49IDAgfHwgbi5pbmRleE9mKCdpcGFkJykgPj0gMCB8fCBuLmluZGV4T2YoJ2lwb2QnKSA+PSAwIHx8IG4uaW5kZXhPZignaXBob25lJykgPj0gMCkgJiYgZSAhPT0gJ01hYycgJiYgZSAhPT0gJ2lPUycgfHwgKChuLmluZGV4T2YoJ3dpbicpIDwgMCAmJiBuLmluZGV4T2YoJ2xpbnV4JykgPCAwICYmIG4uaW5kZXhPZignbWFjJykgPCAwICYmIG4uaW5kZXhPZignaXBob25lJykgPCAwICYmIG4uaW5kZXhPZignaXBhZCcpIDwgMCkgIT09IChlID09PSAnT3RoZXInKSB8fCB2b2lkIDAgPT09IG5hdmlnYXRvci5wbHVnaW5zICYmIGUgIT09ICdXaW5kb3dzJyAmJiBlICE9PSAnV2luZG93cyBQaG9uZScpKSk7IH07IGNvbnN0IEwgPSBmdW5jdGlvbiAoKSB7IGxldCBlOyBjb25zdCB0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpOyBjb25zdCBhID0gbmF2aWdhdG9yLnByb2R1Y3RTdWI7IGlmICgoKGUgPSB0LmluZGV4T2YoJ2ZpcmVmb3gnKSA+PSAwID8gJ0ZpcmVmb3gnIDogdC5pbmRleE9mKCdvcGVyYScpID49IDAgfHwgdC5pbmRleE9mKCdvcHInKSA+PSAwID8gJ09wZXJhJyA6IHQuaW5kZXhPZignY2hyb21lJykgPj0gMCA/ICdDaHJvbWUnIDogdC5pbmRleE9mKCdzYWZhcmknKSA+PSAwID8gJ1NhZmFyaScgOiB0LmluZGV4T2YoJ3RyaWRlbnQnKSA+PSAwID8gJ0ludGVybmV0IEV4cGxvcmVyJyA6ICdPdGhlcicpID09PSAnQ2hyb21lJyB8fCBlID09PSAnU2FmYXJpJyB8fCBlID09PSAnT3BlcmEnKSAmJiBhICE9PSAnMjAwMzAxMDcnKSByZXR1cm4gITA7IGxldCBuOyBjb25zdCByID0gZXZhbC50b1N0cmluZygpLmxlbmd0aDsgaWYgKHIgPT09IDM3ICYmIGUgIT09ICdTYWZhcmknICYmIGUgIT09ICdGaXJlZm94JyAmJiBlICE9PSAnT3RoZXInKSByZXR1cm4gITA7IGlmIChyID09PSAzOSAmJiBlICE9PSAnSW50ZXJuZXQgRXhwbG9yZXInICYmIGUgIT09ICdPdGhlcicpIHJldHVybiAhMDsgaWYgKHIgPT09IDMzICYmIGUgIT09ICdDaHJvbWUnICYmIGUgIT09ICdPcGVyYScgJiYgZSAhPT0gJ090aGVyJykgcmV0dXJuICEwOyB0cnkgeyB0aHJvdyAnYSc7IH0gY2F0Y2ggKGUpIHsgdHJ5IHsgZS50b1NvdXJjZSgpLCBuID0gITA7IH0gY2F0Y2ggKGUpIHsgbiA9ICExOyB9IH0gcmV0dXJuIG4gJiYgZSAhPT0gJ0ZpcmVmb3gnICYmIGUgIT09ICdPdGhlcic7IH07IGNvbnN0IEkgPSBmdW5jdGlvbiAoKSB7IGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTsgcmV0dXJuICEoIWUuZ2V0Q29udGV4dCB8fCAhZS5nZXRDb250ZXh0KCcyZCcpKTsgfTsgY29uc3QgayA9IGZ1bmN0aW9uICgpIHsgaWYgKCFJKCkpIHJldHVybiAhMTsgY29uc3QgZSA9IEYoKTsgcmV0dXJuICEhd2luZG93LldlYkdMUmVuZGVyaW5nQ29udGV4dCAmJiAhIWU7IH07IGNvbnN0IFIgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuYXZpZ2F0b3IuYXBwTmFtZSA9PT0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlcicgfHwgIShuYXZpZ2F0b3IuYXBwTmFtZSAhPT0gJ05ldHNjYXBlJyB8fCAhL1RyaWRlbnQvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpOyB9OyBjb25zdCBEID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdm9pZCAwICE9PSB3aW5kb3cuc3dmb2JqZWN0OyB9OyBjb25zdCBOID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93LnN3Zm9iamVjdC5oYXNGbGFzaFBsYXllclZlcnNpb24oJzkuMC4wJyk7IH07IGNvbnN0IF8gPSBmdW5jdGlvbiAodCwgZSkgeyBjb25zdCBhID0gJ19fX2ZwX3N3Zl9sb2FkZWQnOyB3aW5kb3dbYV0gPSBmdW5jdGlvbiAoZSkgeyB0KGUpOyB9OyBsZXQgbjsgbGV0IHI7IGNvbnN0IGkgPSBlLmZvbnRzLnN3ZkNvbnRhaW5lcklkOyAociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKS5zZXRBdHRyaWJ1dGUoJ2lkJywgbi5mb250cy5zd2ZDb250YWluZXJJZCksIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocik7IGNvbnN0IG8gPSB7IG9uUmVhZHk6IGEgfTsgd2luZG93LnN3Zm9iamVjdC5lbWJlZFNXRihlLmZvbnRzLnN3ZlBhdGgsIGksICcxJywgJzEnLCAnOS4wLjAnLCAhMSwgbywgeyBhbGxvd1NjcmlwdEFjY2VzczogJ2Fsd2F5cycsIG1lbnU6ICdmYWxzZScgfSwge30pOyB9OyB2YXIgRiA9IGZ1bmN0aW9uICgpIHsgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOyBsZXQgdCA9IG51bGw7IHRyeSB7IHQgPSBlLmdldENvbnRleHQoJ3dlYmdsJykgfHwgZS5nZXRDb250ZXh0KCdleHBlcmltZW50YWwtd2ViZ2wnKTsgfSBjYXRjaCAoZSkge30gcmV0dXJuIHQgfHwgKHQgPSBudWxsKSwgdDsgfTsgY29uc3QgRyA9IFt7IGtleTogJ3VzZXJBZ2VudCcsIGdldERhdGEoZSkgeyBlKG5hdmlnYXRvci51c2VyQWdlbnQpOyB9IH0sIHsga2V5OiAnd2ViZHJpdmVyJywgZ2V0RGF0YShlLCB0KSB7IGUobmF2aWdhdG9yLndlYmRyaXZlciA9PSBudWxsID8gdC5OT1RfQVZBSUxBQkxFIDogbmF2aWdhdG9yLndlYmRyaXZlcik7IH0gfSwgeyBrZXk6ICdsYW5ndWFnZScsIGdldERhdGEoZSwgdCkgeyBlKG5hdmlnYXRvci5sYW5ndWFnZSB8fCBuYXZpZ2F0b3IudXNlckxhbmd1YWdlIHx8IG5hdmlnYXRvci5icm93c2VyTGFuZ3VhZ2UgfHwgbmF2aWdhdG9yLnN5c3RlbUxhbmd1YWdlIHx8IHQuTk9UX0FWQUlMQUJMRSk7IH0gfSwgeyBrZXk6ICdjb2xvckRlcHRoJywgZ2V0RGF0YShlLCB0KSB7IGUod2luZG93LnNjcmVlbi5jb2xvckRlcHRoIHx8IHQuTk9UX0FWQUlMQUJMRSk7IH0gfSwgeyBrZXk6ICdkZXZpY2VNZW1vcnknLCBnZXREYXRhKGUsIHQpIHsgZShuYXZpZ2F0b3IuZGV2aWNlTWVtb3J5IHx8IHQuTk9UX0FWQUlMQUJMRSk7IH0gfSwgeyBrZXk6ICdwaXhlbFJhdGlvJywgZ2V0RGF0YShlLCB0KSB7IGUod2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgdC5OT1RfQVZBSUxBQkxFKTsgfSB9LCB7IGtleTogJ2hhcmR3YXJlQ29uY3VycmVuY3knLCBnZXREYXRhKGUsIHQpIHsgZShTKHQpKTsgfSB9LCB7IGtleTogJ3NjcmVlblJlc29sdXRpb24nLCBnZXREYXRhKGUsIHQpIHsgZShuKHQpKTsgfSB9LCB7IGtleTogJ2F2YWlsYWJsZVNjcmVlblJlc29sdXRpb24nLCBnZXREYXRhKGUsIHQpIHsgZShyKHQpKTsgfSB9LCB7IGtleTogJ3RpbWV6b25lT2Zmc2V0JywgZ2V0RGF0YShlKSB7IGUoKG5ldyBEYXRlKCkpLmdldFRpbWV6b25lT2Zmc2V0KCkpOyB9IH0sIHsga2V5OiAndGltZXpvbmUnLCBnZXREYXRhKGUsIHQpIHsgd2luZG93LkludGwgJiYgd2luZG93LkludGwuRGF0ZVRpbWVGb3JtYXQgPyBlKChuZXcgd2luZG93LkludGwuRGF0ZVRpbWVGb3JtYXQoKSkucmVzb2x2ZWRPcHRpb25zKCkudGltZVpvbmUpIDogZSh0Lk5PVF9BVkFJTEFCTEUpOyB9IH0sIHsga2V5OiAnc2Vzc2lvblN0b3JhZ2UnLCBnZXREYXRhKGUsIHQpIHsgZShwKHQpKTsgfSB9LCB7IGtleTogJ2xvY2FsU3RvcmFnZScsIGdldERhdGEoZSwgdCkgeyBlKHYodCkpOyB9IH0sIHsga2V5OiAnaW5kZXhlZERiJywgZ2V0RGF0YShlLCB0KSB7IGUoQSh0KSk7IH0gfSwgeyBrZXk6ICdhZGRCZWhhdmlvcicsIGdldERhdGEoZSkgeyBlKCEoIWRvY3VtZW50LmJvZHkgfHwgIWRvY3VtZW50LmJvZHkuYWRkQmVoYXZpb3IpKTsgfSB9LCB7IGtleTogJ29wZW5EYXRhYmFzZScsIGdldERhdGEoZSkgeyBlKCEhd2luZG93Lm9wZW5EYXRhYmFzZSk7IH0gfSwgeyBrZXk6ICdjcHVDbGFzcycsIGdldERhdGEoZSwgdCkgeyBlKEModCkpOyB9IH0sIHsga2V5OiAncGxhdGZvcm0nLCBnZXREYXRhKGUsIHQpIHsgZShCKHQpKTsgfSB9LCB7IGtleTogJ2RvTm90VHJhY2snLCBnZXREYXRhKGUsIHQpIHsgZSh3KHQpKTsgfSB9LCB7IGtleTogJ3BsdWdpbnMnLCBnZXREYXRhKGUsIHQpIHsgUigpID8gdC5wbHVnaW5zLmV4Y2x1ZGVJRSA/IGUodC5FWENMVURFRCkgOiBlKG8odCkpIDogZShpKHQpKTsgfSB9LCB7IGtleTogJ2NhbnZhcycsIGdldERhdGEoZSwgdCkgeyBJKCkgPyBlKHkodCkpIDogZSh0Lk5PVF9BVkFJTEFCTEUpOyB9IH0sIHsga2V5OiAnd2ViZ2wnLCBnZXREYXRhKGUsIHQpIHsgaygpID8gZShFKCkpIDogZSh0Lk5PVF9BVkFJTEFCTEUpOyB9IH0sIHsga2V5OiAnd2ViZ2xWZW5kb3JBbmRSZW5kZXJlcicsIGdldERhdGEoZSkgeyBrKCkgPyBlKE0oKSkgOiBlKCk7IH0gfSwgeyBrZXk6ICdhZEJsb2NrJywgZ2V0RGF0YShlKSB7IGUoeCgpKTsgfSB9LCB7IGtleTogJ2hhc0xpZWRMYW5ndWFnZXMnLCBnZXREYXRhKGUpIHsgZShPKCkpOyB9IH0sIHsga2V5OiAnaGFzTGllZFJlc29sdXRpb24nLCBnZXREYXRhKGUpIHsgZShiKCkpOyB9IH0sIHsga2V5OiAnaGFzTGllZE9zJywgZ2V0RGF0YShlKSB7IGUoUCgpKTsgfSB9LCB7IGtleTogJ2hhc0xpZWRCcm93c2VyJywgZ2V0RGF0YShlKSB7IGUoTCgpKTsgfSB9LCB7IGtleTogJ3RvdWNoU3VwcG9ydCcsIGdldERhdGEoZSkgeyBlKHQoKSk7IH0gfSwgeyBrZXk6ICdmb250cycsIGdldERhdGEoZSwgdCkgeyBjb25zdCB1ID0gWydtb25vc3BhY2UnLCAnc2Fucy1zZXJpZicsICdzZXJpZiddOyBsZXQgZCA9IFsnQW5kYWxlIE1vbm8nLCAnQXJpYWwnLCAnQXJpYWwgQmxhY2snLCAnQXJpYWwgSGVicmV3JywgJ0FyaWFsIE1UJywgJ0FyaWFsIE5hcnJvdycsICdBcmlhbCBSb3VuZGVkIE1UIEJvbGQnLCAnQXJpYWwgVW5pY29kZSBNUycsICdCaXRzdHJlYW0gVmVyYSBTYW5zIE1vbm8nLCAnQm9vayBBbnRpcXVhJywgJ0Jvb2ttYW4gT2xkIFN0eWxlJywgJ0NhbGlicmknLCAnQ2FtYnJpYScsICdDYW1icmlhIE1hdGgnLCAnQ2VudHVyeScsICdDZW50dXJ5IEdvdGhpYycsICdDZW50dXJ5IFNjaG9vbGJvb2snLCAnQ29taWMgU2FucycsICdDb21pYyBTYW5zIE1TJywgJ0NvbnNvbGFzJywgJ0NvdXJpZXInLCAnQ291cmllciBOZXcnLCAnR2VuZXZhJywgJ0dlb3JnaWEnLCAnSGVsdmV0aWNhJywgJ0hlbHZldGljYSBOZXVlJywgJ0ltcGFjdCcsICdMdWNpZGEgQnJpZ2h0JywgJ0x1Y2lkYSBDYWxsaWdyYXBoeScsICdMdWNpZGEgQ29uc29sZScsICdMdWNpZGEgRmF4JywgJ0xVQ0lEQSBHUkFOREUnLCAnTHVjaWRhIEhhbmR3cml0aW5nJywgJ0x1Y2lkYSBTYW5zJywgJ0x1Y2lkYSBTYW5zIFR5cGV3cml0ZXInLCAnTHVjaWRhIFNhbnMgVW5pY29kZScsICdNaWNyb3NvZnQgU2FucyBTZXJpZicsICdNb25hY28nLCAnTW9ub3R5cGUgQ29yc2l2YScsICdNUyBHb3RoaWMnLCAnTVMgT3V0bG9vaycsICdNUyBQR290aGljJywgJ01TIFJlZmVyZW5jZSBTYW5zIFNlcmlmJywgJ01TIFNhbnMgU2VyaWYnLCAnTVMgU2VyaWYnLCAnTVlSSUFEJywgJ01ZUklBRCBQUk8nLCAnUGFsYXRpbm8nLCAnUGFsYXRpbm8gTGlub3R5cGUnLCAnU2Vnb2UgUHJpbnQnLCAnU2Vnb2UgU2NyaXB0JywgJ1NlZ29lIFVJJywgJ1NlZ29lIFVJIExpZ2h0JywgJ1NlZ29lIFVJIFNlbWlib2xkJywgJ1NlZ29lIFVJIFN5bWJvbCcsICdUYWhvbWEnLCAnVGltZXMnLCAnVGltZXMgTmV3IFJvbWFuJywgJ1RpbWVzIE5ldyBSb21hbiBQUycsICdUcmVidWNoZXQgTVMnLCAnVmVyZGFuYScsICdXaW5nZGluZ3MnLCAnV2luZ2RpbmdzIDInLCAnV2luZ2RpbmdzIDMnXTsgdC5mb250cy5leHRlbmRlZEpzRm9udHMgJiYgKGQgPSBkLmNvbmNhdChbJ0FiYWRpIE1UIENvbmRlbnNlZCBMaWdodCcsICdBY2FkZW15IEVuZ3JhdmVkIExFVCcsICdBRE9CRSBDQVNMT04gUFJPJywgJ0Fkb2JlIEdhcmFtb25kJywgJ0FET0JFIEdBUkFNT05EIFBSTycsICdBZ2VuY3kgRkInLCAnQWhhcm9uaScsICdBbGJlcnR1cyBFeHRyYSBCb2xkJywgJ0FsYmVydHVzIE1lZGl1bScsICdBbGdlcmlhbicsICdBbWF6b25lIEJUJywgJ0FtZXJpY2FuIFR5cGV3cml0ZXInLCAnQW1lcmljYW4gVHlwZXdyaXRlciBDb25kZW5zZWQnLCAnQW1lclR5cGUgTWQgQlQnLCAnQW5kYWx1cycsICdBbmdzYW5hIE5ldycsICdBbmdzYW5hVVBDJywgJ0FudGlxdWUgT2xpdmUnLCAnQXBhcmFqaXRhJywgJ0FwcGxlIENoYW5jZXJ5JywgJ0FwcGxlIENvbG9yIEVtb2ppJywgJ0FwcGxlIFNEIEdvdGhpYyBOZW8nLCAnQXJhYmljIFR5cGVzZXR0aW5nJywgJ0FSQ0hFUicsICdBUk5PIFBSTycsICdBcnJ1cyBCVCcsICdBdXJvcmEgQ24gQlQnLCAnQXZhbnRHYXJkZSBCayBCVCcsICdBdmFudEdhcmRlIE1kIEJUJywgJ0FWRU5JUicsICdBeXV0aGF5YScsICdCYW5keScsICdCYW5nbGEgU2FuZ2FtIE1OJywgJ0JhbmsgR290aGljJywgJ0JhbmtHb3RoaWMgTWQgQlQnLCAnQmFza2VydmlsbGUnLCAnQmFza2VydmlsbGUgT2xkIEZhY2UnLCAnQmF0YW5nJywgJ0JhdGFuZ0NoZScsICdCYXVlciBCb2RvbmknLCAnQmF1aGF1cyA5MycsICdCYXpvb2thJywgJ0JlbGwgTVQnLCAnQmVtYm8nLCAnQmVuZ3VpYXQgQmsgQlQnLCAnQmVybGluIFNhbnMgRkInLCAnQmVybGluIFNhbnMgRkIgRGVtaScsICdCZXJuYXJkIE1UIENvbmRlbnNlZCcsICdCZXJuaGFyZEZhc2hpb24gQlQnLCAnQmVybmhhcmRNb2QgQlQnLCAnQmlnIENhc2xvbicsICdCaW5uZXJEJywgJ0JsYWNrYWRkZXIgSVRDJywgJ0JsYWlyTWRJVEMgVFQnLCAnQm9kb25pIDcyJywgJ0JvZG9uaSA3MiBPbGRzdHlsZScsICdCb2RvbmkgNzIgU21hbGxjYXBzJywgJ0JvZG9uaSBNVCcsICdCb2RvbmkgTVQgQmxhY2snLCAnQm9kb25pIE1UIENvbmRlbnNlZCcsICdCb2RvbmkgTVQgUG9zdGVyIENvbXByZXNzZWQnLCAnQm9va3NoZWxmIFN5bWJvbCA3JywgJ0JvdWxkZXInLCAnQnJhZGxleSBIYW5kJywgJ0JyYWRsZXkgSGFuZCBJVEMnLCAnQnJlbWVuIEJkIEJUJywgJ0JyaXRhbm5pYyBCb2xkJywgJ0Jyb2Fkd2F5JywgJ0Jyb3dhbGxpYSBOZXcnLCAnQnJvd2FsbGlhVVBDJywgJ0JydXNoIFNjcmlwdCBNVCcsICdDYWxpZm9ybmlhbiBGQicsICdDYWxpc3RvIE1UJywgJ0NhbGxpZ3JhcGhlcicsICdDYW5kYXJhJywgJ0Nhc2xvbk9wbmZhY2UgQlQnLCAnQ2FzdGVsbGFyJywgJ0NlbnRhdXInLCAnQ2V6YW5uZScsICdDRyBPbWVnYScsICdDRyBUaW1lcycsICdDaGFsa2JvYXJkJywgJ0NoYWxrYm9hcmQgU0UnLCAnQ2hhbGtkdXN0ZXInLCAnQ2hhcmxlc3dvcnRoJywgJ0NoYXJ0ZXIgQmQgQlQnLCAnQ2hhcnRlciBCVCcsICdDaGF1Y2VyJywgJ0NoZWx0aG1JVEMgQmsgQlQnLCAnQ2hpbGxlcicsICdDbGFyZW5kb24nLCAnQ2xhcmVuZG9uIENvbmRlbnNlZCcsICdDbG9pc3RlckJsYWNrIEJUJywgJ0NvY2hpbicsICdDb2xvbm5hIE1UJywgJ0NvbnN0YW50aWEnLCAnQ29vcGVyIEJsYWNrJywgJ0NvcHBlcnBsYXRlJywgJ0NvcHBlcnBsYXRlIEdvdGhpYycsICdDb3BwZXJwbGF0ZSBHb3RoaWMgQm9sZCcsICdDb3BwZXJwbGF0ZSBHb3RoaWMgTGlnaHQnLCAnQ29wcGVycGxHb3RoIEJkIEJUJywgJ0NvcmJlbCcsICdDb3JkaWEgTmV3JywgJ0NvcmRpYVVQQycsICdDb3JuZXJzdG9uZScsICdDb3JvbmV0JywgJ0N1Y2tvbycsICdDdXJseiBNVCcsICdEYXVuUGVuaCcsICdEYXVwaGluJywgJ0RhdmlkJywgJ0RCIExDRCBUZW1wJywgJ0RFTElDSU9VUycsICdEZW5tYXJrJywgJ0RGS2FpLVNCJywgJ0RpZG90JywgJ0RpbGxlbmlhVVBDJywgJ0RJTicsICdEb2tDaGFtcGEnLCAnRG90dW0nLCAnRG90dW1DaGUnLCAnRWJyaW1hJywgJ0Vkd2FyZGlhbiBTY3JpcHQgSVRDJywgJ0VsZXBoYW50JywgJ0VuZ2xpc2ggMTExIFZpdmFjZSBCVCcsICdFbmdyYXZlcnMgTVQnLCAnRW5ncmF2ZXJzR290aGljIEJUJywgJ0VyYXMgQm9sZCBJVEMnLCAnRXJhcyBEZW1pIElUQycsICdFcmFzIExpZ2h0IElUQycsICdFcmFzIE1lZGl1bSBJVEMnLCAnRXVjcm9zaWFVUEMnLCAnRXVwaGVtaWEnLCAnRXVwaGVtaWEgVUNBUycsICdFVVJPU1RJTEUnLCAnRXhvdGMzNTAgQmQgQlQnLCAnRmFuZ1NvbmcnLCAnRmVsaXggVGl0bGluZycsICdGaXhlZHN5cycsICdGT05USU4nLCAnRm9vdGxpZ2h0IE1UIExpZ2h0JywgJ0ZvcnRlJywgJ0ZyYW5rUnVlaGwnLCAnRnJhbnNpc2NhbicsICdGcmVlZnJtNzIxIEJsayBCVCcsICdGcmVlc2lhVVBDJywgJ0ZyZWVzdHlsZSBTY3JpcHQnLCAnRnJlbmNoIFNjcmlwdCBNVCcsICdGcm5rR290aElUQyBCayBCVCcsICdGcnVpdGdlcicsICdGUlVUSUdFUicsICdGdXR1cmEnLCAnRnV0dXJhIEJrIEJUJywgJ0Z1dHVyYSBMdCBCVCcsICdGdXR1cmEgTWQgQlQnLCAnRnV0dXJhIFpCbGsgQlQnLCAnRnV0dXJhQmxhY2sgQlQnLCAnR2FicmlvbGEnLCAnR2FsbGlhcmQgQlQnLCAnR2F1dGFtaScsICdHZWV6YSBQcm8nLCAnR2VvbWV0cjIzMSBCVCcsICdHZW9tZXRyMjMxIEh2IEJUJywgJ0dlb21ldHIyMzEgTHQgQlQnLCAnR2VvU2xhYiA3MDMgTHQgQlQnLCAnR2VvU2xhYiA3MDMgWEJkIEJUJywgJ0dpZ2knLCAnR2lsbCBTYW5zJywgJ0dpbGwgU2FucyBNVCcsICdHaWxsIFNhbnMgTVQgQ29uZGVuc2VkJywgJ0dpbGwgU2FucyBNVCBFeHQgQ29uZGVuc2VkIEJvbGQnLCAnR2lsbCBTYW5zIFVsdHJhIEJvbGQnLCAnR2lsbCBTYW5zIFVsdHJhIEJvbGQgQ29uZGVuc2VkJywgJ0dpc2hhJywgJ0dsb3VjZXN0ZXIgTVQgRXh0cmEgQ29uZGVuc2VkJywgJ0dPVEhBTScsICdHT1RIQU0gQk9MRCcsICdHb3VkeSBPbGQgU3R5bGUnLCAnR291ZHkgU3RvdXQnLCAnR291ZHlIYW5kdG9vbGVkIEJUJywgJ0dvdWR5T0xTdCBCVCcsICdHdWphcmF0aSBTYW5nYW0gTU4nLCAnR3VsaW0nLCAnR3VsaW1DaGUnLCAnR3VuZ3N1aCcsICdHdW5nc3VoQ2hlJywgJ0d1cm11a2hpIE1OJywgJ0hhZXR0ZW5zY2h3ZWlsZXInLCAnSGFybG93IFNvbGlkIEl0YWxpYycsICdIYXJyaW5ndG9uJywgJ0hlYXRoZXInLCAnSGVpdGkgU0MnLCAnSGVpdGkgVEMnLCAnSEVMVicsICdIZXJhbGQnLCAnSGlnaCBUb3dlciBUZXh0JywgJ0hpcmFnaW5vIEtha3UgR290aGljIFByb04nLCAnSGlyYWdpbm8gTWluY2hvIFByb04nLCAnSG9lZmxlciBUZXh0JywgJ0h1bWFuc3QgNTIxIENuIEJUJywgJ0h1bWFuc3Q1MjEgQlQnLCAnSHVtYW5zdDUyMSBMdCBCVCcsICdJbXByaW50IE1UIFNoYWRvdycsICdJbmNpc2VkOTAxIEJkIEJUJywgJ0luY2lzZWQ5MDEgQlQnLCAnSW5jaXNlZDkwMSBMdCBCVCcsICdJTkNPTlNPTEFUQScsICdJbmZvcm1hbCBSb21hbicsICdJbmZvcm1hbDAxMSBCVCcsICdJTlRFUlNUQVRFJywgJ0lyaXNVUEMnLCAnSXNrb29sYSBQb3RhJywgJ0phc21pbmVVUEMnLCAnSmF6eiBMRVQnLCAnSmVuc29uJywgJ0plc3RlcicsICdKb2tlcm1hbicsICdKdWljZSBJVEMnLCAnS2FiZWwgQmsgQlQnLCAnS2FiZWwgVWx0IEJUJywgJ0thaWxhc2EnLCAnS2FpVGknLCAnS2FsaW5nYScsICdLYW5uYWRhIFNhbmdhbSBNTicsICdLYXJ0aWthJywgJ0thdWZtYW5uIEJkIEJUJywgJ0thdWZtYW5uIEJUJywgJ0tobWVyIFVJJywgJ0tvZGNoaWFuZ1VQQycsICdLb2tpbGEnLCAnS29yaW5uYSBCVCcsICdLcmlzdGVuIElUQycsICdLcnVuZ3RoZXAnLCAnS3Vuc3RsZXIgU2NyaXB0JywgJ0xhbyBVSScsICdMYXRoYScsICdMZWVsYXdhZGVlJywgJ0xldHRlciBHb3RoaWMnLCAnTGV2ZW5pbSBNVCcsICdMaWx5VVBDJywgJ0xpdGhvZ3JhcGgnLCAnTGl0aG9ncmFwaCBMaWdodCcsICdMb25nIElzbGFuZCcsICdMeWRpYW4gQlQnLCAnTWFnbmV0bycsICdNYWlhbmRyYSBHRCcsICdNYWxheWFsYW0gU2FuZ2FtIE1OJywgJ01hbGd1biBHb3RoaWMnLCAnTWFuZ2FsJywgJ01hcmlnb2xkJywgJ01hcmlvbicsICdNYXJrZXIgRmVsdCcsICdNYXJrZXQnLCAnTWFybGV0dCcsICdNYXRpc3NlIElUQycsICdNYXR1cmEgTVQgU2NyaXB0IENhcGl0YWxzJywgJ01laXJ5bycsICdNZWlyeW8gVUknLCAnTWljcm9zb2Z0IEhpbWFsYXlhJywgJ01pY3Jvc29mdCBKaGVuZ0hlaScsICdNaWNyb3NvZnQgTmV3IFRhaSBMdWUnLCAnTWljcm9zb2Z0IFBoYWdzUGEnLCAnTWljcm9zb2Z0IFRhaSBMZScsICdNaWNyb3NvZnQgVWlnaHVyJywgJ01pY3Jvc29mdCBZYUhlaScsICdNaWNyb3NvZnQgWWkgQmFpdGknLCAnTWluZ0xpVScsICdNaW5nTGlVX0hLU0NTJywgJ01pbmdMaVVfSEtTQ1MtRXh0QicsICdNaW5nTGlVLUV4dEInLCAnTWluaW9uJywgJ01pbmlvbiBQcm8nLCAnTWlyaWFtJywgJ01pcmlhbSBGaXhlZCcsICdNaXN0cmFsJywgJ01vZGVybicsICdNb2Rlcm4gTm8uIDIwJywgJ01vbmEgTGlzYSBTb2xpZCBJVEMgVFQnLCAnTW9uZ29saWFuIEJhaXRpJywgJ01PTk8nLCAnTW9vbEJvcmFuJywgJ01ycyBFYXZlcycsICdNUyBMaW5lRHJhdycsICdNUyBNaW5jaG8nLCAnTVMgUE1pbmNobycsICdNUyBSZWZlcmVuY2UgU3BlY2lhbHR5JywgJ01TIFVJIEdvdGhpYycsICdNVCBFeHRyYScsICdNVVNFTycsICdNViBCb2xpJywgJ05hZGVlbScsICdOYXJraXNpbScsICdORVZJUycsICdOZXdzIEdvdGhpYycsICdOZXdzIEdvdGhpY01UJywgJ05ld3NHb3RoIEJUJywgJ05pYWdhcmEgRW5ncmF2ZWQnLCAnTmlhZ2FyYSBTb2xpZCcsICdOb3Rld29ydGh5JywgJ05TaW1TdW4nLCAnTnlhbGEnLCAnT0NSIEEgRXh0ZW5kZWQnLCAnT2xkIENlbnR1cnknLCAnT2xkIEVuZ2xpc2ggVGV4dCBNVCcsICdPbnl4JywgJ09ueXggQlQnLCAnT1BUSU1BJywgJ09yaXlhIFNhbmdhbSBNTicsICdPU0FLQScsICdPekhhbmRpY3JhZnQgQlQnLCAnUGFsYWNlIFNjcmlwdCBNVCcsICdQYXB5cnVzJywgJ1BhcmNobWVudCcsICdQYXJ0eSBMRVQnLCAnUGVnYXN1cycsICdQZXJwZXR1YScsICdQZXJwZXR1YSBUaXRsaW5nIE1UJywgJ1BldGl0YUJvbGQnLCAnUGlja3dpY2snLCAnUGxhbnRhZ2VuZXQgQ2hlcm9rZWUnLCAnUGxheWJpbGwnLCAnUE1pbmdMaVUnLCAnUE1pbmdMaVUtRXh0QicsICdQb29yIFJpY2hhcmQnLCAnUG9zdGVyJywgJ1Bvc3RlckJvZG9uaSBCVCcsICdQUklOQ0VUT1dOIExFVCcsICdQcmlzdGluYScsICdQVEJhcm51bSBCVCcsICdQeXRoYWdvcmFzJywgJ1JhYXZpJywgJ1JhZ2UgSXRhbGljJywgJ1JhdmllJywgJ1JpYmJvbjEzMSBCZCBCVCcsICdSb2Nrd2VsbCcsICdSb2Nrd2VsbCBDb25kZW5zZWQnLCAnUm9ja3dlbGwgRXh0cmEgQm9sZCcsICdSb2QnLCAnUm9tYW4nLCAnU2Fra2FsIE1hamFsbGEnLCAnU2FudGEgRmUgTEVUJywgJ1Nhdm95ZSBMRVQnLCAnU2NlcHRyZScsICdTY3JpcHQnLCAnU2NyaXB0IE1UIEJvbGQnLCAnU0NSSVBUSU5BJywgJ1NlcmlmYScsICdTZXJpZmEgQlQnLCAnU2VyaWZhIFRoIEJUJywgJ1NoZWxsZXlWb2xhbnRlIEJUJywgJ1NoZXJ3b29kJywgJ1Nob25hciBCYW5nbGEnLCAnU2hvd2NhcmQgR290aGljJywgJ1NocnV0aScsICdTaWduYm9hcmQnLCAnU0lMS1NDUkVFTicsICdTaW1IZWknLCAnU2ltcGxpZmllZCBBcmFiaWMnLCAnU2ltcGxpZmllZCBBcmFiaWMgRml4ZWQnLCAnU2ltU3VuJywgJ1NpbVN1bi1FeHRCJywgJ1NpbmhhbGEgU2FuZ2FtIE1OJywgJ1NrZXRjaCBSb2Nrd2VsbCcsICdTa2lhJywgJ1NtYWxsIEZvbnRzJywgJ1NuYXAgSVRDJywgJ1NuZWxsIFJvdW5kaGFuZCcsICdTb2NrZXQnLCAnU291dmVuaXIgTHQgQlQnLCAnU3RhY2NhdG8yMjIgQlQnLCAnU3RlYW1lcicsICdTdGVuY2lsJywgJ1N0b3J5Ym9vaycsICdTdHlsbG8nLCAnU3Vid2F5JywgJ1N3aXM3MjEgQmxrRXggQlQnLCAnU3dpc3M5MTEgWENtIEJUJywgJ1N5bGZhZW4nLCAnU3luY2hybyBMRVQnLCAnU3lzdGVtJywgJ1RhbWlsIFNhbmdhbSBNTicsICdUZWNobmljYWwnLCAnVGVsZXR5cGUnLCAnVGVsdWd1IFNhbmdhbSBNTicsICdUZW1wdXMgU2FucyBJVEMnLCAnVGVybWluYWwnLCAnVGhvbmJ1cmknLCAnVHJhZGl0aW9uYWwgQXJhYmljJywgJ1RyYWphbicsICdUUkFKQU4gUFJPJywgJ1RyaXN0YW4nLCAnVHVidWxhcicsICdUdW5nYScsICdUdyBDZW4gTVQnLCAnVHcgQ2VuIE1UIENvbmRlbnNlZCcsICdUdyBDZW4gTVQgQ29uZGVuc2VkIEV4dHJhIEJvbGQnLCAnVHlwb1VwcmlnaHQgQlQnLCAnVW5pY29ybicsICdVbml2ZXJzJywgJ1VuaXZlcnMgQ0UgNTUgTWVkaXVtJywgJ1VuaXZlcnMgQ29uZGVuc2VkJywgJ1V0c2FhaCcsICdWYWdhYm9uZCcsICdWYW5pJywgJ1ZpamF5YScsICdWaW5lciBIYW5kIElUQycsICdWaXN1YWxVSScsICdWaXZhbGRpJywgJ1ZsYWRpbWlyIFNjcmlwdCcsICdWcmluZGEnLCAnV2VzdG1pbnN0ZXInLCAnV0hJVE5FWScsICdXaWRlIExhdGluJywgJ1phcGZFbGxpcHQgQlQnLCAnWmFwZkh1bW5zdCBCVCcsICdaYXBmSHVtbnN0IERtIEJUJywgJ1phcGZpbm8nLCAnWnVyaWNoIEJsa0V4IEJUJywgJ1p1cmljaCBFeCBCVCcsICdaV0Fkb2JlRiddKSk7IGQgPSAoZCA9IGQuY29uY2F0KHQuZm9udHMudXNlckRlZmluZWRGb250cykpLmZpbHRlcigoZSwgdCkgPT4geyByZXR1cm4gZC5pbmRleE9mKGUpID09PSB0OyB9KTsgY29uc3QgYSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07IGNvbnN0IHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgY29uc3QgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyBjb25zdCBuID0ge307IGNvbnN0IGkgPSB7fTsgY29uc3QgZiA9IGZ1bmN0aW9uICgpIHsgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTsgcmV0dXJuIGUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnLCBlLnN0eWxlLmxlZnQgPSAnLTk5OTlweCcsIGUuc3R5bGUuZm9udFNpemUgPSAnNzJweCcsIGUuc3R5bGUuZm9udFN0eWxlID0gJ25vcm1hbCcsIGUuc3R5bGUuZm9udFdlaWdodCA9ICdub3JtYWwnLCBlLnN0eWxlLmxldHRlclNwYWNpbmcgPSAnbm9ybWFsJywgZS5zdHlsZS5saW5lQnJlYWsgPSAnYXV0bycsIGUuc3R5bGUubGluZUhlaWdodCA9ICdub3JtYWwnLCBlLnN0eWxlLnRleHRUcmFuc2Zvcm0gPSAnbm9uZScsIGUuc3R5bGUudGV4dEFsaWduID0gJ2xlZnQnLCBlLnN0eWxlLnRleHREZWNvcmF0aW9uID0gJ25vbmUnLCBlLnN0eWxlLnRleHRTaGFkb3cgPSAnbm9uZScsIGUuc3R5bGUud2hpdGVTcGFjZSA9ICdub3JtYWwnLCBlLnN0eWxlLndvcmRCcmVhayA9ICdub3JtYWwnLCBlLnN0eWxlLndvcmRTcGFjaW5nID0gJ25vcm1hbCcsIGUuaW5uZXJIVE1MID0gJ21tbW1tbW1tbW1sbGknLCBlOyB9OyBjb25zdCBvID0gZnVuY3Rpb24gKGUpIHsgZm9yICh2YXIgdCA9ICExLCBhID0gMDsgYSA8IHUubGVuZ3RoOyBhKyspIGlmICh0ID0gZVthXS5vZmZzZXRXaWR0aCAhPT0gblt1W2FdXSB8fCBlW2FdLm9mZnNldEhlaWdodCAhPT0gaVt1W2FdXSkgcmV0dXJuIHQ7IHJldHVybiB0OyB9OyBjb25zdCBsID0gKGZ1bmN0aW9uICgpIHsgZm9yICh2YXIgZSA9IFtdLCB0ID0gMCwgYSA9IHUubGVuZ3RoOyB0IDwgYTsgdCsrKSB7IGNvbnN0IG4gPSBmKCk7IG4uc3R5bGUuZm9udEZhbWlseSA9IHVbdF0sIHIuYXBwZW5kQ2hpbGQobiksIGUucHVzaChuKTsgfSByZXR1cm4gZTsgfSgpKTsgYS5hcHBlbmRDaGlsZChyKTsgZm9yIChsZXQgcyA9IDAsIGMgPSB1Lmxlbmd0aDsgcyA8IGM7IHMrKyluW3Vbc11dID0gbFtzXS5vZmZzZXRXaWR0aCwgaVt1W3NdXSA9IGxbc10ub2Zmc2V0SGVpZ2h0OyBjb25zdCBoID0gKGZ1bmN0aW9uICgpIHsgZm9yICh2YXIgZSwgdCwgYSwgbiA9IHt9LCByID0gMCwgaSA9IGQubGVuZ3RoOyByIDwgaTsgcisrKSB7IGZvciAodmFyIG8gPSBbXSwgbCA9IDAsIHMgPSB1Lmxlbmd0aDsgbCA8IHM7IGwrKykgeyBjb25zdCBjID0gKGUgPSBkW3JdLCB0ID0gdVtsXSwgYSA9IHZvaWQgMCwgKGEgPSBmKCkpLnN0eWxlLmZvbnRGYW1pbHkgPSBgJyR7ZX0nLCR7dH1gLCBhKTsgZy5hcHBlbmRDaGlsZChjKSwgby5wdXNoKGMpOyB9bltkW3JdXSA9IG87IH0gcmV0dXJuIG47IH0oKSk7IGEuYXBwZW5kQ2hpbGQoZyk7IGZvciAodmFyIG0gPSBbXSwgVCA9IDAsIHAgPSBkLmxlbmd0aDsgVCA8IHA7IFQrKylvKGhbZFtUXV0pICYmIG0ucHVzaChkW1RdKTsgYS5yZW1vdmVDaGlsZChnKSwgYS5yZW1vdmVDaGlsZChyKSwgZShtKTsgfSwgcGF1c2VCZWZvcmU6ICEwIH0sIHsga2V5OiAnZm9udHNGbGFzaCcsIGdldERhdGEodCwgZSkgeyByZXR1cm4gRCgpID8gTigpID8gZS5mb250cy5zd2ZQYXRoID8gdm9pZCBfKChlKSA9PiB7IHQoZSk7IH0sIGUpIDogdCgnbWlzc2luZyBvcHRpb25zLmZvbnRzLnN3ZlBhdGgnKSA6IHQoJ2ZsYXNoIG5vdCBpbnN0YWxsZWQnKSA6IHQoJ3N3ZiBvYmplY3Qgbm90IGxvYWRlZCcpOyB9LCBwYXVzZUJlZm9yZTogITAgfSwgeyBrZXk6ICdhdWRpbycsIGdldERhdGEoYSwgZSkgeyBjb25zdCB0ID0gZS5hdWRpbzsgaWYgKHQuZXhjbHVkZUlPUzExICYmIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL09TIDExLitWZXJzaW9uXFwvMTEuK1NhZmFyaS8pKSByZXR1cm4gYShlLkVYQ0xVREVEKTsgY29uc3QgbiA9IHdpbmRvdy5PZmZsaW5lQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRPZmZsaW5lQXVkaW9Db250ZXh0OyBpZiAobiA9PSBudWxsKSByZXR1cm4gYShlLk5PVF9BVkFJTEFCTEUpOyBsZXQgciA9IG5ldyBuKDEsIDQ0MTAwLCA0NDEwMCk7IGNvbnN0IGkgPSByLmNyZWF0ZU9zY2lsbGF0b3IoKTsgaS50eXBlID0gJ3RyaWFuZ2xlJywgaS5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMWU0LCByLmN1cnJlbnRUaW1lKTsgY29uc3QgbyA9IHIuY3JlYXRlRHluYW1pY3NDb21wcmVzc29yKCk7IGMoW1sndGhyZXNob2xkJywgLTUwXSwgWydrbmVlJywgNDBdLCBbJ3JhdGlvJywgMTJdLCBbJ3JlZHVjdGlvbicsIC0yMF0sIFsnYXR0YWNrJywgMF0sIFsncmVsZWFzZScsIDAuMjVdXSwgKGUpID0+IHsgdm9pZCAwICE9PSBvW2VbMF1dICYmIHR5cGVvZiBvW2VbMF1dLnNldFZhbHVlQXRUaW1lID09PSAnZnVuY3Rpb24nICYmIG9bZVswXV0uc2V0VmFsdWVBdFRpbWUoZVsxXSwgci5jdXJyZW50VGltZSk7IH0pLCBpLmNvbm5lY3QobyksIG8uY29ubmVjdChyLmRlc3RpbmF0aW9uKSwgaS5zdGFydCgwKSwgci5zdGFydFJlbmRlcmluZygpOyBjb25zdCBsID0gc2V0VGltZW91dCgoKSA9PiB7IHJldHVybiBjb25zb2xlLndhcm4oYEF1ZGlvIGZpbmdlcnByaW50IHRpbWVkIG91dC4gUGxlYXNlIHJlcG9ydCBidWcgYXQgaHR0cHM6Ly9naXRodWIuY29tL1ZhbHZlL2ZpbmdlcnByaW50anMyIHdpdGggeW91ciB1c2VyIGFnZW50OiBcIiR7bmF2aWdhdG9yLnVzZXJBZ2VudH1cIi5gKSwgci5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge30sIHIgPSBudWxsLCBhKCdhdWRpb1RpbWVvdXQnKTsgfSwgdC50aW1lb3V0KTsgci5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKGUpIHsgbGV0IHQ7IHRyeSB7IGNsZWFyVGltZW91dChsKSwgdCA9IGUucmVuZGVyZWRCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoMCkuc2xpY2UoNDUwMCwgNWUzKS5yZWR1Y2UoKGUsIHQpID0+IHsgcmV0dXJuIGUgKyBNYXRoLmFicyh0KTsgfSwgMCkudG9TdHJpbmcoKSwgaS5kaXNjb25uZWN0KCksIG8uZGlzY29ubmVjdCgpOyB9IGNhdGNoIChlKSB7IHJldHVybiB2b2lkIGEoZSk7IH1hKHQpOyB9OyB9IH0sIHsga2V5OiAnZW51bWVyYXRlRGV2aWNlcycsIGdldERhdGEodCwgZSkgeyBpZiAoIWEoKSkgcmV0dXJuIHQoZS5OT1RfQVZBSUxBQkxFKTsgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKCkudGhlbigoZSkgPT4geyB0KGUubWFwKChlKSA9PiB7IHJldHVybiBgaWQ9JHtlLmRldmljZUlkfTtnaWQ9JHtlLmdyb3VwSWR9OyR7ZS5raW5kfTske2UubGFiZWx9YDsgfSkpOyB9KS5jYXRjaCgoZSkgPT4geyB0KGUpOyB9KTsgfSB9XTsgY29uc3QgVSA9IGZ1bmN0aW9uIChlKSB7IHRocm93IG5ldyBFcnJvcihcIiduZXcgRmluZ2VycHJpbnQoKScgaXMgZGVwcmVjYXRlZCwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9WYWx2ZS9maW5nZXJwcmludGpzMiN1cGdyYWRlLWd1aWRlLWZyb20tMTgyLXRvLTIwMFwiKTsgfTsgcmV0dXJuIFUuZ2V0ID0gZnVuY3Rpb24gKGEsIG4pIHsgbiA/IGEgfHwgKGEgPSB7fSkgOiAobiA9IGEsIGEgPSB7fSksIChmdW5jdGlvbiAoZSwgdCkgeyBpZiAodCA9PSBudWxsKSByZXR1cm47IGxldCBhOyBsZXQgbjsgZm9yIChuIGluIHQpKGEgPSB0W25dKSA9PSBudWxsIHx8IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLCBuKSB8fCAoZVtuXSA9IGEpOyB9KGEsIGUpKSwgYS5jb21wb25lbnRzID0gYS5leHRyYUNvbXBvbmVudHMuY29uY2F0KEcpOyB2YXIgciA9IHsgZGF0YTogW10sIGFkZFByZXByb2Nlc3NlZENvbXBvbmVudChlLCB0KSB7IHR5cGVvZiBhLnByZXByb2Nlc3NvciA9PT0gJ2Z1bmN0aW9uJyAmJiAodCA9IGEucHJlcHJvY2Vzc29yKGUsIHQpKSwgci5kYXRhLnB1c2goeyBrZXk6IGUsIHZhbHVlOiB0IH0pOyB9IH07IGxldCBpID0gLTE7IHZhciBvID0gZnVuY3Rpb24gKGUpIHsgaWYgKChpICs9IDEpID49IGEuY29tcG9uZW50cy5sZW5ndGgpbihyLmRhdGEpOyBlbHNlIHsgY29uc3QgdCA9IGEuY29tcG9uZW50c1tpXTsgaWYgKGEuZXhjbHVkZXNbdC5rZXldKW8oITEpOyBlbHNlIHsgaWYgKCFlICYmIHQucGF1c2VCZWZvcmUpIHJldHVybiBpIC09IDEsIHZvaWQgc2V0VGltZW91dCgoKSA9PiB7IG8oITApOyB9LCAxKTsgdHJ5IHsgdC5nZXREYXRhKChlKSA9PiB7IHIuYWRkUHJlcHJvY2Vzc2VkQ29tcG9uZW50KHQua2V5LCBlKSwgbyghMSk7IH0sIGEpOyB9IGNhdGNoIChlKSB7IHIuYWRkUHJlcHJvY2Vzc2VkQ29tcG9uZW50KHQua2V5LCBTdHJpbmcoZSkpLCBvKCExKTsgfSB9IH0gfTsgbyghMSk7IH0sIFUuZ2V0UHJvbWlzZSA9IGZ1bmN0aW9uIChhKSB7IHJldHVybiBuZXcgUHJvbWlzZSgoKGUsIHQpID0+IHsgVS5nZXQoYSwgZSk7IH0pKTsgfSwgVS5nZXRWMTggPSBmdW5jdGlvbiAoaSwgbykgeyByZXR1cm4gbyA9PSBudWxsICYmIChvID0gaSwgaSA9IHt9KSwgVS5nZXQoaSwgKGUpID0+IHsgZm9yICh2YXIgdCA9IFtdLCBhID0gMDsgYSA8IGUubGVuZ3RoOyBhKyspIHsgY29uc3QgbiA9IGVbYV07IGlmIChuLnZhbHVlID09PSAoaS5OT1RfQVZBSUxBQkxFIHx8ICdub3QgYXZhaWxhYmxlJykpdC5wdXNoKHsga2V5OiBuLmtleSwgdmFsdWU6ICd1bmtub3duJyB9KTsgZWxzZSBpZiAobi5rZXkgPT09ICdwbHVnaW5zJyl0LnB1c2goeyBrZXk6ICdwbHVnaW5zJywgdmFsdWU6IHMobi52YWx1ZSwgKGUpID0+IHsgY29uc3QgdCA9IHMoZVsyXSwgKGUpID0+IHsgcmV0dXJuIGUuam9pbiA/IGUuam9pbignficpIDogZTsgfSkuam9pbignLCcpOyByZXR1cm4gW2VbMF0sIGVbMV0sIHRdLmpvaW4oJzo6Jyk7IH0pIH0pOyBlbHNlIGlmIChbJ2NhbnZhcycsICd3ZWJnbCddLmluZGV4T2Yobi5rZXkpICE9PSAtMSl0LnB1c2goeyBrZXk6IG4ua2V5LCB2YWx1ZTogbi52YWx1ZS5qb2luKCd+JykgfSk7IGVsc2UgaWYgKFsnc2Vzc2lvblN0b3JhZ2UnLCAnbG9jYWxTdG9yYWdlJywgJ2luZGV4ZWREYicsICdhZGRCZWhhdmlvcicsICdvcGVuRGF0YWJhc2UnXS5pbmRleE9mKG4ua2V5KSAhPT0gLTEpIHsgaWYgKCFuLnZhbHVlKSBjb250aW51ZTsgdC5wdXNoKHsga2V5OiBuLmtleSwgdmFsdWU6IDEgfSk7IH0gZWxzZSBuLnZhbHVlID8gdC5wdXNoKG4udmFsdWUuam9pbiA/IHsga2V5OiBuLmtleSwgdmFsdWU6IG4udmFsdWUuam9pbignOycpIH0gOiBuKSA6IHQucHVzaCh7IGtleTogbi5rZXksIHZhbHVlOiBuLnZhbHVlIH0pOyB9IGNvbnN0IHIgPSBsKHModCwgKGUpID0+IHsgcmV0dXJuIGUudmFsdWU7IH0pLmpvaW4oJ35+ficpLCAzMSk7IG8ociwgdCk7IH0pOyB9LCBVLng2NGhhc2gxMjggPSBsLCBVLlZFUlNJT04gPSAnMi4xLjAnLCBVO1xufSkpO1xuIiwiLyohXG4gQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cbi8qISBsaWZlY3ljbGUuZXM1LmpzIHYwLjEuMSAqL1xuIShmdW5jdGlvbiAoZSwgdCkge1xuXHQnb2JqZWN0JyA9PSB0eXBlb2YgZXhwb3J0cyAmJiAndW5kZWZpbmVkJyAhPSB0eXBlb2YgbW9kdWxlXG5cdFx0PyAobW9kdWxlLmV4cG9ydHMgPSB0KCkpXG5cdFx0OiAnZnVuY3Rpb24nID09IHR5cGVvZiBkZWZpbmUgJiYgZGVmaW5lLmFtZFxuXHRcdD8gZGVmaW5lKHQpXG5cdFx0OiAoZS5saWZlY3ljbGUgPSB0KCkpO1xufSkodGhpcywgZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBlID0gdm9pZCAwO1xuXHR0cnkge1xuXHRcdG5ldyBFdmVudFRhcmdldCgpLCAoZSA9ICExKTtcblx0fSBjYXRjaCAodCkge1xuXHRcdGUgPSAhMTtcblx0fVxuXHR2YXIgdCA9XG5cdFx0XHQnZnVuY3Rpb24nID09IHR5cGVvZiBTeW1ib2wgJiYgJ3N5bWJvbCcgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvclxuXHRcdFx0XHQ/IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHlwZW9mIGU7XG5cdFx0XHRcdCAgfVxuXHRcdFx0XHQ6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZSAmJlxuXHRcdFx0XHRcdFx0XHQnZnVuY3Rpb24nID09IHR5cGVvZiBTeW1ib2wgJiZcblx0XHRcdFx0XHRcdFx0ZS5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmXG5cdFx0XHRcdFx0XHRcdGUgIT09IFN5bWJvbC5wcm90b3R5cGVcblx0XHRcdFx0XHRcdFx0PyAnc3ltYm9sJ1xuXHRcdFx0XHRcdFx0XHQ6IHR5cGVvZiBlO1xuXHRcdFx0XHQgIH0sXG5cdFx0biA9IGZ1bmN0aW9uIChlLCB0KSB7XG5cdFx0XHRpZiAoIShlIGluc3RhbmNlb2YgdCkpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpO1xuXHRcdH0sXG5cdFx0aSA9IChmdW5jdGlvbiAoKSB7XG5cdFx0XHRmdW5jdGlvbiBlKGUsIHQpIHtcblx0XHRcdFx0Zm9yICh2YXIgbiA9IDA7IG4gPCB0Lmxlbmd0aDsgbisrKSB7XG5cdFx0XHRcdFx0dmFyIGkgPSB0W25dO1xuXHRcdFx0XHRcdChpLmVudW1lcmFibGUgPSBpLmVudW1lcmFibGUgfHwgITEpLFxuXHRcdFx0XHRcdFx0KGkuY29uZmlndXJhYmxlID0gITApLFxuXHRcdFx0XHRcdFx0J3ZhbHVlJyBpbiBpICYmIChpLndyaXRhYmxlID0gITApLFxuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIGkua2V5LCBpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICh0LCBuLCBpKSB7XG5cdFx0XHRcdHJldHVybiBuICYmIGUodC5wcm90b3R5cGUsIG4pLCBpICYmIGUodCwgaSksIHQ7XG5cdFx0XHR9O1xuXHRcdH0pKCksXG5cdFx0ciA9IGZ1bmN0aW9uIChlLCB0KSB7XG5cdFx0XHRpZiAoJ2Z1bmN0aW9uJyAhPSB0eXBlb2YgdCAmJiBudWxsICE9PSB0KVxuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2YgdCk7XG5cdFx0XHQoZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHQgJiYgdC5wcm90b3R5cGUsIHtcblx0XHRcdFx0Y29uc3RydWN0b3I6IHsgdmFsdWU6IGUsIGVudW1lcmFibGU6ICExLCB3cml0YWJsZTogITAsIGNvbmZpZ3VyYWJsZTogITAgfVxuXHRcdFx0fSkpLFxuXHRcdFx0XHR0ICYmIChPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YoZSwgdCkgOiAoZS5fX3Byb3RvX18gPSB0KSk7XG5cdFx0fSxcblx0XHRhID0gZnVuY3Rpb24gKGUsIHQpIHtcblx0XHRcdGlmICghZSkgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuXHRcdFx0cmV0dXJuICF0IHx8ICgnb2JqZWN0JyAhPSB0eXBlb2YgdCAmJiAnZnVuY3Rpb24nICE9IHR5cGVvZiB0KSA/IGUgOiB0O1xuXHRcdH0sXG5cdFx0cyA9IChmdW5jdGlvbiAoKSB7XG5cdFx0XHRmdW5jdGlvbiBlKCkge1xuXHRcdFx0XHRuKHRoaXMsIGUpLCAodGhpcy5fcmVnaXN0cnkgPSB7fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRpKGUsIFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRrZXk6ICdhZGRFdmVudExpc3RlbmVyJyxcblx0XHRcdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAoZSwgdCkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9nZXRSZWdpc3RyeShlKS5wdXNoKHQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0a2V5OiAncmVtb3ZlRXZlbnRMaXN0ZW5lcicsXG5cdFx0XHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gKGUsIHQpIHtcblx0XHRcdFx0XHRcdFx0dmFyIG4gPSB0aGlzLl9nZXRSZWdpc3RyeShlKSxcblx0XHRcdFx0XHRcdFx0XHRpID0gbi5pbmRleE9mKHQpO1xuXHRcdFx0XHRcdFx0XHRpID4gLTEgJiYgbi5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRrZXk6ICdkaXNwYXRjaEV2ZW50Jyxcblx0XHRcdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0XHRcdChlLnRhcmdldCA9IHRoaXMpLFxuXHRcdFx0XHRcdFx0XHRcdE9iamVjdC5mcmVlemUoZSksXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fZ2V0UmVnaXN0cnkoZS50eXBlKS5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdChlKTtcblx0XHRcdFx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XHRcdFx0XHQhMFxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0a2V5OiAnX2dldFJlZ2lzdHJ5Jyxcblx0XHRcdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKHRoaXMuX3JlZ2lzdHJ5W2VdID0gdGhpcy5fcmVnaXN0cnlbZV0gfHwgW10pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XSksXG5cdFx0XHRcdGVcblx0XHRcdCk7XG5cdFx0fSkoKSxcblx0XHRvID0gZSA/IEV2ZW50VGFyZ2V0IDogcyxcblx0XHR1ID0gZVxuXHRcdFx0PyBFdmVudFxuXHRcdFx0OiBmdW5jdGlvbiBlKHQpIHtcblx0XHRcdFx0XHRuKHRoaXMsIGUpLCAodGhpcy50eXBlID0gdCk7XG5cdFx0XHQgIH0sXG5cdFx0ZiA9IChmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZnVuY3Rpb24gdChlLCBpKSB7XG5cdFx0XHRcdG4odGhpcywgdCk7XG5cdFx0XHRcdHZhciByID0gYSh0aGlzLCAodC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHQpKS5jYWxsKHRoaXMsIGUpKTtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQoci5uZXdTdGF0ZSA9IGkubmV3U3RhdGUpLFxuXHRcdFx0XHRcdChyLm9sZFN0YXRlID0gaS5vbGRTdGF0ZSksXG5cdFx0XHRcdFx0KHIub3JpZ2luYWxFdmVudCA9IGkub3JpZ2luYWxFdmVudCksXG5cdFx0XHRcdFx0clxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHIodCwgdSksIHQ7XG5cdFx0fSkoKSxcblx0XHRjID0gJ2FjdGl2ZScsXG5cdFx0aCA9ICdwYXNzaXZlJyxcblx0XHRkID0gJ2hpZGRlbicsXG5cdFx0bCA9ICdmcm96ZW4nLFxuXHRcdHAgPSAndGVybWluYXRlZCcsXG5cdFx0diA9XG5cdFx0XHQnb2JqZWN0JyA9PT0gKCd1bmRlZmluZWQnID09IHR5cGVvZiBzYWZhcmkgPyAndW5kZWZpbmVkJyA6IHQoc2FmYXJpKSkgJiZcblx0XHRcdHNhZmFyaS5wdXNoTm90aWZpY2F0aW9uLFxuXHRcdHkgPSBbXG5cdFx0XHQnZm9jdXMnLFxuXHRcdFx0J2JsdXInLFxuXHRcdFx0J3Zpc2liaWxpdHljaGFuZ2UnLFxuXHRcdFx0J2ZyZWV6ZScsXG5cdFx0XHQncmVzdW1lJyxcblx0XHRcdCdwYWdlc2hvdycsXG5cdFx0XHQnb25wYWdlc2hvdycgaW4gc2VsZiA/ICdwYWdlaGlkZScgOiAndW5sb2FkJ1xuXHRcdF0sXG5cdFx0ZyA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRyZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpLCAoZS5yZXR1cm5WYWx1ZSA9ICdBcmUgeW91IHN1cmU/Jyk7XG5cdFx0fSxcblx0XHRfID0gW1xuXHRcdFx0W2MsIGgsIGQsIHBdLFxuXHRcdFx0W2MsIGgsIGQsIGxdLFxuXHRcdFx0W2QsIGgsIGNdLFxuXHRcdFx0W2wsIGRdLFxuXHRcdFx0W2wsIGNdLFxuXHRcdFx0W2wsIGhdXG5cdFx0XS5tYXAoZnVuY3Rpb24gKGUpIHtcblx0XHRcdHJldHVybiBlLnJlZHVjZShmdW5jdGlvbiAoZSwgdCwgbikge1xuXHRcdFx0XHRyZXR1cm4gKGVbdF0gPSBuKSwgZTtcblx0XHRcdH0sIHt9KTtcblx0XHR9KSxcblx0XHRiID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA9PT0gZCA/IGQgOiBkb2N1bWVudC5oYXNGb2N1cygpID8gYyA6IGg7XG5cdFx0fTtcblx0cmV0dXJuIG5ldyAoKGZ1bmN0aW9uIChlKSB7XG5cdFx0ZnVuY3Rpb24gdCgpIHtcblx0XHRcdG4odGhpcywgdCk7XG5cdFx0XHR2YXIgZSA9IGEodGhpcywgKHQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZih0KSkuY2FsbCh0aGlzKSksXG5cdFx0XHRcdGkgPSBiKCk7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQoZS5fc3RhdGUgPSBpKSxcblx0XHRcdFx0KGUuX3Vuc2F2ZWRDaGFuZ2VzID0gW10pLFxuXHRcdFx0XHQoZS5faGFuZGxlRXZlbnRzID0gZS5faGFuZGxlRXZlbnRzLmJpbmQoZSkpLFxuXHRcdFx0XHR5LmZvckVhY2goZnVuY3Rpb24gKHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gYWRkRXZlbnRMaXN0ZW5lcih0LCBlLl9oYW5kbGVFdmVudHMsICEwKTtcblx0XHRcdFx0fSksXG5cdFx0XHRcdHYgJiZcblx0XHRcdFx0XHRhZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbiAodCkge1xuXHRcdFx0XHRcdFx0ZS5fc2FmYXJpQmVmb3JlVW5sb2FkVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHR0LmRlZmF1bHRQcmV2ZW50ZWQgfHwgdC5yZXR1cm5WYWx1ZS5sZW5ndGggPiAwIHx8IGUuX2Rpc3BhdGNoQ2hhbmdlc0lmTmVlZGVkKHQsIGQpO1xuXHRcdFx0XHRcdFx0fSwgMCk7XG5cdFx0XHRcdFx0fSksXG5cdFx0XHRcdGVcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHRyKHQsIG8pLFxuXHRcdFx0aSh0LCBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRrZXk6ICdhZGRVbnNhdmVkQ2hhbmdlcycsXG5cdFx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHQhdGhpcy5fdW5zYXZlZENoYW5nZXMuaW5kZXhPZihlKSA+IC0xICYmXG5cdFx0XHRcdFx0XHRcdCgwID09PSB0aGlzLl91bnNhdmVkQ2hhbmdlcy5sZW5ndGggJiYgYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZyksXG5cdFx0XHRcdFx0XHRcdHRoaXMuX3Vuc2F2ZWRDaGFuZ2VzLnB1c2goZSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGtleTogJ3JlbW92ZVVuc2F2ZWRDaGFuZ2VzJyxcblx0XHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdHZhciB0ID0gdGhpcy5fdW5zYXZlZENoYW5nZXMuaW5kZXhPZihlKTtcblx0XHRcdFx0XHRcdHQgPiAtMSAmJlxuXHRcdFx0XHRcdFx0XHQodGhpcy5fdW5zYXZlZENoYW5nZXMuc3BsaWNlKHQsIDEpLFxuXHRcdFx0XHRcdFx0XHQwID09PSB0aGlzLl91bnNhdmVkQ2hhbmdlcy5sZW5ndGggJiYgcmVtb3ZlRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGtleTogJ19kaXNwYXRjaENoYW5nZXNJZk5lZWRlZCcsXG5cdFx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIChlLCB0KSB7XG5cdFx0XHRcdFx0XHRpZiAodCAhPT0gdGhpcy5fc3RhdGUpXG5cdFx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdFx0dmFyIG4gPSAoZnVuY3Rpb24gKGUsIHQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgbiwgaSA9IDA7IChuID0gX1tpXSk7ICsraSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhciByID0gbltlXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGEgPSBuW3RdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChyID49IDAgJiYgYSA+PSAwICYmIGEgPiByKSByZXR1cm4gT2JqZWN0LmtleXMobikuc2xpY2UociwgYSArIDEpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0XHRcdFx0XHRcdH0pKHRoaXMuX3N0YXRlLCB0KSxcblx0XHRcdFx0XHRcdFx0XHRcdGkgPSAwO1xuXHRcdFx0XHRcdFx0XHRcdGkgPCBuLmxlbmd0aCAtIDE7XG5cdFx0XHRcdFx0XHRcdFx0KytpXG5cdFx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciByID0gbltpXSxcblx0XHRcdFx0XHRcdFx0XHRcdGEgPSBuW2kgKyAxXTtcblx0XHRcdFx0XHRcdFx0XHQodGhpcy5fc3RhdGUgPSBhKSxcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChcblx0XHRcdFx0XHRcdFx0XHRcdFx0bmV3IGYoJ3N0YXRlY2hhbmdlJywgeyBvbGRTdGF0ZTogciwgbmV3U3RhdGU6IGEsIG9yaWdpbmFsRXZlbnQ6IGUgfSlcblx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRrZXk6ICdfaGFuZGxlRXZlbnRzJyxcblx0XHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdHN3aXRjaCAoKHYgJiYgY2xlYXJUaW1lb3V0KHRoaXMuX3NhZmFyaUJlZm9yZVVubG9hZFRpbWVvdXQpLCBlLnR5cGUpKSB7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ3BhZ2VzaG93Jzpcblx0XHRcdFx0XHRcdFx0Y2FzZSAncmVzdW1lJzpcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kaXNwYXRjaENoYW5nZXNJZk5lZWRlZChlLCBiKCkpO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlICdmb2N1cyc6XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fZGlzcGF0Y2hDaGFuZ2VzSWZOZWVkZWQoZSwgYyk7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ2JsdXInOlxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX3N0YXRlID09PSBjICYmIHRoaXMuX2Rpc3BhdGNoQ2hhbmdlc0lmTmVlZGVkKGUsIGIoKSk7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ3BhZ2VoaWRlJzpcblx0XHRcdFx0XHRcdFx0Y2FzZSAndW5sb2FkJzpcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kaXNwYXRjaENoYW5nZXNJZk5lZWRlZChlLCBlLnBlcnNpc3RlZCA/IGwgOiBwKTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSAndmlzaWJpbGl0eWNoYW5nZSc6XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fc3RhdGUgIT09IGwgJiYgdGhpcy5fc3RhdGUgIT09IHAgJiYgdGhpcy5fZGlzcGF0Y2hDaGFuZ2VzSWZOZWVkZWQoZSwgYigpKTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSAnZnJlZXplJzpcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kaXNwYXRjaENoYW5nZXNJZk5lZWRlZChlLCBsKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRrZXk6ICdzdGF0ZScsXG5cdFx0XHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fc3RhdGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0a2V5OiAncGFnZVdhc0Rpc2NhcmRlZCcsXG5cdFx0XHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZG9jdW1lbnQud2FzRGlzY2FyZGVkIHx8ICExO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XSksXG5cdFx0XHR0XG5cdFx0KTtcblx0fSkoKSkoKTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGlmZWN5Y2xlLmVzNS5qcy5tYXBcbiIsImNvbnN0IGNvbmZpZyA9IHtcblx0QVBJX1VSTDogJ2h0dHBzOi8vc2hpcC1wcm9kLTYyN2VkMDhmNDg5YTk3MDAxMzU3MmY1ZC5wYXJhbGVjdC5uZXQnLFxuXHRBUElfVVJMX0RFVjogJ2h0dHBzOi8vc2hpcC02MjdlZDA4ZjQ4OWE5NzAwMTM1NzJmNWQucGFyYWxlY3QubmV0J1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5cbmNvbnN0IEFQSV9VUkwgPSBwcm9jZXNzLmVudi5CVUlMRCA9PT0gJ2RldicgPyBjb25maWcuQVBJX1VSTF9ERVYgOiBjb25maWcuQVBJX1VSTDtcbi8vIGNvbnN0IEFQSV9VUkwgPSBjb25maWcuQVBJX1VSTF9ERVY7XG5cbmNvbnN0IENMQVNTX0RJVklERVIgPSAvIC9nO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9ERUJPVU5DRV9USU1FID0gNTAwO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfVEhST1RUTEVfVElNRSA9IDEwMDA7XG5cbmNvbnN0IGdldFBhcmVudHMgPSAoZWxlbWVudCkgPT4ge1xuXHRjb25zdCBwYXJlbnRzID0gW107XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG5cdGZvciAoOyBlbGVtZW50ICYmIGVsZW1lbnQgIT09IGRvY3VtZW50OyBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlKSB7XG5cdFx0cGFyZW50cy5wdXNoKGVsZW1lbnQpO1xuXHR9XG5cblx0cmV0dXJuIHBhcmVudHM7XG59O1xuXG5jb25zdCBnZXRDb3VudFNhbWVOb2RlTmFtZSA9IChlbGVtZW50c0FycmF5LCBlbGVtZW50KSA9PiB7XG5cdGxldCBjb3VudCA9IDA7XG5cblx0Wy4uLmVsZW1lbnRzQXJyYXldLmZvckVhY2goKGN1cnJlbnRFbGVtZW50KSA9PiB7XG5cdFx0aWYgKGN1cnJlbnRFbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkge1xuXHRcdFx0Y291bnQgKz0gMTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBjb3VudDtcbn07XG5cbmNvbnN0IGdldE50aE51bWJlciA9IChlbGVtZW50KSA9PiB7XG5cdGxldCBudGggPSAxO1xuXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25kLWFzc2lnbixuby1wYXJhbS1yZWFzc2lnblxuXHR3aGlsZSAoKGVsZW1lbnQgPSBlbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcpKSB7XG5cdFx0bnRoICs9IDE7XG5cdH1cblxuXHRyZXR1cm4gbnRoO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldENzc1BhdGggPSAoZWxlbWVudCkgPT4ge1xuXHRsZXQgZWxlbWVudFBhcmVudHMgPSBnZXRQYXJlbnRzKGVsZW1lbnQpO1xuXHRlbGVtZW50UGFyZW50cyA9IGVsZW1lbnRQYXJlbnRzLnNwbGljZSgwLCBlbGVtZW50UGFyZW50cy5sZW5ndGggLSAxKTtcblxuXHRjb25zdCBzZWxlY3RvcnNBcnJheSA9IFtdO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudFBhcmVudHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRjb25zdCBlbGVtZW50SXRlbSA9IGVsZW1lbnRQYXJlbnRzW2ldO1xuXG5cdFx0Y29uc3Qgbm9kZU5hbWUgPSBlbGVtZW50SXRlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0bGV0IGlkID0gJyc7XG5cdFx0bGV0IHNlbGVjdG9yID0gJyc7XG5cblx0XHRpZiAoZWxlbWVudEl0ZW0uaWQpIHtcblx0XHRcdGlkID0gYCMke2VsZW1lbnRJdGVtLmlkfWA7XG5cdFx0fVxuXG5cdFx0aWYgKGlkKSB7XG5cdFx0XHRzZWxlY3RvciA9IGlkO1xuXHRcdFx0c2VsZWN0b3JzQXJyYXkucHVzaChzZWxlY3Rvcik7XG5cdFx0XHRicmVhaztcblx0XHR9IGVsc2Uge1xuXHRcdFx0c2VsZWN0b3IgPSBub2RlTmFtZTtcblx0XHRcdGNvbnN0IHsgcGFyZW50Tm9kZSB9ID0gZWxlbWVudEl0ZW07XG5cblx0XHRcdGlmIChwYXJlbnROb2RlKSB7XG5cdFx0XHRcdGNvbnN0IHNpYmxpbmcgPSBwYXJlbnROb2RlLmNoaWxkcmVuO1xuXHRcdFx0XHRjb25zdCBjb3VudFNhbWVOb2RlTmFtZSA9IGdldENvdW50U2FtZU5vZGVOYW1lKHNpYmxpbmcsIGVsZW1lbnRJdGVtKTtcblxuXHRcdFx0XHRpZiAoc2libGluZy5sZW5ndGggPiAxICYmIGNvdW50U2FtZU5vZGVOYW1lID4gMSkge1xuXHRcdFx0XHRcdGNvbnN0IGNsYXNzTmFtZXMgPSBlbGVtZW50SXRlbS5jbGFzc05hbWVcblx0XHRcdFx0XHRcdD8gYC4ke2VsZW1lbnRJdGVtLmNsYXNzTmFtZS5yZXBsYWNlKENMQVNTX0RJVklERVIsICcuJyl9YFxuXHRcdFx0XHRcdFx0OiAnJztcblxuXHRcdFx0XHRcdGlmIChjbGFzc05hbWVzKSB7XG5cdFx0XHRcdFx0XHRzZWxlY3RvciArPSBjbGFzc05hbWVzO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb25zdCBudGhOdW1iZXIgPSBnZXROdGhOdW1iZXIoZWxlbWVudEl0ZW0pO1xuXHRcdFx0XHRcdFx0c2VsZWN0b3IgKz0gYDpudGgtY2hpbGQoJHtudGhOdW1iZXJ9KWA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c2VsZWN0b3JzQXJyYXkucHVzaChzZWxlY3Rvcik7XG5cdH1cblxuXHRjb25zdCByZXN1bHRQYXRoID0gc2VsZWN0b3JzQXJyYXkucmV2ZXJzZSgpLmpvaW4oJyA+ICcpO1xuXG5cdHJldHVybiByZXN1bHRQYXRoO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFZhbHVlID0gKGVsZW1lbnQpID0+IHtcblx0cmV0dXJuIGAke2VsZW1lbnQudmFsdWUgfHwgZWxlbWVudC5pbm5lclRleHQgfHwgJyd9YDtcbn07XG5cbmV4cG9ydCBjb25zdCBzZW5kRGF0YSA9ICh1cmwsIGRhdGEpID0+XG5cdGZldGNoKGAke3dpbmRvdy5XQVZFX0FQSV9VUkwgfHwgQVBJX1VSTH0vJHt1cmx9YCwge1xuXHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdGhlYWRlcnM6IHtcblx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcblx0XHR9LFxuXHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXG5cdH0pLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xuXG5leHBvcnQgY29uc3Qgc2VuZFRyYWNrRGF0YSA9ICh1c2VyRGF0YSwgdXJsLCBkYXRhKSA9PlxuXHRzZW5kRGF0YSh1cmwsIHtcblx0XHQuLi5kYXRhLFxuXHRcdHByb2plY3RJZDogdXNlckRhdGEucHJvamVjdElkLFxuXHRcdHZpc2l0b3JJZDogdXNlckRhdGEudmlzaXRvcklkLFxuXHRcdHNlc3Npb25JZDogdXNlckRhdGEuc2Vzc2lvbklkLFxuXHRcdC4uLih3aW5kb3cuTVdBVkVfQ09ORklHXG5cdFx0XHQ/IHtcblx0XHRcdFx0XHRzdWJQcm9qZWN0SWQ6IHdpbmRvdy5NV0FWRV9DT05GSUc/LnN1YlByb2plY3RJZCxcblx0XHRcdFx0XHRwYWdlSWQ6IHdpbmRvdy5NV0FWRV9DT05GSUc/LnBhZ2VJZFxuXHRcdFx0ICB9XG5cdFx0XHQ6IHt9KVxuXHR9KS50aGVuKCh0cmFja0RhdGEpID0+IHtcblx0XHRpZiAodHJhY2tEYXRhLnNlc3Npb25JZCkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG5cdFx0XHR1c2VyRGF0YS5zZXNzaW9uSWQgPSB0cmFja0RhdGEuc2Vzc2lvbklkO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cmFja0RhdGE7XG5cdH0pO1xuXG5leHBvcnQgY29uc3Qgc2VuZFRyYWNrRXZlbnQgPSAoeyB0eXBlLCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpLCBwYXlsb2FkIH0pID0+IHtcblx0bGV0IHVzZXJEYXRhID0gd2luZG93LldBVkVfVVNFUl9EQVRBO1xuXG5cdHJldHVybiBzZW5kRGF0YSgnd2F2ZUFjdGlvbnMnLCB7XG5cdFx0cHJvamVjdElkOiB1c2VyRGF0YS5wcm9qZWN0SWQsXG5cdFx0dmlzaXRvcklkOiB1c2VyRGF0YS52aXNpdG9ySWQsXG5cdFx0c2Vzc2lvbklkOiB1c2VyRGF0YS5zZXNzaW9uSWQsXG5cblx0XHQuLi4od2luZG93Lk1XQVZFX0NPTkZJR1xuXHRcdFx0PyB7XG5cdFx0XHRcdFx0c3ViUHJvamVjdElkOiB3aW5kb3cuTVdBVkVfQ09ORklHPy5zdWJQcm9qZWN0SWQsXG5cdFx0XHRcdFx0cGFnZUlkOiB3aW5kb3cuTVdBVkVfQ09ORklHPy5wYWdlSWRcblx0XHRcdCAgfVxuXHRcdFx0OiB7fSksXG5cblx0XHR0eXBlLFxuXHRcdHRpbWVzdGFtcCxcblx0XHRwYXlsb2FkXG5cdH0pLnRoZW4oKHRyYWNrRGF0YSkgPT4ge1xuXHRcdGlmICh0cmFja0RhdGEuc2Vzc2lvbklkKSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cblx0XHRcdHVzZXJEYXRhLnNlc3Npb25JZCA9IHRyYWNrRGF0YS5zZXNzaW9uSWQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRyYWNrRGF0YTtcblx0fSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VuZFBpbmcgPSAoKSA9PiB7XG5cdGxldCB1c2VyRGF0YSA9IHdpbmRvdy5XQVZFX1VTRVJfREFUQTtcblxuXHRyZXR1cm4gc2VuZERhdGEoJ3dhdmVBY3Rpb25zL3BpbmcnLCB7XG5cdFx0cHJvamVjdElkOiB1c2VyRGF0YS5wcm9qZWN0SWQsXG5cdFx0dmlzaXRvcklkOiB1c2VyRGF0YS52aXNpdG9ySWQsXG5cdFx0c2Vzc2lvbklkOiB1c2VyRGF0YS5zZXNzaW9uSWQsXG5cblx0XHQuLi4od2luZG93Lk1XQVZFX0NPTkZJR1xuXHRcdFx0PyB7XG5cdFx0XHRcdFx0c3ViUHJvamVjdElkOiB3aW5kb3cuTVdBVkVfQ09ORklHPy5zdWJQcm9qZWN0SWQsXG5cdFx0XHRcdFx0cGFnZUlkOiB3aW5kb3cuTVdBVkVfQ09ORklHPy5wYWdlSWRcblx0XHRcdCAgfVxuXHRcdFx0OiB7fSlcblx0fSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJIYW5kbGVycyA9ICh1c2VyRGF0YSwgaGFuZGxlcnMpID0+IHtcblx0aGFuZGxlcnMuZm9yRWFjaCgoaGFuZGxlcikgPT4gaGFuZGxlcih1c2VyRGF0YSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlYm91bmNlID0gKGZ1bmMsIGRlbGF5KSA9PiB7XG5cdGxldCBibG9ja2VySWQ7XG5cblx0cmV0dXJuIChhcmdzKSA9PiB7XG5cdFx0Y2xlYXJUaW1lb3V0KGJsb2NrZXJJZCk7XG5cdFx0YmxvY2tlcklkID0gc2V0VGltZW91dCgoKSA9PiBmdW5jKGFyZ3MpLCBkZWxheSk7XG5cdH07XG59O1xuXG5leHBvcnQgY29uc3QgdGhyb3R0bGUgPSAoZnVuYywgbGltaXQpID0+IHtcblx0bGV0IGlzQmxvY2tlZCA9IGZhbHNlO1xuXG5cdHJldHVybiAoYXJncykgPT4ge1xuXHRcdGlmIChpc0Jsb2NrZWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRmdW5jKGFyZ3MpO1xuXG5cdFx0aXNCbG9ja2VkID0gdHJ1ZTtcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdGlzQmxvY2tlZCA9IGZhbHNlO1xuXHRcdH0sIGxpbWl0KTtcblx0fTtcbn07XG5cbmNvbnN0IGluY2x1ZGVzID0gKGhheXN0YWNrLCBuZWVkbGUpID0+IHtcblx0cmV0dXJuIGhheXN0YWNrLmluZGV4T2YobmVlZGxlKSAhPT0gLTE7XG59O1xuXG5jb25zdCBmaW5kID0gKG5lZWRsZSkgPT4ge1xuXHRyZXR1cm4gaW5jbHVkZXMobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvY2FsZUxvd2VyQ2FzZSgpLCBuZWVkbGUpO1xufTtcblxuY29uc3Qgd2luZG93cyA9ICgpID0+IHtcblx0cmV0dXJuIGZpbmQoJ3dpbmRvd3MnKTtcbn07XG5cbmNvbnN0IGxpbnV4ID0gKCkgPT4ge1xuXHRyZXR1cm4gZmluZCgnbGludXgnKTtcbn07XG5cbmNvbnN0IGlwaG9uZSA9ICgpID0+IHtcblx0cmV0dXJuICF3aW5kb3dzKCkgJiYgZmluZCgnaXBob25lJyk7XG59O1xuXG5jb25zdCBpcG9kID0gKCkgPT4ge1xuXHRyZXR1cm4gZmluZCgnaXBvZCcpO1xufTtcblxuY29uc3QgaXBhZCA9ICgpID0+IHtcblx0Y29uc3QgaVBhZE9TMTNVcCA9IG5hdmlnYXRvci5wbGF0Zm9ybSA9PT0gJ01hY0ludGVsJyAmJiBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAxO1xuXHRyZXR1cm4gZmluZCgnaXBhZCcpIHx8IGlQYWRPUzEzVXA7XG59O1xuXG5jb25zdCBpb3MgPSAoKSA9PiB7XG5cdHJldHVybiBpcGhvbmUoKSB8fCBpcG9kKCkgfHwgaXBhZCgpO1xufTtcblxuY29uc3QgbWFjb3MgPSAoKSA9PiB7XG5cdHJldHVybiBmaW5kKCdtYWMnKTtcbn07XG5cbmNvbnN0IGFuZHJvaWQgPSAoKSA9PiB7XG5cdHJldHVybiAhd2luZG93cygpICYmIGZpbmQoJ2FuZHJvaWQnKTtcbn07XG5cbmNvbnN0IGFuZHJvaWRQaG9uZSA9ICgpID0+IHtcblx0cmV0dXJuIGFuZHJvaWQoKSAmJiBmaW5kKCdtb2JpbGUnKTtcbn07XG5cbmNvbnN0IGFuZHJvaWRUYWJsZXQgPSAoKSA9PiB7XG5cdHJldHVybiBhbmRyb2lkKCkgJiYgIWZpbmQoJ21vYmlsZScpO1xufTtcblxuY29uc3QgYmxhY2tiZXJyeSA9ICgpID0+IHtcblx0cmV0dXJuIGZpbmQoJ2JsYWNrYmVycnknKSB8fCBmaW5kKCdiYjEwJyk7XG59O1xuXG5jb25zdCBibGFja2JlcnJ5UGhvbmUgPSAoKSA9PiB7XG5cdHJldHVybiBibGFja2JlcnJ5KCkgJiYgIWZpbmQoJ3RhYmxldCcpO1xufTtcblxuY29uc3QgYmxhY2tiZXJyeVRhYmxldCA9ICgpID0+IHtcblx0cmV0dXJuIGJsYWNrYmVycnkoKSAmJiBmaW5kKCd0YWJsZXQnKTtcbn07XG5cbmNvbnN0IHdpbmRvd3NQaG9uZSA9ICgpID0+IHtcblx0cmV0dXJuIHdpbmRvd3MoKSAmJiBmaW5kKCdwaG9uZScpO1xufTtcblxuY29uc3Qgd2luZG93c1RhYmxldCA9ICgpID0+IHtcblx0cmV0dXJuIHdpbmRvd3MoKSAmJiBmaW5kKCd0b3VjaCcpICYmICF3aW5kb3dzUGhvbmUoKTtcbn07XG5cbmNvbnN0IGZ4b3MgPSAoKSA9PiB7XG5cdHJldHVybiAoZmluZCgnKG1vYmlsZScpIHx8IGZpbmQoJyh0YWJsZXQnKSkgJiYgZmluZCgnIHJ2OicpO1xufTtcblxuY29uc3QgZnhvc1Bob25lID0gKCkgPT4ge1xuXHRyZXR1cm4gZnhvcygpICYmIGZpbmQoJ21vYmlsZScpO1xufTtcblxuY29uc3QgZnhvc1RhYmxldCA9ICgpID0+IHtcblx0cmV0dXJuIGZ4b3MoKSAmJiBmaW5kKCd0YWJsZXQnKTtcbn07XG5cbmNvbnN0IG1lZWdvID0gKCkgPT4ge1xuXHRyZXR1cm4gZmluZCgnbWVlZ28nKTtcbn07XG5cbmNvbnN0IG1vYmlsZSA9ICgpID0+IHtcblx0cmV0dXJuIChcblx0XHRhbmRyb2lkUGhvbmUoKSB8fFxuXHRcdGlwaG9uZSgpIHx8XG5cdFx0aXBvZCgpIHx8XG5cdFx0d2luZG93c1Bob25lKCkgfHxcblx0XHRibGFja2JlcnJ5UGhvbmUoKSB8fFxuXHRcdGZ4b3NQaG9uZSgpIHx8XG5cdFx0bWVlZ28oKVxuXHQpO1xufTtcblxuY29uc3QgdGFibGV0ID0gKCkgPT4ge1xuXHRyZXR1cm4gaXBhZCgpIHx8IGFuZHJvaWRUYWJsZXQoKSB8fCBibGFja2JlcnJ5VGFibGV0KCkgfHwgd2luZG93c1RhYmxldCgpIHx8IGZ4b3NUYWJsZXQoKTtcbn07XG5cbmNvbnN0IGRlc2t0b3AgPSAoKSA9PiB7XG5cdHJldHVybiAhdGFibGV0KCkgJiYgIW1vYmlsZSgpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldERldmljZVR5cGUgPSAoKSA9PiB7XG5cdGlmIChkZXNrdG9wKCkpIHtcblx0XHRyZXR1cm4gJ2Rlc2t0b3AnO1xuXHR9XG5cblx0aWYgKHRhYmxldCgpKSB7XG5cdFx0cmV0dXJuICd0YWJsZXQnO1xuXHR9XG5cblx0aWYgKG1vYmlsZSgpKSB7XG5cdFx0cmV0dXJuICdtb2JpbGUnO1xuXHR9XG5cblx0cmV0dXJuICd1bmtub3duJztcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRPUyA9ICgpID0+IHtcblx0aWYgKGlvcygpKSB7XG5cdFx0cmV0dXJuICdpb3MnO1xuXHR9XG5cblx0aWYgKGFuZHJvaWQoKSkge1xuXHRcdHJldHVybiAnYW5kcm9pZCc7XG5cdH1cblxuXHRpZiAoYmxhY2tiZXJyeSgpKSB7XG5cdFx0cmV0dXJuICdibGFja2JlcnJ5Jztcblx0fVxuXG5cdGlmIChtYWNvcygpKSB7XG5cdFx0cmV0dXJuICdtYWNvcyc7XG5cdH1cblxuXHRpZiAod2luZG93cygpKSB7XG5cdFx0cmV0dXJuICd3aW5kb3dzJztcblx0fVxuXG5cdGlmIChsaW51eCgpKSB7XG5cdFx0cmV0dXJuICdsaW51eCc7XG5cdH1cblxuXHRpZiAoZnhvcygpKSB7XG5cdFx0cmV0dXJuICdmeG9zJztcblx0fVxuXG5cdGlmIChtZWVnbygpKSB7XG5cdFx0cmV0dXJuICdtZWVnbyc7XG5cdH1cblxuXHRyZXR1cm4gJ3Vua25vd24nO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXJOYW1lID0gKCkgPT4ge1xuXHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdFZGdlJykgPiAtMSAmJiBuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKCdFZGdlJykgPiAtMSkge1xuXHRcdHJldHVybiAnRWRnZSc7XG5cdH1cblxuXHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdPcGVyYScpICE9PSAtMSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09QUicpICE9PSAtMSkge1xuXHRcdHJldHVybiAnT3BlcmEnO1xuXHR9XG5cblx0aWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lJykgIT09IC0xKSB7XG5cdFx0cmV0dXJuICdDaHJvbWUnO1xuXHR9XG5cblx0aWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignU2FmYXJpJykgIT09IC0xKSB7XG5cdFx0cmV0dXJuICdTYWZhcmknO1xuXHR9XG5cblx0aWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignRmlyZWZveCcpICE9PSAtMSkge1xuXHRcdHJldHVybiAnRmlyZWZveCc7XG5cdH1cblxuXHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdNU0lFJykgIT09IC0xIHx8ICEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlID09PSB0cnVlKSB7XG5cdFx0Ly8gSUYgSUUgPiAxMHtcblx0XHRyZXR1cm4gJ0lFJztcblx0fVxuXG5cdHJldHVybiAndW5rbm93bic7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q29ubmVjdGlvblR5cGUgPSAoKSA9PiB7XG5cdGNvbnN0IGNvbm5lY3Rpb25UeXBlID0gbmF2aWdhdG9yICYmIG5hdmlnYXRvci5jb25uZWN0aW9uICYmIG5hdmlnYXRvci5jb25uZWN0aW9uLnR5cGU7IC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9OZXR3b3JrX0luZm9ybWF0aW9uX0FQSVxuXG5cdHJldHVybiBjb25uZWN0aW9uVHlwZTtcbn07XG4iLCJpbXBvcnQgeyBzZW5kVHJhY2tEYXRhLCBnZXRDc3NQYXRoLCBnZXRWYWx1ZSB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCAodXNlckRhdGEpID0+IHtcblx0aWYgKHdpbmRvdy5XQVZFX1RSQUNLX0NMSUNLUykge1xuXHRcdGNvbnN0IGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRjb25zdCBkYXRhID0ge1xuXHRcdFx0XHR0eXBlOiAnY2xpY2snLFxuXHRcdFx0XHR0aW1lc3RhbXA6IERhdGUubm93KCksXG5cdFx0XHRcdHBheWxvYWQ6IHtcblx0XHRcdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRcdFx0eDogZXZlbnQuY2xpZW50WCxcblx0XHRcdFx0XHRcdHk6IGV2ZW50LmNsaWVudFlcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHNlbGVjdG9yOiBnZXRDc3NQYXRoKGV2ZW50LnRhcmdldCksXG5cdFx0XHRcdFx0dmFsdWU6IGdldFZhbHVlKGV2ZW50LnRhcmdldClcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdC8vIGNvcnJlY3RzIGNsaWNscyBhZnRlciBzY3JvbGxpbmdcblx0XHRcdHNlbmRUcmFja0RhdGEodXNlckRhdGEsICd3YXZlQWN0aW9ucycsIHtcblx0XHRcdFx0dHlwZTogJ3BhZ2VTY3JvbGwnLFxuXHRcdFx0XHR0aW1lc3RhbXA6IERhdGUubm93KCksXG5cdFx0XHRcdHBheWxvYWQ6IHtcblx0XHRcdFx0XHRvZmZzZXQ6IHtcblx0XHRcdFx0XHRcdHg6IHdpbmRvdy5wYWdlWE9mZnNldCxcblx0XHRcdFx0XHRcdHk6IHdpbmRvdy5wYWdlWU9mZnNldFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRzZW5kVHJhY2tEYXRhKHVzZXJEYXRhLCAnd2F2ZUFjdGlvbnMnLCBkYXRhKTtcblx0XHR9O1xuXHRcdHJldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDbGljaywgeyBjYXB0dXJlOiB0cnVlLCBwYXNzaXZlOiB0cnVlIH0pO1xuXHR9XG59O1xuXG4vLyBjbGlja3MgZG9lc24ndCB3b3JrIG9uIGRpc2FibGVkIGVsZW1lbnRzLlxuLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSLzIwMTQvUkVDLWh0bWw1LTIwMTQxMDI4L2Zvcm1zLmh0bWwjY29uY2VwdC1mZS1kaXNhYmxlZFxuIiwiaW1wb3J0IHsgc2VuZFRyYWNrRGF0YSwgZGVib3VuY2UsIERFRkFVTFRfREVCT1VOQ0VfVElNRSB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCAodXNlckRhdGEpID0+IHtcblx0Ly8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG5cdC8vIFx0J3Jlc2l6ZScsXG5cdC8vIFx0ZGVib3VuY2UoXG5cdC8vIFx0XHQoKSA9PlxuXHQvLyBcdFx0XHRzZW5kVHJhY2tEYXRhKHVzZXJEYXRhLCAnd2F2ZUFjdGlvbnMnLCB7XG5cdC8vIFx0XHRcdFx0dHlwZTogJ3Jlc2l6ZScsXG5cdC8vIFx0XHRcdFx0dGltZXN0YW1wOiBEYXRlLm5vdygpLFxuXHQvLyBcdFx0XHRcdHBheWxvYWQ6IHtcblx0Ly8gXHRcdFx0XHRcdHNpemU6IHtcblx0Ly8gXHRcdFx0XHRcdFx0d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuXHQvLyBcdFx0XHRcdFx0XHRoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodFxuXHQvLyBcdFx0XHRcdFx0fVxuXHQvLyBcdFx0XHRcdH1cblx0Ly8gXHRcdFx0fSksXG5cdC8vIFx0XHRERUZBVUxUX0RFQk9VTkNFX1RJTUVcblx0Ly8gXHQpXG5cdC8vICk7XG59O1xuIiwiaW1wb3J0IHsgc2VuZFRyYWNrRGF0YSwgdGhyb3R0bGUgfSBmcm9tICcuLi9oZWxwZXJzJztcblxuY29uc3QgU0NST0xMX1RIUk9UVExFX1RJTUUgPSAxMDA7XG5cbmV4cG9ydCBkZWZhdWx0ICh1c2VyRGF0YSkgPT4ge1xuXHQvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcblx0Ly8gXHQnc2Nyb2xsJyxcblx0Ly8gXHR0aHJvdHRsZShcblx0Ly8gXHRcdCgpID0+XG5cdC8vIFx0XHRcdHNlbmRUcmFja0RhdGEodXNlckRhdGEsICd3YXZlQWN0aW9ucycsIHtcblx0Ly8gXHRcdFx0XHR0eXBlOiAncGFnZVNjcm9sbCcsXG5cdC8vIFx0XHRcdFx0dGltZXN0YW1wOiBEYXRlLm5vdygpLFxuXHQvLyBcdFx0XHRcdHBheWxvYWQ6IHtcblx0Ly8gXHRcdFx0XHRcdG9mZnNldDoge1xuXHQvLyBcdFx0XHRcdFx0XHR4OiB3aW5kb3cucGFnZVhPZmZzZXQsXG5cdC8vIFx0XHRcdFx0XHRcdHk6IHdpbmRvdy5wYWdlWU9mZnNldFxuXHQvLyBcdFx0XHRcdFx0fVxuXHQvLyBcdFx0XHRcdH1cblx0Ly8gXHRcdFx0fSksXG5cdC8vIFx0XHRTQ1JPTExfVEhST1RUTEVfVElNRVxuXHQvLyBcdClcblx0Ly8gKTtcbn07XG4iLCJpbXBvcnQgeyBzZW5kVHJhY2tEYXRhIH0gZnJvbSAnLi4vaGVscGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0ICh1c2VyRGF0YSkgPT4ge1xuXHRpZiAod2luZG93LldBVkVfVFJBQ0tfRk9STVMpIHtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtJykuZm9yRWFjaCgoZm9ybSkgPT4ge1xuXHRcdFx0bGV0IGVtYWlsRWwgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9ZW1haWxdJylbMF07XG5cblx0XHRcdGlmIChlbWFpbEVsKSB7XG5cdFx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKCkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGFjdGlvbkRhdGEgPSB7XG5cdFx0XHRcdFx0XHR0eXBlOiAnc2lnbnVwJyxcblx0XHRcdFx0XHRcdHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcblx0XHRcdFx0XHRcdHBheWxvYWQ6IHt9XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdHNlbmRUcmFja0RhdGEodXNlckRhdGEsICd3YXZlQWN0aW9ucycsIGFjdGlvbkRhdGEpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufTtcbiIsImltcG9ydCB7IHNlbmRUcmFja0RhdGEsIHRocm90dGxlIH0gZnJvbSAnLi4vaGVscGVycyc7XG5cbi8vIFByb2JhYmx5IHdlIG5lZWQgaXQgbGVzcyB0aGFuIDIwMG1zXG4vLyBmb3IgYmV0dGVyIHF1YWxpdHkgb2YgXCJWaXNpdG9yIEFjdGlvbnMgUGxheWVyXCJcbmNvbnN0IE1PVVNFX01PVkVfVEhST1RUTEVfVElNRSA9IDEwMDtcblxuY29uc3QgQUNUSU9OX1NFTkRfSU5URVJWQUwgPSAzMDAwO1xuXG5jb25zdCBldmVudEJ1ZmZlciA9IHtcblx0ZGF0YTogW10sXG5cdGxhdGVzdFNlbmQ6IERhdGUubm93KClcbn07XG5cbmNvbnN0IG1vdXNlTW92ZUhhbmRsZXIgPSAodXNlckRhdGEpID0+IHtcblx0Ly8gZnVuY3Rpb24gaGFuZGxlRXZlbnQoZXZlbnQpIHtcblx0Ly8gXHRjb25zdCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuXHQvLyBcdGNvbnN0IHJlY29yZCA9IHtcblx0Ly8gXHRcdHg6IGV2ZW50LmNsaWVudFgsXG5cdC8vIFx0XHR5OiBldmVudC5jbGllbnRZLFxuXHQvLyBcdFx0dGltZXN0YW1wXG5cdC8vIFx0fTtcblx0Ly8gXHRldmVudEJ1ZmZlci5kYXRhLnB1c2gocmVjb3JkKTtcblx0Ly8gXHRpZiAodGltZXN0YW1wIC0gZXZlbnRCdWZmZXIubGF0ZXN0U2VuZCA+IEFDVElPTl9TRU5EX0lOVEVSVkFMKSB7XG5cdC8vIFx0XHRjb25zdCBtYW55UmVjb3JkcyA9IHtcblx0Ly8gXHRcdFx0dHlwZTogJ21vdXNlTW92ZScsXG5cdC8vIFx0XHRcdHBheWxvYWQ6IHtcblx0Ly8gXHRcdFx0XHRiYXRjaDogZXZlbnRCdWZmZXIuZGF0YVxuXHQvLyBcdFx0XHR9XG5cdC8vIFx0XHR9O1xuXHQvLyBcdFx0ZXZlbnRCdWZmZXIuZGF0YSA9IFtdO1xuXHQvLyBcdFx0ZXZlbnRCdWZmZXIubGF0ZXN0U2VuZCA9IERhdGUubm93KCk7XG5cdC8vIFx0XHRzZW5kVHJhY2tEYXRhKHVzZXJEYXRhLCAnd2F2ZUFjdGlvbnMnLCBtYW55UmVjb3Jkcyk7XG5cdC8vIFx0fVxuXHQvLyB9XG5cdC8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aHJvdHRsZShoYW5kbGVFdmVudCwgTU9VU0VfTU9WRV9USFJPVFRMRV9USU1FKSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtb3VzZU1vdmVIYW5kbGVyO1xuIiwiaW1wb3J0IHsgc2VuZFRyYWNrRGF0YSB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlTG9jYXRpb25DaGFuZ2UgPSAodXNlckRhdGEpID0+IHtcblx0Y29uc3QgeyBocmVmIH0gPSB3aW5kb3cubG9jYXRpb247XG5cblx0Y29uc3QgYWN0aW9uRGF0YSA9IHtcblx0XHR0eXBlOiAncGF0aENoYW5nZScsXG5cdFx0dGltZXN0YW1wOiBEYXRlLm5vdygpLFxuXHRcdHBheWxvYWQ6IHtcblx0XHRcdHZhbHVlOiBocmVmXG5cdFx0fVxuXHR9O1xuXG5cdHNlbmRUcmFja0RhdGEodXNlckRhdGEsICd3YXZlQWN0aW9ucycsIGFjdGlvbkRhdGEpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgKHVzZXJEYXRhKSA9PiB7XG5cdHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSA9ICgoZikgPT5cblx0XHRmdW5jdGlvbiBwdXNoU3RhdGUoLi4uYXJnKSB7XG5cdFx0XHRjb25zdCByZXQgPSBmLmFwcGx5KHRoaXMsIGFyZyk7XG5cblx0XHRcdHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9jYXRpb25jaGFuZ2UnKSk7XG5cblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fSkod2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKTtcblxuXHR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUgPSAoKGYpID0+XG5cdFx0ZnVuY3Rpb24gcmVwbGFjZVN0YXRlKC4uLmFyZykge1xuXHRcdFx0Y29uc3QgcmV0ID0gZi5hcHBseSh0aGlzLCBhcmcpO1xuXG5cdFx0XHR3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2xvY2F0aW9uY2hhbmdlJykpO1xuXG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH0pKHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgKCkgPT4ge1xuXHRcdHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9jYXRpb25jaGFuZ2UnKSk7XG5cdH0pO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgKCkgPT4ge1xuXHRcdHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9jYXRpb25jaGFuZ2UnKSk7XG5cdH0pO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwYWdlc2hvdycsICgpID0+IHtcblx0XHR3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2xvY2F0aW9uY2hhbmdlJykpO1xuXHR9KTtcblxuXHRyZXR1cm4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvY2F0aW9uY2hhbmdlJywgKCkgPT4ge1xuXHRcdGxldCBpc1NraXBMb2NhdGlvbkNoYW5nZSA9IHdpbmRvdy5NV0FWRV9DT05GSUc/LmlzU2tpcExvY2F0aW9uQ2hhbmdlO1xuXG5cdFx0aWYgKCFpc1NraXBMb2NhdGlvbkNoYW5nZSkge1xuXHRcdFx0aGFuZGxlTG9jYXRpb25DaGFuZ2UodXNlckRhdGEpO1xuXHRcdH1cblx0fSk7XG59O1xuIiwiaW1wb3J0IGNvbmZpZyBmcm9tICcuLy4uL2NvbmZpZyc7XG5cbmNvbnN0IEFQSV9VUkwgPSBwcm9jZXNzLmVudi5CVUlMRCA9PT0gJ2RldicgPyBjb25maWcuQVBJX1VSTF9ERVYgOiBjb25maWcuQVBJX1VSTDtcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRyZWdpc3RlcigpIHtcblx0XHRsaWZlY3ljbGUuYWRkRXZlbnRMaXN0ZW5lcignc3RhdGVjaGFuZ2UnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdGlmIChldmVudC5uZXdTdGF0ZSA9PT0gJ2hpZGRlbicpIHtcblx0XHRcdFx0bGV0IHVzZXJEYXRhID0gd2luZG93LldBVkVfVVNFUl9EQVRBO1xuXG5cdFx0XHRcdGlmICh1c2VyRGF0YSkge1xuXHRcdFx0XHRcdGxldCBkYXRhID0ge1xuXHRcdFx0XHRcdFx0cHJvamVjdElkOiB1c2VyRGF0YS5wcm9qZWN0SWQsXG5cdFx0XHRcdFx0XHR2aXNpdG9ySWQ6IHVzZXJEYXRhLnZpc2l0b3JJZCxcblx0XHRcdFx0XHRcdHNlc3Npb25JZDogdXNlckRhdGEuc2Vzc2lvbklkXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdG5hdmlnYXRvci5zZW5kQmVhY29uKFxuXHRcdFx0XHRcdFx0YCR7d2luZG93LldBVkVfQVBJX1VSTCB8fCBBUElfVVJMfS93YXZlQWN0aW9ucy9waW5nYCxcblx0XHRcdFx0XHRcdEpTT04uc3RyaW5naWZ5KGRhdGEpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59O1xuIiwiaW1wb3J0IHsgc2VuZFRyYWNrRGF0YSB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5jb25zdCByZW1vdmVUYWdzID0gKG5vZGUsIHRhZ05hbWUpID0+IHtcblx0Y29uc3Qgbm9kZUNsb25lZCA9IG5vZGUuY2xvbmVOb2RlKHRydWUpO1xuXHRjb25zdCB0YWdzID0gbm9kZUNsb25lZC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWdOYW1lKTtcblxuXHR3aGlsZSAodGFncy5sZW5ndGgpIHtcblx0XHR0YWdzWzBdLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGFnc1swXSk7XG5cdH1cblxuXHRyZXR1cm4gbm9kZUNsb25lZDtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVEYW5nZXJvdXNUYWdzID0gKG5vZGUpID0+IHtcblx0Y29uc3Qgcm9vdFdpdGhvdXRTY3JpcHRzID0gcmVtb3ZlVGFncyhub2RlLCAnc2NyaXB0Jyk7XG5cdGNvbnN0IHJvb3RXaXRob3V0SWZyYW1lcyA9IHJlbW92ZVRhZ3Mocm9vdFdpdGhvdXRTY3JpcHRzLCAnaWZyYW1lJyk7XG5cdHJldHVybiByb290V2l0aG91dElmcmFtZXM7XG59O1xuXG5sZXQgcHJldldpZHRoO1xubGV0IHByZXZIZWlnaHQ7XG5cbmNvbnN0IGhhbmRsZU11dGF0aW9uID0gKHVzZXJEYXRhKSA9PiB7XG5cdGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaHRtbCcpWzBdO1xuXHRpZiAoIXJvb3QpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRbLi4ucm9vdC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpXS5mb3JFYWNoKChlbCkgPT4ge1xuXHRcdGlmICghZWwuZ2V0QXR0cmlidXRlKCd2YWx1ZScpICYmIGVsLnZhbHVlKSB7XG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZWwudmFsdWUpO1xuXHRcdH1cblx0fSk7XG5cblx0Y29uc3Qgcm9vdFdpdGhvdXREYW5nZXJvdXNUYWdzID0gcmVtb3ZlRGFuZ2Vyb3VzVGFncyhyb290KTtcblx0Y29uc3Qgc2NyZWVuID0gcm9vdFdpdGhvdXREYW5nZXJvdXNUYWdzLm91dGVySFRNTDtcblxuXHRjb25zdCB3aWR0aCA9IHJvb3Qub2Zmc2V0V2lkdGg7XG5cdGNvbnN0IGhlaWdodCA9IHJvb3Qub2Zmc2V0SGVpZ2h0O1xuXG5cdGlmIChwcmV2V2lkdGggIT09IHdpZHRoICYmIHByZXZIZWlnaHQgIT09IGhlaWdodCkge1xuXHRcdHNlbmRUcmFja0RhdGEodXNlckRhdGEsICd3YXZlUmVjb3JkcycsIHtcblx0XHRcdHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcblx0XHRcdHBheWxvYWQ6IHtcblx0XHRcdFx0c2l6ZToge1xuXHRcdFx0XHRcdHdpZHRoLFxuXHRcdFx0XHRcdGhlaWdodFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzY3JlZW5cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHByZXZXaWR0aCA9IHdpZHRoO1xuXHRcdHByZXZIZWlnaHQgPSBoZWlnaHQ7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGhhbmRsZU11dGF0aW9uO1xuIiwiaW1wb3J0IHsgZGVib3VuY2UsIERFRkFVTFRfREVCT1VOQ0VfVElNRSB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5pbXBvcnQgaGFuZGxlTXV0YXRpb24gZnJvbSAnLi9tdXRhdGlvbic7XG5cbmNvbnN0IGluaXQgPSAodXNlckRhdGEpID0+IHtcbiAgY29uc3QgTXV0YXRpb25PYnNlcnZlciA9IHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyXG4gIHx8IHdpbmRvdy5XZWJLaXRNdXRhdGlvbk9ic2VydmVyXG4gIHx8IHdpbmRvdy5Nb3pNdXRhdGlvbk9ic2VydmVyO1xuXG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoXG4gICAgZGVib3VuY2UoKCkgPT4gaGFuZGxlTXV0YXRpb24odXNlckRhdGEpLCBERUZBVUxUX0RFQk9VTkNFX1RJTUUpLFxuICApO1xuICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCB7IHN1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgYXR0cmlidXRlczogdHJ1ZSB9KTtcbiAgaGFuZGxlTXV0YXRpb24odXNlckRhdGEpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0LFxufTtcbiIsImltcG9ydCAnLi9saWIvZmluZ2VycHJpbnQyLm1pbic7XG5pbXBvcnQgJy4vbGliL2xpZmVjeWNsZSc7XG5pbXBvcnQgY2xpY2tIYW5kbGVyIGZyb20gJy4vYWN0aW9ucy9jbGljayc7XG5pbXBvcnQgcGFnZVJlc2l6ZUhhbmRsZXIgZnJvbSAnLi9hY3Rpb25zL3BhZ2VSZXNpemUnO1xuaW1wb3J0IHBhZ2VTY3JvbGxpbmdIYW5kbGVyIGZyb20gJy4vYWN0aW9ucy9wYWdlU2Nyb2xsaW5nJztcbmltcG9ydCBzaWdudXBIYW5kbGVyIGZyb20gJy4vYWN0aW9ucy9zaWdudXAnO1xuaW1wb3J0IG1vdXNlTW92ZUhhbmRsZXIgZnJvbSAnLi9hY3Rpb25zL21vdXNlTW92ZSc7XG5pbXBvcnQgcGF0aENoYW5nZUhhbmRsZXIsIHsgaGFuZGxlTG9jYXRpb25DaGFuZ2UgfSBmcm9tICcuL2FjdGlvbnMvcGF0aENoYW5nZSc7XG5pbXBvcnQgb25FeGl0IGZyb20gJy4vYWN0aW9ucy9vbkV4aXQnO1xuXG5pbXBvcnQgdHJhY2tlck11dGF0aW9uT2JzZXJ2ZXIgZnJvbSAnLi9yZWNvcmRzL29ic2VydmVyJztcblxuaW1wb3J0IHtcblx0c2VuZERhdGEsXG5cdHJlZ2lzdGVySGFuZGxlcnMsXG5cdGdldERldmljZVR5cGUsXG5cdGdldEJyb3dzZXJOYW1lLFxuXHRnZXRDb25uZWN0aW9uVHlwZSxcblx0Z2V0T1MsXG5cdHNlbmRUcmFja0V2ZW50LFxuXHRzZW5kUGluZ1xufSBmcm9tICcuL2hlbHBlcnMnO1xuXG50cnkge1xuXHRvbkV4aXQucmVnaXN0ZXIoKTtcbn0gY2F0Y2ggKGVycikge31cblxud2luZG93Lm13YXZlID0ge1xuXHRzZW5kVHJhY2tFdmVudCxcblx0c2VuZFBpbmdcbn07XG5cbmlmIChwcm9jZXNzLmVudi5CVUlMRCA9PT0gJ2RldicpIHtcblx0aWYgKEZpbmdlcnByaW50MiAmJiBGaW5nZXJwcmludDIuZ2V0VjE4KSB7XG5cdFx0Y29uc29sZS5sb2coJ0ZpbmdlcnByaW50Mi5nZXRWMTg6JywgdHlwZW9mIEZpbmdlcnByaW50Mi5nZXRWMTgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS5lcnJvcignRmluZ2VycHJpbnQyIG5vdCBsb2FkZWQgY29ycmVjdGx5IScsIEZpbmdlcnByaW50Mik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblx0fVxufVxuXG5jb25zdCBkZWZhdWx0SGFuZGxlcnMgPSBbXG5cdGNsaWNrSGFuZGxlcixcblx0cGFnZVJlc2l6ZUhhbmRsZXIsXG5cdHBhZ2VTY3JvbGxpbmdIYW5kbGVyLFxuXHRzaWdudXBIYW5kbGVyLFxuXHRtb3VzZU1vdmVIYW5kbGVyLFxuXHRwYXRoQ2hhbmdlSGFuZGxlclxuXTtcblxuY29uc3QgY2FsY0lkZW50aWZpY2F0b3IgPSAoKSA9PlxuXHRuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcblx0XHRGaW5nZXJwcmludDIuZ2V0VjE4KChyZXN1bHQpID0+IHtcblx0XHRcdGlmICghcmVzdWx0KSB7XG5cdFx0XHRcdHJlaihuZXcgRXJyb3IoJ0lkZW50aWZpY2F0b3Igbm90IGNyZWF0ZWQhJykpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXMocmVzdWx0KTtcblx0XHR9KTtcblx0fSk7XG5cbmZ1bmN0aW9uIHNldENvb2tpZShjX25hbWUsIHZhbHVlLCBleGRheXMpIHtcblx0dmFyIGV4ZGF0ZSA9IG5ldyBEYXRlKCk7XG5cdGV4ZGF0ZS5zZXREYXRlKGV4ZGF0ZS5nZXREYXRlKCkgKyBleGRheXMpO1xuXHR2YXIgY192YWx1ZSA9IGVzY2FwZSh2YWx1ZSkgKyAoZXhkYXlzID09IG51bGwgPyAnJyA6ICc7IGV4cGlyZXM9JyArIGV4ZGF0ZS50b1VUQ1N0cmluZygpKTtcblx0ZG9jdW1lbnQuY29va2llID0gY19uYW1lICsgJz0nICsgY192YWx1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29va2llKGNfbmFtZSkge1xuXHR2YXIgaSxcblx0XHR4LFxuXHRcdHksXG5cdFx0QVJSY29va2llcyA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xuXHRmb3IgKGkgPSAwOyBpIDwgQVJSY29va2llcy5sZW5ndGg7IGkrKykge1xuXHRcdHggPSBBUlJjb29raWVzW2ldLnN1YnN0cigwLCBBUlJjb29raWVzW2ldLmluZGV4T2YoJz0nKSk7XG5cdFx0eSA9IEFSUmNvb2tpZXNbaV0uc3Vic3RyKEFSUmNvb2tpZXNbaV0uaW5kZXhPZignPScpICsgMSk7XG5cdFx0eCA9IHgucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuXHRcdGlmICh4ID09IGNfbmFtZSkge1xuXHRcdFx0cmV0dXJuIHVuZXNjYXBlKHkpO1xuXHRcdH1cblx0fVxufVxuXG5jb25zdCBpbml0ID1cblx0KGluaXRpYWxVc2VyRGF0YSwgaGFuZGxlcnMgPSBkZWZhdWx0SGFuZGxlcnMpID0+XG5cdCgpID0+IHtcblx0XHRjb25zdCB1c2VyRGF0YSA9IHsgLi4uaW5pdGlhbFVzZXJEYXRhIH07XG5cblx0XHRyZXR1cm4gY2FsY0lkZW50aWZpY2F0b3IoKVxuXHRcdFx0LnRoZW4oKHZpc2l0b3JJZCkgPT4ge1xuXHRcdFx0XHR1c2VyRGF0YS52aXNpdG9ySWQgPSB2aXNpdG9ySWQ7XG5cdFx0XHRcdHNldENvb2tpZSgnd2F2ZV9maW5nZXJwcmludCcsIHZpc2l0b3JJZCk7XG5cdFx0XHRcdHdpbmRvdy5XQVZFX0ZJTkdFUlBSSU5UID0gdmlzaXRvcklkO1xuXG5cdFx0XHRcdHJldHVybiBmZXRjaCgnaHR0cHM6Ly9hcGkuaXBpZnkub3JnJylcblx0XHRcdFx0XHQudGhlbigocmVzKSA9PiByZXMudGV4dCgpKVxuXHRcdFx0XHRcdC50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBwYXlsb2FkID0ge1xuXHRcdFx0XHRcdFx0XHRvczogZ2V0T1MoKSxcblx0XHRcdFx0XHRcdFx0YnJvd3Nlck5hbWU6IGdldEJyb3dzZXJOYW1lKCksXG5cdFx0XHRcdFx0XHRcdGRldmljZVR5cGU6IGdldERldmljZVR5cGUoKSxcblx0XHRcdFx0XHRcdFx0Y29ubmVjdGlvblR5cGU6IGdldENvbm5lY3Rpb25UeXBlKCksXG5cdFx0XHRcdFx0XHRcdGlwQWRkcmVzczogZGF0YSxcblxuXHRcdFx0XHRcdFx0XHRyZWZlcnJlclVybDogZG9jdW1lbnQucmVmZXJyZXJcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdGNvbnN0IHNlc3Npb24gPSBKU09OLnBhcnNlKFxuXHRcdFx0XHRcdFx0XHRsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgd2F2ZV9zZXNzaW9uXyR7d2luZG93LldBVkVfU1VCUFJPSkVDVF9JRCB8fCAnJ31gKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdGNvbnN0IFRFTl9NSU5VVEVTX01TID0gMSAqIDYwICogMTAwMDtcblxuXHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHRzZXNzaW9uICYmXG5cdFx0XHRcdFx0XHRcdHNlc3Npb24uc2Vzc2lvbklkICYmXG5cdFx0XHRcdFx0XHRcdG5ldyBEYXRlKCkgLSBuZXcgRGF0ZShzZXNzaW9uLnVwZGF0ZWRPbikgPCBURU5fTUlOVVRFU19NU1xuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRcdFx0c2Vzc2lvbklkOiBzZXNzaW9uLnNlc3Npb25JZFxuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VuZERhdGEoJ3dhdmVTZXNzaW9ucy9pbml0Jywge1xuXHRcdFx0XHRcdFx0XHR2aXNpdG9ySWQsXG5cdFx0XHRcdFx0XHRcdGRvbWFpbjogd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lLFxuXHRcdFx0XHRcdFx0XHR1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuXHRcdFx0XHRcdFx0XHRwYXlsb2FkLFxuXHRcdFx0XHRcdFx0XHRwcm9qZWN0SWQ6IHVzZXJEYXRhLnByb2plY3RJZCxcblxuXHRcdFx0XHRcdFx0XHQuLi4od2luZG93Lk1XQVZFX0NPTkZJR1xuXHRcdFx0XHRcdFx0XHRcdD8ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzdWJQcm9qZWN0SWQ6IHdpbmRvdy5NV0FWRV9DT05GSUc/LnN1YlByb2plY3RJZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0cGFnZUlkOiB3aW5kb3cuTVdBVkVfQ09ORklHPy5wYWdlSWRcblx0XHRcdFx0XHRcdFx0XHQgIH1cblx0XHRcdFx0XHRcdFx0XHQ6IHt9KVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4oKHsgc2Vzc2lvbklkIH0pID0+IHtcblx0XHRcdFx0aWYgKHNlc3Npb25JZCkge1xuXHRcdFx0XHRcdGNvbnN0IHNldFNlc3Npb24gPSAoKSA9PiB7XG5cdFx0XHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcblx0XHRcdFx0XHRcdFx0J3dhdmVfc2Vzc2lvbicsXG5cdFx0XHRcdFx0XHRcdEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0XHRcdFx0XHRzZXNzaW9uSWQsXG5cdFx0XHRcdFx0XHRcdFx0dXBkYXRlZE9uOiBuZXcgRGF0ZSgpXG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRzZXRTZXNzaW9uKCk7XG5cdFx0XHRcdFx0d2luZG93LldBVkVfU0VTU0lPTl9JRCA9IHNlc3Npb25JZDtcblx0XHRcdFx0XHRzZXRJbnRlcnZhbChzZXRTZXNzaW9uLCAxMCAqIDEwMDApO1xuXG5cdFx0XHRcdFx0dXNlckRhdGEuc2Vzc2lvbklkID0gc2Vzc2lvbklkO1xuXG5cdFx0XHRcdFx0cmVnaXN0ZXJIYW5kbGVycyh1c2VyRGF0YSwgaGFuZGxlcnMpO1xuXHRcdFx0XHRcdHdpbmRvdy5XQVZFX1VTRVJfREFUQSA9IHVzZXJEYXRhO1xuXHRcdFx0XHRcdHRyYWNrZXJNdXRhdGlvbk9ic2VydmVyLmluaXQodXNlckRhdGEpO1xuXHRcdFx0XHRcdGhhbmRsZUxvY2F0aW9uQ2hhbmdlKHVzZXJEYXRhKTtcblx0XHRcdFx0fSBlbHNlIGlmIChwcm9jZXNzLmVudi5CVUlMRCA9PT0gJ2RldicpIHtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZywgc2Vzc2lvbklkIG5vdCBzZXR0ZWQ6Jywgc2Vzc2lvbklkKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHVzZXJEYXRhXG5cdFx0XHRcdH07XG5cdFx0XHR9KTtcblx0fTtcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRpbml0XG59O1xuIiwiaW1wb3J0IHRyYWNrZXIgZnJvbSAnLi90cmFja2VyJztcblxuZXhwb3J0IGRlZmF1bHQgKCgpID0+IHtcblx0Y29uc3QgcGFyYW1zID0gd2luZG93LndhdmUgJiYgd2luZG93LndhdmUucGFyYW1zO1xuXG5cdGlmIChwcm9jZXNzLmVudi5CVUlMRCA9PT0gJ2RldicpIHtcblx0XHRjb25zb2xlLmxvZygnV2F2ZSBzY3JpcHQgcGFyYW1zOicsIHBhcmFtcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblx0fVxuXG5cdC8vIGRvbid0IGNoYW5nZSBvYmplY3QncyBsaW5rLlxuXHRjb25zdCB1c2VyRGF0YSA9IHtcblx0XHR2aXNpdG9ySWQ6IG51bGwsXG5cdFx0c2Vzc2lvbklkOiBudWxsLFxuXHRcdHByb2plY3RJZDogcGFyYW1zICYmIHBhcmFtcy5waWRcblx0fTtcblxuXHRpZiAod2luZG93LnJlcXVlc3RJZGxlQ2FsbGJhY2spIHtcblx0XHRyZXF1ZXN0SWRsZUNhbGxiYWNrKHRyYWNrZXIuaW5pdCh1c2VyRGF0YSkpO1xuXHR9IGVsc2Uge1xuXHRcdHNldFRpbWVvdXQodHJhY2tlci5pbml0KHVzZXJEYXRhKSwgNTAwKTtcblx0fVxufSkoKTtcbiJdLCJuYW1lcyI6WyJlIiwidCIsImEiLCJ3aW5kb3ciLCJkZWZpbmUiLCJhbWQiLCJtb2R1bGUiLCJleHBvcnRzIiwiRmluZ2VycHJpbnQyIiwidGhpcyIsImQiLCJnIiwiZiIsImgiLCJtIiwiVCIsImwiLCJsZW5ndGgiLCJuIiwiciIsImkiLCJvIiwicyIsImMiLCJ1IiwiY2hhckNvZGVBdCIsInRvU3RyaW5nIiwic2xpY2UiLCJwcmVwcm9jZXNzb3IiLCJhdWRpbyIsInRpbWVvdXQiLCJleGNsdWRlSU9TMTEiLCJmb250cyIsInN3ZkNvbnRhaW5lcklkIiwic3dmUGF0aCIsInVzZXJEZWZpbmVkRm9udHMiLCJleHRlbmRlZEpzRm9udHMiLCJzY3JlZW4iLCJkZXRlY3RTY3JlZW5PcmllbnRhdGlvbiIsInBsdWdpbnMiLCJzb3J0UGx1Z2luc0ZvciIsImV4Y2x1ZGVJRSIsImV4dHJhQ29tcG9uZW50cyIsImV4Y2x1ZGVzIiwiZW51bWVyYXRlRGV2aWNlcyIsInBpeGVsUmF0aW8iLCJkb05vdFRyYWNrIiwiZm9udHNGbGFzaCIsIk5PVF9BVkFJTEFCTEUiLCJFUlJPUiIsIkVYQ0xVREVEIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJmb3JFYWNoIiwiaGFzT3duUHJvcGVydHkiLCJtYXAiLCJwdXNoIiwibmF2aWdhdG9yIiwibWVkaWFEZXZpY2VzIiwid2lkdGgiLCJoZWlnaHQiLCJzb3J0IiwicmV2ZXJzZSIsImF2YWlsV2lkdGgiLCJhdmFpbEhlaWdodCIsIm5hbWUiLCJ0eXBlIiwic3VmZml4ZXMiLCJkZXNjcmlwdGlvbiIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIkFjdGl2ZVhPYmplY3QiLCJjb25jYXQiLCJ1c2VyQWdlbnQiLCJtYXRjaCIsInAiLCJzZXNzaW9uU3RvcmFnZSIsInYiLCJsb2NhbFN0b3JhZ2UiLCJBIiwiaW5kZXhlZERCIiwiUyIsImhhcmR3YXJlQ29uY3VycmVuY3kiLCJDIiwiY3B1Q2xhc3MiLCJCIiwicGxhdGZvcm0iLCJ3IiwibXNEb05vdFRyYWNrIiwibWF4VG91Y2hQb2ludHMiLCJtc01heFRvdWNoUG9pbnRzIiwiZG9jdW1lbnQiLCJjcmVhdGVFdmVudCIsInkiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJkaXNwbGF5IiwiZ2V0Q29udGV4dCIsInJlY3QiLCJpc1BvaW50SW5QYXRoIiwidGV4dEJhc2VsaW5lIiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJkb250VXNlRmFrZUZvbnRJbkNhbnZhcyIsImZvbnQiLCJmaWxsVGV4dCIsImdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiIsImJlZ2luUGF0aCIsImFyYyIsIk1hdGgiLCJQSSIsImNsb3NlUGF0aCIsImZpbGwiLCJ0b0RhdGFVUkwiLCJFIiwiY2xlYXJDb2xvciIsImVuYWJsZSIsIkRFUFRIX1RFU1QiLCJkZXB0aEZ1bmMiLCJMRVFVQUwiLCJjbGVhciIsIkNPTE9SX0JVRkZFUl9CSVQiLCJERVBUSF9CVUZGRVJfQklUIiwiRiIsImNyZWF0ZUJ1ZmZlciIsImJpbmRCdWZmZXIiLCJBUlJBWV9CVUZGRVIiLCJGbG9hdDMyQXJyYXkiLCJidWZmZXJEYXRhIiwiU1RBVElDX0RSQVciLCJpdGVtU2l6ZSIsIm51bUl0ZW1zIiwiY3JlYXRlUHJvZ3JhbSIsImNyZWF0ZVNoYWRlciIsIlZFUlRFWF9TSEFERVIiLCJzaGFkZXJTb3VyY2UiLCJjb21waWxlU2hhZGVyIiwiRlJBR01FTlRfU0hBREVSIiwiYXR0YWNoU2hhZGVyIiwibGlua1Byb2dyYW0iLCJ1c2VQcm9ncmFtIiwidmVydGV4UG9zQXR0cmliIiwiZ2V0QXR0cmliTG9jYXRpb24iLCJvZmZzZXRVbmlmb3JtIiwiZ2V0VW5pZm9ybUxvY2F0aW9uIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiLCJ2ZXJ0ZXhQb3NBcnJheSIsInZlcnRleEF0dHJpYlBvaW50ZXIiLCJGTE9BVCIsInVuaWZvcm0yZiIsImRyYXdBcnJheXMiLCJUUklBTkdMRV9TVFJJUCIsImNhbnZhcyIsImdldFN1cHBvcnRlZEV4dGVuc2lvbnMiLCJqb2luIiwiZ2V0UGFyYW1ldGVyIiwiQUxJQVNFRF9MSU5FX1dJRFRIX1JBTkdFIiwiQUxJQVNFRF9QT0lOVF9TSVpFX1JBTkdFIiwiQUxQSEFfQklUUyIsImdldENvbnRleHRBdHRyaWJ1dGVzIiwiYW50aWFsaWFzIiwiQkxVRV9CSVRTIiwiREVQVEhfQklUUyIsIkdSRUVOX0JJVFMiLCJnZXRFeHRlbnNpb24iLCJNQVhfVEVYVFVSRV9NQVhfQU5JU09UUk9QWV9FWFQiLCJNQVhfQ09NQklORURfVEVYVFVSRV9JTUFHRV9VTklUUyIsIk1BWF9DVUJFX01BUF9URVhUVVJFX1NJWkUiLCJNQVhfRlJBR01FTlRfVU5JRk9STV9WRUNUT1JTIiwiTUFYX1JFTkRFUkJVRkZFUl9TSVpFIiwiTUFYX1RFWFRVUkVfSU1BR0VfVU5JVFMiLCJNQVhfVEVYVFVSRV9TSVpFIiwiTUFYX1ZBUllJTkdfVkVDVE9SUyIsIk1BWF9WRVJURVhfQVRUUklCUyIsIk1BWF9WRVJURVhfVEVYVFVSRV9JTUFHRV9VTklUUyIsIk1BWF9WRVJURVhfVU5JRk9STV9WRUNUT1JTIiwiTUFYX1ZJRVdQT1JUX0RJTVMiLCJSRURfQklUUyIsIlJFTkRFUkVSIiwiU0hBRElOR19MQU5HVUFHRV9WRVJTSU9OIiwiU1RFTkNJTF9CSVRTIiwiVkVORE9SIiwiVkVSU0lPTiIsIlVOTUFTS0VEX1ZFTkRPUl9XRUJHTCIsIlVOTUFTS0VEX1JFTkRFUkVSX1dFQkdMIiwiZ2V0U2hhZGVyUHJlY2lzaW9uRm9ybWF0IiwidG9Mb3dlckNhc2UiLCJNIiwieCIsImlubmVySFRNTCIsImNsYXNzTmFtZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJvZmZzZXRIZWlnaHQiLCJyZW1vdmVDaGlsZCIsIk8iLCJsYW5ndWFnZXMiLCJzdWJzdHIiLCJsYW5ndWFnZSIsImIiLCJQIiwib3NjcHUiLCJpbmRleE9mIiwiTCIsInByb2R1Y3RTdWIiLCJldmFsIiwidG9Tb3VyY2UiLCJJIiwiayIsIldlYkdMUmVuZGVyaW5nQ29udGV4dCIsIlIiLCJhcHBOYW1lIiwidGVzdCIsIkQiLCJzd2ZvYmplY3QiLCJOIiwiaGFzRmxhc2hQbGF5ZXJWZXJzaW9uIiwiXyIsInNldEF0dHJpYnV0ZSIsIm9uUmVhZHkiLCJlbWJlZFNXRiIsImFsbG93U2NyaXB0QWNjZXNzIiwibWVudSIsIkciLCJrZXkiLCJnZXREYXRhIiwid2ViZHJpdmVyIiwidXNlckxhbmd1YWdlIiwiYnJvd3Nlckxhbmd1YWdlIiwic3lzdGVtTGFuZ3VhZ2UiLCJjb2xvckRlcHRoIiwiZGV2aWNlTWVtb3J5IiwiZGV2aWNlUGl4ZWxSYXRpbyIsIkRhdGUiLCJnZXRUaW1lem9uZU9mZnNldCIsIkludGwiLCJEYXRlVGltZUZvcm1hdCIsInJlc29sdmVkT3B0aW9ucyIsInRpbWVab25lIiwiYWRkQmVoYXZpb3IiLCJvcGVuRGF0YWJhc2UiLCJmaWx0ZXIiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInBvc2l0aW9uIiwibGVmdCIsImZvbnRTaXplIiwiZm9udFN0eWxlIiwiZm9udFdlaWdodCIsImxldHRlclNwYWNpbmciLCJsaW5lQnJlYWsiLCJsaW5lSGVpZ2h0IiwidGV4dFRyYW5zZm9ybSIsInRleHRBbGlnbiIsInRleHREZWNvcmF0aW9uIiwidGV4dFNoYWRvdyIsIndoaXRlU3BhY2UiLCJ3b3JkQnJlYWsiLCJ3b3JkU3BhY2luZyIsIm9mZnNldFdpZHRoIiwiZm9udEZhbWlseSIsInBhdXNlQmVmb3JlIiwiT2ZmbGluZUF1ZGlvQ29udGV4dCIsIndlYmtpdE9mZmxpbmVBdWRpb0NvbnRleHQiLCJjcmVhdGVPc2NpbGxhdG9yIiwiZnJlcXVlbmN5Iiwic2V0VmFsdWVBdFRpbWUiLCJjdXJyZW50VGltZSIsImNyZWF0ZUR5bmFtaWNzQ29tcHJlc3NvciIsImNvbm5lY3QiLCJkZXN0aW5hdGlvbiIsInN0YXJ0Iiwic3RhcnRSZW5kZXJpbmciLCJzZXRUaW1lb3V0IiwiY29uc29sZSIsIndhcm4iLCJvbmNvbXBsZXRlIiwiY2xlYXJUaW1lb3V0IiwicmVuZGVyZWRCdWZmZXIiLCJnZXRDaGFubmVsRGF0YSIsInJlZHVjZSIsImFicyIsImRpc2Nvbm5lY3QiLCJ0aGVuIiwiZGV2aWNlSWQiLCJncm91cElkIiwia2luZCIsImxhYmVsIiwiVSIsIkVycm9yIiwiZ2V0IiwiY2FsbCIsImNvbXBvbmVudHMiLCJkYXRhIiwiYWRkUHJlcHJvY2Vzc2VkQ29tcG9uZW50IiwidmFsdWUiLCJTdHJpbmciLCJnZXRQcm9taXNlIiwiUHJvbWlzZSIsImdldFYxOCIsIng2NGhhc2gxMjgiLCJsaWZlY3ljbGUiLCJFdmVudFRhcmdldCIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiY29uc3RydWN0b3IiLCJUeXBlRXJyb3IiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJkZWZpbmVQcm9wZXJ0eSIsImNyZWF0ZSIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiUmVmZXJlbmNlRXJyb3IiLCJfcmVnaXN0cnkiLCJfZ2V0UmVnaXN0cnkiLCJzcGxpY2UiLCJ0YXJnZXQiLCJmcmVlemUiLCJFdmVudCIsImdldFByb3RvdHlwZU9mIiwibmV3U3RhdGUiLCJvbGRTdGF0ZSIsIm9yaWdpbmFsRXZlbnQiLCJzYWZhcmkiLCJwdXNoTm90aWZpY2F0aW9uIiwic2VsZiIsInByZXZlbnREZWZhdWx0IiwicmV0dXJuVmFsdWUiLCJ2aXNpYmlsaXR5U3RhdGUiLCJoYXNGb2N1cyIsIl9zdGF0ZSIsIl91bnNhdmVkQ2hhbmdlcyIsIl9oYW5kbGVFdmVudHMiLCJiaW5kIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9zYWZhcmlCZWZvcmVVbmxvYWRUaW1lb3V0IiwiZGVmYXVsdFByZXZlbnRlZCIsIl9kaXNwYXRjaENoYW5nZXNJZk5lZWRlZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJrZXlzIiwiZGlzcGF0Y2hFdmVudCIsInBlcnNpc3RlZCIsIndhc0Rpc2NhcmRlZCIsImNvbmZpZyIsIkFQSV9VUkwiLCJBUElfVVJMX0RFViIsIkNMQVNTX0RJVklERVIiLCJERUZBVUxUX0RFQk9VTkNFX1RJTUUiLCJnZXRQYXJlbnRzIiwiZWxlbWVudCIsInBhcmVudHMiLCJwYXJlbnROb2RlIiwiZ2V0Q291bnRTYW1lTm9kZU5hbWUiLCJlbGVtZW50c0FycmF5IiwiY291bnQiLCJjdXJyZW50RWxlbWVudCIsIm5vZGVOYW1lIiwiZ2V0TnRoTnVtYmVyIiwibnRoIiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImdldENzc1BhdGgiLCJlbGVtZW50UGFyZW50cyIsInNlbGVjdG9yc0FycmF5IiwiZWxlbWVudEl0ZW0iLCJpZCIsInNlbGVjdG9yIiwic2libGluZyIsImNoaWxkcmVuIiwiY291bnRTYW1lTm9kZU5hbWUiLCJjbGFzc05hbWVzIiwicmVwbGFjZSIsIm50aE51bWJlciIsInJlc3VsdFBhdGgiLCJnZXRWYWx1ZSIsImlubmVyVGV4dCIsInNlbmREYXRhIiwidXJsIiwiZmV0Y2giLCJXQVZFX0FQSV9VUkwiLCJtZXRob2QiLCJoZWFkZXJzIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc3BvbnNlIiwianNvbiIsInNlbmRUcmFja0RhdGEiLCJ1c2VyRGF0YSIsIl9vYmplY3RTcHJlYWQiLCJwcm9qZWN0SWQiLCJ2aXNpdG9ySWQiLCJzZXNzaW9uSWQiLCJNV0FWRV9DT05GSUciLCJzdWJQcm9qZWN0SWQiLCJwYWdlSWQiLCJ0cmFja0RhdGEiLCJzZW5kVHJhY2tFdmVudCIsInRpbWVzdGFtcCIsIm5vdyIsInBheWxvYWQiLCJXQVZFX1VTRVJfREFUQSIsInNlbmRQaW5nIiwicmVnaXN0ZXJIYW5kbGVycyIsImhhbmRsZXJzIiwiaGFuZGxlciIsImRlYm91bmNlIiwiZnVuYyIsImRlbGF5IiwiYmxvY2tlcklkIiwiYXJncyIsImluY2x1ZGVzIiwiaGF5c3RhY2siLCJuZWVkbGUiLCJmaW5kIiwidG9Mb2NhbGVMb3dlckNhc2UiLCJ3aW5kb3dzIiwibGludXgiLCJpcGhvbmUiLCJpcG9kIiwiaXBhZCIsImlQYWRPUzEzVXAiLCJpb3MiLCJtYWNvcyIsImFuZHJvaWQiLCJhbmRyb2lkUGhvbmUiLCJhbmRyb2lkVGFibGV0IiwiYmxhY2tiZXJyeSIsImJsYWNrYmVycnlQaG9uZSIsImJsYWNrYmVycnlUYWJsZXQiLCJ3aW5kb3dzUGhvbmUiLCJ3aW5kb3dzVGFibGV0IiwiZnhvcyIsImZ4b3NQaG9uZSIsImZ4b3NUYWJsZXQiLCJtZWVnbyIsIm1vYmlsZSIsInRhYmxldCIsImRlc2t0b3AiLCJnZXREZXZpY2VUeXBlIiwiZ2V0T1MiLCJnZXRCcm93c2VyTmFtZSIsImFwcFZlcnNpb24iLCJkb2N1bWVudE1vZGUiLCJnZXRDb25uZWN0aW9uVHlwZSIsImNvbm5lY3Rpb25UeXBlIiwiY29ubmVjdGlvbiIsIldBVkVfVFJBQ0tfQ0xJQ0tTIiwiaGFuZGxlQ2xpY2siLCJldmVudCIsImNsaWVudFgiLCJjbGllbnRZIiwib2Zmc2V0IiwicGFnZVhPZmZzZXQiLCJwYWdlWU9mZnNldCIsImNhcHR1cmUiLCJwYXNzaXZlIiwiV0FWRV9UUkFDS19GT1JNUyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JtIiwiZW1haWxFbCIsImFjdGlvbkRhdGEiLCJtb3VzZU1vdmVIYW5kbGVyIiwiaGFuZGxlTG9jYXRpb25DaGFuZ2UiLCJocmVmIiwibG9jYXRpb24iLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiYXJnIiwicmV0IiwiYXBwbHkiLCJyZXBsYWNlU3RhdGUiLCJpc1NraXBMb2NhdGlvbkNoYW5nZSIsInJlZ2lzdGVyIiwic2VuZEJlYWNvbiIsInJlbW92ZVRhZ3MiLCJub2RlIiwidGFnTmFtZSIsIm5vZGVDbG9uZWQiLCJjbG9uZU5vZGUiLCJ0YWdzIiwicmVtb3ZlRGFuZ2Vyb3VzVGFncyIsInJvb3RXaXRob3V0U2NyaXB0cyIsInJvb3RXaXRob3V0SWZyYW1lcyIsInByZXZXaWR0aCIsInByZXZIZWlnaHQiLCJoYW5kbGVNdXRhdGlvbiIsInJvb3QiLCJlbCIsImdldEF0dHJpYnV0ZSIsInJvb3RXaXRob3V0RGFuZ2Vyb3VzVGFncyIsIm91dGVySFRNTCIsInNpemUiLCJpbml0IiwiTXV0YXRpb25PYnNlcnZlciIsIldlYktpdE11dGF0aW9uT2JzZXJ2ZXIiLCJNb3pNdXRhdGlvbk9ic2VydmVyIiwib2JzZXJ2ZXIiLCJvYnNlcnZlIiwic3VidHJlZSIsImNoaWxkTGlzdCIsImF0dHJpYnV0ZXMiLCJvbkV4aXQiLCJlcnIiLCJtd2F2ZSIsImxvZyIsImVycm9yIiwiZGVmYXVsdEhhbmRsZXJzIiwiY2xpY2tIYW5kbGVyIiwicGFnZVJlc2l6ZUhhbmRsZXIiLCJwYWdlU2Nyb2xsaW5nSGFuZGxlciIsInNpZ251cEhhbmRsZXIiLCJwYXRoQ2hhbmdlSGFuZGxlciIsImNhbGNJZGVudGlmaWNhdG9yIiwicmVzIiwicmVqIiwicmVzdWx0Iiwic2V0Q29va2llIiwiY19uYW1lIiwiZXhkYXlzIiwiZXhkYXRlIiwic2V0RGF0ZSIsImdldERhdGUiLCJjX3ZhbHVlIiwiZXNjYXBlIiwidG9VVENTdHJpbmciLCJjb29raWUiLCJpbml0aWFsVXNlckRhdGEiLCJXQVZFX0ZJTkdFUlBSSU5UIiwidGV4dCIsIm9zIiwiYnJvd3Nlck5hbWUiLCJkZXZpY2VUeXBlIiwiaXBBZGRyZXNzIiwicmVmZXJyZXJVcmwiLCJyZWZlcnJlciIsInNlc3Npb24iLCJwYXJzZSIsImdldEl0ZW0iLCJXQVZFX1NVQlBST0pFQ1RfSUQiLCJURU5fTUlOVVRFU19NUyIsInVwZGF0ZWRPbiIsImRvbWFpbiIsImhvc3RuYW1lIiwic2V0U2Vzc2lvbiIsInNldEl0ZW0iLCJXQVZFX1NFU1NJT05fSUQiLCJzZXRJbnRlcnZhbCIsInRyYWNrZXJNdXRhdGlvbk9ic2VydmVyIiwicGFyYW1zIiwid2F2ZSIsInBpZCIsInJlcXVlc3RJZGxlQ2FsbGJhY2siLCJ0cmFja2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQTtFQUNBOztFQUVBLENBQUUsVUFBVUEsQ0FBQyxFQUFFQyxDQUFDLEVBQUVDLENBQUMsRUFBRTtJQUNuQixPQUFPQyxNQUFNLEtBQUssV0FBVyxJQUFJLE9BQU9DLE1BQU0sS0FBSyxVQUFVLElBQUlBLE1BQU0sQ0FBQ0MsR0FBRyxHQUFHRCxNQUFNLENBQUNGLENBQUMsQ0FBQyxHQUFHLE9BQU9JLE1BQU0sS0FBSyxXQUFXLElBQUlBLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHRCxNQUFNLENBQUNDLE9BQU8sR0FBR0wsQ0FBQyxFQUFFLEdBQUdELENBQUMsQ0FBQ00sT0FBTyxHQUFHTixDQUFDLENBQUNNLE9BQU8sR0FBR0wsQ0FBQyxFQUFFLEdBQUdELENBQUMsQ0FBQ08sWUFBWSxHQUFHTixDQUFDLEVBQUUsQ0FBQTtFQUN2TixDQUFDLENBQUMsQ0FBQyxFQUFFTyxNQUFJLEVBQUUsWUFBTTtJQUNmLElBQU1DLENBQUMsR0FBRyxTQUFKQSxDQUFDLENBQWFWLENBQUMsRUFBRUMsQ0FBQyxFQUFFO0VBQUVELElBQUFBLENBQUMsR0FBRyxDQUFDQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsR0FBRyxDQUFDQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7TUFBRSxJQUFNQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUFFLElBQUEsT0FBT0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUcsQ0FBQTtJQUFFLElBQU1TLENBQUMsR0FBRyxTQUFKQSxDQUFDLENBQWFYLENBQUMsRUFBRUMsQ0FBQyxFQUFFO0VBQUVELElBQUFBLENBQUMsR0FBRyxDQUFDQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsR0FBRyxDQUFDQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7TUFBRSxJQUFNQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUFFLElBQUEsT0FBT0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUcsQ0FBQTtJQUFFLElBQU1VLENBQUMsR0FBRyxTQUFKQSxDQUFDLENBQWFaLENBQUMsRUFBRUMsQ0FBQyxFQUFFO01BQUUsT0FBTyxDQUFDQSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUNELENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUMsQ0FBQyxHQUFHRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHQyxDQUFDLEVBQUVELENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUMsQ0FBQyxHQUFHRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHQyxDQUFDLENBQUMsSUFBSUEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlDLENBQUMsR0FBR0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBR0MsQ0FBQyxFQUFFRCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlDLENBQUMsR0FBR0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFHLENBQUE7SUFBRSxJQUFNWSxDQUFDLEdBQUcsU0FBSkEsQ0FBQyxDQUFhYixDQUFDLEVBQUVDLENBQUMsRUFBRTtNQUFFLE9BQU8sQ0FBQ0EsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUdELENBQUMsR0FBR0MsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlDLENBQUMsR0FBR0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBR0MsQ0FBQyxFQUFFRCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlDLENBQUMsQ0FBQyxHQUFHLENBQUNELENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtLQUFHLENBQUE7SUFBRSxJQUFNYSxDQUFDLEdBQUcsU0FBSkEsQ0FBQyxDQUFhZCxDQUFDLEVBQUVDLENBQUMsRUFBRTtNQUFFLE9BQU8sQ0FBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBRyxDQUFBO0VBQUUsRUFBQSxJQUFNYyxDQUFDLEdBQUcsU0FBSkEsQ0FBQyxDQUFhZixDQUFDLEVBQUU7RUFBRSxJQUFBLE9BQU9BLENBQUMsR0FBR2MsQ0FBQyxDQUFDZCxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUdXLENBQUMsQ0FBQ1gsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLEVBQUVBLENBQUMsR0FBR2MsQ0FBQyxDQUFDZCxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUdXLENBQUMsQ0FBQ1gsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsR0FBR2MsQ0FBQyxDQUFDZCxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUcsQ0FBQTtFQUFFLEVBQUEsSUFBTWdCLENBQUMsR0FBRyxTQUFBLENBQUEsQ0FBVWhCLENBQUMsRUFBRUMsQ0FBQyxFQUFFO01BQUVBLENBQUMsR0FBR0EsQ0FBQyxJQUFJLENBQUMsQ0FBQTtNQUFFLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUNGLENBQUMsR0FBR0EsQ0FBQyxJQUFJLEVBQUUsRUFBRWlCLE1BQU0sR0FBRyxFQUFFLEVBQUVDLENBQUMsR0FBR2xCLENBQUMsQ0FBQ2lCLE1BQU0sR0FBR2YsQ0FBQyxFQUFFaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFbEIsQ0FBQyxDQUFDLEVBQUVtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUVuQixDQUFDLENBQUMsRUFBRW9CLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRUwsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLEVBQUVDLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsRUFBRUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHTixDQUFDLEVBQUVNLENBQUMsSUFBSSxFQUFFLEVBQUNILENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBR3JCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRVIsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHaEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRUgsQ0FBQyxHQUFHVixDQUFDLENBQUNVLENBQUMsRUFBRUMsQ0FBQyxDQUFDLEVBQUVELENBQUMsR0FBR1QsQ0FBQyxDQUFDUyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUVBLENBQUMsR0FBR1YsQ0FBQyxDQUFDVSxDQUFDLEVBQUVFLENBQUMsQ0FBQyxFQUFFSixDQUFDLEdBQUdMLENBQUMsQ0FBQ0ssQ0FBQyxFQUFFRSxDQUFDLENBQUMsRUFBRUYsQ0FBQyxHQUFHUCxDQUFDLENBQUNPLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRUEsQ0FBQyxHQUFHVCxDQUFDLENBQUNTLENBQUMsRUFBRUMsQ0FBQyxDQUFDLEVBQUVELENBQUMsR0FBR1QsQ0FBQyxDQUFDQyxDQUFDLENBQUNRLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEVBQUVILENBQUMsR0FBR0wsQ0FBQyxDQUFDSyxDQUFDLEVBQUVPLENBQUMsQ0FBQyxFQUFFUCxDQUFDLEdBQUdKLENBQUMsQ0FBQ0ksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFQSxDQUFDLEdBQUdMLENBQUMsQ0FBQ0ssQ0FBQyxFQUFFTSxDQUFDLENBQUMsRUFBRUYsQ0FBQyxHQUFHTixDQUFDLENBQUNNLENBQUMsRUFBRUosQ0FBQyxDQUFDLEVBQUVJLENBQUMsR0FBR1IsQ0FBQyxDQUFDUSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUVBLENBQUMsR0FBR1YsQ0FBQyxDQUFDVSxDQUFDLEVBQUVELENBQUMsQ0FBQyxFQUFFQyxDQUFDLEdBQUdWLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFBO0VBQUUsSUFBQSxRQUFRQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUVMLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRWQsQ0FBQztFQUFJLE1BQUEsS0FBSyxFQUFFO1VBQUVjLENBQUMsR0FBR0YsQ0FBQyxDQUFDRSxDQUFDLEVBQUVILENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRWIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQUUsTUFBQSxLQUFLLEVBQUU7VUFBRVIsQ0FBQyxHQUFHRixDQUFDLENBQUNFLENBQUMsRUFBRUgsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFYixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFBRSxNQUFBLEtBQUssRUFBRTtVQUFFUixDQUFDLEdBQUdGLENBQUMsQ0FBQ0UsQ0FBQyxFQUFFSCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUViLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUFFLE1BQUEsS0FBSyxFQUFFO1VBQUVSLENBQUMsR0FBR0YsQ0FBQyxDQUFDRSxDQUFDLEVBQUVILENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRWIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQUUsTUFBQSxLQUFLLEVBQUU7VUFBRVIsQ0FBQyxHQUFHRixDQUFDLENBQUNFLENBQUMsRUFBRUgsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFYixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFBRSxNQUFBLEtBQUssRUFBRTtVQUFFUixDQUFDLEdBQUdGLENBQUMsQ0FBQ0UsQ0FBQyxFQUFFSCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUViLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVB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LENBQUMsR0FBR0wsQ0FBQyxDQUFDSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUVuQixDQUFDLENBQUNpQixNQUFNLENBQUMsQ0FBQyxFQUFFRyxDQUFDLEdBQUdOLENBQUMsQ0FBQ00sQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFcEIsQ0FBQyxDQUFDaUIsTUFBTSxDQUFDLENBQUMsRUFBRUUsQ0FBQyxHQUFHVCxDQUFDLENBQUNTLENBQUMsRUFBRUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsR0FBR1YsQ0FBQyxDQUFDVSxDQUFDLEVBQUVELENBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUdKLENBQUMsQ0FBQ0ksQ0FBQyxDQUFDLEVBQUVDLENBQUMsR0FBR0wsQ0FBQyxDQUFDSyxDQUFDLENBQUMsRUFBRUQsQ0FBQyxHQUFHVCxDQUFDLENBQUNTLENBQUMsRUFBRUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsR0FBR1YsQ0FBQyxDQUFDVSxDQUFDLEVBQUVELENBQUMsQ0FBQyxFQUFFLFVBQUEsQ0FBQSxNQUFBLENBQVksQ0FBQ0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRU8sUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUlDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQUEsQ0FBQSxNQUFBLENBQVksQ0FBQ1IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRU8sUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUlDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQUEsQ0FBQSxNQUFBLENBQVksQ0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRU0sUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUlDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQUEsQ0FBQSxNQUFBLENBQVksQ0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRU0sUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUlDLEtB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

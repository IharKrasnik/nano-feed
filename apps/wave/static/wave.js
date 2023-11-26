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
            debugger;
            navigator.sendBeacon("".concat(window.WAVE_API_URL || API_URL, "/waveActions/ping"), data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F2ZS5qcyIsInNvdXJjZXMiOlsiLi4vdHJhY2tlci9zcmMvbGliL2ZpbmdlcnByaW50Mi5taW4uanMiLCIuLi90cmFja2VyL3NyYy9saWIvbGlmZWN5Y2xlLmpzIiwiLi4vdHJhY2tlci9zcmMvY29uZmlnLmpzIiwiLi4vdHJhY2tlci9zcmMvaGVscGVycy5qcyIsIi4uL3RyYWNrZXIvc3JjL2FjdGlvbnMvY2xpY2suanMiLCIuLi90cmFja2VyL3NyYy9hY3Rpb25zL3BhZ2VSZXNpemUuanMiLCIuLi90cmFja2VyL3NyYy9hY3Rpb25zL3BhZ2VTY3JvbGxpbmcuanMiLCIuLi90cmFja2VyL3NyYy9hY3Rpb25zL3NpZ251cC5qcyIsIi4uL3RyYWNrZXIvc3JjL2FjdGlvbnMvbW91c2VNb3ZlLmpzIiwiLi4vdHJhY2tlci9zcmMvYWN0aW9ucy9wYXRoQ2hhbmdlLmpzIiwiLi4vdHJhY2tlci9zcmMvYWN0aW9ucy9vbkV4aXQuanMiLCIuLi90cmFja2VyL3NyYy9yZWNvcmRzL211dGF0aW9uLmpzIiwiLi4vdHJhY2tlci9zcmMvcmVjb3Jkcy9vYnNlcnZlci5qcyIsIi4uL3RyYWNrZXIvc3JjL3RyYWNrZXIuanMiLCIuLi90cmFja2VyL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGaW5nZXJwcmludGpzMiAtIENvcHlyaWdodCAoYykgMjAxOSBWYWxlbnRpbiBWYXNpbHlldiAodmFsZW50aW4udmFzaWx5ZXZAb3V0bG9vay5jb20pXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIChodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocCkgbGljZW5zZS5cblxuIShmdW5jdGlvbiAoZSwgdCwgYSkge1xuICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoYSkgOiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cyA/IG1vZHVsZS5leHBvcnRzID0gYSgpIDogdC5leHBvcnRzID8gdC5leHBvcnRzID0gYSgpIDogdC5GaW5nZXJwcmludDIgPSBhKCk7XG59KDAsIHRoaXMsICgpID0+IHtcbiAgY29uc3QgZCA9IGZ1bmN0aW9uIChlLCB0KSB7IGUgPSBbZVswXSA+Pj4gMTYsIDY1NTM1ICYgZVswXSwgZVsxXSA+Pj4gMTYsIDY1NTM1ICYgZVsxXV0sIHQgPSBbdFswXSA+Pj4gMTYsIDY1NTM1ICYgdFswXSwgdFsxXSA+Pj4gMTYsIDY1NTM1ICYgdFsxXV07IGNvbnN0IGEgPSBbMCwgMCwgMCwgMF07IHJldHVybiBhWzNdICs9IGVbM10gKyB0WzNdLCBhWzJdICs9IGFbM10gPj4+IDE2LCBhWzNdICY9IDY1NTM1LCBhWzJdICs9IGVbMl0gKyB0WzJdLCBhWzFdICs9IGFbMl0gPj4+IDE2LCBhWzJdICY9IDY1NTM1LCBhWzFdICs9IGVbMV0gKyB0WzFdLCBhWzBdICs9IGFbMV0gPj4+IDE2LCBhWzFdICY9IDY1NTM1LCBhWzBdICs9IGVbMF0gKyB0WzBdLCBhWzBdICY9IDY1NTM1LCBbYVswXSA8PCAxNiB8IGFbMV0sIGFbMl0gPDwgMTYgfCBhWzNdXTsgfTsgY29uc3QgZyA9IGZ1bmN0aW9uIChlLCB0KSB7IGUgPSBbZVswXSA+Pj4gMTYsIDY1NTM1ICYgZVswXSwgZVsxXSA+Pj4gMTYsIDY1NTM1ICYgZVsxXV0sIHQgPSBbdFswXSA+Pj4gMTYsIDY1NTM1ICYgdFswXSwgdFsxXSA+Pj4gMTYsIDY1NTM1ICYgdFsxXV07IGNvbnN0IGEgPSBbMCwgMCwgMCwgMF07IHJldHVybiBhWzNdICs9IGVbM10gKiB0WzNdLCBhWzJdICs9IGFbM10gPj4+IDE2LCBhWzNdICY9IDY1NTM1LCBhWzJdICs9IGVbMl0gKiB0WzNdLCBhWzFdICs9IGFbMl0gPj4+IDE2LCBhWzJdICY9IDY1NTM1LCBhWzJdICs9IGVbM10gKiB0WzJdLCBhWzFdICs9IGFbMl0gPj4+IDE2LCBhWzJdICY9IDY1NTM1LCBhWzFdICs9IGVbMV0gKiB0WzNdLCBhWzBdICs9IGFbMV0gPj4+IDE2LCBhWzFdICY9IDY1NTM1LCBhWzFdICs9IGVbMl0gKiB0WzJdLCBhWzBdICs9IGFbMV0gPj4+IDE2LCBhWzFdICY9IDY1NTM1LCBhWzFdICs9IGVbM10gKiB0WzFdLCBhWzBdICs9IGFbMV0gPj4+IDE2LCBhWzFdICY9IDY1NTM1LCBhWzBdICs9IGVbMF0gKiB0WzNdICsgZVsxXSAqIHRbMl0gKyBlWzJdICogdFsxXSArIGVbM10gKiB0WzBdLCBhWzBdICY9IDY1NTM1LCBbYVswXSA8PCAxNiB8IGFbMV0sIGFbMl0gPDwgMTYgfCBhWzNdXTsgfTsgY29uc3QgZiA9IGZ1bmN0aW9uIChlLCB0KSB7IHJldHVybiAodCAlPSA2NCkgPT09IDMyID8gW2VbMV0sIGVbMF1dIDogdCA8IDMyID8gW2VbMF0gPDwgdCB8IGVbMV0gPj4+IDMyIC0gdCwgZVsxXSA8PCB0IHwgZVswXSA+Pj4gMzIgLSB0XSA6ICh0IC09IDMyLCBbZVsxXSA8PCB0IHwgZVswXSA+Pj4gMzIgLSB0LCBlWzBdIDw8IHQgfCBlWzFdID4+PiAzMiAtIHRdKTsgfTsgY29uc3QgaCA9IGZ1bmN0aW9uIChlLCB0KSB7IHJldHVybiAodCAlPSA2NCkgPT09IDAgPyBlIDogdCA8IDMyID8gW2VbMF0gPDwgdCB8IGVbMV0gPj4+IDMyIC0gdCwgZVsxXSA8PCB0XSA6IFtlWzFdIDw8IHQgLSAzMiwgMF07IH07IGNvbnN0IG0gPSBmdW5jdGlvbiAoZSwgdCkgeyByZXR1cm4gW2VbMF0gXiB0WzBdLCBlWzFdIF4gdFsxXV07IH07IGNvbnN0IFQgPSBmdW5jdGlvbiAoZSkgeyByZXR1cm4gZSA9IG0oZSwgWzAsIGVbMF0gPj4+IDFdKSwgZSA9IGcoZSwgWzQyODM1NDM1MTEsIDM5ODE4MDY3OTddKSwgZSA9IG0oZSwgWzAsIGVbMF0gPj4+IDFdKSwgZSA9IGcoZSwgWzMzMDE4ODIzNjYsIDQ0NDk4NDQwM10pLCBlID0gbShlLCBbMCwgZVswXSA+Pj4gMV0pOyB9OyBjb25zdCBsID0gZnVuY3Rpb24gKGUsIHQpIHsgdCA9IHQgfHwgMDsgZm9yICh2YXIgYSA9IChlID0gZSB8fCAnJykubGVuZ3RoICUgMTYsIG4gPSBlLmxlbmd0aCAtIGEsIHIgPSBbMCwgdF0sIGkgPSBbMCwgdF0sIG8gPSBbMCwgMF0sIGwgPSBbMCwgMF0sIHMgPSBbMjI3NzczNTMxMywgMjg5NTU5NTA5XSwgYyA9IFsxMjkxMTY5MDkxLCA2NTg4NzExNjddLCB1ID0gMDsgdSA8IG47IHUgKz0gMTYpbyA9IFsyNTUgJiBlLmNoYXJDb2RlQXQodSArIDQpIHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgNSkpIDw8IDggfCAoMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyA2KSkgPDwgMTYgfCAoMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyA3KSkgPDwgMjQsIDI1NSAmIGUuY2hhckNvZGVBdCh1KSB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDEpKSA8PCA4IHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgMikpIDw8IDE2IHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgMykpIDw8IDI0XSwgbCA9IFsyNTUgJiBlLmNoYXJDb2RlQXQodSArIDEyKSB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDEzKSkgPDwgOCB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDE0KSkgPDwgMTYgfCAoMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyAxNSkpIDw8IDI0LCAyNTUgJiBlLmNoYXJDb2RlQXQodSArIDgpIHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgOSkpIDw8IDggfCAoMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyAxMCkpIDw8IDE2IHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgMTEpKSA8PCAyNF0sIG8gPSBnKG8sIHMpLCBvID0gZihvLCAzMSksIG8gPSBnKG8sIGMpLCByID0gbShyLCBvKSwgciA9IGYociwgMjcpLCByID0gZChyLCBpKSwgciA9IGQoZyhyLCBbMCwgNV0pLCBbMCwgMTM5MDIwODgwOV0pLCBsID0gZyhsLCBjKSwgbCA9IGYobCwgMzMpLCBsID0gZyhsLCBzKSwgaSA9IG0oaSwgbCksIGkgPSBmKGksIDMxKSwgaSA9IGQoaSwgciksIGkgPSBkKGcoaSwgWzAsIDVdKSwgWzAsIDk0NDMzMTQ0NV0pOyBzd2l0Y2ggKG8gPSBbMCwgMF0sIGwgPSBbMCwgMF0sIGEpIHsgY2FzZSAxNTogbCA9IG0obCwgaChbMCwgZS5jaGFyQ29kZUF0KHUgKyAxNCldLCA0OCkpOyBjYXNlIDE0OiBsID0gbShsLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDEzKV0sIDQwKSk7IGNhc2UgMTM6IGwgPSBtKGwsIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgMTIpXSwgMzIpKTsgY2FzZSAxMjogbCA9IG0obCwgaChbMCwgZS5jaGFyQ29kZUF0KHUgKyAxMSldLCAyNCkpOyBjYXNlIDExOiBsID0gbShsLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDEwKV0sIDE2KSk7IGNhc2UgMTA6IGwgPSBtKGwsIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgOSldLCA4KSk7IGNhc2UgOTogbCA9IG0obCwgWzAsIGUuY2hhckNvZGVBdCh1ICsgOCldKSwgbCA9IGcobCwgYyksIGwgPSBmKGwsIDMzKSwgbCA9IGcobCwgcyksIGkgPSBtKGksIGwpOyBjYXNlIDg6IG8gPSBtKG8sIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgNyldLCA1NikpOyBjYXNlIDc6IG8gPSBtKG8sIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgNildLCA0OCkpOyBjYXNlIDY6IG8gPSBtKG8sIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgNSldLCA0MCkpOyBjYXNlIDU6IG8gPSBtKG8sIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgNCldLCAzMikpOyBjYXNlIDQ6IG8gPSBtKG8sIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgMyldLCAyNCkpOyBjYXNlIDM6IG8gPSBtKG8sIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgMildLCAxNikpOyBjYXNlIDI6IG8gPSBtKG8sIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgMSldLCA4KSk7IGNhc2UgMTogbyA9IG0obywgWzAsIGUuY2hhckNvZGVBdCh1KV0pLCBvID0gZyhvLCBzKSwgbyA9IGYobywgMzEpLCBvID0gZyhvLCBjKSwgciA9IG0ociwgbyk7IH0gcmV0dXJuIHIgPSBtKHIsIFswLCBlLmxlbmd0aF0pLCBpID0gbShpLCBbMCwgZS5sZW5ndGhdKSwgciA9IGQociwgaSksIGkgPSBkKGksIHIpLCByID0gVChyKSwgaSA9IFQoaSksIHIgPSBkKHIsIGkpLCBpID0gZChpLCByKSwgKGAwMDAwMDAwMCR7KHJbMF0gPj4+IDApLnRvU3RyaW5nKDE2KX1gKS5zbGljZSgtOCkgKyAoYDAwMDAwMDAwJHsoclsxXSA+Pj4gMCkudG9TdHJpbmcoMTYpfWApLnNsaWNlKC04KSArIChgMDAwMDAwMDAkeyhpWzBdID4+PiAwKS50b1N0cmluZygxNil9YCkuc2xpY2UoLTgpICsgKGAwMDAwMDAwMCR7KGlbMV0gPj4+IDApLnRvU3RyaW5nKDE2KX1gKS5zbGljZSgtOCk7IH07IGNvbnN0IGUgPSB7XG4gICAgcHJlcHJvY2Vzc29yOiBudWxsLFxuICAgIGF1ZGlvOiB7IHRpbWVvdXQ6IDFlMywgZXhjbHVkZUlPUzExOiAhMCB9LFxuICAgIGZvbnRzOiB7XG4gICAgICBzd2ZDb250YWluZXJJZDogJ2ZpbmdlcnByaW50anMyJywgc3dmUGF0aDogJ2ZsYXNoL2NvbXBpbGVkL0ZvbnRMaXN0LnN3ZicsIHVzZXJEZWZpbmVkRm9udHM6IFtdLCBleHRlbmRlZEpzRm9udHM6ICExLFxuICAgIH0sXG4gICAgc2NyZWVuOiB7IGRldGVjdFNjcmVlbk9yaWVudGF0aW9uOiAhMCB9LFxuICAgIHBsdWdpbnM6IHsgc29ydFBsdWdpbnNGb3I6IFsvcGFsZW1vb24vaV0sIGV4Y2x1ZGVJRTogITEgfSxcbiAgICBleHRyYUNvbXBvbmVudHM6IFtdLFxuICAgIGV4Y2x1ZGVzOiB7XG4gICAgICBlbnVtZXJhdGVEZXZpY2VzOiAhMCwgcGl4ZWxSYXRpbzogITAsIGRvTm90VHJhY2s6ICEwLCBmb250c0ZsYXNoOiAhMCxcbiAgICB9LFxuICAgIE5PVF9BVkFJTEFCTEU6ICdub3QgYXZhaWxhYmxlJyxcbiAgICBFUlJPUjogJ2Vycm9yJyxcbiAgICBFWENMVURFRDogJ2V4Y2x1ZGVkJyxcbiAgfTsgY29uc3QgYyA9IGZ1bmN0aW9uIChlLCB0KSB7IGlmIChBcnJheS5wcm90b3R5cGUuZm9yRWFjaCAmJiBlLmZvckVhY2ggPT09IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoKWUuZm9yRWFjaCh0KTsgZWxzZSBpZiAoZS5sZW5ndGggPT09ICtlLmxlbmd0aCkgZm9yIChsZXQgYSA9IDAsIG4gPSBlLmxlbmd0aDsgYSA8IG47IGErKyl0KGVbYV0sIGEsIGUpOyBlbHNlIGZvciAoY29uc3QgciBpbiBlKWUuaGFzT3duUHJvcGVydHkocikgJiYgdChlW3JdLCByLCBlKTsgfTsgY29uc3QgcyA9IGZ1bmN0aW9uIChlLCBuKSB7IGNvbnN0IHIgPSBbXTsgcmV0dXJuIGUgPT0gbnVsbCA/IHIgOiBBcnJheS5wcm90b3R5cGUubWFwICYmIGUubWFwID09PSBBcnJheS5wcm90b3R5cGUubWFwID8gZS5tYXAobikgOiAoYyhlLCAoZSwgdCwgYSkgPT4geyByLnB1c2gobihlLCB0LCBhKSk7IH0pLCByKTsgfTsgY29uc3QgYSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5hdmlnYXRvci5tZWRpYURldmljZXMgJiYgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzOyB9OyBjb25zdCBuID0gZnVuY3Rpb24gKGUpIHsgY29uc3QgdCA9IFt3aW5kb3cuc2NyZWVuLndpZHRoLCB3aW5kb3cuc2NyZWVuLmhlaWdodF07IHJldHVybiBlLnNjcmVlbi5kZXRlY3RTY3JlZW5PcmllbnRhdGlvbiAmJiB0LnNvcnQoKS5yZXZlcnNlKCksIHQ7IH07IGNvbnN0IHIgPSBmdW5jdGlvbiAoZSkgeyBpZiAod2luZG93LnNjcmVlbi5hdmFpbFdpZHRoICYmIHdpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQpIHsgY29uc3QgdCA9IFt3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0LCB3aW5kb3cuc2NyZWVuLmF2YWlsV2lkdGhdOyByZXR1cm4gZS5zY3JlZW4uZGV0ZWN0U2NyZWVuT3JpZW50YXRpb24gJiYgdC5zb3J0KCkucmV2ZXJzZSgpLCB0OyB9IHJldHVybiBlLk5PVF9BVkFJTEFCTEU7IH07IGNvbnN0IGkgPSBmdW5jdGlvbiAoZSkgeyBpZiAobmF2aWdhdG9yLnBsdWdpbnMgPT0gbnVsbCkgcmV0dXJuIGUuTk9UX0FWQUlMQUJMRTsgZm9yICh2YXIgdCA9IFtdLCBhID0gMCwgbiA9IG5hdmlnYXRvci5wbHVnaW5zLmxlbmd0aDsgYSA8IG47IGErKyluYXZpZ2F0b3IucGx1Z2luc1thXSAmJiB0LnB1c2gobmF2aWdhdG9yLnBsdWdpbnNbYV0pOyByZXR1cm4gdShlKSAmJiAodCA9IHQuc29ydCgoZSwgdCkgPT4geyByZXR1cm4gZS5uYW1lID4gdC5uYW1lID8gMSA6IGUubmFtZSA8IHQubmFtZSA/IC0xIDogMDsgfSkpLCBzKHQsIChlKSA9PiB7IGNvbnN0IHQgPSBzKGUsIChlKSA9PiB7IHJldHVybiBbZS50eXBlLCBlLnN1ZmZpeGVzXTsgfSk7IHJldHVybiBbZS5uYW1lLCBlLmRlc2NyaXB0aW9uLCB0XTsgfSk7IH07IGNvbnN0IG8gPSBmdW5jdGlvbiAodCkgeyBsZXQgZSA9IFtdOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHdpbmRvdywgJ0FjdGl2ZVhPYmplY3QnKSB8fCAnQWN0aXZlWE9iamVjdCcgaW4gd2luZG93KSB7IGUgPSBzKFsnQWNyb1BERi5QREYnLCAnQWRvZGIuU3RyZWFtJywgJ0FnQ29udHJvbC5BZ0NvbnRyb2wnLCAnRGV2YWxWUlhDdHJsLkRldmFsVlJYQ3RybC4xJywgJ01hY3JvbWVkaWFGbGFzaFBhcGVyLk1hY3JvbWVkaWFGbGFzaFBhcGVyJywgJ01zeG1sMi5ET01Eb2N1bWVudCcsICdNc3htbDIuWE1MSFRUUCcsICdQREYuUGRmQ3RybCcsICdRdWlja1RpbWUuUXVpY2tUaW1lJywgJ1F1aWNrVGltZUNoZWNrT2JqZWN0LlF1aWNrVGltZUNoZWNrLjEnLCAnUmVhbFBsYXllcicsICdSZWFsUGxheWVyLlJlYWxQbGF5ZXIodG0pIEFjdGl2ZVggQ29udHJvbCAoMzItYml0KScsICdSZWFsVmlkZW8uUmVhbFZpZGVvKHRtKSBBY3RpdmVYIENvbnRyb2wgKDMyLWJpdCknLCAnU2NyaXB0aW5nLkRpY3Rpb25hcnknLCAnU1dDdGwuU1dDdGwnLCAnU2hlbGwuVUlIZWxwZXInLCAnU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2gnLCAnU2t5cGUuRGV0ZWN0aW9uJywgJ1REQ0N0bC5URENDdGwnLCAnV01QbGF5ZXIuT0NYJywgJ3Jtb2N4LlJlYWxQbGF5ZXIgRzIgQ29udHJvbCcsICdybW9jeC5SZWFsUGxheWVyIEcyIENvbnRyb2wuMSddLCAoZSkgPT4geyB0cnkgeyByZXR1cm4gbmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KGUpLCBlOyB9IGNhdGNoIChlKSB7IHJldHVybiB0LkVSUk9SOyB9IH0pOyB9IGVsc2UgZS5wdXNoKHQuTk9UX0FWQUlMQUJMRSk7IHJldHVybiBuYXZpZ2F0b3IucGx1Z2lucyAmJiAoZSA9IGUuY29uY2F0KGkodCkpKSwgZTsgfTsgdmFyIHUgPSBmdW5jdGlvbiAoZSkgeyBmb3IgKHZhciB0ID0gITEsIGEgPSAwLCBuID0gZS5wbHVnaW5zLnNvcnRQbHVnaW5zRm9yLmxlbmd0aDsgYSA8IG47IGErKykgeyBjb25zdCByID0gZS5wbHVnaW5zLnNvcnRQbHVnaW5zRm9yW2FdOyBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaChyKSkgeyB0ID0gITA7IGJyZWFrOyB9IH0gcmV0dXJuIHQ7IH07IGNvbnN0IHAgPSBmdW5jdGlvbiAodCkgeyB0cnkgeyByZXR1cm4gISF3aW5kb3cuc2Vzc2lvblN0b3JhZ2U7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIHQuRVJST1I7IH0gfTsgY29uc3QgdiA9IGZ1bmN0aW9uICh0KSB7IHRyeSB7IHJldHVybiAhIXdpbmRvdy5sb2NhbFN0b3JhZ2U7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIHQuRVJST1I7IH0gfTsgY29uc3QgQSA9IGZ1bmN0aW9uICh0KSB7IHRyeSB7IHJldHVybiAhIXdpbmRvdy5pbmRleGVkREI7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIHQuRVJST1I7IH0gfTsgY29uc3QgUyA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBuYXZpZ2F0b3IuaGFyZHdhcmVDb25jdXJyZW5jeSA/IG5hdmlnYXRvci5oYXJkd2FyZUNvbmN1cnJlbmN5IDogZS5OT1RfQVZBSUxBQkxFOyB9OyBjb25zdCBDID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIG5hdmlnYXRvci5jcHVDbGFzcyB8fCBlLk5PVF9BVkFJTEFCTEU7IH07IGNvbnN0IEIgPSBmdW5jdGlvbiAoZSkgeyByZXR1cm4gbmF2aWdhdG9yLnBsYXRmb3JtID8gbmF2aWdhdG9yLnBsYXRmb3JtIDogZS5OT1RfQVZBSUxBQkxFOyB9OyBjb25zdCB3ID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIG5hdmlnYXRvci5kb05vdFRyYWNrID8gbmF2aWdhdG9yLmRvTm90VHJhY2sgOiBuYXZpZ2F0b3IubXNEb05vdFRyYWNrID8gbmF2aWdhdG9yLm1zRG9Ob3RUcmFjayA6IHdpbmRvdy5kb05vdFRyYWNrID8gd2luZG93LmRvTm90VHJhY2sgOiBlLk5PVF9BVkFJTEFCTEU7IH07IGNvbnN0IHQgPSBmdW5jdGlvbiAoKSB7IGxldCB0OyBsZXQgZSA9IDA7IHZvaWQgMCAhPT0gbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID8gZSA9IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA6IHZvaWQgMCAhPT0gbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgJiYgKGUgPSBuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cyk7IHRyeSB7IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdUb3VjaEV2ZW50JyksIHQgPSAhMDsgfSBjYXRjaCAoZSkgeyB0ID0gITE7IH0gcmV0dXJuIFtlLCB0LCAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3ddOyB9OyBjb25zdCB5ID0gZnVuY3Rpb24gKGUpIHsgY29uc3QgdCA9IFtdOyBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7IGEud2lkdGggPSAyZTMsIGEuaGVpZ2h0ID0gMjAwLCBhLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJzsgY29uc3QgbiA9IGEuZ2V0Q29udGV4dCgnMmQnKTsgcmV0dXJuIG4ucmVjdCgwLCAwLCAxMCwgMTApLCBuLnJlY3QoMiwgMiwgNiwgNiksIHQucHVzaChgY2FudmFzIHdpbmRpbmc6JHshMSA9PT0gbi5pc1BvaW50SW5QYXRoKDUsIDUsICdldmVub2RkJykgPyAneWVzJyA6ICdubyd9YCksIG4udGV4dEJhc2VsaW5lID0gJ2FscGhhYmV0aWMnLCBuLmZpbGxTdHlsZSA9ICcjZjYwJywgbi5maWxsUmVjdCgxMjUsIDEsIDYyLCAyMCksIG4uZmlsbFN0eWxlID0gJyMwNjknLCBlLmRvbnRVc2VGYWtlRm9udEluQ2FudmFzID8gbi5mb250ID0gJzExcHQgQXJpYWwnIDogbi5mb250ID0gJzExcHQgbm8tcmVhbC1mb250LTEyMycsIG4uZmlsbFRleHQoJ0N3bSBmam9yZGJhbmsgZ2x5cGhzIHZleHQgcXVpeiwgXFx1ZDgzZFxcdWRlMDMnLCAyLCAxNSksIG4uZmlsbFN0eWxlID0gJ3JnYmEoMTAyLCAyMDQsIDAsIDAuMiknLCBuLmZvbnQgPSAnMThwdCBBcmlhbCcsIG4uZmlsbFRleHQoJ0N3bSBmam9yZGJhbmsgZ2x5cGhzIHZleHQgcXVpeiwgXFx1ZDgzZFxcdWRlMDMnLCA0LCA0NSksIG4uZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ211bHRpcGx5Jywgbi5maWxsU3R5bGUgPSAncmdiKDI1NSwwLDI1NSknLCBuLmJlZ2luUGF0aCgpLCBuLmFyYyg1MCwgNTAsIDUwLCAwLCAyICogTWF0aC5QSSwgITApLCBuLmNsb3NlUGF0aCgpLCBuLmZpbGwoKSwgbi5maWxsU3R5bGUgPSAncmdiKDAsMjU1LDI1NSknLCBuLmJlZ2luUGF0aCgpLCBuLmFyYygxMDAsIDUwLCA1MCwgMCwgMiAqIE1hdGguUEksICEwKSwgbi5jbG9zZVBhdGgoKSwgbi5maWxsKCksIG4uZmlsbFN0eWxlID0gJ3JnYigyNTUsMjU1LDApJywgbi5iZWdpblBhdGgoKSwgbi5hcmMoNzUsIDEwMCwgNTAsIDAsIDIgKiBNYXRoLlBJLCAhMCksIG4uY2xvc2VQYXRoKCksIG4uZmlsbCgpLCBuLmZpbGxTdHlsZSA9ICdyZ2IoMjU1LDAsMjU1KScsIG4uYXJjKDc1LCA3NSwgNzUsIDAsIDIgKiBNYXRoLlBJLCAhMCksIG4uYXJjKDc1LCA3NSwgMjUsIDAsIDIgKiBNYXRoLlBJLCAhMCksIG4uZmlsbCgnZXZlbm9kZCcpLCBhLnRvRGF0YVVSTCAmJiB0LnB1c2goYGNhbnZhcyBmcDoke2EudG9EYXRhVVJMKCl9YCksIHQ7IH07IGNvbnN0IEUgPSBmdW5jdGlvbiAoKSB7IGxldCBvOyBjb25zdCBlID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIG8uY2xlYXJDb2xvcigwLCAwLCAwLCAxKSwgby5lbmFibGUoby5ERVBUSF9URVNUKSwgby5kZXB0aEZ1bmMoby5MRVFVQUwpLCBvLmNsZWFyKG8uQ09MT1JfQlVGRkVSX0JJVCB8IG8uREVQVEhfQlVGRkVSX0JJVCksIGBbJHtlWzBdfSwgJHtlWzFdfV1gOyB9OyBpZiAoIShvID0gRigpKSkgcmV0dXJuIG51bGw7IGNvbnN0IGwgPSBbXTsgY29uc3QgdCA9IG8uY3JlYXRlQnVmZmVyKCk7IG8uYmluZEJ1ZmZlcihvLkFSUkFZX0JVRkZFUiwgdCk7IGNvbnN0IGEgPSBuZXcgRmxvYXQzMkFycmF5KFstMC4yLCAtMC45LCAwLCAwLjQsIC0wLjI2LCAwLCAwLCAwLjczMjEzNDQ0NCwgMF0pOyBvLmJ1ZmZlckRhdGEoby5BUlJBWV9CVUZGRVIsIGEsIG8uU1RBVElDX0RSQVcpLCB0Lml0ZW1TaXplID0gMywgdC5udW1JdGVtcyA9IDM7IGNvbnN0IG4gPSBvLmNyZWF0ZVByb2dyYW0oKTsgY29uc3QgciA9IG8uY3JlYXRlU2hhZGVyKG8uVkVSVEVYX1NIQURFUik7IG8uc2hhZGVyU291cmNlKHIsICdhdHRyaWJ1dGUgdmVjMiBhdHRyVmVydGV4O3ZhcnlpbmcgdmVjMiB2YXJ5aW5UZXhDb29yZGluYXRlO3VuaWZvcm0gdmVjMiB1bmlmb3JtT2Zmc2V0O3ZvaWQgbWFpbigpe3ZhcnlpblRleENvb3JkaW5hdGU9YXR0clZlcnRleCt1bmlmb3JtT2Zmc2V0O2dsX1Bvc2l0aW9uPXZlYzQoYXR0clZlcnRleCwwLDEpO30nKSwgby5jb21waWxlU2hhZGVyKHIpOyBjb25zdCBpID0gby5jcmVhdGVTaGFkZXIoby5GUkFHTUVOVF9TSEFERVIpOyBvLnNoYWRlclNvdXJjZShpLCAncHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7dmFyeWluZyB2ZWMyIHZhcnlpblRleENvb3JkaW5hdGU7dm9pZCBtYWluKCkge2dsX0ZyYWdDb2xvcj12ZWM0KHZhcnlpblRleENvb3JkaW5hdGUsMCwxKTt9JyksIG8uY29tcGlsZVNoYWRlcihpKSwgby5hdHRhY2hTaGFkZXIobiwgciksIG8uYXR0YWNoU2hhZGVyKG4sIGkpLCBvLmxpbmtQcm9ncmFtKG4pLCBvLnVzZVByb2dyYW0obiksIG4udmVydGV4UG9zQXR0cmliID0gby5nZXRBdHRyaWJMb2NhdGlvbihuLCAnYXR0clZlcnRleCcpLCBuLm9mZnNldFVuaWZvcm0gPSBvLmdldFVuaWZvcm1Mb2NhdGlvbihuLCAndW5pZm9ybU9mZnNldCcpLCBvLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KG4udmVydGV4UG9zQXJyYXkpLCBvLnZlcnRleEF0dHJpYlBvaW50ZXIobi52ZXJ0ZXhQb3NBdHRyaWIsIHQuaXRlbVNpemUsIG8uRkxPQVQsICExLCAwLCAwKSwgby51bmlmb3JtMmYobi5vZmZzZXRVbmlmb3JtLCAxLCAxKSwgby5kcmF3QXJyYXlzKG8uVFJJQU5HTEVfU1RSSVAsIDAsIHQubnVtSXRlbXMpOyB0cnkgeyBsLnB1c2goby5jYW52YXMudG9EYXRhVVJMKCkpOyB9IGNhdGNoIChlKSB7fWwucHVzaChgZXh0ZW5zaW9uczokeyhvLmdldFN1cHBvcnRlZEV4dGVuc2lvbnMoKSB8fCBbXSkuam9pbignOycpfWApLCBsLnB1c2goYHdlYmdsIGFsaWFzZWQgbGluZSB3aWR0aCByYW5nZToke2Uoby5nZXRQYXJhbWV0ZXIoby5BTElBU0VEX0xJTkVfV0lEVEhfUkFOR0UpKX1gKSwgbC5wdXNoKGB3ZWJnbCBhbGlhc2VkIHBvaW50IHNpemUgcmFuZ2U6JHtlKG8uZ2V0UGFyYW1ldGVyKG8uQUxJQVNFRF9QT0lOVF9TSVpFX1JBTkdFKSl9YCksIGwucHVzaChgd2ViZ2wgYWxwaGEgYml0czoke28uZ2V0UGFyYW1ldGVyKG8uQUxQSEFfQklUUyl9YCksIGwucHVzaChgd2ViZ2wgYW50aWFsaWFzaW5nOiR7by5nZXRDb250ZXh0QXR0cmlidXRlcygpLmFudGlhbGlhcyA/ICd5ZXMnIDogJ25vJ31gKSwgbC5wdXNoKGB3ZWJnbCBibHVlIGJpdHM6JHtvLmdldFBhcmFtZXRlcihvLkJMVUVfQklUUyl9YCksIGwucHVzaChgd2ViZ2wgZGVwdGggYml0czoke28uZ2V0UGFyYW1ldGVyKG8uREVQVEhfQklUUyl9YCksIGwucHVzaChgd2ViZ2wgZ3JlZW4gYml0czoke28uZ2V0UGFyYW1ldGVyKG8uR1JFRU5fQklUUyl9YCksIGwucHVzaChgd2ViZ2wgbWF4IGFuaXNvdHJvcHk6JHsoZnVuY3Rpb24gKGUpIHsgY29uc3QgdCA9IGUuZ2V0RXh0ZW5zaW9uKCdFWFRfdGV4dHVyZV9maWx0ZXJfYW5pc290cm9waWMnKSB8fCBlLmdldEV4dGVuc2lvbignV0VCS0lUX0VYVF90ZXh0dXJlX2ZpbHRlcl9hbmlzb3Ryb3BpYycpIHx8IGUuZ2V0RXh0ZW5zaW9uKCdNT1pfRVhUX3RleHR1cmVfZmlsdGVyX2FuaXNvdHJvcGljJyk7IGlmICh0KSB7IGxldCBhID0gZS5nZXRQYXJhbWV0ZXIodC5NQVhfVEVYVFVSRV9NQVhfQU5JU09UUk9QWV9FWFQpOyByZXR1cm4gYSA9PT0gMCAmJiAoYSA9IDIpLCBhOyB9IHJldHVybiBudWxsOyB9KG8pKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggY29tYmluZWQgdGV4dHVyZSBpbWFnZSB1bml0czoke28uZ2V0UGFyYW1ldGVyKG8uTUFYX0NPTUJJTkVEX1RFWFRVUkVfSU1BR0VfVU5JVFMpfWApLCBsLnB1c2goYHdlYmdsIG1heCBjdWJlIG1hcCB0ZXh0dXJlIHNpemU6JHtvLmdldFBhcmFtZXRlcihvLk1BWF9DVUJFX01BUF9URVhUVVJFX1NJWkUpfWApLCBsLnB1c2goYHdlYmdsIG1heCBmcmFnbWVudCB1bmlmb3JtIHZlY3RvcnM6JHtvLmdldFBhcmFtZXRlcihvLk1BWF9GUkFHTUVOVF9VTklGT1JNX1ZFQ1RPUlMpfWApLCBsLnB1c2goYHdlYmdsIG1heCByZW5kZXIgYnVmZmVyIHNpemU6JHtvLmdldFBhcmFtZXRlcihvLk1BWF9SRU5ERVJCVUZGRVJfU0laRSl9YCksIGwucHVzaChgd2ViZ2wgbWF4IHRleHR1cmUgaW1hZ2UgdW5pdHM6JHtvLmdldFBhcmFtZXRlcihvLk1BWF9URVhUVVJFX0lNQUdFX1VOSVRTKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggdGV4dHVyZSBzaXplOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfVEVYVFVSRV9TSVpFKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggdmFyeWluZyB2ZWN0b3JzOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfVkFSWUlOR19WRUNUT1JTKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggdmVydGV4IGF0dHJpYnM6JHtvLmdldFBhcmFtZXRlcihvLk1BWF9WRVJURVhfQVRUUklCUyl9YCksIGwucHVzaChgd2ViZ2wgbWF4IHZlcnRleCB0ZXh0dXJlIGltYWdlIHVuaXRzOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfVkVSVEVYX1RFWFRVUkVfSU1BR0VfVU5JVFMpfWApLCBsLnB1c2goYHdlYmdsIG1heCB2ZXJ0ZXggdW5pZm9ybSB2ZWN0b3JzOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfVkVSVEVYX1VOSUZPUk1fVkVDVE9SUyl9YCksIGwucHVzaChgd2ViZ2wgbWF4IHZpZXdwb3J0IGRpbXM6JHtlKG8uZ2V0UGFyYW1ldGVyKG8uTUFYX1ZJRVdQT1JUX0RJTVMpKX1gKSwgbC5wdXNoKGB3ZWJnbCByZWQgYml0czoke28uZ2V0UGFyYW1ldGVyKG8uUkVEX0JJVFMpfWApLCBsLnB1c2goYHdlYmdsIHJlbmRlcmVyOiR7by5nZXRQYXJhbWV0ZXIoby5SRU5ERVJFUil9YCksIGwucHVzaChgd2ViZ2wgc2hhZGluZyBsYW5ndWFnZSB2ZXJzaW9uOiR7by5nZXRQYXJhbWV0ZXIoby5TSEFESU5HX0xBTkdVQUdFX1ZFUlNJT04pfWApLCBsLnB1c2goYHdlYmdsIHN0ZW5jaWwgYml0czoke28uZ2V0UGFyYW1ldGVyKG8uU1RFTkNJTF9CSVRTKX1gKSwgbC5wdXNoKGB3ZWJnbCB2ZW5kb3I6JHtvLmdldFBhcmFtZXRlcihvLlZFTkRPUil9YCksIGwucHVzaChgd2ViZ2wgdmVyc2lvbjoke28uZ2V0UGFyYW1ldGVyKG8uVkVSU0lPTil9YCk7IHRyeSB7IGNvbnN0IHMgPSBvLmdldEV4dGVuc2lvbignV0VCR0xfZGVidWdfcmVuZGVyZXJfaW5mbycpOyBzICYmIChsLnB1c2goYHdlYmdsIHVubWFza2VkIHZlbmRvcjoke28uZ2V0UGFyYW1ldGVyKHMuVU5NQVNLRURfVkVORE9SX1dFQkdMKX1gKSwgbC5wdXNoKGB3ZWJnbCB1bm1hc2tlZCByZW5kZXJlcjoke28uZ2V0UGFyYW1ldGVyKHMuVU5NQVNLRURfUkVOREVSRVJfV0VCR0wpfWApKTsgfSBjYXRjaCAoZSkge30gcmV0dXJuIG8uZ2V0U2hhZGVyUHJlY2lzaW9uRm9ybWF0ICYmIGMoWydGTE9BVCcsICdJTlQnXSwgKGkpID0+IHsgYyhbJ1ZFUlRFWCcsICdGUkFHTUVOVCddLCAocikgPT4geyBjKFsnSElHSCcsICdNRURJVU0nLCAnTE9XJ10sIChuKSA9PiB7IGMoWydwcmVjaXNpb24nLCAncmFuZ2VNaW4nLCAncmFuZ2VNYXgnXSwgKGUpID0+IHsgY29uc3QgdCA9IG8uZ2V0U2hhZGVyUHJlY2lzaW9uRm9ybWF0KG9bYCR7cn1fU0hBREVSYF0sIG9bYCR7bn1fJHtpfWBdKVtlXTsgZSAhPT0gJ3ByZWNpc2lvbicgJiYgKGUgPSBgcHJlY2lzaW9uICR7ZX1gKTsgY29uc3QgYSA9IFsnd2ViZ2wgJywgci50b0xvd2VyQ2FzZSgpLCAnIHNoYWRlciAnLCBuLnRvTG93ZXJDYXNlKCksICcgJywgaS50b0xvd2VyQ2FzZSgpLCAnICcsIGUsICc6JywgdF0uam9pbignJyk7IGwucHVzaChhKTsgfSk7IH0pOyB9KTsgfSksIGw7IH07IGNvbnN0IE0gPSBmdW5jdGlvbiAoKSB7IHRyeSB7IGNvbnN0IGUgPSBGKCk7IGNvbnN0IHQgPSBlLmdldEV4dGVuc2lvbignV0VCR0xfZGVidWdfcmVuZGVyZXJfaW5mbycpOyByZXR1cm4gYCR7ZS5nZXRQYXJhbWV0ZXIodC5VTk1BU0tFRF9WRU5ET1JfV0VCR0wpfX4ke2UuZ2V0UGFyYW1ldGVyKHQuVU5NQVNLRURfUkVOREVSRVJfV0VCR0wpfWA7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIG51bGw7IH0gfTsgY29uc3QgeCA9IGZ1bmN0aW9uICgpIHsgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyBlLmlubmVySFRNTCA9ICcmbmJzcDsnOyBsZXQgdCA9ICEoZS5jbGFzc05hbWUgPSAnYWRzYm94Jyk7IHRyeSB7IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZSksIHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhZHNib3gnKVswXS5vZmZzZXRIZWlnaHQgPT09IDAsIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZSk7IH0gY2F0Y2ggKGUpIHsgdCA9ICExOyB9IHJldHVybiB0OyB9OyBjb25zdCBPID0gZnVuY3Rpb24gKCkgeyBpZiAodm9pZCAwICE9PSBuYXZpZ2F0b3IubGFuZ3VhZ2VzKSB0cnkgeyBpZiAobmF2aWdhdG9yLmxhbmd1YWdlc1swXS5zdWJzdHIoMCwgMikgIT09IG5hdmlnYXRvci5sYW5ndWFnZS5zdWJzdHIoMCwgMikpIHJldHVybiAhMDsgfSBjYXRjaCAoZSkgeyByZXR1cm4gITA7IH0gcmV0dXJuICExOyB9OyBjb25zdCBiID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93LnNjcmVlbi53aWR0aCA8IHdpbmRvdy5zY3JlZW4uYXZhaWxXaWR0aCB8fCB3aW5kb3cuc2NyZWVuLmhlaWdodCA8IHdpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQ7IH07IGNvbnN0IFAgPSBmdW5jdGlvbiAoKSB7IGxldCBlOyBjb25zdCB0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpOyBsZXQgYSA9IG5hdmlnYXRvci5vc2NwdTsgY29uc3QgbiA9IG5hdmlnYXRvci5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpOyBpZiAoZSA9IHQuaW5kZXhPZignd2luZG93cyBwaG9uZScpID49IDAgPyAnV2luZG93cyBQaG9uZScgOiB0LmluZGV4T2YoJ3dpbicpID49IDAgPyAnV2luZG93cycgOiB0LmluZGV4T2YoJ2FuZHJvaWQnKSA+PSAwID8gJ0FuZHJvaWQnIDogdC5pbmRleE9mKCdsaW51eCcpID49IDAgfHwgdC5pbmRleE9mKCdjcm9zJykgPj0gMCA/ICdMaW51eCcgOiB0LmluZGV4T2YoJ2lwaG9uZScpID49IDAgfHwgdC5pbmRleE9mKCdpcGFkJykgPj0gMCA/ICdpT1MnIDogdC5pbmRleE9mKCdtYWMnKSA+PSAwID8gJ01hYycgOiAnT3RoZXInLCAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDAgfHwgbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgPiAwKSAmJiBlICE9PSAnV2luZG93cyBQaG9uZScgJiYgZSAhPT0gJ0FuZHJvaWQnICYmIGUgIT09ICdpT1MnICYmIGUgIT09ICdPdGhlcicpIHJldHVybiAhMDsgaWYgKHZvaWQgMCAhPT0gYSkgeyBpZiAoKGEgPSBhLnRvTG93ZXJDYXNlKCkpLmluZGV4T2YoJ3dpbicpID49IDAgJiYgZSAhPT0gJ1dpbmRvd3MnICYmIGUgIT09ICdXaW5kb3dzIFBob25lJykgcmV0dXJuICEwOyBpZiAoYS5pbmRleE9mKCdsaW51eCcpID49IDAgJiYgZSAhPT0gJ0xpbnV4JyAmJiBlICE9PSAnQW5kcm9pZCcpIHJldHVybiAhMDsgaWYgKGEuaW5kZXhPZignbWFjJykgPj0gMCAmJiBlICE9PSAnTWFjJyAmJiBlICE9PSAnaU9TJykgcmV0dXJuICEwOyBpZiAoKGEuaW5kZXhPZignd2luJykgPT09IC0xICYmIGEuaW5kZXhPZignbGludXgnKSA9PT0gLTEgJiYgYS5pbmRleE9mKCdtYWMnKSA9PT0gLTEpICE9IChlID09PSAnT3RoZXInKSkgcmV0dXJuICEwOyB9IHJldHVybiBuLmluZGV4T2YoJ3dpbicpID49IDAgJiYgZSAhPT0gJ1dpbmRvd3MnICYmIGUgIT09ICdXaW5kb3dzIFBob25lJyB8fCAoKG4uaW5kZXhPZignbGludXgnKSA+PSAwIHx8IG4uaW5kZXhPZignYW5kcm9pZCcpID49IDAgfHwgbi5pbmRleE9mKCdwaWtlJykgPj0gMCkgJiYgZSAhPT0gJ0xpbnV4JyAmJiBlICE9PSAnQW5kcm9pZCcgfHwgKChuLmluZGV4T2YoJ21hYycpID49IDAgfHwgbi5pbmRleE9mKCdpcGFkJykgPj0gMCB8fCBuLmluZGV4T2YoJ2lwb2QnKSA+PSAwIHx8IG4uaW5kZXhPZignaXBob25lJykgPj0gMCkgJiYgZSAhPT0gJ01hYycgJiYgZSAhPT0gJ2lPUycgfHwgKChuLmluZGV4T2YoJ3dpbicpIDwgMCAmJiBuLmluZGV4T2YoJ2xpbnV4JykgPCAwICYmIG4uaW5kZXhPZignbWFjJykgPCAwICYmIG4uaW5kZXhPZignaXBob25lJykgPCAwICYmIG4uaW5kZXhPZignaXBhZCcpIDwgMCkgIT09IChlID09PSAnT3RoZXInKSB8fCB2b2lkIDAgPT09IG5hdmlnYXRvci5wbHVnaW5zICYmIGUgIT09ICdXaW5kb3dzJyAmJiBlICE9PSAnV2luZG93cyBQaG9uZScpKSk7IH07IGNvbnN0IEwgPSBmdW5jdGlvbiAoKSB7IGxldCBlOyBjb25zdCB0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpOyBjb25zdCBhID0gbmF2aWdhdG9yLnByb2R1Y3RTdWI7IGlmICgoKGUgPSB0LmluZGV4T2YoJ2ZpcmVmb3gnKSA+PSAwID8gJ0ZpcmVmb3gnIDogdC5pbmRleE9mKCdvcGVyYScpID49IDAgfHwgdC5pbmRleE9mKCdvcHInKSA+PSAwID8gJ09wZXJhJyA6IHQuaW5kZXhPZignY2hyb21lJykgPj0gMCA/ICdDaHJvbWUnIDogdC5pbmRleE9mKCdzYWZhcmknKSA+PSAwID8gJ1NhZmFyaScgOiB0LmluZGV4T2YoJ3RyaWRlbnQnKSA+PSAwID8gJ0ludGVybmV0IEV4cGxvcmVyJyA6ICdPdGhlcicpID09PSAnQ2hyb21lJyB8fCBlID09PSAnU2FmYXJpJyB8fCBlID09PSAnT3BlcmEnKSAmJiBhICE9PSAnMjAwMzAxMDcnKSByZXR1cm4gITA7IGxldCBuOyBjb25zdCByID0gZXZhbC50b1N0cmluZygpLmxlbmd0aDsgaWYgKHIgPT09IDM3ICYmIGUgIT09ICdTYWZhcmknICYmIGUgIT09ICdGaXJlZm94JyAmJiBlICE9PSAnT3RoZXInKSByZXR1cm4gITA7IGlmIChyID09PSAzOSAmJiBlICE9PSAnSW50ZXJuZXQgRXhwbG9yZXInICYmIGUgIT09ICdPdGhlcicpIHJldHVybiAhMDsgaWYgKHIgPT09IDMzICYmIGUgIT09ICdDaHJvbWUnICYmIGUgIT09ICdPcGVyYScgJiYgZSAhPT0gJ090aGVyJykgcmV0dXJuICEwOyB0cnkgeyB0aHJvdyAnYSc7IH0gY2F0Y2ggKGUpIHsgdHJ5IHsgZS50b1NvdXJjZSgpLCBuID0gITA7IH0gY2F0Y2ggKGUpIHsgbiA9ICExOyB9IH0gcmV0dXJuIG4gJiYgZSAhPT0gJ0ZpcmVmb3gnICYmIGUgIT09ICdPdGhlcic7IH07IGNvbnN0IEkgPSBmdW5jdGlvbiAoKSB7IGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTsgcmV0dXJuICEoIWUuZ2V0Q29udGV4dCB8fCAhZS5nZXRDb250ZXh0KCcyZCcpKTsgfTsgY29uc3QgayA9IGZ1bmN0aW9uICgpIHsgaWYgKCFJKCkpIHJldHVybiAhMTsgY29uc3QgZSA9IEYoKTsgcmV0dXJuICEhd2luZG93LldlYkdMUmVuZGVyaW5nQ29udGV4dCAmJiAhIWU7IH07IGNvbnN0IFIgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuYXZpZ2F0b3IuYXBwTmFtZSA9PT0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlcicgfHwgIShuYXZpZ2F0b3IuYXBwTmFtZSAhPT0gJ05ldHNjYXBlJyB8fCAhL1RyaWRlbnQvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpOyB9OyBjb25zdCBEID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdm9pZCAwICE9PSB3aW5kb3cuc3dmb2JqZWN0OyB9OyBjb25zdCBOID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93LnN3Zm9iamVjdC5oYXNGbGFzaFBsYXllclZlcnNpb24oJzkuMC4wJyk7IH07IGNvbnN0IF8gPSBmdW5jdGlvbiAodCwgZSkgeyBjb25zdCBhID0gJ19fX2ZwX3N3Zl9sb2FkZWQnOyB3aW5kb3dbYV0gPSBmdW5jdGlvbiAoZSkgeyB0KGUpOyB9OyBsZXQgbjsgbGV0IHI7IGNvbnN0IGkgPSBlLmZvbnRzLnN3ZkNvbnRhaW5lcklkOyAociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKS5zZXRBdHRyaWJ1dGUoJ2lkJywgbi5mb250cy5zd2ZDb250YWluZXJJZCksIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocik7IGNvbnN0IG8gPSB7IG9uUmVhZHk6IGEgfTsgd2luZG93LnN3Zm9iamVjdC5lbWJlZFNXRihlLmZvbnRzLnN3ZlBhdGgsIGksICcxJywgJzEnLCAnOS4wLjAnLCAhMSwgbywgeyBhbGxvd1NjcmlwdEFjY2VzczogJ2Fsd2F5cycsIG1lbnU6ICdmYWxzZScgfSwge30pOyB9OyB2YXIgRiA9IGZ1bmN0aW9uICgpIHsgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOyBsZXQgdCA9IG51bGw7IHRyeSB7IHQgPSBlLmdldENvbnRleHQoJ3dlYmdsJykgfHwgZS5nZXRDb250ZXh0KCdleHBlcmltZW50YWwtd2ViZ2wnKTsgfSBjYXRjaCAoZSkge30gcmV0dXJuIHQgfHwgKHQgPSBudWxsKSwgdDsgfTsgY29uc3QgRyA9IFt7IGtleTogJ3VzZXJBZ2VudCcsIGdldERhdGEoZSkgeyBlKG5hdmlnYXRvci51c2VyQWdlbnQpOyB9IH0sIHsga2V5OiAnd2ViZHJpdmVyJywgZ2V0RGF0YShlLCB0KSB7IGUobmF2aWdhdG9yLndlYmRyaXZlciA9PSBudWxsID8gdC5OT1RfQVZBSUxBQkxFIDogbmF2aWdhdG9yLndlYmRyaXZlcik7IH0gfSwgeyBrZXk6ICdsYW5ndWFnZScsIGdldERhdGEoZSwgdCkgeyBlKG5hdmlnYXRvci5sYW5ndWFnZSB8fCBuYXZpZ2F0b3IudXNlckxhbmd1YWdlIHx8IG5hdmlnYXRvci5icm93c2VyTGFuZ3VhZ2UgfHwgbmF2aWdhdG9yLnN5c3RlbUxhbmd1YWdlIHx8IHQuTk9UX0FWQUlMQUJMRSk7IH0gfSwgeyBrZXk6ICdjb2xvckRlcHRoJywgZ2V0RGF0YShlLCB0KSB7IGUod2luZG93LnNjcmVlbi5jb2xvckRlcHRoIHx8IHQuTk9UX0FWQUlMQUJMRSk7IH0gfSwgeyBrZXk6ICdkZXZpY2VNZW1vcnknLCBnZXREYXRhKGUsIHQpIHsgZShuYXZpZ2F0b3IuZGV2aWNlTWVtb3J5IHx8IHQuTk9UX0FWQUlMQUJMRSk7IH0gfSwgeyBrZXk6ICdwaXhlbFJhdGlvJywgZ2V0RGF0YShlLCB0KSB7IGUod2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgdC5OT1RfQVZBSUxBQkxFKTsgfSB9LCB7IGtleTogJ2hhcmR3YXJlQ29uY3VycmVuY3knLCBnZXREYXRhKGUsIHQpIHsgZShTKHQpKTsgfSB9LCB7IGtleTogJ3NjcmVlblJlc29sdXRpb24nLCBnZXREYXRhKGUsIHQpIHsgZShuKHQpKTsgfSB9LCB7IGtleTogJ2F2YWlsYWJsZVNjcmVlblJlc29sdXRpb24nLCBnZXREYXRhKGUsIHQpIHsgZShyKHQpKTsgfSB9LCB7IGtleTogJ3RpbWV6b25lT2Zmc2V0JywgZ2V0RGF0YShlKSB7IGUoKG5ldyBEYXRlKCkpLmdldFRpbWV6b25lT2Zmc2V0KCkpOyB9IH0sIHsga2V5OiAndGltZXpvbmUnLCBnZXREYXRhKGUsIHQpIHsgd2luZG93LkludGwgJiYgd2luZG93LkludGwuRGF0ZVRpbWVGb3JtYXQgPyBlKChuZXcgd2luZG93LkludGwuRGF0ZVRpbWVGb3JtYXQoKSkucmVzb2x2ZWRPcHRpb25zKCkudGltZVpvbmUpIDogZSh0Lk5PVF9BVkFJTEFCTEUpOyB9IH0sIHsga2V5OiAnc2Vzc2lvblN0b3JhZ2UnLCBnZXREYXRhKGUsIHQpIHsgZShwKHQpKTsgfSB9LCB7IGtleTogJ2xvY2FsU3RvcmFnZScsIGdldERhdGEoZSwgdCkgeyBlKHYodCkpOyB9IH0sIHsga2V5OiAnaW5kZXhlZERiJywgZ2V0RGF0YShlLCB0KSB7IGUoQSh0KSk7IH0gfSwgeyBrZXk6ICdhZGRCZWhhdmlvcicsIGdldERhdGEoZSkgeyBlKCEoIWRvY3VtZW50LmJvZHkgfHwgIWRvY3VtZW50LmJvZHkuYWRkQmVoYXZpb3IpKTsgfSB9LCB7IGtleTogJ29wZW5EYXRhYmFzZScsIGdldERhdGEoZSkgeyBlKCEhd2luZG93Lm9wZW5EYXRhYmFzZSk7IH0gfSwgeyBrZXk6ICdjcHVDbGFzcycsIGdldERhdGEoZSwgdCkgeyBlKEModCkpOyB9IH0sIHsga2V5OiAncGxhdGZvcm0nLCBnZXREYXRhKGUsIHQpIHsgZShCKHQpKTsgfSB9LCB7IGtleTogJ2RvTm90VHJhY2snLCBnZXREYXRhKGUsIHQpIHsgZSh3KHQpKTsgfSB9LCB7IGtleTogJ3BsdWdpbnMnLCBnZXREYXRhKGUsIHQpIHsgUigpID8gdC5wbHVnaW5zLmV4Y2x1ZGVJRSA/IGUodC5FWENMVURFRCkgOiBlKG8odCkpIDogZShpKHQpKTsgfSB9LCB7IGtleTogJ2NhbnZhcycsIGdldERhdGEoZSwgdCkgeyBJKCkgPyBlKHkodCkpIDogZSh0Lk5PVF9BVkFJTEFCTEUpOyB9IH0sIHsga2V5OiAnd2ViZ2wnLCBnZXREYXRhKGUsIHQpIHsgaygpID8gZShFKCkpIDogZSh0Lk5PVF9BVkFJTEFCTEUpOyB9IH0sIHsga2V5OiAnd2ViZ2xWZW5kb3JBbmRSZW5kZXJlcicsIGdldERhdGEoZSkgeyBrKCkgPyBlKE0oKSkgOiBlKCk7IH0gfSwgeyBrZXk6ICdhZEJsb2NrJywgZ2V0RGF0YShlKSB7IGUoeCgpKTsgfSB9LCB7IGtleTogJ2hhc0xpZWRMYW5ndWFnZXMnLCBnZXREYXRhKGUpIHsgZShPKCkpOyB9IH0sIHsga2V5OiAnaGFzTGllZFJlc29sdXRpb24nLCBnZXREYXRhKGUpIHsgZShiKCkpOyB9IH0sIHsga2V5OiAnaGFzTGllZE9zJywgZ2V0RGF0YShlKSB7IGUoUCgpKTsgfSB9LCB7IGtleTogJ2hhc0xpZWRCcm93c2VyJywgZ2V0RGF0YShlKSB7IGUoTCgpKTsgfSB9LCB7IGtleTogJ3RvdWNoU3VwcG9ydCcsIGdldERhdGEoZSkgeyBlKHQoKSk7IH0gfSwgeyBrZXk6ICdmb250cycsIGdldERhdGEoZSwgdCkgeyBjb25zdCB1ID0gWydtb25vc3BhY2UnLCAnc2Fucy1zZXJpZicsICdzZXJpZiddOyBsZXQgZCA9IFsnQW5kYWxlIE1vbm8nLCAnQXJpYWwnLCAnQXJpYWwgQmxhY2snLCAnQXJpYWwgSGVicmV3JywgJ0FyaWFsIE1UJywgJ0FyaWFsIE5hcnJvdycsICdBcmlhbCBSb3VuZGVkIE1UIEJvbGQnLCAnQXJpYWwgVW5pY29kZSBNUycsICdCaXRzdHJlYW0gVmVyYSBTYW5zIE1vbm8nLCAnQm9vayBBbnRpcXVhJywgJ0Jvb2ttYW4gT2xkIFN0eWxlJywgJ0NhbGlicmknLCAnQ2FtYnJpYScsICdDYW1icmlhIE1hdGgnLCAnQ2VudHVyeScsICdDZW50dXJ5IEdvdGhpYycsICdDZW50dXJ5IFNjaG9vbGJvb2snLCAnQ29taWMgU2FucycsICdDb21pYyBTYW5zIE1TJywgJ0NvbnNvbGFzJywgJ0NvdXJpZXInLCAnQ291cmllciBOZXcnLCAnR2VuZXZhJywgJ0dlb3JnaWEnLCAnSGVsdmV0aWNhJywgJ0hlbHZldGljYSBOZXVlJywgJ0ltcGFjdCcsICdMdWNpZGEgQnJpZ2h0JywgJ0x1Y2lkYSBDYWxsaWdyYXBoeScsICdMdWNpZGEgQ29uc29sZScsICdMdWNpZGEgRmF4JywgJ0xVQ0lEQSBHUkFOREUnLCAnTHVjaWRhIEhhbmR3cml0aW5nJywgJ0x1Y2lkYSBTYW5zJywgJ0x1Y2lkYSBTYW5zIFR5cGV3cml0ZXInLCAnTHVjaWRhIFNhbnMgVW5pY29kZScsICdNaWNyb3NvZnQgU2FucyBTZXJpZicsICdNb25hY28nLCAnTW9ub3R5cGUgQ29yc2l2YScsICdNUyBHb3RoaWMnLCAnTVMgT3V0bG9vaycsICdNUyBQR290aGljJywgJ01TIFJlZmVyZW5jZSBTYW5zIFNlcmlmJywgJ01TIFNhbnMgU2VyaWYnLCAnTVMgU2VyaWYnLCAnTVlSSUFEJywgJ01ZUklBRCBQUk8nLCAnUGFsYXRpbm8nLCAnUGFsYXRpbm8gTGlub3R5cGUnLCAnU2Vnb2UgUHJpbnQnLCAnU2Vnb2UgU2NyaXB0JywgJ1NlZ29lIFVJJywgJ1NlZ29lIFVJIExpZ2h0JywgJ1NlZ29lIFVJIFNlbWlib2xkJywgJ1NlZ29lIFVJIFN5bWJvbCcsICdUYWhvbWEnLCAnVGltZXMnLCAnVGltZXMgTmV3IFJvbWFuJywgJ1RpbWVzIE5ldyBSb21hbiBQUycsICdUcmVidWNoZXQgTVMnLCAnVmVyZGFuYScsICdXaW5nZGluZ3MnLCAnV2luZ2RpbmdzIDInLCAnV2luZ2RpbmdzIDMnXTsgdC5mb250cy5leHRlbmRlZEpzRm9udHMgJiYgKGQgPSBkLmNvbmNhdChbJ0FiYWRpIE1UIENvbmRlbnNlZCBMaWdodCcsICdBY2FkZW15IEVuZ3JhdmVkIExFVCcsICdBRE9CRSBDQVNMT04gUFJPJywgJ0Fkb2JlIEdhcmFtb25kJywgJ0FET0JFIEdBUkFNT05EIFBSTycsICdBZ2VuY3kgRkInLCAnQWhhcm9uaScsICdBbGJlcnR1cyBFeHRyYSBCb2xkJywgJ0FsYmVydHVzIE1lZGl1bScsICdBbGdlcmlhbicsICdBbWF6b25lIEJUJywgJ0FtZXJpY2FuIFR5cGV3cml0ZXInLCAnQW1lcmljYW4gVHlwZXdyaXRlciBDb25kZW5zZWQnLCAnQW1lclR5cGUgTWQgQlQnLCAnQW5kYWx1cycsICdBbmdzYW5hIE5ldycsICdBbmdzYW5hVVBDJywgJ0FudGlxdWUgT2xpdmUnLCAnQXBhcmFqaXRhJywgJ0FwcGxlIENoYW5jZXJ5JywgJ0FwcGxlIENvbG9yIEVtb2ppJywgJ0FwcGxlIFNEIEdvdGhpYyBOZW8nLCAnQXJhYmljIFR5cGVzZXR0aW5nJywgJ0FSQ0hFUicsICdBUk5PIFBSTycsICdBcnJ1cyBCVCcsICdBdXJvcmEgQ24gQlQnLCAnQXZhbnRHYXJkZSBCayBCVCcsICdBdmFudEdhcmRlIE1kIEJUJywgJ0FWRU5JUicsICdBeXV0aGF5YScsICdCYW5keScsICdCYW5nbGEgU2FuZ2FtIE1OJywgJ0JhbmsgR290aGljJywgJ0JhbmtHb3RoaWMgTWQgQlQnLCAnQmFza2VydmlsbGUnLCAnQmFza2VydmlsbGUgT2xkIEZhY2UnLCAnQmF0YW5nJywgJ0JhdGFuZ0NoZScsICdCYXVlciBCb2RvbmknLCAnQmF1aGF1cyA5MycsICdCYXpvb2thJywgJ0JlbGwgTVQnLCAnQmVtYm8nLCAnQmVuZ3VpYXQgQmsgQlQnLCAnQmVybGluIFNhbnMgRkInLCAnQmVybGluIFNhbnMgRkIgRGVtaScsICdCZXJuYXJkIE1UIENvbmRlbnNlZCcsICdCZXJuaGFyZEZhc2hpb24gQlQnLCAnQmVybmhhcmRNb2QgQlQnLCAnQmlnIENhc2xvbicsICdCaW5uZXJEJywgJ0JsYWNrYWRkZXIgSVRDJywgJ0JsYWlyTWRJVEMgVFQnLCAnQm9kb25pIDcyJywgJ0JvZG9uaSA3MiBPbGRzdHlsZScsICdCb2RvbmkgNzIgU21hbGxjYXBzJywgJ0JvZG9uaSBNVCcsICdCb2RvbmkgTVQgQmxhY2snLCAnQm9kb25pIE1UIENvbmRlbnNlZCcsICdCb2RvbmkgTVQgUG9zdGVyIENvbXByZXNzZWQnLCAnQm9va3NoZWxmIFN5bWJvbCA3JywgJ0JvdWxkZXInLCAnQnJhZGxleSBIYW5kJywgJ0JyYWRsZXkgSGFuZCBJVEMnLCAnQnJlbWVuIEJkIEJUJywgJ0JyaXRhbm5pYyBCb2xkJywgJ0Jyb2Fkd2F5JywgJ0Jyb3dhbGxpYSBOZXcnLCAnQnJvd2FsbGlhVVBDJywgJ0JydXNoIFNjcmlwdCBNVCcsICdDYWxpZm9ybmlhbiBGQicsICdDYWxpc3RvIE1UJywgJ0NhbGxpZ3JhcGhlcicsICdDYW5kYXJhJywgJ0Nhc2xvbk9wbmZhY2UgQlQnLCAnQ2FzdGVsbGFyJywgJ0NlbnRhdXInLCAnQ2V6YW5uZScsICdDRyBPbWVnYScsICdDRyBUaW1lcycsICdDaGFsa2JvYXJkJywgJ0NoYWxrYm9hcmQgU0UnLCAnQ2hhbGtkdXN0ZXInLCAnQ2hhcmxlc3dvcnRoJywgJ0NoYXJ0ZXIgQmQgQlQnLCAnQ2hhcnRlciBCVCcsICdDaGF1Y2VyJywgJ0NoZWx0aG1JVEMgQmsgQlQnLCAnQ2hpbGxlcicsICdDbGFyZW5kb24nLCAnQ2xhcmVuZG9uIENvbmRlbnNlZCcsICdDbG9pc3RlckJsYWNrIEJUJywgJ0NvY2hpbicsICdDb2xvbm5hIE1UJywgJ0NvbnN0YW50aWEnLCAnQ29vcGVyIEJsYWNrJywgJ0NvcHBlcnBsYXRlJywgJ0NvcHBlcnBsYXRlIEdvdGhpYycsICdDb3BwZXJwbGF0ZSBHb3RoaWMgQm9sZCcsICdDb3BwZXJwbGF0ZSBHb3RoaWMgTGlnaHQnLCAnQ29wcGVycGxHb3RoIEJkIEJUJywgJ0NvcmJlbCcsICdDb3JkaWEgTmV3JywgJ0NvcmRpYVVQQycsICdDb3JuZXJzdG9uZScsICdDb3JvbmV0JywgJ0N1Y2tvbycsICdDdXJseiBNVCcsICdEYXVuUGVuaCcsICdEYXVwaGluJywgJ0RhdmlkJywgJ0RCIExDRCBUZW1wJywgJ0RFTElDSU9VUycsICdEZW5tYXJrJywgJ0RGS2FpLVNCJywgJ0RpZG90JywgJ0RpbGxlbmlhVVBDJywgJ0RJTicsICdEb2tDaGFtcGEnLCAnRG90dW0nLCAnRG90dW1DaGUnLCAnRWJyaW1hJywgJ0Vkd2FyZGlhbiBTY3JpcHQgSVRDJywgJ0VsZXBoYW50JywgJ0VuZ2xpc2ggMTExIFZpdmFjZSBCVCcsICdFbmdyYXZlcnMgTVQnLCAnRW5ncmF2ZXJzR290aGljIEJUJywgJ0VyYXMgQm9sZCBJVEMnLCAnRXJhcyBEZW1pIElUQycsICdFcmFzIExpZ2h0IElUQycsICdFcmFzIE1lZGl1bSBJVEMnLCAnRXVjcm9zaWFVUEMnLCAnRXVwaGVtaWEnLCAnRXVwaGVtaWEgVUNBUycsICdFVVJPU1RJTEUnLCAnRXhvdGMzNTAgQmQgQlQnLCAnRmFuZ1NvbmcnLCAnRmVsaXggVGl0bGluZycsICdGaXhlZHN5cycsICdGT05USU4nLCAnRm9vdGxpZ2h0IE1UIExpZ2h0JywgJ0ZvcnRlJywgJ0ZyYW5rUnVlaGwnLCAnRnJhbnNpc2NhbicsICdGcmVlZnJtNzIxIEJsayBCVCcsICdGcmVlc2lhVVBDJywgJ0ZyZWVzdHlsZSBTY3JpcHQnLCAnRnJlbmNoIFNjcmlwdCBNVCcsICdGcm5rR290aElUQyBCayBCVCcsICdGcnVpdGdlcicsICdGUlVUSUdFUicsICdGdXR1cmEnLCAnRnV0dXJhIEJrIEJUJywgJ0Z1dHVyYSBMdCBCVCcsICdGdXR1cmEgTWQgQlQnLCAnRnV0dXJhIFpCbGsgQlQnLCAnRnV0dXJhQmxhY2sgQlQnLCAnR2FicmlvbGEnLCAnR2FsbGlhcmQgQlQnLCAnR2F1dGFtaScsICdHZWV6YSBQcm8nLCAnR2VvbWV0cjIzMSBCVCcsICdHZW9tZXRyMjMxIEh2IEJUJywgJ0dlb21ldHIyMzEgTHQgQlQnLCAnR2VvU2xhYiA3MDMgTHQgQlQnLCAnR2VvU2xhYiA3MDMgWEJkIEJUJywgJ0dpZ2knLCAnR2lsbCBTYW5zJywgJ0dpbGwgU2FucyBNVCcsICdHaWxsIFNhbnMgTVQgQ29uZGVuc2VkJywgJ0dpbGwgU2FucyBNVCBFeHQgQ29uZGVuc2VkIEJvbGQnLCAnR2lsbCBTYW5zIFVsdHJhIEJvbGQnLCAnR2lsbCBTYW5zIFVsdHJhIEJvbGQgQ29uZGVuc2VkJywgJ0dpc2hhJywgJ0dsb3VjZXN0ZXIgTVQgRXh0cmEgQ29uZGVuc2VkJywgJ0dPVEhBTScsICdHT1RIQU0gQk9MRCcsICdHb3VkeSBPbGQgU3R5bGUnLCAnR291ZHkgU3RvdXQnLCAnR291ZHlIYW5kdG9vbGVkIEJUJywgJ0dvdWR5T0xTdCBCVCcsICdHdWphcmF0aSBTYW5nYW0gTU4nLCAnR3VsaW0nLCAnR3VsaW1DaGUnLCAnR3VuZ3N1aCcsICdHdW5nc3VoQ2hlJywgJ0d1cm11a2hpIE1OJywgJ0hhZXR0ZW5zY2h3ZWlsZXInLCAnSGFybG93IFNvbGlkIEl0YWxpYycsICdIYXJyaW5ndG9uJywgJ0hlYXRoZXInLCAnSGVpdGkgU0MnLCAnSGVpdGkgVEMnLCAnSEVMVicsICdIZXJhbGQnLCAnSGlnaCBUb3dlciBUZXh0JywgJ0hpcmFnaW5vIEtha3UgR290aGljIFByb04nLCAnSGlyYWdpbm8gTWluY2hvIFByb04nLCAnSG9lZmxlciBUZXh0JywgJ0h1bWFuc3QgNTIxIENuIEJUJywgJ0h1bWFuc3Q1MjEgQlQnLCAnSHVtYW5zdDUyMSBMdCBCVCcsICdJbXByaW50IE1UIFNoYWRvdycsICdJbmNpc2VkOTAxIEJkIEJUJywgJ0luY2lzZWQ5MDEgQlQnLCAnSW5jaXNlZDkwMSBMdCBCVCcsICdJTkNPTlNPTEFUQScsICdJbmZvcm1hbCBSb21hbicsICdJbmZvcm1hbDAxMSBCVCcsICdJTlRFUlNUQVRFJywgJ0lyaXNVUEMnLCAnSXNrb29sYSBQb3RhJywgJ0phc21pbmVVUEMnLCAnSmF6eiBMRVQnLCAnSmVuc29uJywgJ0plc3RlcicsICdKb2tlcm1hbicsICdKdWljZSBJVEMnLCAnS2FiZWwgQmsgQlQnLCAnS2FiZWwgVWx0IEJUJywgJ0thaWxhc2EnLCAnS2FpVGknLCAnS2FsaW5nYScsICdLYW5uYWRhIFNhbmdhbSBNTicsICdLYXJ0aWthJywgJ0thdWZtYW5uIEJkIEJUJywgJ0thdWZtYW5uIEJUJywgJ0tobWVyIFVJJywgJ0tvZGNoaWFuZ1VQQycsICdLb2tpbGEnLCAnS29yaW5uYSBCVCcsICdLcmlzdGVuIElUQycsICdLcnVuZ3RoZXAnLCAnS3Vuc3RsZXIgU2NyaXB0JywgJ0xhbyBVSScsICdMYXRoYScsICdMZWVsYXdhZGVlJywgJ0xldHRlciBHb3RoaWMnLCAnTGV2ZW5pbSBNVCcsICdMaWx5VVBDJywgJ0xpdGhvZ3JhcGgnLCAnTGl0aG9ncmFwaCBMaWdodCcsICdMb25nIElzbGFuZCcsICdMeWRpYW4gQlQnLCAnTWFnbmV0bycsICdNYWlhbmRyYSBHRCcsICdNYWxheWFsYW0gU2FuZ2FtIE1OJywgJ01hbGd1biBHb3RoaWMnLCAnTWFuZ2FsJywgJ01hcmlnb2xkJywgJ01hcmlvbicsICdNYXJrZXIgRmVsdCcsICdNYXJrZXQnLCAnTWFybGV0dCcsICdNYXRpc3NlIElUQycsICdNYXR1cmEgTVQgU2NyaXB0IENhcGl0YWxzJywgJ01laXJ5bycsICdNZWlyeW8gVUknLCAnTWljcm9zb2Z0IEhpbWFsYXlhJywgJ01pY3Jvc29mdCBKaGVuZ0hlaScsICdNaWNyb3NvZnQgTmV3IFRhaSBMdWUnLCAnTWljcm9zb2Z0IFBoYWdzUGEnLCAnTWljcm9zb2Z0IFRhaSBMZScsICdNaWNyb3NvZnQgVWlnaHVyJywgJ01pY3Jvc29mdCBZYUhlaScsICdNaWNyb3NvZnQgWWkgQmFpdGknLCAnTWluZ0xpVScsICdNaW5nTGlVX0hLU0NTJywgJ01pbmdMaVVfSEtTQ1MtRXh0QicsICdNaW5nTGlVLUV4dEInLCAnTWluaW9uJywgJ01pbmlvbiBQcm8nLCAnTWlyaWFtJywgJ01pcmlhbSBGaXhlZCcsICdNaXN0cmFsJywgJ01vZGVybicsICdNb2Rlcm4gTm8uIDIwJywgJ01vbmEgTGlzYSBTb2xpZCBJVEMgVFQnLCAnTW9uZ29saWFuIEJhaXRpJywgJ01PTk8nLCAnTW9vbEJvcmFuJywgJ01ycyBFYXZlcycsICdNUyBMaW5lRHJhdycsICdNUyBNaW5jaG8nLCAnTVMgUE1pbmNobycsICdNUyBSZWZlcmVuY2UgU3BlY2lhbHR5JywgJ01TIFVJIEdvdGhpYycsICdNVCBFeHRyYScsICdNVVNFTycsICdNViBCb2xpJywgJ05hZGVlbScsICdOYXJraXNpbScsICdORVZJUycsICdOZXdzIEdvdGhpYycsICdOZXdzIEdvdGhpY01UJywgJ05ld3NHb3RoIEJUJywgJ05pYWdhcmEgRW5ncmF2ZWQnLCAnTmlhZ2FyYSBTb2xpZCcsICdOb3Rld29ydGh5JywgJ05TaW1TdW4nLCAnTnlhbGEnLCAnT0NSIEEgRXh0ZW5kZWQnLCAnT2xkIENlbnR1cnknLCAnT2xkIEVuZ2xpc2ggVGV4dCBNVCcsICdPbnl4JywgJ09ueXggQlQnLCAnT1BUSU1BJywgJ09yaXlhIFNhbmdhbSBNTicsICdPU0FLQScsICdPekhhbmRpY3JhZnQgQlQnLCAnUGFsYWNlIFNjcmlwdCBNVCcsICdQYXB5cnVzJywgJ1BhcmNobWVudCcsICdQYXJ0eSBMRVQnLCAnUGVnYXN1cycsICdQZXJwZXR1YScsICdQZXJwZXR1YSBUaXRsaW5nIE1UJywgJ1BldGl0YUJvbGQnLCAnUGlja3dpY2snLCAnUGxhbnRhZ2VuZXQgQ2hlcm9rZWUnLCAnUGxheWJpbGwnLCAnUE1pbmdMaVUnLCAnUE1pbmdMaVUtRXh0QicsICdQb29yIFJpY2hhcmQnLCAnUG9zdGVyJywgJ1Bvc3RlckJvZG9uaSBCVCcsICdQUklOQ0VUT1dOIExFVCcsICdQcmlzdGluYScsICdQVEJhcm51bSBCVCcsICdQeXRoYWdvcmFzJywgJ1JhYXZpJywgJ1JhZ2UgSXRhbGljJywgJ1JhdmllJywgJ1JpYmJvbjEzMSBCZCBCVCcsICdSb2Nrd2VsbCcsICdSb2Nrd2VsbCBDb25kZW5zZWQnLCAnUm9ja3dlbGwgRXh0cmEgQm9sZCcsICdSb2QnLCAnUm9tYW4nLCAnU2Fra2FsIE1hamFsbGEnLCAnU2FudGEgRmUgTEVUJywgJ1Nhdm95ZSBMRVQnLCAnU2NlcHRyZScsICdTY3JpcHQnLCAnU2NyaXB0IE1UIEJvbGQnLCAnU0NSSVBUSU5BJywgJ1NlcmlmYScsICdTZXJpZmEgQlQnLCAnU2VyaWZhIFRoIEJUJywgJ1NoZWxsZXlWb2xhbnRlIEJUJywgJ1NoZXJ3b29kJywgJ1Nob25hciBCYW5nbGEnLCAnU2hvd2NhcmQgR290aGljJywgJ1NocnV0aScsICdTaWduYm9hcmQnLCAnU0lMS1NDUkVFTicsICdTaW1IZWknLCAnU2ltcGxpZmllZCBBcmFiaWMnLCAnU2ltcGxpZmllZCBBcmFiaWMgRml4ZWQnLCAnU2ltU3VuJywgJ1NpbVN1bi1FeHRCJywgJ1NpbmhhbGEgU2FuZ2FtIE1OJywgJ1NrZXRjaCBSb2Nrd2VsbCcsICdTa2lhJywgJ1NtYWxsIEZvbnRzJywgJ1NuYXAgSVRDJywgJ1NuZWxsIFJvdW5kaGFuZCcsICdTb2NrZXQnLCAnU291dmVuaXIgTHQgQlQnLCAnU3RhY2NhdG8yMjIgQlQnLCAnU3RlYW1lcicsICdTdGVuY2lsJywgJ1N0b3J5Ym9vaycsICdTdHlsbG8nLCAnU3Vid2F5JywgJ1N3aXM3MjEgQmxrRXggQlQnLCAnU3dpc3M5MTEgWENtIEJUJywgJ1N5bGZhZW4nLCAnU3luY2hybyBMRVQnLCAnU3lzdGVtJywgJ1RhbWlsIFNhbmdhbSBNTicsICdUZWNobmljYWwnLCAnVGVsZXR5cGUnLCAnVGVsdWd1IFNhbmdhbSBNTicsICdUZW1wdXMgU2FucyBJVEMnLCAnVGVybWluYWwnLCAnVGhvbmJ1cmknLCAnVHJhZGl0aW9uYWwgQXJhYmljJywgJ1RyYWphbicsICdUUkFKQU4gUFJPJywgJ1RyaXN0YW4nLCAnVHVidWxhcicsICdUdW5nYScsICdUdyBDZW4gTVQnLCAnVHcgQ2VuIE1UIENvbmRlbnNlZCcsICdUdyBDZW4gTVQgQ29uZGVuc2VkIEV4dHJhIEJvbGQnLCAnVHlwb1VwcmlnaHQgQlQnLCAnVW5pY29ybicsICdVbml2ZXJzJywgJ1VuaXZlcnMgQ0UgNTUgTWVkaXVtJywgJ1VuaXZlcnMgQ29uZGVuc2VkJywgJ1V0c2FhaCcsICdWYWdhYm9uZCcsICdWYW5pJywgJ1ZpamF5YScsICdWaW5lciBIYW5kIElUQycsICdWaXN1YWxVSScsICdWaXZhbGRpJywgJ1ZsYWRpbWlyIFNjcmlwdCcsICdWcmluZGEnLCAnV2VzdG1pbnN0ZXInLCAnV0hJVE5FWScsICdXaWRlIExhdGluJywgJ1phcGZFbGxpcHQgQlQnLCAnWmFwZkh1bW5zdCBCVCcsICdaYXBmSHVtbnN0IERtIEJUJywgJ1phcGZpbm8nLCAnWnVyaWNoIEJsa0V4IEJUJywgJ1p1cmljaCBFeCBCVCcsICdaV0Fkb2JlRiddKSk7IGQgPSAoZCA9IGQuY29uY2F0KHQuZm9udHMudXNlckRlZmluZWRGb250cykpLmZpbHRlcigoZSwgdCkgPT4geyByZXR1cm4gZC5pbmRleE9mKGUpID09PSB0OyB9KTsgY29uc3QgYSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07IGNvbnN0IHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgY29uc3QgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyBjb25zdCBuID0ge307IGNvbnN0IGkgPSB7fTsgY29uc3QgZiA9IGZ1bmN0aW9uICgpIHsgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTsgcmV0dXJuIGUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnLCBlLnN0eWxlLmxlZnQgPSAnLTk5OTlweCcsIGUuc3R5bGUuZm9udFNpemUgPSAnNzJweCcsIGUuc3R5bGUuZm9udFN0eWxlID0gJ25vcm1hbCcsIGUuc3R5bGUuZm9udFdlaWdodCA9ICdub3JtYWwnLCBlLnN0eWxlLmxldHRlclNwYWNpbmcgPSAnbm9ybWFsJywgZS5zdHlsZS5saW5lQnJlYWsgPSAnYXV0bycsIGUuc3R5bGUubGluZUhlaWdodCA9ICdub3JtYWwnLCBlLnN0eWxlLnRleHRUcmFuc2Zvcm0gPSAnbm9uZScsIGUuc3R5bGUudGV4dEFsaWduID0gJ2xlZnQnLCBlLnN0eWxlLnRleHREZWNvcmF0aW9uID0gJ25vbmUnLCBlLnN0eWxlLnRleHRTaGFkb3cgPSAnbm9uZScsIGUuc3R5bGUud2hpdGVTcGFjZSA9ICdub3JtYWwnLCBlLnN0eWxlLndvcmRCcmVhayA9ICdub3JtYWwnLCBlLnN0eWxlLndvcmRTcGFjaW5nID0gJ25vcm1hbCcsIGUuaW5uZXJIVE1MID0gJ21tbW1tbW1tbW1sbGknLCBlOyB9OyBjb25zdCBvID0gZnVuY3Rpb24gKGUpIHsgZm9yICh2YXIgdCA9ICExLCBhID0gMDsgYSA8IHUubGVuZ3RoOyBhKyspIGlmICh0ID0gZVthXS5vZmZzZXRXaWR0aCAhPT0gblt1W2FdXSB8fCBlW2FdLm9mZnNldEhlaWdodCAhPT0gaVt1W2FdXSkgcmV0dXJuIHQ7IHJldHVybiB0OyB9OyBjb25zdCBsID0gKGZ1bmN0aW9uICgpIHsgZm9yICh2YXIgZSA9IFtdLCB0ID0gMCwgYSA9IHUubGVuZ3RoOyB0IDwgYTsgdCsrKSB7IGNvbnN0IG4gPSBmKCk7IG4uc3R5bGUuZm9udEZhbWlseSA9IHVbdF0sIHIuYXBwZW5kQ2hpbGQobiksIGUucHVzaChuKTsgfSByZXR1cm4gZTsgfSgpKTsgYS5hcHBlbmRDaGlsZChyKTsgZm9yIChsZXQgcyA9IDAsIGMgPSB1Lmxlbmd0aDsgcyA8IGM7IHMrKyluW3Vbc11dID0gbFtzXS5vZmZzZXRXaWR0aCwgaVt1W3NdXSA9IGxbc10ub2Zmc2V0SGVpZ2h0OyBjb25zdCBoID0gKGZ1bmN0aW9uICgpIHsgZm9yICh2YXIgZSwgdCwgYSwgbiA9IHt9LCByID0gMCwgaSA9IGQubGVuZ3RoOyByIDwgaTsgcisrKSB7IGZvciAodmFyIG8gPSBbXSwgbCA9IDAsIHMgPSB1Lmxlbmd0aDsgbCA8IHM7IGwrKykgeyBjb25zdCBjID0gKGUgPSBkW3JdLCB0ID0gdVtsXSwgYSA9IHZvaWQgMCwgKGEgPSBmKCkpLnN0eWxlLmZvbnRGYW1pbHkgPSBgJyR7ZX0nLCR7dH1gLCBhKTsgZy5hcHBlbmRDaGlsZChjKSwgby5wdXNoKGMpOyB9bltkW3JdXSA9IG87IH0gcmV0dXJuIG47IH0oKSk7IGEuYXBwZW5kQ2hpbGQoZyk7IGZvciAodmFyIG0gPSBbXSwgVCA9IDAsIHAgPSBkLmxlbmd0aDsgVCA8IHA7IFQrKylvKGhbZFtUXV0pICYmIG0ucHVzaChkW1RdKTsgYS5yZW1vdmVDaGlsZChnKSwgYS5yZW1vdmVDaGlsZChyKSwgZShtKTsgfSwgcGF1c2VCZWZvcmU6ICEwIH0sIHsga2V5OiAnZm9udHNGbGFzaCcsIGdldERhdGEodCwgZSkgeyByZXR1cm4gRCgpID8gTigpID8gZS5mb250cy5zd2ZQYXRoID8gdm9pZCBfKChlKSA9PiB7IHQoZSk7IH0sIGUpIDogdCgnbWlzc2luZyBvcHRpb25zLmZvbnRzLnN3ZlBhdGgnKSA6IHQoJ2ZsYXNoIG5vdCBpbnN0YWxsZWQnKSA6IHQoJ3N3ZiBvYmplY3Qgbm90IGxvYWRlZCcpOyB9LCBwYXVzZUJlZm9yZTogITAgfSwgeyBrZXk6ICdhdWRpbycsIGdldERhdGEoYSwgZSkgeyBjb25zdCB0ID0gZS5hdWRpbzsgaWYgKHQuZXhjbHVkZUlPUzExICYmIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL09TIDExLitWZXJzaW9uXFwvMTEuK1NhZmFyaS8pKSByZXR1cm4gYShlLkVYQ0xVREVEKTsgY29uc3QgbiA9IHdpbmRvdy5PZmZsaW5lQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRPZmZsaW5lQXVkaW9Db250ZXh0OyBpZiAobiA9PSBudWxsKSByZXR1cm4gYShlLk5PVF9BVkFJTEFCTEUpOyBsZXQgciA9IG5ldyBuKDEsIDQ0MTAwLCA0NDEwMCk7IGNvbnN0IGkgPSByLmNyZWF0ZU9zY2lsbGF0b3IoKTsgaS50eXBlID0gJ3RyaWFuZ2xlJywgaS5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMWU0LCByLmN1cnJlbnRUaW1lKTsgY29uc3QgbyA9IHIuY3JlYXRlRHluYW1pY3NDb21wcmVzc29yKCk7IGMoW1sndGhyZXNob2xkJywgLTUwXSwgWydrbmVlJywgNDBdLCBbJ3JhdGlvJywgMTJdLCBbJ3JlZHVjdGlvbicsIC0yMF0sIFsnYXR0YWNrJywgMF0sIFsncmVsZWFzZScsIDAuMjVdXSwgKGUpID0+IHsgdm9pZCAwICE9PSBvW2VbMF1dICYmIHR5cGVvZiBvW2VbMF1dLnNldFZhbHVlQXRUaW1lID09PSAnZnVuY3Rpb24nICYmIG9bZVswXV0uc2V0VmFsdWVBdFRpbWUoZVsxXSwgci5jdXJyZW50VGltZSk7IH0pLCBpLmNvbm5lY3QobyksIG8uY29ubmVjdChyLmRlc3RpbmF0aW9uKSwgaS5zdGFydCgwKSwgci5zdGFydFJlbmRlcmluZygpOyBjb25zdCBsID0gc2V0VGltZW91dCgoKSA9PiB7IHJldHVybiBjb25zb2xlLndhcm4oYEF1ZGlvIGZpbmdlcnByaW50IHRpbWVkIG91dC4gUGxlYXNlIHJlcG9ydCBidWcgYXQgaHR0cHM6Ly9naXRodWIuY29tL1ZhbHZlL2ZpbmdlcnByaW50anMyIHdpdGggeW91ciB1c2VyIGFnZW50OiBcIiR7bmF2aWdhdG9yLnVzZXJBZ2VudH1cIi5gKSwgci5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge30sIHIgPSBudWxsLCBhKCdhdWRpb1RpbWVvdXQnKTsgfSwgdC50aW1lb3V0KTsgci5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKGUpIHsgbGV0IHQ7IHRyeSB7IGNsZWFyVGltZW91dChsKSwgdCA9IGUucmVuZGVyZWRCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoMCkuc2xpY2UoNDUwMCwgNWUzKS5yZWR1Y2UoKGUsIHQpID0+IHsgcmV0dXJuIGUgKyBNYXRoLmFicyh0KTsgfSwgMCkudG9TdHJpbmcoKSwgaS5kaXNjb25uZWN0KCksIG8uZGlzY29ubmVjdCgpOyB9IGNhdGNoIChlKSB7IHJldHVybiB2b2lkIGEoZSk7IH1hKHQpOyB9OyB9IH0sIHsga2V5OiAnZW51bWVyYXRlRGV2aWNlcycsIGdldERhdGEodCwgZSkgeyBpZiAoIWEoKSkgcmV0dXJuIHQoZS5OT1RfQVZBSUxBQkxFKTsgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKCkudGhlbigoZSkgPT4geyB0KGUubWFwKChlKSA9PiB7IHJldHVybiBgaWQ9JHtlLmRldmljZUlkfTtnaWQ9JHtlLmdyb3VwSWR9OyR7ZS5raW5kfTske2UubGFiZWx9YDsgfSkpOyB9KS5jYXRjaCgoZSkgPT4geyB0KGUpOyB9KTsgfSB9XTsgY29uc3QgVSA9IGZ1bmN0aW9uIChlKSB7IHRocm93IG5ldyBFcnJvcihcIiduZXcgRmluZ2VycHJpbnQoKScgaXMgZGVwcmVjYXRlZCwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9WYWx2ZS9maW5nZXJwcmludGpzMiN1cGdyYWRlLWd1aWRlLWZyb20tMTgyLXRvLTIwMFwiKTsgfTsgcmV0dXJuIFUuZ2V0ID0gZnVuY3Rpb24gKGEsIG4pIHsgbiA/IGEgfHwgKGEgPSB7fSkgOiAobiA9IGEsIGEgPSB7fSksIChmdW5jdGlvbiAoZSwgdCkgeyBpZiAodCA9PSBudWxsKSByZXR1cm47IGxldCBhOyBsZXQgbjsgZm9yIChuIGluIHQpKGEgPSB0W25dKSA9PSBudWxsIHx8IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLCBuKSB8fCAoZVtuXSA9IGEpOyB9KGEsIGUpKSwgYS5jb21wb25lbnRzID0gYS5leHRyYUNvbXBvbmVudHMuY29uY2F0KEcpOyB2YXIgciA9IHsgZGF0YTogW10sIGFkZFByZXByb2Nlc3NlZENvbXBvbmVudChlLCB0KSB7IHR5cGVvZiBhLnByZXByb2Nlc3NvciA9PT0gJ2Z1bmN0aW9uJyAmJiAodCA9IGEucHJlcHJvY2Vzc29yKGUsIHQpKSwgci5kYXRhLnB1c2goeyBrZXk6IGUsIHZhbHVlOiB0IH0pOyB9IH07IGxldCBpID0gLTE7IHZhciBvID0gZnVuY3Rpb24gKGUpIHsgaWYgKChpICs9IDEpID49IGEuY29tcG9uZW50cy5sZW5ndGgpbihyLmRhdGEpOyBlbHNlIHsgY29uc3QgdCA9IGEuY29tcG9uZW50c1tpXTsgaWYgKGEuZXhjbHVkZXNbdC5rZXldKW8oITEpOyBlbHNlIHsgaWYgKCFlICYmIHQucGF1c2VCZWZvcmUpIHJldHVybiBpIC09IDEsIHZvaWQgc2V0VGltZW91dCgoKSA9PiB7IG8oITApOyB9LCAxKTsgdHJ5IHsgdC5nZXREYXRhKChlKSA9PiB7IHIuYWRkUHJlcHJvY2Vzc2VkQ29tcG9uZW50KHQua2V5LCBlKSwgbyghMSk7IH0sIGEpOyB9IGNhdGNoIChlKSB7IHIuYWRkUHJlcHJvY2Vzc2VkQ29tcG9uZW50KHQua2V5LCBTdHJpbmcoZSkpLCBvKCExKTsgfSB9IH0gfTsgbyghMSk7IH0sIFUuZ2V0UHJvbWlzZSA9IGZ1bmN0aW9uIChhKSB7IHJldHVybiBuZXcgUHJvbWlzZSgoKGUsIHQpID0+IHsgVS5nZXQoYSwgZSk7IH0pKTsgfSwgVS5nZXRWMTggPSBmdW5jdGlvbiAoaSwgbykgeyByZXR1cm4gbyA9PSBudWxsICYmIChvID0gaSwgaSA9IHt9KSwgVS5nZXQoaSwgKGUpID0+IHsgZm9yICh2YXIgdCA9IFtdLCBhID0gMDsgYSA8IGUubGVuZ3RoOyBhKyspIHsgY29uc3QgbiA9IGVbYV07IGlmIChuLnZhbHVlID09PSAoaS5OT1RfQVZBSUxBQkxFIHx8ICdub3QgYXZhaWxhYmxlJykpdC5wdXNoKHsga2V5OiBuLmtleSwgdmFsdWU6ICd1bmtub3duJyB9KTsgZWxzZSBpZiAobi5rZXkgPT09ICdwbHVnaW5zJyl0LnB1c2goeyBrZXk6ICdwbHVnaW5zJywgdmFsdWU6IHMobi52YWx1ZSwgKGUpID0+IHsgY29uc3QgdCA9IHMoZVsyXSwgKGUpID0+IHsgcmV0dXJuIGUuam9pbiA/IGUuam9pbignficpIDogZTsgfSkuam9pbignLCcpOyByZXR1cm4gW2VbMF0sIGVbMV0sIHRdLmpvaW4oJzo6Jyk7IH0pIH0pOyBlbHNlIGlmIChbJ2NhbnZhcycsICd3ZWJnbCddLmluZGV4T2Yobi5rZXkpICE9PSAtMSl0LnB1c2goeyBrZXk6IG4ua2V5LCB2YWx1ZTogbi52YWx1ZS5qb2luKCd+JykgfSk7IGVsc2UgaWYgKFsnc2Vzc2lvblN0b3JhZ2UnLCAnbG9jYWxTdG9yYWdlJywgJ2luZGV4ZWREYicsICdhZGRCZWhhdmlvcicsICdvcGVuRGF0YWJhc2UnXS5pbmRleE9mKG4ua2V5KSAhPT0gLTEpIHsgaWYgKCFuLnZhbHVlKSBjb250aW51ZTsgdC5wdXNoKHsga2V5OiBuLmtleSwgdmFsdWU6IDEgfSk7IH0gZWxzZSBuLnZhbHVlID8gdC5wdXNoKG4udmFsdWUuam9pbiA/IHsga2V5OiBuLmtleSwgdmFsdWU6IG4udmFsdWUuam9pbignOycpIH0gOiBuKSA6IHQucHVzaCh7IGtleTogbi5rZXksIHZhbHVlOiBuLnZhbHVlIH0pOyB9IGNvbnN0IHIgPSBsKHModCwgKGUpID0+IHsgcmV0dXJuIGUudmFsdWU7IH0pLmpvaW4oJ35+ficpLCAzMSk7IG8ociwgdCk7IH0pOyB9LCBVLng2NGhhc2gxMjggPSBsLCBVLlZFUlNJT04gPSAnMi4xLjAnLCBVO1xufSkpO1xuIiwiLyohXG4gQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cbi8qISBsaWZlY3ljbGUuZXM1LmpzIHYwLjEuMSAqL1xuIShmdW5jdGlvbiAoZSwgdCkge1xuXHQnb2JqZWN0JyA9PSB0eXBlb2YgZXhwb3J0cyAmJiAndW5kZWZpbmVkJyAhPSB0eXBlb2YgbW9kdWxlXG5cdFx0PyAobW9kdWxlLmV4cG9ydHMgPSB0KCkpXG5cdFx0OiAnZnVuY3Rpb24nID09IHR5cGVvZiBkZWZpbmUgJiYgZGVmaW5lLmFtZFxuXHRcdD8gZGVmaW5lKHQpXG5cdFx0OiAoZS5saWZlY3ljbGUgPSB0KCkpO1xufSkodGhpcywgZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBlID0gdm9pZCAwO1xuXHR0cnkge1xuXHRcdG5ldyBFdmVudFRhcmdldCgpLCAoZSA9ICExKTtcblx0fSBjYXRjaCAodCkge1xuXHRcdGUgPSAhMTtcblx0fVxuXHR2YXIgdCA9XG5cdFx0XHQnZnVuY3Rpb24nID09IHR5cGVvZiBTeW1ib2wgJiYgJ3N5bWJvbCcgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvclxuXHRcdFx0XHQ/IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHlwZW9mIGU7XG5cdFx0XHRcdCAgfVxuXHRcdFx0XHQ6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZSAmJlxuXHRcdFx0XHRcdFx0XHQnZnVuY3Rpb24nID09IHR5cGVvZiBTeW1ib2wgJiZcblx0XHRcdFx0XHRcdFx0ZS5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmXG5cdFx0XHRcdFx0XHRcdGUgIT09IFN5bWJvbC5wcm90b3R5cGVcblx0XHRcdFx0XHRcdFx0PyAnc3ltYm9sJ1xuXHRcdFx0XHRcdFx0XHQ6IHR5cGVvZiBlO1xuXHRcdFx0XHQgIH0sXG5cdFx0biA9IGZ1bmN0aW9uIChlLCB0KSB7XG5cdFx0XHRpZiAoIShlIGluc3RhbmNlb2YgdCkpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpO1xuXHRcdH0sXG5cdFx0aSA9IChmdW5jdGlvbiAoKSB7XG5cdFx0XHRmdW5jdGlvbiBlKGUsIHQpIHtcblx0XHRcdFx0Zm9yICh2YXIgbiA9IDA7IG4gPCB0Lmxlbmd0aDsgbisrKSB7XG5cdFx0XHRcdFx0dmFyIGkgPSB0W25dO1xuXHRcdFx0XHRcdChpLmVudW1lcmFibGUgPSBpLmVudW1lcmFibGUgfHwgITEpLFxuXHRcdFx0XHRcdFx0KGkuY29uZmlndXJhYmxlID0gITApLFxuXHRcdFx0XHRcdFx0J3ZhbHVlJyBpbiBpICYmIChpLndyaXRhYmxlID0gITApLFxuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIGkua2V5LCBpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICh0LCBuLCBpKSB7XG5cdFx0XHRcdHJldHVybiBuICYmIGUodC5wcm90b3R5cGUsIG4pLCBpICYmIGUodCwgaSksIHQ7XG5cdFx0XHR9O1xuXHRcdH0pKCksXG5cdFx0ciA9IGZ1bmN0aW9uIChlLCB0KSB7XG5cdFx0XHRpZiAoJ2Z1bmN0aW9uJyAhPSB0eXBlb2YgdCAmJiBudWxsICE9PSB0KVxuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2YgdCk7XG5cdFx0XHQoZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHQgJiYgdC5wcm90b3R5cGUsIHtcblx0XHRcdFx0Y29uc3RydWN0b3I6IHsgdmFsdWU6IGUsIGVudW1lcmFibGU6ICExLCB3cml0YWJsZTogITAsIGNvbmZpZ3VyYWJsZTogITAgfVxuXHRcdFx0fSkpLFxuXHRcdFx0XHR0ICYmIChPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YoZSwgdCkgOiAoZS5fX3Byb3RvX18gPSB0KSk7XG5cdFx0fSxcblx0XHRhID0gZnVuY3Rpb24gKGUsIHQpIHtcblx0XHRcdGlmICghZSkgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuXHRcdFx0cmV0dXJuICF0IHx8ICgnb2JqZWN0JyAhPSB0eXBlb2YgdCAmJiAnZnVuY3Rpb24nICE9IHR5cGVvZiB0KSA/IGUgOiB0O1xuXHRcdH0sXG5cdFx0cyA9IChmdW5jdGlvbiAoKSB7XG5cdFx0XHRmdW5jdGlvbiBlKCkge1xuXHRcdFx0XHRuKHRoaXMsIGUpLCAodGhpcy5fcmVnaXN0cnkgPSB7fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRpKGUsIFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRrZXk6ICdhZGRFdmVudExpc3RlbmVyJyxcblx0XHRcdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAoZSwgdCkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9nZXRSZWdpc3RyeShlKS5wdXNoKHQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0a2V5OiAncmVtb3ZlRXZlbnRMaXN0ZW5lcicsXG5cdFx0XHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gKGUsIHQpIHtcblx0XHRcdFx0XHRcdFx0dmFyIG4gPSB0aGlzLl9nZXRSZWdpc3RyeShlKSxcblx0XHRcdFx0XHRcdFx0XHRpID0gbi5pbmRleE9mKHQpO1xuXHRcdFx0XHRcdFx0XHRpID4gLTEgJiYgbi5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRrZXk6ICdkaXNwYXRjaEV2ZW50Jyxcblx0XHRcdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0XHRcdChlLnRhcmdldCA9IHRoaXMpLFxuXHRcdFx0XHRcdFx0XHRcdE9iamVjdC5mcmVlemUoZSksXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fZ2V0UmVnaXN0cnkoZS50eXBlKS5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdChlKTtcblx0XHRcdFx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XHRcdFx0XHQhMFxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0a2V5OiAnX2dldFJlZ2lzdHJ5Jyxcblx0XHRcdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKHRoaXMuX3JlZ2lzdHJ5W2VdID0gdGhpcy5fcmVnaXN0cnlbZV0gfHwgW10pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XSksXG5cdFx0XHRcdGVcblx0XHRcdCk7XG5cdFx0fSkoKSxcblx0XHRvID0gZSA/IEV2ZW50VGFyZ2V0IDogcyxcblx0XHR1ID0gZVxuXHRcdFx0PyBFdmVudFxuXHRcdFx0OiBmdW5jdGlvbiBlKHQpIHtcblx0XHRcdFx0XHRuKHRoaXMsIGUpLCAodGhpcy50eXBlID0gdCk7XG5cdFx0XHQgIH0sXG5cdFx0ZiA9IChmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZnVuY3Rpb24gdChlLCBpKSB7XG5cdFx0XHRcdG4odGhpcywgdCk7XG5cdFx0XHRcdHZhciByID0gYSh0aGlzLCAodC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHQpKS5jYWxsKHRoaXMsIGUpKTtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQoci5uZXdTdGF0ZSA9IGkubmV3U3RhdGUpLFxuXHRcdFx0XHRcdChyLm9sZFN0YXRlID0gaS5vbGRTdGF0ZSksXG5cdFx0XHRcdFx0KHIub3JpZ2luYWxFdmVudCA9IGkub3JpZ2luYWxFdmVudCksXG5cdFx0XHRcdFx0clxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHIodCwgdSksIHQ7XG5cdFx0fSkoKSxcblx0XHRjID0gJ2FjdGl2ZScsXG5cdFx0aCA9ICdwYXNzaXZlJyxcblx0XHRkID0gJ2hpZGRlbicsXG5cdFx0bCA9ICdmcm96ZW4nLFxuXHRcdHAgPSAndGVybWluYXRlZCcsXG5cdFx0diA9XG5cdFx0XHQnb2JqZWN0JyA9PT0gKCd1bmRlZmluZWQnID09IHR5cGVvZiBzYWZhcmkgPyAndW5kZWZpbmVkJyA6IHQoc2FmYXJpKSkgJiZcblx0XHRcdHNhZmFyaS5wdXNoTm90aWZpY2F0aW9uLFxuXHRcdHkgPSBbXG5cdFx0XHQnZm9jdXMnLFxuXHRcdFx0J2JsdXInLFxuXHRcdFx0J3Zpc2liaWxpdHljaGFuZ2UnLFxuXHRcdFx0J2ZyZWV6ZScsXG5cdFx0XHQncmVzdW1lJyxcblx0XHRcdCdwYWdlc2hvdycsXG5cdFx0XHQnb25wYWdlc2hvdycgaW4gc2VsZiA/ICdwYWdlaGlkZScgOiAndW5sb2FkJ1xuXHRcdF0sXG5cdFx0ZyA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRyZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpLCAoZS5yZXR1cm5WYWx1ZSA9ICdBcmUgeW91IHN1cmU/Jyk7XG5cdFx0fSxcblx0XHRfID0gW1xuXHRcdFx0W2MsIGgsIGQsIHBdLFxuXHRcdFx0W2MsIGgsIGQsIGxdLFxuXHRcdFx0W2QsIGgsIGNdLFxuXHRcdFx0W2wsIGRdLFxuXHRcdFx0W2wsIGNdLFxuXHRcdFx0W2wsIGhdXG5cdFx0XS5tYXAoZnVuY3Rpb24gKGUpIHtcblx0XHRcdHJldHVybiBlLnJlZHVjZShmdW5jdGlvbiAoZSwgdCwgbikge1xuXHRcdFx0XHRyZXR1cm4gKGVbdF0gPSBuKSwgZTtcblx0XHRcdH0sIHt9KTtcblx0XHR9KSxcblx0XHRiID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA9PT0gZCA/IGQgOiBkb2N1bWVudC5oYXNGb2N1cygpID8gYyA6IGg7XG5cdFx0fTtcblx0cmV0dXJuIG5ldyAoKGZ1bmN0aW9uIChlKSB7XG5cdFx0ZnVuY3Rpb24gdCgpIHtcblx0XHRcdG4odGhpcywgdCk7XG5cdFx0XHR2YXIgZSA9IGEodGhpcywgKHQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZih0KSkuY2FsbCh0aGlzKSksXG5cdFx0XHRcdGkgPSBiKCk7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQoZS5fc3RhdGUgPSBpKSxcblx0XHRcdFx0KGUuX3Vuc2F2ZWRDaGFuZ2VzID0gW10pLFxuXHRcdFx0XHQoZS5faGFuZGxlRXZlbnRzID0gZS5faGFuZGxlRXZlbnRzLmJpbmQoZSkpLFxuXHRcdFx0XHR5LmZvckVhY2goZnVuY3Rpb24gKHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gYWRkRXZlbnRMaXN0ZW5lcih0LCBlLl9oYW5kbGVFdmVudHMsICEwKTtcblx0XHRcdFx0fSksXG5cdFx0XHRcdHYgJiZcblx0XHRcdFx0XHRhZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbiAodCkge1xuXHRcdFx0XHRcdFx0ZS5fc2FmYXJpQmVmb3JlVW5sb2FkVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHR0LmRlZmF1bHRQcmV2ZW50ZWQgfHwgdC5yZXR1cm5WYWx1ZS5sZW5ndGggPiAwIHx8IGUuX2Rpc3BhdGNoQ2hhbmdlc0lmTmVlZGVkKHQsIGQpO1xuXHRcdFx0XHRcdFx0fSwgMCk7XG5cdFx0XHRcdFx0fSksXG5cdFx0XHRcdGVcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHRyKHQsIG8pLFxuXHRcdFx0aSh0LCBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRrZXk6ICdhZGRVbnNhdmVkQ2hhbmdlcycsXG5cdFx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHQhdGhpcy5fdW5zYXZlZENoYW5nZXMuaW5kZXhPZihlKSA+IC0xICYmXG5cdFx0XHRcdFx0XHRcdCgwID09PSB0aGlzLl91bnNhdmVkQ2hhbmdlcy5sZW5ndGggJiYgYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZyksXG5cdFx0XHRcdFx0XHRcdHRoaXMuX3Vuc2F2ZWRDaGFuZ2VzLnB1c2goZSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGtleTogJ3JlbW92ZVVuc2F2ZWRDaGFuZ2VzJyxcblx0XHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdHZhciB0ID0gdGhpcy5fdW5zYXZlZENoYW5nZXMuaW5kZXhPZihlKTtcblx0XHRcdFx0XHRcdHQgPiAtMSAmJlxuXHRcdFx0XHRcdFx0XHQodGhpcy5fdW5zYXZlZENoYW5nZXMuc3BsaWNlKHQsIDEpLFxuXHRcdFx0XHRcdFx0XHQwID09PSB0aGlzLl91bnNhdmVkQ2hhbmdlcy5sZW5ndGggJiYgcmVtb3ZlRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGtleTogJ19kaXNwYXRjaENoYW5nZXNJZk5lZWRlZCcsXG5cdFx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIChlLCB0KSB7XG5cdFx0XHRcdFx0XHRpZiAodCAhPT0gdGhpcy5fc3RhdGUpXG5cdFx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdFx0dmFyIG4gPSAoZnVuY3Rpb24gKGUsIHQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgbiwgaSA9IDA7IChuID0gX1tpXSk7ICsraSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhciByID0gbltlXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGEgPSBuW3RdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChyID49IDAgJiYgYSA+PSAwICYmIGEgPiByKSByZXR1cm4gT2JqZWN0LmtleXMobikuc2xpY2UociwgYSArIDEpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdFx0XHRcdFx0XHRcdH0pKHRoaXMuX3N0YXRlLCB0KSxcblx0XHRcdFx0XHRcdFx0XHRcdGkgPSAwO1xuXHRcdFx0XHRcdFx0XHRcdGkgPCBuLmxlbmd0aCAtIDE7XG5cdFx0XHRcdFx0XHRcdFx0KytpXG5cdFx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciByID0gbltpXSxcblx0XHRcdFx0XHRcdFx0XHRcdGEgPSBuW2kgKyAxXTtcblx0XHRcdFx0XHRcdFx0XHQodGhpcy5fc3RhdGUgPSBhKSxcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChcblx0XHRcdFx0XHRcdFx0XHRcdFx0bmV3IGYoJ3N0YXRlY2hhbmdlJywgeyBvbGRTdGF0ZTogciwgbmV3U3RhdGU6IGEsIG9yaWdpbmFsRXZlbnQ6IGUgfSlcblx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRrZXk6ICdfaGFuZGxlRXZlbnRzJyxcblx0XHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdHN3aXRjaCAoKHYgJiYgY2xlYXJUaW1lb3V0KHRoaXMuX3NhZmFyaUJlZm9yZVVubG9hZFRpbWVvdXQpLCBlLnR5cGUpKSB7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ3BhZ2VzaG93Jzpcblx0XHRcdFx0XHRcdFx0Y2FzZSAncmVzdW1lJzpcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kaXNwYXRjaENoYW5nZXNJZk5lZWRlZChlLCBiKCkpO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlICdmb2N1cyc6XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fZGlzcGF0Y2hDaGFuZ2VzSWZOZWVkZWQoZSwgYyk7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ2JsdXInOlxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX3N0YXRlID09PSBjICYmIHRoaXMuX2Rpc3BhdGNoQ2hhbmdlc0lmTmVlZGVkKGUsIGIoKSk7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ3BhZ2VoaWRlJzpcblx0XHRcdFx0XHRcdFx0Y2FzZSAndW5sb2FkJzpcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kaXNwYXRjaENoYW5nZXNJZk5lZWRlZChlLCBlLnBlcnNpc3RlZCA/IGwgOiBwKTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSAndmlzaWJpbGl0eWNoYW5nZSc6XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fc3RhdGUgIT09IGwgJiYgdGhpcy5fc3RhdGUgIT09IHAgJiYgdGhpcy5fZGlzcGF0Y2hDaGFuZ2VzSWZOZWVkZWQoZSwgYigpKTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSAnZnJlZXplJzpcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kaXNwYXRjaENoYW5nZXNJZk5lZWRlZChlLCBsKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRrZXk6ICdzdGF0ZScsXG5cdFx0XHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fc3RhdGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0a2V5OiAncGFnZVdhc0Rpc2NhcmRlZCcsXG5cdFx0XHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZG9jdW1lbnQud2FzRGlzY2FyZGVkIHx8ICExO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XSksXG5cdFx0XHR0XG5cdFx0KTtcblx0fSkoKSkoKTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGlmZWN5Y2xlLmVzNS5qcy5tYXBcbiIsImNvbnN0IGNvbmZpZyA9IHtcblx0QVBJX1VSTDogJ2h0dHBzOi8vc2hpcC1wcm9kLTYyN2VkMDhmNDg5YTk3MDAxMzU3MmY1ZC5wYXJhbGVjdC5uZXQnLFxuXHRBUElfVVJMX0RFVjogJ2h0dHBzOi8vc2hpcC02MjdlZDA4ZjQ4OWE5NzAwMTM1NzJmNWQucGFyYWxlY3QubmV0J1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5cbmNvbnN0IEFQSV9VUkwgPSBwcm9jZXNzLmVudi5CVUlMRCA9PT0gJ2RldicgPyBjb25maWcuQVBJX1VSTF9ERVYgOiBjb25maWcuQVBJX1VSTDtcbi8vIGNvbnN0IEFQSV9VUkwgPSBjb25maWcuQVBJX1VSTF9ERVY7XG5cbmNvbnN0IENMQVNTX0RJVklERVIgPSAvIC9nO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9ERUJPVU5DRV9USU1FID0gNTAwO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfVEhST1RUTEVfVElNRSA9IDEwMDA7XG5cbmNvbnN0IGdldFBhcmVudHMgPSAoZWxlbWVudCkgPT4ge1xuXHRjb25zdCBwYXJlbnRzID0gW107XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG5cdGZvciAoOyBlbGVtZW50ICYmIGVsZW1lbnQgIT09IGRvY3VtZW50OyBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlKSB7XG5cdFx0cGFyZW50cy5wdXNoKGVsZW1lbnQpO1xuXHR9XG5cblx0cmV0dXJuIHBhcmVudHM7XG59O1xuXG5jb25zdCBnZXRDb3VudFNhbWVOb2RlTmFtZSA9IChlbGVtZW50c0FycmF5LCBlbGVtZW50KSA9PiB7XG5cdGxldCBjb3VudCA9IDA7XG5cblx0Wy4uLmVsZW1lbnRzQXJyYXldLmZvckVhY2goKGN1cnJlbnRFbGVtZW50KSA9PiB7XG5cdFx0aWYgKGN1cnJlbnRFbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkge1xuXHRcdFx0Y291bnQgKz0gMTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBjb3VudDtcbn07XG5cbmNvbnN0IGdldE50aE51bWJlciA9IChlbGVtZW50KSA9PiB7XG5cdGxldCBudGggPSAxO1xuXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25kLWFzc2lnbixuby1wYXJhbS1yZWFzc2lnblxuXHR3aGlsZSAoKGVsZW1lbnQgPSBlbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcpKSB7XG5cdFx0bnRoICs9IDE7XG5cdH1cblxuXHRyZXR1cm4gbnRoO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldENzc1BhdGggPSAoZWxlbWVudCkgPT4ge1xuXHRsZXQgZWxlbWVudFBhcmVudHMgPSBnZXRQYXJlbnRzKGVsZW1lbnQpO1xuXHRlbGVtZW50UGFyZW50cyA9IGVsZW1lbnRQYXJlbnRzLnNwbGljZSgwLCBlbGVtZW50UGFyZW50cy5sZW5ndGggLSAxKTtcblxuXHRjb25zdCBzZWxlY3RvcnNBcnJheSA9IFtdO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudFBhcmVudHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRjb25zdCBlbGVtZW50SXRlbSA9IGVsZW1lbnRQYXJlbnRzW2ldO1xuXG5cdFx0Y29uc3Qgbm9kZU5hbWUgPSBlbGVtZW50SXRlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0bGV0IGlkID0gJyc7XG5cdFx0bGV0IHNlbGVjdG9yID0gJyc7XG5cblx0XHRpZiAoZWxlbWVudEl0ZW0uaWQpIHtcblx0XHRcdGlkID0gYCMke2VsZW1lbnRJdGVtLmlkfWA7XG5cdFx0fVxuXG5cdFx0aWYgKGlkKSB7XG5cdFx0XHRzZWxlY3RvciA9IGlkO1xuXHRcdFx0c2VsZWN0b3JzQXJyYXkucHVzaChzZWxlY3Rvcik7XG5cdFx0XHRicmVhaztcblx0XHR9IGVsc2Uge1xuXHRcdFx0c2VsZWN0b3IgPSBub2RlTmFtZTtcblx0XHRcdGNvbnN0IHsgcGFyZW50Tm9kZSB9ID0gZWxlbWVudEl0ZW07XG5cblx0XHRcdGlmIChwYXJlbnROb2RlKSB7XG5cdFx0XHRcdGNvbnN0IHNpYmxpbmcgPSBwYXJlbnROb2RlLmNoaWxkcmVuO1xuXHRcdFx0XHRjb25zdCBjb3VudFNhbWVOb2RlTmFtZSA9IGdldENvdW50U2FtZU5vZGVOYW1lKHNpYmxpbmcsIGVsZW1lbnRJdGVtKTtcblxuXHRcdFx0XHRpZiAoc2libGluZy5sZW5ndGggPiAxICYmIGNvdW50U2FtZU5vZGVOYW1lID4gMSkge1xuXHRcdFx0XHRcdGNvbnN0IGNsYXNzTmFtZXMgPSBlbGVtZW50SXRlbS5jbGFzc05hbWVcblx0XHRcdFx0XHRcdD8gYC4ke2VsZW1lbnRJdGVtLmNsYXNzTmFtZS5yZXBsYWNlKENMQVNTX0RJVklERVIsICcuJyl9YFxuXHRcdFx0XHRcdFx0OiAnJztcblxuXHRcdFx0XHRcdGlmIChjbGFzc05hbWVzKSB7XG5cdFx0XHRcdFx0XHRzZWxlY3RvciArPSBjbGFzc05hbWVzO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb25zdCBudGhOdW1iZXIgPSBnZXROdGhOdW1iZXIoZWxlbWVudEl0ZW0pO1xuXHRcdFx0XHRcdFx0c2VsZWN0b3IgKz0gYDpudGgtY2hpbGQoJHtudGhOdW1iZXJ9KWA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c2VsZWN0b3JzQXJyYXkucHVzaChzZWxlY3Rvcik7XG5cdH1cblxuXHRjb25zdCByZXN1bHRQYXRoID0gc2VsZWN0b3JzQXJyYXkucmV2ZXJzZSgpLmpvaW4oJyA+ICcpO1xuXG5cdHJldHVybiByZXN1bHRQYXRoO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFZhbHVlID0gKGVsZW1lbnQpID0+IHtcblx0cmV0dXJuIGAke2VsZW1lbnQudmFsdWUgfHwgZWxlbWVudC5pbm5lclRleHQgfHwgJyd9YDtcbn07XG5cbmV4cG9ydCBjb25zdCBzZW5kRGF0YSA9ICh1cmwsIGRhdGEpID0+XG5cdGZldGNoKGAke3dpbmRvdy5XQVZFX0FQSV9VUkwgfHwgQVBJX1VSTH0vJHt1cmx9YCwge1xuXHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdGhlYWRlcnM6IHtcblx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcblx0XHR9LFxuXHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXG5cdH0pLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xuXG5leHBvcnQgY29uc3Qgc2VuZFRyYWNrRGF0YSA9ICh1c2VyRGF0YSwgdXJsLCBkYXRhKSA9PlxuXHRzZW5kRGF0YSh1cmwsIHtcblx0XHQuLi5kYXRhLFxuXHRcdHByb2plY3RJZDogdXNlckRhdGEucHJvamVjdElkLFxuXHRcdHZpc2l0b3JJZDogdXNlckRhdGEudmlzaXRvcklkLFxuXHRcdHNlc3Npb25JZDogdXNlckRhdGEuc2Vzc2lvbklkLFxuXHRcdC4uLih3aW5kb3cuTVdBVkVfQ09ORklHXG5cdFx0XHQ/IHtcblx0XHRcdFx0XHRzdWJQcm9qZWN0SWQ6IHdpbmRvdy5NV0FWRV9DT05GSUc/LnN1YlByb2plY3RJZCxcblx0XHRcdFx0XHRwYWdlSWQ6IHdpbmRvdy5NV0FWRV9DT05GSUc/LnBhZ2VJZFxuXHRcdFx0ICB9XG5cdFx0XHQ6IHt9KVxuXHR9KS50aGVuKCh0cmFja0RhdGEpID0+IHtcblx0XHRpZiAodHJhY2tEYXRhLnNlc3Npb25JZCkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG5cdFx0XHR1c2VyRGF0YS5zZXNzaW9uSWQgPSB0cmFja0RhdGEuc2Vzc2lvbklkO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cmFja0RhdGE7XG5cdH0pO1xuXG5leHBvcnQgY29uc3Qgc2VuZFRyYWNrRXZlbnQgPSAoeyB0eXBlLCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpLCBwYXlsb2FkIH0pID0+IHtcblx0bGV0IHVzZXJEYXRhID0gd2luZG93LldBVkVfVVNFUl9EQVRBO1xuXG5cdHJldHVybiBzZW5kRGF0YSgnd2F2ZUFjdGlvbnMnLCB7XG5cdFx0cHJvamVjdElkOiB1c2VyRGF0YS5wcm9qZWN0SWQsXG5cdFx0dmlzaXRvcklkOiB1c2VyRGF0YS52aXNpdG9ySWQsXG5cdFx0c2Vzc2lvbklkOiB1c2VyRGF0YS5zZXNzaW9uSWQsXG5cblx0XHQuLi4od2luZG93Lk1XQVZFX0NPTkZJR1xuXHRcdFx0PyB7XG5cdFx0XHRcdFx0c3ViUHJvamVjdElkOiB3aW5kb3cuTVdBVkVfQ09ORklHPy5zdWJQcm9qZWN0SWQsXG5cdFx0XHRcdFx0cGFnZUlkOiB3aW5kb3cuTVdBVkVfQ09ORklHPy5wYWdlSWRcblx0XHRcdCAgfVxuXHRcdFx0OiB7fSksXG5cblx0XHR0eXBlLFxuXHRcdHRpbWVzdGFtcCxcblx0XHRwYXlsb2FkXG5cdH0pLnRoZW4oKHRyYWNrRGF0YSkgPT4ge1xuXHRcdGlmICh0cmFja0RhdGEuc2Vzc2lvbklkKSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cblx0XHRcdHVzZXJEYXRhLnNlc3Npb25JZCA9IHRyYWNrRGF0YS5zZXNzaW9uSWQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRyYWNrRGF0YTtcblx0fSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VuZFBpbmcgPSAoKSA9PiB7XG5cdGxldCB1c2VyRGF0YSA9IHdpbmRvdy5XQVZFX1VTRVJfREFUQTtcblxuXHRyZXR1cm4gc2VuZERhdGEoJ3dhdmVBY3Rpb25zL3BpbmcnLCB7XG5cdFx0cHJvamVjdElkOiB1c2VyRGF0YS5wcm9qZWN0SWQsXG5cdFx0dmlzaXRvcklkOiB1c2VyRGF0YS52aXNpdG9ySWQsXG5cdFx0c2Vzc2lvbklkOiB1c2VyRGF0YS5zZXNzaW9uSWQsXG5cblx0XHQuLi4od2luZG93Lk1XQVZFX0NPTkZJR1xuXHRcdFx0PyB7XG5cdFx0XHRcdFx0c3ViUHJvamVjdElkOiB3aW5kb3cuTVdBVkVfQ09ORklHPy5zdWJQcm9qZWN0SWQsXG5cdFx0XHRcdFx0cGFnZUlkOiB3aW5kb3cuTVdBVkVfQ09ORklHPy5wYWdlSWRcblx0XHRcdCAgfVxuXHRcdFx0OiB7fSlcblx0fSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJIYW5kbGVycyA9ICh1c2VyRGF0YSwgaGFuZGxlcnMpID0+IHtcblx0aGFuZGxlcnMuZm9yRWFjaCgoaGFuZGxlcikgPT4gaGFuZGxlcih1c2VyRGF0YSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlYm91bmNlID0gKGZ1bmMsIGRlbGF5KSA9PiB7XG5cdGxldCBibG9ja2VySWQ7XG5cblx0cmV0dXJuIChhcmdzKSA9PiB7XG5cdFx0Y2xlYXJUaW1lb3V0KGJsb2NrZXJJZCk7XG5cdFx0YmxvY2tlcklkID0gc2V0VGltZW91dCgoKSA9PiBmdW5jKGFyZ3MpLCBkZWxheSk7XG5cdH07XG59O1xuXG5leHBvcnQgY29uc3QgdGhyb3R0bGUgPSAoZnVuYywgbGltaXQpID0+IHtcblx0bGV0IGlzQmxvY2tlZCA9IGZhbHNlO1xuXG5cdHJldHVybiAoYXJncykgPT4ge1xuXHRcdGlmIChpc0Jsb2NrZWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRmdW5jKGFyZ3MpO1xuXG5cdFx0aXNCbG9ja2VkID0gdHJ1ZTtcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdGlzQmxvY2tlZCA9IGZhbHNlO1xuXHRcdH0sIGxpbWl0KTtcblx0fTtcbn07XG5cbmNvbnN0IGluY2x1ZGVzID0gKGhheXN0YWNrLCBuZWVkbGUpID0+IHtcblx0cmV0dXJuIGhheXN0YWNrLmluZGV4T2YobmVlZGxlKSAhPT0gLTE7XG59O1xuXG5jb25zdCBmaW5kID0gKG5lZWRsZSkgPT4ge1xuXHRyZXR1cm4gaW5jbHVkZXMobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvY2FsZUxvd2VyQ2FzZSgpLCBuZWVkbGUpO1xufTtcblxuY29uc3Qgd2luZG93cyA9ICgpID0+IHtcblx0cmV0dXJuIGZpbmQoJ3dpbmRvd3MnKTtcbn07XG5cbmNvbnN0IGxpbnV4ID0gKCkgPT4ge1xuXHRyZXR1cm4gZmluZCgnbGludXgnKTtcbn07XG5cbmNvbnN0IGlwaG9uZSA9ICgpID0+IHtcblx0cmV0dXJuICF3aW5kb3dzKCkgJiYgZmluZCgnaXBob25lJyk7XG59O1xuXG5jb25zdCBpcG9kID0gKCkgPT4ge1xuXHRyZXR1cm4gZmluZCgnaXBvZCcpO1xufTtcblxuY29uc3QgaXBhZCA9ICgpID0+IHtcblx0Y29uc3QgaVBhZE9TMTNVcCA9IG5hdmlnYXRvci5wbGF0Zm9ybSA9PT0gJ01hY0ludGVsJyAmJiBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAxO1xuXHRyZXR1cm4gZmluZCgnaXBhZCcpIHx8IGlQYWRPUzEzVXA7XG59O1xuXG5jb25zdCBpb3MgPSAoKSA9PiB7XG5cdHJldHVybiBpcGhvbmUoKSB8fCBpcG9kKCkgfHwgaXBhZCgpO1xufTtcblxuY29uc3QgbWFjb3MgPSAoKSA9PiB7XG5cdHJldHVybiBmaW5kKCdtYWMnKTtcbn07XG5cbmNvbnN0IGFuZHJvaWQgPSAoKSA9PiB7XG5cdHJldHVybiAhd2luZG93cygpICYmIGZpbmQoJ2FuZHJvaWQnKTtcbn07XG5cbmNvbnN0IGFuZHJvaWRQaG9uZSA9ICgpID0+IHtcblx0cmV0dXJuIGFuZHJvaWQoKSAmJiBmaW5kKCdtb2JpbGUnKTtcbn07XG5cbmNvbnN0IGFuZHJvaWRUYWJsZXQgPSAoKSA9PiB7XG5cdHJldHVybiBhbmRyb2lkKCkgJiYgIWZpbmQoJ21vYmlsZScpO1xufTtcblxuY29uc3QgYmxhY2tiZXJyeSA9ICgpID0+IHtcblx0cmV0dXJuIGZpbmQoJ2JsYWNrYmVycnknKSB8fCBmaW5kKCdiYjEwJyk7XG59O1xuXG5jb25zdCBibGFja2JlcnJ5UGhvbmUgPSAoKSA9PiB7XG5cdHJldHVybiBibGFja2JlcnJ5KCkgJiYgIWZpbmQoJ3RhYmxldCcpO1xufTtcblxuY29uc3QgYmxhY2tiZXJyeVRhYmxldCA9ICgpID0+IHtcblx0cmV0dXJuIGJsYWNrYmVycnkoKSAmJiBmaW5kKCd0YWJsZXQnKTtcbn07XG5cbmNvbnN0IHdpbmRvd3NQaG9uZSA9ICgpID0+IHtcblx0cmV0dXJuIHdpbmRvd3MoKSAmJiBmaW5kKCdwaG9uZScpO1xufTtcblxuY29uc3Qgd2luZG93c1RhYmxldCA9ICgpID0+IHtcblx0cmV0dXJuIHdpbmRvd3MoKSAmJiBmaW5kKCd0b3VjaCcpICYmICF3aW5kb3dzUGhvbmUoKTtcbn07XG5cbmNvbnN0IGZ4b3MgPSAoKSA9PiB7XG5cdHJldHVybiAoZmluZCgnKG1vYmlsZScpIHx8IGZpbmQoJyh0YWJsZXQnKSkgJiYgZmluZCgnIHJ2OicpO1xufTtcblxuY29uc3QgZnhvc1Bob25lID0gKCkgPT4ge1xuXHRyZXR1cm4gZnhvcygpICYmIGZpbmQoJ21vYmlsZScpO1xufTtcblxuY29uc3QgZnhvc1RhYmxldCA9ICgpID0+IHtcblx0cmV0dXJuIGZ4b3MoKSAmJiBmaW5kKCd0YWJsZXQnKTtcbn07XG5cbmNvbnN0IG1lZWdvID0gKCkgPT4ge1xuXHRyZXR1cm4gZmluZCgnbWVlZ28nKTtcbn07XG5cbmNvbnN0IG1vYmlsZSA9ICgpID0+IHtcblx0cmV0dXJuIChcblx0XHRhbmRyb2lkUGhvbmUoKSB8fFxuXHRcdGlwaG9uZSgpIHx8XG5cdFx0aXBvZCgpIHx8XG5cdFx0d2luZG93c1Bob25lKCkgfHxcblx0XHRibGFja2JlcnJ5UGhvbmUoKSB8fFxuXHRcdGZ4b3NQaG9uZSgpIHx8XG5cdFx0bWVlZ28oKVxuXHQpO1xufTtcblxuY29uc3QgdGFibGV0ID0gKCkgPT4ge1xuXHRyZXR1cm4gaXBhZCgpIHx8IGFuZHJvaWRUYWJsZXQoKSB8fCBibGFja2JlcnJ5VGFibGV0KCkgfHwgd2luZG93c1RhYmxldCgpIHx8IGZ4b3NUYWJsZXQoKTtcbn07XG5cbmNvbnN0IGRlc2t0b3AgPSAoKSA9PiB7XG5cdHJldHVybiAhdGFibGV0KCkgJiYgIW1vYmlsZSgpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldERldmljZVR5cGUgPSAoKSA9PiB7XG5cdGlmIChkZXNrdG9wKCkpIHtcblx0XHRyZXR1cm4gJ2Rlc2t0b3AnO1xuXHR9XG5cblx0aWYgKHRhYmxldCgpKSB7XG5cdFx0cmV0dXJuICd0YWJsZXQnO1xuXHR9XG5cblx0aWYgKG1vYmlsZSgpKSB7XG5cdFx0cmV0dXJuICdtb2JpbGUnO1xuXHR9XG5cblx0cmV0dXJuICd1bmtub3duJztcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRPUyA9ICgpID0+IHtcblx0aWYgKGlvcygpKSB7XG5cdFx0cmV0dXJuICdpb3MnO1xuXHR9XG5cblx0aWYgKGFuZHJvaWQoKSkge1xuXHRcdHJldHVybiAnYW5kcm9pZCc7XG5cdH1cblxuXHRpZiAoYmxhY2tiZXJyeSgpKSB7XG5cdFx0cmV0dXJuICdibGFja2JlcnJ5Jztcblx0fVxuXG5cdGlmIChtYWNvcygpKSB7XG5cdFx0cmV0dXJuICdtYWNvcyc7XG5cdH1cblxuXHRpZiAod2luZG93cygpKSB7XG5cdFx0cmV0dXJuICd3aW5kb3dzJztcblx0fVxuXG5cdGlmIChsaW51eCgpKSB7XG5cdFx0cmV0dXJuICdsaW51eCc7XG5cdH1cblxuXHRpZiAoZnhvcygpKSB7XG5cdFx0cmV0dXJuICdmeG9zJztcblx0fVxuXG5cdGlmIChtZWVnbygpKSB7XG5cdFx0cmV0dXJuICdtZWVnbyc7XG5cdH1cblxuXHRyZXR1cm4gJ3Vua25vd24nO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXJOYW1lID0gKCkgPT4ge1xuXHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdFZGdlJykgPiAtMSAmJiBuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKCdFZGdlJykgPiAtMSkge1xuXHRcdHJldHVybiAnRWRnZSc7XG5cdH1cblxuXHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdPcGVyYScpICE9PSAtMSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09QUicpICE9PSAtMSkge1xuXHRcdHJldHVybiAnT3BlcmEnO1xuXHR9XG5cblx0aWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lJykgIT09IC0xKSB7XG5cdFx0cmV0dXJuICdDaHJvbWUnO1xuXHR9XG5cblx0aWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignU2FmYXJpJykgIT09IC0xKSB7XG5cdFx0cmV0dXJuICdTYWZhcmknO1xuXHR9XG5cblx0aWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignRmlyZWZveCcpICE9PSAtMSkge1xuXHRcdHJldHVybiAnRmlyZWZveCc7XG5cdH1cblxuXHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdNU0lFJykgIT09IC0xIHx8ICEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlID09PSB0cnVlKSB7XG5cdFx0Ly8gSUYgSUUgPiAxMHtcblx0XHRyZXR1cm4gJ0lFJztcblx0fVxuXG5cdHJldHVybiAndW5rbm93bic7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q29ubmVjdGlvblR5cGUgPSAoKSA9PiB7XG5cdGNvbnN0IGNvbm5lY3Rpb25UeXBlID0gbmF2aWdhdG9yICYmIG5hdmlnYXRvci5jb25uZWN0aW9uICYmIG5hdmlnYXRvci5jb25uZWN0aW9uLnR5cGU7IC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9OZXR3b3JrX0luZm9ybWF0aW9uX0FQSVxuXG5cdHJldHVybiBjb25uZWN0aW9uVHlwZTtcbn07XG4iLCJpbXBvcnQgeyBzZW5kVHJhY2tEYXRhLCBnZXRDc3NQYXRoLCBnZXRWYWx1ZSB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCAodXNlckRhdGEpID0+IHtcblx0aWYgKHdpbmRvdy5XQVZFX1RSQUNLX0NMSUNLUykge1xuXHRcdGNvbnN0IGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRjb25zdCBkYXRhID0ge1xuXHRcdFx0XHR0eXBlOiAnY2xpY2snLFxuXHRcdFx0XHR0aW1lc3RhbXA6IERhdGUubm93KCksXG5cdFx0XHRcdHBheWxvYWQ6IHtcblx0XHRcdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRcdFx0eDogZXZlbnQuY2xpZW50WCxcblx0XHRcdFx0XHRcdHk6IGV2ZW50LmNsaWVudFlcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHNlbGVjdG9yOiBnZXRDc3NQYXRoKGV2ZW50LnRhcmdldCksXG5cdFx0XHRcdFx0dmFsdWU6IGdldFZhbHVlKGV2ZW50LnRhcmdldClcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdC8vIGNvcnJlY3RzIGNsaWNscyBhZnRlciBzY3JvbGxpbmdcblx0XHRcdHNlbmRUcmFja0RhdGEodXNlckRhdGEsICd3YXZlQWN0aW9ucycsIHtcblx0XHRcdFx0dHlwZTogJ3BhZ2VTY3JvbGwnLFxuXHRcdFx0XHR0aW1lc3RhbXA6IERhdGUubm93KCksXG5cdFx0XHRcdHBheWxvYWQ6IHtcblx0XHRcdFx0XHRvZmZzZXQ6IHtcblx0XHRcdFx0XHRcdHg6IHdpbmRvdy5wYWdlWE9mZnNldCxcblx0XHRcdFx0XHRcdHk6IHdpbmRvdy5wYWdlWU9mZnNldFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRzZW5kVHJhY2tEYXRhKHVzZXJEYXRhLCAnd2F2ZUFjdGlvbnMnLCBkYXRhKTtcblx0XHR9O1xuXHRcdHJldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDbGljaywgeyBjYXB0dXJlOiB0cnVlLCBwYXNzaXZlOiB0cnVlIH0pO1xuXHR9XG59O1xuXG4vLyBjbGlja3MgZG9lc24ndCB3b3JrIG9uIGRpc2FibGVkIGVsZW1lbnRzLlxuLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSLzIwMTQvUkVDLWh0bWw1LTIwMTQxMDI4L2Zvcm1zLmh0bWwjY29uY2VwdC1mZS1kaXNhYmxlZFxuIiwiaW1wb3J0IHsgc2VuZFRyYWNrRGF0YSwgZGVib3VuY2UsIERFRkFVTFRfREVCT1VOQ0VfVElNRSB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCAodXNlckRhdGEpID0+IHtcblx0Ly8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG5cdC8vIFx0J3Jlc2l6ZScsXG5cdC8vIFx0ZGVib3VuY2UoXG5cdC8vIFx0XHQoKSA9PlxuXHQvLyBcdFx0XHRzZW5kVHJhY2tEYXRhKHVzZXJEYXRhLCAnd2F2ZUFjdGlvbnMnLCB7XG5cdC8vIFx0XHRcdFx0dHlwZTogJ3Jlc2l6ZScsXG5cdC8vIFx0XHRcdFx0dGltZXN0YW1wOiBEYXRlLm5vdygpLFxuXHQvLyBcdFx0XHRcdHBheWxvYWQ6IHtcblx0Ly8gXHRcdFx0XHRcdHNpemU6IHtcblx0Ly8gXHRcdFx0XHRcdFx0d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuXHQvLyBcdFx0XHRcdFx0XHRoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodFxuXHQvLyBcdFx0XHRcdFx0fVxuXHQvLyBcdFx0XHRcdH1cblx0Ly8gXHRcdFx0fSksXG5cdC8vIFx0XHRERUZBVUxUX0RFQk9VTkNFX1RJTUVcblx0Ly8gXHQpXG5cdC8vICk7XG59O1xuIiwiaW1wb3J0IHsgc2VuZFRyYWNrRGF0YSwgdGhyb3R0bGUgfSBmcm9tICcuLi9oZWxwZXJzJztcblxuY29uc3QgU0NST0xMX1RIUk9UVExFX1RJTUUgPSAxMDA7XG5cbmV4cG9ydCBkZWZhdWx0ICh1c2VyRGF0YSkgPT4ge1xuXHQvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcblx0Ly8gXHQnc2Nyb2xsJyxcblx0Ly8gXHR0aHJvdHRsZShcblx0Ly8gXHRcdCgpID0+XG5cdC8vIFx0XHRcdHNlbmRUcmFja0RhdGEodXNlckRhdGEsICd3YXZlQWN0aW9ucycsIHtcblx0Ly8gXHRcdFx0XHR0eXBlOiAncGFnZVNjcm9sbCcsXG5cdC8vIFx0XHRcdFx0dGltZXN0YW1wOiBEYXRlLm5vdygpLFxuXHQvLyBcdFx0XHRcdHBheWxvYWQ6IHtcblx0Ly8gXHRcdFx0XHRcdG9mZnNldDoge1xuXHQvLyBcdFx0XHRcdFx0XHR4OiB3aW5kb3cucGFnZVhPZmZzZXQsXG5cdC8vIFx0XHRcdFx0XHRcdHk6IHdpbmRvdy5wYWdlWU9mZnNldFxuXHQvLyBcdFx0XHRcdFx0fVxuXHQvLyBcdFx0XHRcdH1cblx0Ly8gXHRcdFx0fSksXG5cdC8vIFx0XHRTQ1JPTExfVEhST1RUTEVfVElNRVxuXHQvLyBcdClcblx0Ly8gKTtcbn07XG4iLCJpbXBvcnQgeyBzZW5kVHJhY2tEYXRhIH0gZnJvbSAnLi4vaGVscGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0ICh1c2VyRGF0YSkgPT4ge1xuXHRpZiAod2luZG93LldBVkVfVFJBQ0tfRk9STVMpIHtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtJykuZm9yRWFjaCgoZm9ybSkgPT4ge1xuXHRcdFx0bGV0IGVtYWlsRWwgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9ZW1haWxdJylbMF07XG5cblx0XHRcdGlmIChlbWFpbEVsKSB7XG5cdFx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKCkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGFjdGlvbkRhdGEgPSB7XG5cdFx0XHRcdFx0XHR0eXBlOiAnc2lnbnVwJyxcblx0XHRcdFx0XHRcdHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcblx0XHRcdFx0XHRcdHBheWxvYWQ6IHt9XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdHNlbmRUcmFja0RhdGEodXNlckRhdGEsICd3YXZlQWN0aW9ucycsIGFjdGlvbkRhdGEpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufTtcbiIsImltcG9ydCB7IHNlbmRUcmFja0RhdGEsIHRocm90dGxlIH0gZnJvbSAnLi4vaGVscGVycyc7XG5cbi8vIFByb2JhYmx5IHdlIG5lZWQgaXQgbGVzcyB0aGFuIDIwMG1zXG4vLyBmb3IgYmV0dGVyIHF1YWxpdHkgb2YgXCJWaXNpdG9yIEFjdGlvbnMgUGxheWVyXCJcbmNvbnN0IE1PVVNFX01PVkVfVEhST1RUTEVfVElNRSA9IDEwMDtcblxuY29uc3QgQUNUSU9OX1NFTkRfSU5URVJWQUwgPSAzMDAwO1xuXG5jb25zdCBldmVudEJ1ZmZlciA9IHtcblx0ZGF0YTogW10sXG5cdGxhdGVzdFNlbmQ6IERhdGUubm93KClcbn07XG5cbmNvbnN0IG1vdXNlTW92ZUhhbmRsZXIgPSAodXNlckRhdGEpID0+IHtcblx0Ly8gZnVuY3Rpb24gaGFuZGxlRXZlbnQoZXZlbnQpIHtcblx0Ly8gXHRjb25zdCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuXHQvLyBcdGNvbnN0IHJlY29yZCA9IHtcblx0Ly8gXHRcdHg6IGV2ZW50LmNsaWVudFgsXG5cdC8vIFx0XHR5OiBldmVudC5jbGllbnRZLFxuXHQvLyBcdFx0dGltZXN0YW1wXG5cdC8vIFx0fTtcblx0Ly8gXHRldmVudEJ1ZmZlci5kYXRhLnB1c2gocmVjb3JkKTtcblx0Ly8gXHRpZiAodGltZXN0YW1wIC0gZXZlbnRCdWZmZXIubGF0ZXN0U2VuZCA+IEFDVElPTl9TRU5EX0lOVEVSVkFMKSB7XG5cdC8vIFx0XHRjb25zdCBtYW55UmVjb3JkcyA9IHtcblx0Ly8gXHRcdFx0dHlwZTogJ21vdXNlTW92ZScsXG5cdC8vIFx0XHRcdHBheWxvYWQ6IHtcblx0Ly8gXHRcdFx0XHRiYXRjaDogZXZlbnRCdWZmZXIuZGF0YVxuXHQvLyBcdFx0XHR9XG5cdC8vIFx0XHR9O1xuXHQvLyBcdFx0ZXZlbnRCdWZmZXIuZGF0YSA9IFtdO1xuXHQvLyBcdFx0ZXZlbnRCdWZmZXIubGF0ZXN0U2VuZCA9IERhdGUubm93KCk7XG5cdC8vIFx0XHRzZW5kVHJhY2tEYXRhKHVzZXJEYXRhLCAnd2F2ZUFjdGlvbnMnLCBtYW55UmVjb3Jkcyk7XG5cdC8vIFx0fVxuXHQvLyB9XG5cdC8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aHJvdHRsZShoYW5kbGVFdmVudCwgTU9VU0VfTU9WRV9USFJPVFRMRV9USU1FKSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtb3VzZU1vdmVIYW5kbGVyO1xuIiwiaW1wb3J0IHsgc2VuZFRyYWNrRGF0YSB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlTG9jYXRpb25DaGFuZ2UgPSAodXNlckRhdGEpID0+IHtcblx0Y29uc3QgeyBocmVmIH0gPSB3aW5kb3cubG9jYXRpb247XG5cblx0Y29uc3QgYWN0aW9uRGF0YSA9IHtcblx0XHR0eXBlOiAncGF0aENoYW5nZScsXG5cdFx0dGltZXN0YW1wOiBEYXRlLm5vdygpLFxuXHRcdHBheWxvYWQ6IHtcblx0XHRcdHZhbHVlOiBocmVmXG5cdFx0fVxuXHR9O1xuXG5cdHNlbmRUcmFja0RhdGEodXNlckRhdGEsICd3YXZlQWN0aW9ucycsIGFjdGlvbkRhdGEpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgKHVzZXJEYXRhKSA9PiB7XG5cdHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSA9ICgoZikgPT5cblx0XHRmdW5jdGlvbiBwdXNoU3RhdGUoLi4uYXJnKSB7XG5cdFx0XHRjb25zdCByZXQgPSBmLmFwcGx5KHRoaXMsIGFyZyk7XG5cblx0XHRcdHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9jYXRpb25jaGFuZ2UnKSk7XG5cblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fSkod2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKTtcblxuXHR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUgPSAoKGYpID0+XG5cdFx0ZnVuY3Rpb24gcmVwbGFjZVN0YXRlKC4uLmFyZykge1xuXHRcdFx0Y29uc3QgcmV0ID0gZi5hcHBseSh0aGlzLCBhcmcpO1xuXG5cdFx0XHR3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2xvY2F0aW9uY2hhbmdlJykpO1xuXG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH0pKHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgKCkgPT4ge1xuXHRcdHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9jYXRpb25jaGFuZ2UnKSk7XG5cdH0pO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgKCkgPT4ge1xuXHRcdHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9jYXRpb25jaGFuZ2UnKSk7XG5cdH0pO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwYWdlc2hvdycsICgpID0+IHtcblx0XHR3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2xvY2F0aW9uY2hhbmdlJykpO1xuXHR9KTtcblxuXHRyZXR1cm4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvY2F0aW9uY2hhbmdlJywgKCkgPT4ge1xuXHRcdGxldCBpc1NraXBMb2NhdGlvbkNoYW5nZSA9IHdpbmRvdy5NV0FWRV9DT05GSUc/LmlzU2tpcExvY2F0aW9uQ2hhbmdlO1xuXG5cdFx0aWYgKCFpc1NraXBMb2NhdGlvbkNoYW5nZSkge1xuXHRcdFx0aGFuZGxlTG9jYXRpb25DaGFuZ2UodXNlckRhdGEpO1xuXHRcdH1cblx0fSk7XG59O1xuIiwiaW1wb3J0IGNvbmZpZyBmcm9tICcuLy4uL2NvbmZpZyc7XG5cbmNvbnN0IEFQSV9VUkwgPSBwcm9jZXNzLmVudi5CVUlMRCA9PT0gJ2RldicgPyBjb25maWcuQVBJX1VSTF9ERVYgOiBjb25maWcuQVBJX1VSTDtcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRyZWdpc3RlcigpIHtcblx0XHRsaWZlY3ljbGUuYWRkRXZlbnRMaXN0ZW5lcignc3RhdGVjaGFuZ2UnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdGlmIChldmVudC5uZXdTdGF0ZSA9PT0gJ2hpZGRlbicpIHtcblx0XHRcdFx0bGV0IHVzZXJEYXRhID0gd2luZG93LldBVkVfVVNFUl9EQVRBO1xuXG5cdFx0XHRcdGlmICh1c2VyRGF0YSkge1xuXHRcdFx0XHRcdGxldCBkYXRhID0ge1xuXHRcdFx0XHRcdFx0cHJvamVjdElkOiB1c2VyRGF0YS5wcm9qZWN0SWQsXG5cdFx0XHRcdFx0XHR2aXNpdG9ySWQ6IHVzZXJEYXRhLnZpc2l0b3JJZCxcblx0XHRcdFx0XHRcdHNlc3Npb25JZDogdXNlckRhdGEuc2Vzc2lvbklkXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRkZWJ1Z2dlcjtcblxuXHRcdFx0XHRcdG5hdmlnYXRvci5zZW5kQmVhY29uKGAke3dpbmRvdy5XQVZFX0FQSV9VUkwgfHwgQVBJX1VSTH0vd2F2ZUFjdGlvbnMvcGluZ2AsIGRhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn07XG4iLCJpbXBvcnQgeyBzZW5kVHJhY2tEYXRhIH0gZnJvbSAnLi4vaGVscGVycyc7XG5cbmNvbnN0IHJlbW92ZVRhZ3MgPSAobm9kZSwgdGFnTmFtZSkgPT4ge1xuXHRjb25zdCBub2RlQ2xvbmVkID0gbm9kZS5jbG9uZU5vZGUodHJ1ZSk7XG5cdGNvbnN0IHRhZ3MgPSBub2RlQ2xvbmVkLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ05hbWUpO1xuXG5cdHdoaWxlICh0YWdzLmxlbmd0aCkge1xuXHRcdHRhZ3NbMF0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0YWdzWzBdKTtcblx0fVxuXG5cdHJldHVybiBub2RlQ2xvbmVkO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZURhbmdlcm91c1RhZ3MgPSAobm9kZSkgPT4ge1xuXHRjb25zdCByb290V2l0aG91dFNjcmlwdHMgPSByZW1vdmVUYWdzKG5vZGUsICdzY3JpcHQnKTtcblx0Y29uc3Qgcm9vdFdpdGhvdXRJZnJhbWVzID0gcmVtb3ZlVGFncyhyb290V2l0aG91dFNjcmlwdHMsICdpZnJhbWUnKTtcblx0cmV0dXJuIHJvb3RXaXRob3V0SWZyYW1lcztcbn07XG5cbmxldCBwcmV2V2lkdGg7XG5sZXQgcHJldkhlaWdodDtcblxuY29uc3QgaGFuZGxlTXV0YXRpb24gPSAodXNlckRhdGEpID0+IHtcblx0Y29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF07XG5cdGlmICghcm9vdCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdFsuLi5yb290LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JyldLmZvckVhY2goKGVsKSA9PiB7XG5cdFx0aWYgKCFlbC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgJiYgZWwudmFsdWUpIHtcblx0XHRcdGVsLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBlbC52YWx1ZSk7XG5cdFx0fVxuXHR9KTtcblxuXHRjb25zdCByb290V2l0aG91dERhbmdlcm91c1RhZ3MgPSByZW1vdmVEYW5nZXJvdXNUYWdzKHJvb3QpO1xuXHRjb25zdCBzY3JlZW4gPSByb290V2l0aG91dERhbmdlcm91c1RhZ3Mub3V0ZXJIVE1MO1xuXG5cdGNvbnN0IHdpZHRoID0gcm9vdC5vZmZzZXRXaWR0aDtcblx0Y29uc3QgaGVpZ2h0ID0gcm9vdC5vZmZzZXRIZWlnaHQ7XG5cblx0aWYgKHByZXZXaWR0aCAhPT0gd2lkdGggJiYgcHJldkhlaWdodCAhPT0gaGVpZ2h0KSB7XG5cdFx0c2VuZFRyYWNrRGF0YSh1c2VyRGF0YSwgJ3dhdmVSZWNvcmRzJywge1xuXHRcdFx0dGltZXN0YW1wOiBEYXRlLm5vdygpLFxuXHRcdFx0cGF5bG9hZDoge1xuXHRcdFx0XHRzaXplOiB7XG5cdFx0XHRcdFx0d2lkdGgsXG5cdFx0XHRcdFx0aGVpZ2h0XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNjcmVlblxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cHJldldpZHRoID0gd2lkdGg7XG5cdFx0cHJldkhlaWdodCA9IGhlaWdodDtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlTXV0YXRpb247XG4iLCJpbXBvcnQgeyBkZWJvdW5jZSwgREVGQVVMVF9ERUJPVU5DRV9USU1FIH0gZnJvbSAnLi4vaGVscGVycyc7XG5cbmltcG9ydCBoYW5kbGVNdXRhdGlvbiBmcm9tICcuL211dGF0aW9uJztcblxuY29uc3QgaW5pdCA9ICh1c2VyRGF0YSkgPT4ge1xuICBjb25zdCBNdXRhdGlvbk9ic2VydmVyID0gd2luZG93Lk11dGF0aW9uT2JzZXJ2ZXJcbiAgfHwgd2luZG93LldlYktpdE11dGF0aW9uT2JzZXJ2ZXJcbiAgfHwgd2luZG93Lk1vek11dGF0aW9uT2JzZXJ2ZXI7XG5cbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihcbiAgICBkZWJvdW5jZSgoKSA9PiBoYW5kbGVNdXRhdGlvbih1c2VyRGF0YSksIERFRkFVTFRfREVCT1VOQ0VfVElNRSksXG4gICk7XG4gIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIHsgc3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBhdHRyaWJ1dGVzOiB0cnVlIH0pO1xuICBoYW5kbGVNdXRhdGlvbih1c2VyRGF0YSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXQsXG59O1xuIiwiaW1wb3J0ICcuL2xpYi9maW5nZXJwcmludDIubWluJztcbmltcG9ydCAnLi9saWIvbGlmZWN5Y2xlJztcbmltcG9ydCBjbGlja0hhbmRsZXIgZnJvbSAnLi9hY3Rpb25zL2NsaWNrJztcbmltcG9ydCBwYWdlUmVzaXplSGFuZGxlciBmcm9tICcuL2FjdGlvbnMvcGFnZVJlc2l6ZSc7XG5pbXBvcnQgcGFnZVNjcm9sbGluZ0hhbmRsZXIgZnJvbSAnLi9hY3Rpb25zL3BhZ2VTY3JvbGxpbmcnO1xuaW1wb3J0IHNpZ251cEhhbmRsZXIgZnJvbSAnLi9hY3Rpb25zL3NpZ251cCc7XG5pbXBvcnQgbW91c2VNb3ZlSGFuZGxlciBmcm9tICcuL2FjdGlvbnMvbW91c2VNb3ZlJztcbmltcG9ydCBwYXRoQ2hhbmdlSGFuZGxlciwgeyBoYW5kbGVMb2NhdGlvbkNoYW5nZSB9IGZyb20gJy4vYWN0aW9ucy9wYXRoQ2hhbmdlJztcbmltcG9ydCBvbkV4aXQgZnJvbSAnLi9hY3Rpb25zL29uRXhpdCc7XG5cbmltcG9ydCB0cmFja2VyTXV0YXRpb25PYnNlcnZlciBmcm9tICcuL3JlY29yZHMvb2JzZXJ2ZXInO1xuXG5pbXBvcnQge1xuXHRzZW5kRGF0YSxcblx0cmVnaXN0ZXJIYW5kbGVycyxcblx0Z2V0RGV2aWNlVHlwZSxcblx0Z2V0QnJvd3Nlck5hbWUsXG5cdGdldENvbm5lY3Rpb25UeXBlLFxuXHRnZXRPUyxcblx0c2VuZFRyYWNrRXZlbnQsXG5cdHNlbmRQaW5nXG59IGZyb20gJy4vaGVscGVycyc7XG5cbnRyeSB7XG5cdG9uRXhpdC5yZWdpc3RlcigpO1xufSBjYXRjaCAoZXJyKSB7fVxuXG53aW5kb3cubXdhdmUgPSB7XG5cdHNlbmRUcmFja0V2ZW50LFxuXHRzZW5kUGluZ1xufTtcblxuaWYgKHByb2Nlc3MuZW52LkJVSUxEID09PSAnZGV2Jykge1xuXHRpZiAoRmluZ2VycHJpbnQyICYmIEZpbmdlcnByaW50Mi5nZXRWMTgpIHtcblx0XHRjb25zb2xlLmxvZygnRmluZ2VycHJpbnQyLmdldFYxODonLCB0eXBlb2YgRmluZ2VycHJpbnQyLmdldFYxOCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLmVycm9yKCdGaW5nZXJwcmludDIgbm90IGxvYWRlZCBjb3JyZWN0bHkhJywgRmluZ2VycHJpbnQyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXHR9XG59XG5cbmNvbnN0IGRlZmF1bHRIYW5kbGVycyA9IFtcblx0Y2xpY2tIYW5kbGVyLFxuXHRwYWdlUmVzaXplSGFuZGxlcixcblx0cGFnZVNjcm9sbGluZ0hhbmRsZXIsXG5cdHNpZ251cEhhbmRsZXIsXG5cdG1vdXNlTW92ZUhhbmRsZXIsXG5cdHBhdGhDaGFuZ2VIYW5kbGVyXG5dO1xuXG5jb25zdCBjYWxjSWRlbnRpZmljYXRvciA9ICgpID0+XG5cdG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuXHRcdEZpbmdlcnByaW50Mi5nZXRWMTgoKHJlc3VsdCkgPT4ge1xuXHRcdFx0aWYgKCFyZXN1bHQpIHtcblx0XHRcdFx0cmVqKG5ldyBFcnJvcignSWRlbnRpZmljYXRvciBub3QgY3JlYXRlZCEnKSk7XG5cdFx0XHR9XG5cblx0XHRcdHJlcyhyZXN1bHQpO1xuXHRcdH0pO1xuXHR9KTtcblxuZnVuY3Rpb24gc2V0Q29va2llKGNfbmFtZSwgdmFsdWUsIGV4ZGF5cykge1xuXHR2YXIgZXhkYXRlID0gbmV3IERhdGUoKTtcblx0ZXhkYXRlLnNldERhdGUoZXhkYXRlLmdldERhdGUoKSArIGV4ZGF5cyk7XG5cdHZhciBjX3ZhbHVlID0gZXNjYXBlKHZhbHVlKSArIChleGRheXMgPT0gbnVsbCA/ICcnIDogJzsgZXhwaXJlcz0nICsgZXhkYXRlLnRvVVRDU3RyaW5nKCkpO1xuXHRkb2N1bWVudC5jb29raWUgPSBjX25hbWUgKyAnPScgKyBjX3ZhbHVlO1xufVxuXG5mdW5jdGlvbiBnZXRDb29raWUoY19uYW1lKSB7XG5cdHZhciBpLFxuXHRcdHgsXG5cdFx0eSxcblx0XHRBUlJjb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7Jyk7XG5cdGZvciAoaSA9IDA7IGkgPCBBUlJjb29raWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0eCA9IEFSUmNvb2tpZXNbaV0uc3Vic3RyKDAsIEFSUmNvb2tpZXNbaV0uaW5kZXhPZignPScpKTtcblx0XHR5ID0gQVJSY29va2llc1tpXS5zdWJzdHIoQVJSY29va2llc1tpXS5pbmRleE9mKCc9JykgKyAxKTtcblx0XHR4ID0geC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG5cdFx0aWYgKHggPT0gY19uYW1lKSB7XG5cdFx0XHRyZXR1cm4gdW5lc2NhcGUoeSk7XG5cdFx0fVxuXHR9XG59XG5cbmNvbnN0IGluaXQgPVxuXHQoaW5pdGlhbFVzZXJEYXRhLCBoYW5kbGVycyA9IGRlZmF1bHRIYW5kbGVycykgPT5cblx0KCkgPT4ge1xuXHRcdGNvbnN0IHVzZXJEYXRhID0geyAuLi5pbml0aWFsVXNlckRhdGEgfTtcblxuXHRcdHJldHVybiBjYWxjSWRlbnRpZmljYXRvcigpXG5cdFx0XHQudGhlbigodmlzaXRvcklkKSA9PiB7XG5cdFx0XHRcdHVzZXJEYXRhLnZpc2l0b3JJZCA9IHZpc2l0b3JJZDtcblx0XHRcdFx0c2V0Q29va2llKCd3YXZlX2ZpbmdlcnByaW50JywgdmlzaXRvcklkKTtcblx0XHRcdFx0d2luZG93LldBVkVfRklOR0VSUFJJTlQgPSB2aXNpdG9ySWQ7XG5cblx0XHRcdFx0cmV0dXJuIGZldGNoKCdodHRwczovL2FwaS5pcGlmeS5vcmcnKVxuXHRcdFx0XHRcdC50aGVuKChyZXMpID0+IHJlcy50ZXh0KCkpXG5cdFx0XHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHBheWxvYWQgPSB7XG5cdFx0XHRcdFx0XHRcdG9zOiBnZXRPUygpLFxuXHRcdFx0XHRcdFx0XHRicm93c2VyTmFtZTogZ2V0QnJvd3Nlck5hbWUoKSxcblx0XHRcdFx0XHRcdFx0ZGV2aWNlVHlwZTogZ2V0RGV2aWNlVHlwZSgpLFxuXHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uVHlwZTogZ2V0Q29ubmVjdGlvblR5cGUoKSxcblx0XHRcdFx0XHRcdFx0aXBBZGRyZXNzOiBkYXRhLFxuXG5cdFx0XHRcdFx0XHRcdHJlZmVycmVyVXJsOiBkb2N1bWVudC5yZWZlcnJlclxuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0Y29uc3Qgc2Vzc2lvbiA9IEpTT04ucGFyc2UoXG5cdFx0XHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5nZXRJdGVtKGB3YXZlX3Nlc3Npb25fJHt3aW5kb3cuV0FWRV9TVUJQUk9KRUNUX0lEIHx8ICcnfWApXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0Y29uc3QgVEVOX01JTlVURVNfTVMgPSAxICogNjAgKiAxMDAwO1xuXG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdHNlc3Npb24gJiZcblx0XHRcdFx0XHRcdFx0c2Vzc2lvbi5zZXNzaW9uSWQgJiZcblx0XHRcdFx0XHRcdFx0bmV3IERhdGUoKSAtIG5ldyBEYXRlKHNlc3Npb24udXBkYXRlZE9uKSA8IFRFTl9NSU5VVEVTX01TXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0XHRzZXNzaW9uSWQ6IHNlc3Npb24uc2Vzc2lvbklkXG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybiBzZW5kRGF0YSgnd2F2ZVNlc3Npb25zL2luaXQnLCB7XG5cdFx0XHRcdFx0XHRcdHZpc2l0b3JJZCxcblx0XHRcdFx0XHRcdFx0ZG9tYWluOiB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUsXG5cdFx0XHRcdFx0XHRcdHVybDogd2luZG93LmxvY2F0aW9uLmhyZWYsXG5cdFx0XHRcdFx0XHRcdHBheWxvYWQsXG5cdFx0XHRcdFx0XHRcdHByb2plY3RJZDogdXNlckRhdGEucHJvamVjdElkLFxuXG5cdFx0XHRcdFx0XHRcdC4uLih3aW5kb3cuTVdBVkVfQ09ORklHXG5cdFx0XHRcdFx0XHRcdFx0PyB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHN1YlByb2plY3RJZDogd2luZG93Lk1XQVZFX0NPTkZJRz8uc3ViUHJvamVjdElkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRwYWdlSWQ6IHdpbmRvdy5NV0FWRV9DT05GSUc/LnBhZ2VJZFxuXHRcdFx0XHRcdFx0XHRcdCAgfVxuXHRcdFx0XHRcdFx0XHRcdDoge30pXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH0pXG5cdFx0XHQudGhlbigoeyBzZXNzaW9uSWQgfSkgPT4ge1xuXHRcdFx0XHRpZiAoc2Vzc2lvbklkKSB7XG5cdFx0XHRcdFx0Y29uc3Qgc2V0U2Vzc2lvbiA9ICgpID0+IHtcblx0XHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuXHRcdFx0XHRcdFx0XHQnd2F2ZV9zZXNzaW9uJyxcblx0XHRcdFx0XHRcdFx0SlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRcdFx0XHRcdHNlc3Npb25JZCxcblx0XHRcdFx0XHRcdFx0XHR1cGRhdGVkT246IG5ldyBEYXRlKClcblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdHNldFNlc3Npb24oKTtcblx0XHRcdFx0XHR3aW5kb3cuV0FWRV9TRVNTSU9OX0lEID0gc2Vzc2lvbklkO1xuXHRcdFx0XHRcdHNldEludGVydmFsKHNldFNlc3Npb24sIDEwICogMTAwMCk7XG5cblx0XHRcdFx0XHR1c2VyRGF0YS5zZXNzaW9uSWQgPSBzZXNzaW9uSWQ7XG5cblx0XHRcdFx0XHRyZWdpc3RlckhhbmRsZXJzKHVzZXJEYXRhLCBoYW5kbGVycyk7XG5cdFx0XHRcdFx0d2luZG93LldBVkVfVVNFUl9EQVRBID0gdXNlckRhdGE7XG5cdFx0XHRcdFx0dHJhY2tlck11dGF0aW9uT2JzZXJ2ZXIuaW5pdCh1c2VyRGF0YSk7XG5cdFx0XHRcdFx0aGFuZGxlTG9jYXRpb25DaGFuZ2UodXNlckRhdGEpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHByb2Nlc3MuZW52LkJVSUxEID09PSAnZGV2Jykge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBzZXNzaW9uSWQgbm90IHNldHRlZDonLCBzZXNzaW9uSWQpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0dXNlckRhdGFcblx0XHRcdFx0fTtcblx0XHRcdH0pO1xuXHR9O1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGluaXRcbn07XG4iLCJpbXBvcnQgdHJhY2tlciBmcm9tICcuL3RyYWNrZXInO1xuXG5leHBvcnQgZGVmYXVsdCAoKCkgPT4ge1xuXHRjb25zdCBwYXJhbXMgPSB3aW5kb3cud2F2ZSAmJiB3aW5kb3cud2F2ZS5wYXJhbXM7XG5cblx0aWYgKHByb2Nlc3MuZW52LkJVSUxEID09PSAnZGV2Jykge1xuXHRcdGNvbnNvbGUubG9nKCdXYXZlIHNjcmlwdCBwYXJhbXM6JywgcGFyYW1zKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXHR9XG5cblx0Ly8gZG9uJ3QgY2hhbmdlIG9iamVjdCdzIGxpbmsuXG5cdGNvbnN0IHVzZXJEYXRhID0ge1xuXHRcdHZpc2l0b3JJZDogbnVsbCxcblx0XHRzZXNzaW9uSWQ6IG51bGwsXG5cdFx0cHJvamVjdElkOiBwYXJhbXMgJiYgcGFyYW1zLnBpZFxuXHR9O1xuXG5cdGlmICh3aW5kb3cucmVxdWVzdElkbGVDYWxsYmFjaykge1xuXHRcdHJlcXVlc3RJZGxlQ2FsbGJhY2sodHJhY2tlci5pbml0KHVzZXJEYXRhKSk7XG5cdH0gZWxzZSB7XG5cdFx0c2V0VGltZW91dCh0cmFja2VyLmluaXQodXNlckRhdGEpLCA1MDApO1xuXHR9XG59KSgpO1xuIl0sIm5hbWVzIjpbImUiLCJ0IiwiYSIsIndpbmRvdyIsImRlZmluZSIsImFtZCIsIm1vZHVsZSIsImV4cG9ydHMiLCJGaW5nZXJwcmludDIiLCJ0aGlzIiwiZCIsImciLCJmIiwiaCIsIm0iLCJUIiwibCIsImxlbmd0aCIsIm4iLCJyIiwiaSIsIm8iLCJzIiwiYyIsInUiLCJjaGFyQ29kZUF0IiwidG9TdHJpbmciLCJzbGljZSIsInByZXByb2Nlc3NvciIsImF1ZGlvIiwidGltZW91dCIsImV4Y2x1ZGVJT1MxMSIsImZvbnRzIiwic3dmQ29udGFpbmVySWQiLCJzd2ZQYXRoIiwidXNlckRlZmluZWRGb250cyIsImV4dGVuZGVkSnNGb250cyIsInNjcmVlbiIsImRldGVjdFNjcmVlbk9yaWVudGF0aW9uIiwicGx1Z2lucyIsInNvcnRQbHVnaW5zRm9yIiwiZXhjbHVkZUlFIiwiZXh0cmFDb21wb25lbnRzIiwiZXhjbHVkZXMiLCJlbnVtZXJhdGVEZXZpY2VzIiwicGl4ZWxSYXRpbyIsImRvTm90VHJhY2siLCJmb250c0ZsYXNoIiwiTk9UX0FWQUlMQUJMRSIsIkVSUk9SIiwiRVhDTFVERUQiLCJBcnJheSIsInByb3RvdHlwZSIsImZvckVhY2giLCJoYXNPd25Qcm9wZXJ0eSIsIm1hcCIsInB1c2giLCJuYXZpZ2F0b3IiLCJtZWRpYURldmljZXMiLCJ3aWR0aCIsImhlaWdodCIsInNvcnQiLCJyZXZlcnNlIiwiYXZhaWxXaWR0aCIsImF2YWlsSGVpZ2h0IiwibmFtZSIsInR5cGUiLCJzdWZmaXhlcyIsImRlc2NyaXB0aW9uIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiQWN0aXZlWE9iamVjdCIsImNvbmNhdCIsInVzZXJBZ2VudCIsIm1hdGNoIiwicCIsInNlc3Npb25TdG9yYWdlIiwidiIsImxvY2FsU3RvcmFnZSIsIkEiLCJpbmRleGVkREIiLCJTIiwiaGFyZHdhcmVDb25jdXJyZW5jeSIsIkMiLCJjcHVDbGFzcyIsIkIiLCJwbGF0Zm9ybSIsInciLCJtc0RvTm90VHJhY2siLCJtYXhUb3VjaFBvaW50cyIsIm1zTWF4VG91Y2hQb2ludHMiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwieSIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsImRpc3BsYXkiLCJnZXRDb250ZXh0IiwicmVjdCIsImlzUG9pbnRJblBhdGgiLCJ0ZXh0QmFzZWxpbmUiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsImRvbnRVc2VGYWtlRm9udEluQ2FudmFzIiwiZm9udCIsImZpbGxUZXh0IiwiZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uIiwiYmVnaW5QYXRoIiwiYXJjIiwiTWF0aCIsIlBJIiwiY2xvc2VQYXRoIiwiZmlsbCIsInRvRGF0YVVSTCIsIkUiLCJjbGVhckNvbG9yIiwiZW5hYmxlIiwiREVQVEhfVEVTVCIsImRlcHRoRnVuYyIsIkxFUVVBTCIsImNsZWFyIiwiQ09MT1JfQlVGRkVSX0JJVCIsIkRFUFRIX0JVRkZFUl9CSVQiLCJGIiwiY3JlYXRlQnVmZmVyIiwiYmluZEJ1ZmZlciIsIkFSUkFZX0JVRkZFUiIsIkZsb2F0MzJBcnJheSIsImJ1ZmZlckRhdGEiLCJTVEFUSUNfRFJBVyIsIml0ZW1TaXplIiwibnVtSXRlbXMiLCJjcmVhdGVQcm9ncmFtIiwiY3JlYXRlU2hhZGVyIiwiVkVSVEVYX1NIQURFUiIsInNoYWRlclNvdXJjZSIsImNvbXBpbGVTaGFkZXIiLCJGUkFHTUVOVF9TSEFERVIiLCJhdHRhY2hTaGFkZXIiLCJsaW5rUHJvZ3JhbSIsInVzZVByb2dyYW0iLCJ2ZXJ0ZXhQb3NBdHRyaWIiLCJnZXRBdHRyaWJMb2NhdGlvbiIsIm9mZnNldFVuaWZvcm0iLCJnZXRVbmlmb3JtTG9jYXRpb24iLCJlbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSIsInZlcnRleFBvc0FycmF5IiwidmVydGV4QXR0cmliUG9pbnRlciIsIkZMT0FUIiwidW5pZm9ybTJmIiwiZHJhd0FycmF5cyIsIlRSSUFOR0xFX1NUUklQIiwiY2FudmFzIiwiZ2V0U3VwcG9ydGVkRXh0ZW5zaW9ucyIsImpvaW4iLCJnZXRQYXJhbWV0ZXIiLCJBTElBU0VEX0xJTkVfV0lEVEhfUkFOR0UiLCJBTElBU0VEX1BPSU5UX1NJWkVfUkFOR0UiLCJBTFBIQV9CSVRTIiwiZ2V0Q29udGV4dEF0dHJpYnV0ZXMiLCJhbnRpYWxpYXMiLCJCTFVFX0JJVFMiLCJERVBUSF9CSVRTIiwiR1JFRU5fQklUUyIsImdldEV4dGVuc2lvbiIsIk1BWF9URVhUVVJFX01BWF9BTklTT1RST1BZX0VYVCIsIk1BWF9DT01CSU5FRF9URVhUVVJFX0lNQUdFX1VOSVRTIiwiTUFYX0NVQkVfTUFQX1RFWFRVUkVfU0laRSIsIk1BWF9GUkFHTUVOVF9VTklGT1JNX1ZFQ1RPUlMiLCJNQVhfUkVOREVSQlVGRkVSX1NJWkUiLCJNQVhfVEVYVFVSRV9JTUFHRV9VTklUUyIsIk1BWF9URVhUVVJFX1NJWkUiLCJNQVhfVkFSWUlOR19WRUNUT1JTIiwiTUFYX1ZFUlRFWF9BVFRSSUJTIiwiTUFYX1ZFUlRFWF9URVhUVVJFX0lNQUdFX1VOSVRTIiwiTUFYX1ZFUlRFWF9VTklGT1JNX1ZFQ1RPUlMiLCJNQVhfVklFV1BPUlRfRElNUyIsIlJFRF9CSVRTIiwiUkVOREVSRVIiLCJTSEFESU5HX0xBTkdVQUdFX1ZFUlNJT04iLCJTVEVOQ0lMX0JJVFMiLCJWRU5ET1IiLCJWRVJTSU9OIiwiVU5NQVNLRURfVkVORE9SX1dFQkdMIiwiVU5NQVNLRURfUkVOREVSRVJfV0VCR0wiLCJnZXRTaGFkZXJQcmVjaXNpb25Gb3JtYXQiLCJ0b0xvd2VyQ2FzZSIsIk0iLCJ4IiwiaW5uZXJIVE1MIiwiY2xhc3NOYW1lIiwiYm9keSIsImFwcGVuZENoaWxkIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIm9mZnNldEhlaWdodCIsInJlbW92ZUNoaWxkIiwiTyIsImxhbmd1YWdlcyIsInN1YnN0ciIsImxhbmd1YWdlIiwiYiIsIlAiLCJvc2NwdSIsImluZGV4T2YiLCJMIiwicHJvZHVjdFN1YiIsImV2YWwiLCJ0b1NvdXJjZSIsIkkiLCJrIiwiV2ViR0xSZW5kZXJpbmdDb250ZXh0IiwiUiIsImFwcE5hbWUiLCJ0ZXN0IiwiRCIsInN3Zm9iamVjdCIsIk4iLCJoYXNGbGFzaFBsYXllclZlcnNpb24iLCJfIiwic2V0QXR0cmlidXRlIiwib25SZWFkeSIsImVtYmVkU1dGIiwiYWxsb3dTY3JpcHRBY2Nlc3MiLCJtZW51IiwiRyIsImtleSIsImdldERhdGEiLCJ3ZWJkcml2ZXIiLCJ1c2VyTGFuZ3VhZ2UiLCJicm93c2VyTGFuZ3VhZ2UiLCJzeXN0ZW1MYW5ndWFnZSIsImNvbG9yRGVwdGgiLCJkZXZpY2VNZW1vcnkiLCJkZXZpY2VQaXhlbFJhdGlvIiwiRGF0ZSIsImdldFRpbWV6b25lT2Zmc2V0IiwiSW50bCIsIkRhdGVUaW1lRm9ybWF0IiwicmVzb2x2ZWRPcHRpb25zIiwidGltZVpvbmUiLCJhZGRCZWhhdmlvciIsIm9wZW5EYXRhYmFzZSIsImZpbHRlciIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwicG9zaXRpb24iLCJsZWZ0IiwiZm9udFNpemUiLCJmb250U3R5bGUiLCJmb250V2VpZ2h0IiwibGV0dGVyU3BhY2luZyIsImxpbmVCcmVhayIsImxpbmVIZWlnaHQiLCJ0ZXh0VHJhbnNmb3JtIiwidGV4dEFsaWduIiwidGV4dERlY29yYXRpb24iLCJ0ZXh0U2hhZG93Iiwid2hpdGVTcGFjZSIsIndvcmRCcmVhayIsIndvcmRTcGFjaW5nIiwib2Zmc2V0V2lkdGgiLCJmb250RmFtaWx5IiwicGF1c2VCZWZvcmUiLCJPZmZsaW5lQXVkaW9Db250ZXh0Iiwid2Via2l0T2ZmbGluZUF1ZGlvQ29udGV4dCIsImNyZWF0ZU9zY2lsbGF0b3IiLCJmcmVxdWVuY3kiLCJzZXRWYWx1ZUF0VGltZSIsImN1cnJlbnRUaW1lIiwiY3JlYXRlRHluYW1pY3NDb21wcmVzc29yIiwiY29ubmVjdCIsImRlc3RpbmF0aW9uIiwic3RhcnQiLCJzdGFydFJlbmRlcmluZyIsInNldFRpbWVvdXQiLCJjb25zb2xlIiwid2FybiIsIm9uY29tcGxldGUiLCJjbGVhclRpbWVvdXQiLCJyZW5kZXJlZEJ1ZmZlciIsImdldENoYW5uZWxEYXRhIiwicmVkdWNlIiwiYWJzIiwiZGlzY29ubmVjdCIsInRoZW4iLCJkZXZpY2VJZCIsImdyb3VwSWQiLCJraW5kIiwibGFiZWwiLCJVIiwiRXJyb3IiLCJnZXQiLCJjYWxsIiwiY29tcG9uZW50cyIsImRhdGEiLCJhZGRQcmVwcm9jZXNzZWRDb21wb25lbnQiLCJ2YWx1ZSIsIlN0cmluZyIsImdldFByb21pc2UiLCJQcm9taXNlIiwiZ2V0VjE4IiwieDY0aGFzaDEyOCIsImxpZmVjeWNsZSIsIkV2ZW50VGFyZ2V0IiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJjb25zdHJ1Y3RvciIsIlR5cGVFcnJvciIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImRlZmluZVByb3BlcnR5IiwiY3JlYXRlIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJSZWZlcmVuY2VFcnJvciIsIl9yZWdpc3RyeSIsIl9nZXRSZWdpc3RyeSIsInNwbGljZSIsInRhcmdldCIsImZyZWV6ZSIsIkV2ZW50IiwiZ2V0UHJvdG90eXBlT2YiLCJuZXdTdGF0ZSIsIm9sZFN0YXRlIiwib3JpZ2luYWxFdmVudCIsInNhZmFyaSIsInB1c2hOb3RpZmljYXRpb24iLCJzZWxmIiwicHJldmVudERlZmF1bHQiLCJyZXR1cm5WYWx1ZSIsInZpc2liaWxpdHlTdGF0ZSIsImhhc0ZvY3VzIiwiX3N0YXRlIiwiX3Vuc2F2ZWRDaGFuZ2VzIiwiX2hhbmRsZUV2ZW50cyIsImJpbmQiLCJhZGRFdmVudExpc3RlbmVyIiwiX3NhZmFyaUJlZm9yZVVubG9hZFRpbWVvdXQiLCJkZWZhdWx0UHJldmVudGVkIiwiX2Rpc3BhdGNoQ2hhbmdlc0lmTmVlZGVkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImtleXMiLCJkaXNwYXRjaEV2ZW50IiwicGVyc2lzdGVkIiwid2FzRGlzY2FyZGVkIiwiY29uZmlnIiwiQVBJX1VSTCIsIkFQSV9VUkxfREVWIiwiQ0xBU1NfRElWSURFUiIsIkRFRkFVTFRfREVCT1VOQ0VfVElNRSIsImdldFBhcmVudHMiLCJlbGVtZW50IiwicGFyZW50cyIsInBhcmVudE5vZGUiLCJnZXRDb3VudFNhbWVOb2RlTmFtZSIsImVsZW1lbnRzQXJyYXkiLCJjb3VudCIsImN1cnJlbnRFbGVtZW50Iiwibm9kZU5hbWUiLCJnZXROdGhOdW1iZXIiLCJudGgiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwiZ2V0Q3NzUGF0aCIsImVsZW1lbnRQYXJlbnRzIiwic2VsZWN0b3JzQXJyYXkiLCJlbGVtZW50SXRlbSIsImlkIiwic2VsZWN0b3IiLCJzaWJsaW5nIiwiY2hpbGRyZW4iLCJjb3VudFNhbWVOb2RlTmFtZSIsImNsYXNzTmFtZXMiLCJyZXBsYWNlIiwibnRoTnVtYmVyIiwicmVzdWx0UGF0aCIsImdldFZhbHVlIiwiaW5uZXJUZXh0Iiwic2VuZERhdGEiLCJ1cmwiLCJmZXRjaCIsIldBVkVfQVBJX1VSTCIsIm1ldGhvZCIsImhlYWRlcnMiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzcG9uc2UiLCJqc29uIiwic2VuZFRyYWNrRGF0YSIsInVzZXJEYXRhIiwiX29iamVjdFNwcmVhZCIsInByb2plY3RJZCIsInZpc2l0b3JJZCIsInNlc3Npb25JZCIsIk1XQVZFX0NPTkZJRyIsInN1YlByb2plY3RJZCIsInBhZ2VJZCIsInRyYWNrRGF0YSIsInNlbmRUcmFja0V2ZW50IiwidGltZXN0YW1wIiwibm93IiwicGF5bG9hZCIsIldBVkVfVVNFUl9EQVRBIiwic2VuZFBpbmciLCJyZWdpc3RlckhhbmRsZXJzIiwiaGFuZGxlcnMiLCJoYW5kbGVyIiwiZGVib3VuY2UiLCJmdW5jIiwiZGVsYXkiLCJibG9ja2VySWQiLCJhcmdzIiwiaW5jbHVkZXMiLCJoYXlzdGFjayIsIm5lZWRsZSIsImZpbmQiLCJ0b0xvY2FsZUxvd2VyQ2FzZSIsIndpbmRvd3MiLCJsaW51eCIsImlwaG9uZSIsImlwb2QiLCJpcGFkIiwiaVBhZE9TMTNVcCIsImlvcyIsIm1hY29zIiwiYW5kcm9pZCIsImFuZHJvaWRQaG9uZSIsImFuZHJvaWRUYWJsZXQiLCJibGFja2JlcnJ5IiwiYmxhY2tiZXJyeVBob25lIiwiYmxhY2tiZXJyeVRhYmxldCIsIndpbmRvd3NQaG9uZSIsIndpbmRvd3NUYWJsZXQiLCJmeG9zIiwiZnhvc1Bob25lIiwiZnhvc1RhYmxldCIsIm1lZWdvIiwibW9iaWxlIiwidGFibGV0IiwiZGVza3RvcCIsImdldERldmljZVR5cGUiLCJnZXRPUyIsImdldEJyb3dzZXJOYW1lIiwiYXBwVmVyc2lvbiIsImRvY3VtZW50TW9kZSIsImdldENvbm5lY3Rpb25UeXBlIiwiY29ubmVjdGlvblR5cGUiLCJjb25uZWN0aW9uIiwiV0FWRV9UUkFDS19DTElDS1MiLCJoYW5kbGVDbGljayIsImV2ZW50IiwiY2xpZW50WCIsImNsaWVudFkiLCJvZmZzZXQiLCJwYWdlWE9mZnNldCIsInBhZ2VZT2Zmc2V0IiwiY2FwdHVyZSIsInBhc3NpdmUiLCJXQVZFX1RSQUNLX0ZPUk1TIiwicXVlcnlTZWxlY3RvckFsbCIsImZvcm0iLCJlbWFpbEVsIiwiYWN0aW9uRGF0YSIsIm1vdXNlTW92ZUhhbmRsZXIiLCJoYW5kbGVMb2NhdGlvbkNoYW5nZSIsImhyZWYiLCJsb2NhdGlvbiIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJhcmciLCJyZXQiLCJhcHBseSIsInJlcGxhY2VTdGF0ZSIsImlzU2tpcExvY2F0aW9uQ2hhbmdlIiwicmVnaXN0ZXIiLCJzZW5kQmVhY29uIiwicmVtb3ZlVGFncyIsIm5vZGUiLCJ0YWdOYW1lIiwibm9kZUNsb25lZCIsImNsb25lTm9kZSIsInRhZ3MiLCJyZW1vdmVEYW5nZXJvdXNUYWdzIiwicm9vdFdpdGhvdXRTY3JpcHRzIiwicm9vdFdpdGhvdXRJZnJhbWVzIiwicHJldldpZHRoIiwicHJldkhlaWdodCIsImhhbmRsZU11dGF0aW9uIiwicm9vdCIsImVsIiwiZ2V0QXR0cmlidXRlIiwicm9vdFdpdGhvdXREYW5nZXJvdXNUYWdzIiwib3V0ZXJIVE1MIiwic2l6ZSIsImluaXQiLCJNdXRhdGlvbk9ic2VydmVyIiwiV2ViS2l0TXV0YXRpb25PYnNlcnZlciIsIk1vek11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlciIsIm9ic2VydmUiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwiYXR0cmlidXRlcyIsIm9uRXhpdCIsImVyciIsIm13YXZlIiwibG9nIiwiZXJyb3IiLCJkZWZhdWx0SGFuZGxlcnMiLCJjbGlja0hhbmRsZXIiLCJwYWdlUmVzaXplSGFuZGxlciIsInBhZ2VTY3JvbGxpbmdIYW5kbGVyIiwic2lnbnVwSGFuZGxlciIsInBhdGhDaGFuZ2VIYW5kbGVyIiwiY2FsY0lkZW50aWZpY2F0b3IiLCJyZXMiLCJyZWoiLCJyZXN1bHQiLCJzZXRDb29raWUiLCJjX25hbWUiLCJleGRheXMiLCJleGRhdGUiLCJzZXREYXRlIiwiZ2V0RGF0ZSIsImNfdmFsdWUiLCJlc2NhcGUiLCJ0b1VUQ1N0cmluZyIsImNvb2tpZSIsImluaXRpYWxVc2VyRGF0YSIsIldBVkVfRklOR0VSUFJJTlQiLCJ0ZXh0Iiwib3MiLCJicm93c2VyTmFtZSIsImRldmljZVR5cGUiLCJpcEFkZHJlc3MiLCJyZWZlcnJlclVybCIsInJlZmVycmVyIiwic2Vzc2lvbiIsInBhcnNlIiwiZ2V0SXRlbSIsIldBVkVfU1VCUFJPSkVDVF9JRCIsIlRFTl9NSU5VVEVTX01TIiwidXBkYXRlZE9uIiwiZG9tYWluIiwiaG9zdG5hbWUiLCJzZXRTZXNzaW9uIiwic2V0SXRlbSIsIldBVkVfU0VTU0lPTl9JRCIsInNldEludGVydmFsIiwidHJhY2tlck11dGF0aW9uT2JzZXJ2ZXIiLCJwYXJhbXMiLCJ3YXZlIiwicGlkIiwicmVxdWVzdElkbGVDYWxsYmFjayIsInRyYWNrZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUFBO0VBQ0E7O0VBRUEsQ0FBRSxVQUFVQSxDQUFDLEVBQUVDLENBQUMsRUFBRUMsQ0FBQyxFQUFFO0lBQ25CLE9BQU9DLE1BQU0sS0FBSyxXQUFXLElBQUksT0FBT0MsTUFBTSxLQUFLLFVBQVUsSUFBSUEsTUFBTSxDQUFDQyxHQUFHLEdBQUdELE1BQU0sQ0FBQ0YsQ0FBQyxDQUFDLEdBQUcsT0FBT0ksTUFBTSxLQUFLLFdBQVcsSUFBSUEsTUFBTSxDQUFDQyxPQUFPLEdBQUdELE1BQU0sQ0FBQ0MsT0FBTyxHQUFHTCxDQUFDLEVBQUUsR0FBR0QsQ0FBQyxDQUFDTSxPQUFPLEdBQUdOLENBQUMsQ0FBQ00sT0FBTyxHQUFHTCxDQUFDLEVBQUUsR0FBR0QsQ0FBQyxDQUFDTyxZQUFZLEdBQUdOLENBQUMsRUFBRSxDQUFBO0VBQ3ZOLENBQUMsQ0FBQyxDQUFDLEVBQUVPLE1BQUksRUFBRSxZQUFNO0lBQ2YsSUFBTUMsQ0FBQyxHQUFHLFNBQUpBLENBQUMsQ0FBYVYsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7RUFBRUQsSUFBQUEsQ0FBQyxHQUFHLENBQUNBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxHQUFHLENBQUNBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtNQUFFLElBQU1DLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQUUsSUFBQSxPQUFPQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUNBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBRyxDQUFBO0lBQUUsSUFBTVMsQ0FBQyxHQUFHLFNBQUpBLENBQUMsQ0FBYVgsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7RUFBRUQsSUFBQUEsQ0FBQyxHQUFHLENBQUNBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxHQUFHLENBQUNBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtNQUFFLElBQU1DLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQUUsSUFBQSxPQUFPQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUNBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBRyxDQUFBO0lBQUUsSUFBTVUsQ0FBQyxHQUFHLFNBQUpBLENBQUMsQ0FBYVosQ0FBQyxFQUFFQyxDQUFDLEVBQUU7TUFBRSxPQUFPLENBQUNBLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUNELENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQyxDQUFDLEdBQUdELENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUdDLENBQUMsRUFBRUQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQyxDQUFDLEdBQUdELENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUdDLENBQUMsQ0FBQyxJQUFJQSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUNELENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUMsQ0FBQyxHQUFHRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHQyxDQUFDLEVBQUVELENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUMsQ0FBQyxHQUFHRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUcsQ0FBQTtJQUFFLElBQU1ZLENBQUMsR0FBRyxTQUFKQSxDQUFDLENBQWFiLENBQUMsRUFBRUMsQ0FBQyxFQUFFO01BQUUsT0FBTyxDQUFDQSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsR0FBR0QsQ0FBQyxHQUFHQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUNELENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUMsQ0FBQyxHQUFHRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHQyxDQUFDLEVBQUVELENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0tBQUcsQ0FBQTtJQUFFLElBQU1hLENBQUMsR0FBRyxTQUFKQSxDQUFDLENBQWFkLENBQUMsRUFBRUMsQ0FBQyxFQUFFO01BQUUsT0FBTyxDQUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFHLENBQUE7RUFBRSxFQUFBLElBQU1jLENBQUMsR0FBRyxTQUFKQSxDQUFDLENBQWFmLENBQUMsRUFBRTtFQUFFLElBQUEsT0FBT0EsQ0FBQyxHQUFHYyxDQUFDLENBQUNkLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsR0FBR1csQ0FBQyxDQUFDWCxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsRUFBRUEsQ0FBQyxHQUFHYyxDQUFDLENBQUNkLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsR0FBR1csQ0FBQyxDQUFDWCxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxHQUFHYyxDQUFDLENBQUNkLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBRyxDQUFBO0VBQUUsRUFBQSxJQUFNZ0IsQ0FBQyxHQUFHLFNBQUEsQ0FBQSxDQUFVaEIsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7TUFBRUEsQ0FBQyxHQUFHQSxDQUFDLElBQUksQ0FBQyxDQUFBO01BQUUsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQ0YsQ0FBQyxHQUFHQSxDQUFDLElBQUksRUFBRSxFQUFFaUIsTUFBTSxHQUFHLEVBQUUsRUFBRUMsQ0FBQyxHQUFHbEIsQ0FBQyxDQUFDaUIsTUFBTSxHQUFHZixDQUFDLEVBQUVpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUVsQixDQUFDLENBQUMsRUFBRW1CLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRW5CLENBQUMsQ0FBQyxFQUFFb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFTCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUVNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsRUFBRUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxFQUFFQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdOLENBQUMsRUFBRU0sQ0FBQyxJQUFJLEVBQUUsRUFBQ0gsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHckIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFUixDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUdoQixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFSCxDQUFDLEdBQUdWLENBQUMsQ0FBQ1UsQ0FBQyxFQUFFQyxDQUFDLENBQUMsRUFBRUQsQ0FBQyxHQUFHVCxDQUFDLENBQUNTLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRUEsQ0FBQyxHQUFHVixDQUFDLENBQUNVLENBQUMsRUFBRUUsQ0FBQyxDQUFDLEVBQUVKLENBQUMsR0FBR0wsQ0FBQyxDQUFDSyxDQUFDLEVBQUVFLENBQUMsQ0FBQyxFQUFFRixDQUFDLEdBQUdQLENBQUMsQ0FBQ08sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFQSxDQUFDLEdBQUdULENBQUMsQ0FBQ1MsQ0FBQyxFQUFFQyxDQUFDLENBQUMsRUFBRUQsQ0FBQyxHQUFHVCxDQUFDLENBQUNDLENBQUMsQ0FBQ1EsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsRUFBRUgsQ0FBQyxHQUFHTCxDQUFDLENBQUNLLENBQUMsRUFBRU8sQ0FBQyxDQUFDLEVBQUVQLENBQUMsR0FBR0osQ0FBQyxDQUFDSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUVBLENBQUMsR0FBR0wsQ0FBQyxDQUFDSyxDQUFDLEVBQUVNLENBQUMsQ0FBQyxFQUFFRixDQUFDLEdBQUdOLENBQUMsQ0FBQ00sQ0FBQyxFQUFFSixDQUFDLENBQUMsRUFBRUksQ0FBQyxHQUFHUixDQUFDLENBQUNRLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRUEsQ0FBQyxHQUFHVixDQUFDLENBQUNVLENBQUMsRUFBRUQsQ0FBQyxDQUFDLEVBQUVDLENBQUMsR0FBR1YsQ0FBQyxDQUFDQyxDQUFDLENBQUNTLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUE7RUFBRSxJQUFBLFFBQVFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRUwsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFZCxDQUFDO0VBQUksTUFBQSxLQUFLLEVBQUU7VUFBRWMsQ0FBQyxHQUFHRixDQUFDLENBQUNFLENBQUMsRUFBRUgsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFYixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFBRSxNQUFBLEtBQUssRUFBRTtVQUFFUixDQUFDLEdBQUdGLENBQUMsQ0FBQ0UsQ0FBQyxFQUFFSCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUViLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUFFLE1BQUEsS0FBSyxFQUFFO1VBQUVSLENBQUMsR0FBR0YsQ0FBQyxDQUFDRSxDQUFDLEVBQUVILENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRWIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQUUsTUFBQSxLQUFLLEVBQUU7VUFBRVIsQ0FBQyxHQUFHRixDQUFDLENBQUNFLENBQUMsRUFBRUgsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFYixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFBRSxNQUFBLEtBQUssRUFBRTtVQUFFUixDQUFDLEdBQUdGLENBQUMsQ0FBQ0UsQ0FBQyxFQUFFSCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUViLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUFFLE1BQUEsS0FBSyxFQUFFO1VBQUVSLENBQUMsR0FBR0YsQ0FBQyxDQUFDRSxDQUFDLEVBQUVILENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRWIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBQUUsTUFBQSxL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QUFDLENBQUMsRUFBRW5CLENBQUMsQ0FBQ2lCLE1BQU0sQ0FBQyxDQUFDLEVBQUVHLENBQUMsR0FBR04sQ0FBQyxDQUFDTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUVwQixDQUFDLENBQUNpQixNQUFNLENBQUMsQ0FBQyxFQUFFRSxDQUFDLEdBQUdULENBQUMsQ0FBQ1MsQ0FBQyxFQUFFQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxHQUFHVixDQUFDLENBQUNVLENBQUMsRUFBRUQsQ0FBQyxDQUFDLEVBQUVBLENBQUMsR0FBR0osQ0FBQyxDQUFDSSxDQUFDLENBQUMsRUFBRUMsQ0FBQyxHQUFHTCxDQUFDLENBQUNLLENBQUMsQ0FBQyxFQUFFRCxDQUFDLEdBQUdULENBQUMsQ0FBQ1MsQ0FBQyxFQUFFQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxHQUFHVixDQUFDLENBQUNVLENBQUMsRUFBRUQsQ0FBQyxDQUFDLEVBQUUsVUFBQSxDQUFBLE1BQUEsQ0FBWSxDQUFDQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFTyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBSUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBQSxDQUFBLE1BQUEsQ0FBWSxDQUFDUixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFTyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBSUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBQSxDQUFBLE1BQUEsQ0FBWSxDQUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFTSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBSUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBQSxDQUFBLE1BQUEsQ0FBWSxDQUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFTSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBSUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBRyxD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

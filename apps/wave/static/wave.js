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

  var config = {
    API_URL: 'https://waveloop-staging-api.paralect.net/track',
    API_URL_DEV: 'http://localhost:3001/track'
  };

  var API_URL = config.API_URL_DEV ;
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
    return fetch("".concat(API_URL, "/").concat(url), {
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
    return sendData(url, _objectSpread2(_objectSpread2({}, data), {}, {
      projectId: userData.projectId,
      visitorId: userData.visitorId,
      sessionId: userData.sessionId
    })).then(function (trackData) {
      if (trackData.sessionId) {
        // eslint-disable-next-line no-param-reassign
        userData.sessionId = trackData.sessionId;
      }
      return trackData;
    });
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
  var throttle = function throttle(func, limit) {
    var isBlocked = false;
    return function (args) {
      if (isBlocked) {
        return;
      }
      func(args);
      isBlocked = true;
      setTimeout(function () {
        isBlocked = false;
      }, limit);
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
      sendTrackData(userData, 'action', {
        type: 'pageScroll',
        timestamp: Date.now(),
        payload: {
          offset: {
            x: window.pageXOffset,
            y: window.pageYOffset
          }
        }
      });
      sendTrackData(userData, 'action', data);
    };
    return window.addEventListener('click', handleClick, {
      capture: true,
      passive: true
    });
  });

  // clicks doesn't work on disabled elements.
  // https://www.w3.org/TR/2014/REC-html5-20141028/forms.html#concept-fe-disabled

  var pageResizeHandler = (function (userData) {
    window.addEventListener('resize', debounce(function () {
      return sendTrackData(userData, 'action', {
        type: 'resize',
        timestamp: Date.now(),
        payload: {
          size: {
            width: window.innerWidth,
            height: window.innerHeight
          }
        }
      });
    }, DEFAULT_DEBOUNCE_TIME));
  });

  var SCROLL_THROTTLE_TIME = 100;
  var pageScrollingHandler = (function (userData) {
    window.addEventListener('scroll', throttle(function () {
      return sendTrackData(userData, 'action', {
        type: 'pageScroll',
        timestamp: Date.now(),
        payload: {
          offset: {
            x: window.pageXOffset,
            y: window.pageYOffset
          }
        }
      });
    }, SCROLL_THROTTLE_TIME));
  });

  // Probably we need it less than 200ms
  // for better quality of "Visitor Actions Player"
  var MOUSE_MOVE_THROTTLE_TIME = 100;
  var ACTION_SEND_INTERVAL = 3000;
  var eventBuffer = {
    data: [],
    latestSend: Date.now()
  };
  var mouseMoveHandler = function mouseMoveHandler(userData) {
    function handleEvent(event) {
      var timestamp = Date.now();
      var record = {
        x: event.clientX,
        y: event.clientY,
        timestamp: timestamp
      };
      eventBuffer.data.push(record);
      if (timestamp - eventBuffer.latestSend > ACTION_SEND_INTERVAL) {
        var manyRecords = {
          type: 'mouseMove',
          payload: {
            batch: eventBuffer.data
          }
        };
        eventBuffer.data = [];
        eventBuffer.latestSend = Date.now();
        sendTrackData(userData, 'action', manyRecords);
      }
    }
    window.addEventListener('mousemove', throttle(handleEvent, MOUSE_MOVE_THROTTLE_TIME));
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
    sendTrackData(userData, 'action', actionData);
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
      return handleLocationChange(userData);
    });
  });

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
      sendTrackData(userData, 'rec', {
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

  {
    if (Fingerprint2 && Fingerprint2.getV18) {
      console.log('Fingerprint2.getV18:', _typeof(Fingerprint2.getV18)); // eslint-disable-line
    } else {
      console.error('Fingerprint2 not loaded correctly!', Fingerprint2); // eslint-disable-line
    }
  }

  var defaultHandlers = [clickHandler, pageResizeHandler, pageScrollingHandler, mouseMoveHandler, pathChangeHandler];
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
  var init = function init(initialUserData) {
    var handlers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultHandlers;
    return function () {
      var userData = _objectSpread2({}, initialUserData);
      return calcIdentificator().then(function (visitorId) {
        userData.visitorId = visitorId;
        return fetch('https://api.ipify.org').then(function (res) {
          return res.text();
        }).then(function (data) {
          var payload = {
            os: getOS(),
            browserName: getBrowserName(),
            deviceType: getDeviceType(),
            connectionType: getConnectionType(),
            ipAddress: data,
            referrerUrl: document.referrer
          };
          var session = JSON.parse(localStorage.getItem('waveloop_session'));
          var ONE_MINUTE_MS = 1 * 60 * 1000;
          if (session && session.sessionId && new Date() - new Date(session.updatedOn) < ONE_MINUTE_MS) {
            return {
              sessionId: session.sessionId
            };
          }
          return sendData('init', {
            visitorId: visitorId,
            projectId: userData.projectId,
            payload: payload
          });
        });
      }).then(function (_ref) {
        var sessionId = _ref.sessionId;
        if (sessionId) {
          var setSession = function setSession() {
            localStorage.setItem('waveloop_session', JSON.stringify({
              sessionId: sessionId,
              updatedOn: new Date()
            }));
          };
          setSession();
          window.WAVELOOP_SESSION_ID = sessionId;
          setInterval(setSession, 10 * 1000);
          userData.sessionId = sessionId;
          registerHandlers(userData, handlers);
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
    var _window = window,
      waveloop = _window.waveloop;
    var params = waveloop.params;
    {
      console.log('Wave script params:', params); // eslint-disable-line
    }

    // don't change object's link.
    var userData = {
      visitorId: null,
      sessionId: null,
      projectId: params.pid
    };
    if (window.requestIdleCallback) {
      requestIdleCallback(tracker.init(userData));
    } else {
      setTimeout(tracker.init(userData), 500);
    }
  })();

  return index;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F2ZS5qcyIsInNvdXJjZXMiOlsiLi4vdHJhY2tlci9zcmMvbGliL2ZpbmdlcnByaW50Mi5taW4uanMiLCIuLi90cmFja2VyL3NyYy9jb25maWcuanMiLCIuLi90cmFja2VyL3NyYy9oZWxwZXJzLmpzIiwiLi4vdHJhY2tlci9zcmMvYWN0aW9ucy9jbGljay5qcyIsIi4uL3RyYWNrZXIvc3JjL2FjdGlvbnMvcGFnZVJlc2l6ZS5qcyIsIi4uL3RyYWNrZXIvc3JjL2FjdGlvbnMvcGFnZVNjcm9sbGluZy5qcyIsIi4uL3RyYWNrZXIvc3JjL2FjdGlvbnMvbW91c2VNb3ZlLmpzIiwiLi4vdHJhY2tlci9zcmMvYWN0aW9ucy9wYXRoQ2hhbmdlLmpzIiwiLi4vdHJhY2tlci9zcmMvcmVjb3Jkcy9tdXRhdGlvbi5qcyIsIi4uL3RyYWNrZXIvc3JjL3JlY29yZHMvb2JzZXJ2ZXIuanMiLCIuLi90cmFja2VyL3NyYy90cmFja2VyLmpzIiwiLi4vdHJhY2tlci9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRmluZ2VycHJpbnRqczIgLSBDb3B5cmlnaHQgKGMpIDIwMTkgVmFsZW50aW4gVmFzaWx5ZXYgKHZhbGVudGluLnZhc2lseWV2QG91dGxvb2suY29tKVxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCAoaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHApIGxpY2Vuc2UuXG5cbiEoZnVuY3Rpb24gKGUsIHQsIGEpIHtcbiAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGEpIDogdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMgPyBtb2R1bGUuZXhwb3J0cyA9IGEoKSA6IHQuZXhwb3J0cyA/IHQuZXhwb3J0cyA9IGEoKSA6IHQuRmluZ2VycHJpbnQyID0gYSgpO1xufSgwLCB0aGlzLCAoKSA9PiB7XG4gIGNvbnN0IGQgPSBmdW5jdGlvbiAoZSwgdCkgeyBlID0gW2VbMF0gPj4+IDE2LCA2NTUzNSAmIGVbMF0sIGVbMV0gPj4+IDE2LCA2NTUzNSAmIGVbMV1dLCB0ID0gW3RbMF0gPj4+IDE2LCA2NTUzNSAmIHRbMF0sIHRbMV0gPj4+IDE2LCA2NTUzNSAmIHRbMV1dOyBjb25zdCBhID0gWzAsIDAsIDAsIDBdOyByZXR1cm4gYVszXSArPSBlWzNdICsgdFszXSwgYVsyXSArPSBhWzNdID4+PiAxNiwgYVszXSAmPSA2NTUzNSwgYVsyXSArPSBlWzJdICsgdFsyXSwgYVsxXSArPSBhWzJdID4+PiAxNiwgYVsyXSAmPSA2NTUzNSwgYVsxXSArPSBlWzFdICsgdFsxXSwgYVswXSArPSBhWzFdID4+PiAxNiwgYVsxXSAmPSA2NTUzNSwgYVswXSArPSBlWzBdICsgdFswXSwgYVswXSAmPSA2NTUzNSwgW2FbMF0gPDwgMTYgfCBhWzFdLCBhWzJdIDw8IDE2IHwgYVszXV07IH07IGNvbnN0IGcgPSBmdW5jdGlvbiAoZSwgdCkgeyBlID0gW2VbMF0gPj4+IDE2LCA2NTUzNSAmIGVbMF0sIGVbMV0gPj4+IDE2LCA2NTUzNSAmIGVbMV1dLCB0ID0gW3RbMF0gPj4+IDE2LCA2NTUzNSAmIHRbMF0sIHRbMV0gPj4+IDE2LCA2NTUzNSAmIHRbMV1dOyBjb25zdCBhID0gWzAsIDAsIDAsIDBdOyByZXR1cm4gYVszXSArPSBlWzNdICogdFszXSwgYVsyXSArPSBhWzNdID4+PiAxNiwgYVszXSAmPSA2NTUzNSwgYVsyXSArPSBlWzJdICogdFszXSwgYVsxXSArPSBhWzJdID4+PiAxNiwgYVsyXSAmPSA2NTUzNSwgYVsyXSArPSBlWzNdICogdFsyXSwgYVsxXSArPSBhWzJdID4+PiAxNiwgYVsyXSAmPSA2NTUzNSwgYVsxXSArPSBlWzFdICogdFszXSwgYVswXSArPSBhWzFdID4+PiAxNiwgYVsxXSAmPSA2NTUzNSwgYVsxXSArPSBlWzJdICogdFsyXSwgYVswXSArPSBhWzFdID4+PiAxNiwgYVsxXSAmPSA2NTUzNSwgYVsxXSArPSBlWzNdICogdFsxXSwgYVswXSArPSBhWzFdID4+PiAxNiwgYVsxXSAmPSA2NTUzNSwgYVswXSArPSBlWzBdICogdFszXSArIGVbMV0gKiB0WzJdICsgZVsyXSAqIHRbMV0gKyBlWzNdICogdFswXSwgYVswXSAmPSA2NTUzNSwgW2FbMF0gPDwgMTYgfCBhWzFdLCBhWzJdIDw8IDE2IHwgYVszXV07IH07IGNvbnN0IGYgPSBmdW5jdGlvbiAoZSwgdCkgeyByZXR1cm4gKHQgJT0gNjQpID09PSAzMiA/IFtlWzFdLCBlWzBdXSA6IHQgPCAzMiA/IFtlWzBdIDw8IHQgfCBlWzFdID4+PiAzMiAtIHQsIGVbMV0gPDwgdCB8IGVbMF0gPj4+IDMyIC0gdF0gOiAodCAtPSAzMiwgW2VbMV0gPDwgdCB8IGVbMF0gPj4+IDMyIC0gdCwgZVswXSA8PCB0IHwgZVsxXSA+Pj4gMzIgLSB0XSk7IH07IGNvbnN0IGggPSBmdW5jdGlvbiAoZSwgdCkgeyByZXR1cm4gKHQgJT0gNjQpID09PSAwID8gZSA6IHQgPCAzMiA/IFtlWzBdIDw8IHQgfCBlWzFdID4+PiAzMiAtIHQsIGVbMV0gPDwgdF0gOiBbZVsxXSA8PCB0IC0gMzIsIDBdOyB9OyBjb25zdCBtID0gZnVuY3Rpb24gKGUsIHQpIHsgcmV0dXJuIFtlWzBdIF4gdFswXSwgZVsxXSBeIHRbMV1dOyB9OyBjb25zdCBUID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUgPSBtKGUsIFswLCBlWzBdID4+PiAxXSksIGUgPSBnKGUsIFs0MjgzNTQzNTExLCAzOTgxODA2Nzk3XSksIGUgPSBtKGUsIFswLCBlWzBdID4+PiAxXSksIGUgPSBnKGUsIFszMzAxODgyMzY2LCA0NDQ5ODQ0MDNdKSwgZSA9IG0oZSwgWzAsIGVbMF0gPj4+IDFdKTsgfTsgY29uc3QgbCA9IGZ1bmN0aW9uIChlLCB0KSB7IHQgPSB0IHx8IDA7IGZvciAodmFyIGEgPSAoZSA9IGUgfHwgJycpLmxlbmd0aCAlIDE2LCBuID0gZS5sZW5ndGggLSBhLCByID0gWzAsIHRdLCBpID0gWzAsIHRdLCBvID0gWzAsIDBdLCBsID0gWzAsIDBdLCBzID0gWzIyNzc3MzUzMTMsIDI4OTU1OTUwOV0sIGMgPSBbMTI5MTE2OTA5MSwgNjU4ODcxMTY3XSwgdSA9IDA7IHUgPCBuOyB1ICs9IDE2KW8gPSBbMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyA0KSB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDUpKSA8PCA4IHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgNikpIDw8IDE2IHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgNykpIDw8IDI0LCAyNTUgJiBlLmNoYXJDb2RlQXQodSkgfCAoMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyAxKSkgPDwgOCB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDIpKSA8PCAxNiB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDMpKSA8PCAyNF0sIGwgPSBbMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyAxMikgfCAoMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyAxMykpIDw8IDggfCAoMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyAxNCkpIDw8IDE2IHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgMTUpKSA8PCAyNCwgMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyA4KSB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDkpKSA8PCA4IHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgMTApKSA8PCAxNiB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDExKSkgPDwgMjRdLCBvID0gZyhvLCBzKSwgbyA9IGYobywgMzEpLCBvID0gZyhvLCBjKSwgciA9IG0ociwgbyksIHIgPSBmKHIsIDI3KSwgciA9IGQociwgaSksIHIgPSBkKGcociwgWzAsIDVdKSwgWzAsIDEzOTAyMDg4MDldKSwgbCA9IGcobCwgYyksIGwgPSBmKGwsIDMzKSwgbCA9IGcobCwgcyksIGkgPSBtKGksIGwpLCBpID0gZihpLCAzMSksIGkgPSBkKGksIHIpLCBpID0gZChnKGksIFswLCA1XSksIFswLCA5NDQzMzE0NDVdKTsgc3dpdGNoIChvID0gWzAsIDBdLCBsID0gWzAsIDBdLCBhKSB7IGNhc2UgMTU6IGwgPSBtKGwsIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgMTQpXSwgNDgpKTsgY2FzZSAxNDogbCA9IG0obCwgaChbMCwgZS5jaGFyQ29kZUF0KHUgKyAxMyldLCA0MCkpOyBjYXNlIDEzOiBsID0gbShsLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDEyKV0sIDMyKSk7IGNhc2UgMTI6IGwgPSBtKGwsIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgMTEpXSwgMjQpKTsgY2FzZSAxMTogbCA9IG0obCwgaChbMCwgZS5jaGFyQ29kZUF0KHUgKyAxMCldLCAxNikpOyBjYXNlIDEwOiBsID0gbShsLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDkpXSwgOCkpOyBjYXNlIDk6IGwgPSBtKGwsIFswLCBlLmNoYXJDb2RlQXQodSArIDgpXSksIGwgPSBnKGwsIGMpLCBsID0gZihsLCAzMyksIGwgPSBnKGwsIHMpLCBpID0gbShpLCBsKTsgY2FzZSA4OiBvID0gbShvLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDcpXSwgNTYpKTsgY2FzZSA3OiBvID0gbShvLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDYpXSwgNDgpKTsgY2FzZSA2OiBvID0gbShvLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDUpXSwgNDApKTsgY2FzZSA1OiBvID0gbShvLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDQpXSwgMzIpKTsgY2FzZSA0OiBvID0gbShvLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDMpXSwgMjQpKTsgY2FzZSAzOiBvID0gbShvLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDIpXSwgMTYpKTsgY2FzZSAyOiBvID0gbShvLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDEpXSwgOCkpOyBjYXNlIDE6IG8gPSBtKG8sIFswLCBlLmNoYXJDb2RlQXQodSldKSwgbyA9IGcobywgcyksIG8gPSBmKG8sIDMxKSwgbyA9IGcobywgYyksIHIgPSBtKHIsIG8pOyB9IHJldHVybiByID0gbShyLCBbMCwgZS5sZW5ndGhdKSwgaSA9IG0oaSwgWzAsIGUubGVuZ3RoXSksIHIgPSBkKHIsIGkpLCBpID0gZChpLCByKSwgciA9IFQociksIGkgPSBUKGkpLCByID0gZChyLCBpKSwgaSA9IGQoaSwgciksIChgMDAwMDAwMDAkeyhyWzBdID4+PiAwKS50b1N0cmluZygxNil9YCkuc2xpY2UoLTgpICsgKGAwMDAwMDAwMCR7KHJbMV0gPj4+IDApLnRvU3RyaW5nKDE2KX1gKS5zbGljZSgtOCkgKyAoYDAwMDAwMDAwJHsoaVswXSA+Pj4gMCkudG9TdHJpbmcoMTYpfWApLnNsaWNlKC04KSArIChgMDAwMDAwMDAkeyhpWzFdID4+PiAwKS50b1N0cmluZygxNil9YCkuc2xpY2UoLTgpOyB9OyBjb25zdCBlID0ge1xuICAgIHByZXByb2Nlc3NvcjogbnVsbCxcbiAgICBhdWRpbzogeyB0aW1lb3V0OiAxZTMsIGV4Y2x1ZGVJT1MxMTogITAgfSxcbiAgICBmb250czoge1xuICAgICAgc3dmQ29udGFpbmVySWQ6ICdmaW5nZXJwcmludGpzMicsIHN3ZlBhdGg6ICdmbGFzaC9jb21waWxlZC9Gb250TGlzdC5zd2YnLCB1c2VyRGVmaW5lZEZvbnRzOiBbXSwgZXh0ZW5kZWRKc0ZvbnRzOiAhMSxcbiAgICB9LFxuICAgIHNjcmVlbjogeyBkZXRlY3RTY3JlZW5PcmllbnRhdGlvbjogITAgfSxcbiAgICBwbHVnaW5zOiB7IHNvcnRQbHVnaW5zRm9yOiBbL3BhbGVtb29uL2ldLCBleGNsdWRlSUU6ICExIH0sXG4gICAgZXh0cmFDb21wb25lbnRzOiBbXSxcbiAgICBleGNsdWRlczoge1xuICAgICAgZW51bWVyYXRlRGV2aWNlczogITAsIHBpeGVsUmF0aW86ICEwLCBkb05vdFRyYWNrOiAhMCwgZm9udHNGbGFzaDogITAsXG4gICAgfSxcbiAgICBOT1RfQVZBSUxBQkxFOiAnbm90IGF2YWlsYWJsZScsXG4gICAgRVJST1I6ICdlcnJvcicsXG4gICAgRVhDTFVERUQ6ICdleGNsdWRlZCcsXG4gIH07IGNvbnN0IGMgPSBmdW5jdGlvbiAoZSwgdCkgeyBpZiAoQXJyYXkucHJvdG90eXBlLmZvckVhY2ggJiYgZS5mb3JFYWNoID09PSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCllLmZvckVhY2godCk7IGVsc2UgaWYgKGUubGVuZ3RoID09PSArZS5sZW5ndGgpIGZvciAobGV0IGEgPSAwLCBuID0gZS5sZW5ndGg7IGEgPCBuOyBhKyspdChlW2FdLCBhLCBlKTsgZWxzZSBmb3IgKGNvbnN0IHIgaW4gZSllLmhhc093blByb3BlcnR5KHIpICYmIHQoZVtyXSwgciwgZSk7IH07IGNvbnN0IHMgPSBmdW5jdGlvbiAoZSwgbikgeyBjb25zdCByID0gW107IHJldHVybiBlID09IG51bGwgPyByIDogQXJyYXkucHJvdG90eXBlLm1hcCAmJiBlLm1hcCA9PT0gQXJyYXkucHJvdG90eXBlLm1hcCA/IGUubWFwKG4pIDogKGMoZSwgKGUsIHQsIGEpID0+IHsgci5wdXNoKG4oZSwgdCwgYSkpOyB9KSwgcik7IH07IGNvbnN0IGEgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzICYmIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlczsgfTsgY29uc3QgbiA9IGZ1bmN0aW9uIChlKSB7IGNvbnN0IHQgPSBbd2luZG93LnNjcmVlbi53aWR0aCwgd2luZG93LnNjcmVlbi5oZWlnaHRdOyByZXR1cm4gZS5zY3JlZW4uZGV0ZWN0U2NyZWVuT3JpZW50YXRpb24gJiYgdC5zb3J0KCkucmV2ZXJzZSgpLCB0OyB9OyBjb25zdCByID0gZnVuY3Rpb24gKGUpIHsgaWYgKHdpbmRvdy5zY3JlZW4uYXZhaWxXaWR0aCAmJiB3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0KSB7IGNvbnN0IHQgPSBbd2luZG93LnNjcmVlbi5hdmFpbEhlaWdodCwgd2luZG93LnNjcmVlbi5hdmFpbFdpZHRoXTsgcmV0dXJuIGUuc2NyZWVuLmRldGVjdFNjcmVlbk9yaWVudGF0aW9uICYmIHQuc29ydCgpLnJldmVyc2UoKSwgdDsgfSByZXR1cm4gZS5OT1RfQVZBSUxBQkxFOyB9OyBjb25zdCBpID0gZnVuY3Rpb24gKGUpIHsgaWYgKG5hdmlnYXRvci5wbHVnaW5zID09IG51bGwpIHJldHVybiBlLk5PVF9BVkFJTEFCTEU7IGZvciAodmFyIHQgPSBbXSwgYSA9IDAsIG4gPSBuYXZpZ2F0b3IucGx1Z2lucy5sZW5ndGg7IGEgPCBuOyBhKyspbmF2aWdhdG9yLnBsdWdpbnNbYV0gJiYgdC5wdXNoKG5hdmlnYXRvci5wbHVnaW5zW2FdKTsgcmV0dXJuIHUoZSkgJiYgKHQgPSB0LnNvcnQoKGUsIHQpID0+IHsgcmV0dXJuIGUubmFtZSA+IHQubmFtZSA/IDEgOiBlLm5hbWUgPCB0Lm5hbWUgPyAtMSA6IDA7IH0pKSwgcyh0LCAoZSkgPT4geyBjb25zdCB0ID0gcyhlLCAoZSkgPT4geyByZXR1cm4gW2UudHlwZSwgZS5zdWZmaXhlc107IH0pOyByZXR1cm4gW2UubmFtZSwgZS5kZXNjcmlwdGlvbiwgdF07IH0pOyB9OyBjb25zdCBvID0gZnVuY3Rpb24gKHQpIHsgbGV0IGUgPSBbXTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih3aW5kb3csICdBY3RpdmVYT2JqZWN0JykgfHwgJ0FjdGl2ZVhPYmplY3QnIGluIHdpbmRvdykgeyBlID0gcyhbJ0Fjcm9QREYuUERGJywgJ0Fkb2RiLlN0cmVhbScsICdBZ0NvbnRyb2wuQWdDb250cm9sJywgJ0RldmFsVlJYQ3RybC5EZXZhbFZSWEN0cmwuMScsICdNYWNyb21lZGlhRmxhc2hQYXBlci5NYWNyb21lZGlhRmxhc2hQYXBlcicsICdNc3htbDIuRE9NRG9jdW1lbnQnLCAnTXN4bWwyLlhNTEhUVFAnLCAnUERGLlBkZkN0cmwnLCAnUXVpY2tUaW1lLlF1aWNrVGltZScsICdRdWlja1RpbWVDaGVja09iamVjdC5RdWlja1RpbWVDaGVjay4xJywgJ1JlYWxQbGF5ZXInLCAnUmVhbFBsYXllci5SZWFsUGxheWVyKHRtKSBBY3RpdmVYIENvbnRyb2wgKDMyLWJpdCknLCAnUmVhbFZpZGVvLlJlYWxWaWRlbyh0bSkgQWN0aXZlWCBDb250cm9sICgzMi1iaXQpJywgJ1NjcmlwdGluZy5EaWN0aW9uYXJ5JywgJ1NXQ3RsLlNXQ3RsJywgJ1NoZWxsLlVJSGVscGVyJywgJ1Nob2Nrd2F2ZUZsYXNoLlNob2Nrd2F2ZUZsYXNoJywgJ1NreXBlLkRldGVjdGlvbicsICdURENDdGwuVERDQ3RsJywgJ1dNUGxheWVyLk9DWCcsICdybW9jeC5SZWFsUGxheWVyIEcyIENvbnRyb2wnLCAncm1vY3guUmVhbFBsYXllciBHMiBDb250cm9sLjEnXSwgKGUpID0+IHsgdHJ5IHsgcmV0dXJuIG5ldyB3aW5kb3cuQWN0aXZlWE9iamVjdChlKSwgZTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gdC5FUlJPUjsgfSB9KTsgfSBlbHNlIGUucHVzaCh0Lk5PVF9BVkFJTEFCTEUpOyByZXR1cm4gbmF2aWdhdG9yLnBsdWdpbnMgJiYgKGUgPSBlLmNvbmNhdChpKHQpKSksIGU7IH07IHZhciB1ID0gZnVuY3Rpb24gKGUpIHsgZm9yICh2YXIgdCA9ICExLCBhID0gMCwgbiA9IGUucGx1Z2lucy5zb3J0UGx1Z2luc0Zvci5sZW5ndGg7IGEgPCBuOyBhKyspIHsgY29uc3QgciA9IGUucGx1Z2lucy5zb3J0UGx1Z2luc0ZvclthXTsgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2gocikpIHsgdCA9ICEwOyBicmVhazsgfSB9IHJldHVybiB0OyB9OyBjb25zdCBwID0gZnVuY3Rpb24gKHQpIHsgdHJ5IHsgcmV0dXJuICEhd2luZG93LnNlc3Npb25TdG9yYWdlOyB9IGNhdGNoIChlKSB7IHJldHVybiB0LkVSUk9SOyB9IH07IGNvbnN0IHYgPSBmdW5jdGlvbiAodCkgeyB0cnkgeyByZXR1cm4gISF3aW5kb3cubG9jYWxTdG9yYWdlOyB9IGNhdGNoIChlKSB7IHJldHVybiB0LkVSUk9SOyB9IH07IGNvbnN0IEEgPSBmdW5jdGlvbiAodCkgeyB0cnkgeyByZXR1cm4gISF3aW5kb3cuaW5kZXhlZERCOyB9IGNhdGNoIChlKSB7IHJldHVybiB0LkVSUk9SOyB9IH07IGNvbnN0IFMgPSBmdW5jdGlvbiAoZSkgeyByZXR1cm4gbmF2aWdhdG9yLmhhcmR3YXJlQ29uY3VycmVuY3kgPyBuYXZpZ2F0b3IuaGFyZHdhcmVDb25jdXJyZW5jeSA6IGUuTk9UX0FWQUlMQUJMRTsgfTsgY29uc3QgQyA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBuYXZpZ2F0b3IuY3B1Q2xhc3MgfHwgZS5OT1RfQVZBSUxBQkxFOyB9OyBjb25zdCBCID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIG5hdmlnYXRvci5wbGF0Zm9ybSA/IG5hdmlnYXRvci5wbGF0Zm9ybSA6IGUuTk9UX0FWQUlMQUJMRTsgfTsgY29uc3QgdyA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBuYXZpZ2F0b3IuZG9Ob3RUcmFjayA/IG5hdmlnYXRvci5kb05vdFRyYWNrIDogbmF2aWdhdG9yLm1zRG9Ob3RUcmFjayA/IG5hdmlnYXRvci5tc0RvTm90VHJhY2sgOiB3aW5kb3cuZG9Ob3RUcmFjayA/IHdpbmRvdy5kb05vdFRyYWNrIDogZS5OT1RfQVZBSUxBQkxFOyB9OyBjb25zdCB0ID0gZnVuY3Rpb24gKCkgeyBsZXQgdDsgbGV0IGUgPSAwOyB2b2lkIDAgIT09IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA/IGUgPSBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgOiB2b2lkIDAgIT09IG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzICYmIChlID0gbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMpOyB0cnkgeyBkb2N1bWVudC5jcmVhdGVFdmVudCgnVG91Y2hFdmVudCcpLCB0ID0gITA7IH0gY2F0Y2ggKGUpIHsgdCA9ICExOyB9IHJldHVybiBbZSwgdCwgJ29udG91Y2hzdGFydCcgaW4gd2luZG93XTsgfTsgY29uc3QgeSA9IGZ1bmN0aW9uIChlKSB7IGNvbnN0IHQgPSBbXTsgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOyBhLndpZHRoID0gMmUzLCBhLmhlaWdodCA9IDIwMCwgYS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7IGNvbnN0IG4gPSBhLmdldENvbnRleHQoJzJkJyk7IHJldHVybiBuLnJlY3QoMCwgMCwgMTAsIDEwKSwgbi5yZWN0KDIsIDIsIDYsIDYpLCB0LnB1c2goYGNhbnZhcyB3aW5kaW5nOiR7ITEgPT09IG4uaXNQb2ludEluUGF0aCg1LCA1LCAnZXZlbm9kZCcpID8gJ3llcycgOiAnbm8nfWApLCBuLnRleHRCYXNlbGluZSA9ICdhbHBoYWJldGljJywgbi5maWxsU3R5bGUgPSAnI2Y2MCcsIG4uZmlsbFJlY3QoMTI1LCAxLCA2MiwgMjApLCBuLmZpbGxTdHlsZSA9ICcjMDY5JywgZS5kb250VXNlRmFrZUZvbnRJbkNhbnZhcyA/IG4uZm9udCA9ICcxMXB0IEFyaWFsJyA6IG4uZm9udCA9ICcxMXB0IG5vLXJlYWwtZm9udC0xMjMnLCBuLmZpbGxUZXh0KCdDd20gZmpvcmRiYW5rIGdseXBocyB2ZXh0IHF1aXosIFxcdWQ4M2RcXHVkZTAzJywgMiwgMTUpLCBuLmZpbGxTdHlsZSA9ICdyZ2JhKDEwMiwgMjA0LCAwLCAwLjIpJywgbi5mb250ID0gJzE4cHQgQXJpYWwnLCBuLmZpbGxUZXh0KCdDd20gZmpvcmRiYW5rIGdseXBocyB2ZXh0IHF1aXosIFxcdWQ4M2RcXHVkZTAzJywgNCwgNDUpLCBuLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdtdWx0aXBseScsIG4uZmlsbFN0eWxlID0gJ3JnYigyNTUsMCwyNTUpJywgbi5iZWdpblBhdGgoKSwgbi5hcmMoNTAsIDUwLCA1MCwgMCwgMiAqIE1hdGguUEksICEwKSwgbi5jbG9zZVBhdGgoKSwgbi5maWxsKCksIG4uZmlsbFN0eWxlID0gJ3JnYigwLDI1NSwyNTUpJywgbi5iZWdpblBhdGgoKSwgbi5hcmMoMTAwLCA1MCwgNTAsIDAsIDIgKiBNYXRoLlBJLCAhMCksIG4uY2xvc2VQYXRoKCksIG4uZmlsbCgpLCBuLmZpbGxTdHlsZSA9ICdyZ2IoMjU1LDI1NSwwKScsIG4uYmVnaW5QYXRoKCksIG4uYXJjKDc1LCAxMDAsIDUwLCAwLCAyICogTWF0aC5QSSwgITApLCBuLmNsb3NlUGF0aCgpLCBuLmZpbGwoKSwgbi5maWxsU3R5bGUgPSAncmdiKDI1NSwwLDI1NSknLCBuLmFyYyg3NSwgNzUsIDc1LCAwLCAyICogTWF0aC5QSSwgITApLCBuLmFyYyg3NSwgNzUsIDI1LCAwLCAyICogTWF0aC5QSSwgITApLCBuLmZpbGwoJ2V2ZW5vZGQnKSwgYS50b0RhdGFVUkwgJiYgdC5wdXNoKGBjYW52YXMgZnA6JHthLnRvRGF0YVVSTCgpfWApLCB0OyB9OyBjb25zdCBFID0gZnVuY3Rpb24gKCkgeyBsZXQgbzsgY29uc3QgZSA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBvLmNsZWFyQ29sb3IoMCwgMCwgMCwgMSksIG8uZW5hYmxlKG8uREVQVEhfVEVTVCksIG8uZGVwdGhGdW5jKG8uTEVRVUFMKSwgby5jbGVhcihvLkNPTE9SX0JVRkZFUl9CSVQgfCBvLkRFUFRIX0JVRkZFUl9CSVQpLCBgWyR7ZVswXX0sICR7ZVsxXX1dYDsgfTsgaWYgKCEobyA9IEYoKSkpIHJldHVybiBudWxsOyBjb25zdCBsID0gW107IGNvbnN0IHQgPSBvLmNyZWF0ZUJ1ZmZlcigpOyBvLmJpbmRCdWZmZXIoby5BUlJBWV9CVUZGRVIsIHQpOyBjb25zdCBhID0gbmV3IEZsb2F0MzJBcnJheShbLTAuMiwgLTAuOSwgMCwgMC40LCAtMC4yNiwgMCwgMCwgMC43MzIxMzQ0NDQsIDBdKTsgby5idWZmZXJEYXRhKG8uQVJSQVlfQlVGRkVSLCBhLCBvLlNUQVRJQ19EUkFXKSwgdC5pdGVtU2l6ZSA9IDMsIHQubnVtSXRlbXMgPSAzOyBjb25zdCBuID0gby5jcmVhdGVQcm9ncmFtKCk7IGNvbnN0IHIgPSBvLmNyZWF0ZVNoYWRlcihvLlZFUlRFWF9TSEFERVIpOyBvLnNoYWRlclNvdXJjZShyLCAnYXR0cmlidXRlIHZlYzIgYXR0clZlcnRleDt2YXJ5aW5nIHZlYzIgdmFyeWluVGV4Q29vcmRpbmF0ZTt1bmlmb3JtIHZlYzIgdW5pZm9ybU9mZnNldDt2b2lkIG1haW4oKXt2YXJ5aW5UZXhDb29yZGluYXRlPWF0dHJWZXJ0ZXgrdW5pZm9ybU9mZnNldDtnbF9Qb3NpdGlvbj12ZWM0KGF0dHJWZXJ0ZXgsMCwxKTt9JyksIG8uY29tcGlsZVNoYWRlcihyKTsgY29uc3QgaSA9IG8uY3JlYXRlU2hhZGVyKG8uRlJBR01FTlRfU0hBREVSKTsgby5zaGFkZXJTb3VyY2UoaSwgJ3ByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O3ZhcnlpbmcgdmVjMiB2YXJ5aW5UZXhDb29yZGluYXRlO3ZvaWQgbWFpbigpIHtnbF9GcmFnQ29sb3I9dmVjNCh2YXJ5aW5UZXhDb29yZGluYXRlLDAsMSk7fScpLCBvLmNvbXBpbGVTaGFkZXIoaSksIG8uYXR0YWNoU2hhZGVyKG4sIHIpLCBvLmF0dGFjaFNoYWRlcihuLCBpKSwgby5saW5rUHJvZ3JhbShuKSwgby51c2VQcm9ncmFtKG4pLCBuLnZlcnRleFBvc0F0dHJpYiA9IG8uZ2V0QXR0cmliTG9jYXRpb24obiwgJ2F0dHJWZXJ0ZXgnKSwgbi5vZmZzZXRVbmlmb3JtID0gby5nZXRVbmlmb3JtTG9jYXRpb24obiwgJ3VuaWZvcm1PZmZzZXQnKSwgby5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShuLnZlcnRleFBvc0FycmF5KSwgby52ZXJ0ZXhBdHRyaWJQb2ludGVyKG4udmVydGV4UG9zQXR0cmliLCB0Lml0ZW1TaXplLCBvLkZMT0FULCAhMSwgMCwgMCksIG8udW5pZm9ybTJmKG4ub2Zmc2V0VW5pZm9ybSwgMSwgMSksIG8uZHJhd0FycmF5cyhvLlRSSUFOR0xFX1NUUklQLCAwLCB0Lm51bUl0ZW1zKTsgdHJ5IHsgbC5wdXNoKG8uY2FudmFzLnRvRGF0YVVSTCgpKTsgfSBjYXRjaCAoZSkge31sLnB1c2goYGV4dGVuc2lvbnM6JHsoby5nZXRTdXBwb3J0ZWRFeHRlbnNpb25zKCkgfHwgW10pLmpvaW4oJzsnKX1gKSwgbC5wdXNoKGB3ZWJnbCBhbGlhc2VkIGxpbmUgd2lkdGggcmFuZ2U6JHtlKG8uZ2V0UGFyYW1ldGVyKG8uQUxJQVNFRF9MSU5FX1dJRFRIX1JBTkdFKSl9YCksIGwucHVzaChgd2ViZ2wgYWxpYXNlZCBwb2ludCBzaXplIHJhbmdlOiR7ZShvLmdldFBhcmFtZXRlcihvLkFMSUFTRURfUE9JTlRfU0laRV9SQU5HRSkpfWApLCBsLnB1c2goYHdlYmdsIGFscGhhIGJpdHM6JHtvLmdldFBhcmFtZXRlcihvLkFMUEhBX0JJVFMpfWApLCBsLnB1c2goYHdlYmdsIGFudGlhbGlhc2luZzoke28uZ2V0Q29udGV4dEF0dHJpYnV0ZXMoKS5hbnRpYWxpYXMgPyAneWVzJyA6ICdubyd9YCksIGwucHVzaChgd2ViZ2wgYmx1ZSBiaXRzOiR7by5nZXRQYXJhbWV0ZXIoby5CTFVFX0JJVFMpfWApLCBsLnB1c2goYHdlYmdsIGRlcHRoIGJpdHM6JHtvLmdldFBhcmFtZXRlcihvLkRFUFRIX0JJVFMpfWApLCBsLnB1c2goYHdlYmdsIGdyZWVuIGJpdHM6JHtvLmdldFBhcmFtZXRlcihvLkdSRUVOX0JJVFMpfWApLCBsLnB1c2goYHdlYmdsIG1heCBhbmlzb3Ryb3B5OiR7KGZ1bmN0aW9uIChlKSB7IGNvbnN0IHQgPSBlLmdldEV4dGVuc2lvbignRVhUX3RleHR1cmVfZmlsdGVyX2FuaXNvdHJvcGljJykgfHwgZS5nZXRFeHRlbnNpb24oJ1dFQktJVF9FWFRfdGV4dHVyZV9maWx0ZXJfYW5pc290cm9waWMnKSB8fCBlLmdldEV4dGVuc2lvbignTU9aX0VYVF90ZXh0dXJlX2ZpbHRlcl9hbmlzb3Ryb3BpYycpOyBpZiAodCkgeyBsZXQgYSA9IGUuZ2V0UGFyYW1ldGVyKHQuTUFYX1RFWFRVUkVfTUFYX0FOSVNPVFJPUFlfRVhUKTsgcmV0dXJuIGEgPT09IDAgJiYgKGEgPSAyKSwgYTsgfSByZXR1cm4gbnVsbDsgfShvKSl9YCksIGwucHVzaChgd2ViZ2wgbWF4IGNvbWJpbmVkIHRleHR1cmUgaW1hZ2UgdW5pdHM6JHtvLmdldFBhcmFtZXRlcihvLk1BWF9DT01CSU5FRF9URVhUVVJFX0lNQUdFX1VOSVRTKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggY3ViZSBtYXAgdGV4dHVyZSBzaXplOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfQ1VCRV9NQVBfVEVYVFVSRV9TSVpFKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggZnJhZ21lbnQgdW5pZm9ybSB2ZWN0b3JzOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfRlJBR01FTlRfVU5JRk9STV9WRUNUT1JTKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggcmVuZGVyIGJ1ZmZlciBzaXplOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfUkVOREVSQlVGRkVSX1NJWkUpfWApLCBsLnB1c2goYHdlYmdsIG1heCB0ZXh0dXJlIGltYWdlIHVuaXRzOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfVEVYVFVSRV9JTUFHRV9VTklUUyl9YCksIGwucHVzaChgd2ViZ2wgbWF4IHRleHR1cmUgc2l6ZToke28uZ2V0UGFyYW1ldGVyKG8uTUFYX1RFWFRVUkVfU0laRSl9YCksIGwucHVzaChgd2ViZ2wgbWF4IHZhcnlpbmcgdmVjdG9yczoke28uZ2V0UGFyYW1ldGVyKG8uTUFYX1ZBUllJTkdfVkVDVE9SUyl9YCksIGwucHVzaChgd2ViZ2wgbWF4IHZlcnRleCBhdHRyaWJzOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfVkVSVEVYX0FUVFJJQlMpfWApLCBsLnB1c2goYHdlYmdsIG1heCB2ZXJ0ZXggdGV4dHVyZSBpbWFnZSB1bml0czoke28uZ2V0UGFyYW1ldGVyKG8uTUFYX1ZFUlRFWF9URVhUVVJFX0lNQUdFX1VOSVRTKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggdmVydGV4IHVuaWZvcm0gdmVjdG9yczoke28uZ2V0UGFyYW1ldGVyKG8uTUFYX1ZFUlRFWF9VTklGT1JNX1ZFQ1RPUlMpfWApLCBsLnB1c2goYHdlYmdsIG1heCB2aWV3cG9ydCBkaW1zOiR7ZShvLmdldFBhcmFtZXRlcihvLk1BWF9WSUVXUE9SVF9ESU1TKSl9YCksIGwucHVzaChgd2ViZ2wgcmVkIGJpdHM6JHtvLmdldFBhcmFtZXRlcihvLlJFRF9CSVRTKX1gKSwgbC5wdXNoKGB3ZWJnbCByZW5kZXJlcjoke28uZ2V0UGFyYW1ldGVyKG8uUkVOREVSRVIpfWApLCBsLnB1c2goYHdlYmdsIHNoYWRpbmcgbGFuZ3VhZ2UgdmVyc2lvbjoke28uZ2V0UGFyYW1ldGVyKG8uU0hBRElOR19MQU5HVUFHRV9WRVJTSU9OKX1gKSwgbC5wdXNoKGB3ZWJnbCBzdGVuY2lsIGJpdHM6JHtvLmdldFBhcmFtZXRlcihvLlNURU5DSUxfQklUUyl9YCksIGwucHVzaChgd2ViZ2wgdmVuZG9yOiR7by5nZXRQYXJhbWV0ZXIoby5WRU5ET1IpfWApLCBsLnB1c2goYHdlYmdsIHZlcnNpb246JHtvLmdldFBhcmFtZXRlcihvLlZFUlNJT04pfWApOyB0cnkgeyBjb25zdCBzID0gby5nZXRFeHRlbnNpb24oJ1dFQkdMX2RlYnVnX3JlbmRlcmVyX2luZm8nKTsgcyAmJiAobC5wdXNoKGB3ZWJnbCB1bm1hc2tlZCB2ZW5kb3I6JHtvLmdldFBhcmFtZXRlcihzLlVOTUFTS0VEX1ZFTkRPUl9XRUJHTCl9YCksIGwucHVzaChgd2ViZ2wgdW5tYXNrZWQgcmVuZGVyZXI6JHtvLmdldFBhcmFtZXRlcihzLlVOTUFTS0VEX1JFTkRFUkVSX1dFQkdMKX1gKSk7IH0gY2F0Y2ggKGUpIHt9IHJldHVybiBvLmdldFNoYWRlclByZWNpc2lvbkZvcm1hdCAmJiBjKFsnRkxPQVQnLCAnSU5UJ10sIChpKSA9PiB7IGMoWydWRVJURVgnLCAnRlJBR01FTlQnXSwgKHIpID0+IHsgYyhbJ0hJR0gnLCAnTUVESVVNJywgJ0xPVyddLCAobikgPT4geyBjKFsncHJlY2lzaW9uJywgJ3JhbmdlTWluJywgJ3JhbmdlTWF4J10sIChlKSA9PiB7IGNvbnN0IHQgPSBvLmdldFNoYWRlclByZWNpc2lvbkZvcm1hdChvW2Ake3J9X1NIQURFUmBdLCBvW2Ake259XyR7aX1gXSlbZV07IGUgIT09ICdwcmVjaXNpb24nICYmIChlID0gYHByZWNpc2lvbiAke2V9YCk7IGNvbnN0IGEgPSBbJ3dlYmdsICcsIHIudG9Mb3dlckNhc2UoKSwgJyBzaGFkZXIgJywgbi50b0xvd2VyQ2FzZSgpLCAnICcsIGkudG9Mb3dlckNhc2UoKSwgJyAnLCBlLCAnOicsIHRdLmpvaW4oJycpOyBsLnB1c2goYSk7IH0pOyB9KTsgfSk7IH0pLCBsOyB9OyBjb25zdCBNID0gZnVuY3Rpb24gKCkgeyB0cnkgeyBjb25zdCBlID0gRigpOyBjb25zdCB0ID0gZS5nZXRFeHRlbnNpb24oJ1dFQkdMX2RlYnVnX3JlbmRlcmVyX2luZm8nKTsgcmV0dXJuIGAke2UuZ2V0UGFyYW1ldGVyKHQuVU5NQVNLRURfVkVORE9SX1dFQkdMKX1+JHtlLmdldFBhcmFtZXRlcih0LlVOTUFTS0VEX1JFTkRFUkVSX1dFQkdMKX1gOyB9IGNhdGNoIChlKSB7IHJldHVybiBudWxsOyB9IH07IGNvbnN0IHggPSBmdW5jdGlvbiAoKSB7IGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgZS5pbm5lckhUTUwgPSAnJm5ic3A7JzsgbGV0IHQgPSAhKGUuY2xhc3NOYW1lID0gJ2Fkc2JveCcpOyB0cnkgeyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGUpLCB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRzYm94JylbMF0ub2Zmc2V0SGVpZ2h0ID09PSAwLCBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGUpOyB9IGNhdGNoIChlKSB7IHQgPSAhMTsgfSByZXR1cm4gdDsgfTsgY29uc3QgTyA9IGZ1bmN0aW9uICgpIHsgaWYgKHZvaWQgMCAhPT0gbmF2aWdhdG9yLmxhbmd1YWdlcykgdHJ5IHsgaWYgKG5hdmlnYXRvci5sYW5ndWFnZXNbMF0uc3Vic3RyKDAsIDIpICE9PSBuYXZpZ2F0b3IubGFuZ3VhZ2Uuc3Vic3RyKDAsIDIpKSByZXR1cm4gITA7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuICEwOyB9IHJldHVybiAhMTsgfTsgY29uc3QgYiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvdy5zY3JlZW4ud2lkdGggPCB3aW5kb3cuc2NyZWVuLmF2YWlsV2lkdGggfHwgd2luZG93LnNjcmVlbi5oZWlnaHQgPCB3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0OyB9OyBjb25zdCBQID0gZnVuY3Rpb24gKCkgeyBsZXQgZTsgY29uc3QgdCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTsgbGV0IGEgPSBuYXZpZ2F0b3Iub3NjcHU7IGNvbnN0IG4gPSBuYXZpZ2F0b3IucGxhdGZvcm0udG9Mb3dlckNhc2UoKTsgaWYgKGUgPSB0LmluZGV4T2YoJ3dpbmRvd3MgcGhvbmUnKSA+PSAwID8gJ1dpbmRvd3MgUGhvbmUnIDogdC5pbmRleE9mKCd3aW4nKSA+PSAwID8gJ1dpbmRvd3MnIDogdC5pbmRleE9mKCdhbmRyb2lkJykgPj0gMCA/ICdBbmRyb2lkJyA6IHQuaW5kZXhPZignbGludXgnKSA+PSAwIHx8IHQuaW5kZXhPZignY3JvcycpID49IDAgPyAnTGludXgnIDogdC5pbmRleE9mKCdpcGhvbmUnKSA+PSAwIHx8IHQuaW5kZXhPZignaXBhZCcpID49IDAgPyAnaU9TJyA6IHQuaW5kZXhPZignbWFjJykgPj0gMCA/ICdNYWMnIDogJ090aGVyJywgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwIHx8IG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzID4gMCkgJiYgZSAhPT0gJ1dpbmRvd3MgUGhvbmUnICYmIGUgIT09ICdBbmRyb2lkJyAmJiBlICE9PSAnaU9TJyAmJiBlICE9PSAnT3RoZXInKSByZXR1cm4gITA7IGlmICh2b2lkIDAgIT09IGEpIHsgaWYgKChhID0gYS50b0xvd2VyQ2FzZSgpKS5pbmRleE9mKCd3aW4nKSA+PSAwICYmIGUgIT09ICdXaW5kb3dzJyAmJiBlICE9PSAnV2luZG93cyBQaG9uZScpIHJldHVybiAhMDsgaWYgKGEuaW5kZXhPZignbGludXgnKSA+PSAwICYmIGUgIT09ICdMaW51eCcgJiYgZSAhPT0gJ0FuZHJvaWQnKSByZXR1cm4gITA7IGlmIChhLmluZGV4T2YoJ21hYycpID49IDAgJiYgZSAhPT0gJ01hYycgJiYgZSAhPT0gJ2lPUycpIHJldHVybiAhMDsgaWYgKChhLmluZGV4T2YoJ3dpbicpID09PSAtMSAmJiBhLmluZGV4T2YoJ2xpbnV4JykgPT09IC0xICYmIGEuaW5kZXhPZignbWFjJykgPT09IC0xKSAhPSAoZSA9PT0gJ090aGVyJykpIHJldHVybiAhMDsgfSByZXR1cm4gbi5pbmRleE9mKCd3aW4nKSA+PSAwICYmIGUgIT09ICdXaW5kb3dzJyAmJiBlICE9PSAnV2luZG93cyBQaG9uZScgfHwgKChuLmluZGV4T2YoJ2xpbnV4JykgPj0gMCB8fCBuLmluZGV4T2YoJ2FuZHJvaWQnKSA+PSAwIHx8IG4uaW5kZXhPZigncGlrZScpID49IDApICYmIGUgIT09ICdMaW51eCcgJiYgZSAhPT0gJ0FuZHJvaWQnIHx8ICgobi5pbmRleE9mKCdtYWMnKSA+PSAwIHx8IG4uaW5kZXhPZignaXBhZCcpID49IDAgfHwgbi5pbmRleE9mKCdpcG9kJykgPj0gMCB8fCBuLmluZGV4T2YoJ2lwaG9uZScpID49IDApICYmIGUgIT09ICdNYWMnICYmIGUgIT09ICdpT1MnIHx8ICgobi5pbmRleE9mKCd3aW4nKSA8IDAgJiYgbi5pbmRleE9mKCdsaW51eCcpIDwgMCAmJiBuLmluZGV4T2YoJ21hYycpIDwgMCAmJiBuLmluZGV4T2YoJ2lwaG9uZScpIDwgMCAmJiBuLmluZGV4T2YoJ2lwYWQnKSA8IDApICE9PSAoZSA9PT0gJ090aGVyJykgfHwgdm9pZCAwID09PSBuYXZpZ2F0b3IucGx1Z2lucyAmJiBlICE9PSAnV2luZG93cycgJiYgZSAhPT0gJ1dpbmRvd3MgUGhvbmUnKSkpOyB9OyBjb25zdCBMID0gZnVuY3Rpb24gKCkgeyBsZXQgZTsgY29uc3QgdCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTsgY29uc3QgYSA9IG5hdmlnYXRvci5wcm9kdWN0U3ViOyBpZiAoKChlID0gdC5pbmRleE9mKCdmaXJlZm94JykgPj0gMCA/ICdGaXJlZm94JyA6IHQuaW5kZXhPZignb3BlcmEnKSA+PSAwIHx8IHQuaW5kZXhPZignb3ByJykgPj0gMCA/ICdPcGVyYScgOiB0LmluZGV4T2YoJ2Nocm9tZScpID49IDAgPyAnQ2hyb21lJyA6IHQuaW5kZXhPZignc2FmYXJpJykgPj0gMCA/ICdTYWZhcmknIDogdC5pbmRleE9mKCd0cmlkZW50JykgPj0gMCA/ICdJbnRlcm5ldCBFeHBsb3JlcicgOiAnT3RoZXInKSA9PT0gJ0Nocm9tZScgfHwgZSA9PT0gJ1NhZmFyaScgfHwgZSA9PT0gJ09wZXJhJykgJiYgYSAhPT0gJzIwMDMwMTA3JykgcmV0dXJuICEwOyBsZXQgbjsgY29uc3QgciA9IGV2YWwudG9TdHJpbmcoKS5sZW5ndGg7IGlmIChyID09PSAzNyAmJiBlICE9PSAnU2FmYXJpJyAmJiBlICE9PSAnRmlyZWZveCcgJiYgZSAhPT0gJ090aGVyJykgcmV0dXJuICEwOyBpZiAociA9PT0gMzkgJiYgZSAhPT0gJ0ludGVybmV0IEV4cGxvcmVyJyAmJiBlICE9PSAnT3RoZXInKSByZXR1cm4gITA7IGlmIChyID09PSAzMyAmJiBlICE9PSAnQ2hyb21lJyAmJiBlICE9PSAnT3BlcmEnICYmIGUgIT09ICdPdGhlcicpIHJldHVybiAhMDsgdHJ5IHsgdGhyb3cgJ2EnOyB9IGNhdGNoIChlKSB7IHRyeSB7IGUudG9Tb3VyY2UoKSwgbiA9ICEwOyB9IGNhdGNoIChlKSB7IG4gPSAhMTsgfSB9IHJldHVybiBuICYmIGUgIT09ICdGaXJlZm94JyAmJiBlICE9PSAnT3RoZXInOyB9OyBjb25zdCBJID0gZnVuY3Rpb24gKCkgeyBjb25zdCBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7IHJldHVybiAhKCFlLmdldENvbnRleHQgfHwgIWUuZ2V0Q29udGV4dCgnMmQnKSk7IH07IGNvbnN0IGsgPSBmdW5jdGlvbiAoKSB7IGlmICghSSgpKSByZXR1cm4gITE7IGNvbnN0IGUgPSBGKCk7IHJldHVybiAhIXdpbmRvdy5XZWJHTFJlbmRlcmluZ0NvbnRleHQgJiYgISFlOyB9OyBjb25zdCBSID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmF2aWdhdG9yLmFwcE5hbWUgPT09ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInIHx8ICEobmF2aWdhdG9yLmFwcE5hbWUgIT09ICdOZXRzY2FwZScgfHwgIS9UcmlkZW50Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKTsgfTsgY29uc3QgRCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZvaWQgMCAhPT0gd2luZG93LnN3Zm9iamVjdDsgfTsgY29uc3QgTiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvdy5zd2ZvYmplY3QuaGFzRmxhc2hQbGF5ZXJWZXJzaW9uKCc5LjAuMCcpOyB9OyBjb25zdCBfID0gZnVuY3Rpb24gKHQsIGUpIHsgY29uc3QgYSA9ICdfX19mcF9zd2ZfbG9hZGVkJzsgd2luZG93W2FdID0gZnVuY3Rpb24gKGUpIHsgdChlKTsgfTsgbGV0IG47IGxldCByOyBjb25zdCBpID0gZS5mb250cy5zd2ZDb250YWluZXJJZDsgKHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSkuc2V0QXR0cmlidXRlKCdpZCcsIG4uZm9udHMuc3dmQ29udGFpbmVySWQpLCBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHIpOyBjb25zdCBvID0geyBvblJlYWR5OiBhIH07IHdpbmRvdy5zd2ZvYmplY3QuZW1iZWRTV0YoZS5mb250cy5zd2ZQYXRoLCBpLCAnMScsICcxJywgJzkuMC4wJywgITEsIG8sIHsgYWxsb3dTY3JpcHRBY2Nlc3M6ICdhbHdheXMnLCBtZW51OiAnZmFsc2UnIH0sIHt9KTsgfTsgdmFyIEYgPSBmdW5jdGlvbiAoKSB7IGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTsgbGV0IHQgPSBudWxsOyB0cnkgeyB0ID0gZS5nZXRDb250ZXh0KCd3ZWJnbCcpIHx8IGUuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJyk7IH0gY2F0Y2ggKGUpIHt9IHJldHVybiB0IHx8ICh0ID0gbnVsbCksIHQ7IH07IGNvbnN0IEcgPSBbeyBrZXk6ICd1c2VyQWdlbnQnLCBnZXREYXRhKGUpIHsgZShuYXZpZ2F0b3IudXNlckFnZW50KTsgfSB9LCB7IGtleTogJ3dlYmRyaXZlcicsIGdldERhdGEoZSwgdCkgeyBlKG5hdmlnYXRvci53ZWJkcml2ZXIgPT0gbnVsbCA/IHQuTk9UX0FWQUlMQUJMRSA6IG5hdmlnYXRvci53ZWJkcml2ZXIpOyB9IH0sIHsga2V5OiAnbGFuZ3VhZ2UnLCBnZXREYXRhKGUsIHQpIHsgZShuYXZpZ2F0b3IubGFuZ3VhZ2UgfHwgbmF2aWdhdG9yLnVzZXJMYW5ndWFnZSB8fCBuYXZpZ2F0b3IuYnJvd3Nlckxhbmd1YWdlIHx8IG5hdmlnYXRvci5zeXN0ZW1MYW5ndWFnZSB8fCB0Lk5PVF9BVkFJTEFCTEUpOyB9IH0sIHsga2V5OiAnY29sb3JEZXB0aCcsIGdldERhdGEoZSwgdCkgeyBlKHdpbmRvdy5zY3JlZW4uY29sb3JEZXB0aCB8fCB0Lk5PVF9BVkFJTEFCTEUpOyB9IH0sIHsga2V5OiAnZGV2aWNlTWVtb3J5JywgZ2V0RGF0YShlLCB0KSB7IGUobmF2aWdhdG9yLmRldmljZU1lbW9yeSB8fCB0Lk5PVF9BVkFJTEFCTEUpOyB9IH0sIHsga2V5OiAncGl4ZWxSYXRpbycsIGdldERhdGEoZSwgdCkgeyBlKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IHQuTk9UX0FWQUlMQUJMRSk7IH0gfSwgeyBrZXk6ICdoYXJkd2FyZUNvbmN1cnJlbmN5JywgZ2V0RGF0YShlLCB0KSB7IGUoUyh0KSk7IH0gfSwgeyBrZXk6ICdzY3JlZW5SZXNvbHV0aW9uJywgZ2V0RGF0YShlLCB0KSB7IGUobih0KSk7IH0gfSwgeyBrZXk6ICdhdmFpbGFibGVTY3JlZW5SZXNvbHV0aW9uJywgZ2V0RGF0YShlLCB0KSB7IGUocih0KSk7IH0gfSwgeyBrZXk6ICd0aW1lem9uZU9mZnNldCcsIGdldERhdGEoZSkgeyBlKChuZXcgRGF0ZSgpKS5nZXRUaW1lem9uZU9mZnNldCgpKTsgfSB9LCB7IGtleTogJ3RpbWV6b25lJywgZ2V0RGF0YShlLCB0KSB7IHdpbmRvdy5JbnRsICYmIHdpbmRvdy5JbnRsLkRhdGVUaW1lRm9ybWF0ID8gZSgobmV3IHdpbmRvdy5JbnRsLkRhdGVUaW1lRm9ybWF0KCkpLnJlc29sdmVkT3B0aW9ucygpLnRpbWVab25lKSA6IGUodC5OT1RfQVZBSUxBQkxFKTsgfSB9LCB7IGtleTogJ3Nlc3Npb25TdG9yYWdlJywgZ2V0RGF0YShlLCB0KSB7IGUocCh0KSk7IH0gfSwgeyBrZXk6ICdsb2NhbFN0b3JhZ2UnLCBnZXREYXRhKGUsIHQpIHsgZSh2KHQpKTsgfSB9LCB7IGtleTogJ2luZGV4ZWREYicsIGdldERhdGEoZSwgdCkgeyBlKEEodCkpOyB9IH0sIHsga2V5OiAnYWRkQmVoYXZpb3InLCBnZXREYXRhKGUpIHsgZSghKCFkb2N1bWVudC5ib2R5IHx8ICFkb2N1bWVudC5ib2R5LmFkZEJlaGF2aW9yKSk7IH0gfSwgeyBrZXk6ICdvcGVuRGF0YWJhc2UnLCBnZXREYXRhKGUpIHsgZSghIXdpbmRvdy5vcGVuRGF0YWJhc2UpOyB9IH0sIHsga2V5OiAnY3B1Q2xhc3MnLCBnZXREYXRhKGUsIHQpIHsgZShDKHQpKTsgfSB9LCB7IGtleTogJ3BsYXRmb3JtJywgZ2V0RGF0YShlLCB0KSB7IGUoQih0KSk7IH0gfSwgeyBrZXk6ICdkb05vdFRyYWNrJywgZ2V0RGF0YShlLCB0KSB7IGUodyh0KSk7IH0gfSwgeyBrZXk6ICdwbHVnaW5zJywgZ2V0RGF0YShlLCB0KSB7IFIoKSA/IHQucGx1Z2lucy5leGNsdWRlSUUgPyBlKHQuRVhDTFVERUQpIDogZShvKHQpKSA6IGUoaSh0KSk7IH0gfSwgeyBrZXk6ICdjYW52YXMnLCBnZXREYXRhKGUsIHQpIHsgSSgpID8gZSh5KHQpKSA6IGUodC5OT1RfQVZBSUxBQkxFKTsgfSB9LCB7IGtleTogJ3dlYmdsJywgZ2V0RGF0YShlLCB0KSB7IGsoKSA/IGUoRSgpKSA6IGUodC5OT1RfQVZBSUxBQkxFKTsgfSB9LCB7IGtleTogJ3dlYmdsVmVuZG9yQW5kUmVuZGVyZXInLCBnZXREYXRhKGUpIHsgaygpID8gZShNKCkpIDogZSgpOyB9IH0sIHsga2V5OiAnYWRCbG9jaycsIGdldERhdGEoZSkgeyBlKHgoKSk7IH0gfSwgeyBrZXk6ICdoYXNMaWVkTGFuZ3VhZ2VzJywgZ2V0RGF0YShlKSB7IGUoTygpKTsgfSB9LCB7IGtleTogJ2hhc0xpZWRSZXNvbHV0aW9uJywgZ2V0RGF0YShlKSB7IGUoYigpKTsgfSB9LCB7IGtleTogJ2hhc0xpZWRPcycsIGdldERhdGEoZSkgeyBlKFAoKSk7IH0gfSwgeyBrZXk6ICdoYXNMaWVkQnJvd3NlcicsIGdldERhdGEoZSkgeyBlKEwoKSk7IH0gfSwgeyBrZXk6ICd0b3VjaFN1cHBvcnQnLCBnZXREYXRhKGUpIHsgZSh0KCkpOyB9IH0sIHsga2V5OiAnZm9udHMnLCBnZXREYXRhKGUsIHQpIHsgY29uc3QgdSA9IFsnbW9ub3NwYWNlJywgJ3NhbnMtc2VyaWYnLCAnc2VyaWYnXTsgbGV0IGQgPSBbJ0FuZGFsZSBNb25vJywgJ0FyaWFsJywgJ0FyaWFsIEJsYWNrJywgJ0FyaWFsIEhlYnJldycsICdBcmlhbCBNVCcsICdBcmlhbCBOYXJyb3cnLCAnQXJpYWwgUm91bmRlZCBNVCBCb2xkJywgJ0FyaWFsIFVuaWNvZGUgTVMnLCAnQml0c3RyZWFtIFZlcmEgU2FucyBNb25vJywgJ0Jvb2sgQW50aXF1YScsICdCb29rbWFuIE9sZCBTdHlsZScsICdDYWxpYnJpJywgJ0NhbWJyaWEnLCAnQ2FtYnJpYSBNYXRoJywgJ0NlbnR1cnknLCAnQ2VudHVyeSBHb3RoaWMnLCAnQ2VudHVyeSBTY2hvb2xib29rJywgJ0NvbWljIFNhbnMnLCAnQ29taWMgU2FucyBNUycsICdDb25zb2xhcycsICdDb3VyaWVyJywgJ0NvdXJpZXIgTmV3JywgJ0dlbmV2YScsICdHZW9yZ2lhJywgJ0hlbHZldGljYScsICdIZWx2ZXRpY2EgTmV1ZScsICdJbXBhY3QnLCAnTHVjaWRhIEJyaWdodCcsICdMdWNpZGEgQ2FsbGlncmFwaHknLCAnTHVjaWRhIENvbnNvbGUnLCAnTHVjaWRhIEZheCcsICdMVUNJREEgR1JBTkRFJywgJ0x1Y2lkYSBIYW5kd3JpdGluZycsICdMdWNpZGEgU2FucycsICdMdWNpZGEgU2FucyBUeXBld3JpdGVyJywgJ0x1Y2lkYSBTYW5zIFVuaWNvZGUnLCAnTWljcm9zb2Z0IFNhbnMgU2VyaWYnLCAnTW9uYWNvJywgJ01vbm90eXBlIENvcnNpdmEnLCAnTVMgR290aGljJywgJ01TIE91dGxvb2snLCAnTVMgUEdvdGhpYycsICdNUyBSZWZlcmVuY2UgU2FucyBTZXJpZicsICdNUyBTYW5zIFNlcmlmJywgJ01TIFNlcmlmJywgJ01ZUklBRCcsICdNWVJJQUQgUFJPJywgJ1BhbGF0aW5vJywgJ1BhbGF0aW5vIExpbm90eXBlJywgJ1NlZ29lIFByaW50JywgJ1NlZ29lIFNjcmlwdCcsICdTZWdvZSBVSScsICdTZWdvZSBVSSBMaWdodCcsICdTZWdvZSBVSSBTZW1pYm9sZCcsICdTZWdvZSBVSSBTeW1ib2wnLCAnVGFob21hJywgJ1RpbWVzJywgJ1RpbWVzIE5ldyBSb21hbicsICdUaW1lcyBOZXcgUm9tYW4gUFMnLCAnVHJlYnVjaGV0IE1TJywgJ1ZlcmRhbmEnLCAnV2luZ2RpbmdzJywgJ1dpbmdkaW5ncyAyJywgJ1dpbmdkaW5ncyAzJ107IHQuZm9udHMuZXh0ZW5kZWRKc0ZvbnRzICYmIChkID0gZC5jb25jYXQoWydBYmFkaSBNVCBDb25kZW5zZWQgTGlnaHQnLCAnQWNhZGVteSBFbmdyYXZlZCBMRVQnLCAnQURPQkUgQ0FTTE9OIFBSTycsICdBZG9iZSBHYXJhbW9uZCcsICdBRE9CRSBHQVJBTU9ORCBQUk8nLCAnQWdlbmN5IEZCJywgJ0FoYXJvbmknLCAnQWxiZXJ0dXMgRXh0cmEgQm9sZCcsICdBbGJlcnR1cyBNZWRpdW0nLCAnQWxnZXJpYW4nLCAnQW1hem9uZSBCVCcsICdBbWVyaWNhbiBUeXBld3JpdGVyJywgJ0FtZXJpY2FuIFR5cGV3cml0ZXIgQ29uZGVuc2VkJywgJ0FtZXJUeXBlIE1kIEJUJywgJ0FuZGFsdXMnLCAnQW5nc2FuYSBOZXcnLCAnQW5nc2FuYVVQQycsICdBbnRpcXVlIE9saXZlJywgJ0FwYXJhaml0YScsICdBcHBsZSBDaGFuY2VyeScsICdBcHBsZSBDb2xvciBFbW9qaScsICdBcHBsZSBTRCBHb3RoaWMgTmVvJywgJ0FyYWJpYyBUeXBlc2V0dGluZycsICdBUkNIRVInLCAnQVJOTyBQUk8nLCAnQXJydXMgQlQnLCAnQXVyb3JhIENuIEJUJywgJ0F2YW50R2FyZGUgQmsgQlQnLCAnQXZhbnRHYXJkZSBNZCBCVCcsICdBVkVOSVInLCAnQXl1dGhheWEnLCAnQmFuZHknLCAnQmFuZ2xhIFNhbmdhbSBNTicsICdCYW5rIEdvdGhpYycsICdCYW5rR290aGljIE1kIEJUJywgJ0Jhc2tlcnZpbGxlJywgJ0Jhc2tlcnZpbGxlIE9sZCBGYWNlJywgJ0JhdGFuZycsICdCYXRhbmdDaGUnLCAnQmF1ZXIgQm9kb25pJywgJ0JhdWhhdXMgOTMnLCAnQmF6b29rYScsICdCZWxsIE1UJywgJ0JlbWJvJywgJ0Jlbmd1aWF0IEJrIEJUJywgJ0JlcmxpbiBTYW5zIEZCJywgJ0JlcmxpbiBTYW5zIEZCIERlbWknLCAnQmVybmFyZCBNVCBDb25kZW5zZWQnLCAnQmVybmhhcmRGYXNoaW9uIEJUJywgJ0Jlcm5oYXJkTW9kIEJUJywgJ0JpZyBDYXNsb24nLCAnQmlubmVyRCcsICdCbGFja2FkZGVyIElUQycsICdCbGFpck1kSVRDIFRUJywgJ0JvZG9uaSA3MicsICdCb2RvbmkgNzIgT2xkc3R5bGUnLCAnQm9kb25pIDcyIFNtYWxsY2FwcycsICdCb2RvbmkgTVQnLCAnQm9kb25pIE1UIEJsYWNrJywgJ0JvZG9uaSBNVCBDb25kZW5zZWQnLCAnQm9kb25pIE1UIFBvc3RlciBDb21wcmVzc2VkJywgJ0Jvb2tzaGVsZiBTeW1ib2wgNycsICdCb3VsZGVyJywgJ0JyYWRsZXkgSGFuZCcsICdCcmFkbGV5IEhhbmQgSVRDJywgJ0JyZW1lbiBCZCBCVCcsICdCcml0YW5uaWMgQm9sZCcsICdCcm9hZHdheScsICdCcm93YWxsaWEgTmV3JywgJ0Jyb3dhbGxpYVVQQycsICdCcnVzaCBTY3JpcHQgTVQnLCAnQ2FsaWZvcm5pYW4gRkInLCAnQ2FsaXN0byBNVCcsICdDYWxsaWdyYXBoZXInLCAnQ2FuZGFyYScsICdDYXNsb25PcG5mYWNlIEJUJywgJ0Nhc3RlbGxhcicsICdDZW50YXVyJywgJ0NlemFubmUnLCAnQ0cgT21lZ2EnLCAnQ0cgVGltZXMnLCAnQ2hhbGtib2FyZCcsICdDaGFsa2JvYXJkIFNFJywgJ0NoYWxrZHVzdGVyJywgJ0NoYXJsZXN3b3J0aCcsICdDaGFydGVyIEJkIEJUJywgJ0NoYXJ0ZXIgQlQnLCAnQ2hhdWNlcicsICdDaGVsdGhtSVRDIEJrIEJUJywgJ0NoaWxsZXInLCAnQ2xhcmVuZG9uJywgJ0NsYXJlbmRvbiBDb25kZW5zZWQnLCAnQ2xvaXN0ZXJCbGFjayBCVCcsICdDb2NoaW4nLCAnQ29sb25uYSBNVCcsICdDb25zdGFudGlhJywgJ0Nvb3BlciBCbGFjaycsICdDb3BwZXJwbGF0ZScsICdDb3BwZXJwbGF0ZSBHb3RoaWMnLCAnQ29wcGVycGxhdGUgR290aGljIEJvbGQnLCAnQ29wcGVycGxhdGUgR290aGljIExpZ2h0JywgJ0NvcHBlcnBsR290aCBCZCBCVCcsICdDb3JiZWwnLCAnQ29yZGlhIE5ldycsICdDb3JkaWFVUEMnLCAnQ29ybmVyc3RvbmUnLCAnQ29yb25ldCcsICdDdWNrb28nLCAnQ3VybHogTVQnLCAnRGF1blBlbmgnLCAnRGF1cGhpbicsICdEYXZpZCcsICdEQiBMQ0QgVGVtcCcsICdERUxJQ0lPVVMnLCAnRGVubWFyaycsICdERkthaS1TQicsICdEaWRvdCcsICdEaWxsZW5pYVVQQycsICdESU4nLCAnRG9rQ2hhbXBhJywgJ0RvdHVtJywgJ0RvdHVtQ2hlJywgJ0VicmltYScsICdFZHdhcmRpYW4gU2NyaXB0IElUQycsICdFbGVwaGFudCcsICdFbmdsaXNoIDExMSBWaXZhY2UgQlQnLCAnRW5ncmF2ZXJzIE1UJywgJ0VuZ3JhdmVyc0dvdGhpYyBCVCcsICdFcmFzIEJvbGQgSVRDJywgJ0VyYXMgRGVtaSBJVEMnLCAnRXJhcyBMaWdodCBJVEMnLCAnRXJhcyBNZWRpdW0gSVRDJywgJ0V1Y3Jvc2lhVVBDJywgJ0V1cGhlbWlhJywgJ0V1cGhlbWlhIFVDQVMnLCAnRVVST1NUSUxFJywgJ0V4b3RjMzUwIEJkIEJUJywgJ0ZhbmdTb25nJywgJ0ZlbGl4IFRpdGxpbmcnLCAnRml4ZWRzeXMnLCAnRk9OVElOJywgJ0Zvb3RsaWdodCBNVCBMaWdodCcsICdGb3J0ZScsICdGcmFua1J1ZWhsJywgJ0ZyYW5zaXNjYW4nLCAnRnJlZWZybTcyMSBCbGsgQlQnLCAnRnJlZXNpYVVQQycsICdGcmVlc3R5bGUgU2NyaXB0JywgJ0ZyZW5jaCBTY3JpcHQgTVQnLCAnRnJua0dvdGhJVEMgQmsgQlQnLCAnRnJ1aXRnZXInLCAnRlJVVElHRVInLCAnRnV0dXJhJywgJ0Z1dHVyYSBCayBCVCcsICdGdXR1cmEgTHQgQlQnLCAnRnV0dXJhIE1kIEJUJywgJ0Z1dHVyYSBaQmxrIEJUJywgJ0Z1dHVyYUJsYWNrIEJUJywgJ0dhYnJpb2xhJywgJ0dhbGxpYXJkIEJUJywgJ0dhdXRhbWknLCAnR2VlemEgUHJvJywgJ0dlb21ldHIyMzEgQlQnLCAnR2VvbWV0cjIzMSBIdiBCVCcsICdHZW9tZXRyMjMxIEx0IEJUJywgJ0dlb1NsYWIgNzAzIEx0IEJUJywgJ0dlb1NsYWIgNzAzIFhCZCBCVCcsICdHaWdpJywgJ0dpbGwgU2FucycsICdHaWxsIFNhbnMgTVQnLCAnR2lsbCBTYW5zIE1UIENvbmRlbnNlZCcsICdHaWxsIFNhbnMgTVQgRXh0IENvbmRlbnNlZCBCb2xkJywgJ0dpbGwgU2FucyBVbHRyYSBCb2xkJywgJ0dpbGwgU2FucyBVbHRyYSBCb2xkIENvbmRlbnNlZCcsICdHaXNoYScsICdHbG91Y2VzdGVyIE1UIEV4dHJhIENvbmRlbnNlZCcsICdHT1RIQU0nLCAnR09USEFNIEJPTEQnLCAnR291ZHkgT2xkIFN0eWxlJywgJ0dvdWR5IFN0b3V0JywgJ0dvdWR5SGFuZHRvb2xlZCBCVCcsICdHb3VkeU9MU3QgQlQnLCAnR3VqYXJhdGkgU2FuZ2FtIE1OJywgJ0d1bGltJywgJ0d1bGltQ2hlJywgJ0d1bmdzdWgnLCAnR3VuZ3N1aENoZScsICdHdXJtdWtoaSBNTicsICdIYWV0dGVuc2Nod2VpbGVyJywgJ0hhcmxvdyBTb2xpZCBJdGFsaWMnLCAnSGFycmluZ3RvbicsICdIZWF0aGVyJywgJ0hlaXRpIFNDJywgJ0hlaXRpIFRDJywgJ0hFTFYnLCAnSGVyYWxkJywgJ0hpZ2ggVG93ZXIgVGV4dCcsICdIaXJhZ2lubyBLYWt1IEdvdGhpYyBQcm9OJywgJ0hpcmFnaW5vIE1pbmNobyBQcm9OJywgJ0hvZWZsZXIgVGV4dCcsICdIdW1hbnN0IDUyMSBDbiBCVCcsICdIdW1hbnN0NTIxIEJUJywgJ0h1bWFuc3Q1MjEgTHQgQlQnLCAnSW1wcmludCBNVCBTaGFkb3cnLCAnSW5jaXNlZDkwMSBCZCBCVCcsICdJbmNpc2VkOTAxIEJUJywgJ0luY2lzZWQ5MDEgTHQgQlQnLCAnSU5DT05TT0xBVEEnLCAnSW5mb3JtYWwgUm9tYW4nLCAnSW5mb3JtYWwwMTEgQlQnLCAnSU5URVJTVEFURScsICdJcmlzVVBDJywgJ0lza29vbGEgUG90YScsICdKYXNtaW5lVVBDJywgJ0phenogTEVUJywgJ0plbnNvbicsICdKZXN0ZXInLCAnSm9rZXJtYW4nLCAnSnVpY2UgSVRDJywgJ0thYmVsIEJrIEJUJywgJ0thYmVsIFVsdCBCVCcsICdLYWlsYXNhJywgJ0thaVRpJywgJ0thbGluZ2EnLCAnS2FubmFkYSBTYW5nYW0gTU4nLCAnS2FydGlrYScsICdLYXVmbWFubiBCZCBCVCcsICdLYXVmbWFubiBCVCcsICdLaG1lciBVSScsICdLb2RjaGlhbmdVUEMnLCAnS29raWxhJywgJ0tvcmlubmEgQlQnLCAnS3Jpc3RlbiBJVEMnLCAnS3J1bmd0aGVwJywgJ0t1bnN0bGVyIFNjcmlwdCcsICdMYW8gVUknLCAnTGF0aGEnLCAnTGVlbGF3YWRlZScsICdMZXR0ZXIgR290aGljJywgJ0xldmVuaW0gTVQnLCAnTGlseVVQQycsICdMaXRob2dyYXBoJywgJ0xpdGhvZ3JhcGggTGlnaHQnLCAnTG9uZyBJc2xhbmQnLCAnTHlkaWFuIEJUJywgJ01hZ25ldG8nLCAnTWFpYW5kcmEgR0QnLCAnTWFsYXlhbGFtIFNhbmdhbSBNTicsICdNYWxndW4gR290aGljJywgJ01hbmdhbCcsICdNYXJpZ29sZCcsICdNYXJpb24nLCAnTWFya2VyIEZlbHQnLCAnTWFya2V0JywgJ01hcmxldHQnLCAnTWF0aXNzZSBJVEMnLCAnTWF0dXJhIE1UIFNjcmlwdCBDYXBpdGFscycsICdNZWlyeW8nLCAnTWVpcnlvIFVJJywgJ01pY3Jvc29mdCBIaW1hbGF5YScsICdNaWNyb3NvZnQgSmhlbmdIZWknLCAnTWljcm9zb2Z0IE5ldyBUYWkgTHVlJywgJ01pY3Jvc29mdCBQaGFnc1BhJywgJ01pY3Jvc29mdCBUYWkgTGUnLCAnTWljcm9zb2Z0IFVpZ2h1cicsICdNaWNyb3NvZnQgWWFIZWknLCAnTWljcm9zb2Z0IFlpIEJhaXRpJywgJ01pbmdMaVUnLCAnTWluZ0xpVV9IS1NDUycsICdNaW5nTGlVX0hLU0NTLUV4dEInLCAnTWluZ0xpVS1FeHRCJywgJ01pbmlvbicsICdNaW5pb24gUHJvJywgJ01pcmlhbScsICdNaXJpYW0gRml4ZWQnLCAnTWlzdHJhbCcsICdNb2Rlcm4nLCAnTW9kZXJuIE5vLiAyMCcsICdNb25hIExpc2EgU29saWQgSVRDIFRUJywgJ01vbmdvbGlhbiBCYWl0aScsICdNT05PJywgJ01vb2xCb3JhbicsICdNcnMgRWF2ZXMnLCAnTVMgTGluZURyYXcnLCAnTVMgTWluY2hvJywgJ01TIFBNaW5jaG8nLCAnTVMgUmVmZXJlbmNlIFNwZWNpYWx0eScsICdNUyBVSSBHb3RoaWMnLCAnTVQgRXh0cmEnLCAnTVVTRU8nLCAnTVYgQm9saScsICdOYWRlZW0nLCAnTmFya2lzaW0nLCAnTkVWSVMnLCAnTmV3cyBHb3RoaWMnLCAnTmV3cyBHb3RoaWNNVCcsICdOZXdzR290aCBCVCcsICdOaWFnYXJhIEVuZ3JhdmVkJywgJ05pYWdhcmEgU29saWQnLCAnTm90ZXdvcnRoeScsICdOU2ltU3VuJywgJ055YWxhJywgJ09DUiBBIEV4dGVuZGVkJywgJ09sZCBDZW50dXJ5JywgJ09sZCBFbmdsaXNoIFRleHQgTVQnLCAnT255eCcsICdPbnl4IEJUJywgJ09QVElNQScsICdPcml5YSBTYW5nYW0gTU4nLCAnT1NBS0EnLCAnT3pIYW5kaWNyYWZ0IEJUJywgJ1BhbGFjZSBTY3JpcHQgTVQnLCAnUGFweXJ1cycsICdQYXJjaG1lbnQnLCAnUGFydHkgTEVUJywgJ1BlZ2FzdXMnLCAnUGVycGV0dWEnLCAnUGVycGV0dWEgVGl0bGluZyBNVCcsICdQZXRpdGFCb2xkJywgJ1BpY2t3aWNrJywgJ1BsYW50YWdlbmV0IENoZXJva2VlJywgJ1BsYXliaWxsJywgJ1BNaW5nTGlVJywgJ1BNaW5nTGlVLUV4dEInLCAnUG9vciBSaWNoYXJkJywgJ1Bvc3RlcicsICdQb3N0ZXJCb2RvbmkgQlQnLCAnUFJJTkNFVE9XTiBMRVQnLCAnUHJpc3RpbmEnLCAnUFRCYXJudW0gQlQnLCAnUHl0aGFnb3JhcycsICdSYWF2aScsICdSYWdlIEl0YWxpYycsICdSYXZpZScsICdSaWJib24xMzEgQmQgQlQnLCAnUm9ja3dlbGwnLCAnUm9ja3dlbGwgQ29uZGVuc2VkJywgJ1JvY2t3ZWxsIEV4dHJhIEJvbGQnLCAnUm9kJywgJ1JvbWFuJywgJ1Nha2thbCBNYWphbGxhJywgJ1NhbnRhIEZlIExFVCcsICdTYXZveWUgTEVUJywgJ1NjZXB0cmUnLCAnU2NyaXB0JywgJ1NjcmlwdCBNVCBCb2xkJywgJ1NDUklQVElOQScsICdTZXJpZmEnLCAnU2VyaWZhIEJUJywgJ1NlcmlmYSBUaCBCVCcsICdTaGVsbGV5Vm9sYW50ZSBCVCcsICdTaGVyd29vZCcsICdTaG9uYXIgQmFuZ2xhJywgJ1Nob3djYXJkIEdvdGhpYycsICdTaHJ1dGknLCAnU2lnbmJvYXJkJywgJ1NJTEtTQ1JFRU4nLCAnU2ltSGVpJywgJ1NpbXBsaWZpZWQgQXJhYmljJywgJ1NpbXBsaWZpZWQgQXJhYmljIEZpeGVkJywgJ1NpbVN1bicsICdTaW1TdW4tRXh0QicsICdTaW5oYWxhIFNhbmdhbSBNTicsICdTa2V0Y2ggUm9ja3dlbGwnLCAnU2tpYScsICdTbWFsbCBGb250cycsICdTbmFwIElUQycsICdTbmVsbCBSb3VuZGhhbmQnLCAnU29ja2V0JywgJ1NvdXZlbmlyIEx0IEJUJywgJ1N0YWNjYXRvMjIyIEJUJywgJ1N0ZWFtZXInLCAnU3RlbmNpbCcsICdTdG9yeWJvb2snLCAnU3R5bGxvJywgJ1N1YndheScsICdTd2lzNzIxIEJsa0V4IEJUJywgJ1N3aXNzOTExIFhDbSBCVCcsICdTeWxmYWVuJywgJ1N5bmNocm8gTEVUJywgJ1N5c3RlbScsICdUYW1pbCBTYW5nYW0gTU4nLCAnVGVjaG5pY2FsJywgJ1RlbGV0eXBlJywgJ1RlbHVndSBTYW5nYW0gTU4nLCAnVGVtcHVzIFNhbnMgSVRDJywgJ1Rlcm1pbmFsJywgJ1Rob25idXJpJywgJ1RyYWRpdGlvbmFsIEFyYWJpYycsICdUcmFqYW4nLCAnVFJBSkFOIFBSTycsICdUcmlzdGFuJywgJ1R1YnVsYXInLCAnVHVuZ2EnLCAnVHcgQ2VuIE1UJywgJ1R3IENlbiBNVCBDb25kZW5zZWQnLCAnVHcgQ2VuIE1UIENvbmRlbnNlZCBFeHRyYSBCb2xkJywgJ1R5cG9VcHJpZ2h0IEJUJywgJ1VuaWNvcm4nLCAnVW5pdmVycycsICdVbml2ZXJzIENFIDU1IE1lZGl1bScsICdVbml2ZXJzIENvbmRlbnNlZCcsICdVdHNhYWgnLCAnVmFnYWJvbmQnLCAnVmFuaScsICdWaWpheWEnLCAnVmluZXIgSGFuZCBJVEMnLCAnVmlzdWFsVUknLCAnVml2YWxkaScsICdWbGFkaW1pciBTY3JpcHQnLCAnVnJpbmRhJywgJ1dlc3RtaW5zdGVyJywgJ1dISVRORVknLCAnV2lkZSBMYXRpbicsICdaYXBmRWxsaXB0IEJUJywgJ1phcGZIdW1uc3QgQlQnLCAnWmFwZkh1bW5zdCBEbSBCVCcsICdaYXBmaW5vJywgJ1p1cmljaCBCbGtFeCBCVCcsICdadXJpY2ggRXggQlQnLCAnWldBZG9iZUYnXSkpOyBkID0gKGQgPSBkLmNvbmNhdCh0LmZvbnRzLnVzZXJEZWZpbmVkRm9udHMpKS5maWx0ZXIoKGUsIHQpID0+IHsgcmV0dXJuIGQuaW5kZXhPZihlKSA9PT0gdDsgfSk7IGNvbnN0IGEgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdOyBjb25zdCByID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7IGNvbnN0IGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgY29uc3QgbiA9IHt9OyBjb25zdCBpID0ge307IGNvbnN0IGYgPSBmdW5jdGlvbiAoKSB7IGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7IHJldHVybiBlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJywgZS5zdHlsZS5sZWZ0ID0gJy05OTk5cHgnLCBlLnN0eWxlLmZvbnRTaXplID0gJzcycHgnLCBlLnN0eWxlLmZvbnRTdHlsZSA9ICdub3JtYWwnLCBlLnN0eWxlLmZvbnRXZWlnaHQgPSAnbm9ybWFsJywgZS5zdHlsZS5sZXR0ZXJTcGFjaW5nID0gJ25vcm1hbCcsIGUuc3R5bGUubGluZUJyZWFrID0gJ2F1dG8nLCBlLnN0eWxlLmxpbmVIZWlnaHQgPSAnbm9ybWFsJywgZS5zdHlsZS50ZXh0VHJhbnNmb3JtID0gJ25vbmUnLCBlLnN0eWxlLnRleHRBbGlnbiA9ICdsZWZ0JywgZS5zdHlsZS50ZXh0RGVjb3JhdGlvbiA9ICdub25lJywgZS5zdHlsZS50ZXh0U2hhZG93ID0gJ25vbmUnLCBlLnN0eWxlLndoaXRlU3BhY2UgPSAnbm9ybWFsJywgZS5zdHlsZS53b3JkQnJlYWsgPSAnbm9ybWFsJywgZS5zdHlsZS53b3JkU3BhY2luZyA9ICdub3JtYWwnLCBlLmlubmVySFRNTCA9ICdtbW1tbW1tbW1tbGxpJywgZTsgfTsgY29uc3QgbyA9IGZ1bmN0aW9uIChlKSB7IGZvciAodmFyIHQgPSAhMSwgYSA9IDA7IGEgPCB1Lmxlbmd0aDsgYSsrKSBpZiAodCA9IGVbYV0ub2Zmc2V0V2lkdGggIT09IG5bdVthXV0gfHwgZVthXS5vZmZzZXRIZWlnaHQgIT09IGlbdVthXV0pIHJldHVybiB0OyByZXR1cm4gdDsgfTsgY29uc3QgbCA9IChmdW5jdGlvbiAoKSB7IGZvciAodmFyIGUgPSBbXSwgdCA9IDAsIGEgPSB1Lmxlbmd0aDsgdCA8IGE7IHQrKykgeyBjb25zdCBuID0gZigpOyBuLnN0eWxlLmZvbnRGYW1pbHkgPSB1W3RdLCByLmFwcGVuZENoaWxkKG4pLCBlLnB1c2gobik7IH0gcmV0dXJuIGU7IH0oKSk7IGEuYXBwZW5kQ2hpbGQocik7IGZvciAobGV0IHMgPSAwLCBjID0gdS5sZW5ndGg7IHMgPCBjOyBzKyspblt1W3NdXSA9IGxbc10ub2Zmc2V0V2lkdGgsIGlbdVtzXV0gPSBsW3NdLm9mZnNldEhlaWdodDsgY29uc3QgaCA9IChmdW5jdGlvbiAoKSB7IGZvciAodmFyIGUsIHQsIGEsIG4gPSB7fSwgciA9IDAsIGkgPSBkLmxlbmd0aDsgciA8IGk7IHIrKykgeyBmb3IgKHZhciBvID0gW10sIGwgPSAwLCBzID0gdS5sZW5ndGg7IGwgPCBzOyBsKyspIHsgY29uc3QgYyA9IChlID0gZFtyXSwgdCA9IHVbbF0sIGEgPSB2b2lkIDAsIChhID0gZigpKS5zdHlsZS5mb250RmFtaWx5ID0gYCcke2V9Jywke3R9YCwgYSk7IGcuYXBwZW5kQ2hpbGQoYyksIG8ucHVzaChjKTsgfW5bZFtyXV0gPSBvOyB9IHJldHVybiBuOyB9KCkpOyBhLmFwcGVuZENoaWxkKGcpOyBmb3IgKHZhciBtID0gW10sIFQgPSAwLCBwID0gZC5sZW5ndGg7IFQgPCBwOyBUKyspbyhoW2RbVF1dKSAmJiBtLnB1c2goZFtUXSk7IGEucmVtb3ZlQ2hpbGQoZyksIGEucmVtb3ZlQ2hpbGQociksIGUobSk7IH0sIHBhdXNlQmVmb3JlOiAhMCB9LCB7IGtleTogJ2ZvbnRzRmxhc2gnLCBnZXREYXRhKHQsIGUpIHsgcmV0dXJuIEQoKSA/IE4oKSA/IGUuZm9udHMuc3dmUGF0aCA/IHZvaWQgXygoZSkgPT4geyB0KGUpOyB9LCBlKSA6IHQoJ21pc3Npbmcgb3B0aW9ucy5mb250cy5zd2ZQYXRoJykgOiB0KCdmbGFzaCBub3QgaW5zdGFsbGVkJykgOiB0KCdzd2Ygb2JqZWN0IG5vdCBsb2FkZWQnKTsgfSwgcGF1c2VCZWZvcmU6ICEwIH0sIHsga2V5OiAnYXVkaW8nLCBnZXREYXRhKGEsIGUpIHsgY29uc3QgdCA9IGUuYXVkaW87IGlmICh0LmV4Y2x1ZGVJT1MxMSAmJiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9PUyAxMS4rVmVyc2lvblxcLzExLitTYWZhcmkvKSkgcmV0dXJuIGEoZS5FWENMVURFRCk7IGNvbnN0IG4gPSB3aW5kb3cuT2ZmbGluZUF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0T2ZmbGluZUF1ZGlvQ29udGV4dDsgaWYgKG4gPT0gbnVsbCkgcmV0dXJuIGEoZS5OT1RfQVZBSUxBQkxFKTsgbGV0IHIgPSBuZXcgbigxLCA0NDEwMCwgNDQxMDApOyBjb25zdCBpID0gci5jcmVhdGVPc2NpbGxhdG9yKCk7IGkudHlwZSA9ICd0cmlhbmdsZScsIGkuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDFlNCwgci5jdXJyZW50VGltZSk7IGNvbnN0IG8gPSByLmNyZWF0ZUR5bmFtaWNzQ29tcHJlc3NvcigpOyBjKFtbJ3RocmVzaG9sZCcsIC01MF0sIFsna25lZScsIDQwXSwgWydyYXRpbycsIDEyXSwgWydyZWR1Y3Rpb24nLCAtMjBdLCBbJ2F0dGFjaycsIDBdLCBbJ3JlbGVhc2UnLCAwLjI1XV0sIChlKSA9PiB7IHZvaWQgMCAhPT0gb1tlWzBdXSAmJiB0eXBlb2Ygb1tlWzBdXS5zZXRWYWx1ZUF0VGltZSA9PT0gJ2Z1bmN0aW9uJyAmJiBvW2VbMF1dLnNldFZhbHVlQXRUaW1lKGVbMV0sIHIuY3VycmVudFRpbWUpOyB9KSwgaS5jb25uZWN0KG8pLCBvLmNvbm5lY3Qoci5kZXN0aW5hdGlvbiksIGkuc3RhcnQoMCksIHIuc3RhcnRSZW5kZXJpbmcoKTsgY29uc3QgbCA9IHNldFRpbWVvdXQoKCkgPT4geyByZXR1cm4gY29uc29sZS53YXJuKGBBdWRpbyBmaW5nZXJwcmludCB0aW1lZCBvdXQuIFBsZWFzZSByZXBvcnQgYnVnIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9WYWx2ZS9maW5nZXJwcmludGpzMiB3aXRoIHlvdXIgdXNlciBhZ2VudDogXCIke25hdmlnYXRvci51c2VyQWdlbnR9XCIuYCksIHIub25jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHt9LCByID0gbnVsbCwgYSgnYXVkaW9UaW1lb3V0Jyk7IH0sIHQudGltZW91dCk7IHIub25jb21wbGV0ZSA9IGZ1bmN0aW9uIChlKSB7IGxldCB0OyB0cnkgeyBjbGVhclRpbWVvdXQobCksIHQgPSBlLnJlbmRlcmVkQnVmZmVyLmdldENoYW5uZWxEYXRhKDApLnNsaWNlKDQ1MDAsIDVlMykucmVkdWNlKChlLCB0KSA9PiB7IHJldHVybiBlICsgTWF0aC5hYnModCk7IH0sIDApLnRvU3RyaW5nKCksIGkuZGlzY29ubmVjdCgpLCBvLmRpc2Nvbm5lY3QoKTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gdm9pZCBhKGUpOyB9YSh0KTsgfTsgfSB9LCB7IGtleTogJ2VudW1lcmF0ZURldmljZXMnLCBnZXREYXRhKHQsIGUpIHsgaWYgKCFhKCkpIHJldHVybiB0KGUuTk9UX0FWQUlMQUJMRSk7IG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpLnRoZW4oKGUpID0+IHsgdChlLm1hcCgoZSkgPT4geyByZXR1cm4gYGlkPSR7ZS5kZXZpY2VJZH07Z2lkPSR7ZS5ncm91cElkfTske2Uua2luZH07JHtlLmxhYmVsfWA7IH0pKTsgfSkuY2F0Y2goKGUpID0+IHsgdChlKTsgfSk7IH0gfV07IGNvbnN0IFUgPSBmdW5jdGlvbiAoZSkgeyB0aHJvdyBuZXcgRXJyb3IoXCInbmV3IEZpbmdlcnByaW50KCknIGlzIGRlcHJlY2F0ZWQsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vVmFsdmUvZmluZ2VycHJpbnRqczIjdXBncmFkZS1ndWlkZS1mcm9tLTE4Mi10by0yMDBcIik7IH07IHJldHVybiBVLmdldCA9IGZ1bmN0aW9uIChhLCBuKSB7IG4gPyBhIHx8IChhID0ge30pIDogKG4gPSBhLCBhID0ge30pLCAoZnVuY3Rpb24gKGUsIHQpIHsgaWYgKHQgPT0gbnVsbCkgcmV0dXJuOyBsZXQgYTsgbGV0IG47IGZvciAobiBpbiB0KShhID0gdFtuXSkgPT0gbnVsbCB8fCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSwgbikgfHwgKGVbbl0gPSBhKTsgfShhLCBlKSksIGEuY29tcG9uZW50cyA9IGEuZXh0cmFDb21wb25lbnRzLmNvbmNhdChHKTsgdmFyIHIgPSB7IGRhdGE6IFtdLCBhZGRQcmVwcm9jZXNzZWRDb21wb25lbnQoZSwgdCkgeyB0eXBlb2YgYS5wcmVwcm9jZXNzb3IgPT09ICdmdW5jdGlvbicgJiYgKHQgPSBhLnByZXByb2Nlc3NvcihlLCB0KSksIHIuZGF0YS5wdXNoKHsga2V5OiBlLCB2YWx1ZTogdCB9KTsgfSB9OyBsZXQgaSA9IC0xOyB2YXIgbyA9IGZ1bmN0aW9uIChlKSB7IGlmICgoaSArPSAxKSA+PSBhLmNvbXBvbmVudHMubGVuZ3RoKW4oci5kYXRhKTsgZWxzZSB7IGNvbnN0IHQgPSBhLmNvbXBvbmVudHNbaV07IGlmIChhLmV4Y2x1ZGVzW3Qua2V5XSlvKCExKTsgZWxzZSB7IGlmICghZSAmJiB0LnBhdXNlQmVmb3JlKSByZXR1cm4gaSAtPSAxLCB2b2lkIHNldFRpbWVvdXQoKCkgPT4geyBvKCEwKTsgfSwgMSk7IHRyeSB7IHQuZ2V0RGF0YSgoZSkgPT4geyByLmFkZFByZXByb2Nlc3NlZENvbXBvbmVudCh0LmtleSwgZSksIG8oITEpOyB9LCBhKTsgfSBjYXRjaCAoZSkgeyByLmFkZFByZXByb2Nlc3NlZENvbXBvbmVudCh0LmtleSwgU3RyaW5nKGUpKSwgbyghMSk7IH0gfSB9IH07IG8oITEpOyB9LCBVLmdldFByb21pc2UgPSBmdW5jdGlvbiAoYSkgeyByZXR1cm4gbmV3IFByb21pc2UoKChlLCB0KSA9PiB7IFUuZ2V0KGEsIGUpOyB9KSk7IH0sIFUuZ2V0VjE4ID0gZnVuY3Rpb24gKGksIG8pIHsgcmV0dXJuIG8gPT0gbnVsbCAmJiAobyA9IGksIGkgPSB7fSksIFUuZ2V0KGksIChlKSA9PiB7IGZvciAodmFyIHQgPSBbXSwgYSA9IDA7IGEgPCBlLmxlbmd0aDsgYSsrKSB7IGNvbnN0IG4gPSBlW2FdOyBpZiAobi52YWx1ZSA9PT0gKGkuTk9UX0FWQUlMQUJMRSB8fCAnbm90IGF2YWlsYWJsZScpKXQucHVzaCh7IGtleTogbi5rZXksIHZhbHVlOiAndW5rbm93bicgfSk7IGVsc2UgaWYgKG4ua2V5ID09PSAncGx1Z2lucycpdC5wdXNoKHsga2V5OiAncGx1Z2lucycsIHZhbHVlOiBzKG4udmFsdWUsIChlKSA9PiB7IGNvbnN0IHQgPSBzKGVbMl0sIChlKSA9PiB7IHJldHVybiBlLmpvaW4gPyBlLmpvaW4oJ34nKSA6IGU7IH0pLmpvaW4oJywnKTsgcmV0dXJuIFtlWzBdLCBlWzFdLCB0XS5qb2luKCc6OicpOyB9KSB9KTsgZWxzZSBpZiAoWydjYW52YXMnLCAnd2ViZ2wnXS5pbmRleE9mKG4ua2V5KSAhPT0gLTEpdC5wdXNoKHsga2V5OiBuLmtleSwgdmFsdWU6IG4udmFsdWUuam9pbignficpIH0pOyBlbHNlIGlmIChbJ3Nlc3Npb25TdG9yYWdlJywgJ2xvY2FsU3RvcmFnZScsICdpbmRleGVkRGInLCAnYWRkQmVoYXZpb3InLCAnb3BlbkRhdGFiYXNlJ10uaW5kZXhPZihuLmtleSkgIT09IC0xKSB7IGlmICghbi52YWx1ZSkgY29udGludWU7IHQucHVzaCh7IGtleTogbi5rZXksIHZhbHVlOiAxIH0pOyB9IGVsc2Ugbi52YWx1ZSA/IHQucHVzaChuLnZhbHVlLmpvaW4gPyB7IGtleTogbi5rZXksIHZhbHVlOiBuLnZhbHVlLmpvaW4oJzsnKSB9IDogbikgOiB0LnB1c2goeyBrZXk6IG4ua2V5LCB2YWx1ZTogbi52YWx1ZSB9KTsgfSBjb25zdCByID0gbChzKHQsIChlKSA9PiB7IHJldHVybiBlLnZhbHVlOyB9KS5qb2luKCd+fn4nKSwgMzEpOyBvKHIsIHQpOyB9KTsgfSwgVS54NjRoYXNoMTI4ID0gbCwgVS5WRVJTSU9OID0gJzIuMS4wJywgVTtcbn0pKTtcbiIsImNvbnN0IGNvbmZpZyA9IHtcbiAgQVBJX1VSTDogJ2h0dHBzOi8vd2F2ZWxvb3Atc3RhZ2luZy1hcGkucGFyYWxlY3QubmV0L3RyYWNrJyxcbiAgQVBJX1VSTF9ERVY6ICdodHRwOi8vbG9jYWxob3N0OjMwMDEvdHJhY2snLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5cbmNvbnN0IEFQSV9VUkwgPSBwcm9jZXNzLmVudi5CVUlMRCA9PT0gJ2RldicgPyBjb25maWcuQVBJX1VSTF9ERVYgOiBjb25maWcuQVBJX1VSTDtcblxuY29uc3QgQ0xBU1NfRElWSURFUiA9IC8gL2c7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0RFQk9VTkNFX1RJTUUgPSA1MDA7XG5leHBvcnQgY29uc3QgREVGQVVMVF9USFJPVFRMRV9USU1FID0gMTAwMDtcblxuY29uc3QgZ2V0UGFyZW50cyA9IChlbGVtZW50KSA9PiB7XG4gIGNvbnN0IHBhcmVudHMgPSBbXTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZm9yICg7IGVsZW1lbnQgJiYgZWxlbWVudCAhPT0gZG9jdW1lbnQ7IGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICBwYXJlbnRzLnB1c2goZWxlbWVudCk7XG4gIH1cblxuICByZXR1cm4gcGFyZW50cztcbn07XG5cbmNvbnN0IGdldENvdW50U2FtZU5vZGVOYW1lID0gKGVsZW1lbnRzQXJyYXksIGVsZW1lbnQpID0+IHtcbiAgbGV0IGNvdW50ID0gMDtcblxuICBbLi4uZWxlbWVudHNBcnJheV0uZm9yRWFjaCgoY3VycmVudEVsZW1lbnQpID0+IHtcbiAgICBpZiAoY3VycmVudEVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICBjb3VudCArPSAxO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGNvdW50O1xufTtcblxuY29uc3QgZ2V0TnRoTnVtYmVyID0gKGVsZW1lbnQpID0+IHtcbiAgbGV0IG50aCA9IDE7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbmQtYXNzaWduLG5vLXBhcmFtLXJlYXNzaWduXG4gIHdoaWxlIChlbGVtZW50ID0gZWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgbnRoICs9IDE7XG4gIH1cblxuICByZXR1cm4gbnRoO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldENzc1BhdGggPSAoZWxlbWVudCkgPT4ge1xuICBsZXQgZWxlbWVudFBhcmVudHMgPSBnZXRQYXJlbnRzKGVsZW1lbnQpO1xuICBlbGVtZW50UGFyZW50cyA9IGVsZW1lbnRQYXJlbnRzLnNwbGljZSgwLCBlbGVtZW50UGFyZW50cy5sZW5ndGggLSAxKTtcblxuICBjb25zdCBzZWxlY3RvcnNBcnJheSA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudFBhcmVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBlbGVtZW50SXRlbSA9IGVsZW1lbnRQYXJlbnRzW2ldO1xuXG4gICAgY29uc3Qgbm9kZU5hbWUgPSBlbGVtZW50SXRlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgbGV0IGlkID0gJyc7XG4gICAgbGV0IHNlbGVjdG9yID0gJyc7XG5cbiAgICBpZiAoZWxlbWVudEl0ZW0uaWQpIHtcbiAgICAgIGlkID0gYCMke2VsZW1lbnRJdGVtLmlkfWA7XG4gICAgfVxuXG4gICAgaWYgKGlkKSB7XG4gICAgICBzZWxlY3RvciA9IGlkO1xuICAgICAgc2VsZWN0b3JzQXJyYXkucHVzaChzZWxlY3Rvcik7XG4gICAgICBicmVhaztcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0b3IgPSBub2RlTmFtZTtcbiAgICAgIGNvbnN0IHsgcGFyZW50Tm9kZSB9ID0gZWxlbWVudEl0ZW07XG5cbiAgICAgIGlmIChwYXJlbnROb2RlKSB7XG4gICAgICAgIGNvbnN0IHNpYmxpbmcgPSBwYXJlbnROb2RlLmNoaWxkcmVuO1xuICAgICAgICBjb25zdCBjb3VudFNhbWVOb2RlTmFtZSA9IGdldENvdW50U2FtZU5vZGVOYW1lKHNpYmxpbmcsIGVsZW1lbnRJdGVtKTtcblxuICAgICAgICBpZiAoc2libGluZy5sZW5ndGggPiAxICYmIGNvdW50U2FtZU5vZGVOYW1lID4gMSkge1xuICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBlbGVtZW50SXRlbS5jbGFzc05hbWUgPyBgLiR7ZWxlbWVudEl0ZW0uY2xhc3NOYW1lLnJlcGxhY2UoQ0xBU1NfRElWSURFUiwgJy4nKX1gIDogJyc7XG5cbiAgICAgICAgICBpZiAoY2xhc3NOYW1lcykge1xuICAgICAgICAgICAgc2VsZWN0b3IgKz0gY2xhc3NOYW1lcztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbnRoTnVtYmVyID0gZ2V0TnRoTnVtYmVyKGVsZW1lbnRJdGVtKTtcbiAgICAgICAgICAgIHNlbGVjdG9yICs9IGA6bnRoLWNoaWxkKCR7bnRoTnVtYmVyfSlgO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdG9yc0FycmF5LnB1c2goc2VsZWN0b3IpO1xuICB9XG5cbiAgY29uc3QgcmVzdWx0UGF0aCA9IHNlbGVjdG9yc0FycmF5LnJldmVyc2UoKS5qb2luKCcgPiAnKTtcblxuICByZXR1cm4gcmVzdWx0UGF0aDtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRWYWx1ZSA9IChlbGVtZW50KSA9PiB7XG4gIHJldHVybiBgJHtlbGVtZW50LnZhbHVlIHx8IGVsZW1lbnQuaW5uZXJUZXh0IHx8ICcnfWA7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VuZERhdGEgPSAodXJsLCBkYXRhKSA9PiBmZXRjaChgJHtBUElfVVJMfS8ke3VybH1gLCB7XG4gIG1ldGhvZDogJ1BPU1QnLFxuICBoZWFkZXJzOiB7XG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgfSxcbiAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG59KS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKTtcblxuZXhwb3J0IGNvbnN0IHNlbmRUcmFja0RhdGEgPSAodXNlckRhdGEsIHVybCwgZGF0YSkgPT4gc2VuZERhdGEoXG4gIHVybCxcbiAge1xuICAgIC4uLmRhdGEsXG4gICAgcHJvamVjdElkOiB1c2VyRGF0YS5wcm9qZWN0SWQsXG4gICAgdmlzaXRvcklkOiB1c2VyRGF0YS52aXNpdG9ySWQsXG4gICAgc2Vzc2lvbklkOiB1c2VyRGF0YS5zZXNzaW9uSWQsXG4gIH0sXG4pLnRoZW4oKHRyYWNrRGF0YSkgPT4ge1xuICBpZiAodHJhY2tEYXRhLnNlc3Npb25JZCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHVzZXJEYXRhLnNlc3Npb25JZCA9IHRyYWNrRGF0YS5zZXNzaW9uSWQ7XG4gIH1cblxuICByZXR1cm4gdHJhY2tEYXRhO1xufSk7XG5cbmV4cG9ydCBjb25zdCByZWdpc3RlckhhbmRsZXJzID0gKHVzZXJEYXRhLCBoYW5kbGVycykgPT4ge1xuICBoYW5kbGVycy5mb3JFYWNoKChoYW5kbGVyKSA9PiBoYW5kbGVyKHVzZXJEYXRhKSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGVib3VuY2UgPSAoZnVuYywgZGVsYXkpID0+IHtcbiAgbGV0IGJsb2NrZXJJZDtcblxuICByZXR1cm4gKGFyZ3MpID0+IHtcbiAgICBjbGVhclRpbWVvdXQoYmxvY2tlcklkKTtcbiAgICBibG9ja2VySWQgPSBzZXRUaW1lb3V0KCgpID0+IGZ1bmMoYXJncyksIGRlbGF5KTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCB0aHJvdHRsZSA9IChmdW5jLCBsaW1pdCkgPT4ge1xuICBsZXQgaXNCbG9ja2VkID0gZmFsc2U7XG5cbiAgcmV0dXJuIChhcmdzKSA9PiB7XG4gICAgaWYgKGlzQmxvY2tlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZ1bmMoYXJncyk7XG5cbiAgICBpc0Jsb2NrZWQgPSB0cnVlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4geyBpc0Jsb2NrZWQgPSBmYWxzZTsgfSwgbGltaXQpO1xuICB9O1xufTtcblxuY29uc3QgaW5jbHVkZXMgPSAoaGF5c3RhY2ssIG5lZWRsZSkgPT4ge1xuICByZXR1cm4gaGF5c3RhY2suaW5kZXhPZihuZWVkbGUpICE9PSAtMTtcbn07XG5cbmNvbnN0IGZpbmQgPSAobmVlZGxlKSA9PiB7XG4gIHJldHVybiBpbmNsdWRlcyhuYXZpZ2F0b3IudXNlckFnZW50LnRvTG9jYWxlTG93ZXJDYXNlKCksIG5lZWRsZSk7XG59O1xuXG5jb25zdCB3aW5kb3dzID0gKCkgPT4ge1xuICByZXR1cm4gZmluZCgnd2luZG93cycpO1xufTtcblxuY29uc3QgbGludXggPSAoKSA9PiB7XG4gIHJldHVybiBmaW5kKCdsaW51eCcpO1xufTtcblxuY29uc3QgaXBob25lID0gKCkgPT4ge1xuICByZXR1cm4gIXdpbmRvd3MoKSAmJiBmaW5kKCdpcGhvbmUnKTtcbn07XG5cbmNvbnN0IGlwb2QgPSAoKSA9PiB7XG4gIHJldHVybiBmaW5kKCdpcG9kJyk7XG59O1xuXG5jb25zdCBpcGFkID0gKCkgPT4ge1xuICBjb25zdCBpUGFkT1MxM1VwID0gbmF2aWdhdG9yLnBsYXRmb3JtID09PSAnTWFjSW50ZWwnICYmIG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDE7XG4gIHJldHVybiBmaW5kKCdpcGFkJykgfHwgaVBhZE9TMTNVcDtcbn07XG5cbmNvbnN0IGlvcyA9ICgpID0+IHtcbiAgcmV0dXJuIGlwaG9uZSgpIHx8IGlwb2QoKSB8fCBpcGFkKCk7XG59O1xuXG5jb25zdCBtYWNvcyA9ICgpID0+IHtcbiAgcmV0dXJuIGZpbmQoJ21hYycpO1xufTtcblxuY29uc3QgYW5kcm9pZCA9ICgpID0+IHtcbiAgcmV0dXJuICF3aW5kb3dzKCkgJiYgZmluZCgnYW5kcm9pZCcpO1xufTtcblxuY29uc3QgYW5kcm9pZFBob25lID0gKCkgPT4ge1xuICByZXR1cm4gYW5kcm9pZCgpICYmIGZpbmQoJ21vYmlsZScpO1xufTtcblxuY29uc3QgYW5kcm9pZFRhYmxldCA9ICgpID0+IHtcbiAgcmV0dXJuIGFuZHJvaWQoKSAmJiAhZmluZCgnbW9iaWxlJyk7XG59O1xuXG5jb25zdCBibGFja2JlcnJ5ID0gKCkgPT4ge1xuICByZXR1cm4gZmluZCgnYmxhY2tiZXJyeScpIHx8IGZpbmQoJ2JiMTAnKTtcbn07XG5cbmNvbnN0IGJsYWNrYmVycnlQaG9uZSA9ICgpID0+IHtcbiAgcmV0dXJuIGJsYWNrYmVycnkoKSAmJiAhZmluZCgndGFibGV0Jyk7XG59O1xuXG5jb25zdCBibGFja2JlcnJ5VGFibGV0ID0gKCkgPT4ge1xuICByZXR1cm4gYmxhY2tiZXJyeSgpICYmIGZpbmQoJ3RhYmxldCcpO1xufTtcblxuY29uc3Qgd2luZG93c1Bob25lID0gKCkgPT4ge1xuICByZXR1cm4gd2luZG93cygpICYmIGZpbmQoJ3Bob25lJyk7XG59O1xuXG5jb25zdCB3aW5kb3dzVGFibGV0ID0gKCkgPT4ge1xuICByZXR1cm4gd2luZG93cygpICYmIChmaW5kKCd0b3VjaCcpICYmICF3aW5kb3dzUGhvbmUoKSk7XG59O1xuXG5jb25zdCBmeG9zID0gKCkgPT4ge1xuICByZXR1cm4gKGZpbmQoJyhtb2JpbGUnKSB8fCBmaW5kKCcodGFibGV0JykpICYmIGZpbmQoJyBydjonKTtcbn07XG5cbmNvbnN0IGZ4b3NQaG9uZSA9ICgpID0+IHtcbiAgcmV0dXJuIGZ4b3MoKSAmJiBmaW5kKCdtb2JpbGUnKTtcbn07XG5cbmNvbnN0IGZ4b3NUYWJsZXQgPSAoKSA9PiB7XG4gIHJldHVybiBmeG9zKCkgJiYgZmluZCgndGFibGV0Jyk7XG59O1xuXG5jb25zdCBtZWVnbyA9ICgpID0+IHtcbiAgcmV0dXJuIGZpbmQoJ21lZWdvJyk7XG59O1xuXG5jb25zdCBtb2JpbGUgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgYW5kcm9pZFBob25lKClcbiAgICB8fCBpcGhvbmUoKVxuICAgIHx8IGlwb2QoKVxuICAgIHx8IHdpbmRvd3NQaG9uZSgpXG4gICAgfHwgYmxhY2tiZXJyeVBob25lKClcbiAgICB8fCBmeG9zUGhvbmUoKVxuICAgIHx8IG1lZWdvKClcbiAgKTtcbn07XG5cbmNvbnN0IHRhYmxldCA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICBpcGFkKClcbiAgICB8fCBhbmRyb2lkVGFibGV0KClcbiAgICB8fCBibGFja2JlcnJ5VGFibGV0KClcbiAgICB8fCB3aW5kb3dzVGFibGV0KClcbiAgICB8fCBmeG9zVGFibGV0KClcbiAgKTtcbn07XG5cbmNvbnN0IGRlc2t0b3AgPSAoKSA9PiB7XG4gIHJldHVybiAhdGFibGV0KCkgJiYgIW1vYmlsZSgpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldERldmljZVR5cGUgPSAoKSA9PiB7XG4gIGlmIChkZXNrdG9wKCkpIHtcbiAgICByZXR1cm4gJ2Rlc2t0b3AnO1xuICB9XG5cbiAgaWYgKHRhYmxldCgpKSB7XG4gICAgcmV0dXJuICd0YWJsZXQnO1xuICB9XG5cbiAgaWYgKG1vYmlsZSgpKSB7XG4gICAgcmV0dXJuICdtb2JpbGUnO1xuICB9XG5cbiAgcmV0dXJuICd1bmtub3duJztcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRPUyA9ICgpID0+IHtcbiAgaWYgKGlvcygpKSB7XG4gICAgcmV0dXJuICdpb3MnO1xuICB9XG5cbiAgaWYgKGFuZHJvaWQoKSkge1xuICAgIHJldHVybiAnYW5kcm9pZCc7XG4gIH1cblxuICBpZiAoYmxhY2tiZXJyeSgpKSB7XG4gICAgcmV0dXJuICdibGFja2JlcnJ5JztcbiAgfVxuXG4gIGlmIChtYWNvcygpKSB7XG4gICAgcmV0dXJuICdtYWNvcyc7XG4gIH1cblxuICBpZiAod2luZG93cygpKSB7XG4gICAgcmV0dXJuICd3aW5kb3dzJztcbiAgfVxuXG4gIGlmIChsaW51eCgpKSB7XG4gICAgcmV0dXJuICdsaW51eCc7XG4gIH1cblxuICBpZiAoZnhvcygpKSB7XG4gICAgcmV0dXJuICdmeG9zJztcbiAgfVxuXG4gIGlmIChtZWVnbygpKSB7XG4gICAgcmV0dXJuICdtZWVnbyc7XG4gIH1cblxuICByZXR1cm4gJ3Vua25vd24nO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXJOYW1lID0gKCkgPT4ge1xuICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdFZGdlJykgPiAtMSAmJiBuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKCdFZGdlJykgPiAtMSkge1xuICAgIHJldHVybiAnRWRnZSc7XG4gIH1cblxuICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdPcGVyYScpICE9PSAtMSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09QUicpICE9PSAtMSkge1xuICAgIHJldHVybiAnT3BlcmEnO1xuICB9XG5cbiAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lJykgIT09IC0xKSB7XG4gICAgcmV0dXJuICdDaHJvbWUnO1xuICB9XG5cbiAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignU2FmYXJpJykgIT09IC0xKSB7XG4gICAgcmV0dXJuICdTYWZhcmknO1xuICB9XG5cbiAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignRmlyZWZveCcpICE9PSAtMSkge1xuICAgIHJldHVybiAnRmlyZWZveCc7XG4gIH1cblxuICBpZiAoKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignTVNJRScpICE9PSAtMSkgfHwgKCEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlID09PSB0cnVlKSkgeyAvLyBJRiBJRSA+IDEwe1xuICAgIHJldHVybiAnSUUnO1xuICB9XG5cbiAgcmV0dXJuICd1bmtub3duJztcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRDb25uZWN0aW9uVHlwZSA9ICgpID0+IHtcbiAgY29uc3QgY29ubmVjdGlvblR5cGUgPSBuYXZpZ2F0b3IgJiYgbmF2aWdhdG9yLmNvbm5lY3Rpb24gJiYgbmF2aWdhdG9yLmNvbm5lY3Rpb24udHlwZTsgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL05ldHdvcmtfSW5mb3JtYXRpb25fQVBJXG5cbiAgcmV0dXJuIGNvbm5lY3Rpb25UeXBlO1xufTtcbiIsImltcG9ydCB7IHNlbmRUcmFja0RhdGEsIGdldENzc1BhdGgsIGdldFZhbHVlIH0gZnJvbSAnLi4vaGVscGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0ICh1c2VyRGF0YSkgPT4ge1xuICBjb25zdCBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICB0eXBlOiAnY2xpY2snLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgIHg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgICAgeTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0b3I6IGdldENzc1BhdGgoZXZlbnQudGFyZ2V0KSxcbiAgICAgICAgdmFsdWU6IGdldFZhbHVlKGV2ZW50LnRhcmdldCksXG4gICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBjb3JyZWN0cyBjbGljbHMgYWZ0ZXIgc2Nyb2xsaW5nXG4gICAgc2VuZFRyYWNrRGF0YSh1c2VyRGF0YSwgJ2FjdGlvbicsIHtcbiAgICAgIHR5cGU6ICdwYWdlU2Nyb2xsJyxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgb2Zmc2V0OiB7XG4gICAgICAgICAgeDogd2luZG93LnBhZ2VYT2Zmc2V0LFxuICAgICAgICAgIHk6IHdpbmRvdy5wYWdlWU9mZnNldCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBzZW5kVHJhY2tEYXRhKHVzZXJEYXRhLCAnYWN0aW9uJywgZGF0YSk7XG4gIH07XG5cbiAgcmV0dXJuIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNsaWNrLCB7IGNhcHR1cmU6IHRydWUsIHBhc3NpdmU6IHRydWUgfSk7XG59O1xuXG4vLyBjbGlja3MgZG9lc24ndCB3b3JrIG9uIGRpc2FibGVkIGVsZW1lbnRzLlxuLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSLzIwMTQvUkVDLWh0bWw1LTIwMTQxMDI4L2Zvcm1zLmh0bWwjY29uY2VwdC1mZS1kaXNhYmxlZFxuIiwiaW1wb3J0IHsgc2VuZFRyYWNrRGF0YSwgZGVib3VuY2UsIERFRkFVTFRfREVCT1VOQ0VfVElNRSB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCAodXNlckRhdGEpID0+IHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRlYm91bmNlKCgpID0+IHNlbmRUcmFja0RhdGEodXNlckRhdGEsICdhY3Rpb24nLCB7XG4gICAgdHlwZTogJ3Jlc2l6ZScsXG4gICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgIHBheWxvYWQ6IHtcbiAgICAgIHNpemU6IHtcbiAgICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSksXG4gIERFRkFVTFRfREVCT1VOQ0VfVElNRSkpO1xufTtcbiIsImltcG9ydCB7IHNlbmRUcmFja0RhdGEsIHRocm90dGxlIH0gZnJvbSAnLi4vaGVscGVycyc7XG5cbmNvbnN0IFNDUk9MTF9USFJPVFRMRV9USU1FID0gMTAwO1xuXG5leHBvcnQgZGVmYXVsdCAodXNlckRhdGEpID0+IHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRocm90dGxlKCgpID0+IHNlbmRUcmFja0RhdGEodXNlckRhdGEsICdhY3Rpb24nLCB7XG4gICAgdHlwZTogJ3BhZ2VTY3JvbGwnLFxuICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBvZmZzZXQ6IHtcbiAgICAgICAgeDogd2luZG93LnBhZ2VYT2Zmc2V0LFxuICAgICAgICB5OiB3aW5kb3cucGFnZVlPZmZzZXQsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pLFxuICBTQ1JPTExfVEhST1RUTEVfVElNRSkpO1xufTtcbiIsImltcG9ydCB7IHNlbmRUcmFja0RhdGEsIHRocm90dGxlIH0gZnJvbSAnLi4vaGVscGVycyc7XG5cbi8vIFByb2JhYmx5IHdlIG5lZWQgaXQgbGVzcyB0aGFuIDIwMG1zXG4vLyBmb3IgYmV0dGVyIHF1YWxpdHkgb2YgXCJWaXNpdG9yIEFjdGlvbnMgUGxheWVyXCJcbmNvbnN0IE1PVVNFX01PVkVfVEhST1RUTEVfVElNRSA9IDEwMDtcblxuY29uc3QgQUNUSU9OX1NFTkRfSU5URVJWQUwgPSAzMDAwO1xuXG5jb25zdCBldmVudEJ1ZmZlciA9IHtcbiAgZGF0YTogW10sXG4gIGxhdGVzdFNlbmQ6IERhdGUubm93KCksXG59O1xuXG5jb25zdCBtb3VzZU1vdmVIYW5kbGVyID0gKHVzZXJEYXRhKSA9PiB7XG4gIGZ1bmN0aW9uIGhhbmRsZUV2ZW50KGV2ZW50KSB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCByZWNvcmQgPSB7XG4gICAgICB4OiBldmVudC5jbGllbnRYLFxuICAgICAgeTogZXZlbnQuY2xpZW50WSxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICB9O1xuXG4gICAgZXZlbnRCdWZmZXIuZGF0YS5wdXNoKHJlY29yZCk7XG5cbiAgICBpZiAodGltZXN0YW1wIC0gZXZlbnRCdWZmZXIubGF0ZXN0U2VuZCA+IEFDVElPTl9TRU5EX0lOVEVSVkFMKSB7XG4gICAgICBjb25zdCBtYW55UmVjb3JkcyA9IHtcbiAgICAgICAgdHlwZTogJ21vdXNlTW92ZScsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBiYXRjaDogZXZlbnRCdWZmZXIuZGF0YSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBldmVudEJ1ZmZlci5kYXRhID0gW107XG4gICAgICBldmVudEJ1ZmZlci5sYXRlc3RTZW5kID0gRGF0ZS5ub3coKTtcblxuICAgICAgc2VuZFRyYWNrRGF0YSh1c2VyRGF0YSwgJ2FjdGlvbicsIG1hbnlSZWNvcmRzKTtcbiAgICB9XG4gIH1cblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhyb3R0bGUoaGFuZGxlRXZlbnQsIE1PVVNFX01PVkVfVEhST1RUTEVfVElNRSkpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbW91c2VNb3ZlSGFuZGxlcjtcbiIsImltcG9ydCB7IHNlbmRUcmFja0RhdGEgfSBmcm9tICcuLi9oZWxwZXJzJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZUxvY2F0aW9uQ2hhbmdlID0gKHVzZXJEYXRhKSA9PiB7XG4gIGNvbnN0IHsgaHJlZiB9ID0gd2luZG93LmxvY2F0aW9uO1xuXG4gIGNvbnN0IGFjdGlvbkRhdGEgPSB7XG4gICAgdHlwZTogJ3BhdGhDaGFuZ2UnLFxuICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICBwYXlsb2FkOiB7XG4gICAgICB2YWx1ZTogaHJlZixcbiAgICB9LFxuICB9O1xuXG4gIHNlbmRUcmFja0RhdGEodXNlckRhdGEsICdhY3Rpb24nLCBhY3Rpb25EYXRhKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0ICh1c2VyRGF0YSkgPT4ge1xuICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgPSAoKGYpID0+IGZ1bmN0aW9uIHB1c2hTdGF0ZSguLi5hcmcpIHtcbiAgICBjb25zdCByZXQgPSBmLmFwcGx5KHRoaXMsIGFyZyk7XG5cbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2xvY2F0aW9uY2hhbmdlJykpO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfSkod2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKTtcblxuICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUgPSAoKGYpID0+IGZ1bmN0aW9uIHJlcGxhY2VTdGF0ZSguLi5hcmcpIHtcbiAgICBjb25zdCByZXQgPSBmLmFwcGx5KHRoaXMsIGFyZyk7XG5cbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2xvY2F0aW9uY2hhbmdlJykpO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfSkod2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCAoKSA9PiB7XG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdsb2NhdGlvbmNoYW5nZScpKTtcbiAgfSk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCAoKSA9PiB7XG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdsb2NhdGlvbmNoYW5nZScpKTtcbiAgfSk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BhZ2VzaG93JywgKCkgPT4ge1xuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9jYXRpb25jaGFuZ2UnKSk7XG4gIH0pO1xuXG4gIHJldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9jYXRpb25jaGFuZ2UnLCAoKSA9PiBoYW5kbGVMb2NhdGlvbkNoYW5nZSh1c2VyRGF0YSkpO1xufTtcbiIsImltcG9ydCB7IHNlbmRUcmFja0RhdGEgfSBmcm9tICcuLi9oZWxwZXJzJztcblxuY29uc3QgcmVtb3ZlVGFncyA9IChub2RlLCB0YWdOYW1lKSA9PiB7XG4gIGNvbnN0IG5vZGVDbG9uZWQgPSBub2RlLmNsb25lTm9kZSh0cnVlKTtcbiAgY29uc3QgdGFncyA9IG5vZGVDbG9uZWQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnTmFtZSk7XG5cbiAgd2hpbGUgKHRhZ3MubGVuZ3RoKSB7XG4gICAgdGFnc1swXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhZ3NbMF0pO1xuICB9XG5cbiAgcmV0dXJuIG5vZGVDbG9uZWQ7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRGFuZ2Vyb3VzVGFncyA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHJvb3RXaXRob3V0U2NyaXB0cyA9IHJlbW92ZVRhZ3Mobm9kZSwgJ3NjcmlwdCcpO1xuICBjb25zdCByb290V2l0aG91dElmcmFtZXMgPSByZW1vdmVUYWdzKHJvb3RXaXRob3V0U2NyaXB0cywgJ2lmcmFtZScpO1xuICByZXR1cm4gcm9vdFdpdGhvdXRJZnJhbWVzO1xufTtcblxubGV0IHByZXZXaWR0aDsgbGV0XG4gIHByZXZIZWlnaHQ7XG5cbmNvbnN0IGhhbmRsZU11dGF0aW9uID0gKHVzZXJEYXRhKSA9PiB7XG4gIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaHRtbCcpWzBdO1xuICBpZiAoIXJvb3QpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBbLi4ucm9vdC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpXS5mb3JFYWNoKChlbCkgPT4ge1xuICAgIGlmICghZWwuZ2V0QXR0cmlidXRlKCd2YWx1ZScpICYmIGVsLnZhbHVlKSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZWwudmFsdWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3Qgcm9vdFdpdGhvdXREYW5nZXJvdXNUYWdzID0gcmVtb3ZlRGFuZ2Vyb3VzVGFncyhyb290KTtcbiAgY29uc3Qgc2NyZWVuID0gcm9vdFdpdGhvdXREYW5nZXJvdXNUYWdzLm91dGVySFRNTDtcblxuICBjb25zdCB3aWR0aCA9IHJvb3Qub2Zmc2V0V2lkdGg7XG4gIGNvbnN0IGhlaWdodCA9IHJvb3Qub2Zmc2V0SGVpZ2h0O1xuXG4gIGlmIChwcmV2V2lkdGggIT09IHdpZHRoICYmIHByZXZIZWlnaHQgIT09IGhlaWdodCkge1xuICAgIHNlbmRUcmFja0RhdGEodXNlckRhdGEsICdyZWMnLCB7XG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIHNpemU6IHtcbiAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICBoZWlnaHQsXG4gICAgICAgIH0sXG4gICAgICAgIHNjcmVlbixcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBwcmV2V2lkdGggPSB3aWR0aDtcbiAgICBwcmV2SGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVNdXRhdGlvbjtcbiIsImltcG9ydCB7IGRlYm91bmNlLCBERUZBVUxUX0RFQk9VTkNFX1RJTUUgfSBmcm9tICcuLi9oZWxwZXJzJztcblxuaW1wb3J0IGhhbmRsZU11dGF0aW9uIGZyb20gJy4vbXV0YXRpb24nO1xuXG5jb25zdCBpbml0ID0gKHVzZXJEYXRhKSA9PiB7XG4gIGNvbnN0IE11dGF0aW9uT2JzZXJ2ZXIgPSB3aW5kb3cuTXV0YXRpb25PYnNlcnZlclxuICB8fCB3aW5kb3cuV2ViS2l0TXV0YXRpb25PYnNlcnZlclxuICB8fCB3aW5kb3cuTW96TXV0YXRpb25PYnNlcnZlcjtcblxuICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKFxuICAgIGRlYm91bmNlKCgpID0+IGhhbmRsZU11dGF0aW9uKHVzZXJEYXRhKSwgREVGQVVMVF9ERUJPVU5DRV9USU1FKSxcbiAgKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwgeyBzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIGF0dHJpYnV0ZXM6IHRydWUgfSk7XG4gIGhhbmRsZU11dGF0aW9uKHVzZXJEYXRhKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdCxcbn07XG4iLCJpbXBvcnQgJy4vbGliL2ZpbmdlcnByaW50Mi5taW4nO1xuaW1wb3J0IGNsaWNrSGFuZGxlciBmcm9tICcuL2FjdGlvbnMvY2xpY2snO1xuaW1wb3J0IHBhZ2VSZXNpemVIYW5kbGVyIGZyb20gJy4vYWN0aW9ucy9wYWdlUmVzaXplJztcbmltcG9ydCBwYWdlU2Nyb2xsaW5nSGFuZGxlciBmcm9tICcuL2FjdGlvbnMvcGFnZVNjcm9sbGluZyc7XG5pbXBvcnQgbW91c2VNb3ZlSGFuZGxlciBmcm9tICcuL2FjdGlvbnMvbW91c2VNb3ZlJztcbmltcG9ydCBwYXRoQ2hhbmdlSGFuZGxlciwgeyBoYW5kbGVMb2NhdGlvbkNoYW5nZSB9IGZyb20gJy4vYWN0aW9ucy9wYXRoQ2hhbmdlJztcbmltcG9ydCB0cmFja2VyTXV0YXRpb25PYnNlcnZlciBmcm9tICcuL3JlY29yZHMvb2JzZXJ2ZXInO1xuXG5pbXBvcnQge1xuICBzZW5kRGF0YSxcbiAgcmVnaXN0ZXJIYW5kbGVycyxcbiAgZ2V0RGV2aWNlVHlwZSxcbiAgZ2V0QnJvd3Nlck5hbWUsXG4gIGdldENvbm5lY3Rpb25UeXBlLFxuICBnZXRPUyxcbn0gZnJvbSAnLi9oZWxwZXJzJztcblxuaWYgKHByb2Nlc3MuZW52LkJVSUxEID09PSAnZGV2Jykge1xuICBpZiAoRmluZ2VycHJpbnQyICYmIEZpbmdlcnByaW50Mi5nZXRWMTgpIHtcbiAgICBjb25zb2xlLmxvZygnRmluZ2VycHJpbnQyLmdldFYxODonLCB0eXBlb2YgRmluZ2VycHJpbnQyLmdldFYxOCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKCdGaW5nZXJwcmludDIgbm90IGxvYWRlZCBjb3JyZWN0bHkhJywgRmluZ2VycHJpbnQyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG59XG5cbmNvbnN0IGRlZmF1bHRIYW5kbGVycyA9IFtcbiAgY2xpY2tIYW5kbGVyLFxuICBwYWdlUmVzaXplSGFuZGxlcixcbiAgcGFnZVNjcm9sbGluZ0hhbmRsZXIsXG4gIG1vdXNlTW92ZUhhbmRsZXIsXG4gIHBhdGhDaGFuZ2VIYW5kbGVyLFxuXTtcblxuY29uc3QgY2FsY0lkZW50aWZpY2F0b3IgPSAoKSA9PiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgRmluZ2VycHJpbnQyLmdldFYxOCgocmVzdWx0KSA9PiB7XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJlaihuZXcgRXJyb3IoJ0lkZW50aWZpY2F0b3Igbm90IGNyZWF0ZWQhJykpO1xuICAgIH1cblxuICAgIHJlcyhyZXN1bHQpO1xuICB9KTtcbn0pO1xuXG5jb25zdCBpbml0ID0gKGluaXRpYWxVc2VyRGF0YSwgaGFuZGxlcnMgPSBkZWZhdWx0SGFuZGxlcnMpID0+ICgpID0+IHtcbiAgY29uc3QgdXNlckRhdGEgPSB7IC4uLmluaXRpYWxVc2VyRGF0YSB9O1xuXG4gIHJldHVybiBjYWxjSWRlbnRpZmljYXRvcigpXG4gICAgLnRoZW4oKHZpc2l0b3JJZCkgPT4ge1xuICAgICAgdXNlckRhdGEudmlzaXRvcklkID0gdmlzaXRvcklkO1xuXG4gICAgICByZXR1cm4gZmV0Y2goJ2h0dHBzOi8vYXBpLmlwaWZ5Lm9yZycpXG4gICAgICAgIC50aGVuKChyZXMpID0+IHJlcy50ZXh0KCkpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgIG9zOiBnZXRPUygpLFxuICAgICAgICAgICAgYnJvd3Nlck5hbWU6IGdldEJyb3dzZXJOYW1lKCksXG4gICAgICAgICAgICBkZXZpY2VUeXBlOiBnZXREZXZpY2VUeXBlKCksXG4gICAgICAgICAgICBjb25uZWN0aW9uVHlwZTogZ2V0Q29ubmVjdGlvblR5cGUoKSxcbiAgICAgICAgICAgIGlwQWRkcmVzczogZGF0YSxcblxuICAgICAgICAgICAgcmVmZXJyZXJVcmw6IGRvY3VtZW50LnJlZmVycmVyLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb25zdCBzZXNzaW9uID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnd2F2ZWxvb3Bfc2Vzc2lvbicpKTtcbiAgICAgICAgICBjb25zdCBPTkVfTUlOVVRFX01TID0gMSAqIDYwICogMTAwMDtcblxuICAgICAgICAgIGlmIChzZXNzaW9uICYmIHNlc3Npb24uc2Vzc2lvbklkXG4gICAgICAgICAgICAmJiAobmV3IERhdGUoKSAtIG5ldyBEYXRlKHNlc3Npb24udXBkYXRlZE9uKSA8IE9ORV9NSU5VVEVfTVMpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzZXNzaW9uSWQ6IHNlc3Npb24uc2Vzc2lvbklkLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHNlbmREYXRhKCdpbml0JywgeyB2aXNpdG9ySWQsIHByb2plY3RJZDogdXNlckRhdGEucHJvamVjdElkLCBwYXlsb2FkIH0pO1xuICAgICAgICB9KTtcbiAgICB9KS50aGVuKCh7IHNlc3Npb25JZCB9KSA9PiB7XG4gICAgICBpZiAoc2Vzc2lvbklkKSB7XG4gICAgICAgIGNvbnN0IHNldFNlc3Npb24gPSAoKSA9PiB7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3dhdmVsb29wX3Nlc3Npb24nLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBzZXNzaW9uSWQsXG4gICAgICAgICAgICB1cGRhdGVkT246IG5ldyBEYXRlKCksXG4gICAgICAgICAgfSkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNldFNlc3Npb24oKTtcbiAgICAgICAgd2luZG93LldBVkVMT09QX1NFU1NJT05fSUQgPSBzZXNzaW9uSWQ7XG4gICAgICAgIHNldEludGVydmFsKHNldFNlc3Npb24sIDEwICogMTAwMCk7XG5cbiAgICAgICAgdXNlckRhdGEuc2Vzc2lvbklkID0gc2Vzc2lvbklkO1xuICAgICAgICByZWdpc3RlckhhbmRsZXJzKHVzZXJEYXRhLCBoYW5kbGVycyk7XG4gICAgICAgIHRyYWNrZXJNdXRhdGlvbk9ic2VydmVyLmluaXQodXNlckRhdGEpO1xuICAgICAgICBoYW5kbGVMb2NhdGlvbkNoYW5nZSh1c2VyRGF0YSk7XG4gICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52LkJVSUxEID09PSAnZGV2Jykge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZywgc2Vzc2lvbklkIG5vdCBzZXR0ZWQ6Jywgc2Vzc2lvbklkKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfVxuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4gKHtcbiAgICAgIHVzZXJEYXRhLFxuICAgIH0pKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdCxcbn07XG4iLCJpbXBvcnQgdHJhY2tlciBmcm9tICcuL3RyYWNrZXInO1xuXG5leHBvcnQgZGVmYXVsdCAoKCkgPT4ge1xuXHRjb25zdCB7IHdhdmVsb29wIH0gPSB3aW5kb3c7XG5cdGNvbnN0IHsgcGFyYW1zIH0gPSB3YXZlbG9vcDtcblx0aWYgKHByb2Nlc3MuZW52LkJVSUxEID09PSAnZGV2Jykge1xuXHRcdGNvbnNvbGUubG9nKCdXYXZlIHNjcmlwdCBwYXJhbXM6JywgcGFyYW1zKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXHR9XG5cblx0Ly8gZG9uJ3QgY2hhbmdlIG9iamVjdCdzIGxpbmsuXG5cdGNvbnN0IHVzZXJEYXRhID0ge1xuXHRcdHZpc2l0b3JJZDogbnVsbCxcblx0XHRzZXNzaW9uSWQ6IG51bGwsXG5cdFx0cHJvamVjdElkOiBwYXJhbXMucGlkXG5cdH07XG5cblx0aWYgKHdpbmRvdy5yZXF1ZXN0SWRsZUNhbGxiYWNrKSB7XG5cdFx0cmVxdWVzdElkbGVDYWxsYmFjayh0cmFja2VyLmluaXQodXNlckRhdGEpKTtcblx0fSBlbHNlIHtcblx0XHRzZXRUaW1lb3V0KHRyYWNrZXIuaW5pdCh1c2VyRGF0YSksIDUwMCk7XG5cdH1cbn0pKCk7XG4iXSwibmFtZXMiOlsiZSIsInQiLCJhIiwid2luZG93IiwiZGVmaW5lIiwiYW1kIiwibW9kdWxlIiwiZXhwb3J0cyIsIkZpbmdlcnByaW50MiIsInRoaXMiLCJkIiwiZyIsImYiLCJoIiwibSIsIlQiLCJsIiwibGVuZ3RoIiwibiIsInIiLCJpIiwibyIsInMiLCJjIiwidSIsImNoYXJDb2RlQXQiLCJ0b1N0cmluZyIsInNsaWNlIiwicHJlcHJvY2Vzc29yIiwiYXVkaW8iLCJ0aW1lb3V0IiwiZXhjbHVkZUlPUzExIiwiZm9udHMiLCJzd2ZDb250YWluZXJJZCIsInN3ZlBhdGgiLCJ1c2VyRGVmaW5lZEZvbnRzIiwiZXh0ZW5kZWRKc0ZvbnRzIiwic2NyZWVuIiwiZGV0ZWN0U2NyZWVuT3JpZW50YXRpb24iLCJwbHVnaW5zIiwic29ydFBsdWdpbnNGb3IiLCJleGNsdWRlSUUiLCJleHRyYUNvbXBvbmVudHMiLCJleGNsdWRlcyIsImVudW1lcmF0ZURldmljZXMiLCJwaXhlbFJhdGlvIiwiZG9Ob3RUcmFjayIsImZvbnRzRmxhc2giLCJOT1RfQVZBSUxBQkxFIiwiRVJST1IiLCJFWENMVURFRCIsIkFycmF5IiwicHJvdG90eXBlIiwiZm9yRWFjaCIsImhhc093blByb3BlcnR5IiwibWFwIiwicHVzaCIsIm5hdmlnYXRvciIsIm1lZGlhRGV2aWNlcyIsIndpZHRoIiwiaGVpZ2h0Iiwic29ydCIsInJldmVyc2UiLCJhdmFpbFdpZHRoIiwiYXZhaWxIZWlnaHQiLCJuYW1lIiwidHlwZSIsInN1ZmZpeGVzIiwiZGVzY3JpcHRpb24iLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJBY3RpdmVYT2JqZWN0IiwiY29uY2F0IiwidXNlckFnZW50IiwibWF0Y2giLCJwIiwic2Vzc2lvblN0b3JhZ2UiLCJ2IiwibG9jYWxTdG9yYWdlIiwiQSIsImluZGV4ZWREQiIsIlMiLCJoYXJkd2FyZUNvbmN1cnJlbmN5IiwiQyIsImNwdUNsYXNzIiwiQiIsInBsYXRmb3JtIiwidyIsIm1zRG9Ob3RUcmFjayIsIm1heFRvdWNoUG9pbnRzIiwibXNNYXhUb3VjaFBvaW50cyIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJ5IiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwiZGlzcGxheSIsImdldENvbnRleHQiLCJyZWN0IiwiaXNQb2ludEluUGF0aCIsInRleHRCYXNlbGluZSIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiZG9udFVzZUZha2VGb250SW5DYW52YXMiLCJmb250IiwiZmlsbFRleHQiLCJnbG9iYWxDb21wb3NpdGVPcGVyYXRpb24iLCJiZWdpblBhdGgiLCJhcmMiLCJNYXRoIiwiUEkiLCJjbG9zZVBhdGgiLCJmaWxsIiwidG9EYXRhVVJMIiwiRSIsImNsZWFyQ29sb3IiLCJlbmFibGUiLCJERVBUSF9URVNUIiwiZGVwdGhGdW5jIiwiTEVRVUFMIiwiY2xlYXIiLCJDT0xPUl9CVUZGRVJfQklUIiwiREVQVEhfQlVGRkVSX0JJVCIsIkYiLCJjcmVhdGVCdWZmZXIiLCJiaW5kQnVmZmVyIiwiQVJSQVlfQlVGRkVSIiwiRmxvYXQzMkFycmF5IiwiYnVmZmVyRGF0YSIsIlNUQVRJQ19EUkFXIiwiaXRlbVNpemUiLCJudW1JdGVtcyIsImNyZWF0ZVByb2dyYW0iLCJjcmVhdGVTaGFkZXIiLCJWRVJURVhfU0hBREVSIiwic2hhZGVyU291cmNlIiwiY29tcGlsZVNoYWRlciIsIkZSQUdNRU5UX1NIQURFUiIsImF0dGFjaFNoYWRlciIsImxpbmtQcm9ncmFtIiwidXNlUHJvZ3JhbSIsInZlcnRleFBvc0F0dHJpYiIsImdldEF0dHJpYkxvY2F0aW9uIiwib2Zmc2V0VW5pZm9ybSIsImdldFVuaWZvcm1Mb2NhdGlvbiIsImVuYWJsZVZlcnRleEF0dHJpYkFycmF5IiwidmVydGV4UG9zQXJyYXkiLCJ2ZXJ0ZXhBdHRyaWJQb2ludGVyIiwiRkxPQVQiLCJ1bmlmb3JtMmYiLCJkcmF3QXJyYXlzIiwiVFJJQU5HTEVfU1RSSVAiLCJjYW52YXMiLCJnZXRTdXBwb3J0ZWRFeHRlbnNpb25zIiwiam9pbiIsImdldFBhcmFtZXRlciIsIkFMSUFTRURfTElORV9XSURUSF9SQU5HRSIsIkFMSUFTRURfUE9JTlRfU0laRV9SQU5HRSIsIkFMUEhBX0JJVFMiLCJnZXRDb250ZXh0QXR0cmlidXRlcyIsImFudGlhbGlhcyIsIkJMVUVfQklUUyIsIkRFUFRIX0JJVFMiLCJHUkVFTl9CSVRTIiwiZ2V0RXh0ZW5zaW9uIiwiTUFYX1RFWFRVUkVfTUFYX0FOSVNPVFJPUFlfRVhUIiwiTUFYX0NPTUJJTkVEX1RFWFRVUkVfSU1BR0VfVU5JVFMiLCJNQVhfQ1VCRV9NQVBfVEVYVFVSRV9TSVpFIiwiTUFYX0ZSQUdNRU5UX1VOSUZPUk1fVkVDVE9SUyIsIk1BWF9SRU5ERVJCVUZGRVJfU0laRSIsIk1BWF9URVhUVVJFX0lNQUdFX1VOSVRTIiwiTUFYX1RFWFRVUkVfU0laRSIsIk1BWF9WQVJZSU5HX1ZFQ1RPUlMiLCJNQVhfVkVSVEVYX0FUVFJJQlMiLCJNQVhfVkVSVEVYX1RFWFRVUkVfSU1BR0VfVU5JVFMiLCJNQVhfVkVSVEVYX1VOSUZPUk1fVkVDVE9SUyIsIk1BWF9WSUVXUE9SVF9ESU1TIiwiUkVEX0JJVFMiLCJSRU5ERVJFUiIsIlNIQURJTkdfTEFOR1VBR0VfVkVSU0lPTiIsIlNURU5DSUxfQklUUyIsIlZFTkRPUiIsIlZFUlNJT04iLCJVTk1BU0tFRF9WRU5ET1JfV0VCR0wiLCJVTk1BU0tFRF9SRU5ERVJFUl9XRUJHTCIsImdldFNoYWRlclByZWNpc2lvbkZvcm1hdCIsInRvTG93ZXJDYXNlIiwiTSIsIngiLCJpbm5lckhUTUwiLCJjbGFzc05hbWUiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwib2Zmc2V0SGVpZ2h0IiwicmVtb3ZlQ2hpbGQiLCJPIiwibGFuZ3VhZ2VzIiwic3Vic3RyIiwibGFuZ3VhZ2UiLCJiIiwiUCIsIm9zY3B1IiwiaW5kZXhPZiIsIkwiLCJwcm9kdWN0U3ViIiwiZXZhbCIsInRvU291cmNlIiwiSSIsImsiLCJXZWJHTFJlbmRlcmluZ0NvbnRleHQiLCJSIiwiYXBwTmFtZSIsInRlc3QiLCJEIiwic3dmb2JqZWN0IiwiTiIsImhhc0ZsYXNoUGxheWVyVmVyc2lvbiIsIl8iLCJzZXRBdHRyaWJ1dGUiLCJvblJlYWR5IiwiZW1iZWRTV0YiLCJhbGxvd1NjcmlwdEFjY2VzcyIsIm1lbnUiLCJHIiwia2V5IiwiZ2V0RGF0YSIsIndlYmRyaXZlciIsInVzZXJMYW5ndWFnZSIsImJyb3dzZXJMYW5ndWFnZSIsInN5c3RlbUxhbmd1YWdlIiwiY29sb3JEZXB0aCIsImRldmljZU1lbW9yeSIsImRldmljZVBpeGVsUmF0aW8iLCJEYXRlIiwiZ2V0VGltZXpvbmVPZmZzZXQiLCJJbnRsIiwiRGF0ZVRpbWVGb3JtYXQiLCJyZXNvbHZlZE9wdGlvbnMiLCJ0aW1lWm9uZSIsImFkZEJlaGF2aW9yIiwib3BlbkRhdGFiYXNlIiwiZmlsdGVyIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJwb3NpdGlvbiIsImxlZnQiLCJmb250U2l6ZSIsImZvbnRTdHlsZSIsImZvbnRXZWlnaHQiLCJsZXR0ZXJTcGFjaW5nIiwibGluZUJyZWFrIiwibGluZUhlaWdodCIsInRleHRUcmFuc2Zvcm0iLCJ0ZXh0QWxpZ24iLCJ0ZXh0RGVjb3JhdGlvbiIsInRleHRTaGFkb3ciLCJ3aGl0ZVNwYWNlIiwid29yZEJyZWFrIiwid29yZFNwYWNpbmciLCJvZmZzZXRXaWR0aCIsImZvbnRGYW1pbHkiLCJwYXVzZUJlZm9yZSIsIk9mZmxpbmVBdWRpb0NvbnRleHQiLCJ3ZWJraXRPZmZsaW5lQXVkaW9Db250ZXh0IiwiY3JlYXRlT3NjaWxsYXRvciIsImZyZXF1ZW5jeSIsInNldFZhbHVlQXRUaW1lIiwiY3VycmVudFRpbWUiLCJjcmVhdGVEeW5hbWljc0NvbXByZXNzb3IiLCJjb25uZWN0IiwiZGVzdGluYXRpb24iLCJzdGFydCIsInN0YXJ0UmVuZGVyaW5nIiwic2V0VGltZW91dCIsImNvbnNvbGUiLCJ3YXJuIiwib25jb21wbGV0ZSIsImNsZWFyVGltZW91dCIsInJlbmRlcmVkQnVmZmVyIiwiZ2V0Q2hhbm5lbERhdGEiLCJyZWR1Y2UiLCJhYnMiLCJkaXNjb25uZWN0IiwidGhlbiIsImRldmljZUlkIiwiZ3JvdXBJZCIsImtpbmQiLCJsYWJlbCIsIlUiLCJFcnJvciIsImdldCIsImNhbGwiLCJjb21wb25lbnRzIiwiZGF0YSIsImFkZFByZXByb2Nlc3NlZENvbXBvbmVudCIsInZhbHVlIiwiU3RyaW5nIiwiZ2V0UHJvbWlzZSIsIlByb21pc2UiLCJnZXRWMTgiLCJ4NjRoYXNoMTI4IiwiY29uZmlnIiwiQVBJX1VSTCIsIkFQSV9VUkxfREVWIiwiQ0xBU1NfRElWSURFUiIsIkRFRkFVTFRfREVCT1VOQ0VfVElNRSIsImdldFBhcmVudHMiLCJlbGVtZW50IiwicGFyZW50cyIsInBhcmVudE5vZGUiLCJnZXRDb3VudFNhbWVOb2RlTmFtZSIsImVsZW1lbnRzQXJyYXkiLCJjb3VudCIsImN1cnJlbnRFbGVtZW50Iiwibm9kZU5hbWUiLCJnZXROdGhOdW1iZXIiLCJudGgiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwiZ2V0Q3NzUGF0aCIsImVsZW1lbnRQYXJlbnRzIiwic3BsaWNlIiwic2VsZWN0b3JzQXJyYXkiLCJlbGVtZW50SXRlbSIsImlkIiwic2VsZWN0b3IiLCJzaWJsaW5nIiwiY2hpbGRyZW4iLCJjb3VudFNhbWVOb2RlTmFtZSIsImNsYXNzTmFtZXMiLCJyZXBsYWNlIiwibnRoTnVtYmVyIiwicmVzdWx0UGF0aCIsImdldFZhbHVlIiwiaW5uZXJUZXh0Iiwic2VuZERhdGEiLCJ1cmwiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzcG9uc2UiLCJqc29uIiwic2VuZFRyYWNrRGF0YSIsInVzZXJEYXRhIiwiX29iamVjdFNwcmVhZCIsInByb2plY3RJZCIsInZpc2l0b3JJZCIsInNlc3Npb25JZCIsInRyYWNrRGF0YSIsInJlZ2lzdGVySGFuZGxlcnMiLCJoYW5kbGVycyIsImhhbmRsZXIiLCJkZWJvdW5jZSIsImZ1bmMiLCJkZWxheSIsImJsb2NrZXJJZCIsImFyZ3MiLCJ0aHJvdHRsZSIsImxpbWl0IiwiaXNCbG9ja2VkIiwiaW5jbHVkZXMiLCJoYXlzdGFjayIsIm5lZWRsZSIsImZpbmQiLCJ0b0xvY2FsZUxvd2VyQ2FzZSIsIndpbmRvd3MiLCJsaW51eCIsImlwaG9uZSIsImlwb2QiLCJpcGFkIiwiaVBhZE9TMTNVcCIsImlvcyIsIm1hY29zIiwiYW5kcm9pZCIsImFuZHJvaWRQaG9uZSIsImFuZHJvaWRUYWJsZXQiLCJibGFja2JlcnJ5IiwiYmxhY2tiZXJyeVBob25lIiwiYmxhY2tiZXJyeVRhYmxldCIsIndpbmRvd3NQaG9uZSIsIndpbmRvd3NUYWJsZXQiLCJmeG9zIiwiZnhvc1Bob25lIiwiZnhvc1RhYmxldCIsIm1lZWdvIiwibW9iaWxlIiwidGFibGV0IiwiZGVza3RvcCIsImdldERldmljZVR5cGUiLCJnZXRPUyIsImdldEJyb3dzZXJOYW1lIiwiYXBwVmVyc2lvbiIsImRvY3VtZW50TW9kZSIsImdldENvbm5lY3Rpb25UeXBlIiwiY29ubmVjdGlvblR5cGUiLCJjb25uZWN0aW9uIiwiaGFuZGxlQ2xpY2siLCJldmVudCIsInRpbWVzdGFtcCIsIm5vdyIsInBheWxvYWQiLCJjbGllbnRYIiwiY2xpZW50WSIsInRhcmdldCIsIm9mZnNldCIsInBhZ2VYT2Zmc2V0IiwicGFnZVlPZmZzZXQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2FwdHVyZSIsInBhc3NpdmUiLCJzaXplIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiU0NST0xMX1RIUk9UVExFX1RJTUUiLCJNT1VTRV9NT1ZFX1RIUk9UVExFX1RJTUUiLCJBQ1RJT05fU0VORF9JTlRFUlZBTCIsImV2ZW50QnVmZmVyIiwibGF0ZXN0U2VuZCIsIm1vdXNlTW92ZUhhbmRsZXIiLCJoYW5kbGVFdmVudCIsInJlY29yZCIsIm1hbnlSZWNvcmRzIiwiYmF0Y2giLCJoYW5kbGVMb2NhdGlvbkNoYW5nZSIsImhyZWYiLCJsb2NhdGlvbiIsImFjdGlvbkRhdGEiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiYXJnIiwicmV0IiwiYXBwbHkiLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJyZXBsYWNlU3RhdGUiLCJyZW1vdmVUYWdzIiwibm9kZSIsInRhZ05hbWUiLCJub2RlQ2xvbmVkIiwiY2xvbmVOb2RlIiwidGFncyIsInJlbW92ZURhbmdlcm91c1RhZ3MiLCJyb290V2l0aG91dFNjcmlwdHMiLCJyb290V2l0aG91dElmcmFtZXMiLCJwcmV2V2lkdGgiLCJwcmV2SGVpZ2h0IiwiaGFuZGxlTXV0YXRpb24iLCJyb290IiwicXVlcnlTZWxlY3RvckFsbCIsImVsIiwiZ2V0QXR0cmlidXRlIiwicm9vdFdpdGhvdXREYW5nZXJvdXNUYWdzIiwib3V0ZXJIVE1MIiwiaW5pdCIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJXZWJLaXRNdXRhdGlvbk9ic2VydmVyIiwiTW96TXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmVyIiwib2JzZXJ2ZSIsInN1YnRyZWUiLCJjaGlsZExpc3QiLCJhdHRyaWJ1dGVzIiwibG9nIiwiZXJyb3IiLCJkZWZhdWx0SGFuZGxlcnMiLCJjbGlja0hhbmRsZXIiLCJwYWdlUmVzaXplSGFuZGxlciIsInBhZ2VTY3JvbGxpbmdIYW5kbGVyIiwicGF0aENoYW5nZUhhbmRsZXIiLCJjYWxjSWRlbnRpZmljYXRvciIsInJlcyIsInJlaiIsInJlc3VsdCIsImluaXRpYWxVc2VyRGF0YSIsInRleHQiLCJvcyIsImJyb3dzZXJOYW1lIiwiZGV2aWNlVHlwZSIsImlwQWRkcmVzcyIsInJlZmVycmVyVXJsIiwicmVmZXJyZXIiLCJzZXNzaW9uIiwicGFyc2UiLCJnZXRJdGVtIiwiT05FX01JTlVURV9NUyIsInVwZGF0ZWRPbiIsInNldFNlc3Npb24iLCJzZXRJdGVtIiwiV0FWRUxPT1BfU0VTU0lPTl9JRCIsInNldEludGVydmFsIiwidHJhY2tlck11dGF0aW9uT2JzZXJ2ZXIiLCJ3YXZlbG9vcCIsInBhcmFtcyIsInBpZCIsInJlcXVlc3RJZGxlQ2FsbGJhY2siLCJ0cmFja2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQTtFQUNBOztFQUVBLENBQUUsVUFBVUEsQ0FBQyxFQUFFQyxDQUFDLEVBQUVDLENBQUMsRUFBRTtJQUNuQixPQUFPQyxNQUFNLEtBQUssV0FBVyxJQUFJLE9BQU9DLE1BQU0sS0FBSyxVQUFVLElBQUlBLE1BQU0sQ0FBQ0MsR0FBRyxHQUFHRCxNQUFNLENBQUNGLENBQUMsQ0FBQyxHQUFHLE9BQU9JLE1BQU0sS0FBSyxXQUFXLElBQUlBLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHRCxNQUFNLENBQUNDLE9BQU8sR0FBR0wsQ0FBQyxFQUFFLEdBQUdELENBQUMsQ0FBQ00sT0FBTyxHQUFHTixDQUFDLENBQUNNLE9BQU8sR0FBR0wsQ0FBQyxFQUFFLEdBQUdELENBQUMsQ0FBQ08sWUFBWSxHQUFHTixDQUFDLEVBQUUsQ0FBQTtFQUN2TixDQUFDLENBQUMsQ0FBQyxFQUFFTyxNQUFJLEVBQUUsWUFBTTtJQUNmLElBQU1DLENBQUMsR0FBRyxTQUFKQSxDQUFDLENBQWFWLENBQUMsRUFBRUMsQ0FBQyxFQUFFO0VBQUVELElBQUFBLENBQUMsR0FBRyxDQUFDQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsR0FBRyxDQUFDQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7TUFBRSxJQUFNQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUFFLElBQUEsT0FBT0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUcsQ0FBQTtJQUFFLElBQU1TLENBQUMsR0FBRyxTQUFKQSxDQUFDLENBQWFYLENBQUMsRUFBRUMsQ0FBQyxFQUFFO0VBQUVELElBQUFBLENBQUMsR0FBRyxDQUFDQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsR0FBRyxDQUFDQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7TUFBRSxJQUFNQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUFFLElBQUEsT0FBT0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUcsQ0FBQTtJQUFFLElBQU1VLENBQUMsR0FBRyxTQUFKQSxDQUFDLENBQWFaLENBQUMsRUFBRUMsQ0FBQyxFQUFFO01BQUUsT0FBTyxDQUFDQSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUNELENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUMsQ0FBQyxHQUFHRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHQyxDQUFDLEVBQUVELENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUMsQ0FBQyxHQUFHRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHQyxDQUFDLENBQUMsSUFBSUEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlDLENBQUMsR0FBR0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBR0MsQ0FBQyxFQUFFRCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlDLENBQUMsR0FBR0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFHLENBQUE7SUFBRSxJQUFNWSxDQUFDLEdBQUcsU0FBSkEsQ0FBQyxDQUFhYixDQUFDLEVBQUVDLENBQUMsRUFBRTtNQUFFLE9BQU8sQ0FBQ0EsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUdELENBQUMsR0FBR0MsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlDLENBQUMsR0FBR0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBR0MsQ0FBQyxFQUFFRCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlDLENBQUMsQ0FBQyxHQUFHLENBQUNELENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtLQUFHLENBQUE7SUFBRSxJQUFNYSxDQUFDLEdBQUcsU0FBSkEsQ0FBQyxDQUFhZCxDQUFDLEVBQUVDLENBQUMsRUFBRTtNQUFFLE9BQU8sQ0FBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBRyxDQUFBO0VBQUUsRUFBQSxJQUFNYyxDQUFDLEdBQUcsU0FBSkEsQ0FBQyxDQUFhZixDQUFDLEVBQUU7RUFBRSxJQUFBLE9BQU9BLENBQUMsR0FBR2MsQ0FBQyxDQUFDZCxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUdXLENBQUMsQ0FBQ1gsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLEVBQUVBLENBQUMsR0FBR2MsQ0FBQyxDQUFDZCxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUdXLENBQUMsQ0FBQ1gsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsR0FBR2MsQ0FBQyxDQUFDZCxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUcsQ0FBQTtFQUFFLEVBQUEsSUFBTWdCLENBQUMsR0FBRyxTQUFBLENBQUEsQ0FBVWhCLENBQUMsRUFBRUMsQ0FBQyxFQUFFO01BQUVBLENBQUMsR0FBR0EsQ0FBQyxJQUFJLENBQUMsQ0FBQTtNQUFFLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUNGLENBQUMsR0FBR0EsQ0FBQyxJQUFJLEVBQUUsRUFBRWlCLE1BQU0sR0FBRyxFQUFFLEVBQUVDLENBQUMsR0FBR2xCLENBQUMsQ0FBQ2lCLE1BQU0sR0FBR2YsQ0FBQyxFQUFFaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFbEIsQ0FBQyxDQUFDLEVBQUVtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUVuQixDQUFDLENBQUMsRUFBRW9CLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRUwsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLEVBQUVDLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsRUFBRUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHTixDQUFDLEVBQUVNLENBQUMsSUFBSSxFQUFFLEVBQUNILENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBR3JCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRVIsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHaEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRUgsQ0FBQyxHQUFHVixDQUFDLENBQUNVLENBQUMsRUFBRUMsQ0FBQyxDQUFDLEVBQUVELENBQUMsR0FBR1QsQ0FBQyxDQUFDUyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUVBLENBQUMsR0FBR1YsQ0FBQyxDQUFDVSxDQUFDLEVBQUVFLENBQUMsQ0FBQyxFQUFFSixDQUFDLEdBQUdMLENBQUMsQ0FBQ0ssQ0FBQyxFQUFFRSxDQUFDLENBQUMsRUFBRUYsQ0FBQyxHQUFHUCxDQUFDLENBQUNPLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRUEsQ0FBQyxHQUFHVCxDQUFDLENBQUNTLENBQUMsRUFBRUMsQ0FBQyxDQUFDLEVBQUVELENBQUMsR0FBR1QsQ0FBQyxDQUFDQyxDQUFDLENBQUNRLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEVBQUVILENBQUMsR0FBR0wsQ0FBQyxDQUFDSyxDQUFDLEVBQUVPLENBQUMsQ0FBQyxFQUFFUCxDQUFDLEdBQUdKLENBQUMsQ0FBQ0ksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFQSxDQUFDLEdBQUdMLENBQUMsQ0FBQ0ssQ0FBQyxFQUFFTSxDQUFDLENBQUMsRUFBRUYsQ0FBQyxHQUFHTixDQUFDLENBQUNNLENBQUMsRUFBRUosQ0FBQyxDQUFDLEVBQUVJLENBQUMsR0FBR1IsQ0FBQyxDQUFDUSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUVBLENBQUMsR0FBR1YsQ0FBQyxDQUFDVSxDQUFDLEVBQUVELENBQUMsQ0FBQyxFQUFFQyxDQUFDLEdBQUdWLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFBO0VBQUUsSUFBQSxRQUFRQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUVMLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRWQsQ0FBQztFQUFJLE1BQUEsS0FBSyxFQUFFO1VBQUVjLENBQUMsR0FBR0YsQ0FBQyxDQUFDRSxDQUFDLEVBQUVILENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRWIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQUUsTUFBQSxLQUFLLEVBQUU7VUFBRVIsQ0FBQyxHQUFHRixDQUFDLENBQUNFLENBQUMsRUFBRUgsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFYixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFBRSxNQUFBLEtBQUssRUFBRTtVQUFFUixDQUFDLEdBQUdGLENBQUMsQ0FBQ0UsQ0FBQyxFQUFFSCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUViLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUFFLE1BQUEsS0FBSyxFQUFFO1VBQUVSLENBQUMsR0FBR0YsQ0FBQyxDQUFDRSxDQUFDLEVBQUVILENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRWIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQUUsTUFBQSxLQUFLLEVBQUU7VUFBRVIsQ0FBQyxHQUFHRixDQUFDLENBQUNFLENBQUMsRUFBRUgsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFYixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFBRSxNQUFBLEtBQUssRUFBRTtVQUFFUixDQUFDLEdBQUdGLENBQUMsQ0FBQ0UsQ0FBQyxFQUFFSCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUViLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtFQUFFLE1BQUEsS0FBSyxDQUFDO1VBQUVSLENBQUMsR0FBR0YsQ0FBQyxDQUFDRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUVoQixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFD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QUFDLENBQUMsRUFBRUUsQ0FBQyxHQUFHVCxDQUFDLENBQUNTLENBQUMsRUFBRUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsR0FBR1YsQ0FBQyxDQUFDVSxDQUFDLEVBQUVELENBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUdKLENBQUMsQ0FBQ0ksQ0FBQyxDQUFDLEVBQUVDLENBQUMsR0FBR0wsQ0FBQyxDQUFDSyxDQUFDLENBQUMsRUFBRUQsQ0FBQyxHQUFHVCxDQUFDLENBQUNTLENBQUMsRUFBRUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsR0FBR1YsQ0FBQyxDQUFDVSxDQUFDLEVBQUVELENBQUMsQ0FBQyxFQUFFLFVBQUEsQ0FBQSxNQUFBLENBQVksQ0FBQ0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRU8sUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUlDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQUEsQ0FBQSxNQUFBLENBQVksQ0FBQ1IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRU8sUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUlDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQUEsQ0FBQSxNQUFBLENBQVksQ0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRU0sUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUlDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQUEsQ0FBQSxNQUFBLENBQVksQ0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRU0sUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUlDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUcsQ0FBQTtFQUFFLEVBQUEsSUFBTTNCLENBQUMsR0FBRztFQUM3MUg0QixJQUFBQSxZQUFZLEVBQUUsSUFBSTtFQUNsQkMsSUFBQUEsS0FBSyxFQUFFO0VBQUVDLE1BQUFBLE9BQU8sRUFBRSxHQUFHO0VBQUVD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

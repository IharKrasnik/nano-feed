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
    API_URL: 'https://ship-prod-627ed08f489a970013572f5d.paralect.net',
    API_URL_DEV: 'https://ship-627ed08f489a970013572f5d.paralect.net'
  };

  var API_URL = config.API_URL_DEV ;
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
  });

  // clicks doesn't work on disabled elements.
  // https://www.w3.org/TR/2014/REC-html5-20141028/forms.html#concept-fe-disabled

  var pageResizeHandler = (function (userData) {
    window.addEventListener('resize', debounce(function () {
      return sendTrackData(userData, 'waveActions', {
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
      return sendTrackData(userData, 'waveActions', {
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
        sendTrackData(userData, 'waveActions', manyRecords);
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
          var session = JSON.parse(localStorage.getItem('wave_session'));
          var ONE_MINUTE_MS = 1 * 60 * 1000;
          if (session && session.sessionId && new Date() - new Date(session.updatedOn) < ONE_MINUTE_MS) {
            return {
              sessionId: session.sessionId
            };
          }
          return sendData('waveSessions/init', {
            visitorId: visitorId,
            domain: window.location.hostname,
            payload: payload,
            projectId: userData.projectId
          });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F2ZS5qcyIsInNvdXJjZXMiOlsiLi4vdHJhY2tlci9zcmMvbGliL2ZpbmdlcnByaW50Mi5taW4uanMiLCIuLi90cmFja2VyL3NyYy9jb25maWcuanMiLCIuLi90cmFja2VyL3NyYy9oZWxwZXJzLmpzIiwiLi4vdHJhY2tlci9zcmMvYWN0aW9ucy9jbGljay5qcyIsIi4uL3RyYWNrZXIvc3JjL2FjdGlvbnMvcGFnZVJlc2l6ZS5qcyIsIi4uL3RyYWNrZXIvc3JjL2FjdGlvbnMvcGFnZVNjcm9sbGluZy5qcyIsIi4uL3RyYWNrZXIvc3JjL2FjdGlvbnMvbW91c2VNb3ZlLmpzIiwiLi4vdHJhY2tlci9zcmMvYWN0aW9ucy9wYXRoQ2hhbmdlLmpzIiwiLi4vdHJhY2tlci9zcmMvcmVjb3Jkcy9tdXRhdGlvbi5qcyIsIi4uL3RyYWNrZXIvc3JjL3JlY29yZHMvb2JzZXJ2ZXIuanMiLCIuLi90cmFja2VyL3NyYy90cmFja2VyLmpzIiwiLi4vdHJhY2tlci9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRmluZ2VycHJpbnRqczIgLSBDb3B5cmlnaHQgKGMpIDIwMTkgVmFsZW50aW4gVmFzaWx5ZXYgKHZhbGVudGluLnZhc2lseWV2QG91dGxvb2suY29tKVxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCAoaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHApIGxpY2Vuc2UuXG5cbiEoZnVuY3Rpb24gKGUsIHQsIGEpIHtcbiAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGEpIDogdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMgPyBtb2R1bGUuZXhwb3J0cyA9IGEoKSA6IHQuZXhwb3J0cyA/IHQuZXhwb3J0cyA9IGEoKSA6IHQuRmluZ2VycHJpbnQyID0gYSgpO1xufSgwLCB0aGlzLCAoKSA9PiB7XG4gIGNvbnN0IGQgPSBmdW5jdGlvbiAoZSwgdCkgeyBlID0gW2VbMF0gPj4+IDE2LCA2NTUzNSAmIGVbMF0sIGVbMV0gPj4+IDE2LCA2NTUzNSAmIGVbMV1dLCB0ID0gW3RbMF0gPj4+IDE2LCA2NTUzNSAmIHRbMF0sIHRbMV0gPj4+IDE2LCA2NTUzNSAmIHRbMV1dOyBjb25zdCBhID0gWzAsIDAsIDAsIDBdOyByZXR1cm4gYVszXSArPSBlWzNdICsgdFszXSwgYVsyXSArPSBhWzNdID4+PiAxNiwgYVszXSAmPSA2NTUzNSwgYVsyXSArPSBlWzJdICsgdFsyXSwgYVsxXSArPSBhWzJdID4+PiAxNiwgYVsyXSAmPSA2NTUzNSwgYVsxXSArPSBlWzFdICsgdFsxXSwgYVswXSArPSBhWzFdID4+PiAxNiwgYVsxXSAmPSA2NTUzNSwgYVswXSArPSBlWzBdICsgdFswXSwgYVswXSAmPSA2NTUzNSwgW2FbMF0gPDwgMTYgfCBhWzFdLCBhWzJdIDw8IDE2IHwgYVszXV07IH07IGNvbnN0IGcgPSBmdW5jdGlvbiAoZSwgdCkgeyBlID0gW2VbMF0gPj4+IDE2LCA2NTUzNSAmIGVbMF0sIGVbMV0gPj4+IDE2LCA2NTUzNSAmIGVbMV1dLCB0ID0gW3RbMF0gPj4+IDE2LCA2NTUzNSAmIHRbMF0sIHRbMV0gPj4+IDE2LCA2NTUzNSAmIHRbMV1dOyBjb25zdCBhID0gWzAsIDAsIDAsIDBdOyByZXR1cm4gYVszXSArPSBlWzNdICogdFszXSwgYVsyXSArPSBhWzNdID4+PiAxNiwgYVszXSAmPSA2NTUzNSwgYVsyXSArPSBlWzJdICogdFszXSwgYVsxXSArPSBhWzJdID4+PiAxNiwgYVsyXSAmPSA2NTUzNSwgYVsyXSArPSBlWzNdICogdFsyXSwgYVsxXSArPSBhWzJdID4+PiAxNiwgYVsyXSAmPSA2NTUzNSwgYVsxXSArPSBlWzFdICogdFszXSwgYVswXSArPSBhWzFdID4+PiAxNiwgYVsxXSAmPSA2NTUzNSwgYVsxXSArPSBlWzJdICogdFsyXSwgYVswXSArPSBhWzFdID4+PiAxNiwgYVsxXSAmPSA2NTUzNSwgYVsxXSArPSBlWzNdICogdFsxXSwgYVswXSArPSBhWzFdID4+PiAxNiwgYVsxXSAmPSA2NTUzNSwgYVswXSArPSBlWzBdICogdFszXSArIGVbMV0gKiB0WzJdICsgZVsyXSAqIHRbMV0gKyBlWzNdICogdFswXSwgYVswXSAmPSA2NTUzNSwgW2FbMF0gPDwgMTYgfCBhWzFdLCBhWzJdIDw8IDE2IHwgYVszXV07IH07IGNvbnN0IGYgPSBmdW5jdGlvbiAoZSwgdCkgeyByZXR1cm4gKHQgJT0gNjQpID09PSAzMiA/IFtlWzFdLCBlWzBdXSA6IHQgPCAzMiA/IFtlWzBdIDw8IHQgfCBlWzFdID4+PiAzMiAtIHQsIGVbMV0gPDwgdCB8IGVbMF0gPj4+IDMyIC0gdF0gOiAodCAtPSAzMiwgW2VbMV0gPDwgdCB8IGVbMF0gPj4+IDMyIC0gdCwgZVswXSA8PCB0IHwgZVsxXSA+Pj4gMzIgLSB0XSk7IH07IGNvbnN0IGggPSBmdW5jdGlvbiAoZSwgdCkgeyByZXR1cm4gKHQgJT0gNjQpID09PSAwID8gZSA6IHQgPCAzMiA/IFtlWzBdIDw8IHQgfCBlWzFdID4+PiAzMiAtIHQsIGVbMV0gPDwgdF0gOiBbZVsxXSA8PCB0IC0gMzIsIDBdOyB9OyBjb25zdCBtID0gZnVuY3Rpb24gKGUsIHQpIHsgcmV0dXJuIFtlWzBdIF4gdFswXSwgZVsxXSBeIHRbMV1dOyB9OyBjb25zdCBUID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUgPSBtKGUsIFswLCBlWzBdID4+PiAxXSksIGUgPSBnKGUsIFs0MjgzNTQzNTExLCAzOTgxODA2Nzk3XSksIGUgPSBtKGUsIFswLCBlWzBdID4+PiAxXSksIGUgPSBnKGUsIFszMzAxODgyMzY2LCA0NDQ5ODQ0MDNdKSwgZSA9IG0oZSwgWzAsIGVbMF0gPj4+IDFdKTsgfTsgY29uc3QgbCA9IGZ1bmN0aW9uIChlLCB0KSB7IHQgPSB0IHx8IDA7IGZvciAodmFyIGEgPSAoZSA9IGUgfHwgJycpLmxlbmd0aCAlIDE2LCBuID0gZS5sZW5ndGggLSBhLCByID0gWzAsIHRdLCBpID0gWzAsIHRdLCBvID0gWzAsIDBdLCBsID0gWzAsIDBdLCBzID0gWzIyNzc3MzUzMTMsIDI4OTU1OTUwOV0sIGMgPSBbMTI5MTE2OTA5MSwgNjU4ODcxMTY3XSwgdSA9IDA7IHUgPCBuOyB1ICs9IDE2KW8gPSBbMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyA0KSB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDUpKSA8PCA4IHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgNikpIDw8IDE2IHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgNykpIDw8IDI0LCAyNTUgJiBlLmNoYXJDb2RlQXQodSkgfCAoMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyAxKSkgPDwgOCB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDIpKSA8PCAxNiB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDMpKSA8PCAyNF0sIGwgPSBbMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyAxMikgfCAoMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyAxMykpIDw8IDggfCAoMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyAxNCkpIDw8IDE2IHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgMTUpKSA8PCAyNCwgMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyA4KSB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDkpKSA8PCA4IHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgMTApKSA8PCAxNiB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDExKSkgPDwgMjRdLCBvID0gZyhvLCBzKSwgbyA9IGYobywgMzEpLCBvID0gZyhvLCBjKSwgciA9IG0ociwgbyksIHIgPSBmKHIsIDI3KSwgciA9IGQociwgaSksIHIgPSBkKGcociwgWzAsIDVdKSwgWzAsIDEzOTAyMDg4MDldKSwgbCA9IGcobCwgYyksIGwgPSBmKGwsIDMzKSwgbCA9IGcobCwgcyksIGkgPSBtKGksIGwpLCBpID0gZihpLCAzMSksIGkgPSBkKGksIHIpLCBpID0gZChnKGksIFswLCA1XSksIFswLCA5NDQzMzE0NDVdKTsgc3dpdGNoIChvID0gWzAsIDBdLCBsID0gWzAsIDBdLCBhKSB7IGNhc2UgMTU6IGwgPSBtKGwsIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgMTQpXSwgNDgpKTsgY2FzZSAxNDogbCA9IG0obCwgaChbMCwgZS5jaGFyQ29kZUF0KHUgKyAxMyldLCA0MCkpOyBjYXNlIDEzOiBsID0gbShsLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDEyKV0sIDMyKSk7IGNhc2UgMTI6IGwgPSBtKGwsIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgMTEpXSwgMjQpKTsgY2FzZSAxMTogbCA9IG0obCwgaChbMCwgZS5jaGFyQ29kZUF0KHUgKyAxMCldLCAxNikpOyBjYXNlIDEwOiBsID0gbShsLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDkpXSwgOCkpOyBjYXNlIDk6IGwgPSBtKGwsIFswLCBlLmNoYXJDb2RlQXQodSArIDgpXSksIGwgPSBnKGwsIGMpLCBsID0gZihsLCAzMyksIGwgPSBnKGwsIHMpLCBpID0gbShpLCBsKTsgY2FzZSA4OiBvID0gbShvLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDcpXSwgNTYpKTsgY2FzZSA3OiBvID0gbShvLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDYpXSwgNDgpKTsgY2FzZSA2OiBvID0gbShvLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDUpXSwgNDApKTsgY2FzZSA1OiBvID0gbShvLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDQpXSwgMzIpKTsgY2FzZSA0OiBvID0gbShvLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDMpXSwgMjQpKTsgY2FzZSAzOiBvID0gbShvLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDIpXSwgMTYpKTsgY2FzZSAyOiBvID0gbShvLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDEpXSwgOCkpOyBjYXNlIDE6IG8gPSBtKG8sIFswLCBlLmNoYXJDb2RlQXQodSldKSwgbyA9IGcobywgcyksIG8gPSBmKG8sIDMxKSwgbyA9IGcobywgYyksIHIgPSBtKHIsIG8pOyB9IHJldHVybiByID0gbShyLCBbMCwgZS5sZW5ndGhdKSwgaSA9IG0oaSwgWzAsIGUubGVuZ3RoXSksIHIgPSBkKHIsIGkpLCBpID0gZChpLCByKSwgciA9IFQociksIGkgPSBUKGkpLCByID0gZChyLCBpKSwgaSA9IGQoaSwgciksIChgMDAwMDAwMDAkeyhyWzBdID4+PiAwKS50b1N0cmluZygxNil9YCkuc2xpY2UoLTgpICsgKGAwMDAwMDAwMCR7KHJbMV0gPj4+IDApLnRvU3RyaW5nKDE2KX1gKS5zbGljZSgtOCkgKyAoYDAwMDAwMDAwJHsoaVswXSA+Pj4gMCkudG9TdHJpbmcoMTYpfWApLnNsaWNlKC04KSArIChgMDAwMDAwMDAkeyhpWzFdID4+PiAwKS50b1N0cmluZygxNil9YCkuc2xpY2UoLTgpOyB9OyBjb25zdCBlID0ge1xuICAgIHByZXByb2Nlc3NvcjogbnVsbCxcbiAgICBhdWRpbzogeyB0aW1lb3V0OiAxZTMsIGV4Y2x1ZGVJT1MxMTogITAgfSxcbiAgICBmb250czoge1xuICAgICAgc3dmQ29udGFpbmVySWQ6ICdmaW5nZXJwcmludGpzMicsIHN3ZlBhdGg6ICdmbGFzaC9jb21waWxlZC9Gb250TGlzdC5zd2YnLCB1c2VyRGVmaW5lZEZvbnRzOiBbXSwgZXh0ZW5kZWRKc0ZvbnRzOiAhMSxcbiAgICB9LFxuICAgIHNjcmVlbjogeyBkZXRlY3RTY3JlZW5PcmllbnRhdGlvbjogITAgfSxcbiAgICBwbHVnaW5zOiB7IHNvcnRQbHVnaW5zRm9yOiBbL3BhbGVtb29uL2ldLCBleGNsdWRlSUU6ICExIH0sXG4gICAgZXh0cmFDb21wb25lbnRzOiBbXSxcbiAgICBleGNsdWRlczoge1xuICAgICAgZW51bWVyYXRlRGV2aWNlczogITAsIHBpeGVsUmF0aW86ICEwLCBkb05vdFRyYWNrOiAhMCwgZm9udHNGbGFzaDogITAsXG4gICAgfSxcbiAgICBOT1RfQVZBSUxBQkxFOiAnbm90IGF2YWlsYWJsZScsXG4gICAgRVJST1I6ICdlcnJvcicsXG4gICAgRVhDTFVERUQ6ICdleGNsdWRlZCcsXG4gIH07IGNvbnN0IGMgPSBmdW5jdGlvbiAoZSwgdCkgeyBpZiAoQXJyYXkucHJvdG90eXBlLmZvckVhY2ggJiYgZS5mb3JFYWNoID09PSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCllLmZvckVhY2godCk7IGVsc2UgaWYgKGUubGVuZ3RoID09PSArZS5sZW5ndGgpIGZvciAobGV0IGEgPSAwLCBuID0gZS5sZW5ndGg7IGEgPCBuOyBhKyspdChlW2FdLCBhLCBlKTsgZWxzZSBmb3IgKGNvbnN0IHIgaW4gZSllLmhhc093blByb3BlcnR5KHIpICYmIHQoZVtyXSwgciwgZSk7IH07IGNvbnN0IHMgPSBmdW5jdGlvbiAoZSwgbikgeyBjb25zdCByID0gW107IHJldHVybiBlID09IG51bGwgPyByIDogQXJyYXkucHJvdG90eXBlLm1hcCAmJiBlLm1hcCA9PT0gQXJyYXkucHJvdG90eXBlLm1hcCA/IGUubWFwKG4pIDogKGMoZSwgKGUsIHQsIGEpID0+IHsgci5wdXNoKG4oZSwgdCwgYSkpOyB9KSwgcik7IH07IGNvbnN0IGEgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzICYmIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlczsgfTsgY29uc3QgbiA9IGZ1bmN0aW9uIChlKSB7IGNvbnN0IHQgPSBbd2luZG93LnNjcmVlbi53aWR0aCwgd2luZG93LnNjcmVlbi5oZWlnaHRdOyByZXR1cm4gZS5zY3JlZW4uZGV0ZWN0U2NyZWVuT3JpZW50YXRpb24gJiYgdC5zb3J0KCkucmV2ZXJzZSgpLCB0OyB9OyBjb25zdCByID0gZnVuY3Rpb24gKGUpIHsgaWYgKHdpbmRvdy5zY3JlZW4uYXZhaWxXaWR0aCAmJiB3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0KSB7IGNvbnN0IHQgPSBbd2luZG93LnNjcmVlbi5hdmFpbEhlaWdodCwgd2luZG93LnNjcmVlbi5hdmFpbFdpZHRoXTsgcmV0dXJuIGUuc2NyZWVuLmRldGVjdFNjcmVlbk9yaWVudGF0aW9uICYmIHQuc29ydCgpLnJldmVyc2UoKSwgdDsgfSByZXR1cm4gZS5OT1RfQVZBSUxBQkxFOyB9OyBjb25zdCBpID0gZnVuY3Rpb24gKGUpIHsgaWYgKG5hdmlnYXRvci5wbHVnaW5zID09IG51bGwpIHJldHVybiBlLk5PVF9BVkFJTEFCTEU7IGZvciAodmFyIHQgPSBbXSwgYSA9IDAsIG4gPSBuYXZpZ2F0b3IucGx1Z2lucy5sZW5ndGg7IGEgPCBuOyBhKyspbmF2aWdhdG9yLnBsdWdpbnNbYV0gJiYgdC5wdXNoKG5hdmlnYXRvci5wbHVnaW5zW2FdKTsgcmV0dXJuIHUoZSkgJiYgKHQgPSB0LnNvcnQoKGUsIHQpID0+IHsgcmV0dXJuIGUubmFtZSA+IHQubmFtZSA/IDEgOiBlLm5hbWUgPCB0Lm5hbWUgPyAtMSA6IDA7IH0pKSwgcyh0LCAoZSkgPT4geyBjb25zdCB0ID0gcyhlLCAoZSkgPT4geyByZXR1cm4gW2UudHlwZSwgZS5zdWZmaXhlc107IH0pOyByZXR1cm4gW2UubmFtZSwgZS5kZXNjcmlwdGlvbiwgdF07IH0pOyB9OyBjb25zdCBvID0gZnVuY3Rpb24gKHQpIHsgbGV0IGUgPSBbXTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih3aW5kb3csICdBY3RpdmVYT2JqZWN0JykgfHwgJ0FjdGl2ZVhPYmplY3QnIGluIHdpbmRvdykgeyBlID0gcyhbJ0Fjcm9QREYuUERGJywgJ0Fkb2RiLlN0cmVhbScsICdBZ0NvbnRyb2wuQWdDb250cm9sJywgJ0RldmFsVlJYQ3RybC5EZXZhbFZSWEN0cmwuMScsICdNYWNyb21lZGlhRmxhc2hQYXBlci5NYWNyb21lZGlhRmxhc2hQYXBlcicsICdNc3htbDIuRE9NRG9jdW1lbnQnLCAnTXN4bWwyLlhNTEhUVFAnLCAnUERGLlBkZkN0cmwnLCAnUXVpY2tUaW1lLlF1aWNrVGltZScsICdRdWlja1RpbWVDaGVja09iamVjdC5RdWlja1RpbWVDaGVjay4xJywgJ1JlYWxQbGF5ZXInLCAnUmVhbFBsYXllci5SZWFsUGxheWVyKHRtKSBBY3RpdmVYIENvbnRyb2wgKDMyLWJpdCknLCAnUmVhbFZpZGVvLlJlYWxWaWRlbyh0bSkgQWN0aXZlWCBDb250cm9sICgzMi1iaXQpJywgJ1NjcmlwdGluZy5EaWN0aW9uYXJ5JywgJ1NXQ3RsLlNXQ3RsJywgJ1NoZWxsLlVJSGVscGVyJywgJ1Nob2Nrd2F2ZUZsYXNoLlNob2Nrd2F2ZUZsYXNoJywgJ1NreXBlLkRldGVjdGlvbicsICdURENDdGwuVERDQ3RsJywgJ1dNUGxheWVyLk9DWCcsICdybW9jeC5SZWFsUGxheWVyIEcyIENvbnRyb2wnLCAncm1vY3guUmVhbFBsYXllciBHMiBDb250cm9sLjEnXSwgKGUpID0+IHsgdHJ5IHsgcmV0dXJuIG5ldyB3aW5kb3cuQWN0aXZlWE9iamVjdChlKSwgZTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gdC5FUlJPUjsgfSB9KTsgfSBlbHNlIGUucHVzaCh0Lk5PVF9BVkFJTEFCTEUpOyByZXR1cm4gbmF2aWdhdG9yLnBsdWdpbnMgJiYgKGUgPSBlLmNvbmNhdChpKHQpKSksIGU7IH07IHZhciB1ID0gZnVuY3Rpb24gKGUpIHsgZm9yICh2YXIgdCA9ICExLCBhID0gMCwgbiA9IGUucGx1Z2lucy5zb3J0UGx1Z2luc0Zvci5sZW5ndGg7IGEgPCBuOyBhKyspIHsgY29uc3QgciA9IGUucGx1Z2lucy5zb3J0UGx1Z2luc0ZvclthXTsgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2gocikpIHsgdCA9ICEwOyBicmVhazsgfSB9IHJldHVybiB0OyB9OyBjb25zdCBwID0gZnVuY3Rpb24gKHQpIHsgdHJ5IHsgcmV0dXJuICEhd2luZG93LnNlc3Npb25TdG9yYWdlOyB9IGNhdGNoIChlKSB7IHJldHVybiB0LkVSUk9SOyB9IH07IGNvbnN0IHYgPSBmdW5jdGlvbiAodCkgeyB0cnkgeyByZXR1cm4gISF3aW5kb3cubG9jYWxTdG9yYWdlOyB9IGNhdGNoIChlKSB7IHJldHVybiB0LkVSUk9SOyB9IH07IGNvbnN0IEEgPSBmdW5jdGlvbiAodCkgeyB0cnkgeyByZXR1cm4gISF3aW5kb3cuaW5kZXhlZERCOyB9IGNhdGNoIChlKSB7IHJldHVybiB0LkVSUk9SOyB9IH07IGNvbnN0IFMgPSBmdW5jdGlvbiAoZSkgeyByZXR1cm4gbmF2aWdhdG9yLmhhcmR3YXJlQ29uY3VycmVuY3kgPyBuYXZpZ2F0b3IuaGFyZHdhcmVDb25jdXJyZW5jeSA6IGUuTk9UX0FWQUlMQUJMRTsgfTsgY29uc3QgQyA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBuYXZpZ2F0b3IuY3B1Q2xhc3MgfHwgZS5OT1RfQVZBSUxBQkxFOyB9OyBjb25zdCBCID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIG5hdmlnYXRvci5wbGF0Zm9ybSA/IG5hdmlnYXRvci5wbGF0Zm9ybSA6IGUuTk9UX0FWQUlMQUJMRTsgfTsgY29uc3QgdyA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBuYXZpZ2F0b3IuZG9Ob3RUcmFjayA/IG5hdmlnYXRvci5kb05vdFRyYWNrIDogbmF2aWdhdG9yLm1zRG9Ob3RUcmFjayA/IG5hdmlnYXRvci5tc0RvTm90VHJhY2sgOiB3aW5kb3cuZG9Ob3RUcmFjayA/IHdpbmRvdy5kb05vdFRyYWNrIDogZS5OT1RfQVZBSUxBQkxFOyB9OyBjb25zdCB0ID0gZnVuY3Rpb24gKCkgeyBsZXQgdDsgbGV0IGUgPSAwOyB2b2lkIDAgIT09IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA/IGUgPSBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgOiB2b2lkIDAgIT09IG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzICYmIChlID0gbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMpOyB0cnkgeyBkb2N1bWVudC5jcmVhdGVFdmVudCgnVG91Y2hFdmVudCcpLCB0ID0gITA7IH0gY2F0Y2ggKGUpIHsgdCA9ICExOyB9IHJldHVybiBbZSwgdCwgJ29udG91Y2hzdGFydCcgaW4gd2luZG93XTsgfTsgY29uc3QgeSA9IGZ1bmN0aW9uIChlKSB7IGNvbnN0IHQgPSBbXTsgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOyBhLndpZHRoID0gMmUzLCBhLmhlaWdodCA9IDIwMCwgYS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7IGNvbnN0IG4gPSBhLmdldENvbnRleHQoJzJkJyk7IHJldHVybiBuLnJlY3QoMCwgMCwgMTAsIDEwKSwgbi5yZWN0KDIsIDIsIDYsIDYpLCB0LnB1c2goYGNhbnZhcyB3aW5kaW5nOiR7ITEgPT09IG4uaXNQb2ludEluUGF0aCg1LCA1LCAnZXZlbm9kZCcpID8gJ3llcycgOiAnbm8nfWApLCBuLnRleHRCYXNlbGluZSA9ICdhbHBoYWJldGljJywgbi5maWxsU3R5bGUgPSAnI2Y2MCcsIG4uZmlsbFJlY3QoMTI1LCAxLCA2MiwgMjApLCBuLmZpbGxTdHlsZSA9ICcjMDY5JywgZS5kb250VXNlRmFrZUZvbnRJbkNhbnZhcyA/IG4uZm9udCA9ICcxMXB0IEFyaWFsJyA6IG4uZm9udCA9ICcxMXB0IG5vLXJlYWwtZm9udC0xMjMnLCBuLmZpbGxUZXh0KCdDd20gZmpvcmRiYW5rIGdseXBocyB2ZXh0IHF1aXosIFxcdWQ4M2RcXHVkZTAzJywgMiwgMTUpLCBuLmZpbGxTdHlsZSA9ICdyZ2JhKDEwMiwgMjA0LCAwLCAwLjIpJywgbi5mb250ID0gJzE4cHQgQXJpYWwnLCBuLmZpbGxUZXh0KCdDd20gZmpvcmRiYW5rIGdseXBocyB2ZXh0IHF1aXosIFxcdWQ4M2RcXHVkZTAzJywgNCwgNDUpLCBuLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdtdWx0aXBseScsIG4uZmlsbFN0eWxlID0gJ3JnYigyNTUsMCwyNTUpJywgbi5iZWdpblBhdGgoKSwgbi5hcmMoNTAsIDUwLCA1MCwgMCwgMiAqIE1hdGguUEksICEwKSwgbi5jbG9zZVBhdGgoKSwgbi5maWxsKCksIG4uZmlsbFN0eWxlID0gJ3JnYigwLDI1NSwyNTUpJywgbi5iZWdpblBhdGgoKSwgbi5hcmMoMTAwLCA1MCwgNTAsIDAsIDIgKiBNYXRoLlBJLCAhMCksIG4uY2xvc2VQYXRoKCksIG4uZmlsbCgpLCBuLmZpbGxTdHlsZSA9ICdyZ2IoMjU1LDI1NSwwKScsIG4uYmVnaW5QYXRoKCksIG4uYXJjKDc1LCAxMDAsIDUwLCAwLCAyICogTWF0aC5QSSwgITApLCBuLmNsb3NlUGF0aCgpLCBuLmZpbGwoKSwgbi5maWxsU3R5bGUgPSAncmdiKDI1NSwwLDI1NSknLCBuLmFyYyg3NSwgNzUsIDc1LCAwLCAyICogTWF0aC5QSSwgITApLCBuLmFyYyg3NSwgNzUsIDI1LCAwLCAyICogTWF0aC5QSSwgITApLCBuLmZpbGwoJ2V2ZW5vZGQnKSwgYS50b0RhdGFVUkwgJiYgdC5wdXNoKGBjYW52YXMgZnA6JHthLnRvRGF0YVVSTCgpfWApLCB0OyB9OyBjb25zdCBFID0gZnVuY3Rpb24gKCkgeyBsZXQgbzsgY29uc3QgZSA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBvLmNsZWFyQ29sb3IoMCwgMCwgMCwgMSksIG8uZW5hYmxlKG8uREVQVEhfVEVTVCksIG8uZGVwdGhGdW5jKG8uTEVRVUFMKSwgby5jbGVhcihvLkNPTE9SX0JVRkZFUl9CSVQgfCBvLkRFUFRIX0JVRkZFUl9CSVQpLCBgWyR7ZVswXX0sICR7ZVsxXX1dYDsgfTsgaWYgKCEobyA9IEYoKSkpIHJldHVybiBudWxsOyBjb25zdCBsID0gW107IGNvbnN0IHQgPSBvLmNyZWF0ZUJ1ZmZlcigpOyBvLmJpbmRCdWZmZXIoby5BUlJBWV9CVUZGRVIsIHQpOyBjb25zdCBhID0gbmV3IEZsb2F0MzJBcnJheShbLTAuMiwgLTAuOSwgMCwgMC40LCAtMC4yNiwgMCwgMCwgMC43MzIxMzQ0NDQsIDBdKTsgby5idWZmZXJEYXRhKG8uQVJSQVlfQlVGRkVSLCBhLCBvLlNUQVRJQ19EUkFXKSwgdC5pdGVtU2l6ZSA9IDMsIHQubnVtSXRlbXMgPSAzOyBjb25zdCBuID0gby5jcmVhdGVQcm9ncmFtKCk7IGNvbnN0IHIgPSBvLmNyZWF0ZVNoYWRlcihvLlZFUlRFWF9TSEFERVIpOyBvLnNoYWRlclNvdXJjZShyLCAnYXR0cmlidXRlIHZlYzIgYXR0clZlcnRleDt2YXJ5aW5nIHZlYzIgdmFyeWluVGV4Q29vcmRpbmF0ZTt1bmlmb3JtIHZlYzIgdW5pZm9ybU9mZnNldDt2b2lkIG1haW4oKXt2YXJ5aW5UZXhDb29yZGluYXRlPWF0dHJWZXJ0ZXgrdW5pZm9ybU9mZnNldDtnbF9Qb3NpdGlvbj12ZWM0KGF0dHJWZXJ0ZXgsMCwxKTt9JyksIG8uY29tcGlsZVNoYWRlcihyKTsgY29uc3QgaSA9IG8uY3JlYXRlU2hhZGVyKG8uRlJBR01FTlRfU0hBREVSKTsgby5zaGFkZXJTb3VyY2UoaSwgJ3ByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O3ZhcnlpbmcgdmVjMiB2YXJ5aW5UZXhDb29yZGluYXRlO3ZvaWQgbWFpbigpIHtnbF9GcmFnQ29sb3I9dmVjNCh2YXJ5aW5UZXhDb29yZGluYXRlLDAsMSk7fScpLCBvLmNvbXBpbGVTaGFkZXIoaSksIG8uYXR0YWNoU2hhZGVyKG4sIHIpLCBvLmF0dGFjaFNoYWRlcihuLCBpKSwgby5saW5rUHJvZ3JhbShuKSwgby51c2VQcm9ncmFtKG4pLCBuLnZlcnRleFBvc0F0dHJpYiA9IG8uZ2V0QXR0cmliTG9jYXRpb24obiwgJ2F0dHJWZXJ0ZXgnKSwgbi5vZmZzZXRVbmlmb3JtID0gby5nZXRVbmlmb3JtTG9jYXRpb24obiwgJ3VuaWZvcm1PZmZzZXQnKSwgby5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShuLnZlcnRleFBvc0FycmF5KSwgby52ZXJ0ZXhBdHRyaWJQb2ludGVyKG4udmVydGV4UG9zQXR0cmliLCB0Lml0ZW1TaXplLCBvLkZMT0FULCAhMSwgMCwgMCksIG8udW5pZm9ybTJmKG4ub2Zmc2V0VW5pZm9ybSwgMSwgMSksIG8uZHJhd0FycmF5cyhvLlRSSUFOR0xFX1NUUklQLCAwLCB0Lm51bUl0ZW1zKTsgdHJ5IHsgbC5wdXNoKG8uY2FudmFzLnRvRGF0YVVSTCgpKTsgfSBjYXRjaCAoZSkge31sLnB1c2goYGV4dGVuc2lvbnM6JHsoby5nZXRTdXBwb3J0ZWRFeHRlbnNpb25zKCkgfHwgW10pLmpvaW4oJzsnKX1gKSwgbC5wdXNoKGB3ZWJnbCBhbGlhc2VkIGxpbmUgd2lkdGggcmFuZ2U6JHtlKG8uZ2V0UGFyYW1ldGVyKG8uQUxJQVNFRF9MSU5FX1dJRFRIX1JBTkdFKSl9YCksIGwucHVzaChgd2ViZ2wgYWxpYXNlZCBwb2ludCBzaXplIHJhbmdlOiR7ZShvLmdldFBhcmFtZXRlcihvLkFMSUFTRURfUE9JTlRfU0laRV9SQU5HRSkpfWApLCBsLnB1c2goYHdlYmdsIGFscGhhIGJpdHM6JHtvLmdldFBhcmFtZXRlcihvLkFMUEhBX0JJVFMpfWApLCBsLnB1c2goYHdlYmdsIGFudGlhbGlhc2luZzoke28uZ2V0Q29udGV4dEF0dHJpYnV0ZXMoKS5hbnRpYWxpYXMgPyAneWVzJyA6ICdubyd9YCksIGwucHVzaChgd2ViZ2wgYmx1ZSBiaXRzOiR7by5nZXRQYXJhbWV0ZXIoby5CTFVFX0JJVFMpfWApLCBsLnB1c2goYHdlYmdsIGRlcHRoIGJpdHM6JHtvLmdldFBhcmFtZXRlcihvLkRFUFRIX0JJVFMpfWApLCBsLnB1c2goYHdlYmdsIGdyZWVuIGJpdHM6JHtvLmdldFBhcmFtZXRlcihvLkdSRUVOX0JJVFMpfWApLCBsLnB1c2goYHdlYmdsIG1heCBhbmlzb3Ryb3B5OiR7KGZ1bmN0aW9uIChlKSB7IGNvbnN0IHQgPSBlLmdldEV4dGVuc2lvbignRVhUX3RleHR1cmVfZmlsdGVyX2FuaXNvdHJvcGljJykgfHwgZS5nZXRFeHRlbnNpb24oJ1dFQktJVF9FWFRfdGV4dHVyZV9maWx0ZXJfYW5pc290cm9waWMnKSB8fCBlLmdldEV4dGVuc2lvbignTU9aX0VYVF90ZXh0dXJlX2ZpbHRlcl9hbmlzb3Ryb3BpYycpOyBpZiAodCkgeyBsZXQgYSA9IGUuZ2V0UGFyYW1ldGVyKHQuTUFYX1RFWFRVUkVfTUFYX0FOSVNPVFJPUFlfRVhUKTsgcmV0dXJuIGEgPT09IDAgJiYgKGEgPSAyKSwgYTsgfSByZXR1cm4gbnVsbDsgfShvKSl9YCksIGwucHVzaChgd2ViZ2wgbWF4IGNvbWJpbmVkIHRleHR1cmUgaW1hZ2UgdW5pdHM6JHtvLmdldFBhcmFtZXRlcihvLk1BWF9DT01CSU5FRF9URVhUVVJFX0lNQUdFX1VOSVRTKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggY3ViZSBtYXAgdGV4dHVyZSBzaXplOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfQ1VCRV9NQVBfVEVYVFVSRV9TSVpFKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggZnJhZ21lbnQgdW5pZm9ybSB2ZWN0b3JzOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfRlJBR01FTlRfVU5JRk9STV9WRUNUT1JTKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggcmVuZGVyIGJ1ZmZlciBzaXplOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfUkVOREVSQlVGRkVSX1NJWkUpfWApLCBsLnB1c2goYHdlYmdsIG1heCB0ZXh0dXJlIGltYWdlIHVuaXRzOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfVEVYVFVSRV9JTUFHRV9VTklUUyl9YCksIGwucHVzaChgd2ViZ2wgbWF4IHRleHR1cmUgc2l6ZToke28uZ2V0UGFyYW1ldGVyKG8uTUFYX1RFWFRVUkVfU0laRSl9YCksIGwucHVzaChgd2ViZ2wgbWF4IHZhcnlpbmcgdmVjdG9yczoke28uZ2V0UGFyYW1ldGVyKG8uTUFYX1ZBUllJTkdfVkVDVE9SUyl9YCksIGwucHVzaChgd2ViZ2wgbWF4IHZlcnRleCBhdHRyaWJzOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfVkVSVEVYX0FUVFJJQlMpfWApLCBsLnB1c2goYHdlYmdsIG1heCB2ZXJ0ZXggdGV4dHVyZSBpbWFnZSB1bml0czoke28uZ2V0UGFyYW1ldGVyKG8uTUFYX1ZFUlRFWF9URVhUVVJFX0lNQUdFX1VOSVRTKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggdmVydGV4IHVuaWZvcm0gdmVjdG9yczoke28uZ2V0UGFyYW1ldGVyKG8uTUFYX1ZFUlRFWF9VTklGT1JNX1ZFQ1RPUlMpfWApLCBsLnB1c2goYHdlYmdsIG1heCB2aWV3cG9ydCBkaW1zOiR7ZShvLmdldFBhcmFtZXRlcihvLk1BWF9WSUVXUE9SVF9ESU1TKSl9YCksIGwucHVzaChgd2ViZ2wgcmVkIGJpdHM6JHtvLmdldFBhcmFtZXRlcihvLlJFRF9CSVRTKX1gKSwgbC5wdXNoKGB3ZWJnbCByZW5kZXJlcjoke28uZ2V0UGFyYW1ldGVyKG8uUkVOREVSRVIpfWApLCBsLnB1c2goYHdlYmdsIHNoYWRpbmcgbGFuZ3VhZ2UgdmVyc2lvbjoke28uZ2V0UGFyYW1ldGVyKG8uU0hBRElOR19MQU5HVUFHRV9WRVJTSU9OKX1gKSwgbC5wdXNoKGB3ZWJnbCBzdGVuY2lsIGJpdHM6JHtvLmdldFBhcmFtZXRlcihvLlNURU5DSUxfQklUUyl9YCksIGwucHVzaChgd2ViZ2wgdmVuZG9yOiR7by5nZXRQYXJhbWV0ZXIoby5WRU5ET1IpfWApLCBsLnB1c2goYHdlYmdsIHZlcnNpb246JHtvLmdldFBhcmFtZXRlcihvLlZFUlNJT04pfWApOyB0cnkgeyBjb25zdCBzID0gby5nZXRFeHRlbnNpb24oJ1dFQkdMX2RlYnVnX3JlbmRlcmVyX2luZm8nKTsgcyAmJiAobC5wdXNoKGB3ZWJnbCB1bm1hc2tlZCB2ZW5kb3I6JHtvLmdldFBhcmFtZXRlcihzLlVOTUFTS0VEX1ZFTkRPUl9XRUJHTCl9YCksIGwucHVzaChgd2ViZ2wgdW5tYXNrZWQgcmVuZGVyZXI6JHtvLmdldFBhcmFtZXRlcihzLlVOTUFTS0VEX1JFTkRFUkVSX1dFQkdMKX1gKSk7IH0gY2F0Y2ggKGUpIHt9IHJldHVybiBvLmdldFNoYWRlclByZWNpc2lvbkZvcm1hdCAmJiBjKFsnRkxPQVQnLCAnSU5UJ10sIChpKSA9PiB7IGMoWydWRVJURVgnLCAnRlJBR01FTlQnXSwgKHIpID0+IHsgYyhbJ0hJR0gnLCAnTUVESVVNJywgJ0xPVyddLCAobikgPT4geyBjKFsncHJlY2lzaW9uJywgJ3JhbmdlTWluJywgJ3JhbmdlTWF4J10sIChlKSA9PiB7IGNvbnN0IHQgPSBvLmdldFNoYWRlclByZWNpc2lvbkZvcm1hdChvW2Ake3J9X1NIQURFUmBdLCBvW2Ake259XyR7aX1gXSlbZV07IGUgIT09ICdwcmVjaXNpb24nICYmIChlID0gYHByZWNpc2lvbiAke2V9YCk7IGNvbnN0IGEgPSBbJ3dlYmdsICcsIHIudG9Mb3dlckNhc2UoKSwgJyBzaGFkZXIgJywgbi50b0xvd2VyQ2FzZSgpLCAnICcsIGkudG9Mb3dlckNhc2UoKSwgJyAnLCBlLCAnOicsIHRdLmpvaW4oJycpOyBsLnB1c2goYSk7IH0pOyB9KTsgfSk7IH0pLCBsOyB9OyBjb25zdCBNID0gZnVuY3Rpb24gKCkgeyB0cnkgeyBjb25zdCBlID0gRigpOyBjb25zdCB0ID0gZS5nZXRFeHRlbnNpb24oJ1dFQkdMX2RlYnVnX3JlbmRlcmVyX2luZm8nKTsgcmV0dXJuIGAke2UuZ2V0UGFyYW1ldGVyKHQuVU5NQVNLRURfVkVORE9SX1dFQkdMKX1+JHtlLmdldFBhcmFtZXRlcih0LlVOTUFTS0VEX1JFTkRFUkVSX1dFQkdMKX1gOyB9IGNhdGNoIChlKSB7IHJldHVybiBudWxsOyB9IH07IGNvbnN0IHggPSBmdW5jdGlvbiAoKSB7IGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgZS5pbm5lckhUTUwgPSAnJm5ic3A7JzsgbGV0IHQgPSAhKGUuY2xhc3NOYW1lID0gJ2Fkc2JveCcpOyB0cnkgeyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGUpLCB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRzYm94JylbMF0ub2Zmc2V0SGVpZ2h0ID09PSAwLCBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGUpOyB9IGNhdGNoIChlKSB7IHQgPSAhMTsgfSByZXR1cm4gdDsgfTsgY29uc3QgTyA9IGZ1bmN0aW9uICgpIHsgaWYgKHZvaWQgMCAhPT0gbmF2aWdhdG9yLmxhbmd1YWdlcykgdHJ5IHsgaWYgKG5hdmlnYXRvci5sYW5ndWFnZXNbMF0uc3Vic3RyKDAsIDIpICE9PSBuYXZpZ2F0b3IubGFuZ3VhZ2Uuc3Vic3RyKDAsIDIpKSByZXR1cm4gITA7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuICEwOyB9IHJldHVybiAhMTsgfTsgY29uc3QgYiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvdy5zY3JlZW4ud2lkdGggPCB3aW5kb3cuc2NyZWVuLmF2YWlsV2lkdGggfHwgd2luZG93LnNjcmVlbi5oZWlnaHQgPCB3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0OyB9OyBjb25zdCBQID0gZnVuY3Rpb24gKCkgeyBsZXQgZTsgY29uc3QgdCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTsgbGV0IGEgPSBuYXZpZ2F0b3Iub3NjcHU7IGNvbnN0IG4gPSBuYXZpZ2F0b3IucGxhdGZvcm0udG9Mb3dlckNhc2UoKTsgaWYgKGUgPSB0LmluZGV4T2YoJ3dpbmRvd3MgcGhvbmUnKSA+PSAwID8gJ1dpbmRvd3MgUGhvbmUnIDogdC5pbmRleE9mKCd3aW4nKSA+PSAwID8gJ1dpbmRvd3MnIDogdC5pbmRleE9mKCdhbmRyb2lkJykgPj0gMCA/ICdBbmRyb2lkJyA6IHQuaW5kZXhPZignbGludXgnKSA+PSAwIHx8IHQuaW5kZXhPZignY3JvcycpID49IDAgPyAnTGludXgnIDogdC5pbmRleE9mKCdpcGhvbmUnKSA+PSAwIHx8IHQuaW5kZXhPZignaXBhZCcpID49IDAgPyAnaU9TJyA6IHQuaW5kZXhPZignbWFjJykgPj0gMCA/ICdNYWMnIDogJ090aGVyJywgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwIHx8IG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzID4gMCkgJiYgZSAhPT0gJ1dpbmRvd3MgUGhvbmUnICYmIGUgIT09ICdBbmRyb2lkJyAmJiBlICE9PSAnaU9TJyAmJiBlICE9PSAnT3RoZXInKSByZXR1cm4gITA7IGlmICh2b2lkIDAgIT09IGEpIHsgaWYgKChhID0gYS50b0xvd2VyQ2FzZSgpKS5pbmRleE9mKCd3aW4nKSA+PSAwICYmIGUgIT09ICdXaW5kb3dzJyAmJiBlICE9PSAnV2luZG93cyBQaG9uZScpIHJldHVybiAhMDsgaWYgKGEuaW5kZXhPZignbGludXgnKSA+PSAwICYmIGUgIT09ICdMaW51eCcgJiYgZSAhPT0gJ0FuZHJvaWQnKSByZXR1cm4gITA7IGlmIChhLmluZGV4T2YoJ21hYycpID49IDAgJiYgZSAhPT0gJ01hYycgJiYgZSAhPT0gJ2lPUycpIHJldHVybiAhMDsgaWYgKChhLmluZGV4T2YoJ3dpbicpID09PSAtMSAmJiBhLmluZGV4T2YoJ2xpbnV4JykgPT09IC0xICYmIGEuaW5kZXhPZignbWFjJykgPT09IC0xKSAhPSAoZSA9PT0gJ090aGVyJykpIHJldHVybiAhMDsgfSByZXR1cm4gbi5pbmRleE9mKCd3aW4nKSA+PSAwICYmIGUgIT09ICdXaW5kb3dzJyAmJiBlICE9PSAnV2luZG93cyBQaG9uZScgfHwgKChuLmluZGV4T2YoJ2xpbnV4JykgPj0gMCB8fCBuLmluZGV4T2YoJ2FuZHJvaWQnKSA+PSAwIHx8IG4uaW5kZXhPZigncGlrZScpID49IDApICYmIGUgIT09ICdMaW51eCcgJiYgZSAhPT0gJ0FuZHJvaWQnIHx8ICgobi5pbmRleE9mKCdtYWMnKSA+PSAwIHx8IG4uaW5kZXhPZignaXBhZCcpID49IDAgfHwgbi5pbmRleE9mKCdpcG9kJykgPj0gMCB8fCBuLmluZGV4T2YoJ2lwaG9uZScpID49IDApICYmIGUgIT09ICdNYWMnICYmIGUgIT09ICdpT1MnIHx8ICgobi5pbmRleE9mKCd3aW4nKSA8IDAgJiYgbi5pbmRleE9mKCdsaW51eCcpIDwgMCAmJiBuLmluZGV4T2YoJ21hYycpIDwgMCAmJiBuLmluZGV4T2YoJ2lwaG9uZScpIDwgMCAmJiBuLmluZGV4T2YoJ2lwYWQnKSA8IDApICE9PSAoZSA9PT0gJ090aGVyJykgfHwgdm9pZCAwID09PSBuYXZpZ2F0b3IucGx1Z2lucyAmJiBlICE9PSAnV2luZG93cycgJiYgZSAhPT0gJ1dpbmRvd3MgUGhvbmUnKSkpOyB9OyBjb25zdCBMID0gZnVuY3Rpb24gKCkgeyBsZXQgZTsgY29uc3QgdCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTsgY29uc3QgYSA9IG5hdmlnYXRvci5wcm9kdWN0U3ViOyBpZiAoKChlID0gdC5pbmRleE9mKCdmaXJlZm94JykgPj0gMCA/ICdGaXJlZm94JyA6IHQuaW5kZXhPZignb3BlcmEnKSA+PSAwIHx8IHQuaW5kZXhPZignb3ByJykgPj0gMCA/ICdPcGVyYScgOiB0LmluZGV4T2YoJ2Nocm9tZScpID49IDAgPyAnQ2hyb21lJyA6IHQuaW5kZXhPZignc2FmYXJpJykgPj0gMCA/ICdTYWZhcmknIDogdC5pbmRleE9mKCd0cmlkZW50JykgPj0gMCA/ICdJbnRlcm5ldCBFeHBsb3JlcicgOiAnT3RoZXInKSA9PT0gJ0Nocm9tZScgfHwgZSA9PT0gJ1NhZmFyaScgfHwgZSA9PT0gJ09wZXJhJykgJiYgYSAhPT0gJzIwMDMwMTA3JykgcmV0dXJuICEwOyBsZXQgbjsgY29uc3QgciA9IGV2YWwudG9TdHJpbmcoKS5sZW5ndGg7IGlmIChyID09PSAzNyAmJiBlICE9PSAnU2FmYXJpJyAmJiBlICE9PSAnRmlyZWZveCcgJiYgZSAhPT0gJ090aGVyJykgcmV0dXJuICEwOyBpZiAociA9PT0gMzkgJiYgZSAhPT0gJ0ludGVybmV0IEV4cGxvcmVyJyAmJiBlICE9PSAnT3RoZXInKSByZXR1cm4gITA7IGlmIChyID09PSAzMyAmJiBlICE9PSAnQ2hyb21lJyAmJiBlICE9PSAnT3BlcmEnICYmIGUgIT09ICdPdGhlcicpIHJldHVybiAhMDsgdHJ5IHsgdGhyb3cgJ2EnOyB9IGNhdGNoIChlKSB7IHRyeSB7IGUudG9Tb3VyY2UoKSwgbiA9ICEwOyB9IGNhdGNoIChlKSB7IG4gPSAhMTsgfSB9IHJldHVybiBuICYmIGUgIT09ICdGaXJlZm94JyAmJiBlICE9PSAnT3RoZXInOyB9OyBjb25zdCBJID0gZnVuY3Rpb24gKCkgeyBjb25zdCBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7IHJldHVybiAhKCFlLmdldENvbnRleHQgfHwgIWUuZ2V0Q29udGV4dCgnMmQnKSk7IH07IGNvbnN0IGsgPSBmdW5jdGlvbiAoKSB7IGlmICghSSgpKSByZXR1cm4gITE7IGNvbnN0IGUgPSBGKCk7IHJldHVybiAhIXdpbmRvdy5XZWJHTFJlbmRlcmluZ0NvbnRleHQgJiYgISFlOyB9OyBjb25zdCBSID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmF2aWdhdG9yLmFwcE5hbWUgPT09ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInIHx8ICEobmF2aWdhdG9yLmFwcE5hbWUgIT09ICdOZXRzY2FwZScgfHwgIS9UcmlkZW50Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKTsgfTsgY29uc3QgRCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZvaWQgMCAhPT0gd2luZG93LnN3Zm9iamVjdDsgfTsgY29uc3QgTiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvdy5zd2ZvYmplY3QuaGFzRmxhc2hQbGF5ZXJWZXJzaW9uKCc5LjAuMCcpOyB9OyBjb25zdCBfID0gZnVuY3Rpb24gKHQsIGUpIHsgY29uc3QgYSA9ICdfX19mcF9zd2ZfbG9hZGVkJzsgd2luZG93W2FdID0gZnVuY3Rpb24gKGUpIHsgdChlKTsgfTsgbGV0IG47IGxldCByOyBjb25zdCBpID0gZS5mb250cy5zd2ZDb250YWluZXJJZDsgKHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSkuc2V0QXR0cmlidXRlKCdpZCcsIG4uZm9udHMuc3dmQ29udGFpbmVySWQpLCBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHIpOyBjb25zdCBvID0geyBvblJlYWR5OiBhIH07IHdpbmRvdy5zd2ZvYmplY3QuZW1iZWRTV0YoZS5mb250cy5zd2ZQYXRoLCBpLCAnMScsICcxJywgJzkuMC4wJywgITEsIG8sIHsgYWxsb3dTY3JpcHRBY2Nlc3M6ICdhbHdheXMnLCBtZW51OiAnZmFsc2UnIH0sIHt9KTsgfTsgdmFyIEYgPSBmdW5jdGlvbiAoKSB7IGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTsgbGV0IHQgPSBudWxsOyB0cnkgeyB0ID0gZS5nZXRDb250ZXh0KCd3ZWJnbCcpIHx8IGUuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJyk7IH0gY2F0Y2ggKGUpIHt9IHJldHVybiB0IHx8ICh0ID0gbnVsbCksIHQ7IH07IGNvbnN0IEcgPSBbeyBrZXk6ICd1c2VyQWdlbnQnLCBnZXREYXRhKGUpIHsgZShuYXZpZ2F0b3IudXNlckFnZW50KTsgfSB9LCB7IGtleTogJ3dlYmRyaXZlcicsIGdldERhdGEoZSwgdCkgeyBlKG5hdmlnYXRvci53ZWJkcml2ZXIgPT0gbnVsbCA/IHQuTk9UX0FWQUlMQUJMRSA6IG5hdmlnYXRvci53ZWJkcml2ZXIpOyB9IH0sIHsga2V5OiAnbGFuZ3VhZ2UnLCBnZXREYXRhKGUsIHQpIHsgZShuYXZpZ2F0b3IubGFuZ3VhZ2UgfHwgbmF2aWdhdG9yLnVzZXJMYW5ndWFnZSB8fCBuYXZpZ2F0b3IuYnJvd3Nlckxhbmd1YWdlIHx8IG5hdmlnYXRvci5zeXN0ZW1MYW5ndWFnZSB8fCB0Lk5PVF9BVkFJTEFCTEUpOyB9IH0sIHsga2V5OiAnY29sb3JEZXB0aCcsIGdldERhdGEoZSwgdCkgeyBlKHdpbmRvdy5zY3JlZW4uY29sb3JEZXB0aCB8fCB0Lk5PVF9BVkFJTEFCTEUpOyB9IH0sIHsga2V5OiAnZGV2aWNlTWVtb3J5JywgZ2V0RGF0YShlLCB0KSB7IGUobmF2aWdhdG9yLmRldmljZU1lbW9yeSB8fCB0Lk5PVF9BVkFJTEFCTEUpOyB9IH0sIHsga2V5OiAncGl4ZWxSYXRpbycsIGdldERhdGEoZSwgdCkgeyBlKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IHQuTk9UX0FWQUlMQUJMRSk7IH0gfSwgeyBrZXk6ICdoYXJkd2FyZUNvbmN1cnJlbmN5JywgZ2V0RGF0YShlLCB0KSB7IGUoUyh0KSk7IH0gfSwgeyBrZXk6ICdzY3JlZW5SZXNvbHV0aW9uJywgZ2V0RGF0YShlLCB0KSB7IGUobih0KSk7IH0gfSwgeyBrZXk6ICdhdmFpbGFibGVTY3JlZW5SZXNvbHV0aW9uJywgZ2V0RGF0YShlLCB0KSB7IGUocih0KSk7IH0gfSwgeyBrZXk6ICd0aW1lem9uZU9mZnNldCcsIGdldERhdGEoZSkgeyBlKChuZXcgRGF0ZSgpKS5nZXRUaW1lem9uZU9mZnNldCgpKTsgfSB9LCB7IGtleTogJ3RpbWV6b25lJywgZ2V0RGF0YShlLCB0KSB7IHdpbmRvdy5JbnRsICYmIHdpbmRvdy5JbnRsLkRhdGVUaW1lRm9ybWF0ID8gZSgobmV3IHdpbmRvdy5JbnRsLkRhdGVUaW1lRm9ybWF0KCkpLnJlc29sdmVkT3B0aW9ucygpLnRpbWVab25lKSA6IGUodC5OT1RfQVZBSUxBQkxFKTsgfSB9LCB7IGtleTogJ3Nlc3Npb25TdG9yYWdlJywgZ2V0RGF0YShlLCB0KSB7IGUocCh0KSk7IH0gfSwgeyBrZXk6ICdsb2NhbFN0b3JhZ2UnLCBnZXREYXRhKGUsIHQpIHsgZSh2KHQpKTsgfSB9LCB7IGtleTogJ2luZGV4ZWREYicsIGdldERhdGEoZSwgdCkgeyBlKEEodCkpOyB9IH0sIHsga2V5OiAnYWRkQmVoYXZpb3InLCBnZXREYXRhKGUpIHsgZSghKCFkb2N1bWVudC5ib2R5IHx8ICFkb2N1bWVudC5ib2R5LmFkZEJlaGF2aW9yKSk7IH0gfSwgeyBrZXk6ICdvcGVuRGF0YWJhc2UnLCBnZXREYXRhKGUpIHsgZSghIXdpbmRvdy5vcGVuRGF0YWJhc2UpOyB9IH0sIHsga2V5OiAnY3B1Q2xhc3MnLCBnZXREYXRhKGUsIHQpIHsgZShDKHQpKTsgfSB9LCB7IGtleTogJ3BsYXRmb3JtJywgZ2V0RGF0YShlLCB0KSB7IGUoQih0KSk7IH0gfSwgeyBrZXk6ICdkb05vdFRyYWNrJywgZ2V0RGF0YShlLCB0KSB7IGUodyh0KSk7IH0gfSwgeyBrZXk6ICdwbHVnaW5zJywgZ2V0RGF0YShlLCB0KSB7IFIoKSA/IHQucGx1Z2lucy5leGNsdWRlSUUgPyBlKHQuRVhDTFVERUQpIDogZShvKHQpKSA6IGUoaSh0KSk7IH0gfSwgeyBrZXk6ICdjYW52YXMnLCBnZXREYXRhKGUsIHQpIHsgSSgpID8gZSh5KHQpKSA6IGUodC5OT1RfQVZBSUxBQkxFKTsgfSB9LCB7IGtleTogJ3dlYmdsJywgZ2V0RGF0YShlLCB0KSB7IGsoKSA/IGUoRSgpKSA6IGUodC5OT1RfQVZBSUxBQkxFKTsgfSB9LCB7IGtleTogJ3dlYmdsVmVuZG9yQW5kUmVuZGVyZXInLCBnZXREYXRhKGUpIHsgaygpID8gZShNKCkpIDogZSgpOyB9IH0sIHsga2V5OiAnYWRCbG9jaycsIGdldERhdGEoZSkgeyBlKHgoKSk7IH0gfSwgeyBrZXk6ICdoYXNMaWVkTGFuZ3VhZ2VzJywgZ2V0RGF0YShlKSB7IGUoTygpKTsgfSB9LCB7IGtleTogJ2hhc0xpZWRSZXNvbHV0aW9uJywgZ2V0RGF0YShlKSB7IGUoYigpKTsgfSB9LCB7IGtleTogJ2hhc0xpZWRPcycsIGdldERhdGEoZSkgeyBlKFAoKSk7IH0gfSwgeyBrZXk6ICdoYXNMaWVkQnJvd3NlcicsIGdldERhdGEoZSkgeyBlKEwoKSk7IH0gfSwgeyBrZXk6ICd0b3VjaFN1cHBvcnQnLCBnZXREYXRhKGUpIHsgZSh0KCkpOyB9IH0sIHsga2V5OiAnZm9udHMnLCBnZXREYXRhKGUsIHQpIHsgY29uc3QgdSA9IFsnbW9ub3NwYWNlJywgJ3NhbnMtc2VyaWYnLCAnc2VyaWYnXTsgbGV0IGQgPSBbJ0FuZGFsZSBNb25vJywgJ0FyaWFsJywgJ0FyaWFsIEJsYWNrJywgJ0FyaWFsIEhlYnJldycsICdBcmlhbCBNVCcsICdBcmlhbCBOYXJyb3cnLCAnQXJpYWwgUm91bmRlZCBNVCBCb2xkJywgJ0FyaWFsIFVuaWNvZGUgTVMnLCAnQml0c3RyZWFtIFZlcmEgU2FucyBNb25vJywgJ0Jvb2sgQW50aXF1YScsICdCb29rbWFuIE9sZCBTdHlsZScsICdDYWxpYnJpJywgJ0NhbWJyaWEnLCAnQ2FtYnJpYSBNYXRoJywgJ0NlbnR1cnknLCAnQ2VudHVyeSBHb3RoaWMnLCAnQ2VudHVyeSBTY2hvb2xib29rJywgJ0NvbWljIFNhbnMnLCAnQ29taWMgU2FucyBNUycsICdDb25zb2xhcycsICdDb3VyaWVyJywgJ0NvdXJpZXIgTmV3JywgJ0dlbmV2YScsICdHZW9yZ2lhJywgJ0hlbHZldGljYScsICdIZWx2ZXRpY2EgTmV1ZScsICdJbXBhY3QnLCAnTHVjaWRhIEJyaWdodCcsICdMdWNpZGEgQ2FsbGlncmFwaHknLCAnTHVjaWRhIENvbnNvbGUnLCAnTHVjaWRhIEZheCcsICdMVUNJREEgR1JBTkRFJywgJ0x1Y2lkYSBIYW5kd3JpdGluZycsICdMdWNpZGEgU2FucycsICdMdWNpZGEgU2FucyBUeXBld3JpdGVyJywgJ0x1Y2lkYSBTYW5zIFVuaWNvZGUnLCAnTWljcm9zb2Z0IFNhbnMgU2VyaWYnLCAnTW9uYWNvJywgJ01vbm90eXBlIENvcnNpdmEnLCAnTVMgR290aGljJywgJ01TIE91dGxvb2snLCAnTVMgUEdvdGhpYycsICdNUyBSZWZlcmVuY2UgU2FucyBTZXJpZicsICdNUyBTYW5zIFNlcmlmJywgJ01TIFNlcmlmJywgJ01ZUklBRCcsICdNWVJJQUQgUFJPJywgJ1BhbGF0aW5vJywgJ1BhbGF0aW5vIExpbm90eXBlJywgJ1NlZ29lIFByaW50JywgJ1NlZ29lIFNjcmlwdCcsICdTZWdvZSBVSScsICdTZWdvZSBVSSBMaWdodCcsICdTZWdvZSBVSSBTZW1pYm9sZCcsICdTZWdvZSBVSSBTeW1ib2wnLCAnVGFob21hJywgJ1RpbWVzJywgJ1RpbWVzIE5ldyBSb21hbicsICdUaW1lcyBOZXcgUm9tYW4gUFMnLCAnVHJlYnVjaGV0IE1TJywgJ1ZlcmRhbmEnLCAnV2luZ2RpbmdzJywgJ1dpbmdkaW5ncyAyJywgJ1dpbmdkaW5ncyAzJ107IHQuZm9udHMuZXh0ZW5kZWRKc0ZvbnRzICYmIChkID0gZC5jb25jYXQoWydBYmFkaSBNVCBDb25kZW5zZWQgTGlnaHQnLCAnQWNhZGVteSBFbmdyYXZlZCBMRVQnLCAnQURPQkUgQ0FTTE9OIFBSTycsICdBZG9iZSBHYXJhbW9uZCcsICdBRE9CRSBHQVJBTU9ORCBQUk8nLCAnQWdlbmN5IEZCJywgJ0FoYXJvbmknLCAnQWxiZXJ0dXMgRXh0cmEgQm9sZCcsICdBbGJlcnR1cyBNZWRpdW0nLCAnQWxnZXJpYW4nLCAnQW1hem9uZSBCVCcsICdBbWVyaWNhbiBUeXBld3JpdGVyJywgJ0FtZXJpY2FuIFR5cGV3cml0ZXIgQ29uZGVuc2VkJywgJ0FtZXJUeXBlIE1kIEJUJywgJ0FuZGFsdXMnLCAnQW5nc2FuYSBOZXcnLCAnQW5nc2FuYVVQQycsICdBbnRpcXVlIE9saXZlJywgJ0FwYXJhaml0YScsICdBcHBsZSBDaGFuY2VyeScsICdBcHBsZSBDb2xvciBFbW9qaScsICdBcHBsZSBTRCBHb3RoaWMgTmVvJywgJ0FyYWJpYyBUeXBlc2V0dGluZycsICdBUkNIRVInLCAnQVJOTyBQUk8nLCAnQXJydXMgQlQnLCAnQXVyb3JhIENuIEJUJywgJ0F2YW50R2FyZGUgQmsgQlQnLCAnQXZhbnRHYXJkZSBNZCBCVCcsICdBVkVOSVInLCAnQXl1dGhheWEnLCAnQmFuZHknLCAnQmFuZ2xhIFNhbmdhbSBNTicsICdCYW5rIEdvdGhpYycsICdCYW5rR290aGljIE1kIEJUJywgJ0Jhc2tlcnZpbGxlJywgJ0Jhc2tlcnZpbGxlIE9sZCBGYWNlJywgJ0JhdGFuZycsICdCYXRhbmdDaGUnLCAnQmF1ZXIgQm9kb25pJywgJ0JhdWhhdXMgOTMnLCAnQmF6b29rYScsICdCZWxsIE1UJywgJ0JlbWJvJywgJ0Jlbmd1aWF0IEJrIEJUJywgJ0JlcmxpbiBTYW5zIEZCJywgJ0JlcmxpbiBTYW5zIEZCIERlbWknLCAnQmVybmFyZCBNVCBDb25kZW5zZWQnLCAnQmVybmhhcmRGYXNoaW9uIEJUJywgJ0Jlcm5oYXJkTW9kIEJUJywgJ0JpZyBDYXNsb24nLCAnQmlubmVyRCcsICdCbGFja2FkZGVyIElUQycsICdCbGFpck1kSVRDIFRUJywgJ0JvZG9uaSA3MicsICdCb2RvbmkgNzIgT2xkc3R5bGUnLCAnQm9kb25pIDcyIFNtYWxsY2FwcycsICdCb2RvbmkgTVQnLCAnQm9kb25pIE1UIEJsYWNrJywgJ0JvZG9uaSBNVCBDb25kZW5zZWQnLCAnQm9kb25pIE1UIFBvc3RlciBDb21wcmVzc2VkJywgJ0Jvb2tzaGVsZiBTeW1ib2wgNycsICdCb3VsZGVyJywgJ0JyYWRsZXkgSGFuZCcsICdCcmFkbGV5IEhhbmQgSVRDJywgJ0JyZW1lbiBCZCBCVCcsICdCcml0YW5uaWMgQm9sZCcsICdCcm9hZHdheScsICdCcm93YWxsaWEgTmV3JywgJ0Jyb3dhbGxpYVVQQycsICdCcnVzaCBTY3JpcHQgTVQnLCAnQ2FsaWZvcm5pYW4gRkInLCAnQ2FsaXN0byBNVCcsICdDYWxsaWdyYXBoZXInLCAnQ2FuZGFyYScsICdDYXNsb25PcG5mYWNlIEJUJywgJ0Nhc3RlbGxhcicsICdDZW50YXVyJywgJ0NlemFubmUnLCAnQ0cgT21lZ2EnLCAnQ0cgVGltZXMnLCAnQ2hhbGtib2FyZCcsICdDaGFsa2JvYXJkIFNFJywgJ0NoYWxrZHVzdGVyJywgJ0NoYXJsZXN3b3J0aCcsICdDaGFydGVyIEJkIEJUJywgJ0NoYXJ0ZXIgQlQnLCAnQ2hhdWNlcicsICdDaGVsdGhtSVRDIEJrIEJUJywgJ0NoaWxsZXInLCAnQ2xhcmVuZG9uJywgJ0NsYXJlbmRvbiBDb25kZW5zZWQnLCAnQ2xvaXN0ZXJCbGFjayBCVCcsICdDb2NoaW4nLCAnQ29sb25uYSBNVCcsICdDb25zdGFudGlhJywgJ0Nvb3BlciBCbGFjaycsICdDb3BwZXJwbGF0ZScsICdDb3BwZXJwbGF0ZSBHb3RoaWMnLCAnQ29wcGVycGxhdGUgR290aGljIEJvbGQnLCAnQ29wcGVycGxhdGUgR290aGljIExpZ2h0JywgJ0NvcHBlcnBsR290aCBCZCBCVCcsICdDb3JiZWwnLCAnQ29yZGlhIE5ldycsICdDb3JkaWFVUEMnLCAnQ29ybmVyc3RvbmUnLCAnQ29yb25ldCcsICdDdWNrb28nLCAnQ3VybHogTVQnLCAnRGF1blBlbmgnLCAnRGF1cGhpbicsICdEYXZpZCcsICdEQiBMQ0QgVGVtcCcsICdERUxJQ0lPVVMnLCAnRGVubWFyaycsICdERkthaS1TQicsICdEaWRvdCcsICdEaWxsZW5pYVVQQycsICdESU4nLCAnRG9rQ2hhbXBhJywgJ0RvdHVtJywgJ0RvdHVtQ2hlJywgJ0VicmltYScsICdFZHdhcmRpYW4gU2NyaXB0IElUQycsICdFbGVwaGFudCcsICdFbmdsaXNoIDExMSBWaXZhY2UgQlQnLCAnRW5ncmF2ZXJzIE1UJywgJ0VuZ3JhdmVyc0dvdGhpYyBCVCcsICdFcmFzIEJvbGQgSVRDJywgJ0VyYXMgRGVtaSBJVEMnLCAnRXJhcyBMaWdodCBJVEMnLCAnRXJhcyBNZWRpdW0gSVRDJywgJ0V1Y3Jvc2lhVVBDJywgJ0V1cGhlbWlhJywgJ0V1cGhlbWlhIFVDQVMnLCAnRVVST1NUSUxFJywgJ0V4b3RjMzUwIEJkIEJUJywgJ0ZhbmdTb25nJywgJ0ZlbGl4IFRpdGxpbmcnLCAnRml4ZWRzeXMnLCAnRk9OVElOJywgJ0Zvb3RsaWdodCBNVCBMaWdodCcsICdGb3J0ZScsICdGcmFua1J1ZWhsJywgJ0ZyYW5zaXNjYW4nLCAnRnJlZWZybTcyMSBCbGsgQlQnLCAnRnJlZXNpYVVQQycsICdGcmVlc3R5bGUgU2NyaXB0JywgJ0ZyZW5jaCBTY3JpcHQgTVQnLCAnRnJua0dvdGhJVEMgQmsgQlQnLCAnRnJ1aXRnZXInLCAnRlJVVElHRVInLCAnRnV0dXJhJywgJ0Z1dHVyYSBCayBCVCcsICdGdXR1cmEgTHQgQlQnLCAnRnV0dXJhIE1kIEJUJywgJ0Z1dHVyYSBaQmxrIEJUJywgJ0Z1dHVyYUJsYWNrIEJUJywgJ0dhYnJpb2xhJywgJ0dhbGxpYXJkIEJUJywgJ0dhdXRhbWknLCAnR2VlemEgUHJvJywgJ0dlb21ldHIyMzEgQlQnLCAnR2VvbWV0cjIzMSBIdiBCVCcsICdHZW9tZXRyMjMxIEx0IEJUJywgJ0dlb1NsYWIgNzAzIEx0IEJUJywgJ0dlb1NsYWIgNzAzIFhCZCBCVCcsICdHaWdpJywgJ0dpbGwgU2FucycsICdHaWxsIFNhbnMgTVQnLCAnR2lsbCBTYW5zIE1UIENvbmRlbnNlZCcsICdHaWxsIFNhbnMgTVQgRXh0IENvbmRlbnNlZCBCb2xkJywgJ0dpbGwgU2FucyBVbHRyYSBCb2xkJywgJ0dpbGwgU2FucyBVbHRyYSBCb2xkIENvbmRlbnNlZCcsICdHaXNoYScsICdHbG91Y2VzdGVyIE1UIEV4dHJhIENvbmRlbnNlZCcsICdHT1RIQU0nLCAnR09USEFNIEJPTEQnLCAnR291ZHkgT2xkIFN0eWxlJywgJ0dvdWR5IFN0b3V0JywgJ0dvdWR5SGFuZHRvb2xlZCBCVCcsICdHb3VkeU9MU3QgQlQnLCAnR3VqYXJhdGkgU2FuZ2FtIE1OJywgJ0d1bGltJywgJ0d1bGltQ2hlJywgJ0d1bmdzdWgnLCAnR3VuZ3N1aENoZScsICdHdXJtdWtoaSBNTicsICdIYWV0dGVuc2Nod2VpbGVyJywgJ0hhcmxvdyBTb2xpZCBJdGFsaWMnLCAnSGFycmluZ3RvbicsICdIZWF0aGVyJywgJ0hlaXRpIFNDJywgJ0hlaXRpIFRDJywgJ0hFTFYnLCAnSGVyYWxkJywgJ0hpZ2ggVG93ZXIgVGV4dCcsICdIaXJhZ2lubyBLYWt1IEdvdGhpYyBQcm9OJywgJ0hpcmFnaW5vIE1pbmNobyBQcm9OJywgJ0hvZWZsZXIgVGV4dCcsICdIdW1hbnN0IDUyMSBDbiBCVCcsICdIdW1hbnN0NTIxIEJUJywgJ0h1bWFuc3Q1MjEgTHQgQlQnLCAnSW1wcmludCBNVCBTaGFkb3cnLCAnSW5jaXNlZDkwMSBCZCBCVCcsICdJbmNpc2VkOTAxIEJUJywgJ0luY2lzZWQ5MDEgTHQgQlQnLCAnSU5DT05TT0xBVEEnLCAnSW5mb3JtYWwgUm9tYW4nLCAnSW5mb3JtYWwwMTEgQlQnLCAnSU5URVJTVEFURScsICdJcmlzVVBDJywgJ0lza29vbGEgUG90YScsICdKYXNtaW5lVVBDJywgJ0phenogTEVUJywgJ0plbnNvbicsICdKZXN0ZXInLCAnSm9rZXJtYW4nLCAnSnVpY2UgSVRDJywgJ0thYmVsIEJrIEJUJywgJ0thYmVsIFVsdCBCVCcsICdLYWlsYXNhJywgJ0thaVRpJywgJ0thbGluZ2EnLCAnS2FubmFkYSBTYW5nYW0gTU4nLCAnS2FydGlrYScsICdLYXVmbWFubiBCZCBCVCcsICdLYXVmbWFubiBCVCcsICdLaG1lciBVSScsICdLb2RjaGlhbmdVUEMnLCAnS29raWxhJywgJ0tvcmlubmEgQlQnLCAnS3Jpc3RlbiBJVEMnLCAnS3J1bmd0aGVwJywgJ0t1bnN0bGVyIFNjcmlwdCcsICdMYW8gVUknLCAnTGF0aGEnLCAnTGVlbGF3YWRlZScsICdMZXR0ZXIgR290aGljJywgJ0xldmVuaW0gTVQnLCAnTGlseVVQQycsICdMaXRob2dyYXBoJywgJ0xpdGhvZ3JhcGggTGlnaHQnLCAnTG9uZyBJc2xhbmQnLCAnTHlkaWFuIEJUJywgJ01hZ25ldG8nLCAnTWFpYW5kcmEgR0QnLCAnTWFsYXlhbGFtIFNhbmdhbSBNTicsICdNYWxndW4gR290aGljJywgJ01hbmdhbCcsICdNYXJpZ29sZCcsICdNYXJpb24nLCAnTWFya2VyIEZlbHQnLCAnTWFya2V0JywgJ01hcmxldHQnLCAnTWF0aXNzZSBJVEMnLCAnTWF0dXJhIE1UIFNjcmlwdCBDYXBpdGFscycsICdNZWlyeW8nLCAnTWVpcnlvIFVJJywgJ01pY3Jvc29mdCBIaW1hbGF5YScsICdNaWNyb3NvZnQgSmhlbmdIZWknLCAnTWljcm9zb2Z0IE5ldyBUYWkgTHVlJywgJ01pY3Jvc29mdCBQaGFnc1BhJywgJ01pY3Jvc29mdCBUYWkgTGUnLCAnTWljcm9zb2Z0IFVpZ2h1cicsICdNaWNyb3NvZnQgWWFIZWknLCAnTWljcm9zb2Z0IFlpIEJhaXRpJywgJ01pbmdMaVUnLCAnTWluZ0xpVV9IS1NDUycsICdNaW5nTGlVX0hLU0NTLUV4dEInLCAnTWluZ0xpVS1FeHRCJywgJ01pbmlvbicsICdNaW5pb24gUHJvJywgJ01pcmlhbScsICdNaXJpYW0gRml4ZWQnLCAnTWlzdHJhbCcsICdNb2Rlcm4nLCAnTW9kZXJuIE5vLiAyMCcsICdNb25hIExpc2EgU29saWQgSVRDIFRUJywgJ01vbmdvbGlhbiBCYWl0aScsICdNT05PJywgJ01vb2xCb3JhbicsICdNcnMgRWF2ZXMnLCAnTVMgTGluZURyYXcnLCAnTVMgTWluY2hvJywgJ01TIFBNaW5jaG8nLCAnTVMgUmVmZXJlbmNlIFNwZWNpYWx0eScsICdNUyBVSSBHb3RoaWMnLCAnTVQgRXh0cmEnLCAnTVVTRU8nLCAnTVYgQm9saScsICdOYWRlZW0nLCAnTmFya2lzaW0nLCAnTkVWSVMnLCAnTmV3cyBHb3RoaWMnLCAnTmV3cyBHb3RoaWNNVCcsICdOZXdzR290aCBCVCcsICdOaWFnYXJhIEVuZ3JhdmVkJywgJ05pYWdhcmEgU29saWQnLCAnTm90ZXdvcnRoeScsICdOU2ltU3VuJywgJ055YWxhJywgJ09DUiBBIEV4dGVuZGVkJywgJ09sZCBDZW50dXJ5JywgJ09sZCBFbmdsaXNoIFRleHQgTVQnLCAnT255eCcsICdPbnl4IEJUJywgJ09QVElNQScsICdPcml5YSBTYW5nYW0gTU4nLCAnT1NBS0EnLCAnT3pIYW5kaWNyYWZ0IEJUJywgJ1BhbGFjZSBTY3JpcHQgTVQnLCAnUGFweXJ1cycsICdQYXJjaG1lbnQnLCAnUGFydHkgTEVUJywgJ1BlZ2FzdXMnLCAnUGVycGV0dWEnLCAnUGVycGV0dWEgVGl0bGluZyBNVCcsICdQZXRpdGFCb2xkJywgJ1BpY2t3aWNrJywgJ1BsYW50YWdlbmV0IENoZXJva2VlJywgJ1BsYXliaWxsJywgJ1BNaW5nTGlVJywgJ1BNaW5nTGlVLUV4dEInLCAnUG9vciBSaWNoYXJkJywgJ1Bvc3RlcicsICdQb3N0ZXJCb2RvbmkgQlQnLCAnUFJJTkNFVE9XTiBMRVQnLCAnUHJpc3RpbmEnLCAnUFRCYXJudW0gQlQnLCAnUHl0aGFnb3JhcycsICdSYWF2aScsICdSYWdlIEl0YWxpYycsICdSYXZpZScsICdSaWJib24xMzEgQmQgQlQnLCAnUm9ja3dlbGwnLCAnUm9ja3dlbGwgQ29uZGVuc2VkJywgJ1JvY2t3ZWxsIEV4dHJhIEJvbGQnLCAnUm9kJywgJ1JvbWFuJywgJ1Nha2thbCBNYWphbGxhJywgJ1NhbnRhIEZlIExFVCcsICdTYXZveWUgTEVUJywgJ1NjZXB0cmUnLCAnU2NyaXB0JywgJ1NjcmlwdCBNVCBCb2xkJywgJ1NDUklQVElOQScsICdTZXJpZmEnLCAnU2VyaWZhIEJUJywgJ1NlcmlmYSBUaCBCVCcsICdTaGVsbGV5Vm9sYW50ZSBCVCcsICdTaGVyd29vZCcsICdTaG9uYXIgQmFuZ2xhJywgJ1Nob3djYXJkIEdvdGhpYycsICdTaHJ1dGknLCAnU2lnbmJvYXJkJywgJ1NJTEtTQ1JFRU4nLCAnU2ltSGVpJywgJ1NpbXBsaWZpZWQgQXJhYmljJywgJ1NpbXBsaWZpZWQgQXJhYmljIEZpeGVkJywgJ1NpbVN1bicsICdTaW1TdW4tRXh0QicsICdTaW5oYWxhIFNhbmdhbSBNTicsICdTa2V0Y2ggUm9ja3dlbGwnLCAnU2tpYScsICdTbWFsbCBGb250cycsICdTbmFwIElUQycsICdTbmVsbCBSb3VuZGhhbmQnLCAnU29ja2V0JywgJ1NvdXZlbmlyIEx0IEJUJywgJ1N0YWNjYXRvMjIyIEJUJywgJ1N0ZWFtZXInLCAnU3RlbmNpbCcsICdTdG9yeWJvb2snLCAnU3R5bGxvJywgJ1N1YndheScsICdTd2lzNzIxIEJsa0V4IEJUJywgJ1N3aXNzOTExIFhDbSBCVCcsICdTeWxmYWVuJywgJ1N5bmNocm8gTEVUJywgJ1N5c3RlbScsICdUYW1pbCBTYW5nYW0gTU4nLCAnVGVjaG5pY2FsJywgJ1RlbGV0eXBlJywgJ1RlbHVndSBTYW5nYW0gTU4nLCAnVGVtcHVzIFNhbnMgSVRDJywgJ1Rlcm1pbmFsJywgJ1Rob25idXJpJywgJ1RyYWRpdGlvbmFsIEFyYWJpYycsICdUcmFqYW4nLCAnVFJBSkFOIFBSTycsICdUcmlzdGFuJywgJ1R1YnVsYXInLCAnVHVuZ2EnLCAnVHcgQ2VuIE1UJywgJ1R3IENlbiBNVCBDb25kZW5zZWQnLCAnVHcgQ2VuIE1UIENvbmRlbnNlZCBFeHRyYSBCb2xkJywgJ1R5cG9VcHJpZ2h0IEJUJywgJ1VuaWNvcm4nLCAnVW5pdmVycycsICdVbml2ZXJzIENFIDU1IE1lZGl1bScsICdVbml2ZXJzIENvbmRlbnNlZCcsICdVdHNhYWgnLCAnVmFnYWJvbmQnLCAnVmFuaScsICdWaWpheWEnLCAnVmluZXIgSGFuZCBJVEMnLCAnVmlzdWFsVUknLCAnVml2YWxkaScsICdWbGFkaW1pciBTY3JpcHQnLCAnVnJpbmRhJywgJ1dlc3RtaW5zdGVyJywgJ1dISVRORVknLCAnV2lkZSBMYXRpbicsICdaYXBmRWxsaXB0IEJUJywgJ1phcGZIdW1uc3QgQlQnLCAnWmFwZkh1bW5zdCBEbSBCVCcsICdaYXBmaW5vJywgJ1p1cmljaCBCbGtFeCBCVCcsICdadXJpY2ggRXggQlQnLCAnWldBZG9iZUYnXSkpOyBkID0gKGQgPSBkLmNvbmNhdCh0LmZvbnRzLnVzZXJEZWZpbmVkRm9udHMpKS5maWx0ZXIoKGUsIHQpID0+IHsgcmV0dXJuIGQuaW5kZXhPZihlKSA9PT0gdDsgfSk7IGNvbnN0IGEgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdOyBjb25zdCByID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7IGNvbnN0IGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgY29uc3QgbiA9IHt9OyBjb25zdCBpID0ge307IGNvbnN0IGYgPSBmdW5jdGlvbiAoKSB7IGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7IHJldHVybiBlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJywgZS5zdHlsZS5sZWZ0ID0gJy05OTk5cHgnLCBlLnN0eWxlLmZvbnRTaXplID0gJzcycHgnLCBlLnN0eWxlLmZvbnRTdHlsZSA9ICdub3JtYWwnLCBlLnN0eWxlLmZvbnRXZWlnaHQgPSAnbm9ybWFsJywgZS5zdHlsZS5sZXR0ZXJTcGFjaW5nID0gJ25vcm1hbCcsIGUuc3R5bGUubGluZUJyZWFrID0gJ2F1dG8nLCBlLnN0eWxlLmxpbmVIZWlnaHQgPSAnbm9ybWFsJywgZS5zdHlsZS50ZXh0VHJhbnNmb3JtID0gJ25vbmUnLCBlLnN0eWxlLnRleHRBbGlnbiA9ICdsZWZ0JywgZS5zdHlsZS50ZXh0RGVjb3JhdGlvbiA9ICdub25lJywgZS5zdHlsZS50ZXh0U2hhZG93ID0gJ25vbmUnLCBlLnN0eWxlLndoaXRlU3BhY2UgPSAnbm9ybWFsJywgZS5zdHlsZS53b3JkQnJlYWsgPSAnbm9ybWFsJywgZS5zdHlsZS53b3JkU3BhY2luZyA9ICdub3JtYWwnLCBlLmlubmVySFRNTCA9ICdtbW1tbW1tbW1tbGxpJywgZTsgfTsgY29uc3QgbyA9IGZ1bmN0aW9uIChlKSB7IGZvciAodmFyIHQgPSAhMSwgYSA9IDA7IGEgPCB1Lmxlbmd0aDsgYSsrKSBpZiAodCA9IGVbYV0ub2Zmc2V0V2lkdGggIT09IG5bdVthXV0gfHwgZVthXS5vZmZzZXRIZWlnaHQgIT09IGlbdVthXV0pIHJldHVybiB0OyByZXR1cm4gdDsgfTsgY29uc3QgbCA9IChmdW5jdGlvbiAoKSB7IGZvciAodmFyIGUgPSBbXSwgdCA9IDAsIGEgPSB1Lmxlbmd0aDsgdCA8IGE7IHQrKykgeyBjb25zdCBuID0gZigpOyBuLnN0eWxlLmZvbnRGYW1pbHkgPSB1W3RdLCByLmFwcGVuZENoaWxkKG4pLCBlLnB1c2gobik7IH0gcmV0dXJuIGU7IH0oKSk7IGEuYXBwZW5kQ2hpbGQocik7IGZvciAobGV0IHMgPSAwLCBjID0gdS5sZW5ndGg7IHMgPCBjOyBzKyspblt1W3NdXSA9IGxbc10ub2Zmc2V0V2lkdGgsIGlbdVtzXV0gPSBsW3NdLm9mZnNldEhlaWdodDsgY29uc3QgaCA9IChmdW5jdGlvbiAoKSB7IGZvciAodmFyIGUsIHQsIGEsIG4gPSB7fSwgciA9IDAsIGkgPSBkLmxlbmd0aDsgciA8IGk7IHIrKykgeyBmb3IgKHZhciBvID0gW10sIGwgPSAwLCBzID0gdS5sZW5ndGg7IGwgPCBzOyBsKyspIHsgY29uc3QgYyA9IChlID0gZFtyXSwgdCA9IHVbbF0sIGEgPSB2b2lkIDAsIChhID0gZigpKS5zdHlsZS5mb250RmFtaWx5ID0gYCcke2V9Jywke3R9YCwgYSk7IGcuYXBwZW5kQ2hpbGQoYyksIG8ucHVzaChjKTsgfW5bZFtyXV0gPSBvOyB9IHJldHVybiBuOyB9KCkpOyBhLmFwcGVuZENoaWxkKGcpOyBmb3IgKHZhciBtID0gW10sIFQgPSAwLCBwID0gZC5sZW5ndGg7IFQgPCBwOyBUKyspbyhoW2RbVF1dKSAmJiBtLnB1c2goZFtUXSk7IGEucmVtb3ZlQ2hpbGQoZyksIGEucmVtb3ZlQ2hpbGQociksIGUobSk7IH0sIHBhdXNlQmVmb3JlOiAhMCB9LCB7IGtleTogJ2ZvbnRzRmxhc2gnLCBnZXREYXRhKHQsIGUpIHsgcmV0dXJuIEQoKSA/IE4oKSA/IGUuZm9udHMuc3dmUGF0aCA/IHZvaWQgXygoZSkgPT4geyB0KGUpOyB9LCBlKSA6IHQoJ21pc3Npbmcgb3B0aW9ucy5mb250cy5zd2ZQYXRoJykgOiB0KCdmbGFzaCBub3QgaW5zdGFsbGVkJykgOiB0KCdzd2Ygb2JqZWN0IG5vdCBsb2FkZWQnKTsgfSwgcGF1c2VCZWZvcmU6ICEwIH0sIHsga2V5OiAnYXVkaW8nLCBnZXREYXRhKGEsIGUpIHsgY29uc3QgdCA9IGUuYXVkaW87IGlmICh0LmV4Y2x1ZGVJT1MxMSAmJiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9PUyAxMS4rVmVyc2lvblxcLzExLitTYWZhcmkvKSkgcmV0dXJuIGEoZS5FWENMVURFRCk7IGNvbnN0IG4gPSB3aW5kb3cuT2ZmbGluZUF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0T2ZmbGluZUF1ZGlvQ29udGV4dDsgaWYgKG4gPT0gbnVsbCkgcmV0dXJuIGEoZS5OT1RfQVZBSUxBQkxFKTsgbGV0IHIgPSBuZXcgbigxLCA0NDEwMCwgNDQxMDApOyBjb25zdCBpID0gci5jcmVhdGVPc2NpbGxhdG9yKCk7IGkudHlwZSA9ICd0cmlhbmdsZScsIGkuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDFlNCwgci5jdXJyZW50VGltZSk7IGNvbnN0IG8gPSByLmNyZWF0ZUR5bmFtaWNzQ29tcHJlc3NvcigpOyBjKFtbJ3RocmVzaG9sZCcsIC01MF0sIFsna25lZScsIDQwXSwgWydyYXRpbycsIDEyXSwgWydyZWR1Y3Rpb24nLCAtMjBdLCBbJ2F0dGFjaycsIDBdLCBbJ3JlbGVhc2UnLCAwLjI1XV0sIChlKSA9PiB7IHZvaWQgMCAhPT0gb1tlWzBdXSAmJiB0eXBlb2Ygb1tlWzBdXS5zZXRWYWx1ZUF0VGltZSA9PT0gJ2Z1bmN0aW9uJyAmJiBvW2VbMF1dLnNldFZhbHVlQXRUaW1lKGVbMV0sIHIuY3VycmVudFRpbWUpOyB9KSwgaS5jb25uZWN0KG8pLCBvLmNvbm5lY3Qoci5kZXN0aW5hdGlvbiksIGkuc3RhcnQoMCksIHIuc3RhcnRSZW5kZXJpbmcoKTsgY29uc3QgbCA9IHNldFRpbWVvdXQoKCkgPT4geyByZXR1cm4gY29uc29sZS53YXJuKGBBdWRpbyBmaW5nZXJwcmludCB0aW1lZCBvdXQuIFBsZWFzZSByZXBvcnQgYnVnIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9WYWx2ZS9maW5nZXJwcmludGpzMiB3aXRoIHlvdXIgdXNlciBhZ2VudDogXCIke25hdmlnYXRvci51c2VyQWdlbnR9XCIuYCksIHIub25jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHt9LCByID0gbnVsbCwgYSgnYXVkaW9UaW1lb3V0Jyk7IH0sIHQudGltZW91dCk7IHIub25jb21wbGV0ZSA9IGZ1bmN0aW9uIChlKSB7IGxldCB0OyB0cnkgeyBjbGVhclRpbWVvdXQobCksIHQgPSBlLnJlbmRlcmVkQnVmZmVyLmdldENoYW5uZWxEYXRhKDApLnNsaWNlKDQ1MDAsIDVlMykucmVkdWNlKChlLCB0KSA9PiB7IHJldHVybiBlICsgTWF0aC5hYnModCk7IH0sIDApLnRvU3RyaW5nKCksIGkuZGlzY29ubmVjdCgpLCBvLmRpc2Nvbm5lY3QoKTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gdm9pZCBhKGUpOyB9YSh0KTsgfTsgfSB9LCB7IGtleTogJ2VudW1lcmF0ZURldmljZXMnLCBnZXREYXRhKHQsIGUpIHsgaWYgKCFhKCkpIHJldHVybiB0KGUuTk9UX0FWQUlMQUJMRSk7IG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpLnRoZW4oKGUpID0+IHsgdChlLm1hcCgoZSkgPT4geyByZXR1cm4gYGlkPSR7ZS5kZXZpY2VJZH07Z2lkPSR7ZS5ncm91cElkfTske2Uua2luZH07JHtlLmxhYmVsfWA7IH0pKTsgfSkuY2F0Y2goKGUpID0+IHsgdChlKTsgfSk7IH0gfV07IGNvbnN0IFUgPSBmdW5jdGlvbiAoZSkgeyB0aHJvdyBuZXcgRXJyb3IoXCInbmV3IEZpbmdlcnByaW50KCknIGlzIGRlcHJlY2F0ZWQsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vVmFsdmUvZmluZ2VycHJpbnRqczIjdXBncmFkZS1ndWlkZS1mcm9tLTE4Mi10by0yMDBcIik7IH07IHJldHVybiBVLmdldCA9IGZ1bmN0aW9uIChhLCBuKSB7IG4gPyBhIHx8IChhID0ge30pIDogKG4gPSBhLCBhID0ge30pLCAoZnVuY3Rpb24gKGUsIHQpIHsgaWYgKHQgPT0gbnVsbCkgcmV0dXJuOyBsZXQgYTsgbGV0IG47IGZvciAobiBpbiB0KShhID0gdFtuXSkgPT0gbnVsbCB8fCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSwgbikgfHwgKGVbbl0gPSBhKTsgfShhLCBlKSksIGEuY29tcG9uZW50cyA9IGEuZXh0cmFDb21wb25lbnRzLmNvbmNhdChHKTsgdmFyIHIgPSB7IGRhdGE6IFtdLCBhZGRQcmVwcm9jZXNzZWRDb21wb25lbnQoZSwgdCkgeyB0eXBlb2YgYS5wcmVwcm9jZXNzb3IgPT09ICdmdW5jdGlvbicgJiYgKHQgPSBhLnByZXByb2Nlc3NvcihlLCB0KSksIHIuZGF0YS5wdXNoKHsga2V5OiBlLCB2YWx1ZTogdCB9KTsgfSB9OyBsZXQgaSA9IC0xOyB2YXIgbyA9IGZ1bmN0aW9uIChlKSB7IGlmICgoaSArPSAxKSA+PSBhLmNvbXBvbmVudHMubGVuZ3RoKW4oci5kYXRhKTsgZWxzZSB7IGNvbnN0IHQgPSBhLmNvbXBvbmVudHNbaV07IGlmIChhLmV4Y2x1ZGVzW3Qua2V5XSlvKCExKTsgZWxzZSB7IGlmICghZSAmJiB0LnBhdXNlQmVmb3JlKSByZXR1cm4gaSAtPSAxLCB2b2lkIHNldFRpbWVvdXQoKCkgPT4geyBvKCEwKTsgfSwgMSk7IHRyeSB7IHQuZ2V0RGF0YSgoZSkgPT4geyByLmFkZFByZXByb2Nlc3NlZENvbXBvbmVudCh0LmtleSwgZSksIG8oITEpOyB9LCBhKTsgfSBjYXRjaCAoZSkgeyByLmFkZFByZXByb2Nlc3NlZENvbXBvbmVudCh0LmtleSwgU3RyaW5nKGUpKSwgbyghMSk7IH0gfSB9IH07IG8oITEpOyB9LCBVLmdldFByb21pc2UgPSBmdW5jdGlvbiAoYSkgeyByZXR1cm4gbmV3IFByb21pc2UoKChlLCB0KSA9PiB7IFUuZ2V0KGEsIGUpOyB9KSk7IH0sIFUuZ2V0VjE4ID0gZnVuY3Rpb24gKGksIG8pIHsgcmV0dXJuIG8gPT0gbnVsbCAmJiAobyA9IGksIGkgPSB7fSksIFUuZ2V0KGksIChlKSA9PiB7IGZvciAodmFyIHQgPSBbXSwgYSA9IDA7IGEgPCBlLmxlbmd0aDsgYSsrKSB7IGNvbnN0IG4gPSBlW2FdOyBpZiAobi52YWx1ZSA9PT0gKGkuTk9UX0FWQUlMQUJMRSB8fCAnbm90IGF2YWlsYWJsZScpKXQucHVzaCh7IGtleTogbi5rZXksIHZhbHVlOiAndW5rbm93bicgfSk7IGVsc2UgaWYgKG4ua2V5ID09PSAncGx1Z2lucycpdC5wdXNoKHsga2V5OiAncGx1Z2lucycsIHZhbHVlOiBzKG4udmFsdWUsIChlKSA9PiB7IGNvbnN0IHQgPSBzKGVbMl0sIChlKSA9PiB7IHJldHVybiBlLmpvaW4gPyBlLmpvaW4oJ34nKSA6IGU7IH0pLmpvaW4oJywnKTsgcmV0dXJuIFtlWzBdLCBlWzFdLCB0XS5qb2luKCc6OicpOyB9KSB9KTsgZWxzZSBpZiAoWydjYW52YXMnLCAnd2ViZ2wnXS5pbmRleE9mKG4ua2V5KSAhPT0gLTEpdC5wdXNoKHsga2V5OiBuLmtleSwgdmFsdWU6IG4udmFsdWUuam9pbignficpIH0pOyBlbHNlIGlmIChbJ3Nlc3Npb25TdG9yYWdlJywgJ2xvY2FsU3RvcmFnZScsICdpbmRleGVkRGInLCAnYWRkQmVoYXZpb3InLCAnb3BlbkRhdGFiYXNlJ10uaW5kZXhPZihuLmtleSkgIT09IC0xKSB7IGlmICghbi52YWx1ZSkgY29udGludWU7IHQucHVzaCh7IGtleTogbi5rZXksIHZhbHVlOiAxIH0pOyB9IGVsc2Ugbi52YWx1ZSA/IHQucHVzaChuLnZhbHVlLmpvaW4gPyB7IGtleTogbi5rZXksIHZhbHVlOiBuLnZhbHVlLmpvaW4oJzsnKSB9IDogbikgOiB0LnB1c2goeyBrZXk6IG4ua2V5LCB2YWx1ZTogbi52YWx1ZSB9KTsgfSBjb25zdCByID0gbChzKHQsIChlKSA9PiB7IHJldHVybiBlLnZhbHVlOyB9KS5qb2luKCd+fn4nKSwgMzEpOyBvKHIsIHQpOyB9KTsgfSwgVS54NjRoYXNoMTI4ID0gbCwgVS5WRVJTSU9OID0gJzIuMS4wJywgVTtcbn0pKTtcbiIsImNvbnN0IGNvbmZpZyA9IHtcblx0QVBJX1VSTDogJ2h0dHBzOi8vc2hpcC1wcm9kLTYyN2VkMDhmNDg5YTk3MDAxMzU3MmY1ZC5wYXJhbGVjdC5uZXQnLFxuXHRBUElfVVJMX0RFVjogJ2h0dHBzOi8vc2hpcC02MjdlZDA4ZjQ4OWE5NzAwMTM1NzJmNWQucGFyYWxlY3QubmV0J1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5cbmNvbnN0IEFQSV9VUkwgPSBwcm9jZXNzLmVudi5CVUlMRCA9PT0gJ2RldicgPyBjb25maWcuQVBJX1VSTF9ERVYgOiBjb25maWcuQVBJX1VSTDtcbi8vIGNvbnN0IEFQSV9VUkwgPSBjb25maWcuQVBJX1VSTF9ERVY7XG5cbmNvbnN0IENMQVNTX0RJVklERVIgPSAvIC9nO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9ERUJPVU5DRV9USU1FID0gNTAwO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfVEhST1RUTEVfVElNRSA9IDEwMDA7XG5cbmNvbnN0IGdldFBhcmVudHMgPSAoZWxlbWVudCkgPT4ge1xuXHRjb25zdCBwYXJlbnRzID0gW107XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG5cdGZvciAoOyBlbGVtZW50ICYmIGVsZW1lbnQgIT09IGRvY3VtZW50OyBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlKSB7XG5cdFx0cGFyZW50cy5wdXNoKGVsZW1lbnQpO1xuXHR9XG5cblx0cmV0dXJuIHBhcmVudHM7XG59O1xuXG5jb25zdCBnZXRDb3VudFNhbWVOb2RlTmFtZSA9IChlbGVtZW50c0FycmF5LCBlbGVtZW50KSA9PiB7XG5cdGxldCBjb3VudCA9IDA7XG5cblx0Wy4uLmVsZW1lbnRzQXJyYXldLmZvckVhY2goKGN1cnJlbnRFbGVtZW50KSA9PiB7XG5cdFx0aWYgKGN1cnJlbnRFbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkge1xuXHRcdFx0Y291bnQgKz0gMTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBjb3VudDtcbn07XG5cbmNvbnN0IGdldE50aE51bWJlciA9IChlbGVtZW50KSA9PiB7XG5cdGxldCBudGggPSAxO1xuXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25kLWFzc2lnbixuby1wYXJhbS1yZWFzc2lnblxuXHR3aGlsZSAoKGVsZW1lbnQgPSBlbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcpKSB7XG5cdFx0bnRoICs9IDE7XG5cdH1cblxuXHRyZXR1cm4gbnRoO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldENzc1BhdGggPSAoZWxlbWVudCkgPT4ge1xuXHRsZXQgZWxlbWVudFBhcmVudHMgPSBnZXRQYXJlbnRzKGVsZW1lbnQpO1xuXHRlbGVtZW50UGFyZW50cyA9IGVsZW1lbnRQYXJlbnRzLnNwbGljZSgwLCBlbGVtZW50UGFyZW50cy5sZW5ndGggLSAxKTtcblxuXHRjb25zdCBzZWxlY3RvcnNBcnJheSA9IFtdO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudFBhcmVudHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRjb25zdCBlbGVtZW50SXRlbSA9IGVsZW1lbnRQYXJlbnRzW2ldO1xuXG5cdFx0Y29uc3Qgbm9kZU5hbWUgPSBlbGVtZW50SXRlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0bGV0IGlkID0gJyc7XG5cdFx0bGV0IHNlbGVjdG9yID0gJyc7XG5cblx0XHRpZiAoZWxlbWVudEl0ZW0uaWQpIHtcblx0XHRcdGlkID0gYCMke2VsZW1lbnRJdGVtLmlkfWA7XG5cdFx0fVxuXG5cdFx0aWYgKGlkKSB7XG5cdFx0XHRzZWxlY3RvciA9IGlkO1xuXHRcdFx0c2VsZWN0b3JzQXJyYXkucHVzaChzZWxlY3Rvcik7XG5cdFx0XHRicmVhaztcblx0XHR9IGVsc2Uge1xuXHRcdFx0c2VsZWN0b3IgPSBub2RlTmFtZTtcblx0XHRcdGNvbnN0IHsgcGFyZW50Tm9kZSB9ID0gZWxlbWVudEl0ZW07XG5cblx0XHRcdGlmIChwYXJlbnROb2RlKSB7XG5cdFx0XHRcdGNvbnN0IHNpYmxpbmcgPSBwYXJlbnROb2RlLmNoaWxkcmVuO1xuXHRcdFx0XHRjb25zdCBjb3VudFNhbWVOb2RlTmFtZSA9IGdldENvdW50U2FtZU5vZGVOYW1lKHNpYmxpbmcsIGVsZW1lbnRJdGVtKTtcblxuXHRcdFx0XHRpZiAoc2libGluZy5sZW5ndGggPiAxICYmIGNvdW50U2FtZU5vZGVOYW1lID4gMSkge1xuXHRcdFx0XHRcdGNvbnN0IGNsYXNzTmFtZXMgPSBlbGVtZW50SXRlbS5jbGFzc05hbWVcblx0XHRcdFx0XHRcdD8gYC4ke2VsZW1lbnRJdGVtLmNsYXNzTmFtZS5yZXBsYWNlKENMQVNTX0RJVklERVIsICcuJyl9YFxuXHRcdFx0XHRcdFx0OiAnJztcblxuXHRcdFx0XHRcdGlmIChjbGFzc05hbWVzKSB7XG5cdFx0XHRcdFx0XHRzZWxlY3RvciArPSBjbGFzc05hbWVzO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb25zdCBudGhOdW1iZXIgPSBnZXROdGhOdW1iZXIoZWxlbWVudEl0ZW0pO1xuXHRcdFx0XHRcdFx0c2VsZWN0b3IgKz0gYDpudGgtY2hpbGQoJHtudGhOdW1iZXJ9KWA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c2VsZWN0b3JzQXJyYXkucHVzaChzZWxlY3Rvcik7XG5cdH1cblxuXHRjb25zdCByZXN1bHRQYXRoID0gc2VsZWN0b3JzQXJyYXkucmV2ZXJzZSgpLmpvaW4oJyA+ICcpO1xuXG5cdHJldHVybiByZXN1bHRQYXRoO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFZhbHVlID0gKGVsZW1lbnQpID0+IHtcblx0cmV0dXJuIGAke2VsZW1lbnQudmFsdWUgfHwgZWxlbWVudC5pbm5lclRleHQgfHwgJyd9YDtcbn07XG5cbmV4cG9ydCBjb25zdCBzZW5kRGF0YSA9ICh1cmwsIGRhdGEpID0+XG5cdGZldGNoKGAke0FQSV9VUkx9LyR7dXJsfWAsIHtcblx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRoZWFkZXJzOiB7XG5cdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0fSxcblx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKVxuXHR9KS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKTtcblxuZXhwb3J0IGNvbnN0IHNlbmRUcmFja0RhdGEgPSAodXNlckRhdGEsIHVybCwgZGF0YSkgPT5cblx0c2VuZERhdGEodXJsLCB7XG5cdFx0Li4uZGF0YSxcblx0XHRwcm9qZWN0SWQ6IHVzZXJEYXRhLnByb2plY3RJZCxcblx0XHR2aXNpdG9ySWQ6IHVzZXJEYXRhLnZpc2l0b3JJZCxcblx0XHRzZXNzaW9uSWQ6IHVzZXJEYXRhLnNlc3Npb25JZFxuXHR9KS50aGVuKCh0cmFja0RhdGEpID0+IHtcblx0XHRpZiAodHJhY2tEYXRhLnNlc3Npb25JZCkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG5cdFx0XHR1c2VyRGF0YS5zZXNzaW9uSWQgPSB0cmFja0RhdGEuc2Vzc2lvbklkO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cmFja0RhdGE7XG5cdH0pO1xuXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJIYW5kbGVycyA9ICh1c2VyRGF0YSwgaGFuZGxlcnMpID0+IHtcblx0aGFuZGxlcnMuZm9yRWFjaCgoaGFuZGxlcikgPT4gaGFuZGxlcih1c2VyRGF0YSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlYm91bmNlID0gKGZ1bmMsIGRlbGF5KSA9PiB7XG5cdGxldCBibG9ja2VySWQ7XG5cblx0cmV0dXJuIChhcmdzKSA9PiB7XG5cdFx0Y2xlYXJUaW1lb3V0KGJsb2NrZXJJZCk7XG5cdFx0YmxvY2tlcklkID0gc2V0VGltZW91dCgoKSA9PiBmdW5jKGFyZ3MpLCBkZWxheSk7XG5cdH07XG59O1xuXG5leHBvcnQgY29uc3QgdGhyb3R0bGUgPSAoZnVuYywgbGltaXQpID0+IHtcblx0bGV0IGlzQmxvY2tlZCA9IGZhbHNlO1xuXG5cdHJldHVybiAoYXJncykgPT4ge1xuXHRcdGlmIChpc0Jsb2NrZWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRmdW5jKGFyZ3MpO1xuXG5cdFx0aXNCbG9ja2VkID0gdHJ1ZTtcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdGlzQmxvY2tlZCA9IGZhbHNlO1xuXHRcdH0sIGxpbWl0KTtcblx0fTtcbn07XG5cbmNvbnN0IGluY2x1ZGVzID0gKGhheXN0YWNrLCBuZWVkbGUpID0+IHtcblx0cmV0dXJuIGhheXN0YWNrLmluZGV4T2YobmVlZGxlKSAhPT0gLTE7XG59O1xuXG5jb25zdCBmaW5kID0gKG5lZWRsZSkgPT4ge1xuXHRyZXR1cm4gaW5jbHVkZXMobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvY2FsZUxvd2VyQ2FzZSgpLCBuZWVkbGUpO1xufTtcblxuY29uc3Qgd2luZG93cyA9ICgpID0+IHtcblx0cmV0dXJuIGZpbmQoJ3dpbmRvd3MnKTtcbn07XG5cbmNvbnN0IGxpbnV4ID0gKCkgPT4ge1xuXHRyZXR1cm4gZmluZCgnbGludXgnKTtcbn07XG5cbmNvbnN0IGlwaG9uZSA9ICgpID0+IHtcblx0cmV0dXJuICF3aW5kb3dzKCkgJiYgZmluZCgnaXBob25lJyk7XG59O1xuXG5jb25zdCBpcG9kID0gKCkgPT4ge1xuXHRyZXR1cm4gZmluZCgnaXBvZCcpO1xufTtcblxuY29uc3QgaXBhZCA9ICgpID0+IHtcblx0Y29uc3QgaVBhZE9TMTNVcCA9IG5hdmlnYXRvci5wbGF0Zm9ybSA9PT0gJ01hY0ludGVsJyAmJiBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAxO1xuXHRyZXR1cm4gZmluZCgnaXBhZCcpIHx8IGlQYWRPUzEzVXA7XG59O1xuXG5jb25zdCBpb3MgPSAoKSA9PiB7XG5cdHJldHVybiBpcGhvbmUoKSB8fCBpcG9kKCkgfHwgaXBhZCgpO1xufTtcblxuY29uc3QgbWFjb3MgPSAoKSA9PiB7XG5cdHJldHVybiBmaW5kKCdtYWMnKTtcbn07XG5cbmNvbnN0IGFuZHJvaWQgPSAoKSA9PiB7XG5cdHJldHVybiAhd2luZG93cygpICYmIGZpbmQoJ2FuZHJvaWQnKTtcbn07XG5cbmNvbnN0IGFuZHJvaWRQaG9uZSA9ICgpID0+IHtcblx0cmV0dXJuIGFuZHJvaWQoKSAmJiBmaW5kKCdtb2JpbGUnKTtcbn07XG5cbmNvbnN0IGFuZHJvaWRUYWJsZXQgPSAoKSA9PiB7XG5cdHJldHVybiBhbmRyb2lkKCkgJiYgIWZpbmQoJ21vYmlsZScpO1xufTtcblxuY29uc3QgYmxhY2tiZXJyeSA9ICgpID0+IHtcblx0cmV0dXJuIGZpbmQoJ2JsYWNrYmVycnknKSB8fCBmaW5kKCdiYjEwJyk7XG59O1xuXG5jb25zdCBibGFja2JlcnJ5UGhvbmUgPSAoKSA9PiB7XG5cdHJldHVybiBibGFja2JlcnJ5KCkgJiYgIWZpbmQoJ3RhYmxldCcpO1xufTtcblxuY29uc3QgYmxhY2tiZXJyeVRhYmxldCA9ICgpID0+IHtcblx0cmV0dXJuIGJsYWNrYmVycnkoKSAmJiBmaW5kKCd0YWJsZXQnKTtcbn07XG5cbmNvbnN0IHdpbmRvd3NQaG9uZSA9ICgpID0+IHtcblx0cmV0dXJuIHdpbmRvd3MoKSAmJiBmaW5kKCdwaG9uZScpO1xufTtcblxuY29uc3Qgd2luZG93c1RhYmxldCA9ICgpID0+IHtcblx0cmV0dXJuIHdpbmRvd3MoKSAmJiBmaW5kKCd0b3VjaCcpICYmICF3aW5kb3dzUGhvbmUoKTtcbn07XG5cbmNvbnN0IGZ4b3MgPSAoKSA9PiB7XG5cdHJldHVybiAoZmluZCgnKG1vYmlsZScpIHx8IGZpbmQoJyh0YWJsZXQnKSkgJiYgZmluZCgnIHJ2OicpO1xufTtcblxuY29uc3QgZnhvc1Bob25lID0gKCkgPT4ge1xuXHRyZXR1cm4gZnhvcygpICYmIGZpbmQoJ21vYmlsZScpO1xufTtcblxuY29uc3QgZnhvc1RhYmxldCA9ICgpID0+IHtcblx0cmV0dXJuIGZ4b3MoKSAmJiBmaW5kKCd0YWJsZXQnKTtcbn07XG5cbmNvbnN0IG1lZWdvID0gKCkgPT4ge1xuXHRyZXR1cm4gZmluZCgnbWVlZ28nKTtcbn07XG5cbmNvbnN0IG1vYmlsZSA9ICgpID0+IHtcblx0cmV0dXJuIChcblx0XHRhbmRyb2lkUGhvbmUoKSB8fFxuXHRcdGlwaG9uZSgpIHx8XG5cdFx0aXBvZCgpIHx8XG5cdFx0d2luZG93c1Bob25lKCkgfHxcblx0XHRibGFja2JlcnJ5UGhvbmUoKSB8fFxuXHRcdGZ4b3NQaG9uZSgpIHx8XG5cdFx0bWVlZ28oKVxuXHQpO1xufTtcblxuY29uc3QgdGFibGV0ID0gKCkgPT4ge1xuXHRyZXR1cm4gaXBhZCgpIHx8IGFuZHJvaWRUYWJsZXQoKSB8fCBibGFja2JlcnJ5VGFibGV0KCkgfHwgd2luZG93c1RhYmxldCgpIHx8IGZ4b3NUYWJsZXQoKTtcbn07XG5cbmNvbnN0IGRlc2t0b3AgPSAoKSA9PiB7XG5cdHJldHVybiAhdGFibGV0KCkgJiYgIW1vYmlsZSgpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldERldmljZVR5cGUgPSAoKSA9PiB7XG5cdGlmIChkZXNrdG9wKCkpIHtcblx0XHRyZXR1cm4gJ2Rlc2t0b3AnO1xuXHR9XG5cblx0aWYgKHRhYmxldCgpKSB7XG5cdFx0cmV0dXJuICd0YWJsZXQnO1xuXHR9XG5cblx0aWYgKG1vYmlsZSgpKSB7XG5cdFx0cmV0dXJuICdtb2JpbGUnO1xuXHR9XG5cblx0cmV0dXJuICd1bmtub3duJztcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRPUyA9ICgpID0+IHtcblx0aWYgKGlvcygpKSB7XG5cdFx0cmV0dXJuICdpb3MnO1xuXHR9XG5cblx0aWYgKGFuZHJvaWQoKSkge1xuXHRcdHJldHVybiAnYW5kcm9pZCc7XG5cdH1cblxuXHRpZiAoYmxhY2tiZXJyeSgpKSB7XG5cdFx0cmV0dXJuICdibGFja2JlcnJ5Jztcblx0fVxuXG5cdGlmIChtYWNvcygpKSB7XG5cdFx0cmV0dXJuICdtYWNvcyc7XG5cdH1cblxuXHRpZiAod2luZG93cygpKSB7XG5cdFx0cmV0dXJuICd3aW5kb3dzJztcblx0fVxuXG5cdGlmIChsaW51eCgpKSB7XG5cdFx0cmV0dXJuICdsaW51eCc7XG5cdH1cblxuXHRpZiAoZnhvcygpKSB7XG5cdFx0cmV0dXJuICdmeG9zJztcblx0fVxuXG5cdGlmIChtZWVnbygpKSB7XG5cdFx0cmV0dXJuICdtZWVnbyc7XG5cdH1cblxuXHRyZXR1cm4gJ3Vua25vd24nO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXJOYW1lID0gKCkgPT4ge1xuXHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdFZGdlJykgPiAtMSAmJiBuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKCdFZGdlJykgPiAtMSkge1xuXHRcdHJldHVybiAnRWRnZSc7XG5cdH1cblxuXHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdPcGVyYScpICE9PSAtMSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09QUicpICE9PSAtMSkge1xuXHRcdHJldHVybiAnT3BlcmEnO1xuXHR9XG5cblx0aWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lJykgIT09IC0xKSB7XG5cdFx0cmV0dXJuICdDaHJvbWUnO1xuXHR9XG5cblx0aWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignU2FmYXJpJykgIT09IC0xKSB7XG5cdFx0cmV0dXJuICdTYWZhcmknO1xuXHR9XG5cblx0aWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignRmlyZWZveCcpICE9PSAtMSkge1xuXHRcdHJldHVybiAnRmlyZWZveCc7XG5cdH1cblxuXHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdNU0lFJykgIT09IC0xIHx8ICEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlID09PSB0cnVlKSB7XG5cdFx0Ly8gSUYgSUUgPiAxMHtcblx0XHRyZXR1cm4gJ0lFJztcblx0fVxuXG5cdHJldHVybiAndW5rbm93bic7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q29ubmVjdGlvblR5cGUgPSAoKSA9PiB7XG5cdGNvbnN0IGNvbm5lY3Rpb25UeXBlID0gbmF2aWdhdG9yICYmIG5hdmlnYXRvci5jb25uZWN0aW9uICYmIG5hdmlnYXRvci5jb25uZWN0aW9uLnR5cGU7IC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9OZXR3b3JrX0luZm9ybWF0aW9uX0FQSVxuXG5cdHJldHVybiBjb25uZWN0aW9uVHlwZTtcbn07XG4iLCJpbXBvcnQgeyBzZW5kVHJhY2tEYXRhLCBnZXRDc3NQYXRoLCBnZXRWYWx1ZSB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCAodXNlckRhdGEpID0+IHtcblx0Y29uc3QgaGFuZGxlQ2xpY2sgPSAoZXZlbnQpID0+IHtcblx0XHRjb25zdCBkYXRhID0ge1xuXHRcdFx0dHlwZTogJ2NsaWNrJyxcblx0XHRcdHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcblx0XHRcdHBheWxvYWQ6IHtcblx0XHRcdFx0cG9zaXRpb246IHtcblx0XHRcdFx0XHR4OiBldmVudC5jbGllbnRYLFxuXHRcdFx0XHRcdHk6IGV2ZW50LmNsaWVudFlcblx0XHRcdFx0fSxcblx0XHRcdFx0c2VsZWN0b3I6IGdldENzc1BhdGgoZXZlbnQudGFyZ2V0KSxcblx0XHRcdFx0dmFsdWU6IGdldFZhbHVlKGV2ZW50LnRhcmdldClcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Ly8gY29ycmVjdHMgY2xpY2xzIGFmdGVyIHNjcm9sbGluZ1xuXHRcdHNlbmRUcmFja0RhdGEodXNlckRhdGEsICd3YXZlQWN0aW9ucycsIHtcblx0XHRcdHR5cGU6ICdwYWdlU2Nyb2xsJyxcblx0XHRcdHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcblx0XHRcdHBheWxvYWQ6IHtcblx0XHRcdFx0b2Zmc2V0OiB7XG5cdFx0XHRcdFx0eDogd2luZG93LnBhZ2VYT2Zmc2V0LFxuXHRcdFx0XHRcdHk6IHdpbmRvdy5wYWdlWU9mZnNldFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRzZW5kVHJhY2tEYXRhKHVzZXJEYXRhLCAnd2F2ZUFjdGlvbnMnLCBkYXRhKTtcblx0fTtcblxuXHRyZXR1cm4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ2xpY2ssIHsgY2FwdHVyZTogdHJ1ZSwgcGFzc2l2ZTogdHJ1ZSB9KTtcbn07XG5cbi8vIGNsaWNrcyBkb2Vzbid0IHdvcmsgb24gZGlzYWJsZWQgZWxlbWVudHMuXG4vLyBodHRwczovL3d3dy53My5vcmcvVFIvMjAxNC9SRUMtaHRtbDUtMjAxNDEwMjgvZm9ybXMuaHRtbCNjb25jZXB0LWZlLWRpc2FibGVkXG4iLCJpbXBvcnQgeyBzZW5kVHJhY2tEYXRhLCBkZWJvdW5jZSwgREVGQVVMVF9ERUJPVU5DRV9USU1FIH0gZnJvbSAnLi4vaGVscGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0ICh1c2VyRGF0YSkgPT4ge1xuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHQncmVzaXplJyxcblx0XHRkZWJvdW5jZShcblx0XHRcdCgpID0+XG5cdFx0XHRcdHNlbmRUcmFja0RhdGEodXNlckRhdGEsICd3YXZlQWN0aW9ucycsIHtcblx0XHRcdFx0XHR0eXBlOiAncmVzaXplJyxcblx0XHRcdFx0XHR0aW1lc3RhbXA6IERhdGUubm93KCksXG5cdFx0XHRcdFx0cGF5bG9hZDoge1xuXHRcdFx0XHRcdFx0c2l6ZToge1xuXHRcdFx0XHRcdFx0XHR3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXG5cdFx0XHRcdFx0XHRcdGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KSxcblx0XHRcdERFRkFVTFRfREVCT1VOQ0VfVElNRVxuXHRcdClcblx0KTtcbn07XG4iLCJpbXBvcnQgeyBzZW5kVHJhY2tEYXRhLCB0aHJvdHRsZSB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5jb25zdCBTQ1JPTExfVEhST1RUTEVfVElNRSA9IDEwMDtcblxuZXhwb3J0IGRlZmF1bHQgKHVzZXJEYXRhKSA9PiB7XG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuXHRcdCdzY3JvbGwnLFxuXHRcdHRocm90dGxlKFxuXHRcdFx0KCkgPT5cblx0XHRcdFx0c2VuZFRyYWNrRGF0YSh1c2VyRGF0YSwgJ3dhdmVBY3Rpb25zJywge1xuXHRcdFx0XHRcdHR5cGU6ICdwYWdlU2Nyb2xsJyxcblx0XHRcdFx0XHR0aW1lc3RhbXA6IERhdGUubm93KCksXG5cdFx0XHRcdFx0cGF5bG9hZDoge1xuXHRcdFx0XHRcdFx0b2Zmc2V0OiB7XG5cdFx0XHRcdFx0XHRcdHg6IHdpbmRvdy5wYWdlWE9mZnNldCxcblx0XHRcdFx0XHRcdFx0eTogd2luZG93LnBhZ2VZT2Zmc2V0XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KSxcblx0XHRcdFNDUk9MTF9USFJPVFRMRV9USU1FXG5cdFx0KVxuXHQpO1xufTtcbiIsImltcG9ydCB7IHNlbmRUcmFja0RhdGEsIHRocm90dGxlIH0gZnJvbSAnLi4vaGVscGVycyc7XG5cbi8vIFByb2JhYmx5IHdlIG5lZWQgaXQgbGVzcyB0aGFuIDIwMG1zXG4vLyBmb3IgYmV0dGVyIHF1YWxpdHkgb2YgXCJWaXNpdG9yIEFjdGlvbnMgUGxheWVyXCJcbmNvbnN0IE1PVVNFX01PVkVfVEhST1RUTEVfVElNRSA9IDEwMDtcblxuY29uc3QgQUNUSU9OX1NFTkRfSU5URVJWQUwgPSAzMDAwO1xuXG5jb25zdCBldmVudEJ1ZmZlciA9IHtcblx0ZGF0YTogW10sXG5cdGxhdGVzdFNlbmQ6IERhdGUubm93KClcbn07XG5cbmNvbnN0IG1vdXNlTW92ZUhhbmRsZXIgPSAodXNlckRhdGEpID0+IHtcblx0ZnVuY3Rpb24gaGFuZGxlRXZlbnQoZXZlbnQpIHtcblx0XHRjb25zdCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuXHRcdGNvbnN0IHJlY29yZCA9IHtcblx0XHRcdHg6IGV2ZW50LmNsaWVudFgsXG5cdFx0XHR5OiBldmVudC5jbGllbnRZLFxuXHRcdFx0dGltZXN0YW1wXG5cdFx0fTtcblxuXHRcdGV2ZW50QnVmZmVyLmRhdGEucHVzaChyZWNvcmQpO1xuXG5cdFx0aWYgKHRpbWVzdGFtcCAtIGV2ZW50QnVmZmVyLmxhdGVzdFNlbmQgPiBBQ1RJT05fU0VORF9JTlRFUlZBTCkge1xuXHRcdFx0Y29uc3QgbWFueVJlY29yZHMgPSB7XG5cdFx0XHRcdHR5cGU6ICdtb3VzZU1vdmUnLFxuXHRcdFx0XHRwYXlsb2FkOiB7XG5cdFx0XHRcdFx0YmF0Y2g6IGV2ZW50QnVmZmVyLmRhdGFcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGV2ZW50QnVmZmVyLmRhdGEgPSBbXTtcblx0XHRcdGV2ZW50QnVmZmVyLmxhdGVzdFNlbmQgPSBEYXRlLm5vdygpO1xuXG5cdFx0XHRzZW5kVHJhY2tEYXRhKHVzZXJEYXRhLCAnd2F2ZUFjdGlvbnMnLCBtYW55UmVjb3Jkcyk7XG5cdFx0fVxuXHR9XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRocm90dGxlKGhhbmRsZUV2ZW50LCBNT1VTRV9NT1ZFX1RIUk9UVExFX1RJTUUpKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1vdXNlTW92ZUhhbmRsZXI7XG4iLCJpbXBvcnQgeyBzZW5kVHJhY2tEYXRhIH0gZnJvbSAnLi4vaGVscGVycyc7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVMb2NhdGlvbkNoYW5nZSA9ICh1c2VyRGF0YSkgPT4ge1xuXHRjb25zdCB7IGhyZWYgfSA9IHdpbmRvdy5sb2NhdGlvbjtcblxuXHRjb25zdCBhY3Rpb25EYXRhID0ge1xuXHRcdHR5cGU6ICdwYXRoQ2hhbmdlJyxcblx0XHR0aW1lc3RhbXA6IERhdGUubm93KCksXG5cdFx0cGF5bG9hZDoge1xuXHRcdFx0dmFsdWU6IGhyZWZcblx0XHR9XG5cdH07XG5cblx0c2VuZFRyYWNrRGF0YSh1c2VyRGF0YSwgJ3dhdmVBY3Rpb25zJywgYWN0aW9uRGF0YSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCAodXNlckRhdGEpID0+IHtcblx0d2luZG93Lmhpc3RvcnkucHVzaFN0YXRlID0gKChmKSA9PlxuXHRcdGZ1bmN0aW9uIHB1c2hTdGF0ZSguLi5hcmcpIHtcblx0XHRcdGNvbnN0IHJldCA9IGYuYXBwbHkodGhpcywgYXJnKTtcblxuXHRcdFx0d2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdsb2NhdGlvbmNoYW5nZScpKTtcblxuXHRcdFx0cmV0dXJuIHJldDtcblx0XHR9KSh3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUpO1xuXG5cdHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSA9ICgoZikgPT5cblx0XHRmdW5jdGlvbiByZXBsYWNlU3RhdGUoLi4uYXJnKSB7XG5cdFx0XHRjb25zdCByZXQgPSBmLmFwcGx5KHRoaXMsIGFyZyk7XG5cblx0XHRcdHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9jYXRpb25jaGFuZ2UnKSk7XG5cblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fSkod2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKTtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCAoKSA9PiB7XG5cdFx0d2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdsb2NhdGlvbmNoYW5nZScpKTtcblx0fSk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCAoKSA9PiB7XG5cdFx0d2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdsb2NhdGlvbmNoYW5nZScpKTtcblx0fSk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BhZ2VzaG93JywgKCkgPT4ge1xuXHRcdHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9jYXRpb25jaGFuZ2UnKSk7XG5cdH0pO1xuXG5cdHJldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9jYXRpb25jaGFuZ2UnLCAoKSA9PiBoYW5kbGVMb2NhdGlvbkNoYW5nZSh1c2VyRGF0YSkpO1xufTtcbiIsImltcG9ydCB7IHNlbmRUcmFja0RhdGEgfSBmcm9tICcuLi9oZWxwZXJzJztcblxuY29uc3QgcmVtb3ZlVGFncyA9IChub2RlLCB0YWdOYW1lKSA9PiB7XG5cdGNvbnN0IG5vZGVDbG9uZWQgPSBub2RlLmNsb25lTm9kZSh0cnVlKTtcblx0Y29uc3QgdGFncyA9IG5vZGVDbG9uZWQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnTmFtZSk7XG5cblx0d2hpbGUgKHRhZ3MubGVuZ3RoKSB7XG5cdFx0dGFnc1swXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhZ3NbMF0pO1xuXHR9XG5cblx0cmV0dXJuIG5vZGVDbG9uZWQ7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRGFuZ2Vyb3VzVGFncyA9IChub2RlKSA9PiB7XG5cdGNvbnN0IHJvb3RXaXRob3V0U2NyaXB0cyA9IHJlbW92ZVRhZ3Mobm9kZSwgJ3NjcmlwdCcpO1xuXHRjb25zdCByb290V2l0aG91dElmcmFtZXMgPSByZW1vdmVUYWdzKHJvb3RXaXRob3V0U2NyaXB0cywgJ2lmcmFtZScpO1xuXHRyZXR1cm4gcm9vdFdpdGhvdXRJZnJhbWVzO1xufTtcblxubGV0IHByZXZXaWR0aDtcbmxldCBwcmV2SGVpZ2h0O1xuXG5jb25zdCBoYW5kbGVNdXRhdGlvbiA9ICh1c2VyRGF0YSkgPT4ge1xuXHRjb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXTtcblx0aWYgKCFyb290KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Wy4uLnJvb3QucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKV0uZm9yRWFjaCgoZWwpID0+IHtcblx0XHRpZiAoIWVsLmdldEF0dHJpYnV0ZSgndmFsdWUnKSAmJiBlbC52YWx1ZSkge1xuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKCd2YWx1ZScsIGVsLnZhbHVlKTtcblx0XHR9XG5cdH0pO1xuXG5cdGNvbnN0IHJvb3RXaXRob3V0RGFuZ2Vyb3VzVGFncyA9IHJlbW92ZURhbmdlcm91c1RhZ3Mocm9vdCk7XG5cdGNvbnN0IHNjcmVlbiA9IHJvb3RXaXRob3V0RGFuZ2Vyb3VzVGFncy5vdXRlckhUTUw7XG5cblx0Y29uc3Qgd2lkdGggPSByb290Lm9mZnNldFdpZHRoO1xuXHRjb25zdCBoZWlnaHQgPSByb290Lm9mZnNldEhlaWdodDtcblxuXHRpZiAocHJldldpZHRoICE9PSB3aWR0aCAmJiBwcmV2SGVpZ2h0ICE9PSBoZWlnaHQpIHtcblx0XHRzZW5kVHJhY2tEYXRhKHVzZXJEYXRhLCAnd2F2ZVJlY29yZHMnLCB7XG5cdFx0XHR0aW1lc3RhbXA6IERhdGUubm93KCksXG5cdFx0XHRwYXlsb2FkOiB7XG5cdFx0XHRcdHNpemU6IHtcblx0XHRcdFx0XHR3aWR0aCxcblx0XHRcdFx0XHRoZWlnaHRcblx0XHRcdFx0fSxcblx0XHRcdFx0c2NyZWVuXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRwcmV2V2lkdGggPSB3aWR0aDtcblx0XHRwcmV2SGVpZ2h0ID0gaGVpZ2h0O1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVNdXRhdGlvbjtcbiIsImltcG9ydCB7IGRlYm91bmNlLCBERUZBVUxUX0RFQk9VTkNFX1RJTUUgfSBmcm9tICcuLi9oZWxwZXJzJztcblxuaW1wb3J0IGhhbmRsZU11dGF0aW9uIGZyb20gJy4vbXV0YXRpb24nO1xuXG5jb25zdCBpbml0ID0gKHVzZXJEYXRhKSA9PiB7XG4gIGNvbnN0IE11dGF0aW9uT2JzZXJ2ZXIgPSB3aW5kb3cuTXV0YXRpb25PYnNlcnZlclxuICB8fCB3aW5kb3cuV2ViS2l0TXV0YXRpb25PYnNlcnZlclxuICB8fCB3aW5kb3cuTW96TXV0YXRpb25PYnNlcnZlcjtcblxuICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKFxuICAgIGRlYm91bmNlKCgpID0+IGhhbmRsZU11dGF0aW9uKHVzZXJEYXRhKSwgREVGQVVMVF9ERUJPVU5DRV9USU1FKSxcbiAgKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwgeyBzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIGF0dHJpYnV0ZXM6IHRydWUgfSk7XG4gIGhhbmRsZU11dGF0aW9uKHVzZXJEYXRhKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdCxcbn07XG4iLCJpbXBvcnQgJy4vbGliL2ZpbmdlcnByaW50Mi5taW4nO1xuaW1wb3J0IGNsaWNrSGFuZGxlciBmcm9tICcuL2FjdGlvbnMvY2xpY2snO1xuaW1wb3J0IHBhZ2VSZXNpemVIYW5kbGVyIGZyb20gJy4vYWN0aW9ucy9wYWdlUmVzaXplJztcbmltcG9ydCBwYWdlU2Nyb2xsaW5nSGFuZGxlciBmcm9tICcuL2FjdGlvbnMvcGFnZVNjcm9sbGluZyc7XG5pbXBvcnQgbW91c2VNb3ZlSGFuZGxlciBmcm9tICcuL2FjdGlvbnMvbW91c2VNb3ZlJztcbmltcG9ydCBwYXRoQ2hhbmdlSGFuZGxlciwgeyBoYW5kbGVMb2NhdGlvbkNoYW5nZSB9IGZyb20gJy4vYWN0aW9ucy9wYXRoQ2hhbmdlJztcbmltcG9ydCB0cmFja2VyTXV0YXRpb25PYnNlcnZlciBmcm9tICcuL3JlY29yZHMvb2JzZXJ2ZXInO1xuXG5pbXBvcnQge1xuXHRzZW5kRGF0YSxcblx0cmVnaXN0ZXJIYW5kbGVycyxcblx0Z2V0RGV2aWNlVHlwZSxcblx0Z2V0QnJvd3Nlck5hbWUsXG5cdGdldENvbm5lY3Rpb25UeXBlLFxuXHRnZXRPU1xufSBmcm9tICcuL2hlbHBlcnMnO1xuXG5pZiAocHJvY2Vzcy5lbnYuQlVJTEQgPT09ICdkZXYnKSB7XG5cdGlmIChGaW5nZXJwcmludDIgJiYgRmluZ2VycHJpbnQyLmdldFYxOCkge1xuXHRcdGNvbnNvbGUubG9nKCdGaW5nZXJwcmludDIuZ2V0VjE4OicsIHR5cGVvZiBGaW5nZXJwcmludDIuZ2V0VjE4KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXHR9IGVsc2Uge1xuXHRcdGNvbnNvbGUuZXJyb3IoJ0ZpbmdlcnByaW50MiBub3QgbG9hZGVkIGNvcnJlY3RseSEnLCBGaW5nZXJwcmludDIpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cdH1cbn1cblxuY29uc3QgZGVmYXVsdEhhbmRsZXJzID0gW1xuXHRjbGlja0hhbmRsZXIsXG5cdHBhZ2VSZXNpemVIYW5kbGVyLFxuXHRwYWdlU2Nyb2xsaW5nSGFuZGxlcixcblx0bW91c2VNb3ZlSGFuZGxlcixcblx0cGF0aENoYW5nZUhhbmRsZXJcbl07XG5cbmNvbnN0IGNhbGNJZGVudGlmaWNhdG9yID0gKCkgPT5cblx0bmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG5cdFx0RmluZ2VycHJpbnQyLmdldFYxOCgocmVzdWx0KSA9PiB7XG5cdFx0XHRpZiAoIXJlc3VsdCkge1xuXHRcdFx0XHRyZWoobmV3IEVycm9yKCdJZGVudGlmaWNhdG9yIG5vdCBjcmVhdGVkIScpKTtcblx0XHRcdH1cblxuXHRcdFx0cmVzKHJlc3VsdCk7XG5cdFx0fSk7XG5cdH0pO1xuXG5jb25zdCBpbml0ID1cblx0KGluaXRpYWxVc2VyRGF0YSwgaGFuZGxlcnMgPSBkZWZhdWx0SGFuZGxlcnMpID0+XG5cdCgpID0+IHtcblx0XHRjb25zdCB1c2VyRGF0YSA9IHsgLi4uaW5pdGlhbFVzZXJEYXRhIH07XG5cblx0XHRyZXR1cm4gY2FsY0lkZW50aWZpY2F0b3IoKVxuXHRcdFx0LnRoZW4oKHZpc2l0b3JJZCkgPT4ge1xuXHRcdFx0XHR1c2VyRGF0YS52aXNpdG9ySWQgPSB2aXNpdG9ySWQ7XG5cblx0XHRcdFx0cmV0dXJuIGZldGNoKCdodHRwczovL2FwaS5pcGlmeS5vcmcnKVxuXHRcdFx0XHRcdC50aGVuKChyZXMpID0+IHJlcy50ZXh0KCkpXG5cdFx0XHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IHBheWxvYWQgPSB7XG5cdFx0XHRcdFx0XHRcdG9zOiBnZXRPUygpLFxuXHRcdFx0XHRcdFx0XHRicm93c2VyTmFtZTogZ2V0QnJvd3Nlck5hbWUoKSxcblx0XHRcdFx0XHRcdFx0ZGV2aWNlVHlwZTogZ2V0RGV2aWNlVHlwZSgpLFxuXHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uVHlwZTogZ2V0Q29ubmVjdGlvblR5cGUoKSxcblx0XHRcdFx0XHRcdFx0aXBBZGRyZXNzOiBkYXRhLFxuXG5cdFx0XHRcdFx0XHRcdHJlZmVycmVyVXJsOiBkb2N1bWVudC5yZWZlcnJlclxuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0Y29uc3Qgc2Vzc2lvbiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3dhdmVfc2Vzc2lvbicpKTtcblx0XHRcdFx0XHRcdGNvbnN0IE9ORV9NSU5VVEVfTVMgPSAxICogNjAgKiAxMDAwO1xuXG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdHNlc3Npb24gJiZcblx0XHRcdFx0XHRcdFx0c2Vzc2lvbi5zZXNzaW9uSWQgJiZcblx0XHRcdFx0XHRcdFx0bmV3IERhdGUoKSAtIG5ldyBEYXRlKHNlc3Npb24udXBkYXRlZE9uKSA8IE9ORV9NSU5VVEVfTVNcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRcdHNlc3Npb25JZDogc2Vzc2lvbi5zZXNzaW9uSWRcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmV0dXJuIHNlbmREYXRhKCd3YXZlU2Vzc2lvbnMvaW5pdCcsIHtcblx0XHRcdFx0XHRcdFx0dmlzaXRvcklkLFxuXHRcdFx0XHRcdFx0XHRkb21haW46IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSxcblx0XHRcdFx0XHRcdFx0cGF5bG9hZCxcblx0XHRcdFx0XHRcdFx0cHJvamVjdElkOiB1c2VyRGF0YS5wcm9qZWN0SWRcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fSlcblx0XHRcdC50aGVuKCh7IHNlc3Npb25JZCB9KSA9PiB7XG5cdFx0XHRcdGlmIChzZXNzaW9uSWQpIHtcblx0XHRcdFx0XHRjb25zdCBzZXRTZXNzaW9uID0gKCkgPT4ge1xuXHRcdFx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXG5cdFx0XHRcdFx0XHRcdCd3YXZlX3Nlc3Npb24nLFxuXHRcdFx0XHRcdFx0XHRKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdFx0XHRcdFx0c2Vzc2lvbklkLFxuXHRcdFx0XHRcdFx0XHRcdHVwZGF0ZWRPbjogbmV3IERhdGUoKVxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0c2V0U2Vzc2lvbigpO1xuXHRcdFx0XHRcdHdpbmRvdy5XQVZFX1NFU1NJT05fSUQgPSBzZXNzaW9uSWQ7XG5cdFx0XHRcdFx0c2V0SW50ZXJ2YWwoc2V0U2Vzc2lvbiwgMTAgKiAxMDAwKTtcblxuXHRcdFx0XHRcdHVzZXJEYXRhLnNlc3Npb25JZCA9IHNlc3Npb25JZDtcblx0XHRcdFx0XHRyZWdpc3RlckhhbmRsZXJzKHVzZXJEYXRhLCBoYW5kbGVycyk7XG5cdFx0XHRcdFx0dHJhY2tlck11dGF0aW9uT2JzZXJ2ZXIuaW5pdCh1c2VyRGF0YSk7XG5cdFx0XHRcdFx0aGFuZGxlTG9jYXRpb25DaGFuZ2UodXNlckRhdGEpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHByb2Nlc3MuZW52LkJVSUxEID09PSAnZGV2Jykge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBzZXNzaW9uSWQgbm90IHNldHRlZDonLCBzZXNzaW9uSWQpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQudGhlbigoKSA9PiAoe1xuXHRcdFx0XHR1c2VyRGF0YVxuXHRcdFx0fSkpO1xuXHR9O1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGluaXRcbn07XG4iLCJpbXBvcnQgdHJhY2tlciBmcm9tICcuL3RyYWNrZXInO1xuXG5leHBvcnQgZGVmYXVsdCAoKCkgPT4ge1xuXHRjb25zdCBwYXJhbXMgPSB3aW5kb3cud2F2ZSAmJiB3aW5kb3cud2F2ZS5wYXJhbXM7XG5cblx0aWYgKHByb2Nlc3MuZW52LkJVSUxEID09PSAnZGV2Jykge1xuXHRcdGNvbnNvbGUubG9nKCdXYXZlIHNjcmlwdCBwYXJhbXM6JywgcGFyYW1zKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXHR9XG5cblx0Ly8gZG9uJ3QgY2hhbmdlIG9iamVjdCdzIGxpbmsuXG5cdGNvbnN0IHVzZXJEYXRhID0ge1xuXHRcdHZpc2l0b3JJZDogbnVsbCxcblx0XHRzZXNzaW9uSWQ6IG51bGwsXG5cdFx0cHJvamVjdElkOiBwYXJhbXMgJiYgcGFyYW1zLnBpZFxuXHR9O1xuXG5cdGlmICh3aW5kb3cucmVxdWVzdElkbGVDYWxsYmFjaykge1xuXHRcdHJlcXVlc3RJZGxlQ2FsbGJhY2sodHJhY2tlci5pbml0KHVzZXJEYXRhKSk7XG5cdH0gZWxzZSB7XG5cdFx0c2V0VGltZW91dCh0cmFja2VyLmluaXQodXNlckRhdGEpLCA1MDApO1xuXHR9XG59KSgpO1xuIl0sIm5hbWVzIjpbImUiLCJ0IiwiYSIsIndpbmRvdyIsImRlZmluZSIsImFtZCIsIm1vZHVsZSIsImV4cG9ydHMiLCJGaW5nZXJwcmludDIiLCJ0aGlzIiwiZCIsImciLCJmIiwiaCIsIm0iLCJUIiwibCIsImxlbmd0aCIsIm4iLCJyIiwiaSIsIm8iLCJzIiwiYyIsInUiLCJjaGFyQ29kZUF0IiwidG9TdHJpbmciLCJzbGljZSIsInByZXByb2Nlc3NvciIsImF1ZGlvIiwidGltZW91dCIsImV4Y2x1ZGVJT1MxMSIsImZvbnRzIiwic3dmQ29udGFpbmVySWQiLCJzd2ZQYXRoIiwidXNlckRlZmluZWRGb250cyIsImV4dGVuZGVkSnNGb250cyIsInNjcmVlbiIsImRldGVjdFNjcmVlbk9yaWVudGF0aW9uIiwicGx1Z2lucyIsInNvcnRQbHVnaW5zRm9yIiwiZXhjbHVkZUlFIiwiZXh0cmFDb21wb25lbnRzIiwiZXhjbHVkZXMiLCJlbnVtZXJhdGVEZXZpY2VzIiwicGl4ZWxSYXRpbyIsImRvTm90VHJhY2siLCJmb250c0ZsYXNoIiwiTk9UX0FWQUlMQUJMRSIsIkVSUk9SIiwiRVhDTFVERUQiLCJBcnJheSIsInByb3RvdHlwZSIsImZvckVhY2giLCJoYXNPd25Qcm9wZXJ0eSIsIm1hcCIsInB1c2giLCJuYXZpZ2F0b3IiLCJtZWRpYURldmljZXMiLCJ3aWR0aCIsImhlaWdodCIsInNvcnQiLCJyZXZlcnNlIiwiYXZhaWxXaWR0aCIsImF2YWlsSGVpZ2h0IiwibmFtZSIsInR5cGUiLCJzdWZmaXhlcyIsImRlc2NyaXB0aW9uIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiQWN0aXZlWE9iamVjdCIsImNvbmNhdCIsInVzZXJBZ2VudCIsIm1hdGNoIiwicCIsInNlc3Npb25TdG9yYWdlIiwidiIsImxvY2FsU3RvcmFnZSIsIkEiLCJpbmRleGVkREIiLCJTIiwiaGFyZHdhcmVDb25jdXJyZW5jeSIsIkMiLCJjcHVDbGFzcyIsIkIiLCJwbGF0Zm9ybSIsInciLCJtc0RvTm90VHJhY2siLCJtYXhUb3VjaFBvaW50cyIsIm1zTWF4VG91Y2hQb2ludHMiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwieSIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsImRpc3BsYXkiLCJnZXRDb250ZXh0IiwicmVjdCIsImlzUG9pbnRJblBhdGgiLCJ0ZXh0QmFzZWxpbmUiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsImRvbnRVc2VGYWtlRm9udEluQ2FudmFzIiwiZm9udCIsImZpbGxUZXh0IiwiZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uIiwiYmVnaW5QYXRoIiwiYXJjIiwiTWF0aCIsIlBJIiwiY2xvc2VQYXRoIiwiZmlsbCIsInRvRGF0YVVSTCIsIkUiLCJjbGVhckNvbG9yIiwiZW5hYmxlIiwiREVQVEhfVEVTVCIsImRlcHRoRnVuYyIsIkxFUVVBTCIsImNsZWFyIiwiQ09MT1JfQlVGRkVSX0JJVCIsIkRFUFRIX0JVRkZFUl9CSVQiLCJGIiwiY3JlYXRlQnVmZmVyIiwiYmluZEJ1ZmZlciIsIkFSUkFZX0JVRkZFUiIsIkZsb2F0MzJBcnJheSIsImJ1ZmZlckRhdGEiLCJTVEFUSUNfRFJBVyIsIml0ZW1TaXplIiwibnVtSXRlbXMiLCJjcmVhdGVQcm9ncmFtIiwiY3JlYXRlU2hhZGVyIiwiVkVSVEVYX1NIQURFUiIsInNoYWRlclNvdXJjZSIsImNvbXBpbGVTaGFkZXIiLCJGUkFHTUVOVF9TSEFERVIiLCJhdHRhY2hTaGFkZXIiLCJsaW5rUHJvZ3JhbSIsInVzZVByb2dyYW0iLCJ2ZXJ0ZXhQb3NBdHRyaWIiLCJnZXRBdHRyaWJMb2NhdGlvbiIsIm9mZnNldFVuaWZvcm0iLCJnZXRVbmlmb3JtTG9jYXRpb24iLCJlbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSIsInZlcnRleFBvc0FycmF5IiwidmVydGV4QXR0cmliUG9pbnRlciIsIkZMT0FUIiwidW5pZm9ybTJmIiwiZHJhd0FycmF5cyIsIlRSSUFOR0xFX1NUUklQIiwiY2FudmFzIiwiZ2V0U3VwcG9ydGVkRXh0ZW5zaW9ucyIsImpvaW4iLCJnZXRQYXJhbWV0ZXIiLCJBTElBU0VEX0xJTkVfV0lEVEhfUkFOR0UiLCJBTElBU0VEX1BPSU5UX1NJWkVfUkFOR0UiLCJBTFBIQV9CSVRTIiwiZ2V0Q29udGV4dEF0dHJpYnV0ZXMiLCJhbnRpYWxpYXMiLCJCTFVFX0JJVFMiLCJERVBUSF9CSVRTIiwiR1JFRU5fQklUUyIsImdldEV4dGVuc2lvbiIsIk1BWF9URVhUVVJFX01BWF9BTklTT1RST1BZX0VYVCIsIk1BWF9DT01CSU5FRF9URVhUVVJFX0lNQUdFX1VOSVRTIiwiTUFYX0NVQkVfTUFQX1RFWFRVUkVfU0laRSIsIk1BWF9GUkFHTUVOVF9VTklGT1JNX1ZFQ1RPUlMiLCJNQVhfUkVOREVSQlVGRkVSX1NJWkUiLCJNQVhfVEVYVFVSRV9JTUFHRV9VTklUUyIsIk1BWF9URVhUVVJFX1NJWkUiLCJNQVhfVkFSWUlOR19WRUNUT1JTIiwiTUFYX1ZFUlRFWF9BVFRSSUJTIiwiTUFYX1ZFUlRFWF9URVhUVVJFX0lNQUdFX1VOSVRTIiwiTUFYX1ZFUlRFWF9VTklGT1JNX1ZFQ1RPUlMiLCJNQVhfVklFV1BPUlRfRElNUyIsIlJFRF9CSVRTIiwiUkVOREVSRVIiLCJTSEFESU5HX0xBTkdVQUdFX1ZFUlNJT04iLCJTVEVOQ0lMX0JJVFMiLCJWRU5ET1IiLCJWRVJTSU9OIiwiVU5NQVNLRURfVkVORE9SX1dFQkdMIiwiVU5NQVNLRURfUkVOREVSRVJfV0VCR0wiLCJnZXRTaGFkZXJQcmVjaXNpb25Gb3JtYXQiLCJ0b0xvd2VyQ2FzZSIsIk0iLCJ4IiwiaW5uZXJIVE1MIiwiY2xhc3NOYW1lIiwiYm9keSIsImFwcGVuZENoaWxkIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIm9mZnNldEhlaWdodCIsInJlbW92ZUNoaWxkIiwiTyIsImxhbmd1YWdlcyIsInN1YnN0ciIsImxhbmd1YWdlIiwiYiIsIlAiLCJvc2NwdSIsImluZGV4T2YiLCJMIiwicHJvZHVjdFN1YiIsImV2YWwiLCJ0b1NvdXJjZSIsIkkiLCJrIiwiV2ViR0xSZW5kZXJpbmdDb250ZXh0IiwiUiIsImFwcE5hbWUiLCJ0ZXN0IiwiRCIsInN3Zm9iamVjdCIsIk4iLCJoYXNGbGFzaFBsYXllclZlcnNpb24iLCJfIiwic2V0QXR0cmlidXRlIiwib25SZWFkeSIsImVtYmVkU1dGIiwiYWxsb3dTY3JpcHRBY2Nlc3MiLCJtZW51IiwiRyIsImtleSIsImdldERhdGEiLCJ3ZWJkcml2ZXIiLCJ1c2VyTGFuZ3VhZ2UiLCJicm93c2VyTGFuZ3VhZ2UiLCJzeXN0ZW1MYW5ndWFnZSIsImNvbG9yRGVwdGgiLCJkZXZpY2VNZW1vcnkiLCJkZXZpY2VQaXhlbFJhdGlvIiwiRGF0ZSIsImdldFRpbWV6b25lT2Zmc2V0IiwiSW50bCIsIkRhdGVUaW1lRm9ybWF0IiwicmVzb2x2ZWRPcHRpb25zIiwidGltZVpvbmUiLCJhZGRCZWhhdmlvciIsIm9wZW5EYXRhYmFzZSIsImZpbHRlciIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwicG9zaXRpb24iLCJsZWZ0IiwiZm9udFNpemUiLCJmb250U3R5bGUiLCJmb250V2VpZ2h0IiwibGV0dGVyU3BhY2luZyIsImxpbmVCcmVhayIsImxpbmVIZWlnaHQiLCJ0ZXh0VHJhbnNmb3JtIiwidGV4dEFsaWduIiwidGV4dERlY29yYXRpb24iLCJ0ZXh0U2hhZG93Iiwid2hpdGVTcGFjZSIsIndvcmRCcmVhayIsIndvcmRTcGFjaW5nIiwib2Zmc2V0V2lkdGgiLCJmb250RmFtaWx5IiwicGF1c2VCZWZvcmUiLCJPZmZsaW5lQXVkaW9Db250ZXh0Iiwid2Via2l0T2ZmbGluZUF1ZGlvQ29udGV4dCIsImNyZWF0ZU9zY2lsbGF0b3IiLCJmcmVxdWVuY3kiLCJzZXRWYWx1ZUF0VGltZSIsImN1cnJlbnRUaW1lIiwiY3JlYXRlRHluYW1pY3NDb21wcmVzc29yIiwiY29ubmVjdCIsImRlc3RpbmF0aW9uIiwic3RhcnQiLCJzdGFydFJlbmRlcmluZyIsInNldFRpbWVvdXQiLCJjb25zb2xlIiwid2FybiIsIm9uY29tcGxldGUiLCJjbGVhclRpbWVvdXQiLCJyZW5kZXJlZEJ1ZmZlciIsImdldENoYW5uZWxEYXRhIiwicmVkdWNlIiwiYWJzIiwiZGlzY29ubmVjdCIsInRoZW4iLCJkZXZpY2VJZCIsImdyb3VwSWQiLCJraW5kIiwibGFiZWwiLCJVIiwiRXJyb3IiLCJnZXQiLCJjYWxsIiwiY29tcG9uZW50cyIsImRhdGEiLCJhZGRQcmVwcm9jZXNzZWRDb21wb25lbnQiLCJ2YWx1ZSIsIlN0cmluZyIsImdldFByb21pc2UiLCJQcm9taXNlIiwiZ2V0VjE4IiwieDY0aGFzaDEyOCIsImNvbmZpZyIsIkFQSV9VUkwiLCJBUElfVVJMX0RFViIsIkNMQVNTX0RJVklERVIiLCJERUZBVUxUX0RFQk9VTkNFX1RJTUUiLCJnZXRQYXJlbnRzIiwiZWxlbWVudCIsInBhcmVudHMiLCJwYXJlbnROb2RlIiwiZ2V0Q291bnRTYW1lTm9kZU5hbWUiLCJlbGVtZW50c0FycmF5IiwiY291bnQiLCJjdXJyZW50RWxlbWVudCIsIm5vZGVOYW1lIiwiZ2V0TnRoTnVtYmVyIiwibnRoIiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImdldENzc1BhdGgiLCJlbGVtZW50UGFyZW50cyIsInNwbGljZSIsInNlbGVjdG9yc0FycmF5IiwiZWxlbWVudEl0ZW0iLCJpZCIsInNlbGVjdG9yIiwic2libGluZyIsImNoaWxkcmVuIiwiY291bnRTYW1lTm9kZU5hbWUiLCJjbGFzc05hbWVzIiwicmVwbGFjZSIsIm50aE51bWJlciIsInJlc3VsdFBhdGgiLCJnZXRWYWx1ZSIsImlubmVyVGV4dCIsInNlbmREYXRhIiwidXJsIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc3BvbnNlIiwianNvbiIsInNlbmRUcmFja0RhdGEiLCJ1c2VyRGF0YSIsIl9vYmplY3RTcHJlYWQiLCJwcm9qZWN0SWQiLCJ2aXNpdG9ySWQiLCJzZXNzaW9uSWQiLCJ0cmFja0RhdGEiLCJyZWdpc3RlckhhbmRsZXJzIiwiaGFuZGxlcnMiLCJoYW5kbGVyIiwiZGVib3VuY2UiLCJmdW5jIiwiZGVsYXkiLCJibG9ja2VySWQiLCJhcmdzIiwidGhyb3R0bGUiLCJsaW1pdCIsImlzQmxvY2tlZCIsImluY2x1ZGVzIiwiaGF5c3RhY2siLCJuZWVkbGUiLCJmaW5kIiwidG9Mb2NhbGVMb3dlckNhc2UiLCJ3aW5kb3dzIiwibGludXgiLCJpcGhvbmUiLCJpcG9kIiwiaXBhZCIsImlQYWRPUzEzVXAiLCJpb3MiLCJtYWNvcyIsImFuZHJvaWQiLCJhbmRyb2lkUGhvbmUiLCJhbmRyb2lkVGFibGV0IiwiYmxhY2tiZXJyeSIsImJsYWNrYmVycnlQaG9uZSIsImJsYWNrYmVycnlUYWJsZXQiLCJ3aW5kb3dzUGhvbmUiLCJ3aW5kb3dzVGFibGV0IiwiZnhvcyIsImZ4b3NQaG9uZSIsImZ4b3NUYWJsZXQiLCJtZWVnbyIsIm1vYmlsZSIsInRhYmxldCIsImRlc2t0b3AiLCJnZXREZXZpY2VUeXBlIiwiZ2V0T1MiLCJnZXRCcm93c2VyTmFtZSIsImFwcFZlcnNpb24iLCJkb2N1bWVudE1vZGUiLCJnZXRDb25uZWN0aW9uVHlwZSIsImNvbm5lY3Rpb25UeXBlIiwiY29ubmVjdGlvbiIsImhhbmRsZUNsaWNrIiwiZXZlbnQiLCJ0aW1lc3RhbXAiLCJub3ciLCJwYXlsb2FkIiwiY2xpZW50WCIsImNsaWVudFkiLCJ0YXJnZXQiLCJvZmZzZXQiLCJwYWdlWE9mZnNldCIsInBhZ2VZT2Zmc2V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNhcHR1cmUiLCJwYXNzaXZlIiwic2l6ZSIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsIlNDUk9MTF9USFJPVFRMRV9USU1FIiwiTU9VU0VfTU9WRV9USFJPVFRMRV9USU1FIiwiQUNUSU9OX1NFTkRfSU5URVJWQUwiLCJldmVudEJ1ZmZlciIsImxhdGVzdFNlbmQiLCJtb3VzZU1vdmVIYW5kbGVyIiwiaGFuZGxlRXZlbnQiLCJyZWNvcmQiLCJtYW55UmVjb3JkcyIsImJhdGNoIiwiaGFuZGxlTG9jYXRpb25DaGFuZ2UiLCJocmVmIiwibG9jYXRpb24iLCJhY3Rpb25EYXRhIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImFyZyIsInJldCIsImFwcGx5IiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwicmVwbGFjZVN0YXRlIiwicmVtb3ZlVGFncyIsIm5vZGUiLCJ0YWdOYW1lIiwibm9kZUNsb25lZCIsImNsb25lTm9kZSIsInRhZ3MiLCJyZW1vdmVEYW5nZXJvdXNUYWdzIiwicm9vdFdpdGhvdXRTY3JpcHRzIiwicm9vdFdpdGhvdXRJZnJhbWVzIiwicHJldldpZHRoIiwicHJldkhlaWdodCIsImhhbmRsZU11dGF0aW9uIiwicm9vdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlbCIsImdldEF0dHJpYnV0ZSIsInJvb3RXaXRob3V0RGFuZ2Vyb3VzVGFncyIsIm91dGVySFRNTCIsImluaXQiLCJNdXRhdGlvbk9ic2VydmVyIiwiV2ViS2l0TXV0YXRpb25PYnNlcnZlciIsIk1vek11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlciIsIm9ic2VydmUiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwiYXR0cmlidXRlcyIsImxvZyIsImVycm9yIiwiZGVmYXVsdEhhbmRsZXJzIiwiY2xpY2tIYW5kbGVyIiwicGFnZVJlc2l6ZUhhbmRsZXIiLCJwYWdlU2Nyb2xsaW5nSGFuZGxlciIsInBhdGhDaGFuZ2VIYW5kbGVyIiwiY2FsY0lkZW50aWZpY2F0b3IiLCJyZXMiLCJyZWoiLCJyZXN1bHQiLCJpbml0aWFsVXNlckRhdGEiLCJ0ZXh0Iiwib3MiLCJicm93c2VyTmFtZSIsImRldmljZVR5cGUiLCJpcEFkZHJlc3MiLCJyZWZlcnJlclVybCIsInJlZmVycmVyIiwic2Vzc2lvbiIsInBhcnNlIiwiZ2V0SXRlbSIsIk9ORV9NSU5VVEVfTVMiLCJ1cGRhdGVkT24iLCJkb21haW4iLCJob3N0bmFtZSIsInNldFNlc3Npb24iLCJzZXRJdGVtIiwiV0FWRV9TRVNTSU9OX0lEIiwic2V0SW50ZXJ2YWwiLCJ0cmFja2VyTXV0YXRpb25PYnNlcnZlciIsInBhcmFtcyIsIndhdmUiLCJwaWQiLCJyZXF1ZXN0SWRsZUNhbGxiYWNrIiwidHJhY2tlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBQUE7RUFDQTs7RUFFQSxDQUFFLFVBQVVBLENBQUMsRUFBRUMsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7SUFDbkIsT0FBT0MsTUFBTSxLQUFLLFdBQVcsSUFBSSxPQUFPQyxNQUFNLEtBQUssVUFBVSxJQUFJQSxNQUFNLENBQUNDLEdBQUcsR0FBR0QsTUFBTSxDQUFDRixDQUFDLENBQUMsR0FBRyxPQUFPSSxNQUFNLEtBQUssV0FBVyxJQUFJQSxNQUFNLENBQUNDLE9BQU8sR0FBR0QsTUFBTSxDQUFDQyxPQUFPLEdBQUdMLENBQUMsRUFBRSxHQUFHRCxDQUFDLENBQUNNLE9BQU8sR0FBR04sQ0FBQyxDQUFDTSxPQUFPLEdBQUdMLENBQUMsRUFBRSxHQUFHRCxDQUFDLENBQUNPLFlBQVksR0FBR04sQ0FBQyxFQUFFLENBQUE7RUFDdk4sQ0FBQyxDQUFDLENBQUMsRUFBRU8sTUFBSSxFQUFFLFlBQU07SUFDZixJQUFNQyxDQUFDLEdBQUcsU0FBSkEsQ0FBQyxDQUFhVixDQUFDLEVBQUVDLENBQUMsRUFBRTtFQUFFRCxJQUFBQSxDQUFDLEdBQUcsQ0FBQ0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLEdBQUcsQ0FBQ0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO01BQUUsSUFBTUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFBRSxJQUFBLE9BQU9BLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQ0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFHLENBQUE7SUFBRSxJQUFNUyxDQUFDLEdBQUcsU0FBSkEsQ0FBQyxDQUFhWCxDQUFDLEVBQUVDLENBQUMsRUFBRTtFQUFFRCxJQUFBQSxDQUFDLEdBQUcsQ0FBQ0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLEdBQUcsQ0FBQ0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO01BQUUsSUFBTUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFBRSxJQUFBLE9BQU9BLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQ0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFHLENBQUE7SUFBRSxJQUFNVSxDQUFDLEdBQUcsU0FBSkEsQ0FBQyxDQUFhWixDQUFDLEVBQUVDLENBQUMsRUFBRTtNQUFFLE9BQU8sQ0FBQ0EsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlDLENBQUMsR0FBR0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBR0MsQ0FBQyxFQUFFRCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlDLENBQUMsR0FBR0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBR0MsQ0FBQyxDQUFDLElBQUlBLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQyxDQUFDLEdBQUdELENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUdDLENBQUMsRUFBRUQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQyxDQUFDLEdBQUdELENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBRyxDQUFBO0lBQUUsSUFBTVksQ0FBQyxHQUFHLFNBQUpBLENBQUMsQ0FBYWIsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7TUFBRSxPQUFPLENBQUNBLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHRCxDQUFDLEdBQUdDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQyxDQUFDLEdBQUdELENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUdDLENBQUMsRUFBRUQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQyxDQUFDLENBQUMsR0FBRyxDQUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7S0FBRyxDQUFBO0lBQUUsSUFBTWEsQ0FBQyxHQUFHLFNBQUpBLENBQUMsQ0FBYWQsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7TUFBRSxPQUFPLENBQUNELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUcsQ0FBQTtFQUFFLEVBQUEsSUFBTWMsQ0FBQyxHQUFHLFNBQUpBLENBQUMsQ0FBYWYsQ0FBQyxFQUFFO0VBQUUsSUFBQSxPQUFPQSxDQUFDLEdBQUdjLENBQUMsQ0FBQ2QsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxHQUFHVyxDQUFDLENBQUNYLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUdjLENBQUMsQ0FBQ2QsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxHQUFHVyxDQUFDLENBQUNYLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUdjLENBQUMsQ0FBQ2QsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFHLENBQUE7RUFBRSxFQUFBLElBQU1nQixDQUFDLEdBQUcsU0FBQSxDQUFBLENBQVVoQixDQUFDLEVBQUVDLENBQUMsRUFBRTtNQUFFQSxDQUFDLEdBQUdBLENBQUMsSUFBSSxDQUFDLENBQUE7TUFBRSxLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFDRixDQUFDLEdBQUdBLENBQUMsSUFBSSxFQUFFLEVBQUVpQixNQUFNLEdBQUcsRUFBRSxFQUFFQyxDQUFDLEdBQUdsQixDQUFDLENBQUNpQixNQUFNLEdBQUdmLENBQUMsRUFBRWlCLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRWxCLENBQUMsQ0FBQyxFQUFFbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFbkIsQ0FBQyxDQUFDLEVBQUVvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUVMLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxFQUFFQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLEVBQUVDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR04sQ0FBQyxFQUFFTSxDQUFDLElBQUksRUFBRSxFQUFDSCxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUdyQixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUVSLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBR2hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUVILENBQUMsR0FBR1YsQ0FBQyxDQUFDVSxDQUFDLEVBQUVDLENBQUMsQ0FBQyxFQUFFRCxDQUFDLEdBQUdULENBQUMsQ0FBQ1MsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFQSxDQUFDLEdBQUdWLENBQUMsQ0FBQ1UsQ0FBQyxFQUFFRSxDQUFDLENBQUMsRUFBRUosQ0FBQyxHQUFHTCxDQUFDLENBQUNLLENBQUMsRUFBRUUsQ0FBQyxDQUFDLEVBQUVGLENBQUMsR0FBR1AsQ0FBQyxDQUFDTyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUVBLENBQUMsR0FBR1QsQ0FBQyxDQUFDUyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxFQUFFRCxDQUFDLEdBQUdULENBQUMsQ0FBQ0MsQ0FBQyxDQUFDUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxFQUFFSCxDQUFDLEdBQUdMLENBQUMsQ0FB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UCxDQUFDLENBQUNPLENBQUMsRUFBRVIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFYixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFBRSxNQUFBLEtBQUssQ0FBQztVQUFFSCxDQUFDLEdBQUdQLENBQUMsQ0FBQ08sQ0FBQyxFQUFFUixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUViLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUFFLE1BQUEsS0FBSyxDQUFDO1VBQUVILENBQUMsR0FBR1AsQ0FBQyxDQUFDTyxDQUFDLEVBQUVSLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRWIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQUUsTUFBQSxLQUFLLENBQUM7VUFBRUgsQ0FBQyxHQUFHUCxDQUFDLENBQUNPLENBQUMsRUFBRVIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFYixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFBRSxNQUFBLEtBQUssQ0FBQztVQUFFSCxDQUFDLEdBQUdQLENBQUMsQ0FBQ08sQ0FBQyxFQUFFUixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUViLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUFFLE1BQUEsS0FBSyxDQUFDO1VBQUVILENBQUMsR0FBR1AsQ0FBQyxDQUFDTyxDQUFDLEVBQUVSLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRWIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENB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QUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJM00sQ0FBQyxLQUFLLFNBQVMsSUFBSUEsQ0FBQyxLQUFLLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO0VBQUUsTUFBQSxJQUFJRSxDQUFDLENBQUN5TSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJM00sQ0FBQyxLQUFLLE9BQU8sSUFBSUEsQ0FBQyxLQUFLLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO0VBQUUsTUFBQSxJQUFJRSxDQUFDLENBQUN5TSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJM00sQ0FBQyxLQUFLLEtBQUssSUFBSUEsQ0FBQyxLQUFLLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO0VBQUUsTUFBQSxJQUFJLENBQUNFLENBQUMsQ0FBQ3lNLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSXpNLENBQUMsQ0FBQ3lNLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSXpNLENBQUMsQ0FBQ3lNLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTTNNLENBQUMsS0FBSyxPQUFPLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO0VBQUUsS0FBQTtFQUFFLElBQUEsT0FBT2tCLENBQUMsQ0FBQ3lMLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUkzTSxDQUFDLEtBQUssU0FBUyxJQUFJQSxDQUFDLEtBQUssZUFBZSxJQUFLLENBQUNrQixDQUFDLENBQUN5TCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJekwsQ0FBQyxDQUFDeUwsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSXpMLENBQUMsQ0FBQ3lMLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUszTSxDQUFDLEtBQUssT0FBTyxJQUFJQSxDQUFDLEtBQUssU0FBUyxJQUFLLENBQUNrQixDQUFDLENBQUN5TCxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJekwsQ0FBQyxDQUFDeUwsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSXpMLENBQUMsQ0FBQ3lMLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUl6TCxDQUFDLENBQUN5TCxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLM00sQ0FBQyxLQUFLLEtBQUssSUFBSUEsQ0FBQyxLQUFLLEtBQUssSUFBSyxDQUFDa0IsQ0FBQyxDQUFDeUwsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSXpMLENBQUMsQ0FBQ3lMLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUl6TCxDQUFDLENBQUN5TCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJekwsQ0FBQyxDQUFDeUwsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSXpMLENBQUMsQ0FBQ3lMLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8zTSxDQUFDLEtBQUssT0FBTyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUt5RCxTQUFTLENBQUNsQixPQUFPLElBQUl2QyxDQUFDLEtBQUssU0FBUyxJQUFJQSxDQUFDLEtBQUssZUFBa0IsQ0FBQTtLQUFHLENBQUE7RUFBRSxFQUFBLElBQU00TSxDQUFDLEdBQUcsU0FBSkEsQ0FBQyxHQUFlO0VBQUUsSUFBQSxJQUFJNU0sQ0FBQyxDQUFBO0VBQUUsSUFBQSxJQUFNQyxDQUFDLEdBQUd3RCxTQUFTLENBQUNnQixTQUFTLENBQUNpSCxXQUFXLEVBQUUsQ0FBQTtFQUFFLElBQUEsSUFBTXhMLENBQUMsR0FBR3VELFNBQVMsQ0FBQ29KLFVBQVUsQ0FBQTtFQUFFLElBQUEsSUFBSSxDQUFDLENBQUM3TSxDQUFDLEdBQUdDLENBQUMsQ0FBQzBNLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHMU0sQ0FBQyxDQUFDME0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSTFNLENBQUMsQ0FBQzBNLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxHQUFHMU0sQ0FBQyxDQUFDME0sT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLEdBQUcxTSxDQUFDLENBQUMwTSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsR0FBRzFNLENBQUMsQ0FBQzBNLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsbUJBQW1CLEdBQUcsT0FBTyxNQUFNLFFBQVEsSUFBSTNNLENBQUMsS0FBSyxRQUFRLElBQUlBLENBQUMsS0FBSyxPQUFPLEtBQUtFLENBQUMsS0FBSyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtFQUFFLElBQUEsSUFBSWdCLENBQUMsQ0FBQTtFQUFFLElBQUEsSUFBTUMsQ0FBQyxHQUFHMkwsSUFBSSxDQUFDcEwsUUFBUSxFQUFFLENBQUNULE1BQU0sQ0FBQTtFQUFFLElBQUEsSUFBSUUsQ0FBQyxLQUFLLEVBQUUsSUFBSW5CLENBQUMsS0FBSyxRQUFRLElBQUlBLENBQUMsS0FBSyxTQUFTLElBQUlBLENBQUMsS0FBSyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtFQUFFLElBQUEsSUFBSW1CLENBQUMsS0FBSyxFQUFFLElBQUluQixDQUFDLEtBQUssbUJBQW1CLElBQUlBLENBQUMsS0FBSyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtFQUFFLElBQUEsSUFBSW1CLENBQUMsS0FBSyxFQUFFLElBQUluQixDQUFDLEtBQUssUUFBUSxJQUFJQSxDQUFDLEtBQUssT0FBTyxJQUFJQSxDQUFDLEtBQUssT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7TUFBRSxJQUFJO0VBQUUsTUFBQSxNQUFNLEdBQUcsQ0FBQTtPQUFHLENBQUMsT0FBT0EsQ0FBQyxFQUFFO1FBQUUsSUFBSTtFQUFFQSxRQUFBQSxDQUFDLENBQUMr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

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
      console.log('Waveloop script params:', params); // eslint-disable-line
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2tlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdHJhY2tlci9zcmMvbGliL2ZpbmdlcnByaW50Mi5taW4uanMiLCIuLi8uLi8uLi8uLi8uLi90cmFja2VyL3NyYy9jb25maWcuanMiLCIuLi8uLi8uLi8uLi8uLi90cmFja2VyL3NyYy9oZWxwZXJzLmpzIiwiLi4vLi4vLi4vLi4vLi4vdHJhY2tlci9zcmMvYWN0aW9ucy9jbGljay5qcyIsIi4uLy4uLy4uLy4uLy4uL3RyYWNrZXIvc3JjL2FjdGlvbnMvcGFnZVJlc2l6ZS5qcyIsIi4uLy4uLy4uLy4uLy4uL3RyYWNrZXIvc3JjL2FjdGlvbnMvcGFnZVNjcm9sbGluZy5qcyIsIi4uLy4uLy4uLy4uLy4uL3RyYWNrZXIvc3JjL2FjdGlvbnMvbW91c2VNb3ZlLmpzIiwiLi4vLi4vLi4vLi4vLi4vdHJhY2tlci9zcmMvYWN0aW9ucy9wYXRoQ2hhbmdlLmpzIiwiLi4vLi4vLi4vLi4vLi4vdHJhY2tlci9zcmMvcmVjb3Jkcy9tdXRhdGlvbi5qcyIsIi4uLy4uLy4uLy4uLy4uL3RyYWNrZXIvc3JjL3JlY29yZHMvb2JzZXJ2ZXIuanMiLCIuLi8uLi8uLi8uLi8uLi90cmFja2VyL3NyYy90cmFja2VyLmpzIiwiLi4vLi4vLi4vLi4vLi4vdHJhY2tlci9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRmluZ2VycHJpbnRqczIgLSBDb3B5cmlnaHQgKGMpIDIwMTkgVmFsZW50aW4gVmFzaWx5ZXYgKHZhbGVudGluLnZhc2lseWV2QG91dGxvb2suY29tKVxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCAoaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHApIGxpY2Vuc2UuXG5cbiEoZnVuY3Rpb24gKGUsIHQsIGEpIHtcbiAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGEpIDogdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMgPyBtb2R1bGUuZXhwb3J0cyA9IGEoKSA6IHQuZXhwb3J0cyA/IHQuZXhwb3J0cyA9IGEoKSA6IHQuRmluZ2VycHJpbnQyID0gYSgpO1xufSgwLCB0aGlzLCAoKSA9PiB7XG4gIGNvbnN0IGQgPSBmdW5jdGlvbiAoZSwgdCkgeyBlID0gW2VbMF0gPj4+IDE2LCA2NTUzNSAmIGVbMF0sIGVbMV0gPj4+IDE2LCA2NTUzNSAmIGVbMV1dLCB0ID0gW3RbMF0gPj4+IDE2LCA2NTUzNSAmIHRbMF0sIHRbMV0gPj4+IDE2LCA2NTUzNSAmIHRbMV1dOyBjb25zdCBhID0gWzAsIDAsIDAsIDBdOyByZXR1cm4gYVszXSArPSBlWzNdICsgdFszXSwgYVsyXSArPSBhWzNdID4+PiAxNiwgYVszXSAmPSA2NTUzNSwgYVsyXSArPSBlWzJdICsgdFsyXSwgYVsxXSArPSBhWzJdID4+PiAxNiwgYVsyXSAmPSA2NTUzNSwgYVsxXSArPSBlWzFdICsgdFsxXSwgYVswXSArPSBhWzFdID4+PiAxNiwgYVsxXSAmPSA2NTUzNSwgYVswXSArPSBlWzBdICsgdFswXSwgYVswXSAmPSA2NTUzNSwgW2FbMF0gPDwgMTYgfCBhWzFdLCBhWzJdIDw8IDE2IHwgYVszXV07IH07IGNvbnN0IGcgPSBmdW5jdGlvbiAoZSwgdCkgeyBlID0gW2VbMF0gPj4+IDE2LCA2NTUzNSAmIGVbMF0sIGVbMV0gPj4+IDE2LCA2NTUzNSAmIGVbMV1dLCB0ID0gW3RbMF0gPj4+IDE2LCA2NTUzNSAmIHRbMF0sIHRbMV0gPj4+IDE2LCA2NTUzNSAmIHRbMV1dOyBjb25zdCBhID0gWzAsIDAsIDAsIDBdOyByZXR1cm4gYVszXSArPSBlWzNdICogdFszXSwgYVsyXSArPSBhWzNdID4+PiAxNiwgYVszXSAmPSA2NTUzNSwgYVsyXSArPSBlWzJdICogdFszXSwgYVsxXSArPSBhWzJdID4+PiAxNiwgYVsyXSAmPSA2NTUzNSwgYVsyXSArPSBlWzNdICogdFsyXSwgYVsxXSArPSBhWzJdID4+PiAxNiwgYVsyXSAmPSA2NTUzNSwgYVsxXSArPSBlWzFdICogdFszXSwgYVswXSArPSBhWzFdID4+PiAxNiwgYVsxXSAmPSA2NTUzNSwgYVsxXSArPSBlWzJdICogdFsyXSwgYVswXSArPSBhWzFdID4+PiAxNiwgYVsxXSAmPSA2NTUzNSwgYVsxXSArPSBlWzNdICogdFsxXSwgYVswXSArPSBhWzFdID4+PiAxNiwgYVsxXSAmPSA2NTUzNSwgYVswXSArPSBlWzBdICogdFszXSArIGVbMV0gKiB0WzJdICsgZVsyXSAqIHRbMV0gKyBlWzNdICogdFswXSwgYVswXSAmPSA2NTUzNSwgW2FbMF0gPDwgMTYgfCBhWzFdLCBhWzJdIDw8IDE2IHwgYVszXV07IH07IGNvbnN0IGYgPSBmdW5jdGlvbiAoZSwgdCkgeyByZXR1cm4gKHQgJT0gNjQpID09PSAzMiA/IFtlWzFdLCBlWzBdXSA6IHQgPCAzMiA/IFtlWzBdIDw8IHQgfCBlWzFdID4+PiAzMiAtIHQsIGVbMV0gPDwgdCB8IGVbMF0gPj4+IDMyIC0gdF0gOiAodCAtPSAzMiwgW2VbMV0gPDwgdCB8IGVbMF0gPj4+IDMyIC0gdCwgZVswXSA8PCB0IHwgZVsxXSA+Pj4gMzIgLSB0XSk7IH07IGNvbnN0IGggPSBmdW5jdGlvbiAoZSwgdCkgeyByZXR1cm4gKHQgJT0gNjQpID09PSAwID8gZSA6IHQgPCAzMiA/IFtlWzBdIDw8IHQgfCBlWzFdID4+PiAzMiAtIHQsIGVbMV0gPDwgdF0gOiBbZVsxXSA8PCB0IC0gMzIsIDBdOyB9OyBjb25zdCBtID0gZnVuY3Rpb24gKGUsIHQpIHsgcmV0dXJuIFtlWzBdIF4gdFswXSwgZVsxXSBeIHRbMV1dOyB9OyBjb25zdCBUID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUgPSBtKGUsIFswLCBlWzBdID4+PiAxXSksIGUgPSBnKGUsIFs0MjgzNTQzNTExLCAzOTgxODA2Nzk3XSksIGUgPSBtKGUsIFswLCBlWzBdID4+PiAxXSksIGUgPSBnKGUsIFszMzAxODgyMzY2LCA0NDQ5ODQ0MDNdKSwgZSA9IG0oZSwgWzAsIGVbMF0gPj4+IDFdKTsgfTsgY29uc3QgbCA9IGZ1bmN0aW9uIChlLCB0KSB7IHQgPSB0IHx8IDA7IGZvciAodmFyIGEgPSAoZSA9IGUgfHwgJycpLmxlbmd0aCAlIDE2LCBuID0gZS5sZW5ndGggLSBhLCByID0gWzAsIHRdLCBpID0gWzAsIHRdLCBvID0gWzAsIDBdLCBsID0gWzAsIDBdLCBzID0gWzIyNzc3MzUzMTMsIDI4OTU1OTUwOV0sIGMgPSBbMTI5MTE2OTA5MSwgNjU4ODcxMTY3XSwgdSA9IDA7IHUgPCBuOyB1ICs9IDE2KW8gPSBbMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyA0KSB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDUpKSA8PCA4IHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgNikpIDw8IDE2IHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgNykpIDw8IDI0LCAyNTUgJiBlLmNoYXJDb2RlQXQodSkgfCAoMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyAxKSkgPDwgOCB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDIpKSA8PCAxNiB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDMpKSA8PCAyNF0sIGwgPSBbMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyAxMikgfCAoMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyAxMykpIDw8IDggfCAoMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyAxNCkpIDw8IDE2IHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgMTUpKSA8PCAyNCwgMjU1ICYgZS5jaGFyQ29kZUF0KHUgKyA4KSB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDkpKSA8PCA4IHwgKDI1NSAmIGUuY2hhckNvZGVBdCh1ICsgMTApKSA8PCAxNiB8ICgyNTUgJiBlLmNoYXJDb2RlQXQodSArIDExKSkgPDwgMjRdLCBvID0gZyhvLCBzKSwgbyA9IGYobywgMzEpLCBvID0gZyhvLCBjKSwgciA9IG0ociwgbyksIHIgPSBmKHIsIDI3KSwgciA9IGQociwgaSksIHIgPSBkKGcociwgWzAsIDVdKSwgWzAsIDEzOTAyMDg4MDldKSwgbCA9IGcobCwgYyksIGwgPSBmKGwsIDMzKSwgbCA9IGcobCwgcyksIGkgPSBtKGksIGwpLCBpID0gZihpLCAzMSksIGkgPSBkKGksIHIpLCBpID0gZChnKGksIFswLCA1XSksIFswLCA5NDQzMzE0NDVdKTsgc3dpdGNoIChvID0gWzAsIDBdLCBsID0gWzAsIDBdLCBhKSB7IGNhc2UgMTU6IGwgPSBtKGwsIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgMTQpXSwgNDgpKTsgY2FzZSAxNDogbCA9IG0obCwgaChbMCwgZS5jaGFyQ29kZUF0KHUgKyAxMyldLCA0MCkpOyBjYXNlIDEzOiBsID0gbShsLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDEyKV0sIDMyKSk7IGNhc2UgMTI6IGwgPSBtKGwsIGgoWzAsIGUuY2hhckNvZGVBdCh1ICsgMTEpXSwgMjQpKTsgY2FzZSAxMTogbCA9IG0obCwgaChbMCwgZS5jaGFyQ29kZUF0KHUgKyAxMCldLCAxNikpOyBjYXNlIDEwOiBsID0gbShsLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDkpXSwgOCkpOyBjYXNlIDk6IGwgPSBtKGwsIFswLCBlLmNoYXJDb2RlQXQodSArIDgpXSksIGwgPSBnKGwsIGMpLCBsID0gZihsLCAzMyksIGwgPSBnKGwsIHMpLCBpID0gbShpLCBsKTsgY2FzZSA4OiBvID0gbShvLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDcpXSwgNTYpKTsgY2FzZSA3OiBvID0gbShvLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDYpXSwgNDgpKTsgY2FzZSA2OiBvID0gbShvLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDUpXSwgNDApKTsgY2FzZSA1OiBvID0gbShvLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDQpXSwgMzIpKTsgY2FzZSA0OiBvID0gbShvLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDMpXSwgMjQpKTsgY2FzZSAzOiBvID0gbShvLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDIpXSwgMTYpKTsgY2FzZSAyOiBvID0gbShvLCBoKFswLCBlLmNoYXJDb2RlQXQodSArIDEpXSwgOCkpOyBjYXNlIDE6IG8gPSBtKG8sIFswLCBlLmNoYXJDb2RlQXQodSldKSwgbyA9IGcobywgcyksIG8gPSBmKG8sIDMxKSwgbyA9IGcobywgYyksIHIgPSBtKHIsIG8pOyB9IHJldHVybiByID0gbShyLCBbMCwgZS5sZW5ndGhdKSwgaSA9IG0oaSwgWzAsIGUubGVuZ3RoXSksIHIgPSBkKHIsIGkpLCBpID0gZChpLCByKSwgciA9IFQociksIGkgPSBUKGkpLCByID0gZChyLCBpKSwgaSA9IGQoaSwgciksIChgMDAwMDAwMDAkeyhyWzBdID4+PiAwKS50b1N0cmluZygxNil9YCkuc2xpY2UoLTgpICsgKGAwMDAwMDAwMCR7KHJbMV0gPj4+IDApLnRvU3RyaW5nKDE2KX1gKS5zbGljZSgtOCkgKyAoYDAwMDAwMDAwJHsoaVswXSA+Pj4gMCkudG9TdHJpbmcoMTYpfWApLnNsaWNlKC04KSArIChgMDAwMDAwMDAkeyhpWzFdID4+PiAwKS50b1N0cmluZygxNil9YCkuc2xpY2UoLTgpOyB9OyBjb25zdCBlID0ge1xuICAgIHByZXByb2Nlc3NvcjogbnVsbCxcbiAgICBhdWRpbzogeyB0aW1lb3V0OiAxZTMsIGV4Y2x1ZGVJT1MxMTogITAgfSxcbiAgICBmb250czoge1xuICAgICAgc3dmQ29udGFpbmVySWQ6ICdmaW5nZXJwcmludGpzMicsIHN3ZlBhdGg6ICdmbGFzaC9jb21waWxlZC9Gb250TGlzdC5zd2YnLCB1c2VyRGVmaW5lZEZvbnRzOiBbXSwgZXh0ZW5kZWRKc0ZvbnRzOiAhMSxcbiAgICB9LFxuICAgIHNjcmVlbjogeyBkZXRlY3RTY3JlZW5PcmllbnRhdGlvbjogITAgfSxcbiAgICBwbHVnaW5zOiB7IHNvcnRQbHVnaW5zRm9yOiBbL3BhbGVtb29uL2ldLCBleGNsdWRlSUU6ICExIH0sXG4gICAgZXh0cmFDb21wb25lbnRzOiBbXSxcbiAgICBleGNsdWRlczoge1xuICAgICAgZW51bWVyYXRlRGV2aWNlczogITAsIHBpeGVsUmF0aW86ICEwLCBkb05vdFRyYWNrOiAhMCwgZm9udHNGbGFzaDogITAsXG4gICAgfSxcbiAgICBOT1RfQVZBSUxBQkxFOiAnbm90IGF2YWlsYWJsZScsXG4gICAgRVJST1I6ICdlcnJvcicsXG4gICAgRVhDTFVERUQ6ICdleGNsdWRlZCcsXG4gIH07IGNvbnN0IGMgPSBmdW5jdGlvbiAoZSwgdCkgeyBpZiAoQXJyYXkucHJvdG90eXBlLmZvckVhY2ggJiYgZS5mb3JFYWNoID09PSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCllLmZvckVhY2godCk7IGVsc2UgaWYgKGUubGVuZ3RoID09PSArZS5sZW5ndGgpIGZvciAobGV0IGEgPSAwLCBuID0gZS5sZW5ndGg7IGEgPCBuOyBhKyspdChlW2FdLCBhLCBlKTsgZWxzZSBmb3IgKGNvbnN0IHIgaW4gZSllLmhhc093blByb3BlcnR5KHIpICYmIHQoZVtyXSwgciwgZSk7IH07IGNvbnN0IHMgPSBmdW5jdGlvbiAoZSwgbikgeyBjb25zdCByID0gW107IHJldHVybiBlID09IG51bGwgPyByIDogQXJyYXkucHJvdG90eXBlLm1hcCAmJiBlLm1hcCA9PT0gQXJyYXkucHJvdG90eXBlLm1hcCA/IGUubWFwKG4pIDogKGMoZSwgKGUsIHQsIGEpID0+IHsgci5wdXNoKG4oZSwgdCwgYSkpOyB9KSwgcik7IH07IGNvbnN0IGEgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzICYmIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlczsgfTsgY29uc3QgbiA9IGZ1bmN0aW9uIChlKSB7IGNvbnN0IHQgPSBbd2luZG93LnNjcmVlbi53aWR0aCwgd2luZG93LnNjcmVlbi5oZWlnaHRdOyByZXR1cm4gZS5zY3JlZW4uZGV0ZWN0U2NyZWVuT3JpZW50YXRpb24gJiYgdC5zb3J0KCkucmV2ZXJzZSgpLCB0OyB9OyBjb25zdCByID0gZnVuY3Rpb24gKGUpIHsgaWYgKHdpbmRvdy5zY3JlZW4uYXZhaWxXaWR0aCAmJiB3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0KSB7IGNvbnN0IHQgPSBbd2luZG93LnNjcmVlbi5hdmFpbEhlaWdodCwgd2luZG93LnNjcmVlbi5hdmFpbFdpZHRoXTsgcmV0dXJuIGUuc2NyZWVuLmRldGVjdFNjcmVlbk9yaWVudGF0aW9uICYmIHQuc29ydCgpLnJldmVyc2UoKSwgdDsgfSByZXR1cm4gZS5OT1RfQVZBSUxBQkxFOyB9OyBjb25zdCBpID0gZnVuY3Rpb24gKGUpIHsgaWYgKG5hdmlnYXRvci5wbHVnaW5zID09IG51bGwpIHJldHVybiBlLk5PVF9BVkFJTEFCTEU7IGZvciAodmFyIHQgPSBbXSwgYSA9IDAsIG4gPSBuYXZpZ2F0b3IucGx1Z2lucy5sZW5ndGg7IGEgPCBuOyBhKyspbmF2aWdhdG9yLnBsdWdpbnNbYV0gJiYgdC5wdXNoKG5hdmlnYXRvci5wbHVnaW5zW2FdKTsgcmV0dXJuIHUoZSkgJiYgKHQgPSB0LnNvcnQoKGUsIHQpID0+IHsgcmV0dXJuIGUubmFtZSA+IHQubmFtZSA/IDEgOiBlLm5hbWUgPCB0Lm5hbWUgPyAtMSA6IDA7IH0pKSwgcyh0LCAoZSkgPT4geyBjb25zdCB0ID0gcyhlLCAoZSkgPT4geyByZXR1cm4gW2UudHlwZSwgZS5zdWZmaXhlc107IH0pOyByZXR1cm4gW2UubmFtZSwgZS5kZXNjcmlwdGlvbiwgdF07IH0pOyB9OyBjb25zdCBvID0gZnVuY3Rpb24gKHQpIHsgbGV0IGUgPSBbXTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih3aW5kb3csICdBY3RpdmVYT2JqZWN0JykgfHwgJ0FjdGl2ZVhPYmplY3QnIGluIHdpbmRvdykgeyBlID0gcyhbJ0Fjcm9QREYuUERGJywgJ0Fkb2RiLlN0cmVhbScsICdBZ0NvbnRyb2wuQWdDb250cm9sJywgJ0RldmFsVlJYQ3RybC5EZXZhbFZSWEN0cmwuMScsICdNYWNyb21lZGlhRmxhc2hQYXBlci5NYWNyb21lZGlhRmxhc2hQYXBlcicsICdNc3htbDIuRE9NRG9jdW1lbnQnLCAnTXN4bWwyLlhNTEhUVFAnLCAnUERGLlBkZkN0cmwnLCAnUXVpY2tUaW1lLlF1aWNrVGltZScsICdRdWlja1RpbWVDaGVja09iamVjdC5RdWlja1RpbWVDaGVjay4xJywgJ1JlYWxQbGF5ZXInLCAnUmVhbFBsYXllci5SZWFsUGxheWVyKHRtKSBBY3RpdmVYIENvbnRyb2wgKDMyLWJpdCknLCAnUmVhbFZpZGVvLlJlYWxWaWRlbyh0bSkgQWN0aXZlWCBDb250cm9sICgzMi1iaXQpJywgJ1NjcmlwdGluZy5EaWN0aW9uYXJ5JywgJ1NXQ3RsLlNXQ3RsJywgJ1NoZWxsLlVJSGVscGVyJywgJ1Nob2Nrd2F2ZUZsYXNoLlNob2Nrd2F2ZUZsYXNoJywgJ1NreXBlLkRldGVjdGlvbicsICdURENDdGwuVERDQ3RsJywgJ1dNUGxheWVyLk9DWCcsICdybW9jeC5SZWFsUGxheWVyIEcyIENvbnRyb2wnLCAncm1vY3guUmVhbFBsYXllciBHMiBDb250cm9sLjEnXSwgKGUpID0+IHsgdHJ5IHsgcmV0dXJuIG5ldyB3aW5kb3cuQWN0aXZlWE9iamVjdChlKSwgZTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gdC5FUlJPUjsgfSB9KTsgfSBlbHNlIGUucHVzaCh0Lk5PVF9BVkFJTEFCTEUpOyByZXR1cm4gbmF2aWdhdG9yLnBsdWdpbnMgJiYgKGUgPSBlLmNvbmNhdChpKHQpKSksIGU7IH07IHZhciB1ID0gZnVuY3Rpb24gKGUpIHsgZm9yICh2YXIgdCA9ICExLCBhID0gMCwgbiA9IGUucGx1Z2lucy5zb3J0UGx1Z2luc0Zvci5sZW5ndGg7IGEgPCBuOyBhKyspIHsgY29uc3QgciA9IGUucGx1Z2lucy5zb3J0UGx1Z2luc0ZvclthXTsgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2gocikpIHsgdCA9ICEwOyBicmVhazsgfSB9IHJldHVybiB0OyB9OyBjb25zdCBwID0gZnVuY3Rpb24gKHQpIHsgdHJ5IHsgcmV0dXJuICEhd2luZG93LnNlc3Npb25TdG9yYWdlOyB9IGNhdGNoIChlKSB7IHJldHVybiB0LkVSUk9SOyB9IH07IGNvbnN0IHYgPSBmdW5jdGlvbiAodCkgeyB0cnkgeyByZXR1cm4gISF3aW5kb3cubG9jYWxTdG9yYWdlOyB9IGNhdGNoIChlKSB7IHJldHVybiB0LkVSUk9SOyB9IH07IGNvbnN0IEEgPSBmdW5jdGlvbiAodCkgeyB0cnkgeyByZXR1cm4gISF3aW5kb3cuaW5kZXhlZERCOyB9IGNhdGNoIChlKSB7IHJldHVybiB0LkVSUk9SOyB9IH07IGNvbnN0IFMgPSBmdW5jdGlvbiAoZSkgeyByZXR1cm4gbmF2aWdhdG9yLmhhcmR3YXJlQ29uY3VycmVuY3kgPyBuYXZpZ2F0b3IuaGFyZHdhcmVDb25jdXJyZW5jeSA6IGUuTk9UX0FWQUlMQUJMRTsgfTsgY29uc3QgQyA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBuYXZpZ2F0b3IuY3B1Q2xhc3MgfHwgZS5OT1RfQVZBSUxBQkxFOyB9OyBjb25zdCBCID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIG5hdmlnYXRvci5wbGF0Zm9ybSA/IG5hdmlnYXRvci5wbGF0Zm9ybSA6IGUuTk9UX0FWQUlMQUJMRTsgfTsgY29uc3QgdyA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBuYXZpZ2F0b3IuZG9Ob3RUcmFjayA/IG5hdmlnYXRvci5kb05vdFRyYWNrIDogbmF2aWdhdG9yLm1zRG9Ob3RUcmFjayA/IG5hdmlnYXRvci5tc0RvTm90VHJhY2sgOiB3aW5kb3cuZG9Ob3RUcmFjayA/IHdpbmRvdy5kb05vdFRyYWNrIDogZS5OT1RfQVZBSUxBQkxFOyB9OyBjb25zdCB0ID0gZnVuY3Rpb24gKCkgeyBsZXQgdDsgbGV0IGUgPSAwOyB2b2lkIDAgIT09IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA/IGUgPSBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgOiB2b2lkIDAgIT09IG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzICYmIChlID0gbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMpOyB0cnkgeyBkb2N1bWVudC5jcmVhdGVFdmVudCgnVG91Y2hFdmVudCcpLCB0ID0gITA7IH0gY2F0Y2ggKGUpIHsgdCA9ICExOyB9IHJldHVybiBbZSwgdCwgJ29udG91Y2hzdGFydCcgaW4gd2luZG93XTsgfTsgY29uc3QgeSA9IGZ1bmN0aW9uIChlKSB7IGNvbnN0IHQgPSBbXTsgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOyBhLndpZHRoID0gMmUzLCBhLmhlaWdodCA9IDIwMCwgYS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7IGNvbnN0IG4gPSBhLmdldENvbnRleHQoJzJkJyk7IHJldHVybiBuLnJlY3QoMCwgMCwgMTAsIDEwKSwgbi5yZWN0KDIsIDIsIDYsIDYpLCB0LnB1c2goYGNhbnZhcyB3aW5kaW5nOiR7ITEgPT09IG4uaXNQb2ludEluUGF0aCg1LCA1LCAnZXZlbm9kZCcpID8gJ3llcycgOiAnbm8nfWApLCBuLnRleHRCYXNlbGluZSA9ICdhbHBoYWJldGljJywgbi5maWxsU3R5bGUgPSAnI2Y2MCcsIG4uZmlsbFJlY3QoMTI1LCAxLCA2MiwgMjApLCBuLmZpbGxTdHlsZSA9ICcjMDY5JywgZS5kb250VXNlRmFrZUZvbnRJbkNhbnZhcyA/IG4uZm9udCA9ICcxMXB0IEFyaWFsJyA6IG4uZm9udCA9ICcxMXB0IG5vLXJlYWwtZm9udC0xMjMnLCBuLmZpbGxUZXh0KCdDd20gZmpvcmRiYW5rIGdseXBocyB2ZXh0IHF1aXosIFxcdWQ4M2RcXHVkZTAzJywgMiwgMTUpLCBuLmZpbGxTdHlsZSA9ICdyZ2JhKDEwMiwgMjA0LCAwLCAwLjIpJywgbi5mb250ID0gJzE4cHQgQXJpYWwnLCBuLmZpbGxUZXh0KCdDd20gZmpvcmRiYW5rIGdseXBocyB2ZXh0IHF1aXosIFxcdWQ4M2RcXHVkZTAzJywgNCwgNDUpLCBuLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdtdWx0aXBseScsIG4uZmlsbFN0eWxlID0gJ3JnYigyNTUsMCwyNTUpJywgbi5iZWdpblBhdGgoKSwgbi5hcmMoNTAsIDUwLCA1MCwgMCwgMiAqIE1hdGguUEksICEwKSwgbi5jbG9zZVBhdGgoKSwgbi5maWxsKCksIG4uZmlsbFN0eWxlID0gJ3JnYigwLDI1NSwyNTUpJywgbi5iZWdpblBhdGgoKSwgbi5hcmMoMTAwLCA1MCwgNTAsIDAsIDIgKiBNYXRoLlBJLCAhMCksIG4uY2xvc2VQYXRoKCksIG4uZmlsbCgpLCBuLmZpbGxTdHlsZSA9ICdyZ2IoMjU1LDI1NSwwKScsIG4uYmVnaW5QYXRoKCksIG4uYXJjKDc1LCAxMDAsIDUwLCAwLCAyICogTWF0aC5QSSwgITApLCBuLmNsb3NlUGF0aCgpLCBuLmZpbGwoKSwgbi5maWxsU3R5bGUgPSAncmdiKDI1NSwwLDI1NSknLCBuLmFyYyg3NSwgNzUsIDc1LCAwLCAyICogTWF0aC5QSSwgITApLCBuLmFyYyg3NSwgNzUsIDI1LCAwLCAyICogTWF0aC5QSSwgITApLCBuLmZpbGwoJ2V2ZW5vZGQnKSwgYS50b0RhdGFVUkwgJiYgdC5wdXNoKGBjYW52YXMgZnA6JHthLnRvRGF0YVVSTCgpfWApLCB0OyB9OyBjb25zdCBFID0gZnVuY3Rpb24gKCkgeyBsZXQgbzsgY29uc3QgZSA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBvLmNsZWFyQ29sb3IoMCwgMCwgMCwgMSksIG8uZW5hYmxlKG8uREVQVEhfVEVTVCksIG8uZGVwdGhGdW5jKG8uTEVRVUFMKSwgby5jbGVhcihvLkNPTE9SX0JVRkZFUl9CSVQgfCBvLkRFUFRIX0JVRkZFUl9CSVQpLCBgWyR7ZVswXX0sICR7ZVsxXX1dYDsgfTsgaWYgKCEobyA9IEYoKSkpIHJldHVybiBudWxsOyBjb25zdCBsID0gW107IGNvbnN0IHQgPSBvLmNyZWF0ZUJ1ZmZlcigpOyBvLmJpbmRCdWZmZXIoby5BUlJBWV9CVUZGRVIsIHQpOyBjb25zdCBhID0gbmV3IEZsb2F0MzJBcnJheShbLTAuMiwgLTAuOSwgMCwgMC40LCAtMC4yNiwgMCwgMCwgMC43MzIxMzQ0NDQsIDBdKTsgby5idWZmZXJEYXRhKG8uQVJSQVlfQlVGRkVSLCBhLCBvLlNUQVRJQ19EUkFXKSwgdC5pdGVtU2l6ZSA9IDMsIHQubnVtSXRlbXMgPSAzOyBjb25zdCBuID0gby5jcmVhdGVQcm9ncmFtKCk7IGNvbnN0IHIgPSBvLmNyZWF0ZVNoYWRlcihvLlZFUlRFWF9TSEFERVIpOyBvLnNoYWRlclNvdXJjZShyLCAnYXR0cmlidXRlIHZlYzIgYXR0clZlcnRleDt2YXJ5aW5nIHZlYzIgdmFyeWluVGV4Q29vcmRpbmF0ZTt1bmlmb3JtIHZlYzIgdW5pZm9ybU9mZnNldDt2b2lkIG1haW4oKXt2YXJ5aW5UZXhDb29yZGluYXRlPWF0dHJWZXJ0ZXgrdW5pZm9ybU9mZnNldDtnbF9Qb3NpdGlvbj12ZWM0KGF0dHJWZXJ0ZXgsMCwxKTt9JyksIG8uY29tcGlsZVNoYWRlcihyKTsgY29uc3QgaSA9IG8uY3JlYXRlU2hhZGVyKG8uRlJBR01FTlRfU0hBREVSKTsgby5zaGFkZXJTb3VyY2UoaSwgJ3ByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O3ZhcnlpbmcgdmVjMiB2YXJ5aW5UZXhDb29yZGluYXRlO3ZvaWQgbWFpbigpIHtnbF9GcmFnQ29sb3I9dmVjNCh2YXJ5aW5UZXhDb29yZGluYXRlLDAsMSk7fScpLCBvLmNvbXBpbGVTaGFkZXIoaSksIG8uYXR0YWNoU2hhZGVyKG4sIHIpLCBvLmF0dGFjaFNoYWRlcihuLCBpKSwgby5saW5rUHJvZ3JhbShuKSwgby51c2VQcm9ncmFtKG4pLCBuLnZlcnRleFBvc0F0dHJpYiA9IG8uZ2V0QXR0cmliTG9jYXRpb24obiwgJ2F0dHJWZXJ0ZXgnKSwgbi5vZmZzZXRVbmlmb3JtID0gby5nZXRVbmlmb3JtTG9jYXRpb24obiwgJ3VuaWZvcm1PZmZzZXQnKSwgby5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShuLnZlcnRleFBvc0FycmF5KSwgby52ZXJ0ZXhBdHRyaWJQb2ludGVyKG4udmVydGV4UG9zQXR0cmliLCB0Lml0ZW1TaXplLCBvLkZMT0FULCAhMSwgMCwgMCksIG8udW5pZm9ybTJmKG4ub2Zmc2V0VW5pZm9ybSwgMSwgMSksIG8uZHJhd0FycmF5cyhvLlRSSUFOR0xFX1NUUklQLCAwLCB0Lm51bUl0ZW1zKTsgdHJ5IHsgbC5wdXNoKG8uY2FudmFzLnRvRGF0YVVSTCgpKTsgfSBjYXRjaCAoZSkge31sLnB1c2goYGV4dGVuc2lvbnM6JHsoby5nZXRTdXBwb3J0ZWRFeHRlbnNpb25zKCkgfHwgW10pLmpvaW4oJzsnKX1gKSwgbC5wdXNoKGB3ZWJnbCBhbGlhc2VkIGxpbmUgd2lkdGggcmFuZ2U6JHtlKG8uZ2V0UGFyYW1ldGVyKG8uQUxJQVNFRF9MSU5FX1dJRFRIX1JBTkdFKSl9YCksIGwucHVzaChgd2ViZ2wgYWxpYXNlZCBwb2ludCBzaXplIHJhbmdlOiR7ZShvLmdldFBhcmFtZXRlcihvLkFMSUFTRURfUE9JTlRfU0laRV9SQU5HRSkpfWApLCBsLnB1c2goYHdlYmdsIGFscGhhIGJpdHM6JHtvLmdldFBhcmFtZXRlcihvLkFMUEhBX0JJVFMpfWApLCBsLnB1c2goYHdlYmdsIGFudGlhbGlhc2luZzoke28uZ2V0Q29udGV4dEF0dHJpYnV0ZXMoKS5hbnRpYWxpYXMgPyAneWVzJyA6ICdubyd9YCksIGwucHVzaChgd2ViZ2wgYmx1ZSBiaXRzOiR7by5nZXRQYXJhbWV0ZXIoby5CTFVFX0JJVFMpfWApLCBsLnB1c2goYHdlYmdsIGRlcHRoIGJpdHM6JHtvLmdldFBhcmFtZXRlcihvLkRFUFRIX0JJVFMpfWApLCBsLnB1c2goYHdlYmdsIGdyZWVuIGJpdHM6JHtvLmdldFBhcmFtZXRlcihvLkdSRUVOX0JJVFMpfWApLCBsLnB1c2goYHdlYmdsIG1heCBhbmlzb3Ryb3B5OiR7KGZ1bmN0aW9uIChlKSB7IGNvbnN0IHQgPSBlLmdldEV4dGVuc2lvbignRVhUX3RleHR1cmVfZmlsdGVyX2FuaXNvdHJvcGljJykgfHwgZS5nZXRFeHRlbnNpb24oJ1dFQktJVF9FWFRfdGV4dHVyZV9maWx0ZXJfYW5pc290cm9waWMnKSB8fCBlLmdldEV4dGVuc2lvbignTU9aX0VYVF90ZXh0dXJlX2ZpbHRlcl9hbmlzb3Ryb3BpYycpOyBpZiAodCkgeyBsZXQgYSA9IGUuZ2V0UGFyYW1ldGVyKHQuTUFYX1RFWFRVUkVfTUFYX0FOSVNPVFJPUFlfRVhUKTsgcmV0dXJuIGEgPT09IDAgJiYgKGEgPSAyKSwgYTsgfSByZXR1cm4gbnVsbDsgfShvKSl9YCksIGwucHVzaChgd2ViZ2wgbWF4IGNvbWJpbmVkIHRleHR1cmUgaW1hZ2UgdW5pdHM6JHtvLmdldFBhcmFtZXRlcihvLk1BWF9DT01CSU5FRF9URVhUVVJFX0lNQUdFX1VOSVRTKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggY3ViZSBtYXAgdGV4dHVyZSBzaXplOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfQ1VCRV9NQVBfVEVYVFVSRV9TSVpFKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggZnJhZ21lbnQgdW5pZm9ybSB2ZWN0b3JzOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfRlJBR01FTlRfVU5JRk9STV9WRUNUT1JTKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggcmVuZGVyIGJ1ZmZlciBzaXplOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfUkVOREVSQlVGRkVSX1NJWkUpfWApLCBsLnB1c2goYHdlYmdsIG1heCB0ZXh0dXJlIGltYWdlIHVuaXRzOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfVEVYVFVSRV9JTUFHRV9VTklUUyl9YCksIGwucHVzaChgd2ViZ2wgbWF4IHRleHR1cmUgc2l6ZToke28uZ2V0UGFyYW1ldGVyKG8uTUFYX1RFWFRVUkVfU0laRSl9YCksIGwucHVzaChgd2ViZ2wgbWF4IHZhcnlpbmcgdmVjdG9yczoke28uZ2V0UGFyYW1ldGVyKG8uTUFYX1ZBUllJTkdfVkVDVE9SUyl9YCksIGwucHVzaChgd2ViZ2wgbWF4IHZlcnRleCBhdHRyaWJzOiR7by5nZXRQYXJhbWV0ZXIoby5NQVhfVkVSVEVYX0FUVFJJQlMpfWApLCBsLnB1c2goYHdlYmdsIG1heCB2ZXJ0ZXggdGV4dHVyZSBpbWFnZSB1bml0czoke28uZ2V0UGFyYW1ldGVyKG8uTUFYX1ZFUlRFWF9URVhUVVJFX0lNQUdFX1VOSVRTKX1gKSwgbC5wdXNoKGB3ZWJnbCBtYXggdmVydGV4IHVuaWZvcm0gdmVjdG9yczoke28uZ2V0UGFyYW1ldGVyKG8uTUFYX1ZFUlRFWF9VTklGT1JNX1ZFQ1RPUlMpfWApLCBsLnB1c2goYHdlYmdsIG1heCB2aWV3cG9ydCBkaW1zOiR7ZShvLmdldFBhcmFtZXRlcihvLk1BWF9WSUVXUE9SVF9ESU1TKSl9YCksIGwucHVzaChgd2ViZ2wgcmVkIGJpdHM6JHtvLmdldFBhcmFtZXRlcihvLlJFRF9CSVRTKX1gKSwgbC5wdXNoKGB3ZWJnbCByZW5kZXJlcjoke28uZ2V0UGFyYW1ldGVyKG8uUkVOREVSRVIpfWApLCBsLnB1c2goYHdlYmdsIHNoYWRpbmcgbGFuZ3VhZ2UgdmVyc2lvbjoke28uZ2V0UGFyYW1ldGVyKG8uU0hBRElOR19MQU5HVUFHRV9WRVJTSU9OKX1gKSwgbC5wdXNoKGB3ZWJnbCBzdGVuY2lsIGJpdHM6JHtvLmdldFBhcmFtZXRlcihvLlNURU5DSUxfQklUUyl9YCksIGwucHVzaChgd2ViZ2wgdmVuZG9yOiR7by5nZXRQYXJhbWV0ZXIoby5WRU5ET1IpfWApLCBsLnB1c2goYHdlYmdsIHZlcnNpb246JHtvLmdldFBhcmFtZXRlcihvLlZFUlNJT04pfWApOyB0cnkgeyBjb25zdCBzID0gby5nZXRFeHRlbnNpb24oJ1dFQkdMX2RlYnVnX3JlbmRlcmVyX2luZm8nKTsgcyAmJiAobC5wdXNoKGB3ZWJnbCB1bm1hc2tlZCB2ZW5kb3I6JHtvLmdldFBhcmFtZXRlcihzLlVOTUFTS0VEX1ZFTkRPUl9XRUJHTCl9YCksIGwucHVzaChgd2ViZ2wgdW5tYXNrZWQgcmVuZGVyZXI6JHtvLmdldFBhcmFtZXRlcihzLlVOTUFTS0VEX1JFTkRFUkVSX1dFQkdMKX1gKSk7IH0gY2F0Y2ggKGUpIHt9IHJldHVybiBvLmdldFNoYWRlclByZWNpc2lvbkZvcm1hdCAmJiBjKFsnRkxPQVQnLCAnSU5UJ10sIChpKSA9PiB7IGMoWydWRVJURVgnLCAnRlJBR01FTlQnXSwgKHIpID0+IHsgYyhbJ0hJR0gnLCAnTUVESVVNJywgJ0xPVyddLCAobikgPT4geyBjKFsncHJlY2lzaW9uJywgJ3JhbmdlTWluJywgJ3JhbmdlTWF4J10sIChlKSA9PiB7IGNvbnN0IHQgPSBvLmdldFNoYWRlclByZWNpc2lvbkZvcm1hdChvW2Ake3J9X1NIQURFUmBdLCBvW2Ake259XyR7aX1gXSlbZV07IGUgIT09ICdwcmVjaXNpb24nICYmIChlID0gYHByZWNpc2lvbiAke2V9YCk7IGNvbnN0IGEgPSBbJ3dlYmdsICcsIHIudG9Mb3dlckNhc2UoKSwgJyBzaGFkZXIgJywgbi50b0xvd2VyQ2FzZSgpLCAnICcsIGkudG9Mb3dlckNhc2UoKSwgJyAnLCBlLCAnOicsIHRdLmpvaW4oJycpOyBsLnB1c2goYSk7IH0pOyB9KTsgfSk7IH0pLCBsOyB9OyBjb25zdCBNID0gZnVuY3Rpb24gKCkgeyB0cnkgeyBjb25zdCBlID0gRigpOyBjb25zdCB0ID0gZS5nZXRFeHRlbnNpb24oJ1dFQkdMX2RlYnVnX3JlbmRlcmVyX2luZm8nKTsgcmV0dXJuIGAke2UuZ2V0UGFyYW1ldGVyKHQuVU5NQVNLRURfVkVORE9SX1dFQkdMKX1+JHtlLmdldFBhcmFtZXRlcih0LlVOTUFTS0VEX1JFTkRFUkVSX1dFQkdMKX1gOyB9IGNhdGNoIChlKSB7IHJldHVybiBudWxsOyB9IH07IGNvbnN0IHggPSBmdW5jdGlvbiAoKSB7IGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgZS5pbm5lckhUTUwgPSAnJm5ic3A7JzsgbGV0IHQgPSAhKGUuY2xhc3NOYW1lID0gJ2Fkc2JveCcpOyB0cnkgeyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGUpLCB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRzYm94JylbMF0ub2Zmc2V0SGVpZ2h0ID09PSAwLCBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGUpOyB9IGNhdGNoIChlKSB7IHQgPSAhMTsgfSByZXR1cm4gdDsgfTsgY29uc3QgTyA9IGZ1bmN0aW9uICgpIHsgaWYgKHZvaWQgMCAhPT0gbmF2aWdhdG9yLmxhbmd1YWdlcykgdHJ5IHsgaWYgKG5hdmlnYXRvci5sYW5ndWFnZXNbMF0uc3Vic3RyKDAsIDIpICE9PSBuYXZpZ2F0b3IubGFuZ3VhZ2Uuc3Vic3RyKDAsIDIpKSByZXR1cm4gITA7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuICEwOyB9IHJldHVybiAhMTsgfTsgY29uc3QgYiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvdy5zY3JlZW4ud2lkdGggPCB3aW5kb3cuc2NyZWVuLmF2YWlsV2lkdGggfHwgd2luZG93LnNjcmVlbi5oZWlnaHQgPCB3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0OyB9OyBjb25zdCBQID0gZnVuY3Rpb24gKCkgeyBsZXQgZTsgY29uc3QgdCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTsgbGV0IGEgPSBuYXZpZ2F0b3Iub3NjcHU7IGNvbnN0IG4gPSBuYXZpZ2F0b3IucGxhdGZvcm0udG9Mb3dlckNhc2UoKTsgaWYgKGUgPSB0LmluZGV4T2YoJ3dpbmRvd3MgcGhvbmUnKSA+PSAwID8gJ1dpbmRvd3MgUGhvbmUnIDogdC5pbmRleE9mKCd3aW4nKSA+PSAwID8gJ1dpbmRvd3MnIDogdC5pbmRleE9mKCdhbmRyb2lkJykgPj0gMCA/ICdBbmRyb2lkJyA6IHQuaW5kZXhPZignbGludXgnKSA+PSAwIHx8IHQuaW5kZXhPZignY3JvcycpID49IDAgPyAnTGludXgnIDogdC5pbmRleE9mKCdpcGhvbmUnKSA+PSAwIHx8IHQuaW5kZXhPZignaXBhZCcpID49IDAgPyAnaU9TJyA6IHQuaW5kZXhPZignbWFjJykgPj0gMCA/ICdNYWMnIDogJ090aGVyJywgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwIHx8IG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzID4gMCkgJiYgZSAhPT0gJ1dpbmRvd3MgUGhvbmUnICYmIGUgIT09ICdBbmRyb2lkJyAmJiBlICE9PSAnaU9TJyAmJiBlICE9PSAnT3RoZXInKSByZXR1cm4gITA7IGlmICh2b2lkIDAgIT09IGEpIHsgaWYgKChhID0gYS50b0xvd2VyQ2FzZSgpKS5pbmRleE9mKCd3aW4nKSA+PSAwICYmIGUgIT09ICdXaW5kb3dzJyAmJiBlICE9PSAnV2luZG93cyBQaG9uZScpIHJldHVybiAhMDsgaWYgKGEuaW5kZXhPZignbGludXgnKSA+PSAwICYmIGUgIT09ICdMaW51eCcgJiYgZSAhPT0gJ0FuZHJvaWQnKSByZXR1cm4gITA7IGlmIChhLmluZGV4T2YoJ21hYycpID49IDAgJiYgZSAhPT0gJ01hYycgJiYgZSAhPT0gJ2lPUycpIHJldHVybiAhMDsgaWYgKChhLmluZGV4T2YoJ3dpbicpID09PSAtMSAmJiBhLmluZGV4T2YoJ2xpbnV4JykgPT09IC0xICYmIGEuaW5kZXhPZignbWFjJykgPT09IC0xKSAhPSAoZSA9PT0gJ090aGVyJykpIHJldHVybiAhMDsgfSByZXR1cm4gbi5pbmRleE9mKCd3aW4nKSA+PSAwICYmIGUgIT09ICdXaW5kb3dzJyAmJiBlICE9PSAnV2luZG93cyBQaG9uZScgfHwgKChuLmluZGV4T2YoJ2xpbnV4JykgPj0gMCB8fCBuLmluZGV4T2YoJ2FuZHJvaWQnKSA+PSAwIHx8IG4uaW5kZXhPZigncGlrZScpID49IDApICYmIGUgIT09ICdMaW51eCcgJiYgZSAhPT0gJ0FuZHJvaWQnIHx8ICgobi5pbmRleE9mKCdtYWMnKSA+PSAwIHx8IG4uaW5kZXhPZignaXBhZCcpID49IDAgfHwgbi5pbmRleE9mKCdpcG9kJykgPj0gMCB8fCBuLmluZGV4T2YoJ2lwaG9uZScpID49IDApICYmIGUgIT09ICdNYWMnICYmIGUgIT09ICdpT1MnIHx8ICgobi5pbmRleE9mKCd3aW4nKSA8IDAgJiYgbi5pbmRleE9mKCdsaW51eCcpIDwgMCAmJiBuLmluZGV4T2YoJ21hYycpIDwgMCAmJiBuLmluZGV4T2YoJ2lwaG9uZScpIDwgMCAmJiBuLmluZGV4T2YoJ2lwYWQnKSA8IDApICE9PSAoZSA9PT0gJ090aGVyJykgfHwgdm9pZCAwID09PSBuYXZpZ2F0b3IucGx1Z2lucyAmJiBlICE9PSAnV2luZG93cycgJiYgZSAhPT0gJ1dpbmRvd3MgUGhvbmUnKSkpOyB9OyBjb25zdCBMID0gZnVuY3Rpb24gKCkgeyBsZXQgZTsgY29uc3QgdCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTsgY29uc3QgYSA9IG5hdmlnYXRvci5wcm9kdWN0U3ViOyBpZiAoKChlID0gdC5pbmRleE9mKCdmaXJlZm94JykgPj0gMCA/ICdGaXJlZm94JyA6IHQuaW5kZXhPZignb3BlcmEnKSA+PSAwIHx8IHQuaW5kZXhPZignb3ByJykgPj0gMCA/ICdPcGVyYScgOiB0LmluZGV4T2YoJ2Nocm9tZScpID49IDAgPyAnQ2hyb21lJyA6IHQuaW5kZXhPZignc2FmYXJpJykgPj0gMCA/ICdTYWZhcmknIDogdC5pbmRleE9mKCd0cmlkZW50JykgPj0gMCA/ICdJbnRlcm5ldCBFeHBsb3JlcicgOiAnT3RoZXInKSA9PT0gJ0Nocm9tZScgfHwgZSA9PT0gJ1NhZmFyaScgfHwgZSA9PT0gJ09wZXJhJykgJiYgYSAhPT0gJzIwMDMwMTA3JykgcmV0dXJuICEwOyBsZXQgbjsgY29uc3QgciA9IGV2YWwudG9TdHJpbmcoKS5sZW5ndGg7IGlmIChyID09PSAzNyAmJiBlICE9PSAnU2FmYXJpJyAmJiBlICE9PSAnRmlyZWZveCcgJiYgZSAhPT0gJ090aGVyJykgcmV0dXJuICEwOyBpZiAociA9PT0gMzkgJiYgZSAhPT0gJ0ludGVybmV0IEV4cGxvcmVyJyAmJiBlICE9PSAnT3RoZXInKSByZXR1cm4gITA7IGlmIChyID09PSAzMyAmJiBlICE9PSAnQ2hyb21lJyAmJiBlICE9PSAnT3BlcmEnICYmIGUgIT09ICdPdGhlcicpIHJldHVybiAhMDsgdHJ5IHsgdGhyb3cgJ2EnOyB9IGNhdGNoIChlKSB7IHRyeSB7IGUudG9Tb3VyY2UoKSwgbiA9ICEwOyB9IGNhdGNoIChlKSB7IG4gPSAhMTsgfSB9IHJldHVybiBuICYmIGUgIT09ICdGaXJlZm94JyAmJiBlICE9PSAnT3RoZXInOyB9OyBjb25zdCBJID0gZnVuY3Rpb24gKCkgeyBjb25zdCBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7IHJldHVybiAhKCFlLmdldENvbnRleHQgfHwgIWUuZ2V0Q29udGV4dCgnMmQnKSk7IH07IGNvbnN0IGsgPSBmdW5jdGlvbiAoKSB7IGlmICghSSgpKSByZXR1cm4gITE7IGNvbnN0IGUgPSBGKCk7IHJldHVybiAhIXdpbmRvdy5XZWJHTFJlbmRlcmluZ0NvbnRleHQgJiYgISFlOyB9OyBjb25zdCBSID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmF2aWdhdG9yLmFwcE5hbWUgPT09ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInIHx8ICEobmF2aWdhdG9yLmFwcE5hbWUgIT09ICdOZXRzY2FwZScgfHwgIS9UcmlkZW50Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKTsgfTsgY29uc3QgRCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZvaWQgMCAhPT0gd2luZG93LnN3Zm9iamVjdDsgfTsgY29uc3QgTiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvdy5zd2ZvYmplY3QuaGFzRmxhc2hQbGF5ZXJWZXJzaW9uKCc5LjAuMCcpOyB9OyBjb25zdCBfID0gZnVuY3Rpb24gKHQsIGUpIHsgY29uc3QgYSA9ICdfX19mcF9zd2ZfbG9hZGVkJzsgd2luZG93W2FdID0gZnVuY3Rpb24gKGUpIHsgdChlKTsgfTsgbGV0IG47IGxldCByOyBjb25zdCBpID0gZS5mb250cy5zd2ZDb250YWluZXJJZDsgKHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSkuc2V0QXR0cmlidXRlKCdpZCcsIG4uZm9udHMuc3dmQ29udGFpbmVySWQpLCBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHIpOyBjb25zdCBvID0geyBvblJlYWR5OiBhIH07IHdpbmRvdy5zd2ZvYmplY3QuZW1iZWRTV0YoZS5mb250cy5zd2ZQYXRoLCBpLCAnMScsICcxJywgJzkuMC4wJywgITEsIG8sIHsgYWxsb3dTY3JpcHRBY2Nlc3M6ICdhbHdheXMnLCBtZW51OiAnZmFsc2UnIH0sIHt9KTsgfTsgdmFyIEYgPSBmdW5jdGlvbiAoKSB7IGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTsgbGV0IHQgPSBudWxsOyB0cnkgeyB0ID0gZS5nZXRDb250ZXh0KCd3ZWJnbCcpIHx8IGUuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJyk7IH0gY2F0Y2ggKGUpIHt9IHJldHVybiB0IHx8ICh0ID0gbnVsbCksIHQ7IH07IGNvbnN0IEcgPSBbeyBrZXk6ICd1c2VyQWdlbnQnLCBnZXREYXRhKGUpIHsgZShuYXZpZ2F0b3IudXNlckFnZW50KTsgfSB9LCB7IGtleTogJ3dlYmRyaXZlcicsIGdldERhdGEoZSwgdCkgeyBlKG5hdmlnYXRvci53ZWJkcml2ZXIgPT0gbnVsbCA/IHQuTk9UX0FWQUlMQUJMRSA6IG5hdmlnYXRvci53ZWJkcml2ZXIpOyB9IH0sIHsga2V5OiAnbGFuZ3VhZ2UnLCBnZXREYXRhKGUsIHQpIHsgZShuYXZpZ2F0b3IubGFuZ3VhZ2UgfHwgbmF2aWdhdG9yLnVzZXJMYW5ndWFnZSB8fCBuYXZpZ2F0b3IuYnJvd3Nlckxhbmd1YWdlIHx8IG5hdmlnYXRvci5zeXN0ZW1MYW5ndWFnZSB8fCB0Lk5PVF9BVkFJTEFCTEUpOyB9IH0sIHsga2V5OiAnY29sb3JEZXB0aCcsIGdldERhdGEoZSwgdCkgeyBlKHdpbmRvdy5zY3JlZW4uY29sb3JEZXB0aCB8fCB0Lk5PVF9BVkFJTEFCTEUpOyB9IH0sIHsga2V5OiAnZGV2aWNlTWVtb3J5JywgZ2V0RGF0YShlLCB0KSB7IGUobmF2aWdhdG9yLmRldmljZU1lbW9yeSB8fCB0Lk5PVF9BVkFJTEFCTEUpOyB9IH0sIHsga2V5OiAncGl4ZWxSYXRpbycsIGdldERhdGEoZSwgdCkgeyBlKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IHQuTk9UX0FWQUlMQUJMRSk7IH0gfSwgeyBrZXk6ICdoYXJkd2FyZUNvbmN1cnJlbmN5JywgZ2V0RGF0YShlLCB0KSB7IGUoUyh0KSk7IH0gfSwgeyBrZXk6ICdzY3JlZW5SZXNvbHV0aW9uJywgZ2V0RGF0YShlLCB0KSB7IGUobih0KSk7IH0gfSwgeyBrZXk6ICdhdmFpbGFibGVTY3JlZW5SZXNvbHV0aW9uJywgZ2V0RGF0YShlLCB0KSB7IGUocih0KSk7IH0gfSwgeyBrZXk6ICd0aW1lem9uZU9mZnNldCcsIGdldERhdGEoZSkgeyBlKChuZXcgRGF0ZSgpKS5nZXRUaW1lem9uZU9mZnNldCgpKTsgfSB9LCB7IGtleTogJ3RpbWV6b25lJywgZ2V0RGF0YShlLCB0KSB7IHdpbmRvdy5JbnRsICYmIHdpbmRvdy5JbnRsLkRhdGVUaW1lRm9ybWF0ID8gZSgobmV3IHdpbmRvdy5JbnRsLkRhdGVUaW1lRm9ybWF0KCkpLnJlc29sdmVkT3B0aW9ucygpLnRpbWVab25lKSA6IGUodC5OT1RfQVZBSUxBQkxFKTsgfSB9LCB7IGtleTogJ3Nlc3Npb25TdG9yYWdlJywgZ2V0RGF0YShlLCB0KSB7IGUocCh0KSk7IH0gfSwgeyBrZXk6ICdsb2NhbFN0b3JhZ2UnLCBnZXREYXRhKGUsIHQpIHsgZSh2KHQpKTsgfSB9LCB7IGtleTogJ2luZGV4ZWREYicsIGdldERhdGEoZSwgdCkgeyBlKEEodCkpOyB9IH0sIHsga2V5OiAnYWRkQmVoYXZpb3InLCBnZXREYXRhKGUpIHsgZSghKCFkb2N1bWVudC5ib2R5IHx8ICFkb2N1bWVudC5ib2R5LmFkZEJlaGF2aW9yKSk7IH0gfSwgeyBrZXk6ICdvcGVuRGF0YWJhc2UnLCBnZXREYXRhKGUpIHsgZSghIXdpbmRvdy5vcGVuRGF0YWJhc2UpOyB9IH0sIHsga2V5OiAnY3B1Q2xhc3MnLCBnZXREYXRhKGUsIHQpIHsgZShDKHQpKTsgfSB9LCB7IGtleTogJ3BsYXRmb3JtJywgZ2V0RGF0YShlLCB0KSB7IGUoQih0KSk7IH0gfSwgeyBrZXk6ICdkb05vdFRyYWNrJywgZ2V0RGF0YShlLCB0KSB7IGUodyh0KSk7IH0gfSwgeyBrZXk6ICdwbHVnaW5zJywgZ2V0RGF0YShlLCB0KSB7IFIoKSA/IHQucGx1Z2lucy5leGNsdWRlSUUgPyBlKHQuRVhDTFVERUQpIDogZShvKHQpKSA6IGUoaSh0KSk7IH0gfSwgeyBrZXk6ICdjYW52YXMnLCBnZXREYXRhKGUsIHQpIHsgSSgpID8gZSh5KHQpKSA6IGUodC5OT1RfQVZBSUxBQkxFKTsgfSB9LCB7IGtleTogJ3dlYmdsJywgZ2V0RGF0YShlLCB0KSB7IGsoKSA/IGUoRSgpKSA6IGUodC5OT1RfQVZBSUxBQkxFKTsgfSB9LCB7IGtleTogJ3dlYmdsVmVuZG9yQW5kUmVuZGVyZXInLCBnZXREYXRhKGUpIHsgaygpID8gZShNKCkpIDogZSgpOyB9IH0sIHsga2V5OiAnYWRCbG9jaycsIGdldERhdGEoZSkgeyBlKHgoKSk7IH0gfSwgeyBrZXk6ICdoYXNMaWVkTGFuZ3VhZ2VzJywgZ2V0RGF0YShlKSB7IGUoTygpKTsgfSB9LCB7IGtleTogJ2hhc0xpZWRSZXNvbHV0aW9uJywgZ2V0RGF0YShlKSB7IGUoYigpKTsgfSB9LCB7IGtleTogJ2hhc0xpZWRPcycsIGdldERhdGEoZSkgeyBlKFAoKSk7IH0gfSwgeyBrZXk6ICdoYXNMaWVkQnJvd3NlcicsIGdldERhdGEoZSkgeyBlKEwoKSk7IH0gfSwgeyBrZXk6ICd0b3VjaFN1cHBvcnQnLCBnZXREYXRhKGUpIHsgZSh0KCkpOyB9IH0sIHsga2V5OiAnZm9udHMnLCBnZXREYXRhKGUsIHQpIHsgY29uc3QgdSA9IFsnbW9ub3NwYWNlJywgJ3NhbnMtc2VyaWYnLCAnc2VyaWYnXTsgbGV0IGQgPSBbJ0FuZGFsZSBNb25vJywgJ0FyaWFsJywgJ0FyaWFsIEJsYWNrJywgJ0FyaWFsIEhlYnJldycsICdBcmlhbCBNVCcsICdBcmlhbCBOYXJyb3cnLCAnQXJpYWwgUm91bmRlZCBNVCBCb2xkJywgJ0FyaWFsIFVuaWNvZGUgTVMnLCAnQml0c3RyZWFtIFZlcmEgU2FucyBNb25vJywgJ0Jvb2sgQW50aXF1YScsICdCb29rbWFuIE9sZCBTdHlsZScsICdDYWxpYnJpJywgJ0NhbWJyaWEnLCAnQ2FtYnJpYSBNYXRoJywgJ0NlbnR1cnknLCAnQ2VudHVyeSBHb3RoaWMnLCAnQ2VudHVyeSBTY2hvb2xib29rJywgJ0NvbWljIFNhbnMnLCAnQ29taWMgU2FucyBNUycsICdDb25zb2xhcycsICdDb3VyaWVyJywgJ0NvdXJpZXIgTmV3JywgJ0dlbmV2YScsICdHZW9yZ2lhJywgJ0hlbHZldGljYScsICdIZWx2ZXRpY2EgTmV1ZScsICdJbXBhY3QnLCAnTHVjaWRhIEJyaWdodCcsICdMdWNpZGEgQ2FsbGlncmFwaHknLCAnTHVjaWRhIENvbnNvbGUnLCAnTHVjaWRhIEZheCcsICdMVUNJREEgR1JBTkRFJywgJ0x1Y2lkYSBIYW5kd3JpdGluZycsICdMdWNpZGEgU2FucycsICdMdWNpZGEgU2FucyBUeXBld3JpdGVyJywgJ0x1Y2lkYSBTYW5zIFVuaWNvZGUnLCAnTWljcm9zb2Z0IFNhbnMgU2VyaWYnLCAnTW9uYWNvJywgJ01vbm90eXBlIENvcnNpdmEnLCAnTVMgR290aGljJywgJ01TIE91dGxvb2snLCAnTVMgUEdvdGhpYycsICdNUyBSZWZlcmVuY2UgU2FucyBTZXJpZicsICdNUyBTYW5zIFNlcmlmJywgJ01TIFNlcmlmJywgJ01ZUklBRCcsICdNWVJJQUQgUFJPJywgJ1BhbGF0aW5vJywgJ1BhbGF0aW5vIExpbm90eXBlJywgJ1NlZ29lIFByaW50JywgJ1NlZ29lIFNjcmlwdCcsICdTZWdvZSBVSScsICdTZWdvZSBVSSBMaWdodCcsICdTZWdvZSBVSSBTZW1pYm9sZCcsICdTZWdvZSBVSSBTeW1ib2wnLCAnVGFob21hJywgJ1RpbWVzJywgJ1RpbWVzIE5ldyBSb21hbicsICdUaW1lcyBOZXcgUm9tYW4gUFMnLCAnVHJlYnVjaGV0IE1TJywgJ1ZlcmRhbmEnLCAnV2luZ2RpbmdzJywgJ1dpbmdkaW5ncyAyJywgJ1dpbmdkaW5ncyAzJ107IHQuZm9udHMuZXh0ZW5kZWRKc0ZvbnRzICYmIChkID0gZC5jb25jYXQoWydBYmFkaSBNVCBDb25kZW5zZWQgTGlnaHQnLCAnQWNhZGVteSBFbmdyYXZlZCBMRVQnLCAnQURPQkUgQ0FTTE9OIFBSTycsICdBZG9iZSBHYXJhbW9uZCcsICdBRE9CRSBHQVJBTU9ORCBQUk8nLCAnQWdlbmN5IEZCJywgJ0FoYXJvbmknLCAnQWxiZXJ0dXMgRXh0cmEgQm9sZCcsICdBbGJlcnR1cyBNZWRpdW0nLCAnQWxnZXJpYW4nLCAnQW1hem9uZSBCVCcsICdBbWVyaWNhbiBUeXBld3JpdGVyJywgJ0FtZXJpY2FuIFR5cGV3cml0ZXIgQ29uZGVuc2VkJywgJ0FtZXJUeXBlIE1kIEJUJywgJ0FuZGFsdXMnLCAnQW5nc2FuYSBOZXcnLCAnQW5nc2FuYVVQQycsICdBbnRpcXVlIE9saXZlJywgJ0FwYXJhaml0YScsICdBcHBsZSBDaGFuY2VyeScsICdBcHBsZSBDb2xvciBFbW9qaScsICdBcHBsZSBTRCBHb3RoaWMgTmVvJywgJ0FyYWJpYyBUeXBlc2V0dGluZycsICdBUkNIRVInLCAnQVJOTyBQUk8nLCAnQXJydXMgQlQnLCAnQXVyb3JhIENuIEJUJywgJ0F2YW50R2FyZGUgQmsgQlQnLCAnQXZhbnRHYXJkZSBNZCBCVCcsICdBVkVOSVInLCAnQXl1dGhheWEnLCAnQmFuZHknLCAnQmFuZ2xhIFNhbmdhbSBNTicsICdCYW5rIEdvdGhpYycsICdCYW5rR290aGljIE1kIEJUJywgJ0Jhc2tlcnZpbGxlJywgJ0Jhc2tlcnZpbGxlIE9sZCBGYWNlJywgJ0JhdGFuZycsICdCYXRhbmdDaGUnLCAnQmF1ZXIgQm9kb25pJywgJ0JhdWhhdXMgOTMnLCAnQmF6b29rYScsICdCZWxsIE1UJywgJ0JlbWJvJywgJ0Jlbmd1aWF0IEJrIEJUJywgJ0JlcmxpbiBTYW5zIEZCJywgJ0JlcmxpbiBTYW5zIEZCIERlbWknLCAnQmVybmFyZCBNVCBDb25kZW5zZWQnLCAnQmVybmhhcmRGYXNoaW9uIEJUJywgJ0Jlcm5oYXJkTW9kIEJUJywgJ0JpZyBDYXNsb24nLCAnQmlubmVyRCcsICdCbGFja2FkZGVyIElUQycsICdCbGFpck1kSVRDIFRUJywgJ0JvZG9uaSA3MicsICdCb2RvbmkgNzIgT2xkc3R5bGUnLCAnQm9kb25pIDcyIFNtYWxsY2FwcycsICdCb2RvbmkgTVQnLCAnQm9kb25pIE1UIEJsYWNrJywgJ0JvZG9uaSBNVCBDb25kZW5zZWQnLCAnQm9kb25pIE1UIFBvc3RlciBDb21wcmVzc2VkJywgJ0Jvb2tzaGVsZiBTeW1ib2wgNycsICdCb3VsZGVyJywgJ0JyYWRsZXkgSGFuZCcsICdCcmFkbGV5IEhhbmQgSVRDJywgJ0JyZW1lbiBCZCBCVCcsICdCcml0YW5uaWMgQm9sZCcsICdCcm9hZHdheScsICdCcm93YWxsaWEgTmV3JywgJ0Jyb3dhbGxpYVVQQycsICdCcnVzaCBTY3JpcHQgTVQnLCAnQ2FsaWZvcm5pYW4gRkInLCAnQ2FsaXN0byBNVCcsICdDYWxsaWdyYXBoZXInLCAnQ2FuZGFyYScsICdDYXNsb25PcG5mYWNlIEJUJywgJ0Nhc3RlbGxhcicsICdDZW50YXVyJywgJ0NlemFubmUnLCAnQ0cgT21lZ2EnLCAnQ0cgVGltZXMnLCAnQ2hhbGtib2FyZCcsICdDaGFsa2JvYXJkIFNFJywgJ0NoYWxrZHVzdGVyJywgJ0NoYXJsZXN3b3J0aCcsICdDaGFydGVyIEJkIEJUJywgJ0NoYXJ0ZXIgQlQnLCAnQ2hhdWNlcicsICdDaGVsdGhtSVRDIEJrIEJUJywgJ0NoaWxsZXInLCAnQ2xhcmVuZG9uJywgJ0NsYXJlbmRvbiBDb25kZW5zZWQnLCAnQ2xvaXN0ZXJCbGFjayBCVCcsICdDb2NoaW4nLCAnQ29sb25uYSBNVCcsICdDb25zdGFudGlhJywgJ0Nvb3BlciBCbGFjaycsICdDb3BwZXJwbGF0ZScsICdDb3BwZXJwbGF0ZSBHb3RoaWMnLCAnQ29wcGVycGxhdGUgR290aGljIEJvbGQnLCAnQ29wcGVycGxhdGUgR290aGljIExpZ2h0JywgJ0NvcHBlcnBsR290aCBCZCBCVCcsICdDb3JiZWwnLCAnQ29yZGlhIE5ldycsICdDb3JkaWFVUEMnLCAnQ29ybmVyc3RvbmUnLCAnQ29yb25ldCcsICdDdWNrb28nLCAnQ3VybHogTVQnLCAnRGF1blBlbmgnLCAnRGF1cGhpbicsICdEYXZpZCcsICdEQiBMQ0QgVGVtcCcsICdERUxJQ0lPVVMnLCAnRGVubWFyaycsICdERkthaS1TQicsICdEaWRvdCcsICdEaWxsZW5pYVVQQycsICdESU4nLCAnRG9rQ2hhbXBhJywgJ0RvdHVtJywgJ0RvdHVtQ2hlJywgJ0VicmltYScsICdFZHdhcmRpYW4gU2NyaXB0IElUQycsICdFbGVwaGFudCcsICdFbmdsaXNoIDExMSBWaXZhY2UgQlQnLCAnRW5ncmF2ZXJzIE1UJywgJ0VuZ3JhdmVyc0dvdGhpYyBCVCcsICdFcmFzIEJvbGQgSVRDJywgJ0VyYXMgRGVtaSBJVEMnLCAnRXJhcyBMaWdodCBJVEMnLCAnRXJhcyBNZWRpdW0gSVRDJywgJ0V1Y3Jvc2lhVVBDJywgJ0V1cGhlbWlhJywgJ0V1cGhlbWlhIFVDQVMnLCAnRVVST1NUSUxFJywgJ0V4b3RjMzUwIEJkIEJUJywgJ0ZhbmdTb25nJywgJ0ZlbGl4IFRpdGxpbmcnLCAnRml4ZWRzeXMnLCAnRk9OVElOJywgJ0Zvb3RsaWdodCBNVCBMaWdodCcsICdGb3J0ZScsICdGcmFua1J1ZWhsJywgJ0ZyYW5zaXNjYW4nLCAnRnJlZWZybTcyMSBCbGsgQlQnLCAnRnJlZXNpYVVQQycsICdGcmVlc3R5bGUgU2NyaXB0JywgJ0ZyZW5jaCBTY3JpcHQgTVQnLCAnRnJua0dvdGhJVEMgQmsgQlQnLCAnRnJ1aXRnZXInLCAnRlJVVElHRVInLCAnRnV0dXJhJywgJ0Z1dHVyYSBCayBCVCcsICdGdXR1cmEgTHQgQlQnLCAnRnV0dXJhIE1kIEJUJywgJ0Z1dHVyYSBaQmxrIEJUJywgJ0Z1dHVyYUJsYWNrIEJUJywgJ0dhYnJpb2xhJywgJ0dhbGxpYXJkIEJUJywgJ0dhdXRhbWknLCAnR2VlemEgUHJvJywgJ0dlb21ldHIyMzEgQlQnLCAnR2VvbWV0cjIzMSBIdiBCVCcsICdHZW9tZXRyMjMxIEx0IEJUJywgJ0dlb1NsYWIgNzAzIEx0IEJUJywgJ0dlb1NsYWIgNzAzIFhCZCBCVCcsICdHaWdpJywgJ0dpbGwgU2FucycsICdHaWxsIFNhbnMgTVQnLCAnR2lsbCBTYW5zIE1UIENvbmRlbnNlZCcsICdHaWxsIFNhbnMgTVQgRXh0IENvbmRlbnNlZCBCb2xkJywgJ0dpbGwgU2FucyBVbHRyYSBCb2xkJywgJ0dpbGwgU2FucyBVbHRyYSBCb2xkIENvbmRlbnNlZCcsICdHaXNoYScsICdHbG91Y2VzdGVyIE1UIEV4dHJhIENvbmRlbnNlZCcsICdHT1RIQU0nLCAnR09USEFNIEJPTEQnLCAnR291ZHkgT2xkIFN0eWxlJywgJ0dvdWR5IFN0b3V0JywgJ0dvdWR5SGFuZHRvb2xlZCBCVCcsICdHb3VkeU9MU3QgQlQnLCAnR3VqYXJhdGkgU2FuZ2FtIE1OJywgJ0d1bGltJywgJ0d1bGltQ2hlJywgJ0d1bmdzdWgnLCAnR3VuZ3N1aENoZScsICdHdXJtdWtoaSBNTicsICdIYWV0dGVuc2Nod2VpbGVyJywgJ0hhcmxvdyBTb2xpZCBJdGFsaWMnLCAnSGFycmluZ3RvbicsICdIZWF0aGVyJywgJ0hlaXRpIFNDJywgJ0hlaXRpIFRDJywgJ0hFTFYnLCAnSGVyYWxkJywgJ0hpZ2ggVG93ZXIgVGV4dCcsICdIaXJhZ2lubyBLYWt1IEdvdGhpYyBQcm9OJywgJ0hpcmFnaW5vIE1pbmNobyBQcm9OJywgJ0hvZWZsZXIgVGV4dCcsICdIdW1hbnN0IDUyMSBDbiBCVCcsICdIdW1hbnN0NTIxIEJUJywgJ0h1bWFuc3Q1MjEgTHQgQlQnLCAnSW1wcmludCBNVCBTaGFkb3cnLCAnSW5jaXNlZDkwMSBCZCBCVCcsICdJbmNpc2VkOTAxIEJUJywgJ0luY2lzZWQ5MDEgTHQgQlQnLCAnSU5DT05TT0xBVEEnLCAnSW5mb3JtYWwgUm9tYW4nLCAnSW5mb3JtYWwwMTEgQlQnLCAnSU5URVJTVEFURScsICdJcmlzVVBDJywgJ0lza29vbGEgUG90YScsICdKYXNtaW5lVVBDJywgJ0phenogTEVUJywgJ0plbnNvbicsICdKZXN0ZXInLCAnSm9rZXJtYW4nLCAnSnVpY2UgSVRDJywgJ0thYmVsIEJrIEJUJywgJ0thYmVsIFVsdCBCVCcsICdLYWlsYXNhJywgJ0thaVRpJywgJ0thbGluZ2EnLCAnS2FubmFkYSBTYW5nYW0gTU4nLCAnS2FydGlrYScsICdLYXVmbWFubiBCZCBCVCcsICdLYXVmbWFubiBCVCcsICdLaG1lciBVSScsICdLb2RjaGlhbmdVUEMnLCAnS29raWxhJywgJ0tvcmlubmEgQlQnLCAnS3Jpc3RlbiBJVEMnLCAnS3J1bmd0aGVwJywgJ0t1bnN0bGVyIFNjcmlwdCcsICdMYW8gVUknLCAnTGF0aGEnLCAnTGVlbGF3YWRlZScsICdMZXR0ZXIgR290aGljJywgJ0xldmVuaW0gTVQnLCAnTGlseVVQQycsICdMaXRob2dyYXBoJywgJ0xpdGhvZ3JhcGggTGlnaHQnLCAnTG9uZyBJc2xhbmQnLCAnTHlkaWFuIEJUJywgJ01hZ25ldG8nLCAnTWFpYW5kcmEgR0QnLCAnTWFsYXlhbGFtIFNhbmdhbSBNTicsICdNYWxndW4gR290aGljJywgJ01hbmdhbCcsICdNYXJpZ29sZCcsICdNYXJpb24nLCAnTWFya2VyIEZlbHQnLCAnTWFya2V0JywgJ01hcmxldHQnLCAnTWF0aXNzZSBJVEMnLCAnTWF0dXJhIE1UIFNjcmlwdCBDYXBpdGFscycsICdNZWlyeW8nLCAnTWVpcnlvIFVJJywgJ01pY3Jvc29mdCBIaW1hbGF5YScsICdNaWNyb3NvZnQgSmhlbmdIZWknLCAnTWljcm9zb2Z0IE5ldyBUYWkgTHVlJywgJ01pY3Jvc29mdCBQaGFnc1BhJywgJ01pY3Jvc29mdCBUYWkgTGUnLCAnTWljcm9zb2Z0IFVpZ2h1cicsICdNaWNyb3NvZnQgWWFIZWknLCAnTWljcm9zb2Z0IFlpIEJhaXRpJywgJ01pbmdMaVUnLCAnTWluZ0xpVV9IS1NDUycsICdNaW5nTGlVX0hLU0NTLUV4dEInLCAnTWluZ0xpVS1FeHRCJywgJ01pbmlvbicsICdNaW5pb24gUHJvJywgJ01pcmlhbScsICdNaXJpYW0gRml4ZWQnLCAnTWlzdHJhbCcsICdNb2Rlcm4nLCAnTW9kZXJuIE5vLiAyMCcsICdNb25hIExpc2EgU29saWQgSVRDIFRUJywgJ01vbmdvbGlhbiBCYWl0aScsICdNT05PJywgJ01vb2xCb3JhbicsICdNcnMgRWF2ZXMnLCAnTVMgTGluZURyYXcnLCAnTVMgTWluY2hvJywgJ01TIFBNaW5jaG8nLCAnTVMgUmVmZXJlbmNlIFNwZWNpYWx0eScsICdNUyBVSSBHb3RoaWMnLCAnTVQgRXh0cmEnLCAnTVVTRU8nLCAnTVYgQm9saScsICdOYWRlZW0nLCAnTmFya2lzaW0nLCAnTkVWSVMnLCAnTmV3cyBHb3RoaWMnLCAnTmV3cyBHb3RoaWNNVCcsICdOZXdzR290aCBCVCcsICdOaWFnYXJhIEVuZ3JhdmVkJywgJ05pYWdhcmEgU29saWQnLCAnTm90ZXdvcnRoeScsICdOU2ltU3VuJywgJ055YWxhJywgJ09DUiBBIEV4dGVuZGVkJywgJ09sZCBDZW50dXJ5JywgJ09sZCBFbmdsaXNoIFRleHQgTVQnLCAnT255eCcsICdPbnl4IEJUJywgJ09QVElNQScsICdPcml5YSBTYW5nYW0gTU4nLCAnT1NBS0EnLCAnT3pIYW5kaWNyYWZ0IEJUJywgJ1BhbGFjZSBTY3JpcHQgTVQnLCAnUGFweXJ1cycsICdQYXJjaG1lbnQnLCAnUGFydHkgTEVUJywgJ1BlZ2FzdXMnLCAnUGVycGV0dWEnLCAnUGVycGV0dWEgVGl0bGluZyBNVCcsICdQZXRpdGFCb2xkJywgJ1BpY2t3aWNrJywgJ1BsYW50YWdlbmV0IENoZXJva2VlJywgJ1BsYXliaWxsJywgJ1BNaW5nTGlVJywgJ1BNaW5nTGlVLUV4dEInLCAnUG9vciBSaWNoYXJkJywgJ1Bvc3RlcicsICdQb3N0ZXJCb2RvbmkgQlQnLCAnUFJJTkNFVE9XTiBMRVQnLCAnUHJpc3RpbmEnLCAnUFRCYXJudW0gQlQnLCAnUHl0aGFnb3JhcycsICdSYWF2aScsICdSYWdlIEl0YWxpYycsICdSYXZpZScsICdSaWJib24xMzEgQmQgQlQnLCAnUm9ja3dlbGwnLCAnUm9ja3dlbGwgQ29uZGVuc2VkJywgJ1JvY2t3ZWxsIEV4dHJhIEJvbGQnLCAnUm9kJywgJ1JvbWFuJywgJ1Nha2thbCBNYWphbGxhJywgJ1NhbnRhIEZlIExFVCcsICdTYXZveWUgTEVUJywgJ1NjZXB0cmUnLCAnU2NyaXB0JywgJ1NjcmlwdCBNVCBCb2xkJywgJ1NDUklQVElOQScsICdTZXJpZmEnLCAnU2VyaWZhIEJUJywgJ1NlcmlmYSBUaCBCVCcsICdTaGVsbGV5Vm9sYW50ZSBCVCcsICdTaGVyd29vZCcsICdTaG9uYXIgQmFuZ2xhJywgJ1Nob3djYXJkIEdvdGhpYycsICdTaHJ1dGknLCAnU2lnbmJvYXJkJywgJ1NJTEtTQ1JFRU4nLCAnU2ltSGVpJywgJ1NpbXBsaWZpZWQgQXJhYmljJywgJ1NpbXBsaWZpZWQgQXJhYmljIEZpeGVkJywgJ1NpbVN1bicsICdTaW1TdW4tRXh0QicsICdTaW5oYWxhIFNhbmdhbSBNTicsICdTa2V0Y2ggUm9ja3dlbGwnLCAnU2tpYScsICdTbWFsbCBGb250cycsICdTbmFwIElUQycsICdTbmVsbCBSb3VuZGhhbmQnLCAnU29ja2V0JywgJ1NvdXZlbmlyIEx0IEJUJywgJ1N0YWNjYXRvMjIyIEJUJywgJ1N0ZWFtZXInLCAnU3RlbmNpbCcsICdTdG9yeWJvb2snLCAnU3R5bGxvJywgJ1N1YndheScsICdTd2lzNzIxIEJsa0V4IEJUJywgJ1N3aXNzOTExIFhDbSBCVCcsICdTeWxmYWVuJywgJ1N5bmNocm8gTEVUJywgJ1N5c3RlbScsICdUYW1pbCBTYW5nYW0gTU4nLCAnVGVjaG5pY2FsJywgJ1RlbGV0eXBlJywgJ1RlbHVndSBTYW5nYW0gTU4nLCAnVGVtcHVzIFNhbnMgSVRDJywgJ1Rlcm1pbmFsJywgJ1Rob25idXJpJywgJ1RyYWRpdGlvbmFsIEFyYWJpYycsICdUcmFqYW4nLCAnVFJBSkFOIFBSTycsICdUcmlzdGFuJywgJ1R1YnVsYXInLCAnVHVuZ2EnLCAnVHcgQ2VuIE1UJywgJ1R3IENlbiBNVCBDb25kZW5zZWQnLCAnVHcgQ2VuIE1UIENvbmRlbnNlZCBFeHRyYSBCb2xkJywgJ1R5cG9VcHJpZ2h0IEJUJywgJ1VuaWNvcm4nLCAnVW5pdmVycycsICdVbml2ZXJzIENFIDU1IE1lZGl1bScsICdVbml2ZXJzIENvbmRlbnNlZCcsICdVdHNhYWgnLCAnVmFnYWJvbmQnLCAnVmFuaScsICdWaWpheWEnLCAnVmluZXIgSGFuZCBJVEMnLCAnVmlzdWFsVUknLCAnVml2YWxkaScsICdWbGFkaW1pciBTY3JpcHQnLCAnVnJpbmRhJywgJ1dlc3RtaW5zdGVyJywgJ1dISVRORVknLCAnV2lkZSBMYXRpbicsICdaYXBmRWxsaXB0IEJUJywgJ1phcGZIdW1uc3QgQlQnLCAnWmFwZkh1bW5zdCBEbSBCVCcsICdaYXBmaW5vJywgJ1p1cmljaCBCbGtFeCBCVCcsICdadXJpY2ggRXggQlQnLCAnWldBZG9iZUYnXSkpOyBkID0gKGQgPSBkLmNvbmNhdCh0LmZvbnRzLnVzZXJEZWZpbmVkRm9udHMpKS5maWx0ZXIoKGUsIHQpID0+IHsgcmV0dXJuIGQuaW5kZXhPZihlKSA9PT0gdDsgfSk7IGNvbnN0IGEgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdOyBjb25zdCByID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7IGNvbnN0IGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsgY29uc3QgbiA9IHt9OyBjb25zdCBpID0ge307IGNvbnN0IGYgPSBmdW5jdGlvbiAoKSB7IGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7IHJldHVybiBlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJywgZS5zdHlsZS5sZWZ0ID0gJy05OTk5cHgnLCBlLnN0eWxlLmZvbnRTaXplID0gJzcycHgnLCBlLnN0eWxlLmZvbnRTdHlsZSA9ICdub3JtYWwnLCBlLnN0eWxlLmZvbnRXZWlnaHQgPSAnbm9ybWFsJywgZS5zdHlsZS5sZXR0ZXJTcGFjaW5nID0gJ25vcm1hbCcsIGUuc3R5bGUubGluZUJyZWFrID0gJ2F1dG8nLCBlLnN0eWxlLmxpbmVIZWlnaHQgPSAnbm9ybWFsJywgZS5zdHlsZS50ZXh0VHJhbnNmb3JtID0gJ25vbmUnLCBlLnN0eWxlLnRleHRBbGlnbiA9ICdsZWZ0JywgZS5zdHlsZS50ZXh0RGVjb3JhdGlvbiA9ICdub25lJywgZS5zdHlsZS50ZXh0U2hhZG93ID0gJ25vbmUnLCBlLnN0eWxlLndoaXRlU3BhY2UgPSAnbm9ybWFsJywgZS5zdHlsZS53b3JkQnJlYWsgPSAnbm9ybWFsJywgZS5zdHlsZS53b3JkU3BhY2luZyA9ICdub3JtYWwnLCBlLmlubmVySFRNTCA9ICdtbW1tbW1tbW1tbGxpJywgZTsgfTsgY29uc3QgbyA9IGZ1bmN0aW9uIChlKSB7IGZvciAodmFyIHQgPSAhMSwgYSA9IDA7IGEgPCB1Lmxlbmd0aDsgYSsrKSBpZiAodCA9IGVbYV0ub2Zmc2V0V2lkdGggIT09IG5bdVthXV0gfHwgZVthXS5vZmZzZXRIZWlnaHQgIT09IGlbdVthXV0pIHJldHVybiB0OyByZXR1cm4gdDsgfTsgY29uc3QgbCA9IChmdW5jdGlvbiAoKSB7IGZvciAodmFyIGUgPSBbXSwgdCA9IDAsIGEgPSB1Lmxlbmd0aDsgdCA8IGE7IHQrKykgeyBjb25zdCBuID0gZigpOyBuLnN0eWxlLmZvbnRGYW1pbHkgPSB1W3RdLCByLmFwcGVuZENoaWxkKG4pLCBlLnB1c2gobik7IH0gcmV0dXJuIGU7IH0oKSk7IGEuYXBwZW5kQ2hpbGQocik7IGZvciAobGV0IHMgPSAwLCBjID0gdS5sZW5ndGg7IHMgPCBjOyBzKyspblt1W3NdXSA9IGxbc10ub2Zmc2V0V2lkdGgsIGlbdVtzXV0gPSBsW3NdLm9mZnNldEhlaWdodDsgY29uc3QgaCA9IChmdW5jdGlvbiAoKSB7IGZvciAodmFyIGUsIHQsIGEsIG4gPSB7fSwgciA9IDAsIGkgPSBkLmxlbmd0aDsgciA8IGk7IHIrKykgeyBmb3IgKHZhciBvID0gW10sIGwgPSAwLCBzID0gdS5sZW5ndGg7IGwgPCBzOyBsKyspIHsgY29uc3QgYyA9IChlID0gZFtyXSwgdCA9IHVbbF0sIGEgPSB2b2lkIDAsIChhID0gZigpKS5zdHlsZS5mb250RmFtaWx5ID0gYCcke2V9Jywke3R9YCwgYSk7IGcuYXBwZW5kQ2hpbGQoYyksIG8ucHVzaChjKTsgfW5bZFtyXV0gPSBvOyB9IHJldHVybiBuOyB9KCkpOyBhLmFwcGVuZENoaWxkKGcpOyBmb3IgKHZhciBtID0gW10sIFQgPSAwLCBwID0gZC5sZW5ndGg7IFQgPCBwOyBUKyspbyhoW2RbVF1dKSAmJiBtLnB1c2goZFtUXSk7IGEucmVtb3ZlQ2hpbGQoZyksIGEucmVtb3ZlQ2hpbGQociksIGUobSk7IH0sIHBhdXNlQmVmb3JlOiAhMCB9LCB7IGtleTogJ2ZvbnRzRmxhc2gnLCBnZXREYXRhKHQsIGUpIHsgcmV0dXJuIEQoKSA/IE4oKSA/IGUuZm9udHMuc3dmUGF0aCA/IHZvaWQgXygoZSkgPT4geyB0KGUpOyB9LCBlKSA6IHQoJ21pc3Npbmcgb3B0aW9ucy5mb250cy5zd2ZQYXRoJykgOiB0KCdmbGFzaCBub3QgaW5zdGFsbGVkJykgOiB0KCdzd2Ygb2JqZWN0IG5vdCBsb2FkZWQnKTsgfSwgcGF1c2VCZWZvcmU6ICEwIH0sIHsga2V5OiAnYXVkaW8nLCBnZXREYXRhKGEsIGUpIHsgY29uc3QgdCA9IGUuYXVkaW87IGlmICh0LmV4Y2x1ZGVJT1MxMSAmJiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9PUyAxMS4rVmVyc2lvblxcLzExLitTYWZhcmkvKSkgcmV0dXJuIGEoZS5FWENMVURFRCk7IGNvbnN0IG4gPSB3aW5kb3cuT2ZmbGluZUF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0T2ZmbGluZUF1ZGlvQ29udGV4dDsgaWYgKG4gPT0gbnVsbCkgcmV0dXJuIGEoZS5OT1RfQVZBSUxBQkxFKTsgbGV0IHIgPSBuZXcgbigxLCA0NDEwMCwgNDQxMDApOyBjb25zdCBpID0gci5jcmVhdGVPc2NpbGxhdG9yKCk7IGkudHlwZSA9ICd0cmlhbmdsZScsIGkuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDFlNCwgci5jdXJyZW50VGltZSk7IGNvbnN0IG8gPSByLmNyZWF0ZUR5bmFtaWNzQ29tcHJlc3NvcigpOyBjKFtbJ3RocmVzaG9sZCcsIC01MF0sIFsna25lZScsIDQwXSwgWydyYXRpbycsIDEyXSwgWydyZWR1Y3Rpb24nLCAtMjBdLCBbJ2F0dGFjaycsIDBdLCBbJ3JlbGVhc2UnLCAwLjI1XV0sIChlKSA9PiB7IHZvaWQgMCAhPT0gb1tlWzBdXSAmJiB0eXBlb2Ygb1tlWzBdXS5zZXRWYWx1ZUF0VGltZSA9PT0gJ2Z1bmN0aW9uJyAmJiBvW2VbMF1dLnNldFZhbHVlQXRUaW1lKGVbMV0sIHIuY3VycmVudFRpbWUpOyB9KSwgaS5jb25uZWN0KG8pLCBvLmNvbm5lY3Qoci5kZXN0aW5hdGlvbiksIGkuc3RhcnQoMCksIHIuc3RhcnRSZW5kZXJpbmcoKTsgY29uc3QgbCA9IHNldFRpbWVvdXQoKCkgPT4geyByZXR1cm4gY29uc29sZS53YXJuKGBBdWRpbyBmaW5nZXJwcmludCB0aW1lZCBvdXQuIFBsZWFzZSByZXBvcnQgYnVnIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9WYWx2ZS9maW5nZXJwcmludGpzMiB3aXRoIHlvdXIgdXNlciBhZ2VudDogXCIke25hdmlnYXRvci51c2VyQWdlbnR9XCIuYCksIHIub25jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHt9LCByID0gbnVsbCwgYSgnYXVkaW9UaW1lb3V0Jyk7IH0sIHQudGltZW91dCk7IHIub25jb21wbGV0ZSA9IGZ1bmN0aW9uIChlKSB7IGxldCB0OyB0cnkgeyBjbGVhclRpbWVvdXQobCksIHQgPSBlLnJlbmRlcmVkQnVmZmVyLmdldENoYW5uZWxEYXRhKDApLnNsaWNlKDQ1MDAsIDVlMykucmVkdWNlKChlLCB0KSA9PiB7IHJldHVybiBlICsgTWF0aC5hYnModCk7IH0sIDApLnRvU3RyaW5nKCksIGkuZGlzY29ubmVjdCgpLCBvLmRpc2Nvbm5lY3QoKTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gdm9pZCBhKGUpOyB9YSh0KTsgfTsgfSB9LCB7IGtleTogJ2VudW1lcmF0ZURldmljZXMnLCBnZXREYXRhKHQsIGUpIHsgaWYgKCFhKCkpIHJldHVybiB0KGUuTk9UX0FWQUlMQUJMRSk7IG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpLnRoZW4oKGUpID0+IHsgdChlLm1hcCgoZSkgPT4geyByZXR1cm4gYGlkPSR7ZS5kZXZpY2VJZH07Z2lkPSR7ZS5ncm91cElkfTske2Uua2luZH07JHtlLmxhYmVsfWA7IH0pKTsgfSkuY2F0Y2goKGUpID0+IHsgdChlKTsgfSk7IH0gfV07IGNvbnN0IFUgPSBmdW5jdGlvbiAoZSkgeyB0aHJvdyBuZXcgRXJyb3IoXCInbmV3IEZpbmdlcnByaW50KCknIGlzIGRlcHJlY2F0ZWQsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vVmFsdmUvZmluZ2VycHJpbnRqczIjdXBncmFkZS1ndWlkZS1mcm9tLTE4Mi10by0yMDBcIik7IH07IHJldHVybiBVLmdldCA9IGZ1bmN0aW9uIChhLCBuKSB7IG4gPyBhIHx8IChhID0ge30pIDogKG4gPSBhLCBhID0ge30pLCAoZnVuY3Rpb24gKGUsIHQpIHsgaWYgKHQgPT0gbnVsbCkgcmV0dXJuOyBsZXQgYTsgbGV0IG47IGZvciAobiBpbiB0KShhID0gdFtuXSkgPT0gbnVsbCB8fCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSwgbikgfHwgKGVbbl0gPSBhKTsgfShhLCBlKSksIGEuY29tcG9uZW50cyA9IGEuZXh0cmFDb21wb25lbnRzLmNvbmNhdChHKTsgdmFyIHIgPSB7IGRhdGE6IFtdLCBhZGRQcmVwcm9jZXNzZWRDb21wb25lbnQoZSwgdCkgeyB0eXBlb2YgYS5wcmVwcm9jZXNzb3IgPT09ICdmdW5jdGlvbicgJiYgKHQgPSBhLnByZXByb2Nlc3NvcihlLCB0KSksIHIuZGF0YS5wdXNoKHsga2V5OiBlLCB2YWx1ZTogdCB9KTsgfSB9OyBsZXQgaSA9IC0xOyB2YXIgbyA9IGZ1bmN0aW9uIChlKSB7IGlmICgoaSArPSAxKSA+PSBhLmNvbXBvbmVudHMubGVuZ3RoKW4oci5kYXRhKTsgZWxzZSB7IGNvbnN0IHQgPSBhLmNvbXBvbmVudHNbaV07IGlmIChhLmV4Y2x1ZGVzW3Qua2V5XSlvKCExKTsgZWxzZSB7IGlmICghZSAmJiB0LnBhdXNlQmVmb3JlKSByZXR1cm4gaSAtPSAxLCB2b2lkIHNldFRpbWVvdXQoKCkgPT4geyBvKCEwKTsgfSwgMSk7IHRyeSB7IHQuZ2V0RGF0YSgoZSkgPT4geyByLmFkZFByZXByb2Nlc3NlZENvbXBvbmVudCh0LmtleSwgZSksIG8oITEpOyB9LCBhKTsgfSBjYXRjaCAoZSkgeyByLmFkZFByZXByb2Nlc3NlZENvbXBvbmVudCh0LmtleSwgU3RyaW5nKGUpKSwgbyghMSk7IH0gfSB9IH07IG8oITEpOyB9LCBVLmdldFByb21pc2UgPSBmdW5jdGlvbiAoYSkgeyByZXR1cm4gbmV3IFByb21pc2UoKChlLCB0KSA9PiB7IFUuZ2V0KGEsIGUpOyB9KSk7IH0sIFUuZ2V0VjE4ID0gZnVuY3Rpb24gKGksIG8pIHsgcmV0dXJuIG8gPT0gbnVsbCAmJiAobyA9IGksIGkgPSB7fSksIFUuZ2V0KGksIChlKSA9PiB7IGZvciAodmFyIHQgPSBbXSwgYSA9IDA7IGEgPCBlLmxlbmd0aDsgYSsrKSB7IGNvbnN0IG4gPSBlW2FdOyBpZiAobi52YWx1ZSA9PT0gKGkuTk9UX0FWQUlMQUJMRSB8fCAnbm90IGF2YWlsYWJsZScpKXQucHVzaCh7IGtleTogbi5rZXksIHZhbHVlOiAndW5rbm93bicgfSk7IGVsc2UgaWYgKG4ua2V5ID09PSAncGx1Z2lucycpdC5wdXNoKHsga2V5OiAncGx1Z2lucycsIHZhbHVlOiBzKG4udmFsdWUsIChlKSA9PiB7IGNvbnN0IHQgPSBzKGVbMl0sIChlKSA9PiB7IHJldHVybiBlLmpvaW4gPyBlLmpvaW4oJ34nKSA6IGU7IH0pLmpvaW4oJywnKTsgcmV0dXJuIFtlWzBdLCBlWzFdLCB0XS5qb2luKCc6OicpOyB9KSB9KTsgZWxzZSBpZiAoWydjYW52YXMnLCAnd2ViZ2wnXS5pbmRleE9mKG4ua2V5KSAhPT0gLTEpdC5wdXNoKHsga2V5OiBuLmtleSwgdmFsdWU6IG4udmFsdWUuam9pbignficpIH0pOyBlbHNlIGlmIChbJ3Nlc3Npb25TdG9yYWdlJywgJ2xvY2FsU3RvcmFnZScsICdpbmRleGVkRGInLCAnYWRkQmVoYXZpb3InLCAnb3BlbkRhdGFiYXNlJ10uaW5kZXhPZihuLmtleSkgIT09IC0xKSB7IGlmICghbi52YWx1ZSkgY29udGludWU7IHQucHVzaCh7IGtleTogbi5rZXksIHZhbHVlOiAxIH0pOyB9IGVsc2Ugbi52YWx1ZSA/IHQucHVzaChuLnZhbHVlLmpvaW4gPyB7IGtleTogbi5rZXksIHZhbHVlOiBuLnZhbHVlLmpvaW4oJzsnKSB9IDogbikgOiB0LnB1c2goeyBrZXk6IG4ua2V5LCB2YWx1ZTogbi52YWx1ZSB9KTsgfSBjb25zdCByID0gbChzKHQsIChlKSA9PiB7IHJldHVybiBlLnZhbHVlOyB9KS5qb2luKCd+fn4nKSwgMzEpOyBvKHIsIHQpOyB9KTsgfSwgVS54NjRoYXNoMTI4ID0gbCwgVS5WRVJTSU9OID0gJzIuMS4wJywgVTtcbn0pKTtcbiIsImNvbnN0IGNvbmZpZyA9IHtcbiAgQVBJX1VSTDogJ2h0dHBzOi8vd2F2ZWxvb3Atc3RhZ2luZy1hcGkucGFyYWxlY3QubmV0L3RyYWNrJyxcbiAgQVBJX1VSTF9ERVY6ICdodHRwOi8vbG9jYWxob3N0OjMwMDEvdHJhY2snLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5cbmNvbnN0IEFQSV9VUkwgPSBwcm9jZXNzLmVudi5CVUlMRCA9PT0gJ2RldicgPyBjb25maWcuQVBJX1VSTF9ERVYgOiBjb25maWcuQVBJX1VSTDtcblxuY29uc3QgQ0xBU1NfRElWSURFUiA9IC8gL2c7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0RFQk9VTkNFX1RJTUUgPSA1MDA7XG5leHBvcnQgY29uc3QgREVGQVVMVF9USFJPVFRMRV9USU1FID0gMTAwMDtcblxuY29uc3QgZ2V0UGFyZW50cyA9IChlbGVtZW50KSA9PiB7XG4gIGNvbnN0IHBhcmVudHMgPSBbXTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZm9yICg7IGVsZW1lbnQgJiYgZWxlbWVudCAhPT0gZG9jdW1lbnQ7IGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICBwYXJlbnRzLnB1c2goZWxlbWVudCk7XG4gIH1cblxuICByZXR1cm4gcGFyZW50cztcbn07XG5cbmNvbnN0IGdldENvdW50U2FtZU5vZGVOYW1lID0gKGVsZW1lbnRzQXJyYXksIGVsZW1lbnQpID0+IHtcbiAgbGV0IGNvdW50ID0gMDtcblxuICBbLi4uZWxlbWVudHNBcnJheV0uZm9yRWFjaCgoY3VycmVudEVsZW1lbnQpID0+IHtcbiAgICBpZiAoY3VycmVudEVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICBjb3VudCArPSAxO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGNvdW50O1xufTtcblxuY29uc3QgZ2V0TnRoTnVtYmVyID0gKGVsZW1lbnQpID0+IHtcbiAgbGV0IG50aCA9IDE7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbmQtYXNzaWduLG5vLXBhcmFtLXJlYXNzaWduXG4gIHdoaWxlIChlbGVtZW50ID0gZWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgbnRoICs9IDE7XG4gIH1cblxuICByZXR1cm4gbnRoO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldENzc1BhdGggPSAoZWxlbWVudCkgPT4ge1xuICBsZXQgZWxlbWVudFBhcmVudHMgPSBnZXRQYXJlbnRzKGVsZW1lbnQpO1xuICBlbGVtZW50UGFyZW50cyA9IGVsZW1lbnRQYXJlbnRzLnNwbGljZSgwLCBlbGVtZW50UGFyZW50cy5sZW5ndGggLSAxKTtcblxuICBjb25zdCBzZWxlY3RvcnNBcnJheSA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudFBhcmVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBlbGVtZW50SXRlbSA9IGVsZW1lbnRQYXJlbnRzW2ldO1xuXG4gICAgY29uc3Qgbm9kZU5hbWUgPSBlbGVtZW50SXRlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgbGV0IGlkID0gJyc7XG4gICAgbGV0IHNlbGVjdG9yID0gJyc7XG5cbiAgICBpZiAoZWxlbWVudEl0ZW0uaWQpIHtcbiAgICAgIGlkID0gYCMke2VsZW1lbnRJdGVtLmlkfWA7XG4gICAgfVxuXG4gICAgaWYgKGlkKSB7XG4gICAgICBzZWxlY3RvciA9IGlkO1xuICAgICAgc2VsZWN0b3JzQXJyYXkucHVzaChzZWxlY3Rvcik7XG4gICAgICBicmVhaztcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0b3IgPSBub2RlTmFtZTtcbiAgICAgIGNvbnN0IHsgcGFyZW50Tm9kZSB9ID0gZWxlbWVudEl0ZW07XG5cbiAgICAgIGlmIChwYXJlbnROb2RlKSB7XG4gICAgICAgIGNvbnN0IHNpYmxpbmcgPSBwYXJlbnROb2RlLmNoaWxkcmVuO1xuICAgICAgICBjb25zdCBjb3VudFNhbWVOb2RlTmFtZSA9IGdldENvdW50U2FtZU5vZGVOYW1lKHNpYmxpbmcsIGVsZW1lbnRJdGVtKTtcblxuICAgICAgICBpZiAoc2libGluZy5sZW5ndGggPiAxICYmIGNvdW50U2FtZU5vZGVOYW1lID4gMSkge1xuICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBlbGVtZW50SXRlbS5jbGFzc05hbWUgPyBgLiR7ZWxlbWVudEl0ZW0uY2xhc3NOYW1lLnJlcGxhY2UoQ0xBU1NfRElWSURFUiwgJy4nKX1gIDogJyc7XG5cbiAgICAgICAgICBpZiAoY2xhc3NOYW1lcykge1xuICAgICAgICAgICAgc2VsZWN0b3IgKz0gY2xhc3NOYW1lcztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbnRoTnVtYmVyID0gZ2V0TnRoTnVtYmVyKGVsZW1lbnRJdGVtKTtcbiAgICAgICAgICAgIHNlbGVjdG9yICs9IGA6bnRoLWNoaWxkKCR7bnRoTnVtYmVyfSlgO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdG9yc0FycmF5LnB1c2goc2VsZWN0b3IpO1xuICB9XG5cbiAgY29uc3QgcmVzdWx0UGF0aCA9IHNlbGVjdG9yc0FycmF5LnJldmVyc2UoKS5qb2luKCcgPiAnKTtcblxuICByZXR1cm4gcmVzdWx0UGF0aDtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRWYWx1ZSA9IChlbGVtZW50KSA9PiB7XG4gIHJldHVybiBgJHtlbGVtZW50LnZhbHVlIHx8IGVsZW1lbnQuaW5uZXJUZXh0IHx8ICcnfWA7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VuZERhdGEgPSAodXJsLCBkYXRhKSA9PiBmZXRjaChgJHtBUElfVVJMfS8ke3VybH1gLCB7XG4gIG1ldGhvZDogJ1BPU1QnLFxuICBoZWFkZXJzOiB7XG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgfSxcbiAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG59KS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKTtcblxuZXhwb3J0IGNvbnN0IHNlbmRUcmFja0RhdGEgPSAodXNlckRhdGEsIHVybCwgZGF0YSkgPT4gc2VuZERhdGEoXG4gIHVybCxcbiAge1xuICAgIC4uLmRhdGEsXG4gICAgcHJvamVjdElkOiB1c2VyRGF0YS5wcm9qZWN0SWQsXG4gICAgdmlzaXRvcklkOiB1c2VyRGF0YS52aXNpdG9ySWQsXG4gICAgc2Vzc2lvbklkOiB1c2VyRGF0YS5zZXNzaW9uSWQsXG4gIH0sXG4pLnRoZW4oKHRyYWNrRGF0YSkgPT4ge1xuICBpZiAodHJhY2tEYXRhLnNlc3Npb25JZCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHVzZXJEYXRhLnNlc3Npb25JZCA9IHRyYWNrRGF0YS5zZXNzaW9uSWQ7XG4gIH1cblxuICByZXR1cm4gdHJhY2tEYXRhO1xufSk7XG5cbmV4cG9ydCBjb25zdCByZWdpc3RlckhhbmRsZXJzID0gKHVzZXJEYXRhLCBoYW5kbGVycykgPT4ge1xuICBoYW5kbGVycy5mb3JFYWNoKChoYW5kbGVyKSA9PiBoYW5kbGVyKHVzZXJEYXRhKSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGVib3VuY2UgPSAoZnVuYywgZGVsYXkpID0+IHtcbiAgbGV0IGJsb2NrZXJJZDtcblxuICByZXR1cm4gKGFyZ3MpID0+IHtcbiAgICBjbGVhclRpbWVvdXQoYmxvY2tlcklkKTtcbiAgICBibG9ja2VySWQgPSBzZXRUaW1lb3V0KCgpID0+IGZ1bmMoYXJncyksIGRlbGF5KTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCB0aHJvdHRsZSA9IChmdW5jLCBsaW1pdCkgPT4ge1xuICBsZXQgaXNCbG9ja2VkID0gZmFsc2U7XG5cbiAgcmV0dXJuIChhcmdzKSA9PiB7XG4gICAgaWYgKGlzQmxvY2tlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZ1bmMoYXJncyk7XG5cbiAgICBpc0Jsb2NrZWQgPSB0cnVlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4geyBpc0Jsb2NrZWQgPSBmYWxzZTsgfSwgbGltaXQpO1xuICB9O1xufTtcblxuY29uc3QgaW5jbHVkZXMgPSAoaGF5c3RhY2ssIG5lZWRsZSkgPT4ge1xuICByZXR1cm4gaGF5c3RhY2suaW5kZXhPZihuZWVkbGUpICE9PSAtMTtcbn07XG5cbmNvbnN0IGZpbmQgPSAobmVlZGxlKSA9PiB7XG4gIHJldHVybiBpbmNsdWRlcyhuYXZpZ2F0b3IudXNlckFnZW50LnRvTG9jYWxlTG93ZXJDYXNlKCksIG5lZWRsZSk7XG59O1xuXG5jb25zdCB3aW5kb3dzID0gKCkgPT4ge1xuICByZXR1cm4gZmluZCgnd2luZG93cycpO1xufTtcblxuY29uc3QgbGludXggPSAoKSA9PiB7XG4gIHJldHVybiBmaW5kKCdsaW51eCcpO1xufTtcblxuY29uc3QgaXBob25lID0gKCkgPT4ge1xuICByZXR1cm4gIXdpbmRvd3MoKSAmJiBmaW5kKCdpcGhvbmUnKTtcbn07XG5cbmNvbnN0IGlwb2QgPSAoKSA9PiB7XG4gIHJldHVybiBmaW5kKCdpcG9kJyk7XG59O1xuXG5jb25zdCBpcGFkID0gKCkgPT4ge1xuICBjb25zdCBpUGFkT1MxM1VwID0gbmF2aWdhdG9yLnBsYXRmb3JtID09PSAnTWFjSW50ZWwnICYmIG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDE7XG4gIHJldHVybiBmaW5kKCdpcGFkJykgfHwgaVBhZE9TMTNVcDtcbn07XG5cbmNvbnN0IGlvcyA9ICgpID0+IHtcbiAgcmV0dXJuIGlwaG9uZSgpIHx8IGlwb2QoKSB8fCBpcGFkKCk7XG59O1xuXG5jb25zdCBtYWNvcyA9ICgpID0+IHtcbiAgcmV0dXJuIGZpbmQoJ21hYycpO1xufTtcblxuY29uc3QgYW5kcm9pZCA9ICgpID0+IHtcbiAgcmV0dXJuICF3aW5kb3dzKCkgJiYgZmluZCgnYW5kcm9pZCcpO1xufTtcblxuY29uc3QgYW5kcm9pZFBob25lID0gKCkgPT4ge1xuICByZXR1cm4gYW5kcm9pZCgpICYmIGZpbmQoJ21vYmlsZScpO1xufTtcblxuY29uc3QgYW5kcm9pZFRhYmxldCA9ICgpID0+IHtcbiAgcmV0dXJuIGFuZHJvaWQoKSAmJiAhZmluZCgnbW9iaWxlJyk7XG59O1xuXG5jb25zdCBibGFja2JlcnJ5ID0gKCkgPT4ge1xuICByZXR1cm4gZmluZCgnYmxhY2tiZXJyeScpIHx8IGZpbmQoJ2JiMTAnKTtcbn07XG5cbmNvbnN0IGJsYWNrYmVycnlQaG9uZSA9ICgpID0+IHtcbiAgcmV0dXJuIGJsYWNrYmVycnkoKSAmJiAhZmluZCgndGFibGV0Jyk7XG59O1xuXG5jb25zdCBibGFja2JlcnJ5VGFibGV0ID0gKCkgPT4ge1xuICByZXR1cm4gYmxhY2tiZXJyeSgpICYmIGZpbmQoJ3RhYmxldCcpO1xufTtcblxuY29uc3Qgd2luZG93c1Bob25lID0gKCkgPT4ge1xuICByZXR1cm4gd2luZG93cygpICYmIGZpbmQoJ3Bob25lJyk7XG59O1xuXG5jb25zdCB3aW5kb3dzVGFibGV0ID0gKCkgPT4ge1xuICByZXR1cm4gd2luZG93cygpICYmIChmaW5kKCd0b3VjaCcpICYmICF3aW5kb3dzUGhvbmUoKSk7XG59O1xuXG5jb25zdCBmeG9zID0gKCkgPT4ge1xuICByZXR1cm4gKGZpbmQoJyhtb2JpbGUnKSB8fCBmaW5kKCcodGFibGV0JykpICYmIGZpbmQoJyBydjonKTtcbn07XG5cbmNvbnN0IGZ4b3NQaG9uZSA9ICgpID0+IHtcbiAgcmV0dXJuIGZ4b3MoKSAmJiBmaW5kKCdtb2JpbGUnKTtcbn07XG5cbmNvbnN0IGZ4b3NUYWJsZXQgPSAoKSA9PiB7XG4gIHJldHVybiBmeG9zKCkgJiYgZmluZCgndGFibGV0Jyk7XG59O1xuXG5jb25zdCBtZWVnbyA9ICgpID0+IHtcbiAgcmV0dXJuIGZpbmQoJ21lZWdvJyk7XG59O1xuXG5jb25zdCBtb2JpbGUgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgYW5kcm9pZFBob25lKClcbiAgICB8fCBpcGhvbmUoKVxuICAgIHx8IGlwb2QoKVxuICAgIHx8IHdpbmRvd3NQaG9uZSgpXG4gICAgfHwgYmxhY2tiZXJyeVBob25lKClcbiAgICB8fCBmeG9zUGhvbmUoKVxuICAgIHx8IG1lZWdvKClcbiAgKTtcbn07XG5cbmNvbnN0IHRhYmxldCA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICBpcGFkKClcbiAgICB8fCBhbmRyb2lkVGFibGV0KClcbiAgICB8fCBibGFja2JlcnJ5VGFibGV0KClcbiAgICB8fCB3aW5kb3dzVGFibGV0KClcbiAgICB8fCBmeG9zVGFibGV0KClcbiAgKTtcbn07XG5cbmNvbnN0IGRlc2t0b3AgPSAoKSA9PiB7XG4gIHJldHVybiAhdGFibGV0KCkgJiYgIW1vYmlsZSgpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldERldmljZVR5cGUgPSAoKSA9PiB7XG4gIGlmIChkZXNrdG9wKCkpIHtcbiAgICByZXR1cm4gJ2Rlc2t0b3AnO1xuICB9XG5cbiAgaWYgKHRhYmxldCgpKSB7XG4gICAgcmV0dXJuICd0YWJsZXQnO1xuICB9XG5cbiAgaWYgKG1vYmlsZSgpKSB7XG4gICAgcmV0dXJuICdtb2JpbGUnO1xuICB9XG5cbiAgcmV0dXJuICd1bmtub3duJztcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRPUyA9ICgpID0+IHtcbiAgaWYgKGlvcygpKSB7XG4gICAgcmV0dXJuICdpb3MnO1xuICB9XG5cbiAgaWYgKGFuZHJvaWQoKSkge1xuICAgIHJldHVybiAnYW5kcm9pZCc7XG4gIH1cblxuICBpZiAoYmxhY2tiZXJyeSgpKSB7XG4gICAgcmV0dXJuICdibGFja2JlcnJ5JztcbiAgfVxuXG4gIGlmIChtYWNvcygpKSB7XG4gICAgcmV0dXJuICdtYWNvcyc7XG4gIH1cblxuICBpZiAod2luZG93cygpKSB7XG4gICAgcmV0dXJuICd3aW5kb3dzJztcbiAgfVxuXG4gIGlmIChsaW51eCgpKSB7XG4gICAgcmV0dXJuICdsaW51eCc7XG4gIH1cblxuICBpZiAoZnhvcygpKSB7XG4gICAgcmV0dXJuICdmeG9zJztcbiAgfVxuXG4gIGlmIChtZWVnbygpKSB7XG4gICAgcmV0dXJuICdtZWVnbyc7XG4gIH1cblxuICByZXR1cm4gJ3Vua25vd24nO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXJOYW1lID0gKCkgPT4ge1xuICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdFZGdlJykgPiAtMSAmJiBuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKCdFZGdlJykgPiAtMSkge1xuICAgIHJldHVybiAnRWRnZSc7XG4gIH1cblxuICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdPcGVyYScpICE9PSAtMSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09QUicpICE9PSAtMSkge1xuICAgIHJldHVybiAnT3BlcmEnO1xuICB9XG5cbiAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lJykgIT09IC0xKSB7XG4gICAgcmV0dXJuICdDaHJvbWUnO1xuICB9XG5cbiAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignU2FmYXJpJykgIT09IC0xKSB7XG4gICAgcmV0dXJuICdTYWZhcmknO1xuICB9XG5cbiAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignRmlyZWZveCcpICE9PSAtMSkge1xuICAgIHJldHVybiAnRmlyZWZveCc7XG4gIH1cblxuICBpZiAoKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignTVNJRScpICE9PSAtMSkgfHwgKCEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlID09PSB0cnVlKSkgeyAvLyBJRiBJRSA+IDEwe1xuICAgIHJldHVybiAnSUUnO1xuICB9XG5cbiAgcmV0dXJuICd1bmtub3duJztcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRDb25uZWN0aW9uVHlwZSA9ICgpID0+IHtcbiAgY29uc3QgY29ubmVjdGlvblR5cGUgPSBuYXZpZ2F0b3IgJiYgbmF2aWdhdG9yLmNvbm5lY3Rpb24gJiYgbmF2aWdhdG9yLmNvbm5lY3Rpb24udHlwZTsgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL05ldHdvcmtfSW5mb3JtYXRpb25fQVBJXG5cbiAgcmV0dXJuIGNvbm5lY3Rpb25UeXBlO1xufTtcbiIsImltcG9ydCB7IHNlbmRUcmFja0RhdGEsIGdldENzc1BhdGgsIGdldFZhbHVlIH0gZnJvbSAnLi4vaGVscGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0ICh1c2VyRGF0YSkgPT4ge1xuICBjb25zdCBoYW5kbGVDbGljayA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICB0eXBlOiAnY2xpY2snLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgIHg6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgICAgeTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0b3I6IGdldENzc1BhdGgoZXZlbnQudGFyZ2V0KSxcbiAgICAgICAgdmFsdWU6IGdldFZhbHVlKGV2ZW50LnRhcmdldCksXG4gICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBjb3JyZWN0cyBjbGljbHMgYWZ0ZXIgc2Nyb2xsaW5nXG4gICAgc2VuZFRyYWNrRGF0YSh1c2VyRGF0YSwgJ2FjdGlvbicsIHtcbiAgICAgIHR5cGU6ICdwYWdlU2Nyb2xsJyxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgb2Zmc2V0OiB7XG4gICAgICAgICAgeDogd2luZG93LnBhZ2VYT2Zmc2V0LFxuICAgICAgICAgIHk6IHdpbmRvdy5wYWdlWU9mZnNldCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBzZW5kVHJhY2tEYXRhKHVzZXJEYXRhLCAnYWN0aW9uJywgZGF0YSk7XG4gIH07XG5cbiAgcmV0dXJuIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNsaWNrLCB7IGNhcHR1cmU6IHRydWUsIHBhc3NpdmU6IHRydWUgfSk7XG59O1xuXG4vLyBjbGlja3MgZG9lc24ndCB3b3JrIG9uIGRpc2FibGVkIGVsZW1lbnRzLlxuLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSLzIwMTQvUkVDLWh0bWw1LTIwMTQxMDI4L2Zvcm1zLmh0bWwjY29uY2VwdC1mZS1kaXNhYmxlZFxuIiwiaW1wb3J0IHsgc2VuZFRyYWNrRGF0YSwgZGVib3VuY2UsIERFRkFVTFRfREVCT1VOQ0VfVElNRSB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCAodXNlckRhdGEpID0+IHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRlYm91bmNlKCgpID0+IHNlbmRUcmFja0RhdGEodXNlckRhdGEsICdhY3Rpb24nLCB7XG4gICAgdHlwZTogJ3Jlc2l6ZScsXG4gICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgIHBheWxvYWQ6IHtcbiAgICAgIHNpemU6IHtcbiAgICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSksXG4gIERFRkFVTFRfREVCT1VOQ0VfVElNRSkpO1xufTtcbiIsImltcG9ydCB7IHNlbmRUcmFja0RhdGEsIHRocm90dGxlIH0gZnJvbSAnLi4vaGVscGVycyc7XG5cbmNvbnN0IFNDUk9MTF9USFJPVFRMRV9USU1FID0gMTAwO1xuXG5leHBvcnQgZGVmYXVsdCAodXNlckRhdGEpID0+IHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRocm90dGxlKCgpID0+IHNlbmRUcmFja0RhdGEodXNlckRhdGEsICdhY3Rpb24nLCB7XG4gICAgdHlwZTogJ3BhZ2VTY3JvbGwnLFxuICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBvZmZzZXQ6IHtcbiAgICAgICAgeDogd2luZG93LnBhZ2VYT2Zmc2V0LFxuICAgICAgICB5OiB3aW5kb3cucGFnZVlPZmZzZXQsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pLFxuICBTQ1JPTExfVEhST1RUTEVfVElNRSkpO1xufTtcbiIsImltcG9ydCB7IHNlbmRUcmFja0RhdGEsIHRocm90dGxlIH0gZnJvbSAnLi4vaGVscGVycyc7XG5cbi8vIFByb2JhYmx5IHdlIG5lZWQgaXQgbGVzcyB0aGFuIDIwMG1zXG4vLyBmb3IgYmV0dGVyIHF1YWxpdHkgb2YgXCJWaXNpdG9yIEFjdGlvbnMgUGxheWVyXCJcbmNvbnN0IE1PVVNFX01PVkVfVEhST1RUTEVfVElNRSA9IDEwMDtcblxuY29uc3QgQUNUSU9OX1NFTkRfSU5URVJWQUwgPSAzMDAwO1xuXG5jb25zdCBldmVudEJ1ZmZlciA9IHtcbiAgZGF0YTogW10sXG4gIGxhdGVzdFNlbmQ6IERhdGUubm93KCksXG59O1xuXG5jb25zdCBtb3VzZU1vdmVIYW5kbGVyID0gKHVzZXJEYXRhKSA9PiB7XG4gIGZ1bmN0aW9uIGhhbmRsZUV2ZW50KGV2ZW50KSB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCByZWNvcmQgPSB7XG4gICAgICB4OiBldmVudC5jbGllbnRYLFxuICAgICAgeTogZXZlbnQuY2xpZW50WSxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICB9O1xuXG4gICAgZXZlbnRCdWZmZXIuZGF0YS5wdXNoKHJlY29yZCk7XG5cbiAgICBpZiAodGltZXN0YW1wIC0gZXZlbnRCdWZmZXIubGF0ZXN0U2VuZCA+IEFDVElPTl9TRU5EX0lOVEVSVkFMKSB7XG4gICAgICBjb25zdCBtYW55UmVjb3JkcyA9IHtcbiAgICAgICAgdHlwZTogJ21vdXNlTW92ZScsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBiYXRjaDogZXZlbnRCdWZmZXIuZGF0YSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBldmVudEJ1ZmZlci5kYXRhID0gW107XG4gICAgICBldmVudEJ1ZmZlci5sYXRlc3RTZW5kID0gRGF0ZS5ub3coKTtcblxuICAgICAgc2VuZFRyYWNrRGF0YSh1c2VyRGF0YSwgJ2FjdGlvbicsIG1hbnlSZWNvcmRzKTtcbiAgICB9XG4gIH1cblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhyb3R0bGUoaGFuZGxlRXZlbnQsIE1PVVNFX01PVkVfVEhST1RUTEVfVElNRSkpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbW91c2VNb3ZlSGFuZGxlcjtcbiIsImltcG9ydCB7IHNlbmRUcmFja0RhdGEgfSBmcm9tICcuLi9oZWxwZXJzJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZUxvY2F0aW9uQ2hhbmdlID0gKHVzZXJEYXRhKSA9PiB7XG4gIGNvbnN0IHsgaHJlZiB9ID0gd2luZG93LmxvY2F0aW9uO1xuXG4gIGNvbnN0IGFjdGlvbkRhdGEgPSB7XG4gICAgdHlwZTogJ3BhdGhDaGFuZ2UnLFxuICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICBwYXlsb2FkOiB7XG4gICAgICB2YWx1ZTogaHJlZixcbiAgICB9LFxuICB9O1xuXG4gIHNlbmRUcmFja0RhdGEodXNlckRhdGEsICdhY3Rpb24nLCBhY3Rpb25EYXRhKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0ICh1c2VyRGF0YSkgPT4ge1xuICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgPSAoKGYpID0+IGZ1bmN0aW9uIHB1c2hTdGF0ZSguLi5hcmcpIHtcbiAgICBjb25zdCByZXQgPSBmLmFwcGx5KHRoaXMsIGFyZyk7XG5cbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2xvY2F0aW9uY2hhbmdlJykpO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfSkod2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKTtcblxuICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUgPSAoKGYpID0+IGZ1bmN0aW9uIHJlcGxhY2VTdGF0ZSguLi5hcmcpIHtcbiAgICBjb25zdCByZXQgPSBmLmFwcGx5KHRoaXMsIGFyZyk7XG5cbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2xvY2F0aW9uY2hhbmdlJykpO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfSkod2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCAoKSA9PiB7XG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdsb2NhdGlvbmNoYW5nZScpKTtcbiAgfSk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCAoKSA9PiB7XG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdsb2NhdGlvbmNoYW5nZScpKTtcbiAgfSk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BhZ2VzaG93JywgKCkgPT4ge1xuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9jYXRpb25jaGFuZ2UnKSk7XG4gIH0pO1xuXG4gIHJldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9jYXRpb25jaGFuZ2UnLCAoKSA9PiBoYW5kbGVMb2NhdGlvbkNoYW5nZSh1c2VyRGF0YSkpO1xufTtcbiIsImltcG9ydCB7IHNlbmRUcmFja0RhdGEgfSBmcm9tICcuLi9oZWxwZXJzJztcblxuY29uc3QgcmVtb3ZlVGFncyA9IChub2RlLCB0YWdOYW1lKSA9PiB7XG4gIGNvbnN0IG5vZGVDbG9uZWQgPSBub2RlLmNsb25lTm9kZSh0cnVlKTtcbiAgY29uc3QgdGFncyA9IG5vZGVDbG9uZWQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnTmFtZSk7XG5cbiAgd2hpbGUgKHRhZ3MubGVuZ3RoKSB7XG4gICAgdGFnc1swXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhZ3NbMF0pO1xuICB9XG5cbiAgcmV0dXJuIG5vZGVDbG9uZWQ7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRGFuZ2Vyb3VzVGFncyA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHJvb3RXaXRob3V0U2NyaXB0cyA9IHJlbW92ZVRhZ3Mobm9kZSwgJ3NjcmlwdCcpO1xuICBjb25zdCByb290V2l0aG91dElmcmFtZXMgPSByZW1vdmVUYWdzKHJvb3RXaXRob3V0U2NyaXB0cywgJ2lmcmFtZScpO1xuICByZXR1cm4gcm9vdFdpdGhvdXRJZnJhbWVzO1xufTtcblxubGV0IHByZXZXaWR0aDsgbGV0XG4gIHByZXZIZWlnaHQ7XG5cbmNvbnN0IGhhbmRsZU11dGF0aW9uID0gKHVzZXJEYXRhKSA9PiB7XG4gIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaHRtbCcpWzBdO1xuICBpZiAoIXJvb3QpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBbLi4ucm9vdC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpXS5mb3JFYWNoKChlbCkgPT4ge1xuICAgIGlmICghZWwuZ2V0QXR0cmlidXRlKCd2YWx1ZScpICYmIGVsLnZhbHVlKSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZWwudmFsdWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3Qgcm9vdFdpdGhvdXREYW5nZXJvdXNUYWdzID0gcmVtb3ZlRGFuZ2Vyb3VzVGFncyhyb290KTtcbiAgY29uc3Qgc2NyZWVuID0gcm9vdFdpdGhvdXREYW5nZXJvdXNUYWdzLm91dGVySFRNTDtcblxuICBjb25zdCB3aWR0aCA9IHJvb3Qub2Zmc2V0V2lkdGg7XG4gIGNvbnN0IGhlaWdodCA9IHJvb3Qub2Zmc2V0SGVpZ2h0O1xuXG4gIGlmIChwcmV2V2lkdGggIT09IHdpZHRoICYmIHByZXZIZWlnaHQgIT09IGhlaWdodCkge1xuICAgIHNlbmRUcmFja0RhdGEodXNlckRhdGEsICdyZWMnLCB7XG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIHNpemU6IHtcbiAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICBoZWlnaHQsXG4gICAgICAgIH0sXG4gICAgICAgIHNjcmVlbixcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBwcmV2V2lkdGggPSB3aWR0aDtcbiAgICBwcmV2SGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVNdXRhdGlvbjtcbiIsImltcG9ydCB7IGRlYm91bmNlLCBERUZBVUxUX0RFQk9VTkNFX1RJTUUgfSBmcm9tICcuLi9oZWxwZXJzJztcblxuaW1wb3J0IGhhbmRsZU11dGF0aW9uIGZyb20gJy4vbXV0YXRpb24nO1xuXG5jb25zdCBpbml0ID0gKHVzZXJEYXRhKSA9PiB7XG4gIGNvbnN0IE11dGF0aW9uT2JzZXJ2ZXIgPSB3aW5kb3cuTXV0YXRpb25PYnNlcnZlclxuICB8fCB3aW5kb3cuV2ViS2l0TXV0YXRpb25PYnNlcnZlclxuICB8fCB3aW5kb3cuTW96TXV0YXRpb25PYnNlcnZlcjtcblxuICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKFxuICAgIGRlYm91bmNlKCgpID0+IGhhbmRsZU11dGF0aW9uKHVzZXJEYXRhKSwgREVGQVVMVF9ERUJPVU5DRV9USU1FKSxcbiAgKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwgeyBzdWJ0cmVlOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIGF0dHJpYnV0ZXM6IHRydWUgfSk7XG4gIGhhbmRsZU11dGF0aW9uKHVzZXJEYXRhKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdCxcbn07XG4iLCJpbXBvcnQgJy4vbGliL2ZpbmdlcnByaW50Mi5taW4nO1xuaW1wb3J0IGNsaWNrSGFuZGxlciBmcm9tICcuL2FjdGlvbnMvY2xpY2snO1xuaW1wb3J0IHBhZ2VSZXNpemVIYW5kbGVyIGZyb20gJy4vYWN0aW9ucy9wYWdlUmVzaXplJztcbmltcG9ydCBwYWdlU2Nyb2xsaW5nSGFuZGxlciBmcm9tICcuL2FjdGlvbnMvcGFnZVNjcm9sbGluZyc7XG5pbXBvcnQgbW91c2VNb3ZlSGFuZGxlciBmcm9tICcuL2FjdGlvbnMvbW91c2VNb3ZlJztcbmltcG9ydCBwYXRoQ2hhbmdlSGFuZGxlciwgeyBoYW5kbGVMb2NhdGlvbkNoYW5nZSB9IGZyb20gJy4vYWN0aW9ucy9wYXRoQ2hhbmdlJztcbmltcG9ydCB0cmFja2VyTXV0YXRpb25PYnNlcnZlciBmcm9tICcuL3JlY29yZHMvb2JzZXJ2ZXInO1xuXG5pbXBvcnQge1xuICBzZW5kRGF0YSxcbiAgcmVnaXN0ZXJIYW5kbGVycyxcbiAgZ2V0RGV2aWNlVHlwZSxcbiAgZ2V0QnJvd3Nlck5hbWUsXG4gIGdldENvbm5lY3Rpb25UeXBlLFxuICBnZXRPUyxcbn0gZnJvbSAnLi9oZWxwZXJzJztcblxuaWYgKHByb2Nlc3MuZW52LkJVSUxEID09PSAnZGV2Jykge1xuICBpZiAoRmluZ2VycHJpbnQyICYmIEZpbmdlcnByaW50Mi5nZXRWMTgpIHtcbiAgICBjb25zb2xlLmxvZygnRmluZ2VycHJpbnQyLmdldFYxODonLCB0eXBlb2YgRmluZ2VycHJpbnQyLmdldFYxOCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKCdGaW5nZXJwcmludDIgbm90IGxvYWRlZCBjb3JyZWN0bHkhJywgRmluZ2VycHJpbnQyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG59XG5cbmNvbnN0IGRlZmF1bHRIYW5kbGVycyA9IFtcbiAgY2xpY2tIYW5kbGVyLFxuICBwYWdlUmVzaXplSGFuZGxlcixcbiAgcGFnZVNjcm9sbGluZ0hhbmRsZXIsXG4gIG1vdXNlTW92ZUhhbmRsZXIsXG4gIHBhdGhDaGFuZ2VIYW5kbGVyLFxuXTtcblxuY29uc3QgY2FsY0lkZW50aWZpY2F0b3IgPSAoKSA9PiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgRmluZ2VycHJpbnQyLmdldFYxOCgocmVzdWx0KSA9PiB7XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJlaihuZXcgRXJyb3IoJ0lkZW50aWZpY2F0b3Igbm90IGNyZWF0ZWQhJykpO1xuICAgIH1cblxuICAgIHJlcyhyZXN1bHQpO1xuICB9KTtcbn0pO1xuXG5jb25zdCBpbml0ID0gKGluaXRpYWxVc2VyRGF0YSwgaGFuZGxlcnMgPSBkZWZhdWx0SGFuZGxlcnMpID0+ICgpID0+IHtcbiAgY29uc3QgdXNlckRhdGEgPSB7IC4uLmluaXRpYWxVc2VyRGF0YSB9O1xuXG4gIHJldHVybiBjYWxjSWRlbnRpZmljYXRvcigpXG4gICAgLnRoZW4oKHZpc2l0b3JJZCkgPT4ge1xuICAgICAgdXNlckRhdGEudmlzaXRvcklkID0gdmlzaXRvcklkO1xuXG4gICAgICByZXR1cm4gZmV0Y2goJ2h0dHBzOi8vYXBpLmlwaWZ5Lm9yZycpXG4gICAgICAgIC50aGVuKChyZXMpID0+IHJlcy50ZXh0KCkpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgIG9zOiBnZXRPUygpLFxuICAgICAgICAgICAgYnJvd3Nlck5hbWU6IGdldEJyb3dzZXJOYW1lKCksXG4gICAgICAgICAgICBkZXZpY2VUeXBlOiBnZXREZXZpY2VUeXBlKCksXG4gICAgICAgICAgICBjb25uZWN0aW9uVHlwZTogZ2V0Q29ubmVjdGlvblR5cGUoKSxcbiAgICAgICAgICAgIGlwQWRkcmVzczogZGF0YSxcblxuICAgICAgICAgICAgcmVmZXJyZXJVcmw6IGRvY3VtZW50LnJlZmVycmVyLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb25zdCBzZXNzaW9uID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnd2F2ZWxvb3Bfc2Vzc2lvbicpKTtcbiAgICAgICAgICBjb25zdCBPTkVfTUlOVVRFX01TID0gMSAqIDYwICogMTAwMDtcblxuICAgICAgICAgIGlmIChzZXNzaW9uICYmIHNlc3Npb24uc2Vzc2lvbklkXG4gICAgICAgICAgICAmJiAobmV3IERhdGUoKSAtIG5ldyBEYXRlKHNlc3Npb24udXBkYXRlZE9uKSA8IE9ORV9NSU5VVEVfTVMpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzZXNzaW9uSWQ6IHNlc3Npb24uc2Vzc2lvbklkLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHNlbmREYXRhKCdpbml0JywgeyB2aXNpdG9ySWQsIHByb2plY3RJZDogdXNlckRhdGEucHJvamVjdElkLCBwYXlsb2FkIH0pO1xuICAgICAgICB9KTtcbiAgICB9KS50aGVuKCh7IHNlc3Npb25JZCB9KSA9PiB7XG4gICAgICBpZiAoc2Vzc2lvbklkKSB7XG4gICAgICAgIGNvbnN0IHNldFNlc3Npb24gPSAoKSA9PiB7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3dhdmVsb29wX3Nlc3Npb24nLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBzZXNzaW9uSWQsXG4gICAgICAgICAgICB1cGRhdGVkT246IG5ldyBEYXRlKCksXG4gICAgICAgICAgfSkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNldFNlc3Npb24oKTtcbiAgICAgICAgd2luZG93LldBVkVMT09QX1NFU1NJT05fSUQgPSBzZXNzaW9uSWQ7XG4gICAgICAgIHNldEludGVydmFsKHNldFNlc3Npb24sIDEwICogMTAwMCk7XG5cbiAgICAgICAgdXNlckRhdGEuc2Vzc2lvbklkID0gc2Vzc2lvbklkO1xuICAgICAgICByZWdpc3RlckhhbmRsZXJzKHVzZXJEYXRhLCBoYW5kbGVycyk7XG4gICAgICAgIHRyYWNrZXJNdXRhdGlvbk9ic2VydmVyLmluaXQodXNlckRhdGEpO1xuICAgICAgICBoYW5kbGVMb2NhdGlvbkNoYW5nZSh1c2VyRGF0YSk7XG4gICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52LkJVSUxEID09PSAnZGV2Jykge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZywgc2Vzc2lvbklkIG5vdCBzZXR0ZWQ6Jywgc2Vzc2lvbklkKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfVxuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4gKHtcbiAgICAgIHVzZXJEYXRhLFxuICAgIH0pKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdCxcbn07XG4iLCJpbXBvcnQgdHJhY2tlciBmcm9tICcuL3RyYWNrZXInO1xuXG5leHBvcnQgZGVmYXVsdCAoKCkgPT4ge1xuICBjb25zdCB7IHdhdmVsb29wIH0gPSB3aW5kb3c7XG4gIGNvbnN0IHsgcGFyYW1zIH0gPSB3YXZlbG9vcDtcbiAgaWYgKHByb2Nlc3MuZW52LkJVSUxEID09PSAnZGV2Jykge1xuICAgIGNvbnNvbGUubG9nKCdXYXZlbG9vcCBzY3JpcHQgcGFyYW1zOicsIHBhcmFtcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfVxuXG4gIC8vIGRvbid0IGNoYW5nZSBvYmplY3QncyBsaW5rLlxuICBjb25zdCB1c2VyRGF0YSA9IHtcbiAgICB2aXNpdG9ySWQ6IG51bGwsXG4gICAgc2Vzc2lvbklkOiBudWxsLFxuICAgIHByb2plY3RJZDogcGFyYW1zLnBpZCxcbiAgfTtcblxuICBpZiAod2luZG93LnJlcXVlc3RJZGxlQ2FsbGJhY2spIHtcbiAgICByZXF1ZXN0SWRsZUNhbGxiYWNrKHRyYWNrZXIuaW5pdCh1c2VyRGF0YSkpO1xuICB9IGVsc2Uge1xuICAgIHNldFRpbWVvdXQodHJhY2tlci5pbml0KHVzZXJEYXRhKSwgNTAwKTtcbiAgfVxufSkoKTtcbiJdLCJuYW1lcyI6WyJlIiwidCIsImEiLCJ3aW5kb3ciLCJkZWZpbmUiLCJhbWQiLCJtb2R1bGUiLCJleHBvcnRzIiwiRmluZ2VycHJpbnQyIiwidGhpcyIsImQiLCJnIiwiZiIsImgiLCJtIiwiVCIsImwiLCJsZW5ndGgiLCJuIiwiciIsImkiLCJvIiwicyIsImMiLCJ1IiwiY2hhckNvZGVBdCIsInRvU3RyaW5nIiwic2xpY2UiLCJwcmVwcm9jZXNzb3IiLCJhdWRpbyIsInRpbWVvdXQiLCJleGNsdWRlSU9TMTEiLCJmb250cyIsInN3ZkNvbnRhaW5lcklkIiwic3dmUGF0aCIsInVzZXJEZWZpbmVkRm9udHMiLCJleHRlbmRlZEpzRm9udHMiLCJzY3JlZW4iLCJkZXRlY3RTY3JlZW5PcmllbnRhdGlvbiIsInBsdWdpbnMiLCJzb3J0UGx1Z2luc0ZvciIsImV4Y2x1ZGVJRSIsImV4dHJhQ29tcG9uZW50cyIsImV4Y2x1ZGVzIiwiZW51bWVyYXRlRGV2aWNlcyIsInBpeGVsUmF0aW8iLCJkb05vdFRyYWNrIiwiZm9udHNGbGFzaCIsIk5PVF9BVkFJTEFCTEUiLCJFUlJPUiIsIkVYQ0xVREVEIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJmb3JFYWNoIiwiaGFzT3duUHJvcGVydHkiLCJtYXAiLCJwdXNoIiwibmF2aWdhdG9yIiwibWVkaWFEZXZpY2VzIiwid2lkdGgiLCJoZWlnaHQiLCJzb3J0IiwicmV2ZXJzZSIsImF2YWlsV2lkdGgiLCJhdmFpbEhlaWdodCIsIm5hbWUiLCJ0eXBlIiwic3VmZml4ZXMiLCJkZXNjcmlwdGlvbiIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIkFjdGl2ZVhPYmplY3QiLCJjb25jYXQiLCJ1c2VyQWdlbnQiLCJtYXRjaCIsInAiLCJzZXNzaW9uU3RvcmFnZSIsInYiLCJsb2NhbFN0b3JhZ2UiLCJBIiwiaW5kZXhlZERCIiwiUyIsImhhcmR3YXJlQ29uY3VycmVuY3kiLCJDIiwiY3B1Q2xhc3MiLCJCIiwicGxhdGZvcm0iLCJ3IiwibXNEb05vdFRyYWNrIiwibWF4VG91Y2hQb2ludHMiLCJtc01heFRvdWNoUG9pbnRzIiwiZG9jdW1lbnQiLCJjcmVhdGVFdmVudCIsInkiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJkaXNwbGF5IiwiZ2V0Q29udGV4dCIsInJlY3QiLCJpc1BvaW50SW5QYXRoIiwidGV4dEJhc2VsaW5lIiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJkb250VXNlRmFrZUZvbnRJbkNhbnZhcyIsImZvbnQiLCJmaWxsVGV4dCIsImdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiIsImJlZ2luUGF0aCIsImFyYyIsIk1hdGgiLCJQSSIsImNsb3NlUGF0aCIsImZpbGwiLCJ0b0RhdGFVUkwiLCJFIiwiY2xlYXJDb2xvciIsImVuYWJsZSIsIkRFUFRIX1RFU1QiLCJkZXB0aEZ1bmMiLCJMRVFVQUwiLCJjbGVhciIsIkNPTE9SX0JVRkZFUl9CSVQiLCJERVBUSF9CVUZGRVJfQklUIiwiRiIsImNyZWF0ZUJ1ZmZlciIsImJpbmRCdWZmZXIiLCJBUlJBWV9CVUZGRVIiLCJGbG9hdDMyQXJyYXkiLCJidWZmZXJEYXRhIiwiU1RBVElDX0RSQVciLCJpdGVtU2l6ZSIsIm51bUl0ZW1zIiwiY3JlYXRlUHJvZ3JhbSIsImNyZWF0ZVNoYWRlciIsIlZFUlRFWF9TSEFERVIiLCJzaGFkZXJTb3VyY2UiLCJjb21waWxlU2hhZGVyIiwiRlJBR01FTlRfU0hBREVSIiwiYXR0YWNoU2hhZGVyIiwibGlua1Byb2dyYW0iLCJ1c2VQcm9ncmFtIiwidmVydGV4UG9zQXR0cmliIiwiZ2V0QXR0cmliTG9jYXRpb24iLCJvZmZzZXRVbmlmb3JtIiwiZ2V0VW5pZm9ybUxvY2F0aW9uIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiLCJ2ZXJ0ZXhQb3NBcnJheSIsInZlcnRleEF0dHJpYlBvaW50ZXIiLCJGTE9BVCIsInVuaWZvcm0yZiIsImRyYXdBcnJheXMiLCJUUklBTkdMRV9TVFJJUCIsImNhbnZhcyIsImdldFN1cHBvcnRlZEV4dGVuc2lvbnMiLCJqb2luIiwiZ2V0UGFyYW1ldGVyIiwiQUxJQVNFRF9MSU5FX1dJRFRIX1JBTkdFIiwiQUxJQVNFRF9QT0lOVF9TSVpFX1JBTkdFIiwiQUxQSEFfQklUUyIsImdldENvbnRleHRBdHRyaWJ1dGVzIiwiYW50aWFsaWFzIiwiQkxVRV9CSVRTIiwiREVQVEhfQklUUyIsIkdSRUVOX0JJVFMiLCJnZXRFeHRlbnNpb24iLCJNQVhfVEVYVFVSRV9NQVhfQU5JU09UUk9QWV9FWFQiLCJNQVhfQ09NQklORURfVEVYVFVSRV9JTUFHRV9VTklUUyIsIk1BWF9DVUJFX01BUF9URVhUVVJFX1NJWkUiLCJNQVhfRlJBR01FTlRfVU5JRk9STV9WRUNUT1JTIiwiTUFYX1JFTkRFUkJVRkZFUl9TSVpFIiwiTUFYX1RFWFRVUkVfSU1BR0VfVU5JVFMiLCJNQVhfVEVYVFVSRV9TSVpFIiwiTUFYX1ZBUllJTkdfVkVDVE9SUyIsIk1BWF9WRVJURVhfQVRUUklCUyIsIk1BWF9WRVJURVhfVEVYVFVSRV9JTUFHRV9VTklUUyIsIk1BWF9WRVJURVhfVU5JRk9STV9WRUNUT1JTIiwiTUFYX1ZJRVdQT1JUX0RJTVMiLCJSRURfQklUUyIsIlJFTkRFUkVSIiwiU0hBRElOR19MQU5HVUFHRV9WRVJTSU9OIiwiU1RFTkNJTF9CSVRTIiwiVkVORE9SIiwiVkVSU0lPTiIsIlVOTUFTS0VEX1ZFTkRPUl9XRUJHTCIsIlVOTUFTS0VEX1JFTkRFUkVSX1dFQkdMIiwiZ2V0U2hhZGVyUHJlY2lzaW9uRm9ybWF0IiwidG9Mb3dlckNhc2UiLCJNIiwieCIsImlubmVySFRNTCIsImNsYXNzTmFtZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJvZmZzZXRIZWlnaHQiLCJyZW1vdmVDaGlsZCIsIk8iLCJsYW5ndWFnZXMiLCJzdWJzdHIiLCJsYW5ndWFnZSIsImIiLCJQIiwib3NjcHUiLCJpbmRleE9mIiwiTCIsInByb2R1Y3RTdWIiLCJldmFsIiwidG9Tb3VyY2UiLCJJIiwiayIsIldlYkdMUmVuZGVyaW5nQ29udGV4dCIsIlIiLCJhcHBOYW1lIiwidGVzdCIsIkQiLCJzd2ZvYmplY3QiLCJOIiwiaGFzRmxhc2hQbGF5ZXJWZXJzaW9uIiwiXyIsInNldEF0dHJpYnV0ZSIsIm9uUmVhZHkiLCJlbWJlZFNXRiIsImFsbG93U2NyaXB0QWNjZXNzIiwibWVudSIsIkciLCJrZXkiLCJnZXREYXRhIiwid2ViZHJpdmVyIiwidXNlckxhbmd1YWdlIiwiYnJvd3Nlckxhbmd1YWdlIiwic3lzdGVtTGFuZ3VhZ2UiLCJjb2xvckRlcHRoIiwiZGV2aWNlTWVtb3J5IiwiZGV2aWNlUGl4ZWxSYXRpbyIsIkRhdGUiLCJnZXRUaW1lem9uZU9mZnNldCIsIkludGwiLCJEYXRlVGltZUZvcm1hdCIsInJlc29sdmVkT3B0aW9ucyIsInRpbWVab25lIiwiYWRkQmVoYXZpb3IiLCJvcGVuRGF0YWJhc2UiLCJmaWx0ZXIiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInBvc2l0aW9uIiwibGVmdCIsImZvbnRTaXplIiwiZm9udFN0eWxlIiwiZm9udFdlaWdodCIsImxldHRlclNwYWNpbmciLCJsaW5lQnJlYWsiLCJsaW5lSGVpZ2h0IiwidGV4dFRyYW5zZm9ybSIsInRleHRBbGlnbiIsInRleHREZWNvcmF0aW9uIiwidGV4dFNoYWRvdyIsIndoaXRlU3BhY2UiLCJ3b3JkQnJlYWsiLCJ3b3JkU3BhY2luZyIsIm9mZnNldFdpZHRoIiwiZm9udEZhbWlseSIsInBhdXNlQmVmb3JlIiwiT2ZmbGluZUF1ZGlvQ29udGV4dCIsIndlYmtpdE9mZmxpbmVBdWRpb0NvbnRleHQiLCJjcmVhdGVPc2NpbGxhdG9yIiwiZnJlcXVlbmN5Iiwic2V0VmFsdWVBdFRpbWUiLCJjdXJyZW50VGltZSIsImNyZWF0ZUR5bmFtaWNzQ29tcHJlc3NvciIsImNvbm5lY3QiLCJkZXN0aW5hdGlvbiIsInN0YXJ0Iiwic3RhcnRSZW5kZXJpbmciLCJzZXRUaW1lb3V0IiwiY29uc29sZSIsIndhcm4iLCJvbmNvbXBsZXRlIiwiY2xlYXJUaW1lb3V0IiwicmVuZGVyZWRCdWZmZXIiLCJnZXRDaGFubmVsRGF0YSIsInJlZHVjZSIsImFicyIsImRpc2Nvbm5lY3QiLCJ0aGVuIiwiZGV2aWNlSWQiLCJncm91cElkIiwia2luZCIsImxhYmVsIiwiVSIsIkVycm9yIiwiZ2V0IiwiY2FsbCIsImNvbXBvbmVudHMiLCJkYXRhIiwiYWRkUHJlcHJvY2Vzc2VkQ29tcG9uZW50IiwidmFsdWUiLCJTdHJpbmciLCJnZXRQcm9taXNlIiwiUHJvbWlzZSIsImdldFYxOCIsIng2NGhhc2gxMjgiLCJjb25maWciLCJBUElfVVJMIiwiQVBJX1VSTF9ERVYiLCJDTEFTU19ESVZJREVSIiwiREVGQVVMVF9ERUJPVU5DRV9USU1FIiwiZ2V0UGFyZW50cyIsImVsZW1lbnQiLCJwYXJlbnRzIiwicGFyZW50Tm9kZSIsImdldENvdW50U2FtZU5vZGVOYW1lIiwiZWxlbWVudHNBcnJheSIsImNvdW50IiwiY3VycmVudEVsZW1lbnQiLCJub2RlTmFtZSIsImdldE50aE51bWJlciIsIm50aCIsInByZXZpb3VzRWxlbWVudFNpYmxpbmciLCJnZXRDc3NQYXRoIiwiZWxlbWVudFBhcmVudHMiLCJzcGxpY2UiLCJzZWxlY3RvcnNBcnJheSIsImVsZW1lbnRJdGVtIiwiaWQiLCJzZWxlY3RvciIsInNpYmxpbmciLCJjaGlsZHJlbiIsImNvdW50U2FtZU5vZGVOYW1lIiwiY2xhc3NOYW1lcyIsInJlcGxhY2UiLCJudGhOdW1iZXIiLCJyZXN1bHRQYXRoIiwiZ2V0VmFsdWUiLCJpbm5lclRleHQiLCJzZW5kRGF0YSIsInVybCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXNwb25zZSIsImpzb24iLCJzZW5kVHJhY2tEYXRhIiwidXNlckRhdGEiLCJfb2JqZWN0U3ByZWFkIiwicHJvamVjdElkIiwidmlzaXRvcklkIiwic2Vzc2lvbklkIiwidHJhY2tEYXRhIiwicmVnaXN0ZXJIYW5kbGVycyIsImhhbmRsZXJzIiwiaGFuZGxlciIsImRlYm91bmNlIiwiZnVuYyIsImRlbGF5IiwiYmxvY2tlcklkIiwiYXJncyIsInRocm90dGxlIiwibGltaXQiLCJpc0Jsb2NrZWQiLCJpbmNsdWRlcyIsImhheXN0YWNrIiwibmVlZGxlIiwiZmluZCIsInRvTG9jYWxlTG93ZXJDYXNlIiwid2luZG93cyIsImxpbnV4IiwiaXBob25lIiwiaXBvZCIsImlwYWQiLCJpUGFkT1MxM1VwIiwiaW9zIiwibWFjb3MiLCJhbmRyb2lkIiwiYW5kcm9pZFBob25lIiwiYW5kcm9pZFRhYmxldCIsImJsYWNrYmVycnkiLCJibGFja2JlcnJ5UGhvbmUiLCJibGFja2JlcnJ5VGFibGV0Iiwid2luZG93c1Bob25lIiwid2luZG93c1RhYmxldCIsImZ4b3MiLCJmeG9zUGhvbmUiLCJmeG9zVGFibGV0IiwibWVlZ28iLCJtb2JpbGUiLCJ0YWJsZXQiLCJkZXNrdG9wIiwiZ2V0RGV2aWNlVHlwZSIsImdldE9TIiwiZ2V0QnJvd3Nlck5hbWUiLCJhcHBWZXJzaW9uIiwiZG9jdW1lbnRNb2RlIiwiZ2V0Q29ubmVjdGlvblR5cGUiLCJjb25uZWN0aW9uVHlwZSIsImNvbm5lY3Rpb24iLCJoYW5kbGVDbGljayIsImV2ZW50IiwidGltZXN0YW1wIiwibm93IiwicGF5bG9hZCIsImNsaWVudFgiLCJjbGllbnRZIiwidGFyZ2V0Iiwib2Zmc2V0IiwicGFnZVhPZmZzZXQiLCJwYWdlWU9mZnNldCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjYXB0dXJlIiwicGFzc2l2ZSIsInNpemUiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJTQ1JPTExfVEhST1RUTEVfVElNRSIsIk1PVVNFX01PVkVfVEhST1RUTEVfVElNRSIsIkFDVElPTl9TRU5EX0lOVEVSVkFMIiwiZXZlbnRCdWZmZXIiLCJsYXRlc3RTZW5kIiwibW91c2VNb3ZlSGFuZGxlciIsImhhbmRsZUV2ZW50IiwicmVjb3JkIiwibWFueVJlY29yZHMiLCJiYXRjaCIsImhhbmRsZUxvY2F0aW9uQ2hhbmdlIiwiaHJlZiIsImxvY2F0aW9uIiwiYWN0aW9uRGF0YSIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJhcmciLCJyZXQiLCJhcHBseSIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsInJlcGxhY2VTdGF0ZSIsInJlbW92ZVRhZ3MiLCJub2RlIiwidGFnTmFtZSIsIm5vZGVDbG9uZWQiLCJjbG9uZU5vZGUiLCJ0YWdzIiwicmVtb3ZlRGFuZ2Vyb3VzVGFncyIsInJvb3RXaXRob3V0U2NyaXB0cyIsInJvb3RXaXRob3V0SWZyYW1lcyIsInByZXZXaWR0aCIsInByZXZIZWlnaHQiLCJoYW5kbGVNdXRhdGlvbiIsInJvb3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWwiLCJnZXRBdHRyaWJ1dGUiLCJyb290V2l0aG91dERhbmdlcm91c1RhZ3MiLCJvdXRlckhUTUwiLCJpbml0IiwiTXV0YXRpb25PYnNlcnZlciIsIldlYktpdE11dGF0aW9uT2JzZXJ2ZXIiLCJNb3pNdXRhdGlvbk9ic2VydmVyIiwib2JzZXJ2ZXIiLCJvYnNlcnZlIiwic3VidHJlZSIsImNoaWxkTGlzdCIsImF0dHJpYnV0ZXMiLCJsb2ciLCJlcnJvciIsImRlZmF1bHRIYW5kbGVycyIsImNsaWNrSGFuZGxlciIsInBhZ2VSZXNpemVIYW5kbGVyIiwicGFnZVNjcm9sbGluZ0hhbmRsZXIiLCJwYXRoQ2hhbmdlSGFuZGxlciIsImNhbGNJZGVudGlmaWNhdG9yIiwicmVzIiwicmVqIiwicmVzdWx0IiwiaW5pdGlhbFVzZXJEYXRhIiwidGV4dCIsIm9zIiwiYnJvd3Nlck5hbWUiLCJkZXZpY2VUeXBlIiwiaXBBZGRyZXNzIiwicmVmZXJyZXJVcmwiLCJyZWZlcnJlciIsInNlc3Npb24iLCJwYXJzZSIsImdldEl0ZW0iLCJPTkVfTUlOVVRFX01TIiwidXBkYXRlZE9uIiwic2V0U2Vzc2lvbiIsInNldEl0ZW0iLCJXQVZFTE9PUF9TRVNTSU9OX0lEIiwic2V0SW50ZXJ2YWwiLCJ0cmFja2VyTXV0YXRpb25PYnNlcnZlciIsIndhdmVsb29wIiwicGFyYW1zIiwicGlkIiwicmVxdWVzdElkbGVDYWxsYmFjayIsInRyYWNrZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUFBO0VBQ0E7O0VBRUEsQ0FBRSxVQUFVQSxDQUFDLEVBQUVDLENBQUMsRUFBRUMsQ0FBQyxFQUFFO0lBQ25CLE9BQU9DLE1BQU0sS0FBSyxXQUFXLElBQUksT0FBT0MsTUFBTSxLQUFLLFVBQVUsSUFBSUEsTUFBTSxDQUFDQyxHQUFHLEdBQUdELE1BQU0sQ0FBQ0YsQ0FBQyxDQUFDLEdBQUcsT0FBT0ksTUFBTSxLQUFLLFdBQVcsSUFBSUEsTUFBTSxDQUFDQyxPQUFPLEdBQUdELE1BQU0sQ0FBQ0MsT0FBTyxHQUFHTCxDQUFDLEVBQUUsR0FBR0QsQ0FBQyxDQUFDTSxPQUFPLEdBQUdOLENBQUMsQ0FBQ00sT0FBTyxHQUFHTCxDQUFDLEVBQUUsR0FBR0QsQ0FBQyxDQUFDTyxZQUFZLEdBQUdOLENBQUMsRUFBRSxDQUFBO0VBQ3ZOLENBQUMsQ0FBQyxDQUFDLEVBQUVPLE1BQUksRUFBRSxZQUFNO0lBQ2YsSUFBTUMsQ0FBQyxHQUFHLFNBQUpBLENBQUMsQ0FBYVYsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7RUFBRUQsSUFBQUEsQ0FBQyxHQUFHLENBQUNBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxHQUFHLENBQUNBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtNQUFFLElBQU1DLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQUUsSUFBQSxPQUFPQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUNBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBRyxDQUFBO0lBQUUsSUFBTVMsQ0FBQyxHQUFHLFNBQUpBLENBQUMsQ0FBYVgsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7RUFBRUQsSUFBQUEsQ0FBQyxHQUFHLENBQUNBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxHQUFHLENBQUNBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxHQUFHQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtNQUFFLElBQU1DLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQUUsSUFBQSxPQUFPQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUVBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJRixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUlGLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdELENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUNBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUdBLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBR0EsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBRyxDQUFBO0lBQUUsSUFBTVUsQ0FBQyxHQUFHLFNBQUpBLENBQUMsQ0FBYVosQ0FBQyxFQUFFQyxDQUFDLEVBQUU7TUFBRSxPQUFPLENBQUNBLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUNELENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQyxDQUFDLEdBQUdELENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUdDLENBQUMsRUFBRUQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQyxDQUFDLEdBQUdELENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUdDLENBQUMsQ0FBQyxJQUFJQSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUNELENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUMsQ0FBQyxHQUFHRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHQyxDQUFDLEVBQUVELENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUMsQ0FBQyxHQUFHRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUcsQ0FBQTtJQUFFLElBQU1ZLENBQUMsR0FBRyxTQUFKQSxDQUFDLENBQWFiLENBQUMsRUFBRUMsQ0FBQyxFQUFFO01BQUUsT0FBTyxDQUFDQSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsR0FBR0QsQ0FBQyxHQUFHQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUNELENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUMsQ0FBQyxHQUFHRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHQyxDQUFDLEVBQUVELENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0tBQUcsQ0FBQTtJQUFFLElBQU1hLENBQUMsR0FBRyxTQUFKQSxDQUFDLENBQWFkLENBQUMsRUFBRUMsQ0FBQyxFQUFFO01BQUUsT0FBTyxDQUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRUQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFHLENBQUE7RUFBRSxFQUFBLElBQU1jLENBQUMsR0FBRyxTQUFKQSxDQUFDLENBQWFmLENBQUMsRUFBRTtFQUFFLElBQUEsT0FBT0EsQ0FBQyxHQUFHYyxDQUFDLENBQUNkLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsR0FBR1csQ0FBQyxDQUFDWCxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsRUFBRUEsQ0FBQyxHQUFHYyxDQUFDLENBQUNkLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUVBLENBQUMsR0FBR1csQ0FBQyxDQUFDWCxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxHQUFHYyxDQUFDLENBQUNkLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBRyxDQUFBO0VBQUUsRUFBQSxJQUFNZ0IsQ0FBQyxHQUFHLFNBQUEsQ0FBQSxDQUFVaEIsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7TUFBRUEsQ0FBQyxHQUFHQSxDQUFDLElBQUksQ0FBQyxDQUFBO01BQUUsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQ0YsQ0FBQyxHQUFHQSxDQUFDLElBQUksRUFBRSxFQUFFaUIsTUFBTSxHQUFHLEVBQUUsRUFBRUMsQ0FBQyxHQUFHbEIsQ0FBQyxDQUFDaUIsTUFBTSxHQUFHZixDQUFDLEVBQUVpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUVsQixDQUFDLENBQUMsRUFBRW1CLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRW5CLENBQUMsQ0FBQyxFQUFFb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFTCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUVNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsRUFBRUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxFQUFFQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdOLENBQUMsRUFBRU0sQ0FBQyxJQUFJLEVBQUUsRUFBQ0gsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHckIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRyxHQUFHeEIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFUixDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUdoQixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxHQUFHLEdBQUd4QixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBR3hCLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFSCxDQUFDLEdBQUdWLENBQUMsQ0FBQ1UsQ0FBQyxFQUFFQyxDQUFDLENBQUMsRUFBRUQsQ0FBQyxHQUFHVCxDQUFDLENBQUNTLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRUEsQ0FBQyxHQUFHVixDQUFDLENBQUNVLENBQUMsRUFBRUUsQ0FBQyxDQUFDLEVBQUVKLENBQUMsR0FBR0wsQ0FBQyxDQUFDSyxDQUFDLEVBQUVFLENBQUMsQ0FBQyxFQUFFRixDQUFDLEdBQUdQLENBQUMsQ0FBQ08sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFQSxDQUFDLEdBQUdULENBQUMsQ0FBQ1MsQ0FBQyxFQUFFQyxDQUFDLENBQUMsRUFBRUQsQ0FBQyxHQUFHVCxDQUFDLENBQUNDLENBQUMsQ0FBQ1EsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsRUFBRUgsQ0FBQyxHQUFHTCxDQUFDLENBQUNLLENBQUMsRUFBRU8sQ0FBQyxDQUFDLEVBQUVQLENBQUMsR0FBR0osQ0FBQyxDQUFDSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUVBLENBQUMsR0FBR0wsQ0FBQyxDQUFDSyxDQUFDLEVBQUVNLENBQUMsQ0FBQyxFQUFFRixDQUFDLEdBQUdOLENBQUMsQ0FBQ00sQ0FBQyxFQUFFSixDQUFDLENBQUMsRUFBRUksQ0FBQyxHQUFHUixDQUFDLENBQUNRLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRUEsQ0FBQyxHQUFHVixDQUFDLENBQUNVLENBQUMsRUFBRUQsQ0FBQyxDQUFDLEVBQUVDLENBQUMsR0FBR1YsQ0FBQyxDQUFDQyxDQUFDLENBQUNTLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUE7RUFBRSxJQUFBLFFBQVFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRUwsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFZCxDQUFDO0VBQUksTUFBQSxLQUFLLEVBQUU7VUFBRWMsQ0FBQyxHQUFHRixDQUFDLENBQUNFLENBQUMsRUFBRUgsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFYixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFBRSxNQUFBLEtBQUssRUFBRTtVQUFFUixDQUFDLEdBQUdGLENBQUMsQ0FBQ0UsQ0FBQyxFQUFFSCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUViLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUFFLE1BQUEsS0FBSyxFQUFFO1VBQUVSLENBQUMsR0FBR0YsQ0FBQyxDQUFDRSxDQUFDLEVBQUVILENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRWIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQUUsTUFBQSxLQUFLLEVBQUU7VUFBRVIsQ0FBQyxHQUFHRixDQUFDLENBQUNFLENBQUMsRUFBRUgsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFYixDQUFDLENBQUN5QixVQUFVLENBQUNELENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFBRSxNQUFBLEtBQUssRUFBRTtVQUFFUixDQUFDLEdBQUdGLENBQUMsQ0FBQ0UsQ0FBQyxFQUFFSCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUViLENBQUMsQ0FBQ3lCLFVBQVUsQ0FBQ0QsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtFQUFFLE1BQUEsS0FBSyxFQUFFO1VBQUVSLENBQUMsR0FBR0YsQ0FBQyxDQUFDRSxDQUFDLEVBQUVILENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRWIsQ0FBQyxDQUFDeUIsVUFBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMs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T0YsQ0FBQyxHQUFHTCxDQUFDLENBQUNLLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRW5CLENBQUMsQ0FBQ2lCLE1BQU0sQ0FBQyxDQUFDLEVBQUVHLENBQUMsR0FBR04sQ0FBQyxDQUFDTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUVwQixDQUFDLENBQUNpQixNQUFNLENBQUMsQ0FBQyxFQUFFRSxDQUFDLEdBQUdULENBQUMsQ0FBQ1MsQ0FBQyxFQUFFQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxHQUFHVixDQUFDLENBQUNVLENBQUMsRUFBRUQsQ0FBQyxDQUFDLEVBQUVBLENBQUMsR0FBR0osQ0FBQyxDQUFDSSxDQUFDLENBQUMsRUFBRUMsQ0FBQyxHQUFHTCxDQUFDLENBQUNLLENBQUMsQ0FBQyxFQUFFRCxDQUFDLEdBQUdULENBQUMsQ0FBQ1MsQ0FBQyxFQUFFQyxDQUFDLENBQUMsRUFBRUEsQ0FBQyxHQUFHVixDQUFDLENBQUNVLENBQUMsRUFBRUQsQ0FBQyxDQUFDLEVBQUUsVUFBQSxDQUFBLE1BQUEsQ0FBWSxDQUFDQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFTyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBSUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBQSxDQUFBLE1BQUEsQ0FBWSxDQUFDUixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFTyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBSUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBQSxDQUFBLE1BQUEsQ0FBWSxDQUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFTSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBSUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBQSxDQUFBLE1BQUEsQ0FBWSxDQUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFTSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBSUMs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

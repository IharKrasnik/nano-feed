import { C as writable } from "./index-a8d98783.js";
var cookie = {};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
cookie.parse = parse;
cookie.serialize = serialize$1;
var __toString = Object.prototype.toString;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options || {};
  var dec = opt.decode || decode;
  var index = 0;
  while (index < str.length) {
    var eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key = str.slice(index, eqIdx).trim();
    if (void 0 === obj[key]) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function serialize$1(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value = enc(val);
  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value;
  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function decode(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
}
function isDate(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e) {
    return str;
  }
}
const API_URL = "https://ship-prod-627ed08f489a970013572f5d.paralect.net";
const GOOGLE_LOGIN_URL = `${API_URL}/auth/google/url?redirect_to=${window.document.location.href}`;
const serialize = (obj) => {
  if (!obj) {
    return "";
  }
  if (obj._response) {
    delete obj._response;
  }
  const str = [];
  Object.keys(obj).forEach((key) => {
    const value = typeof obj[key] === "object" ? JSON.stringify(obj[key]) : obj[key];
    str.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
  });
  return str.join("&");
};
class ValidationError extends Error {
  constructor({ message, data, status }) {
    super(message);
    this.name = "ValidationError";
    this.data = data;
    this.status = status;
  }
}
const ftch = async (method, url, params, options = {}) => {
  let res;
  const absoluteUrl = url.startsWith("http") ? url : `${API_URL}/${url}`;
  let body = null;
  let headers = {};
  headers["Content-Type"] = "application/json";
  if (method !== "get") {
    if (params instanceof FormData) {
      body = params;
      delete headers["Content-Type"];
    } else {
      body = JSON.stringify(params);
    }
  }
  {
    const cookies = cookie.parse(document.cookie);
    if (cookies.access_token) {
      headers["Authorization"] = `Bearer ${cookies.access_token}`;
    }
  }
  if (absoluteUrl.startsWith(API_URL)) {
    options.credentials = "include";
    options.mode = "cors";
  }
  try {
    res = await fetch(`${absoluteUrl}${method === "get" ? `?${serialize(params)}` : ""}`, {
      method,
      body,
      ...options,
      headers: {
        ...headers,
        ...options.headers || {}
      }
    });
  } catch (err) {
    console.log("error GET", absoluteUrl, method, err);
    return null;
  }
  if (res.ok || res.status === 302) {
    const data = await res.json();
    if (options == null ? void 0 : options.includeResponse) {
      data._response = {
        status: res.status
      };
    }
    return data;
  } else {
    const data = await res.json();
    throw new ValidationError({ message: `Could not load ${url}`, data, status: res.status });
  }
};
const get = async (url, params, options) => {
  return ftch("get", url, params, options);
};
const post = async (url, params, options) => {
  return ftch("post", url, params, options);
};
const put = async (url, params, options) => {
  return ftch("put", url, params, options);
};
const del = async (url, params, options) => {
  return ftch("delete", url, params, options);
};
const currentUserStore = writable(void 0);
let isLoading = writable(true);
export {
  API_URL as A,
  GOOGLE_LOGIN_URL as G,
  put as a,
  cookie as b,
  currentUserStore as c,
  del as d,
  get as g,
  isLoading as i,
  post as p
};

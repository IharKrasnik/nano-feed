import "../../chunks/index3.js";
import "cookie";
import { A as API_URL } from "../../chunks/env.js";
import { r as redirect } from "../../chunks/index.js";
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
    if (options?.includeResponse) {
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
const apiServerSide = ({ accessToken }) => {
  const headers = {};
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return {
    get(url, params) {
      return get(url, params, {
        headers
      });
    },
    post(url, params) {
      return post(url, params, {
        headers
      });
    },
    put(url, params) {
      return put(url, params, {
        headers
      });
    },
    del(url, params) {
      return del(url, params, {
        headers
      });
    }
  };
};
const authServerGuard = async ({ url, cookies }) => {
  if (!url.href.includes("_redirect")) {
    let otp = new URL(url.href).searchParams.get("otp");
    if (otp) {
      let api = apiServerSide({});
      try {
        const authData = await api.get("users/current-by-otp", { otp });
        const { accessToken } = authData;
        cookies.set("access_token", accessToken, { httpOnly: false });
      } catch (err) {
        console.log("err", err);
      }
      throw redirect(302, "/");
    }
  }
  return {
    ogTitle: "Momentum"
  };
};
function load({ url, params, session, cookies }) {
  return authServerGuard({ url, params, session, cookies });
}
export {
  load
};

import { g as get, p as post, a as put, d as del } from "../../chunks/api.js";
import { r as redirect } from "../../chunks/index.js";
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

import { g as get, p as post, a as put, d as del, c as currentUserStore, b as cookie, i as isLoading, G as GOOGLE_LOGIN_URL } from "./currentUser-50513477.js";
import { R as Redirect } from "./control-942a5f95.js";
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
function redirect(status, location) {
  return new Redirect(status, location);
}
new TextEncoder();
let user;
currentUserStore.subscribe((value) => user = value);
const authClientGuard = async ({ url }) => {
  if (!user) {
    const cookies = cookie.parse(document.cookie);
    let accessToken = cookies.access_token;
    if (!user && accessToken) {
      let api = apiServerSide({ accessToken });
      isLoading.set(true);
      try {
        user = await api.get("users/current");
        console.log("user", user);
        user.username = user.username || "igor.krasnik";
        currentUserStore.set(user);
      } catch (err) {
        console.log("err", err);
      }
    } else if (url.href.includes("/write")) {
      throw redirect(302, GOOGLE_LOGIN_URL);
    } else {
      isLoading.set(false);
      currentUserStore.set(null);
    }
  }
  isLoading.set(false);
  return {
    ogTitle: "Momentum"
  };
};
const prerender = false;
function load({ url, params, session }) {
  return authClientGuard({ url, params, session });
}
const _layout = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  load,
  prerender
}, Symbol.toStringTag, { value: "Module" }));
export {
  _layout as _,
  load as l,
  prerender as p
};

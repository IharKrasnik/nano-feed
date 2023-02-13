import "cookie";
import { c as currentUserStore, i as isLoading } from "../../chunks/currentUser.js";
import "../../chunks/index3.js";
import "../../chunks/index.js";
currentUserStore.subscribe((value) => value);
const authClientGuard = async ({ url }) => {
  isLoading.set(false);
  return {
    ogTitle: "Momentum"
  };
};
function load({ url, params, session }) {
  return authClientGuard({ url, params, session });
}
export {
  load
};

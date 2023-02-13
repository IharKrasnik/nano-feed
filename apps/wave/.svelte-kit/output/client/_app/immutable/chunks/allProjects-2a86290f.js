import { a6 as get_store_value, C as writable } from "./index-a8d98783.js";
import { c as currentUserStore, g as get, i as isLoading } from "./currentUser-50513477.js";
const allProjectsStore = writable(null);
const update = async ({} = {}) => {
  await get("waveProjects").then(({ results }) => {
    allProjectsStore.set(results);
  });
};
let prevUser;
{
  currentUserStore.subscribe((user) => {
    if (user) {
      if ((prevUser == null ? void 0 : prevUser._id) !== user._id) {
        update();
        prevUser = user;
      }
    } else if (!get_store_value(isLoading))
      ;
  });
}
export {
  allProjectsStore as a
};

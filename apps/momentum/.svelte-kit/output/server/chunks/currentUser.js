import { w as writable } from "./index2.js";
const currentUserStore = writable(void 0);
let isLoading = writable(true);
export {
  currentUserStore as c,
  isLoading as i
};

import { w as writable } from "./index2.js";
import { g as get } from "./api.js";
const creatorsStore = writable([]);
let filterQuery = writable(null);
const update = async ({
  projectSlug = null,
  isExplore = false,
  sort = "createdOn",
  sortDirection = "descending"
} = {}) => {
  let query = { sort, sortDirection };
  if (projectSlug) {
    query.projectSlug = projectSlug;
  }
  if (isExplore) {
    query.isExplore = isExplore;
  }
  await get("creators", query).then(({ results: creators }) => {
    filterQuery.set(query);
    creatorsStore.set(creators);
  });
};
update();
export {
  creatorsStore as c,
  filterQuery as f,
  update as u
};

import { w as writable } from "./index2.js";
import { g as get } from "./api.js";
const projectsStore = writable([]);
let isLoading = writable(false);
const update = ({
  creatorUsername,
  page = 1,
  perPage = 20,
  sort = "createdOn",
  sortDirection = "descending"
} = {}) => {
  let query = { perPage, page, sort, sortDirection };
  isLoading.set(true);
  if (creatorUsername) {
    query.creatorUsername = creatorUsername;
  }
  projectsStore.set([]);
  get("projects", query).then(({ results: projects }) => {
    projectsStore.set([
      // {
      // 	slug: null,
      // 	title: 'All',
      // 	description: 'A feed from Paralect creators.',
      // 	isFeatured: true,
      // 	color: 'rgba(255, 255, 255, .8)'
      // },
      ...projects
    ]);
  }).catch(async (err) => await update({ creatorUsername, perPage, sort, sortDirection })).finally(() => isLoading.set(false));
};
update();
export {
  projectsStore as p
};

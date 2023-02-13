import { w as writable } from "./index2.js";
import { g as get } from "./api.js";
const feedStore = writable([]);
const fetch = async ({
  sort = { publishedOn: -1, createdOn: -1 },
  page = 1,
  perPage = 20,
  source,
  project,
  creatorUsername,
  isExplore
} = {}) => {
  feedStore.set([]);
  const query = {
    sort,
    page,
    perPage
  };
  if (project) {
    query.projectSlug = project;
  }
  if (creatorUsername) {
    query.creatorUsername = creatorUsername;
  }
  if (source) {
    query.source = source;
  }
  if (isExplore) {
    query.isExplore = isExplore;
  }
  const { results: feed } = await get("feed", query);
  return feed;
};
const update = async ({ sort = "-createdOn", source, project, creatorUsername } = {}) => {
  feedStore.set([]);
  const feed = await get({ sort, source, project, creatorUsername });
  feedStore.set(feed);
};
export {
  feedStore as a,
  fetch as f,
  update as u
};

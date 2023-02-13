import { c as create_ssr_component, g as subscribe, v as validate_component } from "../../../chunks/index3.js";
import { p as page } from "../../../chunks/stores.js";
import { F as FeedItem } from "../../../chunks/FeedItem.js";
import { a as feedStore, u as update } from "../../../chunks/feed.js";
import { p as projectsStore } from "../../../chunks/projects.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $feed, $$unsubscribe_feed;
  let $projects, $$unsubscribe_projects;
  let $page, $$unsubscribe_page;
  $$unsubscribe_feed = subscribe(feedStore, (value) => $feed = value);
  $$unsubscribe_projects = subscribe(projectsStore, (value) => $projects = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let shownFeed;
  let index = 0;
  let showInterval;
  {
    if ($projects.length) {
      let selectedProject = $page.url.searchParams.get("project") ? $projects.find((p) => p.slug === $page.url.searchParams.get("project")) : $projects[0];
      let refreshFeed = () => {
        update({ project: selectedProject?.slug });
      };
      refreshFeed();
    }
  }
  {
    if ($feed.length && !showInterval) {
      shownFeed = $feed[index];
      showInterval = setInterval(
        () => {
          shownFeed = null;
          setTimeout(
            () => {
              shownFeed = $feed[++index];
            },
            400
          );
        },
        2e3
      );
    }
  }
  $$unsubscribe_feed();
  $$unsubscribe_projects();
  $$unsubscribe_page();
  return `<div class="${"p-4"}"><div class="${"container mx-auto"}"><div class="${"flex mt-8"}" style="${"width: 400x; height: 600px;"}">${shownFeed ? `<div class="${"mr-8"}" style="${"max-width: 100%; max-height: 100%;"}">${validate_component(FeedItem, "FeedItem").$$render($$result, { feedItem: shownFeed, hideLikes: true }, {}, {})}</div>` : ``}</div></div></div>`;
});
export {
  Page as default
};

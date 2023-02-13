import { c as create_ssr_component, g as subscribe, v as validate_component } from "../../../../chunks/index3.js";
import { F as FeedItemPreview } from "../../../../chunks/FeedItemPreview.js";
import { L as Loader } from "../../../../chunks/Loader.js";
import { p as page } from "../../../../chunks/stores.js";
import { g as get } from "../../../../chunks/api.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let isLoading = true;
  let feedItem;
  let load = async () => {
    feedItem = await get(`feed/${$page.params.feedItemId}`);
    isLoading = false;
  };
  load();
  $$unsubscribe_page();
  return `feed item

<div class="${"mt-8"}">${isLoading ? `<div class="${"w-full flex justify-center"}">${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}</div>` : `${validate_component(FeedItemPreview, "FeedItemPreview").$$render($$result, { feedItem }, {}, {})}`}</div>`;
});
export {
  Page as default
};

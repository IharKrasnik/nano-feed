import { c as create_ssr_component, g as subscribe, b as add_attribute, h as each, v as validate_component } from "../../../../chunks/index3.js";
import { p as page } from "../../../../chunks/stores.js";
import { S as STREAM_URL } from "../../../../chunks/api.js";
import "cookie";
import { F as FeedItem } from "../../../../chunks/FeedItem.js";
import { f as fetch } from "../../../../chunks/feed.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "._feed-item.svelte-1mx2gjb{cursor:pointer;transition:all 0.1s linear}._feed-item.svelte-1mx2gjb:hover{transform:translateY(-20px)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let feed;
  let theme = $page.url.searchParams.get("theme") || "dark";
  let limit = $page.url.searchParams.get("limit") || 30;
  let bgColor = $page.url.searchParams.get("bgColor") || "";
  let load = async () => {
    if ($page.params.username.startsWith("@")) {
      feed = await fetch({
        creatorUsername: $page.params.username.replace("@", ""),
        perPage: limit
      });
    } else {
      feed = await fetch({
        project: $page.params.username,
        perPage: limit
      });
    }
  };
  if (!feed) {
    load();
  }
  $$result.css.add(css);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1kcp6ud_START --><script src="${"https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.min.js"}" integrity="${"sha512-14SY6teTzhrLWeL55Q4uCyxr6GQOxF3pEoMxo2mBxXwPRikdMtzKMYWy2B5Lqjr6PHHoGOxZgPaxUYKQrSmu0A=="}" crossorigin="${"anonymous"}" referrerpolicy="${"no-referrer"}"><\/script><!-- HEAD_svelte-1kcp6ud_END -->`, ""}

<div class="${"container mx-auto my-8"}">${feed?.length > 0 ? `<div${add_attribute(
    "class",
    feed.length > 3 ? "columns-1 md:columns-2 lg:columns-3 mt-8" : "flex justify-center",
    0
  )}>${each(feed, (feedItem) => {
    return `<div class="${"px-2 max-w-[600px] _feed-item svelte-1mx2gjb"}"><a${add_attribute("href", feedItem.url || `${STREAM_URL}/feed/${feedItem._id}`, 0)} target="${"_blank"}"><div class="${"pointer-events-none"}">${validate_component(FeedItem, "FeedItem").$$render(
      $$result,
      {
        theme,
        feedItem,
        bgColor,
        hideLikes: true
      },
      {},
      {}
    )}
							</div></a>
					</div>`;
  })}</div>` : ``}
</div>`;
});
export {
  Page as default
};

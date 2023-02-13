import { c as create_ssr_component, g as subscribe, v as validate_component, b as add_attribute, e as escape } from "../../../chunks/index3.js";
import { g as get } from "../../../chunks/api.js";
import "lodash";
import { L as Loader } from "../../../chunks/Loader.js";
import { c as currentUserStore } from "../../../chunks/currentUser.js";
import "prismjs";
/* empty css                                                             */import { p as page } from "../../../chunks/stores.js";
function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $currentUser, $$unsubscribe_currentUser;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_currentUser = subscribe(currentUserStore, (value) => $currentUser = value);
  let isLoading = true;
  let feedItem;
  let url;
  let startTitle = null;
  if (isValidHttpUrl(startTitle)) {
    url = startTitle;
  }
  feedItem = {
    publishedOn: new Date(),
    creators: [$currentUser],
    title: !url && startTitle || "",
    content: "",
    longContent: "",
    url,
    source: null,
    attachments: []
  };
  let load = async () => {
    let feedItemId = $page.url.searchParams.get("feedItemId");
    if (feedItemId) {
      feedItem = await get(`feed/${feedItemId}`);
    } else {
      feedItem = { title: "", content: "", longContent: "" };
    }
    isLoading = false;
  };
  load();
  $$unsubscribe_page();
  $$unsubscribe_currentUser();
  return `<div class="${"mt-16"}"><div class="${"max-w-[600px] mx-auto"}">${!isLoading || feedItem.title ? `<div contenteditable style="${"font-size: 32px; font-weight: bold; font-family: Montserrat; padding-left: 0; outline: none; margin:0;"}">${(($$value) => $$value === void 0 ? `` : $$value)(feedItem.title)}</div>` : ``}

		${isLoading ? `<div class="${"w-full flex justify-center"}">${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}</div>` : `<div role="${"textbox"}" contenteditable style="${"font-size: 20px; outline: none;"}" class="${"py-4 whitespace-pre-wrap"}">${(($$value) => $$value === void 0 ? `` : $$value)(feedItem.content)}</div>

			${escape(feedItem.content.length)}/240
			${``}

			${``}

			`}

		${!feedItem.attachments?.length ? `<div class="${"my-4"}">Or</div>
			<input id="${"fileInput"}" type="${"file"}">

			<button class="${"mt-4"}">Add URL </button>` : `<img class="${"w-full"}"${add_attribute("src", feedItem.attachments[0].url, 0)}>`}</div></div>`;
});
export {
  Page as default
};

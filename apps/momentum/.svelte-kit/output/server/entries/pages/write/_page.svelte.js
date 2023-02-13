import { c as create_ssr_component, g as subscribe, b as add_attribute, h as each, v as validate_component, e as escape } from "../../../chunks/index3.js";
import dayjs from "dayjs";
import { p as page } from "../../../chunks/stores.js";
import { g as get } from "../../../chunks/api.js";
import { A as AutoCompleteInput } from "../../../chunks/AutoCompleteInput.js";
import { F as FeedItem } from "../../../chunks/FeedItem.js";
import "../../../chunks/Loader.js";
import { w as writable } from "../../../chunks/index2.js";
import { c as currentUserStore } from "../../../chunks/currentUser.js";
import { B as BROWSER } from "../../../chunks/prod-ssr.js";
/* empty css                                                         */const browser = BROWSER;
const sourcesStore = writable([
  {
    value: null,
    label: "All"
  },
  {
    value: "twitter",
    label: "Twitter"
  },
  {
    value: "linkedin",
    label: "LinkedIn"
  },
  {
    value: "youtube",
    label: "YouTube"
  },
  {
    value: "medium",
    label: "Medium"
  },
  {
    value: "instagram",
    label: "Instagram"
  },
  {
    value: "tiktok",
    label: "TikTok"
  },
  {
    value: "momentum",
    label: "Momentum"
  },
  {
    value: "reddit",
    label: "Reddit"
  },
  {
    value: "indiehackers",
    label: "IndieHackers"
  },
  {
    value: "dribbble",
    label: "Dribbble"
  },
  {
    value: "loom",
    label: "Loom"
  },
  {
    value: "notion",
    label: "Notion"
  }
]);
let format = "YYYY-MM-DDTHH:mm";
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
  let $sources, $$unsubscribe_sources;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_currentUser = subscribe(currentUserStore, (value) => $currentUser = value);
  $$unsubscribe_sources = subscribe(sourcesStore, (value) => $sources = value);
  let projects;
  let creators;
  let isFullUrlEdit = false;
  const fetchProjects = async () => {
    try {
      const { results } = await get("projects");
      projects = results;
      if (browser && window.history.state.projectSlug)
        ;
    } finally {
    }
  };
  fetchProjects();
  const fetchCreators = async () => {
    const { results } = await get("creators");
    creators = results;
  };
  fetchCreators();
  let url;
  let startTitle = null;
  if (isValidHttpUrl(startTitle)) {
    url = startTitle;
  }
  let feedItem = {
    publishedOn: new Date(),
    creators: [$currentUser],
    title: !url && startTitle || "",
    content: "",
    url,
    source: null,
    attachments: []
  };
  let currentPage;
  const setPage = (page2) => {
    if (page2 === "update") {
      feedItem.source = "momentum";
      isFullUrlEdit = true;
    } else {
      isFullUrlEdit = false;
    }
    currentPage = page2;
  };
  let feedId = $page.url.searchParams.get("feedId");
  if (feedId) {
    get(`feed/${$page.url.searchParams.get("feedId")}`).then((item) => {
      feedItem = item;
      url = feedItem.url;
      if (url) {
        setPage("url");
      } else {
        setPage("update");
      }
    });
  }
  let internalDate;
  const input = (x) => {
    internalDate = dayjs(x).format(format);
  };
  const output = (x) => {
    feedItem.publishedOn = dayjs(x, format).toDate();
    console.log("feedItem.publishedOn", feedItem.publishedOn);
  };
  const onCreatorSelected = (selectedCreators) => {
    feedItem.creators = selectedCreators;
  };
  const onSourceSelected = (selectedSource) => {
    feedItem.source = selectedSource?.value;
  };
  const onProjectsSelected = (selectedProjects) => {
    feedItem.projects = selectedProjects;
  };
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if ($currentUser && !feedId) {
        if (url) {
          setPage("url");
        } else {
          setPage("update");
        }
      }
    }
    {
      input(feedItem.publishedOn);
    }
    {
      output(internalDate);
    }
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1ow1dqm_START -->${$$result.title = `<title>Write a Moment — Momentum</title>`, ""}<!-- HEAD_svelte-1ow1dqm_END -->`, ""}

${$currentUser ? `<div><h2 class="${"mb-2"}">Post a Moment</h2>

		<h3 class="${"mb-4"}">Moments are tiny yet important actions that you do daily. <br> <br>
			What you&#39;ve created today?
		</h3>

		<div class="${"mb-4"}">${!feedId ? `<button class="${["tab mb-4", currentPage === "update" ? "selected" : ""].join(" ").trim()}">Write Update</button>
				<button class="${["tab mb-4", currentPage === "url" ? "selected" : ""].join(" ").trim()}">Submit Url</button>` : ``}

			${currentPage === "url" ? `<label class="${"mt-4 mb-4"}">URL </label>
				<input type="${"text"}" class="${"block"}"${add_attribute("value", url, 0)}>

				${``}

				${feedItem.url && !isFullUrlEdit ? `<div class="${"mt-4 text-sm text-gray-400"}">This post is auto-populated from link. You can edit moment to improve copy and
						attachments.

						<div class="${"mt-2"}"><div class="${"cursor-pointer underline"}">Modify Moment
							</div></div></div>` : ``}` : ``}</div>

		${`<form class="${"mb-16"}" style="${"padding: 2px;"}">${feedItem.url || currentPage === "update" ? `${isFullUrlEdit ? `<div class="${"mb-8"}"><label>Title </label>
							<input type="${"text"}" class="${"block"}"${add_attribute("value", feedItem.title, 0)}></div>
						<div class="${"mb-8"}"><label>Content </label>
							<textarea rows="${"5"}" class="${"block"}">${feedItem.content || ""}</textarea></div>

						${$currentUser?.isAdmin ? `<div class="${"mb-8"}"><label>Long Content (admin only) </label>
								<textarea rows="${"5"}" class="${"block"}">${feedItem.longContent || ""}</textarea></div>` : ``}

						<div class="${"mb-8"}"><label>Attachments</label>

							${feedItem.attachments.length ? `${each(feedItem.attachments, (attachment) => {
      return `<div>${attachment.type === "video" ? `<video class="${"max-w-[400px]"}"${add_attribute("src", attachment.url, 0)} muted autoplay></video>` : `<img class="${"max-w-[400px]"}"${add_attribute("src", attachment.url, 0)}>`}
									</div>`;
    })}` : `${`<a class="${"cursor-pointer text-gray-400 underline"}">Add attachment
								</a>`}`}</div>

						${currentPage !== "update" ? `<div class="${"mb-8"}"><label>Source</label>

								${validate_component(AutoCompleteInput, "AutoCompleteInput").$$render(
      $$result,
      {
        onChange: onSourceSelected,
        placeholder: "Select source..",
        limitItemsCount: 20,
        allSuggestions: $sources.filter((s) => s.value),
        initialSelectedItem: feedItem.source ? { value: feedItem.source } : null
      },
      {},
      {}
    )}</div>` : ``}` : ``}

					${projects ? `<div class="${"mb-8"}"><label>Streams</label>
							${validate_component(AutoCompleteInput, "AutoCompleteInput").$$render(
      $$result,
      {
        onChange: onProjectsSelected,
        placeholder: "Search Streams",
        valueField: "slug",
        searchField: "title",
        isMulti: true,
        allSuggestions: projects.filter((s) => s.slug),
        initialSelectedItems: feedItem.projects
      },
      {},
      {}
    )}</div>` : ``}

					${isFullUrlEdit ? `${currentPage !== "update" ? `<div class="${"mb-8"}"><label>Published On</label>

								<input type="${"datetime-local"}"${add_attribute("value", internalDate, 0)}></div>` : ``}

						${$currentUser?.isAdmin && creators ? `<div class="${"mb-8"}"><label>Creators</label>

								${validate_component(AutoCompleteInput, "AutoCompleteInput").$$render(
      $$result,
      {
        onChange: onCreatorSelected,
        searchField: "fullName",
        placeholder: "Search creators..",
        limitItemsCount: 5,
        isMulti: true,
        initialSelectedItems: feedItem.creators,
        allSuggestions: creators
      },
      {
        allSuggestions: ($$value) => {
          creators = $$value;
          $$settled = false;
        }
      },
      {
        item: ({ item }) => {
          return `<div slot="${"item"}"><div class="${"flex items-center"}"><img${add_attribute("src", item.avatarUrl, 0)} class="${"w-[40px] h-[40px] mr-2 rounded-full"}">
											${escape(item.fullName)}</div></div>`;
        }
      }
    )}</div>` : ``}` : ``}

					

					<button class="${"p-4 mt-8"}" type="${"submit"}">${escape(feedId ? "Update" : "Publish")} Moment
					</button>

					${feedId ? `<button class="${"danger ml-8 p-4 mt-8"}" type="${"submit"}">Delete Moment
						</button>` : ``}` : ``}</form>`}

		${feedItem ? `<div class="${"hidden md:flex w-[400px]"}" style="${"position: fixed; top: 0; height: 100vh; flex-direction: column; justify-content: center; transform: translateX(600px); "}"><h3 class="${"mb-4"}">Moment Preview</h3>
				${validate_component(FeedItem, "FeedItem").$$render(
      $$result,
      { feedItem },
      {
        feedItem: ($$value) => {
          feedItem = $$value;
          $$settled = false;
        }
      },
      {}
    )}

				<button class="${"p-4 mt-8"}" type="${"submit"}">${escape(feedId ? "Update" : "Publish")} Moment
				</button></div>` : ``}</div>` : ``}`;
  } while (!$$settled);
  $$unsubscribe_page();
  $$unsubscribe_currentUser();
  $$unsubscribe_sources();
  return $$rendered;
});
export {
  Page as default
};

import { c as create_ssr_component, g as subscribe, v as validate_component, e as escape, b as add_attribute, h as each } from "./index3.js";
import { g as get } from "./api.js";
import { S as StreamCard } from "./StreamCard.js";
import { L as Loader } from "./Loader.js";
import { a as allProjectsStore } from "./allProjects.js";
import "prismjs";
/* empty css                                               */const css = {
  code: "._moment.svelte-gdc33r.svelte-gdc33r{font-size:20px}._moment.svelte-gdc33r h1.svelte-gdc33r{font-size:32px}",
  map: null
};
let isLoadingError = false;
const FeedItemPreview = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $allProjects, $$unsubscribe_allProjects;
  $$unsubscribe_allProjects = subscribe(allProjectsStore, (value) => $allProjects = value);
  let { feedItem } = $$props;
  let isLoading = true;
  let htmlIsLoading = false;
  let { isEditable = false } = $$props;
  let embedSocialEl;
  let loadScript = async (url) => {
    htmlIsLoading = true;
    let script = document.createElement("script");
    script.src = url;
    document.head.appendChild(script);
    let promise = new Promise((resolve, reject) => {
      script.onload = () => {
        setTimeout(
          () => {
            htmlIsLoading = false;
          },
          1e3
        );
        resolve();
      };
    });
    return promise;
  };
  const load = async () => {
    if (feedItem.url && ![
      "youtube",
      "twitter",
      "tiktok",
      "indiehackers",
      "dribbble",
      "linkedin",
      "reddit",
      "loom"
    ].includes(feedItem.source) && !feedItem.url.includes(".mp4") && !feedItem.url.includes(".mov")) {
      const { iframeOptions } = await get("https://igor.npkn.net/iframe", { url: feedItem.embedUrl || feedItem.url });
      feedItem.iframeOptions = iframeOptions;
      feedItem.hideAttachments = !feedItem.iframeOptions;
    }
    if (["twitter", "tiktok", "reddit"].includes(feedItem.source)) {
      feedItem.hideAttachments = true;
      const data = await get(`https://igor.npkn.net/452788/?url=${feedItem.url}`);
      feedItem.embedHtml = data.html;
      if (feedItem.source === "twitter") {
        loadScript("https://platform.twitter.com/widgets.js");
      } else if (feedItem.source === "tiktok") {
        loadScript("https://www.tiktok.com/embed.js");
      } else if (feedItem.source === "reddit") {
        loadScript("https://embed.redditmedia.com/widgets/platform.js");
      }
    }
    if (["indiehackers", "youtube", "loom"].includes(feedItem.source)) {
      feedItem.hideAttachments = true;
    }
    if (feedItem.source === "linkedin" && !feedItem.embedUrl) {
      feedItem.hideAttachments = true;
    }
    if (!feedItem.creator) {
      feedItem.creator = feedItem.creators[0];
    }
    isLoading = false;
  };
  load();
  if ($$props.feedItem === void 0 && $$bindings.feedItem && feedItem !== void 0)
    $$bindings.feedItem(feedItem);
  if ($$props.isEditable === void 0 && $$bindings.isEditable && isEditable !== void 0)
    $$bindings.isEditable(isEditable);
  $$result.css.add(css);
  $$unsubscribe_allProjects();
  return `${isLoading ? `<div class="${"flex justify-center w-full"}">${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}</div>` : `<div><div class="${"_moment flex justify-center svelte-gdc33r"}"><div class="${"p-8 md:p-8 max-w-[800px] w-[800px]"}"><div class="${"flex justify-between"}"><div>${feedItem.title ? `<h1 class="${"svelte-gdc33r"}">${escape(feedItem.title)}</h1>` : ``}</div>

					<div class="${"shrink-0"}"></div></div>

				${feedItem.content ? `<div class="${"whitespace-pre-wrap py-4"}">${escape(feedItem.longContent || feedItem.content)}</div>` : ``}

				<a href="${"/@" + escape(feedItem.creator.username, true)}" class="${""}"><div class="${"flex text-gray-400 items-center text-lg my-8 "}"><div class="${"mr-2"}">By ${escape(feedItem.creator.fullName)}</div>
						<img${add_attribute("src", feedItem.creator.avatarUrl, 0)} class="${"w-[40px] h-[40px] rounded-full mr-2"}"></div></a></div></div>
		${feedItem.source === "momentum" ? `` : `${feedItem.source === "notion" ? `
			
		` : `${feedItem.source === "youtube" ? `
			<iframe class="${"w-full min-h-[600px] mt-2"}" src="${"https://www.youtube.com/embed/" + escape(new URL(feedItem.url).searchParams.get("v"), true) + "?autoplay=1"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>
		` : `${feedItem.embedHtml ? `
			<div class="${[
    "w-full flex justify-center " + escape(htmlIsLoading ? "opacity-0" : "opacity-100", true),
    feedItem.source === "reddit" ? "bg-white" : ""
  ].join(" ").trim()}"${add_attribute("this", embedSocialEl, 0)}><!-- HTML_TAG_START -->${feedItem.embedHtml}<!-- HTML_TAG_END --></div>
			
			
		` : `${feedItem.source === "loom" ? `
			<iframe style="${"width: 100%; min-height: 600px"}"${add_attribute("src", feedItem.url.replace("share/", "embed/"), 0)}></iframe>
		` : `${["dribbble", "instagram", "tiktok"].includes(feedItem.source) ? `` : `${feedItem.source === "linkedin" ? `
			${feedItem.embedUrl ? `<iframe style="${"width: 100%; min-height: 600px"}"${add_attribute("src", feedItem.embedUrl || feedItem.url, 0)}></iframe>` : ``}
		` : `${!feedItem.iframeOptions && !isLoadingError && feedItem.url && !feedItem.url.includes(".mp4") && !feedItem.url.includes(".mov") ? `
			<iframe style="${"width: 100%; min-height: 600px;"}"${add_attribute("src", feedItem.embedUrl || feedItem.url, 0)}></iframe>
		` : `${``}`}`}`}`}`}`}`}`}

		${feedItem.source !== "momentum" ? `<div class="${"py-8 bg-[#070707]"}"><a class="${"flex flex-col justify-center items-center text-sm"}"${add_attribute("href", feedItem.url, 0)} target="${"_blank"}">${feedItem.iframeOptions ? `<div class="${"mb-4"}"></div>` : ``}

					<button><svg class="${"inline w-[15px] h-[15px] text-gray-500 mr-2"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}" fill="${"none"}" stroke="${"currentColor"}" stroke-width="${"2"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" style="${"stroke: white; "}"><path d="${"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}"></path><polyline points="${"15 3 21 3 21 9"}"></polyline><line x1="${"10"}" y1="${"14"}" x2="${"21"}" y2="${"3"}"></line></svg>
						See Original Link
					</button></a></div>` : ``}
		
		${!feedItem.hideAttachments && feedItem.attachments ? `${each(feedItem.attachments, (attachment) => {
    return `<div>${attachment.url.includes(".mov") || attachment.url.includes(".mp4") ? `<video${add_attribute("src", attachment.url, 0)} controls autoplay class="${"w-full"}"></video>` : `<img${add_attribute("src", attachment.url, 0)} class="${"w-full"}">`}
				</div>`;
  })}` : ``}
		

		${feedItem.projects?.length ? `<div class="${"justify-center py-8 md:py-16 flex md:flex-row items-center md:items-start flex-col bg-black"}">${each(feedItem.projects, (project) => {
    return `${!$allProjects.find((p) => p._id === project._id)?.isHub ? `<div class="${"max-w-[300px] mr-8"}">${validate_component(StreamCard, "StreamCard").$$render(
      $$result,
      {
        isLink: true,
        stream: $allProjects.find((p) => p._id === project._id)
      },
      {},
      {}
    )}
						</div>` : ``}`;
  })}</div>` : ``}</div>`}`;
});
export {
  FeedItemPreview as F
};

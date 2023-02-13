import { c as create_ssr_component, e as escape, b as add_attribute, g as subscribe, v as validate_component, h as each } from "./index3.js";
import dayjs from "dayjs";
import "cookie";
import { c as currentUserStore } from "./currentUser.js";
import { a as SourceLogo } from "./StreamCard.js";
import { F as FeedItemPreview } from "./FeedItemPreview.js";
const Modal_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".backdrop.svelte-19v3i59{background-color:rgba(0, 0, 0, 0)}.modal-content.svelte-19v3i59{z-index:1000}.modal-content.svelte-19v3i59{top:50%;left:50%;transform:translateX(-50%) translateY(-50%);width:calc(100% - 32px)}.backdrop.svelte-19v3i59{background-color:#14161a;opacity:0.5}",
  map: null
};
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isShown } = $$props;
  let { isClosable = true } = $$props;
  let { isFixed = true } = $$props;
  let { maxWidth = 1080 } = $$props;
  let { zIndex = 2e3 } = $$props;
  let { onClosed = () => {
  } } = $$props;
  if ($$props.isShown === void 0 && $$bindings.isShown && isShown !== void 0)
    $$bindings.isShown(isShown);
  if ($$props.isClosable === void 0 && $$bindings.isClosable && isClosable !== void 0)
    $$bindings.isClosable(isClosable);
  if ($$props.isFixed === void 0 && $$bindings.isFixed && isFixed !== void 0)
    $$bindings.isFixed(isFixed);
  if ($$props.maxWidth === void 0 && $$bindings.maxWidth && maxWidth !== void 0)
    $$bindings.maxWidth(maxWidth);
  if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0)
    $$bindings.zIndex(zIndex);
  if ($$props.onClosed === void 0 && $$bindings.onClosed && onClosed !== void 0)
    $$bindings.onClosed(onClosed);
  $$result.css.add(css$1);
  return `

${isShown ? `<div><div class="${[
    "_modal inset-0 overflow-y-hidden rounded-2xl max-h-[100%]",
    (!isShown ? "hidden" : "") + " " + (isFixed ? "fixed" : "") + " " + (!isFixed ? "absolute" : "")
  ].join(" ").trim()}" aria-labelledby="${"modal-title"}" role="${"dialog"}" aria-modal="${"true"}" style="${"z-index: " + escape(zIndex, true)}"><div class="${"flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0"}"><div class="${"absolute backdrop inset-0 transition-opacity svelte-19v3i59"}" aria-hidden="${"true"}"></div>

				<div class="${"modal-content max-h-full overflow-y-scroll absolute inline-block align-bottom rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full svelte-19v3i59"}"${add_attribute("style", maxWidth ? `max-width: ${maxWidth}px;` : "", 0)}>${isClosable ? `` : ``}
					<div class="${"bg-[#111111]"}">${slots.default ? slots.default({}) : ``}</div></div></div></div></div>` : ``}`;
});
const FeedItem_svelte_svelte_type_style_lang = "";
const css = {
  code: "._item.svelte-dpdt2k.svelte-dpdt2k{transition:all 0.08s linear;border:1px rgba(255, 255, 255, 0.3) solid;border-radius:15px;padding:16px;z-index:1000;color:white}._item.svelte-dpdt2k:not(._light) hr.svelte-dpdt2k{opacity:0.2}._item._light.svelte-dpdt2k.svelte-dpdt2k{color:#222;border:1px rgba(0, 0, 0, 0.2) solid}._item._link.svelte-dpdt2k.svelte-dpdt2k{cursor:pointer}._item._release.svelte-dpdt2k.svelte-dpdt2k{border-color:#d87712 !important;border-width:1px}._item._link.svelte-dpdt2k.svelte-dpdt2k:hover{background:rgba(255, 255, 255, 0.03);border:1px rgba(255, 255, 255, 0.5) solid}",
  map: null
};
const FeedItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $currentUser, $$unsubscribe_currentUser;
  $$unsubscribe_currentUser = subscribe(currentUserStore, (value) => $currentUser = value);
  let isPreview = false;
  let { theme = "dark" } = $$props;
  let { bgColor = "" } = $$props;
  let { hideLikes = false } = $$props;
  let { feedItem = {} } = $$props;
  let { class: clazz = "" } = $$props;
  let videoEl;
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0)
    $$bindings.theme(theme);
  if ($$props.bgColor === void 0 && $$bindings.bgColor && bgColor !== void 0)
    $$bindings.bgColor(bgColor);
  if ($$props.hideLikes === void 0 && $$bindings.hideLikes && hideLikes !== void 0)
    $$bindings.hideLikes(hideLikes);
  if ($$props.feedItem === void 0 && $$bindings.feedItem && feedItem !== void 0)
    $$bindings.feedItem(feedItem);
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
    $$bindings.class(clazz);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        isShown: isPreview,
        onClosed: () => isPreview = false
      },
      {},
      {
        default: () => {
          return `${validate_component(FeedItemPreview, "FeedItemPreview").$$render($$result, { feedItem }, {}, {})}`;
        }
      }
    )}

<a class="${[
      escape(theme === "dark" ? "_dark" : "_light", true) + " _item _link mb-8 inline-block w-full relative " + escape(clazz, true) + " svelte-dpdt2k",
      feedItem.isRelease ? "_release" : ""
    ].join(" ").trim()}"${add_attribute("style", bgColor ? `background-color: ${bgColor};` : "", 0)}${add_attribute("href", feedItem.url, 0)} target="${"_blank"}"><div class="${"relative"}">${feedItem.title ? `<div class="${"font-bold"}"${add_attribute("href", feedItem.url, 0)}>${escape(feedItem.title)}</div>
			<hr class="${"my-4 svelte-dpdt2k"}">` : ``}

		${feedItem.content ? `<div class="${[
      "whitespace-pre-wrap",
      feedItem.content?.length > 240 ? "line-clamp-7" : ""
    ].join(" ").trim()}">${escape(feedItem.content)}</div>` : ``}

		${["youtube"].includes(feedItem.source) && feedItem.url ? `${feedItem.attachments?.length ? `<div class="${"absolute"}" style="${"left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%);"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" style="${"width: 80px; height: 80px;"}" height="${"800"}" width="${"1200"}" viewBox="${"-35.20005 -41.33325 305.0671 247.9995"}"><path d="${"M229.763 25.817c-2.699-10.162-10.65-18.165-20.748-20.881C190.716 0 117.333 0 117.333 0S43.951 0 25.651 4.936C15.553 7.652 7.6 15.655 4.903 25.817 0 44.236 0 82.667 0 82.667s0 38.429 4.903 56.85C7.6 149.68 15.553 157.681 25.65 160.4c18.3 4.934 91.682 4.934 91.682 4.934s73.383 0 91.682-4.934c10.098-2.718 18.049-10.72 20.748-20.882 4.904-18.421 4.904-56.85 4.904-56.85s0-38.431-4.904-56.85"}" fill="${"red"}"></path><path d="${"M93.333 117.559l61.333-34.89-61.333-34.894z"}" fill="${"#fff"}"></path></svg></div>` : `<iframe class="${"w-full mt-2 min-h-[300px] pointer-events-none"}" src="${"https://www.youtube.com/embed/" + escape(new URL(feedItem.url).searchParams.get("v"), true)}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>`}` : ``}

		${feedItem.longContent || ["linkedin"].includes(feedItem.source) && !feedItem.isRelease ? `<div class="${"flex justify-between opacity-50"}"><div>...</div>
				<div class="${"text-right"}">...see more</div></div>` : ``}

		${feedItem.attachments ? `<div class="${"mt-2"}">${each(feedItem.attachments, (attachment) => {
      return `${attachment.type === "image" ? `<img${add_attribute("src", attachment.url, 0)} class="${"w-full "}" style="${"max-height: 300px; object-fit: cover;"}">` : ``}
					${attachment.type === "video" ? `<video${add_attribute("src", attachment.url, 0)} style="${"width: 100%; max-height: 300px;"}" muted loop autoplay${add_attribute("this", videoEl, 0)}></video>` : ``}`;
    })}</div>` : ``}

		<div class="${"my-4 flex items-center justify-between"}"><div class="${"flex items-center text-sm opacity-80"}">${feedItem.isRelease ? `<div class="${"mr-2"}">🚀</div>` : ``}

				<div class="${"shrink-0"}">${$currentUser && ($currentUser.isAdmin || feedItem.creators.find((c) => c._id === $currentUser._id)) ? `<a class="${"hover:underline opacity-90"}" href="${"/write?feedId=" + escape(feedItem._id, true)}">${escape(dayjs(new Date(feedItem.publishedOn || feedItem.createdOn)).format("MMM DD, YYYY"))}</a>` : `${escape(dayjs(new Date(feedItem.publishedOn || feedItem.createdOn)).format("MMM DD, YYYY"))}`}</div>

				<div class="${"mx-4"}">${each((feedItem.projects || []).filter((p) => !p.isHub), (project) => {
      return `<a class="${"hover:underline mr-4 opacity-90"}" href="${"/" + escape(project.slug, true)}"><span style="${"color: " + escape(project.color, true) + ";"}">#</span>
							${escape(project.title)}
						</a>`;
    })}</div></div>

			${validate_component(SourceLogo, "SourceLogo").$$render(
      $$result,
      { source: feedItem.source },
      {
        source: ($$value) => {
          feedItem.source = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>

		<hr class="${"my-4 svelte-dpdt2k"}">

		<div class="${"flex justify-between items-center"}"><div class="${"flex justify-between items-center"}"><div class="${"flex items-center"}">${feedItem?.creators ? `${each(feedItem.creators, (creator, i) => {
      return `<a href="${"/@" + escape(creator.username, true)}" class="${"shrink-0 w-[40px] mr-[-20px]"}" style="${"z-index: " + escape(100 - i, true) + ";"}"><img${add_attribute("src", creator.avatarUrl, 0)} class="${"rounded-full w-[40px] h-[40px]"}">
							</a>`;
    })}

						<div class="${"pl-4 text-sm ml-[20px]"}">${each(feedItem.creators, (creator, i) => {
      return `<a href="${"/@" + escape(creator.username, true)}" class="${"hover:underline"}">${escape(creator.fullName)}</a>${escape(i !== feedItem.creators.length - 1 ? ", " : "")}`;
    })}</div>` : ``}</div></div>

			${!hideLikes ? `<div class="${"flex"}"><div class="${"text-sm text-gray-400 mr-2 items-center justify-center flex items-center mr-4"}">${escape(feedItem.viewsCount || 0)}

						<svg class="${"ml-1"}" xmlns="${"http://www.w3.org/2000/svg"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}" fill="${"rgba(255, 255, 255, .6)"}" height="${"15px"}" width="${"15px"}" version="${"1.1"}" viewBox="${"0 0 512 512"}" enable-background="${"new 0 0 512 512"}"><g><path d="${"m494.8,241.4l-50.6-49.4c-50.1-48.9-116.9-75.8-188.2-75.8s-138.1,26.9-188.2,75.8l-50.6,49.4c-11.3,12.3-4.3,25.4 0,29.2l50.6,49.4c50.1,48.9 116.9,75.8 188.2,75.8s138.1-26.9 188.2-75.8l50.6-49.4c4-3.8 11.7-16.4 0-29.2zm-238.8,84.4c-38.5,0-69.8-31.3-69.8-69.8 0-38.5 31.3-69.8 69.8-69.8 38.5,0 69.8,31.3 69.8,69.8 0,38.5-31.3,69.8-69.8,69.8zm-195.3-69.8l35.7-34.8c27-26.4 59.8-45.2 95.7-55.4-28.2,20.1-46.6,53-46.6,90.1 0,37.1 18.4,70.1 46.6,90.1-35.9-10.2-68.7-29-95.7-55.3l-35.7-34.7zm355,34.8c-27,26.3-59.8,45.1-95.7,55.3 28.2-20.1 46.6-53 46.6-90.1 0-37.2-18.4-70.1-46.6-90.1 35.9,10.2 68.7,29 95.7,55.4l35.6,34.8-35.6,34.7z"}"></path></g></svg></div>

					<div class="${"flex items-center " + escape(feedItem.isLiked ? "text-[#ff3838]" : "text-white", true)}"><div class="${"text-sm opacity-70"}">${escape(feedItem.likesCount || 0)}</div>

						${feedItem.isLiked ? `<div><svg class="${"cursor-pointer ml-2 hover:text-[#ff3838] w-[15px] h-[15px] opacity-80"}" xmlns="${"http://www.w3.org/2000/svg"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}" fill="${"#000000"}" height="${"800px"}" width="${"800px"}" version="${"1.1"}" id="${"Layer_1"}" viewBox="${"0 0 507.168 507.168"}" xml:space="${"preserve"}"><g><g><path d="${"M368.804,38.31c-46.848,0-89.452,23.064-115.212,62.008C227.836,61.374,185.22,38.31,138.384,38.31    C62.08,38.31,0,100.402,0,176.738c0,69.304,43.66,141.764,126.264,209.576c62.048,50.924,124.96,81.84,125.592,82.144    c0.544,0.268,1.14,0.4,1.732,0.4s1.188-0.128,1.736-0.4c0.628-0.304,63.544-31.22,125.584-82.144    c82.604-67.808,126.26-140.268,126.26-209.576C507.172,100.402,445.1,38.31,368.804,38.31z"}"${add_attribute("fill", feedItem.isLiked ? "#ff3838" : "", 0)} stroke="${"white"}"></path></g></g></svg></div>` : ``}

						${!feedItem.isLiked ? `<div><svg class="${"svg-icon cursor-pointer ml-2 hover:text-[#ff3838] " + escape(feedItem.isLiked ? "" : "opacity-70 hover:opacity-100", true)}" xmlns="${"http://www.w3.org/2000/svg"}" style="${"width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"}" viewBox="${"0 0 1024 1024"}" version="${"1.1"}"><path d="${"M526.464 159.573333C572.586667 113.472 631.893333 85.333333 704 85.333333c155.221333 0 277.333333 126.869333 277.333333 305.408 0 107.093333-52.693333 196.138667-150.016 292.202667-20.949333 20.693333-84.970667 79.317333-87.850666 82.090667-9.066667 8.618667-18.837333 17.557333-29.290667 26.773333a1554.282667 1554.282667 0 0 1-41.301333 35.114667c-29.866667 24.533333-61.76 49.237333-93.632 72.917333a2607.744 2607.744 0 0 1-42.688 31.061333 42.666667 42.666667 0 0 1-49.109334 0 2607.744 2607.744 0 0 1-42.709333-31.04 2444.010667 2444.010667 0 0 1-93.610667-72.938666 1554.282667 1554.282667 0 0 1-41.301333-35.114667c-10.453333-9.216-20.224-18.154667-29.290667-26.773333-2.88-2.773333-66.901333-61.418667-87.850666-82.090667C95.381333 586.88 42.666667 497.856 42.666667 390.741333 42.666667 212.181333 164.778667 85.333333 320 85.333333c72.106667 0 131.413333 28.117333 177.536 74.24 5.184 5.184 10.005333 10.368 14.464 15.488 4.48-5.12 9.28-10.304 14.464-15.466666z m1.898667 671.786667A2360.746667 2360.746667 0 0 0 618.666667 761.002667a1469.802667 1469.802667 0 0 0 39.04-33.173334c9.664-8.533333 18.645333-16.746667 26.88-24.576 3.989333-3.797333 67.2-61.717333 86.784-81.024C853.952 540.672 896 469.674667 896 390.741333 896 258.624 811.349333 170.666667 704 170.666667c-47.765333 0-86.144 18.197333-117.205333 49.258666a202.325333 202.325333 0 0 0-27.946667 35.029334 129.728 129.728 0 0 0-7.872 13.909333c-15.04 33.749333-62.933333 33.749333-77.952 0a129.728 129.728 0 0 0-7.850667-13.909333 202.325333 202.325333 0 0 0-27.968-35.029334C406.144 188.864 367.765333 170.666667 320 170.666667c-107.349333 0-192 87.957333-192 220.074666 0 78.933333 42.026667 149.930667 124.629333 231.466667 19.562667 19.328 82.794667 77.248 86.784 81.045333 8.234667 7.829333 17.216 16.042667 26.88 24.576 12.074667 10.666667 25.130667 21.76 39.04 33.173334a2360.746667 2360.746667 0 0 0 106.666667 82.410666c5.205333-3.818667 10.666667-7.829333 16.362667-12.053333z"}"></path></svg></div>` : ``}</div></div>` : ``}</div></div>
</a>`;
  } while (!$$settled);
  $$unsubscribe_currentUser();
  return $$rendered;
});
export {
  FeedItem as F
};

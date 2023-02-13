import { c as create_ssr_component, h as each, b as add_attribute, e as escape, g as subscribe, p as createEventDispatcher, o as onDestroy, v as validate_component, q as set_store_value } from "../../../chunks/index3.js";
import _ from "lodash";
import { w as writable } from "../../../chunks/index2.js";
import { p as page } from "../../../chunks/stores.js";
import { g as get, G as GOOGLE_LOGIN_URL } from "../../../chunks/api.js";
import { F as FeedItem } from "../../../chunks/FeedItem.js";
import "iframe-resizer/js/iframeResizer.js";
import { S as StreamCard } from "../../../chunks/StreamCard.js";
import moment from "moment";
import "cookie";
import { c as currentUserStore } from "../../../chunks/currentUser.js";
import { a as allProjectsStore } from "../../../chunks/allProjects.js";
import { L as Loader } from "../../../chunks/Loader.js";
import { f as fetch } from "../../../chunks/feed.js";
import { c as creatorsStore, u as update } from "../../../chunks/creators.js";
const Highlight_svelte_svelte_type_style_lang = "";
const HighlightAuto_svelte_svelte_type_style_lang = "";
const HighlightSvelte_svelte_svelte_type_style_lang = "";
const LineNumbers_svelte_svelte_type_style_lang = "";
const Tooltip_svelte_svelte_type_style_lang = "";
const CadenceGrid_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "._cell.svelte-hditck{border:1px rgba(255, 255, 255, 0.3) solid;cursor:default}._today.svelte-hditck{border:1px white solid;font-weight:bold}._empty.svelte-hditck{color:rgba(255, 255, 255, 0.3)}",
  map: null
};
const CadenceGrid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { projectSlug } = $$props;
  let { creatorUsername } = $$props;
  let { weeks = 4 } = $$props;
  let allWeeks = [];
  let load = async () => {
    let query = { weeks };
    if (projectSlug) {
      query.projectSlug = projectSlug;
    }
    if (creatorUsername) {
      query.creatorUsername = creatorUsername;
    }
    const dayStats = await get("feed/stats", query);
    let now = moment();
    let lastMonday = now.clone().startOf("isoweek");
    _.range(0, weeks).forEach((weekNum) => {
      allWeeks[weekNum] = [];
      _.range(0, 7).forEach((dayNum) => {
        let date = lastMonday.clone().subtract(weekNum, "weeks").add(dayNum, "days");
        let dateLabel = date.format("YYYY-MM-DD");
        let dateStats = dayStats.find((d) => d.date === dateLabel);
        allWeeks[weekNum].push({
          count: dateStats?.count || 0,
          date: dateLabel,
          dateFormatted: moment(dateLabel).format("MMM DD"),
          isToday: now.isSame(date, "day"),
          isFuture: date > now
        });
      });
    });
  };
  load();
  if ($$props.projectSlug === void 0 && $$bindings.projectSlug && projectSlug !== void 0)
    $$bindings.projectSlug(projectSlug);
  if ($$props.creatorUsername === void 0 && $$bindings.creatorUsername && creatorUsername !== void 0)
    $$bindings.creatorUsername(creatorUsername);
  if ($$props.weeks === void 0 && $$bindings.weeks && weeks !== void 0)
    $$bindings.weeks(weeks);
  $$result.css.add(css$1);
  return `<div><div class="${"flex w-full justify-between text-sm opacity-60 mb-2"}"><div class="${"flex justify-center items-center w-[14.3%]"}">Mo</div>
		<div class="${"flex justify-center items-center w-[14.3%]"}">Tu</div>
		<div class="${"flex justify-center items-center w-[14.3%]"}">We</div>
		<div class="${"flex justify-center items-center w-[14.3%]"}">Th</div>
		<div class="${"flex justify-center items-center w-[14.3%]"}">Fr</div>
		<div class="${"flex justify-center items-center w-[14.3%]"}">St</div>
		<div class="${"flex justify-center items-center w-[14.3%]"}">Su</div></div>

	${each(allWeeks, (weekDays) => {
    return `<div class="${"flex w-full justify-between"}">${each(weekDays, (weekDay) => {
      return `<div class="${[
        "_cell flex grow justify-center items-center text-sm p-2 text-gray-400 w-[14.3%] svelte-hditck",
        (weekDay.isFuture ? "opacity-30" : "") + " " + (weekDay.isToday ? "_today" : "") + " " + (!weekDay.count ? "_empty" : "")
      ].join(" ").trim()}"${add_attribute("title", `${weekDay.dateFormatted} — ${weekDay.count || "no"} posts`, 0)}>${escape(weekDay.count)}
				</div>`;
    })}
		</div>`;
  })}
</div>`;
});
const FollowButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $allProjects, $$unsubscribe_allProjects;
  let $currentUser, $$unsubscribe_currentUser;
  $$unsubscribe_allProjects = subscribe(allProjectsStore, (value) => $allProjects = value);
  $$unsubscribe_currentUser = subscribe(currentUserStore, (value) => $currentUser = value);
  let { creator } = $$props;
  let { project } = $$props;
  let { isShort = false } = $$props;
  let { isOnlyFollow = false } = $$props;
  let { class: clazz = "w-full" } = $$props;
  if ($$props.creator === void 0 && $$bindings.creator && creator !== void 0)
    $$bindings.creator(creator);
  if ($$props.project === void 0 && $$bindings.project && project !== void 0)
    $$bindings.project(project);
  if ($$props.isShort === void 0 && $$bindings.isShort && isShort !== void 0)
    $$bindings.isShort(isShort);
  if ($$props.isOnlyFollow === void 0 && $$bindings.isOnlyFollow && isOnlyFollow !== void 0)
    $$bindings.isOnlyFollow(isOnlyFollow);
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
    $$bindings.class(clazz);
  $$unsubscribe_allProjects();
  $$unsubscribe_currentUser();
  return `${$currentUser ? `<div class="${"my-4"}">

		${project && project.slug && project.creator?._id !== $currentUser._id ? `${$allProjects.find((f) => f._id === project._id).isFollowing ? `${!isOnlyFollow ? `<div class="${"w-full font-bold text-sm cursor-pointer hover:underline text-center"}">${isShort ? `✓ Following` : `✓ You&#39;re following ${escape(project.title)}`}</div>` : ``}` : `<button${add_attribute("class", clazz, 0)}>${isShort ? `💥 Follow` : `💥 Follow #${escape(project.title)}`}</button>`}` : ``}</div>` : ``}`;
});
const InfiniteScroll = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { threshold = 0 } = $$props;
  let { horizontal = false } = $$props;
  let { elementScroll } = $$props;
  let { hasMore = true } = $$props;
  createEventDispatcher();
  let { onLoadMore } = $$props;
  let isLoadMore = false;
  let component;
  let element;
  let isLoading = false;
  const onScroll = async (e) => {
    if (!isLoading) {
      const element2 = e.target.scrollingElement;
      const offset = horizontal ? element2.scrollWidth - element2.clientWidth - element2.scrollLeft : element2.scrollHeight - element2.clientHeight - element2.scrollTop;
      if (offset <= threshold) {
        if (!isLoadMore && hasMore) {
          try {
            isLoading = true;
            await onLoadMore();
          } finally {
            isLoading = false;
          }
        }
        isLoadMore = true;
      } else {
        isLoadMore = false;
      }
    }
  };
  onDestroy(() => {
    if (element) {
      element.removeEventListener("scroll", null);
      element.removeEventListener("resize", null);
    }
  });
  if ($$props.threshold === void 0 && $$bindings.threshold && threshold !== void 0)
    $$bindings.threshold(threshold);
  if ($$props.horizontal === void 0 && $$bindings.horizontal && horizontal !== void 0)
    $$bindings.horizontal(horizontal);
  if ($$props.elementScroll === void 0 && $$bindings.elementScroll && elementScroll !== void 0)
    $$bindings.elementScroll(elementScroll);
  if ($$props.hasMore === void 0 && $$bindings.hasMore && hasMore !== void 0)
    $$bindings.hasMore(hasMore);
  if ($$props.onLoadMore === void 0 && $$bindings.onLoadMore && onLoadMore !== void 0)
    $$bindings.onLoadMore(onLoadMore);
  {
    {
      if (elementScroll) {
        if (elementScroll) {
          if (elementScroll === "body") {
            element = document;
          } else {
            element = component.parentNode;
          }
          element.addEventListener("scroll", onScroll);
          element.addEventListener("resize", onScroll);
        }
      }
    }
  }
  return `<div${add_attribute("this", component, 0)}>${isLoading ? `<div class="${"w-full flex justify-center"}">${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}</div>` : ``}</div>`;
});
const Feed_svelte_svelte_type_style_lang = "";
const css = {
  code: "._menu_item.svelte-bnoq8t{cursor:pointer;transition:all linear 0.05s}._menu_item.svelte-bnoq8t:hover{background:rgba(255, 255, 255, 0.1);border-bottom:1px rgba(255, 255, 255, 0.3) solid;margin-bottom:-1px}._menu_item._selected.svelte-bnoq8t{border-bottom:1px solid;margin-bottom:-1px}",
  map: null
};
let selectedSource = null;
let startWritingPlaceholder = "What have you created today?";
const Feed = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $creators, $$unsubscribe_creators;
  let $currentUser, $$unsubscribe_currentUser;
  let $page, $$unsubscribe_page;
  let $projects, $$unsubscribe_projects;
  let $allProjects, $$unsubscribe_allProjects;
  $$unsubscribe_creators = subscribe(creatorsStore, (value) => $creators = value);
  $$unsubscribe_currentUser = subscribe(currentUserStore, (value) => $currentUser = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_allProjects = subscribe(allProjectsStore, (value) => $allProjects = value);
  let feed = [];
  let { ogTitle = "Momentum" } = $$props;
  let { ogDescription = "Momentum is a tool to build in public and grow audience early." } = $$props;
  let creator;
  let prevCreator;
  let projects = writable(null);
  $$unsubscribe_projects = subscribe(projects, (value) => $projects = value);
  let isProjectsLoading = false;
  let isCreatorLoading = false;
  let currentPageNumber = 1;
  const updateProjects = async ({ projectSlug, creatorUsername, isExplore = false }) => {
    if (!creatorUsername) {
      set_store_value(projects, $projects = $allProjects, $projects);
    } else {
      let query = { creatorUsername };
      isProjectsLoading = true;
      try {
        const { results } = await get("projects", query);
        set_store_value(projects, $projects = results, $projects);
      } finally {
        isProjectsLoading = false;
      }
    }
  };
  const checkAndUpdateProjects = async (paramUsername) => {
    if (paramUsername === "explore") {
      if (!isExploreProjectsModeOn) {
        toggleProjectsExploreMode();
      }
    } else {
      let username = paramUsername && paramUsername.startsWith("@") ? paramUsername.replace("@", "") : null;
      let projectSlug = paramUsername && !paramUsername.startsWith("@") ? paramUsername : null;
      if (username) {
        if (username !== prevCreator?.username) {
          isCreatorLoading = true;
          updateProjects({ creatorUsername: username });
          if (username !== $currentUser?.username) {
            creator = await get(`creators/${username}`);
          } else {
            creator = $currentUser;
          }
          if (!prevCreator) {
            setProject();
          }
          if (isExploreProjectsModeOn) {
            isExploreProjectsModeOn = false;
          }
          prevCreator = _.clone(creator);
          isCreatorLoading = false;
        }
      }
      if (projectSlug) {
        let forceRefresh = false;
        if (!username && creator) {
          creator = null;
          prevCreator = null;
          await updateProjects({});
          forceRefresh = true;
        }
        if ($projects) {
          let project = $projects.find((p) => p.slug === projectSlug);
          if (!project) {
            project = await get(`projects/${projectSlug}`);
          }
          setProject(project, forceRefresh);
        } else {
          await updateProjects({});
          return checkAndUpdateProjects(paramUsername);
        }
      }
      if ($page.url.pathname === "/") {
        if (!username && !projectSlug) {
          creator = null;
          prevCreator = null;
          if (isExploreProjectsModeOn) {
            toggleProjectsExploreMode();
          } else {
            if (!$projects) {
              await updateProjects({});
            }
            setProject();
          }
        }
      }
    }
  };
  const getDefaultProject = () => {
    return creator ? {
      _id: creator._id,
      slug: null,
      title: creator.fullName,
      description: creator.description || `A feed from ${creator.fullName}`
    } : {
      slug: null,
      title: isExploreProjectsModeOn ? "Explore Momentum" : $currentUser ? "My Feed" : "Momentum Feed",
      description: isExploreProjectsModeOn ? `Updates from streams that you don't follow yet.` : $currentUser ? "Latest updates from Momentum streams that I follow" : "Latest updates from Momentum streams"
    };
  };
  let selectedProject;
  let fetchFeedPage = ({ page: page2 = 1 } = {}) => {
    return fetch({
      source: selectedSource,
      project: selectedProject?.slug,
      creatorUsername: creator?.username,
      isExplore: isExploreProjectsModeOn,
      page: page2
    });
  };
  let refreshFeed = async () => {
    feed = [];
    isExploreModeOn = false;
    searchText = "";
    currentPageNumber = 1;
    feed = await fetchFeedPage();
    if (!creator) {
      update({
        projectSlug: selectedProject?.slug,
        isExplore: isExploreProjectsModeOn
      });
    } else {
      set_store_value(creatorsStore, $creators = [], $creators);
    }
  };
  const setProject = (newProject = getDefaultProject(), forceRefresh = false) => {
    if (!selectedProject || selectedProject?.slug !== newProject?.slug) {
      selectedProject = newProject;
      refreshFeed();
    } else if (!newProject?.slug) {
      selectedProject = newProject;
      refreshFeed();
    } else if (forceRefresh) {
      refreshFeed();
    }
  };
  let isExploreModeOn = false;
  let isExploreProjectsModeOn = false;
  const toggleProjectsExploreMode = () => {
    isExploreProjectsModeOn = !isExploreProjectsModeOn;
    updateProjects({ isExplore: isExploreProjectsModeOn });
    if (creator) {
      creator = null;
    }
    setProject();
    refreshFeed();
  };
  let searchText = "";
  let loadMore = async () => {
    currentPageNumber++;
    const feedPage = await fetchFeedPage({ page: currentPageNumber });
    feed = [...feed, ...feedPage];
  };
  if ($$props.ogTitle === void 0 && $$bindings.ogTitle && ogTitle !== void 0)
    $$bindings.ogTitle(ogTitle);
  if ($$props.ogDescription === void 0 && $$bindings.ogDescription && ogDescription !== void 0)
    $$bindings.ogDescription(ogDescription);
  $$result.css.add(css);
  {
    checkAndUpdateProjects($page.params.username);
  }
  $$unsubscribe_creators();
  $$unsubscribe_currentUser();
  $$unsubscribe_page();
  $$unsubscribe_projects();
  $$unsubscribe_allProjects();
  return `${$$result.head += `<!-- HEAD_svelte-ehqsbu_START -->${!creator && selectedProject ? `${$$result.title = `<title>${escape(selectedProject.slug ? selectedProject.title + " — Momentum Stream" : isExploreProjectsModeOn ? "Explore — Momentum" : "My Feed — Momentum")}
		</title>`, ""}
		<meta property="${"og:title"}"${add_attribute(
    "content",
    selectedProject.slug ? selectedProject.title + " — Momentum Stream" : isExploreProjectsModeOn ? "Explore — Momentum" : "My Feed — Momentum",
    0
  )}>` : ``}${creator ? `${$$result.title = `<title>${escape(creator.fullName)} — Momentum Stream</title>`, ""}
		<meta property="${"og:title"}" content="${escape(creator.fullName, true) + " — Momentum Stream"}">` : ``}<!-- HEAD_svelte-ehqsbu_END -->`, ""}





${``}

<div>
	${``}

	<div><section class="${"relative flex justify-between mb-8"}"><div class="${"flex w-full items-center"}"><div><div class="${"items-center w-full"}"><h1 class="${"flex items-center text-xl font-bold"}" style="${"z-index: 100;"}">${escape(selectedProject?.title || "...")}</h1></div>
					<div class="${"text-lg mt-2"}" style="${"opacity: .8;"}">${escape(selectedProject?.description || "...")}</div></div></div></section></div>

	<div class="${"fixed top-0 left-0 md:left-auto md:ml-[-325px] w-full md:w-[250px] bg-black " + escape(
    isExploreModeOn ? "visible opacity-100" : "invisible md:visible opacity-0 md:opacity-100",
    true
  )}" style="${"height: 100vh; overflow-y: scroll; padding-left: 5px; z-index: " + escape(isExploreModeOn ? 1200 : 0, true) + "; transition: all 0.1s linear;"}">${isExploreModeOn ? `<button class="${"w-[60px] h-[60px] text-[30px] rounded-full flex items-center justify-center border-none fixed bg-black right-4 top-4 font-xl z-10"}">⤬
			</button>` : ``}

		<div class="${"relative left-0 p-8 md:p-0"}"><div class="${"relative pt-16 md:pt-32"}"><div><a class="${[
    "cursor-pointer _menu_item flex items-center py-2 ml-[-10px] svelte-bnoq8t",
    !selectedProject?.slug && !isExploreProjectsModeOn && !isCreatorLoading && !creator ? "_selected" : ""
  ].join(" ").trim()}" href="${"/"}"><div class="${"_emoji p-2 mr-2 rounded-full font-bold"}" style="${"color: gray; opacity: .7;"}">🌀
						</div>
						${escape($currentUser ? "My Feed" : "Momentum Feed")}</a>

					${$currentUser ? `<a class="${[
    "cursor-pointer _menu_item flex items-center py-2 ml-[-10px] svelte-bnoq8t",
    selectedProject?._id === $currentUser._id ? "_selected" : ""
  ].join(" ").trim()}" href="${"/@" + escape($currentUser.username, true)}"><div class="${"_emoji p-2 mr-2 rounded-full text-[#00eaff] font-bold"}" style="${"opacity: .7;"}">@
							</div>
							${escape($currentUser.fullName)}</a>` : ``}

					</div>

				${creator && $currentUser && creator._id === $currentUser._id ? `<div class="${"mt-16 w-full"}"><a href="${"/launch"}" class="${"w-full"}"><button class="${"w-full"}">🚀 Launch Your #Stream </button></a></div>` : ``}

				<div class="${"mt-16"}">${creator ? `<h2 class="${"flex items-center py-2 mt-16 text-lg"}">${escape(creator.fullName)}
							<img${add_attribute("src", creator.avatarUrl, 0)} class="${"w-[30px] h-[30px] rounded-full inline ml-4 mr-[13px] my-2"}"></h2>` : ``}

					<div class="${"flex justify-between items-center font-bold block mt-8 mb-4"}"><div>${escape($currentUser && !creator ? "All Streams" : "")}
							${escape(creator ? `Contributions` : "")}
							${escape(!$currentUser && !creator && "Explore Streams" || "")}
							${!isProjectsLoading && $projects?.length ? `<span class="${"number-tag"}">${escape(creator ? $projects.length : $allProjects.length)}</span>` : ``}</div></div></div>

				${creator && creator._id !== $currentUser?._id ? `<a class="${[
    "cursor-pointer _menu_item flex items-center py-2 ml-[-10px] svelte-bnoq8t",
    selectedProject?._id === creator._id ? "_selected" : ""
  ].join(" ").trim()}" href="${"/@" + escape(creator.username, true)}"><div class="${"_emoji p-2 mr-2 rounded-full font-bold"}" style="${"color: rgb(208, 145, 255); opacity: .7;"}">@
						</div>
						${escape(creator.fullName)}</a>` : ``}

				${isExploreProjectsModeOn ? `<a class="${[
    "cursor-pointer _menu_item flex items-center py-2 ml-[-10px] svelte-bnoq8t",
    !selectedProject?.slug && !creator ? "_selected" : ""
  ].join(" ").trim()}" href="${"/"}"><div class="${"_emoji p-2 mr-2 rounded-full font-bold"}" style="${"color: gray; opacity: .7;"}">#
						</div>
						All Streams
					</a>` : ``}

				${!isProjectsLoading && $projects?.length ? `<input type="${"text"}" placeholder="${"Search streams.."}" style="${"border: none; padding-left: 0;"}"${add_attribute("value", searchText, 0)}>

					<div class="${"pb-[200px]"}">${$projects?.length ? `<div>${each((creator?.username ? $projects : $allProjects).filter((p) => p.title.toLowerCase().startsWith(searchText.toLowerCase())), (project) => {
    return `<a class="${[
      "cursor-pointer _menu_item flex items-center py-1 ml-[-10px] svelte-bnoq8t",
      selectedProject?.slug === project.slug ? "_selected" : ""
    ].join(" ").trim()}"${add_attribute("href", (creator ? `/@${creator.username}` : "") || (project.slug ? `/${project.slug}` : "/"), 0)} style="${"border-color: " + escape(project.color, true)}"><div class="${"_emoji p-2 mr-2 rounded-full font-bold"}" style="${"color: " + escape(project.color, true) + "; opacity: .7;"}">#
										</div>
										${escape(project.title)}
									</a>`;
  })}</div>` : ``}</div>` : ``}</div></div></div></div>

<div class="${"hidden md:block fixed w-[300px] top-0 overflow-y-scroll h-screen pb-32"}" style="${"margin-left: 605px; padding: 5px;"}"><div class="${"mt-24 xl:mt-6"}"><div>${$currentUser ? `` : `
				<a class="${"mb-16"}"${add_attribute("href", GOOGLE_LOGIN_URL, 0)} style="${"font-family: Montserrat; font-weight: bold;"}"><button class="${"flex items-center justify-center w-full mb-8"}"><svg class="${"mr-4"}" style="${"width: 20px; height: 20px; margin-left: -20px;"}" xmlns="${"http://www.w3.org/2000/svg"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}" viewBox="${"0 0 48 48"}"><defs><path id="${"a"}" d="${"M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"}"></path></defs><clipPath id="${"b"}"><use xlink:href="${"#a"}" overflow="${"visible"}"></use></clipPath><path clip-path="${"url(#b)"}" fill="${"#FBBC05"}" d="${"M0 37V11l17 13z"}"></path><path clip-path="${"url(#b)"}" fill="${"#EA4335"}" d="${"M0 11l17 13 7-6.1L48 14V0H0z"}"></path><path clip-path="${"url(#b)"}" fill="${"#34A853"}" d="${"M0 37l30-23 7.9 1L48 0v48H0z"}"></path><path clip-path="${"url(#b)"}" fill="${"#4285F4"}" d="${"M48 48L17 24l-4-3 35-10z"}"></path></svg>

						Join Momentum
					</button></a>
			`}</div>

		

		${selectedProject || creator ? `${validate_component(StreamCard, "StreamCard").$$render(
    $$result,
    {
      stream: creator || selectedProject,
      creators: !creator && $creators
    },
    {},
    {}
  )}

			${validate_component(FollowButton, "FollowButton").$$render(
    $$result,
    {
      project: !creator && selectedProject,
      creator
    },
    {},
    {}
  )}
			${creator && selectedProject.slug ? `<div class="${"mt-16"}">${validate_component(StreamCard, "StreamCard").$$render($$result, { stream: selectedProject }, {}, {})}

					${validate_component(FollowButton, "FollowButton").$$render($$result, { project: selectedProject }, {}, {})}</div>` : ``}

			${selectedProject?.slug ? `<div class="${"cursor-pointer w-full flex justify-center my-8"}"><a class="${"flex items-center justify-center"}"><svg style="${"fill:white"}" class="${"w-[25px] h-[25px]"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 50 50"}" enable-background="${"new 0 0 50 50"}"><path d="${"M30.3 13.7L25 8.4l-5.3 5.3-1.4-1.4L25 5.6l6.7 6.7z"}"></path><path d="${"M24 7h2v21h-2z"}"></path><path d="${"M35 40H15c-1.7 0-3-1.3-3-3V19c0-1.7 1.3-3 3-3h7v2h-7c-.6 0-1 .4-1 1v18c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V19c0-.6-.4-1-1-1h-7v-2h7c1.7 0 3 1.3 3 3v18c0 1.7-1.3 3-3 3z"}"></path></svg>

						Share
					</a></div>` : ``}

			${$currentUser && (selectedProject?.slug || creator) ? `${$currentUser.isAdmin || selectedProject && selectedProject.creator?._id === $currentUser._id || creator && creator._id === $currentUser._id ? `<a class="${"w-full"}" href="${"/" + escape(creator ? `@${creator.username}` : selectedProject.slug, true) + "/edit"}"><button class="${"w-full"}">✨ Edit
							${creator ? `@${escape(creator.fullName)}` : `#${escape(selectedProject.title)}`}</button></a>` : ``}` : ``}` : ``}</div>

	<div class="${"mt-8"}"><div class="${"font-bold mb-4"}">Cadence</div>

		<div>${validate_component(CadenceGrid, "CadenceGrid").$$render(
    $$result,
    {
      projectSlug: selectedProject?.slug,
      creatorUsername: creator?.username
    },
    {},
    {}
  )}</div></div>
	</div>

<div></div>

${!isProjectsLoading ? `${$currentUser && (!creator || creator._id === $currentUser._id) ? `<div class="${"relative"}"><img class="${"absolute left-4 rounded-full top-3"}" style="${"width: 30px; height: 30px"}"${add_attribute("src", $currentUser.avatarUrl, 0)}>

			<textarea class="${"pl-16 mb-4"}"${add_attribute(
    "placeholder",
    startWritingPlaceholder,
    0
  )} rows="${"1"}"></textarea></div>` : ``}

	${validate_component(FollowButton, "FollowButton").$$render(
    $$result,
    {
      class: "w-full mb-8 md:hidden",
      project: selectedProject,
      creator,
      isOnlyFollow: true
    },
    {},
    {}
  )}

	${creator && selectedProject?._id !== creator._id ? `<div class="${"flex justify-start items-center py-4 mb-4 text-lg font-bold"}" style="${"font-family: 'Montserrat'"}">Substream from ${escape(creator.fullName)}</div>` : ``}
	${feed.length > 0 ? `<div style="${"padding: 2px; padding-bottom: 300px;"}">${validate_component(InfiniteScroll, "InfiniteScroll").$$render(
    $$result,
    {
      hasMore: true,
      threshold: 100,
      elementScroll: "body",
      onLoadMore: () => {
        loadMore();
      }
    },
    {},
    {}
  )}

			${each(feed, (feedItem) => {
    return `${validate_component(FeedItem, "FeedItem").$$render($$result, { feedItem }, {}, {})}`;
  })}</div>` : ``}

	<div class="${"md:hidden flex items-center justify-center"}" style="${"position: fixed; bottom: 120px; width: 60px; height: 60px; border: 1px solid rgba(255, 255, 255, 0.8); border-radius: 50%; z-index: 1001; background-color: black; box-shadow: 0px 0px 6px #c2daba; font-size: 30px; right: 20px; opacity: .95; "}">#
	</div>` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `


${validate_component(Feed, "Feed").$$render(
    $$result,
    {
      ogTitle: data.ogTitle,
      ogDescription: data.ogDescription
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};

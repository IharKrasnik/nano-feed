import { c as create_ssr_component, p as createEventDispatcher, b as add_attribute, g as subscribe, e as escape, v as validate_component } from "../../../../chunks/index3.js";
import { p as page } from "../../../../chunks/stores.js";
import { g as get } from "../../../../chunks/api.js";
import { L as Loader } from "../../../../chunks/Loader.js";
import { S as StreamCard } from "../../../../chunks/StreamCard.js";
import "cookie";
import { p as projectsStore } from "../../../../chunks/projects.js";
import { a as allProjectsStore } from "../../../../chunks/allProjects.js";
import { c as currentUserStore } from "../../../../chunks/currentUser.js";
const FileInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { url } = $$props;
  createEventDispatcher();
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  return `<input type="${"text"}" placeholder="${"Insert URL or paste from clipboard"}"${add_attribute("value", url, 0)}>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_allProjects;
  let $$unsubscribe_projects;
  let $page, $$unsubscribe_page;
  let $currentUser, $$unsubscribe_currentUser;
  $$unsubscribe_allProjects = subscribe(allProjectsStore, (value) => value);
  $$unsubscribe_projects = subscribe(projectsStore, (value) => value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_currentUser = subscribe(currentUserStore, (value) => $currentUser = value);
  let project;
  let creator;
  let username;
  let load = async () => {
    if ($page.params.username.startsWith("@")) {
      username = $page.params.username.replace("@", "");
      creator = await get(`creators/${username}`);
      stream = {
        title: creator.fullName,
        description: creator.description,
        longDescription: creator.longDescription,
        avatarUrl: creator.avatarUrl,
        bannerUrl: creator.bannerUrl,
        url: creator.url
      };
    } else {
      project = await get(`projects/${$page.params.username}`);
      stream = {
        title: project.title,
        description: project.description,
        longDescription: project.longDescription,
        bannerUrl: project.bannerUrl,
        url: project.url
      };
    }
  };
  if (!project) {
    load();
  }
  let stream;
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-au8g8h_START -->${$$result.title = `<title>Edit ${escape(stream?.title || "")} — Momentum</title>`, ""}<!-- HEAD_svelte-au8g8h_END -->`, ""}

${$currentUser ? `${project ? `<h2 class="${"mb-2"}">Edit #${escape(project.title)}</h2>` : `${creator ? `<h2 class="${"mb-2"}">Edit Profile</h2>` : ``}`}
	

	

	${!stream ? `${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}` : `<form class="${"mb-16 mt-8"}" style="${"padding: 2px;"}">${$currentUser.isAdmin ? `<div class="${"mb-8"}"><label>Name </label>
					<input type="${"text"}" class="${"block"}" placeholder="${"Your brand name"}"${add_attribute("value", stream.title, 0)}></div>` : ``}
			<div class="${"mb-8"}"><label>Tagline </label>
				<input type="${"text"}" class="${"block"}" placeholder="${"Short 1-sentence pitch"}"${add_attribute("value", stream.description, 0)}></div>

			<div class="${"mb-8"}"><label>Description </label>
				<textarea type="${"text"}" rows="${"3"}" class="${"block"}" placeholder="${"Tell what your stream is about and what are your goals. In few short sentences."}">${stream.longDescription || ""}</textarea></div>

			<div class="${"mb-8"}"><label>Website </label>
				<input type="${"text"}" class="${"block"}" placeholder="${"https://" + escape((project?.slug || creator.username).replaceAll(".", "-"), true) + ".com"}"${add_attribute("value", stream.url, 0)}></div>

			${creator ? `<div class="${"mb-8"}"><label>Avatar </label>
					${validate_component(FileInput, "FileInput").$$render(
      $$result,
      { url: stream.avatarUrl },
      {
        url: ($$value) => {
          stream.avatarUrl = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>` : ``}

			<div class="${"mb-8"}"><label>Banner </label>
				${validate_component(FileInput, "FileInput").$$render(
      $$result,
      { url: stream.bannerUrl },
      {
        url: ($$value) => {
          stream.bannerUrl = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>

			<button class="${"p-4 mt-8"}" type="${"submit"}">Update ${escape(creator ? `@${creator.fullName}` : `#${project.title}`)}</button></form>`}

	${project || creator ? `<div class="${"hidden md:flex w-[400px]"}" style="${"position: fixed; top: 0; height: 100vh; flex-direction: column; justify-content: center; transform: translateX(600px); "}">

			${stream ? `<h1>${escape(stream.title)}</h1>
				<h3>${escape(stream.description || "No Tagline")}</h3>` : ``}
			<div class="${"mt-4"}">${validate_component(StreamCard, "StreamCard").$$render($$result, { stream }, {}, {})}</div></div>` : ``}` : ``}`;
  } while (!$$settled);
  $$unsubscribe_allProjects();
  $$unsubscribe_projects();
  $$unsubscribe_page();
  $$unsubscribe_currentUser();
  return $$rendered;
});
export {
  Page as default
};

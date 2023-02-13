import { c as create_ssr_component, e as subscribe, v as validate_component, g as each, f as add_attribute, h as escape } from "../../../../chunks/index3.js";
import "lodash";
import "moment";
import { p as page } from "../../../../chunks/stores.js";
import "cookie";
import { L as Loader } from "../../../../chunks/Loader.js";
import { a as allProjectsStore } from "../../../../chunks/allProjects.js";
const Highlight_svelte_svelte_type_style_lang = "";
const HighlightAuto_svelte_svelte_type_style_lang = "";
const HighlightSvelte_svelte_svelte_type_style_lang = "";
const LineNumbers_svelte_svelte_type_style_lang = "";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "._border-white.svelte-1hdfcy{border:1px rgba(255, 255, 255, .4) solid}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $allProjects, $$unsubscribe_allProjects;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_allProjects = subscribe(allProjectsStore, (value) => $allProjects = value);
  $page.params.slug;
  $$result.css.add(css);
  $$unsubscribe_page();
  $$unsubscribe_allProjects();
  return `${$allProjects ? `<div class="${"flex items-center mb-8"}"><select class="${"small max-w-[300px]"}">${each($allProjects, (project) => {
    return `<option${add_attribute("value", project.slug, 0)}>${escape(project.name)}</option>`;
  })}</select>
    <a href="${"/new"}" style="${"margin-right: -60px;"}"><button class="${"ml-4 small"}">Add</button></a></div>` : ``}

<div class="${"flex justify-between items-center mb-8"}"><h1 class="${"text-xl font-bold"}">Analytics </h1>
  
  <div class="${"flex items-center"}">${`<div class="${"mr-2"}">${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}</div>`}
    <select class="${"max-w-[200px] small"}"><option value="${"7_days"}">Last 7 days</option><option value="${"24_hours"}">Last 24 hours</option></select></div></div>

${`${``}`}`;
});
export {
  Page as default
};

import { c as create_ssr_component, e as subscribe, f as add_attribute, h as escape } from "../../../chunks/index3.js";
import "slug";
import "cookie";
import { a as allProjectsStore } from "../../../chunks/allProjects.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_allProjects;
  $$unsubscribe_allProjects = subscribe(allProjectsStore, (value) => value);
  let project = { name: "", url: "" };
  $$unsubscribe_allProjects();
  return `<div class="${"max-w-[600px] mx-auto"}"><h2 class="${"mb-2"}">Create new project</h2>

  <h3 class="${"mb-8"}">Add web analytics to your page in seconds 
  </h3>

  <div><div class="${"mb-8"}"><label>Name</label>
      <div class="${"_hint mb-4"}"></div>

      <input type="${"text"}" placeholder="${"eg. Momentum, Paralect, MyCatchyBrand etc."}"${add_attribute("value", project.name, 0)}></div>

      <div class="${"mb-8"}"><label>URL</label>
        <div class="${"_hint mb-4"}">URL of your website.
        </div>

        <input type="${"text"}" placeholder="${"eg. https://paralect.com"}"${add_attribute("value", project.url, 0)}></div>

    <div class="${"mt-12"}"><button ${"disabled"}>Create ${escape(project.name)}</button></div></div></div>`;
});
export {
  Page as default
};

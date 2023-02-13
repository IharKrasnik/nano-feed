import { c as create_ssr_component, g as subscribe, b as add_attribute } from "../../../chunks/index3.js";
import "slug";
import "cookie";
import "../../../chunks/creators.js";
import { p as projectsStore } from "../../../chunks/projects.js";
import { c as currentUserStore } from "../../../chunks/currentUser.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_projects;
  let $$unsubscribe_currentUser;
  $$unsubscribe_projects = subscribe(projectsStore, (value) => value);
  $$unsubscribe_currentUser = subscribe(currentUserStore, (value) => value);
  let project = { slug: "", title: "", description: "" };
  $$unsubscribe_projects();
  $$unsubscribe_currentUser();
  return `<h2 class="${"mb-2"}">Launch a new stream</h2>

<h3 class="${"mb-8"}">Promote the work that you do daily. <br>
	Stream is a public page for your updates, releases and links.
</h3>

<div><div class="${"mb-8"}"><label>Name</label>
		<div class="${"_hint mb-4"}">The name should be short and catchy. It&#39;s your brand name.</div>

		<input type="${"text"}" placeholder="${"eg. Momentum, Paralect, MyCatchyBrand etc."}"${add_attribute("value", project.title, 0)}></div>

	${``}

	${``}</div>`;
});
export {
  Page as default
};

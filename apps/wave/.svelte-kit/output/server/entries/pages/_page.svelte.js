import { c as create_ssr_component, e as subscribe, v as validate_component } from "../../chunks/index3.js";
import { L as Loader } from "../../chunks/Loader.js";
import { c as currentUserStore } from "../../chunks/currentUser.js";
import { a as allProjectsStore } from "../../chunks/allProjects.js";
function guard(name) {
  return () => {
    throw new Error(`Cannot call ${name}(...) on the server`);
  };
}
const goto = guard("goto");
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $allProjects, $$unsubscribe_allProjects;
  let $$unsubscribe_currentUser;
  $$unsubscribe_allProjects = subscribe(allProjectsStore, (value) => $allProjects = value);
  $$unsubscribe_currentUser = subscribe(currentUserStore, (value) => value);
  {
    if ($allProjects) {
      if ($allProjects.length) {
        goto(`/projects/${$allProjects[0].slug}`);
      } else {
        goto(`/new`);
      }
    }
  }
  $$unsubscribe_allProjects();
  $$unsubscribe_currentUser();
  return `${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};

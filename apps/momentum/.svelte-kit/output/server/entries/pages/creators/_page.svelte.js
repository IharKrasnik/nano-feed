import { c as create_ssr_component, g as subscribe, v as validate_component, e as escape, b as add_attribute } from "../../../chunks/index3.js";
import { A as AutoCompleteInput } from "../../../chunks/AutoCompleteInput.js";
import { p as projectsStore } from "../../../chunks/projects.js";
import { f as filterQuery, c as creatorsStore, u as update } from "../../../chunks/creators.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $creatorsFilterQuery, $$unsubscribe_creatorsFilterQuery;
  let $projects, $$unsubscribe_projects;
  let $creators, $$unsubscribe_creators;
  $$unsubscribe_creatorsFilterQuery = subscribe(filterQuery, (value) => $creatorsFilterQuery = value);
  $$unsubscribe_projects = subscribe(projectsStore, (value) => $projects = value);
  $$unsubscribe_creators = subscribe(creatorsStore, (value) => $creators = value);
  let selectedProject = null;
  let isCreatorsLoading = false;
  let onProjectSelected = async (newProject) => {
    selectedProject = newProject;
    isCreatorsLoading = true;
    await update({ projectSlug: selectedProject?.slug });
    isCreatorsLoading = false;
  };
  {
    if ($creatorsFilterQuery?.projectSlug && $projects.length) {
      selectedProject = $projects.find((c) => c.slug === $creatorsFilterQuery?.projectSlug);
    }
  }
  $$unsubscribe_creatorsFilterQuery();
  $$unsubscribe_projects();
  $$unsubscribe_creators();
  return `<h2 class="${"mb-4"}">Momentum Creators</h2>

${$projects.length ? `<div class="${"mb-8"}"><label>Stream</label>

    ${validate_component(AutoCompleteInput, "AutoCompleteInput").$$render(
    $$result,
    {
      onChange: onProjectSelected,
      placeholder: "All Streams",
      valueField: "slug",
      searchField: "title",
      autofocusOnRemove: false,
      allSuggestions: $projects,
      initialSelectedItem: selectedProject
    },
    {},
    {}
  )}</div>` : ``}

<div class="${"mb-8"}"><label>Creators
    <div class="${"inline number-tag"}">${escape($creators.length)}</div></label>
  
  ${$creators.length && !isCreatorsLoading ? `${validate_component(AutoCompleteInput, "AutoCompleteInput").$$render(
    $$result,
    {
      searchField: "fullName",
      placeholder: "Search creators..",
      limitItemsCount: 0,
      isMulti: true,
      isAlwaysShown: false,
      allSuggestions: $creators.map((c) => ({ ...c, href: `/@${c.username}` })),
      autofocus: true,
      class: "mb-4"
    },
    {},
    {
      item: ({ item }) => {
        return `<div slot="${"item"}"><div class="${"flex items-center"}"><img${add_attribute("src", item.avatarUrl, 0)} class="${"w-[40px] h-[40px] mr-2 rounded-full"}">
          ${escape(item.fullName)}</div></div>`;
      }
    }
  )}` : ``}</div>`;
});
export {
  Page as default
};

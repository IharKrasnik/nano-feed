import { c as create_ssr_component } from "./index3.js";
const Loader_svelte_svelte_type_style_lang = "";
const css = {
  code: ".lds-ellipsis.svelte-1eg5e.svelte-1eg5e{position:relative;width:65px}.lds-ellipsis.svelte-1eg5e div.svelte-1eg5e{position:absolute;width:6px;height:6px;border-radius:50%;background:#fff;animation-timing-function:cubic-bezier(0, 1, 1, 0)}.lds-ellipsis.svelte-1eg5e div.svelte-1eg5e:nth-child(1){left:8px;animation:svelte-1eg5e-lds-ellipsis1 0.6s infinite}.lds-ellipsis.svelte-1eg5e div.svelte-1eg5e:nth-child(2){left:4px;animation:svelte-1eg5e-lds-ellipsis2 0.6s infinite}.lds-ellipsis.svelte-1eg5e div.svelte-1eg5e:nth-child(3){left:16px;animation:svelte-1eg5e-lds-ellipsis2 0.6s infinite}.lds-ellipsis.svelte-1eg5e div.svelte-1eg5e:nth-child(4){left:28px;animation:svelte-1eg5e-lds-ellipsis3 0.6s infinite}@keyframes svelte-1eg5e-lds-ellipsis1{0%{transform:scale(0)}100%{transform:scale(1)}}@keyframes svelte-1eg5e-lds-ellipsis3{0%{transform:scale(1)}100%{transform:scale(0)}}@keyframes svelte-1eg5e-lds-ellipsis2{0%{transform:translate(0, 0)}100%{transform:translate(12px, 0)}}",
  map: null
};
const Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"lds-ellipsis svelte-1eg5e"}"><div class="${"svelte-1eg5e"}"></div>
	<div class="${"svelte-1eg5e"}"></div>
	<div class="${"svelte-1eg5e"}"></div>
	<div class="${"svelte-1eg5e"}"></div>
</div>`;
});
export {
  Loader as L
};

import { S as SvelteComponent, i as init, s as safe_not_equal, k as element, a as space, l as claim_element, m as children, h as detach, c as claim_space, n as attr, b as insert_hydration, J as append_hydration, O as noop } from "./index-a8d98783.js";
const Loader_svelte_svelte_type_style_lang = "";
function create_fragment(ctx) {
  let div4;
  let div0;
  let t0;
  let div1;
  let t1;
  let div2;
  let t2;
  let div3;
  return {
    c() {
      div4 = element("div");
      div0 = element("div");
      t0 = space();
      div1 = element("div");
      t1 = space();
      div2 = element("div");
      t2 = space();
      div3 = element("div");
      this.h();
    },
    l(nodes) {
      div4 = claim_element(nodes, "DIV", { class: true });
      var div4_nodes = children(div4);
      div0 = claim_element(div4_nodes, "DIV", { class: true });
      children(div0).forEach(detach);
      t0 = claim_space(div4_nodes);
      div1 = claim_element(div4_nodes, "DIV", { class: true });
      children(div1).forEach(detach);
      t1 = claim_space(div4_nodes);
      div2 = claim_element(div4_nodes, "DIV", { class: true });
      children(div2).forEach(detach);
      t2 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", { class: true });
      children(div3).forEach(detach);
      div4_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "svelte-1eg5e");
      attr(div1, "class", "svelte-1eg5e");
      attr(div2, "class", "svelte-1eg5e");
      attr(div3, "class", "svelte-1eg5e");
      attr(div4, "class", "lds-ellipsis svelte-1eg5e");
    },
    m(target, anchor) {
      insert_hydration(target, div4, anchor);
      append_hydration(div4, div0);
      append_hydration(div4, t0);
      append_hydration(div4, div1);
      append_hydration(div4, t1);
      append_hydration(div4, div2);
      append_hydration(div4, t2);
      append_hydration(div4, div3);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div4);
    }
  };
}
class Loader extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment, safe_not_equal, {});
  }
}
export {
  Loader as L
};

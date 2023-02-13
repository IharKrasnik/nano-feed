import { S as SvelteComponent, i as init, s as safe_not_equal, x as create_component, y as claim_component, z as mount_component, O as noop, f as transition_in, t as transition_out, A as destroy_component, M as component_subscribe } from "../../chunks/index-a8d98783.js";
import { g as goto } from "../../chunks/navigation-1c3c4c2b.js";
import { L as Loader } from "../../chunks/Loader-ced77146.js";
import { G as GOOGLE_LOGIN_URL, c as currentUserStore } from "../../chunks/currentUser-50513477.js";
import { a as allProjectsStore } from "../../chunks/allProjects-2a86290f.js";
function create_fragment(ctx) {
  let loader;
  let current;
  loader = new Loader({});
  return {
    c() {
      create_component(loader.$$.fragment);
    },
    l(nodes) {
      claim_component(loader.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(loader, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(loader.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(loader.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(loader, detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let $allProjects;
  let $currentUser;
  component_subscribe($$self, allProjectsStore, ($$value) => $$invalidate(0, $allProjects = $$value));
  component_subscribe($$self, currentUserStore, ($$value) => $$invalidate(1, $currentUser = $$value));
  if (!$currentUser) {
    goto(GOOGLE_LOGIN_URL);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$allProjects*/
    1) {
      if ($allProjects) {
        if ($allProjects.length) {
          goto(`/projects/${$allProjects[0].slug}`);
        } else {
          goto(`/new`);
        }
      }
    }
  };
  return [$allProjects];
}
class Page extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export {
  Page as default
};

import { c as create_ssr_component, p as createEventDispatcher, b as add_attribute, e as escape, h as each, r as compute_slots } from "./index3.js";
import "lodash";
import hotkeys from "hotkeys-js";
const AutoCompleteInput_svelte_svelte_type_style_lang = "";
const css = {
  code: "._option.svelte-1eeo4zc{background:black;cursor:pointer;padding:16px;border:1px rgba(255, 255, 255, .3) solid;margin-top:-1px}._option.svelte-1eeo4zc:hover,._option._hover.svelte-1eeo4zc{background:rgba(255, 255, 255, 0.1)}._cross.svelte-1eeo4zc{position:absolute;right:0;top:50%;transform:translateY(-50%);font-size:25px;border:1px rgba(255, 255, 255, .3) solid;border-radius:50%;display:flex;justify-content:center;align-items:center;padding:7px;width:40px;height:40px}",
  map: null
};
const AutoCompleteInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$slots = compute_slots(slots);
  createEventDispatcher();
  let { isMulti = false } = $$props;
  let { placeholder } = $$props;
  let { searchField = "label" } = $$props;
  let { valueField = "value" } = $$props;
  let { limitItemsCount = 10 } = $$props;
  let { allSuggestions } = $$props;
  let { onChange } = $$props;
  let { isAlwaysShown = false } = $$props;
  let { autofocus = false } = $$props;
  let { autofocusOnRemove = true } = $$props;
  let { initialSelectedItems = [] } = $$props;
  let { initialSelectedItem = null } = $$props;
  let selectedItems = initialSelectedItems;
  let selectedItem = initialSelectedItem;
  let { class: clazz } = $$props;
  let inputEl;
  let searchValue = "";
  let filteredSuggestions = [];
  const focus = () => {
    inputEl.focus();
  };
  let currentIndex = 0;
  hotkeys.filter = function(event) {
    return true;
  };
  if ($$props.isMulti === void 0 && $$bindings.isMulti && isMulti !== void 0)
    $$bindings.isMulti(isMulti);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.searchField === void 0 && $$bindings.searchField && searchField !== void 0)
    $$bindings.searchField(searchField);
  if ($$props.valueField === void 0 && $$bindings.valueField && valueField !== void 0)
    $$bindings.valueField(valueField);
  if ($$props.limitItemsCount === void 0 && $$bindings.limitItemsCount && limitItemsCount !== void 0)
    $$bindings.limitItemsCount(limitItemsCount);
  if ($$props.allSuggestions === void 0 && $$bindings.allSuggestions && allSuggestions !== void 0)
    $$bindings.allSuggestions(allSuggestions);
  if ($$props.onChange === void 0 && $$bindings.onChange && onChange !== void 0)
    $$bindings.onChange(onChange);
  if ($$props.isAlwaysShown === void 0 && $$bindings.isAlwaysShown && isAlwaysShown !== void 0)
    $$bindings.isAlwaysShown(isAlwaysShown);
  if ($$props.autofocus === void 0 && $$bindings.autofocus && autofocus !== void 0)
    $$bindings.autofocus(autofocus);
  if ($$props.autofocusOnRemove === void 0 && $$bindings.autofocusOnRemove && autofocusOnRemove !== void 0)
    $$bindings.autofocusOnRemove(autofocusOnRemove);
  if ($$props.initialSelectedItems === void 0 && $$bindings.initialSelectedItems && initialSelectedItems !== void 0)
    $$bindings.initialSelectedItems(initialSelectedItems);
  if ($$props.initialSelectedItem === void 0 && $$bindings.initialSelectedItem && initialSelectedItem !== void 0)
    $$bindings.initialSelectedItem(initialSelectedItem);
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
    $$bindings.class(clazz);
  if ($$props.focus === void 0 && $$bindings.focus && focus !== void 0)
    $$bindings.focus(focus);
  $$result.css.add(css);
  return `<div class="${"w-full relative"}">${isMulti || !selectedItem ? `<input type="${"text"}"${add_attribute("placeholder", placeholder, 0)} class="${[
    "w-full transition opacity-50 " + escape(clazz, true) + " svelte-1eeo4zc",
    "opacity-100"
  ].join(" ").trim()}"${add_attribute("this", inputEl, 0)}${add_attribute("value", searchValue, 0)}>
    ${`<div class="${"absolute w-full left-0 mt-1 bg-black z-10"}">${each(filteredSuggestions, (suggestion, i) => {
    return `<a${add_attribute("href", suggestion.href, 0)} class="${["_option block svelte-1eeo4zc", i === currentIndex ? "_hover" : ""].join(" ").trim()}">${slots.item ? slots.item({ item: suggestion }) : ``}
            ${!$$slots.item ? `${escape(suggestion[searchField])}` : ``}
          </a>`;
  })}</div>`}` : ``}

  ${isMulti && selectedItems.length ? `<div class="${"mt-2"}">${each(selectedItems, (selectedItem2) => {
    return `<div class="${"relative mr-2 py-4"}">${slots.item ? slots.item({ item: selectedItem2 }) : ``}

          ${!$$slots.item ? `${escape(selectedItem2[searchField])}` : ``}

          <button class="${"_cross svelte-1eeo4zc"}">⤬
          </button>
        </div>`;
  })}</div>` : ``}

  ${!isMulti && selectedItem ? `<div class="${"mt-2"}"><div class="${"relative mr-2 py-4"}">${slots.item ? slots.item({ item: selectedItem }) : ``}

        ${!$$slots.item ? `${escape(allSuggestions.find((s) => s[valueField] === selectedItem[valueField])[searchField])}` : ``}

        <button class="${"_cross svelte-1eeo4zc"}">⤬
        </button></div></div>` : ``}
</div>`;
});
export {
  AutoCompleteInput as A
};

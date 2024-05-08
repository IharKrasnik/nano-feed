import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const store = writable(null);

store.subscribe((value) => {
  if (browser) {
    window.EDITOR_SECTION = { description: 'LOL' }; // value;
  }
})

export default store;

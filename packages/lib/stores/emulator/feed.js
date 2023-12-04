import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const CACHE_KEY = 'EMU_FEED';

const store = writable([]);

if (browser) {
	if (localStorage[CACHE_KEY]) {
		store.set(JSON.parse(localStorage[CACHE_KEY]));
	}

	store.subscribe((storeValue) => {
		localStorage[CACHE_KEY] = JSON.stringify(storeValue);
	});
}

export default store;

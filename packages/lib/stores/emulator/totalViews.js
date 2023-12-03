import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const CACHE_KEY = 'EMU_TOTAL_VIEWS';

const store = writable(-1);

if (browser) {
	if (localStorage[CACHE_KEY]) {
		store.set(parseInt(localStorage[CACHE_KEY]));
	}

	store.subscribe((storeValue) => {
		localStorage[CACHE_KEY] = storeValue;
	});
}

export default store;

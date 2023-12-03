import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const CACHE_KEY = 'EMU_EMAIL_ADDRESS';

const store = writable('');

if (browser) {
	if (localStorage[CACHE_KEY]) {
		store.set(localStorage[CACHE_KEY]);
	}

	store.subscribe((storeValue) => {
		localStorage[CACHE_KEY] = storeValue;
	});
}

export default store;

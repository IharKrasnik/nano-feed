import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const KEY = 'page_draft';

const pageDraftStore = writable(null);

if (browser) {
	let pageDraft;

	try {
		pageDraft = JSON.parse(localStorage[KEY]);
	} catch (err) {
		localStorage[KEY] = null;
	}

	pageDraftStore.set(pageDraft);

	pageDraftStore.subscribe((p) => {
		localStorage[KEY] = JSON.stringify(p);
	});
}

export default pageDraftStore;

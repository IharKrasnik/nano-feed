import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const KEY = 'pages_draft';

const pageDraftStore = writable({});

if (browser) {
	let pageDraft;

	try {
		pageDraft = JSON.parse(localStorage[KEY]) || {};
	} catch (err) {
		localStorage[KEY] = {};
		pageDraft = {};
	}

	pageDraftStore.set(pageDraft);

	pageDraftStore.subscribe((p) => {
		if (p) {
			p.updatedOn = new Date();
		}
		localStorage[KEY] = JSON.stringify(p);
	});
}

export default pageDraftStore;

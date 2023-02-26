import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const KEY = 'brands_draft';

const brandDraftStore = writable({});

if (browser) {
	let brandDraft;

	try {
		brandDraft = JSON.parse(localStorage[KEY]) || {};
	} catch (err) {
		localStorage[KEY] = {};
		brandDraft = {};
	}

	brandDraftStore.set(brandDraft);

	brandDraftStore.subscribe((p) => {
		if (p) {
			p.updatedOn = new Date();
		}
		localStorage[KEY] = JSON.stringify(p);
	});
}

export default brandDraftStore;

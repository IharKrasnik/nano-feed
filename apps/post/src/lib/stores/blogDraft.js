import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const KEY = 'blogs_draft';

const blogDraftStore = writable({});

if (browser) {
	let blogDraft;

	try {
		blogDraft = JSON.parse(localStorage[KEY]) || {};
	} catch (err) {
		localStorage[KEY] = {};
		blogDraft = {};
	}

	blogDraftStore.set(blogDraft);

	blogDraftStore.subscribe((p) => {
		if (p) {
			p.updatedOn = new Date();
		}
		localStorage[KEY] = JSON.stringify(p);
	});
}

export default blogDraftStore;

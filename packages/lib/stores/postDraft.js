import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const KEY = 'posts_draft';

const postDraftStore = writable(null);

if (browser) {
	let postDraft;

	try {
		postDraft = JSON.parse(localStorage[KEY]) || null;
	} catch (err) {
		localStorage[KEY] = null;
		postDraft = null;
	}

	postDraftStore.set(postDraft);

	postDraftStore.subscribe((p) => {
		if (p) {
			p.updatedOn = new Date();
		}
		localStorage[KEY] = JSON.stringify(p);
	});
}

export default postDraftStore;

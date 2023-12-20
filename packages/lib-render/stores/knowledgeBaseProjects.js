import { writable } from 'svelte/store';
import { get } from 'lib/api';
import { get as getFromStore } from 'svelte/store';
import { browser } from '$app/environment';

const store = writable(null);

export const update = async ({} = {}) => {
	let query = {
		isKnowledgeBase: true
	};

	await get('projects', query).then(({ results }) => {
		store.set(results);
	});
};

if (browser) {
	update();
}

export default store;

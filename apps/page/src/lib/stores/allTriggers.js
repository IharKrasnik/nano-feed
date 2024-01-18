import { writable } from 'svelte/store';
import { get } from 'lib/api';

const store = writable([]);

export let isLoading = writable(true);

export let refresh = async ({ pageId }) => {
	isLoading.update(() => true);

	let result = await get(`triggers`, {
		pageId
	});
	store.update((s) => result.results);
	isLoading.update(() => false);
};

export default store;

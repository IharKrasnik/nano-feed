import { writable } from 'svelte/store';
import { get } from 'lib/api';

const store = writable([]);

export let isLoading = writable(true);

export default store;

export let refresh = async ({ page }) => {
	isLoading.update(() => true);
	let { results } = await get(`pages/${page.parentPage?._id || page._id}/submissions`);
	store.update((s) => results.map((s) => ({ ...s, isCollapsed: true })));
	isLoading.update(() => false);
};

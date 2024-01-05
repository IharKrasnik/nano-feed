import { writable } from 'svelte/store';
import { get } from 'lib/api';

const store = writable([]);

export let isLoading = writable(true);

export let refresh = async ({}) => {
	isLoading.update(() => true);
	let { results } = await get('submissions/outbound');
	store.update((s) => results);
	isLoading.update(() => false);
};

export default store;

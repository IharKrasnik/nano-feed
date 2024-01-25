import { writable } from 'svelte/store';
import { get } from 'lib/api';

const store = writable(null);

export let refresh = async ({ parentPageId }) => {
	let result = await get(`pages/${parentPageId}/services`);
	store.set(result.results);
};

export default store;

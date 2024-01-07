import { writable } from 'svelte/store';
import { get } from 'lib/api';
import { get as getFromStore } from 'svelte/store';
import currentUser from 'lib/stores/currentUser';

const store = writable([]);

export let isLoading = writable(true);

export let refresh = async ({ customerId } = {}) => {
	isLoading.update(() => true);
	let result;

	if (!customerId) {
		result = await get('submissions/outbound');
	} else {
		result = await get('submissions/from-customer');
	}

	store.update((s) => result.results);
	isLoading.update(() => false);
};

export default store;

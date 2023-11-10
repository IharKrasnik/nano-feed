import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const currentCustomerStore = writable({});

let CACHE_KEY = 'CURRENT_CUSTOMER';

if (browser) {
	if (localStorage[CACHE_KEY]) {
		currentCustomerStore.set(JSON.parse(localStorage[CACHE_KEY]));
	}

	currentCustomerStore.subscribe((store) => {
		if (store) {
			store.updatedOn = new Date();
		}

		localStorage[CACHE_KEY] = JSON.stringify(store);
	});
}

export default currentCustomerStore;

import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const currentCustomerStore = writable({
	vars: {}
});

let CACHE_KEY = 'CURRENT_CUSTOMER';

if (browser) {
	if (localStorage[CACHE_KEY]) {
		currentCustomerStore.set(JSON.parse(localStorage[CACHE_KEY]) || {});
	}

	currentCustomerStore.subscribe((store) => {
		if (store) {
			store.updatedOn = new Date();

			if (!store.vars) {
				store.vars = {};
			}
		}

		localStorage[CACHE_KEY] = JSON.stringify(store);
	});
}

export default currentCustomerStore;

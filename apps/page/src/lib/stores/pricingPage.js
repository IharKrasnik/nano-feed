import { get } from 'lib/api';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

let store = writable(null);

export let refreshPricingPage = async () => {
	let pricingPage = await get(`pricing`);
	store.set(pricingPage);
	return pricingPage;
};

if (browser) {
	refreshPricingPage();
}

export default store;

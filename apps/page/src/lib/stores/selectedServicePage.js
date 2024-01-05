import { writable } from 'svelte/store';
import { get } from 'lib/api';
import selectedGrowthTab from '$lib/stores/selectedGrowthTab';
import { get as getStoreValue } from 'svelte/store';
import selectedServicePage from '$lib/stores/selectedServicePage';
import currentCustomer from 'lib/stores/currentCustomer';
import currentUser from 'lib/stores/currentUser';

const store = writable(null);

export default store;

let pageCache = {};

export let selectServicePage = async ({ pageId, parentPageId }) => {
	selectedServicePage.update((s) => null);
	selectedGrowthTab.update((t) => 'promo_services');

	if (pageCache[pageId]) {
		selectedServicePage.update((p) => pageCache[pageId]);
		return;
	}
	let currentUserValue = getStoreValue(currentUser);

	if (currentUserValue) {
		currentCustomer.update((customer) => {
			customer.email = currentUserValue.email;
			customer.fullName = currentUserValue.fullName;
			customer.isEmailVerified = true;
			customer.userId = currentUserValue._id;
			customer.avatarUrl = currentUserValue.avatarUrl;

			return customer;
		});
	}

	let page = await get(`pages/${pageId}`, {
		parentPageSlug: parentPageId
	});

	pageCache[pageId] = page;

	selectedServicePage.update((p) => page);
};

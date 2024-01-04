import { writable } from 'svelte/store';
import { get } from 'lib/api';
import selectedGrowthTab from '$lib/stores/selectedGrowthTab';
import selectedServicePage from '$lib/stores/selectedServicePage';

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

	let page = await get(`pages/${pageId}`, {
		parentPageSlug: parentPageId
	});

	pageCache[pageId] = page;

	selectedServicePage.update((p) => page);
};

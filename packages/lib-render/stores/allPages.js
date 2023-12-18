import { writable } from 'svelte/store';
import { get } from 'lib/api';
import { get as getFromStore } from 'svelte/store';
import { browser } from '$app/environment';
import pageDraft from 'lib-render/stores/pageDraft';

import currentUser, { isLoading as isUserLoading } from 'lib/stores/currentUser';

const allPagesStore = writable(null);

export const update = async ({} = {}) => {
	await get('pages/my').then((results) => {
		allPagesStore.set(results);
	});
};

let prevUser;

if (browser) {
	currentUser.subscribe((user) => {
		if (user) {
			if (prevUser?._id !== user._id) {
				update();
				prevUser = user;
			}
		} else if (!getFromStore(isUserLoading)) {
			let pageDraftValue = getFromStore(pageDraft);
			if (pageDraftValue) {
				let pages = [];

				Object.keys(pageDraftValue).forEach((key) => {
					if (pageDraftValue[key]?._id) {
						pages.push(pageDraftValue[key]);
					}
				});

				allPagesStore.set(pages);
			}
		}
	});
}

export default allPagesStore;

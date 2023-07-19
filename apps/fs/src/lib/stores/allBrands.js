import { writable } from 'svelte/store';
import { get } from 'lib/api';
import { get as getFromStore } from 'svelte/store';
import { browser } from '$app/environment';

import currentUser, { isLoading as isUserLoading } from 'lib/stores/currentUser';

const allBrandsStore = writable(null);

export const update = async ({} = {}) => {
	await get('brands/my').then((results) => {
		allBrandsStore.set(results);
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
		}
	});
}

export default allBrandsStore;

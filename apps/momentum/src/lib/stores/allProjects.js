import { writable } from 'svelte/store';
import { get } from 'lib/api';
import { get as getFromStore } from 'svelte/store';
import { browser } from '$app/environment';

import currentUser, { isLoading as isUserLoading } from 'lib/stores/currentUser';

const allProjectsStore = writable(null);

export const update = async ({} = {}) => {
	let query = {};

	if (document.URL.includes('/invest')) {
		query.hubProjectSlug = 'nano';
	}

	await get('projects', query).then(({ results }) => {
		allProjectsStore.set(results);
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
			update();
		}
	});
}

export default allProjectsStore;

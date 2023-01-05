import { writable } from 'svelte/store';
import { get } from '$lib/api';
import { get as getFromStore } from 'svelte/store';
import { browser } from '$app/environment';

import currentUser, { isLoading as isUserLoading } from '$lib/stores/currentUser';

const followsStore = writable(null);

export const update = async ({} = {}) => {
	await get('follows').then(({ projects, creators }) => {
		followsStore.set([
			...projects.map((p) => ({ followType: 'project', ...p })),
			...creators.map((c) => ({ followType: 'creator', ...c }))
		]);
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

export default followsStore;
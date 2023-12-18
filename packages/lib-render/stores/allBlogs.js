import { writable } from 'svelte/store';
import { get } from 'lib/api';
import { get as getFromStore } from 'svelte/store';
import { browser } from '$app/environment';
import blogDraft from 'lib-render/stores/blogDraft';

import currentUser, { isLoading as isUserLoading } from 'lib/stores/currentUser';

const allBlogsStore = writable(null);

export const update = async ({} = {}) => {
	await get('blogs/my').then((results) => {
		allBlogsStore.set(results);
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
			let blogDraftValue = getFromStore(blogDraft);
			if (blogDraftValue) {
				let blogs = [];

				Object.keys(blogDraftValue).forEach((key) => {
					if (blogDraftValue[key]?._id) {
						blogs.push(blogDraftValue[key]);
					}
				});
				allBlogsStore.set(blogs);
			}
		}
	});
}

export default allBlogsStore;

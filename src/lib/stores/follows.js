import { writable } from 'svelte/store';
import { get } from '$lib/api';
import currentUser from '$lib/stores/currentUser';

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

currentUser.subscribe((user) => {
	if (user) {
		if (prevUser?._id !== user._id) {
			update();
			prevUser = user;
		}
	} else {
		update();
	}
});

export default followsStore;

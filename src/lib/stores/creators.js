import { writable } from 'svelte/store';
import { get } from '$lib/api';

const creatorsStore = writable([]);

export const update = ({
	projectSlug = null,
	sort = 'createdOn',
	sortDirection = 'descending'
} = {}) => {
	let query = { sort, sortDirection };

	if (projectSlug) {
		query.projectSlug = projectSlug;
	}

	get('creators', query).then(({ results: creators }) => {
		creatorsStore.set(creators);
	});
};

update();

export default creatorsStore;

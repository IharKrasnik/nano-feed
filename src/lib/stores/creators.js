import { writable } from 'svelte/store';
import { get } from '$lib/api';

const creatorsStore = writable([]);

export let filterQuery = writable(null);

export const update = async ({
	projectSlug = null,
	sort = 'createdOn',
	sortDirection = 'descending'
} = {}) => {
	let query = { sort, sortDirection };

	if (projectSlug) {
		query.projectSlug = projectSlug;
	}

	await get('creators', query).then(({ results: creators }) => {
		filterQuery.set(query);
		creatorsStore.set(creators);
	});
};

update();

export default creatorsStore;

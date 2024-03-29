import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { get } from 'lib/api';

const creatorsStore = writable([]);

export let filterQuery = writable(null);

export const update = async ({
	projectSlug = 'show-up-daily',
	isExplore = false,
	sort = 'createdOn',
	sortDirection = 'descending'
} = {}) => {
	let query = { sort, sortDirection };

	if (projectSlug) {
		query.projectSlug = projectSlug;
	}

	if (isExplore) {
		query.isExplore = isExplore;
	}

	await get('creators', query).then(({ results: creators } = { results: [] }) => {
		filterQuery.set(query);
		creatorsStore.set(creators);
	});
};

update();

export default creatorsStore;

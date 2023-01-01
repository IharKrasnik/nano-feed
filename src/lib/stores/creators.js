import { writable } from 'svelte/store';
import { get } from '$lib/api';

const creatorsStore = writable([]);

export const update = ({ sort = 'createdOn', sortDirection = 'descending' } = {}) => {
	get('creators', { sort, sortDirection }).then(({ results: creators }) => {
		creatorsStore.update(() => creators);
	});
};

update();

export default creatorsStore;

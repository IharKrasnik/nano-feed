import { writable } from 'svelte/store';
import axios from 'axios';
import { get } from '$lib/api';

const creatorsStore = writable([]);

export const update = ({ sort = 'createdOn', sortDirection = 'descending' } = {}) => {
	// axios({
	// 	url: 'https://igor.npkn.net/get-nano-creators',
	// 	params: { sort, sortDirection }
	// }).then(({ data: creators }) => {
	// 	creatorsStore.update(() => creators);
	// });

	get('creators', { sort, sortDirection }).then(({ results: creators }) => {
		creatorsStore.update(() => creators);
	});
};

update();

export default creatorsStore;

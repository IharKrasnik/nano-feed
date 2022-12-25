import { writable } from 'svelte/store';
import axios from 'axios';

const creatorsStore = writable([]);

export const update = ({ sort = 'createdOn', sortDirection = 'descending' } = {}) => {
	axios({
		url: 'https://igor.npkn.net/get-nano-creators',
		params: { sort, sortDirection }
	}).then(({ data: creators }) => {
		creatorsStore.update(() => creators);
	});
};

export default creatorsStore;

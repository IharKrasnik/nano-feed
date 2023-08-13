import { writable } from 'svelte/store';

const feedLastUpdatedOnStore = writable(new Date());

export default feedLastUpdatedOnStore;

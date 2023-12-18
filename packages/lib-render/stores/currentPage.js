import { writable } from 'svelte/store';

const currentPageStore = writable(null);

export default currentPageStore;

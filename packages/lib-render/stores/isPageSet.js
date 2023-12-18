import { writable } from 'svelte/store';

const isPageSetStore = writable(false);

export default isPageSetStore;

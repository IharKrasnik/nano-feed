import { writable } from 'svelte/store';

const pagesStore = writable([]);
const feedStore = writable([]);

export { feedStore as feed };
export { pagesStore as pages };

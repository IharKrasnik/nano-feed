import { writable } from 'svelte/store';

const blogPostsStore = writable(null);

export default blogPostsStore;

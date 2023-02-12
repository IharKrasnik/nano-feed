import { writable } from 'svelte/store';

const currentUserStore = writable(undefined);

export let isLoading = writable(true);

export default currentUserStore;

import { writable } from 'svelte/store';

const currentUserStore = writable(undefined);

export let isLoading = writable(false);

export default currentUserStore;

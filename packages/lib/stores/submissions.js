import { writable } from 'svelte/store';

const submissionsStore = writable([]);

export let isLoading = writable(true);

export default submissionsStore;

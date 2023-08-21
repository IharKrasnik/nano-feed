import { writable } from 'svelte/store';

const fileToEditStore = writable(null);

export default fileToEditStore;

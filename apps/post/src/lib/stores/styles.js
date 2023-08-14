import { writable } from 'svelte/store';

const stylesStore = writable({
	obj: {},
	css: ''
});

export default stylesStore;

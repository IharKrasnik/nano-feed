import { writable } from 'svelte/store';
import { get } from 'lib/api';

let i = 0;

let backgrounds = ['rgb(255, 233, 229)', 'rgb(255, 242, 197)', 'rgb(225, 241, 255)', '#e1ffee'];
let nextColorStore = writable(backgrounds[0]);

export let getNextColor = () => {
	i++;

	nextColorStore.set(backgrounds[i]);
	return backgrounds[i % backgrounds.length];
};

export default nextColorStore;

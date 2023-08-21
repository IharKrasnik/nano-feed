import { writable } from 'svelte/store';

const fileFontsStore = writable([
	{
		name: 'bowlby',
		title: 'Bowlby',
		titleFont: 'Bowlby One',
		textFont: 'Inter'
	},
	{
		name: 'archivo',
		title: 'Archivo',
		titleFont: 'Archivo',
		textFont: 'Inter'
	},
	{
		name: 'gaegu',
		title: 'Gaegu',
		titleFont: 'Gaegu',
		textFont: 'Gaegu'
	}
]);

export default fileFontsStore;

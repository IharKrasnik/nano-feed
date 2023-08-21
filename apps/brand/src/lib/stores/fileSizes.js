import { writable } from 'svelte/store';

const fileSizesStore = writable([
	{
		name: 'horizontal',
		title: 'Horizontal (1200 x 630)',
		width: 1200,
		height: 630
	},
	{
		name: 'square',
		title: 'Square (1080 x 1080)',
		width: 1080,
		height: 1080
	}
]);

export default fileSizesStore;

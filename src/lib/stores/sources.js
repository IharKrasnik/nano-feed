import { writable } from 'svelte/store';

const sourcesStore = writable([
	{
		value: null,
		label: 'All'
	},
	{
		value: 'twitter',
		label: 'Twitter'
	},
	{
		value: 'linkedin',
		label: 'LinkedIn'
	},
	{
		value: 'youtube',
		label: 'YouTube'
	},
	{
		value: 'medium',
		label: 'Medium'
	},
	{
		value: 'instagram',
		label: 'Instagram'
	},
	{
		value: 'tiktok',
		label: 'TikTok'
	},
	{
		value: 'momentum',
		label: 'Momentum'
	}
]);

export default sourcesStore;

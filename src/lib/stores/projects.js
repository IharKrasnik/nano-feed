import { writable } from 'svelte/store';
import { get } from '$lib/api';

const projectsStore = writable([]);

export const update = ({
	creatorUsername,
	page = 1,
	perPage = 6,
	sort = 'createdOn',
	sortDirection = 'descending'
} = {}) => {
	let query = { perPage, page, sort, sortDirection };

	if (creatorUsername) {
		query.creatorUsername = creatorUsername;
	}

	projectsStore.set([]);

	get('projects', query)
		.then(({ results: projects }) => {
			projectsStore.set([
				// {
				// 	slug: null,
				// 	title: 'All',
				// 	description: 'A feed from Paralect creators.',
				// 	isFeatured: true,
				// 	color: 'rgba(255, 255, 255, .8)'
				// },
				...projects
			]);
		})
		.catch(async (err) => await update({ creatorUsername, perPage, sort, sortDirection }));
};

update();

export default projectsStore;

// import { writable } from 'svelte/store';

// const projectsStore = writable([
// 	{
// 		value: null,
// 		label: 'All',
// 		color: 'rgba(255, 255, 255, .3)',
// 		emoji: '🎇',
// 		description: 'The feed from Paralect creators.'
// 	},
// 	{
// 		id: 'recW8TqWrQH7Le7ef',
// 		value: 'growingproducts',
// 		label: 'Growing Products',
// 		emoji: '🌱',
// 		color: '#53bf01',
// 		description: 'Practical essays on how to build and grow your product.'
// 	},
// 	{
// 		id: 'rec5f10C3w51tjPcG',
// 		value: 'particles',
// 		label: 'Particles',
// 		color: '#d5ff09',
// 		emoji: '✨',
// 		description: 'Knowledge that shapes the digital product universe'
// 	},
// 	{
// 		id: 'recgjfbyVZl9tU9ZA',
// 		value: 'shipitsipit',
// 		label: 'Ship it & Sip it',
// 		color: '#d091ff',
// 		emoji: '🍸',
// 		description: 'Shipping shit and drinking beers.'
// 	},
// 	{
// 		id: 'recVZ1BXBHNPKAYlp',
// 		value: 'alongtheroadmap',
// 		label: 'Along The Roadmap',
// 		color: '#fff291',
// 		emoji: '🛣',
// 		description: 'Stories from Startups, Founders and their Teams.'
// 	},
// 	{
// 		id: 'recfpnXDmaXctW1NW',
// 		value: 'rnd',
// 		label: 'R&D',
// 		color: '#f59e0c',
// 		emoji: '🐝',
// 		description: 'Solving problems that no NPM package can solve.'
// 	},
// 	{
// 		id: 'recPrYVl9pVIhgFUj',
// 		value: 'productlab',
// 		label: 'Product Lab',
// 		color: '#53bf01',
// 		emoji: '🧪',
// 		description: 'Validate your product idea cost and time effectively'
// 	},
// 	{
// 		id: 'recBBeGCZSZcNMzbg',
// 		value: 'startupsummer',
// 		label: 'Startup Summer',
// 		color: '#ffd967',
// 		emoji: '🌞',
// 		description: 'Intense 2-month practical full-stack product bootcamp.'
// 	},
// 	{
// 		id: 'rectXa3gdiXJDpAfA',
// 		value: 'therebel',
// 		label: 'THE✊🏽REBEL',
// 		color: '#f59e0c',
// 		emoji: '✊🏽',
// 		description: 'Manifests from the Nano Riot.'
// 	},
// 	{
// 		id: 'recnDNrsVQFb7aszv',
// 		value: 'momentum',
// 		label: 'Momentum',
// 		color: '#00b8ff',
// 		emoji: '🌀',
// 		description: 'A tool to build in public and grow audience early.'
// 	},
// 	{
// 		id: 'receWlPgQgJ6NTo9R',
// 		value: 'accelerator',
// 		label: 'Accelerator',
// 		color: '#d091ff',
// 		emoji: '🚠',
// 		description: 'Get $125k to build, launch and grow your product.'
// 	},
// 	{
// 		id: 'recuuRpLWN0Qdfodf',
// 		value: 'igor',
// 		label: 'Igor',
// 		color: '#75c425',
// 		emoji: '🤓',
// 		description: "Igor Krasnik's website."
// 	},
// 	{
// 		id: 'recgkM9QpDgY50bAs',
// 		value: 'altos',
// 		label: 'Altos',
// 		color: '#fff291',
// 		emoji: '🤳',
// 		description: 'Share videos, explore events, meet new people and have fun.'
// 	}
// ]);

// export default projectsStore;

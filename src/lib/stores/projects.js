import { writable } from 'svelte/store';

const projectsStore = writable([
	{
		value: null,
		label: 'All',
		color: 'rgba(255, 255, 255, .3)',
		emoji: '🎇',
		description: 'The feed from Paralect creators.'
	},
	{
		value: 'growingproducts',
		label: 'Growing Products',
		emoji: '🌱',
		color: '#53bf01',
		description: 'Practical essays on how to build and grow your product.'
	},
	{
		value: 'particles',
		label: 'Particles',
		color: '#d5ff09',
		emoji: '✨',
		description: 'Knowledge that shapes the digital product universe'
	},
	{
		value: 'shipitsipit',
		label: 'Ship it & Sip it',
		color: '#d091ff',
		emoji: '🍸',
		description: 'Shipping shit and drinking beers.'
	},
	{
		value: 'alongtheroadmap',
		label: 'Along The Roadmap',
		color: '#fff291',
		emoji: '🛣',
		description: 'Stories from Startups, Founders and their Teams.'
	},
	{
		value: 'rnd',
		label: 'R&D',
		color: '#f59e0c',
		emoji: '🐝',
		description: 'Solving problems that no NPM package can solve.'
	},
	{
		value: 'startupsummer',
		label: 'Startup Summer',
		color: '#ffd967',
		emoji: '🌞',
		description: 'Intense 2-month practical full-stack product bootcamp.'
	},
	{
		value: 'therebel',
		label: 'THE✊🏽REBEL',
		color: '#f59e0c',
		emoji: '✊🏽',
		description: 'Manifests from the Nano Riot.'
	},
	{
		value: 'momentum',
		label: 'Momentum',
		color: '#00b8ff',
		emoji: '🌀',
		description: 'A tool to build in public and grow audience early.'
	},
	{
		value: 'accelerator',
		label: 'Accelerator',
		color: '#d091ff',
		emoji: '🚠',
		description: 'Get $125k to build, launch and grow your product.'
	},
	{
		value: 'igor',
		label: 'Igor',
		color: '#75c425',
		emoji: '🤓',
		description: "Igor Krasnik's website."
	},
	{
		value: 'altos',
		label: 'Altos',
		color: '#fff291',
		emoji: '🤳',
		description: 'Share videos, explore events, meet new people and have fun.'
	}
]);

export default projectsStore;

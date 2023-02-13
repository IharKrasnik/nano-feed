export { matchers } from './matchers.js';

export const nodes = [() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11')];

export const server_loads = [0];

export const dictionary = {
	"/creators": [5],
	"/[[username]]/edit": [3],
	"/embed-live": [6],
	"/[[username]]/embed": [4],
	"/feed/[feedItemId]": [~7],
	"/launch": [8],
	"/og": [9],
	"/write-editor": [11],
	"/write": [10],
	"/[[username]]": [~2]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};
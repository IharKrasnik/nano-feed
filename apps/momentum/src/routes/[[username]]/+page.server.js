import { error } from '@sveltejs/kit';
import { get } from 'lib/api';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { username } = params;
	let desciption = 'Momentum is a tool to build in public and grow audience early.';

	if (username && username !== 'explore') {
		if (username?.startsWith('@')) {
			let creator = await get(`creators/${username.replace('@', '')}`);

			return {
				ogTitle: `${creator.fullName} — Momentum Stream`,
				ogDescription: desciption
			};
		} else {
			let project = await get(`projects/${username}`);

			return {
				ogTitle: `${project.title} — Momentum Stream`,
				ogDescription: desciption
			};
		}
	}
	console.log('wtf', desciption);

	return {
		ogTitle: 'Momentum',
		ogDescription: desciption
	};
}

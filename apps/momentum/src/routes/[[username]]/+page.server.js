import { error } from '@sveltejs/kit';
import { get } from 'lib/api';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { username } = params;
	let description = 'Momentum is a tool to build in public and grow audience early.';
	let image =
		'https://assets.website-files.com/636cf54cf20a6ac090f7deb0/6400e2d9b05733208d9b29b4_open-graph%20(3).png';
	if (username && username !== 'explore') {
		if (username?.startsWith('@')) {
			let creator = await get(`creators/${username.replace('@', '')}`);

			return {
				ogTitle: `${creator.fullName} — Momentum Stream`,
				ogDescription: creator.description || description,
				ogImage: creator.avatarUrl
			};
		} else {
			let project = await get(`projects/${username}`);

			return {
				ogTitle: `${project.title} — Momentum Stream`,
				ogDescription: project.description || description,
				ogImage: project.bannerUrl || image
			};
		}
	}

	return {
		ogTitle: 'Momentum',
		ogDescription: description,
		ogImage: image
	};
}

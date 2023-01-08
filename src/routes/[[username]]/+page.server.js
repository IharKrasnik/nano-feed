import { error } from '@sveltejs/kit';
import { get } from '$lib/api';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { username } = params;

	if (username) {
		if (username?.startsWith('@')) {
			let creator = await get(`creators/${username.replace('@', '')}`);

			return {
				ogTitle: `${creator.fullName} — Momentum Stream`,
				ogDescription: ''
			};
		} else {
			let project = await get(`projects/${username}`);

			return {
				ogTitle: `${project.title} — Momentum Stream`,
				ogDescription: ''
			};
		}
	}

	return {};
}

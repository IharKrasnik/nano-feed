// @ts-nocheck
import { error } from '@sveltejs/kit';
import { get } from '$lib/api';

/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */
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

	return {
		ogTitle: 'Momentum',
		ogDescription: desciption
	};
}

import { error } from '@sveltejs/kit';
import { get } from 'lib/api';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { brandSlug, guid } = params;

	let brand = await get(`brands/${brandSlug}`);
	console.log('guid', guid, brand);
	if (brand) {
		if (guid === 'root') {
			throw redirect(302, brand.renderedUrl);
		} else {
			let image = brand.openGraphImages.find((i) => i.guid === guid);
			throw redirect(302, image.renderedUrl);
		}
	}
}

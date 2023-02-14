import { get } from 'lib/api';
import { PAGE_URL } from 'lib/env';

export async function load({ params }) {
	const { slug } = params;

	let page = await get(`pages/${slug}`);

	return {
		page,
		ogTitle: `${page.name}`,
		ogDescription: `${page.title || page.subtitle || page.callToAction}`,
		image: `${PAGE_URL}/og.png?pageSlug=${slug}`
	};
}

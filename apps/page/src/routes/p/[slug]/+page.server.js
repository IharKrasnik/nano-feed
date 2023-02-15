import { get } from 'lib/api';
import { PAGE_URL } from 'lib/env';

export async function load({ params }) {
	const { slug } = params;

	let page = await get(`pages/${slug}`);

	return {
		page,
		ogTitle: `${page.name} — ${page.title}`,
		ogDescription: `${page.subtitle || page.callToAction}`,
		ogImage: page.demoUrl || `${PAGE_URL}/og.png?pageSlug=${slug}`
	};
}
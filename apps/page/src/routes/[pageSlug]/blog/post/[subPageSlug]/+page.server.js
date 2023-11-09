import getPageMetaTags from 'lib/helpers/getPageMetaTags';

import { get } from 'lib/api';

export async function load({ url, params, session, cookies }) {
	const { pageSlug, subPageSlug } = params;

	let extend = {};

	let post = await get(`pages/${pageSlug}/subpages/${subPageSlug}`, {
		renderType: 'article'
	});

	let metaTags = getPageMetaTags({ page: post });

	extend = {
		page: post,
		ogTitle: metaTags.title,
		ogDescription: metaTags.description,
		ogImage: metaTags.image
	};

	return { ...extend };
}

import getPageMetaTags from 'lib/helpers/getPageMetaTags';

import { get } from 'lib/api';

let getDomain = (href) => {
	let res = /:\/\/([^\/]+)/.exec(href);
	return (res && res[1]) || href;
};

export async function load({ url, params, session, cookies }) {
	let currentDomain = getDomain(url.href);

	let extend = {};

	let pageSlug =
		currentDomain.includes('localhost') || currentDomain.includes('ide.momentum.page')
			? url.searchParams.get('pageSlug')
			: currentDomain;

	let blogPage = await get(`pages/${pageSlug}/subpages/blog`, {
		renderType: 'article'
	});

	let metaTags = getPageMetaTags({ page: blogPage });

	extend = {
		page: blogPage,
		ogTitle: metaTags.title,
		ogDescription: metaTags.description,
		ogImage: metaTags.image
	};

	return { ...extend };
}

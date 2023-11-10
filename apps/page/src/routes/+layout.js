import authClientGuard from 'lib/guards/auth.client';
import { redirect } from '@sveltejs/kit';

import { PAGE_URL } from 'lib/env';
import { get } from 'lib/api';

import getPageMetaTags from 'lib/helpers/getPageMetaTags';

let getDomain = (href) => {
	let res = /:\/\/([^\/]+)/.exec(href);
	return (res && res[1]) || href;
};

export async function load({ url, params, session, cookies }) {
	let currentDomain = getDomain(url.href);

	let pageSlug = currentDomain.includes('localhost')
		? url.searchParams.get('pageSlug')
		: currentDomain;

	const { subPageSlug } = params;

	let extend = {};
	if (pageSlug) {
		let page = await get(`pages/${subPageSlug || pageSlug}`, {
			parentPageSlug: subPageSlug ? pageSlug : '',
			isServer: true
		});

		let metaTags = getPageMetaTags({ page });
		//s
		extend = {
			page,
			ogTitle: metaTags.title,
			ogDescription: metaTags.description,
			ogImage: metaTags.image
		};
	} else {
		extend = {
			ogTitle: `Momentum Page`,
			ogDescription: `Grow your startup: launch landing pages, collect waitlist, create, connect with your audience, sell.`,
			ogImage:
				'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1691926283375-telegram-cloud-document-2-5386494382004252533.jpg'
		};
	}

	let authData = await authClientGuard({ url, params, session }, 'Momentum IDE');

	return { ...authData, ...extend, pageSlug };
}

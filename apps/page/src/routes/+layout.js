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
	let { pageSlug } = params;

	let currentDomain = getDomain(url.href);

	if (currentDomain === 'mmntm.me' && !pageSlug) {
		throw redirect(302, 'https://page.mmntm.build');
	}

	if (currentDomain === 'page.mmntm.build' && pageSlug) {
		throw redirect(302, `https://mmntm.me/${pageSlug}`);
	}

	if (!pageSlug) {
		if (url.href.includes('.mmntm.live')) {
			pageSlug = currentDomain;
		} else if (currentDomain !== 'page.mmntm.build' && !currentDomain.includes('localhost')) {
			pageSlug = currentDomain;
		}
	}

	let extend = {};

	if (pageSlug) {
		let page = await get(`pages/${pageSlug}`);

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

	let authData = await authClientGuard({ url, params, session }, 'Momentum Page');

	return { ...authData, ...extend };
}

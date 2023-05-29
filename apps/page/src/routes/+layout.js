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
	}

	let authData = await authClientGuard({ url, params, session }, 'Momentum Page');

	return { ...authData, ...extend };
}

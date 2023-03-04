import authClientGuard from 'lib/guards/auth.client';

import { PAGE_URL } from 'lib/env';
import { get } from 'lib/api';

let getDomain = (href) => {
	return /:\/\/([^\/]+)/.exec(href)[1];
};

export async function load({ url, params, session, cookies }) {
	let { pageSlug } = params;

	let currentDomain = getDomain(url.href);

	if (!pageSlug) {
		if (url.href.includes('.mmntm.live')) {
			pageSlug = currentDomain;
		} else if (currentDomain !== getDomain(PAGE_URL)) {
			pageSlug = currentDomain;
		}
	}

	let extend = {};

	if (pageSlug) {
		let page = await get(`pages/${pageSlug}`);

		extend = {
			page,
			ogTitle: `${page.name} — ${page.title}`,
			ogDescription: `${page.subtitle || page.callToAction}`,
			ogImage: page.demoUrl || `${PAGE_URL}/og.png?pageSlug=${pageSlug}`
		};
	}

	let authData = await authClientGuard({ url, params, session }, 'Momentum Page');

	return { ...authData, ...extend };
}

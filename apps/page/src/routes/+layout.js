import authClientGuard from 'lib/guards/auth.client';

import { PAGE_URL } from 'lib/env';
import { get } from 'lib/api';

export async function load({ url, params, session, cookies }) {
	let { pageSlug } = params;

	if (!pageSlug && url.href.includes('.mmntm.me')) {
		pageSlug = /:\/\/([^\/]+)/.exec(url.href)?.split('.')[1];
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

	let authData = await authClientGuard({ url, params, session });

	return { ...authData, ...extend };
}

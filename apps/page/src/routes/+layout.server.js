import authServerGuard from 'lib/guards/auth.server';
import { PAGE_URL } from 'lib/env';
import { get } from 'lib/api';

export async function load({ url, params, session, cookies }) {
	const { pageSlug } = params;

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
	console.log('extend', extend);

	let authData = await authServerGuard({ url, params, session, cookies }, 'Momentum Page');

	console.log('authData', { ...authData, ...extend });
	return { ...authData, ...extend };
}

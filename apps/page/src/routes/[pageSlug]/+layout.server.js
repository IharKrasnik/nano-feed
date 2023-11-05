import authServerGuard from 'lib/guards/auth.server';
import { BRAND_URL } from 'lib/env';
import { get } from 'lib/api';

export async function load({ url, params, session, cookies }) {
	const { pageSlug, subPageSlug } = params;

	let extend = {};
	console.log('SERVER', pageSlug, subPageSlug);

	if (pageSlug) {
		let page = await get(`pages/${subPageSlug || pageSlug}`, {
			parentPageSlug: subPageSlug ? pageSlug : '',
			isServer: true
		});

		extend = {
			page,
			ogTitle: `${page.name} — ${page.title}`,
			ogDescription: `${page.subtitle || page.callToAction || ''}`,
			ogImage: page.demoUrl || `${BRAND_URL}/og.png?pageId=${page._id}`
		};
	} else {
		extend = {
			ogTitle: `Momentum Page`,
			ogDescription: `Grow your startup: launch landing pages, collect waitlist, create, connect with your audience, sell.`,
			ogImage:
				'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1691926283375-telegram-cloud-document-2-5386494382004252533.jpg'
		};
	}

	let authData = await authServerGuard({ url, params, session, cookies }, 'Momentum Page');

	return { ...authData, ...extend };
}

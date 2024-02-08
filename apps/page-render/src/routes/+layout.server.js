import authServerGuard from 'lib/guards/auth.server';
import { redirect } from '@sveltejs/kit';

import { get } from 'lib/api';
import getPageMetaTags from 'lib/helpers/getPageMetaTags';
import setPageVars from 'lib-render/helpers/setPageVars';

let getDomain = (href) => {
	let res = /:\/\/([^\/]+)/.exec(href);
	return (res && res[1]) || href;
};

export async function load({ url, params, session, cookies }) {
	let currentDomain = getDomain(url.href);

	let pageSlug =
		currentDomain.includes('localhost') ||
		currentDomain.includes('192.168') ||
		currentDomain.includes('ide.momentum.page')
			? url.searchParams.get('pageSlug')
			: currentDomain;

	if (currentDomain.includes('mmntm.page')) {
		if (currentDomain === 'mmntm.page') {
			throw redirect(302, 'https://momentum.page');
		} else {
			pageSlug = currentDomain.split('.')[0];
		}
	}

	const { subPageSlug, feedItemSlug, articleSlug } = params;

	//
	let extend = {};

	if (url.href.includes('/app/')) {
		let parentPage = await get(`pages/bySlug`, {
			slug: pageSlug
		});

		if (url.href.includes('/requests')) {
			extend = {
				page: {
					_id: parentPage._id,
					slug: 'service_chat',
					_refreshTimestamp: new Date(),
					renderType: 'service_chat',
					parentPage,

					theme: {},
					heros: [],
					sections: []
				},

				ogTitle: 'Service Request',
				ogDescription: 'Chat on your request',
				ogImage: ''
			};
		} else if (url.href.includes('/profile')) {
			extend = {
				page: {
					_id: parentPage._id,
					slug: 'edit_profile',
					_refreshTimestamp: new Date(),
					renderType: 'edit_profile',
					parentPage,

					theme: {},
					heros: [],
					sections: []
				},

				ogTitle: 'Profile',
				ogDescription: 'Edit your user profile',
				ogImage: ''
			};
		} else if (url.href.includes('/logout')) {
			extend = {
				page: {
					_id: parentPage._id,
					slug: 'logout',
					_refreshTimestamp: new Date(),
					parentPage,

					theme: {},
					heros: [],
					sections: []
				},

				ogTitle: 'Logout',
				ogDescription: 'Logout',
				ogImage: ''
			};
		}
	} else if (pageSlug && pageSlug !== 'templates') {
		let page;

		if (feedItemSlug) {
			[page] = await Promise.all([
				get(`pages/bySlug`, {
					slug: `${subPageSlug}/${feedItemSlug}`,
					parentPageSlug: pageSlug
				})
			]);

			let feedItem;

			if (page.slug.includes('$data.slug')) {
				feedItem = await get(`feed/bySlug`, {
					projectSlug: page.streamSlug,
					slug: feedItemSlug
				});
			}

			setPageVars({ page, feedItem });
		} else if (articleSlug) {
			page = await get(`pages/${pageSlug}/subpages/${articleSlug}`, {
				renderType: 'article'
			});
		} else {
			page = await get(`pages/${subPageSlug || pageSlug}`, {
				parentPageSlug: subPageSlug ? pageSlug : '',
				isServer: true
			});
			console.log('page', extend.page);
		}
		let metatags = getPageMetaTags({ page });

		extend = {
			page,

			ogTitle: metatags.title,
			ogDescription: metatags.description,
			ogImage: metatags.image
		};
	} else {
		extend = {
			ogTitle: `Momentum IDE`,
			ogDescription: `Grow your startup: launch landing pages, collect waitlist, create, connect with your audience, sell.`,
			ogImage:
				'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1691926283375-telegram-cloud-document-2-5386494382004252533.jpg'
		};
	}

	let authData = await authServerGuard({ url, params, session, cookies }, 'Momentum IDE');

	return { ...authData, ...extend, pageSlug };
}

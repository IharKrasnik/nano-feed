import authServerGuard from 'lib/guards/auth.server';
import { BRAND_URL } from 'lib/env';
import { get } from 'lib/api';

export async function load({ url, params, session, cookies }) {
	// const { blogSlug, postSlug } = params;

	let extend = {};

	// if (blogSlug) {
	// 	let blog = await get(`blogs/${blogSlug}`);

	// 	extend = {
	// 		blog,
	// 		ogTitle: `${blog.title}`,
	// 		ogDescription: `${blog.subtitle || blog.callToAction}`,
	// 		ogImage: `${BRAND_URL}/og.png?blog=${pageSlug}`
	// 	};
	// } else if (postSlug) {
	// } else {
	// 	extend = {
	// 		ogTitle: `Momentum Post`,
	// 		ogDescription: `Launch your blog in seconds.`,
	// 		ogImage:
	// 			'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1691926283375-telegram-cloud-document-2-5386494382004252533.jpg'
	// 	};
	// }

	let authData = await authServerGuard({ url, params, session, cookies }, 'Momentum Post');

	return { ...authData, ...extend };
}

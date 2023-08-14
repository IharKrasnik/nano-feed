import authClientGuard from 'lib/guards/auth.client';
import { redirect } from '@sveltejs/kit';
import getBlogMetaTags from 'lib/helpers/getBlogMetaTags';
import getPostMetaTags from 'lib/helpers/getPostMetaTags';
import { POST_URL } from 'lib/env';
import { get } from 'lib/api';

let getDomain = (href) => {
	let res = /:\/\/([^\/]+)/.exec(href);
	return (res && res[1]) || href;
};

export async function load({ url, params, session, cookies }) {
	let { postSlug, blogSlug } = params;

	let currentDomain = getDomain(url.href);

	if (currentDomain === 'mmntm.blog' && !blogSlug) {
		throw redirect(302, 'https://post.mmntm.build');
	}

	if (currentDomain === 'post.mmntm.build') {
		if (postSlug) {
			throw redirect(302, `https://mmntm.blog/${blogSlug}/${postSlug}`);
		} else if (blogSlug) {
			throw redirect(302, `https://mmntm.blog/${blogSlug}`);
		}
	}

	if (
		currentDomain !== 'post.mmntm.build' &&
		currentDomain !== 'mmntm.blog' &&
		!currentDomain.includes('localhost')
	) {
		if (blogSlug && !postSlug) {
			postSlug = blogSlug;
		}
		blogSlug = currentDomain;
	}

	let extend = {};

	if (postSlug) {
		let post = await get(`blogs/${blogSlug}/posts/${postSlug}`);

		let metaTags = getPostMetaTags({ post });

		extend = {
			post,
			ogTitle: metaTags.title,
			ogDescription: metaTags.description,
			ogImage: metaTags.image
		};
	} else if (blogSlug) {
		let blog = await get(`blogs/${blogSlug}`);

		let metaTags = getBlogMetaTags({ blog });

		extend = {
			blog,
			ogTitle: metaTags.title,
			ogDescription: metaTags.description,
			ogImage: metaTags.image
		};
	} else {
		extend = {
			ogTitle: `Momentum Post`,
			ogDescription: `Launch your blog in seconds.`,
			ogImage:
				'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1691926283375-telegram-cloud-document-2-5386494382004252533.jpg'
		};
	}

	let authData = await authClientGuard({ url, params, session }, 'Momentum Post');

	console.log('extend', extend);

	return { ...authData, ...extend };
}

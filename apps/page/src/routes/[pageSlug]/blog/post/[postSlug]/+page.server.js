import getPostMetaTags from 'lib/helpers/getPostMetaTags';

import { get } from 'lib/api';

export async function load({ url, params, session, cookies }) {
	const { pageSlug, postSlug } = params;

	let extend = {};

	let post = await get(`blogs/${pageSlug}/posts/${postSlug}`);

	let metaTags = getPostMetaTags({ post });

	extend = {
		post,
		blog: post.blog,
		ogTitle: metaTags.title,
		ogDescription: metaTags.description,
		ogImage: metaTags.image
	};

	return { ...extend };
}

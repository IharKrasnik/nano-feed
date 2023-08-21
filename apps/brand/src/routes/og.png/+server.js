import { get } from 'lib/api';
import striptags from 'striptags';

import renderImage from './../doc.pdf/renderImage';

export const GET = async ({ url }) => {
	const pageId = url.searchParams.get('pageId') ?? undefined;
	const blogId = url.searchParams.get('blogId') ?? undefined;
	const postId = url.searchParams.get('postId') ?? undefined;
	const fileId = url.searchParams.get('fileId') ?? undefined;

	const name = url.searchParams.get('name') ?? undefined;
	const title = url.searchParams.get('title') ?? undefined;
	const description = url.searchParams.get('description') ?? undefined;

	let page;

	if (pageId) {
		page = await get(`pages/${pageId}`);
		page.size = {
			width: 1200,
			height: 630
		};
	} else if (blogId) {
		page = await get(`blogs/${blogId}`);

		page.size = {
			width: 1200,
			height: 630
		};
	} else if (postId) {
		page = await get(`posts/${postId}`);

		page.name = page.blog.name;
		page.logo = page.blog.logo;
		page.size = {
			width: 1200,
			height: 630
		};
	} else if (fileId) {
		page = await get(`brands/files/${fileId}`);
	} else {
		page = {
			name,
			title,
			description
		};

		page.size = {
			width: 1200,
			height: 630
		};
	}

	let demoImageSize;

	if (page.demoUrl) {
		if (
			(page.demoUrl.includes('ship-app') && page.demoUrl.includes('.jpeg')) ||
			page.demoUrl.includes('.png') ||
			page.demoUrl.includes('.gif')
		) {
			demoImageSize = await get('files/size', { imageUrl: page.demoUrl });
		} else {
			page.demoUrl = null;
		}
	}

	page.demoImageSize = demoImageSize;

	page.title = striptags(page.title);
	page.description = striptags(page.description);

	return new Response(await renderImage({ page }), {
		headers: {
			'content-type': 'image/png'
		}
	});
};

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactNode } from 'satori-html';
import { get } from 'lib/api';
import Image from './Image.svelte';
import striptags from 'striptags';

import Inter from '$lib/Inter-Regular.ttf';
import ArchivoBold from '$lib/Archivo-Bold.ttf';
import Bowlby from '$lib/BowlbyOne-Regular.ttf';

const height = 630;
const width = 1200;

function unEntity(str) {
	return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

export const GET = async ({ url }) => {
	const pageId = url.searchParams.get('pageId') ?? undefined;
	const blogId = url.searchParams.get('blogId') ?? undefined;
	const postId = url.searchParams.get('postId') ?? undefined;

	const name = url.searchParams.get('name') ?? undefined;
	const title = url.searchParams.get('title') ?? undefined;
	const description = url.searchParams.get('description') ?? undefined;

	let componentResult;

	let page;

	if (pageId) {
		page = await get(`pages/${pageId}`);
	} else if (blogId) {
		page = await get(`blogs/${blogId}`);
	} else if (postId) {
		page = await get(`posts/${postId}`);

		page.name = page.blog.name;
		page.logo = page.blog.logo;
	} else {
		page = {
			name,
			title,
			description
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

	componentResult = Image.render({
		page
	});

	componentResult.html = unEntity(componentResult.html);

	let markup = toReactNode(`${componentResult.html}<style>${componentResult.css.code}</style>`);

	// console.log('componentResult', componentResult.html.replace(/\&amp;/g,'&'));

	const svg = await satori(markup, {
		fonts: [
			{
				name: 'Archivo',
				data: Buffer.from(ArchivoBold),
				weight: 700,
				style: 'normal'
			},
			{
				name: 'Inter',
				data: Buffer.from(Inter),
				weight: 400,
				style: 'normal'
			},
			{
				name: 'Bowlby One',
				data: Buffer.from(Bowlby),
				weight: 400,
				style: 'normal'
			}
		],
		height,
		width
	});

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: width
		}
	});

	const image = resvg.render();

	return new Response(image.asPng(), {
		headers: {
			'content-type': 'image/png'
		}
	});
};

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactNode } from 'satori-html';
import { get } from 'lib/api';
import OGImage from '$lib/components/OGImage.svelte';
import striptags from 'striptags';

import Inter from '$lib/Inter-Regular.ttf';
import ArchivoBold from '$lib/Archivo-Bold.ttf';

const height = 630;
const width = 1200;

function unEntity(str) {
	return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

export const GET = async ({ url }) => {
	const pageSlug = url.searchParams.get('pageSlug') ?? undefined;

	const name = striptags(url.searchParams.get('name') ?? undefined);
	const title = striptags(url.searchParams.get('title') ?? undefined);
	const description = striptags(url.searchParams.get('description') ?? undefined);

	let componentResult;

	let page;

	if (pageSlug) {
		page = await get(`pages/${pageSlug}`);
	} else {
		page = {
			name,
			title,
			description
		};
	}

	componentResult = OGImage.render({
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

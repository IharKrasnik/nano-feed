import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactNode } from 'satori-html';
import { get } from '$lib/api';
import OGImage from '$lib/components/OGImage.svelte';

import Montserrat from '$lib/Montserrat-Regular.ttf';
import MontserratBold from '$lib/Montserrat-Bold.ttf';

const height = 630;
const width = 1200;

// const fontFile = await fetch('https://sveltekit-og.ethercorps.io/noto-sans.ttf');
// const fontData = await fontFile.arrayBuffer();

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
	const slug = url.searchParams.get('slug') ?? undefined;
	console.log('slug', slug);
	const project = await get(`projects/${slug}`);

	const result = OGImage.render({ title: project.title, description: project.description });
	const markup = toReactNode(`${result.html}<style>${result.css.code}</style>`);

	const svg = await satori(markup, {
		fonts: [
			{
				name: 'Montserrat',
				data: Buffer.from(Montserrat),
				weight: 400,
				style: 'normal'
			},
			{
				name: 'Montserrat',
				data: Buffer.from(MontserratBold),
				weight: 600,
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

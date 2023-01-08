import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const height = 630;
const width = 1200;

const fontFile = await fetch('https://sveltekit-og.ethercorps.io/noto-sans.ttf');
const fontData = await fontFile.arrayBuffer();

/** @type {import('./$types').RequestHandler} */
export const GET = async () => {
	console.log('GET', fontData);
	const html = {
		type: 'div',
		props: {
			children: 'hello, world',
			style: { color: 'red' }
		}
	};
	const svg = await satori(html, {
		fonts: [
			{
				name: 'Noto Sans',
				data: fontData,
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

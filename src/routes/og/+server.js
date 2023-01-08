import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
// import NotoSans from '$lib/NotoSans-Regular.ttf';

const height = 630;
const width = 1200;

/** @type {import('./$types').RequestHandler} */
export const GET = async () => {
	const html = {
		type: 'div',
		props: {
			children: 'hello, world',
			style: { color: 'red' }
		}
	};
	const svg = await satori(html, {
		fonts: [
			// {
			// 	name: 'Noto Sans',
			// 	data: Buffer.from(NotoSans),
			// 	style: 'normal'
			// }
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

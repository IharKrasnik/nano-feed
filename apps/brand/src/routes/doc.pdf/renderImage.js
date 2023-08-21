import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactNode } from 'satori-html';
import Image from './Image.svelte';

import Inter from '$lib/Inter-Regular.ttf';
import InterBold from '$lib/Inter-Bold.ttf';
import ArchivoBold from '$lib/Archivo-Bold.ttf';
import Bowlby from '$lib/BowlbyOne-Regular.ttf';
import GaeguRegular from '$lib/Gaegu-Regular.ttf';
import GaeguBold from '$lib/Gaegu-Bold.ttf';
import { loadEmoji, getIconCode } from './emojiHelpers';

function unEntity(str) {
	return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

export default async ({ page } = {}) => {
	let width = page.size?.width || 1080;
	let height = page.size?.height || 1080;

	let componentResult = Image.render({
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
				name: 'Inter',
				data: Buffer.from(InterBold),
				weight: 700,
				style: 'bold'
			},
			{
				name: 'Gaegu',
				data: Buffer.from(GaeguRegular),
				weight: 400,
				style: 'normal'
			},
			{
				name: 'Gaegu',
				data: Buffer.from(GaeguBold),
				weight: 700,
				style: 'bold'
			},
			{
				name: 'Bowlby One',
				data: Buffer.from(Bowlby),
				weight: 400,
				style: 'normal'
			}
		],

		loadAdditionalAsset: async (code, text) => {
			if (code === 'emoji') {
				return (
					`data:image/svg+xml;base64,` + btoa(await loadEmoji('fluentFlat', getIconCode(text)))
				);
			}
		},

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

	return image.asPng();
};

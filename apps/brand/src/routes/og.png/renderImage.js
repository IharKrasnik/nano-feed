import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactNode } from 'satori-html';
import Image from './_Image.svelte';

import Inter from '$lib/Inter-Regular.ttf';
import ArchivoBold from '$lib/Archivo-Bold.ttf';
import Bowlby from '$lib/BowlbyOne-Regular.ttf';

const height = 630;
const width = 1200;

function unEntity(str) {
	return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

export default async ({ page }) => {
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

	return image.asPng();
};

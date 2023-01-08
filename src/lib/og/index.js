import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

import toReactElement from './toReactElement';

const fontFile = await fetch('https://sveltekit-og.ethercorps.io/noto-sans.ttf');
const fontData = await fontFile.arrayBuffer();
const ImageResponse = async (htmlTemplate, optionsByUser) => {
	const options = Object.assign({ width: 1200, height: 630, debug: !1 }, optionsByUser);
	const svg = await satori(toReactElement(htmlTemplate), {
		width: options.width,
		height: options.height,
		debug: options.debug,
		fonts: options.fonts || [
			{
				name: 'sans serif',
				data: fontData,
				style: 'normal',
				weight: 700
			}
		]
	});
	const reSvgOptions = {
		fitTo: {
			mode: 'width',
			value: options.width
		}
	};
	const reSvgObject = new Resvg(svg, reSvgOptions);
	const pngData = await reSvgObject.render().asPng();
	return new Response(pngData, {
		headers: {
			'Content-Type': 'image/png',
			'cache-control': 'public, immutable, no-transform, max-age=31536000',
			...options.headers
		},
		status: options.status,
		statusText: options.statusText
	});
};
const componentToImageResponse = (component, props = {}, optionsByUser) => {
	const htmlTemplate = componentToMarkup(component, props);
	return ImageResponse(htmlTemplate, optionsByUser);
};
const componentToMarkup = (component, props = {}) => {
	const SvelteRenderedMarkup = component.render(props);
	let htmlTemplate = `${SvelteRenderedMarkup.html}`;
	if (SvelteRenderedMarkup && SvelteRenderedMarkup.css && SvelteRenderedMarkup.css.code) {
		htmlTemplate = `${SvelteRenderedMarkup.html}<style>${SvelteRenderedMarkup.css.code}</style>`;
	}
	return htmlTemplate;
};
export { componentToImageResponse, ImageResponse, toReactElement, satori };

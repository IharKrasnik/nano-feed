import { get } from 'lib/api';
import renderImage from './../doc.pdf/renderImage';
import GifEncoder from 'gif-encoder';
import getPixels from 'get-pixels';
import fs from 'fs';
import { mkdirp } from 'mkdirp';

let addToGif = async function (gif, { page }) {
	page.size = page.size || { width: 1080, height: 1080 };

	let image = await renderImage({
		page,
		width: page.size.width,
		height: page.size.height
	});

	return new Promise((resolve, reject) => {
		getPixels(image, 'image/png', function (err, pixels) {
			if (err) {
				reject(err);
			}

			gif.addFrame(pixels.data);
			gif.read();

			resolve();
		});
	});
};

export const GET = async ({ url }) => {
	try {
		const fileId = url.searchParams.get('fileId') ?? undefined;

		let file = await get(`brands/files/${fileId}`);

		// Create a document
		let gif = new GifEncoder(1080, 1080);

		await mkdirp('./.tmp');

		let filePath = `.tmp/${parseInt(Math.random() * 1000)}-${+new Date()}.gif`;

		gif.pipe(fs.createWriteStream(filePath));

		gif.setQuality(20);
		gif.setDelay(1000);

		gif.setRepeat(0);

		gif.writeHeader();

		for (let innerFile of file.files) {
			await addToGif(gif, {
				page: innerFile
			});
			console.log('cycle addToGiff');
		}

		gif.finish();
		gif.outputImage();

		return new Response(fs.createReadStream(filePath), {
			headers: {
				'content-type': 'image/gif'
			}
		});
	} catch (err) {
		console.log('err', err);
	}
};

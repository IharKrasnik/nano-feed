import { get } from 'lib/api';
import PDFDocument from 'pdfkit';
import renderImage from './renderImage';

let addImage = async (doc, { page } = {}) => {
	if (doc.hasFirstPage) {
		doc.addPage();
	} else {
		doc.hasFirstPage = true;
	}

	let image = doc.image(
		await renderImage({
			page: {
				...page,
				theme: page.theme || {
					backgroundColor: '#fefefe',
					textColor: '#111',
					theme: 'light',
					font: 'bowlby'
				},
				size: {
					width: 1080,
					height: 1080
				}
			},
			width: 1080,
			height: 1080
		}),
		0,
		0,
		{
			fit: [1080, 1080]
		}
	);

	return image;
};
//😏😅😎🌞🚀💥🙌🌶🦍

export const GET = async ({ url }) => {
	const fileId = url.searchParams.get('fileId') ?? undefined;

	const doc = new PDFDocument({ size: [1080, 1080] });
	doc.hasFirstPage = false;

	// doc.pipe(fs.createWriteStream('output.pdf'));

	let file = await get(`brands/files/${fileId}`);

	for (let innerFile of file.files) {
		console.log('addImage');

		await addImage(doc, {
			page: innerFile
		});
	}

	doc.save();
	doc.end();

	return new Response(doc, {
		headers: {
			'content-type': 'application/pdf'
		}
	});
};

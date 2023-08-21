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

	// 	// Add an image, constrain it to a given size, and center it vertically and horizontally
	// 	await addImage(doc, {
	// 		page: {
	// 			name: 'Nano Riot',
	// 			logo: 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1692538956507-nano.png',
	// 			title: `Use this checklist to hire a badass tech cofounder for your early-stage startup`,
	// 			subtitle: 'From a Badass CTO',
	// 			author: {
	// 				avatarUrl:
	// 					'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1691344061187-image.png',
	// 				fullName: 'Igor Krasnik'
	// 			}
	// 		}
	// 	});

	// await addImage(doc, {
	// 	page: {
	// 		title: `Hey, I'm Igor 👋`,
	// 		subtitle: `
	// 	I'm a developer turned CTO of 200-people startup studio. It took me 10 years. <br/>
	// 	I’ve interviewed 100+ engineers and worked closely with 30+ startups.<br/>
	// 	Founders often ask me how do they find the right CTO / cofounder.<br/>
	// 	Here's what I recommend them.`
	// 	}
	// });

	// 	await addImage(doc, {
	// 		page: {
	// 			title: `✅ Maker-Generalist`,
	// 			subtitle: `
	Don't discuss this front-end/back-end/DevOps bullsh*t.
	Tech is a commodity on the early-stage.
	Hire a resourceful CTO who can build alone fast.
	They should be obsessed with product and growth, not just tech.`
	// 		}
	// 	});

	// 	await addImage(doc, {
	// 		page: {
	// 			title: '✅ Worked in an early-stage startup or startup studio',
	// 			subtitle: `Do not hire enterprise executives for your startup. They have a different mindset. They need teams, budgets, weird rituals. They use to move slow and avoid breaking things.
	// 			You need to move fast and break things.`
	// 		}
	// 	});

	// 	await addImage(doc, {
	// 		page: {
	// 			title: '✅ Speaks simple language',
				subtitle: `Not every engineer speak nonsense that's hard to understand.

				Your cofounder should speak simple language and explain what’s going on. Those who write well also think well.

				Don’t let the tech to be a blackbox for you.`
	// 		}
	// 	});

	// 	await addImage(doc, {
	// 		page: {
	// 			title: '✅ Meets short deadlines',
				subtitle: `You should be impressed by the speed of building.

				You should see changes released daily to retain your first users.

				Speed of execution is very important for your startup, so don’t let tech to be a blocker.`
			}
	// 	});

	// 	await addImage(doc, {
	// 		page: {
				title: '✅ Runs side projects',
				subtitle: `Partner with an indiehacker who already runs their own project.

				You'll get a cofounder with skin in the game.

				Most of indiehackers are coders. You’ll build a better product with a person who figured out how to attract users and payments.`
			}
	// 	});

	// 	await addImage(doc, {
	// 		page: {
	// 			title: '✅ Can-Do Attitude',
				subtitle: `Search for the person who believes that everything is possible.

				Don’t rely on the years of experience.

				Hire passionate young engineers who build their own stuff. Give them a try and grow together.

				You can train skill quickly. But you don't change mindset.`
	// 		}
	// 	});

	/* 





 
 */

	// // Add another page
	// doc.addPage().fontSize(25).text('Here is some vector graphics...', 100, 100);

	// // Draw a triangle
	// doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill('#FF3300');

	// Finalize PDF file
	doc.save();
	doc.end();

	return new Response(doc, {
		headers: {
			'content-type': 'application/pdf'
		}
	});
};

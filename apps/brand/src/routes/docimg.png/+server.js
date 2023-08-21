import renderImage from './../doc.pdf/renderImage';

export const GET = async ({ url }) => {
	// Create a document

	return new Response(
		await renderImage({
			page: {
				name: 'Nano Riot',
				logo: 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1692538956507-nano.png',
				title: `Use this checklist to hire a badass tech cofounder for your early-stage startup`,
				subtitle: 'From a Badass CTO',
				author: {
					avatarUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1691344061187-image.png',
					fullName: 'Igor Krasnik'
				}
			},
			// 			page: {
			// 				title: `Hey, I'm Igor 👋`,
			// 				subtitle: `
			// I'm a developer turned CTO of 200-people startup studio. It took me 10 years. <br/>
			// I’ve interviewed 100+ engineers and worked closely with 30+ startups.<br/>
			// Founders often ask me how do they find the right CTO / cofounder.<br/>
			// Here's what I recommend them.`
			// 			},

			width: 1080,
			height: 1080
		}),
		{
			headers: {
				'content-type': 'image/png'
			}
		}
	);
};

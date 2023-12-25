import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

let sections = [
	{
		name: 'Empty',
		section: {
			title: 'Hello World 👋'
		}
	},
	{
		name: 'Features',
		section: {
			emoji: '🙌',
			title: 'Tell the audience how <b>they</b> will benefit',
			description:
				'Show your features below, talk to the audience. Start features titles with verb.',

			theme: {
				imageAspectRatio: 'image'
			},

			columns: 1,

			items: [
				{
					emoji: '🖼',
					title: 'Attach Images',
					description:
						'Paste image from clipboard, insert a link to input or upload from your computer.',
					imageUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1684243151802-image.png'
				},
				{
					emoji: '📼',
					title: 'Use Videos',
					description: 'Simply insert a link to YouTube, Loom or Vimeo.',
					imageUrl:
						'https://www.youtube.com/watch?v=2zE7uWxA95s&pp=ygUac3RhcnR1cCBpcyBhIG1lZGlhIGNvbXBhbnk%3D',
					theme: {
						isReversedImage: true
					}
				},
				{
					emoji: '💥',
					title: 'Use GIFs',
					description:
						'Use animated GIFs to catch their attention (use search icon near file input)',
					imageUrl:
						'https://media3.giphy.com/media/MuOGhW5GtDazUSJcL3/giphy.gif?cid=54dcf3bfdsjg51xsczxm9lgxtmf2bprs055i37ma5kxfk0s1&ep=v1_gifs_search&rid=giphy.gif&ct=g'
				},
				{
					emoji: '⚒️',
					title: 'Customize The Grid',
					description: 'Select the number of columns you want to show in your section (1—4)',
					imageUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1684243758302-image.png',
					theme: {
						isReversedImage: true
					}
				}
			]
		}
	},
	{
		name: 'Testimonials',
		section: {
			renderType: 'testimonials',
			title: `Don't just trust our words...`,
			description: `Here's what people say about $page.name!`,

			items: [
				{
					title: 'Igor Krasnik, Momentum',
					description: `$page.name is awesome!`,
					imageUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1684156297060-image.png'
				},
				{
					title: 'Elon Musk, X',
					description: `$page.name is the future, to the moon 🚀`,
					imageUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1684156478852-image.png'
				}
			]
		}
	},
	{
		name: 'FAQ',
		section: {
			title: 'Frequently Asked Questions',
			description: 'Answers summarized',
			renderType: 'faq',
			items: [
				{
					title: 'Do you offer a refund?',
					description: 'Yes, all subscriptions refunded no-questions-asked the first 2 weeks.'
				},
				{
					title: 'How the process look like?',
					description: 'You submit the form, prepay and get the result in 48 hours.'
				}
			]
		}
	},
	{
		name: 'Pricing',
		section: {
			columns: 2,
			icon: 'feather:check',

			renderType: 'pricing',

			title: 'Pricing',
			description: 'Simple plans that fit your needs',

			items: [
				{
					title: 'Free',
					description: 'Start from free (capped at 1000 emails)',
					pricing: {
						amount: 0,
						per: 'month',
						benefitsStr: 'collect emails\nbroadcast emails'
					}
				},
				{
					title: 'Growth',
					description: 'For growing businesses (capped at 10k emails)',
					pricing: {
						amount: 4.2,
						per: 'month',
						benefitsStr: 'everything in free \n custom domain \n priority support'
					}
				}
			]
		}
	},
	{
		name: 'Carousel',
		section: {
			renderType: 'carousel',

			title: 'Nice images!',
			columns: 1,
			items: [
				{
					title: 'Image',
					description: '',
					colSpan: 2,
					imageUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1684243151802-image.png'
				},
				{
					title: 'GIF',
					description: '',
					imageUrl:
						'https://www.youtube.com/watch?v=2zE7uWxA95s&pp=ygUac3RhcnR1cCBpcyBhIG1lZGlhIGNvbXBhbnk%3D'
				},
				{
					title: 'Video',
					description: '',
					imageUrl:
						'https://media3.giphy.com/media/MuOGhW5GtDazUSJcL3/giphy.gif?cid=54dcf3bfdsjg51xsczxm9lgxtmf2bprs055i37ma5kxfk0s1&ep=v1_gifs_search&rid=giphy.gif&ct=g'
				}
			]
		}
	}
];

let store = writable(sections);

export default store;

export let cloneSection = (section) => {
	return {
		...section,
		items: (section.items || []).map((item) => ({
			...item,
			id: uuidv4()
		})),
		id: uuidv4()
	};
};

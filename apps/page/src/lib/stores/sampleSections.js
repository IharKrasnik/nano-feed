import _ from 'lodash';
import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

let sections = [
	{
		name: 'Callout',
		section: {
			id: '0bb1118c-05f2-4021-b2cd-c8a68d2fa773',
			title: '<span></span><span>One app to run your business on the go</span>',
			isShown: true,
			renderType: 'callout',
			streamSettings: {},
			theme: {
				isOverrideColors: false,
				backgroundColor: null,
				imageAspectRatio: null,
				isOppositeColors: false,
				isReversedImage: false,
				isTransparent: true
			},
			description:
				'Manage contracts, create recurring invoices, <span>bill timesheets, and get paid faster.</span>',
			streamSlug: '',
			imageUrl:
				'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/63f2244097193c001585e111/1702915252489-image.png',
			items: [
				{
					isShown: true,
					title: 'Run your business from anywhere.',
					description: 'Easily create, customize, and send invoices on the go.',
					imageUrl: '',
					theme: {},
					emoji:
						'<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M37.5764 20.591C42.9936 15.753 48.0684 12.0256 53.4877 7.19166C49.7485 13.3993 47.2915 18.6473 43.5442 24.8509C50.7368 23.7122 56.5398 23.4688 63.7365 22.3662C59.6731 24.3524 55.5894 26.3025 51.5198 28.2806C49.0736 29.4916 47.5841 30.1224 45.1845 31.4178C51.7894 34.3057 57.387 37.6493 64 40.5212C62.1334 40.4428 60.2871 40.1195 58.4287 39.9367C53.0864 39.3102 48.8885 38.7986 43.5442 38.1881C47.561 44.1969 50.4315 50.0906 54.4321 56.1095C48.7696 51.5848 44.2522 48.0864 38.6242 43.5195C38.7113 50.7293 37.8297 56.7923 37.8723 64C35.6287 57.1839 33.4225 51.5115 31.2337 44.6753C30.3683 45.6594 22.8141 56.8224 19.6262 61.7929C21.4806 54.8121 22.2858 49.3472 24.1281 42.3643C20.5713 44.0433 8.51198 48.7671 5.47604 50.1609C10.8264 45.2627 14.8115 40.4126 20.1801 35.5325C12.9855 34.5906 7.19263 33.7151 0 32.7572C7.13791 31.4678 12.4863 29.57 19.6262 28.2806C16.1687 25.4028 6.86836 17.0021 4.83562 15.1967C11.5256 17.9882 16.8996 19.4282 23.5835 22.2338C21.4575 15.4056 20.5929 9.98719 18.4872 3.153C19.4762 4.29973 20.22 5.63324 21.1138 6.8543C24.32 11.5175 27.4309 15.2051 30.6452 19.8623C32.5908 12.9116 34.6276 6.95065 36.5691 0C36.8326 7.20974 37.3169 13.3792 37.5764 20.591Z" fill="currentColor"/> </svg>',
					tags: '',
					emojiBgColor: null,
					iconColor: null
				},
				{
					isShown: true,
					title: 'Simplify your accounting.',
					description: 'Track your account movements and the status of invoices.',
					imageUrl: '',
					theme: {},
					emoji:
						'<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M37.5764 20.591C42.9936 15.753 48.0684 12.0256 53.4877 7.19166C49.7485 13.3993 47.2915 18.6473 43.5442 24.8509C50.7368 23.7122 56.5398 23.4688 63.7365 22.3662C59.6731 24.3524 55.5894 26.3025 51.5198 28.2806C49.0736 29.4916 47.5841 30.1224 45.1845 31.4178C51.7894 34.3057 57.387 37.6493 64 40.5212C62.1334 40.4428 60.2871 40.1195 58.4287 39.9367C53.0864 39.3102 48.8885 38.7986 43.5442 38.1881C47.561 44.1969 50.4315 50.0906 54.4321 56.1095C48.7696 51.5848 44.2522 48.0864 38.6242 43.5195C38.7113 50.7293 37.8297 56.7923 37.8723 64C35.6287 57.1839 33.4225 51.5115 31.2337 44.6753C30.3683 45.6594 22.8141 56.8224 19.6262 61.7929C21.4806 54.8121 22.2858 49.3472 24.1281 42.3643C20.5713 44.0433 8.51198 48.7671 5.47604 50.1609C10.8264 45.2627 14.8115 40.4126 20.1801 35.5325C12.9855 34.5906 7.19263 33.7151 0 32.7572C7.13791 31.4678 12.4863 29.57 19.6262 28.2806C16.1687 25.4028 6.86836 17.0021 4.83562 15.1967C11.5256 17.9882 16.8996 19.4282 23.5835 22.2338C21.4575 15.4056 20.5929 9.98719 18.4872 3.153C19.4762 4.29973 20.22 5.63324 21.1138 6.8543C24.32 11.5175 27.4309 15.2051 30.6452 19.8623C32.5908 12.9116 34.6276 6.95065 36.5691 0C36.8326 7.20974 37.3169 13.3792 37.5764 20.591Z" fill="currentColor"/> </svg>',
					emojiBgColor: null,
					iconColor: '#000000'
				},
				{
					isShown: true,
					title: 'Get paid.',
					description: 'Receiving funds on time is no longer a problem.',
					imageUrl: '',
					theme: {},
					emoji:
						'<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M37.5764 20.591C42.9936 15.753 48.0684 12.0256 53.4877 7.19166C49.7485 13.3993 47.2915 18.6473 43.5442 24.8509C50.7368 23.7122 56.5398 23.4688 63.7365 22.3662C59.6731 24.3524 55.5894 26.3025 51.5198 28.2806C49.0736 29.4916 47.5841 30.1224 45.1845 31.4178C51.7894 34.3057 57.387 37.6493 64 40.5212C62.1334 40.4428 60.2871 40.1195 58.4287 39.9367C53.0864 39.3102 48.8885 38.7986 43.5442 38.1881C47.561 44.1969 50.4315 50.0906 54.4321 56.1095C48.7696 51.5848 44.2522 48.0864 38.6242 43.5195C38.7113 50.7293 37.8297 56.7923 37.8723 64C35.6287 57.1839 33.4225 51.5115 31.2337 44.6753C30.3683 45.6594 22.8141 56.8224 19.6262 61.7929C21.4806 54.8121 22.2858 49.3472 24.1281 42.3643C20.5713 44.0433 8.51198 48.7671 5.47604 50.1609C10.8264 45.2627 14.8115 40.4126 20.1801 35.5325C12.9855 34.5906 7.19263 33.7151 0 32.7572C7.13791 31.4678 12.4863 29.57 19.6262 28.2806C16.1687 25.4028 6.86836 17.0021 4.83562 15.1967C11.5256 17.9882 16.8996 19.4282 23.5835 22.2338C21.4575 15.4056 20.5929 9.98719 18.4872 3.153C19.4762 4.29973 20.22 5.63324 21.1138 6.8543C24.32 11.5175 27.4309 15.2051 30.6452 19.8623C32.5908 12.9116 34.6276 6.95065 36.5691 0C36.8326 7.20974 37.3169 13.3792 37.5764 20.591Z" fill="currentColor"/> </svg>',
					emojiBgColor: null,
					iconColor: null
				}
			],
			subtitle: 'Enjoy',
			innerColSpan: '',
			interactiveRenderType: 'link',
			interactiveAnswers: [],
			answersResults: [],
			ctaExplainer: '',
			varName: '',
			isGlowing: false,
			className: '',
			emojiBgColor: null,
			iconColor: null,
			imageBackgroundUrl:
				'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=3732&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
		}
	},
	{
		name: 'Feature Grid',
		section: {
			id: 'c6844c2f-b73d-408e-9fcc-3e3d5ae908fd',
			title: 'Your comprehensive financial companion',
			isShown: true,
			renderType: 'grid',
			streamSettings: {},
			theme: { isTitleLeft: false, isInlineTitle: true },
			description:
				'Effortlessly control your money, make informed decisions, and achieve your financial goals with us. ',
			streamSlug: '',
			items: [
				{
					isShown: true,
					title: 'Convenient account management.',
					description:
						'FinEase provides a centralized hub for managing all your financial accounts.',
					imageUrl: '',
					theme: { isHugeTitle: false, isInlineTitle: true, isIconLeft: true },
					className: '_transparent',
					emoji: 'feather:check-circle',
					isIconLeft: true,
					emojiBgColor: null
				},
				{
					isShown: true,
					title: 'Intuitive budgeting tools.',
					description: 'Take control of your spending with intuitive budgeting tools.',
					imageUrl: '',
					theme: { isHugeTitle: false, isInlineTitle: true, isIconLeft: true },
					className: '_transparent',
					emoji: 'feather:grid',
					emojiBgColor: null
				},
				{
					isShown: true,
					title: 'Instant transaction alerts.',
					description: 'Stay informed about your account activity in real-time.',
					imageUrl: '',
					theme: { isInlineTitle: true, isIconLeft: true },
					className: '_transparent',
					emoji: 'feather:bell',
					emojiBgColor: null
				},
				{
					isShown: true,
					title: 'Smart savings features.',
					description:
						'FinEase encourages saving by offering automated savings plans and round-up features.&nbsp;',
					imageUrl: '',
					theme: { isInlineTitle: true, isIconLeft: true },
					className: '_transparent',
					emoji: 'feather:dollar-sign',
					emojiBgColor: null
				},
				{
					isShown: true,
					title: 'Secure mobile payments.',
					description: 'Embrace the future of payments with secure mobile transactions.',
					imageUrl: '',
					theme: { isInlineTitle: true, isIconLeft: true },
					className: '_transparent',
					emoji: 'feather:shield',
					emojiBgColor: null
				},
				{
					isShown: true,
					title: 'Personalized financial insights.',
					description: 'Unlock personalized insights into your spending and saving habits.',
					imageUrl: '',
					theme: { isInlineTitle: true, isIconLeft: true },
					className: '_transparent',
					emoji: 'feather:trending-up',
					emojiBgColor: null
				}
			],
			columns: 3,
			isShowSource: false,
			isMasonryGrid: false,
			isFunkyGrid: false,
			emojiBgColor: null,
			iconColor: null
		}
	},
	{
		name: '3 benefits',
		section: {
			columns: 3,
			items: [
				{
					isShown: true,
					title: 'Any content you need',
					description:
						'From necessary but boring press releases to fun memes for your founder’s page, - we got you covered.',
					imageUrl: '',
					emoji:
						'<svg width="100%" height="auto" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6.00002 29.3333V22.6667M6.00002 9.33334V2.66667M2.66669 6.00001H9.33335M2.66669 26H9.33335M17.3334 4.00001L15.0211 10.0118C14.6451 10.9895 14.4571 11.4783 14.1647 11.8895C13.9056 12.2539 13.5872 12.5723 13.2228 12.8314C12.8116 13.1237 12.3228 13.3118 11.3452 13.6878L5.33335 16L11.3452 18.3122C12.3228 18.6883 12.8116 18.8763 13.2228 19.1686C13.5872 19.4278 13.9056 19.7461 14.1647 20.1106C14.4571 20.5217 14.6451 21.0105 15.0211 21.9882L17.3334 28L19.6456 21.9882C20.0216 21.0105 20.2096 20.5217 20.502 20.1106C20.7611 19.7461 21.0795 19.4278 21.4439 19.1686C21.8551 18.8763 22.3439 18.6883 23.3215 18.3122L29.3334 16L23.3215 13.6878C22.3439 13.3118 21.8551 13.1237 21.4439 12.8314C21.0795 12.5723 20.7611 12.2539 20.502 11.8895C20.2096 11.4783 20.0216 10.9895 19.6456 10.0118L17.3334 4.00001Z" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
					className: '',
					bgImageUrl: null,
					emojiBgColor: null,
					iconColor: '#f6f5f4'
				},
				{
					isShown: true,
					title: 'Pure meat, no water',
					description:
						'We deliver value without vague messages and shiny, but general advice. CoMa will give you practical tools and strict-to-the-point content pieces &amp; strategies.',
					imageUrl: '',
					emoji:
						'<svg width="100%" height="auto" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5.33333 18.6667H13.3333M13.3333 18.6667V26.6667M13.3333 18.6667L4 28M26.6667 13.3333H18.6667M18.6667 13.3333V5.33333M18.6667 13.3333L28 4" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
					className: '',
					bgImageUrl: null,
					emojiBgColor: null,
					iconColor: '#f6f5f4'
				},
				{
					isShown: true,
					title: 'First results in 1 month',
					description:
						'Content is in the long run, but you don’t need to wait months for it to start working. Our approach is tailored to startups and their fast market pace.',
					imageUrl: null,
					emoji:
						'<svg width="100%" height="auto" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16 20L12 16M16 20C17.8624 19.2917 19.6492 18.3983 21.3333 17.3333M16 20V26.6667C16 26.6667 20.04 25.9333 21.3333 24C22.7733 21.84 21.3333 17.3333 21.3333 17.3333M12 16C12.7095 14.1593 13.6029 12.3948 14.6666 10.7333C16.2202 8.24933 18.3835 6.20408 20.9506 4.79214C23.5178 3.38019 26.4035 2.64851 29.3333 2.66668C29.3333 6.29335 28.2933 12.6667 21.3333 17.3333M12 16H5.33331C5.33331 16 6.06665 11.96 7.99998 10.6667C10.16 9.22668 14.6666 10.6667 14.6666 10.6667M5.99998 22C3.99998 23.68 3.33331 28.6667 3.33331 28.6667C3.33331 28.6667 8.31998 28 9.99998 26C10.9466 24.88 10.9333 23.16 9.87998 22.12C9.36172 21.6254 8.67904 21.3395 7.96295 21.3174C7.24686 21.2952 6.54782 21.5383 5.99998 22Z" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
					className: '',
					bgImageUrl: null,
					emojiBgColor: null,
					iconColor: '#f6f5f4'
				}
			],
			type: 'click',
			renderType: 'grid',
			isShown: true,
			title: 'You have a big problem to solve',
			description: 'We have the team and experience to make it happen',
			subtitle: 'Content marketing agency'
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
				}
			]
		}
	},
	{
		name: 'Features',
		section: {
			title: '<b>Connect</b> your favourite apps',
			columns: 4,
			isShown: true,
			renderType: 'grid',
			streamSettings: {},
			theme: {
				isTitleLeft: true,
				isNotBgImageDimmed: false,
				isOverrideColors: false,
				backgroundColor: null,
				glowingIntensity: 'sm'
			},
			description: 'All your favourite podcasts, albums, demos in one place!',
			streamSlug: '',
			items: [
				{
					isShown: true,
					title: 'Spotify.',
					description:
						'A leading music streaming service that offers a vast library of songs, personalized playlists, and seamless cross-device listening experiences.',
					imageUrl: '',
					theme: {
						isInlineTitle: true,
						isTransparent: true,
						isHugeTitle: false,
						isIconLeft: false
					},
					emoji:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/63f2244097193c001585e111/1702922304951-image.png',
					emojiBgColor: null,
					interactiveRenderType: ''
				},
				{
					isShown: true,
					title: 'Soundcloud.',
					description:
						'A pioneering audio platform that enables artists to share, discover, and connect through a vast and diverse range of user-uploaded music and audio content.',
					imageUrl: null,
					theme: { isInlineTitle: true, isTransparent: true },
					emoji:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/63f2244097193c001585e111/1702922319020-image.png',
					emojiBgColor: null
				},
				{
					isShown: true,
					title: 'Deezer.',
					description:
						'A music streaming platform providing users with a diverse catalog of songs, personalized playlists, and features for discovering new music across various genres.',
					imageUrl: null,
					theme: { isInlineTitle: true, isTransparent: true },
					emoji:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/63f2244097193c001585e111/1702922330591-image.png',
					emojiBgColor: null
				},
				{
					isShown: true,
					title: 'Amazon music.',
					description:
						'A comprehensive music streaming service integrated into the Amazon ecosystem, offering a vast library, personalized playlists, and seamless access to a diverse range of songs.',
					imageUrl: null,
					theme: { isInlineTitle: true, isTransparent: true },
					emoji:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/63f2244097193c001585e111/1702922344926-image.png',
					emojiBgColor: null
				},
				{
					isShown: true,
					title: 'Apple music.',
					description:
						'A premium music streaming service by Apple, providing subscribers with a vast catalog, curated playlists, exclusive content, and integration with the Apple ecosystem.',
					imageUrl: null,
					theme: { isInlineTitle: true, isTransparent: true },
					emoji:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/63f2244097193c001585e111/1702922975940-image.png',
					emojiBgColor: null
				},
				{
					isShown: true,
					title: 'Bandcamp.',
					description:
						'A unique online music platform that empowers independent artists by allowing them to sell and showcase their music directly to fans, fostering a direct and supportive connection between musicians and their audience.',
					imageUrl: null,
					theme: { isInlineTitle: true, isTransparent: true },
					emoji:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/63f2244097193c001585e111/1702923311066-image.png',
					emojiBgColor: null
				},
				{
					isShown: true,
					title: 'Tidal.',
					description:
						'A high-fidelity music streaming service that offers premium sound quality, exclusive content, and artist-centric features, catering to audiophiles and music enthusiasts.',
					imageUrl: null,
					theme: { isInlineTitle: true, isTransparent: true },
					emoji:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/63f2244097193c001585e111/1702923371068-image.png',
					emojiBgColor: null
				}
			],
			emoji: null,
			emojiBgColor: null,
			iconColor: null,
			isGlowing: true,
			bgImageUrl: null,
			className: ''
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
	},
	{
		name: 'Portfolio',
		section: {
			id: '0eeeeef1-e791-4bf3-80aa-df0b8ffcfb98',
			columns: 2,
			items: [
				{
					isShown: true,
					title: 'Moodahub',
					description: 'A virtual wardrobe with social network mechanics.',
					imageUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1700582314721-image.png'
				},
				{
					isShown: true,
					title: 'ClipWing',
					description: 'Create dozen of viral clips from your raw long videos in minutes.',
					imageUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1700582360821-image.png'
				},
				{
					isShown: true,
					title: 'Leaproom',
					description:
						'AI Hiring Assistant, that helps startups get matched with top quality AI Verified talent for any job description in tech, sales and marketing.',
					imageUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1700582413569-image.png'
				},
				{
					isShown: true,
					title: 'CollabUniverse',
					description:
						'Connect with creators booking agencies, major labels, film companies, art houses and more.',
					imageUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1700582439734-image.png'
				}
			],
			type: 'click',
			renderType: 'grid',
			isShown: true,
			title: 'Turn your idea into clickable prototype.<div><b>It’s your MVP.</b></div>',
			description:
				'Focus on the speed to market to validate your traction fast.<div>Here are the few apps that we’ve built.</div>'
		}
	},
	{
		name: 'Section with background',
		section: {
			columns: 1,
			items: [],
			type: 'click',
			renderType: 'grid',
			isShown: true,
			title: 'Want us to manage your SMM accounts, sites, and apps further?',
			description: 'Subscribe to our content support, starting from $1K per month',
			interactiveRenderType: 'link',
			interactiveAnswers: [],
			answersResults: [],
			ctaExplainer: '',
			actionType: 'success',
			varName: '',
			isUrlButton: true,
			callToActionText: 'Subscribe',
			url: 'https://cal.com/team/salt-and-bold/intro-call',
			className: '',
			isGlowing: false,
			bgImageUrl:
				'https://images.unsplash.com/photo-1465146633011-14f8e0781093?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDkxNzF8MHwxfHNlYXJjaHw1fHxwYXBlciUyMHBhdHRlcm4lMjBkYXJrfGVufDB8fHx8MTcwMTI4Mzg3MXww&ixlib=rb-4.0.3&q=80&w=1080'
		}
	},
	{
		name: 'Message',
		section: {
			columns: 1,
			items: [],
			type: 'click',
			renderType: 'grid',
			isShown: true,
			title: 'COMA Dragons‍ <div><i>at your </i> <b>service</b></div>',
			description:
				'We are a team of creative, detail-oriented copywriters, marketers, video makers, and designers who just love to make startups stand out among the piles of similar products and shine in style.That’s why we’re bold and fierce like dragons who help your startup to wake from a content marketing (CoMa) coma.We also believe in the build-in-public approach and will guide you through it.Are you ready to turn your startup into success?',
			className: '',
			isTitleLeft: true,
			bgImageUrl: null,

			imgMaxWidth: 0,
			isHugeTitle: false,
			isGlowing: false,
			interactiveRenderType: 'link',
			url: '',
			interactiveAnswers: [],
			answersResults: [],
			ctaExplainer: '',
			actionType: 'success',
			varName: '',
			isUrlButton: true,
			callToActionText: "Let's talk content"
		}
	},
	{
		name: 'Single Testimonial',
		section: {
			items: [
				{
					title: 'Lera, Momentum',
					description: `Momentum is awesome! Finally I can dig up Webflow and let the clients edit their content with ease!`,
					imageUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1703613793945-image.png'
				}
			],
			renderType: 'testimonials'
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
	}
];

let store = writable(sections);

export default store;

export let cloneSection = (section) => {
	return _.cloneDeep({
		...section,
		items: (section.items || []).map((item) => ({
			...item,
			id: uuidv4()
		})),
		id: uuidv4()
	});
};

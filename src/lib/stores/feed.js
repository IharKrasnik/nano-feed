import { writable } from 'svelte/store';

const feed = writable([
	{
		user: {
			username: 'Igor Krasnik',
			avatarUrl: 'https://pbs.twimg.com/profile_images/1552679907989274625/wuO6r46C_400x400.jpg'
		},
		title: 'The 3 approaches to solve any problem',
		content: `We face new issues daily.
You can't postpone decisions forever so you forced to take action.
Some actions are based just on your emotions and the gut feeling.
But there's a better way to decide. 
`,
		url: 'https://nanohq.co/solve-problems',
		source: 'rebel',
		createdOn: new Date()
	},
	{
		user: {
			username: 'Dmitry Schetnikovich',
			avatarUrl:
				'https://media.licdn.com/dms/image/D4E03AQGaqp3WKB-Xfg/profile-displayphoto-shrink_800_800/0/1669679931291?e=1677715200&v=beta&t=E6StL-DWQYF94r0ijfiLVVuiZhkClvhNHUB7OYnatC0'
		},
		content: `The best way for the CEO to lead the company?

An internal podcast.
    
I've recorded 130 hours during the last 3 years.
    
I called it CEO Evening Show (CEOES).
    
Here's what I do every Thursday at 6 PM: 
`,
		url: 'https://twitter.com/dmschetnikovich/status/1606081025032933376',
		source: 'twitter',
		createdOn: new Date()
	},
	{
		user: {
			username: 'Kate Novoselova',
			avatarUrl:
				'https://media.licdn.com/dms/image/D4D03AQFz7s-hwelhyw/profile-displayphoto-shrink_800_800/0/1670890643889?e=1677715200&v=beta&t=CK7K9vEKXWGgXGoXyDPnGwR_uZ_YiT6NzrVVBoC2f6g'
		},
		content:
			'It turns out that convincing a startup founder to spend $10k on idea validation is more difficult than pouring $30k, $60k, or even $100k into an MVP.',
		attachments: [
			{
				type: 'image',
				url: 'https://media.licdn.com/dms/image/C4D22AQHia6KF1d8Lkg/feedshare-shrink_1280/0/1667988662056?e=1674691200&v=beta&t=FygqglYULOGnjpDY1kMm5xSuT1xhuoxm65YOJx3gcFU'
			}
		],
		url: 'https://www.linkedin.com/posts/kate-n_it-turns-out-that-convincing-a-startup-founder-activity-6996051523533201409-I5BP?utm_source=share&utm_medium=member_desktop',
		source: 'linkedin'
	},
	{
		user: {
			username: 'Victoria Antonovich',
			avatarUrl:
				'https://media.licdn.com/dms/image/C4E03AQHlePTRWwMCxg/profile-displayphoto-shrink_800_800/0/1640162220021?e=1677715200&v=beta&t=xq8nzoh_of9MaLDbueiKrvABRtb64FcWBTnlAKrELf4'
		},
		content:
			'After 6 months of brainstorms, negotiations, pivots, inspiration vs despair, the journey finally starts. Excited!',
		attachments: [
			{
				type: 'image',
				url: 'https://media.licdn.com/dms/image/sync/C4D27AQGhaqvJvwU9dw/articleshare-shrink_800/0/1671042332678?e=1672592400&v=beta&t=SRINZKGQdMSayFLnURUaVQybbzR2tin_PtwwbntXtqk'
			}
		],
		url: 'https://www.linkedin.com/posts/victoria-antonovich-4a48311b5_altos-hangout-app-activity-7008581892794912769-WuRm?utm_source=share&utm_medium=member_desktop',
		source: 'linkedin'
	}
]);

export default feed;

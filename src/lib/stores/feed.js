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
Some actions are based just on your emotions and the gut feeling. It's rather hit or miss.
But there's a better way to decide. 
`,
		url: 'https://nanohq.co/solve-problems',
		createdOn: new Date()
	},
	{
		user: {
			username: 'Dmitry Schetnikovich',
			avatarUrl:
				'https://media.licdn.com/dms/image/D4E03AQGaqp3WKB-Xfg/profile-displayphoto-shrink_800_800/0/1669679931291?e=1677715200&v=beta&t=E6StL-DWQYF94r0ijfiLVVuiZhkClvhNHUB7OYnatC0'
		},
		title: 'The 3 approaches to solve any problem',
		content: `
    The best way for the CEO to lead the company?

    An internal podcast.
    
    I've recorded 130 hours during the last 3 years.
    
    I called it CEO Evening Show (CEOES).
    
    Here's what I do every Thursday at 6 PM: 
`,
		url: 'https://nanohq.co/solve-problems',
		createdOn: new Date()
	}
]);

export default feed;

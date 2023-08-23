import { writable } from 'svelte/store';
import _ from 'lodash';

const whatToWriteAbout = [
	{
		name: '🧑‍🎨 Create',
		questions: [`What you've done today?`, `What you've created`, `What's in your calendar?`],
		recommended: { screenshots: true, demo: true },
		examples: [
			{
				text: 'Here’s the demo of the new feature. It helps X people to solve Y problem'
			},
			{
				text: 'I was on 5 calls today. Exhausted'
			},
			{
				text: `I’ve interviewed customer. Learned a lot. Here’s key takeaways`
			}
		]
	},
	{
		name: '📢 Publish',
		questions: ['What did you publish?', 'Why you published it and for whom?', 'How to use it?'],
		examples: [
			{
				text: 'I’ve just published article on how to solve Y problem. Check it out'
			},
			{
				text: 'We’ve just released a feature X. Try it out and let us know your feedback'
			},
			{
				text: `My post on Medium went viral and got 100 comments`
			},
			{
				text: 'Today I was banned at subreddit Y. Not sure what rules I violated'
			}
		]
	},
	{
		name: '😅 Challenge Yourself',
		questions: [
			'What are you going do that you haven’t done before?',
			'What things scare you?',
			'What are your short-term and long-term goals?'
		],
		examples: [
			{
				text: 'I’ll get 100 users in 30 days'
			},
			{
				text: 'I’ll tweet 10 times daily for the next 7 days and let you know the results'
			},
			{
				text: `I’ll send 100 cold emails to VC funds in 7 days`
			},
			{
				text: 'Today I was banned at subreddit Y. Not sure what rules I violated'
			}
		]
	},
	{
		name: '🦸‍♂️ Act',
		questions: [
			'What big decisions did you make?',
			'What long-time issue that bothered you solved?',
			'What decision can help others in similar situation?'
		],
		examples: [
			{
				text: 'Our site lacks trust. We need to focus case study early'
			},
			{
				text: 'We’ve decided to change our release cycle from 1 week to 1 day. Here’s why'
			},
			{
				text: `Twitter ad didn’t work; testing facebook now”`
			}
		]
	},
	{
		name: '😰 Fail',
		questions: [
			'What mistake did you make?',
			'What you feel awkward about?',
			'How would you approach some issue differently?',
			'What lessons you learned from mistakes?'
		],
		examples: [
			{
				text: 'I’ve dropped production database of a live product. Never since then though.'
			},
			{
				text: 'I promised to deliver product too fast but I failed. Here’s how we solved it and you can too'
			},
			{
				text: `I’ve paid $10k+ to consultants but they haven’t delivered anything. We’ll change the way we onboard consultants now`
			}
		]
	},

	{
		name: '🎉 Win',
		questions: [
			'What you feel great about?',
			'What you shared in private with your close friends?',
			'What specific numbers did you reach'
		],
		examples: [
			{
				text: `I've got my first user 🥳`
			},
			{
				text: `Finally, we've fixed that annoying bug and guess what — our conversion rate increased 13% 📈`
			},
			{
				text: `I'm tweeting for 15 days 🕺`
			}
		]
	},

	{
		name: '🤓 Learn',
		questions: [
			'What doubts do you feel?',
			'What things you realised you didn’t do right?',
			'What issues/blockers do you have right now?'
		],
		examples: [
			{
				text: `Alex shown me a cool tool to create nice screenshots. Will use it from now on!`
			},
			{
				text: `I’ve chatted with James and figured out our onboarding is terrible. Going to simplify it! now`
			},
			{
				text: `I’ve just watched an interview with Sam Parr. Here is how to research reddit like OG:`
			},
			{
				text: `I’ve never done SEO 😅. How do I start?`
			},
			{
				text: `We launch on ProductHunt in 10 days! Never did it before. How do I prepare? Please help!`
			}
		]
	},
	{
		name: '🕺 Have Fun',
		questions: [
			'What activities you enjoyed and want to repeat? (not necessarily work-related)',
			'What joke stuck in your head? ',
			'What movie or song gave you ideas?'
		],
		examples: [
			{
				text: `I enjoyed making this hilarious rap song with Dan`
			},
			{
				text: `I’ve met with Lera, we’ve just laughed for a good hour and haven’t figured out anything, but I feel lots of energy now`
			},
			{
				text: `We’ve went to the beach with Stefan and his dog. The weather was windy but that’s what it makes it even cooler`
			}
		]
	},
	{
		name: '👏 Help and support others',
		questions: [
			'What did you do for others to help them?',
			'What can help others?',
			'What cool people you can introduce to each other?'
		],
		examples: [
			{
				text: `Here’s the roast of the main page for George! We’ve polished value proposition and created a UX mockup to visualise the idea. Good luck with the launch!`
			},
			{
				text: `I just spoke with Andrew and he’s looking for a decent designers. Who’s ready to prove their grit?`
			},
			{
				text: `Hey John, remember I told you about Andrew? I think you are a great match and should try to do something together! Would love to help to schedule an intro call if needed`
			}
		]
	},
	{
		name: '🫶 Chat and meet new people. Get friends. Win “fans”',
		questions: [
			'What awesome people did you meet?',
			'Who would you love to meet soon?',
			'Who do you value and why?',
			'How did they help you?',
			'How you can help them?'
		],
		examples: [
			{
				text: `Thank you Yucheng for using Momentum early and helping us to fix bugs`
			},
			{
				text: `Hey Joe, I’m also into content and I see you’re much ahead. Appreciate your works, especially <something specific>. Can you please take a look at my thread and say what I can improve?`
			},
			{
				text: `Interesting, Andrew. We also tried to apply this process but it didn’t work for us because we weren’t ready. Excited to hear how it’s going for you`
			},
			{
				text: 'I’ve just met with Stefan in real-life and the dude is super funny. Here’s the photo of his dog'
			},
			{
				text: 'Finally, we’ve had a call with Dan! It was weird to chat for the first time after the long time of tweetings'
			},
			{
				text: 'I’m meeting with Jason tomorrow who founded 3 startups and raised $10M+. What should I ask him'
			}
		]
	}
];

let store = writable(whatToWriteAbout);

export let sampleExample = _.sample(
	_.reduce(
		whatToWriteAbout,
		(acc, contentType) => {
			return [...acc, ...contentType.examples];
		},
		[]
	)
);

export default store;

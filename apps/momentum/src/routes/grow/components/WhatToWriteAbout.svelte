<script>
	import FeedItem from '$lib/components/FeedItem.svelte';
	import currentUser, { isLoading as isUserLoading } from 'lib/stores/currentUser';

	const contentTypes = [
		{
			name: 'Create',
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
			name: 'Publish',
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
			name: 'Challenge yourself',
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
		}
	];

	let activeContentType = contentTypes[0];
</script>

<div class="flex p-8">
	<div class="shrink-0 mr-8">
		{#each contentTypes as contentType}
			<div
				on:click={() => (activeContentType = contentType)}
				class="cursor-pointer p-4 rounded-lg mb-2 w-[250px]"
				class:bg-zinc-400={activeContentType.name === contentType.name}
				class:text-black={activeContentType.name === contentType.name}
				style="border: 1px rgba(255, 255, 255, .3) solid;"
			>
				{contentType.name}
			</div>
		{/each}
	</div>

	<div>
		<div class="mb-8">
			<h2>{activeContentType.name} — Questions</h2>
			{#each activeContentType.questions as question}
				<h3>• {question}</h3>
			{/each}
		</div>
		<h2 class="mb-2">Examples / Templates</h2>
		{#each activeContentType.examples as example}
			<FeedItem
				feedItem={{ content: example.text, creators: [$currentUser], publishedOn: new Date() }}
			/>
		{/each}
	</div>
</div>

<script>
	import _ from 'lodash';
	import { fade } from 'svelte/transition';
	import FeedItem from '$lib/components/FeedItem.svelte';
	import currentUser, { isLoading as isUserLoading } from 'lib/stores/currentUser';
	import RenderUrl from 'lib/components/RenderUrl.svelte';

	export let onSelected = ({ text }) => {};

	import whatToWriteAbout from '$lib/stores/whatToWriteAbout';

	let activeContentType = _.sample($whatToWriteAbout);
</script>

<div class="flex">
	<div class="shrink-0 bg-zinc-1000 p-8">
		{#each $whatToWriteAbout as contentType}
			<div
				on:click={() => (activeContentType = contentType)}
				class="cursor-pointer p-4 rounded-lg mb-2 w-[250px] transition"
				class:bg-zinc-700={activeContentType?.name === contentType.name}
				style="border: 1px rgba(255, 255, 255, .3) solid;"
			>
				{contentType.name}
			</div>
		{/each}

		<div
			class="mt-16 p-4 rounded-xl transition cursor-pointer"
			class:hover:bg-yellow-800={activeContentType}
			class:bg-yellow-900={activeContentType}
			class:bg-green-800={!activeContentType}
			on:click={() => (activeContentType = null)}
		>
			🧠 PRO TIP: Don't miss a day
		</div>
	</div>

	{#if activeContentType}
		<div class="p-8 bg-zinc-900">
			<div class="mb-8">
				<h2>{activeContentType.name}</h2>
				<h2 class="mt-4">Questions</h2>
				{#each activeContentType.questions as question}
					<h3>• {question}</h3>
				{/each}
			</div>
			<h2 class="mb-2">Examples / Templates</h2>
			{#each activeContentType.examples as example}
				<FeedItem
					hideLikes={true}
					feedItem={{ content: example.text, creators: [$currentUser], publishedOn: new Date() }}
					onClick={() => onSelected(example)}
				/>
			{/each}
		</div>
	{:else}
		<div class="p-8 bg-zinc-900 w-full">
			<div in:fade={{}} class=" w-full">
				<h2 class="mb-8">🦸 PRO: Don't miss a day</h2>

				<h2 class="mb-2">Let the true magic happen</h2>
				<h3 class="mb-2">
					Hi, I'm <a href="https://twitter.com/that_igor_" class="underline" target="_blank">Igor</a
					> and I ask people to post daily. Here's why:
				</h3>

				<RenderUrl
					class="w-full"
					url="https://www.youtube.com/watch?v=W2SExKkVx7M&ab_channel=IgorKrasnik"
				/>

				<h2 class="mt-16 mb-2">Make it your "Homework for life"</h2>
				<h3 class="opacity-80 mb-2">
					Matthew Dicks is an author of "Storyworthy" — one of the top practical book on
					storytelling
				</h3>

				<RenderUrl url="https://www.youtube.com/watch?v=x7p329Z8MD0" />

				<h2 class="mt-16 mb-2">Develop an "atomic habit"</h2>
				<h3 class="mb-2">Atomic habits is a "self-help" bestseller book</h3>
				<RenderUrl
					url="https://www.youtube.com/watch?v=PZ7lDrwYdZc&pp=ygUNYXRvbWljIGhhYmJpdA%3D%3D"
				/>

				<h3>Should we coin a "Nano" habbit? 🤔</h3>
			</div>
		</div>
	{/if}
</div>

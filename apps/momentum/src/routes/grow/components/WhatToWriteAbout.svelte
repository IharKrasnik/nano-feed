<script>
	import _ from 'lodash';
	import FeedItem from '$lib/components/FeedItem.svelte';
	import currentUser, { isLoading as isUserLoading } from 'lib/stores/currentUser';

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
				class:bg-zinc-700={activeContentType.name === contentType.name}
				style="border: 1px rgba(255, 255, 255, .3) solid;"
			>
				{contentType.name}
			</div>
		{/each}

		<div class="mt-16 p-4 rounded-xl bg-yellow-800 hover:bg-yellow-700 transition cursor-pointer">
			🧠 PRO TIP: Don't miss a day
		</div>
	</div>

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
</div>

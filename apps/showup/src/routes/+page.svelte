<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { GOOGLE_LOGIN_URL } from 'lib/env';
	import { get, post, put, del } from 'lib/api';
	import currentUser from 'lib/stores/currentUser';
	import tooltip from 'lib/use/tooltip';
	import clickOutside from 'lib/use/clickOutside';
	import BrowserFrame from 'lib/components/BrowserFrame.svelte';
	import FileInput from 'lib/components/FileInput.svelte';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';

	let tasks = [];

	let newTask = '';

	let streamSlug = 'show-up-daily';

	let journalFeed = [];

	let addTask = () => {
		if (newTask.trim()) {
			tasks = [newTask, ...tasks];
			newTask = '';
		}
	};

	let onKeydown = (e) => {
		if (e.key === 'Enter') {
			addTask();
			e.preventDefault();
		}
	};

	let isShown = false;

	onMount(() => {
		isShown = true;
	});

	const getFeed = async () => {
		let feedResult = await get('feed', {
			projectSlug: streamSlug,
			isMyOnly: true
		});

		journalFeed = feedResult.results;
	};

	let date = moment();
	let title = moment(date).format('dddd, MMM DD');

	const submitJournalEntry = async () => {
		let date = new Date();

		if (newTask) {
			addTask();
		}

		let newEntry = await post('feed', {
			title,
			projects: [{ slug: streamSlug }],
			content: `${tasks.map((task) => `✔️ ${task}`).join('\n')}` + '\n' + 'Report #buildinpublic',
			meta: {
				date: moment(date).format('MMM DD, YYYY'),
				tasks
			}
		});

		journalFeed = [newEntry, ...journalFeed];
		tasks = [];
	};

	let removeFeedItem = async (feedId) => {
		await del(`feed/${feedId}`);

		journalFeed = journalFeed.filter((f) => f._id !== feedId);
	};

	getFeed();
</script>

<div class="container max-w-[700px] mx-auto">
	{#if isShown}
		<div class="blob bg-[#edeff6] p-16 mt-8" in:fly={{ y: 50, duration: 150 }}>
			<div class="mb-4 opacity-80 text-lg">
				{title}
			</div>
			<h1 class="text-3xl font-bold">What have you achieved today?</h1>

			<div class="my-8">
				<textarea
					class="w-full text-lg"
					rows="1"
					placeholder="Describe one achievement shortly"
					bind:value={newTask}
					on:keydown={onKeydown}
				/>
			</div>

			<div class="mb-8">
				{#each tasks as task}
					<div class="mb-2">
						✔️ {task}
					</div>
				{/each}
			</div>

			<button class="mt-4 text-lg cursor-pointer" on:click={submitJournalEntry}>Publish</button>
		</div>
	{/if}

	<div class="my-8">
		<img
			class="max-w-[150px] mx-auto my-8"
			src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1693763239679-image.png"
		/>

		{#if !$currentUser && isShown}
			<div class="w-full flex justify-center" in:fade={{ delay: 300 }}>
				<a
					class="button"
					style="background: none; border: 3px #555 solid; color: #555;"
					href={GOOGLE_LOGIN_URL}
					>Log in to save and publish your diary
				</a>
			</div>

			<img
				class="max-w-[150px] mx-auto my-8"
				src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1693763239679-image.png"
			/>
		{/if}

		{#each journalFeed as feedItem (feedItem._id)}
			<div class="w-full flex justify-between" in:fade>
				<h3 class="text-2xl font-bold">{feedItem.title}</h3>
				<div class="cursor-pointer" on:click={() => removeFeedItem(feedItem._id)}>🗑</div>
			</div>

			<div class="my-4 whitespace-pre-wrap text-lg opacity-70">
				{feedItem.content.replace('Report #buildinpublic', '')}
			</div>

			<img
				class="max-w-[150px] mx-auto"
				src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1693763239679-image.png"
			/>
		{/each}
	</div>
</div>

<style>
	.blob {
		border-radius: 40px;
	}
</style>

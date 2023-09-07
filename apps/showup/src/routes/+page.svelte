<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { GOOGLE_LOGIN_URL, TWITTER_LOGIN_URL } from 'lib/env';
	import { get, post, put, del } from 'lib/api';
	import currentUser from 'lib/stores/currentUser';
	import tooltip from 'lib/use/tooltip';
	import clickOutside from 'lib/use/clickOutside';
	import Modal from 'lib/components/Modal.svelte';
	import Button from 'lib/components/Button.svelte';
	import FileInput from 'lib/components/FileInput.svelte';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';

	import lastEmoji from '$lib/stores/lastEmoji';

	import Twitter from 'lib/icons/twitter.svelte';

	onMount(async () => {
		await import('emoji-picker-element/svelte');
	});

	let tasks = [];

	let newTask = { text: '', emoji: $lastEmoji };

	let isToday = true;
	let isYesterday = false;

	let streamSlug = 'show-up-daily';

	let journalFeed = [];

	let addTask = () => {
		if (newTask.text.trim()) {
			tasks = [...tasks, { ...newTask, emoji: $lastEmoji }];
			newTask = { ...newTask, text: '' };
		}
	};

	let removeTask = (task) => {
		tasks = tasks.filter((t) => t !== task);
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

	let date = moment().startOf('day');

	let formatDate = (d) => moment(date).format('dddd, MMM DD');

	let goBack = () => {
		date = date.clone().subtract(1, 'days');

		if (isToday) {
			isYesterday = true;
			isToday = false;
		} else if (isYesterday) {
			isYesterday = false;
		}
	};

	let goForward = () => {
		date = date.clone().add(1, 'days');

		if (isYesterday) {
			isToday = true;
			isYesterday = false;
		} else {
			isYesterday = date.format('YYYY-MM-DD') === moment().subtract(1, 'day').format('YYYY-MM-DD');
		}
	};

	const submitJournalEntry = async () => {
		if (newTask) {
			addTask();
		}

		let newEntry = await post('feed', {
			title: formatDate(date),
			projects: [{ slug: streamSlug }],
			content:
				`${moment(date).format('MMM D')}, #buildinpublic report.` +
				'\n\n' +
				`${tasks.map((task) => `${task.emoji || $lastEmoji} ${task.text}`).join('\n')}`,
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

	let getLength = () => {
		let message = `${moment(date).format('MMM D')}, #buildinpublic report`;
		message += [...tasks, newTask].map((t) => `${t.emoji || `✔️`} ${t.text || 's'}`).join('\n');
		return message.length;
	};

	let msgLength;

	$: msgLength = getLength(newTask, tasks);

	let twitterModalFeedItem = null;

	let syncToTwitterNow = async (feedItem) => {
		let twitterData = await post(`feed/${feedItem._id}/twitter`);

		journalFeed = journalFeed.map((f) => {
			if (f._id === feedItem._id) {
				f.twitterData = twitterData;
			}

			return f;
		});

		twitterModalFeedItem = null;
	};

	let syncToTwitter = async (feedItem) => {
		if (!$currentUser) {
			goto(GOOGLE_LOGIN_URL);
		}

		if ($currentUser.oauth.twitter) {
			twitterModalFeedItem = feedItem;
		} else {
			const { url } = await get(TWITTER_LOGIN_URL);
			window.document.location.href = url;
		}
	};

	let scheduleTwitter = async (feedItem) => {
		let syncToTwitterOn = moment().add(12, 'hours').toDate();

		await post(`feed/${feedItem._id}/twitter`, {
			syncToTwitterOn
		});

		journalFeed = journalFeed.map((f) => {
			if (f._id === feedItem._id) {
				f.syncToTwitterOn = syncToTwitterOn;
			}

			return f;
		});

		twitterModalFeedItem = null;
	};
</script>

{#if twitterModalFeedItem}
	<Modal isShown onClosed={() => (twitterModalFeedItem = null)} maxWidth={600}>
		<div class="p-8">
			<h2 class="text-lg font-bold">Share update to X</h2>

			<div class="mt-8 flex">
				<Button onClick={() => syncToTwitterNow(twitterModalFeedItem)} class="mr-2"
					>✅ Sync Now</Button
				>
				{#if !twitterModalFeedItem.syncToTwitterOn}
					<Button onClick={() => scheduleTwitter(twitterModalFeedItem)}
						>⏰ Schedule in 12 hours</Button
					>
				{/if}
			</div>
		</div>
	</Modal>
{/if}

<div class="container max-w-[700px] mx-auto">
	<div class="mt-16 p-4 sm:p-0">
		<div class="relative mb-4 opacity-80 text-lg flex">
			<div
				class="absolute left-0 top-0 pr-2 cursor-pointer opacity-70"
				style="transform: translateX(-100%);"
				on:click={goBack}
			>
				←
			</div>
			<div>
				{formatDate(date)}
			</div>

			{#if !isToday}
				<div class="pl-2 cursor-pointer opacity-70" on:click={goForward}>→</div>
			{/if}
		</div>

		<h2 class="text-3xl font-bold">
			What have you achieved {isToday
				? 'today'
				: isYesterday
				? 'yesterday'
				: date.format('ddd, MMM DD')}?
		</h2>

		<div class="my-8">
			<textarea
				class="w-full text-lg"
				rows="1"
				placeholder="Describe one achievement shortly"
				autofocus
				bind:value={newTask.text}
				on:keydown={onKeydown}
			/>

			<div class="flex justify-end mt-4">
				<div>
					{msgLength} / 280
				</div>
			</div>
		</div>
	</div>

	{#if tasks.length}
		<div
			class="bg-[#edeff6] sm:mx-0 sm:my-8 mx-4 my-8 rounded-xl sm:rounded-[40px] p-8 sm:p-16 mt-8"
		>
			<div class="mb-8">
				{#if tasks.length}
					<div class="mb-4">
						{moment(date).format('MMM D')}, #buildinpublic report. <br />
					</div>

					{#each tasks as task}
						<div class="flex mb-2 w-full justify-between">
							<div class="flex">
								<EmojiPicker
									onUpdated={(icon) => {
										$lastEmoji = icon;
									}}
									isNoCustom
									bind:icon={task.emoji}
									class="mr-2"
								/>
								{task.text}
							</div>

							<div class="cursor-pointer" on:click={() => removeTask(task)}>🗑</div>
						</div>
					{/each}
				{/if}
			</div>

			<button class="mt-4 text-lg nohover" on:click={submitJournalEntry} disabled={!tasks.length}
				>Publish</button
			>
		</div>
	{/if}

	<div class="my-8 p-4 sm:p-0">
		<img
			class="max-w-[150px] mx-auto my-8"
			src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1693763239679-image.png"
		/>

		{#if !$currentUser && isShown}
			<!-- <div class="w-full flex justify-center" in:fade={{ delay: 300 }}>
				<a
					class="button"
					style="background: none; border: 3px #555 solid; color: #555;"
					href={GOOGLE_LOGIN_URL}
					>Log in to save and publish your diary
				</a>
			</div> -->

			<!-- <img
				class="max-w-[150px] mx-auto my-8"
				src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1693763239679-image.png"
			/> -->
		{/if}

		{#each journalFeed as feedItem (feedItem._id)}
			{#if !feedItem.twitterData}
				<div
					class="flex items-center mb-4 grayscale hover:grayscale-0 cursor-pointer transition"
					on:click={() => syncToTwitter(feedItem)}
				>
					<div class="w-[15px] mr-2"><Twitter /></div>

					{#if !feedItem.syncToTwitterOn}
						Sync to X
					{:else}
						Scheduled {moment(feedItem.syncToTwitterOn).fromNow()}
					{/if}
				</div>
			{/if}

			<div class="w-full flex justify-between" in:fade>
				<h3 class="text-2xl font-bold flex items-center">
					{feedItem.title}
					{#if feedItem.twitterData}
						<a
							class="block ml-2"
							href="https://twitter.com/nano_fund/status/{feedItem.twitterData.id}"
							target="_blank"
						>
							<div class="w-[25px]">
								<Twitter />
							</div>
						</a>
					{/if}
				</h3>

				<div class="cursor-pointer" on:click={() => removeFeedItem(feedItem._id)}>🗑</div>
			</div>
			{#if feedItem.twitterData}{/if}

			<div class="my-4 whitespace-pre-wrap text-lg">
				{feedItem.content.replace('Report #buildinpublic', '')}
			</div>

			<img
				class="max-w-[150px] mx-auto my-4"
				src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1693763239679-image.png"
			/>
		{/each}
	</div>
</div>

<style>
	.blob {
		/* border-radius: 40px; */
	}
</style>

<script>
	import { postFile } from 'lib/api';
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
	import Avatar from 'lib/components/Avatar.svelte';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import ContentEditable from 'lib/components/ContentEditable.svelte';
	import TrashIcon from '$lib/icons/trash.svelte';
	import EnterIcon from '$lib/icons/enter.svelte';
	import ArrowIcon from '$lib/icons/arrow.svelte';
	import lastEmoji from '$lib/stores/lastEmoji';
	import creators from '$lib/stores/creators';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';

	import Twitter from 'lib/icons/twitter.svelte';

	onMount(async () => {
		await import('emoji-picker-element/svelte');
	});

	let tasks = [];

	let newTask = { text: '', emoji: $lastEmoji };
	let imageUrl = null;

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
			attachments: imageUrl ? [{ url: imageUrl }] : null,
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
		imageUrl = null;
		showSuccessMessage('👏 The update was published. \n See you tomorrow!');
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

	let uploadFile = async (file) => {
		if (!$currentUser) {
			showErrorMessage('Please log in to upload files');
		} else {
			const newFile = await postFile('files', file);

			let fileUrl = newFile.url.startsWith('http') ? newFile.url : `https://${newFile.url}`;
			imageUrl = fileUrl;
		}
	};

	const pasteImage = (e) => {
		Array.from(e.clipboardData.files).forEach(async (file) => {
			if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
				uploadFile(file);
			} else if (file.type.startsWith('text/')) {
				// const textarea = document.createElement('textarea');
				// textarea.value = await file.text();
				// document.body.append(textarea);
			}
		});
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
		<div class="relative flex items-center mb-4 opacity-80 text-lg flex mx-8 sm:mx-0">
			<div
				class="absolute left-0 top-0 pr-2 cursor-pointer opacity-70"
				style="transform: translateX(-100%);"
				on:click={goBack}
			>
				<ArrowIcon />
			</div>

			<div class="mt-[-1px]">
				{formatDate(date)}
			</div>

			{#if !isToday}
				<div class="pl-2 cursor-pointer opacity-70" on:click={goForward}>
					<div class="rotate-180">
						<ArrowIcon />
					</div>
				</div>
			{/if}
		</div>

		<h2 class="text-3xl font-bold">
			{#if $currentUser}
				Hi, {$currentUser.fullName.split(' ')[0]}!
			{/if}
			What have you achieved?

			<!-- {isToday ? 'today' : isYesterday ? 'yesterday' : date.format('ddd, MMM DD')}? -->
		</h2>
		<div>
			<div class="mt-12 text-lg">
				{moment(date).format('MMM D')}, #buildinpublic report. <br />
			</div>

			<div class="mb-8 mt-4 sm:mx-0 mx-8">
				{#each tasks as task, i}
					<div class="relative flex items-center">
						<div
							class="absolute top-0 left-0"
							style="top: 50%; left: -16px; transform: translateX(-100%) translateY(-50%); z-index: {20 -
								i};"
						>
							<EmojiPicker
								onUpdated={(icon) => {
									$lastEmoji = icon;
								}}
								isNoCustom
								bind:icon={task.emoji}
							/>
						</div>

						<input
							class="w-full text-lg"
							rows="1"
							placeholder="Describe one achievement shortly"
							bind:value={task.text}
							on:keydown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault();
								}
							}}
						/>

						<div
							class="absolute top-0 right-0 cursor-pointer"
							style="right: -16px; top: 50%; transform: translateX(100%) translateY(-50%);"
							on:click={() => removeTask(task)}
						>
							<TrashIcon />
						</div>
					</div>
				{/each}
				<div class="relative flex items-center">
					<div
						class="absolute top-0 left-0"
						style="top: 50%; left: -16px; transform: translateX(-100%) translateY(-50%); z-index: 21;"
					>
						<EmojiPicker
							onUpdated={(icon) => {
								$lastEmoji = icon;
							}}
							isNoCustom
							bind:icon={newTask.emoji}
						/>
					</div>

					<input
						class="w-full text-lg"
						rows="1"
						placeholder="Describe one achievement shortly..."
						autofocus
						on:paste={pasteImage}
						bind:value={newTask.text}
						on:keydown={onKeydown}
					/>
				</div>

				{#if newTask.text}
					<div
						in:fade
						class="flex items-center text-sm bg-[#e4e4e4] text-[#646972] mt-8 rounded flex-0 px-2 py-1 cursor-pointer"
						on:click={addTask}
						style="width: max-content;"
					>
						<EnterIcon />
						<div class="ml-2">Add {tasks.length ? 'one more' : ''} achievement</div>
					</div>
				{/if}

				{#if !newTask.text || imageUrl}
					<div class="mt-8">
						{#if imageUrl}
							<div class="relative max-w-[300px] rounded-lg">
								<div
									class="absolute top-2 right-2 p-4 rounded-full bg-white cursor-pointer opacity-70 transition hover:opacity-100"
									on:click={() => {
										imageUrl = null;
									}}
								>
									<svg
										viewBox="0 0 24 24"
										width="15"
										height="15"
										stroke="#111"
										stroke-width="2"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="css-i6dzq1"
										><polyline points="3 6 5 6 21 6" /><path
											d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
										/><line x1="10" y1="11" x2="10" y2="17" /><line
											x1="14"
											y1="11"
											x2="14"
											y2="17"
										/></svg
									>
								</div>
								<img src={imageUrl} class="w-full" />
							</div>
						{:else}
							<div class="group">
								<label
									for="file-upload"
									in:fade
									class="flex items-center text-sm bg-[#e4e4e4] text-[#646972]rounded flex-0 px-2 py-1 cursor-pointer font-normal"
									on:click={addTask}
									style="width: max-content;"
								>
									<svg
										viewBox="0 0 24 24"
										width="15"
										height="15"
										stroke="currentColor"
										stroke-width="2"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="css-i6dzq1"
										><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline
											points="17 8 12 3 7 8"
										/><line x1="12" y1="3" x2="12" y2="15" /></svg
									>
									<div class="ml-2">Attach Image</div>
									<input
										id="file-upload"
										type="file"
										hidden
										on:click={(evt) => {
											if (!$currentUser) {
												showErrorMessage('Please log in to upload files');
												evt.preventDefault();
											}
										}}
										on:change={(evt) => uploadFile(evt.target?.files[0])}
									/>
								</label>
								<div class="group-hover:opacity-80 opacity-0 transition text-sm">
									Tip: you can just paste the image from clipboard to the task input
								</div>
							</div>
						{/if}
					</div>
				{/if}

				<div class="flex justify-end mt-4">
					<div>
						{msgLength} / 280
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mx-4 sm:mx-0">
		<button
			class="text-lg nohover sm:w-auto w-full "
			on:click={submitJournalEntry}
			disabled={!tasks.length && !imageUrl}>Publish</button
		>
		<!-- <a href="/long" class="ml-4 cursor-pointer">Write article</a> -->
	</div>

	{#if journalFeed.length}
		<div class="flex flex-col justify-between items-center mt-16">
			<h1 class="text-2xl text-center font-bold">My Journal</h1>
		</div>
	{/if}

	<div
		class="mt-2 fixed bottom-0 mb-8"
		style="left: 50%; transform: translateX(-50%); z-index: 20;"
	>
		<a
			href="/explore"
			class="button flex justify-between w-full ml-4 bg-[#f8f9fb] mx-auto opacity-80 hover:opacity-100 transition w-full"
			style="background: #f8f9fb;; border: 3px #555 solid; color: #555;"
		>
			<div class="mr-2 shrink-0">Explore Journals</div>

			<div class="flex shrink-0">
				{#each _.take($creators, 4) as creator}
					<Avatar user={creator} class="mr-[-10px]" />
				{/each}
			</div>
		</a>
	</div>

	<div class="my-8 p-4 sm:p-0">
		<img
			class="max-w-[150px] mx-auto my-8"
			src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1693763239679-image.png"
		/>

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

				<div class="cursor-pointer" on:click={() => removeFeedItem(feedItem._id)}>
					<TrashIcon />
				</div>
			</div>
			{#if feedItem.twitterData}{/if}

			<div class="my-4 whitespace-pre-wrap text-lg">
				{feedItem.content.replace('Report #buildinpublic', '')}
			</div>

			{#if feedItem.attachments && feedItem.attachments[0] && feedItem.attachments[0].url}
				<img class="w-full my-4" src={feedItem.attachments[0].url} />
			{/if}

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

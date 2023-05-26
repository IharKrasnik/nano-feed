<script>
	import dayjs from 'dayjs';
	import axios from 'axios';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import { get, post, put, del, postFile } from 'lib/api';
	import autofocus from 'lib/use/autofocus';

	import AutoCompleteInput from 'lib/components/AutoCompleteInput.svelte';
	import FeedItem from '$lib/components/FeedItem.svelte';
	import IndieFeedItem from '../../[[username]]/embed-indienews/components/IndieFeedItem.svelte';
	import Loader from 'lib/components/Loader.svelte';

	import sources from '$lib/stores/sources';
	import currentUser from 'lib/stores/currentUser';
	import { browser } from '$app/environment';
	import { toast } from '@zerodevx/svelte-toast';

	export let feedItem;

	let url;
	let attachmentUrl;
	let files = [];
	let addAttachmentClicked = false;
	let urlIsLoading;

	let projects;
	let isProjectsLoading = false;
	let creators;
	let urlIsDirty = false;
	let isFullUrlEdit = false;

	let currentPage;

	const setPage = (page) => {
		if (page === 'update') {
			feedItem.source = 'momentum';
			isFullUrlEdit = true;
		} else {
			isFullUrlEdit = false;
		}

		currentPage = page;
	};

	setPage('update');

	let format = 'YYYY-MM-DDTHH:mm';

	let internalDate;

	const input = (x) => {
		internalDate = dayjs(x).format(format);
	};
	const output = (x) => {
		feedItem.publishedOn = dayjs(x, format).toDate();
		console.log('feedItem.publishedOn', feedItem.publishedOn);
	};

	$: input(feedItem.publishedOn);
	$: output(internalDate);

	let selectedUsername;

	const fetchCreators = async () => {
		const { results } = await get('creators');
		creators = results;
	};

	fetchCreators();

	const setCreator = () => {
		feedItem.creators = [creators.find((c) => c.username === selectedUsername)];
	};

	const uploadFile = async (file) => {
		const newFile = await postFile('files', file);
		files = [...files, newFile];

		if (!newFile.url.startsWith('http')) {
			newFile.url = `https://${newFile.url}`;
		}

		feedItem.attachments.push({
			type: newFile.url.includes('.mp4') || newFile.url.includes('.mov') ? 'video' : 'image',
			url: newFile.url
		});

		feedItem.attachments = [...feedItem.attachments];
	};

	const onFileUpload = async (e) => {
		return uploadFile(e.target.files[0]);
	};

	const addAttachmentUrl = () => {
		feedItem.attachments = [{ type: 'image', url: attachmentUrl }];
	};

	const onCreatorSelected = (selectedCreators) => {
		feedItem.creators = selectedCreators;
	};

	const onSourceSelected = (selectedSource) => {
		feedItem.source = selectedSource?.value;
	};

	const pasteImage = (e) => {
		Array.from(e.clipboardData.files).forEach(async (file) => {
			if (file.type.startsWith('image/')) {
				uploadFile(file);
			} else if (file.type.startsWith('text/')) {
				// const textarea = document.createElement('textarea');
				// textarea.value = await file.text();
				// document.body.append(textarea);
			}
		});
	};

	const removeAttachments = () => {
		feedItem.attachments = [];
	};
</script>

{#if urlIsLoading}
	<Loader />
{:else}
	<form class="mb-16" style="padding: 2px;">
		{#if feedItem.url || currentPage === 'update'}
			{#if isFullUrlEdit}
				<div class="mb-8">
					<label> Title </label>
					<input type="text" class="block" bind:value={feedItem.title} use:autofocus />
				</div>
				<div class="mb-8">
					<label> Content </label>
					<textarea rows="5" class="block" bind:value={feedItem.content} />
				</div>

				<div class="mb-8">
					<label>Attachments</label>

					{#if feedItem.attachments.length}
						{#each feedItem.attachments as attachment}
							<div on:click={removeAttachments}>
								{#if attachment.type === 'video'}
									<video class="max-w-[400px]" src={attachment.url} muted={true} autoplay />
								{:else}
									<img class="max-w-[400px]" src={attachment.url} />
								{/if}
							</div>
						{/each}
					{:else if addAttachmentClicked}
						<input
							type="text"
							bind:value={attachmentUrl}
							placeholder="Insert URL or paste from clipboard"
							use:autofocus
							on:paste={pasteImage}
						/>

						{#if !feedItem.attachments.length && !attachmentUrl}
							<div class="my-4">Or</div>
							<input id="fileInput" type="file" on:change={onFileUpload} />
						{:else}
							<button class="mt-4" on:click={addAttachmentUrl}> Add URL </button>
						{/if}
					{:else}
						<a
							class="cursor-pointer text-gray-400 underline"
							on:click={() => {
								addAttachmentClicked = true;
							}}
						>
							Add attachment
						</a>
					{/if}
				</div>
			{:else}{/if}

			{#if isFullUrlEdit}
				{#if currentPage !== 'update'}
					<div class="mb-8">
						<label>Published On</label>

						<input type="datetime-local" bind:value={internalDate} />
					</div>
				{/if}

				{#if $currentUser?.isAdmin && creators}
					<div class="mb-8">
						<label>Creators</label>

						<AutoCompleteInput
							onChange={onCreatorSelected}
							searchField="fullName"
							placeholder="Search creators.."
							limitItemsCount={5}
							isMulti
							bind:allSuggestions={creators}
							initialSelectedItems={feedItem.creators}
						>
							<div slot="item" let:item>
								<div class="flex items-center">
									<img src={item.avatarUrl} class="w-[40px] h-[40px] mr-2 rounded-full" />
									{item.fullName}
								</div>
							</div>
						</AutoCompleteInput>
					</div>
				{/if}
			{:else}{/if}

			<!-- <hr class="my-8" style="border-color: rgba(255, 255, 255, 0.3)"/> -->
		{/if}
	</form>
{/if}

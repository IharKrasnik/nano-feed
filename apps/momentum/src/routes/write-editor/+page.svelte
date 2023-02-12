<script>
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import FeedItemPreview from '$lib/components/FeedItemPreview.svelte';
	import Loader from '$lib/components/Loader.svelte';

	import placeholder from '$lib/use/placeholder';

	import currentUser from '$lib/stores/currentUser';

	import { page } from '$app/stores';
	import { get, postFile } from 'lib/api';

	let isLoading = true;
	let feedItem;

	let url;
	let attachmentUrl;
	let files = [];
	let addAttachmentClicked = false;
	let isArticle = false;

	let startTitle = browser ? window.history.state.title : null;

	function isValidHttpUrl(string) {
		let url;

		try {
			url = new URL(string);
		} catch (_) {
			return false;
		}
		return url.protocol === 'http:' || url.protocol === 'https:';
	}

	let urlIsLoading = false;

	const addUrl = async () => {
		urlIsLoading = true;

		try {
			const { data } = await axios({
				url: 'https://igor.npkn.net/fetch-meta-tags',
				params: { url }
			});

			feedItem.url = data.url || url;
			feedItem.embedUrl = data.embedUrl;

			feedItem.source = data.source;

			feedItem.title = data.title;
			feedItem.content = data.description;

			if (data.image) {
				feedItem.attachments = [{ type: 'image', url: data.image }];
			}

			if (data.creatorUsernames) {
				feedItem.creators = data.creatorUsernames.map((username) =>
					creators.find((c) => c.username === username)
				);
			}

			if (data.projectSlugs) {
				feedItem.projects = data.projectSlugs.map((projectSlug) =>
					projects.find((c) => c.slug === projectSlug)
				);
			}
		} finally {
			urlIsLoading = false;
		}
	};

	if (isValidHttpUrl(startTitle)) {
		url = startTitle;
	}

	onMount(() => {
		if (url) {
			addUrl();
		}
	});

	feedItem = {
		publishedOn: new Date(),
		creators: [$currentUser],
		title: (!url && startTitle) || '',
		content: '',
		longContent: '',
		url,
		source: null,
		attachments: []
	};

	let load = async () => {
		let feedItemId = $page.url.searchParams.get('feedItemId');

		if (feedItemId) {
			feedItem = await get(`feed/${feedItemId}`);
		} else {
			feedItem = {
				title: '',
				content: '',
				longContent: ''
			};
		}

		isLoading = false;
	};

	load();

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

	const pasteImage = (e) => {
		Array.from(e.clipboardData.files).forEach(async (file) => {
			if (file.type.startsWith('image/')) {
				e.preventDefault();
				uploadFile(file);
			} else if (file.type.startsWith('text/')) {
				// const textarea = document.createElement('textarea');
				// textarea.value = await file.text();
				// document.body.append(textarea);
			}
		});
	};

	const addAttachmentUrl = () => {
		feedItem.attachments = [{ type: 'image', url: attachmentUrl }];
	};

	const onFileUpload = async (e) => {
		return uploadFile(e.target.files[0]);
	};

	let onTitleChange = async () => {
		if (isValidHttpUrl(feedItem.title)) {
			url = feedItem.title;
			await addUrl();
		}
	};

	const INTRO_LIMIT_CHARS = 240;

	let introIsTooLong = false;

	let onContentChanged = () => {
		introIsTooLong = feedItem.content.length > INTRO_LIMIT_CHARS;
	};
</script>

<div class="mt-16">
	<div class="max-w-[600px] mx-auto">
		{#if !isLoading || feedItem.title}
			<div
				contenteditable
				style="font-size: 32px; font-weight: bold; font-family: Montserrat; padding-left: 0; outline: none; margin:0;"
				use:placeholder={'Title'}
				bind:innerHTML={feedItem.title}
				on:input={onTitleChange}
			/>
		{/if}

		{#if isLoading}
			<div class="w-full flex justify-center">
				<Loader />
			</div>
		{:else}
			<div
				role="textbox"
				contenteditable
				style="font-size: 20px; outline: none;"
				class="py-4 whitespace-pre-wrap"
				use:placeholder={'Content'}
				on:input={onContentChanged}
				on:paste={pasteImage}
				bind:innerHTML={feedItem.content}
			/>

			{feedItem.content.length}/240
			{#if introIsTooLong}
				<div class="my-4">
					Ooops, intro is too long. Keep it short and focused.
					<br />

					Or <a>expand your Moment to long-form article</a>
				</div>
			{/if}

			{#if isArticle}
				<div>
					<hr class="my-4" style="border-color: rgba(255, 255, 255, .3);" />

					<div
						role="textbox"
						contenteditable
						style="font-size: 20px; outline: none;"
						class="py-4 whitespace-pre-wrap"
						use:placeholder={'Article Content'}
						bind:innerHTML={feedItem.longContent}
					/>
				</div>
			{/if}

			<!-- <input type="text" bind:value={attachmentUrl} placeholder="Insert URL or paste from clipboard" use:autofocus on:paste={pasteImage}/> -->
		{/if}

		{#if !feedItem.attachments?.length}
			<div class="my-4">Or</div>
			<input id="fileInput" type="file" on:change={onFileUpload} />

			<button class="mt-4" on:click={addAttachmentUrl}> Add URL </button>
		{:else}
			<img class="w-full" src={feedItem.attachments[0].url} />
		{/if}
	</div>
</div>

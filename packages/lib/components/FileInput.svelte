<script>
	import { postFile } from 'lib/api';
	import { createEventDispatcher, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import tooltip from 'lib/use/tooltip';
	import dropzone from 'lib/use/dropzone';
	import { v4 as uuidv4 } from 'uuid';
	import Loader from 'lib/components/Loader.svelte';
	import ImageSearch from 'lib/components/ImageSearch.svelte';
	import EmbedUrl from 'lib/components/EmbedUrl.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import { showErrorMessage } from 'lib/services/toast';
	import currentUser from 'lib/stores/currentUser';
	import currentCustomer from 'lib/stores/currentCustomer';

	export let isCanSearch = false;
	export let isSearching = false;
	export let isWithIntegrations = false;
	export let url;
	export let theme = 'dark';
	export let placeholder = 'Insert URL or paste from clipboard';

	let innerUrlValue = url?.startsWith('http') || url?.startsWith('$') ? url : null;

	let componentId = uuidv4();

	let prevUrl = url;

	$: if (prevUrl !== url) {
		prevUrl = url;
	} else if (innerUrlValue) {
		if (innerUrlValue.startsWith('http') || innerUrlValue.startsWith('$')) {
			url = innerUrlValue;
			prevUrl = url;
		}
	} else if (url) {
		url = null;
		prevUrl = null;
	}

	let clazz;
	export { clazz as class };
	export let previewClass = '';

	const dispatch = createEventDispatcher();

	let isLoading = false;

	const uploadFile = async (file) => {
		isLoading = true;

		try {
			const newFile =
				!$currentUser && $currentCustomer.isEmailVerified
					? await postFile('files/customer', file)
					: await postFile('files', file);

			let fileUrl = newFile.url.startsWith('http') ? newFile.url : `https://${newFile.url}`;

			url = fileUrl;
			innerUrlValue = url;

			dispatch('fileUploaded', {
				type: newFile.url.includes('.mp4') || newFile.url.includes('.mov') ? 'video' : 'image',
				url: fileUrl
			});
		} finally {
			isLoading = false;
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

	const onFileUpload = async (e) => {
		if (!$currentUser && !$currentCustomer?.isEmailVerified) {
			return showErrorMessage('Please log in to upload files');
		}
		return uploadFile((e.target?.files || e.detail?.files)[0]);
	};

	let handleFilesSelect = () => {};

	let isImageOrVideo = () => {
		if (!url) {
			return false;
		}

		let isImage = false;

		['.jpg', '.gif', '.jpeg', '.mp4', '.mov'].forEach((ext) => {
			if (url.includes(ext)) {
				isImage = true;
			}
		});

		return isImage;
	};
</script>

<div class="w-full flex items-center">
	<input
		type="text"
		bind:value={innerUrlValue}
		{placeholder}
		on:paste={pasteImage}
		class={clazz}
		use:dropzone={{}}
		on:filedrop={onFileUpload}
		on:keydown={(evt) => {
			if (evt.key === 'Enter') {
				if (evt.target.value.startsWith('feather:') || evt.target.value.startsWith('<svg')) {
					url = evt.target.value;
					innerUrlValue = url;
					dispatch('fileUploaded', {
						url
					});
				}
			}
		}}
	/>

	{#if url}
		{#if !url.startsWith('$svelte')}
			<RenderUrl
				bind:url
				class="ml-4 rounded aspect-square flex items-center"
				style="width: 35px; height: 35px;"
				imgClass={`h-full w-full object-cover ${previewClass}`}
				isFilesOnly={true}
			/>
		{/if}

		<!-- <img
			src={url}
			class="ml-4 rounded aspect-square"
			style="max-height: 35px;"
			in:fly={{ x: 50, duration: 150 }}
		/> -->
	{/if}

	{#if isWithIntegrations}
		<div class="w-[1px] mx-4 my-1 bg-[#8B786D] opacity-40 self-stretch" />
		<div
			class="p-2 w-[35px] h-[35px] cursor-pointer m-0 rounded-full flex items-center justify-center {url
				? 'opacity-40 hover:opacity-100'
				: ''}"
			style="background-color: {theme === 'light' ? '#eaeaea' : '#222'};"
		>
			<EmbedUrl
				{url}
				onSelected={(embedUrl) => {
					url = embedUrl;
					innerUrlValue = url;
				}}
			/>
		</div>
	{/if}

	<div class="w-[1px] mx-4 my-1 bg-[#8B786D] opacity-40 self-stretch" />

	{#if isCanSearch}
		<div
			class="p-2 mr-2 w-[35px] h-[35px] cursor-pointer m-0 rounded-full flex items-center justify-center {url
				? 'opacity-40 hover:opacity-100'
				: ''}"
			style="background-color: {theme === 'light' ? '#eaeaea' : '#222'};"
		>
			<ImageSearch
				bind:isSearching
				onSelected={(imgUrl) => {
					url = imgUrl;
					innerUrlValue = url;
				}}
			/>
		</div>
	{/if}

	{#if !isLoading}
		<label
			for="fileInput-{componentId}"
			class="p-2 w-[35px] h-[35px] cursor-pointer m-0 rounded-full flex items-center justify-center {url
				? 'opacity-40 hover:opacity-100'
				: ''}"
			style="background-color: {theme === 'light' ? '#eaeaea' : '#222'};"
			use:tooltip
			title="Upload File"
		>
			📁
		</label>
	{/if}

	<input id="fileInput-{componentId}" type="file" on:change={onFileUpload} hidden />
</div>

{#if isLoading}
	<Loader {theme} />
{/if}

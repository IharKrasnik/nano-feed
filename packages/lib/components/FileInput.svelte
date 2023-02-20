<script>
	import { postFile } from 'lib/api';
	import { createEventDispatcher, onMount } from 'svelte';
	import dropzone from 'lib/use/dropzone';
	import Loader from 'lib/components/Loader.svelte';

	export let url;
	export let theme = 'dark';
	export let placeholder = 'Insert URL or paste from clipboard';

	let clazz;
	export { clazz as class };

	const dispatch = createEventDispatcher();

	let isLoading = false;
	const uploadFile = async (file) => {
		isLoading = true;
		try {
			const newFile = await postFile('files', file);

			let fileUrl = newFile.url.startsWith('http') ? newFile.url : `https://${newFile.url}`;

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
		return uploadFile((e.target?.files || e.detail?.files)[0]);
	};

	let handleFilesSelect = () => {};
</script>

<input
	type="text"
	bind:value={url}
	{placeholder}
	on:paste={pasteImage}
	class={clazz}
	use:dropzone={{}}
	on:filedrop={onFileUpload}
/>
{#if isLoading}
	<Loader {theme} />
{/if}

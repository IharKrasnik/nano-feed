<script>
	import _ from 'lodash';
	import tooltip from 'lib/use/tooltip';
	import getRandomEmoji from 'lib/services/getRandomEmoji';
	import blogPosts from '$lib/stores/blogPosts';
	import postDraft from '$lib/stores/postDraft';

	import { fly } from 'svelte/transition';
	import { post as apiPost, put as apiPut } from 'lib/api';
	import FileInput from 'lib/components/FileInput.svelte';
	import BackArrowSvg from 'lib/icons/back-arrow.svelte';
	import clickOutside from 'lib/use/clickOutside';
	import contenteditable from 'lib/use/contenteditable';
	import isShowContentEditableMenu from 'lib/stores/isShowContentEditableMenu';

	let clazz = 'p-4';
	export { clazz as class };

	export let onUpdated = () => {};

	export let post;
	export let blog;

	let saveDraft = async () => {
		debugger;
		if (post._id) {
			post = await apiPut(`blogs/${blog._id}/posts/${post._id}`, post);
		} else {
			post = await apiPost(`blogs/${blog._id}/posts`, post);
		}

		$blogPosts = $blogPosts || [];

		$blogPosts = [post, ...$blogPosts.filter((p) => p._id !== post._id)];

		onUpdated(post);
	};

	let publish = async () => {
		post = await apiPost(`blogs/${blog._id}/posts/${post._id}/publish`);

		$blogPosts = $blogPosts || [];

		$blogPosts = [post, ...$blogPosts.filter((p) => p._id !== post._id)];

		onUpdated(post);
	};
</script>

<div class={clazz}>
	<div
		class="flex items-center cursor-pointer text-[#8B786D] mb-4"
		on:click={() => {
			$postDraft = null;
		}}
	>
		<BackArrowSvg />
		Back
	</div>

	<div class="relative flex justify-between items-center mb-4">
		<!-- {#if onRemove}
			<div
				class="opacity-70 hover:opacity-100 transition  text-sm cursor-pointer text-[#8B786D]"
				title="Remove Item"
				on:click={onRemove}
			>
				🗑
			</div>
		{/if} -->
	</div>

	<label class="font-bold mb-2 block">Post Title</label>

	<div class="flex w-full items-center mb-4">
		<div contenteditable bind:innerHTML={post.title} data-placeholder="Title" use:contenteditable />
	</div>

	<label class="font-bold mb-2 block">Post Description</label>

	<div
		class="w-full mb-4 textarea"
		contenteditable
		use:contenteditable
		bind:innerHTML={post.description}
		data-placeholder="Description"
	/>

	<label class="font-bold mb-2 block">Post Image</label>

	<div class="relative flex justify-between items-center">
		<FileInput
			class="w-full"
			placeholder="Insert image/video url or paste from clipboard"
			isCanSearch
			bind:url={post.imageUrl}
			theme="light"
		/>
	</div>

	<div class="mt-4">
		<button class="_primary" on:click={saveDraft}>Save Draft</button>
		<button class="_primary" on:click={publish}>Publish </button>
	</div>
</div>

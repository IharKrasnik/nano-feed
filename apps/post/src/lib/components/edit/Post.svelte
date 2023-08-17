<script>
	import _ from 'lodash';
	import striptags from 'striptags';
	import { BRAND_URL } from 'lib/env';
	import tooltip from 'lib/use/tooltip';
	import getRandomEmoji from 'lib/services/getRandomProjectEmoji';
	import blogPosts from '$lib/stores/blogPosts';
	import postDraft from '$lib/stores/postDraft';
	import getPostMetaTags from 'lib/helpers/getPostMetaTags';

	import { fly } from 'svelte/transition';
	import { post as apiPost, put as apiPut } from 'lib/api';
	import FileInput from 'lib/components/FileInput.svelte';
	import Button from 'lib/components/Button.svelte';
	import BackArrowSvg from 'lib/icons/back-arrow.svelte';
	import clickOutside from 'lib/use/clickOutside';
	import contenteditable from 'lib/use/contenteditable';
	import isShowContentEditableMenu from 'lib/stores/isShowContentEditableMenu';

	let clazz = 'p-4';
	export { clazz as class };

	export let onUpdated = () => {};

	export let post;
	export let blog;

	let defaultTags = post?._id ? getPostMetaTags({ post }) : {};

	let saveDraft = async ({ isNoEvent = false } = {}) => {
		if (post._id) {
			post = await apiPut(`blogs/${blog._id}/posts/${post._id}`, post);
		} else {
			post = await apiPost(`blogs/${blog._id}/posts`, post);
		}

		$blogPosts = $blogPosts || [];

		$blogPosts = [post, ...$blogPosts.filter((p) => p._id !== post._id)];

		if (!isNoEvent) {
			onUpdated(post);
		}
	};

	let publish = async () => {
		let wasPublished = !!post.publishedOn;

		await saveDraft({ isNoEvent: true });

		post = await apiPost(`blogs/${blog._id}/posts/${post._id}/publish`);

		$blogPosts = $blogPosts || [];

		$blogPosts = [post, ...$blogPosts.filter((p) => p._id !== post._id)];

		onUpdated({ post, isJustPublished: !wasPublished });
	};

	let updateImageUrl = () => {
		post.defaultImageUrl = `${BRAND_URL}/og.png?title=${post.title}&name=${post.blog.name}`;
	};
</script>

<div class="{clazz} mb-32">
	<div
		class="flex items-center cursor-pointer text-[#8B786D] mb-4"
		on:click={() => {
			$postDraft = null;
		}}
	>
		<BackArrowSvg />
		Back to Editor
	</div>
	<label class="font-bold text-lg mb-2 block">Write Post</label>

	<div class="opacity-80">
		Talk to your audience. Solve their specific painpoint. Deliver value quickly. Optimize for SEO
		keywords. Write for humans.
	</div>
	<div class="_section mt-8">
		<!-- <div class="relative flex justify-between items-center mb-4">
		{#if onRemove}
			<div
				class="opacity-70 hover:opacity-100 transition  text-sm cursor-pointer text-[#8B786D]"
				title="Remove Item"
				on:click={onRemove}
			>
				🗑
			</div>
		{/if}
		</div> -->

		<label class="font-bold mb-2 block">Post Title</label>

		<div class="flex w-full items-center mb-2">
			<input
				class="w-full"
				bind:value={post.title}
				placeholder="How to build trust with short video content"
				on:input={_.debounce(updateImageUrl, 1000)}
			/>
		</div>
		<div class="text-sm mb-6 opacity-80">
			Tease your post. Promise some outcome or change in the title. Deliver it with your post. <br
			/>
		</div>

		<label class="font-bold mb-2 block">Post Description</label>

		<textarea
			class="w-full mb-2"
			bind:value={post.description}
			placeholder="Here's how you can use videos to attract attention, sell your product, and create entertaining content."
		/>

		<div class="text-sm mb-6 opacity-80">
			Add a bit more details to your title. 1 or 2 short sentences.
		</div>

		<label class="font-bold mb-2 block" class:opacity-50={!post.imageUrl}
			>Post Image (1200px / 630px)</label
		>

		<div class="relative flex justify-between items-center">
			<FileInput
				class="w-full"
				placeholder="Insert image/video url or paste from clipboard"
				isCanSearch
				bind:url={post.imageUrl}
				theme="light"
			/>
		</div>

		<div class="text-sm mt-2 opacity-80">
			Nice visual to add up to your story. Normally includes post title. Keep empty to use default
			image.
		</div>
	</div>

	{#if post.title}
		<label class="font-bold block mb-2 mt-4">Post Teaser {getRandomEmoji()}</label>
		<div class="bg-zinc-500 hover:bg-zinc-900 text-white rounded-xl p-4">
			<div class="">
				{#key post.imageUrl}
					<img
						class="rounded-xl w-full"
						style="aspect-ratio: 1200/630;"
						src={post.imageUrl || post.defaultImageUrl}
					/>
				{/key}
			</div>

			<div class="mt-4">
				<div class="font-bold truncate">{striptags(post.title)}</div>
				<div class="truncate">{striptags(post.description)}</div>
			</div>
		</div>
	{/if}

	<div class="mt-16 flex">
		<Button class="_primary" onClick={publish}>🚀 Publish Post</Button>
		<Button class="_secondary ml-2" onClick={saveDraft}>💾 Save Draft</Button>
	</div>
</div>

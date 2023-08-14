<script>
	import contenteditable from 'lib/use/contenteditable';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	export let post;
</script>

<div class="max-w-[800px] py-16 px-2 mx-auto">
	<h1 class="mb-4">{@html post.title}</h1>

	{#if post.description}
		<div class="content">{@html post.description}</div>
	{/if}

	{#if post.imageUrl}
		<RenderUrl
			imgClass="object-cover w-full max-h-[300px] my-4"
			isLazy={false}
			url={post.imageUrl}
		/>
	{/if}

	<div
		bind:innerHTML={post.contentHtml}
		contenteditable
		use:contenteditable
		placeholder="Start Typing"
		class="content"
	/>
</div>

<style>
	h1 {
		font-family: Archivo;
		@apply text-3xl;
	}

	h2 {
		font-size: 24px;
	}

	.content {
		@apply text-lg;
	}

	:global(.content a) {
		text-decoration: underline !important;
		cursor: pointer;
	}

	:global(.content h1) {
		font-family: Archivo;
		@apply text-3xl font-bold mb-4;
	}

	:global(.content h2) {
		@apply text-2xl font-bold mb-2;
	}

	:global(.content h3) {
		@apply text-xl font-bold mb-2;
	}
</style>

<script>
	import { POST_URL } from 'lib/env';
	import { fly } from 'svelte/transition';
	import tooltip from 'lib/use/tooltip';
	import Button from 'lib/components/Button.svelte';

	export let blog;
	export let post;

	export let onPublish = () => {};
</script>

<div
	class="relative _published-label flex justify-between items-center mt-4"
	style="padding: 6px 10px;"
>
	<a
		href={blog.domains?.length && blog.domains.filter((d) => d.isConfigured).length
			? `//${blog.domains.filter((d) => d.isConfigured)[0].url}${post ? `/${post.slug}` : ''}`
			: `${POST_URL}/${blog.slug}${post ? `/${post.slug}` : ''}`}
		class="flex justify-center {blog.isDirty ? 'max-w-[240px] ml-4' : 'w-full'}"
		style="color: #5375F0; overflow: hidden; text-overflow: ellipsis;"
		target="_blank"
		rel="noreferrer"
	>
		<div class="mr-2 z-20" use:tooltip title={blog.isDirty ? 'Pending Changes' : 'Published'}>
			{#if !post}
				{#if !blog.isDirty}
					✅
				{:else}
					🌝
				{/if}
			{/if}
		</div>

		<div class="truncate">
			{#if post}
				/{post.slug}
			{:else if blog.domains?.length && blog.domains.filter((d) => d.isConfigured).length}
				{blog.domains.filter((d) => d.isConfigured)[0].url}
			{:else}
				/{blog.slug}
			{/if}
		</div>
	</a>

	{#if blog.isDirty}
		<div transition:fly={{ x: 50, duration: 150 }}>
			<Button
				class="bg-yellow-500 right-0 _primary flex justify-center w-full"
				onClick={onPublish}
				style="margin-left: 78px;
										border-radius: 30px;
										padding: 4px 45px;
										right: 3px;
										width: auto;
										margin: -4px -10px -4px 0px;
										"
			>
				Publish
			</Button>
		</div>
	{/if}
</div>

<style>
	._published-label {
		max-width: 400px;
		margin: 0 auto;
		/* left: 50%; */
		/* transform: translateX(-50%); */
		font-size: 14px;
		text-align: center;
		border-radius: 30px;
		background-color: #f5f5f5;
		padding: 3px 10px;
		color: #828282;
	}
</style>

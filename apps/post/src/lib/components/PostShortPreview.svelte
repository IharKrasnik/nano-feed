<script>
	import moment from 'moment';
	import SvelteMarkdown from 'svelte-markdown';
	import striptags from 'striptags';

	import Avatar from 'lib/components/Avatar.svelte';

	import PostShortPreview from '$lib/components/PostShortPreview.svelte';
	import isCustomDomain from '$lib/stores/isCustomDomain';

	export let post;
</script>

<a class="mb-8" href={$isCustomDomain ? `/${post.slug}` : `/${post.blog.slug}/${post.slug}`}>
	{#if post.imageUrl}
		<img class="max-h-[200px] object-cover w-full mb-2 rounded-xl" src={post.imageUrl} />
	{/if}

	<div class="flex items-center my-4">
		<Avatar user={post?.creator} size="20px" class="mr-2" />
		<b class="mx-1">{post?.creator?.fullName}</b>
		<div class="px-1 opacity-70">/</div>
		<div class="opacity-70">{moment(post.publishedOn).format('MMM DD, YYYY')}</div>
	</div>
	<h3 class="text-xl font-bold mb-2">{post.title}</h3>
	<div class="text-lg">{@html striptags(post.description)}</div>
</a>

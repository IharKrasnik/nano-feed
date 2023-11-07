<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { get, post, put } from 'lib/api';

	import currentUser from 'lib/stores/currentUser';
	import postDraft from 'lib/stores/postDraft';
	import blogPosts from 'lib/stores/blogPosts';

	import Button from 'lib/components/Button.svelte';
	import Loader from 'lib/components/Loader.svelte';

	export let page;

	let createBlog = async () => {
		let blog = await post('blogs', {
			name: page.name,
			title: page.title,
			subtitle: page.subtitle,
			pageId: page._id
		});

		page.blog = blog;

		$postDraft = {
			creator: $currentUser,
			blog: page.blog
		};
	};

	let isBlogPostsLoading = false;

	let getBlogPosts = async () => {
		isBlogPostsLoading = true;

		let data = await get(`blogs/${page.blog._id}/posts`, {
			isWithDrafts: true
		});
		$blogPosts = data.results;
		isBlogPostsLoading = false;
	};

	if (page.blog) {
		getBlogPosts();
	}
</script>

<div class="px-8 py-16">
	{#if !page.blog}
		<div>
			<Button class="mb-2" onClick={createBlog}>Write first article</Button>
			<div>You don't have articles yet</div>
		</div>
	{:else if isBlogPostsLoading}
		<Loader />
	{:else if $blogPosts?.length}
		{#each $blogPosts as post (post._id)}
			<a on:click={() => ($postDraft = post)}>
				{post.title}
			</a>
		{/each}
	{/if}
</div>

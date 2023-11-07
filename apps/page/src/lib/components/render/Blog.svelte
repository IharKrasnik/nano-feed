<script>
	import { page as sveltePage } from '$app/stores';
	import { get } from 'lib/api';

	import blogPosts from '$lib/stores/blogPosts';
	import RenderSection from '$lib/components/render/Section.svelte';

	let isBlogPostsLoading = false;

	let blogSection = {
		columns: 3,
		linkType: 'interactive',
		items: []
	};

	export let page;

	let getBlogPosts = async () => {
		isBlogPostsLoading = true;

		let data = await get(`blogs/${page.blog._id}/posts`, {
			isWithDrafts: true
		});

		$blogPosts = data.results;

		blogSection.items = $blogPosts.map((post) => {
			return {
				title: post.title,
				description: post.description,
				imageUrl: post.imageUrl,
				url: `blog/post/${post.slug}`
			};
		});

		isBlogPostsLoading = false;
	};

	getBlogPosts();
</script>

{#if !isBlogPostsLoading}
	<RenderSection bind:section={blogSection} bind:page />
{/if}

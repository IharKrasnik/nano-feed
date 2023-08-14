<!-- <script>
	import PostPreview from '$lib/components/PostPreview.svelte';
	import { get } from 'lib/api';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	let prevSlug;

	let currentPost;

	$: if ($page.params.postSlug !== prevSlug) {
		prevSlug = $page.params.postSlug;

		if ($page.params.post) {
			currentPost = $page.params.post;
		} else {
			currentPost = null;

			get(`blogs/${$page.params.blogSlug}/posts/${$page.params.postSlug}`).then((loadedPost) => {
				currentPost = loadedPost;
			});
		}
	}
</script>

wtf {currentPost}
{#if currentPost}
	<PostPreview isEdit={false} bind:post={currentPost} />
{/if} -->

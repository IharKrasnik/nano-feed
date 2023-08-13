<script>
	import PostPreview from '$lib/components/PostPreview.svelte';
	import { get } from 'lib/api';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	let prevSlug;

	let currentPost;

	$: if ($page.params.postSlug && $page.params.postSlug !== prevSlug) {
		prevSlug = $page.params.postSlug;

		if ($page.params.post) {
			currentPost = $page.params.post;
		} else {
			currentPost = null;

			get(`blogs/${$page.params.blogSlug}/posts/${$page.params.postSlug}`).then((loadedPost) => {
				currentPost = loadedPost;

				if (browser && $page.data.post) {
					$page.data.post = null;
				}
			});
		}
	}
</script>

{#if currentPost}
	<PostPreview isEdit={false} post={currentPost} />
{/if}

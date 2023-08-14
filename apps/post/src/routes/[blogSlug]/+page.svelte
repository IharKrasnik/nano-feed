<script>
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import PostPreview from '$lib/components/PostPreview.svelte';
	import BlogPreview from '$lib/components/BlogPreview.svelte';

	if (browser && $page.data.blog) {
		window.WAVE_SUBPROJECT_ID = $page.data.blog._id;
	}
</script>

{#if $page.data.post}
	<PostPreview isEdit={false} post={$page.data.post} />
{:else if $page.data.blog}
	<BlogPreview blog={$page.data.blog} posts={$page.data.blog?.posts || []} />
{/if}

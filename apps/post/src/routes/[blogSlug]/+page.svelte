<script>
	import { page } from '$app/stores';
	import BlogPreview from '$lib/components/BlogPreview.svelte';
</script>

{#if $page.data.blog?.posts?.length}
	<BlogPreview blog={$page.data.blog} posts={$page.data.blog.posts} />
{/if}

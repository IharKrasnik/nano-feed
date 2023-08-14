<script>
	import Editor from '$lib/components/Editor.svelte';
	import { page } from '$app/stores';
	import PostPreview from '$lib/components/PostPreview.svelte';
	import BlogPreview from '$lib/components/BlogPreview.svelte';
</script>

{#if $page.data.post}
	<PostPreview isEdit={false} post={$page.data.post} />
{:else if $page.data.blog}
	<BlogPreview blog={$page.data.blog} posts={$page.data.blog?.posts || []} />
{:else}
	<Editor />
{/if}

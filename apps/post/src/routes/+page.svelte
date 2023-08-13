<script>
	import Editor from '$lib/components/Editor.svelte';
	import { page } from '$app/stores';
</script>

{#if $page.data.blog || $page.params.postSlug}{:else}
	<Editor />
{/if}

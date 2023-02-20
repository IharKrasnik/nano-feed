<script>
	import Editor from '$lib/components/Editor.svelte';
	import Page from '$lib/components/Page.svelte';
	import { page } from '$app/stores';
</script>

{#if $page.data.page}
	<Page />
{:else}
	<Editor />
{/if}

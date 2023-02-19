<script>
	import SvelteHighlight from 'svelte-highlight';

	import xml from 'svelte-highlight/languages/xml';
	import highlightStyle from 'svelte-highlight/styles/apprentice';

	export let code;
	import { browser } from '$app/environment';
</script>

<svelte:head>
	{@html highlightStyle}
</svelte:head>

{#if browser}
	<SvelteHighlight language={xml} {code} />
{/if}

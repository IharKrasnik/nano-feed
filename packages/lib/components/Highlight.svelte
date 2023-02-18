<script>
	import Highlight from 'svelte-highlight';
	import xml from 'svelte-highlight/languages/xml';
	import highlightStyle from 'svelte-highlight/styles/apprentice';
	export let code;
</script>

<svelte:head>
	{@html highlightStyle}
</svelte:head>

<Highlight language={xml} {code} />
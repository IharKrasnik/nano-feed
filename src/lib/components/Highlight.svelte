<script>
	import Highlight from 'svelte-highlight';
	import html from 'svelte-highlight/languages/html';
	import highlightStyle from 'svelte-highlight/styles/nnfx-dark';
	export let code;
</script>

<svelte:head>
	{@html highlightStyle}
</svelte:head>

<Highlight language={html} {code} />
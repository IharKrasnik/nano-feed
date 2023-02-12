<script>
	import Highlight from 'svelte-highlight';
	import javascript from 'svelte-highlight/languages/javascript';
	import highlightStyle from 'svelte-highlight/styles/nnfx-dark';
	export let code;
</script>

<svelte:head>
	{@html highlightStyle}
</svelte:head>

<Highlight language={javascript} {code} />
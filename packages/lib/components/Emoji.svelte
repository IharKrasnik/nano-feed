<script>
	let clazz;
	export { clazz as class };

	export let emoji;
	export let width = 25;

	let url;

	$: if (emoji?.startsWith('http')) {
		url = emoji;
	} else {
		url = null;
	}
</script>

<div class={clazz}>
	{#if url}
		{#key url}
			<img style="width: {width}px; height: {width}px;" src={url} />
		{/key}
	{:else}
		{emoji || '✨'}
	{/if}
</div>

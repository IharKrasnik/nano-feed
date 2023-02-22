<script>
	let clazz;
	export { clazz as class };

	export let emoji;

	let url;

	$: if (emoji?.startsWith('http')) {
		url = emoji;
	} else {
		url = null;
	}
</script>

<div class={clazz}>
	{#if url}
		<img class="w-[25px] h-[25px]" src={url} />
	{:else}
		{emoji}
	{/if}
</div>

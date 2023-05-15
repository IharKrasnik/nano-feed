<script>
	let clazz;
	export { clazz as class };

	export let emoji;
	export let width = 25;

	// let url;

	// $: if (emoji?.startsWith('http')) {
	// 	debugger;
	// 	url = emoji;
	// } else {
	// 	debugger;
	// 	url = null;
	// }
</script>

<div class={clazz}>
	{#if emoji?.startsWith('http')}
		{#key emoji}
			<img style="width: {width}px; height: {width}px;" src={emoji} />
		{/key}
	{:else}
		{emoji || '✨'}
	{/if}
</div>

<script>
	let clazz;
	export { clazz as class };
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	export let emoji;
	export let width = 25;
	export let height = width;
	export let color = '#111';
	// let url;

	// $: if (emoji?.startsWith('http')) {
	// 	url = emoji;
	// } else {
	// 	url = null;
	// }
</script>

<div class={clazz}>
	{#if emoji?.startsWith('http')}
		{#key emoji}
			<img
				class="{clazz?.includes('rounded-full') ? 'rounded-full' : ''} {clazz?.includes('rounded')
					? 'rounded'
					: ''}"
				style="width: {width === 'auto' ? 'auto' : `${width}px`}; height: {height}px;"
				src={emoji}
			/>
		{/key}
	{:else if emoji?.startsWith('feather:')}
		<FeatherIcon name={emoji.replace('feather:', '')} {color} />
	{:else}
		{emoji || '✨'}
	{/if}
</div>

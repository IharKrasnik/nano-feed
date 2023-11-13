<script>
	let clazz;
	export { clazz as class };
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	export let emoji;
	export let width = 25;
	export let color = '#111';
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
			<img
				class="{clazz?.includes('rounded-full') ? 'rounded-full' : ''} {clazz?.includes('rounded')
					? 'rounded'
					: ''}"
				style="width: {width}px; height: {width}px;"
				src={emoji}
			/>
		{/key}
	{:else if emoji?.startsWith('feather:')}
		<FeatherIcon name={emoji.replace('feather:', '')} {color} />
	{:else}
		{emoji || '✨'}
	{/if}
</div>

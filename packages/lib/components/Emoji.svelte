<script>
	let clazz;
	export { clazz as class };
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	export let emoji;
	export let width = 25;
	export let height = width;

	export let color = '#333';

	export let theme;

	if (theme) {
		if (theme === 'dark') {
			color = '#f6f5f4';
		} else {
			color = '#333333';
		}
	}

	let stylesStr = `--emoji-width: ${width}px; --emoji-height: ${height}px;`;
</script>

<div class={clazz} style={stylesStr}>
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
		<FeatherIcon class="inline" name={emoji.replace('feather:', '')} {color} size={width} />
	{:else if emoji?.startsWith('<svg')}
		<div
			class="_svg inline-block"
			style={width === 'auto'
				? `max-height: ${height}px;`
				: `max-width: ${width}px; max-height: ${height}px;`}
		>
			{@html emoji}
		</div>
	{:else}
		{emoji || '✨'}
	{/if}
</div>

<style>
	:global(._svg svg) {
		width: var(--emoji-width);
		height: var(--emoji-height);
	}
</style>

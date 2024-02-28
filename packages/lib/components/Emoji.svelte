<script>
	let clazz;
	export { clazz as class };
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	export let emoji;
	export let width = 25;
	export let height = width;

	export let bgColor = null;
	export let color;

	export let theme;

	if (theme && !color) {
		if (theme === 'dark') {
			color = '#f6f5f4';
		} else {
			color = '#333333';
		}
	} else {
		if (!color) {
			color = '#333333';
		}
	}

	let stylesStr = `${width ? `--emoji-width: ${width}px;` : ''} ${
		height ? `--emoji-height: ${height}px;` : ''
	}`;
</script>

<div
	class="inline-block {bgColor ? 'border border-white/30' : ''}"
	style={bgColor
		? `background-color: ${bgColor}; ${
				width > 25 ? ' padding: 8px; border-radius: 8px;' : ' padding: 4px; border-radius: 4px;'
		  }`
		: ''}
>
	<div class="{clazz} flex" style={stylesStr}>
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
</div>

<style>
	:global(._svg svg) {
		width: var(--emoji-width);
		height: var(--emoji-height);
	}
</style>

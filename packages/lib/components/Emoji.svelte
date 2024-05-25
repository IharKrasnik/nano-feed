<script>
	let clazz;
	export { clazz as class };
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	export let emoji;
	export let width = 25;
	export let mobileWidth = width;
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

	let stylesStr = `${
		width ? `--emoji-width: ${width}px; --emoji-mobile-width: ${mobileWidth}px;` : ''
	} ${height ? `--emoji-height: ${height}px;` : ''}`;
</script>

<div
	class="inline-block {bgColor ? 'border border-white/30' : ''}"
	style={bgColor
		? `background-color: ${bgColor}; ${
				width > 25 ? ' padding: 8px; border-radius: 8px;' : ' padding: 4px; border-radius: 4px;'
		  }`
		: ''}
>
	<div class="{clazz} _emoji flex" style="{stylesStr};}">
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
		{:else if emoji?.startsWith('<svg') || emoji?.startsWith('$code')}
			<div
				class="_svg inline-block"
				style={width === 'auto'
					? height === 'auto'
						? ''
						: `max-height: ${height}px;`
					: `max-width: ${width}px; max-height: ${height}px;`}
			>
				{#if emoji?.startsWith('$code')}
					{@html emoji.replace('$code', '')}
				{:else}
					{@html emoji}
				{/if}
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

	._emoji {
		font-size: var(--emoji-height);
		line-height: 1;
	}

	@media (max-width: 640px) {
		._emoji {
			font-size: var(--emoji-mobile-width);
		}

		:global(._svg svg) {
			max-width: 26px;
			max-height: 26px;
		}
	}
</style>

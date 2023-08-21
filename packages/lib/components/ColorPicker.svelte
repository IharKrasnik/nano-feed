<script>
	import _ from 'lodash';
	import { BRAND_URL } from 'lib/env';
	import { fly } from 'svelte/transition';
	import clickOutside from 'lib/use/clickOutside';
	import colors from 'lib/stores/colors';

	export let color;
	export let defaultColor;
	export let onUpdated = () => {};

	let gradients = {};

	let isOpen = false;

	if (!color) {
		color = defaultColor || _.sample($colors).value;
	}

	let close = () => {
		isOpen = false;
	};

	let setColor = (newColor) => {
		color = newColor.value;

		onUpdated({
			color,
			isDarkColor: newColor.isDarkColor
		});

		close();
	};
</script>

<div class="relative" use:clickOutside on:clickOutside={close}>
	<div
		on:click={() => (isOpen = true)}
		class="rounded-full w-[25px] h-[25px] cursor-pointer shrink-0 _color"
		style="background: {color.startsWith('http')
			? `url(${color})`
			: color}; border: 1px rgba(255, 255, 255, .3) solid;"
	>
		<span />
	</div>
	{#if isOpen}
		<div
			class="absolute p-4 rounded-lg"
			style="background: #181a18; min-width: 260px; width: 100%;"
			in:fly={{ duration: 150, y: 20 }}
		>
			<div class="grid grid-cols-7 gap-4">
				{#each $colors as clr}
					<div
						class="rounded-full w-[25px] h-[25px] cursor-pointer shrink-0 _color"
						style="background: {clr.type === 'file' ? `url(${clr.value})` : clr.value};"
						on:click={() => setColor(clr)}
					/>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	._color {
		background-size: cover !important;
	}
</style>

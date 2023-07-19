<script>
	import _ from 'lodash';
	import { fly } from 'svelte/transition';
	import clickOutside from 'lib/use/clickOutside';

	export let color;
	export let defaultColor;

	let gradients = {};

	let isOpen = false;

	let colors = [
		{
			type: 'plain',
			value: '#A339F7'
		},
		{
			type: 'plain',
			value: '#FFC600'
		},
		{
			type: 'plain',
			value: '#25CED1'
		},
		{
			type: 'plain',
			value: '#EA526F'
		},
		{
			type: 'plain',
			value: '#7FB069'
		},
		{
			type: 'plain',
			value: '#222222'
		},
		{
			type: 'plain',
			value: '#000000'
		},
		{
			type: 'file',
			value: '/backgrounds/gradient-1.svg',
			bgColor: "url('/backgrounds/gradient-1.svg')"
		},
		{
			type: 'file',
			value: '/backgrounds/gradient-2.svg',
			bgColor: "url('/backgrounds/gradient-2.svg')"
		},
		{
			type: 'file',
			value: '/backgrounds/gradient-3.svg',
			bgColor: "url('/backgrounds/gradient-3.svg')"
		},
		{
			type: 'file',
			value: '/backgrounds/gradient-4.svg',
			bgColor: "url('/backgrounds/gradient-4.svg')"
		},
		{
			type: 'file',
			value: '/backgrounds/gradient-5.svg',
			bgColor: "url('/backgrounds/gradient-5.svg')"
		},
		{
			type: 'file',
			value: '/backgrounds/gradient-6.svg',
			bgColor: "url('/backgrounds/gradient-6.svg')"
		},
		{
			type: 'file',
			value: '/backgrounds/gradient-7.svg',
			bgColor: "url('/backgrounds/gradient-7.svg')"
		}
	];

	if (!color) {
		color = defaultColor || _.sample(colors);
	}

	let close = () => {
		isOpen = false;
	};

	let setColor = (newColor) => {
		color = { ...newColor };
		close();
	};
</script>

<div class="relative" use:clickOutside on:clickOutside={close}>
	<div
		on:click={() => (isOpen = true)}
		class="rounded-full w-[25px] h-[25px] cursor-pointer shrink-0 _color"
		style="background: {color.bgColor || color.value};"
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
				{#each colors as clr}
					<div
						class="rounded-full w-[25px] h-[25px] cursor-pointer shrink-0 _color"
						style="background: {clr.bgColor || clr.value};"
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

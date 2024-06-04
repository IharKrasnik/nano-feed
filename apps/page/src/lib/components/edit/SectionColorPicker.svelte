<script>
	import { getThemeValue } from 'lib-render/helpers/getThemeValue';
	export let page;

	export let sectionItem;
	export let isInnerSection = false;

	export let themeKeys = {
		backgroundColor: 'backgroundColor',
		isTransparent: 'isTransparent',
		isOppositeColors: 'isOppositeColors',
		isNoPadding: 'isNoPadding'
	};

	let defaultBackgroundColor = isInnerSection
		? getThemeValue(page, 'sectionItemBackgroundColor')
		: getThemeValue(page, 'backgroundColor');

	let alternativeBackgroundColor = getThemeValue(page, 'theme') === 'dark' ? '#222222' : '#f6f5f4';

	let backgroundColorEl;
</script>

<div class="flex gap-2">
	<!-- <label
		class="relative w-[35px] h-[35px] cursor-pointer "
		on:click={() => {
			sectionItem.theme[themeKeys.isTransparent] = false;
		}}
	>
		{#if sectionItem.theme[themeKeys.backgroundColor]}
			<div
				style="background-color: {sectionItem.theme[themeKeys.backgroundColor]};"
				class:border-green-300={sectionItem.theme[themeKeys.backgroundColor] &&
					!sectionItem.theme[themeKeys.isTransparent]}
				class:border-[#f6f5f4]={sectionItem.theme[themeKeys.isTransparent]}
				class="w-[35px] h-[35px] flex justify-center items-center border-4 border-[#f6f5f4] rounded-full"
				on:click={() => {
					sectionItem.theme[themeKeys.isTransparent] = false;
				}}
			/>
		{/if}
		<input
			type="color"
			style="width:0; height:0;"
			bind:this={backgroundColorEl}
			bind:value={sectionItem.theme[themeKeys.backgroundColor]}
		/>
	</label> -->

	<div
		class="w-[35px] h-[35px] rounded-full border border-4 border-[#f6f5f4] cursor-pointer"
		class:border-green-400={!sectionItem.theme[themeKeys.isTransparent] &&
			(!sectionItem.theme[themeKeys.backgroundColor] ||
				sectionItem.theme[themeKeys.backgroundColor] === defaultBackgroundColor)}
		style="background-color: {defaultBackgroundColor};"
		on:click={() => {
			sectionItem.theme[themeKeys.isTransparent] = false;
			sectionItem.theme[themeKeys.backgroundColor] = null;
		}}
	/>

	{#if !isInnerSection}
		<div
			class="w-[35px] h-[35px] rounded-full border border-4 border-[#f6f5f4] cursor-pointer"
			class:border-green-400={!sectionItem.theme[themeKeys.isTransparent] &&
				sectionItem.theme[themeKeys.backgroundColor] === alternativeBackgroundColor}
			style="background-color: {alternativeBackgroundColor};"
			on:click={() => {
				sectionItem.theme[themeKeys.isTransparent] = false;
				sectionItem.theme[themeKeys.backgroundColor] = alternativeBackgroundColor;
			}}
		/>
	{/if}

	{#if isInnerSection}
		<div
			class="w-[35px] rounded-full border-4 border-[#f6f5f4] cursor-pointer"
			class:border-green-400={sectionItem.theme[themeKeys.isTransparent]}
			class:border-[#f6f5f4]={!sectionItem.theme[themeKeys.isTransparent]}
			on:click={() => {
				sectionItem.theme[themeKeys.isTransparent] = true;
			}}
			style="background-image: url('https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1716758994699-image.png');"
		/>
	{/if}

	{#if getThemeValue(page, 'theme') === 'dark' && defaultBackgroundColor !== '#f6f5f4'}
		<div
			class="w-[35px] h-[35px] rounded-full border border-[#f6f5f4] cursor-pointer border-4  border-[#f6f5f4]"
			style="background-color: #f6f5f4;"
			class:border-green-400={!sectionItem.theme[themeKeys.isTransparent] &&
				sectionItem.theme[themeKeys.backgroundColor] === '#f6f5f4'}
			on:click={() => {
				sectionItem.theme[themeKeys.isTransparent] = false;
				sectionItem.theme[themeKeys.backgroundColor] = '#f6f5f4';
			}}
		/>
	{/if}

	{#if getThemeValue(page, 'theme') !== 'dark' && defaultBackgroundColor !== '#111111'}
		<div
			class="w-[35px] h-[35px] rounded-full border border-blackcursor-pointer border-4 border-[#f6f5f4]"
			style="background-color: #111111;"
			class:border-green-400={!sectionItem.theme[themeKeys.isTransparent] &&
				sectionItem.theme[themeKeys.backgroundColor] === '#111111'}
			on:click={() => {
				sectionItem.theme[themeKeys.isTransparent] = false;
				sectionItem.theme[themeKeys.backgroundColor] = '#111111';
			}}
		/>
	{/if}
	<label
		class="relative"
		on:click={() => {
			sectionItem.theme[themeKeys.isTransparent] = false;
		}}
	>
		<div
			class="w-[35px] h-[35px] flex justify-center items-center cursor-pointer border-8 border-[#f6f5f4] rounded-full"
			style="border-color: {sectionItem.theme[themeKeys.backgroundColor] || defaultBackgroundColor}"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="icon icon-tabler icon-tabler-color-picker opacity-80"
				width="15"
				height="15"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="#2c3e50"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M11 7l6 6" />
				<path d="M4 16l11.7 -11.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-11.7 11.7h-4v-4z" />
			</svg>
			<input
				type="color"
				style="width:0; height:0;"
				bind:this={backgroundColorEl}
				bind:value={sectionItem.theme[themeKeys.backgroundColor]}
			/>
		</div>
	</label>
</div>

<div class="mb-4 mt-4">
	<input
		bind:checked={sectionItem.theme[themeKeys.isOppositeColors]}
		class="mr-2"
		type="checkbox"
	/>

	Use opposite text color
</div>

{#if sectionItem.theme[themeKeys.isTransparent] && isInnerSection}
	<div class="mb-4 mt-4">
		<input bind:checked={sectionItem.theme[themeKeys.isNoPadding]} class="mr-2" type="checkbox" />
		Remove padding
	</div>
{/if}

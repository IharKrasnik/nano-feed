<script>
	import { fly } from 'svelte/transition';
	import clickOutside from 'lib/use/clickOutside';
	import FileInput from 'lib/components/FileInput.svelte';
	import Emoji from 'lib/components/Emoji.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import feather from 'feather-icons/dist/icons.json';
	import customIcons from 'lib/constants/customIcons';

	let isEmojiPickerShown = false;

	let clazz = '';

	export { clazz as class };

	export let icon;
	export let bgColor = null;
	export let color = null;
	export let isNoCustom = false;
	export let defaultIcon;
	export let onUpdated = () => {};

	let isUseBgColor = !!bgColor;
	let isUseColor = !color;

	if (!icon && defaultIcon) {
		icon = defaultIcon;
	}

	export let theme = 'light';

	let url =
		icon?.startsWith('http') || icon?.startsWith('feather:') || icon?.startsWith('<svg')
			? icon
			: null;

	$: if (url && (url.startsWith('http') || url.startsWith('feather:') || url.startsWith('<svg'))) {
		icon = url;
		isEmojiPickerShown = false;
	}

	let selectedTab = 'emoji';

	let featherIconNames = Object.keys(feather);

	let iconSearchStr = '';
</script>

<div
	class="relative cursor-pointer {clazz}"
	use:clickOutside
	on:clickOutside={() => {
		isEmojiPickerShown = false;
	}}
>
	<div
		class="border-2 border-[#ccccd0] rounded-full aspect-square shrink-0 w-[30px] h-[30px] flex items-center justify-center"
		on:click={() => (isEmojiPickerShown = true)}
	>
		<Emoji bind:emoji={icon} />
	</div>
	{#if isEmojiPickerShown}
		<div
			class="absolute top-0 mt-16 shadow-lg shadow-black/30 rounded-lg overflow-hidden"
			style="z-index: 100;"
			in:fly={{ y: 50, duration: 150 }}
		>
			{#if !isNoCustom}
				<div class="{theme === 'light' ? 'bg-white' : 'bg-black'} p-4 border border-[#e0dede]">
					<h3 class="font-bold mb-2">Custom Logo</h3>
					<FileInput
						{theme}
						class="w-full"
						bind:url
						on:fileUploaded={({ detail }) => {
							console.log('detail', detail);
							return onUpdated(detail.url);
						}}
					/>
				</div>
			{/if}

			<div
				class="{theme === 'light'
					? 'bg-white'
					: 'bg-black'} flex gap-4 py-4 bg-[#fafafa] border px-2"
			>
				<div
					class="pb-2"
					on:click={() => (selectedTab = 'emoji')}
					class:_selected={selectedTab === 'emoji'}
				>
					✨ Emoji
				</div>

				<div
					class="flex items-center pb-2"
					on:click={() => (selectedTab = 'feather')}
					class:_selected={selectedTab === 'feather'}
				>
					<FeatherIcon class="mr-2" size="15" name="feather" /> Mono Icon
				</div>

				<div
					class="flex items-center pb-2"
					on:click={() => (selectedTab = 'more')}
					class:_selected={selectedTab === 'more'}
				>
					<svg
						width="20"
						height="20"
						class="mr-2"
						viewBox="0 0 215 200"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M211.975 26.2798H28.408V197H211.975V26.2798Z"
							fill="#FFE600"
							stroke="#161616"
							stroke-width="5.38266"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M146.12 58.576L186.567 104.983V3H3V55.9564L87.0471 137.62L146.12 58.576Z"
							fill="#4966FF"
							stroke="#161616"
							stroke-width="5.38266"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M146.12 58.5761L87.0471 137.62L3 55.9565V173.729H186.567V104.984L146.12 58.5761Z"
							fill="#FF6B57"
							stroke="#161616"
							stroke-width="5.38266"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M79.4073 68.7851C91.0318 68.7851 100.455 60.0211 100.455 49.2102C100.455 38.3993 91.0318 29.6353 79.4073 29.6353C67.7829 29.6353 58.3594 38.3993 58.3594 49.2102C58.3594 60.0211 67.7829 68.7851 79.4073 68.7851Z"
							fill="#FFE600"
							stroke="#161616"
							stroke-width="5.38266"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>

					More Icons
				</div>
			</div>

			{#if selectedTab === 'emoji'}
				<emoji-picker
					class={theme}
					on:emoji-click={(evt) => {
						icon = evt.detail.unicode;
						url = null;
						isEmojiPickerShown = false;
						onUpdated(icon);
					}}
				/>
			{:else if selectedTab === 'feather'}
				<div
					class="w-full _section min-w-[345px] min-h-[200px] {theme === 'light'
						? 'bg-white'
						: 'bg-black'}"
					style="border-radius: 0;"
				>
					<div class="font-bold mb-2">Monochrome SVG Icons</div>

					<div class="my-2 w-full">
						<input class="w-full" placeholder="Search icon" bind:value={iconSearchStr} />
					</div>

					<div class="mt-2 grid grid-cols-10 h-[400px] overflow-y-scroll">
						{#each iconSearchStr ? featherIconNames.filter( (n) => n.includes(iconSearchStr.toLowerCase()) ) : featherIconNames as featherIconName}
							<div
								class="flex flex-col justify-center items-center p-4"
								on:click={() => {
									url = `feather:${featherIconName}`;
									isEmojiPickerShown = false;
								}}
							>
								<FeatherIcon size="20" name={featherIconName} {color} />
							</div>
						{/each}
					</div>
					<div class="{theme === 'light' ? 'bg-white' : 'bg-black'} p-4 border border-[#e0dede] ">
						<input
							type="checkbox"
							bind:checked={isUseColor}
							on:change={(evt) => {
								if (!isUseColor) {
									color = null;
								}
							}}
						/>
						Use different color
						{#if isUseColor}
							<div class="mt-2">
								<input type="color" bind:value={color} />
							</div>
						{/if}
					</div>
				</div>
			{:else if selectedTab === 'more'}
				<div
					class="_section min-w-[345px] min-h-[200px] {theme === 'light' ? 'bg-white' : 'bg-black'}"
					style="border-radius: 0;"
				>
					{#each customIcons as category}
						<div class="font-bold mb-4">{category.name}</div>

						<div class="grid grid-cols-5 w-full h-full mb-8 gap-4">
							{#each category.icons as icon}
								<div
									class="_svg hover:scale-105"
									style="--emoji-width: 55px; --emoji-height: 55px;"
									on:click={() => {
										url = icon;
										isEmojiPickerShown = false;
									}}
								>
									{@html icon}
								</div>
							{/each}
						</div>
					{/each}
				</div>
			{/if}

			{#if icon}
				<div class="{theme === 'light' ? 'bg-white' : 'bg-black'} p-4 border border-[#e0dede] ">
					<input
						type="checkbox"
						bind:checked={isUseBgColor}
						on:change={(evt) => {
							if (!isUseBgColor) {
								bgColor = null;
							}
						}}
					/>
					Add background color
					{#if isUseBgColor}
						<div class="mt-2">
							<input type="color" bind:value={bgColor} />
						</div>
					{/if}
				</div>
			{/if}
			{#if icon}
				<div
					class="{theme === 'light'
						? 'bg-white'
						: 'bg-black'} p-4 border border-[#e0dede] rounded-bl-xl rounded-br-xl"
				>
					<div
						class="w-full text-center cursor-pointer"
						on:click={() => {
							icon = null;
							url = null;
							isEmojiPickerShown = false;
							onUpdated(null);
						}}
					>
						Remove Icon
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	._selected {
		@apply border-b-2 border-black;
	}
</style>

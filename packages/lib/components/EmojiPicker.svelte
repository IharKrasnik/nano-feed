<script>
	import { fly } from 'svelte/transition';
	import clickOutside from 'lib/use/clickOutside';
	import FileInput from 'lib/components/FileInput.svelte';
	import Emoji from 'lib/components/Emoji.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import feather from 'feather-icons/dist/icons.json';

	let isEmojiPickerShown = false;

	let clazz = '';

	export { clazz as class };

	export let icon;
	export let isNoCustom = false;
	export let defaultIcon;
	export let onUpdated = () => {};

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
		class="border rounded-full aspect-square shrink-0 w-[30px] h-[30px] flex items-center justify-center"
		on:click={() => (isEmojiPickerShown = true)}
	>
		<Emoji bind:emoji={icon} />
	</div>
	{#if isEmojiPickerShown}
		<div class="absolute top-0 mt-16" style="z-index: 100;" in:fly={{ y: 50, duration: 150 }}>
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
			<div class="{theme === 'light' ? 'bg-white' : 'bg-black'} flex gap-4 py-4">
				<div
					class="pb-2"
					on:click={() => (selectedTab = 'emoji')}
					class:_selected={selectedTab === 'emoji'}
				>
					✨ Emoji
				</div>

				<div
					class="flex items-center pb-2"
					on:click={() => (selectedTab = 'icon')}
					class:_selected={selectedTab === 'icon'}
				>
					<FeatherIcon class="mr-2" size="15" name="feather" /> Mono Icon
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
			{:else if selectedTab === 'icon'}
				<div
					class="w-full _section min-w-[345px] min-h-[200px] {theme === 'light'
						? 'bg-white'
						: 'bg-black'}"
				>
					<div class="text-lg font-bold mb-2">SVG Icons</div>

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
								<FeatherIcon size="20" name={featherIconName} />
							</div>
						{/each}
					</div>
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

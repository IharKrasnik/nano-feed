<script>
	import { fly } from 'svelte/transition';
	import clickOutside from 'lib/use/clickOutside';
	import FileInput from 'lib/components/FileInput.svelte';
	import Emoji from 'lib/components/Emoji.svelte';

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

	let url = icon?.startsWith('http') ? icon : null;

	$: if (url && url.startsWith('http')) {
		icon = url;
		isEmojiPickerShown = false;
	}
</script>

<div
	class="relative cursor-pointer {clazz}"
	on:click={() => (isEmojiPickerShown = true)}
	use:clickOutside
	on:clickOutside={() => {
		isEmojiPickerShown = false;
	}}
>
	<Emoji bind:emoji={icon} />

	{#if isEmojiPickerShown}
		<div class="absolute top-0 mt-16" style="z-index: 100;" in:fly={{ y: 50, duration: 150 }}>
			<emoji-picker
				class={theme}
				on:emoji-click={(evt) => {
					icon = evt.detail.unicode;
					url = null;
					isEmojiPickerShown = false;
					onUpdated(icon);
				}}
			/>

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

<script>
	import { fly } from 'svelte/transition';
	import clickOutside from 'lib/use/clickOutside';
	import FileInput from 'lib/components/FileInput.svelte';
	import Emoji from 'lib/components/Emoji.svelte';

	let isEmojiPickerShown = false;

	export let icon;
	export let theme = 'light';

	let url = icon?.startsWith('http') ? icon : null;

	$: if (url && url.startsWith('http')) {
		icon = url;
		isEmojiPickerShown = false;
	}
</script>

<div
	class="relative cursor-pointer"
	on:click={() => (isEmojiPickerShown = true)}
	use:clickOutside
	on:clickOutside={() => {
		isEmojiPickerShown = false;
	}}
>
	<Emoji bind:emoji={icon} />

	{#if isEmojiPickerShown}
		<div class="absolute top-0 mt-8 z-40" in:fly={{ y: 50, duration: 150 }}>
			<emoji-picker
				class={theme}
				on:emoji-click={(evt) => {
					icon = evt.detail.unicode;
					url = null;
					isEmojiPickerShown = false;
				}}
			/>
			<div
				class="{theme === 'light'
					? 'bg-white'
					: 'bg-black'} p-4 border border-[#e0dede] rounded-bl-xl rounded-br-xl"
			>
				<h3 class="font-bold mb-2">Custom Logo</h3>
				<FileInput {theme} class="w-full" bind:url />
			</div>
		</div>
	{/if}
</div>

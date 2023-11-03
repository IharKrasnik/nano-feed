<script>
	import { fly } from 'svelte/transition';
	import clickOutside from 'lib/use/clickOutside';
	import FileInput from 'lib/components/FileInput.svelte';
	import Emoji from '$lib/components/render/Emoji.svelte';

	let clazz;
	export { clazz as class };

	let isEmojiPickerShown = false;

	export let icon = '✨';

	let url = icon?.startsWith('http') ? icon : null;

	$: if (url && (url.startsWith('http') || url.startsWith('feather:'))) {
		icon = url;
		isEmojiPickerShown = false;
	}
</script>

<div
	class="{clazz} relative cursor-pointer"
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
				class="light"
				on:emoji-click={(evt) => {
					icon = evt.detail.unicode;
					url = null;
					isEmojiPickerShown = false;
				}}
			/>
			<div class="bg-white p-4 border border-[#e0dede] rounded-bl-xl rounded-br-xl">
				<h3 class="font-bold mb-2">Custom Logo</h3>
				<FileInput theme={'light'} class="w-full" bind:url />
			</div>
		</div>
	{/if}
</div>

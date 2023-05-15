<script>
	import { fly } from 'svelte/transition';

	import isUrl from 'lib/helpers/isUrl';
	import clickOutside from 'lib/use/clickOutside';

	export let url;
	export let callToActionText = '';
	export let placeholder = 'Insert URL';
	export let isShown = false;

	let show = () => {
		isShown = true;
	};

	let close = () => {
		isShown = false;
	};

	let prevUrl = url;

	$: if (prevUrl !== url) {
		prevUrl = url;
	} else if (innerUrl) {
		if (isUrl(innerUrl)) {
			url = innerUrl;
			prevUrl = url;
		}
	} else if (url) {
		url = null;
		prevUrl = null;
	}

	let innerUrl = url;
</script>

<div
	class="ml-2 w-[37px] h-[37px] bg-[#fafafa] rounded-xl flex items-center justify-center cursor-pointer {url
		? 'bg-green-200'
		: ''}"
	on:click={show}
>
	🔗
</div>

{#if isShown}
	<div
		class="absolute top-0 mt-8 p-4 z-40 bg-white w-full border border-[#e0dede] rounded-xl"
		in:fly={{ y: 50, duration: 150 }}
		use:clickOutside
		on:clickOutside={close}
	>
		<div class="text-sm opacity-70 mt-4 mb-2">Button text</div>
		<input class="w-full" bind:value={callToActionText} placeholder="Learn More" type="text" />

		<div class="text-sm opacity-70 mt-4 mb-2">URL to open on section click</div>
		<input class="w-full" bind:value={innerUrl} {placeholder} type="url" />

		<div class="mt-4">
			<div class="mt-4 cursor-pointer text-sm" on:click={close}>Save</div>
		</div>
	</div>
{/if}

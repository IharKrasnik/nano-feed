<script>
	import { fly } from 'svelte/transition';

	import isUrl from 'lib/helpers/isUrl';
	import FileInput from 'lib/components/FileInput.svelte';
	import DateTimeInput from 'lib/components/DateTimeInput.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';

	export let feedItem;

	export let isShown = false;

	let show = () => {
		isShown = true;
	};

	let isValidJson = () => {
		try {
			JSON.parse(feedItem.jsonData);

			return true;
		} catch (err) {
			return false;
		}
	};

	let close = () => {
		if (!feedItem.jsonData || isValidJson()) {
			isShown = false;
		} else {
			alert('Not a valid JSON');
		}
	};

	let textareaPlaceholder = `{ "customField": "My Field" }`;
</script>

<div
	class="ml-2 w-[37px] h-[37px] bg-[#fafafa] rounded-xl flex items-center justify-center cursor-pointer"
	on:click={show}
>
	⚙️
</div>

{#if isShown}
	<div
		class="absolute top-0 mt-8 p-4 z-40 bg-white w-full border border-[#e0dede] rounded-xl"
		in:fly={{ y: 50, duration: 150 }}
	>
		<div class="w-full py-4">
			<div class="mb-4">
				<div class="text-sm font-bold mb-2">Published Date</div>

				<DateTimeInput bind:date={feedItem.publishedOn} />
			</div>

			<div class="text-sm font-bold mb-2 mt-4">Custom Data (JSON format)</div>

			<textarea
				class="w-full"
				placeholder={textareaPlaceholder}
				bind:value={feedItem.jsonData}
				rows="8"
				on:change
			/>
		</div>

		<button class="_button _primary _small mt-8 mb-2 w-full" on:click={close}>Save & Close</button>
	</div>
{/if}

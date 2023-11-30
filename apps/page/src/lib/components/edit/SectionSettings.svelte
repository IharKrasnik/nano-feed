<script>
	import { fly } from 'svelte/transition';

	import isUrl from 'lib/helpers/isUrl';
	import FileInput from 'lib/components/FileInput.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';

	export let section;
	export let sectionItem;
	export let theme = 'light';

	export let isShown = false;

	let show = () => {
		isShown = true;
	};

	let close = () => {
		isShown = false;
	};

	$: if (sectionItem.bgImageUrl) {
		sectionItem.className = '';
	}
</script>

<div
	class="ml-2 w-[37px] h-[37px] shrink-0 bg-[#fafafa] rounded-xl flex items-center justify-center cursor-pointer"
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
			{#if !sectionItem.items && section.renderType !== 'carousel'}
				<div class="text-sm mb-2">Grid</div>
				<div class="flex items-center mb-4">
					{#if section.columns > 1}
						<input
							type="number"
							class="max-w-[60px] mr-2"
							placeholder="1"
							bind:value={sectionItem.colSpan}
						/>
						x
						<input
							type="number"
							class="max-w-[60px] ml-2"
							placeholder="1"
							bind:value={sectionItem.rowSpan}
						/>
					{:else if sectionItem.imageUrl}
						<select bind:value={sectionItem.colSpan}>
							<option value="">Default</option>
							<option value="12">12 x 12</option>
							<option value="4">4 x 8</option>
							<option value="6">6 x 6</option>
							<option value="8">8 x 4</option>
						</select>
					{/if}
				</div>
			{/if}

			{#if sectionItem !== section && sectionItem.imageUrl}
				<div class="mr-2">
					<input type="checkbox" bind:checked={sectionItem.isReversed} /> Reverse Image Position
				</div>
			{/if}

			{#if sectionItem.items}
				<div class="mr-2">
					<input type="checkbox" bind:checked={sectionItem.isTitleLeft} /> Align Left
				</div>
			{/if}

			{#if !sectionItem.bgImageUrl}
				<div class="">
					{#if sectionItem.id !== section.id}
						<div class="text-sm mb-2 mt-8">Style</div>
						<select bind:value={sectionItem.className}>
							<option value="">Default</option>

							<option value="_highlighted">Highlighted</option>
							<option value="_darker">Dark</option>
							<option value="_transparent">Transparent</option>
						</select>
					{/if}
				</div>
			{/if}

			<div class="my-4">
				<input class="" type="checkbox" bind:checked={sectionItem.isHugeTitle} /> Is Huge Title
				{#if section === sectionItem}
					<input class="ml-4" type="checkbox" bind:checked={sectionItem.isGlowing} /> Is Glowing
				{/if}
				{#if sectionItem.emoji}
					<div class="mt-2">
						<input type="checkbox" bind:checked={sectionItem.isIconLeft} /> Show Icon Near Title
					</div>
				{/if}
			</div>
		</div>

		<div class="my-4">
			<div class="text-sm mb-2">Background Image</div>

			<FileInput
				class="w-full"
				isCanSearch
				{theme}
				on:change={() => {
					if (sectionItem.bgImageUrl) {
						sectionItem.className = '_darker';
					}
				}}
				bind:url={sectionItem.bgImageUrl}
			/>
		</div>

		<button class="_button _primary _small mt-8 mb-2 w-full" on:click={close}>Save & Close</button>
	</div>
{/if}

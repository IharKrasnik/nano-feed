<script>
	import _ from 'lodash';
	import tooltip from 'lib/use/tooltip';
	import getRandomEmoji from 'lib/services/getRandomEmoji';
	import getRandomProjectEmoji from 'lib/services/getRandomProjectEmoji';
	import { fly } from 'svelte/transition';
	import FileInput from 'lib/components/FileInput.svelte';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import Modal from 'lib/components/Modal.svelte';
	import EditInteractiveOptions from '$lib/components/edit/InteractiveOptions.svelte';
	import EditSectionSettings from '$lib/components/edit/SectionSettings.svelte';
	import RenderSection from '$lib/components/render/Section.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import clickOutside from 'lib/use/clickOutside';
	import sectionToEdit from '$lib/stores/sectionToEdit';
	import contenteditable from 'lib/use/contenteditable';

	let clazz = 'p-4';
	export { clazz as class };

	export let isWithUrl = true;
	export let isWithGrid = true;
	export let isWithSubtitle = false;
	export let isWithSettings = true;

	export let item;
	export let section;

	export let onRemove = () => {
		section.items = section.items.filter((i) => i !== item);
	};

	let isEmojiPickerShown;

	let addBenefit = () => {
		item.pricing.benefits = item.pricing.benefits || [];
		item.pricing.benefits.push({ name: '' });
	};
</script>

{#if isEmojiPickerShown}
	<div class="fixed top-[200px] mt-8 z-40" in:fly={{ y: 50, duration: 150 }}>
		<emoji-picker
			class="light"
			on:emoji-click={(evt) => {
				item.emoji = evt.detail.unicode;
				isEmojiPickerShown = false;

				section.items = section.items.map((i) => {
					if (i === isEmojiPickerShown) {
						i.emoji = item.emoji;
						isEmojiPickerShown = false;
					}

					return i;
				});
			}}
		/>

		{#if isEmojiPickerShown.emoji}
			<div
				class="w-full text-center cursor-pointer bg-white p-4"
				on:click={() => {
					section.items = section.items.map((item) => {
						if (item === isEmojiPickerShown) {
							item.emoji = null;
							isEmojiPickerShown = false;
						}

						return item;
					});
				}}
			>
				Remove Emoji
			</div>
		{/if}
	</div>
{/if}

<div
	class={clazz}
	use:clickOutside
	on:clickOutside={() => {
		isEmojiPickerShown = false;
	}}
>
	<div class="relative flex justify-between items-center mb-4">
		<div class="flex items-center w-full">
			{#if (section.renderType !== 'form' && section.renderType !== 'carousel') || item.isActionSuccessSection}
				<EmojiPicker bind:icon={item.emoji} />
			{/if}

			{#if isWithUrl && section.type !== 'form'}
				<EditInteractiveOptions bind:section bind:sectionItem={item} />
			{/if}

			{#if (isWithSettings && section.renderType !== 'form' && section.renderType !== 'carousel') || item.isActionSuccessSection}
				<EditSectionSettings bind:sectionItem={item} />
			{/if}

			{#if isWithGrid && section.renderType !== 'carousel'}
				{#if section.columns > 1}
					<FeatherIcon class="ml-4 mr-2" size="15" color="gray" name="grid" />
					<input
						type="number"
						class="max-w-[60px] mr-2"
						placeholder="1"
						bind:value={item.colSpan}
					/>
					x
					<input
						type="number"
						class="max-w-[60px] ml-2"
						placeholder="1"
						bind:value={item.rowSpan}
					/>
				{:else if item.imageUrl}
					<select bind:value={item.colSpan}>
						<option value="">Default</option>
						<option value="12">12 x 12</option>
						<option value="4">4 x 8</option>
						<option value="6">6 x 6</option>
						<option value="8">8 x 4</option>
					</select>
				{/if}
			{/if}

			{#if isWithSubtitle}
				<input class="w-full" placeholder="Subtitle" bind:value={item.subtitle} />
			{/if}
		</div>

		{#if !item.isActionSuccessSection && onRemove}
			<div
				class="opacity-70 hover:opacity-100 transition  text-sm cursor-pointer text-[#8B786D]"
				title="Remove Item"
				on:click={onRemove}
			>
				🗑
			</div>
		{/if}
	</div>

	<div class="flex w-full items-center mb-4">
		<div contenteditable bind:innerHTML={item.title} data-placeholder="Title" use:contenteditable />
	</div>

	<div
		class="w-full mb-4 textarea"
		contenteditable
		use:contenteditable
		bind:innerHTML={item.description}
		data-placeholder="Description"
	/>

	{#if section.renderType === 'form' && item?.id !== section?.id}
		<EditInteractiveOptions bind:section bind:sectionItem={item} isWithButton={false} />
	{/if}

	{#if section.renderType === 'pricing' && item.pricing}
		<div class="flex items-center">
			<div class="mr-2">$</div>

			<input class="mr-2" type="number" bind:value={item.pricing.amount} placeholder="29.99" />

			<select class="w-full" bind:value={item.pricing.per}>
				<option value="month">Month</option>
				<option value="one-time">One-Time</option>
			</select>
		</div>

		{#if item.pricing?.benefits?.length}
			<div class="mt-4">
				{#each item.pricing.benefits as benefit}
					<div class="flex justify-between items-center">
						✅ <input class="w-full my-2 mx-4" bind:value={benefit.name} />
						<div
							class="cursor-pointer"
							on:click={() => {
								item.pricing.benefits = item.pricing.benefits.filter((b) => b !== benefit);
							}}
						>
							🗑
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<div class="w-full p-4 mb-4 cursor-pointer text-center" on:click={addBenefit}>
			➕Add Benefit
		</div>
	{:else if section.renderType !== 'form' || item.isActionSuccessSection}
		<div class="relative flex justify-between items-center">
			<FileInput
				class="w-full"
				placeholder="Paste media URL / clipboard"
				isCanSearch
				bind:url={item.imageUrl}
				isWithIntegrations
				theme="light"
			/>
		</div>
	{/if}
</div>

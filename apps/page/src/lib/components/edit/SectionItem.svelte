<script>
	import _ from 'lodash';
	import tooltip from 'lib/use/tooltip';
	import getRandomEmoji from 'lib/services/getRandomEmoji';
	import { fly } from 'svelte/transition';
	import FileInput from 'lib/components/FileInput.svelte';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import Modal from 'lib/components/Modal.svelte';
	import EditUrl from '$lib/components/edit/URL.svelte';
	import RenderSection from '$lib/components/render/Section.svelte';
	import clickOutside from 'lib/use/clickOutside';
	import sectionToEdit from '$lib/stores/sectionToEdit';

	let clazz = 'p-4';
	export { clazz as class };

	export let isWithUrl = true;

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
		<div class="flex items-center ">
			<EmojiPicker bind:icon={item.emoji} />

			<!-- <div
				class="min-w-[37px] min-h-[37px] bg-section rounded-xl flex items-center justify-center cursor-pointer"
				on:click={() => {
					isEmojiPickerShown = item;
				}}
			>
				{item.emoji || '✨'}
			</div> -->
			{#if isWithUrl}
				<EditUrl bind:url={item.url} bind:callToActionText={item.callToActionText} />
			{/if}
		</div>

		{#if onRemove}
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
		<div contenteditable bind:innerHTML={item.title} data-placeholder="Title" />
	</div>

	<div
		class="w-full mb-4 textarea"
		contenteditable
		bind:innerHTML={item.description}
		data-placeholder="Description"
	/>

	{#if section.type === 'pricing' && item.pricing}
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
	{:else}
		<div class="relative flex justify-between items-center">
			<FileInput
				class="w-full"
				placeholder="Insert image/video url or paste from clipboard"
				isCanSearch
				bind:url={item.imageUrl}
				theme="light"
			/>
		</div>
	{/if}
</div>

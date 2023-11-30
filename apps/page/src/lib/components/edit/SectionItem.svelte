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
	import SelectBackgroundImage from '$lib/components/SelectImageBackground.svelte';

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

	let isSelectBackgroundModalShown;
</script>

{#if isSelectBackgroundModalShown}
	<Modal
		isShown={isSelectBackgroundModalShown}
		onClosed={() => {
			isSelectBackgroundModalShown = false;
		}}
	>
		<SelectBackgroundImage
			bind:imageUrl={item.imageUrl}
			bind:imageBackgroundUrl={item.imageBackgroundUrl}
			onSelected={() => {
				isSelectBackgroundModalShown = false;
			}}
		/>
	</Modal>
{/if}

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
				<EditSectionSettings bind:section bind:sectionItem={item} />
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
				<option value="one-time">One-Time</option>
				<option value="week">Week</option>
				<option value="month">Month</option>
				<option value="Quarter">Quarter</option>
				<option value="year">Year</option>
			</select>
		</div>

		<div class="mt-4 text-sm mb-2">Benefits (separate by new line)</div>
		<textarea class="w-full" bind:value={item.pricing.benefitsStr} />

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
	{:else if section.renderType !== 'form' || item.isActionSuccessSection}
		<div class="relative flex justify-between items-center">
			<FileInput
				class="w-full"
				placeholder="Media URL (or clipboard)"
				isCanSearch
				bind:url={item.imageUrl}
				isWithIntegrations
				theme="light"
			/>
		</div>
		{#if item.imageUrl}
			<div class="flex items-center mt-2 justify-between">
				<div class="text-xs flex gap-2 items-center">
					<div
						class="cursor-pointer"
						on:click={() => {
							item.imageAspectRatio = 'og';
						}}
						class:font-bold={!item.imageAspectRatio || item.imageAspectRatio === 'og'}
					>
						OG (1200x630)
					</div>

					<div
						class="cursor-pointer"
						on:click={() => {
							item.imageAspectRatio = 'image';
						}}
						class:font-bold={item.imageAspectRatio === 'image'}
					>
						Classic (4x3)
					</div>

					<div
						class="cursor-pointer"
						on:click={() => {
							item.imageAspectRatio = 'square';
						}}
						class:font-bold={item.imageAspectRatio === 'square'}
					>
						Square
					</div>
				</div>
				<div
					class="ml-4"
					on:click={() => {
						isSelectBackgroundModalShown = true;
					}}
				>
					<div class="flex items-center justify-center border rounded text-xs">
						{#if item.imageBackgroundUrl}
							<img class="w-[25px] h-[25px]" src={item.imageBackgroundUrl} />
						{:else}
							<div class="px-2 cursor-pointer">no background</div>
						{/if}
					</div>
				</div>
			</div>
		{/if}
		{#if section.imageUrl && item === section}
			<div class="text-xs mt-2 flex gap-2 items-center">
				<div
					class="cursor-pointer"
					on:click={() => {
						section.imgMaxWidth = 0;
					}}
					class:font-bold={!section.imgMaxWidth}
				>
					Stretch
				</div>

				<div
					class="cursor-pointer"
					on:click={() => {
						section.imgMaxWidth = 600;
					}}
					class:font-bold={section.imgMaxWidth === 600}
				>
					Medium
				</div>
			</div>
		{/if}
	{/if}
</div>

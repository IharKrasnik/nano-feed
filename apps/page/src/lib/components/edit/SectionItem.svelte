<script>
	import _ from 'lodash';
	import tooltip from 'lib/use/tooltip';
	import getRandomEmoji from 'lib/services/getRandomEmoji';
	import getRandomProjectEmoji from 'lib/services/getRandomProjectEmoji';
	import { fly } from 'svelte/transition';
	import FileInput from 'lib/components/FileInput.svelte';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import Modal from 'lib/components/Modal.svelte';
	import EditUrl from '$lib/components/edit/URL.svelte';
	import RenderSection from '$lib/components/render/Section.svelte';
	import FeatherIcon from '$lib/components/FeatherIcon.svelte';
	import clickOutside from 'lib/use/clickOutside';
	import sectionToEdit from '$lib/stores/sectionToEdit';
	import contenteditable from 'lib/use/contenteditable';

	let clazz = 'p-4';
	export { clazz as class };

	export let isWithUrl = true;
	export let isWithGrid = true;
	export let isWithSubtitle = false;
	export let isWithInteractive = true;

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

	let addAnswer = (item) => {
		if (!item.interactiveAnswers) {
			item.interactiveAnswers = [{ emoji: '👍' }, { emoji: '👎' }];
		} else {
			item.interactiveAnswers.push({ emoji: getRandomProjectEmoji() });
			item.interactiveAnswers = [...item.interactiveAnswers];
		}

		section = { ...section };
	};

	let removeAnswerFromItem = (item, answer) => {
		item.interactiveAnswers = item.interactiveAnswers.filter((a) => a.emoji !== answer.emoji);
		section = { ...section };
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
			<EmojiPicker bind:icon={item.emoji} />

			{#if isWithUrl}
				<EditUrl bind:url={item.url} bind:callToActionText={item.callToActionText} />
			{/if}

			{#if isWithInteractive && !item.interactiveAnswers?.length}
				<button on:click={() => addAnswer(item)}>🕹</button>
			{/if}

			{#if isWithGrid}
				<FeatherIcon class="ml-4 mr-2" size="15" color="gray" name="grid" />
				<input type="number" class="max-w-[60px] mr-2" placeholder="1" bind:value={item.colSpan} />
				x
				<input type="number" class="max-w-[60px] ml-2" placeholder="1" bind:value={item.rowSpan} />
			{/if}

			{#if isWithSubtitle}
				<input class="ml-4 w-full" placeholder="Subtitle" bind:value={item.subtitle} />
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
		<div contenteditable bind:innerHTML={item.title} data-placeholder="Title" use:contenteditable />
	</div>

	<div
		class="w-full mb-4 textarea"
		contenteditable
		use:contenteditable
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

	{#if item.interactiveAnswers?.length}
		<div class="font-normal text-sm opacity-70 mt-4 mb-2">How users can answer?</div>

		<select class="w-full" bind:value={section.interactiveRenderType}>
			<option value="single_choice">Single Choice</option>
			<option value="short_answer">Short Answer</option>
		</select>

		<div>
			{#if !section.interactiveRenderType || section.interactiveRenderType === 'single_choice'}
				{#each item.interactiveAnswers as answer}
					<div class="flex justify-between">
						<EmojiPicker
							isNoCustom
							class="w-full p-2 bg-[#fafafa] my-2 text-center"
							bind:icon={answer.emoji}
						/>

						<button on:click={() => removeAnswerFromItem(item, answer)}>🗑</button>
					</div>
				{/each}
				{#if item.interactiveAnswers.length === 3}
					<div class="text-sm">You can add up to 3 answers</div>
				{:else}
					<button class="_small _secondary w-full" on:click={() => addAnswer(item)}
						>Add another interactive answer</button
					>
				{/if}
			{:else if section.interactiveRenderType === 'short_answer'}
				<div class="text-sm mt-4">User will see Input</div>
			{/if}
		</div>

		<div>
			<div class="font-normal text-sm opacity-70 mt-4 mb-2 font-bold">Save to variable</div>
			<input class="w-full" placeholder="reasonToSwitch" bind:value={section.varName} />

			{#if section.varName}
				<div class="font-normal text-sm opacity-70 mt-4 mb-2">
					The result will be available in $user.{section.varName}
				</div>
			{/if}
		</div>
	{/if}
</div>

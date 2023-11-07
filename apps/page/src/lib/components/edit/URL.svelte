<script>
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import getRandomProjectEmoji from 'lib/services/getRandomProjectEmoji';
	import { fly } from 'svelte/transition';

	import isUrl from 'lib/helpers/isUrl';
	import clickOutside from 'lib/use/clickOutside';

	export let sectionItem;

	export let placeholder = 'Insert URL';
	export let isShown = false;

	let show = () => {
		isShown = true;
	};

	let close = () => {
		isShown = false;
	};

	let prevUrl = sectionItem.url;

	$: if (prevUrl !== sectionItem.url) {
		prevUrl = sectionItem.url;
	} else if (innerUrl) {
		if (isUrl(innerUrl)) {
			sectionItem.url = innerUrl;
			prevUrl = sectionItem.url;
		}
	} else if (sectionItem.url) {
		sectionItem.url = null;
		prevUrl = null;
	}

	let innerUrl = sectionItem.url;

	let addAnswer = () => {
		if (!sectionItem.interactiveAnswers) {
			sectionItem.interactiveAnswers = [{ emoji: '👍' }, { emoji: '👎' }];
		} else {
			sectionItem.interactiveAnswers.push({ emoji: getRandomProjectEmoji() });
			sectionItem.interactiveAnswers = [...sectionItem.interactiveAnswers];
		}

		section = { ...section };
	};

	let removeAnswerFromItem = (item = sectionItem, answer) => {
		sectionItem.interactiveAnswers = sectionItem.interactiveAnswers.filter(
			(a) => a.emoji !== answer.emoji
		);
		section = { ...section };
	};
</script>

<div
	class="ml-2 w-[37px] h-[37px] bg-[#fafafa] rounded-xl flex items-center justify-center cursor-pointer {sectionItem.url
		? 'bg-green-200'
		: ''}"
	on:click={show}
>
	🕹
</div>

{#if isShown}
	<div
		class="absolute top-0 mt-8 p-4 z-40 bg-white w-full border border-[#e0dede] rounded-xl"
		in:fly={{ y: 50, duration: 150 }}
		use:clickOutside
		on:clickOutside={close}
	>
		<div class="font-normal text-sm opacity-70 mt-4 mb-2">How users can interact?</div>

		<select
			class="w-full"
			bind:value={sectionItem.interactiveRenderType}
			on:change={() => {
				if (sectionItem.interactiveRenderType === 'email') {
					sectionItem.varName = 'email';
				} else {
					sectionItem.varName = '';
				}

				if (sectionItem.interactiveRenderType === 'single_choice') {
					sectionItem.interactiveAnswers = [{ emoji: '👍' }, { emoji: '👎' }];
				}
			}}
		>
			<option value="">None</option>
			<option value="button">Click Button</option>
			<option value="link">Click Link</option>
			<option value="email">Submit Email</option>
			<option value="single_choice">Select Single Choice</option>
			<option value="short_answer">Short Answer</option>
		</select>

		{#if sectionItem.interactiveRenderType === 'button' || sectionItem.interactiveRenderType === 'link'}
			<div class="text-sm opacity-70 mt-4 mb-2">URL to open on click</div>
			<input class="w-full" bind:value={innerUrl} {placeholder} type="url" />

			<div class="text-sm opacity-70 mt-4 mb-2">
				{sectionItem.interactiveRenderType === 'link' ? 'Link' : 'Button'} text
			</div>
			<input
				class="w-full"
				bind:value={sectionItem.callToActionText}
				placeholder="Learn More"
				type="text"
			/>
		{:else}
			<div>
				{#if sectionItem.interactiveAnswers?.length && (!sectionItem.interactiveRenderType || sectionItem.interactiveRenderType === 'single_choice')}
					{#each sectionItem.interactiveAnswers as answer}
						<div class="flex justify-between">
							<EmojiPicker
								isNoCustom
								class="w-full p-2 bg-[#fafafa] my-2 text-center"
								bind:icon={answer.emoji}
							/>

							<button on:click={() => removeAnswerFromItem(sectionItem, answer)}>🗑</button>
						</div>
					{/each}
					{#if sectionItem.interactiveAnswers.length === 3}
						<div class="text-sm">You can add up to 3 answers</div>
					{:else}
						<button class="_small _secondary w-full" on:click={() => addAnswer(sectionItem)}
							>Add another interactive answer</button
						>
					{/if}
				{:else if sectionItem.interactiveRenderType === 'short_answer'}
					<div class="text-sm mt-4">User will see Input</div>
				{/if}
			</div>
		{/if}

		<div>
			<div class="font-normal text-sm opacity-70 mt-4 mb-2 font-bold">Save to variable</div>
			<input
				class="w-full"
				placeholder="reasonToSwitch"
				disabled={sectionItem.interactiveRenderType === 'email'}
				bind:value={sectionItem.varName}
			/>

			{#if sectionItem.varName}
				<div class="font-normal text-sm opacity-70 mt-4 mb-2">
					The result will be available in $user.{sectionItem.varName}
				</div>
			{/if}
		</div>

		<div class="mt-4">
			<button class="_primary _small mt-4 cursor-pointer text-sm" on:click={close}>Save</button>
		</div>
	</div>
{/if}

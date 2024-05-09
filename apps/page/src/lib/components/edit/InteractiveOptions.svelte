<script>
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import getRandomProjectEmoji from 'lib/services/getRandomProjectEmoji';
	import { fly } from 'svelte/transition';

	import isUrl from 'lib/helpers/isUrl';
	import clickOutside from 'lib/use/clickOutside';

	let clazz;
	export { clazz as class };

	export let sectionItem;
	export let section;

	export let isWithButton = true;
	export let options = [];
	export let isRenderTypeLocked = false;

	export let placeholder = 'https://myurl.com';
	export let isShown = !isWithButton;

	import { default as usePlaceholder } from 'lib/use/placeholder';

	let show = () => {
		isShown = true;
	};

	let close = () => {
		isShown = false;
	};

	let addAnswer = () => {
		if (!sectionItem.interactiveAnswers) {
			sectionItem.interactiveAnswers = [{ emoji: '👍' }, { emoji: '👎' }];
		} else {
			sectionItem.interactiveAnswers.push({ emoji: getRandomProjectEmoji() });
			sectionItem.interactiveAnswers = [...sectionItem.interactiveAnswers];
		}

		sectionItem = { ...sectionItem };
	};

	let removeAnswerFromItem = (item = sectionItem, answer) => {
		sectionItem.interactiveAnswers = sectionItem.interactiveAnswers.filter(
			(a) => a.emoji !== answer.emoji
		);
		sectionItem = { ...sectionItem };
	};
</script>

{#if isWithButton}
	<div
		class="ml-2 w-[37px] h-[37px] shrink-0 bg-[#fafafa] rounded-xl flex items-center justify-center cursor-pointer {sectionItem.url
			? 'bg-green-200'
			: ''}"
		on:click={show}
	>
		🕹
	</div>
{/if}

{#if isShown}
	<div
		class="{isWithButton
			? 'absolute top-0 mt-8 p-4 z-40 bg-white w-full border border-[#e0dede] rounded-xl'
			: ''} {clazz}"
		in:fly={{ y: 50, duration: 150 }}
		use:clickOutside
		on:clickOutside={() => (isWithButton ? close() : null)}
	>
		{#if !sectionItem.isMustHaveField && !isRenderTypeLocked}
			<div class="font-normal text-sm opacity-70 mb-2">How users can interact?</div>

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

					if (sectionItem.interactiveRenderType === 'multiple_choice') {
						sectionItem.interactiveAnswers = [{ emoji: '👍' }, { emoji: '🎉' }, { emoji: '💯' }];
					}
				}}
			>
				{#if options?.length}
					{#each options as option}
						<option value={option.value}>{option.text}</option>
					{/each}
				{:else if sectionItem.isActionSuccessSection}
					<option value="">No interaction</option>
					<option value="link">Click 1 Link</option>
					<option value="links">Click Few Links</option>
					<option value="single_choice">Community Single Choice</option>
					<option value="multiple_choice">Community Multiple Choice</option>
					<option value="short_answer">Community Answer</option>
				{:else if section?.renderType === 'form'}
					{#if !section.items?.includes((i) => {
						return i.interactiveRenderType === 'email';
					})}
						<option value="email">Email </option>
					{/if}
					<option value="text">Short Text</option>
					<option value="url">URL</option>
					<option value="textarea">Long Text</option>
				{:else}
					<option value="">{sectionItem.url ? 'Open URL on click' : 'No interaction'}</option>
					<option value="link">Click 1 Link</option>
					<option value="links">Click Few Links</option>
					<option value="email">Submit Email</option>
					<option value="input">Text Input</option>
					<option value="form">Submit Form</option>
					<option value="single_choice">Community Single Choice</option>
					<option value="multiple_choice">Community Multiple Choice</option>
					<option value="short_answer">Community Answer</option>
					<!-- <option value="wave_analytics">See Public Web Analytics</option> -->
				{/if}
			</select>
		{/if}

		{#if section?.renderType === 'form' && ['text', 'textarea', 'email', 'description', 'input'].includes(sectionItem.interactiveRenderType)}
			<div class="mb-2 mt-4">
				<div class="text-sm opacity-70 mb-2">Placeholder</div>
				<input
					type="text"
					class="w-full"
					placeholder="Placeholder"
					bind:value={sectionItem.interactivePlaceholder}
				/>
			</div>
		{/if}

		{#if sectionItem.interactiveRenderType === 'link' || sectionItem.interactiveRenderType === 'links'}
			<EmojiPicker class="mt-4" isNoCustom bind:icon={sectionItem.urlIcon} />

			<div class="flex items-center w-full justify-between mt-4 mb-2">
				<div class="text-sm opacity-70">
					{sectionItem.isUrlLink ? 'Link' : 'Button'} text
				</div>

				<div>
					<input type="checkbox" bind:checked={sectionItem.isUrlLink} />
					show as link
				</div>
			</div>

			<input
				class="w-full"
				bind:value={sectionItem.callToActionText}
				placeholder="Learn More"
				type="text"
			/>

			<div class="text-sm opacity-70 mt-4 mb-2">URL to open on click</div>

			<div class="relative flex items-center">
				<input class="w-full" bind:value={sectionItem.url} {placeholder} type="url" />
				<FeatherIcon class="absolute right-4" size={15} color="#555555" name="globe" />
			</div>

			{#if sectionItem.interactiveRenderType === 'links'}
				<hr class="my-8 opacity-70" />
				<EmojiPicker class="mt-4" bind:icon={sectionItem.url2Icon} />

				<div class="w-full flex items-center mt-4 mb-2 justify-between">
					<div class="text-sm opacity-70 ">
						{sectionItem.isUrl2Link ? 'Link 2' : 'Button 2'} text
					</div>
					<div>
						<input type="checkbox" bind:checked={sectionItem.isUrl2Button} />
						is link
					</div>
				</div>

				<div>
					<input
						class="w-full"
						bind:value={sectionItem.callToActionText2}
						placeholder="Learn More"
						type="text"
					/>
				</div>

				<div class="text-sm opacity-70 mt-4 mb-2">URL to open on click</div>
				<input class="w-full" bind:value={sectionItem.url2} {placeholder} type="url" />
			{/if}
		{:else if sectionItem.interactiveRenderType === 'email' || sectionItem.interactiveRenderType === 'input'}
			{#if sectionItem.interactiveRenderType === 'input'}
				<div class="mb-2 mt-4">
					<div class="shrink-0 text-sm mb-2 opacity-70">Input Placeholder</div>
					<input
						class="w-full"
						bind:value={sectionItem.inputPlaceholder}
						placeholder="Start Typing..."
						type="text"
					/>
				</div>
			{/if}

			<div class="mb-2 mt-4">
				<div class="shrink-0 text-sm mb-2 opacity-70">Button text</div>
				<input
					class="w-full"
					bind:value={sectionItem.callToActionText}
					placeholder="Learn More"
					type="text"
				/>
			</div>
		{:else if sectionItem.id !== section.id}
			{#if section.renderType !== 'form'}
				<div class="my-2">
					<div class="text-sm opacity-70 mt-4 mb-2">URL to open on click</div>
					<input class="w-full" bind:value={sectionItem.url} {placeholder} type="url" />
				</div>
			{/if}
		{:else}
			<div>
				{#if sectionItem.interactiveAnswers?.length && (!sectionItem.interactiveRenderType || sectionItem.interactiveRenderType === 'single_choice' || sectionItem.interactiveRenderType === 'multiple_choice')}
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
				{:else if sectionItem.interactiveRenderType === 'short_answer'}
					<div class="text-sm mt-4">User will see Input</div>
				{/if}
				{#if sectionItem.interactiveRenderType === 'single_choice' || sectionItem.interactiveRenderType === 'multiple_choice'}
					{#if sectionItem.interactiveAnswers?.length === 3}
						<div class="text-sm">You can add up to 3 answers</div>
					{:else}
						<button class="_small _secondary w-full mt-4" on:click={() => addAnswer(sectionItem)}
							>Add interactive answer</button
						>
					{/if}
				{/if}
			</div>
		{/if}

		{#if false && sectionItem.interactiveRenderType && sectionItem.interactiveRenderType !== 'email'}
			<div>
				<div class="font-normal text-sm opacity-70 mt-4 mb-2 font-bold">Save to variable</div>
				<input
					class=""
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
		{/if}

		{#if ['email', 'input', 'link', 'links'].includes(sectionItem.interactiveRenderType) && section?.renderType !== 'form'}
			<div class="flex items-center font-normal text-sm mb-2 mt-4 w-full">
				<div class="shrink-0  opacity-70">Explainer:</div>

				<div
					contenteditable=""
					class="ml-4 w-full"
					use:usePlaceholder={'No credit card required'}
					bind:innerHTML={sectionItem.ctaExplainer}
				/>
			</div>

			{#if sectionItem.interactiveRenderType === 'email' || sectionItem.interactiveRenderType === 'input'}
				<div class="font-normal opacity-70 text-sm mb-2 mt-2">Once submitted...</div>

				<div class="w-full mb-2">
					<select bind:value={sectionItem.actionType} class="w-full">
						{#if sectionItem.interactiveRenderType === 'email'}
							<option value="success">Show thank you message</option>
						{/if}

						<option value="url">Redirect to URL</option>
					</select>
				</div>
			{/if}

			{#if sectionItem.actionType === 'url'}
				<div class="font-normal text-sm opacity-70 mt-4 mb-2">URL to open once email submitted</div>

				<input
					class="w-full mb-4"
					bind:value={sectionItem.actionUrl}
					placeholder="https://myurl.com"
				/>
			{/if}
		{/if}

		{#if isWithButton}
			<div class="mt-4">
				<button class="_primary _small mt-4 cursor-pointer text-sm" on:click={close}>Save</button>
			</div>
		{/if}
	</div>
{/if}

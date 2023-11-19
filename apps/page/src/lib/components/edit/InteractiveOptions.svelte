<script>
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import getRandomProjectEmoji from 'lib/services/getRandomProjectEmoji';
	import { fly } from 'svelte/transition';

	import isUrl from 'lib/helpers/isUrl';
	import clickOutside from 'lib/use/clickOutside';

	let clazz;
	export { clazz as class };

	export let sectionItem;
	export let section;

	export let isWithButton = true;

	export let placeholder = 'Insert URL';
	export let isShown = !isWithButton;

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
		class="ml-2 w-[37px] h-[37px] bg-[#fafafa] rounded-xl flex items-center justify-center cursor-pointer {sectionItem.url
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
			? 'absolute top-0  mt-8 p-4 z-40 bg-white w-full border border-[#e0dede] rounded-xl'
			: ''} {clazz}"
		in:fly={{ y: 50, duration: 150 }}
		use:clickOutside
		on:clickOutside={() => (isWithButton ? close() : null)}
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
			{#if sectionItem.isActionSuccessSection}
				<option value="">No interaction</option>
				<option value="link">Click 1 Link</option>
				<option value="links">Click Few Links</option>
				<option value="single_choice">Community Single Choice</option>
				<option value="short_answer">Community Answer</option>
			{:else if section?.renderType === 'form'}
				<option value="email">Email</option>
				<option value="text">Short Text</option>
				<option value="textarea">Long Text</option>
			{:else}
				<option value="">No interaction</option>
				<option value="link">Click 1 Link</option>
				<option value="links">Click Few Links</option>
				<option value="email">Submit Email</option>
				<option value="single_choice">Community Single Choice</option>
				<option value="short_answer">Community Answer</option>
				<option value="wave_analytics">See Public Web Analytics</option>
			{/if}
		</select>

		{#if section?.renderType === 'form' && ['text', 'textarea', 'email'].includes(sectionItem.interactiveRenderType)}
			<div class="my-2">
				<div class="text-sm opacity-70 mb-2">Placeholder</div>
				<input
					type="text"
					placeholder="Placeholder"
					bind:value={sectionItem.interactivePlaceholder}
				/>
			</div>
		{/if}

		{#if sectionItem.interactiveRenderType === 'link' || sectionItem.interactiveRenderType === 'links'}
			<EmojiPicker class="mt-4" isNoCustom bind:icon={sectionItem.urlIcon} />

			<div class="flex items-center w-full justify-between mt-4 mb-2">
				<div class="text-sm opacity-70">
					{sectionItem.isUrlButton ? 'Button' : 'Link'} text
				</div>

				<div>
					<input type="checkbox" bind:checked={sectionItem.isUrlButton} />
					is button
				</div>
			</div>

			<input
				class="w-full"
				bind:value={sectionItem.callToActionText}
				placeholder="Learn More"
				type="text"
			/>

			<div class="text-sm opacity-70 mt-4 mb-2">URL to open on click</div>
			<input class="w-full" bind:value={sectionItem.url} {placeholder} type="url" />

			{#if sectionItem.interactiveRenderType === 'links'}
				<hr class="my-8 opacity-70" />
				<EmojiPicker class="mt-4" bind:icon={sectionItem.url2Icon} />

				<div class="w-full flex items-center mt-4 mb-2 justify-between">
					<div class="text-sm opacity-70 ">
						{sectionItem.isUrl2Button ? 'Button 2' : 'Link 2'} text
					</div>
					<div>
						<input type="checkbox" bind:checked={sectionItem.isUrl2Button} />
						is button
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

		{#if sectionItem.interactiveRenderType && sectionItem.interactiveRenderType !== 'email'}
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

		{#if sectionItem.interactiveRenderType === 'email' && section?.renderType !== 'form'}
			<div class="font-normal text-sm opacity-70 mb-2 mt-4">Button text</div>

			<input
				class="mb-4 w-full"
				bind:value={sectionItem.callToAction}
				placeholder="Join Waitlist"
			/>

			<div class="flex items-center font-normal text-sm mb-2 w-full">
				<div class="shrink-0  opacity-70">Explainer:</div>

				<input
					class="ml-4 w-full"
					placeholder="No credit card required"
					bind:value={sectionItem.ctaExplainer}
				/>
			</div>

			<div class="font-normal opacity-70 text-sm mb-2 mt-2">Once submitted...</div>

			<div class="w-full mb-2">
				<select bind:value={sectionItem.actionType} class="w-full">
					<option value="success">Show thank you message</option>
					<option value="url">Redirect to URL</option>
				</select>
			</div>

			{#if sectionItem.actionType === 'url'}
				<div class="font-normal text-sm opacity-70 mt-4 mb-2">URL to open once email submitted</div>

				<input class="w-full mb-4" bind:value={sectionItem.actionUrl} placeholder="Action Url" />
			{/if}
		{/if}

		{#if isWithButton}
			<div class="mt-4">
				<button class="_primary _small mt-4 cursor-pointer text-sm" on:click={close}>Save</button>
			</div>
		{/if}
	</div>
{/if}

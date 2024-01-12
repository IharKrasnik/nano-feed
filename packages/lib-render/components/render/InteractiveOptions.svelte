<script>
	import _ from 'lodash';
	import SvelteMarkdown from 'svelte-markdown';
	import { fly, fade, slide } from 'svelte/transition';
	import { v4 as uuidv4 } from 'uuid';
	import { post } from 'lib/api';

	import currentCustomer from 'lib/stores/currentCustomer';
	import heatmap, { getHeatmapClicksCount } from 'lib-render/stores/heatmap';

	import Loader from 'lib/components/Loader.svelte';
	import Emoji from 'lib/components/Emoji.svelte';
	import isUrlEmbeddable from 'lib/helpers/isUrlEmbeddable';
	import Popup from 'lib-render/components/Popup.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import WaveIndicator from 'lib/components/wave/WaveIndicator.svelte';
	import trackClick from 'lib/services/trackClick';
	import trackForm from 'lib/services/trackForm';
	import trackInteractiveAnswer from 'lib/services/trackInteractiveAnswer';
	import RenderForm from 'lib-render/components/render/Form.svelte';

	export let page;

	export let sectionItem;
	export let trackId = null;

	export let isHeader = false;

	export let size;

	export let parentSectionId;
	export let itemClass = 'p-2 mx-3';
	export let urlClass = '';
	export let url2Class = '';
	export let isNoLabel = false;

	export let isEdit;
	export let isEmbed;

	let isUrlLoading = false;
	let isUrl2Loading = false;

	let isCtaPopupShown = false;

	import refreshConditionsTimestamp from 'lib-render/stores/refreshConditionsTimestamp';

	let clazz = '';
	let shortAnswer = '';
	export { clazz as class };

	let isAnswerSubmitted;

	let LOCAL_STORAGE_KEY = `ANSWER_` + (sectionItem.id || sectionItem._id);

	let myAnswer = JSON.parse(localStorage[LOCAL_STORAGE_KEY] || null) || null;

	if (!sectionItem.interactiveAnswers) {
		sectionItem.interactiveAnswers = [];
	}

	sectionItem.interactiveAnswers = sectionItem.interactiveAnswers.map((a) => ({
		...a,
		isSelected: false
	}));

	if (myAnswer) {
		(_.isArray(myAnswer) ? myAnswer : [myAnswer]).forEach((answer) => {
			sectionItem.interactiveAnswers = sectionItem.interactiveAnswers.map((a) => {
				if (a.emoji === answer.emoji) {
					a.isSelected = true;
				}
				return a;
			});
		});
	}

	if (!sectionItem.answersResults) {
		sectionItem.answersResults = [];
	}

	let countAnswers = (answer) => {
		let foundAnswer = sectionItem.answersResults.find((a) => a.emoji === answer.emoji);
		return foundAnswer ? foundAnswer.count : 0;
	};

	let isResetEmail;

	let popupEmbedUrl;

	let submitAnswer = (answer) => {
		$refreshConditionsTimestamp = +new Date();

		if (sectionItem.varName) {
			$currentCustomer.vars = $currentCustomer.vars || {};

			$currentCustomer.vars[sectionItem.varName] = answer.emoji;
		}

		if (
			(!sectionItem.interactiveRenderType ||
				sectionItem.interactiveRenderType === 'single_choice' ||
				sectionItem.interactiveRenderType === 'multiple_choice') &&
			answer.isSelected
		) {
			let foundAnswer = sectionItem.answersResults.find((a) => a.emoji === answer.emoji);

			if (foundAnswer) {
				foundAnswer.count--;
				sectionItem.answersResults = [...sectionItem.answersResults];
			}

			answer.isSelected = false;

			if (sectionItem.interactiveRenderType === 'multiple_choice') {
				myAnswer = myAnswer ? (_.isArray(myAnswer) ? myAnswer : [myAnswer]) : [];
				myAnswer = myAnswer.filter((a) => a.emoji !== answer.emoji);
				localStorage[LOCAL_STORAGE_KEY] = JSON.stringify(myAnswer);
			} else {
				myAnswer = null;
				localStorage[LOCAL_STORAGE_KEY] = null;
			}

			if (sectionItem.varName) {
				delete $currentCustomer.vars[sectionItem.varName];
			}

			return;
		}

		post(`pages/${page._id}/questions/${sectionItem.id || `main-${page._id}`}`, {
			parentSectionId,
			answer,
			interactiveRenderType: sectionItem.interactiveRenderType
		});

		trackInteractiveAnswer({
			sectionId: parentSectionId || sectionItem.id,
			sectionItemId: parentSectionId ? sectionItem.id : null,

			emoji: answer.emoji,
			text: answer.text,
			value: answer.value
		});

		isAnswerSubmitted = true;
		answer.isSelected = true;

		if (sectionItem.interactiveRenderType === 'multiple_choice') {
			myAnswer = myAnswer ? (_.isArray(myAnswer) ? myAnswer : [myAnswer]) : [];
			myAnswer.push(answer);
		} else {
			myAnswer = answer;
		}

		localStorage[LOCAL_STORAGE_KEY] = JSON.stringify(myAnswer);

		sectionItem.answersResults = sectionItem.answersResults || [];

		if (
			!sectionItem.interactiveRenderType ||
			sectionItem.interactiveRenderType === 'single_choice' ||
			sectionItem.interactiveRenderType === 'multiple_choice'
		) {
			let foundAnswer = sectionItem.answersResults.find((a) => a.emoji === answer.emoji);

			if (!foundAnswer) {
				foundAnswer = { emoji: answer.emoji, count: 1 };
				sectionItem.answersResults.push(foundAnswer);
			} else {
				foundAnswer.count++;
			}
		} else if (sectionItem.interactiveRenderType === 'short_answer') {
			sectionItem.answersResults = [answer, ...sectionItem.answersResults];
		}

		sectionItem = {
			...sectionItem,
			interactiveAnswers: sectionItem.interactiveAnswers.map((qa) => {
				if (
					!sectionItem.interactiveRenderType ||
					sectionItem.interactiveRenderType === 'single_choice' ||
					sectionItem.interactiveRenderType === 'multiple_choice'
				) {
					if (
						sectionItem.interactiveRenderType === 'single_choice' &&
						qa.isSelected &&
						qa !== answer
					) {
						let foundPreviousAnswer = sectionItem.answersResults.find((a) => a.emoji === qa.emoji);

						if (foundPreviousAnswer) {
							foundPreviousAnswer.count--;
						} else {
							sectionItem.answersResults.push({ emoji: answer.emoji, count: 0 });
						}
					}

					qa.isSelected = qa === answer;
				}

				return qa;
			})
		};

		$refreshConditionsTimestamp = +new Date();
	};

	let emailAddress = $currentCustomer.email;

	let submitEmail = async () => {
		isResetEmail = false;
		$currentCustomer.email = emailAddress;

		trackForm({ sectionId: sectionItem.id, text: sectionItem.callToActionText });

		let submission = await post(`pages/${page._id}/submissions`, { email: emailAddress });

		if (page.actionUrl) {
			setTimeout(() => {
				window.location.href = page.actionUrl?.startsWith('/')
					? `${page.actionUrl}`
					: page.actionUrl;
			}, 0);
		}
	};

	let trackQuestionClick = ({ callToActionText, url } = {}) => {
		post(`pages/${page._id}/questions/${sectionItem.id}`, {
			parentSectionId,
			answer: {
				click: {
					callToActionText,
					url
				}
			}
		});
	};
</script>

{#if popupEmbedUrl}
	<Popup {page} maxWidth={0} isShown onClosed={() => (popupEmbedUrl = null)}
		><RenderUrl isAutoplay url={popupEmbedUrl} /></Popup
	>
{/if}

{#if sectionItem}
	<div class="{clazz} flex flex-wrap">
		{#if sectionItem.interactiveRenderType === 'single_choice' || sectionItem.interactiveRenderType === 'multiple_choice'}
			{#each sectionItem.interactiveAnswers as answer}
				<div
					on:click={() => submitAnswer(answer)}
					class="{itemClass} border emoji-button  flex items-center transition shadow-sm border-white/50 cursor-pointer"
					class:selected={answer.isSelected}
				>
					{answer.emoji}

					<div class="ml-2">
						{countAnswers(answer)}
					</div>
				</div>
			{/each}
		{:else if sectionItem.interactiveRenderType === 'short_answer'}
			{#if !myAnswer?.value}
				<input
					placeholder="Your Answer"
					bind:value={shortAnswer}
					style="border: 2px var(--accent-color) solid; background: none;"
					on:keypress={(e) => {
						if (e.key === 'Enter') {
							submitAnswer({
								value: shortAnswer
							});
							e.preventDefault();
						}
					}}
				/>
			{:else}
				<div class="{itemClass} text-lg">
					<!-- {sectionItem.interactiveFollowUp?.text || 'Thank you!'} -->

					<div
						class="flex flex-col flex-col-reverse justify-start items-start gap-4 mt-4 _section-item p-4"
					>
						{#each sectionItem.answersResults as answer, i}
							<div
								class="p-4 rounded-xl border rounded-bl-none"
								style="background: var(--accent-color); color: var(--button-color)"
								class:self-end={i % 2 === 1}
							>
								{answer.value}
							</div>
						{/each}
					</div>

					{#if sectionItem.interactiveFollowUp?.callToAction}
						<a href={sectionItem.interactiveFollowUp.callToAction.url}>
							{sectionItem.interactiveFollowUp.callToAction.text}
						</a>
					{/if}
				</div>
			{/if}
		{:else if sectionItem.interactiveRenderType === 'wave_analytics'}
			<WaveIndicator project={{ page }} class="mt-4 _alternative" />
		{:else if sectionItem.interactiveRenderType === 'email'}
			{#if isHeader}
				<button
					class="shrink-0 ring-1"
					on:click={() => {
						let emailInput = document.getElementsByClassName('_email-input')[0];
						if (emailInput) {
							emailInput.focus();
							emailInput.scrollIntoView({
								block: 'center',
								inline: 'nearest'
							});
						}
					}}
					style="--tw-ring-color: {(page.parentPage?.theme || page.theme)?.theme === 'dark'
						? 'var(--accent-color-lighter)'
						: 'var(--accent-color-darker)'};"
					type="submit">{sectionItem.callToActionText || 'Subscribe'}</button
				>
			{:else if $currentCustomer.email && !isResetEmail}
				<div class={clazz?.includes('mx-auto') ? 'mx-auto' : ''}>
					<div>👏 Thank you!</div>
					<div
						class="text-sm cursor-pointer opacity-80"
						on:click={() => {
							isResetEmail = true;
							emailAddress = $currentCustomer.email;
						}}
					>
						Your email is {$currentCustomer.email}
					</div>
				</div>
			{:else}
				<div class="flex flex-col sm:flex-row items-center w-full sm:w-auto">
					<div
						class="_input_container {sectionItem.callToActionText?.length >= 14
							? ''
							: '_long'} _border w-full"
					>
						<form
							class="w-full flex flex-col sm:flex-row gap-4"
							on:submit|preventDefault={submitEmail}
						>
							<input
								placeholder="myemail@gmail.com"
								bind:value={emailAddress}
								class="_input _email-input w-full"
								style=""
							/>
							{#if sectionItem.callToActionText?.length < 14}
								<button
									type="submit"
									class="_input_button px-16 text-center justify-center sm:absolute "
									>{sectionItem.callToActionText || 'Subscribe'}</button
								>
							{/if}
						</form>
					</div>
					{#if sectionItem.callToActionText?.length >= 14}
						<button
							type="submit"
							class=" shrink-0 px-16 py-4 text-center justify-center sm:h-full sm:ml-4 mt-4 sm:mt-0 w-full sm:w-auto"
							>{sectionItem.callToActionText || 'Subscribe'}</button
						>
					{/if}
				</div>
			{/if}
		{:else if sectionItem.interactiveRenderType === 'link' || sectionItem.interactiveRenderType === 'links'}
			<div
				class="flex flex-col sm:flex-row w-full gap-6 items-center {clazz?.includes('mx-auto')
					? 'mx-auto'
					: ''} {clazz?.includes('w-full') ? '' : 'sm:w-auto'}"
			>
				<a
					class="shrink-0 {sectionItem.isUrlLink
						? '_link'
						: ''} cursor-pointer w-full {clazz?.includes('w-full') ? '' : 'sm:w-auto'} {urlClass}"
					target={sectionItem.url?.startsWith('http') ? '_blank' : ''}
					class:heatmap={$heatmap}
					data-heatmap-clicks-count={$heatmap
						? getHeatmapClicksCount({
								sectionId: parentSectionId || sectionItem.id,
								sectionItemId: parentSectionId ? sectionItem.id : null,
								linkId: `${sectionItem.id}_links_0`
						  })
						: ''}
					href={sectionItem.url}
					on:click={async (evt) => {
						trackQuestionClick({
							url: sectionItem.url,
							callToActionText: sectionItem.callToActionText
						});

						trackClick({
							pageId: page?._id,
							sectionId: trackId || parentSectionId || sectionItem.id,
							sectionItemId: trackId ? null : parentSectionId ? sectionItem.id : null,
							linkId: `${trackId || sectionItem.id}_links_0`,
							url: sectionItem.url,
							text: sectionItem.callToActionText
						});

						if (sectionItem.onUrlClick) {
							evt.preventDefault();

							isUrlLoading = true;
							try {
								await sectionItem.onUrlClick();
							} finally {
								isUrlLoading = false;
							}
							return;
						}

						if (isUrlEmbeddable(sectionItem.url)) {
							evt.preventDefault();
							popupEmbedUrl = sectionItem.url;
						}
					}}
				>
					{#if sectionItem.isUrlLink}
						{sectionItem.callToActionText || 'Learn More →'}
					{:else}
						<button
							class="relative overflow-hidden w-full shadow hover:shadow-md hover:shadow-white/50 shadow-white/50 flex justify-center items-center {size
								? `_is${size}`
								: ''}"
							style="--tw-shadow-color: var(--accent-color) !important;"
							class:_alternative={sectionItem.isUrlAlternative ||
								(sectionItem.pricing && !sectionItem.isFeatured)}
						>
							{#if isUrlLoading}
								<div
									class="absolute w-full h-full flex justify-center items-center backdrop-blur-lg rounded-full"
								>
									<Loader theme={page.theme?.theme || 'light'} />
								</div>
							{/if}
							{#if sectionItem.urlIcon}
								<Emoji
									width={size === 'small' ? 15 : 22}
									class="mr-2 rounded-full"
									emoji={sectionItem.urlIcon}
								/>
							{/if}
							{sectionItem.callToActionText || 'Learn More →'}
						</button>
					{/if}
				</a>

				{#if sectionItem.interactiveRenderType === 'links' && !isHeader}
					<a
						class="shrink-0 w-full sm:w-auto cursor-pointer {url2Class} {sectionItem.isUrl2Link
							? '_link'
							: ''}"
						class:heatmap={$heatmap}
						data-heatmap-clicks-count={$heatmap
							? getHeatmapClicksCount({
									sectionId: parentSectionId || sectionItem.id,
									sectionItemId: parentSectionId ? sectionItem.id : null,
									linkId: `${sectionItem.id}_links_1`
							  })
							: ''}
						target={sectionItem.url2?.startsWith('http') ? '_blank' : ''}
						href={sectionItem.url2?.startsWith('/') ? `${sectionItem.url2}` : sectionItem.url2}
						on:click={(evt) => {
							trackClick({
								url: sectionItem.url2,
								callToActionText: sectionItem.callToActionText2
							});

							trackClick({
								pageId: page?._id,
								sectionId: parentSectionId || sectionItem.id,
								sectionItemId: parentSectionId ? sectionItem.id : null,
								linkId: `${sectionItem.id}_links_1`,
								url: sectionItem.url2,
								text: sectionItem.callToActionText2
							});

							if (isUrlEmbeddable(sectionItem.url2)) {
								evt.preventDefault();
								popupEmbedUrl = sectionItem.url2;
							}
						}}
					>
						{#if sectionItem.isUrl2Link}
							{sectionItem.callToActionText2 || 'Learn More →'}
						{:else}
							<button
								class="w-full flex items-center justify-center {size ? `_is${size}` : ''}"
								class:_alternative={!sectionItem.isUrlLink || sectionItem.isUrl2Alternative}
							>
								{#if sectionItem.url2Icon}
									<Emoji
										class="mr-2 rounded-full"
										width={size === 'small' ? 15 : 22}
										emoji={sectionItem.url2Icon}
									/>
								{/if}
								{sectionItem.callToActionText2 || 'Learn More →'}
							</button>
						{/if}
					</a>
				{/if}
			</div>
		{:else if sectionItem.interactiveRenderType === 'form'}
			<RenderForm bind:isEdit bind:isEmbed bind:section={sectionItem.formSection} bind:page />
		{/if}
	</div>

	{#if !isHeader && sectionItem.ctaExplainer}
		<div
			class="text-sm mt-4 {clazz?.includes('w-full')
				? 'w-full text-center'
				: 'max-w-[400px]'} {clazz?.includes('mx-auto') ? 'mx-auto' : ''}"
		>
			{@html sectionItem.ctaExplainer || ''}
		</div>
	{/if}

	{#if !isNoLabel && ['short_answer', 'single_choice', 'multiple_choice'].includes(sectionItem.interactiveRenderType)}
		<div class="flex w-full items-center justify-center mt-4 ">
			<div class="opacity-80 text-sm">Live answers from the community</div>
			<div class="ml-2 w-[7px] h-[7px] rounded-full bg-green-300" />
		</div>
	{/if}
{/if}

<style>
	button._ishuge {
		font-size: 20px;
		padding: 16px 32px;

		border-radius: var(--button-huge-radius);
	}

	button._islarge {
		font-size: 18px;
		padding: 12px 24px;
		border-radius: var(--button-large-radius);
	}

	@media (min-width: 640px) {
		._input_button {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
	}

	.emoji-button:hover {
		background: var(--accent-color) !important;
		color: var(--button-color) !important;
	}

	.emoji-button.selected {
		outline: 2px var(--accent-color) solid;
	}

	.emoji-button {
		background: var(--background-color);
		color: var(--text-color);
		@apply transition rounded-lg;
	}
</style>

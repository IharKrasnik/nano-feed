<script>
	import SvelteMarkdown from 'svelte-markdown';
	import { fly, fade, slide } from 'svelte/transition';
	import { v4 as uuidv4 } from 'uuid';
	import { post } from 'lib/api';

	import currentCustomer from 'lib/stores/currentCustomer';
	import heatmap, { getHeatmapClicksCount } from '$lib/stores/heatmap';

	import Emoji from '$lib/components/render/Emoji.svelte';
	import isUrlEmbeddable from 'lib/helpers/isUrlEmbeddable';
	import Popup from '$lib/components/Popup.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import WaveIndicator from 'lib/components/wave/WaveIndicator.svelte';
	import trackClick from 'lib/services/trackClick';
	import trackForm from 'lib/services/trackForm';
	import trackInteractiveAnswer from 'lib/services/trackInteractiveAnswer';

	export let page;

	export let sectionItem;
	export let trackId = null;

	export let size;

	export let parentSectionId;
	export let itemClass = 'p-4 mx-4';
	export let urlClass = '';
	export let url2Class = '';

	import refreshConditionsTimestamp from '$lib/stores/refreshConditionsTimestamp';

	let clazz = '';
	let shortAnswer = '';
	export { clazz as class };

	let isAnswerSubmitted;

	let LOCAL_STORAGE_KEY = `ANSWER_` + sectionItem.id;

	let myAnswer = JSON.parse(localStorage[LOCAL_STORAGE_KEY] || null) || null;

	if (!sectionItem.interactiveAnswers) {
		sectionItem.interactiveAnswers = [];
	}

	sectionItem.interactiveAnswers = sectionItem.interactiveAnswers.map((a) => ({
		...a,
		isSelected: false
	}));

	if (myAnswer) {
		sectionItem.interactiveAnswers = sectionItem.interactiveAnswers.map((a) => {
			a.isSelected = a.emoji === myAnswer.emoji;
			return a;
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
				sectionItem.interactiveRenderType === 'single_choice') &&
			answer.isSelected
		) {
			let foundAnswer = sectionItem.answersResults.find((a) => a.emoji === answer.emoji);
			foundAnswer.count--;
			sectionItem.answersResults = [...sectionItem.answersResults];
			answer.isSelected = false;

			myAnswer = null;
			localStorage[LOCAL_STORAGE_KEY] = null;

			if (sectionItem.varName) {
				delete $currentCustomer.vars[sectionItem.varName];
			}

			return;
		}

		if (sectionItem.id) {
			post(`pages/${page._id}/questions/${sectionItem.id}`, {
				parentSectionId,
				answer
			});

			trackInteractiveAnswer({
				sectionId: parentSectionId || sectionItem.id,
				sectionItemId: parentSectionId ? sectionItem.id : null,

				emoji: answer.emoji,
				text: answer.text,
				value: answer.value
			});
		}

		isAnswerSubmitted = true;
		answer.isSelected = true;

		myAnswer = answer;
		localStorage[LOCAL_STORAGE_KEY] = JSON.stringify(answer);

		sectionItem.answersResults = sectionItem.answersResults || [];

		if (
			!sectionItem.interactiveRenderType ||
			sectionItem.interactiveRenderType === 'single_choice'
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
					sectionItem.interactiveRenderType === 'single_choice'
				) {
					if (qa.isSelected && qa !== answer) {
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

		let submission = await post(`pages/${page.slug}/submissions`, { email: emailAddress });

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
	<div class="{clazz} flex flex-wrap ">
		{#if sectionItem.interactiveRenderType === 'single_choice'}
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
			{#if $currentCustomer.email && !isResetEmail}
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
				<div class="_input_container _border w-full">
					<form
						class="w-full flex flex-col sm:flex-row gap-4"
						on:submit|preventDefault={submitEmail}
					>
						<input
							placeholder="myemail@gmail.com"
							bind:value={emailAddress}
							class="_input _email-input w-full"
						/>
						<button type="submit" class="_input_button _wide text-center sm:absolute"
							>{sectionItem.callToActionText || 'Subscribe'}</button
						>
					</form>
				</div>

				{#if sectionItem.ctaExplainer}
					<div class="text-sm mt-4 max-w-[400px]">{@html sectionItem.ctaExplainer}</div>
				{/if}
			{/if}
		{:else if sectionItem.interactiveRenderType === 'link' || sectionItem.interactiveRenderType === 'links'}
			<div
				class="flex flex-col w-full sm:w-auto sm:flex-row gap-6 items-center {clazz?.includes(
					'mx-auto'
				)
					? 'mx-auto'
					: ''}"
			>
				<a
					class="shrink-0 cursor-pointer w-full sm:w-auto {urlClass}"
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
					on:click={(evt) => {
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

						if (isUrlEmbeddable(sectionItem.url)) {
							evt.preventDefault();
							popupEmbedUrl = sectionItem.url;
						}
					}}
				>
					{#if sectionItem.isUrlButton}
						<button class="w-full flex items-center {size === 'small' ? '_small' : ''}">
							{#if sectionItem.urlIcon}
								<Emoji
									width={size === 'small' ? 15 : 22}
									class="mr-2 rounded-full"
									emoji={sectionItem.urlIcon}
								/>
							{/if}
							{sectionItem.callToActionText || 'Learn More'}
						</button>
					{:else}
						{sectionItem.callToActionText || 'Learn More'}
					{/if}
				</a>

				{#if sectionItem.interactiveRenderType === 'links'}
					<a
						class="shrink-0 w-full sm:w-auto cursor-pointer {url2Class}"
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
						{#if sectionItem.isUrl2Button}
							<button
								class="w-full flex items-center {size === 'small' ? '_small' : ''}"
								class:_alternative={sectionItem.isUrlButton}
							>
								{#if sectionItem.url2Icon}
									<Emoji
										class="mr-2 rounded-full"
										width={size === 'small' ? 15 : 22}
										emoji={sectionItem.url2Icon}
									/>
								{/if}
								{sectionItem.callToActionText2 || 'Learn More'}
							</button>
						{:else}
							{sectionItem.callToActionText2 || 'Learn More'}
						{/if}
					</a>
				{/if}
			</div>
		{/if}
	</div>

	{#if sectionItem.interactiveRenderType === 'short_answer' || sectionItem.interactiveRenderType === 'single_choice'}
		<div class="flex w-full items-center mt-4 ">
			<div class="opacity-80 text-sm">Live answers from the community</div>
			<div class="ml-2 w-[7px] h-[7px] rounded-full bg-green-300" />
		</div>
	{/if}
{/if}

<style>
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

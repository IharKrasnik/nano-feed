<script>
	import SvelteMarkdown from 'svelte-markdown';
	import { fly, fade, slide } from 'svelte/transition';
	import { v4 as uuidv4 } from 'uuid';
	import { post } from 'lib/api';

	export let sectionItem;
	export let pageId;
	export let parentSectionId;
	export let itemClass = 'p-4 mx-4';
	import refreshConditionsTimestamp from '$lib/stores/refreshConditionsTimestamp';

	let clazz;
	export { clazz as class };

	let isAnswerSubmitted;

	if (!sectionItem.id) {
		sectionItem.id = uuidv4();
	}

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

	let submitAnswer = (answer) => {
		$refreshConditionsTimestamp = +new Date();

		if (answer.isSelected) {
			let foundAnswer = sectionItem.answersResults.find((a) => a.emoji === answer.emoji);
			foundAnswer.count--;
			sectionItem.answersResults = [...sectionItem.answersResults];
			answer.isSelected = false;

			myAnswer = null;
			localStorage[LOCAL_STORAGE_KEY] = null;

			return;
		}

		post(`pages/${pageId}/questions/${sectionItem.id}`, {
			parentSectionId,
			answer
		});

		isAnswerSubmitted = true;
		answer.isSelected = true;

		myAnswer = answer;
		localStorage[LOCAL_STORAGE_KEY] = JSON.stringify(answer);

		sectionItem.answersResults = sectionItem.answersResults || [];

		let foundAnswer = sectionItem.answersResults.find((a) => a.emoji === answer.emoji);

		if (!foundAnswer) {
			foundAnswer = { emoji: answer.emoji, count: 1 };
			sectionItem.answersResults.push(foundAnswer);
		} else {
			foundAnswer.count++;
		}

		sectionItem = {
			...sectionItem,
			interactiveAnswers: sectionItem.interactiveAnswers.map((qa) => {
				if (qa.isSelected && qa !== answer) {
					let foundPreviousAnswer = sectionItem.answersResults.find((a) => a.emoji === qa.emoji);

					if (foundPreviousAnswer) {
						foundPreviousAnswer.count--;
					} else {
						sectionItem.answersResults.push({ emoji: answer.emoji, count: 0 });
					}
				}

				qa.isSelected = qa === answer;
				return qa;
			})
		};

		$refreshConditionsTimestamp = +new Date();
	};
</script>

{#if sectionItem}
	<div class="{clazz} flex flex-wrap">
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
	</div>

	{#if myAnswer}
		<div class="{itemClass} mt-8 text-lg">
			{sectionItem.interactiveFollowUp?.text || 'Thank you!'}
			{myAnswer.emoji}

			{#if sectionItem.interactiveFollowUp?.callToAction}
				<a href={sectionItem.interactiveFollowUp.callToAction.url}>
					{sectionItem.interactiveFollowUp.callToAction.text}
				</a>
			{/if}
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

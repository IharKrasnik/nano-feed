<script>
	import SvelteMarkdown from 'svelte-markdown';
	import { fly, fade, slide } from 'svelte/transition';
	import { v4 as uuidv4 } from 'uuid';
	import { post } from 'lib/api';

	export let section;
	export let page;

	let isAnswerSubmitted;

	if (!section.question.guid) {
		section.question.guid = uuidv4();
	}

	let LOCAL_STORAGE_KEY = localStorage[`ANSWER_` + section.question.guid];

	let myAnswer = JSON.parse(localStorage[LOCAL_STORAGE_KEY] || null) || null;

	if (myAnswer) {
		section.question.answers = section.question.answers.map((a) => {
			a.isSelected = a.emoji === myAnswer.emoji;
			return a;
		});
	}

	if (!section.answers) {
		section.answers = [];
	}

	let countAnswers = (answer) => {
		let foundAnswer = section.answers.find((a) => a.emoji === answer.emoji);
		return foundAnswer ? foundAnswer.count : 0;
	};

	let submitAnswer = (answer) => {
		post(`pages/${page._id}/questions/${section.id}`, {
			answer
		});

		isAnswerSubmitted = true;
		answer.isSelected = true;

		myAnswer = answer;
		localStorage[LOCAL_STORAGE_KEY] = JSON.stringify(answer);

		section.answers = section.answers || [];

		let foundAnswer = section.answers.find((a) => a.emoji === answer.emoji);

		if (!foundAnswer) {
			foundAnswer = { emoji: answer.emoji, count: 1 };
			section.answers.push(foundAnswer);
		} else {
			foundAnswer.count++;
		}

		section = {
			...section,
			question: {
				...section.question,
				answers: section.question.answers.map((qa) => {
					if (qa.isSelected && qa !== answer) {
						let foundPreviousAnswer = section.answers.find((a) => a.emoji === qa.emoji);

						if (foundPreviousAnswer) {
							foundPreviousAnswer.count--;
						} else {
							section.answers.push({ emoji: answer.emoji, count: 0 });
						}
					}

					qa.isSelected = qa === answer;
					return qa;
				})
			}
		};
	};
</script>

{#if section}
	<div
		class="_section-item  p-4 sm:p-8 w-full flex flex-col items-center justify-center sm:mx-auto"
	>
		<div class="text-lg sm:text-2xl font-bold">
			{section.question.title}
		</div>

		<div class="flex mt-8">
			{#each section.question.answers as answer}
				<div
					on:click={() => submitAnswer(answer)}
					class="p-4 border emoji-button  flex items-center transition shadow-sm border-white/50 mx-4 cursor-pointer"
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
			<div class="mt-8 text-lg">
				{section.followUp?.text || 'Thank you!'}

				{#if section.followUp?.callToAction}
					<a href={section.followUp.callToAction.url}> {section.followUp.callToAction.text} </a>
				{/if}
			</div>
		{/if}
	</div>
{/if}

<style>
	.emoji-button:hover {
		background: var(--accent-color) !important;
		color: var(--button-color) !important;
	}

	.emoji-button.selected {
		border: 2px var(--accent-color) solid;
	}

	.emoji-button {
		background: var(--background-color);
		color: var(--text-color);
		@apply transition rounded-lg;
	}
</style>

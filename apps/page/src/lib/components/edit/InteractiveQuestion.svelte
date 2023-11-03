<script>
	export let section;

	import FileInput from 'lib/components/FileInput.svelte';
</script>

{#if section}
	<div class="_section">
		<div class="flex justify-between items-center">
			<div class="_title" style="margin: 0;">Interactive Question</div>

			{#if false}
				<div class="text-right w-full" />
			{/if}
		</div>

		<div class="font-normal text-sm opacity-70 mt-4 mb-2">What's your question?</div>

		<input
			type="text"
			class="w-full mb-4"
			bind:value={section.question.title}
			placeholder="How likely would you consider switching to us?"
		/>

		<div class="font-normal text-sm opacity-70 mt-4 mb-2">How users can answer?</div>

		<div>
			{#each section.question.answers as answer}
				<div class="w-full p-2 bg-[#fafafa] my-2 text-center">{answer.emoji}</div>
			{/each}
		</div>

		<hr class="my-4 border-[#8B786D] opacity-30" />
	</div>
{/if}

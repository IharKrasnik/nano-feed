<script>
	export let section;

	let addNewFAQ = () => {
		section.faqs = section.faqs || [];

		section.faqs.push({
			question: '',
			answer: ''
		});
	};

	let removeFAQ = (faq) => {
		section.faqs = section.faqs.filter((f) => f !== faq);
	};

	let ensureFaqs = () => {
		if (!section.faqs?.length) {
			section.faqs = [
				{
					question: '',
					answer: ''
				}
			];
		}
		return true;
	};
</script>

{#if section && ensureFaqs()}
	<div class="_section">
		<div class="flex justify-between items-center">
			<div class="_title" style="margin: 0;">FAQ</div>

			<div class="text-right w-full">
				{#if !section.faqs?.length}
					<a class="cursor-pointer text-[#8B786D]" on:click={addNewFAQ}>Add FAQ</a>
				{/if}
			</div>
		</div>

		{#each section.faqs || [] as faq}
			<div class="flex justify-between items-center">
				<div class="font-normal text-sm opacity-70 mb-2 mt-4">Question</div>
				<div class="text-sm cursor-pointer text-[#8B786D]" on:click={() => removeFAQ(faq)}>
					Remove
				</div>
			</div>

			<input
				class="mb-4 w-full"
				bind:value={faq.question}
				placeholder="How do I upload images here?"
			/>

			<div class="font-normal text-sm opacity-70 mb-2">Answer</div>

			<textarea
				class="w-full mb-4"
				bind:value={faq.answer}
				placeholder="Use momentum file input to: upload from desktop, insert direct link, paste image from clipboard or search GIFs."
				rows="3"
			/>

			<hr class="my-4 border-[#8B786D] opacity-30" />
		{/each}

		{#if section.faqs?.length > 0}
			<a class="w-full p-4 flex justify-center cursor-pointer text-[#8B786D]" on:click={addNewFAQ}
				>Add Question</a
			>
		{/if}
		<!-- <div class="flex items-center mt-2 text-[14px]">
	<input type="checkbox" class="mr-2"  /> Collect Emails
</div> -->
	</div>
{/if}

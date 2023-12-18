<script>
	export let section;
</script>

{#if section.faqs?.length}
	<div class="sticky bg-site z-20">
		<div class="flex justify-center">
			<div class="max-w-[600px] w-full my-8 p-4">
				{#each section.faqs as faq}
					<div class="text-lg font-bold">
						{faq.question}
					</div>
					<div class="mt-2 mb-8">{faq.answer}</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

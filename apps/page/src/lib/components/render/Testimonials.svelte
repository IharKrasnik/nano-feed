<script>
	import SvelteMarkdown from 'svelte-markdown';
	import { fly, fade, slide } from 'svelte/transition';

	export let section;
</script>

<div class="w-full flex flex-col sm:flex-row justify-center py-4 sm:py-8">
	{#each section.testimonials || [] as testimonial, i}
		<div
			class="p-4 rounded-2xl w-full sm:max-w-[350px] mr-4 mb-4 sm:mb-0 bg-section"
			in:fly={{ x: -50, y: -50, duration: 150, delay: 150 * (i + 1) }}
		>
			<div class="flex flex-col sm:flex-row">
				{#if testimonial.avatarUrl}
					<div class="mr-4 mb-4 sm:mb-0">
						<img src={testimonial.avatarUrl} class="max-w-[50px] aspect-square rounded-full" />
					</div>
				{/if}

				<div>
					<SvelteMarkdown source={testimonial.name} />
					<div class="mt-1 opacity-80">
						<SvelteMarkdown source={testimonial.comment} />
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

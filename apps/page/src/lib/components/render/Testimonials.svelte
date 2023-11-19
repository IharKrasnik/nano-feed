<script>
	import SvelteMarkdown from 'svelte-markdown';
	import { fly, fade, slide } from 'svelte/transition';

	export let section;
</script>

<div
	class="p-4 sm:p-8 w-full grid grid-cols-1 sm:grid-cols-{section.items?.length > 3
		? 3
		: section.items?.length} max-w-[900px] sm:mx-auto"
>
	{#each section.items || [] as item, i}
		<div
			class="p-4 rounded-2xl w-full  mr-4 mb-4 sm:mb-0 bg-section"
			in:fly={{ x: -50, y: -50, duration: 150, delay: 150 * (i + 1) }}
		>
			<div class="flex flex-col {section.items?.length > 1 ? '' : 'items-center text-center'}">
				<div class="mt-1 opacity-80 {section.items?.length === 1 ? 'sm:text-2xl text-xl' : ''}">
					<SvelteMarkdown source={item.description} />
				</div>

				<div class="text-sm flex items-center mt-2">
					{#if item.imageUrl}
						<div class="mr-4 mb-4 sm:mb-0">
							<img src={item.imageUrl} class="max-h-[50px] rounded-full" />
						</div>
					{/if}

					<SvelteMarkdown source={item.title} />
				</div>
			</div>
		</div>
	{/each}
</div>

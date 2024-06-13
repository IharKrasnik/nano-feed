<script>
	import _ from 'lodash';
	import SvelteMarkdown from 'svelte-markdown';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import { fly, fade, slide } from 'svelte/transition';

	export let section;
	export let page;
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
			{#if section.isShowStars}
				<div class="flex justify-center mt-4 mb-2">
					{#each _.range(0, 5) as repeat}
						<svg
							width="15"
							height="15"
							viewBox="0 0 15 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							><path
								d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
								fill={page.theme.accentColor}
							/></svg
						>
					{/each}
				</div>
			{/if}
			<div class="flex flex-col {section.items?.length > 1 ? '' : 'items-center text-center'}">
				<div class="mt-1 opacity-80 {section.items?.length === 1 ? 'sm:text-2xl text-xl' : ''}">
					<SvelteMarkdown source={item.description} />
				</div>

				<div class="text-sm flex items-center mt-2">
					{#if item.imageUrl}
						<div class="mr-4 mb-4 sm:mb-0">
							<img
								alt="Testimonial user avatar"
								src={item.imageUrl}
								class="w-[50px] h-[50px] object-cover rounded-full"
							/>
						</div>
					{/if}

					<SvelteMarkdown source={item.title} />
				</div>
			</div>
		</div>
	{/each}
</div>

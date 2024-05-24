<script>
	import { fade } from 'svelte/transition';
	import heatmap, { getHeatmapClicksCount } from 'lib-render/stores/heatmap';
	import trackClick from 'lib/services/trackClick';

	export let page;
	export let isEdit;
	export let section;

	import FeatherIcon from 'lib/components/FeatherIcon.svelte';

	section.items.forEach((i) => (i.isExpanded = !!isEdit));

	let expandFaq = (item) => {
		item.isExpanded = true;
	};
</script>

{#if section.items?.length}
	<div class="sticky bg-site z-20">
		<div class="flex justify-center">
			<div class="max-w-[600px] w-full my-8 p-4">
				{#each section.items as faq}
					<div
						class="flex justify-between p-2 cursor-pointer {(page.parentPage || page).theme
							?.theme === 'dark'
							? 'hover:bg-white/5'
							: 'hover:bg-black/5'} transition"
						class:heatmap={$heatmap}
						data-heatmap-clicks-count={$heatmap
							? getHeatmapClicksCount({
									sectionId: section.id,
									sectionItemId: faq.id
							  })
							: ''}
						on:click={() => {
							faq.isExpanded = !faq.isExpanded;

							trackClick({
								pageId: page?._id,
								sectionId: section.id,
								sectionItemId: faq.id,
								text: faq.isExpanded ? '+' : '-'
							});
						}}
					>
						<div class="text-xl font-bold">
							{@html faq.title}
						</div>
						<div class="cursor-pointer opacity-80 hover:opacity-100 transition">
							<FeatherIcon
								theme={page.theme?.theme}
								size="30"
								name={faq.isExpanded ? 'minus' : 'plus'}
							/>
						</div>
					</div>
					<div class:hidden={!faq.isExpanded} class="mt-2 mb-8 p-2" in:fade={{ duration: 150 }}>
						{@html faq.description}
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

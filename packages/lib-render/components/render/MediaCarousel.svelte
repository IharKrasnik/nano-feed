<script>
	import { onMount, onDestroy } from 'svelte';
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import RenderUrlWithBackground from 'lib/components/RenderUrlWithBackground.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';

	export let page;
	export let section;

	export let isEdit;

	let emblaApi;
</script>

<div class="relative">
	{#key section.items}
		<div
			class="embla "
			use:emblaCarouselSvelte
			on:emblaInit={(evt) => {
				emblaApi = evt.detail;
				emblaApi.scrollNext();
			}}
		>
			<div class="embla__viewport flex max-h-[550px]  sm:max-h-[600px]">
				{#each section.items || [] as item, index (item.id)}
					<RenderUrlWithBackground
						imageUrl={item.imageUrl}
						alt="Design ${index + 1}"
						class="embla__slide rounded-lg object-cover sm:h-[460px] {item.imageUrl?.includes(
							'/shorts/'
						)
							? ''
							: 'sm:w-[950px]'}"
						urlImgClass="rounded-lg"
					/>
				{/each}
			</div>
		</div>

		<button
			class="{isEdit ? 'absolute' : 'fixed'} left-4 top-1/2 -translate-y-1/2"
			on:click={() => emblaApi.scrollPrev()}
		>
			<svg
				viewBox="0 0 24 24"
				width="24"
				height="24"
				stroke="currentColor"
				stroke-width="2"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="css-i6dzq1"><polyline points="15 18 9 12 15 6" /></svg
			>
		</button>
		<button
			class="{isEdit ? 'absolute' : 'fixed'} right-4 top-1/2 -translate-y-1/2"
			on:click={() => {
				emblaApi.scrollNext();
			}}
		>
			<svg
				viewBox="0 0 24 24"
				width="24"
				height="24"
				stroke="currentColor"
				stroke-width="2"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="css-i6dzq1"><polyline points="9 18 15 12 9 6" /></svg
			>
		</button>
	{/key}
</div>

<style>
	:global(.embla__slide) {
		flex: 0 0 auto;
		margin-right: 50px;
	}

	:global(._section-mediaCarousel) {
		overflow-x: hidden;
	}
</style>

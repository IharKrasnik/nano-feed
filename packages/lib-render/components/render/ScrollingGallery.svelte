<script>
	import { onMount, onDestroy } from 'svelte';

	export let page;
	export let section;

	export let isEdit;

	let carouselEl;

	let scrollInterval;

	onMount(() => {
		let scrollWidth = carouselEl.scrollWidth;

		const animateScroll = () => {
			if (carouselEl.scrollLeft >= scrollWidth / 2) {
				carouselEl.scrollLeft = 0;
			} else {
				carouselEl.scrollLeft += 1;
			}
		};

		scrollInterval = setInterval(animateScroll, 20);
	});

	onDestroy(() => {
		clearInterval(scrollInterval);
	});
</script>

<div class="flex overflow-x-hidden w-full" bind:this={carouselEl}>
	<div class="flex-shrink-0 w-screen flex space-x-4">
		{#each section.items as item, index (item.id)}
			<img
				src={item.imageUrl}
				alt="Design ${index + 1}"
				class="rounded-lg shadow-lg aspect-image h-[200px] sm:h-[350px] object-cover"
			/>
		{/each}

		{#each section.items as item, index (item.id)}
			<img
				src={item.imageUrl}
				alt="Design ${index + 1}"
				class="rounded-lg shadow-lg aspect-image h-[200px] sm:h-[350px] object-cover"
			/>
		{/each}
	</div>
</div>

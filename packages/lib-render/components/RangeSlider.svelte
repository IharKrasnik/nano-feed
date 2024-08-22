<script>
	import { onMount } from 'svelte';

	let sliderEl;

	let clazz = '';
	export { clazz as class };
	export let values = [];
	export let onChange = (value) => {};

	let value = values[0];

	onMount(() => {
		if (sliderEl) {
			sliderEl.data = values;

			sliderEl.addEventListener('change', (evt) => {
				onChange(evt.detail.value1);
			});
		}
	});
	console.log('values', values);
</script>

{#if values.length}
	<div class={clazz}>
		<tc-range-slider slider-width="100%" class="block" bind:this={sliderEl} />
	</div>
{/if}

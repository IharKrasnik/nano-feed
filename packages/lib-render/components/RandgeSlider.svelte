<script>
	import { onMount } from 'svelte';

	let sliderEl;

	export let values = null;

	onMount(() => {
		debugger;
	});
</script>

<tc-range-slider
	bind:this={sliderEl}
	data="a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z"
	value="d"
	generate-labels="true"
/>

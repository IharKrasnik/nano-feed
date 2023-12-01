<script>
	import { onMount } from 'svelte';

	export let animationCode;

	let canvasEl;

	onMount(() => {
		window.backgroundCanvas = canvasEl;
		debugger;
		eval(animationCode);
	});
</script>

<canvas bind:this={canvasEl} class="absolute top-0 left-0 w-screen h-full opacity-30" />

<style>
	canvas {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>

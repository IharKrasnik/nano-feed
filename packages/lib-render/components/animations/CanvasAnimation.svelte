<script>
	import { onMount } from 'svelte';

	export let animationCode;
	export let isEdit = false;
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';

	let canvasEl;

	onMount(() => {
		window.backgroundCanvas = canvasEl;
		try {
			eval(animationCode);
		} catch (err) {
			if (isEdit) {
				showErrorMessage('Canvas code execution error');
			}
		}
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

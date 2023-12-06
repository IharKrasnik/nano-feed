<script>
	let clazz;

	import { scale } from 'svelte/transition';
	import Loader from 'lib/components/Loader.svelte';

	export { clazz as class };
	export let style = '';
	export let onClick = async () => {};

	let isLoading = false;
	let isJustDone = false;
	let isJustFailed = false;
	let errMessage;
	export let theme;

	let load = async () => {
		isLoading = true;

		try {
			await onClick();
			isJustDone = true;

			setTimeout(() => {
				isJustDone = false;
			}, 1000);
		} catch (err) {
			isJustFailed = true;
			errMessage = err.message;

			setTimeout(() => {
				isJustFailed = false;
			}, 1000);
		} finally {
			isLoading = false;
		}
	};
</script>

<button class="relative overflow-hidden {clazz} flex justify-center" {style} on:click={load}>
	{#if isLoading}
		<div class="absolute top-0 h-full flex items-center z-10">
			<Loader {theme} />
		</div>
	{/if}

	{#if isJustDone}
		<div class="absolute left-0 top-0 w-full h-full backdrop-blur flex items-center justify-center">
			<div in:scale={{ duration: 150 }}>👌</div>
		</div>
	{:else if isJustFailed}
		<div class="absolute left-0 top-0 w-full h-full backdrop-blur flex items-center justify-center">
			<div class="" in:scale={{ duration: 150 }}>❌</div>
		</div>
	{:else}{/if}

	<div class:invisible={isLoading}>
		<slot />
	</div>
</button>

{#if isJustFailed && errMessage}
	<div class="mt-4 text-lg">
		{errMessage}
	</div>
{/if}

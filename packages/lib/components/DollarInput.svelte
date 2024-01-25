<script>
	import { onMount } from 'svelte';
	import moment from 'moment';

	let clazz = '';
	export { clazz as class };
	export let style = '';
	export let placeholder = '';

	export let value = 0;

	let internalValue;

	const input = (x) => (internalValue = x / 100);
	const output = (x) => (value = x * 100);

	$: input(value);
	$: output(internalValue);
</script>

<div class="flex items-center">
	<div class="mr-2">$</div>
	<input
		type="number"
		min="0.01"
		step="0.01"
		bind:value={internalValue}
		class={clazz}
		style="width: 150px; {style}"
		{placeholder}
	/>
</div>

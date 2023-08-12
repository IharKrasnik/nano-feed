<script>
	import { onMount } from 'svelte';
	import moment from 'moment';

	export let format = 'YYYY-MM-DD';
	export let date = new Date();

	let internal;

	const input = (x) => (internal = moment(x).format(format));
	const output = (x) => (date = moment(x, format).toDate());

	$: input(date);
	$: output(internal);
</script>

<input type="date" bind:value={internal} />

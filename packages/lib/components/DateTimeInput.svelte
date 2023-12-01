<script>
	import moment from 'moment';
	let clazz;
	export { clazz as class };

	export let date;

	let internalDate;

	let format = 'YYYY-MM-DDTHH:mm';

	const input = (x) => {
		internalDate = moment(x).format(format);
	};

	const output = (x) => {
		date = moment(x).toDate();
	};

	$: input(date);
	$: output(internalDate);
</script>

<div class={clazz}>
	<input type="datetime-local" bind:value={internalDate} />

	<div class="mt-2 opacity-70 text-sm">{moment(date).format('MMM DD, YYYY')}</div>
</div>

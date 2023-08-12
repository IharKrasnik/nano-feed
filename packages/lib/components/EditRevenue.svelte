<script>
	import { put } from 'lib/api';
	import Button from 'lib/components/Button.svelte';
	import moment from 'moment';
	import { fade } from 'svelte/transition';
	import currentUser from 'lib/stores/currentUser';

	export let project;
	export let onUpdated = () => {};

	let clazz;

	export { clazz as class };

	let revenue = project.revenue
		? {
				total: project.revenue.total / 100,
				monthly: project.revenue.monthly / 100
		  }
		: {
				total: 0,
				monthly: 0
		  };

	let updateRevenue = async () => {
		let revenueDoc = await put(`projects/${project._id}/revenue`, {
			total: revenue.total * 100,
			monthly: revenue.monthly * 100
		});

		project.revenue = revenueDoc.revenue;
		onUpdated();
	};
</script>

<div class={clazz}>
	<h2 class="mb-8">Your Revenue</h2>

	<div class="mb-4">
		<label>Your Monthly Revenue, $</label>
		<input type="number" placeholder="29.98" bind:value={revenue.monthly} />
	</div>

	<div>
		<label>Your Total Revenue, $</label>
		<input type="number" placeholder="321.45" bind:value={revenue.total} />
	</div>

	<Button class="mt-8" onClick={updateRevenue}>Update Revenue</Button>
</div>

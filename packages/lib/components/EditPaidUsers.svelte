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

	let paidUsers = project.totalPaidUsers;

	let updatePaidUsers = async () => {
		let paidUsersDoc = await put(`projects/${project._id}/paid-users`, {
			totalPaidUsers: paidUsers
		});

		project.totalPaidUsers = paidUsersDoc.totalPaidUsers;

		onUpdated();
	};
</script>

<div class={clazz}>
	<h2 class="mb-8">Your Paid Users</h2>

	<div class="mb-4">
		<label>How many paid users do you have?</label>
		<input type="number" placeholder="29" bind:value={paidUsers} />
	</div>

	<Button class="mt-8" onClick={updatePaidUsers}>Update Paid Users</Button>
</div>

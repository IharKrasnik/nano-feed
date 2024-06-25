<script>
	import { put } from 'lib/api';
	import { showSuccessMessage } from 'lib/services/toast';

	import Button from 'lib/components/Button.svelte';

	export let page;

	let parentPage = page.parentPage || page;

	parentPage.moreInfo = parentPage.moreInfo || {};

	let updateMoreInfo = async () => {
		await put(`pages/${page._id}/more-info`, { ...parentPage.moreInfo });
		showSuccessMessage('Settings updated');
	};
</script>

<h3 class="text-xl font-bold mb-2">More Info</h3>
<h3 class="text-sm mb-4">Add more info for special features</h3>

<div class="mt-4">
	<div class="mb-4">
		<div class="w-full mr-4">
			<div class="text-sm mb-2">Link to book calendar</div>

			<input
				type="text"
				class="w-full"
				placeholder="https://cal.com/igor-krasnik-7uhewy/30min"
				bind:value={parentPage.moreInfo.calendarLink}
			/>
			<div class="text-sm mb-2 opacity-70 mt-2">Shown at service request modal</div>
		</div>
	</div>
</div>

<Button class="_primary _small mt-8" onClick={updateMoreInfo}>Update Settings</Button>

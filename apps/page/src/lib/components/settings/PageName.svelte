<script>
	import { showSuccessMessage } from 'lib/services/toast';
	import { put } from 'lib/api';
	import Button from 'lib/components/Button.svelte';

	export let page;

	let pageName = page.name;

	let isUpdating = false;

	let updatePageName = async () => {
		if (pageName) {
			await put(`pages/${page._id}/name`, { name: pageName });
			page.name = pageName;

			showSuccessMessage('Page name was updated');
			isUpdating = false;
		}
	};
</script>

<h3 class="text-lg font-bold mb-2">Page Name</h3>

{#if isUpdating}
	<input bind:value={pageName} placeholder="Page Name" />

	<div class="flex items-center mt-8 gap-x-3">
		<Button class="_primary _small" onClick={updatePageName}>Update Page Name</Button>
		<Button
			class="_secondary _small"
			onClick={() => {
				pageName = page.name;
				isUpdating = false;
			}}>Cancel</Button
		>
	</div>
{:else}
	<div class=" cursor-pointer text-[#8B786D]" on:click={() => (isUpdating = true)}>
		{page.name}
	</div>
{/if}

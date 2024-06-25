<script>
	import { put } from 'lib/api';
	import getPageMetaTags from 'lib/helpers/getPageMetaTags';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';

	import Button from 'lib/components/Button.svelte';

	import FileInput from 'lib/components/FileInput.svelte';
	import { PAGE_URL } from 'lib/env';

	export let page;

	let parentPage = page.parentPage || page;

	let updateGlobalCode = async () => {
		await put(`pages/${page._id}/global-code`, { globalCode: parentPage.globalCode });
		showSuccessMessage('Global website code updated');
	};
</script>

<h3 class="text-xl font-bold mb-2">Global Code</h3>
<h3 class="text-sm mb-4">Custom script to be embedded to every page</h3>

<div class="mt-4">
	<div class="mb-4">
		<div class="w-full mr-4">
			<div class="text-sm mb-2">HTML Code</div>

			<textarea
				bind:value={parentPage.globalCode}
				class="w-full"
				rows="10"
				type="text"
				placeholder="<script></script>"
			/>
		</div>
	</div>
</div>

<Button class="_primary _small mt-8" onClick={updateGlobalCode}>Update Global Code</Button>

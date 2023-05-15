<script>
	import { post } from 'lib/api';
	import getPageMetaTags from 'lib/helpers/getPageMetaTags';

	import Button from 'lib/components/Button.svelte';

	import FileInput from 'lib/components/FileInput.svelte';
	import { PAGE_URL } from 'lib/env';

	export let page;

	let updateCustomCode = async () => {
		await post(`pages/${page._id}/custom-code`, { code: page.customCode });
	};
</script>

<h3 class="text-xl font-bold mb-4">Custom Code</h3>

<div class="mt-4">
	<div class="mb-4">
		<div class="w-full mr-4">
			<div class="text-sm mb-2">HTML Code</div>

			<textarea
				bind:value={page.customCode}
				class="w-full"
				rows="10"
				type="text"
				placeholder="<script></script>"
			/>
		</div>
	</div>
</div>

<Button class="_primary _small mt-8" onClick={updateCustomCode}>Update Custom Code</Button>

<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { get, post, put } from 'lib/api';
	import RenderSection from 'lib-render/components/render//Section.svelte';
	import tooltip from 'lib/use/tooltip';
	import clickOutside from 'lib/use/clickOutside';
	import contenteditable from 'lib/use/contenteditable';

	import Loader from 'lib/components/Loader.svelte';
	import currentUser from 'lib/stores/currentUser';
	import submissions from 'lib/stores/submissions';
	import FileInput from 'lib/components/FileInput.svelte';
	import selectedSubmission from '$lib/stores/selectedSubmission';

	import formsCache, { getForm } from 'lib-render/stores/formsCache';

	import getPageCssStyles from 'lib-render/services/getPageCssStyles';

	let cssVarStyles;
	let styles;

	export let page;

	$: if (page) {
		let res = getPageCssStyles(page);
		cssVarStyles = res.cssVarStyles;
		styles = res.styles;
	}

	$: if ($selectedSubmission) {
		getForm({ pageId: $selectedSubmission.page._id, sectionId: $selectedSubmission.sectionId });
	}
</script>

<div class="px-8 py-16 bg-background" style={cssVarStyles}>
	{#if $selectedSubmission}
		{#key $selectedSubmission._id}
			{#if $formsCache[selectedSubmission.sectionId]}
				<RenderSection
					{page}
					section={{
						...$formsCache[$selectedSubmission.sectionId],
						submission: $selectedSubmission
					}}
				/>
			{/if}
		{/key}
	{:else}
		<div class="_section flex justify-between">
			<div>Total Submissions</div>
			<div class="text-lg">{$submissions?.length || 0}</div>
		</div>
		← Select submission
	{/if}
</div>

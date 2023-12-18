<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'lib/api';
	import currentPage from 'lib-render/stores/currentPage';

	import SitePreview from 'lib-render/components/SitePreview.svelte';

	export let isNoBadge;

	export let noStickyHeader;

	let prevPageId;

	if (browser && $currentPage) {
		prevPageId = $currentPage._id;

		window.MWAVE_CONFIG = window.MWAVE_CONFIG || {
			isSkipLocationChange: true
		};

		window.MWAVE_CONFIG.subProjectId = $currentPage.parentPage?._id || $currentPage._id;
		window.MWAVE_CONFIG.pageId = $currentPage._id;

		setInterval(() => {
			window.mwave.sendPing();
		}, 5000);
	}

	$: if (browser && $currentPage?._id) {
		window.MWAVE_CONFIG = window.MWAVE_CONFIG || {
			isSkipLocationChange: true
		};
		window.MWAVE_CONFIG.pageId = $currentPage._id;

		if (prevPageId !== $currentPage._id) {
			window.mwave.sendTrackEvent({
				type: 'pathChange',
				payload: {
					value: window.location.href
				}
			});
		}
	}
</script>

{#if $currentPage}
	{#key $currentPage._refreshTimestamp}
		<SitePreview bind:isNoBadge bind:page={$currentPage} bind:noStickyHeader />
	{/key}
{/if}

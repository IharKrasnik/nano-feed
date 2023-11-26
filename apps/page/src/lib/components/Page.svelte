<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'lib/api';
	import currentPage from '$lib/stores/currentPage';

	import SitePreview from '$lib/components/site-preview.svelte';

	export let isNoBadge;

	export let noStickyHeader;

	if (browser && $currentPage) {
		window.MWAVE_CONFIG = window.MWAVE_CONFIG || {};

		window.MWAVE_CONFIG.subProjectId = $currentPage.parentPage?._id || $currentPage._id;
		window.MWAVE_CONFIG.pageId = $currentPage._id;
	}

	$: if (browser && $currentPage?._id) {
		window.MWAVE_CONFIG = window.MWAVE_CONFIG || {};
		window.MWAVE_CONFIG.pageId = $currentPage._id;
	}
</script>

{#if $currentPage}
	{#key $currentPage._refreshTimestamp}
		<SitePreview bind:isNoBadge bind:page={$currentPage} bind:noStickyHeader />
	{/key}
{/if}

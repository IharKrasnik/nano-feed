<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'lib/api';

	import SitePreview from '$lib/components/site-preview.svelte';

	export let isNoBadge;

	export let noStickyHeader;
	export let currentPage = $page.data.page;

	if (browser && currentPage) {
		window.MWAVE_CONFIG = window.MWAVE_CONFIG || {};

		window.MWAVE_CONFIG.subProjectId = currentPage.parentPage?._id || currentPage._id;
		window.MWAVE_CONFIG.pageId = currentPage._id;
	}
</script>

{#if page}
	<SitePreview bind:isNoBadge bind:page={currentPage} bind:noStickyHeader />
{/if}

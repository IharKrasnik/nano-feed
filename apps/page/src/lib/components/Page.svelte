<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'lib/api';

	import SitePreview from '$lib/components/site-preview.svelte';

	export let slug;

	export let isNoBadge;

	export let noStickyHeader;

	export let currentPage = $page.data.page;

	if (browser && currentPage) {
		window.WAVE_SUBPROJECT_ID = currentPage._id;
		slug = $page.params.pageSlug || slug;
	}
</script>

{#if page}
	<SitePreview bind:isNoBadge bind:page={currentPage} bind:noStickyHeader />
{/if}

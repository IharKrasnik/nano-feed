<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'lib/api';

	import SitePreview from '$lib/components/site-preview.svelte';

	let slug;

	let currentPage = $page.data.page;

	debugger;
	if (browser && currentPage) {
		window.WAVE_SUBPROJECT_ID = currentPage._id;
		slug = $page.params.pageSlug;
	}
</script>

{#if page}
	<SitePreview bind:page={currentPage} />
{/if}

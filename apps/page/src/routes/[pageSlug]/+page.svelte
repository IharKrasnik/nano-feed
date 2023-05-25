<script>
	import Page from '$lib/components/Page.svelte';
	import { get } from 'lib/api';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	let prevSlug;

	let currentPage;

	$: if ($page.params.pageSlug && $page.params.pageSlug !== prevSlug) {
		prevSlug = $page.params.pageSlug;
		if ($page.params.page) {
			currentPage = $page.params.page;
		} else {
			currentPage = null;
			get(`pages/${$page.params.pageSlug}`).then((loadedPage) => {
				currentPage = loadedPage;
				if (browser && $page.data.page) {
					debugger;
					$page.data.page = null;
				}
			});
		}
	}
</script>

{#if currentPage}
	<Page bind:currentPage />
{/if}

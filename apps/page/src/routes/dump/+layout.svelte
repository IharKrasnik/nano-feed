<script>
	import Page from '$lib/components/Page.svelte';
	import { get } from 'lib/api';
	import { page } from '$app/stores';
	import currentPage from '$lib/stores/currentPage';
	import { browser } from '$app/environment';
	import Emoji from 'lib/components/Emoji.svelte';

	let prevSlug;

	$currentPage = $page.data.page;
	$currentPage._refreshTimestamp = +new Date();

	$: if (
		(!$page.params.subPageSlug && $page.data.pageSlug && $page.data.pageSlug !== prevSlug) ||
		($page.params.subPageSlug && $page.params.subPageSlug !== prevSlug)
	) {
		prevSlug = $page.params.subPageSlug || $page.data.pageSlug;

		$currentPage = $page.data.page;
		$currentPage._refreshTimestamp = +new Date();
	}
</script>

<Page />
<slot />

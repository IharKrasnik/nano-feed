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

	console.log('init currentpage', $currentPage);

	$: if (
		(!$page.params.subPageSlug && $page.params.pageSlug && $page.params.pageSlug !== prevSlug) ||
		($page.params.subPageSlug && $page.params.subPageSlug !== prevSlug)
	) {
		prevSlug = $page.params.subPageSlug || $page.params.pageSlug;

		$currentPage = $page.data.page;
		$currentPage._refreshTimestamp = +new Date();
		// if (
		// 	$page.params.page &&
		// 	$page.params.page.slug === ($page.params.subPageSlug || $page.params.pageSlug)
		// ) {
		// 	$currentPage = $page.params.page;
		// } else {
		// 	console.log('loading');
		// 	$currentPage = {
		// 		slug: $page.params.subPageSlug || $page.params.pageSlug,
		// 		title: $currentPage.parentPage?.title || '',
		// 		name: $currentPage.parentPage?.name || '',
		// 		logo: $currentPage.parentPage?.logo || '',
		// 		parentPage: $page.params.subPageSlug ? $currentPage : null
		// 	};

		// 	get(`pages/${$page.params.subPageSlug || $page.params.pageSlug}`, {
		// 		parentPageSlug: $page.params.subPageSlug ? $page.params.pageSlug : ''
		// 	}).then((loadedPage) => {
		// 		$currentPage = loadedPage;
		// 		console.log('loadedPage', loadedPage);
		// 		// if (browser && $page.data.page) {
		// 		// 	$page.data.page = null;
		// 		// }
		// 	});
		// }
	}
</script>

<Page />
<slot />

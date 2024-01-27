<script>
	import 'lib-render/app.css';
	import '../app.css';
	import Page from 'lib-render/components/Page.svelte';
	import { get } from 'lib/api';
	import { API_URL } from 'lib/env';
	import currentPage from 'lib-render/stores/currentPage';
	import { browser } from '$app/environment';
	import Emoji from 'lib/components/Emoji.svelte';
	import { page as sveltePage } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';
	import isUrl from 'lib/helpers/isUrl';

	import { SvelteToast } from '@zerodevx/svelte-toast';
	import sectionToEdit from 'lib-render/stores/sectionToEdit';

	import 'lazysizes';
	import 'lazysizes/plugins/parent-fit/ls.parent-fit';

	import {
		connect as connectCustomerSocketIo,
		disconnect as disconnectCustomerSocketIo
	} from 'lib-render/customerSocketIoService';

	if (browser) {
		connectCustomerSocketIo();

		onDestroy(() => {
			disconnectCustomerSocketIo();
		});
	}

	let prevSlug;
	$currentPage = $sveltePage.data.page;

	if ($currentPage) {
		$currentPage._refreshTimestamp = +new Date();
	}

	let prevAppUrl;

	$: if (
		(!$sveltePage.params.subPageSlug &&
			$sveltePage.data.pageSlug &&
			$sveltePage.data.pageSlug !== prevSlug) ||
		(!$sveltePage.params.feedItemSlug &&
			!$sveltePage.params.articleSlug &&
			$sveltePage.params.subPageSlug &&
			$sveltePage.params.subPageSlug !== prevSlug) ||
		($sveltePage.params.feedItemSlug && $sveltePage.params.feedItemSlug !== prevSlug) ||
		($sveltePage.params.articleSlug && $sveltePage.params.articleSlug !== prevSlug) ||
		($sveltePage.url.href.includes('/app') && prevAppUrl !== $sveltePage.url.href)
	) {
		prevSlug =
			$sveltePage.params.articleSlug ||
			$sveltePage.params.feedItemSlug ||
			$sveltePage.params.subPageSlug ||
			$sveltePage.data.pageSlug;

		prevAppUrl = $sveltePage.url.href;

		$currentPage = $sveltePage.data.page;

		if ($currentPage) {
			$currentPage._refreshTimestamp = +new Date();
		}
	}

	if (browser) {
		window.WAVE_API_URL = API_URL;
	}
</script>

<svelte:head>
	<title>{$sveltePage.data.ogTitle}</title>

	<meta name="title" content={$sveltePage.data.ogTitle} />
	<meta name="description" content={$sveltePage.data.ogDescription} />
	<meta name="og:description" content={$sveltePage.data.ogDescription} />

	<meta name="twitter:title" content={$sveltePage.data.ogTitle} />
	<meta name="twitter:description" content={$sveltePage.data.ogDescription} />
	<meta name="twitter:card" content="summary_large_image" />

	<meta
		name="twitter:image"
		content={$sveltePage.data.ogImage ||
			'https://assets.website-files.com/636cf54cf20a6ac090f7deb0/63773738962ed74d59268fbc_open-graph.png'}
	/>

	<meta
		name="og:image"
		content={$sveltePage.data.ogImage ||
			'https://assets.website-files.com/636cf54cf20a6ac090f7deb0/63773738962ed74d59268fbc_open-graph.png'}
	/>

	{#if $sveltePage.data?.page?.customCode}
		{@html $sveltePage.data.page.customCode}
	{/if}

	{#if $sveltePage.data.page?.parentPage?.logo || $sveltePage.data.page?.logo}
		{#if isUrl($sveltePage.data.page.parentPage?.logo || $sveltePage.data.page.logo)}
			<link
				rel="icon"
				href={$sveltePage.data.page.parentPage?.logo || $sveltePage.data.page.logo}
			/>
		{:else}
			<link
				rel="icon"
				href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>{$sveltePage
					.data.page.logo}</text></svg>"
			/>
		{/if}
	{:else}
		<link rel="icon" href="/logo.svg" />
	{/if}
</svelte:head>

<SvelteToast />

<div id="modal-portal" />

<div id="popup-portal" />

<div class="relative" style="	">
	<Page />
	{#if browser}
		<script defer src="https://wave.mmntm.build/wave.js"></script>
	{/if}
	<slot />
</div>

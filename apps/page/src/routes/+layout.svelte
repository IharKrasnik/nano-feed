<script>
	import '../app.css';
	import { page } from '$app/stores';
	import isUrl from 'lib/helpers/isUrl';

	import currentUser, { isLoading as isUserLoading } from 'lib/stores/currentUser';
	import allPages from '$lib/stores/allPages';
	import Dock from 'lib/components/Dock.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import sectionToEdit from '$lib/stores/sectionToEdit';

	import 'lazysizes';
	// import a plugin 1
	import 'lazysizes/plugins/parent-fit/ls.parent-fit';
</script>

<svelte:head>
	<title>{$page.data.ogTitle}</title>
	<meta name="title" content={$page.data.ogTitle} />
	<meta name="description" content={$page.data.ogDescription} />
	<meta name="og:description" content={$page.data.ogDescription} />

	<meta
		name="og:image"
		content={$page.data.ogImage ||
			'https://assets.website-files.com/636cf54cf20a6ac090f7deb0/63773738962ed74d59268fbc_open-graph.png'}
	/>

	{#if $page.data?.page?.customCode}
		{@html $page.data.page.customCode}
	{/if}

	{#if $page.data?.page?.logo}
		{#if isUrl($page.data.page.logo)}
			<link rel="icon" href={$page.data.page.logo} />
		{:else}
			<link
				rel="icon"
				href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>{$page
					.data.page.logo}</text></svg>"
			/>
		{/if}
	{:else}
		<link rel="icon" href="logo.svg" />
	{/if}
</svelte:head>

<SvelteToast />

<div id="modal-portal" />

{#if !$isUserLoading}
	<div class="relative">
		<slot />
	</div>
{/if}

{#if $currentUser && !$page.params.pageSlug && !$sectionToEdit}
	<Dock activeIcon="page" />
{/if}

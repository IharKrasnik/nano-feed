<script>
	import '../app.css';
	import { page } from '$app/stores';
	import isUrl from 'lib/helpers/isUrl';
	import currentUser, { isLoading as isUserLoading } from 'lib/stores/currentUser';
	import blogDraft from '$lib/stores/blogDraft';
	import Dock from 'lib/components/Dock.svelte';
	import ContentEditableMenu from 'lib/components/ContentEditableMenu.svelte';
	import { updateStylesFromTheme } from '$lib/stores/styles';

	import 'lazysizes';
	// import a plugin
	import 'lazysizes/plugins/parent-fit/ls.parent-fit';

	import { browser } from '$app/environment';

	if (browser && $page.data.blog) {
		window.WAVE_SUBPROJECT_ID = $page.data.blog._id;
	}

	let cssVarStyles;

	let fontPairs = [
		{ title: 'Archivo', text: 'Inter' },
		{ title: 'Calistoga', text: 'IBM Plex Sans' },
		{ title: 'Chillax', text: 'Gilroy' },
		{ title: 'Fraunces', text: 'Poppins' },
		{ title: 'Syne', text: 'Syne' },
		{ title: 'Quattrocento', text: 'Questrial' },
		{ title: 'Albert Sans', text: 'Barlow' }
	];

	export let blog = $page.data.blog || $blogDraft;

	if (blog) {
		updateStylesFromTheme(blog.theme);
	}
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

	<meta name="twitter:title" content={$page.data.ogTitle} />
	<meta name="twitter:description" content={$page.data.ogDescription} />
	<meta name="twitter:card" content="summary_large_image" />

	<meta
		name="twitter:image"
		content={$page.data.ogImage ||
			'https://assets.website-files.com/636cf54cf20a6ac090f7deb0/63773738962ed74d59268fbc_open-graph.png'}
	/>

	{#if $page.data?.blog?.customCode}
		{@html $page.data.blog.customCode}
	{/if}

	{#if $page.data?.blog?.logo}
		{#if isUrl($page.data.blog.logo)}
			<link rel="icon" href={$page.data.blog.logo} />
		{:else}
			<link
				rel="icon"
				href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>{$page
					.data.blog.logo}</text></svg>"
			/>
		{/if}
	{:else}
		<link rel="icon" href="logo.svg" />
	{/if}
</svelte:head>

<div id="modal-portal" />

{#if !$isUserLoading}
	<div class="relative">
		<slot />
	</div>
{/if}

{#if $currentUser && !$page.params.postSlug && !$page.params.blogSlug}
	<Dock />
{/if}

<style global>
</style>

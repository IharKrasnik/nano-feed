<script>
	import '../app.css';
	import { page } from '$app/stores';
	import isUrl from 'lib/helpers/isUrl';
	import currentUser, { isLoading as isUserLoading } from 'lib/stores/currentUser';
	import Dock from 'lib/components/Dock.svelte';
	//
</script>

<svelte:head>
	<title>{$page.data.ogTitle}</title>
	<meta name="title" content={$page.data.ogTitle} />
	<meta name="description" content={$page.data.ogDescription} />
	<meta name="og:description" content={$page.data.ogDescription} />
	<link rel="icon" href="logo.svg" />

	<meta
		name="og:image"
		content={$page.data.ogImage ||
			'https://assets.website-files.com/636cf54cf20a6ac090f7deb0/63773738962ed74d59268fbc_open-graph.png'}
	/>
</svelte:head>

<div id="modal-portal" />

{#if !$isUserLoading}
	<div class="relative">
		<slot />
	</div>
{/if}

{#if $currentUser}
	<Dock />
{/if}

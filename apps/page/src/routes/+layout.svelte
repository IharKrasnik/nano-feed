<script>
	import '../app.css';
	import { page } from '$app/stores';
	import currentUser, { isLoading as isUserLoading } from 'lib/stores/currentUser';
	import allPages from '$lib/stores/allPages';
	import Dock from 'lib/components/Dock.svelte';
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
</svelte:head>

{#if !$isUserLoading}
	<div class="relative">
		<slot />
	</div>
{/if}

{#if $currentUser && !$page.params.pageSlug}
	<Dock activeIcon="page" />
{/if}

<style>
	:global(body) {
		font-family: Inter;
	}

	:global(input) {
		background: #f6f5f5;
		padding: 8px 12px;
		font-size: 14px;
		border-radius: 8px;
	}

	:global(select) {
		background: #f6f5f5;
		padding: 8px 12px;
		font-size: 14px;
		border-radius: 8px;
	}

	:global(textarea) {
		background: #f6f5f5;
		padding: 8px 12px;
		font-size: 14px;
		border-radius: 8px;
	}

	:global(button) {
		cursor: pointer;
		border-radius: 8px;
		padding: 10px 18px;
	}

	:global(button._small) {
		border-radius: 8px;
		padding: 5px 9px;
	}

	:global(button._primary) {
		background-color: #8b786d;
		color: white;
	}

	:global(button._secondary) {
		border: 1px #8b786d solid;
	}
</style>

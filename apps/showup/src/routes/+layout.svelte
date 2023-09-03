<script>
	import '../app.css';
	import { page } from '$app/stores';
	import isUrl from 'lib/helpers/isUrl';
	import currentUser, { isLoading as isUserLoading } from 'lib/stores/currentUser';
	import Dock from 'lib/components/Dock.svelte';
</script>

<svelte:head>
	<title>{$page.data.ogTitle}</title>
	<meta name="title" content={$page.data.ogTitle || 'Show Up Daily'} />
	<meta name="description" content={$page.data.ogDescription || 'Your #buildinpublic journal'} />
	<meta
		name="og:description"
		content="{$page.data.ogDescription || 'Your #buildinpublic journal'}}"
	/>
	<meta
		name="og:image"
		content={$page.data.ogImage ||
			'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1693764860336-image.png'}
	/>
</svelte:head>

<div id="modal-portal" />

{#if !$isUserLoading}
	<div class="relative">
		<slot />
	</div>
{/if}
<!-- 
{#if $currentUser}
	<Dock />
{/if} -->

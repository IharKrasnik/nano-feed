<script>
	import 'lib/app.css';
	import '../app.css';
	import { page } from '$app/stores';
	import isUrl from 'lib/helpers/isUrl';
	import currentUser, { isLoading as isUserLoading } from 'lib/stores/currentUser';
	import Dock from 'lib/components/Dock.svelte';
	import Avatar from 'lib/components/Avatar.svelte';
	import { GOOGLE_LOGIN_URL } from 'lib/env';
</script>

<svelte:head>
	<title>{$page.data.ogTitle}</title>
	<meta name="title" content={$page.data.ogTitle} />
	<meta name="description" content={$page.data.ogDescription} />
	<meta name="og:description" content={$page.data.ogDescription} />

	<meta name="og:image" content={$page.data.ogImage} />

	<meta name="twitter:title" content={$page.data.ogTitle} />
	<meta name="twitter:description" content={$page.data.ogDescription} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={$page.data.ogImage} />
	<link rel="icon" href="logo.png" />
</svelte:head>

<div id="modal-portal" />

<div class="max-w-[700px] text-left mx-auto flex justify-between px-4 sm:p-0 my-8 ">
	<div>
		<a class="text-lg font-bold block opacity-70 hover:opacity-100 transition" href="/"
			><h1>Build In Public Journal</h1></a
		>
	</div>

	<div>
		{#if !$isUserLoading}
			{#if !$currentUser}
				<a
					class="button"
					style="background: none; border: 3px #555 solid; color: #555;"
					href={GOOGLE_LOGIN_URL}
					>👋 Log In
				</a>
			{:else}
				<a class="flex" href="/@{$currentUser.username}">
					<div class="opacity-70 mr-2">@{$currentUser.username}</div>
					<Avatar user={$currentUser} />
				</a>
			{/if}
		{/if}
	</div>
</div>

{#if !$isUserLoading}
	<div class="relative">
		<slot />
	</div>
{/if}
<!-- 
{#if $currentUser}
	<Dock />
{/if} -->

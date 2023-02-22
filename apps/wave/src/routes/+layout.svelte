<script>
	export const prerender = false;

	import 'lib/app.css';
	import '../app.css';

	import { onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import allProjects from '$lib/stores/allProjects';
	import currentUser, { isLoading as isUserLoading } from 'lib/stores/currentUser';

	import Dock from 'lib/components/Dock.svelte';
	import Logo from '$lib/images/logo.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	import {
		connect as connectSocketIo,
		disconnect as disconnectSocketIo
	} from 'lib/socketIoService';

	if (browser) {
		connectSocketIo();

		onDestroy(() => {
			disconnectSocketIo();
		});
	}

	let projectSlug = $page.params.slug;
</script>

<svelte:head>
	<title>{$page.data.ogTitle}</title>
	<meta name="title" content="Wave by Momentum" />
	<meta name="description" content="Stupid-simple web analytics" />
	<meta name="og:description" content="Stupid-simple web analytics" />
</svelte:head>

<div id="modal-portal" />

<div class="app overflow-y-scroll bg-black">
	<SvelteToast />

	<main
		class="container relative p-8 mx-0 xl:mx-auto mt-[0px] sm:mt-[65px] xl:mt-0 
			max-w-[1080px]"
	>
		<div class="w-full flex justify-between md:justify-start items-center mb-8">
			<Logo />
			{#if !$isUserLoading && $allProjects && $page.url.href.includes('/p')}
				{#if $allProjects.length}
					<div class="flex items-center ml-8">
						<select
							bind:value={projectSlug}
							style="border-radius: 20px; padding: 8px 16px;"
							class="small max-w-[300px]"
							on:change={(evt) => {
								goto(evt.target.value === 'add_new' ? '/new' : `/projects/${evt.target.value}`);
							}}
						>
							{#each $allProjects as project}
								<option value={project.url}>{project.name}</option>
							{/each}

							<option value="add_new" on:click={() => goto('/new')}>🚀 Add New Project</option>
						</select>
						<!-- <a href="/new" style="margin-right: -60px;">
						<button class="ml-4 small">Add</button>
					</a> -->
					</div>
				{:else}
					<button class="ml-8 small">🚀 Add New Project</button>
				{/if}
			{/if}
		</div>

		<slot />
	</main>

	<Dock activeIcon="wave" />

	<footer>
		<p />
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		transition: all 0.2s linear;
	}
</style>

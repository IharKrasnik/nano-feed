<script>
	import _ from 'lodash';
	import { fly } from 'svelte/transition';

	import Feed from '$lib/components/Feed.svelte';

	import projects from '$lib/stores/projects'; 
	import currentUser from '$lib/stores/currentUser'; 
	
	import { page } from '$app/stores'
	let selectedProject;
	
	$: if ($projects.length) {
		if ($page.url.hash) {
			selectedProject = $projects.find(p => p.slug === $page.url.hash.replace('#', ''));
		} else {
			selectedProject = $projects.find(p => p.slug === null);
		}
	}
</script>

<svelte:head>
	<title>Paralect's Momentum</title>
	<meta name="description" content="Paralect's Momentum" />
</svelte:head>

<div>
	{#if selectedProject && !$page.url.href.includes('/embed')}
	<section class="relative flex justify-between mb-8">
		<div class="flex items-center">
			<a class="flex" href="/">
				<h1 class="text-xl font-bold" style="z-index: 100;">
					{#if selectedProject.slug}
					{selectedProject.title}
					{:else}
					Paralect
					{/if}
				</h1>
			</a>
		</div>
	</section>
	{/if}
</div>

<div class="text-lg mb-8" style="margin-top: -16px; opacity: .8;" in:fly={{  y: -50, duration: 150, delay: 150 }}>
	{selectedProject?.description || ''}
</div>

<Feed projectSlug={selectedProject?.slug} />
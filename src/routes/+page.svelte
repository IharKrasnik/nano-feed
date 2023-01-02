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

<Feed projectSlug={selectedProject?.slug} />
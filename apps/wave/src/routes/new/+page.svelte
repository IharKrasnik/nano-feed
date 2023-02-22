<script>
	import slug from 'slug';
	import { fade } from 'svelte/transition';
	import { post } from 'lib/api';
	import { PAGE_URL } from 'lib/env';
	import { goto } from '$app/navigation';

	import currentUser from 'lib/stores/currentUser';
	import allProjects from '$lib/stores/allProjects';

	let project = {
		name: '',
		url: ''
	};

	const addProject = async () => {
		const newProject = await post('waveProjects', project);
		$allProjects = [newProject, ...$allProjects];
		goto(`projects/${newProject.url}`);
	};
</script>

<div class="max-w-[600px] mx-auto">
	<h2 class="mb-2">Create new project</h2>

	<h3 class="mb-8">Add web analytics to your page in seconds</h3>

	<div>
		<div class="mb-8" in:fade>
			<label>Name</label>
			<div class="_hint mb-4" />

			<input
				type="text"
				bind:value={project.name}
				placeholder="eg. Momentum, Paralect, MyCatchyBrand etc."
			/>
		</div>

		<div class="mb-8" in:fade={{ duration: 100 }}>
			<label>URL</label>
			<div class="_hint mb-4">URL of your website.</div>

			<input type="text" bind:value={project.url} placeholder="eg. https://paralect.com" />
		</div>

		<div class="mt-12">
			<button on:click={addProject} disabled={!project.name || !project.url}
				>Create {project.name}</button
			>
		</div>
	</div>
</div>

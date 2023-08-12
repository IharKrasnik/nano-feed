<script>
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import { get, post } from 'lib/api';
	import { fade } from 'svelte/transition';
	import allProjects from '$lib/stores/allProjects';
	import Button from 'lib/components/Button.svelte';

	let project = {
		url: '',
		title: '',
		description: ''
	};

	let isNewProject = false;

	let fetchProject = async () => {
		const [axiosRes, waveProject] = await Promise.all([
			axios({
				url: 'https://igor.npkn.net/fetch-meta-tags',
				params: { url: project.url }
			}),
			post('waveProjects', { url: project.url })
		]);

		let metatags = axiosRes.data;

		project.title = (metatags.titleTag || metatags.title || '').split(' ')[0];
		project.description = metatags.description;
		project.bannerUrl = metatags.image;
		project.icon = metatags.favicon;

		let createdProject = await post('projects', { ...project, waveProjectId: waveProject._id });
		$allProjects = [createdProject, ...$allProjects];

		goto('/grow');
	};

	let createPage = async () => {
		let page = await post('pages', {
			name: project.title,
			title: project.description,
			isCreateStream: true
		});

		$allProjects = [page.project, ...$allProjects];

		goto('/grow');
	};
</script>

<div class="max-w-[800px] mx-auto">
	<h2 class="text-center mb-8">Grow your startup</h2>

	{#if isNewProject}
		<div in:fade>
			<label>Name </label>
			<div class="_hint mb-4">The name should be short and catchy. It's your brand name.</div>
			<input bind:value={project.title} type="text" placeholder="Nano" />

			<label class="mt-8">Tagline</label>

			<div class="_hint mb-4">
				One-liner about your brand. Explain what outcome you promise to your audience/customers.
				<br /> Make a random reader want to follow your journey.
			</div>

			<input
				type="text"
				bind:value={project.description}
				placeholder="eg. 'Grow your audience early'"
			/>

			<button class="mt-4" on:click={createPage}>Launch {project.title || ''}</button>
		</div>
	{:else}
		<div class="text-lg mb-2">What's your Startup Url?</div>

		<div class="w-full">
			<input bind:value={project.url} type="text" placeholder="https://nanohq.co" />
		</div>
	{/if}

	{#if !isNewProject}
		<div class="mt-4 mb-2">
			<Button onClick={fetchProject}>Add</Button>

			{#if !isNewProject}
				<div
					class="cursor-pointer mt-4 text-lg opacity-70 underline"
					on:click={() => (isNewProject = true)}
				>
					Whoops, I don't have URL yet
				</div>
			{/if}
		</div>
	{/if}
</div>

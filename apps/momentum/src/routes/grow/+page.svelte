<script>
	import { get, post } from 'lib/api';
	import { GOOGLE_LOGIN_URL } from 'lib/env';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import StreamCard from '$lib/components/StreamCard.svelte';
	import Onboarding from './components/Onboarding.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import Button from 'lib/components/Button.svelte';
	import allProjects from '$lib/stores/allProjects';
	import currentUser, { isLoading as isUserLoading } from 'lib/stores/currentUser';
	import { goto } from '$app/navigation';
	import Highlight from 'lib/components/Highlight.svelte';
	import * as socketIoService from 'lib/socketIoService';
	import getDomain from 'lib/helpers/getDomain';
	import Emoji from 'lib/components/Emoji.svelte';

	if (browser && !$currentUser) {
		goto(GOOGLE_LOGIN_URL);
	}

	let myProjects;

	let getMyProjects = () => {
		myProjects = browser
			? $allProjects.filter(
					(p) =>
						($currentUser && p.creator && p.creator._id === $currentUser._id) ||
						(!p.creator && p.creatorFingerprint === window.WAVE_FINGERPRINT)
			  )
			: [];

		if (!myProjects.length) {
			goto('/grow/new');
		}
	};

	getMyProjects();

	$: if ($allProjects) {
		getMyProjects();
	}

	let project = {};

	let isProjectAdding = !myProjects?.length;

	let selectedProject = myProjects[0];

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
		myProjects = [project, ...myProjects];
		selectedProject = myProjects[0];
		isProjectAdding = false;
	};

	let highlightCode = `<script async src="https://wave.mmntm.build/wave.js"><\/script>`;

	let isActiveProject = (p) => {
		return p.page || (p.waveProject && p.waveProject.isActive);
	};

	onMount(() => {
		socketIoService.on('waveProject:activated', (project) => {
			let myProject = myProjects.filter((p) => getDomain(project.url) === getDomain(p.url))[0];

			if (myProject) {
				myProject = { ...myProject, waveProject: { ...myProject.waveProject, isActive: true } };

				myProjects = myProjects.map((p) => {
					if (p._id === myProject._id) {
						return myProject;
					} else {
						return p;
					}
				});
			}
		});

		let isFollowersLoaded = false;

		if ($currentUser?.oauth.twitter && !isFollowersLoaded) {
			get('twitter/my-stats').then((stats) => {
				$currentUser.twitterStats = stats;
			});
		}

		if ($currentUser?.oauth.linkedin && !isFollowersLoaded) {
			get('linkedin/my-stats').then((stats) => {
				$currentUser.linkedinStats = stats;
			});
		}

		isFollowersLoaded = true;
	});
</script>

<div>
	<div>
		{#if myProjects?.length}
			<div class="mb-4 text-center">
				<!-- <h2>My Startups</h2> -->
			</div>
			<div class="flex w-full justify-between mb-8">
				<div class="flex justify-between items-center w-full">
					<div class="flex py-4 overflow-x-auto">
						{#each myProjects as myProject}
							<div
								class="flex items-center shrink-0 cursor-pointer transition hover:opacity-100"
								on:click={() => (selectedProject = myProject)}
								class:opacity-70={myProject._id !== selectedProject._id}
							>
								<Emoji emoji={myProject.icon} />
								<h2 class="ml-2 mr-4">{myProject.title}</h2>
							</div>
						{/each}
					</div>
					<div class="ml-8 shrink-0">
						<a href="grow/new">
							<button class="small">
								<div class="flex">
									<div class="mr-2">📈</div>
									<div>Add New Startup</div>
								</div>
							</button>
						</a>
					</div>
				</div>
			</div>

			<!-- <div class="flex justify-between">
					{#each myProjects.filter(isActiveProject) as project}
						<StreamCard
							isLink
							class="w-[350px]"
							isIncludeChart
							stream={project}
							isWithDescription
						/>
					{/each}
				
				</div>

				-->
			<Onboarding project={selectedProject} />
		{:else}{/if}
	</div>

	<!-- <div class="mt-16">
			<div>👉 Knowledge Base (SEO, Copywriting, Build in Public, Growth)</div>
			<div>👉 Community</div>
			<div>👉 Investors</div>
			<div>👉 Riot Blog</div>
			<div>👉 Gigs</div>
		</div> -->
</div>

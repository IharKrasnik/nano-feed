<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { get, put } from 'lib/api';

	import Loader from 'lib/components/Loader.svelte';
	import StreamCard from '$lib/components/StreamCard.svelte';
	import FileInput from 'lib/components/FileInput.svelte';
	import AutoCompleteInput from 'lib/components/AutoCompleteInput.svelte';

	import projects from '$lib/stores/projects';
	import allProjects from '$lib/stores/allProjects';
	import currentUser from 'lib/stores/currentUser';

	let project;
	let creator;

	let username;

	let load = async () => {
		if ($page.params.username.startsWith('@')) {
			username = $page.params.username.replace('@', '');
			creator = await get(`creators/${username}`);

			stream = {
				...creator,
				title: creator.fullName,
				description: creator.description,
				longDescription: creator.longDescription,
				avatarUrl: creator.avatarUrl,
				bannerUrl: creator.bannerUrl,
				url: creator.url
			};
		} else {
			project = await get(`projects/${$page.params.username}`);

			stream = { ...project };
		}
	};

	if (!project) {
		load();
	}

	let stream;

	let updateStream = async () => {
		if (!creator) {
			debugger;
			const updatedProject = await put(`projects/${project._id}`, stream);

			$projects = $projects.map((p) => {
				if (p._id === updatedProject._id) {
					return updatedProject;
				}

				return p;
			});

			$allProjects = $allProjects.map((f) => {
				if (f._id === updatedProject._id) {
					return { ...updatedProject, followType: 'project' };
				}

				return f;
			});

			goto(`/${updatedProject.slug}`);
		} else {
			await put(`creators/${creator._id}`, {
				...stream,
				fullName: stream.title
			});
			goto(`/@${creator.username}`);
		}
	};

	let fileUploaded = ({ type, url } = {}, streamKey) => {
		stream[streamKey] = url;
	};
</script>

<svelte:head>
	<title>Edit {stream?.title || ''} — Momentum</title>
</svelte:head>

{#if $currentUser}
	{#if project}
		<h2 class="mb-2">Edit #{project.title}</h2>
	{:else if creator}
		<h2 class="mb-2">Edit Profile</h2>
	{/if}
	<!-- 
  <h3 class="mb-4">
    Moments are tiny yet important actions that you do daily. <br /> <br/>
    What you've created today?
  </h3> -->

	<!-- </div> -->

	{#if !stream}
		<Loader />
	{:else}
		<form class="mb-16 mt-8" style="padding: 2px;">
			{#if $currentUser.isAdmin}
				<div class="mb-8">
					<label> Name </label>
					<input
						type="text"
						class="block"
						bind:value={stream.title}
						placeholder="Your brand name"
					/>
				</div>
			{/if}
			<div class="mb-8">
				<label> Tagline </label>
				<input
					type="text"
					class="block"
					bind:value={stream.description}
					placeholder="Short 1-sentence pitch"
				/>
			</div>

			<div class="mb-8">
				<label> Description </label>
				<textarea
					type="text"
					rows="3"
					class="block"
					bind:value={stream.longDescription}
					placeholder="Tell what your stream is about and what are your goals. In few short sentences."
				/>
			</div>

			<div class="mb-8">
				<label> Website </label>
				<input
					type="text"
					class="block"
					bind:value={stream.url}
					placeholder="https://{(project?.slug || creator.username).replaceAll('.', '-')}.com"
				/>
			</div>

			{#if creator}
				<div class="mb-8">
					<label>Avatar </label>
					<FileInput
						bind:url={stream.avatarUrl}
						on:fileUploaded={(evt) => fileUploaded(evt.detail, 'avatarUrl')}
					/>
				</div>
			{/if}

			<div class="mb-8">
				<label>Banner </label>
				<FileInput
					bind:url={stream.bannerUrl}
					on:fileUploaded={(evt) => fileUploaded(evt.detail, 'bannerUrl')}
				/>
			</div>

			{#if $currentUser.isAdmin}
				<div class="mb-8">
					<label> Hub Stream </label>

					{#if $allProjects.length}
						<AutoCompleteInput
							onChange={(selectedProject) => (stream.hubProject = selectedProject)}
							placeholder="Search Streams"
							valueField="_id"
							searchField="title"
							allSuggestions={$allProjects.filter((s) => s.slug)}
							initialSelectedItem={stream.hubProject}
						/>
					{/if}
				</div>
			{/if}

			<button class="p-4 mt-8" type="submit" on:click={updateStream}>
				Update {creator ? `@${creator.fullName}` : `#${project.title}`}
			</button>

			<a class="ml-8" href="/{creator ? '@' + creator.username : project.slug}">Cancel</a>
		</form>
	{/if}

	{#if project || creator}
		<div
			class="hidden md:flex w-[400px]"
			style="
      position: fixed;
      top: 0;
      height: 100vh;
      flex-direction: column;
      justify-content: center;
      transform: translateX(600px);
      "
		>
			<!-- <h3 class="mb-4">Stream Preview</h3> -->

			{#if stream}
				<h1>{stream.title}</h1>
				<h3>{stream.description || 'No Tagline'}</h3>
			{/if}
			<div class="mt-4">
				<StreamCard {stream} />
			</div>
		</div>
	{/if}
{/if}

<style>
</style>

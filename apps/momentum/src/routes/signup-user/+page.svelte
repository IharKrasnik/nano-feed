<script>
	import moment from 'moment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { get, put, post } from 'lib/api';

	import Loader from 'lib/components/Loader.svelte';
	import FileInput from 'lib/components/FileInput.svelte';

	import projects from '$lib/stores/projects';
	import allProjects from '$lib/stores/allProjects';
	import currentUser from 'lib/stores/currentUser';

	let creator = {};

	let createUser = async () => {
		await post(`creators`, creator);
	};
</script>

<svelte:head>
	<title>Create User</title>
</svelte:head>

{#if $currentUser}
	<h2 class="mb-2">Create User</h2>
	<!-- 
  <h3 class="mb-4">
    Moments are tiny yet important actions that you do daily. <br /> <br/>
    What you've created today?
  </h3> -->

	<!-- </div> -->

	<form class="mb-16 mt-8" style="padding: 2px;">
		{#if $currentUser.isAdmin}
			<div class="mb-8">
				<label> Full Name </label>

				<input type="text" class="block" bind:value={creator.fullName} />
			</div>
		{/if}

		<div class="mb-8">
			<label> Twitter Username </label>
			<input type="text" class="block" bind:value={creator.twitterUsername} />
		</div>

		{#if creator}
			<div class="mb-8">
				<label>Avatar </label>
				<FileInput bind:url={creator.avatarUrl} />
			</div>
		{/if}

		<button class="p-4 mt-8" type="submit" on:click={createUser}> Create User </button>
	</form>
{/if}

<style>
</style>

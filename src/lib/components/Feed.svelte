<script>
  import _ from 'lodash';
	import { fly, fade } from 'svelte/transition'; 
	import { onDestroy } from 'svelte';
	import { page } from '$app/stores'
	import { API_URL } from '$lib/env';

  export let projectSlug;
  export let creator;

	import AutoCompleteInput from '$lib/components/AutoCompleteInput.svelte';
	import FeedItem from '$lib/components/FeedItem.svelte';

	import currentUser from '$lib/stores/currentUser'; 
	import feed, { update as updateFeed } from '$lib/stores/feed';
	import creators, { update as updateCreators } from '$lib/stores/creators';
	import projects, { update as updateProjects } from '$lib/stores/projects'; 
	import sources from '$lib/stores/sources'; 
	
	import Select from 'svelte-select';

	let shuffledCreators = [];

	let shuffleCreators = () => shuffledCreators = _.shuffle($creators);

	$: if ($creators?.length) {
		shuffleCreators();
	}

	let selectedSource = null;
	
	let selectedProject;

  updateProjects({ creatorUsername: creator?.username });

	let refreshFeed = () =>{
		updateFeed({ source: selectedSource, project: projectSlug, creatorUsername: creator?.username });
		updateCreators({ projectSlug: selectedProject?.slug });
	}

	$: if ($projects.length) {
		if (projectSlug) {
			selectedProject = $projects.find(p => p.slug === projectSlug);
		} else {
			selectedProject = featuredProjects[0];
		}

		refreshFeed();
	}

	const shuffleInterval = setInterval(() => {
		shuffleCreators();
	}, 10000);

	onDestroy(() => clearInterval(shuffleInterval));
	

	let featuredProjects = [];

	$: if ($projects) {
		featuredProjects = $projects.filter(p => p.isFeatured);
	}
</script>

<div>
	<div class="absolute w-[250px] ml-[-300px]">
    {#if creator}
      <div class="flex items-center mb-8 font-bold">
        <img class="w-[40px] h-40[px] rounded-full mr-4" src={creator.avatarUrl}/>
        {creator.fullName}
      </div>
    {/if}
		<div class="left-0" >

			<label class="font-bold block mb-2">
				Streams
				{#if featuredProjects.length}
				<span class="text-gray-500">({featuredProjects.length})</span>
				{/if}
			</label>

      {#if $currentUser}
        <a 
          class="cursor-pointer _menu_item flex items-center px-4 py-2"
          href="@{$currentUser.username}"
          on:click={() => { 
            // selectedProject = project; 
          }} 
        >
          <div class="_emoji p-2 mr-2 rounded-full font-bold" style="color: orange; opacity: .7;">
            @
          </div>
          {$currentUser.fullName}
        </a>
      {/if}

			{#each featuredProjects as project}
				<a 
					class="cursor-pointer _menu_item flex items-center px-4 py-2" 
					class:_selected="{selectedProject?.slug === project.slug}"
					href= "{ (creator ? `/@${creator.username}` : '') + (project.slug ? `/#${project.slug}` : '/')}"
					on:click={() => { 
						selectedProject = project; 
					}} 
					style="border-color: {project.color}"
				>
					<div class="_emoji p-2 mr-2 rounded-full font-bold" style="color: {project.color}; opacity: .7;">
						#
					</div>
					{project.title}
				</a>
			{/each}

			<div class="mt-8 w-full">
				<a href="/launch" class="w-full">
					<button class="w-full">
						Launch Your #Stream
					</button>
				</a>
			</div>
		</div>
	</div>
	<div class="absolute w-[250px]" style="left: 620px;">
		<div>
    	<div class="mb-8">
				{#if $currentUser}
					<a href="/write">
						<button class="w-full flex items-center">
						<img src="{$currentUser.avatarUrl}" class="w-[35px] h-[35px] rounded-full mr-4">
						Start Writing</button>
					</a>
				{:else}
					<a href="{API_URL}/auth/google/url?redirect_to={$page.url.href}">
						<button class="w-full">
							Follow Stream
						</button>
					</a>
				{/if}
			</div>

			<div class="mb-8">
				<label>Source</label>
				
				<AutoCompleteInput
					onChange={(selectedItem) => { 
						console.log('onchange')
						selectedSource = selectedItem?.value || null; 
						refreshFeed();
					}}
					placeholder="Select source.."
					limitItemsCount={20}
					allSuggestions={$sources.filter(s => s.value)}
					initialSelectedItem={ null }
				>
				</AutoCompleteInput>
			</div>

			<div class="mt-8 w-full">
				<label class="font-bold block mb-2">
					Creators
					{#if $creators?.length}
					<span class="text-gray-500">({$creators.length})</span>
					{/if}
				</label>

				{#key shuffledCreators}
					{#if shuffledCreators.length}
						<a class="_creators w-full mt-4 flex" class:justify-between={shuffledCreators.length > 7} href="/creators" in:fade={{ duration: 200 }}>
							{#each shuffledCreators.slice(0, 7) as creator}
							<img src={creator.avatarUrl} class="w-[35px] h-[35px] inline rounded-full mr-[-10px]" />
							{/each}
						</a>
					{/if}
				{/key}
			</div>
		</div>
	
	</div>

	{#key $feed}
		{#if $feed.length > 0}
		<div in:fly={{  y: 50, duration: 150, delay: 150 }} style="height: 100vh; padding: 2px; overflow-y: scroll;">
			{#each $feed as feedItem}
				<FeedItem feedItem={feedItem}></FeedItem>
			{/each}
		</div>
		{/if}
	{/key}
</div>

<style>
	._select {
		background: none;
		padding: 8px;
		border: 1px rgba(255, 255, 255, .3) solid;
		border-radius: 8px;
		min-width: 200px;
	}

	._author:hover {
		outline: 3px green solid;
	}

	._menu_item {
		cursor: pointer;
		transition: all linear 0.05s;
	}

	._menu_item:hover {
		background: rgba(255, 255, 255, .1);
		border-bottom: 1px rgba(255, 255, 255, 0.3) solid;
		margin-bottom: -1px;
	}

	._menu_item._selected {
		border-bottom: 1px solid;
		margin-bottom: -1px;
	}

	._creators {
		transition: all linear 0.1s;
		border-radius: 8px;
	}

	._creators:hover {
		background: rgba(255, 255, 255, .1);
		padding: 16px;
	}
</style>

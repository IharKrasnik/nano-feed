<script>
  import _ from 'lodash';
	import { fly, fade } from 'svelte/transition'; 
	import { onDestroy } from 'svelte';
	import { page } from '$app/stores'
	import { API_URL } from '$lib/env';
	import { get } from '$lib/api';

  let feed = [];

	import AutoCompleteInput from '$lib/components/AutoCompleteInput.svelte';
	import FeedItem from '$lib/components/FeedItem.svelte';

	import currentUser from '$lib/stores/currentUser'; 
	import { fetch as fetchFeed } from '$lib/stores/feed';
	import creators, { update as updateCreators } from '$lib/stores/creators';

	import sources from '$lib/stores/sources'; 
	
	import Select from 'svelte-select';

	let creator;
	let prevCreator;
	let projects;
	let featuredProjects = [];
	let isProjectsLoading = false;
	let isCreatorLoading = false;

	const updateProjects = async ({ creatorUsername }) => {
		let query = {};

		if (creatorUsername) {
			query.creatorUsername = creatorUsername;
		}
		
		isProjectsLoading = true;
		
		try {
			const { results } = await get('projects', query);
			projects = results;
			featuredProjects = projects.filter(p => p.isFeatured);
		} finally {
			isProjectsLoading = false;
		}
	}

	const checkAndUpdateProjects = async (usernameCopy) => {
		if (usernameCopy) {
			if (usernameCopy !== prevCreator?.username) {
				isCreatorLoading = true;
				updateProjects({ creatorUsername: usernameCopy });

				creator = await get(`creators/${usernameCopy}`)

				prevCreator = _.clone(creator);

				isCreatorLoading = false;
			}
		} else {
			creator = null;

			if (prevCreator !== null ) {
				updateProjects({ });
			}

			prevCreator = null;
		}
	}

	$: checkAndUpdateProjects($page.params.username)

  let shuffledCreators = [];

	let shuffleCreators = () => shuffledCreators = _.shuffle($creators);

	$: if ($creators?.length) {
		shuffleCreators();
	}

	let selectedSource = null;

	const getDefaultProject = () => {
		return creator ? {
			slug: null,
			title: creator.fullName,
			description: creator.tagline || `A feed from ${creator.fullName}`
		} : {
			slug: null,
			title: 'Paralect',
			description: 'A feed from Paralect creators'
		}
	}
 
	let selectedProject;

	let refreshFeed = async () => {
    feed = [];

		feed = await fetchFeed({ source: selectedSource, project: selectedProject?.slug, creatorUsername: creator?.username });

		if (!creator) {
			updateCreators({ projectSlug: selectedProject?.slug });
		} else {
			$creators = [];
		}
	}

  const setProject = (newProject = getDefaultProject()) => {
    if (!selectedProject || selectedProject?.slug !== newProject?.slug) {
      selectedProject = newProject;
		  refreshFeed();
    }
  }

	$: if (projects && !isCreatorLoading) {
		if ($page.url.hash) {
			setProject(projects.find(p => p.slug === $page.url.hash.replace('#', '')));
		} else {
			setProject(getDefaultProject());
		}
	}

	const shuffleInterval = setInterval(() => {
		shuffleCreators();
	}, 10000);

	onDestroy(() => clearInterval(shuffleInterval));
    
</script>

{#if !isProjectsLoading}
<div>
  <div>
    {#if selectedProject && !$page.url.href.includes('/embed')}
    <section class="relative flex justify-between mb-8">
      <div class="flex items-center">
        <div>
          <a class="flex items-center" href="/">				
            <h1 class="text-xl font-bold" style="z-index: 100;">
              {selectedProject.title}
            </h1>
          </a>

          <div class="text-lg mt-2" style="opacity: .8;" in:fly={{  y: -50, duration: 150, delay: 150 }}>
            {selectedProject.description || ''}
          </div>
        </div>
      </div>
    </section>
    {/if}
  </div>

	<div class="fixed w-[250px] ml-[-300px]">
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

      {#if !creator}
        <a 
          class="cursor-pointer _menu_item flex items-center px-4 py-2"
					class:_selected="{!selectedProject?.slug}"
          href="/"
        >
          <div class="_emoji p-2 mr-2 rounded-full font-bold" style="color: gray; opacity: .7;">
            #
          </div>
          All
        </a>
      {/if}

      {#if $currentUser && !creator}
        <a 
          class="cursor-pointer _menu_item flex items-center px-4 py-2"
					class:_selected="{!selectedProject?.slug && creator}"
          href="/@{$currentUser.username}"
        >
          <div class="_emoji p-2 mr-2 rounded-full font-bold" style="color: orange; opacity: .7;">
            @
          </div>
          {$currentUser.fullName}
        </a>
      {/if}

      {#if creator}
        <a 
          class="cursor-pointer _menu_item flex items-center px-4 py-2"
					class:_selected="{!selectedProject?.slug && creator}"
          href="/@{creator.username}"
        >
          <div class="_emoji p-2 mr-2 rounded-full font-bold" style="color: orange; opacity: .7;">
            @
          </div>
          {creator.fullName}
        </a>
      {/if}

      {#if featuredProjects.length}
        <div in:fade>
          {#each featuredProjects as project}
            <a 
              class="cursor-pointer _menu_item flex items-center px-4 py-2" 
              class:_selected="{selectedProject?.slug === project.slug}"
              href= "{ (creator ? `/@${creator.username}` : '') + (project.slug ? `/#${project.slug}` : '/')}"
              style="border-color: {project.color}"
            >
              <div class="_emoji p-2 mr-2 rounded-full font-bold" style="color: {project.color}; opacity: .7;">
                #
              </div>
              {project.title}
            </a>
          {/each}
        </div>
			{/if}

			<div class="mt-8 w-full">
				<a href="/launch" class="w-full">
					<button class="w-full">
						Launch Your #Stream
					</button>
				</a>
			</div>
		</div>
	</div>

	<div class="hidden md:block fixed w-[250px]" style="margin-left: 590px;">
		<div>
    	<div class="mb-8">
				{#if $currentUser}
					<a href="/write">
						<button class="w-full flex items-center justify-center">
						<img src="{$currentUser.avatarUrl}" class="w-[20px] h-[20px] rounded-full mr-4" style="margin-left: -20px;">
						Post a Moment</button>
					</a>
				{:else}
					<a href="{API_URL}/auth/google/url?redirect_to={$page.url.href}">
						<button class="flex items-center justify-center w-full">

            <svg class="mr-4" style="width: 20px; height: 20px; margin-left: -20px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>
							Sign In
						</button>
					</a>
				{/if}
			</div>

			<!-- <div class="mb-8">
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
			</div> -->

      {#if !creator}
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
      {/if}
		</div>
	
	</div>

  <div>
</div>

	{#key feed}
		{#if feed.length > 0}
		<div in:fly={{  y: 50, duration: 150, delay: 150 }} style="padding: 2px; padding-bottom: 300px;">
			{#each feed as feedItem}
				<FeedItem feedItem={feedItem}></FeedItem>
			{/each}
		</div>
		{/if}
	{/key}
</div>
{/if}

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

<script>
  import _ from 'lodash';
	import { fly, fade } from 'svelte/transition'; 
  import { goto } from '$app/navigation';
	import { onDestroy } from 'svelte';
	import { page } from '$app/stores'
	import { API_URL } from '$lib/env';
	import { get, post, del } from '$lib/api';

  let feed = [];

	import AutoCompleteInput from '$lib/components/AutoCompleteInput.svelte';
	import FeedItem from '$lib/components/FeedItem.svelte';

	import currentUser, { isLoading as isUserLoading } from '$lib/stores/currentUser'; 
	import follows from '$lib/stores/follows';
	import { fetch as fetchFeed } from '$lib/stores/feed';
	import creators, { update as updateCreators } from '$lib/stores/creators';

	import sources from '$lib/stores/sources'; 
	
	import Select from 'svelte-select';

	let creator;
	let prevCreator;
	let projects;

	let isProjectsLoading = false;
	let isCreatorLoading = false;

	const updateProjects = async ({ projectSlug, creatorUsername, isExplore = false }) => {
		let prevProjects = projects;

		if (!creatorUsername && !isExplore && !projectSlug) {
			projects = $follows.filter(f => f.followType === 'project');
		} else {
			let query = {};

			if (creatorUsername) {
				query.creatorUsername = creatorUsername;
			}

			if (isExplore) {
				query.isExplore = true;
			}
			
			if (projectSlug) {
				query.projectSlug = projectSlug;
			}

			isProjectsLoading = true;
			
			try {
				const { results } = await get('projects', query);
				projects = results;
			} finally {
				isProjectsLoading = false;
			}
		}

		if (!prevProjects) {
			let projectSlugFromUrl = $page.url.hash && $page.url.hash.replace('#', '');

			if (projectSlugFromUrl) {
				let project = projects.find(p => p.slug === projectSlugFromUrl);
				
				if (project) {
					setProject(project);
				} else {
					projects = null;
					toggleProjectsExploreMode();
				}
			} else {
				setProject(getDefaultProject());
			}
		} 
	}

	let prevHash = $page.url.hash;

	$: if (!$page.url.hash) {
		setTimeout(() => {
			if (!$page.url.hash && selectedProject?.slug) {
				setProject();
			}
		}, 0);
	}

	const checkAndUpdateProjects = async (usernameCopy) => {
		if (usernameCopy) {
			if (usernameCopy !== prevCreator?.username) {
				isCreatorLoading = true;
				updateProjects({ creatorUsername: usernameCopy });
				if (usernameCopy !== $currentUser?.username) {
					creator = await get(`creators/${usernameCopy}`)
				} else {
					creator = $currentUser;
				}
				prevCreator = _.clone(creator);

				isCreatorLoading = false;
			}
		} else if ($page.url.pathname === '/') {
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
			_id: creator._id,
			slug: null,
			title: creator.fullName,
			description: creator.tagline || `A feed from ${creator.fullName}`
		} : {
			slug: null,
			title: isExploreProjectsModeOn ? 'Explore Momentum' : ($currentUser ? 'My Feed': 'Momentum Feed'),
			description: isExploreProjectsModeOn ? `Updates from streams that you don't follow yet.` : ($currentUser ? 'Latest updates from my Momentum streams' : 'Latest updates from Momentum streams'),
		}
	}
 
	let selectedProject;

	let refreshFeed = async () => {
    feed = [];
		isExploreModeOn = false;

		feed = await fetchFeed({ source: selectedSource, project: selectedProject?.slug, creatorUsername: creator?.username, isExplore: isExploreProjectsModeOn });

		if (!creator) {
			updateCreators({ projectSlug: selectedProject?.slug, isExplore: isExploreProjectsModeOn });
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

	const shuffleInterval = setInterval(() => {
		shuffleCreators();
	}, 10000);


	onDestroy(() => {
		feed = [];
		clearInterval(shuffleInterval)
	});
    
	let isExploreModeOn = false;
	
	const toggleExplore = () => {
		isExploreModeOn = !isExploreModeOn;
	}

	const followStream = async () => {
		let follow = {};

		if (creator) {
			follow.creatorId = creator._id;
		}
		
		if (selectedProject?.slug) {
			follow.projectId = selectedProject._id
		}
		
		$follows = [{ ...selectedProject, followType: 'project' }, ...$follows];
		
		if (!projects.find(p => p._id === selectedProject._id)) {
			projects = [selectedProject, ...projects];
		}
		
		await post('follows', follow);
	}

	const unfollowStream = async () => {
		let query = {};

		if (selectedProject?.slug) {
			query.projectId = selectedProject._id
		}

		if (creator) {
			query.creatorId = creator._id;
		} 
		
		$follows = $follows.filter(f => f._id !== (query.projectId || query.creatorId));
		
		if (!isExploreProjectsModeOn) {
			projects = projects.filter(p => p._id !== (query.projectId || query.creatorId));
		}

		await del('follows', query);
	}

	let isExploreProjectsModeOn = false;

	const toggleProjectsExploreMode = () => {
		isExploreProjectsModeOn = !isExploreProjectsModeOn;
		updateProjects({ isExplore: isExploreProjectsModeOn });
		refreshFeed();
	}

</script>

	<div>
		<div>
			<section class="relative flex justify-between mb-8">
				<div class="flex w-full items-center">
					<div>
						<div class="flex items-center w-full">
							<h1 class="flex items-center text-xl font-bold" style="z-index: 100;">
								{selectedProject?.title || '...'}
							</h1>

							{#if $currentUser}
								<div class="absolute right-0">
									{#if selectedProject && $follows.find(f => f._id === selectedProject._id)}
										<div class="font-bold text-sm cursor-pointer hover:underline ml-4" on:click={unfollowStream}>Following</div>
									{:else if selectedProject?.slug}
										<button class="small ml-4" on:click={followStream}> Follow </button>
									{/if}
								</div>
							{/if}
							
						</div>
						<div class="text-lg mt-2" style="opacity: .8;" in:fly={{  y: -50, duration: 150, delay: 150 }}>
							{selectedProject?.description || '...'}
						</div>
					</div>
				</div>
			</section>
		</div>

	<div 
		class="fixed top-0 left-0 md:left-auto md:ml-[-325px] w-full md:w-[250px] bg-black { isExploreModeOn ? 'visible opacity-100': 'invisible md:visible opacity-0 md:opacity-100' }" 
		style="height: 100vh; overflow-y: scroll; padding-left: 5px; z-index: {isExploreModeOn ? 1200: 0}; transition: all 0.1s linear;"
	>
		{#if isExploreModeOn}
			<button
				class="w-[60px] h-[60px] text-[30px] rounded-full flex items-center justify-center border-none fixed bg-black right-4 top-4 font-xl z-10"
				on:click|preventDefault={toggleExplore}>
				⤬
			</button>
		{/if}

		<div class="relative left-0 p-8 md:p-0" >
			<div class="relative pt-16 md:pt-32">
				<div>
					<a 
						class="cursor-pointer _menu_item flex items-center py-2 ml-[-10px]"
						class:_selected="{!selectedProject?.slug && !isExploreProjectsModeOn && !isCreatorLoading && (!creator || (creator?._id !== selectedProject?._id)) }"
						href="/"
						on:click={() => {
							setProject();

							if (isExploreProjectsModeOn) {
								toggleProjectsExploreMode();
							}
						}}
					>
						<div class="_emoji p-2 mr-2 rounded-full font-bold" style="color: gray; opacity: .7;">
							🌀
						</div>
						{$currentUser ? 'My Feed': 'Momentum Feed'}
					</a>

					{#if $currentUser}
						<a 
							class="cursor-pointer _menu_item flex items-center py-2 ml-[-10px]"
							class:_selected="{selectedProject?._id === $currentUser._id}"
							on:click={() => setProject()}
							href="/@{$currentUser.username}"
						>
							<div class="_emoji p-2 mr-2 rounded-full font-bold" style="color: orange; opacity: .7;">
								@
							</div>
							{$currentUser.fullName}
						</a>
					{/if}
				</div>

				<!-- <div class="mt-8 w-full">
					<a href="/launch" class="w-full">
						<button class="w-full">
							Launch Your #Stream
						</button>
					</a>
				</div> -->

				<div class="mt-16">
					{#if creator}
						<h2 
							class="flex items-center py-2 mt-16 text-lg"
						>
							{creator.fullName}
							<img src={creator.avatarUrl} class="w-[30px] h-[30px] rounded-full inline ml-4 mr-[13px] my-2" />
						</h2>
					{/if}

					<div class="flex justify-between items-center font-bold block mt-8 mb-4">
						<div>
							{isExploreProjectsModeOn ? 'Explore Streams' : ($currentUser && !creator ? 'My Streams': '')}
							{creator ? `Contributions` :''}
							{(!$currentUser && !creator && 'Explore Streams') || ''}
							{#if projects?.length}
							<span class="number-tag">{projects.length}</span>
							{/if}
						</div>

						{#if !creator && $currentUser}
						<button href="/" class="small font-bold text-sm hover:underline cursor-pointer" on:click={() => {
							 toggleProjectsExploreMode();
							 setProject();
						}}>
							{ isExploreProjectsModeOn ? 'x' : '👀  Explore' }
						</button>
						{/if}
					</div>
				</div>

				{#if creator && creator._id !== $currentUser?._id}
					<a 
						class="cursor-pointer _menu_item flex items-center py-2 ml-[-10px]"
						class:_selected={selectedProject?._id === creator._id}
						href="/@{creator.username}"
						on:click={() => setProject()}
					>
						<div class="_emoji p-2 mr-2 rounded-full font-bold" style="color: rgb(208, 145, 255); opacity: .7;">
							@
						</div>
						{creator.fullName}
					</a>
				{/if}

				{#if isExploreProjectsModeOn}
				<a 
						class="cursor-pointer _menu_item flex items-center py-2 ml-[-10px]"
						class:_selected="{!selectedProject?.slug && !creator }"
						href="/"
						on:click={() => setProject()}
					>
						<div class="_emoji p-2 mr-2 rounded-full font-bold" style="color: gray; opacity: .7;">
							#
						</div>
						All Streams
				</a>
				{/if}
				
	      {#if !isProjectsLoading && projects.length}
					<div class="pb-[200px]">
						{#if projects?.length}
							<div in:fade>
								{#each projects as project}
									<a 
										class="cursor-pointer _menu_item flex items-center py-2 ml-[-10px]" 
										class:_selected="{selectedProject?.slug === project.slug}"
										href= "{ (creator ? `/@${creator.username}` : '') + (project.slug ? `/#${project.slug}` : '/')}"
										style="border-color: {project.color}"
										on:click={() => setProject(project)}
									>
										<div class="_emoji p-2 mr-2 rounded-full font-bold" style="color: {project.color}; opacity: .7;">
											#
										</div>
										{project.title}
									</a>
								{/each}
							</div>
						{/if}
					</div>
				{/if}

			
			</div>

		</div>
	</div>
</div>

	<div class="hidden md:block fixed w-[250px] mt-6 top-0" style="margin-left: 605px;">
		<div>
    	<div>
				{#if $currentUser}
				
				{:else}
					<a class="mb-16" href="{API_URL}/auth/google/url?redirect_to={$page.url.href}" style="font-family: Montserrat; font-weight: bold;">
						<button class="flex items-center justify-center w-full mb-8">
            	<svg class="mr-4" style="width: 20px; height: 20px; margin-left: -20px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>

							Join Momentum
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
			<div class="w-full">
				<label class="font-bold block mb-2">
					Creators
					{#if $creators?.length}
					
					<span class="number-tag">
						{$creators.length}
					</span>
					{/if}
				</label>

				{#key shuffledCreators}
					{#if shuffledCreators.length}
						<a class="_creators w-full mt-4 flex" class:justify-between={shuffledCreators.length > 7} href="/creators" transition:fade={{ duration: 200 }}>
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

{#if !isProjectsLoading}
	{#if $currentUser && (!creator || creator._id === $currentUser._id)}
		<div class="relative">
			<img class="absolute left-4 rounded-full top-3" style="width: 30px; height: 30px" src={$currentUser.avatarUrl}/>

			<textarea class="pl-16 mb-4" placeholder="What have you created today?" rows="1" on:input={(e) => goto('/write', {
				state: {
					title: e.target.value,
					projectSlug: selectedProject?.slug || ''
				}
			})} />
		</div>
	{/if}

	{#if feed.length > 0}
	<div in:fly={{  y: 50, duration: 150, delay: 150 }} style="padding: 2px; padding-bottom: 300px;">
		{#each feed as feedItem}
			<FeedItem feedItem={feedItem}></FeedItem>
		{/each}
	</div>
	{/if}

	<div class="md:hidden flex items-center justify-center" style="
		position: fixed;
		bottom: 120px;
		width: 60px;
		height: 60px;
		border: 1px solid rgba(255, 255, 255, 0.8);
		border-radius: 50%;
		z-index: 1001;
		background-color: black;
		box-shadow: 0px 0px 6px #c2daba;
		font-size: 30px;
		right: 20px;
		opacity: .95;
		" on:click={toggleExplore}>
		#
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

<script>
	import _ from 'lodash';
	import { fly, fade } from 'svelte/transition'; 
	import { onDestroy } from 'svelte';

	import AutoCompleteInput from '$lib/components/AutoCompleteInput.svelte';
	import FeedItem from '$lib/components/FeedItem.svelte';

	import feed, { update as updateFeed } from '$lib/stores/feed';
	import creators, { update as updateCreators } from '$lib/stores/creators';
	import projects from '$lib/stores/projects'; 
	import sources from '$lib/stores/sources'; 
	import currentUser from '$lib/stores/currentUser'; 
	
	import Select from 'svelte-select';

	let shuffledCreators = [];
	let shuffleCreators = () => shuffledCreators = _.shuffle($creators);

	$: if ($creators.length) {
		shuffleCreators();
	}

	let selectedSource = null;
	let selectedProject = $projects[0];

	let refreshFeed = () =>{
		updateFeed({ source: selectedSource, project: selectedProject?.value });
	}

	const shuffleInterval = setInterval(() => {
		shuffleCreators();
	}, 10000);

	onDestroy(() => clearInterval(shuffleInterval));
	
	refreshFeed();
</script>

<svelte:head>
	<title>Paralect Stream</title>
	<meta name="description" content="Paralect Stream" />
</svelte:head>


<div class="text-lg mb-8" style="margin-top: -16px; opacity: .8;" in:fly={{  y: -50, duration: 150, delay: 150 }}>
	{selectedProject?.description || ''}
</div>


<div>
	<div class="absolute w-[250px] ml-[-300px]">
		<div class="left-0" >
			{#each $projects as project}
				<div 
					class="_menu_item flex items-center px-4 py-2" 
					class:_selected="{selectedProject.value === project.value}"
					on:click={() => { 
						selectedProject = project; 
						refreshFeed();
					}} 
					style="border-color: {project.color}"
				>
					<div class="_emoji p-2 mr-2 rounded-full font-bold" style="color: {project.color}; opacity: .7;">
						<!-- {project.emoji||''} -->
						#
					</div>
					{project.label}
				</div>
			{/each}
		</div>
	</div>
	<div class="absolute w-[250px]" style="left: 600px;">
		<div>
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
					{#if $creators.length}
					<span class="text-gray-500">({$creators.length})</span>
					{/if}
				</label>

				{#key shuffledCreators}
					{#if shuffledCreators.length}
						<a class="_creators w-full mt-4 flex justify-between" href="/creators" in:fade={{ duration: 200 }}>
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
		<div in:fly={{  y: 50, duration: 150, delay: 150 }}>
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

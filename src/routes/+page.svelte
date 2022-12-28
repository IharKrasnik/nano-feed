<script>
	import FeedItem from '$lib/components/feed-item.svelte';
	import feed, { update as updateFeed } from '$lib/stores/feed';
	import creators, { update as updateCreators } from '$lib/stores/creators';

  import { fly } from 'svelte/transition';
	
	import Select from 'svelte-select';

	let selectedSource = null;
	let selectedProject = null;

	let refreshFeed = () => updateFeed({ source: selectedSource, project: selectedProject});
	refreshFeed();

	const sources = [{
		value: null,
		label: 'All'
	}, {
		value: 'twitter',
		label: 'Twitter',
	}, {
		value: 'linkedin',
		label: 'LinkedIn'
	}, {
		value: 'youtube',
		label: 'YouTube',
	}, {
		value: 'medium',
		label: 'Medium'
	}];

	const projects = [{
		value: null,
		label: 'All',
		color: 'rgba(255, 255, 255, .3)',
		emoji: '🎇'
	}, {
		value: 'growingproducts',
		label: 'Growing Products',
		emoji: '🌱',
		color: '#53bf01',
	}, {
		value: 'particles',
		label: 'Particles',
		color: '#d5ff09',
		emoji: '✨'
	}, {
		value: 'shipitsipit',
		label: 'Ship it & Sip it',
		color: '#d091ff',
		emoji: '🍸'
	}, {
		value: 'alongtheroadmap',
		label: 'Along The Roadmap',
		color: '#fff291',
		emoji: '🛣'
	}, {
		value: 'rnd',
		label: 'R&D',
		color: '#f59e0c',
		emoji: '🐝'
	}, {
		value: 'startupsummer',
		label: 'Startup Summer',
		color: '#ffd967',
		emoji: '🌞'
	}, {
		value: 'therebel',
		label: 'THE✊🏽REBEL',
		color: '#f59e0c',
		emoji: '✊🏽'
	}, {
		value: 'momentum',
		label: 'Momentum',
		color: '#00b8ff',
		emoji: '🌀'
	}, {
		value: 'accelerator',
		label: 'Accelerator',
		color: '#d091ff',
		emoji: '🚠'
	}, {
		value: 'igor',
		label: 'Igor',
		color: '#75c425',
		emoji: '🤓'
	}, {
		value: 'altos',
		label: 'Altos',
		color: '#fff291',
		emoji: '🤳'
	}];


</script>

<svelte:head>
	<title>Paralect Stream</title>
	<meta name="description" content="Paralect Stream" />
</svelte:head>

<div>
	<div class="absolute w-[250px] ml-[-300px]">
		<div class="left-0" >
			{#each projects as project}
				<div 
					class="_menu_item flex items-center px-4 py-2" 
					class:_selected="{selectedProject === project.value}"
					on:click={() => { 
						selectedProject = project.value; 
						refreshFeed();
					}} 
					style="border-color: {project.color}"
				>
					<div class="_emoji p-2 mr-2 rounded-full">
						{project.emoji||''}
					</div>
					{project.label}
				</div>
			{/each}

			<!-- <div>
				<select class="_select" bind:value={selectedProject} on:change={() => updateFeed({ source: selectedSource, project: selectedProject })}>
					{#each projects as project}
					<option value={project.value}>{project.label}</option>
					{/each}
				</select>
			</div> -->
		</div>
	</div>
	<div class="absolute w-full">
		<div class="right-0 translate-x-full">
			<!-- <div class="flex w-full">
				{#each $creators as creator}
					<img class="_author rounded-full max-w-[25px]" src="{creator.avatarUrl}"/>
				{/each}
			</div> -->

			<div class="mb-4">
				<label class="font-bold block mb-2">Source</label>
				
				<div>
					<select class="_select" bind:value={selectedSource} on:change={refreshFeed}>
						{#each sources as source}
						<option value={source.value}>{source.label}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="mt-8 w-[180px]">
				<label class="font-bold block mb-2">Creators</label>

				<a class="_creators mt-4 flex justify-between" href="/creators">
					<div>
						{#each $creators.slice(0, 5) as creator}
						<img src={creator.avatarUrl} class="w-[30px] h-[30px] inline rounded-full mr-[-10px]" />
						{/each}
					</div>

					<div class="font-bold">
						{$creators.length}
					</div>
				</a>
			</div>
		</div>

	
	</div>

	<!-- <div class="absolute">
		<div class="flex right-0 translate-x-full">
			{#each $creators as creator}
				<img class="rounded-full max-w-[25px]" src="{creator.avatarUrl}"/>
			{/each}
		</div>
	</div> -->


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

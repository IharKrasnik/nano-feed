<script>
	import FeedItem from '$lib/components/feed-item.svelte';
	import feed, { update as updateFeed } from '$lib/stores/feed';
	import creators, { update as updateCreators } from '$lib/stores/creators';

  import { fly } from 'svelte/transition';
	
	import Select from 'svelte-select';

	let selectedSource = null;
	let selectedProject = null;

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
		color: 'rgba(255, 255, 255, .3)'
	}, {
		value: 'growingproducts',
		label: 'Growing 🌱 Products',
		color: '#53bf01',
	}, {
		value: 'shipitsipit',
		label: 'Ship it 🍸 Sip it',
		color: '#d091ff',
	}, {
		value: 'rnd',
		label: 'R🐝D',
		color: '#f59e0c',
	}, {
		value: 'particles',
		label: '✨ Particles',
		color: '#d5ff09',
	}, {
		value: 'therebel',
		label: 'THE✊🏽REBEL',
		color: '#f59e0c'
	}, {
		value: 'momentum',
		label: 'Momentum 🌀',
		color: '#00b8ff',
	},{
		value: 'altos',
		label: 'Altos 🤳',
		color: '#fff291'
	}];


</script>

<svelte:head>
	<title>Paralect Feed</title>
	<meta name="description" content="Paralect feed" />
</svelte:head>

<div class="container relative mx-auto p-8 max-w-[600px]">
	<div class="absolute w-[250px] ml-[-300px]">
		<div class="left-0 mt-16" >
			{#each projects as project}
				<div 
					class="_menu_item px-4 py-2" 
					class:_selected="{selectedProject === project.value}"
					on:click={() => { 
						selectedProject = project.value; 
						updateFeed({ source: selectedSource, project: selectedProject}) 
					}} 
					style="outline-color: {project.color}"
				>
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
			<div class="flex w-full">
				{#each $creators as creator}
					<img class="_author rounded-full max-w-[25px]" src="{creator.avatarUrl}"/>
				{/each}
			</div>

			<div class="mt-4">
				<label class="font-bold block mb-2">Source</label>
				
				<div>
					<select class="_select" bind:value={selectedSource} on:change={() => updateFeed({ source: selectedSource, project: selectedProject })}>
						{#each sources as source}
						<option value={source.value}>{source.label}</option>
						{/each}
					</select>
				</div>
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


	<section>
		<h1 class="text-xl font-bold mb-8">Paralect Feed</h1>
	</section>

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
		transition: all linear 0.1s;
	}

	._menu_item:hover {
		background: rgba(255, 255, 255, .1);
		outline: 1px rgba(255, 255, 255, .3) solid;
	}

	._menu_item._selected {
		outline: 1px solid;
	}
</style>

<script>
	import autofocus from 'lib/use/autofocus';
	import slug from 'slug';
	import Button from 'lib/components/Button.svelte';
	import childStreams, { refreshChildStreams } from 'lib/stores/childStreams';
	import { fade } from 'svelte/transition';
	import { v4 as uuidv4 } from 'uuid';

	let newStreamName;

	export let page;
	export let createPage;

	let newPage = {
		parentPage: page,
		heros: [{ id: uuidv4(), title: '', subtitle: '' }]
	};

	let isAdvancedShown;
</script>

<div class="_section">
	<div class="flex justify-between">
		<div class="_title">Subpage Name</div>
		<div
			class="cursor-pointer opacity-70 hover:opacity-100"
			on:click={() => (isAdvancedShown = !isAdvancedShown)}
		>
			⚙️
		</div>
	</div>
	<div class="w-full flex justify-between items-center">
		{#if newPage.isInDir}
			<input class="w-full" bind:value={newPage.dirName} placeholder="Resources" use:autofocus />

			<div class="p-4">/</div>
		{/if}
		<input class="w-full" bind:value={newPage.name} placeholder={'About'} />
	</div>

	{#if isAdvancedShown}
		<div class="my-2 _section opacity-50 hover:opacity-100 mt-4" in:fade>
			<div class="font-bold mb-2">⚙️ Advanced</div>
			<div class="flex items-center">
				{#if !newPage.isInDir}
					<div class="mr-2">
						<input type="checkbox" bind:checked={newPage.isUseDatabase} /> Attach Database
					</div>
				{/if}
				{#if !newPage.isUseDatabase}
					<div>
						<input type="checkbox" bind:checked={newPage.isInDir} /> In sub-directory
					</div>
				{/if}
			</div>
		</div>
	{/if}
	{#if newPage.isUseDatabase}
		<div class="mt-2">
			Page url: /{`${slug(newPage.name || '')}/\$data.slug`}
		</div>
	{/if}
	{#if newPage.isInDir}
		<div class="mt-2">
			Page url: /{slug(newPage.dirName || '')}/{slug(newPage.name || '')}
		</div>
	{/if}
</div>

{#if newPage.isUseDatabase}
	<div class="_section">
		<div class="_title">Database</div>

		{#if $childStreams?.length}
			<select class="w-full">
				{#each $childStreams as childStream}
					{childStream.name}
				{/each}
			</select>
		{:else}
			<input class="w-full" placeholder="templates" type="text" bind:value={newStreamName} />
		{/if}
	</div>
{/if}

<Button class="_primary _small" onClick={() => createPage(newPage)}>Create Sub-Page</Button>

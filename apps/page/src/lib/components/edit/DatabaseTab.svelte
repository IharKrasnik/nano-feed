<script>
	import ToggleGroup from '$lib/components/ToggleGroup.svelte';
	import EditDatabase from '$lib/components/edit/Database.svelte';
	import EditFeed from '$lib/components/edit/Feed.svelte';
	import selectedDatabaseTab from '$lib/stores/selectedDatabaseTab';

	export let page;
	export let selectedStreamSlug;
	export let setPageAndDraft;
</script>

<ToggleGroup
	tabs={[
		{ key: 'data', name: 'Data', description: 'Edit your databases' },
		{ key: 'feed', name: 'Feed', description: 'Schedule content' }
	]}
	bind:value={$selectedDatabaseTab}
/>

<div class="mt-8">
	{#if $selectedDatabaseTab === 'data'}
		<EditDatabase bind:page bind:selectedStreamSlug bind:setPageAndDraft />
	{:else}
		<EditFeed bind:page />
	{/if}
</div>

<script>
	import { get, post, put, del } from 'lib/api';
	import FileInput from 'lib/components/FileInput.svelte';
	import Button from 'lib/components/Button.svelte';
	import EditStreamItems from '$lib/components/edit/StreamItems.svelte';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';
	import feedCache, { getFeed } from '$lib/stores/feedCache';

	let feed = [];
	let posts = [];

	export let page;

	let childStreams = [];
	let activeStream = null;

	let loadChildStreams = async () => {
		let { results } = await get('projects', {
			hubStreamSlug: page.streamSlug
		});

		childStreams = results;
		activeStream = childStreams[0];
	};

	if (page.streamSlug) {
		loadChildStreams();
	}

	let selectStream = (childStream) => {
		activeStream = childStream;
	};

	if (!(page.parentPage?.streamSlug || page.streamSlug)) {
		put(`pages/${page.parentPage?._id || page._id}/embed-stream`, {}).then(({ streamSlug }) => {
			if (page.parentPage) {
				page.parentPage.streamSlug = streamSlug;
			} else {
				page.streamSlug = streamSlug;
			}
		});
	}

	let activeTabName = 'main';

	let setTab = (tabName) => {
		activeTabName = tabName;
	};
</script>

<div class="w-full">
	<div class="flex items-center gap-4 border-b border-black/20 px-4">
		{#each childStreams as childStream}
			<div
				class="p-4 mr-4 cursor-pointer"
				class:selected={activeStream?._id === childStream._id}
				on:click={() => selectStream(childStream)}
			>
				{childStream.title}
			</div>
		{/each}
	</div>

	{#if activeStream}
		<EditStreamItems bind:stream={activeStream} />
	{/if}
</div>

<style>
	.selected {
		border-bottom: 1px black solid;
	}
</style>

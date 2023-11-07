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

	if (!(page.parentPage?.streamSlug || page.streamSlug)) {
		put(`pages/${page.parentPage?._id || page._id}/embed-stream`, {}).then(({ streamSlug }) => {
			if (page.parentPage) {
				page.parentPage.streamSlug = streamSlug;
			} else {
				page.streamSlug = streamSlug;
			}
		});
	}

	if (!(page.parentPage?.blogStreamSlug || page.blogStreamSlug)) {
		page.blogStreamSlug = `${page.slug}-blog`;

		put(`pages/${page.parentPage?._id || page._id}/embed-blog-stream`, {}).then(
			({ blogStreamSlug }) => {
				if (page.parentPage) {
					page.parentPage.blogStreamSlug = blogStreamSlug;
				} else {
					page.blogStreamSlug = blogStreamSlug;
				}
			}
		);
	}

	let activeTabName = 'main';

	let setTab = (tabName) => {
		activeTabName = tabName;
	};
</script>

<div class="w-full">
	<div class="flex items-center gap-4 border-b border-black/20 px-4">
		<div
			class="p-4 mr-4 cursor-pointer"
			class:selected={activeTabName === 'main'}
			on:click={() => setTab('main')}
		>
			Main
		</div>
		<div
			class="p-4 mr-4 cursor-pointer"
			class:selected={activeTabName === 'blog'}
			on:click={() => setTab('blog')}
		>
			Blog
		</div>
	</div>

	<div class="p-4 py-8">
		{#if activeTabName === 'main'}
			<EditStreamItems
				streamSlug={page.parentPage?.streamSlug || page.streamSlug}
				parentPageId={page.parentPage?._id || page._id}
			/>
		{:else if activeTabName === 'blog'}
			<EditStreamItems
				streamSlug={page.parentPage?.blogStreamSlug || page.blogStreamSlug}
				parentPageId={page.parentPage?._id || page._id}
			/>
		{/if}
	</div>
</div>

<style>
	.selected {
		border-bottom: 1px black solid;
	}
</style>

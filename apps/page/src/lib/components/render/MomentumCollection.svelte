<script>
	import { STREAM_URL, PAGE_URL } from 'lib/env';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import RenderSection from '$lib/components/render/Section.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import { getFeed } from '$lib/stores/feedCache';
	import { get } from 'lib/api';

	export let page;
	export let section;
	export let streamSlug;
	export let themeStyles;

	let childStreams = [];

	let isFeedLoading = true;
	let feed = [];

	let databaseSection = {
		columns: section.columns,
		items: []
	};

	$: if (section.columns) {
		databaseSection.columns = section.columns;
	}

	let isLoading = true;

	let loadFeed = async ({ categorySlug = null } = {}) => {
		isLoading = true;

		if (categorySlug || section?.streamSlug) {
			feed = await getFeed({
				cacheId: section._id,
				streamSlug: categorySlug || section?.streamSlug,
				forceRefresh: true
			});

			databaseSection.items = feed.map(({ title, content, attachments, logoUrl, url }) => {
				return {
					title,
					description: content,
					imageUrl: attachments && attachments[0] && attachments[0].url,
					emoji: logoUrl,
					url
				};
			});
		}

		isLoading = false;
	};

	let loadChildStreams = async () => {
		let { results } = await get('projects', {
			hubStreamSlug: page.streamSlug
		});

		childStreams = results;
	};

	loadChildStreams();

	loadFeed();

	let trackClick = (feedItem) => {};

	let filterCategoryId = null;

	let selectCategory = (categoryStream) => {
		filterCategoryId = categoryStream?._id;

		loadFeed({ categorySlug: categoryStream?.slug });
	};
</script>

<div class="flex w-full justify-center gap-4">
	<div
		class="_section-container _section-item p-2 {filterCategoryId ? '' : 'selected'}"
		on:click={() => selectCategory(null)}
	>
		All Categories
	</div>

	{#each childStreams.filter( (cs) => cs.slug.includes('category-') ) as categoryStream (categoryStream._id)}
		<div
			class="_section-container _section-item p-2 {filterCategoryId === categoryStream._id
				? 'selected'
				: ''}"
			on:click={() => selectCategory(categoryStream)}
		>
			{categoryStream.title}
		</div>
	{/each}
</div>

{#if isLoading}
	<Loader />
{/if}

{#if feed.length}
	<RenderSection isSkipHeader bind:themeStyles bind:page bind:section={databaseSection} />
{/if}

<!-- {#each feed || [] as feedItem (feedItem._id)}
	<div on:click={() => trackClick(feedItem)}>
		{feedItem.title || ''}
		{feedItem.content || ''}
		{feedItem.createdOn}

		{#if feedItem?.attachments?.length}
			<RenderUrl url={feedItem.attachments[0].url} />
		{/if}
	</div>
{/each} -->
<style>
	._section-item:not(.selected) {
		@apply opacity-60 transition cursor-pointer;
	}

	._section-item.selected {
		outline: 2px var(--accent-color) solid;
		@apply shadow-md;
	}

	._section-item:not(.selected):hover {
		@apply opacity-100;
	}
</style>

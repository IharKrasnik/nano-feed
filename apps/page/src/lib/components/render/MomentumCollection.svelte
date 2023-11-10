<script>
	import { STREAM_URL, PAGE_URL } from 'lib/env';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import RenderSection from '$lib/components/render/Section.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import feed, { getFeed } from '$lib/stores/feedCache';
	import { get } from 'lib/api';

	export let page;
	export let section;
	export let themeStyles;

	let childStreams = [];

	let isFeedLoading = true;
	let databaseSection = {
		columns: section.columns,
		items: [],
		linkType: 'interactive'
	};

	$: if (section.columns) {
		databaseSection.columns = section.columns;
	}

	let isLoading = true;

	let loadFeed = async ({ categorySlug = null } = {}) => {
		isLoading = true;

		if (section.collectionType === 'articles') {
			let articles = await get(`pages/${page.parentPage?._id || page?._id}/subpages`, {
				renderType: 'article'
			});

			databaseSection.items = articles.results.map(({ title, subtitle, demoUrl, url, slug }) => {
				return {
					title,
					description: subtitle,
					imageUrl: demoUrl,
					url: `/${page.parentPage?.slug || page.slug}/blog/post/${slug}`
				};
			});
		} else {
			if (categorySlug || section?.streamSlug) {
				await getFeed({
					cacheId: section.id,
					streamSlug: categorySlug || section?.streamSlug,
					forceRefresh: true,
					isWithUrlOnly: true,
					isWithImageOnly: true,
					streamSettings: section.streamSettings
				});
			}
		}

		isLoading = false;
	};

	$: if ($feed[section.id]) {
		databaseSection.items = $feed[section.id].map(
			({ title, content, attachments, logoUrl, url }) => {
				return {
					title,
					description: content,
					imageUrl: attachments && attachments[0] && attachments[0].url,
					emoji: logoUrl,
					url
				};
			}
		);
	}

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

		loadFeed({ categorySlug: categoryStream?.slug || section?.streamSlug || page?.streamSlug });
	};
</script>

{#if section.renderType === 'feed' && childStreams.length}
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
{/if}

{#if isLoading}
	<Loader />
{/if}

{#if databaseSection?.items.length}
	<RenderSection
		class="sm:p-0 sm:pt-0 _horizontal-padding-none"
		isSkipHeader
		isShowAuthor={section.collectionType === 'articles'}
		bind:themeStyles
		bind:page
		bind:section={databaseSection}
	/>
{/if}

{#if section.footer}
	<RenderSection bind:section={section.footer} isFooter bind:page bind:themeStyles />
{/if}

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

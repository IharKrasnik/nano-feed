<script>
	import { STREAM_URL, PAGE_URL } from 'lib/env';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import RenderSection from 'lib-render/components/render/Section.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import feedCache, { getFeed } from 'lib-render/stores/feedCache';
	import trackClick from 'lib/services/trackClick';
	import { get } from 'lib/api';
	import heatmap, { getHeatmapClicksCount } from 'lib-render/stores/heatmap';
	import getPageUrl from 'lib-render/helpers/getPageUrl';
	import subPages from 'lib/stores/subPages';

	export let page;
	export let section;
	export let themeStyles;
	export let isEdit;
	export let isUseCache = false;
	export let cacheId = section.id;

	let childStreams = [];

	let isFeedLoading = true;

	let databaseSection = {
		id: section.id,
		isShowSource: section.isShowSource,
		renderType: section.streamSlug.includes('-blog') ? 'article' : section.renderType,

		isDatabase: true,
		columns: section.columns,
		items: [],
		linkType: 'interactive',
		totalItemsLength: 0,
		isMasonryGrid: section.isMasonryGrid,
		theme: section.theme
	};

	$: if (section.columns) {
		databaseSection.columns = section.columns;
	}

	let isLoading = true;

	let loadFeed = async ({ categorySlug = null } = {}) => {
		isLoading = true;

		if (categorySlug || section?.streamSlug) {
			await getFeed({
				cacheId,
				streamSlug: categorySlug || section?.streamSlug,
				forceRefresh: isUseCache ? false : true,
				isWithUrlOnly: true,
				streamSettings: section.streamSettings,
				perPage: 100
			});
		}
		isLoading = false;
	};

	section.templates = {
		title: section.title || '',
		description: section.description || ''
	};

	let replaceVars = () => {
		section.title = section.templates?.title?.replace(
			'$db.totalCount',
			$feedCache[cacheId]?.totalCount || ''
		);

		section.description = section.templates?.description?.replace(
			'$db.totalCount',
			$feedCache[cacheId]?.totalCount || ''
		);
	};

	if (!isEdit) {
		replaceVars();
	}

	let filterTag = null;

	let setTag = (tag) => {
		filterTag = tag;

		trackClick({
			pageId: page?._id,
			sectionId: section.id,
			linkId: tag,
			text: tag || 'All Tags'
		});
	};

	$: if ($feedCache[cacheId] || filterTag) {
		databaseSection.items = $feedCache[cacheId].feed
			.filter((item) => {
				if (!filterTag) {
					return true;
				} else {
					return item.tagsStr?.includes(filterTag);
				}
			})
			.map(
				({
					_id,
					createdOn,
					publishedOn,
					source,
					title,
					content,
					attachments,
					logoUrl,
					url,
					tagsStr,
					meta
				}) => {
					return {
						id: _id,
						feedItemId: _id,
						createdOn,
						publishedOn,
						source,
						title,
						description: content,
						imageUrl: attachments && attachments[0] && attachments[0].url,
						emoji: logoUrl,
						url: url || (meta?.pageSlug ? `/blog/posts/${meta.pageSlug}` : ''),
						tagsStr
					};
				}
			);

		if (!isEdit) {
			replaceVars();
		}
	}

	let loadChildStreams = async () => {
		let { results } = await get('projects', {
			hubStreamSlug: page.streams?.hub?.slug || page.streamSlug
		});

		childStreams = results;
	};

	loadChildStreams();

	loadFeed();
</script>

<!-- {#if section.renderType === 'feed' && childStreams.length}
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
{/if} -->

{#if !section.streamSettings?.limit && $feedCache[cacheId]?.tags?.length}
	<div
		class="flex w-full {section.theme?.isTitleLeft
			? ''
			: 'sm:justify-center'} gap-3 mt-4 mb-8 overflow-x-scroll sm:overflow-visible sm:flex-wrap max-w-screen"
	>
		<div
			class="px-4 py-1 opacity-80 t rounded-full cursor-pointer shrink-0 _tag bg-zinc-900 ring-1 ring-zinc-800 {filterTag
				? ''
				: 'selected'}"
			class:heatmap={$heatmap}
			data-heatmap-clicks-count={$heatmap
				? getHeatmapClicksCount({
						sectionId: section.id,
						linkId: null
				  })
				: ''}
			on:click={() => setTag(null)}
		>
			All tags
		</div>

		{#each $feedCache[cacheId]?.tags as tag}
			<div
				class="px-4 py-1 opacity-80 rounded-full cursor-pointer shrink-0 _tag bg-zinc-900  ring-1 ring-zinc-800 {filterTag ===
				tag
					? 'selected'
					: ''}"
				class:heatmap={$heatmap}
				data-heatmap-clicks-count={$heatmap
					? getHeatmapClicksCount({
							sectionId: section.id,
							linkId: tag
					  })
					: ''}
				on:click={() => setTag(tag)}
			>
				{tag}
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
		{isEdit}
		isShowAuthor={section.streamSlug.includes('-blog')}
		bind:themeStyles
		bind:page
		bind:section={databaseSection}
	/>
{/if}

{#if section.footer && (section.footer.title || section.footer.description || section.footer.interactiveRenderType)}
	<RenderSection bind:section={section.footer} isFooter bind:page bind:themeStyles />
{/if}

<style>
	._tag:not(.selected) {
		@apply opacity-40 transition cursor-pointer;
	}

	._tag.selected {
		/* outline: 2px var(--accent-color) solid; */
		@apply shadow-md border-2;
	}

	._tag:not(.selected):hover {
		@apply opacity-100;
	}
</style>

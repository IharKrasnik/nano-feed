<script>
	import { STREAM_URL, PAGE_URL } from 'lib/env';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import RenderSection from '$lib/components/render/Section.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import feedCache, { getFeed } from '$lib/stores/feedCache';
	import trackClick from 'lib/services/trackClick';
	import { get } from 'lib/api';

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
		renderType: 'feed',
		columns: section.columns,
		items: [],
		linkType: 'interactive',
		totalItemsLength: 0,
		isMasonryGrid: section.isMasonryGrid
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

			databaseSection.items = articles.results.map(
				({ title, subtitle, demoUrl, url, slug, tagsStr }) => {
					return {
						title,
						description: subtitle,
						imageUrl: demoUrl,
						url: `/blog/post/${slug}`,
						tagsStr
					};
				}
			);
		} else {
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
		}
		isLoading = false;
	};

	section.templates = {
		title: section.title || '',
		description: section.description || ''
	};

	let replaceVars = () => {
		section.title = section.templates.title.replace(
			'$db.totalCount',
			$feedCache[cacheId]?.totalCount || ''
		);

		section.description = section.templates.description.replace(
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
					tagsStr
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
						url,
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
			hubStreamSlug: page.streamSlug
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
		class="flex w-full {section.isTitleLeft
			? ''
			: 'sm:justify-center'} gap-3 mt-4 mb-8 overflow-x-scroll sm:overflow-x-auto sm:flex-wrap max-w-screen"
	>
		<div
			class="px-2 py-1 text-sm opacity-80 _border-accent rounded-xl cursor-pointer shrink-0 _tag {filterTag
				? ''
				: 'selected'}"
			on:click={() => setTag(null)}
		>
			All tags
		</div>

		{#each $feedCache[cacheId]?.tags as tag}
			<div
				class="px-2 py-1 text-sm opacity-80 _border-accent rounded-xl cursor-pointer shrink-0 _tag {filterTag ===
				tag
					? 'selected'
					: ''}"
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
	._tag:not(.selected) {
		@apply opacity-40 transition cursor-pointer;
	}

	._tag.selected {
		/* outline: 2px var(--accent-color) solid; */
		@apply shadow-md font-semibold;
	}

	._tag:not(.selected):hover {
		@apply opacity-100;
	}
</style>

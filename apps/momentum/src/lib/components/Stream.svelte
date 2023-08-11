<script>
	import { fly, fade, slide } from 'svelte/transition';
	import InfiniteScroll from 'lib/components/InfiniteScroll.svelte';
	import FeedItem from '$lib/components/FeedItem.svelte';
	import { fetch as fetchFeed } from '$lib/stores/feed';

	export let projectSlug;
	export let maxPagesCount = null;
	export let limit = 15;

	let feed = [];
	let pageNumber = 0;

	let fetchFeedPage = async ({ page = 1 } = {}) => {
		return fetchFeed({
			project: projectSlug,
			page,
			perPage: limit
		});
	};

	let loadMore = async () => {
		if (feed?.length < limit) {
			pageNumber++;
			const feedPage = await fetchFeedPage({ page: pageNumber });
			feed = [...feed, ...feedPage];
		}
	};

	loadMore();
</script>

<div>
	{#if feed.length > 0}
		<div in:fly={{ y: 50, duration: 150, delay: 150 }} style="padding: 2px;">
			<InfiniteScroll
				hasMore={true}
				threshold={100}
				elementScroll={'body'}
				onLoadMore={() => {
					if (maxPagesCount && maxPagesCount <= pageNumber) {
						loadMore();
					}
				}}
			/>
			<h3 class="sm:hidden mb-4 w-full text-center">Scroll Right →</h3>

			<div class="flex items-start overflow-x-auto sm:block sm:columns-3">
				{#each feed as feedItem}
					<FeedItem
						class="flex-shrink-0 mr-4 sm:mr-0"
						bgColor={'rgba(20,20,20,.9)'}
						hideLikes
						{feedItem}
					/>
				{/each}
			</div>
		</div>
	{/if}
</div>

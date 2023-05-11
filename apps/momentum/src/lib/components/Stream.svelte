<script>
	import { fly, fade, slide } from 'svelte/transition';
	import InfiniteScroll from 'lib/components/InfiniteScroll.svelte';
	import FeedItem from '$lib/components/FeedItem.svelte';
	import { fetch as fetchFeed } from '$lib/stores/feed';

	export let projectSlug;
	export let maxPagesCount = null;

	let feed = [];
	let pageNumber = 0;

	let fetchFeedPage = async ({ page = 1 } = {}) => {
		return fetchFeed({
			project: projectSlug,
			page,
			perPage: 15
		});
	};

	let loadMore = async () => {
		pageNumber++;
		const feedPage = await fetchFeedPage({ page: pageNumber });
		feed = [...feed, ...feedPage];
	};

	loadMore();
</script>

<div>
	{#if feed.length > 0}
		<div in:fly={{ y: 50, duration: 150, delay: 150 }} style="padding: 2px;" class="sm:columns-3">
			<InfiniteScroll
				hasMore={true}
				threshold={100}
				elementScroll={'body'}
				onLoadMore={() => {
					if (maxPagesCount && maxPagesCount <= pageNumber) {
						debugger;
						loadMore();
					}
				}}
			/>

			{#each feed as feedItem}
				<FeedItem bgColor={'rgba(20,20,20,.9)'} hideLikes {feedItem} />
			{/each}
		</div>
	{/if}
</div>

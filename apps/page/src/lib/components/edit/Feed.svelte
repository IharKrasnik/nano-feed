<script>
	import { get, post } from 'lib/api';
	import Button from 'lib/components/Button.svelte';
	import feedCache, { getFeed, updateFeedSortOrder } from 'lib-render/stores/feedCache';
	import getEmbeddedStreamSlug from '$lib/helpers/getEmbeddedStreamSlug';
	import selectedFeedItem from '$lib/stores/selectedFeedItem';

	export let page;
	let parentPage = page.parentPage || page;

	let loadFeed = async () => {
		await getEmbeddedStreamSlug({ page, streamType: 'feed' });
		await getFeed({
			streamSlug: parentPage.streams.feed.slug,
			sort: '-createdOn',
			perPage: 100,
			isIncludeDrafts: true
		});
	};

	loadFeed();

	let addNewPost = async () => {
		let newFeedItem = await post('feed', {
			isDraft: true,
			projects: [{ slug: parentPage.streams.feed.slug }]
		});

		$feedCache[parentPage.streams.feed.slug] = {
			...$feedCache[parentPage.streams.feed.slug],
			feed: [newFeedItem, ...$feedCache[parentPage.streams.feed.slug].feed]
		};
	};
</script>

<Button class="_secondary _small mb-4 w-full" onClick={addNewPost}>Add New Post</Button>

{#if parentPage?.streams?.feed?.slug}
	{#each $feedCache[parentPage.streams.feed.slug]?.feed || [] as feedItem}
		<div
			class="_section cursor-pointer"
			class:_selected={feedItem._id === selectedFeedItem._id}
			on:click={() => ($selectedFeedItem = feedItem)}
		>
			{feedItem.content || 'Empty Draft'}
		</div>
	{/each}
{/if}

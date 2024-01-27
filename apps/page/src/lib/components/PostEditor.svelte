<script>
	import { get, post } from 'lib/api';
	import feedCache, { getFeed, updateFeedSortOrder } from 'lib-render/stores/feedCache';

	import EditPostTweet from '$lib/components/PostTweet.svelte';
	import TwitterIcon from 'lib/icons/twitter.svelte';
	import LinkedinIcon from 'lib/icons/linkedin.svelte';
	import selectedFeedItem from '$lib/stores/selectedFeedItem';
	import PageContainer from 'lib-render/components/PageContainer.svelte';
	import { v4 as uuidv4 } from 'uuid';

	import currentUser from 'lib/stores/currentUser';

	export let page;
	let parentPage = page.parentPage || page;

	let addNew = async () => {
		let newFeedItem = await post('feed', {
			isDraft: true,
			projects: [{ slug: parentPage.streams.feed.slug }]
		});

		$selectedFeedItem = newFeedItem;

		$feedCache[parentPage.streams.feed.slug] = {
			...$feedCache[parentPage.streams.feed.slug],
			feed: [newFeedItem, ...$feedCache[parentPage.streams.feed.slug].feed]
		};
	};
</script>

<PageContainer class="min-h-screen p-8 pb-[300px]" bind:page>
	{#if $selectedFeedItem}
		<div class="max-w-[570px] mx-auto">
			{#if !$currentUser.twitterData}{:else}
				<EditPostTweet
					bind:page
					bind:post={$selectedFeedItem}
					onAddPostBelow={() => {
						$selectedFeedItem.innerTweets = $selectedFeedItem.innerTweets || [];
						$selectedFeedItem.innerTweets = [
							{ id: uuidv4(), content: '' },
							...$selectedFeedItem.innerTweets
						];
					}}
				/>
			{/if}
			{#each $selectedFeedItem.innerTweets || [] as innerTweet, index (innerTweet.id)}
				<div class="mt-8">
					<EditPostTweet
						bind:page
						bind:post={innerTweet}
						onAddPostBelow={() => {
							$selectedFeedItem.innerTweets.splice(index + 1, 0, { content: '' });
							$selectedFeedItem.innerTweets = [...$selectedFeedItem.innerTweets];
						}}
					/>
				</div>
			{/each}
		</div>
	{:else}
		<div class="cursor-pointer" on:click={addNew}>Start new post...</div>
	{/if}
</PageContainer>

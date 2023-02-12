<script>
	import FeedItemPreview from '$lib/components/FeedItemPreview.svelte';
	import Loader from '$lib/components/Loader.svelte';

	import { page } from '$app/stores';
	import { get } from 'lib/api';

	let isLoading = true;
	let feedItem;

	let load = async () => {
		feedItem = await get(`feed/${$page.params.feedItemId}`);

		isLoading = false;
	};

	load();
</script>

feed item

<div class="mt-8">
	{#if isLoading}
		<div class="w-full flex justify-center">
			<Loader />
		</div>
	{:else}
		<FeedItemPreview {feedItem} />
	{/if}
</div>

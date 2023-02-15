<script>
	import { page } from '$app/stores';
	import { STREAM_URL } from 'lib/env';

	import { get } from 'lib/api';

	import FeedItem from '$lib/components/FeedItem.svelte';

	import { fetch as fetchFeed } from '$lib/stores/feed';

	let feed;

	let theme = $page.url.searchParams.get('theme') || 'dark';
	let limit = $page.url.searchParams.get('limit') || 30;
	let bgColor = $page.url.searchParams.get('bgColor') || '';
	let isHorizontal = $page.url.searchParams.get('isHorizontal') || false;

	let project;
	let creator;

	let username;

	let load = async () => {
		if ($page.params.username.startsWith('@')) {
			feed = await fetchFeed({
				creatorUsername: $page.params.username.replace('@', ''),
				perPage: limit
			});
		} else {
			feed = await fetchFeed({ project: $page.params.username, perPage: limit });
		}
	};

	if (!feed) {
		load();
	}
</script>

<svelte:head>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.min.js"
		integrity="sha512-14SY6teTzhrLWeL55Q4uCyxr6GQOxF3pEoMxo2mBxXwPRikdMtzKMYWy2B5Lqjr6PHHoGOxZgPaxUYKQrSmu0A=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	></script>
</svelte:head>

<div class="container mx-auto my-8">
	{#key feed}
		{#if feed?.length > 0}
			<div
				class={feed.length > 3 ? `${isHorizontal ? 'flex flex-row': ''} md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8` : 'flex justify-center'}
			>
				{#each feed as feedItem}
					<div class="px-2 {isHorizontal ? 'w-[90%]': ''} md:w-auto shrink-0 md:w-auto max-w-[600px] _feed-item md:block">
						<a href={feedItem.url || `${STREAM_URL}/feed/${feedItem._id}`} target="_blank">
							<div class="pointer-events-none">
								<FeedItem class="" {theme} {feedItem} {bgColor} hideLikes />
							</div>
						</a>
					</div>
				{/each}
			</div>
		{/if}
	{/key}
</div>

<style>
	._feed-item {
		cursor: pointer;
		transition: all 0.1s linear;
	}

	._feed-item:hover {
		transform: translateY(-20px);
	}
</style>

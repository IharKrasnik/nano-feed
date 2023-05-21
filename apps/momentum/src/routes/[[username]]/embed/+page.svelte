<script>
	import { page } from '$app/stores';
	import { STREAM_URL } from 'lib/env';

	import { get } from 'lib/api';

	import FeedItem from '$lib/components/FeedItem.svelte';

	import { fetch as fetchFeed } from '$lib/stores/feed';
	import slug from 'slug';

	let feed;

	let theme = $page.url.searchParams.get('theme') || 'dark';
	let limit = $page.url.searchParams.get('limit') || 20;
	let columns = $page.url.searchParams.get('columns') || 3;

	let isAutoConfig = $page.url.searchParams.get('isAutoConfig') || false;

	let bgColor = $page.url.searchParams.get('bgColor') || '';
	let isHorizontal = $page.url.searchParams.get('isHorizontal') || false;
	let isViewAll = $page.url.searchParams.get('isViewAll') || false;

	let creator;

	let username;

	let loadEmbedConfig = async () => {
		if (isAutoConfig) {
			let embedConfig = await get(`projects/${$page.params.username}/embed-config`);

			columns = embedConfig.columns || 3;
			theme = embedConfig.theme;
			limit = embedConfig.limit;
			bgColor = embedConfig.bgColor;
			isViewAll = embedConfig.isViewAll;
		}
	};

	let load = async () => {
		await loadEmbedConfig();

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

<div class="hidden lg:columns-1 lg:columns-3 lg:columns-2 lg:columns-4" />

<div class="container mx-auto">
	{#key feed}
		{#if feed?.length > 0}
			<div
				class="pt-[20px] {feed.length > 0
					? `${
							isHorizontal ? 'flex flex-row max-w-[100%] overflow-x-scroll' : ''
					  } sm:block sm:columns-1 md:columns-2 lg:columns-${
							columns > feed.length ? feed.length : columns
					  }`
					: 'flex justify-center'}"
			>
				{#each feed as feedItem}
					<div
						class="px-2 {isHorizontal
							? 'w-[90%]'
							: ''} md:w-auto mx-auto shrink-0 md:w-auto max-w-[600px] _feed-item md:block"
					>
						<a href={feedItem.url || `${STREAM_URL}/feed/${feedItem._id}`} target="_blank">
							<div class="pointer-events-none">
								<FeedItem class="" {theme} {feedItem} {bgColor} hideLikes />
							</div>
						</a>
					</div>
				{/each}
			</div>

			{#if isViewAll && feed?.length === parseInt(limit)}
				<div class="w-full text-center mt-8">
					<a href="{STREAM_URL}/{$page.params.username}" target="_blank">
						<button
							class:text-white={theme === 'light'}
							class:text-black={theme === 'dark'}
							class="rounded-xl"
							style="background-color: {theme === 'light'
								? 'rgba(0,0, 0,.8)'
								: 'rgba(255,255,255,.8)'}; border: 1px rgba(0,0,0,.3) solid;"
						>
							View Full Feed
						</button>
					</a>
				</div>
			{/if}

			<a
				href="https://mmntm.build"
				target="_blank"
				class:text-black={theme === 'light'}
				class:text-white={theme === 'dark'}
			>
				<div class="mt-4 flex justify-center items-center opacity-60 transition hover:opacity-100">
					Feed by
					<svg
						width="25"
						height="25"
						viewBox="0 0 35 35"
						xmlns="http://www.w3.org/2000/svg"
						class="ml-2 mr-1"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M1.16977 4.12405C0 6.10202 0 8.77201 0 14.112V20.888C0 26.228 0 28.898 1.16977 30.8759C1.89 32.0938 2.9062 33.11 4.12405 33.8302C6.10202 35 8.77201 35 14.112 35H20.888C26.228 35 28.898 35 30.8759 33.8302C32.0938 33.11 33.11 32.0938 33.8302 30.8759C35 28.898 35 26.228 35 20.888V14.112C35 8.77201 35 6.10202 33.8302 4.12405C33.11 2.9062 32.0938 1.89 30.8759 1.16977C28.898 0 26.228 0 20.888 0H14.112C8.77201 0 6.10202 0 4.12405 1.16977C2.9062 1.89 1.89 2.9062 1.16977 4.12405ZM23.5628 15.1105C23.6338 15.1629 23.6338 15.3908 23.6338 15.8466V23.4531C23.6338 23.6756 23.6338 23.7868 23.6825 23.8692C23.7125 23.92 23.7548 23.9623 23.8056 23.9923C23.888 24.0411 23.9993 24.0411 24.2218 24.0411H29.5256C29.7481 24.0411 29.8593 24.0411 29.9417 23.9923C29.9925 23.9623 30.0348 23.92 30.0648 23.8692C30.1136 23.7868 30.1136 23.6756 30.1136 23.4531V11.9008C30.1136 11.6783 30.1136 11.5671 30.0648 11.4847C30.0348 11.4339 29.9925 11.3916 29.9417 11.3616C29.8593 11.3128 29.7481 11.3128 29.5256 11.3128H24.2218C23.9993 11.3128 23.888 11.3128 23.8056 11.3616C23.7548 11.3916 23.7125 11.4339 23.6825 11.4847C23.6338 11.5671 23.6338 11.6783 23.6338 11.9008V12.2009C23.6338 12.5175 23.6338 12.6758 23.5591 12.771C23.5136 12.8289 23.4509 12.8711 23.3801 12.8913C23.2638 12.9246 23.1172 12.8649 22.824 12.7455L18.7099 11.0701C18.5053 10.9867 18.4029 10.9451 18.3087 10.9588C18.2506 10.9673 18.1957 10.9902 18.1488 11.0254C18.0726 11.0827 18.0302 11.1847 17.9453 11.3886L16.6512 14.497C16.5335 14.7796 16.4747 14.921 16.3719 14.9802C16.3092 15.0163 16.2369 15.0321 16.1649 15.0255C16.0468 15.0145 15.9343 14.9107 15.7094 14.703L12.2175 11.4782C12.0549 11.328 11.9735 11.2529 11.8803 11.2326C11.8229 11.2202 11.7633 11.2224 11.7069 11.2391C11.6154 11.2661 11.5399 11.347 11.3888 11.5088L3.90348 19.526C3.75088 19.6894 3.67458 19.7711 3.65406 19.865C3.64143 19.9228 3.64365 19.9828 3.66053 20.0396C3.68793 20.1317 3.77007 20.2075 3.93434 20.3592L7.74215 23.8757C7.9048 24.0259 7.98613 24.1011 8.07937 24.1213C8.13678 24.1337 8.1964 24.1315 8.25274 24.1148C8.34422 24.0878 8.41977 24.0069 8.57087 23.845L15.0166 16.9414C15.3578 16.5759 15.5284 16.3932 15.6173 16.4046C15.6698 16.4113 15.7164 16.4413 15.7441 16.4863C15.7912 16.5627 15.6951 16.7935 15.5029 17.255L13.9104 21.0802C13.8242 21.2871 13.7812 21.3905 13.7948 21.4858C13.8032 21.5444 13.8264 21.6 13.8621 21.6472C13.9201 21.724 14.0239 21.7663 14.2314 21.8508L19.0693 23.821C19.2739 23.9043 19.3763 23.946 19.4705 23.9323C19.5286 23.9238 19.5836 23.9009 19.6304 23.8657C19.7066 23.8084 19.749 23.7064 19.8339 23.5024L23.0683 15.7336C23.2435 15.3128 23.3311 15.1025 23.4168 15.0813C23.4674 15.0688 23.5209 15.0795 23.5628 15.1105Z"
							fill={theme === 'dark' ? '#fff' : '#000'}
						/>
					</svg>
					Momentum
				</div>
			</a>
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

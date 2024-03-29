<script>
	import { onMount } from 'svelte';
	import { get, post } from 'lib/api';
	import StreamCard from '$lib/components/StreamCard.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import allProjects from '$lib/stores/allProjects';

	import { Notion, fetchNotion } from '@leveluptuts/svelte-notion';
	export let feedItem;

	// const fetchNotionImage = (async () => {
	//   const splits = feedItem.url.split('-');

	//   let pageId = splits[splits.length - 1];
	//   return await fetchNotion({ id: pageId, context: this })
	// })();

	let isLoadingError = false;

	let isLoading = true;
	let htmlIsLoading = false;
	export let isEditable = false;

	let embedSocialEl;

	let loadScript = async (url) => {
		htmlIsLoading = true;
		let script = document.createElement('script');

		script.src = url;

		document.head.appendChild(script);

		let promise = new Promise((resolve, reject) => {
			script.onload = () => {
				setTimeout(() => {
					htmlIsLoading = false;
				}, 1000);

				resolve();
			};
		});
		return promise;
	};

	const load = async () => {
		feedItem.url = feedItem.url || '';

		if (
			feedItem.url &&
			![
				'youtube',
				'twitter',
				'tiktok',
				'indiehackers',
				'dribbble',
				'linkedin',
				'reddit',
				'loom'
			].includes(feedItem.source) &&
			!feedItem.url.includes('.mp4') &&
			!feedItem.url.includes('.mov')
		) {
			const { iframeOptions } = await get('https://igor.npkn.net/iframe', {
				url: feedItem.embedUrl || feedItem.url
			});

			feedItem.iframeOptions = iframeOptions;
			feedItem.hideAttachments = !feedItem.iframeOptions;
		}

		if (['twitter', 'tiktok', 'reddit'].includes(feedItem.source)) {
			feedItem.hideAttachments = true;

			const data = await get(`https://igor.npkn.net/452788/?url=${feedItem.url}`);
			feedItem.embedHtml = data.html;

			if (feedItem.source === 'twitter') {
				loadScript('https://platform.twitter.com/widgets.js');
			} else if (feedItem.source === 'tiktok') {
				loadScript('https://www.tiktok.com/embed.js');
			} else if (feedItem.source === 'reddit') {
				loadScript('https://embed.redditmedia.com/widgets/platform.js');
			}
		}

		if (['indiehackers', 'youtube', 'loom'].includes(feedItem.source)) {
			feedItem.hideAttachments = true;
		}

		if (feedItem.source === 'linkedin' && !feedItem.embedUrl) {
			feedItem.hideAttachments = true;
		}

		if (!feedItem.creator) {
			feedItem.creator = feedItem.creators[0];
		}

		isLoading = false;
	};

	load();

	onMount(() => {
		post(`feed/${feedItem._id}/view`);
	});
</script>

{#if isLoading}
	<div class="flex justify-center w-full">
		<Loader />
	</div>
{:else}
	<div>
		<div class="_moment flex justify-center">
			<div class="p-8 md:p-8 max-w-[800px] w-[800px]">
				<div class="flex justify-between">
					<div>
						{#if feedItem.title}
							<h1>{feedItem.title}</h1>
						{/if}
					</div>

					<div class="shrink-0">
						<!-- {#if feedItem.source !== 'momentum'}
              <a href="{feedItem.url}" target="_blank">
                <button>Open Link</button>
              </a>
            {/if} -->
					</div>
				</div>

				{#if feedItem.content}
					<div class="whitespace-pre-wrap py-4">
						{feedItem.longContent || feedItem.content}
					</div>
				{/if}

				<a href="/@{feedItem.creator.username}" class="">
					<div class="flex text-gray-400 items-center text-lg my-8 ">
						<div class="mr-2">
							By {feedItem.creator.fullName}
						</div>
						<img src={feedItem.creator.avatarUrl} class="w-[40px] h-[40px] rounded-full mr-2" />
					</div>
				</a>
			</div>
		</div>
		{#if feedItem.source === 'momentum'}{:else if feedItem.source === 'notion'}
			<!-- {#await fetchNotionImage}
        <p>...waiting</p>
      {:then blocks}
        <Notion {blocks} />
      {:catch error}
        <p>An error occurred!</p>
      {/await} -->
		{:else if feedItem.source === 'youtube'}
			<iframe
				class="w-full min-h-[600px] mt-2"
				src="https://www.youtube.com/embed/{new URL(feedItem.url).searchParams.get('v')}?autoplay=1"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			/>
		{:else if feedItem.embedHtml}
			<div
				bind:this={embedSocialEl}
				class="w-full flex justify-center {htmlIsLoading ? 'opacity-0' : 'opacity-100'}"
				class:bg-white={feedItem.source === 'reddit'}
			>
				{@html feedItem.embedHtml}
			</div>
			<!-- <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> -->
			<!-- <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Sunsets don&#39;t get much better than this one over <a href="https://twitter.com/GrandTetonNPS?ref_src=twsrc%5Etfw">@GrandTetonNPS</a>. <a href="https://twitter.com/hashtag/nature?src=hash&amp;ref_src=twsrc%5Etfw">#nature</a> <a href="https://twitter.com/hashtag/sunset?src=hash&amp;ref_src=twsrc%5Etfw">#sunset</a> <a href="http://t.co/YuKy2rcjyU">pic.twitter.com/YuKy2rcjyU</a></p>&mdash; US Department of the Interior (@Interior) <a href="https://twitter.com/Interior/status/463440424141459456?ref_src=twsrc%5Etfw">May 5, 2014</a></blockquote>  -->
		{:else if feedItem.source === 'loom'}
			<iframe
				style="width: 100%; min-height: 600px"
				src={feedItem.url.replace('share/', 'embed/')}
			/>
		{:else if ['dribbble', 'instagram', 'tiktok'].includes(feedItem.source)}{:else if feedItem.source === 'linkedin'}
			{#if feedItem.embedUrl}
				<iframe
					style="width: 100%; min-height: 600px"
					src={feedItem.embedUrl || feedItem.url}
					on:load={(evt) => {}}
					on:error={() => {}}
				/>
			{/if}
		{:else if !feedItem.iframeOptions && !isLoadingError && feedItem.url && !feedItem.url.includes('.mp4') && !feedItem.url.includes('.mov')}
			<iframe
				style="width: 100%; min-height: 600px;"
				src={feedItem.embedUrl || feedItem.url}
				on:load={(evt) => {}}
				on:error={() => {}}
			/>
		{:else if isLoadingError}
			<button>Open Link</button>
		{/if}

		{#if feedItem.source !== 'momentum'}
			<div class="py-8 bg-[#070707]">
				<a
					class="flex flex-col justify-center items-center text-sm"
					href={feedItem.url}
					target="_blank"
				>
					{#if feedItem.iframeOptions}
						<div class="mb-4">
							<!-- Preview is not available 😅 -->
						</div>
					{/if}

					<button>
						<svg
							class="inline w-[15px] h-[15px] text-gray-500 mr-2"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							style="&#10;    stroke: white;&#10;"
							><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline
								points="15 3 21 3 21 9"
							/><line x1="10" y1="14" x2="21" y2="3" /></svg
						>
						See Original Link
					</button>
				</a>
			</div>
		{/if}
		<!-- {#if feedItem.source === 'momentum' || !feedItem.source } -->
		{#if !feedItem.hideAttachments && feedItem.attachments}
			{#each feedItem.attachments as attachment}
				<div>
					{#if attachment.url?.includes('.mov') || attachment.url?.includes('.mp4')}
						<video src={attachment.url} controls autoplay class="w-full" />
					{:else}
						<img src={attachment.url} class="w-full" />
					{/if}
				</div>
			{/each}
		{/if}
		<!-- {/if} -->

		{#if feedItem.projects?.length}
			<div
				class="justify-center py-8 md:py-16 flex md:flex-row items-center md:items-start flex-col bg-black"
			>
				{#each feedItem.projects as project}
					{#if !$allProjects.find((p) => p._id === project._id)?.isHub}
						<div class="max-w-[300px] mr-8">
							<StreamCard isLink stream={$allProjects.find((p) => p._id === project._id)} />
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style>
	._moment {
		font-size: 20px;
	}

	._moment h1 {
		font-size: 32px;
	}
</style>

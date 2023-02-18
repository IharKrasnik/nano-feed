<script>
	import iframeResize from 'iframe-resizer/js/iframeResizer';

	import axios from 'axios';
	import _ from 'lodash';
	import { onMount } from 'svelte';
	import { STREAM_URL, PAGE_URL } from 'lib/env';
	import FeedItem from '$lib/components/FeedItem.svelte';
	import slug from 'slug';

	let clazz = '';

	export { clazz as class };

	export let embedConfig;

	export let project = null;
	export let creator = null;

	export let limit;
	export let bgColor;

	export let feed;
	export let onClose = () => {};

	let shareUrl;

	$: if (project) {
		shareUrl = `${STREAM_URL}/${project ? project.slug || '_embed' : `@${creator.username}`}`;
	}

	let prevEmbedConfig;
	let isViewAll;
	let columns;

	if (!embedConfig) {
		embedConfig = {
			_isNew: true,
			columns: 3,
			limit: 9,
			bgColor: '#fafafa',
			isViewAll: true
		};
	}

	$: if (!limit || !_.isEqual(embedConfig, prevEmbedConfig)) {
		columns = embedConfig?.columns || 3;
		limit = embedConfig?.limit || 6;
		bgColor = embedConfig?.bgColor || '#fafafa';
		theme = embedConfig?.theme || (isDarkColor(bgColor) ? 'dark' : 'light');
		isViewAll = embedConfig?.isViewAll || false;

		prevEmbedConfig = embedConfig;
	}

	onMount(() => {
		iframeResize({}, '#iframeResize');
	});

	let favicon = project?.icon;

	let loadFavicon = async () => {
		const { data } = await axios({
			url: 'https://igor.npkn.net/fetch-meta-tags',
			params: { url: project.url }
		});

		favicon = data.favicon;
	};

	if (!favicon) {
		loadFavicon();
	}

	let isDarkColor = (c) => {
		c = c.substring(1); // strip #
		let rgb = parseInt(c, 16); // convert rrggbb to decimal
		let r = (rgb >> 16) & 0xff; // extract red
		let g = (rgb >> 8) & 0xff; // extract green
		let b = (rgb >> 0) & 0xff; // extract blue

		let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

		if (luma < 40) {
			return true;
		}

		return false;
	};

	let theme;

	$: if (project.title && !project.url) {
		project.url = `${PAGE_URL}/${project.slug || slug(project.title)} `;
	}

	$: if (embedConfig?.bgColor) {
		bgColor = embedConfig.bgColor;
		theme = isDarkColor(embedConfig.bgColor) ? 'dark' : 'light';
	}
</script>

<div class="w-full text-center mt-16 opacity-80">Feed Preview</div>
<div class="w-full text-center text-sm mb-4 opacity-60">
	Here's how Momentum Feed will look like on your site.
</div>

<div
	class="relative mt-4 mb-16 {clazz} rounded-2xl max-h-[800px] overflow-y-scroll"
	style="background-color:{bgColor === 'transparent' || bgColor === 'rgba(255, 255, 255, 0)'
		? '#fafafa'
		: bgColor};"
>
	<div
		class="sticky z-30 h-[40px] bg-[#676869] w-full top-0 left-0 flex items-center rounded-tl-2xl rounded-tr-2xl"
	>
		<div class="absolute top-0 left-[15px] flex z-10 h-full flex items-center">
			<div
				class="cursor-pointer w-[10px] h-[10px] bg-[#fe6152] rounded-full mr-2"
				on:click={onClose}
			/>
			<div
				class="cursor-pointer w-[10px] h-[10px] bg-[#ffbe2d] rounded-full mr-2"
				on:click={onClose}
			/>
			<a href={PAGE_URL} target="_blank">
				<div class="w-[10px] h-[10px] bg-[#27ca42] rounded-full mr-2" />
			</a>
		</div>
		<div class="w-full flex justify-center items-center">
			<div
				class="text-black w-[300px] bg-white h-[20px] rounded-2xl flex justify-center items-center text-black text-xs"
			>
				{project.url}
			</div>
		</div>
	</div>
	<div class="p-4 pt-8">
		<div class="w-full overflow-hidden mt-8">
			<div
				class:text-black={theme === 'light'}
				class="flex items-center justify-center text-2xs mb-4"
			>
				{#if favicon}
					{#if favicon?.startsWith('http') || favicon?.startsWith('//')}
						<img class="max-w-[15px] mr-2" src={favicon} />
					{:else}
						{favicon}
					{/if}
				{/if}
				{project.title}
			</div>

			{#if project.description}
				<h1
					class="w-full mx-auto text-center max-w-[300px] leading-7 mb-8 text-xl"
					class:text-black={theme === 'light'}
				>
					{project.description}
				</h1>
			{/if}

			<h2 class:text-black={theme === 'light'} class="w-full text-center text-base mt-4">
				We build in public
			</h2>

			{#if feed}
				<div class="mt-8" style="transform: scale(0.4);transform-origin: top center;">
					{#each feed as feedItem}
						<div class="px-2 md:w-auto shrink-0 md:w-auto max-w-[1200px] _feed-item md:block">
							<a href={feedItem.url || `${STREAM_URL}/feed/${feedItem._id}`} target="_blank">
								<div class="pointer-events-none">
									<FeedItem class="" {theme} {feedItem} {bgColor} hideLikes />
								</div>
							</a>
						</div>
					{/each}
				</div>
			{:else}
				<div
					class="w-full flex justify-center align-center"
					style="width: 1200px; margin-left: -250px;"
				>
					<iframe
						id="iframeResize"
						class="w-full mt-4"
						src={`${shareUrl}/embed${`?theme=${encodeURIComponent(
							theme
						)}&limit=${encodeURIComponent(embedConfig.limit)}&bgColor=${encodeURIComponent(
							embedConfig.bgColor
						)}&columns=${embedConfig.columns}&isViewAll=true`}`}
						style="
          transform: scale(0.4);
          transform-origin: top center;
					left: 0;
          margin: 0;"
					/>
				</div>
			{/if}
		</div>
	</div>
</div>

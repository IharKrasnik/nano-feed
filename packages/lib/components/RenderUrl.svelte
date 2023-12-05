<script>
	import LoomIcon from 'lib/icons/loom.svelte';
	import YouTubeIcon from 'lib/icons/youtube.svelte';
	import VimeoIcon from 'lib/icons/vimeo.svelte';
	import VideoAskIcon from 'lib/icons/videoask.svelte';
	import TallyIcon from 'lib/icons/tally.svelte';
	import TypeformIcon from 'lib/icons/typeform.svelte';
	import SenjaIcon from 'lib/icons/senja.svelte';
	import iframeResize from 'iframe-resizer/js/iframeResizer';
	import isUrlEmbeddable from 'lib/helpers/isUrlEmbeddable';

	import { onMount } from 'svelte';

	// let clazz = '';
	// export { clazz as class };
	let clazz = '';
	export let style = '';

	export { clazz as class };
	export let isLazy = true;
	export let url;
	export let imgClass = '';
	export let isIframeFallback = true;

	export let isAutoplay = url?.includes('.mp4') || url?.includes('.mov');

	export let isFilesOnly = false;

	let isUrl = () => {
		return url.startsWith('http');
	};

	let isServiceUrl = () => {
		return url.startsWith('$');
	};

	let isFile;

	$: if (url) {
		isFile = !(url.includes('loom.com') || url.includes('youtube.com') || url.includes('youtu.be'));
	} else {
		isFile = false;
	}

	let isMounted;
	let videoEl;

	onMount(() => {
		window.iFrameResize = iFrameResize;

		setTimeout(
			() => {
				isMounted = true;
				if (videoEl) {
					videoEl.setAttribute('muted', 'true');
				}
			},
			isFile ? 0 : 1000
		);
	});

	function getQueryVariable(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split('&');
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');
			if (decodeURIComponent(pair[0]) == variable) {
				return decodeURIComponent(pair[1]);
			}
		}
		console.log('Query variable %s not found', variable);
	}

	let getUrlParam = (param) => {
		let queryString = `?${url.split('?')[1]}`;

		let query = {};
		let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');

		for (let i = 0; i < pairs.length; i++) {
			let pair = pairs[i].split('=');
			query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
		}

		return query[param];
	};
</script>

{#if url}
	{#if isUrl() || isServiceUrl()}
		<div class="w-full {clazz}" {style}>
			{#if url.includes('loom.com')}
				{#if !isFilesOnly}
					<iframe
						class="lazyload {imgClass}"
						style="width: 100%; aspect-ratio: 536/300;"
						data-src={url.replace('share/', 'embed/')}
					/>
				{:else}
					<LoomIcon class="w-[45px] opacity-50" />
				{/if}
			{:else if url.includes('youtube.com') || url.includes('youtu.be')}
				{#if !isFilesOnly}
					<iframe
						loading="lazy"
						class="w-full mt-2 lazyload {imgClass}"
						style="aspect-ratio: 536/300;"
						data-src="https://www.youtube.com/embed/{new URL(url).searchParams.get('v') ||
							url.replace('https://youtu.be', '')}?rel=0{isAutoplay
							? '&autoplay=1&mute=1&controls=0'
							: ''}"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					/>
				{:else}
					<YouTubeIcon class="w-[45px] opacity-80" />
				{/if}
			{:else if url.includes('videoask') && isFilesOnly}
				<VideoAskIcon class="w-[45px] opacity-80" />
			{:else if url.includes('typeform') && isFilesOnly}
				<TypeformIcon class="w-[45px] opacity-80" />
			{:else if url.includes('tally.so') && isFilesOnly}
				<TallyIcon class="w-[45px] opacity-80" />
			{:else if url.includes('$senja') && isFilesOnly}
				<SenjaIcon class="w-[45px] opacity-80" />
			{:else if url.startsWith('$senja')}
				<div class="senja-embed" data-id={getUrlParam('widgetId')} data-lazyload="false" />
				<script
					async
					type="text/javascript"
					src="https://static.senja.io/dist/platform.js"
				></script>
			{:else if url.includes('vimeo.com')}
				{#if !isFilesOnly}
					<iframe
						data-src="https://player.vimeo.com/video/{new URL(url).pathname.replace('/', '')}"
						class="w-full mt-2 aspect-video lazyload {imgClass}"
						frameborder="0"
						allow="autoplay; fullscreen; picture-in-picture"
						allowfullscreen
					/>
				{:else}
					<VimeoIcon class="w-[45px] opacity-50" />
				{/if}
			{:else if (url.includes('.mp4') || url.includes('.mov')) && !url.includes('lottie')}
				<video
					class="w-full mx-auto {imgClass}"
					autoplay={isAutoplay}
					playsinline
					muted={true}
					loop
					bind:this={videoEl}
					src={url}
				/>
			{:else if url.includes('.json')}
				<lottie-player
					src={url}
					background="transparent"
					speed={getUrlParam('speed') || 1}
					class="w-full h-full {imgClass}"
					loop
					autoplay
				/>
			{:else if url.includes('.jpg') || url.includes('.jpeg') || url.includes('png') || url.includes('webp') || url.includes('unsplash.com') || url.includes('giphy.com') || url.includes('image')}
				{#key url}
					{#if isLazy}
						<img class="{imgClass} lazyload" data-src={url} />
					{:else}
						<img class={imgClass} src={url} />
					{/if}
				{/key}
			{:else if !isFilesOnly && url.includes('producthunt.com')}
				<iframe
					src={url}
					class="iframe-resize w-full h-full {imgClass}"
					style="border:none; height: 1000px;"
				/>
			{:else if !isFilesOnly && url.startsWith('http')}
				{#if isIframeFallback || isUrlEmbeddable(url)}
					<iframe
						src={url}
						class="mmntm-iframe w-full h-full {imgClass}"
						style="border:none; height: 600px;"
						onload={`iFrameResize({}, '.mmntm-iframe')`}
					/>{:else}{/if}
			{/if}
		</div>
	{:else}
		<div class="w-full h-full flex items-center justify-center" style="font-size: 70px">
			{url}
		</div>
	{/if}
{/if}

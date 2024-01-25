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
	import { v4 as uuidv4 } from 'uuid';

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

	let createUrl = () => {
		try {
			return new URL(url);
		} catch (err) {
			console.log('Invalid URL', url);
		}
	};

	let id = uuidv4();

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

	let iframeEl;
</script>

<div class="h-[600px] hidden" />

{#if url}
	{#if isUrl() || isServiceUrl()}
		<div class="{clazz?.includes('w-') ? '' : 'w-full'} {clazz}" {style}>
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
						class="w-full lazyload {imgClass}"
						style="aspect-ratio: 536/300;"
						data-src="https://www.youtube.com/embed/{createUrl()?.searchParams.get('v') ||
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
						data-src="https://player.vimeo.com/video/{createUrl()?.pathname.replace('/', '')}"
						class="w-full aspect-video lazyload {imgClass}"
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
			{:else if url.includes('.jpg') || url.includes('.jpeg') || url.includes('.gif') || url.includes('png') || url.includes('webp') || url.includes('unsplash.com') || url.includes('giphy.com') || url.includes('image')}
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
						id="mmntm-{id}"
						bind:this={iframeEl}
						allow="clipboard-read; clipboard-write"
						class="mmntm-iframe w-full {imgClass} {imgClass.includes('h-')
							? ''
							: 'overflow-y-auto min-h-[600px]'}"
						on:load={() => {
							iFrameResize({}, iframeEl);
						}}
						style="border:none;"
					/>
				{:else}{/if}
			{/if}
		</div>
	{:else}
		<div class="w-full h-full flex items-center justify-center" style="font-size: 70px">
			{url}
		</div>
	{/if}
{/if}

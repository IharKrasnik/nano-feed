<script>
	import LoomIcon from 'lib/icons/loom.svelte';
	import YouTubeIcon from 'lib/icons/youtube.svelte';
	import VimeoIcon from 'lib/icons/vimeo.svelte';

	import { onMount } from 'svelte';

	// let clazz = '';
	// export { clazz as class };
	let clazz = '';
	export let style = '';

	export { clazz as class };
	export let isLazy = true;
	export let url;
	export let imgClass = '';

	export let isAutoplay = url?.includes('.mp4') || url?.includes('.mov');

	export let isFilesOnly = false;

	let isUrl = () => {
		return url.startsWith('http');
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

	let log = () => {
		console.log('render');
		return '';
	};
</script>

{#if url}
	{#if isUrl()}
		<div class="w-full {clazz}" {style}>
			{#if url.includes('loom.com')}
				{#if !isFilesOnly}
					<iframe
						class="lazyload"
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
						class="w-full mt-2 lazyload"
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
					<YouTubeIcon class="w-[45px] opacity-50" />
				{/if}
			{:else if url.includes('vimeo.com')}
				{#if !isFilesOnly}
					<iframe
						data-src="https://player.vimeo.com/video/{new URL(url).pathname.replace('/', '')}"
						class="w-full mt-2 aspect-video lazyload"
						frameborder="0"
						allow="autoplay; fullscreen; picture-in-picture"
						allowfullscreen
					/>
				{:else}
					<VimeoIcon class="w-[45px] opacity-50" />
				{/if}
			{:else if url.includes('.mp4') || url.includes('mov')}
				{log()}
				<video
					class="w-full mx-auto {imgClass}"
					autoplay={isAutoplay}
					playsinline
					muted={true}
					loop
					bind:this={videoEl}
					src={url}
				/>
			{:else if url.includes('lottie')}
				<lottie-player
					src={url}
					background="transparent"
					speed="1"
					class="w-full h-full"
					loop
					autoplay
				/>
			{:else}
				{#key url}
					{#if isLazy}
						<img class="{imgClass} lazyload" data-src={url} />
					{:else}
						<img class={imgClass} src={url} />
					{/if}
				{/key}
			{/if}
		</div>
	{:else}
		<div class="w-full h-full flex items-center justify-center" style="font-size: 70px">
			{url}
		</div>
	{/if}
{/if}

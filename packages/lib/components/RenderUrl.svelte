<script>
	import LoomIcon from 'lib/icons/loom.svelte';
	import YouTubeIcon from 'lib/icons/youtube.svelte';
	import VimeoIcon from 'lib/icons/vimeo.svelte';

	// let clazz = '';
	// export { clazz as class };
	let clazz;
	export let style = '';

	export { clazz as class };
	export let url;
	export let imgClass = '';

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
</script>

{#if url}
	{#if isUrl()}
		<div class="w-full {clazz}" {style}>
			{#if url.includes('loom.com')}
				{#if !isFilesOnly}
					<iframe
						style="width: 100%; aspect-ratio: 536/300;"
						src={url.replace('share/', 'embed/')}
					/>
				{:else}
					<LoomIcon class="w-[45px] opacity-50" />
				{/if}
			{:else if url.includes('youtube.com') || url.includes('youtu.be')}
				{#if !isFilesOnly}
					<iframe
						class="w-full mt-2"
						style="aspect-ratio: 536/300;"
						src="https://www.youtube.com/embed/{new URL(url).searchParams.get('v')}"
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
						src="https://player.vimeo.com/video/{new URL(url).pathname.replace('/', '')}"
						width="640"
						height="360"
						frameborder="0"
						allow="autoplay; fullscreen; picture-in-picture"
						allowfullscreen
					/>
				{:else}
					<VimeoIcon class="w-[45px] opacity-50" />
				{/if}
			{:else if url.includes('.mp4') || url.includes('mov')}
				<video class="max-w-[600px] mx-auto {imgClass}" autoplay muted loop src={url} />
			{:else}
				{#key url}
					<img class="rounded-xl {imgClass}" src={url} />
				{/key}
			{/if}
		</div>
	{:else}
		<div class="w-full h-full flex items-center justify-center" style="font-size: 70px">
			{url}
		</div>
	{/if}
{/if}

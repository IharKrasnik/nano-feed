<script>
	let clazz = '';
	export { clazz as class };

	export let url;
	export let imgClass = '';

	let isUrl = () => {
		return url.startsWith('http');
	};
</script>

{#if url}
	{#if isUrl()}
		<div class="w-full {clazz}">
			{#if url.includes('loom.com')}
				<iframe style="width: 100%; aspect-ratio: 536/300;" src={url.replace('share/', 'embed/')} />
			{:else if url.includes('youtube.com') || url.includes('youtu.be')}
				<iframe
					class="w-full mt-2"
					style="aspect-ratio: 536/300;"
					src="https://www.youtube.com/embed/{new URL(url).searchParams.get('v')}"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				/>
			{:else if url.includes('.mp4') || url.includes('mov')}
				<video class="max-w-[600px] mx-auto {imgClass}" autoplay muted loop src={url} />
			{:else}
				<img class="rounded-xl {imgClass}" src={url} />
			{/if}
		</div>
	{:else}
		<div class="w-full h-full flex items-center justify-center" style="font-size: 70px">
			{url}
		</div>
	{/if}
{/if}

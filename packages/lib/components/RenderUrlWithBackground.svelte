<script>
	import RenderUrl from 'lib/components/RenderUrl.svelte';

	let clazz;
	export { clazz as class };

	export let imageUrl;
	export let imageBackgroundUrl;
	export let urlImgMaxWidth = 0;
	export let isIframeFallback;
	export let aspectRatio = 'og';

	export let urlClass = '';
	export let urlImgClass = '';

	let getAspectClass = (ratio) => {
		if (!ratio || ratio === 'og') {
			return 'aspect-og';
		} else if (ratio === 'image') {
			return 'aspect-image';
		} else if (ratio === 'square') {
			return 'aspect-square';
		}
	};
</script>

<div class=" {clazz}">
	<div
		class="relative {urlImgMaxWidth
			? `max-w-[${urlImgMaxWidth}px] mx-auto`
			: 'w-full'} h-full {imageBackgroundUrl ? 'p-[5%]' : ''}
			{getAspectClass(aspectRatio)}
			flex items-center
			"
	>
		{#if imageBackgroundUrl}
			<img
				class="absolute left-0 top-0 w-full h-full {urlImgClass.includes('rounded-b')
					? 'rounded-b-xl'
					: 'rounded-xl'}"
				src={imageBackgroundUrl}
			/>{/if}

		<RenderUrl
			{isIframeFallback}
			isLazy={false}
			class={`${urlClass} relative`}
			url={imageUrl}
			imgClass={`${urlImgClass} ${imageBackgroundUrl ? 'rounded-lg' : getAspectClass(aspectRatio)}`}
		/>
	</div>
</div>

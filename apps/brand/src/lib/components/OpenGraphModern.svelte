<script>
	import Emoji from 'lib/components/Emoji.svelte';

	export let openGraphImage;
	export let isHorizontalImage;
	export let imageEl;
	export let brand;
	export let onImageLoaded;

	import { lighten, darken, getLuminance } from 'lib/helpers/color';
	export let bgColor;

	let getFontSize = (text) => {
		if (text.length < 20) {
			return '120px';
		} else if (text.length < 35) {
			return '105px';
		} else if (text.length < 50) {
			return '95px';
		} else {
			return '80px';
		}
	};
</script>

<!-- background-image:
  linear-gradient(to right, rgba(0, 0, 0, .3) 1px, transparent 1px),
  linear-gradient(to bottom, rgba(0, 0, 0, .3) 1px, transparent 1px);" -->

<div
	class="h-full overflow-hidden; _root"
	style="  background-size: 80px 80px;
background-image:
  linear-gradient(to right, rgba(255, 255, 255, .3) 1px, transparent 1px),
  linear-gradient(to bottom, rgba(255, 255, 255, .3) 1px, transparent 1px);"
>
	<div class="justify-center {isHorizontalImage ? '' : 'flex flex-row'} items-center h-full ">
		<div
			class="w-full {openGraphImage.imageUrl ? 'ml-4' : ''}"
			style={isHorizontalImage ? 'height: 50%;' : ''}
		>
			<div
				class="text-center w-full whitespace-pre-wrap"
				style="font-size: 40px; font-weight: bold; "
			>
				{#if openGraphImage.logo || brand?.logo}
					<div
						class="flex mb-4 {openGraphImage.imageUrl && !isHorizontalImage
							? 'justify-start'
							: 'justify-center'} items-center opacity-90 _heading"
					>
						<Emoji width={50} emoji={openGraphImage.logo || brand?.logo} />
						<div class="ml-8">
							{openGraphImage.name || brand?.name}
						</div>
					</div>
				{/if}
			</div>
			<div
				class="transition {openGraphImage.imageUrl && !isHorizontalImage
					? 'text-left'
					: 'text-center'} w-full mt-4 whitespace-pre-wrap"
				style="{bgColor?.type === 'plain'
					? `text-shadow: ${darken(bgColor.value, 0.8)} 6px 6px;`
					: ''} font-size: {getFontSize(
					openGraphImage.title
				)}; line-height: 1; font-weight: bold; {isHorizontalImage ? 'margin-bottom: 32px;' : ''}"
			>
				{openGraphImage.title || brand?.title}
			</div>
			<!-- <div class="mt-4 text-center" style="font-size: 48px;">
        {openGraphImage.description || ''}
      </div> -->
		</div>
		{#if openGraphImage.imageUrl || brand?.imageUrl}
			<div
				class=""
				style="opacity: .7; {isHorizontalImage
					? 'height: 50%; margin: 0 auto;'
					: 'width: 50%; flex-shrink:0; margin-left: 64px;'}"
			>
				{#key openGraphImage.imageUrl}
					<img
						bind:this={imageEl}
						crossorigin="anonymous"
						style="border-radius: 32px; {isHorizontalImage
							? 'width: 100%; height: 100%; object-fit: contain;'
							: ''}"
						on:load={() => onImageLoaded()}
						src={openGraphImage.imageUrl || brand?.imageUrl}
					/>
				{/key}
			</div>
		{/if}
	</div>
</div>

<style>
	._root {
		font-family: Bowlby One;
	}
</style>

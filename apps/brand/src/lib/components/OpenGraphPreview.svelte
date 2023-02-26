<script>
	import Emoji from 'lib/components/Emoji.svelte';
	import grainSvg from '$lib/components/grainSvg';
	// import * as htmlToImage from 'html-to-image';
	import htmlToImage from 'dom-to-image';
	export let openGraphImage;
	export let brand;

	let setBrandDefaults = () => {
		if (!openGraphImage.name) {
			openGraphImage.name = brand.title;
		}

		if (!openGraphImage.title) {
			openGraphImage.title = brand.title;
		}

		if (!openGraphImage.logo) {
			openGraphImage.logo = brand.logo;
		}

		if (!openGraphImage.imageUrl) {
			openGraphImage.imageUrl = brand.imageUrl;
		}
	};

	let imageEl;

	//url(data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><line x1="25" y1="25" x2="25" y2="12"/></svg>)

	// let style = `background-image: url('data:image/svg+xml,${grainSvg}');`;
	let style = `background-image: url('/grain2.svg');`;
	console.log('style', style);

	let isScale = true;

	let screenshotUrl;
	let previewEl;

	let makeScreenshot = () => {
		isScale = false;

		htmlToImage
			.toPng(previewEl, {
				bgcolor: openGraphImage.bgColor.type === 'plain' ? openGraphImage.bgColor.value : '#111'
			})
			.then(function (dataUrl) {
				screenshotUrl = dataUrl;
				isScale = true;
			})
			.catch(function (error) {
				console.error('oops, something went wrong!', error);
			});
	};

	let bgColor;
	$: bgColor = openGraphImage.bgColor || brand.bgColor;

	let isHorizontalImage;

	let onImageLoaded = () => {
		if (imageEl.offsetWidth > imageEl.offsetHeight) {
			isHorizontalImage = true;
		} else {
			isHorizontalImage = false;
		}
	};
</script>

<div>
	<div
		class="absolute top-0 left-0 bg-black overflow-hidden {isScale ? 'transition' : ''}"
		style="width: 1200px; height: 630px; {isScale
			? 'transform: scale(0.5); transform-origin: top left;'
			: ''}background-size: cover; padding: 64px; {bgColor?.type === 'file'
			? `background-image: url(${bgColor.value})`
			: ''} {bgColor?.type === 'plain' ? `background: ${bgColor.value}` : ''}"
		bind:this={previewEl}
	>
		<div class="h-full overflow-hidden">
			<div class="justify-center {isHorizontalImage ? '' : 'flex flex-row'} items-center h-full ">
				<div class="w-full" style={isHorizontalImage ? 'height: 50%;' : ''}>
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
						class="{openGraphImage.imageUrl && !isHorizontalImage
							? 'text-left'
							: 'text-center'} w-full mt-4 whitespace-pre-wrap"
						style="font-size: 50px; font-weight: bold; {isHorizontalImage
							? 'margin-bottom: 32px;'
							: ''}"
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
	</div>

	<button class="mt-8" style="margin-top: 320px;" on:click={makeScreenshot}>Screenshot</button>

	{#if screenshotUrl}
		<div class="mt-2">
			Screenshot:
			<img class="mt-4" src={screenshotUrl} style="width: 270px;" />
		</div>
	{/if}
</div>

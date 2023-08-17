<script>
	import { postFile } from 'lib/api';

	import Emoji from 'lib/components/Emoji.svelte';
	import grainSvg from '$lib/components/grainSvg';
	import OpenGraphBasic from '$lib/components/OpenGraphBasic.svelte';
	import OpenGraphModern from '$lib/components/OpenGraphModern.svelte';

	// import * as htmlToImage from 'html-to-image';
	import htmlToImage from 'dom-to-image';
	export let openGraphImage;
	export let brand;

	function dataURLtoFile(dataurl, filename) {
		var arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, { type: mime });
	}

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
	let uploadUrl;
	let previewEl;

	let makeScreenshot = () => {
		isScale = false;

		htmlToImage
			.toPng(previewEl, {
				bgcolor: openGraphImage.bgColor.type === 'plain' ? openGraphImage.bgColor.value : '#111'
			})
			.then(async function (dataUrl) {
				screenshotUrl = dataUrl;
				let file = dataURLtoFile(dataUrl, 'brand');

				let res = await postFile('files', file);
				uploadUrl = res.url;

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

	let isJustCopied;

	let copyUrl = () => {
		navigator.clipboard.writeText(uploadUrl);
		isJustCopied = true;
	};
</script>

<div>
	<div
		class="absolute top-0 left-0 bg-black overflow-hidden {isScale ? 'transition' : ''}"
		style="width: 1200px; height: 630px; {isScale
			? 'transform: scale(0.5); transform-origin: top left;'
			: ''}background-size: cover; {bgColor?.type === 'file'
			? `background-image: url(${bgColor.value})`
			: ''} {bgColor?.type === 'plain' ? `background: ${bgColor.value}` : ''}"
		bind:this={previewEl}
	>
		<!-- <OpenGraphBasic bind:brand bind:openGraphImage bind:isHorizontalImage bind:imageEl
			bind:onImageLoaded
			
			/> -->
		<OpenGraphModern
			bind:bgColor
			bind:brand
			bind:openGraphImage
			bind:isHorizontalImage
			bind:imageEl
			bind:onImageLoaded
		/>
	</div>

	<button class="mt-8" style="margin-top: 320px;" on:click={makeScreenshot}>Generate URL</button>

	{#if screenshotUrl}
		<div class="mt-2">
			Url:

			<input bind:value={uploadUrl} disabled />
			<button class="_small" on:click={copyUrl}>Copy Url</button>
			<img class="mt-4" src={uploadUrl} style="width: 270px;" />
		</div>
	{/if}
</div>

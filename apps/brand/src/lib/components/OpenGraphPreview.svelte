<script>
	import Emoji from 'lib/components/Emoji.svelte';
	import grainSvg from '$lib/components/grainSvg';
	// import * as htmlToImage from 'html-to-image';
	import htmlToImage from 'dom-to-image';
	export let openGraphImage;

	//url(data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><line x1="25" y1="25" x2="25" y2="12"/></svg>)

	// let style = `background-image: url('data:image/svg+xml,${grainSvg}');`;
	let style = `background-image: url('/grain.svg');`;
	console.log('style', style);

	let isScale = true;

	let screenshotUrl;
	let imageEl;

	let makeScreenshot = () => {
		isScale = false;

		htmlToImage
			.toPng(imageEl, { bgcolor: '#111' })
			.then(function (dataUrl) {
				screenshotUrl = dataUrl;
				isScale = true;
			})
			.catch(function (error) {
				console.error('oops, something went wrong!', error);
			});
	};
</script>

<div>
	<div
		class="absolute top-0 left-0 bg-black overflow-hidden"
		style="width: 1200px; height: 630px; {isScale
			? 'transform: scale(0.5); transform-origin: top left;'
			: ''}background-size: cover; padding: 64px; {style}"
		bind:this={imageEl}
	>
		<div class="h-full overflow-hidden">
			<div class="flex flex-col justify-center items-center h-full ">
				<div class="w-full">
					<div
						class="text-center w-full whitespace-pre-wrap"
						style="font-size: 40px; font-weight: bold;"
					>
						{#if openGraphImage.logo}
							<div class="flex mb-8 justify-center items-center opacity-90 _heading">
								<Emoji width={50} emoji={openGraphImage.logo} />
								<div class="ml-8">
									{openGraphImage.name}
								</div>
							</div>
						{/if}
					</div>
					<div
						class="text-center w-full whitespace-pre-wrap"
						style="font-size: 50px; font-weight: bold;"
					>
						{openGraphImage.description}
					</div>
					<!-- <div class="mt-4 text-center" style="font-size: 48px;">
						{openGraphImage.description || ''}
					</div> -->
				</div>
				<div>
					{#if openGraphImage.imageUrl}
						<img
							crossorigin="anonymous"
							class="mt-16"
							style="max-width: 700px; border-radius: 16px;"
							src={openGraphImage.imageUrl}
						/>
					{/if}
				</div>
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

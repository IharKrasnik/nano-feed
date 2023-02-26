<script>
	import grainSvg from '$lib/components/grainSvg';
	// import * as htmlToImage from 'html-to-image';
	import htmlToImage from 'dom-to-image';
	export let project;

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
		class="absolute top-0 left-0 bg-black"
		style="width: 1200px; height: 630px; {isScale
			? 'transform: scale(0.5); transform-origin: top left;'
			: ''}background-size: cover; padding: 64px; {style}"
		bind:this={imageEl}
	>
		<div class="h-full">
			<div class="flex items-center h-full">
				<div class="w-full">
					<div class="text-center w-full" style="font-size: 48px; font-weight: bold;">
						{project.header}
					</div>
					<div class="mt-4 text-center" style="font-size: 32px;">
						{project.description || ''}
					</div>
				</div>
				<div>
					{#if project.imageUrl}
						<img crossorigin="anonymous" src={project.imageUrl} />
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

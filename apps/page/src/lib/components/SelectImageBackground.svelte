<script>
	import FileInput from '$lib/components/FileInput.svelte';
	import RenderUrlWithBackground from 'lib/components/RenderUrlWithBackground.svelte';

	export let imageUrl;
	export let imageBackgroundUrl;
	export let onSelected = (url) => {};

	let backgrounds = [
		'https://momentumpage.b-cdn.net/1718379439548-image.png',
		'https://momentumpage.b-cdn.net/1718379455270-image.png',
		'https://momentumpage.b-cdn.net/1718379466765-image.png',
		'https://momentumpage.b-cdn.net/1718379511743-photo-1635776062127-d379bfcba9f8.jpeg',
		'https://momentumpage.b-cdn.net/1718379540308-photo-1635776064096-4e12cce9ead4.avif'
	];

	let selectBackground = (background) => {
		imageBackgroundUrl = background;
		onSelected(imageBackgroundUrl);
	};
</script>

<div class=" p-8">
	<div class="text-xl font-bold mb-2">Backgrounds</div>
	<div class="mb-4">Add nice background to your images to stand out</div>

	<div class="mb-8">
		<div class="text-sm font-semibold mb-2">Background Url</div>
		<FileInput class="w-full" theme="light" bind:url={imageBackgroundUrl} />
	</div>
	<div class="flex flex-wrap gap-4">
		<div class="cursor-pointer" on:click={() => selectBackground(null)}>
			<RenderUrlWithBackground urlImgMaxWidth={300} urlImgClass={''} {imageUrl} />
		</div>
		{#each backgrounds as background}
			<div class="cursor-pointer" on:click={() => selectBackground(background)}>
				<RenderUrlWithBackground
					urlImgMaxWidth={300}
					urlImgClass={''}
					{imageUrl}
					imageBackgroundUrl={background}
				/>
			</div>
		{/each}
	</div>
</div>

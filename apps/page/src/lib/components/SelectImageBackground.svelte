<script>
	import FileInput from 'lib/components/FileInput.svelte';
	import RenderUrlWithBackground from 'lib/components/RenderUrlWithBackground.svelte';

	export let imageUrl;
	export let imageBackgroundUrl;
	export let onSelected = (url) => {};

	let backgrounds = [
		'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1614852206758-0caebadbba66?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=3732&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1635776064096-4e12cce9ead4?q=80&w=3732&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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

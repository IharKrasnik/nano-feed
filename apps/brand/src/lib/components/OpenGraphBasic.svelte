<script>
	import Emoji from 'lib/components/Emoji.svelte';

	export let openGraphImage;
	export let isHorizontalImage;
	export let imageEl;
	export let brand;
</script>

<div class="h-full overflow-hidden; p-[64px]">
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

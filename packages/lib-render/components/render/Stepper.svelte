<script>
	import ContentEditableIf from 'lib/components/ContentEditableIf.svelte';
	import RenderUrlWithBackground from 'lib/components/RenderUrlWithBackground.svelte';

	export let page;
	export let section;
	export let isEdit;
</script>

<div class="relative">
	<div class="hidden sm:block absolute ml-[50%] h-full top-6 w-[2px] _border-theme" />
	{#if section.items}
		{#each section.items as step, i}
			<div class="flex sm:hidden block w-full justify-center mb-8">
				<div
					class="rounded-full w-[40px] h-[40px] border  _border-theme flex items-center justify-center backdrop-blur"
				>
					{i + 1}
				</div>
			</div>

			<div
				class="flex relative sm:w-[50%] sm:pt-8 {i % 2
					? 'sm:pl-8'
					: 'sm:pr-8'} mb-8 justify-center {page.renderType === 'article'
					? 'text-left'
					: 'text-center'} {i % 2
					? 'sm:ml-[50%] sm:justify-start sm:text-left'
					: 'sm:justify-end sm:text-right'}"
			>
				<div
					class="absolute hidden sm:flex  {i % 2
						? 'sm:left-0'
						: 'sm:right-0'} sm:top-6 rounded-full w-[40px] h-[40px] border _border-theme items-center justify-center backdrop-blur"
					style={i % 2 ? 'transform: translateX(-50%);' : 'transform: translateX(50%);'}
				>
					{i + 1}
				</div>
				<div class="w-full">
					<ContentEditableIf
						class="text-xl mb-4 font-bold"
						bind:innerHTML={step.title}
						condition={isEdit}
					/>
					{#if step.description}
						<ContentEditableIf
							class="mt-4 opacity-90"
							bind:innerHTML={step.description}
							condition={isEdit}
						/>
					{/if}
					{#if step.imageUrl}
						<RenderUrlWithBackground
							isIframeFallback={false}
							aspectRatio={section.theme?.imageAspectRatio || step.theme?.imageAspectRatio}
							urlImgClass="object-cover rounded-lg mt-6"
							imageUrl={step.imageUrl}
							imageBackgroundUrl={step.imageBackgroundUrl}
						/>
					{/if}
				</div>
			</div>
		{/each}
	{/if}
</div>

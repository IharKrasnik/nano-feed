<script>
	import RenderUrlWithBackground from 'lib/components/RenderUrlWithBackground.svelte';
	import ContentEditableIf from 'lib/components/ContentEditableIf.svelte';
	import Emoji from 'lib/components/Emoji.svelte';
	import RenderInteractiveOptions from '$lib/components/render/InteractiveOptions.svelte';

	export let page;
	export let section;
	export let isEdit;

	let getEmojiTheme = () => {
		let pageTheme = page.parentPage?.theme?.theme || page.theme?.theme || 'light';

		if (section.theme.isOppositeColors) {
			return pageTheme === 'light' ? 'dark' : 'light';
		}

		return pageTheme;
	};
</script>

<div class="flex justify-between">
	<div
		class="_section-item overflow-hidden w-full relative items-center mb-4 sm:mb-8 grid sm:grid-cols-12 {section.className ||
			''} {section.theme?.isOppositeColors ? '_bg-opposite' : ''}"
		style={section.theme?.isOverrideColors
			? `background-color: ${section.theme?.backgroundColor};`
			: ''}
	>
		<div
			class="sm:col-span-{section.innerColSpan || (section.imageUrl ? 6 : 12)}
  {section.theme?.isReversedImage ? 'order-last' : ''}
  {(!section.innerColSpan || section.innerColSpan === 12) && section.imageUrl ? 'mb-8' : ''}"
		>
			<div>
				<div class="_borderless p-4 sm:p-8 col-span-1">
					<!-- {#if section.emoji !== '✨'}
        <Emoji bind:emoji={section.emoji} />
        {/if} -->
					{#if section.subtitle}
						<div class="text-xl mb-4">
							<ContentEditableIf
								class="_color-accent opacity-80"
								bind:innerHTML={section.subtitle}
								condition={isEdit}
							/>
						</div>
					{/if}

					{#if section.title}
						<div class="text-4xl font-bold mb-4">
							<ContentEditableIf bind:innerHTML={section.title} condition={isEdit} />
						</div>
					{/if}

					{#if section.description}
						<ContentEditableIf
							class="text-lg whitespace-pre-wrap my-4 {section.theme?.isOppositeColors
								? '_color-item-description-opposite'
								: '_color-item-description'}"
							bind:innerHTML={section.description}
							condition={isEdit}
						/>
					{/if}

					{#if section.items?.length}
						<div class="my-8">
							{#each section.items as item}
								<div class="flex {item.title ? 'items-start' : 'items-center'} my-3">
									{#key item.theme}
										<Emoji
											class="inline mr-2"
											theme={getEmojiTheme()}
											emoji={item.emoji || 'feather:check'}
										/>
									{/key}
									<div class="text-base mt-[3px]">
										{#if item.title}
											<span class="font-medium">{@html item.title || ''}</span>
										{/if}<span
											class={section.theme?.isOppositeColors
												? '_color-item-description-opposite'
												: '_color-item-description'}>{@html item.description || ''}</span
										>
									</div>
								</div>
							{/each}
						</div>
					{/if}

					{#if section.interactiveRenderType}
						<div class="mt-4">
							<RenderInteractiveOptions
								bind:sectionItem={section}
								parentSectionId={section.id}
								bind:page
								itemClass={`${true ? 'p-2 mr-4' : 'p-4 mr-4'}`}
							/>
						</div>
					{/if}
				</div>
			</div>
		</div>

		<div
			class="
  {`sm:col-span-${
				!section.innerColSpan
					? 6
					: 12 - (section.title || section.description ? section.innerColSpan || 6 : 0) || 12
			}`} 
  
  {section.theme?.isReversedImage}"
		>
			<RenderUrlWithBackground
				isIframeFallback={false}
				aspectRatio={section.theme?.imageAspectRatio || section.theme?.imageAspectRatio}
				urlImgClass="object-cover {section.theme?.isReversedImage
					? 'rounded-l-lg'
					: 'rounded-r-lg'}"
				imageUrl={section.imageUrl}
				imageBackgroundUrl={section.imageBackgroundUrl}
			/>
		</div>
	</div>
</div>

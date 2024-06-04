<script>
	import FileInput from 'lib/components/FileInput.svelte';
	import ToggleGroup from '$lib/components/ToggleGroup.svelte';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import SectionColorPicker from '$lib/components/edit/SectionColorPicker.svelte';

	export let page;
	export let section;
	export let sectionItem;
</script>

<div>
	<div class="mb-4">
		<div class="mb-2 text-sm font-semibold mb-1">Inner Items Type</div>
		<ToggleGroup
			class="mb-2"
			bind:value={sectionItem.theme.itemsRenderType}
			tabs={[
				{
					name: 'Default'
				},
				{
					key: 'testimonial',
					name: 'Testimonial'
				},
				{
					key: 'tag',
					name: 'Tag'
				}
			]}
		/>
	</div>

	<div class="_section">
		<div class="mb-4 font-semibold">Content Alignment</div>

		<ToggleGroup
			tabs={[
				{
					key: 'left',
					name: 'Left',
					icon: 'feather:align-left',
					isSelected: !sectionItem.theme.itemsAlign || sectionItem.theme.itemsAlign === 'left'
				},
				{
					key: 'center',
					name: 'Center ',
					icon: 'feather:align-center',

					isSelected: sectionItem.theme.itemsAlign === 'center'
				}
			]}
			onTabSelected={(tab) => {
				sectionItem.theme.itemsAlign = tab.key;
			}}
			class={section.id === sectionItem.id ? '' : 'my-4'}
		/>

		<ToggleGroup
			tabs={[
				{
					key: 'start',
					name: 'Top',
					icon: '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.89949 9.49998C3.89949 9.72089 3.7204 9.89997 3.49949 9.89997C3.27857 9.89997 3.09949 9.72089 3.09949 9.49998L3.09949 2.46566L1.78233 3.78282C1.62612 3.93903 1.37285 3.93903 1.21664 3.78282C1.06043 3.62661 1.06043 3.37334 1.21664 3.21713L3.21664 1.21713C3.29166 1.14212 3.3934 1.09998 3.49949 1.09998C3.60557 1.09998 3.70732 1.14212 3.78233 1.21713L5.78233 3.21713C5.93854 3.37334 5.93854 3.62661 5.78233 3.78282C5.62612 3.93903 5.37285 3.93903 5.21664 3.78282L3.89949 2.46566L3.89949 9.49998ZM8.49998 1.99998C8.22383 1.99998 7.99998 2.22383 7.99998 2.49998C7.99998 2.77612 8.22383 2.99998 8.49998 2.99998H14.5C14.7761 2.99998 15 2.77612 15 2.49998C15 2.22383 14.7761 1.99998 14.5 1.99998H8.49998ZM8.49998 4.99998C8.22383 4.99998 7.99998 5.22383 7.99998 5.49998C7.99998 5.77612 8.22383 5.99998 8.49998 5.99998H14.5C14.7761 5.99998 15 5.77612 15 5.49998C15 5.22383 14.7761 4.99998 14.5 4.99998H8.49998ZM7.99998 8.49998C7.99998 8.22383 8.22383 7.99998 8.49998 7.99998H14.5C14.7761 7.99998 15 8.22383 15 8.49998C15 8.77612 14.7761 8.99998 14.5 8.99998H8.49998C8.22383 8.99998 7.99998 8.77612 7.99998 8.49998Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>',
					isSelected:
						!sectionItem.theme?.itemsVerticalAlign ||
						sectionItem.theme?.itemsVerticalAlign === 'start'
				},
				{
					key: 'center',
					name: 'Middle ',
					icon: '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.49949 14.9C3.7204 14.9 3.89949 14.7209 3.89949 14.5L3.89949 10.4657L5.21664 11.7829C5.37285 11.9391 5.62612 11.9391 5.78233 11.7829C5.93854 11.6267 5.93854 11.3734 5.78233 11.2172L3.78233 9.21718C3.70732 9.14217 3.60557 9.10002 3.49949 9.10002C3.3934 9.10002 3.29166 9.14217 3.21664 9.21718L1.21664 11.2172C1.06043 11.3734 1.06043 11.6267 1.21664 11.7829C1.37285 11.9391 1.62612 11.9391 1.78233 11.7829L3.09949 10.4657L3.09949 14.5C3.09949 14.7209 3.27857 14.9 3.49949 14.9ZM7.99998 10.5C7.99998 10.7762 8.22383 11 8.49998 11H14.5C14.7761 11 15 10.7762 15 10.5C15 10.2239 14.7761 10 14.5 10H8.49998C8.22383 10 7.99998 10.2239 7.99998 10.5ZM7.99998 7.50002C7.99998 7.77617 8.22383 8.00002 8.49998 8.00002H14.5C14.7761 8.00002 15 7.77617 15 7.50002C15 7.22388 14.7761 7.00002 14.5 7.00002H8.49998C8.22383 7.00002 7.99998 7.22388 7.99998 7.50002ZM8.49998 5.00002C8.22383 5.00002 7.99998 4.77617 7.99998 4.50002C7.99998 4.22388 8.22383 4.00002 8.49998 4.00002H14.5C14.7761 4.00002 15 4.22388 15 4.50002C15 4.77617 14.7761 5.00002 14.5 5.00002H8.49998ZM3.89949 0.500025C3.89949 0.279111 3.7204 0.100025 3.49949 0.100025C3.27857 0.100025 3.09949 0.279111 3.09949 0.500025L3.09949 4.53434L1.78233 3.21718C1.62612 3.06097 1.37285 3.06097 1.21664 3.21718C1.06043 3.37339 1.06043 3.62666 1.21664 3.78287L3.21664 5.78287C3.29166 5.85788 3.3934 5.90002 3.49949 5.90002C3.60557 5.90002 3.70732 5.85788 3.78233 5.78287L5.78233 3.78287C5.93854 3.62666 5.93854 3.37339 5.78233 3.21718C5.62612 3.06097 5.37285 3.06097 5.21664 3.21718L3.89949 4.53434L3.89949 0.500025Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>',
					isSelected: sectionItem.theme?.itemsVerticalAlign === 'center'
				},
				{
					key: 'end',
					name: 'Bottom ',
					icon: '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.89949 5.50002C3.89949 5.27911 3.7204 5.10003 3.49949 5.10003C3.27857 5.10003 3.09949 5.27911 3.09949 5.50002L3.09949 12.5343L1.78233 11.2172C1.62612 11.061 1.37285 11.061 1.21664 11.2172C1.06043 11.3734 1.06043 11.6267 1.21664 11.7829L3.21664 13.7829C3.29166 13.8579 3.3934 13.9 3.49949 13.9C3.60557 13.9 3.70732 13.8579 3.78233 13.7829L5.78233 11.7829C5.93854 11.6267 5.93854 11.3734 5.78233 11.2172C5.62612 11.061 5.37285 11.061 5.21664 11.2172L3.89949 12.5343L3.89949 5.50002ZM8.49998 13C8.22383 13 7.99998 12.7762 7.99998 12.5C7.99998 12.2239 8.22383 12 8.49998 12H14.5C14.7761 12 15 12.2239 15 12.5C15 12.7762 14.7761 13 14.5 13H8.49998ZM8.49998 10C8.22383 10 7.99998 9.77617 7.99998 9.50002C7.99998 9.22388 8.22383 9.00002 8.49998 9.00002H14.5C14.7761 9.00002 15 9.22388 15 9.50002C15 9.77617 14.7761 10 14.5 10H8.49998ZM7.99998 6.50002C7.99998 6.77617 8.22383 7.00002 8.49998 7.00002H14.5C14.7761 7.00002 15 6.77617 15 6.50002C15 6.22388 14.7761 6.00002 14.5 6.00002H8.49998C8.22383 6.00002 7.99998 6.22388 7.99998 6.50002Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>',
					isSelected: sectionItem.theme?.itemsVerticalAlign === 'end'
				}
			]}
			onTabSelected={(tab) => {
				sectionItem.theme.itemsVerticalAlign = tab.key;
			}}
			class="mt-4"
		/>

		<div class="_section mt-4">
			<div class="mb-4 font-bold">Item Size</div>

			<div class="flex justify-between">
				<div>
					<div class="font-semibold mb-1 text-sm mt-2">Min-width (px)</div>
					{#if section.isFlexGrid}
						<input
							type="number"
							style="max-width: 120px;"
							bind:value={section.theme.itemsMinWidthPx}
						/>
					{:else}
						<input class="opacity-50" disabled style="max-width: 120px;" value="auto (grid)" />
					{/if}
				</div>
				<div>
					<div class="font-semibold mb-1 text-sm mt-2">Max-width (px)</div>
					{#if section.isFlexGrid}
						<input
							type="number"
							style="max-width: 120px;"
							bind:value={section.theme.itemsMaxWidthPx}
						/>
					{:else}
						<input class="opacity-50" disabled style="max-width: 120px;" value="auto (grid)" />
					{/if}
				</div>
			</div>
			<div class="mt-4 flex justify-between">
				<div>
					<div class="font-semibold mb-1 text-sm mt-2">Min-height (px)</div>
					<input
						type="number"
						style="max-width: 120px;"
						bind:value={section.theme.itemsMinHeightPx}
					/>
				</div>
				<div>
					<div class="font-semibold mb-1 text-sm mt-2">Max-height (px)</div>
					<input
						type="number"
						style="max-width: 120px;"
						bind:value={section.theme.itemsMaxHeightPx}
					/>
				</div>
			</div>
		</div>
	</div>

	<div class="_section">
		<div class="mb-2 font-semibold">Layout</div>

		<div class="mb-2 font-semibold mt-4 text-sm">Items image position</div>

		<ToggleGroup
			tabs={[
				{
					key: 'after',
					name: 'Content | Image',
					isSelected: !sectionItem.theme.areImagesReversed
				},
				{
					key: 'before',
					name: 'Image | Content',
					isSelected: sectionItem.theme.areImagesReversed
				}
			]}
			onTabSelected={(tab) => {
				sectionItem.theme.areImagesReversed = tab.key === 'before';
			}}
			bind:value={sectionItem.theme.areImagesReversed}
		/>

		<div class="mb-2 mt-4 font-semibold text-sm">Items images aspect ratio</div>

		<ToggleGroup
			tabs={[
				{
					key: 'og',
					name: 'OG'
				},
				{
					key: 'image',
					name: '4x3'
				},
				{
					key: 'square',
					name: '1x1'
				},
				{
					key: '',
					name: 'Auto'
				}
			]}
			bind:value={sectionItem.theme.imageAspectRatio}
		/>
		{#if sectionItem.theme?.imageAspectRatio}
			<input class="mt-6" type="checkbox" bind:checked={sectionItem.theme.isScrollImageOnHover} />
			Scroll image on hover
			<div class="text-xs mt-1">Useful for long screenshots of websites or portfolio</div>
		{/if}

		<div class="mb-2 font-semibold mt-6 text-sm">Gap between columns</div>
		<ToggleGroup
			tabs={[
				{
					key: undefined,
					name: 'Normal'
				},
				{
					key: 'big',
					name: 'Big'
				},
				{
					key: 'huge',
					name: 'Huge'
				}
			]}
			bind:value={sectionItem.theme.columnsGap}
		/>

		<div class="flex mt-4">
			<input type="checkbox" class="mr-2" bind:checked={sectionItem.theme.isMobileInline} />
			<div>Show items horizontally on mobile</div>
		</div>
	</div>

	<div class="_section">
		<div class="mb-4 font-bold">Text</div>

		<div>
			<div class="mb-1 text-sm font-semibold mb-1">Items Title Size</div>
			<ToggleGroup
				class="mb-2"
				tabs={[
					{ key: undefined, name: 'Default' },
					{ key: 'small', name: 'Small' },
					{ key: 'large', name: 'Large' }
				]}
				bind:value={sectionItem.theme.itemsTitleSize}
			/>
		</div>

		<div class="flex">
			<div class="my-2">
				<input class="" type="checkbox" bind:checked={sectionItem.theme.areInlineTitles} /> Inline Title
				and Description
			</div>
		</div>
	</div>

	<div class="_section">
		<div class="mb-4 font-bold">Items Background</div>
		<SectionColorPicker
			bind:page
			bind:sectionItem
			isInnerSection
			themeKeys={{
				backgroundColor: 'itemsBackgroundColor',
				isTransparent: 'areItemsTransparent',
				isOppositeColors: 'areItemsOppositeColors',
				isNoPadding: 'areItemsNoPadding'
			}}
		/>

		<div class="font-normal mt-4 text-sm opacity-70 mb-2">Section background image or media</div>

		<FileInput
			isCanSearch
			class="w-full"
			theme="light"
			bind:url={sectionItem.theme.itemsBgImageUrl}
		/>

		{#if sectionItem.theme.itemsBgImageUrl}
			<div class="flex text-sm mt-4 font-normal items-center">
				<input
					bind:checked={sectionItem.theme.areNotItemsBgImageDimmed}
					class="mr-2"
					type="checkbox"
				/>

				Do not dim background image
			</div>
		{/if}
	</div>

	<div class="_section">
		<div class="mb-1 font-bold">Icon Settings</div>

		<div class="text-sm mb-2">Choose icon, size color, background color</div>
		<div>
			<div class="shrink-0">
				<EmojiPicker
					bind:icon={sectionItem.theme.itemsDefaultEmoji}
					bind:color={sectionItem.theme.itemsIconColor}
					bind:bgColor={sectionItem.theme.itemsEmojiBgColor}
					bind:sizePx={sectionItem.theme.itemsEmojiSizePx}
				/>
			</div>
			<hr class="my-2 opacity-50" />
			<div class="flex gap-2 items-center mt-2">
				<div class="text-sm font-semibold">Icon Background Color</div>
				<div class="flex items-center ">
					{#if sectionItem.theme.itemsEmojiBgColor}
						<input type="color" bind:value={sectionItem.theme.itemsEmojiBgColor} />
						<div
							class="text-sm _text-link cursor-pointer ml-2"
							on:click={() => (sectionItem.theme.itemsEmojiBgColor = null)}
						>
							Remove
						</div>
					{:else}
						<div
							class="text-sm _text-link cursor-pointer"
							on:click={() => (sectionItem.theme.itemsEmojiBgColor = '#111111')}
						>
							Set
						</div>
					{/if}
				</div>
			</div>

			<div class="mt-4">
				<input type="checkbox" bind:checked={sectionItem.theme.areIconsLeft} /> Show Icon Left From Title
			</div>

			<div class="flex gap-2 items-center mt-2">
				<div class="text-sm font-semibold">Color (SVG, Text)</div>
				<input type="color" bind:value={sectionItem.theme.itemsIconColor} />
			</div>
			<div class="flex gap-2 items-center mt-2">
				<div class="text-sm font-semibold">Default Size</div>
				<input
					type="number"
					style="max-width: 150px;"
					bind:value={sectionItem.theme.itemsEmojiSizePx}
				/>
			</div>
		</div>
	</div>
</div>

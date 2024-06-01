<script>
	import clickOutside from 'lib/use/clickOutside';
	import FileInput from 'lib/components/FileInput.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import ToggleGroup from '$lib/components/ToggleGroup.svelte';
	import sectionClipboard from '$lib/stores/sectionClipboard';
	import { showSuccessMessage } from 'lib/services/toast';
	import selectedSectionItem from 'lib-render/stores/selectedSectionItem';
	import sectionToEdit from 'lib-render/stores/sectionToEdit';
	import hexToRgba from 'lib/helpers/hexToRgba';

	export let section;
	export let sectionItem;
	export let isPopup = false;
	export let isCtaFooter = false;

	export let theme = 'light';
	export let page;

	export let isShown = false;
	export let isWithButton = true;

	let show = () => {
		if (isPopup) {
			isShown = true;
		} else {
			$selectedSectionItem = sectionItem;
		}
	};

	let close = () => {
		isShown = false;
	};

	$: if (sectionItem.bgImageUrl) {
		sectionItem.className = '';
	}

	if (!sectionItem.theme) {
		sectionItem.theme = {};
	}

	let bgPatterns = [
		{
			key: 'boxes',
			label: 'Squares'
		},
		{
			key: 'dots',
			label: 'Dots'
		},
		{
			key: 'cross',
			label: 'Crosses'
		},
		{
			key: null,
			label: 'None'
		}
	];

	let isBgImageSearching = false;
	let isContainerBgSearching = false;
	let isBottomImageSearching = false;

	let backgroundColorEl;
</script>

{#if isWithButton}
	<div
		class="ml-2 w-[37px] h-[37px] shrink-0 bg-[#fafafa] rounded-xl flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100"
		on:click={show}
	>
		<FeatherIcon size="15" name="settings" color="#333" />
	</div>
{/if}

{#if sectionItem && section && (!isWithButton || isShown)}
	<div class=" _editor">
		<div
			class={isWithButton
				? 'absolute top-0 right-0 mt-8 p-4 z-40 bg-white w-full border border-[#e0dede] shadow-lg shadow-black/30 rounded-xl'
				: ''}
			use:clickOutside
			on:clickOutside={() => {
				if (!isPopup) {
					return;
				}

				if (!isBgImageSearching && !isContainerBgSearching && !isBottomImageSearching) {
					isShown = false;
				}
			}}
		>
			{#if !isCtaFooter}
				{#if sectionItem.id === section.id}
					<div class="mt-4 _section p-2 bg-[#fafafa] mb-8" style="margin-bottom:16px;">
						<div class="font-bold mb-2">Render this section as...</div>

						<select class="block w-full mt-2 mb-2" bind:value={section.renderType}>
							<option value="grid">Default Grid Section</option>
							<option value="callout">Callout</option>
							<option value="stepper">1-2-3 Stepper</option>
							<option value="testimonials">Testimonials</option>
							<option value="pricing">Pricing</option>
							<option value="carousel">Carousel Menu</option>
							<option value="faq">FAQ</option>
							<option value="article">Paragraph</option>
							<option value="changelog">Changelog</option>
							<option value="form">Form</option>
							<option value="comments">Comments</option>
							<option value="embedCode">HTML Code Embed</option>
							<!-- <option value="service_chat">Service Chat</option> -->
						</select>

						{#if section.renderType === 'article'}
							<input type="checkbox" bind:checked={section.isRichText} /> Is Rich-Text Article
						{/if}

						{#if section.renderType === 'carousel'}
							<select class="w-full my-4" bind:value={section.carouselType}>
								<option value="vertical">Vertical</option>
								<option value="horizontal">Horizontal</option>
							</select>

							<div class="flex items-center mt-2 justify-between">
								<div class="text-xs flex gap-2 items-center">
									<div
										class="cursor-pointer"
										on:click={() => {
											section.maxWidth = 0;
										}}
										class:font-bold={!section.maxWidth}
									>
										Stretch
									</div>

									<div
										class="cursor-pointer"
										on:click={() => {
											section.maxWidth = 600;
										}}
										class:font-bold={section.maxWidth === 600}
									>
										Medium
									</div>
								</div>
							</div>
						{/if}
					</div>
				{/if}
				<div class="w-full py-4">
					<div class="_section">
						<div class="mb-4 font-bold">Alignment</div>

						{#if sectionItem.renderType === 'callout' || sectionItem.id !== section.id}
							<div class="_section">
								<div class="font-bold mb-1">Layout</div>
								<div class="mb-3 text-sm opacity-70">Position of the image inside section item</div>

								<div class="">
									{#if section.columns > 1 && sectionItem.renderType !== 'callout'}
										{#if section.isMasonryGrid}
											<div class="_section _info">
												Masonry grid doesn't support custom column sizes
											</div>
										{:else}
											<div>
												<input
													type="number"
													class="max-w-[60px] mr-2"
													placeholder="1"
													bind:value={sectionItem.colSpan}
												/>
												columns
												<div class="text-sm mt-2">
													{(((sectionItem.colSpan || 1) / section.columns) * 100).toFixed(2)}% width
												</div>
											</div>
											<div class="mt-2">
												<input
													type="number"
													class="max-w-[60px] mr-2 mt-2"
													placeholder="1"
													bind:value={sectionItem.rowSpan}
												/> rows
											</div>
										{/if}
									{:else if section}
										<ToggleGroup
											bind:value={sectionItem.innerColSpan}
											tabs={[
												{
													key: '',
													name: '6x6'
												},
												{
													key: '8',
													name: '8x4'
												},
												{
													key: '4',
													name: '4x8'
												},
												{
													key: '5',
													name: '5x7'
												}
											]}
										/>
									{/if}
								</div>
							</div>

							{#if section.columns === 1 && section.renderType === 'grid'}
								<div class="_section">
									<div class="font-bold mb-2">Max Width</div>

									<div class="">
										<ToggleGroup
											bind:value={sectionItem.theme.maxWidth}
											tabs={[
												{
													key: 'full',
													name: 'Full'
												},
												{
													key: '75p',
													name: '75%'
												},
												{
													key: '50p',
													name: '50%'
												},
												{
													key: '33p',
													name: '33%'
												}
											]}
										/>
									</div>
								</div>
							{/if}
						{/if}

						{#if (sectionItem !== section || sectionItem.renderType === 'callout') && sectionItem.imageUrl}
							<div class="my-2">
								<input type="checkbox" bind:checked={sectionItem.theme.isReversedImage} /> Reverse Image
								Position
							</div>
						{/if}

						{#if section.columns > 1 && section.renderType !== 'callout'}
							<ToggleGroup
								tabs={[
									{
										key: 'left',
										name: 'Left',
										icon: 'feather:align-left',
										isSelected:
											section.id === sectionItem.id
												? sectionItem.theme.isTitleLeft
												: !sectionItem.theme.align || sectionItem.theme?.align === 'left'
									},
									{
										key: 'center',
										name: 'Center ',
										icon: 'feather:align-center',
										isSelected:
											section.id === sectionItem.id
												? !sectionItem.theme.isTitleLeft
												: sectionItem.theme?.align === 'center'
									}
								]}
								onTabSelected={(tab) => {
									sectionItem.theme.isTitleLeft = tab.key === 'left';
									sectionItem.theme.align = tab.key;
								}}
								class={section.id === sectionItem.id ? '' : 'my-4'}
							/>
						{/if}

						{#if sectionItem.id !== section.id && section.columns > 1}
							<div class="_section">
								<div>
									<div class="mb-1 text-sm font-medium mb-1">Item Type</div>
									<ToggleGroup
										class="mb-2"
										bind:value={sectionItem.renderType}
										tabs={[
											{
												key: '',
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

								<div class="flex">
									<div class="my-2">
										<input
											class=""
											disabled={sectionItem.renderType}
											type="checkbox"
											bind:checked={sectionItem.theme.isInlineTitle}
										/> Inline Title and Description
									</div>
								</div>

								{#if !sectionItem.theme.isInlineTitle}
									<div>
										<div class="mb-1 text-sm font-medium mb-1">Title Size</div>
										<ToggleGroup
											class="mb-2"
											tabs={[
												{ key: undefined, name: 'Default' },
												{ key: 'small', name: 'Small' },
												{ key: 'large', name: 'Large' }
											]}
											bind:value={sectionItem.theme.titleSize}
										/>
									</div>
								{/if}
								{#if sectionItem.emoji}
									<div class="my-2">
										<input
											type="checkbox"
											disabled={sectionItem.renderType}
											bind:checked={sectionItem.theme.isIconLeft}
										/> Show Icon Near Title
									</div>
								{/if}
							</div>
						{/if}

						{#if section.id === sectionItem.id && section.renderType !== 'callout'}
							<div class="mb-2 font-semibold mt-6">Items images aspect ratio</div>

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

							<div class="mb-2 font-semibold mt-6">Items image position</div>

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

							{#if sectionItem.theme?.imageAspectRatio}
								<input
									class="mt-6"
									type="checkbox"
									bind:checked={sectionItem.theme.isScrollImageOnHover}
								/>
								Scroll image on hover
								<div class="text-xs mt-1">Useful for long screenshots of websites or portfolio</div>
							{/if}
						{/if}

						{#if section.id === sectionItem.id && section.renderType !== 'callout'}
							<div class="mb-2 font-semibold mt-6">Gap between columns</div>
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
						{/if}

						{#if section.id === sectionItem.id}
							<div class="flex mt-2">
								<input
									type="checkbox"
									class="mr-2"
									bind:checked={sectionItem.theme.isMobileInline}
								/>
								<div>Show items horizontally on mobile</div>
							</div>
						{/if}
					</div>

					{#if sectionItem.id !== section.id}
						<div class="_section my-4">
							<div class="mb-2 font-bold">Style</div>

							<input type="checkbox" bind:checked={sectionItem.isFeatured} /> Is Featured
							<div class="text-sm opacity-70">Feature specific section for focus</div>
						</div>
					{/if}

					<div class="my-4">
						{#if section.renderType === 'callout'}
							<div class="_section my-4">
								<div class="mb-2 font-bold">Items Settings</div>

								<ToggleGroup
									tabs={[
										{
											key: 'inline',
											icon: 'feather:list',
											name: 'Inline',
											isSelected: !section.theme.areItemsGrid
										},
										{
											key: 'grid',
											icon: 'feather:grid',
											name: 'Cards',
											isSelected: section.theme.areItemsGrid
										}
									]}
									onTabSelected={(tab) => {
										section.theme.areItemsGrid = tab.key === 'grid';
									}}
								/>
							</div>
						{/if}
						{#if section === sectionItem}
							<div class="_section my-4">
								<div class="mb-2 font-bold">Glowing</div>

								<div class="my-2">
									<input type="checkbox" bind:checked={sectionItem.isGlowing} /> Section Is Glowing

									{#if sectionItem.isGlowing}
										<div class="font-normal opacity-70 mb-4 mt-2">Glowing color</div>

										<div class="flex items-center">
											{#if sectionItem.theme?.isOverrideGlowingColor}
												<input
													type="color"
													id="head"
													name="head"
													class="mr-4"
													bind:value={sectionItem.theme.glowingColor}
												/>
											{:else}
												<div
													class="w-[30px] h-[30px] rounded-full border border-black mr-4 blur"
													style="background-color: {sectionItem.theme.glowingColor};"
												/>
											{/if}
											<div>
												<input
													bind:checked={sectionItem.theme.isOverrideGlowingColor}
													class="mr-2"
													type="checkbox"
													on:change={() => {
														if (
															!sectionItem.theme.glowingColor ||
															!sectionItem.theme.isOverrideGlowingColor
														) {
															sectionItem.theme.glowingColor = (
																page.parentPage?.theme || page.theme
															)?.accentColor;
														}
													}}
												/>

												Override color
											</div>
										</div>

										<div class="mt-8">
											<div class="mb-2 opacity-70">Intensity</div>

											<div class="flex gap-2 flex-wrap">
												<div
													class="border cursor-pointer p-2"
													on:click={() => (sectionItem.theme.glowingIntensity = 'sm')}
												>
													{!sectionItem.theme.glowingIntensity ||
													sectionItem.theme.glowingIntensity === 'sm'
														? '✅ '
														: ''}
													Small
												</div>
												<div
													class="border cursor-pointer p-2"
													on:click={() => (sectionItem.theme.glowingIntensity = 'lg')}
												>
													{sectionItem.theme.glowingIntensity === 'lg' ? '✅ ' : ''}
													Large
												</div>
												<div
													class="border cursor-pointer p-2"
													on:click={() => (sectionItem.theme.glowingIntensity = 'xl')}
												>
													{sectionItem.theme.glowingIntensity === 'xl' ? '✅ ' : ''}
													Huge
												</div>
											</div>
										</div>
									{/if}
								</div>
							</div>
						{/if}
					</div>
				</div>
			{/if}

			<div class="_section mb-2">
				<div class="font-semibold mb-2">Background</div>

				<div class="font-normal text-sm opacity-70 mb-2">Background color and image</div>

				<div class="flex gap-2">
					<label
						class="relative"
						on:click={() => {
							sectionItem.theme.isTransparent = false;
						}}
					>
						<div
							class="w-[35px] h-[35px] flex justify-center items-center cursor-pointer border-4 border-[#f6f5f4] rounded-full"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="icon icon-tabler icon-tabler-color-picker opacity-80"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="#2c3e50"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M11 7l6 6" />
								<path
									d="M4 16l11.7 -11.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-11.7 11.7h-4v-4z"
								/>
							</svg>
							<input
								type="color"
								style="width:0; height:0;"
								bind:this={backgroundColorEl}
								bind:value={sectionItem.theme.backgroundColor}
							/>
						</div>
					</label>

					{#if sectionItem.theme?.backgroundColor}
						<div
							style="background-color: {sectionItem.theme?.backgroundColor};"
							class:border-green-300={!sectionItem.theme.isTransparent}
							class:border-[#f6f5f4]={sectionItem.theme.isTransparent}
							class="w-[35px] h-[35px] flex justify-center items-center cursor-pointer border-4 border rounded-full "
							on:click={() => {
								sectionItem.theme.isTransparent = false;
							}}
						/>
					{/if}

					<div
						class="w-[35px] h-[35px] rounded-full border border-[#f6f5f4] cursor-pointer"
						class:border-green-400={!sectionItem.theme.isTransparent &&
							!sectionItem.theme?.backgroundColor &&
							!(page.parentPage || page).theme?.sectionBackgroundColor}
						style="background-color: {(page.parentPage || page).theme?.sectionBackgroundColor ||
							((page.parentPage || page).theme?.theme === 'dark'
								? hexToRgba('#161619', 0.85)
								: hexToRgba('#f6f5f4', 0.85))};"
						on:click={() => {
							sectionItem.theme.isTransparent = false;
							sectionItem.theme.backgroundColor =
								(page.parentPage || page).theme?.theme === 'dark'
									? hexToRgba('#161619', 0.85)
									: hexToRgba('#f6f5f4', 0.85);
						}}
					/>

					<div
						class="w-[35px] rounded-full border-4 border-black cursor-pointer"
						class:border-green-400={!sectionItem.theme.backgroundColor}
						class:border-[#f6f5f4]={!sectionItem.theme.backgroundColor}
						on:click={() => {
							sectionItem.theme.isTransparent = true;
							sectionItem.theme.backgroundColor = null;
						}}
						style="background-image: url('https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1716758994699-image.png');"
					/>

					<div
						class="w-[35px] h-[35px] rounded-full border border-black cursor-pointer border-4  border-[#f6f5f4]"
						style="background-color: #f6f5f4;"
						class:border-green-400={!sectionItem.theme?.isTransparent &&
							sectionItem.theme.backgroundColor === '#f6f5f4'}
						on:click={() => {
							sectionItem.theme.isTransparent = false;
							sectionItem.theme.backgroundColor = '#f6f5f4';
						}}
					/>
					<div
						class="w-[35px] h-[35px] rounded-full border border-black cursor-pointer border-4 border-[#f6f5f4]"
						style="background-color: #111111;"
						class:border-green-400={!sectionItem.theme?.isTransparent &&
							sectionItem.theme.backgroundColor === '#111111'}
						on:click={() => {
							sectionItem.theme.isTransparent = false;
							sectionItem.theme.backgroundColor = '#111111';
						}}
					/>
				</div>

				{#if sectionItem.renderType === 'callout'}
					<div class="font-normal text-sm opacity-70 mb-2 mt-4">Callout section background</div>

					<div class="flex gap-2">
						<label
							class="relative"
							on:click={() => {
								sectionItem.theme.isTransparent = false;
							}}
						>
							<div
								class="w-[35px] h-[35px] flex justify-center items-center cursor-pointer border-4 border-[#f6f5f4] rounded-full"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="icon icon-tabler icon-tabler-color-picker opacity-80"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="#2c3e50"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M11 7l6 6" />
									<path
										d="M4 16l11.7 -11.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-11.7 11.7h-4v-4z"
									/>
								</svg>
								<input
									type="color"
									style="width:0; height:0;"
									bind:value={sectionItem.theme.calloutBgColor}
								/>
							</div>
						</label>

						{#if sectionItem.theme?.calloutBgColor}
							<div
								style="background-color: {sectionItem.theme?.calloutBgColor};"
								class:border-green-300={!sectionItem.theme.isCalloutTransparent}
								class:border-[#f6f5f4]={sectionItem.theme.isCalloutTransparent}
								class="w-[35px] h-[35px] flex justify-center items-center cursor-pointer border-4 border rounded-full "
								on:click={() => {
									sectionItem.theme.isCalloutTransparent = false;
								}}
							/>
						{/if}

						<div
							class="w-[35px] h-[35px] rounded-full border border-[#f6f5f4] cursor-pointer"
							class:border-green-400={!sectionItem.theme.isCalloutTransparent &&
								!sectionItem.theme?.calloutBgColor &&
								!(page.parentPage || page).theme?.sectionBackgroundColor}
							style="background-color: {(page.parentPage || page).theme?.sectionBackgroundColor ||
								((page.parentPage || page).theme?.theme === 'dark'
									? hexToRgba('#161619', 0.85)
									: hexToRgba('#f6f5f4', 0.85))};"
							on:click={() => {
								sectionItem.theme.isCalloutTransparent = false;
								sectionItem.theme.calloutBgColor =
									(page.parentPage || page).theme?.theme === 'dark'
										? hexToRgba('#161619', 0.85)
										: hexToRgba('#f6f5f4', 0.85);
							}}
						/>

						{#if section.renderType === 'callout' || section.id !== sectionItem.id}
							<div
								class="w-[35px] rounded-full border-4 border-black cursor-pointer"
								class:border-green-400={!sectionItem.theme.calloutBgColor}
								class:border-[#f6f5f4]={sectionItem.theme.calloutBgColor}
								on:click={() => {
									sectionItem.theme.isCalloutTransparent = true;
									sectionItem.theme.calloutBgColor = null;
								}}
								style="background-image: url('https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1716758994699-image.png');"
							/>
						{/if}

						<div
							class="w-[35px] h-[35px] rounded-full border border-black cursor-pointer border-4  border-[#f6f5f4]"
							style="background-color: #f6f5f4;"
							class:border-green-400={!sectionItem.theme?.isCalloutTransparent &&
								sectionItem.theme.calloutBgColor === '#f6f5f4'}
							on:click={() => {
								sectionItem.theme.isCalloutTransparent = false;
								sectionItem.theme.calloutBgColor = '#f6f5f4';
							}}
						/>
						<div
							class="w-[35px] h-[35px] rounded-full border border-black cursor-pointer border-4 border-[#f6f5f4]"
							style="background-color: #111111;"
							class:border-green-400={!sectionItem.theme?.isCalloutTransparent &&
								sectionItem.theme.calloutBgColor === '#111111'}
							on:click={() => {
								sectionItem.theme.isCalloutTransparent = false;
								sectionItem.theme.calloutBgColor = '#111111';
							}}
						/>
					</div>
				{/if}

				{#if true || sectionItem.id !== section.id}
					<div class="mb-4 mt-4">
						<input bind:checked={sectionItem.theme.isOppositeColors} class="mr-2" type="checkbox" />

						Use opposite text color
					</div>
				{/if}

				{#if false}
					{#if !sectionItem.bgImageUrl}
						<div>
							<div class="font-normal text-sm opacity-70 mb-2 mt-4">Background pattern</div>
						</div>

						{#each bgPatterns as bgPattern}
							<button
								class="_secondary _small mr-2 mb-2"
								on:click={() => (sectionItem.theme.bgPattern = bgPattern.key)}
								>{bgPattern.key === sectionItem.theme.bgPattern ? '✅' : ''}
								{bgPattern.label}</button
							>
						{/each}
					{/if}
				{/if}

				{#if !sectionItem.theme.isOverrideColors}
					<div class="font-normal mt-4 text-sm opacity-70 mb-2">
						Section background image or media
					</div>

					<FileInput
						isCanSearch
						bind:isSearching={isBgImageSearching}
						class="w-full"
						theme="light"
						bind:url={sectionItem.bgImageUrl}
					/>

					{#if sectionItem.bgImageUrl}
						<div class="flex text-sm mt-4 font-normal items-center">
							<input
								bind:checked={sectionItem.theme.isNotBgImageDimmed}
								class="mr-2"
								type="checkbox"
							/>

							Do not dim background image
						</div>
					{/if}

					{#if !isCtaFooter}
						{#if sectionItem === section}
							<div class="font-normal mt-4 text-sm opacity-70 mb-2">
								Container background image or media
							</div>

							<FileInput
								isCanSearch
								bind:isSearching={isContainerBgSearching}
								class="w-full"
								theme="light"
								bind:url={sectionItem.containerBgImageUrl}
							/>
						{/if}

						{#if sectionItem.containerBgImageUrl}
							<div class="flex text-sm mt-4 font-normal items-center">
								<input
									bind:checked={sectionItem.theme.isNotContainerBgImageDimmed}
									class="mr-2"
									type="checkbox"
								/>

								Do not dim container background image
							</div>
						{/if}
					{/if}
				{/if}
			</div>

			{#if isCtaFooter}
				<div class="_section">
					<div class="_title">Bottom image</div>

					<FileInput
						bind:isSearching={isBottomImageSearching}
						isCanSearch
						class="w-full"
						theme="light"
						bind:url={sectionItem.bottomImageUrl}
					/>
				</div>
			{/if}

			{#if !isCtaFooter}
				<div class="_section">
					<div class="mb-1 font-bold">Copy</div>
					<div class="opacity-70 text-sm mb-3">Copy section to a different page or website</div>
					<button
						class="_small _secondary w-full flex justify-center items-center mr-2"
						on:click={() => {
							$sectionClipboard = JSON.stringify(section);
							showSuccessMessage('Copied section. Click Insert→From Clipboard to paste.');
						}}><FeatherIcon size="15" class="mr-2" name="copy" /> Copy Section</button
					>
				</div>
			{/if}

			{#if section.id === sectionItem.id}
				<div class="_section">
					<div class="mb-1 font-bold">Visibility</div>
					<div class="opacity-70 text-sm mb-3">Hide and show sections</div>

					<ToggleGroup
						bind:value={sectionItem.isHidden}
						tabs={[
							{
								key: false,
								name: 'visible'
							},
							{
								key: true,
								name: 'hidden'
							}
						]}
					/>
				</div>
			{/if}
		</div>
	</div>
{/if}

<script>
	import { fly } from 'svelte/transition';

	import clickOutside from 'lib/use/clickOutside';
	import isUrl from 'lib/helpers/isUrl';
	import FileInput from 'lib/components/FileInput.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import ToggleGroup from '$lib/components/ToggleGroup.svelte';
	import sectionClipboard from '$lib/stores/sectionClipboard';
	import { showSuccessMessage } from 'lib/services/toast';

	export let section;
	export let sectionItem;
	export let theme = 'light';
	export let page;

	export let isShown = false;
	export let isWithButton = true;

	let show = () => {
		isShown = true;
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
</script>

{#if isWithButton}
	<div
		class="ml-2 w-[37px] h-[37px] shrink-0 bg-[#fafafa] rounded-xl flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100"
		on:click={show}
	>
		<FeatherIcon size="15" name="settings" color="#333" />
	</div>
{/if}

{#if !isWithButton || isShown}
	<div
		class={isWithButton
			? 'absolute top-0 mt-8 p-4 z-40 bg-white w-full border border-[#e0dede] shadow-lg shadow-black/30 rounded-xl'
			: ''}
		use:clickOutside
		on:clickOutside={() => {
			if (!isBgImageSearching && !isContainerBgSearching && !isBottomImageSearching) {
				isShown = false;
			}
		}}
		in:fly={{ y: 50, duration: 150 }}
	>
		<div class="w-full py-4">
			<div class="_section">
				<div class="mb-4 font-bold">Alignment & Layout</div>

				{#if sectionItem.renderType === 'callout' || sectionItem.id !== section.id}
					<div class="_section">
						<div class="font-bold mb-1">Layout</div>
						<div class="mb-3 text-sm opacity-70">Position of the image inside section item</div>

						<div class="">
							{#if section.columns > 1 && sectionItem.renderType !== 'callout'}
								{#if section.isMasonryGrid}
									<div class="_section _info">Masonry grid doesn't support custom column sizes</div>
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
										}
									]}
								/>
							{/if}
						</div>
					</div>

					{#if section.columns === 1 || section.renderType === 'callout'}
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

				{#if section.columns > 1 && sectionItem.id === section.id}
					<div class="my-2">
						<input class="mr-2" type="checkbox" bind:checked={section.isMasonryGrid} /> Masonry Grid
						{#if section.isMasonryGrid}
							<input class="ml-2" type="checkbox" bind:checked={section.isFunkyGrid} /> Funky
						{/if}
					</div>
				{/if}

				{#if (sectionItem !== section || sectionItem.renderType === 'callout') && sectionItem.imageUrl}
					<div class="my-2">
						<input type="checkbox" bind:checked={sectionItem.theme.isReversedImage} /> Reverse Image
						Position
					</div>
				{/if}

				{#if sectionItem.id === section.id && section.renderType !== 'callout'}
					<div class="my-2">
						<input type="checkbox" bind:checked={sectionItem.theme.isTitleLeft} /> Align Left
					</div>
				{/if}

				{#if sectionItem.id !== section.id && section.columns > 1}
					<div class="_section">
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
								}
							]}
						/>
						<div class="flex">
							<div class="my-2">
								<input
									class=""
									disabled={sectionItem.renderType}
									type="checkbox"
									bind:checked={sectionItem.theme.isHugeTitle}
								/> Huge Title
							</div>

							<div class="ml-2 my-2">
								<input
									class=""
									disabled={sectionItem.renderType}
									type="checkbox"
									bind:checked={sectionItem.theme.isInlineTitle}
								/> Inline Title
							</div>
						</div>

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
					<div class="mb-2 font-semibold mt-6">Section images aspect ratio</div>

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
						<input
							class="mt-6"
							type="checkbox"
							bind:checked={sectionItem.theme.isScrollImageOnHover}
						/>
						Scroll image on hover
						<div class="text-xs mt-1">Useful for long screenshots of websites or portfolio</div>
					{/if}
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

		<div class="_section mb-2">
			<div class="font-semibold mb-2">Background</div>

			<div class="font-normal text-sm opacity-70 mb-2">Background color and image</div>

			{#if sectionItem.id !== section.id}
				<input
					class="mr-2 my-2"
					type="checkbox"
					bind:checked={sectionItem.theme.isTransparent}
					disabled={sectionItem.theme?.isOverrideColors || sectionItem.theme?.isOppositeColors}
				/>
				Transparent background

				{#if !sectionItem.bgImageUrl}
					<div class="flex items-center">
						{#if sectionItem.theme.isOverrideColors}
							<input
								type="color"
								id="head"
								name="head"
								class="mr-4 my-2"
								bind:value={sectionItem.theme.backgroundColor}
							/>
						{:else}{/if}

						<div>
							<input
								bind:checked={sectionItem.theme.isOverrideColors}
								disabled={sectionItem.theme.isTransparent}
								class="mr-2 my-2"
								type="checkbox"
								on:change={() => {
									if (sectionItem.theme.isOverrideColors) {
										sectionItem.theme.backgroundColor = page.theme.backgroundColor;
									} else {
										sectionItem.theme.backgroundColor = null;
									}
								}}
							/>

							Use different background color
						</div>
					</div>
				{/if}

				<div class="mb-4">
					<input
						disabled={sectionItem.theme.isTransparent}
						bind:checked={sectionItem.theme.isOppositeColors}
						class="mr-2"
						type="checkbox"
					/>

					Use opposite colors
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
							>{bgPattern.key === sectionItem.theme.bgPattern ? '✅' : ''} {bgPattern.label}</button
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
		</div>

		{#if section._isCtaFooter}
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
	</div>
{/if}

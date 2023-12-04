<script>
	import { fly } from 'svelte/transition';

	import isUrl from 'lib/helpers/isUrl';
	import FileInput from 'lib/components/FileInput.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';

	export let section;
	export let sectionItem;
	export let theme = 'light';
	export let page;

	export let isShown = false;

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
</script>

<div
	class="ml-2 w-[37px] h-[37px] shrink-0 bg-[#fafafa] rounded-xl flex items-center justify-center cursor-pointer"
	on:click={show}
>
	⚙️
</div>

{#if isShown}
	<div
		class="absolute top-0 mt-8 p-4 z-40 bg-white w-full border border-[#e0dede] rounded-xl"
		in:fly={{ y: 50, duration: 150 }}
	>
		<div class="w-full py-4">
			{#if !sectionItem.items && section.renderType !== 'carousel'}
				<div class="text-sm mb-2">Grid</div>
				<div class="flex items-center mb-4">
					{#if section.columns > 1}
						<input
							type="number"
							class="max-w-[60px] mr-2"
							placeholder="1"
							bind:value={sectionItem.colSpan}
						/>
						x
						<input
							type="number"
							class="max-w-[60px] ml-2"
							placeholder="1"
							bind:value={sectionItem.rowSpan}
						/>
					{:else if sectionItem.imageUrl}
						<select bind:value={sectionItem.colSpan}>
							<option value="">Default</option>
							<option value="12">12 x 12</option>
							<option value="4">4 x 8</option>
							<option value="6">6 x 6</option>
							<option value="8">8 x 4</option>
						</select>
					{/if}
				</div>
			{/if}

			<div class="_section">
				<div class="mb-2 font-bold">Alignment & Size</div>

				{#if sectionItem !== section && sectionItem.imageUrl}
					<div class="my-2">
						<input type="checkbox" bind:checked={sectionItem.theme.isReversedImage} /> Reverse Image
						Position
					</div>
				{/if}

				{#if sectionItem === section}
					<div class="my-2">
						<input type="checkbox" bind:checked={sectionItem.theme.isTitleLeft} /> Align Left
					</div>
				{/if}
				<div class="my-2">
					<input class="" type="checkbox" bind:checked={sectionItem.theme.isHugeTitle} /> Is Huge Title
				</div>

				{#if sectionItem.emoji}
					<div class="my-2">
						<input type="checkbox" bind:checked={sectionItem.isIconLeft} /> Show Icon Near Title
					</div>
				{/if}
			</div>

			{#if !sectionItem.bgImageUrl}
				<div class="_section">
					{#if sectionItem.id !== section.id}
						<div class="text-sm mb-2 mt-8 font-bold">Style</div>
						<select bind:value={sectionItem.className}>
							<option value="">Default</option>

							<option value="_highlighted">Highlighted</option>
							<option value="_darker">Dark</option>
							<option value="_transparent">Transparent</option>
						</select>
					{/if}
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

		<div class="_section">
			<div class="font-semibold mb-2">Background</div>

			{#if sectionItem === section && !sectionItem.bgImageUrl}
				<div class="font-normal text-sm opacity-70 mb-2">Background color</div>

				<div class="flex items-center">
					{#if sectionItem.theme.isOverrideColors}
						<input
							type="color"
							id="head"
							name="head"
							class="mr-4"
							bind:value={sectionItem.theme.backgroundColor}
						/>
					{:else}
						<div
							class="w-[30px] h-[30px] border rounded-full mr-4"
							style="background-color: {page.theme.backgroundColor};"
						/>
					{/if}

					<div>
						<input
							bind:checked={sectionItem.theme.isOverrideColors}
							class="mr-2"
							type="checkbox"
							on:change={() => {
								if (!sectionItem.theme.backgroundColor) {
									sectionItem.theme.backgroundColor = sectionItem.theme.backgroundColor;
								}
							}}
						/>

						Override color
					</div>
				</div>
			{/if}

			{#if !sectionItem.bgImageUrl}
				<div>
					<div class="font-normal text-sm opacity-70 mb-2">Background pattern</div>
					<div class="text-sm">Subtle background</div>
				</div>

				{#each bgPatterns as bgPattern}
					<button
						class="_secondary _small mr-2 mb-2"
						on:click={() => (sectionItem.theme.bgPattern = bgPattern.key)}
						>{bgPattern.key === sectionItem.theme.bgPattern ? '✅' : ''} {bgPattern.label}</button
					>
				{/each}
			{/if}

			{#if !sectionItem.theme.isOverrideColors}
				<div class="font-normal mt-4 text-sm opacity-70 mb-2">
					Section background image or video
				</div>

				<FileInput isCanSearch class="w-full" theme="light" bind:url={sectionItem.bgImageUrl} />

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
						Container background image or video
					</div>

					<FileInput
						isCanSearch
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

		<!-- <div class="my-4">
			<div class="text-sm mb-2">Background Image</div>

			<FileInput
				class="w-full"
				isCanSearch
				{theme}
				on:change={() => {
					if (sectionItem.bgImageUrl) {
						sectionItem.className = '_darker';
					}
				}}
				bind:url={sectionItem.bgImageUrl}
			/>
		</div> -->

		<button class="_button _primary _small mt-8 mb-2 w-full" on:click={close}>Save & Close</button>
	</div>
{/if}

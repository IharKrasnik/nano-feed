<script>
	import moment from 'moment';
	import _ from 'lodash';
	import { fade, fly } from 'svelte/transition';
	import { post } from 'lib/api';
	import RenderUrlWithBackground from 'lib/components/RenderUrlWithBackground.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import RenderFAQ from 'lib-render/components/render/FAQ.svelte';
	import refreshConditionsTimestamp from 'lib-render/stores/refreshConditionsTimestamp';
	import heatmap, { getHeatmapClicksCount } from 'lib-render/stores/heatmap';
	import { browser } from '$app/environment';
	import { v4 as uuidv4 } from 'uuid';
	import { showSuccessMessage } from 'lib/services/toast';

	import Avatar from 'lib/components/Avatar.svelte';
	import RenderTestimonials from 'lib-render/components/render/Testimonials.svelte';
	import RenderMomentumFeed from 'lib-render/components/render/MomentumFeed.svelte';
	import RenderMomentumCollection from 'lib-render/components/render/MomentumCollection.svelte';
	import RenderInteractiveOptions from 'lib-render/components/render/InteractiveOptions.svelte';
	import RenderServiceChat from 'lib-render/components/render/ServiceChat.svelte';
	import RenderNewsletter from 'lib-render/components/render/Newsletter.svelte';
	import RenderForm from 'lib-render/components/render/Form.svelte';
	import RenderStepper from 'lib-render/components/render/Stepper.svelte';
	import RenderBackgroundPattern from 'lib-render/components/render/BackgroundPattern.svelte';
	import RenderCalloutSection from 'lib-render/components/render/CalloutSection.svelte';

	import ContentEditable from 'lib/components/ContentEditable.svelte';
	import ContentEditableIf from 'lib/components/ContentEditableIf.svelte';
	import ArticleAuthorLabel from 'lib-render/components/render/ArticleAuthorLabel.svelte';
	import SourceLogo from 'lib/components/SourceLogo.svelte';

	import Emoji from 'lib/components/Emoji.svelte';
	import isGif from 'lib/helpers/isGif';
	import toDollars from 'lib/helpers/toDollars';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import currentCustomer from 'lib/stores/currentCustomer';
	import trackClick from 'lib/services/trackClick';

	export let section;
	let clazz;
	export { clazz as class };

	export let page;
	export let themeStyles = {};
	export let isSkipHeader = false;
	export let isEdit = false;
	export let isCloneable = false;
	export let isFooter;

	export let onInsert = (section) => {};

	export let isShowAuthor;

	export let style = null;

	const headerTextStyle = (item) => {
		if (item.theme?.isHugeTitle) {
			let defaultSize = 'text-3xl sm:text-4xl';
			return { 1: defaultSize, 2: defaultSize, 3: defaultSize, 4: defaultSize, 12: defaultSize };
		}

		return {
			1: item.imageUrl ? 'text-lg' : 'sm:text-4xl text-3xl',
			2: 'text-lg',
			3: 'text-lg _text-line-height',
			4: '',
			12: ''
		};
	};

	const descriptionStyle = {
		1: 'text-lg _text-line-height',
		2: 'text-lg _text-line-height',
		3: '',
		4: '',
		12: ''
	};

	const emojiStyle = {
		1: 'text-4xl mb-4',
		2: 'text-3xl mb-4',
		3: 'text-xl',
		4: 'text-lg _text-line-height',
		12: 'text-lg _text-line-height'
	};

	let focusEmailInput = () => {
		let inputs = document.getElementsByClassName('_email-input');
		let input = inputs[0];

		input.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
		input.focus();
	};

	let carouselKey;

	let selectedCarouselItem = null;

	let selectCarouselItem = (item, { isAuto = false } = {}) => {
		item.isSelected = true;
		carouselKey = +new Date();

		section.items = section.items.map((si) => {
			return {
				...si,
				isSelected: si === item
			};
		});

		if (!isAuto) {
			trackClick({
				pageId: page._id,
				sectionId: section.id,
				sectionItemId: item.id,
				linkId: item.id,
				text: item.title
			});
		}
	};

	if (section.renderType === 'carousel') {
		section.carousel = {};
	}

	if (section.carousel && section.items?.length) {
		selectCarouselItem(section.items[0], { isAuto: true });
	}

	let checkConditions = (section) => {
		section.isShown = !section.isHidden;

		_.each(section.conditions, (c) => {
			if (c.minVisits) {
				if (page.variablesValues.visitsCount < c.minVisits) {
					section.isShown = false;
				}
			} else if (c.maxVisits) {
				if (page.variablesValues.visitsCount > c.maxVisits) {
					section.isShown = false;
				}
			} else if (c.var) {
				if (c.var.eq) {
					section.isShown =
						$currentCustomer &&
						$currentCustomer.vars &&
						$currentCustomer.vars[c.var.eq.varName] === c.var.eq.varValue;
				} else if (c.var.isEmpty) {
					section.isShown =
						$currentCustomer &&
						$currentCustomer.vars &&
						!$currentCustomer.vars[c.var.isEmpty.varName];
				}
			}
		});
	};

	let refreshConditions = () => {
		section.isShown = !section.isHidden;

		if (!_.isEmpty(page.variablesValues) && !section.isHidden && section.conditions) {
			checkConditions(section);
		}
		if (section.isShown) {
			section.items?.forEach((sectionItem) => {
				checkConditions(sectionItem);
			});
		}
	};

	$: if ($refreshConditionsTimestamp) {
		refreshConditions();
	}

	let selectPreviousItem = () => {
		let selectedIndex;

		section.items = section.items.map((item, i) => {
			if (item.isSelected) {
				selectedIndex = i;
				item.isSelected = false;
			}

			return item;
		});

		if (selectedIndex === 0) {
			section.items[section.items.length - 1].isSelected = true;
		} else {
			section.items[selectedIndex - 1].isSelected = true;
		}

		carouselKey = +new Date();

		trackClick({
			pageId: page._id,
			sectionId: section.id,
			linkId: 'arrow_prev',
			text: '←'
		});
	};

	let selectNextItem = () => {
		let selectedIndex = -2;

		section.items = section.items.map((item, i) => {
			if (item.isSelected) {
				selectedIndex = i;
				item.isSelected = false;
			} else if (i === selectedIndex + 1) {
				item.isSelected = true;
			}

			return item;
		});

		if (selectedIndex === section.items?.length - 1) {
			section.items[0].isSelected = true;
			section.items = [...section.items];
		}

		carouselKey = +new Date();

		trackClick({
			pageId: page._id,
			sectionId: section.id,
			linkId: 'arrow_next',
			text: '→'
		});
	};

	$: if (section.items && carouselKey) {
		selectedCarouselItem = section.items.find((i) => i.isSelected) || section.items[0];
	}

	let submitForm = () => {};

	if (browser && section.thirdPartyScriptUrl) {
		eval(
			`var d=document;var s=d.createElement("script"); s.src="${section.thirdPartyScriptUrl}";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);`
		);
	}

	let getGlowingOpacity = () => {
		if (section.theme.glowingIntensity === 'sm') {
			return '0.11';
		} else if (section.theme.glowingIntensity === 'lg') {
			return '0.3';
		} else if (section.theme.glowingIntensity === 'xl') {
			return '0.5';
		}
	};

	if (section.items) {
		section.items = section.items.map((i) => {
			if (!i.id) {
				i.id = uuidv4();
			}
			return i;
		});
	}

	let getEmojiTheme = ({ item = null } = {}) => {
		let pageTheme = page.parentPage?.theme?.theme || page.theme?.theme || 'light';

		if (section.theme?.isOppositeColors || item?.theme?.isOppositeColors) {
			return pageTheme === 'light' ? 'dark' : 'light';
		}

		return pageTheme;
	};
</script>

<!-- <div class="section-bg" /> -->
<!-- <div>
	<div class="rounded-full">
		<svg
			class="absolute z-100"
			style="filter: blur(30px); width: calc(100vw - 50px); height: 700px; bottom: 30%; right: 50%;transform: translate(50%, 90%) translateZ(0); opacity: 0.01;"
			width="1600"
			height="900"
			viewBox="0 0 1600 900"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<radialGradient id="radialGradientId" r="100%" cx="50%" cy="50%">
					<stop offset="0%" stop-color="#fbeb00" />
					<stop offset="50%" stop-color="#faf564" />
					<stop offset="100%" stop-color="#fbfbc6" />
				</radialGradient>
			</defs>

			<rect width="1600" height="900" fill="url(#radialGradientId)" />
		</svg>
	</div>
</div> -->

{#if false}
	<div
		class="col-span-1 col-span-2 col-span-3 col-span-4 col-span-5 col-span-6 col-span-7 col-span-8 col-span-9 col-span-10 col-span-11 col-span-12 sm:col-span-1 sm:col-span-2 sm:col-span-3 sm:col-span-4 sm:col-span-5 sm:col-span-6 sm:col-span-7 sm:col-span-8 sm:col-span-9 sm:col-span-10 sm:col-span-11 sm:col-span-12"
	/>
	<div
		class="sm:col-span-1 sm:col-span-2 sm:col-span-3 sm:col-span-4 sm:col-span-5 sm:col-span-6 sm:col-span-7 sm:col-span-8 sm:col-span-9 sm:col-span-10 sm:col-span-11 sm:col-span-12"
	/>
	<div class="line-clamp-4 hover:line-clamp-5 row-span-1 row-span-2 row-span-3 row-span-4" />
	<div class="sm:row-span-1 sm:row-span-2 sm:row-span-3 sm:row-span-4 " />

	<div class="aspect-og aspect-image aspect-square" />
{/if}

{#if section.isShown}
	<div
		class="relative {section.bgImageUrl ? 'p-8 my-16' : ''} {section.renderType === 'callout'
			? 'min-h-screen sm:min-h-min'
			: ''} {isCloneable
			? 'group scale-90 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-100 transition'
			: ''}"
	>
		{#if isCloneable}
			<div
				class="hidden group-hover:block absolute z-20 right-8 top-8 bg-accent p-2 rounded  cursor-pointer"
				on:click={() => {
					if (!page) {
						navigator.clipboard.writeText(JSON.stringify(section));
					} else {
						onInsert(section);
					}
					showSuccessMessage('Copied Section');
				}}
			>
				<div class="flex items-center text-sm ">
					<FeatherIcon
						class="mr-2"
						name={page ? 'plus' : 'copy'}
						size="20"
						theme={page?.theme?.theme === 'dark' ? 'light' : 'dark'}
					/>
					{page ? `Insert` : `Copy`}
					{section._isCtaFooter ? 'Call-To-Action' : 'Section'}
				</div>
			</div>
		{/if}

		{#if section.bgImageUrl && section.renderType !== 'callout'}
			<RenderUrl
				url={section.bgImageUrl}
				imgClass={'absolute left-0 top-0 w-full h-full object-cover rounded-xl'}
				style="z-index: 0;"
			/>

			{#if !section.theme?.isNotBgImageDimmed}
				<div
					class="absolute top-0 left-0 w-full h-full rounded-xl"
					style="background-color: {page.theme.theme === 'dark'
						? 'rgba(0,0,0,0.85)'
						: 'rgba(255,255,255,.85)'}; z-index: 1;"
				/>
			{/if}
		{/if}

		{#if section.theme?.bgPattern}
			<RenderBackgroundPattern
				theme={section.theme?.isOppositeColors
					? page.theme.theme === 'dark'
						? 'light'
						: 'dark'
					: page.theme.theme}
				bgPattern={section.theme?.bgPattern}
				accentColor={page.theme?.accentColor}
			/>
		{/if}

		{#if section.title && (section.items?.length || section.streamSlug)}
			<div
				class="mx-auto h-px max-w-[500px] opacity-[15%] w-full"
				style="background:linear-gradient(to right, rgba(0,0,0,0), {page.theme
					?.accentColor}, rgba(0,0,0,0))"
			/>
		{/if}

		<div
			class=" _section-container {section.isGlowing
				? `_glowing ${section.theme?.isOverrideGlowingColor ? '_override-glowing-color' : ''}
	${section.theme?.glowingIntensity ? `_intensity` : ''}`
				: ''} {section.className}  {section.theme?.isTransparent
				? '_transparent'
				: ''} {section.type} {section.renderType} 
				{section.bgImageUrl ? '_bg-image' : ''}
				
				{clazz
				? clazz
				: section.renderType === 'article'
				? 'sm:pb-16'
				: `${
						section.items?.length
							? `px-4 xl:px-0 ${isFooter ? '' : 'py-8 sm:py-16'}`
							: 'px-4 xl:px-0 py-8 sm:py-16'
				  }`}
					{section.renderType === 'changelog' ? 'sm:w-[600px] mx-auto' : ''}
					
					"
			style="z-index: 10; {section.theme?.isOverrideGlowingColor
				? `--glowing-color: ${section.theme.glowingColor};`
				: ''} {section.theme?.glowingIntensity
				? `--glowing-opacity: ${getGlowingOpacity()};`
				: ''} {section.bottomImageUrl ? 'padding-bottom: 0 !important;' : ''} {style || ''} "
		>
			{#if section.renderType === 'callout'}
				<RenderCalloutSection bind:page bind:section bind:isEdit />
			{:else}
				{#if !isSkipHeader && (section.title || section.description || section.imageUrl || section.emoji || section.interactiveRenderType)}
					{#if section.renderType !== 'article' && section.title && (section.items?.length || section.streamSlug)}
						<div
							class="absolute inset-x-0 top-20 mx-auto h-32 w-full sm:w-[650px] transform-gpu opacity-[15%] blur-[130px] bg-gradient-to-r _from-text-color _to-accent"
						/>
					{/if}
					<div
						class="_section_titles relative w-full {page.theme.isTitlesLeft ||
						section.theme?.isTitleLeft ||
						section.renderType === 'article' ||
						section.renderType === 'changelog'
							? 'sm:text-left'
							: 'text-center'}
						
						"
					>
						{#if section.emoji}
							<div
								class="{emojiStyle[1]} {page.theme?.isTitlesLeft || section.theme?.isTitleLeft
									? `sm:absolute right-12 ${section.descripton ? 'top-30' : 'top-19'}`
									: ''} {page.theme?.isTitlesHuge ? 'text-[70px]' : ''}"
							>
								<Emoji
									theme={page.parentPage?.theme?.theme || page?.theme?.theme || 'light'}
									bind:emoji={section.emoji}
								/>
							</div>
						{/if}

						{#if section.label}
							<div class="text-sm mb-4 opacity-50 _section-label" style="font-weight: 500;">
								<ContentEditableIf class="" bind:innerHTML={section.label} condition={isEdit} />
							</div>
						{/if}

						<div class="mb-8 sm:mb-12">
							{#if section.title}
								<h2
									class="_section-title text-3xl mb-4 sm:mb-6 {page.theme.isTitlesHuge ||
									section.theme?.isHugeTitle
										? 'sm:text-6xl font-medium'
										: 'sm:text-4xl font-semibold'} {page.theme.isTitlesLeft ||
									section.theme?.isTitleLeft ||
									section.renderType === 'article'
										? 'sm:max-w-[712px]'
										: 'sm:max-w-[768px] sm:mx-auto'}"
								>
									<ContentEditableIf
										class="mb-2"
										bind:innerHTML={section.title}
										condition={isEdit}
									/>
								</h2>
							{/if}
							{#if section.description}
								<h3
									class="mb-8 {page.theme.isTitlesHuge || section.theme?.isHugeTitle
										? 'text-xl leading-8'
										: 'text-lg font-medium'} whitespace-pre-wrap opacity-70 {section.renderType ===
									'article'
										? 'sm:max-w-[712px]'
										: page.theme.isTitlesLeft || section.theme?.isTitleLeft
										? 'sm:max-w-[712px]'
										: 'sm:max-w-[592px] sm:mx-auto'}"
								>
									{#if isEdit && page.renderType === 'article'}
										<ContentEditable
											class="content bg-site color-site text-lg"
											placeholder="Start typing..."
											bind:value={section.description}
											isWithMenu={true}
										/>
									{:else}
										<ContentEditableIf
											class=""
											bind:innerHTML={section.description}
											condition={isEdit}
										/>
									{/if}
								</h3>
							{/if}
						</div>

						{#if section.interactiveRenderType}
							<div
								class="{section.renderType === 'changelog' ||
								page.theme?.isTitlesLeft ||
								section.theme?.isTitleLeft
									? 'mb-32'
									: 'sm:max-w-[600px] sm:mx-auto'} mt-8"
							>
								<RenderInteractiveOptions
									class="{section.renderType === 'changelog' ||
									page.theme?.isTitlesLeft ||
									section.theme?.isTitleLeft
										? 'justify-start'
										: 'justify-center mx-auto'} mb-8"
									bind:sectionItem={section}
									size="large"
									bind:page
								/>
							</div>
						{/if}

						{#if section.imageUrl}
							<div class="my-8">
								<RenderUrlWithBackground
									class=""
									urlImgMaxWidth={section.imgMaxWidth}
									urlImgClass="{section.theme?.isTitleLeft ? '' : 'mx-auto'} {isGif(
										section.imageUrl
									)
										? 'w-full object-cover'
										: ''}"
									imageUrl={section.imageUrl}
									imageBackgroundUrl={section.imageBackgroundUrl}
								/>
							</div>
						{/if}
					</div>
				{/if}

				{#if section.bottomImageUrl}
					<div class="_container-width mx-auto">
						<img class="mx-auto" src={section.bottomImageUrl} style="z-index: 0;" />
					</div>
				{/if}

				{#if section.renderType === 'embedCode'}
					{#if browser && section.customCodeHTML}
						{@html section.customCodeHTML}
					{/if}
				{:else if section.renderType === 'faq'}
					<RenderFAQ bind:section bind:page bind:isEdit />
				{:else if section.renderType === 'testimonials'}
					<RenderTestimonials bind:page bind:section />
				{:else if section.streamSlug}
					<RenderMomentumCollection bind:section bind:page bind:themeStyles bind:isEdit />
				{:else if section.type === 'momentum_feed'}
					<RenderMomentumFeed bind:page bind:themeStyles />
				{:else if section.type === 'service_chat'}
					<RenderServiceChat bind:page bind:section bind:themeStyles />
					<!-- {:else if section.type === 'newsletter'}
				<RenderNewsletter bind:page bind:section bind:themeStyles /> -->
				{:else if section.renderType === 'stepper'}
					<RenderStepper bind:isEdit bind:page bind:section />
				{:else if section.renderType === 'form'}
					<RenderForm bind:section bind:page bind:isEdit />
				{:else if section.items?.length}
					<div class="w-full">
						{#if section.renderType === 'carousel'}
							{#if !section.carouselType || section.carouselType === 'vertical'}
								<div
									style={section.maxWidth
										? `max-width: ${section.maxWidth}px; margin: 0 auto;`
										: ''}
								>
									<div class="flex w-full justify-between">
										<div
											class="flex gap-8 mb-8 items-center justify-center w-full sm:justify-start"
										>
											{#each section.items as item (item.id)}
												{#if item.isShown || _.isUndefined(item.isShown)}
													<div
														class:opacity-40={!item.isSelected}
														class="cursor-pointer transition  {item.isSelected && item.description
															? 'text-2xl font-semibold'
															: 'text-lg font-medium'}"
														class:heatmap={$heatmap}
														data-heatmap-clicks-count={$heatmap
															? getHeatmapClicksCount({
																	sectionId: section.id,
																	sectionItemId: item.id,
																	linkId: item.id
															  })
															: ''}
														on:click={() => selectCarouselItem(item)}
													>
														<ContentEditableIf
															class=""
															bind:innerHTML={item.title}
															condition={isEdit}
														/>
													</div>
												{/if}
											{/each}
										</div>
										<div class="hidden sm:flex gap-4">
											<div
												class="opacity-40 hover:opacity-100 transition cursor-pointer"
												class:heatmap={$heatmap}
												data-heatmap-clicks-count={$heatmap
													? getHeatmapClicksCount({
															sectionId: section.id,
															linkId: 'arrow_prev'
													  })
													: ''}
												on:click={() => {
													selectPreviousItem();
												}}
											>
												<FeatherIcon
													color={(page.parentPage?.theme || page.theme)?.theme === 'dark'
														? '#ffffff'
														: '#111111'}
													name="arrow-left"
												/>
											</div>

											<div
												class="opacity-40 hover:opacity-100 transition cursor-pointer"
												class:heatmap={$heatmap}
												data-heatmap-clicks-count={$heatmap
													? getHeatmapClicksCount({
															sectionId: section.id,
															linkId: 'arrow_next'
													  })
													: ''}
												on:click={() => {
													selectNextItem();
												}}
											>
												<FeatherIcon
													class="cursor-pointer"
													color={(page.parentPage?.theme || page.theme)?.theme === 'dark'
														? '#ffffff'
														: '#111111'}
													name="arrow-right"
												/>
											</div>
										</div>
									</div>

									{#if selectedCarouselItem}
										{#key carouselKey}
											<div class="_section-item">
												<div class="p-4">
													{@html selectedCarouselItem.description}
												</div>

												<div>
													<RenderInteractiveOptions
														bind:sectionItem={selectedCarouselItem}
														class="p-4"
														{page}
													/>
												</div>

												<div in:fade>
													<RenderUrlWithBackground
														aspectRatio={selectCarouselItem.theme?.imageAspectRatio}
														urlImgClass="w-full object-cover {section.description
															? 'rounded-b-lg'
															: ''}"
														imageUrl={selectedCarouselItem.imageUrl}
														imageBackgroundUrl={selectedCarouselItem.imageBackgroundUrl}
													/>
												</div>
											</div>
										{/key}
									{/if}

									<div class="flex w-full justify-center sm:hidden py-4">
										<div
											class="opacity-40 hover:opacity-100 transition cursor-pointer mr-4"
											class:heatmap={$heatmap}
											data-heatmap-clicks-count={$heatmap
												? getHeatmapClicksCount({
														sectionId: section.id,
														linkId: 'arrow_prev'
												  })
												: ''}
											on:click={() => {
												selectPreviousItem();
											}}
										>
											<FeatherIcon
												color={page.theme?.theme === 'dark' ? '#ffffff' : '#111111'}
												name="arrow-left"
											/>
										</div>

										<div
											class="opacity-40 hover:opacity-100 transition cursor-pointer"
											class:heatmap={$heatmap}
											data-heatmap-clicks-count={$heatmap
												? getHeatmapClicksCount({
														sectionId: section.id,
														linkId: 'arrow_next'
												  })
												: ''}
											on:click={() => {
												selectNextItem();
											}}
										>
											<FeatherIcon
												class="cursor-pointer"
												color={page.theme?.theme === 'dark' ? '#ffffff' : '#111111'}
												name="arrow-right"
											/>
										</div>
									</div>
								</div>
							{:else if section.carouselType === 'horizontal'}
								<div>
									<div class="_section-item w-full grid grid-cols-3 gap-4 mb-4 items-center">
										<div class="col-span-1">
											{#each section.items as item}
												{#if item.isShown}
													<div
														class="cursor-pointer p-2 sm:p-6 transition {item.isSelected
															? ''
															: 'opacity-40 hover:opacity-100'}"
														on:click={selectCarouselItem(item)}
														class:heatmap={$heatmap}
														data-heatmap-clicks-count={$heatmap
															? getHeatmapClicksCount({
																	sectionId: section.id,
																	sectionItemId: item.id,
																	linkId: item.id
															  })
															: ''}
													>
														<ContentEditableIf
															class="_item-title mb-2"
															bind:innerHTML={item.title}
															condition={isEdit}
														/>
														<ContentEditableIf
															class="_item-description whitespace-pre-wrap"
															bind:innerHTML={item.description}
															condition={isEdit}
														/>
													</div>
												{/if}
											{/each}
											<div class="flex gap-4 p-2 sm:p-6">
												<div
													class="opacity-40 hover:opacity-100 transition cursor-pointer"
													on:click={() => {
														selectPreviousItem();
													}}
												>
													<FeatherIcon
														color={page.theme?.theme === 'dark' ? '#ffffff' : '#111111'}
														on:click={() => {
															selectPreviousItem();
														}}
														name="arrow-up"
													/>
												</div>

												<div
													class="opacity-40 hover:opacity-100 transition cursor-pointer"
													on:click={() => {
														selectNextItem();
													}}
												>
													<FeatherIcon
														color={page.theme?.theme === 'dark' ? '#ffffff' : '#111111'}
														name="arrow-down"
													/>
												</div>
											</div>
										</div>

										{#if selectedCarouselItem}
											<div class="col-span-2 p-8" in:fade>
												{#key carouselKey}
													<RenderUrlWithBackground
														aspectRatio={selectedCarouselItem.aspectRatio}
														urlImgClass="asobject-cover"
														imageUrl={selectedCarouselItem.imageUrl}
														imageBackgroundUrl={selectedCarouselItem.imageBackgroundUrl}
													/>
												{/key}
											</div>
										{/if}
									</div>
								</div>
							{/if}
						{:else if section.columns === 1}
							{#each section.items as item}
								<div class="flex justify-between">
									<div
										class="_section-item w-full relative items-center {section.renderType ===
											'article' || section.streamSlug?.includes('-blog')
											? '_article mb-8'
											: 'mb-4 sm:mb-8'}
							{section.renderType === 'changelog'
											? '_transparent _no-padding sm:w-[600px] mx-auto'
											: 'grid sm:grid-cols-12 '} {item.className || ''} {item.theme?.isTransparent
											? '_transparent'
											: ''} {item.theme?.isOppositeColors ? '_bg-opposite' : ''}"
										style={item.theme?.isOverrideColors
											? `background-color: ${item.theme?.backgroundColor};`
											: ''}
									>
										{#if section.renderType === 'changelog'}
											<div
												class="sm:absolute sm:top-0 sm:left-0 sm:transform _translate-x-full-reverse overflow-auto"
											>
												<div class="sm:sticky sm:top-28 sm:mr-32 text-sm min-w-[200px] mb-2">
													<time>
														{moment(item.publishedOn).format('MMM DD YYYY')}
													</time>
												</div>
											</div>
										{/if}

										<div
											class="{section.renderType === 'changelog'
												? 'col-span-12'
												: `sm:col-span-${item.innerColSpan || (item.imageUrl ? 6 : 12)}`}
									
									{item.theme?.isReversedImage ? 'order-last' : ''}
									{(!item.innerColSpan || item.innerColSpan === 12) && item.imageUrl ? 'mb-8' : ''}"
										>
											<div>
												<div
													class="{section.renderType === 'article'
														? 'sm:px-8'
														: ' _borderless p-4 sm:p-8'}
													{section.renderType === 'changelog' ? '_transparent _no-padding' : ''}
													
													col-span-1"
												>
													<!-- {#if item.emoji !== '✨'}
												<Emoji bind:emoji={item.emoji} />
												{/if} -->
													{#if item.url && !item.interactiveRenderType}
														<a
															class="_item-title block mb-4"
															href={item.url || ''}
															target={item.url?.startsWith('http') ? '_blank' : ''}
														>
															<ContentEditableIf bind:innerHTML={item.title} condition={isEdit} />
														</a>
													{:else}
														<div class="_item-title mb-4">
															<ContentEditableIf bind:innerHTML={item.title} condition={isEdit} />
														</div>
													{/if}

													{#if section.renderType === 'changelog'}
														<RenderUrlWithBackground
															isIframeFallback={false}
															aspectRatio={section.theme?.imageAspectRatio ||
																item.theme?.imageAspectRatio}
															class="my-4"
															urlImgClass="object-cover {item.theme?.isReversedImage
																? 'rounded-l-lg'
																: 'rounded-r-lg'}"
															imageUrl={item.imageUrl}
															imageBackgroundUrl={item.imageBackgroundUrl}
														/>
													{/if}

													{#if isShowAuthor}
														<div>
															<ArticleAuthorLabel isWithAuthor={false} class={`my-2 `} bind:page />
														</div>
													{/if}

													<ContentEditableIf
														class="_item-description whitespace-pre-wrap"
														bind:innerHTML={item.description}
														condition={isEdit}
													/>

													{#if item.tagsStr}
														<div class="my-4 mt-6 flex flex-wrap gap-2">
															{#each item.tagsStr.split(',') as tag}
																<div
																	class="px-3 py-1 text-sm opacity-80 rounded-full inline ring {page
																		.parentPage?.theme?.theme || page.theme?.theme === 'dark'
																		? 'ring-zinc-900'
																		: 'ring-zinc-100'} bg-black"
																	style={page.parentPage?.theme?.theme ||
																	page.theme?.theme === 'dark'
																		? 'background: rgba(255,255,255,.1); border: 1px rgba(255, 255,255, .3) solid;'
																		: 'background: rgba(0,0,0,.1); border: 1px rgba(0, 0, 0, .3) solid;'}
																>
																	{#if !section.isDatabase}
																		{#key item.theme}
																			<Emoji
																				class="inline"
																				theme={getEmojiTheme({ item })}
																				width={14}
																				emoji={item.emoji || 'feather:check'}
																			/>
																		{/key}
																	{/if}
																	{tag}
																</div>
															{/each}
														</div>
													{/if}

													{#if item.interactiveRenderType}
														<div class="mt-4">
															<RenderInteractiveOptions
																bind:sectionItem={item}
																parentSectionId={section.id}
																bind:page
																itemClass={`${true ? 'p-2 mr-4' : 'p-4 mr-4'}`}
															/>
														</div>
													{/if}
												</div>
											</div>
										</div>

										{#if section.renderType !== 'changelog'}
											<div
												class="
									{`sm:col-span-${
													!item.innerColSpan
														? 6
														: 12 - (item.title || item.description ? item.innerColSpan || 6 : 0) ||
														  12
												}`} 
									
									{item.theme?.isReversedImage || section.renderType === 'changelog' ? 'order-first' : ''}"
											>
												<!-- <RenderUrl imgClass="object-cover rounded-b-lg" url={item.imageUrl} /> -->

												<RenderUrlWithBackground
													aspectRatio={section.theme?.imageAspectRatio ||
														item.theme?.imageAspectRatio}
													urlImgClass="object-cover {item.theme?.isReversedImage
														? 'rounded-l-lg'
														: 'rounded-r-lg'}"
													imageUrl={item.imageUrl}
													imageBackgroundUrl={item.imageBackgroundUrl}
												/>
											</div>
										{/if}
									</div>
								</div>
							{/each}
						{:else}
							<div
								class="gap-4 sm:gap-4 {section.columns > 1
									? 'items-stretch-or-not'
									: ''} {section.carousel
									? 'flex overflow-x-auto sm:grid'
									: ''} {section.isMasonryGrid
									? `sm:columns-${section.columns}`
									: `grid sm:grid-cols-${section.columns}`}"
							>
								{#each section.items || [] as item, i}
									{#if item.isShown || _.isUndefined(item.isShown)}
										<div
											class=" break-inside-avoid mb-2 sm:col-span-{item.colSpan ||
												1} sm:row-span-{item.rowSpan || 1} {section.renderType === 'carousel'
												? `min-w-[300px] sm:min-w-0 cursor-pointer`
												: ''}"
											class:pt-16={section.isFunkyGrid && i === 1}
										>
											<a
												href={item.url && !item.interactiveRenderType ? item.url : null}
												target={item.url?.startsWith('http') ? '_blank' : ''}
												id={item.feedItemId ? `feed-${item.feedItemId}` : ''}
												class="_section-item group block relative {item.bgImageUrl
													? '_bg-image'
													: ''} rounded-lg sm:rounded-xl  {item.className || ''} {item.theme
													?.isTransparent
													? '_transparent'
													: ''} {item.url && !item.interactiveRenderType
													? '_interactive'
													: ''} h-full overflow-hidden"
												on:click={() => {
													if (section.carousel) {
														selectCarouselItem(item);
													}

													if (item.feedItemId) {
														post(`feed/${item.feedItemId}/view?pageId=${page._id}`);

														trackClick({
															pageId: page?._id,
															sectionId: section.id,
															sectionItemId: item.feedItemId,
															isFeedItem: true,
															linkId: item.feedItemId,
															url: item.url,
															text: item.title || item.description
														});
													} else {
														trackClick({
															pageId: page?._id,
															sectionId: section.id,
															sectionItemId: item.id,
															linkId: item.id,
															url: item.url,
															text: item.title || item.description
														});
													}
												}}
												class:heatmap={$heatmap && section.linkType === 'interactive'}
												data-heatmap-clicks-count={$heatmap && section.linkType === 'interactive'
													? getHeatmapClicksCount({
															sectionId: section.id,
															sectionItemId: item.id,
															linkId: item.id
													  })
													: ''}
												style="-webkit-column-break-inside: avoid; scroll-margin-top: 40px;"
											>
												{#if item.theme?.bgPattern}
													<div
														class="absolute top-0 left-0 w-full h-full pattern-size-4 rounded-xl pattern-{item
															.theme.bgPattern} {page.theme?.theme === 'dark'
															? 'pattern-white pattern-bg-black'
															: 'pattern-black pattern-bg-white'} [mask-image:radial-gradient(52%_85%_at_top_center,white,transparent)]"
														style="opacity: 0.1;"
													/>
												{/if}

												{#if item.bgImageUrl}
													<RenderUrl
														url={item.bgImageUrl}
														imgClass={'absolute left-0 top-0 w-full h-full object-cover rounded-xl'}
														style="z-index: 0;"
													/>

													{#if !item.theme?.isNotBgImageDimmed}
														<div
															class="absolute top-0 left-0 w-full h-full rounded-xl"
															style="background-color: {page.theme?.theme === 'dark'
																? 'rgba(0,0,0,0.85)'
																: 'rgba(255,255,255,.85)'}; z-index: 1;"
														/>
													{/if}
												{/if}

												<div
													class="flex flex-col relative z-10 justify-between {section.columns > 1
														? 'h-full'
														: ''} grid-cols-1 {section.columns > 1
														? 'block'
														: 'grid'} sm:grid-cols-{section.columns === 1 &&
													item.imageUrl &&
													section.items.length > 1
														? 2
														: ''} w-full {section.columns > 1
														? `${section.carousel ? 'shadow-md' : ''} rounded-2xl`
														: ''}  {section.columns > 1
														? 'items-stretch'
														: 'items-center'} content-start {item.theme?.isOppositeColors
														? '_bg-opposite'
														: ''}"
													style="{section.columns === 1 &&
													section.items.length === 1 &&
													!item.imageUrl
														? 'margin-bottom: -64px;'
														: ''} {item.theme?.isOverrideColors
														? `background-color: ${item.theme?.backgroundColor || 'none'};`
														: ''}"
												>
													{#if item.title || item.description}
														<div
															class="flex w-full h-full flex-col justify-between {item.theme
																?.isTransparent
																? 'sm:pr-8'
																: page?.theme?.containerWidth === 900
																? 'p-4'
																: 'p-8'} text-left self-center order-none-off {section.columns ==
																1 && i % 2 === 1
																? 'sm:order-last-off'
																: ''} {section.columns === 1 &&
																(!item.imageUrl || section.items.length === 1) &&
																'mx-auto'}"
															class:order-last-off={i % 2 === 0}
														>
															<div class="max-w-[600px]">
																{#if item.title || item.emoji}
																	{#if item.emoji && !item.theme?.isIconLeft}
																		<div
																			class="{emojiStyle[section.columns]} _section-img mr-2 mb-4"
																		>
																			<Emoji
																				bind:emoji={item.emoji}
																				bind:color={item.iconColor}
																				bind:bgColor={item.emojiBgColor}
																				width={30}
																				theme={page.parentPage?.theme?.theme ||
																					page?.theme?.theme ||
																					'light'}
																			/>
																		</div>
																	{/if}

																	{#if !item.theme?.isInlineTitle}
																		<div
																			class="flex {item.description
																				? page?.theme?.containerWidth
																					? 'mb-2'
																					: 'mb-4'
																				: ''} {section.columns < 3
																				? 'flex-col items-start'
																				: 'items-center'}"
																		>
																			{#if item.emoji && item.theme?.isIconLeft}
																				<div
																					class="{emojiStyle[
																						section.columns
																					]} flex _section-img mr-2"
																				>
																					<Emoji
																						bind:emoji={item.emoji}
																						bind:color={item.iconColor}
																						bind:bgColor={item.emojiBgColor}
																						width={25}
																						theme={page.parentPage?.theme?.theme ||
																							page?.theme?.theme ||
																							'light'}
																					/>
																				</div>
																			{/if}
																			<h2
																				class="{headerTextStyle(item)[section.columns]} _item-title"
																			>
																				<ContentEditableIf
																					class=""
																					bind:innerHTML={item.title}
																					condition={isEdit}
																				/>
																			</h2>
																		</div>
																	{/if}
																{/if}

																{#if isShowAuthor}
																	<div>
																		<ArticleAuthorLabel
																			isWithAuthor={false}
																			class="my-2"
																			bind:page
																		/>
																	</div>
																{/if}

																{#if item.description && !item.pricing}
																	<h3
																		class="{descriptionStyle[
																			section.columns
																		]} _item-description whitespace-pre-wrap "
																	>
																		{#if item.title && item.theme?.isInlineTitle}
																			{#if item.emoji && item.theme.isIconLeft}
																				<Emoji
																					width={16}
																					bind:emoji={item.emoji}
																					bind:color={item.iconColor}
																					bind:bgColor={item.emojiBgColor}
																					class="sm:inline mb-1 sm:mb-0"
																					theme={page.parentPage?.theme?.theme ||
																						page?.theme?.theme ||
																						'light'}
																				/>{/if}<ContentEditableIf
																				class="_inline_title sm:inline mb-1 sm:mb-0 font-medium"
																				style="color: {page.theme?.theme === 'dark'
																					? '#ffffff'
																					: '#111111'};"
																				bind:innerHTML={item.title}
																				condition={isEdit}
																			/><span class="hidden sm:inline">&nbsp;</span
																			>{/if}<ContentEditableIf
																			class="sm:inline inline {section.isDatabase
																				? '_line-clamp-4 hover:line-clamp-5'
																				: ''}"
																			bind:innerHTML={item.description}
																			condition={isEdit}
																		/>
																	</h3>
																{/if}

																{#if item.tagsStr}
																	<div class="my-4 mt-6 flex flex-wrap gap-2">
																		{#each item.tagsStr.split(',') as tag}
																			<div
																				class="px-3 py-1 text-sm opacity-80 rounded-full inline ring ring-1 {getEmojiTheme(
																					{ item }
																				) === 'dark'
																					? 'ring-zinc-700'
																					: 'ring-zinc-200'} bg-black"
																				style={page.parentPage?.theme?.theme ||
																				page.theme?.theme === 'dark'
																					? 'background: rgba(255,255,255,.1); border: 1px rgba(255, 255,255, .3) solid;'
																					: 'background: rgba(0,0,0,.1); border: 1px rgba(0, 0, 0, .3) solid;'}
																			>
																				{#if !section.isDatabase}
																					{#key item.theme}
																						<Emoji
																							class="inline"
																							theme={getEmojiTheme({ item })}
																							width={14}
																							emoji={item.emoji || 'feather:check'}
																						/>
																					{/key}
																				{/if}
																				{tag}
																			</div>
																		{/each}
																	</div>
																{/if}

																{#if item.pricing}
																	<div class="flex items-end mt-4 mb-4">
																		<div class="text-5xl font-bold mr-2">
																			{item.pricing.amount
																				? toDollars(item.pricing.amount * 100)
																				: 'Free'}
																		</div>
																		{#if item.pricing.amount}
																			<div class="text-lg">
																				/{item.pricing.per}
																			</div>
																		{/if}
																	</div>
																	<div class="mb-8 opacity-70">
																		{@html item.description}
																	</div>

																	{#if item.pricing.benefitsStr}
																		<div class="mb-4">
																			{#each item.pricing.benefitsStr.split('\n') as benefit}
																				<div class="my-2 flex items-center">
																					<Emoji
																						theme={page.parentPage?.theme?.theme ||
																							page?.theme?.theme ||
																							'light'}
																						emoji={section.benefitsEmoji || '✅'}
																						class="mr-2 opacity-70"
																					/>
																					{benefit}
																				</div>
																			{/each}
																		</div>
																	{:else if item.pricing.benefits}
																		<div class="mb-4">
																			{#each item.pricing.benefits as benefit}
																				<div class="my-2">
																					<span class="inline-block mr-1">✅</span>
																					{benefit.name}
																				</div>
																			{/each}
																		</div>
																	{/if}
																{/if}

																{#if item.interactiveRenderType}
																	<div class={page?.theme?.containerWidth ? 'py-4' : 'py-4'}>
																		<RenderInteractiveOptions
																			class={`${
																				section.columns === 1 &&
																				(section.interactiveRenderType === 'single_choice' ||
																					section.interactiveRenderType === 'multiple_choice')
																					? 'justify-center'
																					: 'justify-start'
																			} ${item.pricing ? 'w-full' : ''}`}
																			size={item.pricing ? 'large' : 'normal'}
																			bind:sectionItem={item}
																			parentSectionId={section.id}
																			bind:page
																			itemClass={`${true ? 'p-2 mr-4' : 'p-4 mr-4'}`}
																		/>
																	</div>
																{/if}
															</div>
														</div>
													{/if}
													{#if !section.carousel && item.imageUrl}
														<div
															class="{section.pricing ? 'order-none-off' : 'order-none-off'} {item
																.theme?.isReversedImage
																? 'order-first'
																: ''}
															{section.columns === 1 && i % 2 === 0 ? 'sm:order-last-off' : ''} {section.isShowSource
																? 'px-4'
																: ''}"
														>
															<RenderUrlWithBackground
																aspectRatio={section.theme?.imageAspectRatio ||
																	item.theme?.imageAspectRatio}
																urlImgClass="w-full object-cover h-auto {section.imageClass ||
																	''}  mx-auto {section.columns === 1 ? '' : ''}  {section.items
																	.length === 1
																	? ''
																	: ''} {isGif(item.imageUrl)
																	? 'w-full object-cover'
																	: ''} {section.isShowSource || (!item.title && !item.description)
																	? 'rounded-lg'
																	: item.theme?.isReversedImage
																	? 'rounded-t-lg'
																	: 'rounded-b-lg'}
																 {section.theme?.isScrollImageOnHover
																	? 'transition-all ease-in-out duration-1000 object-top group-hover:object-bottom'
																	: ''}
																"
																imageUrl={item.imageUrl}
																imageBackgroundUrl={item.imageBackgroundUrl}
															/>
															<!-- <RenderUrl
															urlClass={`${section.imageClass || ''} ${getAspectClass(
																item.theme?.imageAspectRatio
															)}`}
															isIframeFallback={false}
															urlImgClass="w-full {section.imageClass || ''} {getAspectClass(
																item.theme?.imageAspectRatio
															)} object-cover mx-auto {section.columns === 1 ? '' : ''}  {section
																.items.length === 1
																? ''
																: ''} {isGif(item.imageUrl)
																? 'w-full object-cover'
																: ''} {section.isShowSource ? 'rounded-lg' : 'rounded-b-xl '}"
															url={item.imageUrl}
														/> -->
														</div>
													{/if}

													{#if section.isShowSource}
														<div class="px-4 pb-4 {item.imageUrl ? 'pt-4' : ''}">
															<hr class="mb-4 opacity-30" />

															<div class="flex justify-between items-center text-sm opacity-80">
																{moment(item.publishedOn || item.createdOn).format('MMM DD, YYYY')}

																<div>
																	<SourceLogo
																		theme={page?.theme?.theme || 'light'}
																		bind:url={item.url}
																	/>
																</div>
															</div>
														</div>
													{/if}
												</div>
											</a>
										</div>
									{/if}
								{/each}
							</div>
						{/if}
					</div>
				{/if}
			{/if}
		</div>
	</div>
{/if}

<style>
	._section-container.article {
		max-width: 712px;
		margin: 0 auto;
	}

	._section-container.article ._section-item {
		background: none;
	}

	button,
	.button {
		display: inline-block;
		border-radius: var(--button-radius);
		padding: 8px 16px;
		font-size: 18px;

		color: var(--button-color);
		background-color: var(--accent-color);
	}

	.grayscale-emoji {
		/* filter: grayscale(0.8); */
	}

	/* .description {
		font-size: 18px;
		line-height: 1.6;
		max-width: 512px;
		font-weight: 500;
		opacity: 0.9;
	} */

	.section-button {
		text-align: left;
		color: var(--accent-color);
		font-size: 15px;
		font-weight: 500;
	}

	.section-button::after {
		content: '→';
		@apply ml-2 transition;
		display: inline-block;
	}

	.section-button:hover::after {
		@apply ml-3;
	}

	._selected .bg-section {
		/* background: white; */
	}

	._not-selected .bg-section {
		/* background: #f6f5f4 !important;
		@apply transition; */
	}

	.section-bg::before {
		content: '';
		display: block;
		position: absolute;
		opacity: 0.03;
		bottom: 30%;
		right: 50%;
		transform: translate(50%, 90%) translateZ(0);
		width: calc(100vw - 50px);
		height: 700px;
		filter: blur(30px);
		@apply bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-100 via-yellow-300 to-yellow-500
		/* --page-edge: calc((100vw - 1280px) / 2);
		--blobBg: #7e22ce;

		background: radial-gradient(
				400px circle at calc(100% - var(--page-edge) - 10%) 45%,
				var(--blobBg),
				70%,
				transparent
			),
			radial-gradient(600px circle at 50% 55%, var(--blobBg), 60%, transparent),
			radial-gradient(
				400px circle at calc(var(--page-edge) + 15%) 40%,
				var(--blobBg),
				60%,
				transparent
			); */;
	}

	._item-description {
		color: var(--section-description-text-color);
	}

	._bg-opposite ._item-description {
		color: var(--section-description-text-color-opposite);
	}
</style>

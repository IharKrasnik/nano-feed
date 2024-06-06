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

	import RenderTestimonials from 'lib-render/components/render/Testimonials.svelte';
	import RenderMomentumFeed from 'lib-render/components/render/MomentumFeed.svelte';
	import RenderMomentumCollection from 'lib-render/components/render/MomentumCollection.svelte';
	import RenderInteractiveOptions from 'lib-render/components/render/InteractiveOptions.svelte';
	import RenderServiceChat from 'lib-render/components/render/ServiceChat.svelte';
	import RenderForm from 'lib-render/components/render/Form.svelte';
	import RenderStepper from 'lib-render/components/render/Stepper.svelte';
	import RenderBackgroundPattern from 'lib-render/components/render/BackgroundPattern.svelte';
	import RenderCalloutSection from 'lib-render/components/render/CalloutSection.svelte';
	import RenderComments from 'lib-render/components/render/CommentsSection.svelte';
	import RenderSectionItem from 'lib-render/components/render/SectionItem.svelte';

	import ContentEditable from 'lib/components/ContentEditable.svelte';
	import ContentEditableIf from 'lib/components/ContentEditableIf.svelte';
	import ContentEditor from 'lib/components/ContentEditor.svelte';
	import RenderEditorContent from 'lib/components/RenderEditorContent.svelte';
	import ArticleAuthorLabel from 'lib-render/components/render/ArticleAuthorLabel.svelte';
	import SourceLogo from 'lib/components/SourceLogo.svelte';

	import Emoji from 'lib/components/Emoji.svelte';
	import isGif from 'lib/helpers/isGif';
	import toDollars from 'lib/helpers/toDollars';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import currentCustomer from 'lib/stores/currentCustomer';
	import trackClick from 'lib/services/trackClick';
	import sectionToEdit from 'lib-render/stores/sectionToEdit';
	import selectedSectionItem from 'lib-render/stores/selectedSectionItem';

	export let section;
	let clazz;
	export { clazz as class };

	export let page;
	export let themeStyles = {};
	export let isSkipHeader = false;
	export let isEdit = false;
	export let isEmbed = false;
	export let isCloneable = false;
	export let isFooter;

	export let onInsert = (section) => {};

	export let isShowAuthor;

	export let style = null;

	const headerTextStyle = (item) => {
		if (item.theme?.titleSize === 'large' || section.theme?.itemsTitleSize === 'large') {
			let defaultSize = '_large text-xl sm:text-2xl';
			return { 1: defaultSize, 2: defaultSize, 3: defaultSize, 4: defaultSize, 12: defaultSize };
		} else if (item.theme?.titleSize === 'small' || section.theme?.itemsTitleSize === 'small') {
			let defaultSize = '_small text-sm sm:text-sm';
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

	if (browser) {
		if (section.thirdPartyScriptUrl) {
			eval(
				`var d=document;var s=d.createElement("script"); s.src="${section.thirdPartyScriptUrl}";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);`
			);
		}

		if (section.customScriptJs) {
			console.log('section.customScriptJs', section.customScriptJs);
			eval(
				`var d=document;var s=d.createElement("script"); s.innerHTML=\`\${section.customScriptJs}\`;s.async=1;d.getElementsByTagName("head")[0].appendChild(s);`
			);
		}
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

		if (section.theme?.areItemsOppositeColors || item?.theme?.isOppositeColors) {
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
		class="relative {section.bgImageUrl && !isFooter
			? 'sm:p-8 mb-16 mx-2 sm:mx-0'
			: ''}   {isCloneable
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
						navigator.clipboard.writeText(JSON.stringify(section));
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
		<!-- 
		{#if section.title && (section.items?.length || section.streamSlug) && !isEmbed}
			<div
				class="mx-auto h-px max-w-[500px] opacity-[15%] w-full"
				style="background:linear-gradient(to right, rgba(0,0,0,0), {page.theme
					?.accentColor}, rgba(0,0,0,0))"
			/>
		{/if} -->

		<div
			class="{section.imgMaxWidth === 'full-screen' || section._isCtaFooter
				? ''
				: '_container-width mx-auto overflow-x-auto'}  _section-container {section.isGlowing
				? `_glowing ${section.theme?.isOverrideGlowingColor ? '_override-glowing-color' : ''}
	${section.theme?.glowingIntensity ? `_intensity` : ''}`
				: ''} {section.className}  {section.theme?.isTransparent
				? '_transparent'
				: ''} {section.type} {section.renderType} 
				{section.bgImageUrl ? '_bg-image' : ''}
				px-4 xl:px-0 
				{clazz
				? clazz
				: section.renderType === 'article'
				? 'sm:pb-16'
				: `${isFooter ? 'pb-8 sm:pb-16' : 'py-8 sm:py-16'}`}
					{section.renderType === 'changelog' ? 'sm:w-[600px] mx-auto' : ''}
					{section.theme?.isOppositeColors ? '_bg-opposite' : ''}"
			style="z-index: 10; {section.theme?.isOverrideGlowingColor
				? `--glowing-color: ${section.theme.glowingColor};`
				: ''} {section.theme?.glowingIntensity
				? `--glowing-opacity: ${getGlowingOpacity()};`
				: ''} {section.bottomImageUrl ? 'padding-bottom: 0 !important;' : ''} {style ||
				''} {`background-color: ${
				section.theme?.backgroundColor ||
				page.theme?.sectionBackgroundColor ||
				page.parentPage?.theme?.sectionBackgroundColor ||
				'none'
			};`}"
		>
			{#if section.renderType === 'callout'}
				<RenderCalloutSection bind:page bind:section bind:isEdit bind:isEmbed />
			{:else}
				{#if !isSkipHeader && (section.title || section.description || section.imageUrl || section.emoji || section.interactiveRenderType)}
					{#if section.renderType !== 'article' && section.title && (section.items?.length || section.streamSlug)}
						<!-- <div
							class="absolute inset-x-0 top-20 mx-auto h-32 w-full sm:w-[650px] transform-gpu opacity-[15%] blur-[130px] bg-gradient-to-r _from-text-color _to-accent"
						/> -->
					{/if}
					<div
						class="_section_titles relative w-full {page.theme.isTitlesLeft ||
						section.theme?.isTitleLeft ||
						section.renderType === 'article' ||
						section.renderType === 'changelog'
							? 'sm:text-left'
							: 'text-center'} "
					>
						{#if section.emoji}
							{#key section.theme?.emojiSizePx}
								<div
									class="mb-6 {page.theme?.isTitlesLeft || section.theme?.isTitleLeft
										? `sm:absolute right-12 ${section.descripton ? 'top-30' : 'top-19'}`
										: ''} "
								>
									<Emoji
										bind:color={section.iconColor}
										bind:bgColor={section.emojiBgColor}
										theme={page.parentPage?.theme?.theme || page?.theme?.theme || 'light'}
										bind:emoji={section.emoji}
										width={section.theme?.emojiSizePx || 60}
									/>
								</div>
							{/key}
						{/if}

						{#if section.label}
							<div class="text-sm mb-4 _section-label" style="font-weight: 500;">
								<ContentEditableIf class="" bind:innerHTML={section.label} condition={isEdit} />
							</div>
						{/if}

						<div class="mb-8 {section.description ? `${isFooter ? 'sm:mb-8' : 'sm:mb-12'}` : ''}">
							{#if section.title}
								<h2
									class="_section-title text-2xl mb-4 sm:mb-6 {page.theme.isTitlesHuge ||
									section.theme?.isHugeTitle
										? `${isFooter ? 'sm:text-xl font-semibold' : 'sm:text-5xl font-medium'}`
										: `${
												isFooter ? 'sm:text-xl font-semibold' : 'sm:text-4-5xl font-semibold'
										  }`} {page.theme.isTitlesLeft || section.theme?.isTitleLeft
										? ''
										: 'sm:mx-auto'}
									{section.renderType === 'article' ? 'sm:max-w-[712px]' : 'sm:max-w-[768px]'}"
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
									class="_section-description mb-8 {page.theme.isTitlesHuge ||
									section.theme?.isHugeTitle
										? 'text-xl leading-8'
										: 'text-lg font-medium'} whitespace-pre-wrap
										{section.renderType === 'article' ? 'sm:max-w-[712px] opacity-80' : `sm:max-w-[768px]`}
										{page.theme.isTitlesLeft || section.theme?.isTitleLeft ? '' : 'sm:mx-auto'}
										"
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
									size={isFooter ? 'normal' : 'large'}
									bind:page
									bind:isEdit
									bind:isEmbed
								/>
							</div>
						{/if}

						{#if section.imageUrl}
							<div class="my-8">
								<RenderUrlWithBackground
									class=""
									urlImgMaxWidth={section.imgMaxWidth === 'full-screen'
										? isEdit
											? '100%'
											: 'w-screen'
										: section.imgMaxWidth}
									urlImgClass="{section.theme?.isTitleLeft ? '' : 'mx-auto'} {isGif(
										section.imageUrl
									)
										? 'w-full object-cover'
										: ''} {section.imgMaxWidth === 'full-screen'
										? `${isEdit ? 'w-full' : 'w-screen'} min-h-screen`
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
				{:else if section.isRichText}
					{#if isEdit}
						<ContentEditor bind:section bind:page />
					{:else}
						<div class="_editor-content">
							<RenderEditorContent content={section.editorValue} />
						</div>
					{/if}
				{:else if section.renderType === 'article' && section.isRichText && $sectionToEdit && $sectionToEdit.id === section.id}
					<ContentEditor bind:section bind:page />
				{:else if section.renderType === 'faq'}
					<RenderFAQ bind:section bind:page bind:isEdit />
				{:else if section.renderType === 'comments'}
					<RenderComments bind:page bind:section />
				{:else if section.renderType === 'testimonials'}
					<RenderTestimonials bind:page bind:section />
				{:else if section.streamSlug}
					<RenderMomentumCollection bind:section bind:page bind:themeStyles bind:isEdit />
				{:else if section.type === 'momentum_feed'}
					<RenderMomentumFeed bind:page bind:themeStyles />
				{:else if section.renderType === 'service_chat'}
					<RenderServiceChat bind:page bind:section bind:themeStyles />
					<!-- {:else if section.type === 'newsletter'}
				<RenderNewsletter bind:page bind:section bind:themeStyles /> -->
				{:else if section.renderType === 'stepper'}
					<RenderStepper bind:isEdit bind:page bind:section />
				{:else if section.renderType === 'form'}
					<RenderForm bind:section bind:page bind:isEdit />
				{:else if section.items?.length}
					<div class="w-full _container-width mx-auto overflow-x-auto">
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
															: null}
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
													: null}
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
													: null}
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
														bind:isEdit
														bind:isEmbed
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
												: null}
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
												: null}
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
															: null}
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
						{:else if section.columns === 1 && !section.isFlexGrid}
							{#each section.items as item}
								<div class="flex justify-between">
									<a
										class="_section-item {item.theme?.maxWidth
											? item.theme.maxWidth === '75p'
												? 'sm:w-[75%] sm:mx-auto'
												: item.theme.maxWidth === '50p'
												? 'sm:w-[50%] sm:mx-auto'
												: item.theme.maxWidth === '33p'
												? 'sm:w-[33%] sm:mx-auto'
												: 'w-full'
											: 'w-full'} relative items-center {section.renderType === 'article' ||
										section.streamSlug?.includes('-blog')
											? '_article mb-8'
											: 'mb-8 sm:mb-8'}
							{section.renderType === 'changelog'
											? '_transparent _no-padding sm:w-[600px] mx-auto'
											: section.isFlexGrid
											? `flex justify-start ${section.theme?.isTitleLeft} ${
													section.theme?.isTitleLeft ? '' : 'sm:justify-center'
											  } overflow-x-auto`
											: 'grid sm:grid-cols-12 '} {item.className || ''} {item.isFeatured
											? '_highlighted'
											: ''} {item.theme?.isTransparent ? '_transparent' : ''} {item.theme
											?.isOppositeColors
											? '_bg-opposite'
											: ''} {item.url && !item.interactiveRenderType
											? ' hover:opacity-80 hover:!_border-accent'
											: ''}"
										style={`background-color: ${
											item.theme?.backgroundColor ||
											page.theme?.sectionItemBackgroundColor ||
											page.parentPage?.theme?.sectionItemBackgroundColor ||
											'none'
										};`}
										href={item.interactiveRenderType ? null : item.url}
										target={item.url?.startsWith('http') ? '_blank' : ''}
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
									
									{section.theme?.areImagesReversed || item.theme?.isReversedImage ? 'order-last' : ''}
									{(!item.innerColSpan || item.innerColSpan === 12) && item.imageUrl ? 'mb-8' : ''}"
										>
											<div>
												<div
													class="{section.renderType === 'article'
														? 'sm:px-0'
														: ' _borderless p-4 sm:p-8'}
													{section.renderType === 'changelog' ? '_transparent _no-padding' : ''}
													col-span-1"
												>
													<!-- {#if item.emoji !== '✨'}
												<Emoji bind:emoji={item.emoji} />
												{/if} -->
													{#if item.emoji}
														<div class="mr-2 mb-4 ">
															<Emoji
																bind:emoji={item.emoji}
																bind:color={item.iconColor}
																bind:bgColor={item.emojiBgColor}
																class="rounded-full text-2xl"
																width={item.theme?.emojiSizePx || 30}
																mobileWidth={26}
																theme={page.parentPage?.theme?.theme ||
																	page?.theme?.theme ||
																	'light'}
															/>
														</div>
													{/if}

													<div class="_item-title _large mb-4">
														<ContentEditableIf bind:innerHTML={item.title} condition={isEdit} />
													</div>
													<!-- {#if item.url && !item.interactiveRenderType}
														<a
															class="_item-title _large block mb-4"
															href={item.url || ''}
															target={item.url?.startsWith('http') ? '_blank' : ''}
														>
															<ContentEditableIf bind:innerHTML={item.title} condition={isEdit} />
														</a>
													{:else}
														<div class="_item-title _large mb-4">
															<ContentEditableIf bind:innerHTML={item.title} condition={isEdit} />
														</div>
													{/if} -->

													{#if section.renderType === 'changelog'}
														<RenderUrlWithBackground
															isIframeFallback={false}
															aspectRatio={section.theme?.imageAspectRatio ||
																item.theme?.imageAspectRatio}
															class="my-4"
															urlImgClass="object-cover {section.theme?.areImagesReversed ||
															item.theme?.isReversedImage
																? 'rounded-l-lg'
																: 'rounded-r-lg'}"
															imageUrl={item.imageUrl}
															imageBackgroundUrl={item.imageBackgroundUrl}
														/>
													{/if}

													{#if isShowAuthor}
														<div>
															<!-- <ArticleAuthorLabel class={`my-2 `} bind:page /> -->
														</div>
													{/if}

													{#if section.renderType !== 'pricing'}
														<ContentEditableIf
															class="_item-description opacity-80 whitespace-pre-wrap"
															bind:innerHTML={item.description}
															condition={isEdit}
														/>
													{/if}

													{#if item.tagsStr}
														<div class="my-4 mt-6 flex flex-wrap gap-2">
															{#each item.tagsStr.split(',') as tag}
																<div
																	class="flex items-center px-3 py-1 text-sm opacity-80 rounded-full inline ring {page
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
																				class="block mr-2"
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

													{#if item.pricing?.amount}
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
													{/if}

													{#if item.pricing?.benefitsStr}
														<div class="mt-4 mb-8 _section-description">
															{#each item.pricing.benefitsStr.split('\n') as benefit}
																<div class="my-2 flex items-center">
																	<Emoji
																		theme={page.parentPage?.theme?.theme ||
																			page?.theme?.theme ||
																			'light'}
																		isOppositeColors={item.theme?.isOppositeColors ||
																			section.theme?.areItemsOppositeColors}
																		emoji={section.benefitsEmoji || '✅'}
																		class="mr-2 opacity-80"
																	/>
																	{benefit}
																</div>
															{/each}
														</div>
													{:else if item.pricing?.benefits}
														<div class="mb-4">
															{#each item.pricing.benefits as benefit}
																<div class="my-2">
																	<span class="inline-block mr-1">✅</span>
																	{benefit.name}
																</div>
															{/each}
														</div>
													{/if}

													{#if item.interactiveRenderType}
														<div class="mt-4">
															<RenderInteractiveOptions
																bind:sectionItem={item}
																parentSectionId={section.id}
																class={`${item.pricing ? 'w-full' : ''}`}
																bind:page
																itemClass={`${true ? 'p-2 mr-4' : 'p-4 mr-4'}`}
																bind:isEdit
																bind:isEmbed
															/>
														</div>
													{/if}

													{#if item.syncPage?.metadata?.fullAmount}
														<hr class="w-full my-6 opacity-20" />

														<div class="flex items-end mt-6 mb-4 ">
															<div class="text-base sm:text-xl font-bold mr-2">
																{item.syncPage?.metadata?.fullAmount
																	? toDollars(item.syncPage?.metadata?.fullAmount)
																	: 'Free'}
															</div>
															{#if item.syncPage?.metadata?.payPer}
																<div class="opacity-70 text-sm sm:text-lg">
																	/ {item.syncPage?.metadata?.payPer}
																</div>
															{/if}
														</div>
													{/if}

													{#if section.isBlog}
														<div class="text-sm opacity-70 mt-4">
															{moment(item.publishedOn).format('MMM DD, YYYY')}
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
									
									{section.theme?.areImagesReversed ||
												item.theme?.isReversedImage ||
												section.renderType === 'changelog'
													? 'order-first'
													: ''}"
											>
												<!-- <RenderUrl imgClass="object-cover rounded-b-lg" url={item.imageUrl} /> -->

												<RenderUrlWithBackground
													aspectRatio={section.theme?.imageAspectRatio ||
														item.theme?.imageAspectRatio}
													urlImgClass="mx-auto object-cover {section.theme?.areImagesReversed ||
													item.theme?.isReversedImage ||
													section.renderType === 'changelog'
														? 'rounded-l-lg'
														: 'rounded-r-lg'}"
													imageUrl={item.imageUrl}
													imageBackgroundUrl={item.imageBackgroundUrl}
												/>
											</div>
										{/if}
									</a>
								</div>
							{/each}
						{:else}
							<div
								class=" {section.theme?.columnsGap === 'big'
									? 'sm:gap-12'
									: section.theme?.columnsGap === 'huge'
									? 'sm:gap-20'
									: ''} {section.isFlexGrid && section.isFlexWrap
									? 'gap-2'
									: 'gap-4'} {section.columns > 1
									? 'items-stretch-or-not'
									: ''}  {section.renderType === 'carousel'
									? 'flex overflow-x-auto sm:grid'
									: ''} {section.isMasonryGrid
									? `sm:columns-${section.columns}`
									: section.isFlexGrid
									? `flex justify-start ${section.theme?.isTitleLeft} ${
											section.theme?.isTitleLeft ? '' : 'sm:justify-center'
									  } ${section.isFlexWrap ? 'flex-wrap' : ''} overflow-x-auto`
									: `${section.theme?.isMobileInline ? 'flex sm:grid' : 'grid'} sm:grid-cols-${
											section.columns
									  } `} {section.items[0]?.theme?.isTransparent ? 'mt-8' : ''}"
							>
								{#each section.items || [] as item, i (item.id)}
									{#key $selectedSectionItem?.id}
										{#if $selectedSectionItem?.id === item.id}
											<RenderSectionItem
												bind:section
												bind:page
												bind:item={$selectedSectionItem}
												class="{$selectedSectionItem.isFlexGrid
													? 'min-w-[70%] sm:min-w-0'
													: ''} {section.theme?.isMobileInline ? 'min-w-[90%] sm:min-w-0' : ''}"
												bind:isShowAuthor
												bind:isEdit
												{selectCarouselItem}
												{getEmojiTheme}
												{descriptionStyle}
												{headerTextStyle}
												{emojiStyle}
												{i}
											/>
										{:else}
											<RenderSectionItem
												bind:section
												bind:page
												bind:isEdit
												bind:item
												class="{section.isFlexGrid ? 'min-w-[70%] sm:min-w-0' : ''} {section.theme
													?.isMobileInline
													? 'min-w-[90%] sm:min-w-0'
													: ''}"
												bind:isShowAuthor
												{selectCarouselItem}
												{getEmojiTheme}
												{descriptionStyle}
												{headerTextStyle}
												{emojiStyle}
												{i}
											/>
										{/if}
									{/key}
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
		padding: 8px 12px;
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

<script>
	import moment from 'moment';
	import _ from 'lodash';
	import { post } from 'lib/api';
	import RenderUrlWithBackground from 'lib/components/RenderUrlWithBackground.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import { getThemeValue } from 'lib-render/helpers/getThemeValue';

	import heatmap, { getHeatmapClicksCount } from 'lib-render/stores/heatmap';

	import RenderInteractiveOptions from 'lib-render/components/render/InteractiveOptions.svelte';

	import ContentEditableIf from 'lib/components/ContentEditableIf.svelte';
	import ArticleAuthorLabel from 'lib-render/components/render/ArticleAuthorLabel.svelte';
	import SourceLogo from 'lib/components/SourceLogo.svelte';

	import Emoji from 'lib/components/Emoji.svelte';
	import isGif from 'lib/helpers/isGif';
	import toDollars from 'lib/helpers/toDollars';
	import trackClick from 'lib/services/trackClick';
	import sectionToEdit from 'lib-render/stores/sectionToEdit';
	import selectedSectionItem from 'lib-render/stores/selectedSectionItem';
	import RangeSlider from '../RangeSlider.svelte';

	let clazz = '';
	export { clazz as class };
	export let style = '';

	export let section;
	export let item;
	export let i;

	export let page;
	export let isEdit = false;
	export let isEmbed = false;

	export let selectCarouselItem;
	export let getEmojiTheme;
	export let descriptionStyle;
	export let headerTextStyle;
	export let emojiStyle;

	export let isShowAuthor;

	const getMonthlyAmount = ({ amount, per }) => {
		if (per === 'month') {
			return amount * 100;
		} else if (per === 'quarter') {
			return (amount / 4) * 100;
		} else if (per === 'half-year') {
			return (amount / 6) * 100;
		} else if (per === 'year') {
			return (amount / 12) * 100;
		}
	};

	const billedLabels = {
		month: 'Monthly',
		quarter: 'Quarterely',
		['half-year']: 'Half-Yearly',
		['year']: 'Yearly'
	};

	function singularize(word) {
		const endings = {
			ves: 'fe',
			ies: 'y',
			i: 'us',
			zes: 'ze',
			ses: 's',
			es: 'e',
			s: ''
		};
		return word.replace(new RegExp(`(${Object.keys(endings).join('|')})$`), (r) => endings[r]);
	}
</script>

{#if item && (item.isShown || _.isUndefined(item.isShown))}
	<div
		class="_root {clazz} break-inside-avoid {section.isMasonryGrid
			? 'mb-6'
			: 'mb-2'} sm:col-span-{item.colSpan || 1} sm:row-span-{item.rowSpan ||
			1} {section.renderType === 'carousel'
			? `min-w-[300px] sm:min-w-0 cursor-pointer`
			: ''} {$selectedSectionItem?.id === item.id ? 'outline outline-4 outline-purple-300' : ''}"
		class:pt-16={section.isFunkyGrid && i === 1}
		style={`${style}; `}
	>
		<svelte:element
			this={item.url && !item.interactiveRenderType ? 'a' : 'div'}
			href={item.url && !item.interactiveRenderType ? item.url : null}
			target={item.url?.startsWith('http') ? '_blank' : null}
			id={item.feedItemId ? `feed-${item.feedItemId}` : ''}
			class="_section-item section-item group block relative {item.bgImageUrl ||
			section.theme?.itemsBgImageUrl
				? '_bg-image'
				: ''}  {item.className || ''} {item.isFeatured ? '_highlighted' : ''} {section.theme
				?.areItemsTransparent || item.theme?.isTransparent
				? '_transparent'
				: 'rounded-lg sm:rounded-xl'} {item.url && !item.interactiveRenderType
				? '_interactive'
				: ''} h-full {$heatmap ? '' : 'overflow-hidden'} {isEdit
				? 'hover:outline outline-4 outline-purple-200'
				: ''} {item?.theme?.isNoPadding || section.theme?.areItemsNoPadding
				? '_borderlesss'
				: ''} {item.renderType === 'tag' || section.theme?.itemsRenderType === 'tag'
				? '_item-tag'
				: ''}"
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

				if (isEdit) {
					setTimeout(() => {
						let editEl = document.getElementById(`section-edit-${item.id}`);
						if (editEl) {
							editEl.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
							editEl.classList.add('!outline-purple-300');
							editEl.classList.add('!outline-2');
							editEl.classList.add('!outline');

							setTimeout(() => {
								editEl.classList.remove('!outline-purple-300');
								editEl.classList.remove('!outline-2');
								editEl.classList.remove('!outline');
							}, 1000);
						}
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
				: null}
			style={`-webkit-column-break-inside: avoid; scroll-margin-top: 40px;  ${`background-color: ${
				(!item.theme?.isTransparent &&
					!section.theme?.areItemsTransparent &&
					(section.theme?.backgroundColor ||
						page.theme?.sectionItemBackgroundColor ||
						page.parentPage?.theme?.sectionItemBackgroundColor)) ||
				'none'
			};`}`}
		>
			{#if item.interactiveOptions}
				<div
					class="hidden group-hover:flex absolute left-0 top-0 w-full h-full bg-black/50 items-center justify-center"
					style="z-index: 11"
				>
					<RenderInteractiveOptions
						direction="vertical"
						size={item.pricing ? 'large' : 'normal'}
						bind:sectionItem={item.interactiveOptions}
						parentSectionId={section.id}
						bind:page
						itemClass={`${true ? 'p-2 mr-4' : 'p-4 mr-4'}`}
						bind:isEdit
						bind:isEmbed
					/>
				</div>
			{/if}
			{#if isEdit && $sectionToEdit?.id === section.id}
				<div class="hidden group-hover:block absolute right-0" style="z-index: 20;">
					<div
						class="cursor-pointer bg-purple-300 hover:bg-purple-200 rounded-full w-[30px] h-[30px] flex justify-center items-center m-4"
						on:click={() => ($selectedSectionItem = item)}
					>
						⚙️
					</div>
				</div>
			{/if}

			{#if item.theme?.bgPattern}
				<div
					class="absolute top-0 left-0 w-full h-full pattern-size-4 rounded-xl pattern-{item.theme
						.bgPattern} {page.theme?.theme === 'dark'
						? 'pattern-white pattern-bg-black'
						: 'pattern-black pattern-bg-white'} [mask-image:radial-gradient(52%_85%_at_top_center,white,transparent)]"
					style="opacity: 0.1;"
				/>
			{/if}

			{#if item.bgImageUrl || section.theme?.itemsBgImageUrl}
				<RenderUrl
					url={item.bgImageUrl || section.theme?.itemsBgImageUrl}
					imgClass={'absolute left-0 top-0 w-full h-full object-cover rounded-xl'}
					style="z-index: 0;"
				/>

				{#if !item.theme?.isNotBgImageDimmed && !section.theme?.areNotItemsBgImageDimmed}
					<div
						class="absolute top-0 left-0 w-full h-full rounded-xl"
						style="background-color: {page.theme?.theme === 'dark'
							? 'rgba(0,0,0,0.85)'
							: 'rgba(255,255,255,.85)'}; z-index: 1;"
					/>
				{/if}
			{/if}

			<div
				class="{item.theme
					?.backgroundColor} flex flex-col relative z-10 justify-between {section.columns > 1
					? 'h-full'
					: ''} grid-cols-1 {section.columns > 1
					? 'block'
					: 'grid'} sm:grid-cols-{section.columns === 1 && item.imageUrl && section.items.length > 1
					? 2
					: ''} w-full {section.columns > 1
					? `${section.carousel ? 'shadow-md' : ''} rounded-2xl`
					: ''}  {section.columns > 1 ? 'items-stretch' : 'items-center'} content-start {item.theme
					?.isOppositeColors ||
				section.theme?.areItemsOppositeColors ||
				((item.theme?.isTransparent || section.theme?.areItemsTransparent) &&
					(section.theme?.isOppositeColors || section.theme?.areItemsOppositeColors))
					? '_bg-opposite'
					: ''}"
				style="{section.columns === 1 && section.items.length === 1 && !item.imageUrl
					? 'margin-bottom: -64px;'
					: ''} background-color: {(!item.theme?.isTransparent &&
					!section.theme?.areItemsTransparent &&
					(item.theme?.backgroundColor ||
						section.theme?.itemsBackgroundColor ||
						getThemeValue(page, 'sectionItemBackgroundColor'))) ||
					'none'};"
			>
				{#if item.title || item.description || item.emoji || section.theme?.itemsDefaultEmoji}
					<div
						class="flex section-item-padding w-full h-full flex-col  {(item.theme?.isNoPadding ||
							section.theme?.areItemsNoPadding) &&
						(item.theme?.isTransparent || section.theme?.areItemsTransparent)
							? 'sm:pr-8'
							: `${
									item.renderType === 'tag' || section.theme?.itemsRenderType === 'tag'
										? 'px-2 sm:px-6 py-2 sm:py-4'
										: 'px-6 py-6'
							  } ${
									section.columns > 3 ? 'sm:px-5' : 'sm:px-8'
							  }`} text-left self-center {section.columns == 1 && i % 2 === 1
							? ''
							: ''} {section.columns === 1 &&
							(!item.imageUrl || section.items.length === 1) &&
							'mx-auto'}
							{((item.theme?.verticalAlign || section.theme?.itemsVerticalAlign) &&
							`justify-${item.theme?.verticalAlign || section.theme?.itemsVerticalAlign}`) ||
							'justify-between'}
							"
					>
						{#if section.theme?.areItemsIncludeStars}
							<div class="flex mb-4">
								{#each _.range(0, 5) as repeat}
									<svg
										width="15"
										height="15"
										viewBox="0 0 15 15"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										><path
											d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
											fill={page.theme.accentColor}
										/></svg
									>
								{/each}
							</div>
						{/if}

						<div
							class="max-w-[600px] flex flex-col {section.theme?.itemsRenderType === 'tag' ||
							section.theme?.itemsRenderType === 'testimonial'
								? ''
								: 'gap-y-3'} {section.theme?.itemsRenderType === 'testimonial'
								? '_testimonial'
								: ''}"
						>
							{#if item.title || item.emoji || section.theme?.itemsDefaultEmoji}
								{#if item.renderType === 'testimonial' || section.theme?.itemsRenderType === 'testimonial'}
									<div
										class="flex items-center {section.theme.areTitlesReversed
											? 'order-last mt-3'
											: 'mb-3'}"
									>
										<div class="mr-2 flex items-center">
											<Emoji
												emoji={item.emoji || section.theme?.itemsDefaultEmoji}
												color={item.iconColor || section.theme?.itemsIconColor}
												bgColor={item.emojiBgColor || section.theme?.itemsEmojiBgColor}
												class="rounded-full text-3xl"
												width={48}
												alt={'Testimonial user avatar'}
												theme={page.parentPage?.theme?.theme || page?.theme?.theme || 'light'}
											/>
										</div>
										<div>
											<h3
												class="_item-description section-item-description"
												style="font-weight: bold;"
											>
												<ContentEditableIf
													class=""
													bind:innerHTML={item.title}
													condition={isEdit}
												/>
											</h3>

											{#if item.label}
												<div class="_color-item-description section-item-label text-xs">
													<ContentEditableIf
														class=""
														bind:innerHTML={item.label}
														condition={isEdit}
													/>
												</div>
											{/if}
										</div>
									</div>
								{/if}

								<div>
									{#if item.renderType === 'testimonial' || section.theme?.itemsRenderType === 'testimonial'}{:else}
										{#if (item.emoji || section.theme?.itemsDefaultEmoji) && !item.theme?.isIconLeft && !section.theme?.areIconsLeft && item.renderType !== 'tag' && section.theme?.itemsRenderType !== 'tag'}
											<div
												class="{emojiStyle[section.columns]} _section-img mr-2 mb-3 {item.theme
													?.align === 'center' || section.theme?.itemsAlign === 'center'
													? 'text-center'
													: ''}"
											>
												{#key item.theme?.emojiSizePx + section.theme?.itemsEmojiSizePx}
													<Emoji
														emoji={item.emoji || section.theme?.itemsDefaultEmoji}
														color={item.iconColor || section.theme?.itemsIconColor}
														bgColor={item.emojiBgColor || section.theme?.itemsEmojiBgColor}
														class="text-2xl"
														width={'auto'}
														height={item.theme?.emojiSizePx ||
															section.theme?.itemsEmojiSizePx ||
															30}
														mobileWidth={26}
														theme={page.parentPage?.theme?.theme || page?.theme?.theme || 'light'}
													/>
												{/key}
											</div>
										{/if}

										{#if !item.theme?.isInlineTitle && !section.theme?.areInlineTitles}
											<div
												class="flex {item.description
													? page?.theme?.containerWidth
														? 'mb-2'
														: 'mb-2 sm:mb-4'
													: ''} items-center {item.theme?.align === 'center' ||
												section.theme?.itemsAlign === 'center'
													? 'justify-center'
													: ''}"
											>
												{#if (item.emoji || section.theme?.itemsDefaultEmoji) && (item.theme?.isIconLeft || section.theme?.areIconsLeft || item.renderType === 'tag')}
													<div class="{emojiStyle[section.columns]} flex _section-img mr-2">
														{#key item.theme?.emojiSizePx + section.theme?.itemsEmojiSizePx}
															<Emoji
																emoji={item.emoji || section.theme?.itemsDefaultEmoji}
																color={item.iconColor || section.theme?.itemsIconColor}
																bgColor={item.emojiBgColor || section.theme?.itemsEmojiBgColor}
																class="text-xl"
																width={item.theme?.emojiSizePx || section.theme?.itemsEmojiSizePx
																	? item.theme?.emojiSizePx || section.theme?.itemsEmojiSizePx
																	: item.theme?.titleSize === 'small' ||
																	  section.theme?.itemsTitleSize === 'small'
																	? 16
																	: item.theme?.titleSize === 'large' ||
																	  section.theme?.itemsTitleSize === 'large'
																	? 28
																	: 20}
																theme={page.parentPage?.theme?.theme ||
																	page?.theme?.theme ||
																	'light'}
															/>
														{/key}
													</div>
												{/if}
												<h3
													class="{headerTextStyle(item)[
														section.columns
													]} _item-title section-item-title {section.renderType === 'pricing'
														? 'mt-2'
														: ''}"
												>
													{#if item.planName}
														<ContentEditableIf
															class={item.theme?.align === 'center' ||
															section.theme?.itemsAlign === 'center'
																? 'text-center'
																: ''}
															bind:innerHTML={item.planName}
															condition={isEdit}
														/>
													{:else}
														<ContentEditableIf
															class={item.theme?.align === 'center' ||
															section.theme?.itemsAlign === 'center'
																? 'text-center'
																: ''}
															bind:innerHTML={item.title}
															condition={isEdit}
														/>
													{/if}
												</h3>
											</div>
										{/if}
									{/if}

									{#if (item.description || item.title || item.icon) && !item.pricing}
										<div
											class="{descriptionStyle[section.columns]}  whitespace-pre-wrap  {item.theme
												?.align === 'center' || section.theme?.itemsAlign === 'center'
												? 'text-center'
												: ''}"
										>
											{#if item.title && (item.theme?.isInlineTitle || section.theme?.areInlineTitles)}
												{#if (item.emoji || section.theme?.itemsDefaultEmoji) && (item.theme.isIconLeft || section.theme?.areIconsLeft || item.renderType === 'tag')}
													{#key item.theme?.emojiSizePx + section.theme?.itemsEmojiSizePx}
														<Emoji
															emoji={item.emoji || section.theme?.itemsDefaultEmoji}
															color={item.iconColor || section.theme?.itemsIconColor}
															bgColor={item.emojiBgColor || section.theme?.itemsEmojiBgColor}
															class="text-xl"
															width={item.theme?.emojiSizePx || section.theme?.itemsEmojiSizePx
																? item.theme?.emojiSizePx || section.theme?.itemsEmojiSizePx
																: item.theme?.titleSize === 'small' ||
																  section.theme?.itemsTitleSize === 'small'
																? 16
																: item.theme?.titleSize === 'large' ||
																  section.theme?.itemsTitleSize === 'large'
																? 28
																: 20}
															theme={page.parentPage?.theme?.theme || page?.theme?.theme || 'light'}
														/>{/key}{/if}<ContentEditableIf
													class="_inline_title _item-title section-item-title sm:inline-block mb-1 font-medium"
													bind:innerHTML={item.title}
													condition={isEdit}
												/><span class="hidden sm:inline">&nbsp;</span>{/if}<ContentEditableIf
												class="_item-description section-item-description {section.isDatabase
													? '_line-clamp-4 hover:line-clamp-5'
													: `${section.theme?.areInlineTitles ? 'inline' : 'inline-block'}`}"
												bind:innerHTML={item.description}
												condition={isEdit}
											/>
										</div>
									{/if}
								</div>

								<!-- For every section besides pricing render buttons near text -->
								{#if item.interactiveRenderType && section.renderType !== 'pricing'}
									<div class={page?.theme?.containerWidth ? 'py-4' : 'py-4'}>
										<RenderInteractiveOptions
											class={`${
												(section.columns === 1 &&
													(section.interactiveRenderType === 'single_choice' ||
														section.interactiveRenderType === 'multiple_choice')) ||
												item.theme?.align === 'center' ||
												section.theme?.itemsAlign === 'center'
													? 'justify-center'
													: 'justify-start'
											} ${item.pricing ? 'w-full' : ''}`}
											size={item.pricing ? 'large' : 'normal'}
											bind:sectionItem={item}
											parentSectionId={section.id}
											bind:page
											itemClass={`${true ? 'p-2 mr-4' : 'p-4 mr-4'}`}
											bind:isEdit
											bind:isEmbed
										/>
									</div>
								{/if}

								{#if item.tagsStr}
									<div
										class="my-4 flex flex-wrap gap-2 {item?.theme?.align === 'center' ||
										section.theme?.itemsAlign === 'center'
											? 'justify-center'
											: ''}"
									>
										{#each item.tagsStr.split(',') as tag}
											<div
												class="flex items-center px-3 py-1 text-sm opacity-80 rounded-full inline ring ring-1 {getEmojiTheme(
													{ item }
												) === 'dark'
													? 'ring-zinc-700'
													: 'ring-zinc-200'} bg-black"
												style={page.parentPage?.theme?.theme || page.theme?.theme === 'dark'
													? 'background: rgba(255,255,255,.1); border: 1px rgba(255, 255,255, .3) solid;'
													: 'background: rgba(0,0,0,.1); border: 1px rgba(0, 0, 0, .3) solid;'}
											>
												{#if !section.isDatabase}
													{#key item.theme}
														<Emoji
															class="block mr-2"
															theme={getEmojiTheme({ item })}
															width={14}
															emoji={'feather:check'}
														/>
													{/key}
												{/if}
												{tag}
											</div>
										{/each}
									</div>
								{/if}

								{#if item.pricing}
									<div>
										<div class="flex items-end {item.pricing.per === 'one-time' ? 'mb-6' : 'mb-2'}">
											{#if item.pricing.per !== 'one-time'}
												<div class="text-3xl sm:text-4xl font-bold mr-2">
													{toDollars(getMonthlyAmount(item.pricing))}
												</div>
												{#if item.pricing.amount}
													<div class="text-lg opacity-70">/month</div>
												{/if}
											{:else}
												<div class="text-3xl sm:text-4xl font-bold mr-2">
													{item.pricing.amount ? toDollars(item.pricing.amount * 100) : 'Free'}
												</div>
												{#if item.pricing.amount}
													<div class="text-lg opacity-70">
														/{item.pricing.per}
													</div>
												{/if}
											{/if}
										</div>
										{#if item.pricing.per !== 'one-time'}
											<div class="mb-4 opacity-70 text-sm">
												billed {billedLabels[item.pricing.per].toLowerCase()}
											</div>
										{/if}

										{#if item.description}
											<div class="mb-8 opacity-70">
												{@html item.description}
											</div>
										{/if}

										{#if item.pricing.benefitsStr || item.pricing.additionalBenefitsStr}
											<div class="mb-4 _color-item-description">
												{#if item.pricing.creditsAmount}
													<div class="my-1 sm:my-2 flex items-start">
														<Emoji
															theme={page.parentPage?.theme?.theme || page?.theme?.theme || 'light'}
															emoji={section.benefitsEmoji || 'feather:check'}
															class="mr-2"
															isOppositeColors={item.theme?.isOppositeColors ||
																section.theme?.areItemsOppositeColors}
														/>
														{item.pricing.creditsAmount}
														{item.pricing.creditsLabel || 'credits'}
													</div>
													<div class="my-1 sm:my-2 flex items-start">
														<Emoji
															theme={page.parentPage?.theme?.theme || page?.theme?.theme || 'light'}
															emoji={section.benefitsEmoji || 'feather:check'}
															class="mr-2"
															isOppositeColors={item.theme?.isOppositeColors ||
																section.theme?.areItemsOppositeColors}
														/>
														{toDollars((item.pricing.amount / item.pricing.creditsAmount) * 100)}
														/ {singularize(item.pricing.creditsLabel || 'credits')}
													</div>
												{/if}

												{#each (item.pricing.benefitsStr || '')
													.concat(item.pricing.additionalBenefitsStr ? `${item.pricing.benefitsStr ? '\n' : ''}${item.pricing.additionalBenefitsStr
																	.split(',')
																	.join('\n')}` : '')
													.split('\n') as benefit}
													<div
														class="my-1 sm:my-2 flex items-center {benefit.startsWith('-')
															? 'opacity-40'
															: ''}"
													>
														<Emoji
															theme={page.parentPage?.theme?.theme || page?.theme?.theme || 'light'}
															emoji={benefit.startsWith('-')
																? section.negativeBenefitsEmoji || 'feather:x'
																: section.benefitsEmoji || 'feather:check'}
															class="mr-2"
															isOppositeColors={item.theme?.isOppositeColors ||
																section.theme?.areItemsOppositeColors}
														/>
														{benefit.startsWith('-') ? benefit.replace('-', '') : benefit}
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

										{#if item.pricing.prices?.length}
											{(item.pricing.amount = item.pricing.prices[0]?.amount) ? '' : ''}
											<div class="w-full flex items-center justify-between text-sm mb-2 mt-8">
												<div>
													Number of {item.pricing.creditsLabel || 'credits'}
												</div>
												<div>
													{item.pricing.creditsAmount}
												</div>
											</div>
											<RangeSlider
												class="my-6"
												values={item.pricing.prices.map((p) => p.creditsAmount)}
												onChange={(value) => {
													const plan = item.pricing.prices.find((p) => p.creditsAmount === value);
													item.pricing.additionalBenefitsStr = plan.benefitsStr;
													item.pricing.amount = plan.amount;
													item.pricing.creditsAmount = plan.creditsAmount;
													debugger;
													item.planName = plan.planName;
												}}
											/>
										{/if}
									</div>
								{/if}
							{/if}
						</div>

						<!-- For pricing only render buttons between item -->
						{#if item.interactiveRenderType && section.renderType === 'pricing'}
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
									bind:isEdit
									bind:isEmbed
								/>
							</div>
						{/if}
						<!--End-->

						{#if isShowAuthor}
							<div class="_item-description section-item-description mt-4">
								<ArticleAuthorLabel
									author={item.creator}
									publishedOn={item.createdOn}
									class="my-2"
									bind:page
								/>
							</div>
						{/if}
					</div>
				{/if}
				{#if !section.carousel && item.imageUrl}
					<div
						class="{section.theme?.areImagesReversed ||
						item.theme?.isReversedImage ||
						section.renderType === 'changelog' ||
						item.isService
							? `order-first ${
									item.theme?.isTransparent || section.theme?.areItemsTransparent ? 'mb-4' : ''
							  }`
							: `${item.theme?.isTransparent || section.theme?.areItemsTransparent ? 'mt-4' : ''}`}
															{section.columns === 1 && i % 2 === 0 ? 'sm:order-last-off' : ''} {section.isShowSource
							? 'px-4'
							: ''}"
					>
						<RenderUrlWithBackground
							aspectRatio={section.theme?.imageAspectRatio || item.theme?.imageAspectRatio}
							urlImgClass="w-full object-cover h-auto {section.imageClass ||
								''}  mx-auto {section.columns === 1 ? '' : ''}  {section.items.length === 1
								? ''
								: ''} {isGif(item.imageUrl) ? 'w-full object-cover' : ''} {section.isShowSource ||
							(!item.title && !item.description)
								? 'rounded-lg'
								: section.theme?.areImagesReversed ||
								  item.theme?.isReversedImage ||
								  section.renderType === 'changelog' ||
								  item.isService
								? 'rounded-t-lg'
								: 'rounded-b-lg'}
																 {section.theme?.isScrollImageOnHover
								? 'transition-all ease-in-out duration-1000 object-top group-hover:object-bottom'
								: ''}  {item.interactiveOptions ? 'group-hover:scale-105 transition' : ''}"
							imageUrl={item.imageUrl}
							imageBackgroundUrl={item.imageBackgroundUrl || section.theme?.itemsImageBackgroundUrl}
						/>
					</div>
				{/if}

				{#if item.syncPage?.metadata?.fullAmount}
					<hr class="w-full  opacity-30" />

					<div class="flex items-end p-4 sm:px-8">
						<div class="text-2xl font-bold ">
							{toDollars(item.syncPage?.metadata?.fullAmount)}
						</div>
						{#if item.syncPage?.metadata?.payPer && item.syncPage?.metadata?.payPer !== 'one-time'}
							<div class="ml-2 opacity-50">
								/ {item.syncPage?.metadata?.payPer}
							</div>
						{/if}
					</div>
				{/if}

				{#if section.isShowSource}
					<div class="px-4 pb-4 {item.imageUrl ? 'pt-4' : ''}">
						<hr class="mb-4 opacity-30" />

						<div class="flex justify-between items-center text-sm opacity-80">
							{moment(item.publishedOn || item.createdOn).format('MMM DD, YYYY')}

							<div>
								<SourceLogo theme={page?.theme?.theme || 'light'} bind:url={item.url} />
							</div>
						</div>
					</div>
				{/if}
			</div>
		</svelte:element>
	</div>
{/if}

<script>
	import moment from 'moment';
	import _ from 'lodash';
	import { post } from 'lib/api';
	import RenderUrlWithBackground from 'lib/components/RenderUrlWithBackground.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';

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

	let clazz = '';
	export { clazz as class };

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
</script>

{#if item.isShown || _.isUndefined(item.isShown)}
	<div
		class="{clazz} break-inside-avoid {section.isMasonryGrid
			? 'mb-6'
			: 'mb-2'} sm:col-span-{item.colSpan || 1} sm:row-span-{item.rowSpan ||
			1} {section.renderType === 'carousel'
			? `min-w-[300px] sm:min-w-0 cursor-pointer`
			: ''} {$selectedSectionItem?.id === item.id ? 'outline outline-4 outline-purple-300' : ''}"
		class:pt-16={section.isFunkyGrid && i === 1}
		style="{section.isFlexGrid && section.maxWidthPx
			? `max-width: ${section.maxWidthPx}px;`
			: ''} {section.isFlexGrid && section.minWidthPx ? `min-width: ${section.minWidthPx}px;` : ''}"
	>
		<a
			href={item.url && !item.interactiveRenderType ? item.url : null}
			target={item.url?.startsWith('http') ? '_blank' : ''}
			id={item.feedItemId ? `feed-${item.feedItemId}` : ''}
			class="_section-item group block relative {item.bgImageUrl
				? '_bg-image'
				: ''}  {item.className || ''} {item.isFeatured ? '_highlighted' : ''} {section.theme
				?.isItemsTransparent || item.theme?.isTransparent
				? '_transparent'
				: 'rounded-lg sm:rounded-xl'} {item.url && !item.interactiveRenderType
				? '_interactive'
				: ''} h-full {$heatmap ? '' : 'overflow-hidden'} {isEdit
				? 'hover:outline outline-4 outline-purple-200'
				: ''}  {item.renderType === 'tag' ? '_item-tag' : ''}"
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
			style="-webkit-column-break-inside: avoid; scroll-margin-top: 40px; {`background-color: ${
				section.theme?.backgroundColor ||
				page.theme?.sectionItemBackgroundColor ||
				page.parentPage?.theme?.sectionItemBackgroundColor ||
				'none'
			};`} "
		>
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
					?.isOppositeColors
					? '_bg-opposite'
					: ''}"
				style="{section.columns === 1 && section.items.length === 1 && !item.imageUrl
					? 'margin-bottom: -64px;'
					: ''} background-color: {item.theme?.backgroundColor || 'none'};"
			>
				{#if item.title || item.description || item.emoji}
					<div
						class="flex w-full h-full flex-col justify-between {item.theme?.isTransparent
							? 'sm:pr-8'
							: page?.theme?.containerWidth === 900
							? 'p-4'
							: `px-6 ${item.renderType === 'tag' ? 'py-4' : 'py-5'} ${
									section.columns > 3 ? 'sm:px-5' : section.columns > 2 ? 'sm:px-6' : 'sm:px-8'
							  } ${
									item.renderType === 'tag' ? 'sm:py-4' : 'sm:py-6'
							  }`} text-left self-center order-none-off {section.columns == 1 && i % 2 === 1
							? 'sm:order-last-off'
							: ''} {section.columns === 1 &&
							(!item.imageUrl || section.items.length === 1) &&
							'mx-auto'}"
						class:order-last-off={i % 2 === 0}
					>
						<div class="max-w-[600px]">
							{#if item.title || item.emoji}
								{#if item.renderType === 'testimonial'}
									<div class="flex items-center mb-3">
										<div class="mr-2">
											<Emoji
												bind:emoji={item.emoji}
												bind:color={item.iconColor}
												bind:bgColor={item.emojiBgColor}
												class="rounded-full text-3xl"
												width={48}
												theme={page.parentPage?.theme?.theme || page?.theme?.theme || 'light'}
											/>
										</div>
										<div>
											<h2 class="_item-description" style="font-weight: bold;">
												<ContentEditableIf
													class=""
													bind:innerHTML={item.title}
													condition={isEdit}
												/>
											</h2>
											{#if item.label}
												<div class="_item-description">
													<ContentEditableIf
														class=""
														bind:innerHTML={item.label}
														condition={isEdit}
													/>
												</div>
											{/if}
										</div>
									</div>
								{:else}
									{#if item.emoji && !item.theme?.isIconLeft && item.renderType !== 'tag'}
										<div
											class="{emojiStyle[section.columns]} _section-img mr-2 mb-4 {item.theme
												?.align === 'center'
												? 'text-center'
												: ''}"
										>
											{#key item.theme?.emojiSizePx}
												<Emoji
													bind:emoji={item.emoji}
													bind:color={item.iconColor}
													bind:bgColor={item.emojiBgColor}
													class="text-2xl"
													width={'auto'}
													height={item.theme?.emojiSizePx || 30}
													mobileWidth={26}
													theme={page.parentPage?.theme?.theme || page?.theme?.theme || 'light'}
												/>
											{/key}
										</div>
									{/if}

									{#if !item.theme?.isInlineTitle}
										<div
											class="flex {item.description
												? page?.theme?.containerWidth
													? 'mb-2'
													: 'mb-2 sm:mb-4'
												: ''} items-center {item.theme?.align === 'center' ? 'justify-center' : ''}"
										>
											{#if item.emoji && (item.theme?.isIconLeft || item.renderType === 'tag')}
												<div class="{emojiStyle[section.columns]} flex _section-img mr-2">
													<Emoji
														bind:emoji={item.emoji}
														bind:color={item.iconColor}
														bind:bgColor={item.emojiBgColor}
														class="text-xl"
														width={item.theme?.emojiSizePx
															? item.theme?.emojiSizePx
															: item.theme?.titleSize === 'small'
															? 16
															: item.theme?.titleSize === 'large'
															? 28
															: 20}
														theme={page.parentPage?.theme?.theme || page?.theme?.theme || 'light'}
													/>
												</div>
											{/if}
											<h2 class="{headerTextStyle(item)[section.columns]} _item-title ">
												<ContentEditableIf
													class={item.theme?.align === 'center' ? 'text-center' : ''}
													bind:innerHTML={item.title}
													condition={isEdit}
												/>
											</h2>
										</div>
									{/if}
								{/if}

								{#if (item.description || item.title || item.icon) && !item.pricing}
									<h3
										class="{descriptionStyle[section.columns]}  whitespace-pre-wrap  {item.theme
											?.align === 'center'
											? 'text-center'
											: ''}"
									>
										{#if item.title && item.theme?.isInlineTitle}
											{#if item.emoji && (item.theme.isIconLeft || item.renderType === 'tag')}
												<Emoji
													bind:emoji={item.emoji}
													bind:color={item.iconColor}
													bind:bgColor={item.emojiBgColor}
													class="text-xl"
													width={item.theme?.emojiSizePx || item.theme?.titleSize === 'small'
														? 16
														: item.theme?.titleSize === 'large'
														? 28
														: 20}
													theme={page.parentPage?.theme?.theme || page?.theme?.theme || 'light'}
												/>{/if}<ContentEditableIf
												class="_inline_title _item-title sm:inline mb-1 sm:mb-0 font-medium"
												style="color: {page.theme?.theme === 'dark' ? '#ffffff' : '#111111'};"
												bind:innerHTML={item.title}
												condition={isEdit}
											/><span class="hidden sm:inline">&nbsp;</span>{/if}<ContentEditableIf
											class="_item-description {section.isDatabase
												? '_line-clamp-4 hover:line-clamp-5'
												: 'sm:inline inline'}"
											bind:innerHTML={item.description}
											condition={isEdit}
										/>
									</h3>
								{/if}

								<!-- For every section besides pricing render buttons near text -->
								{#if item.interactiveRenderType && section.renderType !== 'pricing'}
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

								{#if item.tagsStr}
									<div
										class="my-4 mt-6 flex flex-wrap gap-2 {item?.theme?.align === 'center'
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
									<div class="flex items-end mt-4 mb-4">
										<div class="text-3xl sm:text-4xl font-bold mr-2">
											{item.pricing.amount ? toDollars(item.pricing.amount * 100) : 'Free'}
										</div>
										{#if item.pricing.amount}
											<div class="text-lg opacity-70">
												/{item.pricing.per}
											</div>
										{/if}
									</div>
									<div class="mb-8 opacity-70">
										{@html item.description}
									</div>

									{#if item.pricing.benefitsStr}
										<div class="mb-4 _section-description">
											{#each item.pricing.benefitsStr.split('\n') as benefit}
												<div class="my-1 sm:my-2 flex items-center">
													<Emoji
														theme={page.parentPage?.theme?.theme || page?.theme?.theme || 'light'}
														emoji={section.benefitsEmoji || 'feather:check'}
														class="mr-2"
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
							<div class="_item-description mt-4">
								<ArticleAuthorLabel class="my-2" bind:page />
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
							? `order-first ${item.theme?.isTransparent ? 'mb-4' : ''}`
							: `${item.theme?.isTransparent ? 'mt-4' : ''}`}
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
								: ''}
																"
							imageUrl={item.imageUrl}
							imageBackgroundUrl={item.imageBackgroundUrl}
						/>
					</div>
				{/if}

				{#if item.syncPage?.metadata?.fullAmount}
					<hr class="w-full  opacity-30" />

					<div class="flex items-end p-4 sm:px-8">
						<h3 class="text-2xl font-bold ">
							{toDollars(item.syncPage?.metadata?.fullAmount)}
						</h3>
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
		</a>
	</div>
{/if}

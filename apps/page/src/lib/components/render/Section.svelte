<script>
	import _ from 'lodash';
	import { fade, fly } from 'svelte/transition';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import RenderFAQ from '$lib/components/render/FAQ.svelte';
	import refreshConditionsTimestamp from '$lib/stores/refreshConditionsTimestamp';

	import RenderTestimonials from '$lib/components/render/Testimonials.svelte';
	import RenderMomentumFeed from '$lib/components/render/MomentumFeed.svelte';
	import RenderMomentumCollection from '$lib/components/render/MomentumCollection.svelte';
	import RenderInteractiveOptions from '$lib/components/render/InteractiveOptions.svelte';
	import RenderServiceChat from '$lib/components/render/ServiceChat.svelte';
	import RenderNewsletter from '$lib/components/render/Newsletter.svelte';
	import ContentEditableIf from 'lib/components/ContentEditableIf.svelte';

	import Emoji from '$lib/components/render/Emoji.svelte';
	import isGif from 'lib/helpers/isGif';
	import FeatherIcon from '$lib/components/FeatherIcon.svelte';

	export let section;
	let clazz = section?.renderType === 'article' ? 'py-4' : 'py-4 sm:pb-16';

	export let page;
	export let themeStyles = {};
	export let isSkipHeader = false;
	export let isEdit = false;

	export { clazz as class };
	export let style = null;

	const headerTextStyle = (item) => {
		return {
			1: item.imageUrl ? 'text-lg' : 'sm:text-4xl text-3xl',
			2: 'text-lg',
			3: 'text-lg _text-line-height',
			4: ''
		};
	};

	const descriptionStyle = {
		1: 'text-lg _text-line-height',
		2: 'text-lg _text-line-height',
		3: '',
		4: ''
	};

	const emojiStyle = {
		1: 'text-4xl mb-4',
		2: 'text-3xl mb-4',
		3: 'text-xl',
		4: 'text-lg _text-line-height'
	};

	let focusEmailInput = () => {
		let inputs = document.getElementsByClassName('_email-input');
		let input = inputs[0];

		input.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
		input.focus();
	};

	let carouselKey;

	let selectCarouselItem = (item) => {
		item.isSelected = true;
		carouselKey = +new Date();

		section.items = section.items.map((si) => {
			return {
				...si,
				isSelected: si === item
			};
		});
	};

	if (section.renderType === 'carousel') {
		section.carousel = {};
	}

	if (section.carousel && section.items?.length) {
		selectCarouselItem(section.items[0]);
	}

	section.isShown = !section.isHidden;

	let refreshConditions = () => {
		section.isShown = !section.isHidden;
		if (!_.isEmpty(page.variablesValues) && !section.isHidden && section.conditions) {
			_.each(section.conditions, (c) => {
				if (c.minVisits) {
					if (page.variablesValues.visitsCount < c.minVisits) {
						section.isShown = false;
					}
				} else if (c.maxVisits) {
					if (page.variablesValues.visitsCount > c.maxVisits) {
						section.isShown = false;
					}
				} else if (c.interactiveAnswer) {
					let myAnswer =
						JSON.parse(localStorage[`ANSWER_${c.interactiveAnswer.sectionId}`] || null) || null;

					if (!myAnswer || myAnswer.emoji !== c.interactiveAnswer.value) {
						section.isShown = false;
					}
				}
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

		section.items = [...section.items];

		carouselKey = +new Date();
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

<div
	class="col-span-1 col-span-2 col-span-3 col-span-4 col-span-5 col-span-6 col-span-7 col-span-8 col-span-9 col-span-10 col-span-11 col-span-12"
/>
<div
	class="sm:col-span-1 sm:col-span-2 sm:col-span-3 sm:col-span-4 sm:col-span-5 sm:col-span-6 sm:col-span-7 sm:col-span-8 sm:col-span-9 sm:col-span-10 sm:col-span-11 sm:col-span-12"
/>

<div
	class="row-span-1 row-span-2 row-span-3 row-span-4 row-span-5 row-span-6 row-span-7 row-span-8"
/>

{#if section.isShown}
	<div
		class=" _section-container {section.type} {section.renderType} {section.renderType !== 'article'
			? 'p-8 sm:pt-16'
			: 'px-8'} {clazz}"
		style={style || ''}
		in:fly={{ y: 50 }}
	>
		{#if !isSkipHeader && (section.title || section.description || section.imageUrl || section.emoji)}
			<div
				class="relative w-full {page.theme.isTitlesLeft || section.renderType === 'article'
					? 'sm:text-left'
					: 'text-center'} {page.renderType === 'article' ? 'px-8' : ''}"
			>
				{#if section.emoji}
					<div
						class="{emojiStyle[1]} {page.theme?.isTitlesLeft
							? `absolute right-12 ${section.descripton ? 'top-30' : 'top-19'}`
							: ''} {page.theme?.isTitlesHuge ? 'text-[70px]' : ''}"
					>
						<Emoji color={'white'} class="grayscale" bind:emoji={section.emoji} />
					</div>
				{/if}

				{#if section.subtitle}
					<div class="text-sm mb-4 opacity-90" style="font-weight: 500;">
						<ContentEditableIf class="" bind:innerHTML={section.subtitle} condition={isEdit} />
					</div>
				{/if}

				{#if section.title}
					<h2
						class="text-3xl {page.theme.isTitlesHuge
							? 'sm:text-6xl font-medium mb-8'
							: 'sm:text-4xl font-semibold'} mb-4 sm:max-w-[768px]  {page.theme.isTitlesLeft ||
						section.renderType === 'article'
							? ''
							: 'sm:mx-auto'}"
					>
						<ContentEditableIf
							class="_item-title mb-2"
							bind:innerHTML={section.title}
							condition={isEdit}
						/>
					</h2>
				{/if}

				{#if section.description}
					<h3
						class="{page.theme.isTitlesHuge
							? 'text-xl leading-8'
							: 'text-lg font-medium'} whitespace-pre-wrap opacity-90 {section.renderType ===
						'article'
							? 'sm:max-w-[768px]'
							: page.theme.isTitlesLeft
							? 'sm:max-w-[712px]'
							: 'sm:max-w-[512px] sm:mx-auto'}"
					>
						<ContentEditableIf class="" bind:innerHTML={section.description} condition={isEdit} />
					</h3>
				{/if}

				{#if section.interactiveRenderType}
					<div class="sm:max-w-[600px] sm:mx-auto mt-8">
						<RenderInteractiveOptions class="justify-center" bind:sectionItem={section} bind:page />
					</div>
				{/if}

				{#if section.imageUrl}
					<div class="my-8">
						<RenderUrl
							class=""
							imgClass="mx-auto  {isGif(section.imageUrl) ? 'w-full object-cover' : ''}"
							url={section.imageUrl}
						/>
					</div>
				{/if}
			</div>
		{/if}

		{#if section.type === 'faq'}
			<RenderFAQ bind:section />
		{:else if section.type === 'testimonials'}
			<RenderTestimonials bind:section />
		{:else if section.type === 'momentum_collection'}
			<RenderMomentumCollection bind:section bind:page bind:themeStyles />
		{:else if section.type === 'momentum_feed'}
			<RenderMomentumFeed bind:page bind:themeStyles />
		{:else if section.type === 'service_chat'}
			<RenderServiceChat bind:page bind:section bind:themeStyles />
			<!-- {:else if section.type === 'newsletter'}
			<RenderNewsletter bind:page bind:section bind:themeStyles /> -->
		{:else if section.renderType === 'stepper'}
			<div class="relative">
				<div class="absolute ml-[50%] h-full w-[2px] bg-black" />
				{#each section.items as step, i}
					<div class="flex sm:w-[50%] p-8 {i % 2 ? 'sm:ml-[50%]' : 'justify-end text-right'}">
						<div>
							<ContentEditableIf
								class="text-xl mb-4 font-bold"
								bind:innerHTML={step.title}
								condition={isEdit}
							/>
							{#if step.description}
								<ContentEditableIf
									class="mt-4"
									bind:innerHTML={step.description}
									condition={isEdit}
								/>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{:else if section.items?.length}
			<div class="w-full">
				{#if section.renderType === 'carousel'}
					{#if !section.carouselType || section.carouselType === 'vertical'}
						<div>
							<div class="flex w-full justify-between">
								<div class="flex gap-8 mb-8">
									{#each section.items as item}
										<div
											class:opacity-40={!item.isSelected}
											class="cursor-pointer transition font-medium text-lg"
											on:click={() => selectCarouselItem(item)}
										>
											<ContentEditableIf class="" bind:innerHTML={item.title} condition={isEdit} />
										</div>
									{/each}
								</div>
								<div class="flex gap-4">
									<div
										class="opacity-40 hover:opacity-100 transition cursor-pointer"
										on:click={() => {
											selectPreviousItem();
										}}
									>
										<FeatherIcon
											on:click={() => {
												selectPreviousItem();
											}}
											name="arrow-left"
										/>
									</div>

									<div
										class="opacity-40 hover:opacity-100 transition cursor-pointer"
										on:click={() => {
											selectNextItem();
										}}
									>
										<FeatherIcon class="cursor-pointer" name="arrow-right" />
									</div>
								</div>
							</div>

							{#key carouselKey}
								<div in:fade>
									<RenderUrl
										class="aspect-og"
										imgClass="aspect-og object-cover"
										url={(section.items.find((i) => i.isSelected) || section.items[0]).imageUrl}
									/>
								</div>
							{/key}
						</div>
					{:else if section.carouselType === 'horizontal'}
						<div>
							<div class="_section-item w-full grid grid-cols-3 gap-4 mb-4 items-center">
								<div class="col-span-1">
									{#each section.items as item}
										<div
											class="cursor-pointer p-2 sm:p-6 transition {item.isSelected
												? ''
												: 'opacity-40 hover:opacity-100'}"
											on:click={selectCarouselItem(item)}
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
									{/each}
									<div class="flex gap-4 p-2 sm:p-6">
										<div
											class="opacity-40 hover:opacity-100 transition cursor-pointer"
											on:click={() => {
												selectPreviousItem();
											}}
										>
											<FeatherIcon
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
											<FeatherIcon name="arrow-down" />
										</div>
									</div>
								</div>

								<div class="col-span-2 p-8" in:fade>
									{#key carouselKey}
										<RenderUrl
											class="aspect-og"
											imgClass="aspect-og object-cover"
											url={(section.items.find((i) => i.isSelected) || section.items[0]).imageUrl}
										/>
									{/key}
								</div>
							</div>
						</div>
					{/if}

					<!--
						KLU:
						<div>
						{#each section.items as item}
							<div class="_section-item w-full grid grid-cols-3 gap-4 mb-4">
								<div class="p-4 sm:p-8 col-span-1">
									<Emoji bind:emoji={item.emoji} />
									<div class="_item-title mb-2">{@html item.title}</div>
									<div class="_item-description whitespace-pre-wrap">{@html item.description}</div>
								</div>

								{#if item.imageUrl}
									<RenderUrl
										class="col-span-2"
										imgClass="object-cover rounded-b-lg"
										url={item.imageUrl}
									/>
								{/if}
							</div>
						{/each}
					</div> -->
				{:else if section.columns === 1}
					{#each section.items as item}
						<div
							class="grid grid-cols-12 items-center {section.renderType === 'article'
								? 'mb-8'
								: 'mb-4'}"
						>
							<div
								class="sm:col-span-{item.colSpan || 12} {item.isReversed
									? 'order-last'
									: ''} {(!item.colSpan || item.colSpan === 12) && item.imageUrl ? 'mb-8' : ''}"
							>
								<div
									class="{section.renderType === 'article' ? 'sm:px-8' : 'p-4 sm:p-8'} col-span-1"
								>
									<!-- {#if item.emoji !== '✨'}
									<Emoji bind:emoji={item.emoji} />
								{/if} -->
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

								{#if item.interactiveAnswers?.length}
									<div class={page?.theme?.containerWidth ? 'p-4' : 'px-8 pb-4'}>
										<RenderInteractiveOptions
											bind:sectionItem={item}
											parentSectionId={section.id}
											bind:page
											itemClass={`${true ? 'p-2 mr-4' : 'p-4 mr-4'}`}
										/>
									</div>
								{/if}
							</div>
							<div
								class="sm:col-span-{!item.colSpan
									? 12
									: 12 - (item.title || item.description ? item.colSpan || 6 : 0) || 12} 
									
									{item.isReversed ? 'order-first' : ''}"
							>
								<RenderUrl
									class="col-span-2"
									imgClass="object-cover rounded-b-lg"
									url={item.imageUrl}
								/>
							</div>
						</div>
					{/each}
				{:else}
					<div
						class="sm:grid-cols-{section.columns}  gap-4 {section.columns > 1
							? 'items-stretch-or-not'
							: ''} {section.carousel ? 'flex overflow-x-auto sm:grid' : 'grid'}"
					>
						{#each section.items || [] as item, i}
							<a
								href={section.linkType === 'interactive' ? item.url : null}
								class="_section-item rounded-lg sm:rounded-xl {section.className ||
									''} col-span-{item.colSpan || 1} row-span-{item.rowSpan ||
									1} mb-8 {section.carousel
									? `min-w-[300px] sm:min-w-0 cursor-pointer ${
											item.isSelected ? '_selected' : '_not-selected'
									  }`
									: ''} {section.linkType === 'interactive' ? '_interactive' : ''}"
								on:click={() => {
									if (section.carousel) {
										selectCarouselItem(item);
									}
								}}
								style="-webkit-column-break-inside: avoid;"
							>
								<div
									class="flex flex-col justify-between {section.columns > 2
										? 'h-full'
										: ''} grid-cols-1 {section.columns > 1
										? 'block'
										: 'grid'} sm:grid-cols-{section.columns === 1 &&
									item.imageUrl &&
									section.items.length > 1
										? 2
										: ''} w-full {section.columns > 1
										? `bg-section ${section.carousel ? 'shadow-md' : ''} rounded-2xl`
										: ''}  {section.columns > 1 ? 'items-stretch' : 'items-center'} content-start"
									style={section.columns === 1 && section.items.length === 1 && !item.imageUrl
										? 'margin-bottom: -64px;'
										: ''}
								>
									<div
										class="flex w-full h-full flex-col justify-between {page?.theme?.containerWidth
											? 'p-4'
											: 'p-8'} text-left self-center order-none-off {section.columns == 1 &&
										i % 2 === 1
											? 'sm:order-last-off'
											: ''} {section.columns === 1 &&
											(!item.imageUrl || section.items.length === 1) &&
											'mx-auto'}"
										class:order-last-off={i % 2 === 0}
									>
										<div class="max-w-[600px]">
											{#if item.title}
												<div
													class="flex {page?.theme?.containerWidth
														? 'mb-2'
														: 'mb-4'} {section.columns < 3
														? 'flex-col items-start'
														: 'items-center'}"
												>
													{#if item.emoji}
														<div
															class="{emojiStyle[
																section.columns
															]} _section-img {item.emoji.startsWith('feather:')
																? ''
																: 'grayscale-emoji'} mr-2"
														>
															<Emoji bind:emoji={item.emoji} />
														</div>
													{/if}
													<h2 class="{headerTextStyle(item)[section.columns]} _item-title">
														<ContentEditableIf
															class=""
															bind:innerHTML={item.title}
															condition={isEdit}
														/>
													</h2>
												</div>
											{/if}

											{#if item.description}
												<h3
													class="{descriptionStyle[
														section.columns
													]} _item-description whitespace-pre-wrap"
												>
													<ContentEditableIf
														class=""
														bind:innerHTML={item.description}
														condition={isEdit}
													/>
												</h3>
											{/if}

											{#if item.pricing}
												<div class="flex items-end mt-4 mb-4">
													<div class="text-3xl font-bold mr-2">
														${item.pricing.amount?.toFixed(2) || '0'}
													</div>
													<div class="text-lg">
														/{item.pricing.per}
													</div>
												</div>
												{#if item.pricing.benefits}
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
														class={section.columns === 1 &&
														section.interactiveRenderType === 'single_choice'
															? 'justify-center'
															: 'justify-start'}
														bind:sectionItem={item}
														parentSectionId={section.id}
														bind:page
														itemClass={`${true ? 'p-2 mr-4' : 'p-4 mr-4'}`}
													/>
												</div>
											{/if}
										</div>
									</div>

									{#if !section.carousel && item.imageUrl}
										<div
											class="{section.pricing
												? 'order-none-off'
												: 'order-none-off'} {section.columns === 1 && i % 2 === 0
												? 'sm:order-last-off'
												: ''}"
										>
											<RenderUrl
												class=""
												imgClass="w-full aspect-og rounded-b-xl object-cover mx-auto {section.columns ===
												1
													? ''
													: ''}  {section.items.length === 1 ? '' : ''} {isGif(item.imageUrl)
													? 'w-full object-cover'
													: ''}"
												url={item.imageUrl}
											/>
										</div>
									{/if}
								</div>
							</a>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	</div>
{/if}

<style>
	._section-container.article {
		max-width: 768px;
		margin: 0 auto;
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
		filter: grayscale(0.8);
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

	._interactive:hover {
		@apply transition;
		border: 1px var(--accent-color) solid;
	}

	._selected .bg-section {
		background: white;
	}

	._not-selected .bg-section {
		background: #f6f5f4 !important;
		@apply transition;
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
</style>

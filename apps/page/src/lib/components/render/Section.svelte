<script>
	import { fade } from 'svelte/transition';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import RenderFAQ from '$lib/components/render/FAQ.svelte';
	import RenderTestimonials from '$lib/components/render/Testimonials.svelte';
	import RenderMomentumFeed from '$lib/components/render/MomentumFeed.svelte';
	import RenderInteractiveOptions from '$lib/components/render/InteractiveOptions.svelte';
	import Emoji from '$lib/components/render/Emoji.svelte';
	import isGif from 'lib/helpers/isGif';
	import FeatherIcon from '$lib/components/FeatherIcon.svelte';

	let clazz = 'py-4 sm:pb-16';

	export let section;
	export let page;
	export let themeStyles = {};

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

	if (section.carousel && section.items?.length) {
		selectCarouselItem(section.items[0]);
	}
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
<div class="row-span-1 row-span-2 row-span-3" />

<div class="_section-container {section.type} p-4" style={style || ''}>
	{#if section.title || section.description || section.imageUrl || section.emoji}
		<div class="w-full text-center py-4 sm:pt-16 text-center">
			{#if section.emoji}
				<div class={emojiStyle[1]}>
					<Emoji color={'white'} class="grayscale" bind:emoji={section.emoji} />
				</div>
			{/if}

			{#if section.subtitle}
				<div class="text-sm mb-4 opacity-90" style="font-weight: 500;">{section.subtitle}</div>
			{/if}

			{#if section.title}
				<h2 class="_title sm:text-4xl text-3xl font-bold mb-4 sm:max-w-[768px] sm:mx-auto">
					{@html section.title}
				</h2>
			{/if}

			{#if section.description}
				<h3
					class="{descriptionStyle[1]} whitespace-pre-wrap sm:max-w-[600px] sm:mx-auto description"
				>
					{@html section.description}
				</h3>
			{/if}

			{#if section.callToActionText || section.url}
				<a href={section.url || page.url} target="_blank" class="mt-8 button"
					>{section.callToActionText || 'Learn More'}
				</a>
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

			{#if section.interactiveAnswers?.length}
				<div class="sm:max-w-[600px] sm:mx-auto mt-8">
					<RenderInteractiveOptions
						class="justify-center"
						bind:sectionItem={section}
						bind:pageId={page._id}
					/>
				</div>
			{/if}
		</div>
	{/if}

	{#if section.type === 'faq'}
		<RenderFAQ bind:section />
	{:else if section.type === 'testimonials'}
		<RenderTestimonials bind:section />
	{:else if section.type === 'momentum_feed'}
		<RenderMomentumFeed bind:page bind:themeStyles />
	{:else if section.items?.length}
		<div class="w-full {clazz}">
			<div
				class="sm:grid-cols-{section.columns}  gap-4 {section.columns > 1
					? 'items-stretch-or-not'
					: ''} {section.carousel ? 'flex overflow-x-auto sm:grid' : 'grid'}"
			>
				{#each section.items || [] as item, i}
					<div
						class="_section-item rounded-lg sm:rounded-xl {section.className ||
							''} col-span-{item.colSpan || 1} row-span-{item.rowSpan || 1} mb-8 {section.carousel
							? `min-w-[300px] sm:min-w-0 cursor-pointer ${
									item.isSelected ? '_selected' : '_not-selected'
							  }`
							: ''}"
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
									: 'p-8'} text-left self-center order-none-off {section.columns == 1 && i % 2 === 1
									? 'sm:order-last-off'
									: ''} {section.columns === 1 &&
									(!item.imageUrl || section.items.length === 1) &&
									'mx-auto'}"
								class:order-last-off={i % 2 === 0}
							>
								<div class="max-w-[600px]">
									{#if item.title}
										<div
											class="flex {page?.theme?.containerWidth ? 'mb-2' : 'mb-4'} {section.columns <
											3
												? 'flex-col items-start'
												: 'items-center'}"
										>
											{#if item.emoji}
												<div
													class="{emojiStyle[section.columns]} _section-img {item.emoji.startsWith(
														'feather:'
													)
														? ''
														: 'grayscale-emoji'} mr-2"
												>
													<Emoji bind:emoji={item.emoji} />
												</div>
											{/if}
											<h2 class="{headerTextStyle(item)[section.columns]} _item-title">
												{@html item.title}
											</h2>
										</div>
									{/if}

									{#if item.description}
										<h3
											class="{descriptionStyle[
												section.columns
											]} _item-description whitespace-pre-wrap"
										>
											{@html item.description}
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
								</div>

								{#if item.url}
									<a
										href={item.url}
										target="_blank"
										class="section-button w-full text-center block text-[#8B786D] pt-4"
										>{item.callToActionText || 'Learn More'}
									</a>
								{:else if section.type === 'pricing'}
									{#if page.isCollectEmails}
										<button class="button w-full" on:click={focusEmailInput}
											>{item.callToActionText || page.callToAction}</button
										>
									{:else}
										<a
											class="button text-center block w-full"
											target="_blank"
											href={page.actionUrl}
										>
											{item.callToActionText || page.callToAction}
										</a>
									{/if}
								{/if}
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
										imgClass="w-full  mx-auto {section.columns === 1 ? '' : ''}  {section.items
											.length === 1
											? ''
											: ''} {isGif(item.imageUrl) ? 'w-full object-cover' : ''}"
										url={item.imageUrl}
									/>
								</div>
							{/if}

							{#if item.interactiveAnswers?.length}
								<div class={page?.theme?.containerWidth ? 'p-4' : 'p-8'}>
									<RenderInteractiveOptions
										class={section.columns === 1 ? 'justify-center' : 'justify-start'}
										bind:sectionItem={item}
										parentSectionId={section.id}
										bind:pageId={page._id}
										itemClass={`${true ? 'p-2 mr-4' : 'p-4 mr-4'}`}
									/>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>

			{#if section.carousel}
				{#key carouselKey}
					<div in:fade>
						<RenderUrl
							url={(section.items.find((i) => i.isSelected) || section.items[0]).imageUrl}
						/>
					</div>
				{/key}
			{/if}
		</div>
	{/if}
</div>

<style>
	button,
	.button {
		display: inline-block;
		border-radius: var(--button-radius);
		padding: 8px 16px;
		font-size: 18px;

		color: var(--button-color);
		background-color: var(--accent-color);
	}

	._item-title {
		font-weight: 600;
	}

	._item-title {
		font-size: var(--section-title-font-size);
		line-height: var(--section-title-line-height);
		/* margin-bottom: 16px; */
	}

	._item-description {
		font-weight: 400;
		font-size: 16px;
		color: var(--section-description-text-color);
	}

	.grayscale-emoji {
		filter: grayscale(0.8);
	}

	.description {
		font-size: 18px;
		line-height: 1.6;
		max-width: 512px;
		font-weight: 500;
		opacity: 0.9;
	}

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
</style>

<script>
	import _ from 'lodash';

	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import RenderInteractiveOptions from 'lib-render/components/render/InteractiveOptions.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import RenderUrlWithBackground from 'lib/components/RenderUrlWithBackground.svelte';
	import RenderArticleHeader from 'lib-render/components/render/ArticleHeader.svelte';
	import Emoji from 'lib/components/Emoji.svelte';
	import aboveTheFoldEl from 'lib-render/stores/aboveTheFoldEl';
	import ComaDragons from 'lib-render/components/animations/ComaDragons.svelte';
	import CanvasAnimation from 'lib-render/components/animations/CanvasAnimation.svelte';
	import Gradients from 'lib-render/components/gradients/index.svelte';
	import Background from 'lib-render/components/render/Background.svelte';
	import hexToRgba from 'lib/helpers/hexToRgba';
	import Emulator from 'lib-render/components/Emulator.svelte';
	import Popup from 'lib-render/components/Popup.svelte';
	import RenderBackgroundPattern from 'lib-render/components/render/BackgroundPattern.svelte';
	import typewriter from 'lib-render/use/typewriter';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';

	export let page;

	export let hero;
	export let isEmbed;
	export let isEdit;
	export let isCloneable;

	let isDemoPopupShown = false;

	let isMounted = false;

	onMount(() => {
		isMounted = true;
	});

	let maxHeight;

	if (page.renderType === 'article') {
		hero.theme.isVertical = true;
	}
	if (!hero.theme) {
		hero.theme = {};
	}

	let demoEl;

	let getHeroGradientColor = () => {
		if (hero.theme?.isOppositeColors) {
			return page.theme?.theme === 'dark' ? 'from-black to-black/50 ' : 'from-white to-white/50 ';
		} else {
			return page.theme?.theme === 'dark' ? 'from-white to-white/50 ' : 'from-black to-black/50 ';
		}
	};
</script>

<!-- 
{#if isDemoPopupShown}
	<Popup
		{page}
		isShown={isDemoPopupShown}
		maxWidth={1000}
		onClosed={() => {
			isDemoPopupShown = false;
		}}
	>
		<div class="origin-top-left bg-[#111111]">
			<div class="my-16 max-w-[600px] mx-auto scale-110 origin-top-left">
				<Emulator />
			</div>
		
		</div>
	</Popup>
{/if} -->

{#if hero.title || hero.subtitle || hero.demoUrl}
	<div
		class="relative {hero.theme?.isOverrideColors ? '_override-colors' : ''} {hero.theme
			?.isOppositeColors
			? '_bg-opposite'
			: ''}"
		style="z-index: 30; {hero.theme.isOverrideColors
			? `--section-bg-color: ${
					hero.theme.backgroundColor
			  }; --section-bg-color-opacity-50: ${hexToRgba(hero.theme.backgroundColor, 0.5)};`
			: ''} {hero.theme?.isOverrideColors ? `background: ${hero.theme?.backgroundColor};` : ''}
				"
	>
		{#if hero.bgImageUrl}
			{#if page.activeHero?.theme?.bgGradient?.type === 'custom'}
				<div
					class="absolute _gradient left-0 top-0 {isEdit ? 'w-full' : 'w-screen'} h-full "
					style="mask-image: linear-gradient(to top,transparent 3%, var(--background-color) 35%); z-index: 1;"
				>
					{@html page.activeHero?.theme?.bgGradient?.customHTML}
				</div>
			{/if}

			{#if !hero.theme.isNotBgImageDimmed}
				<div
					class="absolute top-0 left-0 {isEdit ? 'w-full' : 'w-screen'} h-full z-1"
					style="background-color: {page.theme?.theme === 'dark'
						? 'rgba(0,0,0,0.7)'
						: 'rgba(255,255,255,.7)'}; z-index: 1;"
				/>
			{/if}

			<RenderUrl
				class="absolute left-0 top-0 {isEdit
					? 'w-full'
					: 'w-screen'} h-full opacity-90 overflow-hidden z-0"
				isLazy={false}
				isAutoplay={!isEdit}
				imgClass="{isEdit ? 'w-full' : 'w-screen'} h-full {hero.theme?.bgImageObjectFit ===
				'contain'
					? 'object-contain'
					: hero.theme?.bgImageObjectFit === 'none'
					? 'object-none'
					: 'object-cover'} overflow-hidden"
				url={hero.bgImageUrl}
				maxWidth={hero.theme.bgImageLimitWidth}
			/>
		{/if}
		{#if isCloneable}
			<div
				class="absolute z-20 right-4 top-12 _bg-opposite p-2 rounded opacity-50 hover:opacity-100 cursor-pointer"
				on:click={() => {
					navigator.clipboard.writeText(JSON.stringify({ ...hero, _isHero: true }));

					showSuccessMessage('Copied Hero');
				}}
			>
				<div class="flex items-center text-sm ">
					<FeatherIcon
						class="mr-2"
						name="copy"
						size="20"
						theme={page?.theme?.theme === 'dark' ? 'light' : 'dark'}
					/> Copy Hero
				</div>
			</div>
		{/if}

		{#if hero.theme?.bgPattern}
			<RenderBackgroundPattern
				theme={hero.theme?.isOppositeColors
					? page.theme?.theme === 'dark'
						? 'light'
						: 'dark'
					: page.theme?.theme}
				bgPattern={hero.theme?.bgPattern}
				bgGradient={hero.theme?.bgGradient}
				accentColor={page.theme?.accentColor}
			/>
		{/if}

		{#if hero.theme?.bgPattern === 'cursors'}
			<ComaDragons />
		{/if}

		{#if hero.theme?.bgPattern === 'canvas'}
			<CanvasAnimation {isEdit} animationCode={hero.theme?.canvasAnimationCode} />
		{/if}

		{#if hero.theme?.bgPattern === 'stars'}
			<Background />
		{/if}

		<!-- <img
				class="absolute w-screen h-screen object-cover"
				src="https://thumbs.dreamstime.com/b/beautiful-view-garden-sky-realistic-photo-beautiful-view-garden-sky-photo-photo-was-originally-taken-me-259322267.jpg?w=992"
			/> -->

		{#if page.activeHero?.theme?.bgGradient?.type && page.activeHero?.theme?.bgGradient?.type !== 'custom'}
			<Gradients
				bind:page
				gradientType={page.activeHero?.theme?.bgGradient.type}
				customHTML={page.activeHero?.theme?.bgGradient?.customHTML}
			/>
		{/if}
		<div
			class="relative z-10 container pt-[60px] pb-[60px] _container-width mx-auto {((hero.theme
				?.isVertical ||
				(page.sections?.length && !hero.demoUrl && !hero.theme.isFullScreen)) &&
				hero.theme?.bgPattern !== 'cursors') ||
			page.renderType === 'service'
				? ''
				: 'min-h-screen sm:h-screen'} {hero.theme?.bgPattern === 'canvas' ? 'max-w-max' : ''}"
			style=""
		>
			<div
				bind:this={$aboveTheFoldEl}
				class="{hero.theme?.bgImage ? 'light-colors' : ''} {hero.theme?.isVertical
					? ''
					: ''} h-full py-16 sm:py-24 {!hero.testimonials?.length ? `flex items-center` : ''}"
				style={`${maxHeight ? `max-height: ${maxHeight}` : ''};`}
			>
				<div
					class="p-4 xl:p-0 flex h-full w-full {hero.demoUrl || hero.theme?.isLeft
						? `flex-col ${hero.theme?.isVertical ? '' : 'justify-between sm:flex-row'} items-center`
						: 'text-center items-center'}"
				>
					<div
						class="{hero.demoUrl || hero.theme?.isLeft
							? `w-full text-center ${
									hero.theme?.isVertical ? 'flex flex-col items-center mb-8' : 'sm:text-left'
							  }  ${
									hero.demoUrl ? '' : page.renderType === 'article' ? '' : 'sm:max-w-[900px]'
							  } items-center`
							: 'flex flex-col items-center w-full sm:w-auto mx-auto'}
										{hero.theme?.isLeft ? 'sm:text-left' : ''} {hero.demoUrl && !hero.theme?.isVertical
							? 'sm:mr-8'
							: ''} "
					>
						{#if isMounted}
							{#if hero.embedAboveHtml}
								<div class="mb-4" in:fly={{ y: -25, duration: 800 }}>
									{@html hero.embedAboveHtml}
								</div>
							{/if}

							<h1
								class="{page.theme?.isGradientTitle
									? `bg-gradient-to-br ${getHeroGradientColor()}
											 bg-clip-text text-transparent`
									: ''} _hero-title 
											{!hero.demoUrl || hero.theme?.isVertical
									? page.renderType === 'article'
										? 'sm:max-w-[712px]'
										: page.activeHero?.theme?.titleSize === 'giant'
										? 'sm:max-w-[1100px]'
										: 'sm:max-w-[912px]'
									: ''}"
								style={hero.title ? '' : 'opacity: 20%;'}
								in:fly={{ y: 25, duration: 1000 }}
							>
								{#if hero.title}
									{#if hero.theme?.isAnimatedTitle}
										{#key hero.title}
											<div use:typewriter>{@html hero.title || ''}</div>
										{/key}
									{:else}
										<div>{@html hero.title || ''}</div>
									{/if}
								{:else if isEmbed && !page.parentPage}
									{#if page.renderType !== 'article'}
										{'Type Tagline...'}
									{/if}
								{/if}
							</h1>
						{/if}

						{#if hero.subtitle}
							<h2
								class="_subtitle opacity-80 {hero.theme?.titleSize === 'huge'
									? 'text-xl'
									: 'text-xl'} {hero.theme?.titleSize === 'giant'
									? 'text-3xl'
									: ''} whitespace-pre-wrap  {hero.demoUrl || !hero.theme?.isVertical
									? page.renderType === 'article'
										? 'max-w-[712px]'
										: 'max-w-[650px]'
									: page.renderType === 'article'
									? 'max-w-[712px]'
									: 'max-w-[600px]'}"
								in:fly={{ y: 25, duration: 1000 }}
							>
								{@html hero.subtitle}
							</h2>
						{/if}

						{#if hero.keyFeaturesStr && hero.theme.isLeft}
							<div
								class="my-8 opacity-80 hidden  {hero.theme.isLeft ||
								(hero.demoUrl && !hero.theme.isVertical)
									? 'sm:block'
									: 'sm:flex gap-4'}"
								in:fade={{ delay: 300, duration: 600 }}
							>
								{#each hero.keyFeaturesStr.split('\n') as keyFeature}
									<div class="flex items-center  mb-2">
										<div class="mr-2 rounded-full p-1 _bg-opposite flex">
											<Emoji color={page.theme?.buttonColor} emoji="feather:check" width={15} />
										</div>
										<div>
											{keyFeature}
										</div>
									</div>
								{/each}
							</div>
						{/if}

						{#if hero.ctaHtml && (!hero.theme?.ctaHtmlPosition || hero.theme?.ctaHtmlPosition === 'above')}
							<div in:fly={{ y: 25, delay: 500, duration: 900 }}>
								{@html hero.ctaHtml}
							</div>
						{/if}

						{#if hero.interactiveRenderType}
							<div
								class={hero.interactiveRenderType === 'form'
									? 'w-full'
									: hero.theme.isLeft
									? 'w-full'
									: 'w-full sm:w-auto'}
								in:fly={{ y: 25, delay: 500, duration: 900 }}
							>
								<RenderInteractiveOptions
									class={hero.theme.isLeft || (hero.demoUrl && !hero.theme.isVertical)
										? ''
										: `max-w-[600px] mx-auto justify-center ${
												hero.interactiveRenderType === 'form'
													? 'w-full'
													: hero.theme.isLeft
													? 'w-full'
													: 'w-full sm:w-auto'
										  }`}
									size={hero.theme.titleSize === 'huge' ? 'huge' : 'large'}
									bind:page
									bind:sectionItem={hero}
									bind:isEdit
									bind:isEmbed
								/>
							</div>
						{/if}

						{#if hero.ctaHtml && hero.theme?.ctaHtmlPosition === 'below'}
							<div in:fly={{ y: 25, delay: 500, duration: 900 }}>
								{@html hero.ctaHtml}
							</div>
						{/if}

						{#if page.renderType === 'article'}
							<RenderArticleHeader
								class={(hero.theme.isLeft || hero.demoUrl) && !hero?.theme.isVertical
									? 'justify-start'
									: 'justify-center'}
								{page}
							/>
						{/if}
						{#if isMounted && hero.socialProof}
							<div class="py-4 mt-16" in:fly={{ y: 25, delay: 900, duration: 900 }}>
								<div
									class="_social-proof _dense _small {hero.socialProof.className ||
										''} flex justify-center  {(hero.demoUrl && !hero.theme?.isVertical) ||
									(hero.theme?.isLeft && !hero.theme?.isVertical)
										? 'inline-flex'
										: 'w-full'}"
								>
									{#each (isEdit ? hero.socialProof.logos : _.shuffle(hero.socialProof.logos)).filter((l) => l.url) as logo}
										<img class="rounded-full" src={logo.url} />
									{/each}
								</div>
								<div class="text-sm mt-4 opacity-80 max-w-[400px]">
									{@html hero.socialProof.title || ''}
								</div>
							</div>
						{/if}

						{#if hero.keyFeaturesStr && !hero.theme.isLeft}
							<div
								class="my-8 mt-12 opacity-80 flex flex-wrap justify-center sm:justify-start gap-4 items-center"
							>
								{#each hero.keyFeaturesStr.split('\n') as keyFeature}
									<div class="flex items-center mb-2 shrink-0">
										<div
											class="mr-2 rounded-full p-1 flex"
											style="background-color: var(--accent-color);"
										>
											<Emoji color={page.theme?.buttonColor} emoji="feather:check" width={15} />
										</div>
										<div>
											{keyFeature}
										</div>
									</div>
								{/each}
							</div>
						{/if}
					</div>

					{#if hero.demoUrl}
						<div
							class="relative  w-full {page.renderType === 'article'
								? 'mt-0'
								: 'mt-16'} sm:mt-0 {hero.theme?.isVertical ? '' : 'sm:ml-8 sm:max-w-[600px]'}"
							in:fly={{ y: 25, delay: 1000, duration: 900 }}
							on:click={() => {
								// if (hero.demoUrl.includes('/emulator-full')) {
								// 	isDemoPopupShown = true;
								// }
							}}
						>
							{#if hero.demoUrl.includes('/emulator-full')}
								<Emulator />
							{:else}
								<RenderUrlWithBackground
									bind:this={demoEl}
									isLazy={false}
									imageUrl={hero.demoUrl}
									class={hero.theme?.isVertical ? 'mt-8' : ''}
									imageBackgroundUrl={hero.demoBackgroundUrl}
									urlClass="relative w-full flex justify-end"
									urlImgMaxWidth={hero.imgMaxWidth || 0}
									urlImgClass="{hero.imgMaxWidth
										? `rounded-lg mx-auto`
										: 'w-full rounded-xl'} object-cover"
								/>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="my-[60px]" />
{/if}

<style>
	._social-proof img {
		width: 50px;
		height: 50px;
		border: 2px var(--background-color) solid;
	}

	._social-proof._small img {
		width: 30px;
		height: 30px;
	}

	._social-proof img:not(:last-child) {
		margin-right: -20px;
	}

	._social-proof._small img:not(:last-child) {
		margin-right: -10px;
	}

	:global(._highlight-old b, ._highlight-old em) {
		background-color: var(--accent-color);
		color: var(--button-color);
		opacity: 0.9;
	}

	._subtitle {
		margin-bottom: 40px;
		font-family: var(--subtitle-font);
	}

	:global(._gradient svg) {
		@apply w-full h-full;
	}
</style>

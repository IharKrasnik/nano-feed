<script>
	import _ from 'lodash';

	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import RenderInteractiveOptions from '$lib/components/render/InteractiveOptions.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import RenderArticleHeader from '$lib/components/render/ArticleHeader.svelte';
	import aboveTheFoldEl from '$lib/stores/aboveTheFoldEl';
	import ComaDragons from '$lib/components/animations/ComaDragons.svelte';
	import getPageCssStyles from '$lib/services/getPageCssStyles';

	export let page;

	export let hero;
	export let isEmbed;
	export let isEdit;

	let styles = '';

	$: if (hero.theme?.isHugeTitle) {
		styles = '--title-font-size: 72px;';
	} else {
		styles = '--title-font-size: 48px;';
	}

	let isMounted = false;

	onMount(() => {
		isMounted = true;
	});

	let maxHeight;
</script>

<div class="relative">
	{#if hero.animation?.name === 'coma'}
		<ComaDragons />
	{/if}

	<!-- <img
				class="absolute w-screen h-screen object-cover"
				src="https://thumbs.dreamstime.com/b/beautiful-view-garden-sky-realistic-photo-beautiful-view-garden-sky-photo-photo-was-originally-taken-me-259322267.jpg?w=992"
			/> -->
	{#if hero.bgImageUrl}
		<div
			class="absolute top-0 left-0 w-screen h-screen z-1"
			style="background-color: rgba(0,0,0, 0.7); z-index: 1;"
		/>
		<RenderUrl
			class="absolute left-0 top-0 w-screen h-screen opacity-90 overflow-hidden z-0"
			isAutoplay={!isEdit}
			imgClass="w-full h-full object-cover overflow-hidden"
			url={hero.bgImageUrl}
		/>
	{/if}

	<div
		class="relative z-10 container container-width mx-auto {hero.theme?.isVertical ||
		page.sections?.length
			? ''
			: 'min-h-screen h-screen'}"
		style="{styles};"
	>
		{#if page.renderType !== 'article'}
			<div
				bind:this={$aboveTheFoldEl}
				class="{hero.theme?.bgImage ? 'light-colors' : ''} {hero.theme?.isVertical
					? ''
					: ''} h-full  pb-16 pt-24 sm:pt-36 sm:pb-24 {!hero.testimonials?.length
					? `flex items-center`
					: ''}"
				style={`${maxHeight ? `max-height: ${maxHeight}` : ''};`}
			>
				<div
					class="p-4 flex h-full w-full {hero.demoUrl || hero.theme?.isLeft
						? `flex-col ${hero.theme?.isVertical ? '' : 'justify-between sm:flex-row'} items-center`
						: 'text-center items-center'}"
				>
					<div
						class="{hero.demoUrl || hero.theme?.isLeft
							? `w-full text-center ${
									hero.theme?.isVertical ? 'flex flex-col items-center mb-8' : 'sm:text-left'
							  }  ${hero.demoUrl ? '' : 'sm:max-w-[900px]'} items-center`
							: 'flex flex-col items-center w-full sm:w-auto mx-auto'}
										{hero.theme?.isLeft && !hero.theme?.isVertical ? 'sm:text-left' : ''}"
					>
						{#if isMounted}
							<h1
								class="{page.theme?.isGradientTitle
									? 'bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent'
									: ''} _title 
											{!hero.demoUrl || hero.theme?.isVertical ? 'sm:max-w-[912px]' : ''}"
								style={hero.title ? '' : 'opacity: 20%;'}
								in:fly={{ y: 50, duration: 800 }}
							>
								{#if hero.title}
									<div>{@html hero.title || ''}</div>
								{:else if isEmbed && !page.parentPage}
									{#if page.renderType !== 'article'}
										{'Type Tagline...'}
									{/if}
								{/if}
							</h1>
						{/if}

						{#if hero.subtitle}
							<h2
								class="_subtitle {hero.theme.isHugeTitle
									? 'text-3xl'
									: 'text-xl'}  whitespace-pre-wrap  {hero.demoUrl || !hero.theme?.isVertical
									? ''
									: 'max-w-[600px]'}"
								in:fly={{ y: 50, duration: 800 }}
							>
								{@html hero.subtitle}
							</h2>
						{/if}

						{#if hero.interactiveRenderType}
							<RenderInteractiveOptions
								class={hero.theme.isLeft ? '' : 'w-full max-w-[600px] mx-auto'}
								bind:page
								bind:sectionItem={hero}
							/>
						{/if}

						{#if isMounted && hero.socialProof}
							<div
								class="mt-16 py-4 {hero.socialProof.className || ''} {hero.demoUrl ||
								(hero.theme?.isLeft && !hero.theme?.isVertical)
									? ''
									: 'flex justify-center w-full'} }"
							>
								<div>
									<div class="flex gap-2">
										{#each _.shuffle(hero.socialProof.logos) as logo}
											<img class="w-[50px] h-[50px] rounded-full" src={logo.url} />
										{/each}
									</div>

									<div class="text-sm mt-4 opacity-80 max-w-[400px]">
										{@html hero.socialProof.title || ''}
									</div>
								</div>
							</div>
						{/if}
					</div>

					{#if hero.demoUrl}
						<div
							class="w-full  mt-16 sm:mt-0 {hero.theme?.isVertical
								? ''
								: 'sm:ml-8 sm:max-w-[600px]'}"
						>
							<RenderUrl
								isLazy={false}
								class="w-full flex justify-end {hero.theme?.isVertical ? 'mt-8' : ''}"
								url={hero.demoUrl}
								imgClass="w-full rounded-xl shadow-md object-cover"
							/>
						</div>
					{/if}
				</div>
			</div>
		{:else}
			<div style="height: 72px;" class="mb-16" />
			<RenderArticleHeader {page} />
		{/if}
	</div>
</div>

<style>
	._title {
		font-family: Archivo;

		font-size: var(--title-font-size);

		@apply font-bold;
		line-height: var(--title-line-height, 1.2);
		margin-bottom: 32px;
		/* sm:text-[32px]; */
	}

	@media (max-width: 640px) {
		._title {
			font-size: 36px;
		}
	}

	:global(._root ._title) {
		font-family: var(--title-font) !important;
	}

	:global(._title b, ._title em) {
		/* background-color: var(--accent-color); */
		color: var(--accent-color);
		opacity: 0.9;
	}

	:global(._highlight-old b, ._highlight-old em) {
		background-color: var(--accent-color);
		color: var(--button-color);
		opacity: 0.9;
	}

	._subtitle {
		margin-bottom: 40px;
		max-width: 650px;
		font-family: var(--subtitle-font);
	}
</style>

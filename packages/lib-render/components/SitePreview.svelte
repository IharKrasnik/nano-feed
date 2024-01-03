<script>
	import SvelteMarkdown from 'svelte-markdown';
	import moment from 'moment';
	import _ from 'lodash';

	import { browser } from '$app/environment';
	import { get, post } from 'lib/api';
	import { POST_URL } from 'lib/env';
	import { page as sveltePage } from '$app/stores';
	import { fly, fade, slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { darken, lighten } from 'lib/helpers/color';
	import setPageVars from 'lib-render/helpers/setPageVars';
	import addDefaultHero from 'lib-render/helpers/addDefaultHero';
	import { v4 as uuidv4 } from 'uuid';

	import striptags from 'striptags';

	import PortfolioPage from 'lib-render/layouts/PortfolioPage.svelte';
	import getPageCssStyles from 'lib-render/services/getPageCssStyles';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import RenderInteractiveOptions from 'lib-render/components/render/InteractiveOptions.svelte';
	import RenderHero from 'lib-render/components/render/Hero.svelte';
	import Header from 'lib-render/components/render/Header.svelte';
	import Background from 'lib-render/components/render/Background.svelte';
	import RenderSection from 'lib-render/components/render/Section.svelte';
	import RenderCTA from 'lib-render/components/render/CallToAction.svelte';
	import RenderBackgroundPattern from 'lib-render/components/render/BackgroundPattern.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import RenderHeader from 'lib-render/components/render/Header.svelte';
	import RenderServiceChat from 'lib-render/components/render/ServiceChat.svelte';

	import trackClick from 'lib/services/trackClick';

	import Emoji from 'lib/components/Emoji.svelte';
	import sectionToEdit from 'lib-render/stores/sectionToEdit';
	import ctaFooterEl from 'lib-render/stores/ctaFooterEl';

	import feedLastUpdatedOn from 'lib-render/stores/feedLastUpdatedOn';

	import TwitterIcon from 'lib/icons/twitter.svelte';
	import PageBadge from 'lib-render/components/PageBadge.svelte';
	import LinkedInIcon from 'lib/icons/linkedin.svelte';
	import iframeResize from 'iframe-resizer/js/iframeResizer';
	import heatmap, { getHeatmapClicksCount } from 'lib-render/stores/heatmap';

	import { STREAM_URL, PAGE_URL } from 'lib/env';

	let clazz = '';

	export { clazz as class };

	export let isEdit = false;
	export let isSectionsCloneable = false;
	export let onInsert;

	export let page = {
		name: 'momentum',
		slug: 'momentum',
		title: 'Build a better product in public and grow your audience',
		subtitle:
			'Momentum instructs you how to create and distribute your content. Add subscribers early and build based on real users feedback.',
		callToAction: 'Join Waitlist',
		bgColor: '#D98324'
	};

	if (page.blog) {
		if (!page.blog.url) {
			let domain = (page.blog.domains || []).filter((d) => d.isConfigured)[0];

			if (domain) {
				page.blog.url = `https://${domain.url}`;
			} else {
				page.blog.url = `${POST_URL}/${page.blog.slug}`;
			}
		}
	}

	export let isEmbed = false;

	export let isNoBadge = false;

	export let maxHeight;

	let grid = {
		title: '',
		description: '',
		columns: '',

		items: [
			{
				title: '',
				description: '',
				icon: '',
				imageUrl: ''
			}
		]
	};

	export let noStickyHeader = false;
	export let isNoVars = false;
	let isMounted = false;
	let isMountedDelayed = false;

	onMount(() => {
		isMounted = true;

		setTimeout(() => {
			isMountedDelayed = true;
		}, 400);
	});

	let email;

	let inputEl;

	const onButtonClick = () => {
		inputEl.focus();
	};

	let resize = () => {
		iframeResize({ log: true }, '#iframeResize');
	};

	let scrollY;

	let cssVarStyles;
	let styles;

	export let isAboveTheFold = false;
	let previewEl;

	let isLoading = false;

	let feedItem;
	let prevFeedItemSlug;

	let loadFeedItem = async () => {
		let { feedItemSlug } = $sveltePage.params;

		if (prevFeedItemSlug !== feedItemSlug) {
			isLoading = true;
			prevFeedItemSlug = feedItemSlug;
			feedItem = await get(`feed/bySlug`, {
				projectSlug: page.streamSlug,
				slug: feedItemSlug
			});

			setPageVars({ page, feedItem, isNoVars });

			isLoading = false;
		}
	};

	$: if (page) {
		let res = getPageCssStyles(page);
		cssVarStyles = res.cssVarStyles;
		styles = res.styles;
	}

	$: if (browser && page._id && page.isUseDatabase) {
		loadFeedItem();
	}

	if (browser) {
		if ($sveltePage.data.pageSlug) {
			window.document.body.style['background-color'] = page.theme?.backgroundColor || 'white';
		} else {
			window.document.body.style['background-color'] = null;
		}
	}

	$: if (previewEl) {
		previewEl.style['background-color'] = page?.theme?.backgroundColor || 'white';
	}

	let editEl;

	let focusEditEl = () => {
		setTimeout(() => {
			try {
				editEl.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
			} catch (err) {
				console.error(err);
			}
		}, 0);
	};

	if (browser) {
		page.variables = [
			{
				name: 'timeOfDay',
				calculateFn: () => {
					var currentHour = moment().format('HH');

					if (currentHour >= 3 && currentHour < 12) {
						return 'morning';
					} else if (currentHour >= 12 && currentHour < 17) {
						return 'afternoon';
					} else if (currentHour >= 17 && currentHour < 22) {
						return 'evening';
					} else if (currentHour >= 22 || currentHour < 3) {
						return 'night';
					}
				}
			}
		];
	}

	if (browser) {
		if (localStorage.visitsCount) {
			localStorage.visitsCount = parseInt(localStorage.visitsCount) + 1;
		} else {
			localStorage.visitsCount = 1;
		}
	}

	let isSubmitted;

	let varTemplatesBig = {
		title: page.title,
		subtitle: page.subtitle,
		description: page.title,
		ctaExplainer: page.ctaExplainer || ''
	};

	if (browser && !page.activeHero) {
		if (!page.heros) {
			addDefaultHero(page);
		}
		page.activeHero = _.shuffle(page.heros)[0];
	}

	if (browser && !isEdit) {
		setPageVars({ page, feedItem, isNoVars });
	}

	if (!page.ctaFooter) {
		page.ctaFooter = {
			id: uuidv4()
		};
	}
</script>

<svelte:window bind:scrollY />

<div
	class="hidden sm:grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 sm:grid-cols-4 sm:grid-cols-12 sm:grid-cols-5 sm:grid-cols-3 sm:w-[392px] sm:w-[500px] sm:columns-2 sm:columns-3 sm:columns-4 sm:min-h-screen
	bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]
	bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)]
	pattern-dots pattern-wavy pattern-cross pattern-boxes"
/>

<!-- <div style="background: url('/dark_gradient.svg');"> -->
{#key page.slug}
	{#if page.theme?.layoutType === 'portfolio' || page.parentPage?.theme?.layoutType === 'portfolio'}
		<PortfolioPage bind:page />
	{:else}
		<div class={page.interactiveAnswers ? 'pb-16' : ''} bind:this={previewEl}>
			<div
				class="relative color-site min-h-screen"
				style="{cssVarStyles}; font-family: var(--text-font);"
			>
				<!-- {#if page.isSectionsCloneable}
					<div class="fixed w-[400px] h-screen p-4 bg-accent top-0" style="z-index: 100">
						Clone this page
					</div>
				{/if} -->

				{#if page.interactiveAnswers}
					{#if scrollY > 100}
						<div
							class="fixed  {(page.parentPage || page).theme?.theme === 'dark'
								? 'bg-black/70'
								: 'bg-white/70'} backdrop-blur w-full w-screen z-10 py-2 bottom-0"
							style="z-index: 40;"
							in:slide={{ duration: 150 }}
						>
							<div
								class="_container-width mx-auto flex items-center justify-center sm:justify-between"
							>
								<div class="hidden sm:block text-lg opacity-70">
									<a href="/blog" class="_link">Blog</a> / {page.activeHero?.title || ''}
								</div>
								<div class="opacity-70 hover:opacity-100 transition">
									<RenderInteractiveOptions
										class="w-full justify-center"
										trackId={`${page._id}`}
										isNoLabel
										bind:sectionItem={page}
										bind:page
									/>
								</div>
							</div>
						</div>
					{/if}
				{/if}

				{#if isMounted}
					<div
						class=" relative bg-site z-20 w-full {clazz}"
						style="z-index: 32;"
						in:fade={{ duration: 150 }}
					>
						{#if !isSectionsCloneable}
							{#if page.name || page.parentPage?._id}
								<RenderHeader bind:page bind:isEdit />
							{/if}
						{/if}

						{#if !isLoading}
							{#if page.renderType === 'service_chat'}
								<RenderServiceChat roomId={$sveltePage.params.serviceRequestId} {page} />
							{:else}
								<div class="overflow-y-hidden">
									{#if page.activeHero}
										<div
											class="sticky bg-site {$sectionToEdit &&
											$sectionToEdit.id !== page.activeHero?.formSection?.id
												? 'opacity-30 grayscale'
												: ''}"
										>
											<RenderHero
												bind:hero={page.activeHero}
												bind:page
												bind:isEmbed
												bind:isEdit
												bind:isCloneable={isSectionsCloneable}
											/>
										</div>
									{/if}

									<div
										class="sticky _root bg-site overflow-hidden {isEdit
											? 'max-h-full overflow-y-auto'
											: ''}"
										style="background: none;"
									>
										{#if !isAboveTheFold}
											{#if page.sections?.length}
												<div
													in:fade={{ delay: page.activeHero?.title ? 900 : 0 }}
													class="relative  z-10 {page.streamSlug ? '' : ''}"
													style="z-index: 40;"
												>
													{#each page.sections || [] as section, i}
														<div class="relative">
															{#if section.containerBgImageUrl}
																<RenderUrl
																	url={section.containerBgImageUrl}
																	class={'absolute left-0 top-0 w-screen h-full'}
																	imgClass={'w-full h-full object-cover'}
																	style="z-index: 0;"
																/>

																{#if !section.theme?.isNotContainerBgImageDimmed}
																	<div
																		class="absolute top-0 left-0 w-screen h-full z-1"
																		style="background-color: {page.theme?.theme === 'dark'
																			? 'rgba(0,0,0,0.7)'
																			: 'rgba(255,255,255,.7)'}; z-index: 1;"
																	/>
																{/if}
															{/if}
															{#if $sectionToEdit && $sectionToEdit.id === section.id}
																<div
																	bind:this={editEl}
																	style="scroll-margin-top: 60px;"
																	class="relative z-10"
																>
																	<div
																		class="p-2 my-16 bg-green-200 text-center flex gap-4 items-center justify-center text-black"
																	>
																		<FeatherIcon name="arrow-down" /> edit section<FeatherIcon
																			name="arrow-down"
																		/>
																	</div>
																	<div
																		class="bg-site _container-width mx-auto {section.containerBgImageUrl
																			? 'py-8'
																			: ''}"
																	>
																		<RenderSection
																			bind:page
																			bind:themeStyles={styles}
																			bind:section={$sectionToEdit}
																			bind:isEdit
																			{onInsert}
																		/>
																	</div>
																	<div
																		class="p-2 my-16 bg-green-200 text-center flex gap-4 items-center justify-center text-black"
																	>
																		<FeatherIcon name="arrow-up" /> edit section<FeatherIcon
																			name="arrow-up"
																		/>
																	</div>
																</div>
																{focusEditEl() || ''}
															{:else}
																<div
																	class="relative z-10 overflow-y-hidden"
																	class:opacity-30={!!$sectionToEdit}
																	class:grayscale={!!$sectionToEdit}
																>
																	<div
																		class="bg-site _container-width mx-auto {section.containerBgImageUrl
																			? 'py-8'
																			: ''}"
																	>
																		<RenderSection
																			bind:page
																			bind:section
																			bind:themeStyles={styles}
																			bind:isEdit
																			bind:isCloneable={isSectionsCloneable}
																			{onInsert}
																			style={false && page.theme?.isZebra && i % 2 === 0
																				? page.theme?.theme === 'dark'
																					? `background-color: ${lighten(
																							styles['background-color'],
																							0.01
																					  )};`
																					: `background-color: ${darken(
																							styles['background-color'],
																							0.08
																					  )};`
																				: ''}
																		/>
																	</div>
																</div>
															{/if}
														</div>
													{/each}
												</div>
											{/if}
										{/if}
									</div>

									{#if isMountedDelayed && (page.activeHero?.title || page.ctaFooter?.title) && !page.ctaFooter?.isHidden && page.sections?.filter((s) => s.isShown)?.length && $sveltePage.url.pathname !== '/blog'}
										<div
											class="overflow-hidden"
											bind:this={$ctaFooterEl}
											class:opacity-30={!!$sectionToEdit}
											class:grayscale={!!$sectionToEdit}
										>
											<RenderCTA {page} section={page.ctaFooter} />
										</div>
									{/if}
								</div>
							{/if}
						{/if}
					</div>
				{/if}

				{#if !isNoBadge && !page.parentPage?.isNoBadge && !page.isNoBadge}
					<PageBadge theme={page.theme?.theme || 'light'} />
				{/if}
			</div>
		</div>
	{/if}
{/key}

<!-- {#if page?.activeHero?.theme?.bgPattern === 'stars'}
	<Background />
{/if} -->
<style>
	:global(.bg-site) {
		/* background-color: var(--background-color, white); */
		background-color: transparent;
	}

	:global(.bg-section) {
		background-color: var(--section-background-color);
		border: 1px rgba(0, 0, 0, 0.1) solid;
	}

	.color-site {
		color: var(--text-color, black);
		font-size: var(--text-font-size, 18);
		line-height: var(--text-line-height, 1.2);
	}

	._root {
		width: 100%;
		margin: 0 auto;
	}

	._logo {
		font-family: var(--title-font);
		font-weight: bold;
		font-size: 18px;
	}

	._momentum-stream {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 500px;
		height: 600px;
	}
</style>

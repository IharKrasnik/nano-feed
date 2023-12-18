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
	import Background from 'lib-render/components/render/Background.svelte';
	import RenderSection from 'lib-render/components/render/Section.svelte';
	import RenderCTA from 'lib-render/components/render/CallToAction.svelte';
	import RenderBackgroundPattern from 'lib-render/components/render/BackgroundPattern.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';

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

	let isMenuOpen = false;

	$: if (browser && $sveltePage.url) {
		isMenuOpen = false;
		window.document.body.style['overflow'] = null;
	}

	let toggleMenu = () => {
		isMenuOpen = !isMenuOpen;

		if (isMenuOpen) {
			window.document.body.style['overflow'] = 'hidden';
		} else {
			window.document.body.style['overflow'] = null;
		}
	};

	if (!page.ctaFooter) {
		page.ctaFooter = {
			id: uuidv4()
		};
	}
</script>

<svelte:head>
	{#if page?.customHTML}
		<!-- Meta Pixel Code -->
		<script>
			!(function (f, b, e, v, n, t, s) {
				if (f.fbq) return;
				n = f.fbq = function () {
					n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
				};
				if (!f._fbq) f._fbq = n;
				n.push = n;
				n.loaded = !0;
				n.version = '2.0';
				n.queue = [];
				t = b.createElement(e);
				t.async = !0;
				t.src = v;
				s = b.getElementsByTagName(e)[0];
				s.parentNode.insertBefore(t, s);
			})(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
			fbq('init', '470030741384055');
			fbq('track', 'PageView');
		</script>
		<noscript
			><img
				height="1"
				width="1"
				style="display:none"
				src="https://www.facebook.com/tr?id=470030741384055&ev=PageView&noscript=1"
			/></noscript
		>
		<!-- End Meta Pixel Code -->
	{/if}
</svelte:head>

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
		<div class="" bind:this={previewEl}>
			<div class="relative color-site min-h-screen" style="{cssVarStyles};">
				<!-- {#if page.isSectionsCloneable}
					<div class="fixed w-[400px] h-screen p-4 bg-accent top-0" style="z-index: 100">
						Clone this page
					</div>
				{/if} -->

				{#if page.interactiveAnswers}
					{#if scrollY > 100}
						<div
							class="fixed bottom-0 w-full w-screen z-10"
							style="z-index: 40;"
							in:slide={{ duration: 150 }}
						>
							<RenderInteractiveOptions
								class="w-full justify-center"
								trackId={`${page._id}`}
								bind:sectionItem={page}
								bind:page
							/>
						</div>
					{/if}
				{/if}

				{#if isMounted}
					<div
						class=" relative bg-site z-20 w-full {clazz}"
						style="z-index: 32;"
						in:fade={{ duration: 150 }}
					>
						{#if !page.isSectionsCloneable}
							{#if page.name || page.parentPage?._id}
								<div
									class="fixed w-full _header backdrop-blur-lg _border-b-theme"
									style={isEdit ? 'width: calc(100% - 498px);' : ''}
								>
									<div class="px-4 sm:px-0 mb-4 _header-content flex justify-between items-center">
										<div class="flex flex-grow py-4 sm:py-0">
											<a
												class="flex items-center shrink-0 _logo"
												href="/"
												data-sveltekit-preload-data="hover"
												on:click={() => {
													trackClick({
														pageId: page?._id,
														sectionId: `${page.parentPage?._id || page._id}_header`,
														linkId: 'home',
														url: '/',
														text: page.parentPage?.name || page.name
													});
												}}
												class:heatmap={$heatmap}
												data-heatmap-clicks-count={$heatmap
													? getHeatmapClicksCount({
															sectionId: `${page.parentPage?._id || page._id}_header`,
															linkId: `home`
													  })
													: ''}
											>
												{#if page?.parentPage?.logo || page?.logo}
													<Emoji
														width="25"
														class="mr-2 rounded"
														emoji={page.parentPage?.logo || page.logo}
													/>

													{#if !page.theme?.isHidePageName}
														<span
															class="font-medium text-base {page.theme?.heroBgImage
																? 'light-colors'
																: ''}"
														>
															{page.parentPage?.name || page.name}
														</span>
													{/if}
												{:else}
													<span
														class="font-bold {page.theme?.heroBgImage ? 'light-colors' : ''}"
														style="font-family: var(--logo-font)"
													>
														{page.parentPage?.name || page.name}
													</span>
												{/if}
											</a>

											<div
												class="hidden ml-8 sm:flex items-center justify-end text-sm py-1 gap-4 w-full mr-8"
												style="z-index: 50"
											>
												{#each (page.subPages || page.parentPage?.subPages || []).filter((s) => !s.slug.includes('/') && s.renderType !== 'article') as subPage}
													<a
														href="/{subPage.slug}"
														data-sveltekit-preload-data="hover"
														on:click={() => {
															trackClick({
																pageId: page?._id,
																sectionId: `${page.parentPage?._id || page._id}_header`,
																linkId: subPage._id,
																url: `/${subPage.slug}`,
																text: subPage.name
															});
														}}
														class:heatmap={$heatmap}
														data-heatmap-clicks-count={$heatmap
															? getHeatmapClicksCount({
																	sectionId: `${page.parentPage?._id || page._id}_header`,
																	linkId: subPage._id
															  })
															: ''}>{subPage.name}</a
													>
												{/each}

												{#if !page._id && page.parentPage && !page.isUseDatabase && !page.isInDir}
													<span>{page.name}</span>
												{/if}
											</div>
										</div>

										<div>
											<div class="sm:hidden" on:click={toggleMenu}>
												<FeatherIcon theme={page.theme?.theme} name="menu" />
											</div>
											<div
												class="shrink-0 hidden md:flex gap-6 items-center text-sm py-1 font-semibold"
											>
												{#if !page.parentPage}
													{#if page.activeHero}
														<RenderInteractiveOptions
															trackId={`${page._id}_header`}
															bind:sectionItem={page.activeHero}
															bind:page
															isHeader
														/>
													{/if}
												{:else if page.parentPage.heros?.length}
													<RenderInteractiveOptions
														trackId={`${page.parentPage._id}_header`}
														size="small"
														sectionItem={page.parentPage.heros[0]}
														{page}
														isHeader
													/>
												{/if}
												<!-- {#each page.subPages || page.parentPage?.subPages || [] as subPage}
											<a href="/{subPage.slug}">{subPage.name}</a>
										{/each} -->
											</div>
										</div>
									</div>
								</div>
							{/if}

							{#if isMenuOpen}
								<div
									in:fly={{ y: 350, duration: 250 }}
									out:fly={{ duration: 150 }}
									style="z-index: 100"
									class="left-0 top-[61px] fixed w-screen h-screen overflow-y-auto bg-site bg-background p-4"
								>
									{#if page.activeHero}
										<RenderInteractiveOptions bind:sectionItem={page.activeHero} bind:page />
									{:else if page.parentPage && page.parentPage.heros?.length}
										<RenderInteractiveOptions
											size="small"
											sectionItem={page.parentPage.heros[0]}
											{page}
										/>
									{/if}

									<div class="flex flex-col mt-8">
										{#each (page.subPages || page.parentPage?.subPages || []).filter((sp) => !sp.slug.includes('/')) as subPage}
											<a class="block  py-4 border-b border-white/20" href="/{subPage.slug}"
												>{subPage.name}</a
											>
										{/each}
									</div>
								</div>
							{/if}
						{/if}

						{#if !isLoading}
							<div class="overflow-y-hidden">
								{#if page.activeHero}
									<div
										class="sticky bg-site"
										class:opacity-30={!!$sectionToEdit}
										class:grayscale={!!$sectionToEdit}
									>
										<RenderHero
											bind:hero={page.activeHero}
											bind:page
											bind:isEmbed
											bind:isEdit
											bind:isSectionsCloneable
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
													{#if $sectionToEdit && $sectionToEdit.id === section.id}
														<div bind:this={editEl} style="scroll-margin-top: 60px;">
															<div
																class="p-2 my-16 bg-green-200 text-center flex gap-4 items-center justify-center text-black"
															>
																<FeatherIcon name="arrow-down" /> edit section<FeatherIcon
																	name="arrow-down"
																/>
															</div>
															<div>
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
															class="relative overflow-y-hidden"
															class:opacity-30={!!$sectionToEdit}
															class:grayscale={!!$sectionToEdit}
														>
															{#if section.containerBgImageUrl}
																<div class="absolute left-0 top-0 w-screen h-full">
																	<img
																		class="w-full h-full object-cover"
																		src={section.containerBgImageUrl}
																	/>
																</div>

																{#if !section.theme.isNotContainerBgImageDimmed}
																	<div
																		class="absolute top-0 left-0 w-screen h-full z-1"
																		style="background-color: {page.theme?.theme === 'dark'
																			? 'rgba(0,0,0,0.7)'
																			: 'rgba(255,255,255,.7)'}; z-index: 1;"
																	/>
																{/if}
															{/if}

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
												{/each}
											</div>
										{/if}
									{/if}
								</div>

								{#if isMountedDelayed && (page.activeHero?.title || page.ctaFooter?.title) && !page.ctaFooter?.isHidden && page.sections?.filter((s) => s.isShown)?.length && !$sveltePage.url.pathname.includes('/blog')}
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
					</div>
				{/if}

				{#if page.links}
					<div>
						<div class="sticky  bg-site z-20 py-4 sm:py-16">
							<div class="flex justify-center w-full my-4">
								{#if page.links.twitter}
									<div class="w-[35px] h-[35px] mr-2">
										<a href={page.links.twitter} class="scale-110" target="_blank">
											<TwitterIcon />
										</a>
									</div>
								{/if}
								{#if page.links.linkedin}
									<div class="w-[35px] h-[35px] mr-2">
										<a href={page.links.linkedin} target="_blank">
											<LinkedInIcon />
										</a>
									</div>
								{/if}
							</div>
						</div>
					</div>
				{/if}

				{#if !isNoBadge && !page.isNoBadge}
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
		font-family: var(--text-font);
		font-size: var(--text-font-size, 18);
		line-height: var(--text-line-height, 1.2);
	}

	._root {
		width: 100%;
		margin: 0 auto;
	}

	._header {
		@apply p-1 w-full;
		z-index: 50;
	}

	._header ._header-content {
		max-width: var(--container-width);
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

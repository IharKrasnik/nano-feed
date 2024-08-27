<script>
	import moment from 'moment';
	import _ from 'lodash';

	import { browser } from '$app/environment';
	import { get, post } from 'lib/api';
	import { POST_URL } from 'lib/env';
	import { page as sveltePage } from '$app/stores';
	import { fade, slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { darken, lighten } from 'lib/helpers/color';
	import setPageVars from 'lib-render/helpers/setPageVars';
	import addDefaultHero from 'lib-render/helpers/addDefaultHero';
	import { v4 as uuidv4 } from 'uuid';

	import PortfolioPage from 'lib-render/layouts/PortfolioPage.svelte';
	import getPageCssStyles from 'lib-render/services/getPageCssStyles';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import RenderInteractiveOptions from 'lib-render/components/render/InteractiveOptions.svelte';
	import RenderHero from 'lib-render/components/render/Hero.svelte';
	import RenderSection from 'lib-render/components/render/Section.svelte';
	import RenderCTA from 'lib-render/components/render/CallToAction.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import RenderHeader from 'lib-render/components/render/Header.svelte';
	import RenderServiceRequestsPage from 'lib-render/components/render/ServiceRequestsPage.svelte';
	import RenderProfilePage from 'lib-render/components/render/ProfilePage.svelte';
	import selectedSectionItem from 'lib-render/stores/selectedSectionItem';

	import sectionToEdit from 'lib-render/stores/sectionToEdit';
	import ctaFooterEl from 'lib-render/stores/ctaFooterEl';

	import PageBadge from 'lib-render/components/PageBadge.svelte';

	let clazz = '';

	export { clazz as class };

	export let isEdit = false;
	export let isSectionsCloneable = false;
	export let onInsert;
	export let isNoHeaderFooter = false;
	export let isNoHero = false;

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
				editEl.scrollIntoView({ behavior: 'instant', block: 'start', inline: 'nearest' });
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
			id: uuidv4(),
			_isCtaFooter: true
		};
	}
	let getCanonicalUrl = () => {
		let domain = (page.parentPage || page).domains?.filter((d) => d.isConfigured)[0];

		if (!domain) {
			domain = { url: `${(page.parentPage || page).slug}.mmntm.page` };
		}

		return `https://${domain?.url || ''}${
			$sveltePage.url.pathname === '/' ? '' : $sveltePage.url.pathname
		}`;
	};
</script>

<svelte:head>
	<link rel="canonical" href={getCanonicalUrl()} />
	<meta name="og:url" content={getCanonicalUrl()} />
</svelte:head>

<svelte:element this={'style'}>
	{page?.theme?.customCss || ''}
</svelte:element>

<svelte:window bind:scrollY />

<div
	class="hidden grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-9 grid-cols-10 grid-cols-11 grid-cols-12 sm:grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 sm:grid-cols-4 sm:grid-cols-12 sm:grid-cols-5 sm:grid-cols-3 sm:w-[392px] sm:w-[500px] sm:columns-2 sm:columns-3 sm:columns-4 sm:min-h-screen
	bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]
	bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)]
	pattern-dots pattern-wavy pattern-cross pattern-boxes"
/>

<!-- <div style="background: url('/dark_gradient.svg');"> -->
{#if page.theme?.layoutType === 'portfolio' || page.parentPage?.theme?.layoutType === 'portfolio'}
	<PortfolioPage bind:page />
{:else}
	<div class="{page.interactiveAnswers ? 'pb-16' : ''} _page" bind:this={previewEl}>
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
									bind:isEdit
									bind:isEmbed
									bind:sectionItem={page}
									bind:page
								/>
							</div>
						</div>
					</div>
				{/if}
			{/if}

			<div class=" relative bg-site z-20 w-full {clazz}" style="z-index: 32;">
				{#if !isSectionsCloneable && !isNoHeaderFooter}
					{#if page.name || page.parentPage?._id}
						<RenderHeader bind:isEmbed bind:page bind:isEdit />
					{/if}
				{/if}
				{#if !isLoading}
					{#if page.renderType === 'service_chat'}
						<RenderServiceRequestsPage {page} />
					{:else if page.renderType === 'edit_profile'}
						<RenderProfilePage {page} />
					{:else}
						<div
							class="overflow-y-hidden"
							style="background-color: {page.theme?.backgroundColor || 'white'};"
						>
							{(page.activeHero = page.activeHero || page.heros[0]) && ''}
							{#if page.activeHero && !isNoHero}
								<div
									class="sticky bg-site {$sectionToEdit &&
									isEdit &&
									$sectionToEdit.id !== page.activeHero?.formSection?.id
										? 'opacity-30 grayscale'
										: ''}  {page.activeHero?.theme?.isPullBottom
										? 'mb-[-100px] sm:mb-[-192px]'
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
											class="relative  z-10 {page.streamSlug ? '' : ''} transition"
											style="z-index: 40;"
										>
											{#each page.sections || [] as section, i (section.id)}
												<div
													class="relative {page.activeHero?.theme?.isPullBottom && i === 0
														? 'pb-[48px] sm:pb-[96px] pt-[0]'
														: ''} {section.containerBgImageUrl ? 'py-16 sm:py-32' : ''}"
													style={section.theme?.backgroundColor
														? $sectionToEdit?.id === section.id
															? `background-color: ${$sectionToEdit.theme?.backgroundColor};`
															: `background-color: ${section.theme?.backgroundColor};`
														: `background-color: ${
																page.theme?.sectionBackgroundColor ||
																page.parentPage?.theme?.sectionBackgroundColor ||
																'none'
														  }`}
												>
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
																class="relative p-2 my-16 bg-gray-200 text-center flex gap-4 items-center justify-center text-black"
															>
																<FeatherIcon name="arrow-down" /> Edit Section<FeatherIcon
																	name="arrow-down"
																/>

																<div class="absolute right-0" style="z-index: 20;">
																	<div
																		class="cursor-pointer bg-purple-300 hover:bg-purple-200 rounded-full w-[30px] h-[30px] flex justify-center items-center m-4"
																		on:click={() => ($selectedSectionItem = $sectionToEdit)}
																	>
																		⚙️
																	</div>
																</div>
															</div>
															<div class="bg-site {section.containerBgImageUrl ? 'py-8' : ''}">
																<RenderSection
																	bind:page
																	bind:themeStyles={styles}
																	bind:section={$sectionToEdit}
																	bind:isEdit
																	{onInsert}
																/>

																{#if $sectionToEdit.footer && ($sectionToEdit.footer.title || $sectionToEdit.footer.description || $sectionToEdit.footer.interactiveRenderType)}
																	<div
																		class:_bg-opposite={$sectionToEdit.theme?.isOppositeColors}
																		style={`background-color: ${
																			$sectionToEdit.theme?.backgroundColor ||
																			page.theme?.sectionBackgroundColor ||
																			page.parentPage?.theme?.sectionBackgroundColor ||
																			'none'
																		};`}
																	>
																		<RenderSection
																			bind:section={$sectionToEdit.footer}
																			isFooter
																			bind:page
																			bind:themeStyles={styles}
																		/>
																	</div>
																{/if}
															</div>
															<div
																class="p-2 my-16 bg-gray-200 text-center flex gap-4 items-center justify-center text-black text-normal"
															>
																<FeatherIcon name="arrow-up" /> Edit Section<FeatherIcon
																	name="arrow-up"
																/>
															</div>
														</div>
														{focusEditEl() || ''}
													{:else}
														<div
															id={section.metadata?.htmlId || null}
															class="relative z-10 overflow-y-hidden {isEdit &&
															$sectionToEdit?.id !== section.id &&
															!section.isDatabase &&
															!section.isFooter
																? 'cursor-pointer hover:outline-8 hover:outline outline-purple-300 hover:mx-8'
																: ''} "
															class:opacity-30={isEdit && !!$sectionToEdit}
															class:grayscale={isEdit && !!$sectionToEdit}
															class:my-16={section.bgImageUrl && i !== 0}
															on:click={() => {
																if (isEdit) {
																	if ($sectionToEdit) {
																		page.sections = page.sections.map((s) => {
																			if (s.id === $sectionToEdit.id) {
																				return { ...$sectionToEdit };
																			} else {
																				return s;
																			}
																		});
																	}
																	$sectionToEdit = section;
																}
															}}
														>
															<div
																class="bg-site {section.imgMaxWidth === 'full-screen' ||
																section.renderType === 'scrollingGallery'
																	? isEdit
																		? 'w-full'
																		: 'w-full'
																	: '_container-width'} mx-auto {section.containerBgImageUrl
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

																{#if section.footer && (section.footer.title || section.footer.description || section.footer.interactiveRenderType)}
																	<div
																		class:_bg-opposite={section.theme?.isOppositeColors}
																		style={`background-color: ${
																			section.theme?.backgroundColor ||
																			page.theme?.sectionBackgroundColor ||
																			page.parentPage?.theme?.sectionBackgroundColor ||
																			'none'
																		};`}
																	>
																		<RenderSection
																			bind:section={section.footer}
																			isFooter
																			bind:page
																			bind:themeStyles={styles}
																		/>
																	</div>
																{/if}
															</div>
														</div>
													{/if}
												</div>
											{/each}
										</div>
									{/if}
								{/if}
							</div>

							{#if !isNoHeaderFooter && (page.parentPage || page.activeHero?.title || page.ctaFooter?.title) && page.sections?.filter((s) => s.isShown)?.length}
								<div
									class="overflow-hidden"
									class:hidden={$sveltePage.url.pathname === '/blog'}
									bind:this={$ctaFooterEl}
									class:opacity-30={!!$sectionToEdit}
									class:grayscale={!!$sectionToEdit}
								>
									<RenderCTA
										isCtaHidden={page.ctaFooter.isHidden ||
											(!page.activeHero?.title && !page.ctaFooter?.title)}
										{page}
										bind:section={page.ctaFooter}
									/>
								</div>
							{/if}
						</div>
					{/if}
				{/if}
			</div>

			{#if !isNoBadge && !page.parentPage?.isNoBadge && !page.isNoBadge && isMountedDelayed}
				<PageBadge theme={page.theme?.theme || 'light'} />
			{/if}
		</div>
	</div>
{/if}

<!-- {#if page?.activeHero?.theme?.bgPattern === 'stars'}
	<Background />
{/if} -->
<style>
	/* :global(body) {
		 background-color: var(--background-color, white);
	} */

	:global(.bg-section) {
		background-color: var(--section-item-background-color);
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

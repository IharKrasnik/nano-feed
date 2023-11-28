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
	import striptags from 'striptags';

	import PortfolioPage from '$lib/layouts/PortfolioPage.svelte';
	import getPageCssStyles from '$lib/services/getPageCssStyles';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import RenderInteractiveOptions from '$lib/components/render/InteractiveOptions.svelte';
	import RenderHero from '$lib/components/render/Hero.svelte';
	import Background from '$lib/components/Background.svelte';
	import RenderSection from '$lib/components/render/Section.svelte';
	import Scrolling from '$lib/components/animations/Scrolling.svelte';
	import Gradients from '$lib/components/gradients/index.svelte';
	import FeatherIcon from '$lib/components/FeatherIcon.svelte';
	import ComaDragons from '$lib/components/animations/ComaDragons.svelte';

	import trackClick from 'lib/services/trackClick';

	import Emoji from '$lib/components/render/Emoji.svelte';
	import sectionToEdit from '$lib/stores/sectionToEdit';
	import aboveTheFoldEl from '$lib/stores/aboveTheFoldEl';

	import feedLastUpdatedOn from '$lib/stores/feedLastUpdatedOn';

	import TwitterIcon from '$lib/icons/Twitter.svelte';
	import PageBadge from '$lib/components/PageBadge.svelte';
	import LinkedInIcon from '$lib/icons/LinkedIn.svelte';
	import iframeResize from 'iframe-resizer/js/iframeResizer';
	import userVars, { varsLastUpdatedOn } from '$lib/stores/userVars';
	import heatmap, { getHeatmapClicksCount } from '$lib/stores/heatmap';

	import { STREAM_URL, PAGE_URL } from 'lib/env';

	let clazz = '';

	export { clazz as class };

	export let isEdit = false;

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

	onMount(() => {
		isMounted = true;
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

			refreshVariables();

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

	let replaceVariable = ({ str, varName, varValue }) => {
		return str ? str.replace(`$${varName}`, varValue) : '';
	};

	if (localStorage.visitsCount) {
		localStorage.visitsCount = parseInt(localStorage.visitsCount) + 1;
	} else {
		localStorage.visitsCount = 1;
	}

	let isSubmitted;

	let varTemplatesBig = {
		title: page.title,
		subtitle: page.subtitle,
		description: page.title,
		ctaExplainer: page.ctaExplainer
	};

	let refreshVariables = (varTemplates) => {
		let systemVariables = [
			{
				name: 'visitsCount',
				value: localStorage.visitsCount || 1
			},
			{
				name: 'totalSignupsCount',
				value: page.totalSignupsCount || 0
			}
		];

		let userVariables = [];

		Object.keys($userVars).forEach((varName) => {
			userVariables.push({
				name: `user.${varName}`,
				value: $userVars[varName].value || $userVars[varName].emoji
			});
		});

		let variablesValues = {};

		let feedItemVariables = feedItem
			? [
					{
						name: 'data.title',
						value: feedItem.title
					},
					{
						name: 'data.content',
						value: feedItem.content
					}
			  ]
			: [];

		[
			...systemVariables,
			...userVariables,
			...(isNoVars ? [] : page.variables),
			...feedItemVariables
		].forEach((variable) => {
			if (variable.calculateCode) {
				variablesValues[variable.name] = eval(`(function(){${variable.calculateCode}})()`);
				variablesValues[variable.name + 'Capitalised'] = _.capitalize(
					variablesValues[variable.name]
				);
			} else if (variable.calculateFn) {
				variablesValues[variable.name] = variable.calculateFn();
			} else {
				variablesValues[variable.name] = variable.value;
			}

			let activeHero = page.activeHero;

			if (activeHero) {
				['title', 'subtitle', 'ctaExplainer'].forEach((fieldName) => {
					let str = activeHero[fieldName];

					activeHero[fieldName] = replaceVariable({
						str,
						varName: variable.name,
						varValue: variablesValues[variable.name]
					});
				});
			}

			if (page.sections?.length) {
				page.sections = page.sections.map((s) => {
					s.title = replaceVariable({
						str: s.title,
						varName: variable.name,
						varValue: variablesValues[variable.name]
					});

					s.description = replaceVariable({
						str: s.description,
						varName: variable.name,
						varValue: variablesValues[variable.name]
					});

					if (s.streamSettings && s.streamSettings.filterTags) {
						s.streamSettings.filterTags = replaceVariable({
							str: s.streamSettings.filterTags,
							varName: variable.name,
							varValue: variablesValues[variable.name]
						});
					}

					return s;
				});
			}
		});
	};

	if (browser && !page.activeHero) {
		page.activeHero = _.shuffle(page.heros)[0];
	}

	if (browser && !isEdit) {
		refreshVariables(varTemplatesBig);
	}

	let isMenuOpen = false;

	$: if ($sveltePage.url) {
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
	class="hidden sm:grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 sm:grid-cols-4 sm:grid-cols-12 sm:grid-cols-5 sm:grid-cols-3 sm:w-[392px] sm:w-[500px] sm:columns-2 sm:columns-3 sm:columns-4 sm:min-h-screen"
/>

<!-- <div style="background: url('/dark_gradient.svg');"> -->

{#key page._id}
	{#if page.theme?.layoutType === 'portfolio' || page.parentPage?.theme?.layoutType === 'portfolio'}
		<PortfolioPage bind:page />
	{:else}
		<div class="" bind:this={previewEl}>
			<div class="relative color-site min-h-screen" style="{cssVarStyles};">
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
				<!-- SQUARES -->
				{#if page?.activeHero?.theme?.bgPattern}
					{#if page?.theme?.theme === 'dark'}
						{#if page?.activeHero?.theme?.bgPattern === 'squares'}
							<div
								class="bg-root absolute z-10 inset-0 -z-50 h-screen-plus w-screen bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] [background-size:90px_90px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_90%,transparent_100%)]"
							/>
						{:else if page?.activeHero?.theme?.bgPattern === 'dots'}
							<div
								class="absolute  z-10 h-screen-plus w-screen bg-[radial-gradient(rgba(255,255,255,.1)_0.5px,transparent_1px)] [background-size:32px_32px]"
							/>
						{/if}
					{:else if page?.activeHero?.theme?.bgPattern === 'squares'}
						<div
							class="bg-root  z-10 absolute inset-0 -z-50 h-screen-plus w-screen bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)] [background-size:90px_90px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_90%,transparent_100%)]"
						/>
					{:else if page?.activeHero?.theme?.bgPattern === 'dots'}
						<div
							class="absolute  z-10 h-screen-plus w-screen bg-[radial-gradient(#c8c8c8.5px,transparent_1px)] [background-size:32px_32px]"
						/>
					{/if}
				{/if}

				<div
					class="absolute top-0 left-0"
					style="background-image: linear-gradient(rgba(0, 0, 0, 0) 82%, #0c120c), linear-gradient(rgba(12, 18, 12, .8), rgba(12, 18, 12, .8)), url('https://assets.website-files.com/636cf54cf20a6ac090f7deb0/636cfb105b88e07b40e1e494_hero-bg.svg')"
				/>

				{#if isMounted}
					<div
						class="sticky bg-none z-20 w-full {clazz}"
						style="z-index: 32;"
						in:fade={{ duration: 150 }}
					>
						<div
							class="{isEdit
								? 'absolute mb-[-60px]'
								: 'fixed top-0 left-0'} _header backdrop-blur-lg _border-b-theme"
						>
							<div class="px-4 sm:px-0 mb-4 _header-content flex justify-between items-center">
								<div class="flex  py-4 sm:py-0">
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
												width="auto"
												height="25"
												class="mr-2 rounded"
												emoji={page.parentPage?.logo || page.logo}
											/>
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
										class="hidden ml-8 sm:flex items-center justify-center font-semibold text-sm py-1 gap-4"
									>
										{#each (page.subPages || page.parentPage?.subPages || []).filter((s) => s.renderType !== 'article') as subPage}
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

										{#if !page._id && page.parentPage && !page.isUseDatabase}
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

						{#if isMenuOpen}
							<div
								in:fly={{ y: 350, duration: 250 }}
								out:fly={{ duration: 150 }}
								style="z-index: 100"
								class="left-0 top-[61px] fixed w-screen h-screen bg-site bg-background p-4"
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
									{#each page.subPages || page.parentPage?.subPages || [] as subPage}
										<a class="block  py-4 border-b border-white/20" href="/{subPage.slug}"
											>{subPage.name}</a
										>
									{/each}
								</div>
							</div>
						{/if}
						<!-- <img
						class="absolute top-0 left-0 z-0 w-full h-screen"
						src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1698794318980-image.png"
					/>
					 -->

						<!-- <Gradients gradientType={'ship'} /> -->

						<!-- <div
								class="absolute top-0 left-0 z-0 w-full h-screen "
								style="background-image: linear-gradient(to top, #030303, rgba(0, 0, 0, 0)),
							linear-gradient(104deg, rgba(225, 174, 255, 0.3), rgba(0, 108, 104, 0.3) 42%, #030303);"
							/> -->

						<!-- <div
								class="absolute top-0 left-0 z-0 w-full h-screen opacity-20 rounded-full"
								style="background-image: conic-gradient(from 180deg at 50% 50%,#2a8af6 0deg,#a853ba 180deg,#e92a67 1turn); filter: blur(75px); will-change: filter;"
							/> -->
						{#if !isLoading}
							{#if page.activeHero?.theme?.bgGradient}
								<Gradients bind:page gradientType={page.activeHero?.theme?.bgGradient.type} />
							{/if}

							{#if page.activeHero}
								<RenderHero bind:hero={page.activeHero} bind:page bind:isEmbed bind:isEdit />
							{/if}

							<div class="relative _root bg-site pt-[60px]" style="background: none;">
								{#if !isAboveTheFold}
									{#if page.sections?.length}
										<div class="relative z-10 {page.streamSlug ? '' : ''}">
											{#each page.sections || [] as section, i}
												{#if $sectionToEdit && $sectionToEdit.id === section.id}
													<div bind:this={editEl}>
														<div class="p-2 my-4 bg-green-200 text-center">🚧🚧🚧🚧🚧</div>
														<div>
															<RenderSection
																bind:page
																bind:themeStyles={styles}
																bind:section={$sectionToEdit}
																bind:isEdit
															/>
														</div>
														<div class="p-2 my-4 bg-green-200 text-center text-white">
															🚧🚧🚧🚧🚧
														</div>
													</div>
													{focusEditEl() || ''}
												{:else}
													<div class="bg-site">
														<RenderSection
															bind:page
															bind:section
															bind:themeStyles={styles}
															bind:isEdit
															style={false && page.theme?.isZebra && i % 2 === 0
																? page.theme?.theme === 'dark'
																	? `background-color: ${lighten(
																			styles['background-color'],
																			0.01
																	  )};`
																	: `background-color: ${darken(styles['background-color'], 0.08)};`
																: ''}
														/>
													</div>
												{/if}
											{/each}
										</div>
									{/if}
								{/if}
							</div>
						{/if}
					</div>
				{/if}

				{#if !isAboveTheFold}
					{#if page.streamSlug && (!page.sections || !page.sections.find((s) => s.type === 'momentum_feed'))}
						<div>
							<div class="sticky z-20 py-4 sm:py-16 bg-site">
								{#if page.links}
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
								{/if}
							</div>
						</div>
					{/if}

					<!-- {#if !page.parentPage && page.sections?.filter((s) => s.isShown)?.length && !$sveltePage.url.pathname.includes('/blog')}
						<div
							class="p-4 sm:p-8 w-full text-center bg-[#fafafa] {isAboveTheFold || isEmbed
								? ''
								: 'min-h-screen'} max-h-[100%] z-0 bottom-0 flex flex-col justify-center"
							style="color: {page.theme?.theme === 'dark'
								? '#fafafa'
								: '#222'}; background-color: {page.theme?.theme === 'dark' ? '#222' : '#fafafa'}"
						>
							<div class="mx-auto max-w-[750px] flex flex-col items-center justify-center">
								<div class="flex items-center text-lg my-4">
									<Emoji class="mr-2" emoji={page.logo} />
									<span>
										{page.name}
									</span>
								</div>
								<div class="_title text-3xl font-bold mb-8">
									{@html page.title}
								</div>
							</div>

							<div
								class="_input_container flex items-center mx-auto 
							{page.isCollectEmails
									? `w-full ${isSubmitted ? '' : '_border '}` +
									  (page.callToAction.length < 20 ? 'sm:w-[392px]' : 'sm:w-[500px]')
									: ''}"
							>
							
							</div>
						</div>
					{/if} -->

					{#if !isNoBadge && !page.isNoBadge}
						<PageBadge theme={page.theme?.theme || 'light'} />
					{/if}
				{/if}
			</div>
		</div>
	{/if}
{/key}

<!-- {#if page?.activeHero?.theme?.bgPattern === 'stars'}
	<Background />
{/if} -->

{#if page?.activeHero?.theme?.bgPattern === 'cursors'}
	<ComaDragons />
{/if}

<style>
	/* :global(.bg-site) {
		background-color: var(--background-color, white);
	} */

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
		max-width: var(--container-width);
		margin: 0 auto;
	}

	._header {
		@apply p-1 w-full;
		z-index: 40;
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

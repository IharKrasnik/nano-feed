<script>
	import SvelteMarkdown from 'svelte-markdown';
	import moment from 'moment';
	import _ from 'lodash';

	import { browser } from '$app/environment';
	import { post } from 'lib/api';
	import { POST_URL } from 'lib/env';
	import { page as sveltePage } from '$app/stores';
	import { fly, fade, slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { darken, lighten } from 'lib/helpers/color';
	import striptags from 'striptags';

	import PortfolioPage from '$lib/layouts/PortfolioPage.svelte';
	import getPageCssStyles from '$lib/services/getPageCssStyles';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import Background from '$lib/components/Background.svelte';
	import RenderSection from '$lib/components/render/Section.svelte';
	import ComaDragons from '$lib/components/animations/ComaDragons.svelte';
	import Scrolling from '$lib/components/animations/Scrolling.svelte';
	import Gradients from '$lib/components/gradients/index.svelte';

	import Emoji from '$lib/components/render/Emoji.svelte';
	import sectionToEdit from '$lib/stores/sectionToEdit';
	import aboveTheFoldEl from '$lib/stores/aboveTheFoldEl';

	import feedLastUpdatedOn from '$lib/stores/feedLastUpdatedOn';

	import TwitterIcon from '$lib/icons/Twitter.svelte';
	import PageBadge from '$lib/components/PageBadge.svelte';
	import LinkedInIcon from '$lib/icons/LinkedIn.svelte';
	import iframeResize from 'iframe-resizer/js/iframeResizer';

	import { STREAM_URL, PAGE_URL } from 'lib/env';

	let clazz = '';

	export { clazz as class };

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

	let isSubmitted = !!localStorage.submittedEmail;

	let submitEmail = async () => {
		await post(`pages/${page.slug}/submissions`, { email });
		isSubmitted = true;

		localStorage.submittedEmail = email;

		if (page.actionUrl) {
			setTimeout(() => {
				window.location.href = page.actionUrl;
			}, 2000);
		}
	};

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

	$: if (page) {
		let res = getPageCssStyles(page);
		cssVarStyles = res.cssVarStyles;
		styles = res.styles;
	}

	if (browser) {
		if ($sveltePage.params.pageSlug) {
			window.document.body.style['background-color'] = page.theme?.backgroundColor || 'white';
		} else {
			window.document.body.style['background-color'] = null;
		}
	}

	$: if (previewEl) {
		previewEl.style['background-color'] = page.theme?.backgroundColor || 'white';
	}

	let editEl;

	let focusEditEl = () => {
		setTimeout(() => {
			try {
				editEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
			} catch (err) {
				console.error(err);
			}
		}, 0);
	};

	if (window) {
		window.moment = moment;
	}

	page.variables = [
		{
			name: 'timeOfDay',
			calculateCode: `
			var currentHour = moment().format("HH");

			if (currentHour >= 3 && currentHour < 12){
					return "morning";
			} else if (currentHour >= 12 && currentHour < 17){
					return "afternoon";
			}   else if (currentHour >= 17 && currentHour < 22){
					return "evening";
			} else if (currentHour >= 22 || currentHour < 3){
					return "night";
			}
		`
		}
	];

	let replaceVariable = ({ str, varName, varValue }) => {
		return str.replace(`$${varName}`, varValue);
	};

	if (localStorage.visitsCount) {
		localStorage.visitsCount = parseInt(localStorage.visitsCount) + 1;
	} else {
		localStorage.visitsCount = 1;
	}

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

	if (browser) {
		page.variablesValues = {};

		[...systemVariables, ...(isNoVars ? [] : page.variables)].forEach((variable) => {
			if (variable.calculateCode) {
				page.variablesValues[variable.name] = eval(`(function(){${variable.calculateCode}})()`);
				page.variablesValues[variable.name + 'Capitalised'] = _.capitalize(
					page.variablesValues[variable.name]
				);
			} else {
				page.variablesValues[variable.name] = variable.value;
			}

			['title', 'subtitle', 'ctaExplainer', 'callToAction'].forEach((fieldName) => {
				page[fieldName] = replaceVariable({
					str: page[fieldName],
					varName: variable.name,
					varValue: page.variablesValues[variable.name]
				});
			});
		});
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
	class="hidden sm:grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 sm:grid-cols-4 sm:grid-cols-12 sm:grid-cols-5 sm:grid-cols-3 sm:w-[392px] sm:w-[500px] sm:columns-2 sm:columns-3 sm:columns-4 sm:min-h-screen"
/>

<!-- <div style="background: url('/dark_gradient.svg');"> -->

{#key page?._id}
	{#if page.renderType === 'portfolio'}
		<PortfolioPage bind:page />
	{:else}
		<div class="" bind:this={previewEl}>
			<div class="relative color-site ttt" style="{cssVarStyles};">
				{#if page.headerAnimation?.name === 'coma'}
					<ComaDragons />
				{/if}
				<!-- <img
				class="absolute w-screen h-screen object-cover"
				src="https://thumbs.dreamstime.com/b/beautiful-view-garden-sky-realistic-photo-beautiful-view-garden-sky-photo-photo-was-originally-taken-me-259322267.jpg?w=992"
			/> -->
				{#if page?.heroBgImage}
					<div
						class="absolute top-0 left-0 w-screen h-screen z-1"
						style="background-color: rgba(0,0,0, 0.7); z-index: 1;"
					/>
					<img
						class="absolute left-0 top-0 w-screen h-screen object-cover opacity-90"
						src={page?.heroBgImage}
					/>
				{/if}

				<!-- SQUARES -->
				{#if page?.theme?.heroPattern}
					{#if page?.theme?.theme === 'dark'}
						{#if page?.theme?.heroPattern === 'squares'}
							<div
								class="bg-root absolute z-10 inset-0 -z-50 h-screen-plus w-screen bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] [background-size:90px_90px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_90%,transparent_100%)]"
							/>
						{:else if page?.theme?.heroPattern === 'dots'}
							<div
								class="absolute  z-10 h-screen-plus w-screen bg-[radial-gradient(#ffffff_0.5px,transparent_1px)] [background-size:16px_16px]"
							/>
						{/if}
					{:else if page?.theme?.heroPattern === 'squares'}
						<div
							class="bg-root  z-10 absolute inset-0 -z-50 h-screen-plus w-screen bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)] [background-size:90px_90px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_90%,transparent_100%)]"
						/>
					{:else if page?.theme?.heroPattern === 'dots'}
						<div
							class="absolute  z-10 h-screen-plus w-screen bg-[radial-gradient(#c8c8c8.5px,transparent_1px)] [background-size:32px_32px]"
						/>
					{/if}
				{/if}

				<div
					class="absolute top-0 left-0"
					style="background-image: linear-gradient(rgba(0, 0, 0, 0) 82%, #0c120c), linear-gradient(rgba(12, 18, 12, .8), rgba(12, 18, 12, .8)), url('https://assets.website-files.com/636cf54cf20a6ac090f7deb0/636cfb105b88e07b40e1e494_hero-bg.svg')"
				/>

				<!-- DOTS -->
				<!-- 
			<div
				class="absolute h-full w-full bg-[radial-gradient(#2e2e2f_0.5px,transparent_1px)] [background-size:16px_16px]"
			/> -->

				<!-- <img
				
				class="absolute w-screen h-screen object-cover"
				src="https://as2.ftcdn.net/v2/jpg/06/15/14/25/1000_F_615142554_j3WPgAOSyTX1Ri1O6pxf0s8jx37vXLbg.jpg"
			/> -->

				{#if !noStickyHeader && scrollY > 300}
					<div
						class="fixed top-0 bg-site w-full backdrop-blur"
						style="z-index: 33;"
						in:fly={{ y: -150, duration: 150, delay: 150 }}
						out:fade={{ duration: 150, delay: 150 }}
					>
						<div
							class="flex w-full justify-between items-center container-width left-0 mx-auto p-4"
						>
							<a class="flex items-center shrink-0" href="">
								<!-- <Emoji class="mr-2" emoji={page.logo} /> -->

								<span class="font-bold  " style="font-family: var(--logo-font)">
									{page.name}
								</span>
								<div class="ml-4 opacity-70 hidden sm:block">
									{@html striptags(page.title || '')}
								</div>
							</a>

							<div class="shrink-0 flex items-center">
								{#if page.blog}
									<div class="mr-4 sm:mr-8">
										<a href={page.blog.url}>Blog</a>
									</div>
								{/if}
								{#if !isSubmitted}
									{#if page.isCollectEmails}
										<button
											class="cursor-pointer"
											style="outline: 1px rgba(255, 255, 255, .8) solid;"
											on:click={onButtonClick}>{page.callToAction}</button
										>
									{:else}
										<a href={page.actionUrl} target="_blank" class="button">
											{page.callToAction}
										</a>
									{/if}
								{/if}
							</div>
						</div>

						<hr class="border-[#8B786D] opacity-30 w-full" />
					</div>
				{/if}

				{#if isMounted}
					<div
						class="sticky bg-none z-20 w-full {clazz}"
						style="z-index: 32;"
						in:fade={{ duration: 150 }}
					>
						<div class="p-4 _header flex md:justify-between items-center justify-center">
							<a class="flex items-center shrink-0 _logo" href="">
								{#if page?.logo && page.logo.startsWith('http')}
									<Emoji class="mr-2" emoji={page.logo} />
								{/if}

								<span
									class="font-bold {page.heroBgImage ? 'light-colors' : ''}"
									style="font-family: var(--logo-font)"
								>
									{page.name}
								</span>
							</a>

							<div class="shrink-0 mt-2 hidden md:flex items-center">
								{#if page.blog}
									<div class="mr-8">
										<a href={page.blog.url}>Blog</a>
									</div>
								{/if}

								{#if !isSubmitted}
									{#if page.isCollectEmails}
										<button
											class="cursor-pointer"
											style="outline: 1px rgba(255, 255, 255, .8) solid;"
											on:click={onButtonClick}>{page.callToAction}</button
										>
									{:else}
										<a href={page.actionUrl} target="_blank" class="button">
											{page.callToAction}
										</a>
									{/if}
								{/if}
							</div>
							<!-- <button class="mt-2 cursor-pointer" on:click={onButtonClick}>{page.callToAction}</button> -->
						</div>

						<!-- <img
						class="absolute top-0 left-0 z-0 w-full h-screen"
						src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1698794318980-image.png"
					/>
					 -->

						{#if page.theme?.backgroundGradient}
							<Gradients bind:page gradientType={page.theme.backgroundGradient.type} />
						{/if}

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

						<div class="relative _root bg-site" style="background: none;">
							<div
								class="{isEmbed || page.sections?.length
									? ''
									: page.theme?.isHeroVertical
									? ''
									: 'min-h-screen h-screen'} mt-[-70px]"
							>
								<div
									bind:this={$aboveTheFoldEl}
									class="_content {page.heroBgImage ? 'light-colors' : ''} {page.theme
										?.isHeroVertical
										? ''
										: ''} h-full {page.sections?.length ? '' : 'pb-16'} pt-16 {!page.testimonials
										?.length
										? `flex items-center`
										: ''}"
									style={`${maxHeight ? `max-height: ${maxHeight}` : ''};`}
								>
									<div
										class="p-4 flex h-full w-full {page.demoUrl || page.theme?.isHeroLeft
											? `flex-col ${
													page.theme?.isHeroVertical ? '' : 'justify-between sm:flex-row'
											  } items-center`
											: 'text-center items-center'}"
									>
										<div
											class="{page.demoUrl || page.theme?.isHeroLeft
												? `w-full text-center ${
														page.theme?.isHeroVertical
															? 'flex flex-col items-center mb-8'
															: 'sm:text-left'
												  }  ${page.demoUrl ? '' : 'sm:max-w-[900px]'} items-center`
												: 'flex flex-col items-center w-full sm:w-auto mx-auto'}
										{page.theme?.isHeroLeft ? 'sm:text-left' : ''}"
										>
											{#if isMounted}
												<h1
													class="{page.theme?.isGradientTitle
														? 'bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent'
														: ''} _title 
											{!page.demoUrl || page.theme?.isHeroVertical ? 'sm:max-w-[768px]' : ''}"
													style={page.title ? '' : 'opacity: 20%;'}
													in:fly={{ y: 50, duration: 800 }}
												>
													{#if page.title}
														<div>{@html page.title}</div>
													{:else}
														{'Type Tagline...'}
													{/if}
												</h1>
											{/if}

											{#if page.subtitle}
												<h2
													class="_subtitle whitespace-pre-wrap  {page.demoUrl ||
													!page.theme?.isHeroVertical
														? ''
														: 'max-w-[600px]'}"
													in:fly={{ y: 50, duration: 800 }}
												>
													{@html page.subtitle}
												</h2>
											{/if}

											<div
												in:fly={{ y: 50, duration: 800, delay: 200 }}
												class="_input_container {page.isCollectEmails && !isSubmitted
													? '_border flex'
													: 'inline-block'} items-center {page.demoUrl || page.theme?.isHeroLeft
													? ''
													: 'mx-auto'} {page.isCollectEmails
													? 'w-full ' +
													  (page.callToAction.length < 16
															? 'sm:w-[360px]'
															: page.callToAction.length < 20
															? 'sm:w-[380px]'
															: 'sm:w-[460px]')
													: ''}"
											>
												<form
													class="{page.isCollectEmails
														? `w-full flex flex-col ${
																page.isHeroVertical ? '' : 'sm:flex-row'
														  } items-center justify-center`
														: 'mx-auto sm:mx-0 inline-block'} "
													style={!page.isCollectEmails && !page.demoUrl ? 'margin: 0 auto;' : ''}
													on:submit|preventDefault={submitEmail}
												>
													{#if !isSubmitted}
														{#if page.isCollectEmails}
															<input
																class="_input _email-input w-full"
																placeholder="Your Email"
																type="email"
																required
																bind:this={inputEl}
																bind:value={email}
																disabled={isSubmitted}
																in:fade={{ duration: 150 }}
															/>
															<button
																type="submit"
																class="_input_button justify-center {page.isCollectEmails
																	? 'sm:absolute w-full sm:w-auto mt-4 sm:mt-0'
																	: ''}">{page.callToAction}</button
															>
														{:else}
															<a href={page.actionUrl} target="_blank" class="button _input_button">
																{page.callToAction}
															</a>
														{/if}
													{:else}
														<div>💥 Thank you!</div>

														{#if page.actionUrl}
															<div class="mt-8 opacity-70">Redirecting...</div>
														{/if}
													{/if}
												</form>

												{#if page.callToAction2}
													<a href={page.callToAction.url} class="button secondary"
														>{page.callToAction2.title}</a
													>
												{/if}
											</div>
											{#if page.ctaExplainer}
												<div class="text-sm mt-4">{@html page.ctaExplainer}</div>
											{/if}

											{#if isMounted && page.socialProof}
												<div
													class="mt-16 py-4 {page.socialProof.className || ''} {page.demoUrl ||
													page.theme?.isHeroLeft
														? ''
														: 'flex justify-center w-full'} }"
												>
													<div class="flex flex-col sm:flex-row ">
														{#each page.socialProof.logos as logo}
															<img class="w-[50px] h-[50px]" src={logo.url} />
														{/each}
													</div>

													<div class="text-sm mt-4 opacity-80">{@html page.socialProof.title}</div>
												</div>
											{/if}
										</div>

										{#if page.demoUrl || page.lottieUrl}
											<div
												class="w-full  mt-16 sm:mt-0 {page.theme?.isHeroVertical
													? ''
													: 'sm:ml-8 sm:max-w-[600px]'}"
											>
												{#if page.lottie}
													<lottie-player
														src={page.lottie.jsonUrl}
														background="transparent"
														speed="1"
														class="w-full h-full"
														loop
														autoplay
													/>
												{:else if page.demoUrl}
													<RenderUrl
														isLazy={false}
														class="w-full flex justify-end {page.theme?.isHeroVertical
															? 'mt-8'
															: ''}"
														url={page.demoUrl}
														imgClass="w-full rounded-xl shadow-md object-cover"
													/>
												{/if}
											</div>
										{/if}
									</div>
								</div>
							</div>

							{#if !isAboveTheFold}
								{#if page.sections?.length}
									<div class={page.streamSlug ? '' : ''}>
										{#each page.sections as section, i}
											{#if $sectionToEdit && $sectionToEdit.id === section.id}
												<div bind:this={editEl}>
													<div class="p-2 bg-green-100 text-center">🚧🚧🚧🚧🚧</div>
													<div>
														<RenderSection
															bind:page
															bind:themeStyles={styles}
															bind:section={$sectionToEdit}
														/>
													</div>
													<div class="p-2 bg-green-100 text-center text-white">🚧🚧🚧🚧🚧</div>
												</div>
												{focusEditEl() || ''}
											{:else}
												<div class="bg-site">
													<RenderSection
														bind:page
														bind:section
														bind:themeStyles={styles}
														style={false && page.theme?.isZebra && i % 2 === 0
															? page.theme?.theme === 'dark'
																? `background-color: ${lighten(styles['background-color'], 0.01)};`
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

					{#if page.sections?.filter((s) => s.isShown)?.length}
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
								<form
									class="w-full {page.isCollectEmails ? '' : 'flex justify-center'}"
									on:submit|preventDefault={submitEmail}
								>
									{#if !isSubmitted}
										{#if page.isCollectEmails}
											<input
												class="_input _email-input w-full"
												placeholder="Your Email"
												type="email"
												required
												bind:this={inputEl}
												bind:value={email}
												disabled={isSubmitted}
												in:fade={{ duration: 150 }}
											/>
											<button
												type="submit"
												class="_input_button justify-center {page.isCollectEmails
													? 'sm:absolute w-full sm:w-auto mt-4 sm:mt-0'
													: ''}">{page.callToAction}</button
											>
										{:else}
											<a href={page.actionUrl} target="_blank" class="button _input_button">
												{page.callToAction}
											</a>
										{/if}
									{:else}
										<div>💥 Thank you!</div>

										{#if page.actionUrl}
											<div class="mt-8 opacity-70">Redirecting...</div>
										{/if}
									{/if}
								</form>
							</div>

							{#if page.blog}
								<div class="mt-8">
									<a href={page.blog.url}>Or read our Blog</a>
								</div>
							{/if}
						</div>
					{/if}

					{#if !isNoBadge && !page.isNoBadge}
						<PageBadge theme={page.theme?.theme || 'light'} />
					{/if}
				{/if}
			</div>
		</div>
	{/if}
{/key}

{#if page?.theme?.headerBgPattern?.name === 'stars'}
	<Background />
{/if}

<style>
	:global(.bg-site) {
		background-color: var(--background-color, white);
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
		max-width: var(--container-width);
		margin: 0 auto;
	}

	.container-width {
		max-width: var(--container-width);
	}

	._header {
		max-width: var(--container-width);
		margin: 0 auto;
		position: relative;
		z-index: 40;
	}

	._logo {
		font-family: var(--title-font);
		font-weight: bold;
		font-size: 18px;
		margin-top: 12px;
	}

	:global(._title) {
		font-family: Archivo;
	}

	._title {
		font-family: Archivo;
		font-size: var(--title-font-size, 36px);
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
		font-size: 20px;
		line-height: 1.4;
		margin-bottom: 40px;
		max-width: 650px;
		font-family: var(--subtitle-font);
	}

	._input_container {
		position: relative;
		border-radius: var(--button-radius);
	}

	@media (min-width: 640px) {
		._input_container._border {
			border: 1px var(--text-color) solid;
		}
	}

	@media (max-width: 640px) {
		._input_container input {
			border: 1px var(--text-color) solid;
		}
	}

	._input {
		background: var(--input-background);
		color: var(--input-color);
		width: 100%;
		padding: 10px 18px;
		border-radius: var(--button-radius);
		font-size: 16px;
	}

	button,
	.button {
		border-radius: var(--button-radius);
		padding: 8px 16px;
		cursor: pointer;

		background-color: var(--accent-color);
		color: var(--button-color);
		font-size: 15px;
		font-weight: 500;
	}

	.button.secondary {
		background: none !important;
		color: white;
	}

	._input_button {
		display: flex;
		align-items: center;
		z-index: 100;
		height: 100%;
		right: 0;
		top: 0;
	}

	._momentum-stream {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 500px;
		height: 600px;
	}
</style>

<script>
	import SvelteMarkdown from 'svelte-markdown';

	import { post } from 'lib/api';
	import { page as sveltePage } from '$app/stores';
	import { fly, fade, slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { darken, lighten } from 'lib/helpers/color';

	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import RenderSection from '$lib/components/render/Section.svelte';

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

	let isMounted = false;

	onMount(() => {
		isMounted = true;
	});

	let email;
	let isSubmitted = false;

	let submitEmail = async () => {
		await post(`pages/${page.slug}/submissions`, { email });
		isSubmitted = true;

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

	let fontPairs = [
		{ title: 'Archivo', text: 'Inter' },
		{ title: 'Calistoga', text: 'IBM Plex Sans' },
		{ title: 'Chillax', text: 'Gilroy' },
		{ title: 'Fraunces', text: 'Poppins' },
		{ title: 'Syne', text: 'Syne' },
		{ title: 'Quattrocento', text: 'Questrial' },
		{ title: 'Albert Sans', text: 'Barlow' }
	];

	$: if (page) {
		styles = {
			'title-font': page.theme?.titleFont || fontPairs[0].title,
			'text-font': page.theme?.textFont || fontPairs[0].text,
			'background-color': page.theme?.backgroundColor || '#ffffff',
			'text-color': page.theme?.textColor || '#111',
			'accent-color': page.theme?.accentColor || '#000',
			'section-background-color': page.theme?.sectionBackgroundColor || 'rgb(128, 127, 128, 0.05)',
			'input-background': page.theme?.inputBackground || '#f5f5f5',
			'input-color': page.theme?.inputColor || '#222222',
			'button-color': page.theme?.buttonColor || '#fff'
		};

		cssVarStyles = Object.entries(styles)
			.map(([key, value]) => `--${key}:${value}`)
			.join(';');
	}

	if ($sveltePage.params.pageSlug) {
		window.document.body.style['background-color'] = page.theme?.backgroundColor || 'white';
	} else {
		window.document.body.style['background-color'] = null;
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
	class="hidden sm:grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 sm:grid-cols-4 sm:grid-cols-5 sm:grid-cols-3 sm:w-[392px] sm:w-[500px] sm:columns-2 sm:columns-3 sm:columns-4 sm:min-h-screen"
/>

<!-- <div style="background: url('/dark_gradient.svg');"> -->

{#key page?._id}
	<div>
		<div class="color-site" style="{cssVarStyles};">
			{#if !noStickyHeader && scrollY > 300}
				<div
					class="fixed top-0 z-30 bg-site w-full"
					in:fly={{ y: -150, duration: 150, delay: 150 }}
					out:fade={{ duration: 150, delay: 150 }}
				>
					<div
						class="flex w-full justify-between items-center max-w-[1080px] left-0 mx-auto py-2 px-4 sm:px-0"
					>
						<a class="flex items-center shrink-0" href="">
							<Emoji class="mr-2" emoji={page.logo} />
							<span class="font-bold  ">
								{page.name}
							</span>
							<div class="ml-4 opacity-70 hidden sm:block">
								{@html page.title}
							</div>
						</a>

						<div class="shrink-0">
							{#if !isSubmitted}
								{#if page.isCollectEmails}
									<button
										class="cursor-pointer"
										style="border: 2px rgba(255, 255, 255, .8) solid;"
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
				<div class="sticky bg-site z-20 w-full {clazz}" in:fade={{ duration: 150 }}>
					<div class="sm:p-4 p-8 _header flex md:justify-between items-center justify-center">
						<a class="flex items-center shrink-0 _logo" href="">
							<Emoji class="mr-2" emoji={page.logo} />

							<span class="font-bold">
								{page.name}
							</span>
						</a>

						<div class="shrink-0 mt-2 hidden md:block">
							{#if !isSubmitted}
								{#if page.isCollectEmails}
									<button
										class="cursor-pointer"
										style="border: 2px rgba(255, 255, 255, .8) solid;"
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

					<div class="_root bg-site">
						<div
							bind:this={$aboveTheFoldEl}
							class="_content pb-16 pt-8 sm:pt-32 {!page.testimonials?.length
								? `${isAboveTheFold || isEmbed ? '' : 'sm:min-h-screen'} flex items-center`
								: ''}"
							style={maxHeight ? `max-height: ${maxHeight}` : ''}
						>
							<div
								class="sm:p-8 p-4 flex h-full w-full {page.demoUrl
									? `flex-col ${
											page.theme?.hero === 'vertical' ? '' : 'sm:flex-row'
									  } justify-between items-center`
									: 'text-center items-center'}"
							>
								<div
									class={page.demoUrl
										? `w-full text-center ${
												page.theme?.hero === 'vertical'
													? 'flex flex-col items-center mb-8'
													: 'sm:text-left'
										  } sm:max-w-[500px] items-center`
										: 'flex flex-col items-center w-full sm:w-auto mx-auto'}
								>
									<h1
										class="_title {!page.demoUrl || page.theme?.hero === 'vertical'
											? 'sm:max-w-[750px]'
											: ''}"
										style={page.title ? '' : 'opacity: 20%;'}
									>
										{#if page.title}
											<div>{@html page.title}</div>
										{:else}
											{'Type Tagline...'}
										{/if}
									</h1>

									{#if page.subtitle}
										<h2
											class="_subtitle whitespace-pre-wrap  {!page.demoUrl ||
											page.theme?.hero === 'vertical'
												? 'max-w-[600px]'
												: ''}"
										>
											{@html page.subtitle}
										</h2>
									{/if}

									<div
										class="_input_container {page.isCollectEmails && !isSubmitted
											? '_border '
											: ''} flex items-center {page.demoUrl ? '' : 'mx-auto'} {page.isCollectEmails
											? 'w-full ' +
											  (page.callToAction.length < 20 ? 'sm:w-[392px]' : 'sm:w-[500px]')
											: ''}"
									>
										<form
											class="{page.isCollectEmails
												? `w-full flex flex-col ${
														page.theme?.hero === 'vertical' ? '' : 'sm:flex-row'
												  } items-center justify-center`
												: 'mx-auto sm:mx-0'} "
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
									</div>
								</div>

								{#if page.demoUrl}
									<div class="w-full sm:max-w-[600px] mt-16 sm:mt-0 sm:ml-8">
										<RenderUrl
											isLazy={false}
											class="w-full flex justify-end"
											url={page.demoUrl}
											imgClass=""
										/>
									</div>
								{/if}
							</div>

							{#if isMounted && page.testimonials?.length}
								<div
									class="p-4 sm:p-8 w-full flex flex-col sm:flex-row justify-center mt-16 sm:mt-32"
								>
									{#each page.testimonials as testimonial, i}
										<div
											class="p-4 rounded-2xl w-full sm:max-w-[350px] mr-4 mb-4 sm:mb-0 bg-section"
											in:fly={{ x: -50, y: -50, duration: 150, delay: 150 * (i + 1) }}
										>
											<div class="flex flex-col sm:flex-row">
												{#if testimonial.avatarUrl}
													<div class="mr-4 mb-4 sm:mb-0">
														<img
															src={testimonial.avatarUrl}
															class="max-w-[50px] aspect-square rounded-full"
														/>
													</div>
												{/if}
												<div>
													<SvelteMarkdown class="test" source={testimonial.name} />
													<div class="mt-1 opacity-80">
														<SvelteMarkdown source={testimonial.comment} />
													</div>
												</div>
											</div>
										</div>
									{/each}
								</div>
							{/if}
						</div>

						{#if !isAboveTheFold}
							{#if page.sections?.length}
								<div class={page.streamSlug ? '' : ''}>
									{#each page.sections as section, i}
										{#if $sectionToEdit && $sectionToEdit.id === section.id}
											<div bind:this={editEl}>
												<div class="p-2 bg-green-100 text-center">🚧🚧🚧🚧</div>
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
											<RenderSection
												bind:page
												bind:section
												bind:themeStyles={styles}
												style={false && page.theme?.isZebra && i % 2 === 0
													? page.theme.theme === 'dark'
														? `background-color: ${lighten(styles['background-color'], 0.01)};`
														: `background-color: ${darken(styles['background-color'], 0.08)};`
													: ''}
											/>
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
							<RenderSection
								class="p-0"
								section={{
									columns: 1,
									items: [
										{
											title: 'We Build In Public',
											description: 'Follow our journey in social network and blogs.'
										}
									]
								}}
							/>

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

						{#key $feedLastUpdatedOn + page.theme?.sectionTheme}
							<iframe
								id="iframeResize"
								loading="lazy"
								on:load={resize}
								class="w-full sticky z-20 pb-[200px] bg-site"
								src="{STREAM_URL}/{page.streamSlug}/embed?theme={page.theme?.sectionTheme ||
									'light'}&isHorizontal=true&limit=15&isViewAll=true&bgColor={styles[
									'section-background-color'
								].replace('#', '%23')}"
							/>
						{/key}
					</div>
				{/if}

				{#if page.streamSlug || page.sections?.length}
					<div
						class="p-4 sm:p-8 w-full text-center bg-[#fafafa] {isAboveTheFold || isEmbed
							? ''
							: 'min-h-screen'} max-h-[100%] sticky z-0 bottom-0 flex flex-col justify-center"
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
					</div>
				{/if}

				{#if !isNoBadge && !page.isNoBadge}
					<PageBadge />
				{/if}
			{/if}
		</div>
	</div>
{/key}

<style>
	:global(.bg-site) {
		background-color: var(--background-color, white);
	}

	:global(.bg-section) {
		background-color: var(--section-background-color);
	}

	.color-site {
		color: var(--text-color, black);
		font-family: var(--text-font);
	}

	._root {
		width: 100%;
		max-width: 1080px;
		margin: 0 auto;
	}

	._header {
		max-width: 1080px;
		margin: 0 auto;
	}

	._logo {
		font-family: var(--title-font);
		font-weight: bold;
		font-size: 18px;
		margin-top: 12px;
	}

	._content {
		margin-top: -40px;
	}

	:global(._title) {
		font-family: Archivo;
	}

	._title {
		font-family: Archivo;
		font-size: 36px;
		line-height: 1.2;
		margin-bottom: 32px;
	}

	:global(._root ._title) {
		font-family: var(--title-font) !important;
	}

	:global(._title b, ._title em) {
		background-color: var(--accent-color);
		color: var(--button-color);
		opacity: 0.9;
	}

	._subtitle {
		font-size: 18px;
		line-height: 26px;
		margin-bottom: 40px;
	}

	._input_container {
		position: relative;

		border-radius: 25px;
	}

	@media (min-width: 640px) {
		._input_container._border {
			border: 3px white solid;
		}
	}

	@media (max-width: 640px) {
		._input_container input {
			border: 2px rgba(255, 255, 255, 0.8) solid;
		}
	}

	._input {
		background: var(--input-background);
		color: var(--input-color);
		width: 100%;
		padding: 10px 18px;
		border-radius: 20px;
		font-size: 16px;
	}

	button,
	.button {
		border-radius: 20px;
		padding: 5px 20px;

		background-color: var(--accent-color);
		color: var(--button-color);
	}

	._input_button {
		padding: 13px 30px;
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

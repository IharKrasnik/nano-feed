<script>
	import SvelteMarkdown from 'svelte-markdown';

	import { post } from 'lib/api';
	import { page as sveltePage } from '$app/stores';
	import { fly, fade, slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import RenderSection from '$lib/components/render/Section.svelte';
	import RenderFAQ from '$lib/components/render/FAQ.svelte';
	import Emoji from '$lib/components/render/Emoji.svelte';

	import TwitterIcon from '$lib/icons/Twitter.svelte';
	import LinkedInIcon from '$lib/icons/LinkedIn.svelte';
	import iframeResize from 'iframe-resizer/js/iframeResizer';

	import { STREAM_URL, PAGE_URL } from 'lib/env';

	export let page = {
		name: 'momentum',
		slug: 'momentum',
		title: 'Build a better product in public and grow your audience',
		subtitle:
			'Momentum instructs you how to create and distribute your content. Add subscribers early and build based on real users feedback.',
		callToAction: 'Join Waitlist',
		bgColor: '#D98324'
	};

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

	$: if (page) {
		let styles = {
			'background-color': page.theme?.backgroundColor || 'white',
			'text-color': page.theme?.textColor || '#111',
			'accent-color': page.theme?.accentColor || '#000'
		};

		cssVarStyles = Object.entries(styles)
			.map(([key, value]) => `--${key}:${value}`)
			.join(';');
	}

	if ($sveltePage.params.pageSlug) {
		window.document.body.style['background-color'] = page.theme?.backgroundColor || 'white';
	}
</script>

<svelte:window bind:scrollY />

<div
	class="sm:grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 sm:grid-cols-4 sm:grid-cols-5 sm:grid-cols-3 sm:w-[392px] sm:w-[500px]"
/>

<div class="color-site" style={cssVarStyles}>
	{#if !noStickyHeader && scrollY > 300}
		<div
			class="fixed top-0 z-30 bg-site w-full"
			in:fly={{ y: -150, duration: 150, delay: 150 }}
			out:fade={{ duration: 150, delay: 150 }}
		>
			<div
				class="flex w-full justify-between items-center max-w-[1080px] left-0 mx-auto py-2 px-4 sm:px-0"
			>
				<a class="flex items-center shrink-0" href="/">
					<Emoji class="mr-2" emoji={page.logo} />
					<span class="font-bold">
						{page.name}
					</span>
					<div class="ml-4 opacity-70 hidden sm:block">
						&nbsp; {page.title}
					</div>
				</a>

				<div class="shrink-0">
					{#if !isSubmitted}
						{#if page.isCollectEmails}
							<button class="cursor-pointer" on:click={onButtonClick}>{page.callToAction}</button>
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
		<div class="sticky bg-site z-20 w-full sm:p-4 p-8" in:fade={{ duration: 150 }}>
			<div class="_header flex justify-between items-center">
				<a class="flex items-center shrink-0 _logo" href="/">
					<Emoji class="mr-2" emoji={page.logo} />
					{page.name}
				</a>

				<div class="shrink-0 mt-2">
					{#if !isSubmitted}
						{#if page.isCollectEmails}
							<button class="cursor-pointer" on:click={onButtonClick}>{page.callToAction}</button>
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
					class="_content pb-16 pt-32 {!page.testimonials?.length ? 'sm:h-screen' : ''}"
					style={!page.testimonials}
				>
					<div
						class="flex h-full {page.demoUrl
							? 'flex-col sm:flex-row justify-between items-center'
							: 'text-center items-center'}"
					>
						<div
							class={page.demoUrl
								? 'w-full text-center sm:text-left sm:max-w-[500px] items-center'
								: 'flex flex-col items-center w-full sm:w-auto sm:max-w-[600px] mx-auto'}
						>
							<h1 class="_title">{page.title}</h1>

							{#if page.subtitle}
								<h2 class="_subtitle">{page.subtitle}</h2>
							{/if}

							<div
								class="_input_container flex items-center w-full {page.demoUrl
									? ''
									: 'mx-auto'} {page.callToAction.length < 20 ? 'sm:w-[392px]' : 'sm:w-[500px]'}"
							>
								<form
									class="{page.isCollectEmails
										? 'w-full flex flex-col sm:flex-row items-center justify-center'
										: 'mx-auto sm:mx-0'} "
									style={!page.isCollectEmails && !page.demoUrl ? 'margin: 0 auto;' : ''}
									on:submit|preventDefault={submitEmail}
								>
									{#if !isSubmitted}
										{#if page.isCollectEmails}
											<input
												class="_input w-full"
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
								<RenderUrl class="w-full flex justify-end" url={page.demoUrl} imgClass="" />
							</div>
						{/if}
					</div>

					{#if isMounted && page.testimonials?.length}
						<div class="w-full flex flex-col sm:flex-row justify-center mt-16 sm:mt-32">
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
											<SvelteMarkdown source={testimonial.name} />
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

				{#if page.sections?.length}
					<div class={page.streamSlug ? '' : 'pb-[200px]'}>
						{#each page.sections as section}
							<RenderSection bind:section />
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}

	<RenderFAQ bind:page />

	{#if page.streamSlug}
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

			<iframe
				id="iframeResize"
				on:load={resize}
				class="w-full sticky z-20 pb-[200px] bg-site"
				src="{STREAM_URL}/{page.streamSlug}/embed?theme={page.theme?.theme ||
					'light'}&isHorizontal=true&limit=15&isViewAll=true&bgColor=rgb(128, 127, 128, 0.05)"
			/>
		</div>
	{/if}

	{#if page.streamSlug || page.sections?.length}
		<!-- <div class="h-screen sticky"></div> -->

		<div
			class="w-full text-center bg-[#fafafa] h-screen sticky z-0 bottom-0 flex flex-col justify-center p-4"
			style="color: {page.theme?.theme === 'dark' ? '#fafafa' : '#222'}; background-color: {page
				.theme?.theme === 'dark'
				? '#222'
				: '#fafafa'}"
		>
			<div class="mx-auto max-w-[600px] flex flex-col items-center justify-center">
				<div class="flex items-center text-lg my-4">
					<Emoji class="mr-2" emoji={page.logo} />
					{page.name}
				</div>
				<div class="text-3xl font-bold mb-8">
					{page.title}
				</div>
			</div>

			<div
				class="_input_container flex items-center mx-auto w-full {page.callToAction.length < 20
					? 'sm:w-[392px]'
					: 'sm:w-[500px]'}"
			>
				<form
					class="w-full {page.isCollectEmails ? '' : 'flex justify-center'}"
					on:submit|preventDefault={submitEmail}
				>
					{#if !isSubmitted}
						{#if page.isCollectEmails}
							<input
								class="_input w-full"
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
</div>

<style>
	:global(.bg-site) {
		background-color: var(--background-color, white);
	}

	:global(.bg-section) {
		background-color: rgb(128, 127, 128, 0.05);
	}

	.color-site {
		color: var(--text-color, black);
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
		font-family: Archivo;
		font-weight: bold;
		font-size: 18px;
		margin-top: 12px;
	}

	._content {
		margin-top: -40px;
	}

	._title {
		font-family: Archivo;
		font-size: 36px;
		line-height: 1.2;
		margin-bottom: 32px;
	}

	._subtitle {
		font-size: 18px;
		line-height: 26px;
		margin-bottom: 40px;
	}

	._input_container {
		position: relative;
	}

	._input {
		background: #f5f5f5;
		color: #222;
		width: 100%;
		padding: 10px 18px;
		border-radius: 20px;
		font-size: 16px;
	}

	button,
	.button {
		border-radius: 20px;
		padding: 5px 20px;

		color: white;
		background-color: var(--accent-color);
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

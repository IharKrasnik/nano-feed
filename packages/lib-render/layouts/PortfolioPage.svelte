<script>
	import getPageCssStyles from 'lib-render/services/getPageCssStyles';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import RenderSection from 'lib-render/components/render/Section.svelte';
	import { page as sveltePage } from '$app/stores';
	import { lighten, darken, getLuminance } from 'lib/helpers/color';
	import { goto } from '$app/navigation';
	import slug from 'slug';
	import { browser } from '$app/environment';
	export let page;

	let cssVarStyles = '';

	let styles = {
		'container-width': page.theme?.containerWidth || '768px'
	};

	$: if (page) {
		page.theme.containerWidth = '768px';
		let res = getPageCssStyles(page);
		cssVarStyles = res.cssVarStyles;
		styles = res.styles;
	}

	let activeSection;

	if (page.sections) {
		if ($sveltePage.url.searchParams.get('section')) {
			activeSection = page.sections.find(
				(s) => slug(s.title) === $sveltePage.url.searchParams.get('section').toLowerCase().trim()
			);
		} else {
			activeSection = page.sections[0];
		}
	}

	let setSection = (section) => {
		activeSection = section;
		$sveltePage.url.searchParams.set('section', slug(section.title));
		goto(`?${$sveltePage.url.searchParams.toString()}`);
	};

	let sources = [
		{
			test: 'twitter.com',
			source: 'twitter'
		},
		{
			test: 'x.com',
			source: 'twitter'
		},
		{
			test: 'linkedin.com',
			source: 'linkedin'
		},
		{
			test: 'indiehackers',
			source: 'indiehackers'
		},
		{
			test: 'loom.com',
			source: 'loom'
		},
		{
			test: 'notion.site',
			source: 'notion'
		},
		{
			test: 'youtube.com',
			source: 'youtube'
		},
		{
			test: 'twitter.com',
			source: 'twitter'
		},
		{
			test: 'dribbble.com',
			source: 'dribbble'
		},
		{
			test: 'instagram.com',
			source: 'instagram'
		},
		{
			test: 'tiktok.com',
			source: 'tiktok'
		},
		{
			test: 'medium.com',
			source: 'medium'
		},
		{
			test: 'reddit.com',
			source: 'reddit'
		}
	];

	let getIconName = ({ url }) => {
		let mediaSource;
		for (var i = 0; i < sources.length; i++) {
			if (url.includes(sources[i].test)) {
				mediaSource = sources[i].source;
				break;
			}
		}

		return mediaSource;
	};
</script>

<div class="relative" style={cssVarStyles}>
	<div
		class="relative header w-full bg-cover {page.parentPage ? 'h-[80px]' : 'h-[250px]'}"
		style="background-image: url({page.theme.heroBgImage || page.parentPage?.theme?.heroBgImage}); "
	>
		<div
			class="absolute top-0 left-0 w-full h-full z-1"
			style="background-color: rgba(0,0,0, 0.3); z-index: 1;"
		/>

		{#if page.subtitle}
			<div class="absolute z-10 top-0 left-0 w-full h-full flex items-center justify-center">
				<!-- <div class="_description  max-w-[768px] text-center mx-auto p-8">{page.subtitle || ''}</div> -->
			</div>
		{/if}
	</div>

	{#key page._id}
		<div
			class="relative z-10 container _container-width mx-auto px-4 sm:px-8 {page.parentPage
				? ''
				: ''}"
		>
			<div class="flex items-end">
				<div class="flex items-center justify-between w-full">
					<div
						class="{page.parentPage
							? 'w-[64px] h-[64px] mt-[-32px]'
							: 'w-[128px] h-[128px] mt-[-64px]'} mr-6 mb-4"
					>
						{#if page.demoUrl || page.parentPage?.demoUrl}
							<a href="/">
								<RenderUrl
									imgClass="transition rounded-full w-full {page.parentPage
										? 'grayscale hover:grayscale-0'
										: ''}"
									url={page.demoUrl || page.parentPage?.demoUrl}
								/>
							</a>
						{/if}
					</div>
					<div class="flex gap-4 items-center">
						{#each page.parentPage?.links || page.links || [] as link}
							{#if getIconName(link)}
								<a href={link.url} class="_button grayscale hover:grayscale-0" target="_blank">
									<FeatherIcon
										color={darken(page.theme?.accentColor || '#111', 0.3)}
										name={getIconName(link)}
									/>
								</a>
							{:else}
								<button> 🔗 </button>
							{/if}
						{/each}
					</div>
				</div>
			</div>
			<div>
				<div>
					<div class="_title mt-2">{@html page.title || ''}</div>
					<div class="_description mt-2">{@html page.subtitle || ''}</div>
				</div>
			</div>
		</div>
		{#if page.parentPage}
			<hr class="my-8" />
		{/if}
		{#if !page.parentPage}
			<div class="_container-width flex items-center justify-between">
				<div class="flex gap-4 mt-8 text-lg px-8 py-4">
					{#each page.parentPage?.sections || page.sections || [] as section}
						<div
							class="cursor-pointer transition pb-4 mr-8"
							on:click={() => setSection(section)}
							class:selected={section === activeSection}
						>
							{section.title || ''}
						</div>
					{/each}
				</div>
			</div>

			<hr
				class="border w-full"
				style="border-color: {(page.parentPage?.theme || page.theme)?.theme === 'dark'
					? 'var(--accent-color-lighter-lg)'
					: 'var(--accent-color-darker)'}; margin-top: -16px;"
			/>

			<div class="relative z-10 container _container-width mx-auto">
				{#if activeSection}
					<div class="mt-8 px-8 py-4">
						<div class="_title">{@html activeSection.title}</div>
						<div class="mt-4">{@html activeSection.description}</div>
					</div>

					{#key activeSection.id}
						<RenderSection
							class="sm:px-8 sm:pt-4"
							bind:page
							bind:section={activeSection}
							bind:themeStyles={styles}
							isSkipHeader
						/>
					{/key}
				{/if}
			</div>
		{:else}
			{#each page.sections || [] as section (section.id)}
				<RenderSection
					class="_horizontal-padding-none px-4 "
					bind:page
					bind:section
					bind:themeStyles={styles}
				/>
			{/each}
		{/if}
	{/key}
</div>

<style>
	:global body {
		font-family: var(--text-font);
	}

	._title {
		font-family: var(--title-font);
		@apply text-3xl;
		margin: 0;
	}

	._description {
		@apply text-xl;
	}

	._container-width {
		max-width: var(--container-width);
		@apply mx-auto;
	}

	.selected {
		font-weight: bold;
		border-bottom: 2px var(--accent-color-darker) solid;
		margin-bottom: -2px;
	}
</style>

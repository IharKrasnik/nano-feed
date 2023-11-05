<script>
	import getPageCssStyles from '$lib/services/getPageCssStyles';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import FeatherIcon from '$lib/components/FeatherIcon.svelte';
	import RenderSection from '$lib/components/render/Section.svelte';

	import { browser } from '$app/environment';
	export let page;

	let cssVarStyles = '';

	let styles = {
		'container-width': page.theme?.containerWidth || '900px'
	};

	$: if (page) {
		page.theme.containerWidth = '768px';
		let res = getPageCssStyles(page);
		cssVarStyles = res.cssVarStyles;
		styles = res.styles;
	}

	let activeSection = page.sections ? page.sections[0] : null;

	let setSection = (section) => {
		activeSection = section;
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
		class="relative header w-full bg-cover h-[250px]"
		style="background-image: url({page.heroBgImage}); "
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

	<div class="relative z-10 container container-width mx-auto p-4">
		<div class="flex items-end">
			<div class="flex items-center justify-between w-full">
				<div class="w-[128px] h-[128px] mt-[-64px] mr-6 mb-4">
					{#if page.demoUrl}
						<RenderUrl imgClass="rounded-full w-full" url={page.demoUrl} />
					{/if}
				</div>
				<div class="flex gap-4 items-center">
					{#each page.links || [] as link}
						{#if getIconName(link)}
							<a href={link.url} class="_button" target="_blank">
								<FeatherIcon name={getIconName(link)} />
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
				<div class="_title mt-2">{page.title || ''}</div>
				<div class="_description mt-2">{page.subtitle || ''}</div>
			</div>
		</div>
	</div>

	<div class="container-width flex items-center justify-between p-4">
		<div class="flex gap-4 mt-8 text-lg">
			{#each page.sections || [] as section}
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

	<hr class="border w-full border-[#cccccc]" style="margin-top: -16px;" />

	<div class="relative z-10 container container-width mx-auto">
		{#if activeSection}
			<div class="mt-8 p-4">
				<div class="_title">{@html activeSection.title}</div>
				<div class="mt-4">{@html activeSection.description}</div>
			</div>

			<RenderSection
				bind:page
				bind:section={activeSection}
				bind:themeStyles={styles}
				isSkipHeader
			/>
		{/if}
	</div>
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

	.container-width {
		max-width: var(--container-width);
		@apply mx-auto;
	}

	.selected {
		font-weight: bold;
		border-bottom: 2px black solid;
		margin-bottom: -2px;
	}
</style>

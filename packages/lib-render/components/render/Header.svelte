<script>
	import trackClick from 'lib/services/trackClick';
	import { fly } from 'svelte/transition';
	import heatmap, { getHeatmapClicksCount } from 'lib-render/stores/heatmap';
	import Emoji from 'lib/components/Emoji.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import RenderInteractiveOptions from 'lib-render/components/render/InteractiveOptions.svelte';
	import { page as sveltePage } from '$app/stores';
	import { browser } from '$app/environment';

	export let page;
	export let isEdit;
	export let isEmbed;

	let parentPage;
	$: parentPage = page.parentPage || page;

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

	let groupLinks = ({ isHeader, isFooter } = {}) => {
		let grouped = {};

		(parentPage.links || [])
			.filter((link) => link.groupName)
			.filter((link) => (isHeader ? link.isShowInHeader : link.isShowInFooter))
			.forEach((link) => {
				if (!grouped[link.groupName]) {
					grouped[link.groupName] = { links: [] };
				}

				link.url = link.url || `/${link.pageSlug || link.slug}`;
				grouped[link.groupName].links.push(link);
			});

		let groupArr = [];

		Object.keys(grouped).forEach((key) => {
			if (key) {
				groupArr.push({ groupName: key, links: grouped[key].links });
			}
		});
		return groupArr;
	};
</script>

<div
	class="{isEmbed ? '' : 'fixed'} w-full _header backdrop-blur-lg _border-b-theme"
	style="{isEdit ? 'width: calc(100% - 498px);' : ''} z-index: 100;"
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
						sectionId: `${parentPage._id}_header`,
						linkId: 'home',
						url: '/',
						text: parentPage.name
					});
				}}
				class:heatmap={$heatmap}
				data-heatmap-clicks-count={$heatmap
					? getHeatmapClicksCount({
							sectionId: `${parentPage._id}_header`,
							linkId: `home`
					  })
					: ''}
			>
				{#if parentPage.logo || page?.logo}
					<Emoji width="25" class="mr-2 rounded" emoji={parentPage.logo} />

					{#if !page.theme?.isHidePageName}
						<span class="font-medium text-base {page.theme?.heroBgImage ? 'light-colors' : ''}">
							{page.parentPage?.name || page.name}
						</span>
					{/if}
				{:else}
					<span
						class="font-bold {page.theme?.heroBgImage ? 'light-colors' : ''}"
						style="font-family: var(--logo-font)"
					>
						{parentPage.name}
					</span>
				{/if}
			</a>

			<div
				class="hidden ml-8 sm:flex items-center {page.theme?.headerAlign === 'left'
					? 'justify-start'
					: page.theme?.headerAlign === 'center'
					? 'justify-center'
					: 'justify-end'} text-sm py-1 gap-4 w-full mr-8"
				style="z-index: 50"
			>
				{#each (parentPage.links || []).filter((l) => !l.groupName && l.isShowInHeader) as link}
					<a
						href={`${link.url || `/${link.pageSlug || link.slug}`}`}
						data-sveltekit-preload-data="hover"
						on:click={() => {
							trackClick({
								pageId: page?._id,
								sectionId: `${page._id}_header`,
								linkId: link.id,
								url: `${link.url}`,
								text: link.name
							});
						}}
						class:heatmap={$heatmap}
						data-heatmap-clicks-count={$heatmap
							? getHeatmapClicksCount({
									pageId: page?._id,
									sectionId: `${page._id}_header`,
									linkId: link.id
							  })
							: ''}>{link.name}</a
					>
				{/each}

				{#each groupLinks({ isHeader: true }) as link}
					<div class="group relative">
						<div
							class="font-medium flex items-center justify-center group-hover:bg-cta-stronger p-1 rounded cursor-pointer"
						>
							{link.groupName}
							<div class=" ">
								<FeatherIcon
									class="ml-1 group-hover:rotate-180 origin-center transition"
									name="chevron-down"
									size="15"
									theme={page.theme?.theme}
								/>
							</div>
						</div>

						<div
							class="hidden opacity-0 group-hover:opacity-100 group-hover:block transition duration-300 absolute  top-[20px] py-6 right-0 rounded"
							style="transform: translateY(0%);"
						>
							<div
								class="_bg-cta ring-1 ring-white/30 p-3 shadow-md shadow-black flex  gap-2 rounded"
							>
								{#each link.links || [] as subLink}
									<a
										href={subLink.url}
										class="px-2 py-2 cursor-pointer rounded transition duration-75 hover:bg-cta-stronger"
									>
										{subLink.name}
									</a>
								{/each}
							</div>
						</div>
					</div>
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
			<div class="shrink-0 hidden md:flex gap-6 items-center text-sm py-1 font-semibold">
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
		style="z-index: 150;"
		class="left-0 top-[66px] fixed w-screen h-screen overflow-y-auto bg-background p-4"
	>
		{#if page.activeHero}
			<RenderInteractiveOptions bind:sectionItem={page.activeHero} bind:page />
		{:else if page.parentPage && page.parentPage.heros?.length}
			<RenderInteractiveOptions size="small" sectionItem={page.parentPage.heros[0]} {page} />
		{/if}

		<div class="flex flex-col mt-8">
			{#each (parentPage.links || []).filter((l) => !l.isHidden && l.isShowInHeader) as link}
				<a class="block py-4 border-b border-white/20 shrink-0" href={link.url || `/${link.slug}`}
					>{link.name}</a
				>
			{/each}
		</div>
	</div>
{/if}

<style>
	._header {
		@apply p-1 w-full;
		z-index: 50;
	}

	._header ._header-content {
		max-width: var(--container-width);
		margin: 0 auto;
	}
</style>

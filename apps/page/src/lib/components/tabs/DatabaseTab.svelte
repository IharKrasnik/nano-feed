<script>
	import RenderSection from '$lib/components/render/Section.svelte';
	import RenderMomentumCollection from '$lib/components/render/MomentumCollection.svelte';
	import getPageCssStyles from '$lib/services/getPageCssStyles';

	export let page;
	export let streamSlug;

	let cssVarStyles;
	let styles;

	$: if (page) {
		let res = getPageCssStyles(page);
		cssVarStyles = res.cssVarStyles;
		styles = res.styles;
	}

	let getSection = () => ({
		id: streamSlug,
		streamSlug,
		isShowSource: false,
		renderType: 'feed',
		columns: 3,
		items: [],
		linkType: 'interactive',
		totalItemsLength: 0,
		isMasonryGrid: false
	});
</script>

{#if streamSlug}
	{#key streamSlug}
		<div class="p-16 bg-background" style="{cssVarStyles}; color: var(--text-color);">
			<RenderMomentumCollection
				isUseCache
				bind:cacheId={streamSlug}
				bind:page
				section={getSection()}
			/>
		</div>
	{/key}
{/if}

<div class="px-8 py-16" />

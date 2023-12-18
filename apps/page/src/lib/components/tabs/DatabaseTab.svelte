<script>
	import RenderSection from 'lib-render/components/render//Section.svelte';
	import RenderMomentumCollection from 'lib-render/components/render//MomentumCollection.svelte';
	import getPageCssStyles from 'lib-render/services/getPageCssStyles';

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
		renderType: streamSlug.includes('-changelog') ? 'changelog' : 'feed',
		columns: streamSlug.includes('-changelog') ? 1 : 3,
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
				isEdit
				bind:cacheId={streamSlug}
				bind:page
				section={getSection()}
			/>
		</div>
	{/key}
{/if}

<div class="px-8 py-16" />

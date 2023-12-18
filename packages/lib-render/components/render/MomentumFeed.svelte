<script>
	import feedLastUpdatedOn from 'lib-render/stores/feedLastUpdatedOn';
	import { STREAM_URL, PAGE_URL } from 'lib/env';
	import iframeResize from 'iframe-resizer/js/iframeResizer';

	export let page;
	export let themeStyles;

	let resize = () => {
		iframeResize({ log: true }, '#iframeResize');
	};
</script>

{#key $feedLastUpdatedOn + page.theme?.sectionTheme}
	<iframe
		id="iframeResize"
		loading="lazy"
		on:load={resize}
		class="w-full sticky z-20 bg-site"
		src="{STREAM_URL}/{page.streams?.hub?.slug || page.streamSlug || ''}/embed?theme={page.theme
			?.sectionTheme || 'light'}&limit=9&isViewAll=true&bgColor={themeStyles[
			'section-background-color'
		].replace('#', '%23')}"
	/>
{/key}

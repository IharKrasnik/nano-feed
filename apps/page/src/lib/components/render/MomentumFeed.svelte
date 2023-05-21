<script>
	import feedLastUpdatedOn from '$lib/stores/feedLastUpdatedOn';
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
		class="w-full sticky z-20 pb-[200px] bg-site"
		src="{STREAM_URL}/{page.streamSlug}/embed?theme={page.theme?.sectionTheme ||
			'light'}&isHorizontal=true&limit=9&isViewAll=true&bgColor={themeStyles[
			'section-background-color'
		].replace('#', '%23')}"
	/>
{/key}

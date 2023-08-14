<script>
	import feedLastUpdatedOn from '$lib/stores/feedLastUpdatedOn';
	import { STREAM_URL, POST_URL } from 'lib/env';
	import iframeResize from 'iframe-resizer/js/iframeResizer';

	export let blog;
	export let streamSlug;
	import styles from '$lib/stores/styles';

	let resize = () => {
		iframeResize({ log: true }, '#iframeResize');
	};
</script>

{#key $feedLastUpdatedOn + blog.theme?.sectionTheme}
	<iframe
		id="iframeResize"
		loading="lazy"
		on:load={resize}
		class="w-full sticky z-20 bg-site"
		src="{STREAM_URL}/{streamSlug}/embed?theme={blog.theme?.sectionTheme ||
			'light'}&limit=9&isViewAll=true&bgColor={$styles.obj['section-background-color'].replace(
			'#',
			'%23'
		)}"
	/>
{/key}

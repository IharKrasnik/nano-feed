<script>
	export let content;
	import RichTextResolver from 'lib-render/helpers/editor/renderHtml';
	import { onMount } from 'svelte';

	let resolver = new RichTextResolver();

	// onMount(() => {
	// 	document.querySelectorAll('[data-url]').forEach((twitterObj) => {
	// 		if (twitterObj.getAttribute('data-loaded')) {
	// 			return;
	// 		}

	// 		twttr.widgets.createTweet(
	// 			twitterObj.getAttribute('data-url').split('status/')[1],
	// 			twitterObj,
	// 			{
	// 				conversation: 'none',
	// 				theme: 'dark'
	// 			}
	// 		);
	// 		twitterObj.setAttribute('data-loaded', true);
	// 	});
	// });
</script>

<div>
	{@html resolver.render(content.json)}
</div>

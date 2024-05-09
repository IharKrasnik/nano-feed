<script>
	export let content;
	import RichTextResolver from 'lib-render/helpers/editor/renderHtml';
	import { onMount } from 'svelte';

	let resolver = new RichTextResolver();

	onMount(() => {
		document.querySelectorAll('._embed').forEach((embedObj) => {
			if (embedObj.getAttribute('data-loaded')) {
				return;
			}

			let url = embedObj.getAttribute('data-url');

			if (url.includes('twitter.com') || url.includes('x.com')) {
				twttr.widgets.createTweet(url.split('status/')[1], embedObj, {
					conversation: 'none',
					theme: 'dark'
				});
			}

			embedObj.setAttribute('data-loaded', true);
		});
	});
</script>

<div>
	{@html resolver.render(content.json)}
</div>

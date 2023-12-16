<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { get, post, put } from 'lib/api';

	import allPages from '$lib/stores/allPages';
	import SitePreview from '$lib/components/site-preview.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import currentUser from 'lib/stores/currentUser';
	import getPageCssStyles from '$lib/services/getPageCssStyles';
	import { pages as templatePages, feed as templateFeed } from '$lib/stores/pageTemplates';
	import getDomain from 'lib/helpers/getDomain';

	export let page;

	let newMessage = {
		messageHTML: ''
	};

	let cssVarStyles;
	let styles;

	let parentPage = page.parentPage ? $allPages.find((p) => p._id === page.parentPage._id) : page;

	$: if (page) {
		let res = getPageCssStyles(page);
		cssVarStyles = res.cssVarStyles;
		styles = res.styles;
	}

	let selectedTemplatePage;

	let selectDefaultTemplate = async () => {
		let feedItem = $templateFeed.results[0];

		let domain = getDomain($templateFeed.results[0].url);
		let subPageSlug = feedItem.url.replace(domain + '/', '').replace('https://', '');

		selectedTemplatePage = await get(`pages/${encodeURIComponent(subPageSlug || domain)}`, {
			...(subPageSlug ? { parentPageSlug: domain } : {})
		});
		selectedTemplatePage.subPages = [];
	};

	let loadTemplateFeed = async () => {
		let feedResults = await get('feed', {
			projectSlug: 'momentum-page-templates'
		});

		$templateFeed = feedResults;

		if (feedResults.results.length) {
			selectDefaultTemplate();
		}
	};

	if (!$templateFeed.results?.length) {
		loadTemplateFeed();
	} else {
		selectDefaultTemplate();
	}

	// let templatePage = {
	// 	theme: parentPage.theme,

	// 	sections: [
	// 		{
	// 			title: 'Hello World 👋',
	// 			columns: 1,
	// 			editorMeta: {
	// 				name: 'Empty'
	// 			}
	// 		},
	// 		{
	// 			emoji: '🙌',
	// 			title: 'Tell the audience how <b>they</b> will benefit',
	// 			description:
	// 				'Show your features below, talk to the audience. Start features titles with verb.',

	// 			theme: {
	// 				imageAspectRatio: 'image'
	// 			},

	// 			columns: 1,

	// 			items: [
	// 				{
	// 					emoji: '🖼',
	// 					title: 'Attach Images',
	// 					description:
	// 						'Paste image from clipboard, insert a link to input or upload from your computer.',
	// 					imageUrl:
	// 						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1684243151802-image.png'
	// 				},
	// 				{
	// 					emoji: '📼',
	// 					title: 'Use Videos',
	// 					description: 'Simply insert a link to YouTube, Loom or Vimeo.',
	// 					imageUrl:
	// 						'https://www.youtube.com/watch?v=2zE7uWxA95s&pp=ygUac3RhcnR1cCBpcyBhIG1lZGlhIGNvbXBhbnk%3D',
	// 					theme: {
	// 						isReversedImage: true
	// 					}
	// 				},
	// 				{
	// 					emoji: '💥',
	// 					title: 'Use GIFs',
	// 					description:
	// 						'Use animated GIFs to catch their attention (use search icon near file input)',
	// 					imageUrl:
	// 						'https://media3.giphy.com/media/MuOGhW5GtDazUSJcL3/giphy.gif?cid=54dcf3bfdsjg51xsczxm9lgxtmf2bprs055i37ma5kxfk0s1&ep=v1_gifs_search&rid=giphy.gif&ct=g'
	// 				},
	// 				{
	// 					emoji: '⚒️',
	// 					title: 'Customize The Grid',
	// 					description: 'Select the number of columns you want to show in your section (1—4)',
	// 					imageUrl:
	// 						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1684243758302-image.png',
	// 					theme: {
	// 						isReversedImage: true
	// 					}
	// 				}
	// 			],
	// 			editorMeta: {
	// 				name: 'Features'
	// 			}
	// 		},
	// 		{
	// 			title: 'Frequently Asked Questions',
	// 			description: 'Answers summarized',
	// 			renderType: 'testimonials',
	// 			renderType: 'testimonials',
	// 			title: `Don't just trust our words...`,
	// 			description: `Here's what people say about ${page.name}!`,

	// 			items: [
	// 				{
	// 					title: 'Igor Krasnik, Momentum',
	// 					description: `${page.name} is awesome!`,
	// 					imageUrl:
	// 						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1684156297060-image.png'
	// 				},
	// 				{
	// 					title: 'Elon Musk, X',
	// 					description: `${page.name} is the future, to the moon 🚀`,
	// 					imageUrl:
	// 						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1684156478852-image.png'
	// 				}
	// 			],

	// 			editorMeta: {
	// 				name: 'Testimonials'
	// 			}
	// 		},
	// 		{
	// 			title: 'Frequently Asked Questions',
	// 			description: 'Answers summarized',
	// 			renderType: 'faq',
	// 			items: [
	// 				{
	// 					title: 'Do you offer a refund?',
	// 					description: 'Yes, all subscriptions refunded no-questions-asked the first 2 weeks.'
	// 				},
	// 				{
	// 					title: 'How the process look like?',
	// 					description: 'You submit the form, prepay and get the result in 48 hours.'
	// 				}
	// 			],
	// 			editorMeta: {
	// 				name: 'FAQ'
	// 			}
	// 		},
	// 		{
	// 			columns: 2,
	// 			icon: 'feather:check',

	// 			renderType: 'pricing',

	// 			title: 'Pricing',
	// 			description: 'Simple plans that fit your needs',

	// 			items: [
	// 				{
	// 					title: 'Free',
	// 					description: 'Start from free (capped at 1000 emails)',
	// 					pricing: {
	// 						amount: 0,
	// 						per: 'month',
	// 						benefitsStr: 'collect emails\nbroadcast emails'
	// 					}
	// 				},
	// 				{
	// 					title: 'Growth',
	// 					description: 'For growing businesses (capped at 10k emails)',
	// 					pricing: {
	// 						amount: 4.2,
	// 						per: 'month',
	// 						benefitsStr: 'everything in free \n custom domain \n priority support'
	// 					}
	// 				}
	// 			],
	// 			editorMeta: {
	// 				name: 'Pricing'
	// 			}
	// 		},
	// 		{
	// 			renderType: 'carousel',

	// 			title: 'Nice images!',
	// 			columns: 1,
	// 			items: [
	// 				{
	// 					title: 'Image',
	// 					description: '',
	// 					colSpan: 2,
	// 					imageUrl:
	// 						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1684243151802-image.png'
	// 				},
	// 				{
	// 					title: 'GIF',
	// 					description: '',
	// 					imageUrl:
	// 						'https://www.youtube.com/watch?v=2zE7uWxA95s&pp=ygUac3RhcnR1cCBpcyBhIG1lZGlhIGNvbXBhbnk%3D'
	// 				},
	// 				{
	// 					title: 'Video',
	// 					description: '',
	// 					imageUrl:
	// 						'https://media3.giphy.com/media/MuOGhW5GtDazUSJcL3/giphy.gif?cid=54dcf3bfdsjg51xsczxm9lgxtmf2bprs055i37ma5kxfk0s1&ep=v1_gifs_search&rid=giphy.gif&ct=g'
	// 				}
	// 			],
	// 			editorMeta: {
	// 				name: 'Carousel'
	// 			}
	// 		}
	// 	]
	// };
</script>

<div class="px-8 py-16 bg-background overflow-y-auto" style={cssVarStyles} />

{#if selectedTemplatePage}
	<SitePreview
		class="p-4"
		isNoVars
		isEmbed
		noStickyHeader={true}
		isNoBadge={true}
		isEdit
		isCloneable
		page={selectedTemplatePage}
	/>
{/if}

<style>
</style>

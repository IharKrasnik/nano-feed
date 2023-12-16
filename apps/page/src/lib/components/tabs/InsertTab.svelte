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

		selectedTemplatePage = await get(
			`pages/${encodeURIComponent(subPageSlug || domain.replace('.mmntm.page', ''))}`,
			{
				...(subPageSlug ? { parentPageSlug: domain } : {})
			}
		);

		selectedTemplatePage.subPages = [];

		let parentPage = page.parentPage || page;

		selectedTemplatePage.theme.backgroundColor = parentPage.theme?.backgroundColor;
		selectedTemplatePage.theme.accentColor = parentPage.theme?.accentColor;
		selectedTemplatePage.theme.theme = parentPage.theme?.theme;
		selectedTemplatePage.theme.buttonColor = parentPage.theme.buttonColor;
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

<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { get, post, put } from 'lib/api';
	import { v4 as uuidv4 } from 'uuid';

	import allPages from '$lib/stores/allPages';
	import SitePreview from '$lib/components/site-preview.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import currentUser from 'lib/stores/currentUser';
	import getPageCssStyles from '$lib/services/getPageCssStyles';
	import sectionToEdit from '$lib/stores/sectionToEdit';

	import {
		pages as templatePages,
		feed as templateFeed,
		selectTemplatePage
	} from '$lib/stores/pageTemplates';

	import getDomain from 'lib/helpers/getDomain';

	export let page;
	export let selectedTemplatePage;
	export let isInsertPopupShown;

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

	let selectDefaultTemplate = async () => {
		selectedTemplatePage = await selectTemplatePage($templateFeed.results[0], { page });
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
	{#key selectedTemplatePage._id}
		<SitePreview
			class="p-4"
			isNoVars
			isEmbed
			noStickyHeader={true}
			isNoBadge={true}
			isEdit
			isCloneable
			page={selectedTemplatePage}
			onInsert={(section) => {
				let newSection = _.cloneDeep(section);
				newSection.id = uuidv4();
				page.sections = [...page.sections, newSection];

				$sectionToEdit = newSection;

				selectedTemplatePage = null;
				isInsertPopupShown = false;
			}}
		/>
	{/key}
{/if}

<style>
</style>

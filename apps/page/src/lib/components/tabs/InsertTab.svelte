<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { get, post, put } from 'lib/api';
	import { v4 as uuidv4 } from 'uuid';
	import { page as sveltePage } from '$app/stores';
	import { goto } from '$app/navigation';

	import allPages from '$lib/stores/allPages';
	import SitePreview from '$lib/components/site-preview.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import currentUser from 'lib/stores/currentUser';
	import getPageCssStyles from '$lib/services/getPageCssStyles';
	import sectionToEdit from '$lib/stores/sectionToEdit';
	import isInsertPopupShown from '$lib/stores/isInsertPopupShown';
	import selectedTemplatePage from '$lib/stores/selectedTemplatePage';

	import {
		pages as templatePages,
		feed as templateFeed,
		selectTemplatePage
	} from '$lib/stores/pageTemplates';

	import getDomain from 'lib/helpers/getDomain';

	export let page;

	let newMessage = {
		messageHTML: ''
	};

	let cssVarStyles;
	let styles;

	// let parentPage = page.parentPage ? $allPages.find((p) => p._id === page.parentPage._id) : page;

	$: if (page) {
		let res = getPageCssStyles(page);
		cssVarStyles = res.cssVarStyles;
		styles = res.styles;
	}

	let clonePage = async () => {
		let newPage = _.cloneDeep($selectedTemplatePage);
		newPage._id = null;
		newPage.slug = null;

		[
			newPage.heros,
			...(newPage.ctaFooter ? [newPage.ctaFooter] : []),
			...(newPage.sections || [])
		].forEach((s) => {
			s.id = uuidv4();

			s.items?.forEach((si) => {
				si.id = uuidv4();
			});
		});

		let createdPage = await post('pages', newPage);

		goto(`https://ide.momentum.page?claim?pageId=${createdPage._id}`);
	};
</script>

<div class="fixed w-full bottom-12 p-4 w-full" style="width: calc(100% - 480px); z-index: 100;">
	<div
		on:click={() => {
			clonePage();
		}}
		class="bg-green-400 flex items-center justify-center cursor-pointer font-medium rounded-full p-4 mx-auto max-w-[400px] shadow-lg shadow-green-400/50 ring-1 ring-green-600 text-green-900 text-lg"
	>
		<FeatherIcon size="20" class="mr-4" name="copy" color="#333333" />
		Clone This Page
	</div>
</div>

<div class="bg-background overflow-y-auto" style={cssVarStyles}>
	{#if $selectedTemplatePage}
		{#key $selectedTemplatePage._id}
			<SitePreview
				class="p-4"
				isNoVars
				isEmbed
				noStickyHeader={true}
				isNoBadge={true}
				isEdit
				isCloneable
				isSectionsCloneable={!$sveltePage.url.href.includes('/page-templates')}
				page={$selectedTemplatePage}
				onInsert={(section) => {
					let newSection = _.cloneDeep(section);
					newSection.id = uuidv4();
					page.sections = [...page.sections, newSection];

					$sectionToEdit = newSection;

					$selectedTemplatePage = null;
					$isInsertPopupShown = false;
				}}
			/>
		{/key}
	{/if}
</div>

<style>
</style>

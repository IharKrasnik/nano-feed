<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { get, post, put } from 'lib/api';
	import { v4 as uuidv4 } from 'uuid';
	import { page as sveltePage } from '$app/stores';
	import { goto } from '$app/navigation';

	import allPages from 'lib-render/stores/allPages';
	import SitePreview from 'lib-render/components/SitePreview.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import currentUser from 'lib/stores/currentUser';
	import shrinkheight from '$lib/use/shrinkheight';
	import getPageCssStyles from 'lib-render/services/getPageCssStyles';
	import sectionToEdit from 'lib-render/stores/sectionToEdit';
	import isInsertPopupShown from 'lib-render/stores/isInsertPopupShown';
	import selectedTemplatePage from 'lib-render/stores/selectedTemplatePage';
	import RenderSection from 'lib-render/components/render//Section.svelte';
	import sampleSections, { cloneSection } from '$lib/stores/sampleSections';

	import {
		pages as templatePages,
		feed as templateFeed,
		selectTemplatePage
	} from 'lib-render/stores/pageTemplates';

	import getDomain from 'lib/helpers/getDomain';

	export let page;
	export let setPageAndDraft;

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
		newPage.isUseDatabase = false;
		newPage.dirName = null;
		newPage.parentPage = page.parentPage;

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

		setPageAndDraft(newPage);

		$isInsertPopupShown = false;
	};
</script>

{#if $selectedTemplatePage}
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
					isSectionsCloneable={!!page._id}
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
{:else}
	<div class="columns-3">
		{#each $sampleSections as sampleSection}
			<!-- <div
			class="_section mt-4 cursor-pointer"
			on:click={(section) => {
				let newSection = cloneSection(sampleSection.section);

				page.sections = [...page.sections, newSection];

				$sectionToEdit = newSection;

				$selectedTemplatePage = null;
				$isInsertPopupShown = false;
			}}
		>
			{sampleSection.name}
		</div> -->

			<div
				class="bg-white break-inside-avoid mb-4 mr-4 p-4 cursor-pointer hover:scale-105 transition"
				style=""
				on:click={() => {
					let newSection = cloneSection(sampleSection.section);
					page.sections = [...page.sections, newSection];

					$sectionToEdit = newSection;

					$selectedTemplatePage = null;
					$isInsertPopupShown = false;
				}}
			>
				<div>
					<div
						style="transform: scale(.5); transform-origin: top left; transform-box: inherit;"
						use:shrinkheight
					>
						<div style="width: 200%; height: 200%;">
							<RenderSection {page} isEmbed bind:section={sampleSection.section} />
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
</style>

<script>
	import _ from 'lodash';
	import { v4 as uuidv4 } from 'uuid';
	import { get } from 'lib/api';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import sectionToEdit from 'lib-render/stores/sectionToEdit';
	import { feed as templateFeed, selectTemplatePage } from 'lib-render/stores/pageTemplates';
	import sectionToPreview from 'lib-render/stores/sectionToPreview';
	import { fly } from 'svelte/transition';
	import CrossSvg from 'lib/icons/cross.svelte';
	import FileInput from 'lib/components/FileInput.svelte';
	import BackTo from '$lib/components/BackTo.svelte';
	import { page as sveltePage } from '$app/stores';
	import sampleSections, { cloneSection } from '$lib/stores/sampleSections';
	import isInsertPopupShown from 'lib-render/stores/isInsertPopupShown';
	import selectedTemplatePage from 'lib-render/stores/selectedTemplatePage';
	import striptags from 'striptags';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';
	import Modal from 'lib/components/Modal.svelte';
	import aboveTheFoldEl from 'lib-render/stores/aboveTheFoldEl';
	import ctaFooterEl from 'lib-render/stores/ctaFooterEl';
	import sectionClipboard from '$lib/stores/sectionClipboard';

	export let isAbsolute = true;
	export let page;

	let newPageName = '';
	let isPasteSectionModalOpen = false;
	let newSectionCode = '';

	let selectDefaultTemplate = async () => {
		$selectedTemplatePage = await selectTemplatePage($templateFeed.results[0], { page });
	};

	let loadTemplateFeed = async () => {
		let feedResults = await get('feed', {
			projectSlug: 'momentum-page-templates',
			sort: 'order'
		});

		$templateFeed = feedResults;

		// if (feedResults.results.length && page?._id) {
		// 	selectDefaultTemplate();
		// }
	};

	if (!$templateFeed.results?.length) {
		loadTemplateFeed();
	} else if (page?._id) {
		// selectDefaultTemplate();
	}

	let saveSection = (newSectionCode) => {
		try {
			let newSection = JSON.parse(newSectionCode);
			newSection.id = uuidv4();
			if (newSection.items) {
				_.each(newSection.items, (i) => {
					i.id = uuidv4();
				});
			}

			if (newSection._isHero) {
				if (confirm('You pasted hero section. Do you want to replace your current hero?')) {
					page.heros = [newSection];
					page.activeHero = newSection;
					page.activeHero.isCollapsed = false;

					setTimeout(() => {
						if ($aboveTheFoldEl) {
							$aboveTheFoldEl.scrollIntoView({
								behavior: 'smooth',
								block: 'start',
								inline: 'nearest'
							});
						}
					}, 300);
				} else {
					return;
				}
			} else if (newSection._isCtaFooter) {
				if (
					confirm('You pasted call-to-action section. Do you want to replace your current CTA?')
				) {
					page.ctaFooter = newSection;

					setTimeout(() => {
						if ($ctaFooterEl) {
							$ctaFooterEl.scrollIntoView({
								behavior: 'smooth',
								block: 'center',
								inline: 'nearest'
							});
						}
					}, 700);
				} else {
					return;
				}
			} else {
				page.sections = [...page.sections, newSection];
				$sectionToEdit = newSection;
			}
		} catch (err) {
			showErrorMessage('Invalid JSON');
		}

		newSectionCode = '';
		isPasteSectionModalOpen = false;
		$isInsertPopupShown = false;
	};

	let jsonPlaceholder = JSON.stringify(
		{
			title: 'Hello World',
			subtitle: 'World, hello!',
			imageUrl: 'https://imageormedia.com',
			columns: 2,

			items: [
				{
					emoji: '🤓',
					title: 'First Item',
					description: 'Description'
				},
				{
					emoji: 'feather:cpu',
					title: 'Secon Item',
					description: 'Description'
				}
			]
		},
		null,
		2
	);
</script>

{#if $isInsertPopupShown}
	<div
		class="_insert left-0 top-[60px] w-[400px] bg-white h-screen overflow-y-auto px-6 py-4 pb-32"
		class:absolute={isAbsolute}
	>
		<div class="mb-8">
			<BackTo
				to="Editor"
				onClick={() => {
					$isInsertPopupShown = false;
					$selectedTemplatePage = null;
				}}
			/>
		</div>

		{#if page?._id}
			<div class="flex items-center font-semibold opacity-80 ">
				<div
					class="bg-yellow-600 p-2 rounded-full shadow-md shadow-yellow-600/30 flex items-center justify-center w-[40px] h-[40px] mr-3"
				>
					<FeatherIcon name="grid" color="#f6f5f4" />
				</div>
				Quick Sections
			</div>

			<!-- <div class="text-base py-4 _section mt-4">
				Choose Section
				<div class="text-sm opacity-70">Select built section from templates</div>

			
			</div> -->
			<!-- {#each $sampleSections as sampleSection}
					<div
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
					</div>
				{/each} -->

			<div
				class="text-base py-4 cursor-pointer _section mt-4"
				on:click={(section) => {
					isPasteSectionModalOpen = true;
				}}
			>
				Add Empty Section
				<div class="text-sm opacity-70">Design from scratch</div>
			</div>

			<div
				class="text-base py-4 cursor-pointer _section mt-4"
				class:opacity-50={!$sectionClipboard}
				on:click={(section) => {
					if ($sectionClipboard) {
						saveSection($sectionClipboard);
						$sectionClipboard = null;
					} else {
						isPasteSectionModalOpen = true;
					}
				}}
			>
				Paste from clipboard
				<div class="text-sm opacity-70">Copy section across the pages</div>
			</div>

			{#if false}
				<div class="border-bottom py-4 w-full _section mt-4">
					<div class="font-medium opacity-80 mb-2">Embed File or URL</div>
					<FileInput isWithIntegrations class="w-full" placeholder="Media URL" theme="light" />
				</div>
			{/if}
		{/if}

		<div class="flex justify-between {page?._id ? 'mt-16' : ''}">
			<div>
				<div class="flex items-center  opacity-80">
					<div
						class="bg-green-600 p-2 rounded-full shadow-md shadow-green-600/30 flex items-center justify-center w-[40px] h-[40px] mr-3"
					>
						<FeatherIcon name="gift" color="#f6f5f4" />
					</div>
					<div>
						<div class="font-semibold">Use page templates</div>
						<div>Copy any section to your page or clone the whole page</div>
					</div>
				</div>
			</div>
		</div>

		{#if $templateFeed.results?.length}
			<div class="grid grid-cols-1 mt-8">
				{#each $templateFeed.results as templateFeedItem}
					<a
						class="_section cursor-pointer _arrow-bottom"
						href="/page-templates/{templateFeedItem.slug}"
						class:_selected={$selectedTemplatePage?.url === templateFeedItem.url}
						on:click={async (evt) => {
							$selectedTemplatePage = await selectTemplatePage(templateFeedItem, { page });

							if (!$sveltePage.url.href.includes('/page-templates')) {
								evt.preventDefault();
							}
						}}
					>
						<div class="font-medium mb-2">{@html striptags(templateFeedItem.title)}</div>
						{#if templateFeedItem.content}
							<div>
								{@html striptags(templateFeedItem.content)}
							</div>
						{/if}
						{#if templateFeedItem.attachments?.length}
							<div class="aspect-og w-full bg-[#f1f1f1]">
								<img
									class="aspect-og object-cover w-full rounded"
									src={templateFeedItem.attachments[0].url}
								/>
							</div>
						{/if}
					</a>
				{/each}
			</div>
		{/if}
	</div>
{/if}

{#if isPasteSectionModalOpen}
	<Modal bind:isShown={isPasteSectionModalOpen} maxWidth={600} onClosed={() => {}}>
		<div class="_editor p-4 sm:p-8">
			<div class="font-bold mb-2">JSON section code</div>
			<textarea
				placeholder={jsonPlaceholder}
				rows="16"
				class="w-full"
				bind:value={newSectionCode}
			/>

			<button class="_primary _small mt-4" on:click={saveSection}>Save</button>
		</div>
	</Modal>
{/if}

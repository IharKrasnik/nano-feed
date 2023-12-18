<script>
	import { v4 as uuidv4 } from 'uuid';
	import { get } from 'lib/api';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import sectionToEdit from '$lib/stores/sectionToEdit';
	import { feed as templateFeed, selectTemplatePage } from '$lib/stores/pageTemplates';
	import sectionToPreview from '$lib/stores/sectionToPreview';
	import { fly } from 'svelte/transition';
	import CrossSvg from 'lib/icons/cross.svelte';
	import FileInput from 'lib/components/FileInput.svelte';
	import BackTo from '$lib/components/BackTo.svelte';
	import { page as sveltePage } from '$app/stores';
	import isInsertPopupShown from '$lib/stores/isInsertPopupShown';
	import selectedTemplatePage from '$lib/stores/selectedTemplatePage';

	export let isAbsolute = true;
	export let page;

	let newPageName = '';

	let selectDefaultTemplate = async () => {
		$selectedTemplatePage = await selectTemplatePage($templateFeed.results[0], { page });
	};

	let loadTemplateFeed = async () => {
		let feedResults = await get('feed', {
			projectSlug: 'momentum-page-templates'
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
</script>

{#if $isInsertPopupShown}
	<div
		class="_insert left-0 top-[60px] w-[400px] bg-white h-screen overflow-y-auto p-4 pb-32"
		class:absolute={isAbsolute}
	>
		{#if !$sveltePage.url.href.includes('/page-templates')}
			<div class="mb-8">
				<BackTo
					to="Editor"
					onClick={() => {
						$isInsertPopupShown = false;
						$selectedTemplatePage = null;
					}}
				/>
			</div>
		{:else}
			<div class=" mb-16">
				<div class="_section">
					<a href="/ide">
						<button class="_primary _small">Start page from scratch</button>
					</a>
				</div>
			</div>
		{/if}

		{#if page?._id}
			<div class="flex items-center font-semibold opacity-80 ">
				<div
					class="bg-yellow-600 p-2 rounded-full shadow-md shadow-yellow-600/30 flex items-center justify-center w-[40px] h-[40px] mr-3"
				>
					<FeatherIcon name="grid" color="#f6f5f4" />
				</div>
				Quick Sections
			</div>

			<div
				class="text-base py-4 cursor-pointer _section mt-4"
				on:click={(section) => {
					let newSection = {
						id: uuidv4(),
						columns: 1,
						title: 'Hello World'
					};

					page.sections = [...page.sections, newSection];

					$sectionToEdit = newSection;

					$selectedTemplatePage = null;
					$isInsertPopupShown = false;
				}}
			>
				Add Empty Section
				<div class="text-sm opacity-70">Design from scratch</div>
			</div>

			{#if false}
				<div class="border-bottom py-4 w-full _section mt-4">
					<div class="font-medium opacity-80 mb-2">Embed File or URL</div>
					<FileInput isWithIntegrations class="w-full" placeholder="Media URL" theme="light" />
				</div>
			{/if}
		{/if}

		<div class="flex justify-between {page?._id ? 'mt-16' : ''}">
			<div class="flex items-center font-semibold opacity-80">
				<div
					class="bg-green-600 p-2 rounded-full shadow-md shadow-green-600/30 flex items-center justify-center w-[40px] h-[40px] mr-3"
				>
					<FeatherIcon name="gift" color="#f6f5f4" />
				</div>
				Use Templates
			</div>
		</div>

		{#if $templateFeed.results?.length}
			<div class="grid grid-cols-1 mt-8">
				{#each $templateFeed.results as templateFeedItem}
					<a
						class="_section cursor-pointer"
						href="/page-templates/{templateFeedItem.slug}"
						class:_selected={$selectedTemplatePage?.url === templateFeedItem.url}
						on:click={async (evt) => {
							$selectedTemplatePage = await selectTemplatePage(templateFeedItem, { page });

							if (!$sveltePage.url.href.includes('/page-templates')) {
								evt.preventDefault();
							}
						}}
					>
						<div class="font-medium mb-2">{templateFeedItem.title}</div>
						{#if templateFeedItem.content}
							<div>
								{templateFeedItem.content}
							</div>
						{/if}
						<div class="aspect-og w-full bg-[#f1f1f1]">
							<img
								class="aspect-og object-cover w-full rounded"
								src={templateFeedItem.attachments[0].url}
							/>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
{/if}

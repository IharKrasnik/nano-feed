<script>
	import { v4 as uuidv4 } from 'uuid';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import sectionToEdit from '$lib/stores/sectionToEdit';
	import { feed as templateFeed, selectTemplatePage } from '$lib/stores/pageTemplates';
	import sectionToPreview from '$lib/stores/sectionToPreview';
	import { fly } from 'svelte/transition';
	import CrossSvg from 'lib/icons/cross.svelte';
	import FileInput from 'lib/components/FileInput.svelte';

	export let page;
	export let isInsertPopupShown;
	export let selectedTemplatePage;
</script>

{#if isInsertPopupShown}
	<div
		class="_insert absolute left-0 top-[60px] w-[400px] bg-white h-screen overflow-y-auto p-4 pb-32"
	>
		<div
			class="absolute z-10 cursor-pointer top-4 right-4"
			on:click={() => (isInsertPopupShown = false)}
		>
			<FeatherIcon class="opacity-50 hover:opacity-100 cursor-pointer" name="x" color="#333333" />
		</div>

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

				selectedTemplatePage = null;
				isInsertPopupShown = false;
			}}
		>
			Add Empty Section
			<div class="text-sm opacity-70">Design from scratch</div>
		</div>
		<div class="border-bottom py-4 w-full _section">
			<div class="font-medium opacity-80 mb-2">Embed File or URL</div>
			<FileInput isWithIntegrations class="w-full" placeholder="Media URL" theme="light" />
		</div>

		<div class="flex justify-between mt-16">
			<div class="flex items-center font-semibold opacity-80">
				<div
					class="bg-green-600 p-2 rounded-full shadow-md shadow-green-600/30 flex items-center justify-center w-[40px] h-[40px] mr-3"
				>
					<FeatherIcon name="gift" color="#f6f5f4" />
				</div>
				Templates
			</div>
		</div>

		{#if $templateFeed.results?.length}
			<div class="grid grid-cols-1 mt-8">
				{#each $templateFeed.results as templateFeedItem}
					<div
						class="_section cursor-pointer"
						class:_selected={selectedTemplatePage?.url === templateFeedItem.url}
						on:click={async () => {
							selectedTemplatePage = await selectTemplatePage(templateFeedItem, { page });
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
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}

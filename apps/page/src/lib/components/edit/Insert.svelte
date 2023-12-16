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
	<div class="_insert absolute left-0 top-[60px] w-[400px] bg-white h-screen p-4">
		<div
			class="absolute z-10 cursor-pointer top-4 right-4"
			on:click={() => (isInsertPopupShown = false)}
		>
			<FeatherIcon class="opacity-50 hover:opacity-100 cursor-pointer" name="x" color="#333333" />
		</div>

		<div class="flex items-center font-semibold opacity-80 text-sm">
			<div
				class="bg-yellow-600 p-[4px] rounded-lg shadow-md shadow-yellow-600/30 flex items-center justify-center w-[30px] h-[30px] mr-2"
			>
				<FeatherIcon name="grid" color="#f6f5f4" />
			</div>
			Sections
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
		</div>
		<div class="border-bottom py-4 w-full _section">
			<div class="font-medium opacity-80 mb-2">Embed Anything</div>
			<FileInput class="w-full" placeholder="Media URL" theme="light" />
		</div>

		<div class="flex justify-between mt-7">
			<div class="flex items-center font-semibold opacity-80 text-sm">
				<div
					class="bg-green-600 p-[4px] rounded-lg shadow-md shadow-green-600/30 flex items-center justify-center w-[30px] h-[30px] mr-2"
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
						<img class="w-full rounded" src={templateFeedItem.attachments[0].url} />
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}

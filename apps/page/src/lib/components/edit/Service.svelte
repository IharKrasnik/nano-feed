<script>
	import { get, post, put, del } from 'lib/api';
	import _ from 'lodash';
	import { v4 as uuidv4 } from 'uuid';
	import moment from 'moment';
	import tooltip from 'lib/use/tooltip';
	import getRandomEmoji from 'lib/services/getRandomEmoji';
	import getRandomProjectEmoji from 'lib/services/getRandomProjectEmoji';
	import { fly, fade } from 'svelte/transition';
	import FileInput from 'lib/components/FileInput.svelte';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import SourceLogo from 'lib/components/SourceLogo.svelte';
	import Modal from 'lib/components/Modal.svelte';
	import Button from 'lib/components/Button.svelte';
	import EditFeedItemSettings from '$lib/components/edit/FeedItemSettings.svelte';
	import EditServicePortfolioItem from '$lib/components/edit/ServicePortfolioItem.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import clickOutside from 'lib/use/clickOutside';
	import sectionToEdit from 'lib-render/stores/sectionToEdit';
	import contenteditable from 'lib/use/contenteditable';
	import feedCache, { getFeed } from 'lib-render/stores/feedCache';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';
	import isUrl from 'lib/helpers/isUrl';
	import getPageUrl from 'lib-render/helpers/getPageUrl';
	import getEmbeddedStreamSlug from '$lib/helpers/getEmbeddedStreamSlug';
	import subPages from 'lib/stores/subPages';
	import allServices from '$lib/stores/allServices';
	import servicePortfolioItems from '$lib/stores/servicePortfolioItems';
	import EditSection from '$lib/components/edit/Section.svelte';

	export let page;
	export let setPageAndDraft;

	let clazz = 'p-4';
	export { clazz as class };
	export let onRemoved = () => {};
	export let onUpdated = () => {};

	if (!page.sections.find((s) => s.functionalType === 'deliverables')) {
		page.sections = [
			...page.sections,
			{
				id: uuidv4(),
				functionalType: 'deliverables',
				columns: 3
			}
		];

		page = { ...page };
	}

	let setPortfolioStreamSlug = async () => {
		let streamSlug = await getEmbeddedStreamSlug({ page, streamType: 'portfolio' });
		portfolioSection.streamSlug = streamSlug;
		portfolioSection.streamSettings = portfolioSection.streamSettings || {};
		portfolioSection.streamSettings.attachedToPageId = page._id;
	};

	if (!page.sections.find((s) => s.functionalType === 'portfolio')) {
		page.sections = [
			...page.sections,
			{
				id: uuidv4(),
				functionalType: 'portfolio',
				columns: 3,
				streamSlug: '',

				title: 'Portfolio',
				subtitle: '',
				items: []
			}
		];

		setPortfolioStreamSlug();

		page = { ...page };
	}

	// 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1704229361929-image.png',
	// 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1704229322932-image.png',
	// 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1704229248483-image.png'

	let mainSection;
	$: mainSection = page.sections.find((s) => s.renderType === 'form');

	let deliverablesSection = page.sections.find((s) => s.functionalType === 'deliverables');

	let portfolioSection;
	$: portfolioSection = page.sections.find((s) => s.functionalType === 'portfolio');

	setPortfolioStreamSlug();
</script>

<div
	in:fade={{ duration: 150 }}
	class="_section {clazz}"
	style="padding: 0"
	use:clickOutside
	on:clickOutside={() => {}}
>
	<div class="font-bold p-4">Main Info</div>

	<hr class="border-[#8B786D] opacity-30 s-dr4iJsSC3dPL" />

	<div class="p-4">
		<div class="flex w-full items-center mb-4">
			<div
				contenteditable
				bind:innerHTML={mainSection.title}
				data-placeholder="Service title"
				use:contenteditable
			/>
		</div>

		<div
			data-placeholder="1-line service description"
			class="w-full mb-4 textarea"
			contenteditable
			use:contenteditable
			bind:innerHTML={mainSection.description}
		/>

		<div class="flex items-center">
			<div class="mr-2">$</div>

			<input class="mr-2" type="number" bind:value={mainSection.price} placeholder="29.99" />

			<select class="w-full h-full" bind:value={mainSection.pricePer}>
				<option value="one-time">One-Time</option>
				<option value="week">Per Week</option>
				<option value="month">Per Month</option>
			</select>
		</div>

		<div class="relative flex justify-between items-center mt-4">
			<FileInput
				class="w-full"
				placeholder="Service cover image"
				bind:url={mainSection.imageUrl}
				theme="light"
			/>
		</div>

		<div class="flex justify-between items-center">
			<!-- 
				{#if serviceFeedItem._id}
					<a
						class="_secondary _small text-sm cursor-pointer"
						on:click={() => {
							// serviceFeedItem = originalFeedItem;
							serviceFeedItem.title = originalFeedItem.title;
							serviceFeedItem.content = originalFeedItem.content;
							serviceFeedItem.attachments = originalFeedItem.attachments;
							serviceFeedItem.iconUrl = originalFeedItem.iconUrl;
							serviceFeedItem.tagsStr = originalFeedItem.tagsStr;

							isCollapsed = true;
						}}>Cancel</a
					>
				{/if} -->
		</div>
	</div>
</div>

<div class="_section cursor-pointer" on:click={() => ($sectionToEdit = mainSection)}>
	<div class="font-bold">Apply Form</div>
	<div class="mt-2 opacity-70">Edit service form</div>
</div>

<div class="font-bold mb-4 mt-8">Portfolio</div>

{#key page._id}
	{#if portfolioSection}
		<EditSection bind:section={portfolioSection} />
	{/if}
{/key}
<!-- 
{#each $servicePortfolioItems as portfolioFeedItem}
	<EditServicePortfolioItem bind:portfolioFeedItem />
{/each} -->

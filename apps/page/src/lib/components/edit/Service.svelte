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
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	export let page;
	export let setPageAndDraft;
	import childStreams, { refreshChildStreams } from 'lib/stores/childStreams';
	import EditHero from '$lib/components/edit/Hero.svelte';

	let clazz = 'p-4';
	export { clazz as class };
	export let onRemoved = () => {};
	export let onUpdated = () => {};

	let setPortfolioStreamSlug = async () => {
		let streamSlug = await getEmbeddedStreamSlug({ page, streamType: 'portfolio' });
		portfolioSection.streamSlug = streamSlug;
		portfolioSection.streamSettings = portfolioSection.streamSettings || {};
		portfolioSection.streamSettings.attachedToPageId = page._id;
	};

	let addDeliverables = () => {
		deliverablesSection = {
			id: uuidv4(),
			functionalType: 'deliverables',
			label: 'Deliverables',
			title: `What you'll get`,
			columns: 3,
			items: [
				{
					id: uuidv4(),
					emoji: 'feather:cpu',
					title: `Dev-Ready Figma File`,
					description: 'Use your design files to develop your application'
				},
				{
					id: uuidv4(),
					emoji: 'feather:layout',
					title: '1 Flow — Up to 10 screens',
					description: 'A complete workflow that you can demo'
				},
				{
					id: uuidv4(),
					emoji: 'feather:smile',
					title: '1 Change Request',
					description: 'Request changes once you get your designs for review'
				}
			]
		};
		page.sections = [...page.sections, deliverablesSection];
		$sectionToEdit = deliverablesSection;
	};

	let addPortfolio = async () => {
		portfolioSection = {
			id: uuidv4(),
			functionalType: 'portfolio',
			label: 'Portfolio',
			title: `${page.name} examples`,
			description: `Here's what we've created for founders like you`,
			columns: 2,
			theme: {
				imageAspectRatio: 'og'
			},
			items: []
		};

		if ($childStreams.find((s) => s.slug.includes('portfolio'))) {
			await setPortfolioStreamSlug();
		} else {
			portfolioSection.items = [
				{
					id: uuidv4(),
					title: 'Shelf',
					description: 'Modern QR-code generator for tracking inventory',
					url: 'https://www.figma.com/proto/8Mb6BCx3yTShfW6ZvDkhGe/Shelf-prototype?page-id=0%3A1&type=design&node-id=202-11871&viewport=846%2C-972%2C0.1&t=ZXtZTOi4ZCn6whbq-1&scaling=scale-down&starting-point-node-id=202%3A11871',
					imageUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1697916380201-image.png'
				},
				{
					id: uuidv4(),
					title: 'Moodahub',
					description: 'A virtual wardrobe with social mechanics',
					url: 'https://www.figma.com/proto/ZN2PbVdAdFcWBSKOeXLzFz/Moodahub?page-id=0%3A1&type=design&node-id=0-12609&viewport=895%2C1154%2C0.12&t=WlR9YRLJSax4O2jU-1&scaling=scale-down&starting-point-node-id=0%3A12724&mode=design',
					imageUrl:
						'https://assets-global.website-files.com/64831da00244efd7c8280a6c/6501fa4c88cef88ac28330a7_image%202.png'
				},
				{
					id: uuidv4(),
					title: 'TechMate',
					description: 'Find perfect co-founder with AI',
					url: 'https://www.figma.com/proto/ZN2PbVdAdFcWBSKOeXLzFz/Moodahub?page-id=0%3A1&type=design&node-id=0-12609&viewport=895%2C1154%2C0.12&t=WlR9YRLJSax4O2jU-1&scaling=scale-down&starting-point-node-id=0%3A12724&mode=design',
					imageUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1697916195962-image.png'
				},
				{
					id: uuidv4(),
					title: 'CollabUniverse',
					description:
						'Connect with creators via booking agencies, major labels, production companies',
					imageUrl:
						'https://assets-global.website-files.com/64831da00244efd7c8280a6c/6501fa4d1d0b77399cac8a9c_image%202-3.png',
					url: 'https://www.figma.com/proto/bh94Fc3bczOEBGCwkAmIHf/Collab-Universe?page-id=0%3A1&type=design&node-id=9-14&viewport=-435%2C724%2C0.39&t=dfxBToX6UmYSa4DA-1&scaling=scale-down&starting-point-node-id=9%3A14&show-proto-sidebar=1'
				}
			];
		}

		page.sections = [...page.sections, portfolioSection];

		$sectionToEdit = portfolioSection;
	};
	// if (!page.sections.find((s) => s.functionalType === 'portfolio')) {
	// 	page.sections = [
	// 		...page.sections,
	// 		{
	// 			id: uuidv4(),
	// 			functionalType: 'portfolio',
	// 			columns: 3,
	// 			streamSlug: '',

	// 			title: 'Portfolio',
	// 			subtitle: '',
	// 			items: []
	// 		}
	// 	];

	// 	setPortfolioStreamSlug();

	// 	page = { ...page };
	// }

	// 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1704229361929-image.png',
	// 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1704229322932-image.png',
	// 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1704229248483-image.png'

	if (!page.activeHero) {
		page.activeHero = page.heros[0];
	}

	let mainSection;
	$: mainSection = page.sections.find((s) => s.renderType === 'form');

	let deliverablesSection = page.sections.find((s) => s.functionalType === 'deliverables');

	let portfolioSection;
	$: portfolioSection = page.sections.find((s) => s.functionalType === 'portfolio');

	function handleDndConsider(e) {
		page.sections = [...e.detail.items];
	}

	function handleDndFinalize(e) {
		page.sections = [...e.detail.items];
	}
</script>

{#each page.heros as hero (hero.id)}
	<EditHero class="my-4" bind:hero bind:page isShowTips={page.heros?.length < 2} />
{/each}
<!-- 
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
				bind:innerHTML={page.activeHero.title}
				data-placeholder="Service title"
				use:contenteditable
			/>
		</div>

		<div
			data-placeholder="1-line service description"
			class="w-full mb-4 textarea"
			contenteditable
			use:contenteditable
			bind:innerHTML={page.activeHero.subtitle}
		/>

		<div class="flex items-center">
			<div class="mr-2">$</div>

			<input class="mr-2" type="number" bind:value={page.activeHero.price} placeholder="29.99" />

			<select class="w-full h-full" bind:value={page.activeHero.pricePer}>
				<option value="one-time">One-Time</option>
				<option value="week">Per Week</option>
				<option value="month">Per Month</option>
			</select>
		</div>

		<div class="relative flex justify-between items-center mt-4">
			<FileInput
				class="w-full"
				placeholder="Service cover image"
				bind:url={page.activeHero.demoUrl}
				theme="light"
			/>
		</div>

		<div class="flex justify-between items-center">
		
		</div>
	</div>
</div> -->

{#if page._id}
	<div
		class="bg-white rounded-xl sm:w-[400px] flex top-[0px] w-full my-8 mt-12 justify-between items-center"
	>
		<div class="flex items-center">
			<div class="text-lg font-bold  _editor-title">
				{page.renderType === 'article' ? 'Paragraphs' : 'Sections'}
			</div>

			{#if page.sections?.length}
				<div class="ml-4 number-tag">
					{page.sections?.length || 0}
				</div>
			{/if}
		</div>

		{#if !page.sections?.length}
			<div />
		{/if}
	</div>
{/if}

{#if !page.sections.find((s) => s.functionalType === 'portfolio')}
	<div class="_section mb-4 mt-4 cursor-pointer" on:click={addPortfolio}>
		<div class="flex">
			<div
				class="w-[40px] h-[40px] shrink-0 flex items-center justify-center rounded-full bg-orange-300 shadow-md  shadow-orange-300/50 mr-4"
			>
				<FeatherIcon name="package" class="opacity-80" color="#333333" size="18" />
			</div>
			<div>
				<div class="font-bold">Add portfolio</div>
				<div class="opacity-80">
					Show examples of your past work so your customer knows what to expect
				</div>
			</div>
		</div>
	</div>
{/if}

{#if !page.sections.find((s) => s.functionalType === 'deliverables')}
	<div class="_section mb-4 mt-4 cursor-pointer" on:click={addDeliverables}>
		<div class="flex">
			<div
				class="w-[40px] h-[40px] shrink-0 flex items-center justify-center rounded-full bg-orange-300 shadow-md  shadow-orange-300/50 mr-4"
			>
				<FeatherIcon name="grid" class="opacity-80" color="#333333" size="18" />
			</div>
			<div>
				<div class="font-bold">Add deliverables</div>
				<div class="opacity-80">
					Explain what you'll customer will get in the end of the project
				</div>
			</div>
		</div>
	</div>
{/if}

{#key page._id}
	{#if page.sections?.filter((s) => s.renderType !== 'form').length}
		<div>
			<div
				use:dndzone={{
					items: page.sections,
					flipDurationMs: 300
				}}
				on:consider={handleDndConsider}
				on:finalize={handleDndFinalize}
			>
				{#each page.sections as section (section.id)}
					<div animate:flip={{ duration: 300 }}>
						<EditSection
							bind:page
							bind:section
							onRemove={() => {
								page.sections = page.sections.filter((s) => s !== section);
							}}
						/>
					</div>
				{/each}
			</div>
		</div>
	{/if}
{/key}
<!-- 
{#each $servicePortfolioItems as portfolioFeedItem}
	<EditServicePortfolioItem bind:portfolioFeedItem />
{/each} -->

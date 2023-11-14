<script>
	import _ from 'lodash';
	import tooltip from 'lib/use/tooltip';
	import getRandomProjectEmoji from 'lib/services/getRandomProjectEmoji';
	import { fly } from 'svelte/transition';

	import { get, put } from 'lib/api';
	import FileInput from 'lib/components/FileInput.svelte';
	import EmojiPicker from '$lib/components/EmojiPicker.svelte';
	import Modal from 'lib/components/Modal.svelte';
	import { v4 as uuidv4 } from 'uuid';

	import Button from 'lib/components/Button.svelte';
	import EditSectionItem from '$lib/components/edit/SectionItem.svelte';
	import EditFAQ from '$lib/components/edit/FAQ.svelte';
	import EditTestimonials from '$lib/components/edit/Testimonials.svelte';
	import EditDatabase from '$lib/components/edit/Database.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';

	import RenderSection from '$lib/components/render/Section.svelte';
	import clickOutside from 'lib/use/clickOutside';
	import sectionToEdit from '$lib/stores/sectionToEdit';
	import { getFeed } from '$lib/stores/feedCache';

	import striptags from 'striptags';

	export let section;

	export let page;

	export let onRemove = () => {};
	export let onEditStarted = () => {};
	export let onEditEnded = () => {};

	export let isShort = true;

	if (!section.renderType) {
		section.renderType = 'grid';
	}

	let innerSection;

	let addNewItem = () => {
		section.items = section.items || [];

		let newItem = {
			id: uuidv4(),

			title: '',
			description: '',
			imageUrl: ''
		};

		if (section.type === 'pricing') {
			newItem.pricing = { amount: 1.99, per: 'month' };
		}

		section.items = [...section.items, newItem];
	};

	let removeItem = (benefit) => {
		section.items = section.items.filter((b) => b !== benefit);
	};

	let isEmojiPickerShown;

	let prevSection = _.cloneDeep(section);

	$: if (page && section) {
		if (!_.isEqual(prevSection, section)) {
			// externalSection = { ...section };
			prevSection = _.cloneDeep(section);

			page.sections = page.sections.map((s) => {
				if (s === section) {
					return _.cloneDeep(section);
				} else {
					return s;
				}
			});
		}
	}

	let isDatabaseModalShown = false;

	let pageStreams;

	let getPageStreams = async () => {
		pageStreams = await get(`pages/${page.parentPage?._id || page._id}/streams`);
	};

	getPageStreams();

	let createStream = async () => {
		const { streamSlug } = await put(`pages/${page.parentPage?._id || page._id}/embed-stream`, {
			title: section.streamSlug,
			hubStreamSlug: page.streamSlug || ''
		});

		if (!page.streamSlug) {
			page.streamSlug = streamSlug;
		}

		section.streamSlug = streamSlug;
	};

	if (section.streamSlug && !section.streamSettings) {
		section.streamSettings = {};
	}
</script>

{#if isDatabaseModalShown}
	<Modal
		isShown
		maxWidth={1200}
		onClosed={() => {
			isDatabaseModalShown = false;
		}}
	>
		<EditDatabase bind:page />
	</Modal>
{/if}

{#if isShort}
	<div
		class="_section cursor-pointer"
		on:click={() => {
			// isShort = false;
			$sectionToEdit = section;
			// onEditStarted(section);
		}}
	>
		{#if section.type === 'pricing'}
			<div class="text-lg font-bold">🤑 Pricing</div>
		{:else if section.type === 'faq'}
			<div class="text-lg font-bold">⁉️ FAQ</div>
		{:else if section.type === 'testimonials'}
			<div class="text-lg font-bold">💚 Testimonials</div>
		{:else if section.renderType === 'momentum_collection'}
			<div class="text-lg font-bold">📚 Database</div>
		{:else if section.renderType === 'form'}
			<div class="text-lg font-bold">🔤 Form</div>
		{:else if section.type === 'benefits'}
			<div class="text-lg font-bold" />
		{/if}
		<div>
			{#if section.title}
				<div>
					<b>{@html striptags(section.title || '')}</b>
				</div>
			{/if}
			{@html striptags(section.description || '')}

			{#if section.type === 'testimonials'}
				<div>
					{striptags((section.testimonials || []).map((f) => f.name).join(', '))}
				</div>
			{:else if section.type === 'faq'}
				<div>
					{striptags((section.faqs || []).map((f) => f.question).join(', '))}
				</div>
			{:else if section.items}
				{#each section.items as item}
					<div>
						{striptags(item.title || 'empty')}
					</div>
				{/each}
			{/if}
		</div>
	</div>
{:else}
	<div
		class="absolute right-0 top-0 p-4 opacity-70 hover:opacity-100 transition  text-sm cursor-pointer text-[#8B786D]"
		title="Remove Item"
		on:click={onRemove}
	>
		🗑
	</div>

	<div class="_section rounded-xl" style="padding:0;">
		<div class="flex justify-between items-center">
			<div class="_title p-4" style="margin: 0;">Header</div>
		</div>

		<hr class="border-[#8B786D] opacity-30" />

		<div class="p-4">
			<EditSectionItem
				class="p-0"
				isWithGrid={false}
				isWithSubtitle
				isWithInteractive
				onRemove={null}
				bind:section
				bind:item={section}
			/>
		</div>
	</div>

	{#if section.type === 'faq'}
		<EditFAQ bind:section />
	{:else if section.type === 'testimonials'}
		<EditTestimonials bind:section />
	{:else}
		{#if section.renderType !== 'form'}
			<div class="_section">
				<div class="_title mt-4" style="margin: 0;">Sync from database</div>

				<div class="w-full flex flex-col gap-4 mb-4 mt-2">
					{#if pageStreams?.length}
						<select class="w-full" bind:value={section.collectionType}>
							<option value="">No</option>
							<option value="articles">Blog Articles</option>
							<option value="feed">Choose Database</option>
						</select>

						{#if section.collectionType === 'feed'}
							<select bind:value={section.streamSlug}>
								{#each pageStreams as stream (stream._id)}
									<option value={stream.slug}>{stream.title}</option>
								{/each}
								<option value="">Add New</option>
							</select>

							{#if pageStreams.filter((ps) => ps.slug === section.streamSlug).length}
								{#if section.streamSettings}
									<div class="grid grid-cols-2">
										<div class="_section">
											<div class="text-sm">Limit items (leave 0 for pagination)</div>
											<input type="number" bind:value={section.streamSettings.limit} />
										</div>

										<div class="_section">
											<div class="text-sm">Sort</div>

											<select bind:value={section.streamSettings.sortBy}>
												<option value="-publishedOn">Newest First</option>
												<option value="-viewsCount">Popular First</option>
											</select>
										</div>
									</div>
								{/if}

								<Button
									class="shrink-0 _small _secondary"
									onClick={() => {
										return getFeed({
											cacheId: section.id,
											streamSlug: section.streamSlug,
											streamSettings: section.streamSettings,
											forceRefresh: true
										});
									}}>💫 refresh</Button
								>
							{:else}
								<input placeholder="databaseName" class="w-full" bind:value={section.streamSlug} />
								<Button class="shrink-0 _small _secondary" onClick={createStream}
									>Create Database</Button
								>
							{/if}
						{/if}
					{:else}{/if}
				</div>
			</div>

			{#if section.collectionType === 'feed'}
				<button class="w-full _small _secondary mt-4" on:click={() => (isDatabaseModalShown = true)}
					>Edit Data</button
				>
			{/if}

			<div class="my-8">
				<div class="text-sm font-bold mb-2 mt-4">Section Type</div>

				<select class="block w-full mt-2 mb-4" bind:value={section.renderType}>
					<option value="grid">Default Grid Section</option>
					<option value="carousel">Carousel Menu</option>
					<option value="stepper">1-2-3 Stepper</option>
					<option value="article">Article</option>
					<option value="form">Form</option>
				</select>
			</div>
			{#if section.renderType === 'carousel'}
				<select class="w-full my-4" bind:value={section.carouselType}>
					<option value="vertical">Vertical</option>
					<option value="horizontal">Horizontal</option>
				</select>
			{/if}
		{/if}

		<div
			class="_section rounded-xl"
			style="padding: 0px;"
			use:clickOutside
			on:clickOutside={() => {
				// isShort = true;
				// section = { ...section };
				// $sectionToEdit = null;
				// section = null;
				// onEditEnded(section);
			}}
		>
			{#if section.renderType !== 'form' && section.renderType === 'grid'}
				<div class="bg-white top-[60px] rounded-xl">
					<div class="p-4 pb-0 flex justify-between items-center">
						<div class="_title" style="margin: 0;">Columns</div>
						<div>
							<input type="checkbox" bind:checked={section.isShowSource} /> show url source
							<input class="ml-2" type="checkbox" bind:checked={section.isMasonryGrid} /> masonry
						</div>

						<!-- <div class="opacity-70 hover:opacity-100 transition text-right w-full text-sm">
					<a class="cursor-pointer text-[#8B786D]" title="Remove Whole Section" on:click={onRemove}
						>🗑</a
					>
				</div> -->
					</div>

					<hr class="mt-4 border-[#8B786D] opacity-30" />
					<div class="relative mt-4">
						<div class="px-4 flex items-center">
							{#if section.type !== 'pricing'}
								<div
									class="cursor-pointer bg-section h-[37px] flex justify-center items-center rounded-xl mr-2"
									class:aspect-square={section.columns !== 1}
									class:px-4={section.columns === 1}
									on:click={() => (section.columns = 1)}
								>
									1
									{#if section.columns === 1}column{/if}
								</div>
							{/if}

							<div
								class="aspect-square cursor-pointer bg-section h-[37px] flex justify-center items-center rounded-xl mr-2"
								on:click={() => (section.columns = 2)}
								class:aspect-square={section.columns !== 2}
								class:px-4={section.columns === 2}
							>
								2
								{#if section.columns === 2}columns{/if}
							</div>

							<div
								class="aspect-square cursor-pointer bg-section h-[37px] flex justify-center items-center rounded-xl mr-2"
								class:aspect-square={section.columns !== 3}
								class:px-4={section.columns === 3}
								on:click={() => (section.columns = 3)}
							>
								3
								{#if section.columns === 3}columns{/if}
							</div>

							<div
								class="aspect-square cursor-pointer bg-section h-[37px] flex justify-center items-center rounded-xl mr-2"
								class:aspect-square={section.columns !== 4}
								class:px-4={section.columns === 4}
								on:click={() => (section.columns = 4)}
							>
								4
								{#if section.columns === 4}columns{/if}
							</div>
							<div
								class="aspect-square cursor-pointer bg-section h-[37px] flex justify-center items-center rounded-xl mr-2"
								class:aspect-square={section.columns !== 12}
								class:px-4={section.columns === 12}
								on:click={() => (section.columns = 12)}
							>
								12
								{#if section.columns === 12}columns (grid){/if}
							</div>
						</div>
					</div>
					<hr class="mt-4 border-[#8B786D] opacity-30" />
				</div>
			{/if}

			{#each section.items || [] as item}
				<EditSectionItem bind:section bind:item />

				<hr class=" border-[#8B786D] opacity-30" />
			{/each}

			<a class="w-full p-4 flex justify-center cursor-pointer text-[#8B786D]" on:click={addNewItem}
				>Add Item</a
			>

			<!-- <div class="flex items-center mt-2 text-[14px]">
      <input type="checkbox" class="mr-2"  /> Collect Emails
    </div> -->
		</div>
		<div>
			<div class="p-4">
				<!-- {#if $sectionToEdit}
				<RenderSection bind:section={$sectionToEdit} />
			{/if} -->
			</div>
		</div>
	{/if}

	{#if section.renderType === 'form'}
		<div class="_section">
			<div class="font-normal text-sm opacity-70 mb-2 mt-4">Button text</div>

			<input class="mb-4 w-full" bind:value={section.callToActionText} placeholder="Submit" />

			<div class="flex items-center font-normal text-sm mb-2 w-full">
				<div class="shrink-0  opacity-70">Explainer:</div>

				<input
					class="ml-4 w-full"
					placeholder="You just 1 step away 🪄"
					bind:value={section.ctaExplainer}
				/>
			</div>

			<div class="font-normal opacity-70 text-sm mt-2 mb-2">Once submitted...</div>

			<div class="w-full mb-2">
				<select bind:value={section.actionType} class="w-full">
					<option value="success">Show thank you message</option>
					<option value="url">Redirect to URL</option>
				</select>
			</div>

			{#if section.actionType === 'success'}
				{section.actionSuccessSection
					? ''
					: (section.actionSuccessSection = {
							id: uuidv4(),
							isActionSuccessSection: true,
							emoji: '👏',
							title: 'Thank you for your submission!',
							description: "We'll review it shortly",
							bgImageUrl:
								'https://media3.giphy.com/media/PMV7yRpwGO5y9p3DBx/giphy.gif?cid=54dcf3bfllvlfmn72sc3m0wa7l2sygeg0lf30hhuotmgye4v&ep=v1_gifs_search&rid=giphy.gif&ct=g'
					  }) && ''}
				<div class="_section mt-4">
					<EditSectionItem class="" {section} bind:item={section.actionSuccessSection} />
				</div>
			{/if}

			{#if section.actionType === 'url'}
				<div class="font-normal text-sm opacity-70 mt-4 mb-2">URL to open once email submitted</div>

				<input class="w-full mb-4" bind:value={section.actionUrl} placeholder="Action Url" />
			{/if}
		</div>
	{/if}

	{#if section.streamSettings?.limit}
		{section.footer ? '' : (section.footer = { id: uuidv4() }) && ''}

		<div class="_section rounded-xl" style="padding:0;">
			<div class="flex justify-between items-center">
				<div class="_title p-4" style="margin: 0;">Footer</div>
			</div>

			<hr class="border-[#8B786D] opacity-30" />

			<div class="p-4">
				<EditSectionItem
					class="p-0"
					isWithGrid={false}
					isWithSubtitle
					isWithInteractive
					onRemove={null}
					bind:section
					bind:item={section.footer}
				/>
			</div>
		</div>
	{/if}
{/if}

<style>
	.bg-section {
		background: #fafafa;
	}
</style>

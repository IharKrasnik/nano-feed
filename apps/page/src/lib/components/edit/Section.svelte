<script>
	import _ from 'lodash';
	import tooltip from 'lib/use/tooltip';
	import getRandomProjectEmoji from 'lib/services/getRandomProjectEmoji';
	import { fly } from 'svelte/transition';

	import { get, put } from 'lib/api';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import Modal from 'lib/components/Modal.svelte';
	import { v4 as uuidv4 } from 'uuid';

	import Button from 'lib/components/Button.svelte';
	import EditSectionItem from '$lib/components/edit/SectionItem.svelte';
	import EditFAQ from '$lib/components/edit/FAQ.svelte';
	import EditTestimonials from '$lib/components/edit/Testimonials.svelte';
	import EditDatabase from '$lib/components/edit/Database.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';

	import clickOutside from 'lib/use/clickOutside';
	import sectionToEdit from 'lib-render/stores/sectionToEdit';
	import { getFeed } from 'lib-render/stores/feedCache';
	import childStreams, { refreshChildStreams } from 'lib/stores/childStreams';
	import { dndzone } from 'svelte-dnd-action';

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

	function handleDndConsider(e) {
		section.items = e.detail.items;
	}

	function handleDndFinalize(e) {
		section.items = e.detail.items;
	}

	let innerSection;

	let addNewItem = () => {
		section.items = section.items || [];

		let newItem = section.items.length
			? _.cloneDeep(_.last(section.items))
			: {
					isShown: true,
					title: '',
					description: '',
					imageUrl: ''
			  };

		newItem.id = uuidv4();

		if (section.renderType === 'pricing') {
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

	let newStreamTitle;

	let createStream = async () => {
		const { stream } = await put(`pages/${page.parentPage?._id || page._id}/embed-stream`, {
			title: newStreamTitle,
			hubStreamSlug: page.streamSlug || ''
		});

		$childStreams = [...$childStreams, stream];

		section.streamSlug = stream.slug;
		newStreamTitle = '';
	};

	section.streamSettings = {};
</script>

{#if isDatabaseModalShown}
	<Modal
		isShown
		maxWidth={1200}
		onClosed={() => {
			isDatabaseModalShown = false;
		}}
	>
		<div class="p-32 _editor">
			<EditDatabase selectedStreamSlug={section.streamSlug} bind:page />
		</div>
	</Modal>
{/if}

{#if isShort}
	<div>
		<div
			class="_section cursor-pointer"
			on:click={() => {
				// isShort = false;
				$sectionToEdit = section;
				// onEditStarted(section);
			}}
		>
			{#if section.title}
				<div>
					<b>{@html striptags(section.title || '')}</b>
				</div>
			{/if}
			<div class="overflow-hidden _line-clamp-4">
				{@html striptags(section.description || '')}
			</div>
			{#if section.renderType === 'testimonials'}
				<div>
					{@html striptags((section.testimonials || []).map((f) => f.name).join(', '))}
				</div>
			{:else if section.type === 'faq'}
				<div>
					{@html striptags((section.faqs || []).map((f) => f.question).join(', '))}
				</div>
			{:else if section.items}
				<div class="overflow-hidden _line-clamp-4">
					{@html section.items.map((item) => striptags(item.title || '')).join('<br/>')}
				</div>
			{/if}

			{#if ['pricing', 'faq', 'testimonials', 'benefits'].includes(section.type) || section.streamSlug || ['testimonials', 'pricing', 'form', 'carousel', 'stepper', 'article'].includes(section.renderType)}
				<div class="mt-2 p-2 bg-slate-200/20 rounded opacity-90">
					{#if section.renderType === 'embedCode'}
						<FeatherIcon name="code" /> Custom Code
					{:else if section.renderType === 'pricing'}
						🤑 Pricing
					{:else if section.type === 'faq'}
						⁉️ FAQ
					{:else if section.renderType === 'testimonials'}
						💚 Testimonials
					{:else if section.streamSlug}
						{#if section.streamSlug.includes('-feed')}
							📺 Media Database (Feed)
						{:else if section.streamSlug.includes('-blog')}
							📑 Articles
						{:else if section.streamSlug.includes('-changelog')}
							🪵 Changelog
						{:else}
							📚 Database ({section.streamSlug}

							{#if section.streamSettings?.limit}
								limit {section.streamSettings?.limit}{/if})
						{/if}
					{:else if section.renderType === 'carousel'}
						🎠 Media Carousel
					{:else if section.renderType === 'form'}
						🔤 Form
					{:else if section.renderType === 'stepper'}
						🔢 Stepper
					{:else if section.renderType === 'article'}
						📄 Article
					{:else if section.type === 'benefits'}
						<div class="text-lg font-bold" />
					{/if}
				</div>
			{/if}
		</div>
	</div>
{:else}
	<div
		class="absolute right-4 top-6 opacity-70 hover:opacity-100 transition  text-sm cursor-pointer text-[#8B786D]"
		title="Remove Item"
		on:click={onRemove}
	>
		Delete Section 🗑
	</div>

	<div class="mt-4 _section p-2 bg-[#fafafa] mb-8" style="margin-bottom:16px;">
		<div class="font-bold mb-2">Render this section as...</div>

		<select class="block w-full mt-2 mb-2" bind:value={section.renderType}>
			<option value="grid">Default Grid Section</option>
			<option value="pricing">Pricing</option>
			<option value="testimonials">Testimonials</option>
			<option value="carousel">Carousel Menu</option>
			<option value="stepper">1-2-3 Stepper</option>
			<option value="callout">Callout</option>
			<option value="changelog">Changelog</option>
			<option value="faq">FAQ</option>
			<option value="article">Article</option>
			<option value="form">Form</option>
			<option value="embedCode">HTML Code Embed</option>
		</select>

		{#if section.renderType === 'carousel'}
			<select class="w-full my-4" bind:value={section.carouselType}>
				<option value="vertical">Vertical</option>
				<option value="horizontal">Horizontal</option>
			</select>

			<div class="flex items-center mt-2 justify-between">
				<div class="text-xs flex gap-2 items-center">
					<div
						class="cursor-pointer"
						on:click={() => {
							section.maxWidth = 0;
						}}
						class:font-bold={!section.maxWidth}
					>
						Stretch
					</div>

					<div
						class="cursor-pointer"
						on:click={() => {
							section.maxWidth = 600;
						}}
						class:font-bold={section.maxWidth === 600}
					>
						Medium
					</div>
				</div>
			</div>
		{/if}
	</div>

	<div class="_section rounded-xl" style="padding:0;">
		<div class="flex justify-between items-center">
			<div class="_title p-4" style="margin: 0;">Section</div>
		</div>

		<hr class="border-[#8B786D] opacity-30" />

		<div class="p-4">
			<EditSectionItem
				class="p-0"
				isWithGrid={false}
				isWithLabel
				isWithInteractive
				onRemove={null}
				bind:page
				bind:section
				bind:item={section}
			/>
		</div>
		<div
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
			{#if section.renderType === 'grid' || section.renderType === 'pricing'}
				<hr class="mt-4 border-[#8B786D] opacity-30" />
				<div class="bg-white  my-4">
					<div class="relative mt-4">
						<div class="px-4 flex items-center">
							{#if section.renderType !== 'pricing'}
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
								{#if section.columns === 12}columns{/if}
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>

	{#if section.renderType === 'embedCode'}
		<div class="_section">
			<div class="font-bold mb-4">Custom Code</div>
			<div class="text-sm mb-2">Custom HTML Code</div>

			<textarea
				placeholder="<div>Hello World</div>"
				class="w-full"
				rows="8"
				bind:value={section.customCodeHTML}
			/>

			<div class="mt-4">
				<div class="text-sm mb-2">3rd-party script URL</div>

				<input
					type="url"
					class="w-full"
					placeholder="https://ship-assets.fra1.cdn.digitaloceanspaces.com/console/17-10-2023-cd6a3dfb.js"
					bind:value={section.thirdPartyScriptUrl}
				/>
			</div>
		</div>
	{:else if section.renderType === 'faq'}
		<EditFAQ bind:section />
	{:else if section.renderType === 'testimonials'}
		<EditTestimonials bind:section />
	{:else}
		{#if section.renderType === 'pricing'}
			<div class="_section rounded-xl p-4">
				<div class="flex items-center font-bold">
					Benefits icon <EmojiPicker
						class="ml-4"
						defaultIcon="✅"
						bind:icon={section.benefitsEmoji}
					/>
				</div>
				<div class="mt-2">This icon is used to show benefits</div>
			</div>
		{/if}

		<div class="mb-4 font-bold mt-8">Section Items</div>
		<hr class="mt-4 mb-8" />

		{#if section.items?.length}
			<div
				use:dndzone={{ items: section.items, flipDurationMs: 300 }}
				on:consider={handleDndConsider}
				on:finalize={handleDndFinalize}
			>
				{#each section.items || [] as item (item.id)}
					<div class="_section cursor-auto">
						<EditSectionItem class="p-0" bind:page bind:section bind:item />
					</div>
				{/each}
			</div>
		{/if}
		{#if !section.streamSlug}
			<button
				class="_secondary _small  w-full p-4 flex justify-center cursor-pointer text-[#8B786D]"
				on:click={addNewItem}
				>Add {section.renderType === 'article' ? 'Subparagraph' : 'Section Item'}</button
			>
		{/if}
		<div>
			<div class="p-4" />
		</div>

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
						<EditSectionItem
							class=""
							{section}
							bind:page
							bind:item={section.actionSuccessSection}
						/>
					</div>
				{/if}

				{#if section.actionType === 'url'}
					<div class="font-normal text-sm opacity-70 mt-4 mb-2">
						URL to open once email submitted
					</div>

					<input class="w-full mb-4" bind:value={section.actionUrl} placeholder="Action Url" />
				{/if}
			</div>
		{/if}
	{/if}
	{#if true}
		{#if !section.renderType || section.renderType === 'grid'}
			<hr class="my-8" />
			<div class="_section">
				<div class="_title mt-4" style="margin: 0;">Sync from database</div>

				<div class="w-full flex flex-col gap-4 mb-4 mt-2">
					<select class="w-full" bind:value={section.streamSlug}>
						<option value="">No</option>

						{#if !$childStreams.find((cs) => cs.slug.includes('-feed'))}
							<option value={'_feed'}>Feed</option>
						{/if}

						{#if !$childStreams.find((cs) => cs.slug.includes('-changelog'))}
							<option value={'_changelog'}>Changelog</option>
						{/if}

						{#if !$childStreams.find((cs) => cs.slug.includes('-blog'))}
							<option value={'_blog'}>Blog Articles</option>
						{/if}

						{#each $childStreams as stream (stream._id)}
							<option value={stream.slug}>{stream.title}</option>
						{/each}
						<option value="_new">Add New</option>
					</select>

					{#if section.streamSlug && section.streamSlug !== '_new'}
						<button class="w-full _small _secondary" on:click={() => (isDatabaseModalShown = true)}
							>Edit Data</button
						>
					{/if}

					{#if section.streamSlug === '_new'}
						<input placeholder="Database Name" class="w-full" bind:value={newStreamTitle} />
						<Button class="shrink-0 _small _secondary" onClick={createStream}
							>Create Database</Button
						>
					{/if}

					{#if section.streamSlug && section.streamSlug !== '_new'}
						{#if section.streamSettings}
							<div class="grid grid-cols-2 gap-4">
								<div class="_section">
									<div class="text-sm mb-2">Limit items</div>
									<input type="number" class="w-full" bind:value={section.streamSettings.limit} />
									<div class="text-xs mt-2">Leave 0 for pagination</div>
								</div>
								<div class="_section">
									<div class="text-sm mb-2">Filter by tags</div>
									<input
										type="text"
										class="w-full"
										bind:value={section.streamSettings.filterTags}
									/>
									<div class="text-xs mt-2">Leave empty to not filter</div>
								</div>
							</div>
							<div class="_section">
								<div class="text-sm mb-2">Sort</div>

								<select class="w-full" bind:value={section.streamSettings.sortBy}>
									<option value="_sample">Random</option>
									<option value="order">Sort by Order</option>
									<option value="-publishedOn">Newest First</option>
									<option value="-viewsCount">Popular First</option>
								</select>
							</div>
							<div class="_section">
								<div class="text-sm mb-2">Show best sample</div>
								<div>
									<input type="checkbox" bind:checked={section.streamSettings.isWithImageOnly} /> Include
									only items with image
								</div>

								<div>
									<input type="checkbox" bind:checked={section.streamSettings.isWithUrlOnly} /> Include
									only items with URL
								</div>
							</div>
						{/if}

						<Button
							class="shrink-0 _small _secondary"
							theme="light"
							onClick={() => {
								if (section.streamSlug.startsWith('_')) {
									return [];
								}

								return getFeed({
									cacheId: section.id,
									streamSlug: section.streamSlug,
									streamSettings: section.streamSettings,
									forceRefresh: true,
									perPage: 20
								});
							}}>💫 refresh</Button
						>
					{/if}
				</div>
			</div>
		{/if}
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
					isWithLabel
					isWithInteractive
					onRemove={null}
					bind:page
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

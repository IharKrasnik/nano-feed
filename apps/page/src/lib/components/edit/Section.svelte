<script>
	import _ from 'lodash';

	import { put } from 'lib/api';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import { v4 as uuidv4 } from 'uuid';

	import EditSectionItem from '$lib/components/edit/SectionItem.svelte';
	import EditTestimonials from '$lib/components/edit/Testimonials.svelte';
	import EditTable from '$lib/components/edit/TableSection.svelte';
	import EditDatabase from '$lib/components/edit/Database.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import selectedSectionItem from 'lib-render/stores/selectedSectionItem';
	import EditSectionSettings from '$lib/components/edit/SectionSettings.svelte';
	import EditSectionItemsSettings from '$lib/components/edit/SectionItemsSettings.svelte';
	import EditSvelteComponent from '$lib/components/edit/SvelteComponent.svelte';
	import BackTo from '$lib/components/BackTo.svelte';
	import Modal from 'lib/components/Modal.svelte';

	import clickOutside from 'lib/use/clickOutside';
	import sectionToEdit from 'lib-render/stores/sectionToEdit';
	import sectionTypesDictionary from '$lib/helpers/sectionTypesDictionary';
	import childStreams from 'lib/stores/childStreams';
	import { dndzone } from 'svelte-dnd-action';
	import ToggleGroup from '$lib/components/ToggleGroup.svelte';

	import striptags from 'striptags';

	export let section;

	export let page;

	export let onRemove = () => {};
	export let onEditStarted = () => {};
	export let onEditEnded = () => {};

	export let isInnerSection = false;

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
		newItem.isMustHaveField = false;

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

	if (!section.streamSettings) {
		section.streamSettings = {};
	}

	if (section.streamSlug) {
		section.isUseDb = true;
	}
	let isItemsSettingsCollapsed = true;

	let isEditAsJson = false;
	let themeJsonStr;

	let isEditingSvelteCode = false;
</script>

{#if isEditingSvelteCode}
	<Modal
		isShown={true}
		onClosed={() => {
			isEditingSvelteCode = false;
		}}
	>
		<EditSvelteComponent bind:section bind:page />
	</Modal>
{/if}

{#if isShort}
	<div>
		<div
			class="_section cursor-pointer"
			on:click={() => {
				// isShort = false;
				if (isInnerSection) {
					section.isInnerSection = true;
				}
				$sectionToEdit = section;
				// onEditStarted(section);
			}}
		>
			{#if section.title}
				<div class="mb-1">
					<b>{@html striptags(section.title || '')}</b>
				</div>
			{/if}
			<div class="opacity-80">
				<div class="overflow-hidden _line-clamp-4">
					{@html striptags(section.description || '')}

					{#if section.items}
						{@html section.items.map((item) => striptags(item.title || '')).join('<br/>')}
					{/if}

					{#if section.renderType === 'testimonials'}
						<div class="overflow-hidden _line-clamp-4">
							{@html striptags((section.testimonials || []).map((f) => f.name).join(', '))}
						</div>
					{:else if section.type === 'faq'}
						<div class="overflow-hidden _line-clamp-4">
							{@html striptags((section.faqs || []).map((f) => f.question).join(', '))}
						</div>
					{/if}
					{#if section.callToActionText}
						<div class="mt-2">
							{section.callToActionText}
						</div>
					{/if}
				</div>
			</div>
			{#if ['pricing', 'faq', 'testimonials', 'benefits'].includes(section.type) || section.streamSlug || ['testimonials', 'pricing', 'form', 'carousel', 'stepper', 'article', 'faq'].includes(section.renderType)}
				<div class="mt-2 p-2 bg-slate-200/20 rounded opacity-90">
					{#if section.renderType === 'embedCode'}
						<FeatherIcon name="code" /> Custom Code
					{:else if section.renderType === 'pricing'}
						🤑 Pricing
					{:else if section.renderType === 'faq'}
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
					{:else if section.renderType === 'benefits'}
						<div class="text-lg font-bold" />
					{/if}
				</div>
			{/if}
		</div>
	</div>
{:else}
	{#if !section.isInnerSection}
		<div
			class="absolute right-4 top-6 opacity-70 hover:opacity-100 transition  text-sm cursor-pointer text-[#8B786D]"
			title="Remove Item"
			on:click={onRemove}
		>
			Delete Section 🗑
		</div>
	{/if}

	{#if $selectedSectionItem?.id === section.id}
		<div
			class="fixed top-[60px] bg-white left-0 h-screen w-[400px] p-4 overflow-y-scroll pb-[200px] "
			style="z-index: 100;"
		>
			<BackTo
				to="Section Content"
				onClick={() => {
					$selectedSectionItem = null;
				}}
			/>

			<EditSectionSettings
				bind:section
				bind:sectionItem={section}
				isShown
				isWithButton={false}
				bind:page
			/>
		</div>
	{/if}

	{#if section.renderType === 'embedSvelte'}
		<div
			class="_section cursor-pointer flex gap-x-2 items-center"
			on:click={() => {
				isEditingSvelteCode = true;
			}}
		>
			<div class="border border-orange-300 rounded-full p-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					width="20"
					version="1.1"
					id="Layer_1"
					x="0px"
					y="0px"
					viewBox="0 0 98.1 118"
					style="enable-background:new 0 0 98.1 118;"
					xml:space="preserve"
				>
					<style type="text/css">
						.st0 {
							fill: #ff3e00;
						}
						.st1 {
							fill: #ffffff;
						}
					</style>
					<path
						class="st0"
						d="M91.8,15.6C80.9-0.1,59.2-4.7,43.6,5.2L16.1,22.8C8.6,27.5,3.4,35.2,1.9,43.9c-1.3,7.3-0.2,14.8,3.3,21.3  c-2.4,3.6-4,7.6-4.7,11.8c-1.6,8.9,0.5,18.1,5.7,25.4c11,15.7,32.6,20.3,48.2,10.4l27.5-17.5c7.5-4.7,12.7-12.4,14.2-21.1  c1.3-7.3,0.2-14.8-3.3-21.3c2.4-3.6,4-7.6,4.7-11.8C99.2,32.1,97.1,22.9,91.8,15.6"
					/>
					<path
						class="st1"
						d="M40.9,103.9c-8.9,2.3-18.2-1.2-23.4-8.7c-3.2-4.4-4.4-9.9-3.5-15.3c0.2-0.9,0.4-1.7,0.6-2.6l0.5-1.6l1.4,1  c3.3,2.4,6.9,4.2,10.8,5.4l1,0.3l-0.1,1c-0.1,1.4,0.3,2.9,1.1,4.1c1.6,2.3,4.4,3.4,7.1,2.7c0.6-0.2,1.2-0.4,1.7-0.7L65.5,72  c1.4-0.9,2.3-2.2,2.6-3.8c0.3-1.6-0.1-3.3-1-4.6c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7l-10.5,6.7  c-1.7,1.1-3.6,1.9-5.6,2.4c-8.9,2.3-18.2-1.2-23.4-8.7c-3.1-4.4-4.4-9.9-3.4-15.3c0.9-5.2,4.1-9.9,8.6-12.7l27.5-17.5  c1.7-1.1,3.6-1.9,5.6-2.5c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.2,0.9-0.4,1.7-0.7,2.6l-0.5,1.6l-1.4-1  c-3.3-2.4-6.9-4.2-10.8-5.4l-1-0.3l0.1-1c0.1-1.4-0.3-2.9-1.1-4.1c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7L32.4,46.1  c-1.4,0.9-2.3,2.2-2.6,3.8s0.1,3.3,1,4.6c1.6,2.3,4.4,3.3,7.1,2.6c0.6-0.2,1.2-0.4,1.7-0.7l10.5-6.7c1.7-1.1,3.6-1.9,5.6-2.5  c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.9,5.2-4.1,9.9-8.6,12.7l-27.5,17.5C44.8,102.5,42.9,103.3,40.9,103.9"
					/>
				</svg>
			</div>

			<div>
				<div>Edit Component Code</div>

				<div class="text-sm opacity-80">
					{section.theme.svelteComponentName}.svelte
				</div>
			</div>
		</div>

		<hr class="my-4" />
		<div class="_section text-sm mt-4 mb-8 text-semibold">
			The data below will be passed to component as props {`{ page, section }`}
		</div>
	{/if}
	{#if !section.isInnerSection && !section.isRichText}
		<div class="_section rounded-xl" style="padding:0;">
			<div class="flex items-center">
				<div class="_title p-4 mr-4" style="margin: 0;">Section</div>
				<div
					class="text-sm  cursor-pointer _text-link"
					on:click={() => {
						$selectedSectionItem = section;
					}}
				>
					{sectionTypesDictionary[section.renderType]}
				</div>
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
			/>
		</div>
	{/if}

	{#if section.renderType === 'embedCode'}
		<div class="_section">
			<div class="font-bold mb-4">Custom Code</div>
			<div class="text-sm mb-2">Custom HTML Code (no script tags)</div>

			<textarea
				placeholder="<div>Hello World</div>"
				class="w-full"
				rows="8"
				bind:value={section.customCodeHTML}
			/>

			<div class="mt-4">
				<div class="text-sm mb-2">Custom JavaScript</div>

				<textarea
					class="w-full"
					placeholder="let el = document.getElementById('my-id');"
					bind:value={section.customScriptJs}
				/>
			</div>

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
	{:else if section.renderType === 'comments'}
		<!-- <EditFAQ bind:section /> -->
	{:else if section.renderType === 'testimonials'}
		<EditTestimonials bind:section />
	{:else if section.renderType === 'table'}
		<EditTable bind:section bind:page />
	{:else}
		{#if section.renderType === 'pricing'}
			<div class="_section rounded-xl p-4">
				<div class="flex items-center font-bold">
					<EmojiPicker class="mr-2" defaultIcon="✅" bind:icon={section.benefitsEmoji} /> Benefits icon
				</div>
				<div class="mt-2">This icon is used to show benefits</div>
			</div>
			<div class="_section rounded-xl p-4">
				<div class="flex items-center font-bold ">Pricing tabs</div>
				{#if section.pricingTabs?.length}
					{#each section.pricingTabs as pricingTab}
						<div class="mb-1">
							{pricingTab.payPer}: <input bind:value={pricingTab.hint} placeholder="Hint" />
						</div>
					{/each}
				{:else}
					<div class="mt-2">Start adding sections and set pay per</div>
				{/if}
			</div>
		{/if}

		{#if _.includes(['grid', 'pricing', 'scrollingGallery'], section.renderType)}
			{#if isEditAsJson}{:else}
				<div class="mt-4 _section p-2 bg-[#fafafa] mb-8" style="margin-bottom:16px;">
					<div class="bg-white">
						<div class="flex w-full justify-between">
							<div class="font-bold mb-2">Layout</div>
							<div
								class="text-sm  cursor-pointer  _text-link "
								on:click={() => {
									isEditAsJson = !isEditAsJson;

									if (isEditAsJson) {
										themeJsonStr = JSON.stringify(section.theme, null, 2);
									}
								}}
							>
								{isEditAsJson ? 'Back to UI' : 'Edit as JSON'}
							</div>
						</div>

						<ToggleGroup
							class="mb-4"
							tabs={[
								{
									key: 'grid',
									isSelected: section.columns > 1 && !section.isFlexGrid,
									name: 'Grid'
								},
								{
									key: 'rows',
									isSelected: section.columns === 1,
									name: 'Rows'
								},
								{
									key: 'flex',
									name: 'Fluid',
									isSelected: section.isFlexGrid
								}
							]}
							onTabSelected={(tab) => {
								if (tab.key === 'grid') {
									section.isFlexGrid = false;

									if (!section.columns || section.columns === 1) {
										section.columns = 2;
									}
								} else if (tab.key === 'rows') {
									section.isFlexGrid = false;

									if (section.columns !== 1) {
										section.columns = 1;
									}
								} else if (tab.key === 'flex') {
									section.isFlexGrid = true;
									if (section.columns === 1) {
										section.columns = 2;
									}
								}
							}}
						/>

						<div class="relative mt-4">
							{#if section.columns > 1 && !section.isFlexGrid}
								<div class="flex gap-x-1 items-center">
									<div
										class=" cursor-pointer bg-section flex justify-center items-center rounded-xl text-sm px-2 py-1"
										on:click={() => (section.columns = 2)}
										class:px-4={section.columns === 2}
									>
										2
										{#if section.columns === 2}columns{/if}
									</div>

									<div
										class=" cursor-pointer bg-section px-2 py-1 text-sm flex justify-center items-center rounded-xl"
										class:px-4={section.columns === 3}
										on:click={() => (section.columns = 3)}
									>
										3
										{#if section.columns === 3}columns{/if}
									</div>

									<div
										class="cursor-pointer bg-section px-2 text-sm px-2 py-1 flex justify-center items-center rounded-xl "
										class:px-4={section.columns === 4}
										on:click={() => (section.columns = 4)}
									>
										4
										{#if section.columns === 4}columns{/if}
									</div>
									<div
										class="cursor-pointer bg-section text-sm px-2 py-1 flex justify-center items-center rounded-xl"
										class:px-4={section.columns === 12}
										on:click={() => (section.columns = 12)}
									>
										12
										{#if section.columns === 12}columns{/if}
									</div>
								</div>

								{#if section.renderType === 'grid' || section.renderType === 'pricing'}
									{#if section.columns > 1}
										<div class="mb-2 mt-4">
											<input type="checkbox" bind:checked={section.isMasonryGrid} /> Masonry Grid
											{#if section.isMasonryGrid}
												<input class="ml-2" type="checkbox" bind:checked={section.isFunkyGrid} /> Funky
											{/if}
										</div>
									{/if}
								{/if}
							{/if}

							{#if section.isFlexGrid}
								<div class="mb-2 mt-4">
									{#if section.isMasonryGrid}
										<input class="ml-2" type="checkbox" bind:checked={section.isFunkyGrid} /> Funky
									{/if}

									<div>
										<input class="mt-2" type="checkbox" bind:checked={section.isFlexWrap} /> Move items
										to the next line if not fit
									</div>
								</div>
							{/if}
						</div>
					</div>

					<div class="mb-2 font-semibold mt-6 text-sm">Gap between columns</div>
					<ToggleGroup
						tabs={[
							{
								key: undefined,
								name: 'Normal'
							},
							{
								key: 'big',
								name: 'Big'
							},
							{
								key: 'huge',
								name: 'Huge'
							}
						]}
						bind:value={section.theme.columnsGap}
					/>

					<div class="mb-2 font-semibold mt-6 text-sm">Section width</div>
					<ToggleGroup
						tabs={[
							{
								key: undefined,
								name: 'Container'
							},
							{
								key: '1000px',
								name: 'M'
							},
							{
								key: '800px',
								name: 'S'
							},
							{
								key: '600px',
								name: 'XS'
							}
						]}
						bind:value={section.theme.maxSectionWidth}
					/>

					{#if section.columns > 1}
						<div class="flex mt-4">
							<input type="checkbox" class="mr-2" bind:checked={section.theme.isMobileInline} />
							<div>Show items horizontally on mobile</div>
						</div>
					{/if}
				</div>
			{/if}
		{/if}

		{#if isEditAsJson}
			<div class="_section">
				<div class="flex w-full justify-between">
					<div class="font-bold text-sm mb-2">Theme JSON</div>
					<div
						class="text-sm  cursor-pointer  _text-link "
						on:click={() => {
							isEditAsJson = false;
						}}
					>
						Back to UI
					</div>
				</div>
				<textarea
					bind:value={themeJsonStr}
					rows={20}
					class="w-full"
					on:input={() => {
						try {
							section.theme = JSON.parse(themeJsonStr);
						} catch (err) {}
					}}
				/>
			</div>
		{:else if _.includes(['grid', 'pricing', 'scrollingGallery'], section.renderType)}
			<div class="_section my-4 !p-4">
				<div
					class="flex items-center justify-between w-full {isItemsSettingsCollapsed
						? 'opacity-60 hover:opacity-100 py-2 cursor-pointer'
						: ''}"
					on:click={() => (isItemsSettingsCollapsed = !isItemsSettingsCollapsed)}
				>
					<div class="flex items-start">
						<FeatherIcon class="mt-1" size={25} name="grid" />
						<div class="ml-2">
							<div class="font-bold">Inner items appearance</div>
							<div class="text-sm">Default styles applied to each inner section item</div>
						</div>
					</div>

					<div class="flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100">
						<div class="flex items-center opacity-50 hover:opacity-100 cursor-pointer">
							{#if isItemsSettingsCollapsed}
								<FeatherIcon size="20" name="chevron-down" color="#333" />
							{:else}
								<FeatherIcon class="mr-2" size="15" name="eye-off" />
							{/if}
						</div>
					</div>
				</div>

				{#if !isItemsSettingsCollapsed}
					<div class="mt-8">
						<div class="mb-4 mt-4">
							<div class="mb-2 text-sm font-semibold mb-1">Section Items Type</div>

							<ToggleGroup
								class="mb-2"
								bind:value={section.theme.itemsRenderType}
								tabs={[
									{
										name: 'Default'
									},
									{
										key: 'testimonial',
										name: 'With avatar'
									},
									{
										key: 'tag',
										name: 'Tag'
									}
								]}
							/>
						</div>
						{#if section.theme.itemsRenderType === 'testimonial'}
							<input
								type="checkbox"
								class="mb-2"
								bind:checked={section.theme.areItemsIncludeStars}
							/> include stars
						{/if}
						<EditSectionItemsSettings bind:page bind:section bind:sectionItem={section} />
					</div>
				{/if}
			</div>
		{/if}

		{#if !section.isRichText}
			<div class="w-full flex justify-between mt-8">
				<div class="mb-4 font-bold">
					{section.renderType === 'form' ? 'Form Fields' : 'Section Items'}
				</div>
				<div>
					{#if section.renderType !== 'form'}
						<input
							type="checkbox"
							bind:checked={section.isUseDb}
							on:change={(evt) => {
								if (!evt.target.checked) {
									section.streamSlug = null;
								}
							}}
						/> Attach to database
					{/if}
				</div>
			</div>

			<hr class="mt-4 mb-8" />

			{#if section.items?.length}
				<div
					use:dndzone={{ items: section.items, flipDurationMs: 300 }}
					on:consider={handleDndConsider}
					on:finalize={handleDndFinalize}
				>
					{#each section.items || [] as item (item.id)}
						<!-- This weird repetitions needed in order for editor bindings to work. Otherwise editor updates are not reflected  -->
						{#if $selectedSectionItem?.id === item.id}
							<div
								class="fixed top-[60px] bg-white left-0 h-screen w-[400px] p-4 overflow-y-scroll pb-[200px] "
								style="z-index: 100;"
							>
								<BackTo
									to="Section Content"
									onClick={() => {
										$selectedSectionItem = null;
									}}
								/>

								<EditSectionSettings
									bind:section
									bind:sectionItem={item}
									isShown
									isWithButton={false}
									bind:page
								/>
							</div>
						{/if}

						<div
							class="_section cursor-auto  {$selectedSectionItem?.id === item.id
								? '!border-2 !border-purple-300'
								: ''}"
							id={`section-edit-${item.id}`}
						>
							<EditSectionItem class="p-0" bind:page bind:section bind:item />
						</div>
					{/each}
				</div>
			{/if}

			{#if !section.isUseDb && !section.streamSlug}
				<button
					class="_secondary _small  w-full p-4 flex justify-center cursor-pointer text-[#8B786D]"
					on:click={addNewItem}
					>Add {section.renderType === 'article'
						? 'Subparagraph'
						: section.renderType === 'form'
						? 'Form Field'
						: 'Section Item'}</button
				>
			{/if}
		{/if}

		<div>
			<div class="p-4" />
		</div>

		{#if section.renderType === 'form'}
			<div class="_section">
				<div class="font-bold">Submit Button & What's Next</div>
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
						<option value="service_chat">Redirect to the service board</option>
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
	{#if section.isUseDb}
		<EditDatabase
			isWithButton={false}
			isSortable={section.streamSettings.sortBy === 'order'}
			cacheId={section.id}
			bind:streamSettings={section.streamSettings}
			bind:selectedStreamSlug={section.streamSlug}
			bind:page
			attachToPages={[{ _id: page._id }]}
			defaultAttachedPages={[page]}
		/>
	{/if}

	<hr class="mt-4 mb-8" />

	{#if true || section.streamSettings?.limit}
		{section.footer ? '' : (section.footer = { id: uuidv4() }) && ''}

		<div class="_section rounded-xl" style="padding:0;">
			<div class="flex justify-between items-center">
				<div class="_title p-4" style="margin: 0;">Section Footer</div>
			</div>

			<hr class="border-[#8B786D] opacity-30" />

			<div class="p-4">
				<EditSectionItem
					class="p-0"
					isWithGrid={false}
					isWithLabel
					isWithInteractive
					isSectionFooter
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

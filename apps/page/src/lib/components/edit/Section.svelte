<script>
	import _ from 'lodash';

	import { put } from 'lib/api';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import { v4 as uuidv4 } from 'uuid';

	import ToggleGroup from '$lib/components/ToggleGroup.svelte';

	import EditSectionItem from '$lib/components/edit/SectionItem.svelte';
	import EditFAQ from '$lib/components/edit/FAQ.svelte';
	import EditTestimonials from '$lib/components/edit/Testimonials.svelte';
	import EditDatabase from '$lib/components/edit/Database.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import selectedSectionItem from 'lib-render/stores/selectedSectionItem';
	import EditSectionSettings from '$lib/components/edit/SectionSettings.svelte';
	import BackTo from '$lib/components/BackTo.svelte';

	import clickOutside from 'lib/use/clickOutside';
	import sectionToEdit from 'lib-render/stores/sectionToEdit';

	import childStreams from 'lib/stores/childStreams';
	import { dndzone } from 'svelte-dnd-action';

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

	if (!section.streamSettings) {
		section.streamSettings = {};
	}

	if (section.streamSlug) {
		section.isUseDb = true;
	}

	$: if ($selectedSectionItem) {
		let editEl = document.getElementById(`section-edit-${$selectedSectionItem.id}`);

		if (editEl) {
			editEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
		}
	}
</script>

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

	{#if !section.isInnerSection && !section.isRichText}
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
	{:else if section.renderType === 'comments'}{:else if section.renderType === 'faq'}
		<EditFAQ bind:section />
	{:else if section.renderType === 'testimonials'}
		<EditTestimonials bind:section />
	{:else}
		{#if section.renderType === 'pricing'}
			<div class="_section rounded-xl p-4">
				<div class="flex items-center font-bold">
					<EmojiPicker class="mr-2" defaultIcon="✅" bind:icon={section.benefitsEmoji} /> Benefits icon
				</div>
				<div class="mt-2">This icon is used to show benefits</div>
			</div>
		{/if}

		{#if section.renderType === 'grid' || section.renderType === 'pricing'}
			<div class="mt-4 _section p-2 bg-[#fafafa] mb-8" style="margin-bottom:16px;">
				<div class="bg-white">
					<div class="font-bold mb-2">Layout</div>

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
							<div class="flex items-center">
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
								<div class="flex justify-between">
									<div>
										<div class="font-semibold mb-1 text-sm mt-2">Min item width (px)</div>
										<input
											type="number"
											style="max-width: 130px;"
											bind:value={section.minWidthPx}
										/>
									</div>
									<div>
										<div class="font-semibold mb-1 text-sm mt-2">Max item width (px)</div>
										<input
											type="number"
											style="max-width: 130px;"
											bind:value={section.maxWidthPx}
										/>
									</div>
								</div>

								{#if section.isMasonryGrid}
									<input class="ml-2" type="checkbox" bind:checked={section.maxWidthPx} /> Funky
								{/if}

								<div>
									<input class="mt-2" type="checkbox" bind:checked={section.isFlexWrap} /> Move items
									to the next line
								</div>
							</div>
						{/if}
					</div>
				</div>
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

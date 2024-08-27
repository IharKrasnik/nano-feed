<script>
	import _ from 'lodash';
	import { fly } from 'svelte/transition';
	import FileInput from '$lib/components/FileInput.svelte';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import Modal from 'lib/components/Modal.svelte';
	import EditInteractiveOptions from '$lib/components/edit/InteractiveOptions.svelte';
	import EditSectionSettings from '$lib/components/edit/SectionSettings.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import clickOutside from 'lib/use/clickOutside';
	import contenteditable from 'lib/use/contenteditable';
	import SelectBackgroundImage from '$lib/components/SelectImageBackground.svelte';
	import EditTable from '$lib/components/edit/Table.svelte';

	let clazz = 'p-4';
	export { clazz as class };

	export let isWithUrl = true;
	export let isWithGrid = true;
	export let isWithLabel = false;
	export let isWithSettings = true;
	export let isSectionFooter = false;

	export let item;
	export let section;
	export let page;

	let isAddingTags = false;

	if (!item.theme) {
		item.theme = {};
	}

	export let onRemove = () => {
		section.items = section.items.filter((i) => i !== item);
	};

	let isEmojiPickerShown;

	let addBenefit = () => {
		item.pricing.benefits = item.pricing.benefits || [];
		item.pricing.benefits.push({ name: '' });
	};

	let isSelectBackgroundModalShown;

	const updatePricingTabs = () => {
		let pricingsPer = _.uniqBy(
			section.items.filter((i) => i.pricing.per !== 'one-time'),
			(i) => i.pricing.per
		).map((p) => p.pricing.per);

		if (!section.pricingTabs) {
			section.pricingTabs = [];
		}

		_.each(pricingsPer, (pricingPer) => {
			if (!section.pricingTabs.find((t) => t.payPer === pricingPer)) {
				section.pricingTabs.push({ payPer: pricingPer, hint: null });
			}
		});

		const sortOrder = ['week', 'month', 'quarter', 'half-year', 'year'];

		section.pricingTabs = _.sortBy(
			section.pricingTabs.filter((tab) => {
				if (!_.includes(pricingsPer, tab.payPer)) {
					return false;
				}
				return true;
			}),
			(a) => {
				return sortOrder.indexOf(a.payPer);
			}
		);
	};

	let isEditPricingSlider = false;
</script>

{#if isEditPricingSlider}
	<Modal bind:isShown={isEditPricingSlider} onClosed={() => close()} maxWidth={1000}>
		<EditTable
			bind:section
			headers={['Plan Name', 'Credit Count', 'Price', 'Payment Link', 'Benefits']}
			csv={item.pricing.pricesStr}
			onSave={({ csv }) => {
				csv = csv.split('\n');
				csv.shift();
				csv = csv.join('\n');
				item.pricing.pricesStr = csv;
				isEditPricingSlider = false;
			}}
			onCancel={() => (isEditPricingSlider = false)}
		/>
	</Modal>
{/if}

{#if isSelectBackgroundModalShown}
	<Modal
		isShown={isSelectBackgroundModalShown}
		onClosed={() => {
			isSelectBackgroundModalShown = false;
		}}
	>
		<SelectBackgroundImage
			bind:imageUrl={item.imageUrl}
			bind:imageBackgroundUrl={item.imageBackgroundUrl}
			onSelected={() => {
				isSelectBackgroundModalShown = false;
			}}
		/>
	</Modal>
{/if}

{#if isEmojiPickerShown}
	<div class="fixed top-[200px] mt-8 z-40" in:fly={{ y: 50, duration: 150 }}>
		<emoji-picker
			class="light"
			on:emoji-click={(evt) => {
				item.emoji = evt.detail.unicode;
				isEmojiPickerShown = false;

				section.items = section.items.map((i) => {
					if (i === isEmojiPickerShown) {
						i.emoji = item.emoji;
						isEmojiPickerShown = false;
					}

					return i;
				});
			}}
		/>

		{#if isEmojiPickerShown.emoji}
			<div
				class="w-full text-center cursor-pointer bg-white p-4"
				on:click={() => {
					section.items = section.items.map((item) => {
						if (item === isEmojiPickerShown) {
							item.emoji = null;
							isEmojiPickerShown = false;
						}

						return item;
					});
				}}
			>
				Remove Emoji
			</div>
		{/if}
	</div>
{/if}

<div
	class={clazz}
	use:clickOutside
	on:clickOutside={() => {
		isEmojiPickerShown = false;
	}}
>
	<div class="relative flex justify-between items-center mb-4">
		<div class="flex items-center w-full">
			{#if !_.includes(['carousel', 'form', 'faq'], section.renderType) || item.isActionSuccessSection}
				{#if item.theme}
					<EmojiPicker
						bind:icon={item.emoji}
						bind:color={item.iconColor}
						bind:bgColor={item.emojiBgColor}
						bind:sizePx={item.theme.emojiSizePx}
					/>
				{/if}
			{/if}

			{#if isWithUrl && section.renderType !== 'form' && section.renderType !== 'pricing' && (!_.includes(['callout', 'faq'], section.renderType) || section.id === item.id)}
				<EditInteractiveOptions class=" mt-4" bind:section bind:sectionItem={item} />
			{/if}

			{#if (isWithSettings && !isSectionFooter && !_.includes(['carousel', 'form', 'callout', 'stepper', 'faq'], section.renderType)) || section.id === item.id || item.isActionSuccessSection}
				<EditSectionSettings bind:page bind:section bind:sectionItem={item} />
			{/if}

			{#if isWithLabel}
				<input class="ml-4 w-full" placeholder="Label" bind:value={item.label} />
			{/if}
		</div>

		{#if !item.isMustHaveField && !item.isActionSuccessSection && onRemove}
			<div
				class="opacity-70 hover:opacity-100 transition  text-sm cursor-pointer text-[#8B786D]"
				title="Remove Item"
				on:click={onRemove}
			>
				🗑
			</div>
		{/if}
	</div>

	<div class="flex w-full items-center mb-4 font-medium">
		<div
			contenteditable
			bind:innerHTML={item.title}
			use:contenteditable
			data-placeholder={section.renderType === 'faq' ? 'Question' : 'Title'}
		/>
	</div>

	<div
		class="w-full mb-4 textarea"
		contenteditable
		use:contenteditable
		bind:innerHTML={item.description}
		data-placeholder={section.renderType === 'faq' ? 'Answer' : 'Description'}
	/>

	{#if section.theme?.itemsRenderType === 'testimonial' && section.id !== item.id}
		<input class="mb-4 w-full" bind:value={item.label} type="text" placeholder="CEO, Clipwing" />
	{/if}

	{#if item.id !== section.id && !_.includes(['callout', 'faq'], section.renderType)}
		<div class="mb-4">
			{#if isAddingTags || item.tagsStr}
				<div class="flex items-center mt-2">
					<span class="text-xs font-medium mr-2 shrink-0">Tags</span>
					<input
						class="w-full"
						autofocus
						placeholder="Fast, Intuitive, Affordable"
						bind:value={item.tagsStr}
					/>
				</div>
			{:else if section.renderType !== 'form' && !isSectionFooter}
				<div
					class="text-xs opacity-70 hover:opacity-100 text-underline cursor-pointer"
					on:click={() => {
						isAddingTags = true;
						item.tagsStr = 'Fast, Intuitive, Affordable';
					}}
				>
					<FeatherIcon class="inline" name="tag" theme={'light'} size={'10'} /> Add tags
				</div>
			{/if}
		</div>

		<div class="mb-4">
			{#if item.renderType === 'testimonial'}
				<input bind:value={item.label} type="text" class="w-full" placeholder="CEO, Some Company" />
			{/if}
		</div>
	{/if}

	{#if section.renderType === 'pricing' && item.pricing}
		{#if item.pricing.isSlider}
			<select class="w-full" bind:value={item.pricing.per} on:change={updatePricingTabs}>
				<option value="one-time">One-Time</option>
				<option value="week">Week</option>
				<option value="month">Month</option>
				<option value="quarter">Quarter</option>
				<option value="half-year">Half-Yearly</option>
				<option value="year">Year</option>
			</select>

			<div class="w-full flex justify-between mt-4">
				<div class="text-xs opacity-70" />
				<div class="flex justify-end">
					<div
						class="text-xs cursor-pointer hover:text-red-800"
						on:click={() => {
							item.pricing.isSlider = !item.pricing.isSlider;
						}}
					>
						remove price slider
					</div>
				</div>
			</div>

			<textarea
				class="cursor-pointer w-full"
				rows="2"
				placeholder="100;$21.58;https://buy.stripe.com/12345&#10;200;$39.78;https://buy.stripe.com/23456"
				on:click={() => (isEditPricingSlider = true)}
				bind:value={item.pricing.pricesStr}
				on:change={(evt) => {
					item.pricing.prices = evt.target?.value
						.split('\n')
						.filter((l) => l)
						.map((lines) => {
							let splits = lines.split(';');

							return {
								planName: splits[0],
								creditsAmount: parseInt(splits[1]),
								amount: parseInt(splits[2].replace('$', '')),
								link: splits[3].startsWith('http') ? splits[3] : null,
								benefitsStr: splits[4]
							};
						});
				}}
			/>

			<div class="w-full flex gap-x-2 items-center mt-4">
				<div class="text-sm shrink-0 opacity-70">Credits label</div>
				<input
					class="w-full"
					type="text"
					bind:value={item.pricing.creditsLabel}
					placeholder="credits"
				/>
			</div>
			<!-- 
			{#each item.pricing.prices as price}
				<input class="mr-2" type="number" bind:value={price.creditAmount} placeholder="" />

				<div class="flex items-center w-full">
					<div class="mr-2">$</div>

					<div>
						<input class="mr-2" type="number" bind:value={price.amount} placeholder="29.99" />
					</div>
				</div>
			{/each} -->

			<!-- <div class="flex justify-end">
				<div
					class="text-xs cursor-pointer mt-1 mb-[-16px]"
					on:click={() => {
						item.pricing.isSlider = !item.pricing.isSlider;
					}}
				>
					add price slider
				</div>
			</div> -->
		{:else}
			<div class="flex items-center">
				<div class="mr-2">$</div>

				<div>
					<input class="mr-2" type="number" bind:value={item.pricing.amount} placeholder="29.99" />
				</div>
				<select class="w-full" bind:value={item.pricing.per} on:change={updatePricingTabs}>
					<option value="one-time">One-Time</option>
					<option value="week">Week</option>
					<option value="month">Month</option>
					<option value="quarter">Quarter</option>
					<option value="half-year">Half-Yearly</option>
					<option value="year">Year</option>
				</select>
			</div>
			<div class="flex justify-end">
				<div
					class="text-xs cursor-pointer mt-1 mb-[-16px]  hover:text-green-800"
					on:click={() => {
						item.pricing.isSlider = !item.pricing.isSlider;
					}}
				>
					add price slider
				</div>
			</div>
		{/if}

		<div class="mt-4 text-sm">Benefits</div>
		<div class="text-xs mb-2">Separate by a new line. Start with '-' to exclude</div>
		<textarea
			class="w-full"
			placeholder={`Benefit 1 
Benefit 2
Benefit 3`}
			rows="6"
			bind:value={item.pricing.benefitsStr}
		/>

		{#if item.pricing?.benefits?.length}
			<div class="mt-4">
				{#each item.pricing.benefits as benefit}
					<div class="flex justify-between items-center">
						✅ <input class="w-full my-2 mx-4" bind:value={benefit.name} />
						<div
							class="cursor-pointer"
							on:click={() => {
								item.pricing.benefits = item.pricing.benefits.filter((b) => b !== benefit);
							}}
						>
							🗑
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<div class="_section mt-4">
			<EditInteractiveOptions
				bind:section
				options={[{ value: 'link', text: 'Button' }]}
				bind:sectionItem={item}
				isWithButton={false}
			/>
		</div>
	{:else if section.renderType === 'form' && item?.id !== section?.id}
		<div class="_section  mt-4">
			<div class="mb-2 font-bold">Interaction</div>
			<EditInteractiveOptions class="" bind:section bind:sectionItem={item} isWithButton={false} />
		</div>
	{:else if !_.includes(['form', 'faq'], section.renderType) || item.isActionSuccessSection}
		{#if item.id === section.id || (section.renderType !== 'callout' && !isSectionFooter)}
			<div class="relative flex justify-between items-center">
				<FileInput
					class="w-full"
					placeholder="Media URL (or clipboard)"
					isCanSearch
					bind:url={item.imageUrl}
					isWithIntegrations
					theme="light"
				/>
			</div>
		{/if}

		{#if item.imageUrl}
			<div class="flex items-center mt-2 justify-between">
				<div class="text-xs flex gap-2 items-center">
					{#if item.id === section.id && section.renderType !== 'callout'}
						<div class="text-xs mt-2 flex gap-2 items-center">
							<div
								class="cursor-pointer"
								on:click={() => {
									section.imgMaxWidth = 0;
								}}
								class:font-bold={!section.imgMaxWidth}
							>
								Auto
							</div>

							<div
								class="cursor-pointer"
								on:click={() => {
									section.imgMaxWidth = 600;
								}}
								class:font-bold={section.imgMaxWidth === 600}
							>
								Medium
							</div>

							<div
								class="cursor-pointer"
								on:click={() => {
									section.imgMaxWidth = 'full-screen';
								}}
								class:font-bold={section.imgMaxWidth === 'full-screen'}
							>
								Full-Screen
							</div>
						</div>
					{:else if item.id !== section.id && section.theme.imageAspectRatio}
						{section.theme.imageAspectRatio === 'og'
							? 'OG (120x63)'
							: section.theme.imageAspectRatio === 'image'
							? 'Image (4x3)'
							: section.theme.imageAspectRatio === 'square'
							? 'Square (1x1)'
							: ''}
					{:else}
						<div
							class="cursor-pointer"
							on:click={() => {
								item.theme.imageAspectRatio = 'og';
							}}
							class:font-bold={item.theme.imageAspectRatio === 'og'}
						>
							OG (120x63)
						</div>

						<div
							class="cursor-pointer"
							on:click={() => {
								item.theme.imageAspectRatio = 'image';
							}}
							class:font-bold={item.theme.imageAspectRatio === 'image'}
						>
							4x3
						</div>

						<div
							class="cursor-pointer"
							on:click={() => {
								item.theme.imageAspectRatio = 'square';
							}}
							class:font-bold={item.theme.imageAspectRatio === 'square'}
						>
							1x1
						</div>

						<div
							class="cursor-pointer"
							on:click={() => {
								item.theme.imageAspectRatio = null;
							}}
							class:font-bold={!item.theme.imageAspectRatio}
						>
							Auto
						</div>
					{/if}
				</div>
				<div
					class="ml-4"
					on:click={() => {
						isSelectBackgroundModalShown = true;
					}}
				>
					<div class="flex items-center justify-center border rounded text-xs">
						{#if item.imageBackgroundUrl}
							<img class="w-[25px] h-[25px]" src={item.imageBackgroundUrl} />
						{:else}
							<div class="px-2 cursor-pointer">no background</div>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	{/if}
</div>

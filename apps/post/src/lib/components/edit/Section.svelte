<script>
	import _ from 'lodash';
	import tooltip from 'lib/use/tooltip';
	import getRandomEmoji from 'lib/services/getRandomEmoji';
	import { fly } from 'svelte/transition';
	import { v4 as uuidv4 } from 'uuid';

	import FileInput from 'lib/components/FileInput.svelte';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import Modal from 'lib/components/Modal.svelte';

	import EditSectionItem from '$lib/components/edit/SectionItem.svelte';

	import RenderSection from '$lib/components/render/Section.svelte';
	import clickOutside from 'lib/use/clickOutside';
	import sectionToEdit from '$lib/stores/sectionToEdit';

	import striptags from 'striptags';

	export let section;

	export let blog;

	export let onRemove = () => {};
	export let onEditStarted = () => {};
	export let onEditEnded = () => {};

	export let isShort = true;

	let innerSection;

	let addNewItem = () => {
		section.items = section.items || [];

		let newItem = {
			id: uuidv4(),
			title: '',
			description: '',
			imageUrl: ''
		};

		if (section.renderType === 'pricing') {
			newItem.pricing = { amount: 1.99, per: 'month' };
		}

		section.items.push(newItem);
	};

	let removeItem = (benefit) => {
		section.items = section.items.filter((b) => b !== benefit);
	};

	let isEmojiPickerShown;

	let prevSection = _.cloneDeep(section);

	$: if (blog && section) {
		if (!_.isEqual(prevSection, section)) {
			// externalSection = { ...section };
			prevSection = _.cloneDeep(section);

			blog.sections = blog.sections.map((s) => {
				if (s === section) {
					return _.cloneDeep(section);
				} else {
					return s;
				}
			});
		}
	}
</script>

{#if isShort}
	<div
		class="_section cursor-pointer"
		on:click={() => {
			// isShort = false;
			$sectionToEdit = section;
			// onEditStarted(section);
		}}
	>
		<div>
			{#if section.title}
				<div>
					<b>{@html striptags(section.title || '')}</b>
				</div>
			{/if}
			{@html striptags(section.description || '')}

			{#if section.renderType === 'testimonials'}
				<div>
					{striptags((section.testimonials || []).map((f) => f.name).join(', '))}
				</div>
			{:else if section.type === 'faq'}
				<div>
					{striptags((section.faqs || []).map((f) => f.question).join(', '))}
				</div>
			{:else}
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
				isWithUrl={false}
				onRemove={null}
				bind:section
				bind:item={section}
			/>
		</div>
	</div>

	{#if section.type === 'faq'}
		<EditFAQ bind:section />
	{:else if section.renderType === 'testimonials'}
		<EditTestimonials bind:section />
	{:else}
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
			<div class="bg-white top-[60px] rounded-xl">
				<div class="p-4 pb-0 flex justify-between items-center">
					<div class="_title" style="margin: 0;">Columns</div>

					<!-- <div class="opacity-70 hover:opacity-100 transition text-right w-full text-sm">
					<a class="cursor-pointer text-[#8B786D]" title="Remove Whole Section" on:click={onRemove}
						>🗑</a
					>
				</div> -->
				</div>

				<hr class="mt-4 border-[#8B786D] opacity-30" />

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
					</div>
				</div>
				<hr class="mt-4 border-[#8B786D] opacity-30" />
			</div>

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
{/if}

<style>
	.bg-section {
		background: #fafafa;
	}
</style>

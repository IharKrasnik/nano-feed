<script>
	import _ from 'lodash';
	import { v4 as uuidv4 } from 'uuid';

	import { fade } from 'svelte/transition';

	import EditInteractiveOptions from '$lib/components/edit/InteractiveOptions.svelte';
	import EditSection from '$lib/components/edit/Section.svelte';
	import ctaFooterEl from 'lib-render/stores/ctaFooterEl';

	import striptags from 'striptags';

	import FeatherIcon from 'lib/components/FeatherIcon.svelte';

	import contenteditable from 'lib/use/contenteditable';

	let clazz = '';
	export { clazz as class };

	export let page;

	export let isCollapsedDefault = true;
	let isCollapsed = isCollapsedDefault;

	$: if (!page.ctaFooter) {
		page.ctaFooter = {
			id: uuidv4(),
			_isCtaFooter: true,
			title: '',
			subtitle: ''
		};
	}
</script>

{#if isCollapsed}
	<div
		class="{isCollapsed
			? '_section '
			: 'py-4'} flex items-center justify-between cursor-pointer {clazz}"
		on:click={() => {
			isCollapsed = !isCollapsed;
			$ctaFooterEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}}
	>
		<div class="overflow-x-hidden font-bold">
			{@html striptags(page.ctaFooter?.title || page.activeHero?.title)}
		</div>
	</div>
{/if}

{#if !isCollapsed}
	<div class="_section p-4 relative mt-4" in:fade={{ duration: 100 }}>
		<div class="flex w-full items-center justify-between mb-4 ">
			<div class="flex items-center ">
				<div class="font-bold mr-4">Call-to-action section</div>
			</div>

			<div
				class="flex items-center opacity-50 hover:opacity-100 cursor-pointer"
				on:click={() => (isCollapsed = true)}
			>
				<FeatherIcon class="mr-2" size="15" name="eye-off" /> Collapse CTA
			</div>
		</div>

		<div class="_section">
			<div class="_title flex items-center justify-between">
				<div>Title</div>
			</div>

			<div
				class="w-full bg-[#f5f5f5] p-2 rounded-lg block"
				contenteditable
				use:contenteditable
				data-placeholder="Default (page title)"
				bind:innerHTML={page.ctaFooter.title}
			/>
		</div>
		<div class="_section">
			<div class="_title">Subtitle</div>

			<div
				class="min-h-[100px]"
				contenteditable="true"
				use:contenteditable
				bind:innerHTML={page.ctaFooter.description}
				data-placeholder="Guide them to action"
			/>
		</div>

		{#if page.renderType !== 'service'}
			<div class="_section">
				<div class="_title flex justify-between w-full">Call To Action</div>

				<EditInteractiveOptions
					class="mt-4"
					bind:section={page.ctaFooter}
					bind:sectionItem={page.ctaFooter}
					isWithButton={false}
					isCtaFooter
				/>

				{#if page.ctaFooter.interactiveRenderType === 'form'}
					{(page.ctaFooter.formSection = page.ctaFooter.formSection || {
						id: uuidv4(),
						renderType: 'form',
						items: []
					}) && ''}

					{(page.ctaFooter.formSection.items = page.ctaFooter.formSection.items || []) && ''}

					{#if page.ctaFooter.formSection}
						<div class="mt-4">
							<EditSection bind:section={page.ctaFooter.formSection} isInnerSection />
						</div>
					{/if}
				{/if}
			</div>
		{/if}
	</div>
{/if}

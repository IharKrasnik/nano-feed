<script>
	import { v4 as uuidv4 } from 'uuid';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import sectionToEdit from '$lib/stores/sectionToEdit';
	import sectionToPreview from '$lib/stores/sectionToPreview';
	import { fly } from 'svelte/transition';
	import CrossSvg from 'lib/icons/cross.svelte';

	export let page;
	export let isInsertPopupShown;
</script>

{#if isInsertPopupShown}
	<div
		class="_insert absolute left-0 top-[60px] w-[400px] bg-white h-screen p-4"
		in:fly={{ y: 25, duration: 150 }}
	>
		<div class="flex justify-between">
			<div class="flex items-center font-semibold opacity-80 text-sm">
				<div
					class="bg-green-600 p-[4px] rounded-lg shadow-md shadow-green-600/30 flex items-center justify-center w-[30px] h-[30px] mr-2"
				>
					<FeatherIcon name="grid" color="#f6f5f4" />
				</div>
				Sections
			</div>

			<div
				class="cursor-pointer opacity-70 hover:opacity-100 transition"
				on:click={() => (isInsertPopupShown = false)}
			>
				<FeatherIcon color="#444" name="x" />
			</div>
		</div>
		<div class="flex flex-col mt-4">
			{#each sections as section}
				<div
					class="py-4 border-b cursor-pointer hover:bg-[#fafafa] transition"
					on:click={() => {
						let newSection = {
							id: uuidv4(),
							...section.section
						};
						page.sections = [...page.sections, newSection];

						$sectionToPreview = null;
						isInsertPopupShown = false;
						$sectionToEdit = newSection;
					}}
					on:mouseenter={() => {
						$sectionToPreview = section.section;
					}}
					on:mouseleave={() => {
						$sectionToPreview = null;
					}}
				>
					{section.name}
				</div>
			{/each}
		</div>
	</div>
{/if}

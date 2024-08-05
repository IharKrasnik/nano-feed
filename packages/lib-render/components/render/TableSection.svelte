<script>
	import _ from 'lodash';
	import Emoji from 'lib/components/Emoji.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import { fly, fade, slide } from 'svelte/transition';

	export let section;
	export let page;

	section.tableRows = section.tableRows || [];

	let tableHeader;
	$: tableHeader = section.tableRows[0];
</script>

<table class="p-4 sm:p-8 w-full">
	<thead class="w-full">
		{#each tableHeader.columns as headerColumn, i}
			<td
				class="p-4 text-lg font-semibold text-center {i === 1
					? ' border-l-2 border-r-2 border-t-2 border-[#40E1CA] bg-[#e7fbf9]'
					: ''}">{headerColumn}</td
			>
		{/each}
	</thead>

	{#each section.tableRows as tableRow, rowIndex}
		{#if rowIndex > 0}
			<tr class="w-full">
				{#each tableRow.columns as column, i}
					<td
						class="border-b border-slate/20 p-4 {i === 0
							? 'text-lg font-semibold'
							: 'text-sm text-center font-medium'} {i === 1
							? 'bg-[#e7fbf9] border-l-2 border-r-2 border-[#40E1CA]'
							: ''}"
					>
						{#if column?.includes('feather:')}
							<Emoji width={20} emoji={_.trim(column)} />
						{:else}
							{@html column}
						{/if}
					</td>
				{/each}
			</tr>
		{/if}
	{/each}
</table>

<style>
	table {
		border-collapse: collapse;
		border-style: hidden;
		box-shadow: 0 0 0 1px #e2e8f0;
		@apply rounded-lg;
	}

	td {
		border-bottom: 1px #e2e8f0 solid;
		@apply py-6;
	}
</style>

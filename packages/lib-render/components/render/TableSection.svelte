<script>
	import _ from 'lodash';
	import Emoji from 'lib/components/Emoji.svelte';

	export let section;
	export let page;

	section.tableRows = section.tableRows || [];

	let tableHeader;
	$: tableHeader = section.tableRows[0];
</script>

<div class="w-full overflow-x-auto p-[2px]">
	<table class="p-4 sm:p-8 w-full">
		<thead class="w-full">
			{#each tableHeader?.columns || [] as headerColumn, i}
				<td
					class="px-2 py-1 sm:p-4 text-lg font-semibold {i === 0
						? 'text-left'
						: 'text-center'} whitespace-nowrap {i === 1
						? ' border-l-2 border-r-2 border-t-2 border-[#40E1CA] bg-[#e7fbf9]'
						: ''}">{headerColumn.value}</td
				>
			{/each}
		</thead>

		{#each section.tableRows as tableRow, rowIndex}
			{#if rowIndex > 0}
				<tr class="w-full">
					{#each tableRow.columns as column, i}
						<td
							class="border-b px-2 py-1 sm:p-4 {i === 0
								? 'whitespace-nowrap text-lg font-semibold'
								: 'text-sm text-center font-medium'} {i === 1
								? 'bg-[#e7fbf9] border-l-2 border-r-2 border-[#40E1CA]'
								: ''}"
						>
							{#if column?.value?.includes('feather:')}
								<Emoji width={20} emoji={_.trim(column)} />
							{:else if column.value?.length === 1 && (column.value[0] === '+' || column.value[0] === '-')}
								<Emoji width={20} emoji={column.value === '+' ? 'feather:check' : 'feather:x'} />
							{:else}
								{@html column.value}
							{/if}

							{#if column.description}
								<div class="text-xs mt-1 opacity-80">
									{column.description}
								</div>
							{/if}
						</td>
					{/each}
				</tr>
			{/if}
		{/each}
	</table>
</div>

<style>
	table {
		border-collapse: collapse;
		border-style: hidden;
		box-shadow: 0 0 0 1px #e2e8f0;
		@apply rounded-lg;
	}

	td {
		border-bottom: 1px var(--border-color) solid;
		@apply py-6;
	}
</style>

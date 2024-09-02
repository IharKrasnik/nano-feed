<script>
	import _ from 'lodash';
	import Emoji from 'lib/components/Emoji.svelte';

	export let section;
	export let page;

	section.tableRows = section.tableRows || [];

	let tableHeader;

	let highlightedColumns;
	let highlightedRows;

	$: tableHeader = section.tableRows[0];

	$: highlightedColumns = section.theme?.highlightedColumns || [];
	$: highlightedRows = section.theme?.highlightedRows || [];
</script>

<div class="w-full overflow-x-auto p-[2px]">
	<table class="p-4 sm:p-8 w-full">
		<thead class="w-full">
			{#each tableHeader?.columns || [] as headerColumn, i}
				{#if i == 0 || tableHeader.columns[i].value}
					<td
						colspan={i === tableHeader.columns.length - 1 || tableHeader.columns[i + 1]?.value
							? 1
							: 2}
						class="{tableHeader.columns.length > 5
							? 'px-2 py-3'
							: 'px-4 py-4'} text-base font-semibold {i === 0
							? '!pl-4 text-left'
							: 'text-center'} whitespace-nowrap {highlightedColumns.includes(i)
							? ' _border-l-2 _border-r-2 _border-t-2 _border-[#a6f0e5] bg-[#e7fbf9]'
							: ''}">{headerColumn.value}</td
					>
				{/if}
			{/each}
		</thead>

		{#each section.tableRows as tableRow, rowIndex}
			{#if rowIndex > 0}
				<tr
					class="w-full {highlightedRows.includes(rowIndex)
						? 'border border-[#40E1CA] bg-[#e7fbf9]'
						: ''}"
				>
					{#each tableRow.columns as column, i}
						<td
							class="border-b py-1  {i === 0
								? 'px-4 text-base whitespace-nowrap font-semibold'
								: `${
										highlightedColumns.includes(i) || highlightedRows.includes(rowIndex)
											? ''
											: '_color-item-description'
								  }  ${
										tableRow.columns.length > 5 ? 'px-2 py-2 text-xs' : 'px-4 py-4 text-sm'
								  } text-center font-medium`} {highlightedColumns.includes(i)
								? 'bg-[#e7fbf9] border-l-2 border-r-2 border-[#a6f0e5]'
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
								<div class="text-xs {tableRow.columns.length > 5 ? '' : 'mt-1'} opacity-80">
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
		@apply rounded-xl;
	}

	td {
		border-bottom: 1px var(--border-color) solid;
		border-left: 1px var(--border-color) solid;
		border-right: 1px var(--border-color) solid;
	}
</style>

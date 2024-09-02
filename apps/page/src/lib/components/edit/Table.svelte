<script>
	import clickOutside from 'lib/use/clickOutside';
	import { v4 as uuidv4 } from 'uuid';

	export let section;

	export let headers = [];
	export let rows = [];
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	export let onSave = ({ csv }) => {};
	export let onCancel = () => {};

	let highlightedColumns;
	let highlightedRows;

	$: highlightedColumns = section.theme?.highlightedColumns || [];
	$: highlightedRows = section.theme?.highlightedRows || [];

	export let csv = '';

	if (csv) {
		rows = csv.split('\n');

		if (!headers?.length) {
			headers = rows[0].split(';');
			rows.shift();
		}

		rows = rows.map((row) => {
			const values = row.split(';');

			return {
				id: uuidv4(),
				columns: headers.map((header, i) => ({
					id: uuidv4(),
					value: values[i]
				}))
			};
		});
	}

	let init = async () => {};

	init();

	let handleDndConsider = (e) => {
		//e.detail.items
	};

	let handleDndFinalize = async (e) => {
		//e.detail.items
	};

	let toCSV = () => {
		section.theme.highlightedColumns = highlightedColumns;
		section.theme.highlightedRows = highlightedRows;

		return (
			headers.join(';') + '\n' + rows.map((r) => r.columns.map((c) => c.value).join(';')).join('\n')
		);
	};
</script>

<div class="w-full min-h-[300px] p-4 _editor px-8">
	<div class="flex items-center font-semibold text-lg mb-4">
		<div>Edit Table</div>
	</div>
	<div class="w-full grid grid-cols-{headers.length} gap-y-2 items-start mb-4">
		{#each headers as header, i}
			<div class="relative font-semibold text-sm">
				{header}

				<div
					on:click={() => {
						if (highlightedColumns.includes(i)) {
							highlightedColumns = highlightedColumns.filter((c) => c !== i);
						} else {
							highlightedColumns = [...highlightedColumns, i];
						}
					}}
					class="{highlightedColumns.includes(i)
						? ''
						: 'grayscale opacity-50 transition hover:grayscale-0'} cursor-pointer absolute top-0 translate-y-[-100%]"
				>
					💡
				</div>
			</div>
		{/each}
	</div>

	<div
		use:dndzone={{
			items: rows,
			flipDurationMs: 300
		}}
		on:consider={handleDndConsider}
		on:finalize={handleDndFinalize}
	>
		{#each rows as row, rowIndex (row.id)}
			<div class="w-full flex justify-between items-start" animate:flip={{ duration: 300 }}>
				<div class="w-full grid grid-cols-{headers.length} gap-x-2 items-start mb-2">
					{#each row.columns as column, i (column.id)}
						<div class="relative">
							{#if i === 0}
								<div
									on:click={() => {
										if (highlightedRows.includes(rowIndex + 1)) {
											highlightedRows = highlightedRows.filter((r) => r !== rowIndex + 1);
										} else {
											highlightedRows = [...highlightedRows, rowIndex + 1];
										}
									}}
									class="{highlightedRows.includes(rowIndex + 1)
										? ''
										: 'grayscale opacity-50 transition hover:grayscale-0'} cursor-pointer absolute left-0 translate-x-[-100%] pr-1"
								>
									💡
								</div>
							{/if}

							{#if column.isEditing}
								<textarea
									use:clickOutside
									on:clickOutside={() => (column.isEditing = false)}
									bind:value={column.value}
									autofocus
									rows={8}
									class="absolute left-0 top-0 w-[300px] z-10"
									style={i === row.columns.length - 1 ? 'transform: translateX(-30%);' : ''}
								/>
							{:else}
								<input
									type="text"
									class="cursor-pointer"
									bind:value={column.value}
									on:click={() => (column.isEditing = true)}
								/>
							{/if}
						</div>
					{/each}
				</div>

				<div>Drag</div>
			</div>
		{/each}
	</div>
	<div class="mt-8">
		<button
			class="_primary"
			on:click={() => {
				onSave({ csv: toCSV() });
			}}>Save Table</button
		>
		<button class="_secondary" on:click={onCancel}>Cancel</button>
	</div>
</div>

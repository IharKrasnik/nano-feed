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
		return `${headers.join(';')}
${rows.map((r) => r.columns.map((c) => c.value).join(';')).join('\n')}`;
	};
</script>

<div class="w-full min-h-[300px] p-4 _editor px-8">
	<div class="flex items-center font-semibold text-lg mb-4">
		<div>Edit Table</div>
	</div>
	<div class="w-full grid grid-cols-{headers.length} gap-y-2 items-start mb-4">
		{#each headers as header}
			<div class="font-semibold text-sm">
				{header}
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
		{#each rows as row (row.id)}
			<div class="w-full flex justify-between items-start" animate:flip={{ duration: 300 }}>
				<div class="w-full grid grid-cols-{headers.length} gap-x-2 items-start mb-2">
					{#each row.columns as column, i (column.id)}
						<div class="relative">
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

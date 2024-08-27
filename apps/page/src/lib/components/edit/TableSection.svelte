<script>
	export let section;
	export let page;
	import Modal from 'lib/components/Modal.svelte';
	import EditTable from '$lib/components/edit/Table.svelte';

	section.tableRows = section.tableRows || [];

	let DEFAULT_TEXT = `;${page.parentPage?.name || page.name};Competitor1;Competitor2
Feature 1;feather:check;feather:cross`;

	let rowsText = section.tableRows
		.map((r) => {
			return r.columns
				.map((c) => `${c.value || ''}${c.description ? ` (${c.description})` : ''}`)
				.join(';');
		})
		.join('\n');

	function parseColumn(str) {
		const regex = /^(.*?)\s*\((.*?)\)\s*$/;
		const match = str.match(regex);

		if (match) {
			return {
				value: match[1].trim(),
				description: match[2].trim()
			};
		} else {
			return {
				value: str.trim(),
				description: ''
			};
		}
	}

	let parseRows = () => {
		section.tableRows = rowsText
			.split('\n')
			.filter((r) => r)
			.map((rowText) => {
				const columns = rowText.split(';');

				return {
					columns: columns.map(parseColumn)
				};
			});
	};

	if (!rowsText) {
		rowsText = DEFAULT_TEXT;
		parseRows();
	}

	let isModalOpen = false;
</script>

{#if isModalOpen}
	<Modal isShown onClosed={() => close()} maxWidth={1000}>
		<EditTable
			bind:section
			csv={rowsText}
			onSave={({ csv }) => {
				csv = csv.split('\n');
				csv.shift();
				rowsText = csv.join(';');
			}}
			onCancel={() => (isModalOpen = false)}
		/>
	</Modal>
{/if}

{#if section}
	<div class="_section">
		<div class="flex justify-between items-center">
			<div class="_title" style="margin: 0;">Table</div>
		</div>

		<textarea
			on:click={() => (isModalOpen = true)}
			class="w-full"
			bind:value={rowsText}
			on:input={parseRows}
			rows="10"
		/>
	</div>
{/if}

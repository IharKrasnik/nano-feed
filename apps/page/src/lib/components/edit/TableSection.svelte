<script>
	export let section;
	export let page;

	section.tableRows = section.tableRows || [];

	let DEFAULT_TEXT = ` ,${page.parentPage?.name || page.name},Competitor1,Competitor2
Feature 1,feather:check,feather:cross`;

	let rowsText = section.tableRows
		.map((r) => {
			return r.columns.join(',');
		})
		.join('\n');

	let parseRows = () => {
		section.tableRows = rowsText
			.split('\n')
			.filter((r) => r)
			.map((rowText) => {
				const columns = rowText.split(',');

				return {
					columns
				};
			});
	};

	if (!rowsText) {
		rowsText = DEFAULT_TEXT;
		parseRows();
	}
</script>

{#if section}
	<div class="_section">
		<div class="flex justify-between items-center">
			<div class="_title" style="margin: 0;">Table</div>
		</div>

		<textarea class="w-full" bind:value={rowsText} on:change={parseRows} rows="10" />
	</div>
{/if}

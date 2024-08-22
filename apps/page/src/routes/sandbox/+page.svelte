<script>
	import SitePreview from 'lib-render/components/SitePreview.svelte';

	let page = null;
	let pageJson = '{}';
</script>

<div class="w-full flex justify-between gap-x-12">
	<textarea
		bind:value={pageJson}
		on:change={() => {
			try {
				page = JSON.parse(pageJson);
			} catch (err) {
				page = null;
			}
		}}
	/>

	<div>
		{#if page}
			<SitePreview isEmbed isNoBadge bind:page />
		{/if}
	</div>
</div>

<script>
	import FileInput from 'lib/components/FileInput.svelte';
	import EmbedUrl from '$lib/components/EmbedUrl.svelte';

	export let url;
	export let isWithIntegrations = false;

	let isIntegrationsShown = false;

	let refreshDate = new Date();
</script>

{#key refreshDate}
	<FileInput
		bind:url
		{...$$restProps}
		onIntegrationsClick={() => {
			isIntegrationsShown = true;
		}}
		{isWithIntegrations}
	/>
{/key}

{#if isIntegrationsShown}
	<EmbedUrl
		{url}
		bind:isModalOpen={isIntegrationsShown}
		onSelected={(embedUrl) => {
			url = embedUrl;
			refreshDate = new Date();
		}}
	/>
{/if}

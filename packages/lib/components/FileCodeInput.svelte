<script>
	import FileInput from 'lib/components/FileInput.svelte';
	import ToggleGroup from 'lib/components/ToggleGroup.svelte';

	let clazz = '';
	export { clazz as class };
	export let url;
	export let theme;
	export let onFileUploaded = () => {};

	let code = url?.startsWith('$code') ? url.replace('$code', '') : '';

	let saveCode = () => {
		url = `$code${code}`;
	};

	let tab = url?.startsWith('$code') ? 'code' : 'file';
</script>

<ToggleGroup
	class="mb-2"
	bind:value={tab}
	tabs={[
		{ key: 'file', name: 'File or URL' },
		{ key: 'code', name: 'Code' }
	]}
/>

{#if tab === 'file'}
	<FileInput theme class={clazz} bind:url on:fileUploaded={onFileUploaded} />
{:else}
	<textarea class={clazz} bind:value={code} />
	<button class="_primary _small" on:click={saveCode}>Save</button>
{/if}

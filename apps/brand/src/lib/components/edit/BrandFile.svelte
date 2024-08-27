<script>
	import _ from 'lodash';

	import EditPng from '$lib/components/edit/Png.svelte';

	import { put, del } from 'lib/api';

	import Button from 'lib/components/Button.svelte';

	export let file;
	export let brand;
	export let onRemoved = () => {};
	export let onUpdated = () => {};

	let updateFile = async () => {
		let updatedFile = await put(`brands/files/${file._id}`, file);
		updatedFile.updatedOn = new Date();
		onUpdated(updatedFile);
	};

	let addFile = async () => {
		file.files = [...(file.files || []), _.cloneDeep(_.last(file.files) || {})];
	};

	let removeFile = async (fileToRemove, { isChild = false } = {}) => {
		if (isChild) {
			file.files = file.files.filter((f) => f !== fileToRemove);
		} else {
			await del(`brands/files/${fileToRemove._id}`);
			onRemoved(fileToRemove);
		}
	};
</script>

{#if file.type === 'png'}
	<EditPng bind:file bind:brand onRemove={() => removeFile(file, { isChild: false })} />
{:else}
	<h3 class="w-full my-4 opacity-80">File Theme 👇</h3>

	<EditPng bind:file isParent bind:brand onRemove={() => removeFile(file, { isChild: false })} />

	{#each file.files || [] as innerFile, i}
		<h3 class="w-full my-4 opacity-80">Frame {i + 1} 👇</h3>

		<EditPng
			bind:file={innerFile}
			bind:brand
			onRemove={() => removeFile(innerFile, { isChild: true })}
			isChild
		/>
	{/each}

	<Button class="mt-8 mb-16 w-full" onClick={addFile}>🌄 Add Frame</Button>
{/if}

<div class="mt-8 w-full">
	<Button onClick={updateFile}>💾 Save File</Button>
	<div class="mt-4 opacity-80">
		This will save file and close it. <br /> To download and share file use buttons above the preview.
	</div>
</div>

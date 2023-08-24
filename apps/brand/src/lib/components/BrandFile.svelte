<script>
	import Avatar from 'lib/components/Avatar.svelte';
	export let file;
	export let brand;
	export let onClick = () => {};
	export let isWithCreator = false;
</script>

<div
	class="p-4 rounded-xl m-4 cursor-pointer"
	style="border: 1px rgba(255,255,255,.3) solid;"
	on:click={() => onClick(file)}
>
	<div class="truncate opacity-80 mb-4">
		{file.title || (file.files && file.files[0] && file.files[0].title)}.{file.type}
	</div>
	<div
		class="flex flex-grow-1 items-center bg-zinc-900 rounded-xl"
		style="aspect-ratio: {file.size ? file.size.width / file.size.height : 1};"
	>
		<div class="rounded-xl">
			{#if file.previewUrl}
				<img
					class="rounded-xl w-full h-auto"
					src={file.previewUrl}
					style="aspect-ratio: {file.size ? file.size.width / file.size.height : 1};"
				/>
			{:else if file.type === 'png'}
				<img
					class="rounded-xl w-full h-auto"
					src="og.png?fileId={file._id}&date={+new Date()}"
					style="aspect-ratio: {file.size ? file.size.width / file.size.height : 1};"
				/>
			{:else if file.type === 'gif'}
				<img
					class="rounded-xl w-full h-auto"
					src="doc.gif?fileId={file._id}&date={+new Date()}"
					style="aspect-ratio: {file.size ? file.size.width / file.size.height : 1};"
				/>
			{:else if file.type === 'pdf'}{/if}
		</div>
	</div>

	{#if isWithCreator && file.brand?.creator}
		<div class="flex items-center">
			<Avatar user={file.brand.creator} />
		</div>
	{/if}
</div>

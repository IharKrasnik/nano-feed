<script>
	export let file;
	export let brand;
	export let onClick = () => {};
</script>

<div
	class="p-4 rounded-xl m-4 cursor-pointer"
	style="border: 1px rgba(255,255,255,.3) solid;"
	on:click={() => onClick(file)}
>
	<div class="truncate opacity-80 mb-4">
		{file.title || (file.files && file.files[0] && file.files[0].title)}.{file.type}
	</div>
	<div class="flex flex-grow-1 items-center">
		<div class="rounded-xl">
			{#if file.type === 'png'}
				<img class="rounded-xl" src="og.png?fileId={file._id}" />
			{:else if file.type === 'gif'}
				<img class="rounded-xl" src="doc.gif?fileId={file._id}" />
			{:else if file.type === 'pdf'}{/if}
		</div>
	</div>
</div>

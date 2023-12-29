<script>
	export let portfolioFeedItem;
	let clazz = '';

	export { clazz as class };
	export let onRemoved = () => {};

	let deleteFeedItem = () => {};
</script>

<div
	in:fade={{ duration: 150 }}
	class="_section {clazz}"
	use:clickOutside
	on:clickOutside={() => {}}
>
	<div class="relative flex justify-between items-center mb-4">
		<div class="flex items-center w-full">
			{#if serviceFeedItem.url}
				<EmojiPicker bind:icon={portfolioFeedItem.iconUrl} />
			{/if}
		</div>

		<div
			class="opacity-70 hover:opacity-100 transition  text-sm cursor-pointer text-[#8B786D]"
			title="Remove Item"
			on:click={() => {
				if (serviceFeedItem._id) {
					deleteFeedItem();
				} else {
					onRemoved(serviceFeedItem);
				}
			}}
		>
			🗑
		</div>
	</div>

	<div class="flex w-full items-center mb-4">
		<div
			contenteditable
			bind:innerHTML={portfolioFeedItem.title}
			data-placeholder="Project title"
			use:contenteditable
		/>
	</div>

	<div
		data-placeholder="Short project description"
		class="w-full mb-4 textarea"
		contenteditable
		use:contenteditable
		bind:innerHTML={portfolioFeedItem.content}
	/>

	{#if portfolioFeedItem.attachments?.length}
		<div class="relative flex justify-between items-center">
			<FileInput
				class="w-full"
				placeholder="Project cover image"
				bind:url={portfolioFeedItem.attachments[0].url}
				theme="light"
			/>
		</div>
	{/if}

	{#if portfolioFeedItem.attachments?.length}
		<div class="relative flex justify-between items-center">
			<input
				class="w-full"
				placeholder="Case study URL (can be image, source file, article)"
				type="url"
				bind:value={portfolioFeedItem.url}
				theme="light"
				on:paste={(e) => {
					let url = e.clipboardData.getData('text/plain');
				}}
			/>
		</div>
	{/if}

	<!-- <div class="flex justify-between w-full relative mb-4 mt-4">
			<input
				class="w-full"
				placeholder="Case study URL"
				type="url"
				bind:value={serviceFeedItem.url}
				theme="light"
				on:paste={(e) => {
					let url = e.clipboardData.getData('text/plain');
				}}
			/>
			<div />
		</div> -->

	<hr class="my-4" />
	<div class="flex justify-between items-center">
		<Button class="_primary _small" onClick={updateFeedItem}>💾 Save</Button>

		{#if serviceFeedItem._id}
			<a
				class="_secondary _small text-sm cursor-pointer"
				on:click={() => {
					// serviceFeedItem = originalFeedItem;
					serviceFeedItem.title = originalFeedItem.title;
					serviceFeedItem.content = originalFeedItem.content;
					serviceFeedItem.attachments = originalFeedItem.attachments;
					serviceFeedItem.iconUrl = originalFeedItem.iconUrl;
					serviceFeedItem.tagsStr = originalFeedItem.tagsStr;

					isCollapsed = true;
				}}>Cancel</a
			>
		{/if}
	</div>
</div>

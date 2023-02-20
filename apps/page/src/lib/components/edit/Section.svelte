<script>
	import getRandomEmoji from 'lib/services/getRandomEmoji';
	import { fly } from 'svelte/transition';
	import FileInput from 'lib/components/FileInput.svelte';
	import clickOutside from 'lib/use/clickOutside';

	export let section;
	export let onRemove = () => {};
	export let isShort = false;

	let addNewItem = () => {
		section.items = section.items || [];

		section.items.push({
			title: '',
			description: '',
			imageUrl: ''
		});
	};

	let removeItem = (benefit) => {
		section.items = section.items.filter((b) => b !== benefit);
	};

	let isEmojiPickerShown;
</script>

{#if isShort}
	<div class="_section">
		<div>
			{#each section.items as item}
				<div>
					{item.title}
				</div>
			{/each}
		</div>
	</div>
{:else}
	<div class="_section rounded-xl" style="padding: 0px;">
		<div class="sticky z-10 bg-white top-[70px] rounded-xl">
			<div class="p-4 pb-0 flex justify-between items-center">
				<div class="_title" style="margin: 0;">Section</div>

				<div class="text-right w-full text-sm">
					<a class="cursor-pointer text-[#8B786D]" on:click={onRemove}>Remove Section</a>
				</div>
			</div>

			<div
				class="relative mt-4"
				use:clickOutside
				on:clickOutside={() => (isEmojiPickerShown = false)}
			>
				<!-- <input class="mb-4 w-full" bind:value={section.title} placeholder="Title (optional)"/>
        
        <textarea 
          class="w-full mb-4"
          bind:value={section.description}
          placeholder="Description (optional)"
          rows="3"
        /> -->

				{#if isEmojiPickerShown}
					<div class="fixed top-[200px] mt-8 z-10" in:fly={{ y: 50, duration: 150 }}>
						<emoji-picker
							class="light"
							on:emoji-click={(evt) => {
								section.items = section.items.map((item) => {
									if (item === isEmojiPickerShown) {
										item.emoji = evt.detail.unicode;
										isEmojiPickerShown = false;
									}

									return item;
								});
							}}
						/>

						{#if isEmojiPickerShown.emoji}
							<div
								class="w-full text-center cursor-pointer bg-white p-4"
								on:click={() => {
									section.items = section.items.map((item) => {
										if (item === isEmojiPickerShown) {
											item.emoji = null;
											isEmojiPickerShown = false;
										}

										return item;
									});
								}}
							>
								Remove Emoji
							</div>
						{/if}
					</div>
				{/if}

				<div class="px-4 flex items-center">
					<div
						class="cursor-pointer bg-[#fafafa] h-[37px] flex justify-center items-center rounded-xl mr-2"
						class:aspect-square={section.columns !== 1}
						class:px-4={section.columns === 1}
						on:click={() => (section.columns = 1)}
					>
						1
						{#if section.columns === 1}column{/if}
					</div>

					<div
						class="aspect-square cursor-pointer bg-[#fafafa] h-[37px] flex justify-center items-center rounded-xl mr-2"
						on:click={() => (section.columns = 2)}
						class:aspect-square={section.columns !== 2}
						class:px-4={section.columns === 2}
					>
						2
						{#if section.columns === 2}columns{/if}
					</div>

					<div
						class="aspect-square cursor-pointer bg-[#fafafa] h-[37px] flex justify-center items-center rounded-xl mr-2"
						class:aspect-square={section.columns !== 3}
						class:px-4={section.columns === 3}
						on:click={() => (section.columns = 3)}
					>
						3
						{#if section.columns === 3}columns{/if}
					</div>

					<div
						class="aspect-square cursor-pointer bg-[#fafafa] h-[37px] flex justify-center items-center rounded-xl mr-2"
						class:aspect-square={section.columns !== 4}
						class:px-4={section.columns === 4}
						on:click={() => (section.columns = 4)}
					>
						4
						{#if section.columns === 4}columns{/if}
					</div>
				</div>
			</div>
			<hr class="mt-4 border-[#8B786D] opacity-30" />
		</div>

		{#each section.items || [] as item}
			<div class="p-4">
				<div class="relative flex justify-between items-center mb-4">
					<div
						class="min-w-[37px] min-h-[37px] bg-[#fafafa] rounded-xl flex items-center justify-center cursor-pointer"
						on:click={() => {
							isEmojiPickerShown = item;
						}}
					>
						{item.emoji || '✨'}
					</div>
					<div class="text-sm cursor-pointer text-[#8B786D]" on:click={() => removeItem(item)}>
						Remove Item
					</div>
				</div>

				<input class="mb-4 w-full" bind:value={item.title} placeholder="Title" />

				<textarea
					class="w-full mb-4"
					bind:value={item.description}
					placeholder="Description"
					rows="3"
				/>

				<div class="relative flex justify-between items-center">
					<FileInput
						class="w-full"
						placeholder="Insert image/video url or paste from clipboard"
						on:fileUploaded={(evt) => {
							item.imageUrl = evt.detail.url;
						}}
						bind:url={item.imageUrl}
						theme="light"
					/>
				</div>
			</div>

			<hr class=" border-[#8B786D] opacity-30" />
		{/each}

		<a class="w-full p-4 flex justify-center cursor-pointer text-[#8B786D]" on:click={addNewItem}
			>Add Item</a
		>

		<!-- <div class="flex items-center mt-2 text-[14px]">
      <input type="checkbox" class="mr-2"  /> Collect Emails
    </div> -->
	</div>
{/if}

<script>
	import _ from 'lodash';
	import getRandomEmoji from 'lib/services/getRandomEmoji';
	import { fly } from 'svelte/transition';
	import FileInput from 'lib/components/FileInput.svelte';
	import EmojiPicker from '$lib/components/EmojiPicker.svelte';
	import EditUrl from '$lib/components/edit/URL.svelte';
	import clickOutside from 'lib/use/clickOutside';

	export let section;

	export let page;

	export let onRemove = () => {};
	export let isShort = false;

	let innerSection;

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

	let prevSection = _.cloneDeep(section);

	$: if (page && section) {
		if (!_.isEqual(prevSection, section)) {
			// externalSection = { ...section };
			prevSection = _.cloneDeep(section);

			page.sections = page.sections.map((s) => {
				if (s === section) {
					return _.cloneDeep(section);
				} else {
					return s;
				}
			});
		}
	}
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
		<div class="bg-white top-[60px] rounded-xl">
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
				{#if isEmojiPickerShown}
					<div class="fixed top-[200px] mt-8 z-40" in:fly={{ y: 50, duration: 150 }}>
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
						class="cursor-pointer bg-section h-[37px] flex justify-center items-center rounded-xl mr-2"
						class:aspect-square={section.columns !== 1}
						class:px-4={section.columns === 1}
						on:click={() => (section.columns = 1)}
					>
						1
						{#if section.columns === 1}column{/if}
					</div>

					<div
						class="aspect-square cursor-pointer bg-section h-[37px] flex justify-center items-center rounded-xl mr-2"
						on:click={() => (section.columns = 2)}
						class:aspect-square={section.columns !== 2}
						class:px-4={section.columns === 2}
					>
						2
						{#if section.columns === 2}columns{/if}
					</div>

					<div
						class="aspect-square cursor-pointer bg-section h-[37px] flex justify-center items-center rounded-xl mr-2"
						class:aspect-square={section.columns !== 3}
						class:px-4={section.columns === 3}
						on:click={() => (section.columns = 3)}
					>
						3
						{#if section.columns === 3}columns{/if}
					</div>

					<div
						class="aspect-square cursor-pointer bg-section h-[37px] flex justify-center items-center rounded-xl mr-2"
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
					<div class="flex items-center ">
						<div
							class="min-w-[37px] min-h-[37px] bg-section rounded-xl flex items-center justify-center cursor-pointer"
							on:click={() => {
								isEmojiPickerShown = item;
							}}
						>
							{item.emoji || '???'}
						</div>

						<EditUrl bind:url={item.url} />
					</div>
					<div class="text-sm cursor-pointer text-[#8B786D]" on:click={() => removeItem(item)}>
						Remove Item
					</div>
				</div>

				<div class="flex w-full items-center mb-4">
					<input class="w-full" bind:value={item.title} placeholder="Title" />
				</div>

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
						isCanSearch
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

<script>
	import { get, post, put, del } from 'lib/api';
	import _ from 'lodash';
	import tooltip from 'lib/use/tooltip';
	import getRandomEmoji from 'lib/services/getRandomEmoji';
	import getRandomProjectEmoji from 'lib/services/getRandomProjectEmoji';
	import { fly, fade } from 'svelte/transition';
	import FileInput from 'lib/components/FileInput.svelte';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import Modal from 'lib/components/Modal.svelte';
	import Button from 'lib/components/Button.svelte';
	import EditInteractiveOptions from '$lib/components/edit/InteractiveOptions.svelte';
	import EditSectionSettings from '$lib/components/edit/SectionSettings.svelte';
	import RenderSection from '$lib/components/render/Section.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import clickOutside from 'lib/use/clickOutside';
	import sectionToEdit from '$lib/stores/sectionToEdit';
	import contenteditable from 'lib/use/contenteditable';
	import feedCache, { getFeed } from '$lib/stores/feedCache';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';

	let clazz = 'p-4';
	export { clazz as class };
	export let onRemoved = () => {};
	export let onUpdated = () => {};

	export let feedItem;

	let originalFeedItem = _.cloneDeep(feedItem);

	export let isCollapsed = !!feedItem._id;

	$: if (!feedItem.attachments?.length) {
		feedItem.attachments = [{ url: '' }];
	}

	let updateFeedItem = async () => {
		let updated = await put(`feed/${feedItem._id}`, feedItem);

		originalFeedItem = _.cloneDeep(updated);

		showSuccessMessage('Record updated');

		onUpdated(updated);

		isCollapsed = true;
	};

	let deleteFeedItem = async () => {
		await del(`feed/${feedItem._id}`);
		showSuccessMessage('Record deleted');

		onRemoved(feedItem);
		isCollapsed = true;
	};
</script>

{#if isCollapsed}
	<div
		class="_section flex font-medium"
		on:click={() => {
			isCollapsed = false;

			let feedEl = document.getElementById(`feed-${feedItem._id}`);

			if (feedEl) {
				feedEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
			}
		}}
	>
		{feedItem.title || feedItem.content}
	</div>
{:else}
	<div
		in:fade={{ duration: 150 }}
		class="_section {clazz}"
		use:clickOutside
		on:clickOutside={() => {}}
	>
		<div class="relative flex justify-between items-center mb-4">
			<div class="flex items-center w-full">
				<EmojiPicker bind:icon={feedItem.iconUrl} />

				<!-- <EditSectionSettings bind:sectionItem={feedItem} /> -->
			</div>

			<div
				class="opacity-70 hover:opacity-100 transition  text-sm cursor-pointer text-[#8B786D]"
				title="Remove Item"
				on:click={() => {
					if (feedItem._id) {
						deleteFeedItem();
					} else {
						onRemoved(feedItem);
					}
				}}
			>
				🗑
			</div>
		</div>

		<div class="relative mb-4">
			<input
				class="w-full"
				placeholder="Item URL"
				type="url"
				bind:value={feedItem.url}
				theme="light"
			/>
		</div>

		<div class="flex w-full items-center mb-4">
			<div
				contenteditable
				bind:innerHTML={feedItem.title}
				data-placeholder="Title"
				use:contenteditable
			/>
		</div>

		<div
			data-placeholder="Content"
			class="w-full mb-4 textarea"
			contenteditable
			use:contenteditable
			bind:innerHTML={feedItem.content}
		/>

		{#if feedItem.attachments?.length}
			<div class="relative flex justify-between items-center">
				<FileInput
					class="w-full"
					placeholder="Insert image/video url or paste from clipboard"
					isCanSearch
					bind:url={feedItem.attachments[0].url}
					theme="light"
				/>
			</div>
		{/if}

		<div class="mt-2 flex items-center">
			<div class="text-sm mr-4 opacity-80">Tags</div>
			<input
				class="w-full"
				placeholder="Tags"
				type="url"
				bind:value={feedItem.tagsStr}
				theme="light"
			/>
		</div>

		<hr class="my-4" />
		<div class="flex justify-between items-center">
			<Button class="_primary _small" onClick={updateFeedItem}>💾 Save</Button>

			{#if feedItem._id}
				<a
					class="_secondary _small text-sm cursor-pointer"
					on:click={() => {
						// feedItem = originalFeedItem;
						feedItem.title = originalFeedItem.title;
						feedItem.content = originalFeedItem.content;
						feedItem.attachments = originalFeedItem.attachments;
						feedItem.iconUrl = originalFeedItem.iconUrl;
						feedItem.tagsStr = originalFeedItem.tagsStr;

						isCollapsed = true;
					}}>Cancel</a
				>
			{/if}
		</div>
	</div>
{/if}

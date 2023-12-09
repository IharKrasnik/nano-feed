<script>
	import { get, post, put, del } from 'lib/api';
	import _ from 'lodash';
	import moment from 'moment';
	import tooltip from 'lib/use/tooltip';
	import getRandomEmoji from 'lib/services/getRandomEmoji';
	import getRandomProjectEmoji from 'lib/services/getRandomProjectEmoji';
	import { fly, fade } from 'svelte/transition';
	import FileInput from 'lib/components/FileInput.svelte';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import SourceLogo from 'lib/components/SourceLogo.svelte';
	import Modal from 'lib/components/Modal.svelte';
	import Button from 'lib/components/Button.svelte';
	import EditInteractiveOptions from '$lib/components/edit/InteractiveOptions.svelte';
	import EditFeedItemSettings from '$lib/components/edit/FeedItemSettings.svelte';
	import RenderSection from '$lib/components/render/Section.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import clickOutside from 'lib/use/clickOutside';
	import sectionToEdit from '$lib/stores/sectionToEdit';
	import contenteditable from 'lib/use/contenteditable';
	import feedCache, { getFeed } from '$lib/stores/feedCache';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';
	import isUrl from 'lib/helpers/isUrl';

	let clazz = 'p-4';
	export { clazz as class };
	export let onRemoved = () => {};
	export let onUpdated = () => {};

	export let feedItem;
	export let isContentFeed = false;
	export let isChangelog = false;

	let originalFeedItem = _.cloneDeep(feedItem);

	export let isCollapsed = !!feedItem._id;

	$: if (!feedItem.attachments?.length) {
		feedItem.attachments = [{ url: '' }];
	}

	let updateFeedItem = async () => {
		if (feedItem._id) {
			let updated = await put(`feed/${feedItem._id}`, feedItem);
			originalFeedItem = _.cloneDeep(updated);

			showSuccessMessage('Record updated');

			onUpdated(updated);
		} else {
			let created = await post(`feed`, feedItem);
			originalFeedItem = _.cloneDeep(created);
			showSuccessMessage('Record created');
			onUpdated(created);
		}

		isCollapsed = true;
	};

	let deleteFeedItem = async () => {
		await del(`feed/${feedItem._id}`);
		showSuccessMessage('Record deleted');

		onRemoved(feedItem);
		isCollapsed = true;
	};

	let fetchMetaTags = async ({ url = feedItem.url } = {}) => {
		if (url) {
			const data = await get('utils/fetch-meta-tags', {
				url
			});

			feedItem.title = feedItem.title || data.title;
			feedItem.content = feedItem.content || data.description;

			if ((!feedItem.attachments || !feedItem.attachments[0].url) && data.image) {
				feedItem.attachments = [{ type: 'image', url: data.image }];
			}
		}
	};
</script>

{#if isCollapsed}
	<div
		class="_section"
		on:click={() => {
			isCollapsed = false;

			let feedEl = document.getElementById(`feed-${feedItem._id}`);

			if (feedEl) {
				feedEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
			}
		}}
	>
		<div class="flex justify-between">
			<div class="font-medium truncate">
				{feedItem.title || feedItem.content}
			</div>

			<div class="ml-2 shrink-0 opacity-50 flex items-center">
				<div class="mr-2">
					{feedItem.viewsCount || 0}
				</div>

				<FeatherIcon size="15" name="mouse-pointer" />
			</div>
		</div>
		{#if isContentFeed}
			<div class="mt-4 flex justify-between items-center">
				<div class=" opacity-50">
					{moment(feedItem.publishedOn || feedItem.createdOn).format('DD, MMM')}
				</div>
				<div class="opacity-30">
					<SourceLogo url={feedItem.url} theme={'light'} />
				</div>
			</div>
		{/if}
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
				{#if !isContentFeed || feedItem.url}
					<EmojiPicker bind:icon={feedItem.iconUrl} />
					{#if !isChangelog && feedItem.url}
						<Button class="ml-2 rounded-full bg-[#f6f5f4]" onClick={fetchMetaTags}>🪄</Button>
					{/if}
					<EditFeedItemSettings bind:feedItem />
				{/if}
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

		{#if !isChangelog}
			<div class="flex justify-between w-full relative mb-4">
				<input
					class="w-full"
					placeholder="Item URL"
					autofocus
					type="url"
					bind:value={feedItem.url}
					theme="light"
					on:paste={(e) => {
						let url = e.clipboardData.getData('text/plain');

						if (isUrl(url)) {
							fetchMetaTags({ url });
						}
					}}
				/>
				<div />
			</div>
		{/if}

		{#if !isContentFeed || feedItem.url}
			<div class="flex w-full items-center mb-4">
				<div
					contenteditable
					bind:innerHTML={feedItem.title}
					data-placeholder="Title"
					use:contenteditable
					autofocus={isChangelog}
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
						placeholder="Media url (or paste from clipboard)"
						isCanSearch
						bind:url={feedItem.attachments[0].url}
						theme="light"
					/>
				</div>
			{/if}

			<div class="mt-2 flex items-center">
				<div class="text-sm mr-4 opacity-80">Tags</div>
				<input class="w-full" placeholder="Tags" bind:value={feedItem.tagsStr} theme="light" />
			</div>
		{/if}

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

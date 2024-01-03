<script>
	import _ from 'lodash';
	import { get, post, put, del } from 'lib/api';
	import { fade } from 'svelte/transition';
	import FileInput from 'lib/components/FileInput.svelte';
	import Button from 'lib/components/Button.svelte';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';
	import feedCache, { getFeed, updateFeedSortOrder } from 'lib-render/stores/feedCache';
	import EditFeedItem from '$lib/components/edit/FeedItem.svelte';
	import { v4 as uuidv4 } from 'uuid';
	import csv from 'csvtojson';
	import childStreams, { refreshChildStreams } from 'lib/stores/childStreams';
	import allPages from 'lib-render/stores/allPages';
	import { dndzone } from 'svelte-dnd-action';
	import getEmbeddedStreamSlug from '$lib/helpers/getEmbeddedStreamSlug';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';

	let posts = [];

	let LAST_STREAM_SLUG_KEY = 'LAST_DATABASE_STREAM_SLUG';

	export let setPageAndDraft;
	export let selectedTab;
	export let page;
	export let selectedStreamSlug = localStorage[LAST_STREAM_SLUG_KEY];
	export let selectedCustomer;
	export let isWithButton = true;
	export let streamSettings = null;
	export let attachToPages = null;
	export let cacheId;

	let parentPage = page.parentPage || page;

	let activeStream = null;

	// {
	// 	slug: `${(page.parentPage || page).name}-feed`
	// };

	let isLoading = false;

	let handleDndConsider = (e) => {
		$feedCache[cacheId || activeStream.slug] = {
			...$feedCache[cacheId || activeStream.slug],
			feed: e.detail.items
		};
	};

	let handleDndFinalize = async (e) => {
		await updateFeedSortOrder({
			streamId: activeStream._id,
			streamSlug: activeStream.slug,
			sortedItems: e.detail.items
		});
	};

	let loadChildStreams = async () => {
		if (!parentPage.streams) {
			return ($childStreams = []);
		}

		isLoading = true;

		$childStreams = await refreshChildStreams({ page });

		activeStream =
			selectedStreamSlug || localStorage[LAST_STREAM_SLUG_KEY]
				? $childStreams.find((s) =>
						selectedStreamSlug
							? s.slug === selectedStreamSlug
							: s.slug === localStorage[LAST_STREAM_SLUG_KEY]
				  ) || $childStreams[0]
				: $childStreams[0];

		selectedStreamSlug = activeStream?.slug;
		localStorage[LAST_STREAM_SLUG_KEY] = selectedStreamSlug;

		isLoading = false;

		selectStream(activeStream);
	};

	loadChildStreams();

	let isStreamEdit = false;

	let selectStream = (childStream) => {
		activeStream = childStream;
		isStreamEdit = false;
		selectedStreamSlug = activeStream?.slug;
		localStorage[LAST_STREAM_SLUG_KEY] = selectedStreamSlug;
	};

	let selectBuiltInStream = async ({ streamType } = {}) => {
		await getEmbeddedStreamSlug({ page, streamType });

		selectStream($childStreams.find((s) => s._id === parentPage.streams[streamType]._id));
	};

	let newDatabaseName = '';
	let activeTabName = 'main';

	let setTab = (tabName) => {
		activeTabName = tabName;
	};

	let createDatabase = async () => {
		if (newDatabaseName) {
			const { stream: newStream } = await put(`pages/${parentPage._id}/embed-stream`, {
				title: newDatabaseName
			});

			$childStreams = [newStream, ...$childStreams];
			activeStream = newStream;
			selectStream(activeStream);
			newDatabaseName = '';
		}
	};

	let loadFeed = async () => {
		await getFeed({ streamSlug: activeStream.slug, sort: 'order', perPage: 100 });
	};

	$: if (activeStream?.slug) {
		loadFeed();
	}

	let uploaderEl;

	let parseCSV = async (e) => {
		const reader = new FileReader();

		let parseP = new Promise((resolve, reject) => {
			reader.readAsText(e.target.files[0]);

			reader.onload = async () => {
				const csvContent = reader.result;

				let parsedFile = await csv()
					.fromString(csvContent)
					.preFileLine((fileLine, idx) => {
						if (idx === 0) {
							return fileLine.toLowerCase();
						}
						return fileLine;
					});

				$feedCache[cacheId || activeStream.slug] = {
					...$feedCache[cacheId || activeStream.slug],
					feed: [
						...parsedFile.map((item) => {
							return {
								id: uuidv4(),
								url: item.url || item.website,
								title: item.name || item.title,
								description: item.description || '',
								imageUrl: item.image || item.imageUrl,
								tagsStr: item.type || item.tags
							};
						}),
						...($feedCache[cacheId || activeStream.slug]?.feed || [])
					]
				};

				resolve($feedCache[cacheId || activeStream.slug]?.feed || []);
			};
		});

		return parseP;
	};

	let saveAll = async () => {
		let newItems = $feedCache[cacheId || activeStream.slug]?.feed?.filter((f) => !f._id) || [];

		let failedCount = 0;

		let { feedItems: createdFeedItems } = await post('feed/batch', {
			projectSlug: activeStream.slug,
			feedItems: newItems
		});

		$feedCache[cacheId || activeStream.slug].feed = [
			...createdFeedItems,
			...($feedCache[cacheId || activeStream.slug]?.feed?.filter((fi) => fi._id) || [])
		];

		await updateFeedSortOrder({
			streamId: activeStream._id,
			streamSlug: activeStream.slug,
			sortedItems: $feedCache[cacheId || activeStream.slug].feed
		});

		showSuccessMessage(`Created ${createdFeedItems.length} items. Nice!`);
	};

	let searchStr = '';

	let fetchAllMetaTags = async () => {
		let newItemsWithUrl = $feedCache[cacheId || activeStream.slug]?.feed?.filter(
			(f) => !f._id && f.url
		);

		if (
			true ||
			confirm(
				`You are about to create ${newItems.length} items in ${activeStream.title} database. Continue?`
			)
		) {
			let failedCount = 0;

			await newItemsWithUrl.reduce(
				(p, feedItem) =>
					p
						.then(async () => {
							try {
								const data = await get(
									'utils/fetch-meta-tags',
									{
										url: feedItem.url
									},
									{
										isNoNotifications: true,
										abortTimeout: 5000
									}
								);

								feedItem.title = feedItem.title || data.title;
								feedItem.content = feedItem.content || data.description;

								if ((!feedItem.attachments || !feedItem.attachments[0].url) && data.image) {
									feedItem.attachments = [
										{
											type: 'image',
											url: data.image.startsWith('http')
												? data.image
												: `${feedItem.url}${data.image}`
										}
									];
								}

								$feedCache[cacheId || activeStream.slug].feed = $feedCache[
									cacheId || activeStream.slug
								].feed.map((fi) => {
									if (fi.id === feedItem.id) {
										return feedItem;
									}
									return fi;
								});
							} catch (err) {
								showErrorMessage(`Failed to load ${feedItem.url}`);
							}
						})
						.catch(() => {
							failedCount++;
							return p;
						}),
				Promise.resolve()
			);

			showSuccessMessage(
				`Fetched ${newItemsWithUrl.length - failedCount} items descriptions. ${
					failedCount ? `${failedCount} items failed to import` : ''
				}`
			);
		}
	};

	let addNew = () => {};

	if (!parentPage.streams) {
		selectBuiltInStream({ streamType: 'changelog' });
	}

	let addItem = async ({ title = '', content = '', url = '' } = {}) => {
		$feedCache[cacheId || activeStream.slug] = {
			...$feedCache[cacheId || activeStream.slug],
			feed: [
				{
					id: uuidv4(),
					title,
					content,
					url: '',
					attachments: [{ url: '' }],
					projects: [{ slug: activeStream.slug }]
				},
				...($feedCache[cacheId || activeStream.slug]?.feed || [])
			]
		};
	};

	let isShowFilter = false;
</script>

<div class="flex w-full justify-between items-center  mb-4">
	<div class="text font-bold opacity-80">Databases</div>

	{#if isWithButton && selectedStreamSlug !== '_new'}
		<button
			class="_secondary _small opacity-50 hover:opacity-100"
			on:click={() => {
				selectedStreamSlug = '_new';
			}}>Create New Database</button
		>
	{/if}
</div>
<div class="_section">
	<div class="flex items-center justify-between w-full">
		<select
			class="flex-grow mr-4"
			bind:value={selectedStreamSlug}
			on:change={() => {
				if (selectedStreamSlug === '_new') {
					return;
				}

				if (selectedStreamSlug.includes('-changelog')) {
					selectBuiltInStream({ streamType: 'changelog' });
				} else if (selectedStreamSlug.includes('-feed')) {
					selectBuiltInStream({ streamType: 'feed' });
				} else if (selectedStreamSlug.includes('-blog')) {
					selectBuiltInStream({ streamType: 'blog' });
				} else if (selectedStreamSlug.includes('-portfolio')) {
					selectBuiltInStream({ streamType: 'portfolio' });
				} else {
					selectStream($childStreams.find((s) => s.slug === selectedStreamSlug));
				}
			}}
		>
			{#each $childStreams as childStream}
				<option value={childStream.slug} class="cursor-pointer py-2">
					{childStream.title}
				</option>
			{/each}

			{#if !parentPage.streams?.feed}
				<option value="{parentPage.slug}-feed">Content Feed</option>
			{/if}

			{#if !parentPage.streams?.changelog}
				<option value="{parentPage.slug}-changelog">Changelog</option>
			{/if}

			{#if !parentPage.streams?.blog}
				<option value="{parentPage.slug}-blog">Blog</option>
			{/if}

			{#if !parentPage.streams?.portfolio}
				<option value="{parentPage.slug}-blog">Portfolio</option>
			{/if}

			<option value="_new">New Database</option>
			{#if !selectedStreamSlug}
				<option value="">No Selected</option>
			{/if}
		</select>

		{#if streamSettings}
			<div
				class="cursor-pointer border-2 border-[#ccccd0] rounded-full aspect-square shrink-0 w-[30px] h-[30px] flex items-center justify-center
				{isShowFilter ? 'bg-green-800' : ''}"
				on:click={() => {
					isShowFilter = !isShowFilter;
				}}
			>
				<FeatherIcon color={isShowFilter ? '#ffffff' : '#333333'} size="15" name="filter" />
			</div>
		{/if}
	</div>

	{#if isShowFilter}
		<div class="font-bold mt-6">Filter Items</div>
		<div class="grid grid-cols-2 gap-4 mt-4">
			<div class="_section">
				<div class="text-sm mb-2">Limit items</div>

				<input type="number" class="w-full" bind:value={streamSettings.limit} />
				<div class="text-xs mt-2">Leave 0 for pagination</div>
			</div>
			<div class="_section">
				<div class="text-sm mb-2">Filter by tags</div>
				<input type="text" class="w-full" bind:value={streamSettings.filterTags} />
				<div class="text-xs mt-2">Leave empty to not filter</div>
			</div>
		</div>
		<div class="_section">
			<div class="text-sm mb-2">Sort</div>

			<select class="w-full" bind:value={streamSettings.sortBy}>
				<option value="_sample">Random</option>
				<option value="order">Sort as you order</option>
				<option value="-publishedOn">Newest First</option>
				<option value="-viewsCount">Popular First</option>
			</select>
		</div>
		<div class="_section">
			<div class="text-sm mb-2">Show best sample</div>
			<div>
				<input type="checkbox" bind:checked={streamSettings.isWithImageOnly} /> Include only items with
				image
			</div>

			<div>
				<input type="checkbox" bind:checked={streamSettings.isWithUrlOnly} /> Include only items with
				URL
			</div>
		</div>
	{/if}
</div>

{#if selectedStreamSlug === '_new'}
	<div class="w-full my-4 _section">
		<input class="w-full" placeholder="Tools" bind:value={newDatabaseName} />
		<Button class="mt-4 _primary _small" onClick={createDatabase}>Create new database</Button>
	</div>
{:else}
	<!-- <div class="_section w-full">
		<div class="w-full">
			<div class="text-sm font-bold mb-2">Database</div>

			{#if isStreamEdit}
				<div class="_section w-full flex flex-col" in:fade={{ duration: 150 }}>
					{#each $childStreams.filter((s) => s.slug !== (page?.parentPage?.streamSlug || page.streamSlug)) as childStream}
						<div
							class="cursor-pointer py-2"
							on:click={(evt) => {
								selectStream(childStream);
							}}
							value={childStream._id}
						>
							{childStream.title}
						</div>
					{/each}

					<button
						class="cursor-pointer mt-4 py-2 _secondary _small"
						on:click={() => selectStream(null)}>Add New Database</button
					>
				</div>

				<div class="flex justify-between items-center py-4">
					<input class="w-full" placeholder="Tools" bind:value={newDatabaseName} />
					<Button class="ml-4 _primary _small shrink-0" onClick={createDatabase}
						>Create Database</Button
					>
				</div>
			{:else if activeStream}
				<div
					class="_section cursor-pointer"
					on:click={() => {
						isStreamEdit = true;
					}}
				>
					{activeStream.title}
				</div>
			{/if}
		</div>
	</div> -->

	{#if activeStream?.slug?.includes('-blog')}
		<div class="_section bg-[#fafafa]">
			<div class="font-bold mb-2">Auto-Sync</div>
			Blog database is automatically synchronised with your articles.<br />
			<button
				class="_secondary _small mt-4"
				on:click={() => {
					selectedTab = 'blog';
				}}>Edit Blog →</button
			>
		</div>
	{/if}
	{#if activeStream && $feedCache[cacheId || activeStream?.slug]}
		<div class="flex justify-between items-center mt-8 mb-2">
			<div class="text-sm font-bold opacity-80">
				Database Items ({$feedCache[cacheId || activeStream.slug].totalCount ||
					$feedCache[cacheId || activeStream.slug]?.feed?.length ||
					0})
			</div>
			<button class="_secondary _small shrink-0" on:click={addItem}>Add Item</button>
		</div>

		<!-- <div class="flex justify-between mt-4">
			<button class="ml-4 _secondary _small shrink-0">
				<label class="cursor-pointer block" for="csvfile">
					From CSV
					<input id="csvfile" type="file" on:change={parseCSV} hidden />
				</label>
			</button>
		</div> -->

		{#if $feedCache[cacheId || activeStream.slug]?.feed?.length > 1}
			<div class="my-2 w-full">
				<input type="text" class="w-full" placeholder="Search item..." bind:value={searchStr} />
			</div>
		{/if}

		{#if $feedCache[cacheId || activeStream.slug]?.feed?.filter((f) => !f._id).length > 1}
			<div class="flex my-8">
				<Button class="_primary _small" onClick={saveAll}>
					💾 Save {$feedCache[cacheId || activeStream.slug].feed.filter((f) => !f._id).length} items
					💾</Button
				>
				<Button class="shrink-0 _secondary _small ml-4" theme={'light'} onClick={fetchAllMetaTags}
					>🪄 Fetch All Descriptions</Button
				>
			</div>
		{/if}

		<div
			class="py-8"
			use:dndzone={{
				items: $feedCache[cacheId || activeStream.slug]?.feed,
				flipDurationMs: 300
			}}
			on:consider={handleDndConsider}
			on:finalize={handleDndFinalize}
		>
			{#each $feedCache[cacheId || activeStream.slug]?.feed?.filter((feedItem) => {
				if (!searchStr) {
					return true;
				}

				if (feedItem.title) {
					if (feedItem.title.toLowerCase().includes(searchStr.toLowerCase())) {
						return true;
					}
				}

				if (feedItem.content) {
					if (feedItem.content.toLowerCase().includes(searchStr.toLowerCase())) {
						return true;
					}
				}

				return false;
			}) as feedItem (feedItem._id + feedItem.id)}
				<EditFeedItem
					bind:feedItem
					bind:setPageAndDraft
					{attachToPages}
					isContentFeed={activeStream.slug.includes('-feed')}
					isChangelog={activeStream.slug.includes('-changelog')}
					onUpdated={(updatedFeedItem) => {
						$feedCache[cacheId || activeStream.slug] = {
							...$feedCache[cacheId || activeStream.slug],
							feed: $feedCache[cacheId || activeStream.slug]?.feed?.map((item) => {
								if (item._id === feedItem._id) {
									return updatedFeedItem;
								} else {
									return item;
								}
							})
						};
					}}
					onRemoved={() => {
						$feedCache[cacheId || activeStream.slug] = {
							...$feedCache[cacheId || activeStream.slug],
							feed: $feedCache[cacheId || activeStream.slug]?.feed?.filter((f) =>
								feedItem._id ? f._id !== feedItem._id : f.id !== feedItem.id
							)
						};
					}}
				/>
			{/each}
		</div>
	{/if}
{/if}

<style>
	.selected {
		border-bottom: 1px black solid;
	}
</style>

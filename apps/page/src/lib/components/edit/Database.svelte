<script>
	import { get, post, put, del } from 'lib/api';
	import { fade } from 'svelte/transition';
	import FileInput from 'lib/components/FileInput.svelte';
	import Button from 'lib/components/Button.svelte';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';
	import feedCache, { getFeed } from '$lib/stores/feedCache';
	import EditFeedItem from '$lib/components/edit/FeedItem.svelte';
	import { v4 as uuidv4 } from 'uuid';
	import csv from 'csvtojson';

	let posts = [];

	export let page;
	export let selectedStreamSlug;
	export let selectedCustomer;

	let childStreams = [];
	let activeStream = null;

	let lastStreamSlug = 'LAST_DATABASE_STREAM_SLUG';

	let isLoading = false;

	let loadChildStreams = async () => {
		isLoading = true;

		let { results } = await get('projects', {
			hubStreamSlug: page.parentPage?.streamSlug || page.streamSlug
		});

		childStreams = results;

		activeStream = localStorage[lastStreamSlug]
			? childStreams.find((s) => s.slug === localStorage[lastStreamSlug]) || childStreams[0]
			: childStreams[0];

		selectedStreamSlug = activeStream?.slug;
		localStorage[lastStreamSlug] = selectedStreamSlug;

		isLoading = false;
	};

	if (page.parentPage?.streamSlug || page.streamSlug) {
		loadChildStreams();
	}

	let isStreamEdit = false;

	let selectStream = (childStream) => {
		activeStream = childStream;
		isStreamEdit = false;
		selectedStreamSlug = activeStream?.slug;
		localStorage[lastStreamSlug] = selectedStreamSlug;
	};

	if (!(page.parentPage?.streamSlug || page.streamSlug)) {
		put(`pages/${page.parentPage?._id || page._id}/embed-stream`, {}).then(({ streamSlug }) => {
			if (page.parentPage) {
				page.parentPage.streamSlug = streamSlug;
			} else {
				page.streamSlug = streamSlug;
			}
		});
	}

	let newDatabaseName = '';
	let activeTabName = 'main';

	let setTab = (tabName) => {
		activeTabName = tabName;
	};

	let createDatabase = async () => {
		if (newDatabaseName) {
			if (!page.streamSlug) {
				let { streamSlug = parentPageSlug } = await put(
					`pages/${page.parentPage?._id || page._id}/embed-stream`,
					{
						title: page.name
					}
				);

				page.streamSlug = parentPageSlug;
			}

			const { streamSlug, project: newStream } = await put(
				`pages/${page.parentPage?._id || page._id}/embed-stream`,
				{
					title: newDatabaseName,
					hubStreamSlug: page.streamSlug
				}
			);

			childStreams = [newStream, ...childStreams];
			activeStream = newStream;
			selectedStreamSlug = streamSlug;
			newDatabaseName = '';
		}
	};

	let loadFeed = async () => {
		await getFeed({ streamSlug: activeStream.slug, perPage: 100 });
	};

	$: if (activeStream?.slug) {
		loadFeed();
	}

	let createFeedItem = async ({ feedItem }, { isShowSuccessMessage = true } = {}) => {
		let created = await post(`feed`, { ...feedItem, projects: [{ slug: activeStream.slug }] });

		feed = feed.map((fi) => {
			if (fi.id === feedItem.id) {
				return created;
			}

			return fi;
		});

		$feedCache[activeStream.slug] = { feed: [...feed] };

		if (isShowSuccessMessage) {
			showSuccessMessage('Record created');
		}
	};

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

				$feedCache[activeStream.slug] = {
					...$feedCache[activeStream.slug],
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
						...$feedCache[activeStream.slug].feed
					]
				};

				resolve($feedCache[activeStream.slug].feed);
			};
		});

		return parseP;
	};

	let saveAll = async () => {
		let newItems = $feedCache[activeStream.slug].feed.filter((f) => !f._id);

		let failedCount = 0;

		let { feedItems: createdFeedItems } = await post('feed/batch', {
			projectSlug: activeStream.slug,
			feedItems: newItems
		});

		$feedCache[activeStream.slug].feed = [
			...createdFeedItems,
			...$feedCache[activeStream.slug].feed.filter((fi) => fi._id)
		];

		showSuccessMessage(`Created ${createdFeedItems.length} items. Nice!`);
	};

	let searchStr = '';

	let fetchAllMetaTags = async () => {
		let newItemsWithUrl = $feedCache[activeStream.slug].feed.filter((f) => !f._id && f.url);

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

								$feedCache[activeStream.slug].feed = $feedCache[activeStream.slug].feed.map(
									(fi) => {
										if (fi.id === feedItem.id) {
											return feedItem;
										}
										return fi;
									}
								);
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
</script>

{#if !isLoading && !childStreams?.length}
	<div class="my-8">
		<input placeholder="Tools" bind:value={newDatabaseName} />
		<Button class="mt-2 _primary" onClick={createDatabase}>Create new database</Button>
	</div>
{:else}
	<div class="_section w-full">
		<div class="w-full">
			<div class="text-sm font-bold mb-2">Database</div>

			{#if isStreamEdit}
				<div class="_section w-full flex flex-col" in:fade={{ duration: 150 }}>
					{#each childStreams.filter((s) => s.slug !== (page?.parentPage?.streamSlug || page.streamSlug)) as childStream}
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

		<div class="flex justify-between mt-4">
			<button
				class="_secondary _small w-full"
				on:click={() => {
					$feedCache[activeStream.slug] = {
						...$feedCache[activeStream.slug],
						feed: [
							{
								id: uuidv4(),
								title: '',
								content: '',
								url: '',
								attachments: [{ url: '' }],
								projects: [{ slug: activeStream.slug }]
							},
							...$feedCache[activeStream.slug].feed
						]
					};
				}}>Add New Item</button
			>
			<button class="ml-4 _secondary _small shrink-0">
				<label class="cursor-pointer block" for="csvfile">
					From CSV
					<input id="csvfile" type="file" on:change={parseCSV} hidden />
				</label>
			</button>
		</div>
	</div>

	{#if activeStream && $feedCache[activeStream.slug]}
		<div class="text-sm font-bold mb-2 mt-4">
			Database Items ({$feedCache[activeStream.slug].totalCount || 0})
		</div>

		<div class="my-2 w-full">
			<input type="text" class="w-full" placeholder="Search item..." bind:value={searchStr} />
		</div>

		{#if $feedCache[activeStream.slug].feed.filter((f) => !f._id).length > 1}
			<div class="flex my-8">
				<Button class="_primary _small" onClick={saveAll}>
					💾 Save {$feedCache[activeStream.slug].feed.filter((f) => !f._id).length} items 💾</Button
				>
				<Button class="shrink-0 _secondary _small ml-4" theme={'light'} onClick={fetchAllMetaTags}
					>🪄 Fetch All Descriptions</Button
				>
			</div>
		{/if}

		<div>
			{#each $feedCache[activeStream.slug].feed.filter((feedItem) => {
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
					isSocialFeed={activeStream.slug.includes('-feed')}
					onUpdated={(updatedFeedItem) => {
						$feedCache[activeStream.slug] = {
							...$feedCache[activeStream.slug],
							feed: $feedCache[activeStream.slug].feed.map((item) => {
								if (item._id === feedItem._id) {
									return updatedFeedItem;
								} else {
									return item;
								}
							})
						};
					}}
					onRemoved={() => {
						$feedCache[activeStream.slug] = {
							...$feedCache[activeStream.slug],
							feed: $feedCache[activeStream.slug].feed.filter((f) =>
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

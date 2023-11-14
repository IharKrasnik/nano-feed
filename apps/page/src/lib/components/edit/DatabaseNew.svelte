<script>
	import { get, post, put, del } from 'lib/api';
	import FileInput from 'lib/components/FileInput.svelte';
	import Button from 'lib/components/Button.svelte';
	import EditStreamItems from '$lib/components/edit/StreamItems.svelte';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';
	import feedCache, { getFeed } from '$lib/stores/feedCache';
	import EditFeedItem from '$lib/components/edit/FeedItem.svelte';
	import { v4 as uuidv4 } from 'uuid';

	let posts = [];

	export let page;
	export let selectedStreamSlug;

	let childStreams = [];
	let activeStream = null;

	let loadChildStreams = async () => {
		let { results } = await get('projects', {
			hubStreamSlug: page.streamSlug
		});

		childStreams = results;
		activeStream = childStreams[0];

		selectedStreamSlug = activeStream?.slug;
	};

	if (page.streamSlug) {
		loadChildStreams();
	}

	let isStreamEdit = false;

	let selectStream = (childStream) => {
		activeStream = childStream;
		isStreamEdit = false;
		selectedStreamSlug = activeStream?.slug;
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
		let created = await post(`feed/from-url`, { ...feedItem, projectSlug: stream.slug });

		feed = feed.map((fi) => {
			if (fi.id === feedItem.id) {
				return created;
			}

			return fi;
		});

		$feedCache[stream.slug] = { feed: [...feed] };

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

				feed = [
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
					...feed
				];

				resolve(feed);
			};
		});

		return parseP;
	};

	let saveAll = async () => {
		let newItems = feed.filter((f) => !f._id);

		if (
			confirm(
				`You are about to create ${newItems.length} items in ${stream.title} database. Continue?`
			)
		) {
			let failedCount = 0;

			await newItems.reduce(
				(p, feedItem) =>
					p
						.then(() => {
							return createFeedItem({ feedItem });
						})
						.catch(() => {
							failedCount++;
							return p;
						}),
				Promise.resolve()
			);

			showSuccessMessage(
				`Created ${newItems.length - failedCount}. ${
					failedCount ? `${failedCount} items failed to import` : ''
				}`
			);
		}
	};

	let searchStr = '';
</script>

{#if !childStreams?.length}
	<div class="my-8">
		<input placeholder="Tools" bind:value={newDatabaseName} />
		<Button class="mt-2 _primary" onClick={createDatabase}>Create new database</Button>
	</div>
{:else}
	<div class="_section w-full">
		<div class="w-full">
			<div class="text-sm font-bold mb-2">Database</div>

			{#if isStreamEdit}
				<div class="_section w-full flex flex-col">
					<div class="cursor-pointer py-2" on:click={() => selectStream(null)}>New Database</div>

					{#each childStreams as childStream}
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
	</div>

	{#if activeStream && $feedCache[activeStream.slug]}
		<button
			class="_secondary _small w-full mb-4"
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

		<div class="my-2 w-full">
			<input type="text" class="w-full" placeholder="Search item..." bind:value={searchStr} />
		</div>

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

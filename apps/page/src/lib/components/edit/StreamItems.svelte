<script>
	import { get, post, put, del } from 'lib/api';
	import FileInput from 'lib/components/FileInput.svelte';
	import Button from 'lib/components/Button.svelte';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';
	import feedCache, { getFeed } from '$lib/stores/feedCache';
	import csv from 'csvtojson';
	import { v4 as uuidv4 } from 'uuid';

	export let stream;

	let feed = [];
	let childStreams = [];

	let activeTabName = 'items';

	let setTab = (tabName) => {
		activeTabName = tabName;
	};

	let loadFeed = async () => {
		return getFeed({ streamSlug: stream.slug, perPage: 100 });
	};

	loadFeed().then((res) => {
		feed = res;
	});

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

	let updateFeedItem = async ({ feedItem }) => {
		let updated = await put(`feed/${feedItem._id}`, feedItem);

		feed = $feedCache[stream.slug].feed = $feedCache[stream.slug].feed.map((item) => {
			if (item._id === feedItem._id) {
				return updated;
			} else {
				return item;
			}
		});

		showSuccessMessage('Record updated');
	};

	let deleteFeedItem = async ({ feedItem }) => {
		await del(`feed/${feedItem._id}`);

		feed = $feedCache[stream.slug].feed = $feedCache[stream.slug].feed.filter(
			(item) => item._id !== feedItem._id
		);

		showSuccessMessage('Record deleted');
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
</script>

<div class="flex items-center gap-4 border-b border-black/20 mb-8" />

{#if activeTabName === 'items'}
	<div class="flex w-full justify-between">
		<div class="mb-8">
			<button
				class="_primary _small"
				on:click={() => {
					feed.unshift({
						id: uuidv4(),
						title: '',
						content: '',
						url: '',
						attachments: [{ url: '' }]
					});
					feed = [...feed];
				}}
			>
				Add New Item</button
			>

			<input class="ml-4" bind:this={uploaderEl} on:change={parseCSV} type="file" />
		</div>

		{#if feed.filter((i) => !i._id)?.length > 1}
			<Button onClick={saveAll}>💾💾💾 Save All</Button>
		{/if}
	</div>

	<div class="grid grid-cols-6 gap-4 w-full items-start">
		<div class="text-sm  opacity-80">Url</div>
		<div class="text-sm opacity-80">Title</div>
		<div class="text-sm  opacity-80 col-span-2">Description</div>
		<div class="text-sm  opacity-80">Media</div>
		<div class="text-sm opacity-80" />

		{#each (feed || [])
			.filter((f) => f.id || f._id)
			.sort((f) => {
				if (!f._id && !f.id) {
					console.log(' no id??', f);
				}

				if (!f._id) {
					return -1;
				}

				return 1;
			}) as feedItem (feedItem._id + feedItem.id)}
			<input placeholder="URL" bind:value={feedItem.url} autofocus="true" />

			<div>
				<input class="col-span-1" placeholder="Title" bind:value={feedItem.title} />

				<div class="text-xs mt-2">Tags</div>
				<input class="w-full" bind:value={feedItem.tagsStr} />
			</div>
			<div
				contenteditable=""
				class="h-full col-span-2 whitespace-pre-wrap"
				placeholder="Content"
				bind:innerHTML={feedItem.content}
			/>
			<div>
				{#if feedItem.attachments?.length}
					<FileInput
						class="w-full"
						placeholder="Image URL"
						bind:url={feedItem.attachments[0].url}
					/>
				{/if}
				<FileInput class="w-full mt-2" placeholder="Logo URL" bind:url={feedItem.logoUrl} />
			</div>

			<div class="flex gap-2 items-center">
				{#if feedItem._id}
					<Button
						class="_secondary _small cursor-pointer"
						onClick={() => updateFeedItem({ feedItem })}>✍️</Button
					>
				{:else}
					<Button
						class="_secondary _small cursor-pointer _green"
						onClick={() => createFeedItem({ feedItem })}>💾</Button
					>
				{/if}

				<Button
					class="_secondary _small  cursor-pointer"
					onClick={() => {
						if (feedItem._id) {
							deleteFeedItem({ feedItem });
						} else {
							feed = feed.filter((f) => f !== feedItem);
						}
					}}>🗑</Button
				>
			</div>
		{/each}
	</div>
{:else if activeTabName === 'categories'}
	<button
		class="_primary _small mb-8"
		on:click={() => {
			childStreams.push({
				slug: 'category-new',
				title: '',
				description: ''
			});
			childStreams = [...childStreams];
		}}>Add New Category</button
	>

	<div class="grid grid-cols-3 gap-4">
		{#each childStreams.filter((cs) => cs.slug.includes('category')) as categoryStream}
			<input placeholder="Title" bind:value={categoryStream.title} />
			<input placeholder="Description" bind:value={categoryStream.description} />

			<div class="flex items-center">
				{#if categoryStream._id}
					<Button
						class="_secondary _small cursor-pointer"
						onClick={() => updateCategoryStream({ categoryStream })}>✍️</Button
					>
				{:else}
					<Button
						class="_secondary _small cursor-pointer"
						onClick={() => createCategoryStream({ categoryStream })}>💾</Button
					>
				{/if}

				<Button
					class="_secondary _small  cursor-pointer"
					onClick={() => deleteCategoryStream({ categoryStream })}>🗑</Button
				>
			</div>
		{/each}
	</div>
{/if}

<style>
	.selected {
		border-bottom: 1px black solid;
	}
</style>

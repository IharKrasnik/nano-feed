<script>
	import { get, post, put, del } from 'lib/api';
	import FileInput from 'lib/components/FileInput.svelte';
	import Button from 'lib/components/Button.svelte';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';
	import feedCache, { getFeed } from '$lib/stores/feedCache';

	export let stream;

	let feed = [];
	let childStreams = [];

	let activeTabName = 'items';

	let setTab = (tabName) => {
		activeTabName = tabName;
	};

	let loadFeed = async () => {
		return getFeed({ streamSlug: stream.slug });
	};

	loadFeed().then((res) => {
		feed = res;
	});

	let createFeedItem = async ({ feedItem }) => {
		if (!feedItem._id && feedItem.url) {
			const metatags = await get('utils/fetch-meta-tags', {
				url: feedItem.url
			});

			feedItem.source = metatags.source;

			feedItem.title = metatags.title;
			feedItem.content = metatags.description;
			if (metatags.favicon?.startsWith('http')) {
				feedItem.logoUrl = metatags.favicon;
			}

			if (metatags.image?.startsWith('http')) {
				feedItem.attachments = [{ type: 'image', url: metatags.image }];
			}
		}

		let created = await post(`feed`, feedItem);

		feedItem._id = created._id;

		feed = feed.map((fi) => {
			if (fi === feedItem) {
				return created;
			}
			return fi;
		});

		$feedCache[stream.slug] = [...feed];
		feed = [...feed];

		showSuccessMessage('Record created');
	};

	let updateFeedItem = async ({ feedItem }) => {
		let updated = await put(`feed/${feedItem._id}`, feedItem);

		feed = $feedCache[stream.slug] = $feedCache[stream.slug].map((item) => {
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

		feed = $feedCache[stream.slug] = $feedCache[stream.slug].filter(
			(item) => item._id !== feedItem._id
		);

		showSuccessMessage('Record deleted');
	};

	// let createCategoryStream = async ({ categoryStream }) => {
	// 	let { project } = await put(`pages/${page._id}/embed-stream`, {
	// 		title: categoryStream.title,
	// 		description: categoryStream.description
	// 	});

	// 	childStreams = childStreams.map((cs) => {
	// 		if (cs === categoryStream) {
	// 			return project;
	// 		}
	// 		return cs;
	// 	});
	// };

	// let updateCategoryStream = async ({ categoryStream }) => {
	// 	let newStream = await put(`projects/${categoryStream._id}`, categoryStream);

	// 	childStreams = childStreams.map((cs) => {
	// 		if (cs === categoryStream) {
	// 			return newStream;
	// 		}
	// 		return cs;
	// 	});
	// };

	// let deleteCategoryStream = async ({ categoryStream }) => {
	// 	await del(`projects/${categoryStream._id}`);
	// 	childStreams = childStreams.filter((cs) => cs._id !== categoryStream._id);
	// };
</script>

<div class="flex items-center gap-4 border-b border-black/20 mb-8">
	<!-- <div
		class="p-4 mr-4 cursor-pointer"
		class:selected={activeTabName === 'items'}
		on:click={() => setTab('items')}
	>
		Items
	</div>
	<div
		class="p-4 mr-4 cursor-pointer"
		class:selected={activeTabName === 'categories'}
		on:click={() => setTab('categories')}
	>
		Categories
	</div>
	<div
		class="p-4 mr-4 cursor-pointer"
		class:selected={activeTabName === 'tags'}
		on:click={() => setTab('tags')}
	>
		Tags
	</div> -->
</div>

{#if activeTabName === 'items'}
	<div class="mb-8">
		<button
			class="_primary _small"
			on:click={() => {
				feed.unshift({
					title: '',
					content: '',
					url: '',
					projects: [{ slug: stream.slug }],
					attachments: [{ url: '' }]
				});
				feed = [...feed];
			}}
		>
			Add New Item</button
		>
	</div>

	<div class="grid grid-cols-6 gap-4 w-full items-start">
		<div class="text-sm  opacity-80">Url</div>
		<div class="text-sm opacity-80">Title</div>
		<div class="text-sm  opacity-80 col-span-2">Description</div>
		<div class="text-sm  opacity-80">Media</div>
		<div class="text-sm opacity-80" />

		{#each feed as feedItem (feedItem._id)}
			<input placeholder="URL" bind:value={feedItem.url} autofocus="true" />

			<div>
				<input class="col-span-1" placeholder="Title" bind:value={feedItem.title} />

				<select class="w-full mt-2" bind:value={feedItem.categoryId}>
					<option>No Category</option>

					{#each childStreams.filter((cs) => cs.slug.includes('category-')) as categoryStream}
						<option value={categoryStream._id}>{categoryStream.title}</option>
					{/each}
				</select>
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
						class="_secondary _small cursor-pointer"
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

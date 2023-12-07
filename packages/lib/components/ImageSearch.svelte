<script>
	import _ from 'lodash';

	import { get } from 'lib/api';
	import { fly } from 'svelte/transition';
	import autofocus from 'lib/use/autofocus';
	import Loader from 'lib/components/Loader.svelte';
	import Modal from 'lib/components/Modal.svelte';

	export let isSearching = false;
	let isLoading = false;

	export let onSelected = (url) => {};

	let searchText;
	let images;

	let hints = _.shuffle([
		'waves',
		'gradient',
		'pattern wood',
		'pattern glass',
		'confetti',
		'rocket',
		'launch',
		'space',
		'nature',
		'crowd',
		'dashboard',
		'3d pattern'
	]);

	let page = 1;
	let perPage = 18;

	let search = async ({ isResetPage = true } = {}) => {
		isSearching = true;
		isLoading = true;
		images = [];

		if (isResetPage) {
			page = 1;
		}

		if (!searchText) {
			searchText = _.sample(hints);
		}

		try {
			let imagesResult = await get(type === 'gif' ? 'giphy' : 'unsplash', {
				query: searchText || '',
				page,
				perPage
			});

			images = imagesResult;
		} finally {
			isLoading = false;
		}
	};

	let loadMore = () => {
		page++;
		return search({ isResetPage: false });
	};

	let close = () => {
		searchText = '';
		isSearching = false;
		isLoading = false;
		images = null;
	};

	let type = 'jpg';

	const setType = (newType) => {
		type = newType;

		if (searchText) {
			search();
		}
	};

	let superCool = [
		'https://unsplash.com/photos/blue-and-black-digital-wallpaper-bKESVqfxass',
		'https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDkxNzF8MHwxfHNlYXJjaHwyMnx8c3BhY2V8ZW58MHx8fHwxNzAxMzYwMjg3fDA&ixlib=rb-4.0.3&q=80&w=1080',
		'https://images.unsplash.com/photo-1597747729747-0828f54b0b79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDkxNzF8MHwxfHNlYXJjaHwxNHx8cmFpbmJvd3xlbnwwfHx8fDE3MDE0MjI2MzF8MA&ixlib=rb-4.0.3&q=80&w=1080'
	];

	///https://unsplash.com/backgrounds/colors/gradient

	// leaves, ice, snow, trees, wood, stars, cosmos, watercolor
</script>

<div on:click={search}>🔎</div>

{#if isSearching}
	<Modal isShown onClosed={() => close()} maxWidth={800}>
		<div class="min-h-screen my-8">
			<div class="p-8 h-full">
				<h2 class="font-bold text-2xl mb-4">Search Image</h2>

				<input
					placeholder="Searching Images.."
					use:autofocus
					bind:value={searchText}
					on:input={_.debounce(search, 500)}
				/>

				<div class="flex items-center mt-2 gap-2 flex-wrap">
					{#each hints as hint}
						<div
							class="text-sm cursor-pointer hover:font-bold"
							on:click={() => {
								searchText = hint;
								search();
							}}
						>
							{hint}
						</div>
					{/each}
				</div>
				<div class="mt-4 flex">
					<div
						class="_section cursor-pointer px-4 mr-2"
						class:font-bold={type === 'jpg'}
						on:click={() => setType('jpg')}
					>
						JPG
					</div>
					<div
						class="_section cursor-pointer mr-2 px-4"
						class:font-bold={type === 'gif'}
						on:click={() => setType('gif')}
					>
						GIF
					</div>
				</div>

				<div class="mt-8">
					{#if isLoading}
						<div class="mb-4">
							<Loader theme="light" />
						</div>
					{:else if images?.length}
						<div class="flex justify-between">
							<div class="text-sm opacity-70 mb-4">Click to select</div>
						</div>

						<div class="columns-3 gap-4">
							{#each images as image}
								<div>
									<img
										class="w-full mb-4 cursor-pointer transition hover:scale-125"
										src={image.url}
										use:autofocus
										on:click={() => {
											if (image.downloadUrl) {
												get('unsplash/download', { downloadUrl: image.downloadUrl });
											}
											onSelected(image.url);
											close();
										}}
									/>

									{#if image.user}
										<div class="mb-4 opacity-80" style="font-size: 8px;">
											By
											<a
												target="_blank"
												href="https://unsplash.com/@{image.user
													.username}?utm_source=momentum&utm_medium=referral ">{image.user.name}</a
											>
										</div>
									{/if}
								</div>
							{/each}
						</div>

						<div class="mt-4 p-4 w-full flex justify-center">
							<button class="_primary" on:click={loadMore}>Load More</button>
						</div>
						{#if type === 'jpg'}
							<div class="text-sm font-bold w-full mt-8 text-center opacity-60">
								Powered by
								<a
									href="https://unsplash.com?utm_source=your_app_name&amp;utm_medium=referral"
									target="_blank"
									>Unsplash
								</a>
							</div>
						{:else if type === 'gif'}
							<div class="max-w-[100px] mx-auto mt-8">
								<a href="https://giphy.com/" target="_blank">
									<img src="/giphy.png" />
								</a>
							</div>
						{/if}
					{/if}

					{#if !images?.length}
						<div class="grid grid-cols-3 gap-4">
							<div class="p-4 bg-[#fafafa] min-h-[100px]" />
							<div class="p-4 bg-[#fafafa] min-h-[100px]" />
							<div class="p-4 bg-[#fafafa] min-h-[100px]" />
							<div class="p-4 bg-[#fafafa] min-h-[100px]" />
							<div class="p-4 bg-[#fafafa] min-h-[100px]" />
							<div class="p-4 bg-[#fafafa] min-h-[100px]" />
							<div class="p-4 bg-[#fafafa] min-h-[100px]" />
							<div class="p-4 bg-[#fafafa] min-h-[100px]" />
							<div class="p-4 bg-[#fafafa] min-h-[100px]" />
						</div>
					{/if}
				</div>
			</div>
		</div>
	</Modal>
{/if}

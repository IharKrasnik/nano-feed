<script>
	import _ from 'lodash';

	import { get } from 'lib/api';
	import { fly } from 'svelte/transition';
	import autofocus from 'lib/use/autofocus';
	import Loader from 'lib/components/Loader.svelte';
	import Modal from 'lib/components/Modal.svelte';

	let isSearching = false;
	let isLoading = false;

	export let onSelected = (url) => {};

	let searchText;
	let images;

	let search = async () => {
		isSearching = true;
		isLoading = true;

		try {
			images = await get(type === 'gif' ? 'giphy' : 'unsplash', {
				query: searchText || ''
			});
		} finally {
			isLoading = false;
		}
	};

	let close = () => {
		searchText = '';
		isSearching = false;
		isLoading = false;
		images = null;
	};

	let type = 'gif';

	const setType = (newType) => {
		type = newType;

		if (searchText) {
			search();
		}
	};
</script>

<div on:click={search}>🔎</div>

{#if isSearching}
	<Modal isShown onClosed={() => close()} maxWidth={600}>
		<div>
			<div class="p-8">
				<h2 class="font-bold text-2xl mb-4">Search Image</h2>

				<input
					placeholder="Start Searching Images.."
					use:autofocus
					bind:value={searchText}
					on:input={_.debounce(search, 500)}
				/>

				<div class="mt-4 flex">
					<div
						class:font-bold={type === 'gif'}
						class="_section cursor-pointer mr-2 px-4"
						on:click={() => setType('gif')}
					>
						GIF
					</div>
					<div
						class="_section cursor-pointer px-4"
						class:font-bold={type === 'jpg'}
						on:click={() => setType('jpg')}
					>
						JPG
					</div>
				</div>

				<div class="mt-8">
					{#if isLoading}
						<div class="mb-4">
							<Loader theme="light" />
						</div>
					{:else if images?.length}
						<div class="text-sm opacity-70 mb-4">🫵 Click to select</div>
						<div class="columns-3 gap-4">
							{#each images as image}
								<img
									class="w-full mb-4 cursor-pointer transition hover:scale-125"
									src={image.url}
									use:autofocus
									on:click={() => {
										onSelected(image.url);
										close();
									}}
								/>
							{/each}
						</div>
					{/if}

					{#if !images?.length}
						<div class="grid grid-cols-3 gap-4">
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

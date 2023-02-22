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
			images = await get('giphy', {
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
</script>

{#if isSearching}
	<Modal isShown onClosed={() => close()} maxWidth={600}>
		<div>
			<div class="p-8">
				<h2 class="font-bold text-xl mb-4">Search an image</h2>

				<input
					placeholder="Start Searching.."
					use:autofocus
					bind:value={searchText}
					on:input={_.debounce(search, 500)}
				/>

				<div class="mt-8">
					{#if isLoading}
						<Loader theme="light" />
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
				</div>
			</div>
		</div>
	</Modal>
{/if}

<div on:click={search}>🔎</div>

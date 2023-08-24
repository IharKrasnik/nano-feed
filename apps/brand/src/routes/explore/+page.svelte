<script>
	import { get, post } from 'lib/api';
	import BrandFile from '$lib/components/BrandFile.svelte';
	import InfiniteScroll from 'lib/components/InfiniteScroll.svelte';
	import currentUser from 'lib/stores/currentUser';

	let brandFiles = [];

	let prevPage = 1;

	let isFeaturedOnly = true;

	let getBrandFiles = async () => {
		let { results } = await get('brandFiles', {
			isFeatured: isFeaturedOnly,
			page: prevPage,
			perPage: 9
		});

		brandFiles = [...brandFiles, ...results];
		prevPage++;
	};

	let featureFile = async (file) => {
		await post(`brandFiles/${file._id}/feature`);
	};

	let unfeatureFile = async (file) => {
		await post(`brandFiles/${file._id}/unfeature`);
	};

	getBrandFiles();
</script>

<div class="container mx-auto">
	{#if $currentUser?.isAdmin}
		<div class="flex justify-end mt-4">
			<div
				class="mr-4"
				on:click={async () => {
					isFeaturedOnly = true;
					prevPage = 1;
					brandFiles = [];
					await getBrandFiles();
				}}
			>
				Featured
			</div>

			<div
				on:click={async () => {
					isFeaturedOnly = false;
					prevPage = 1;
					brandFiles = [];
					await getBrandFiles();
				}}
			>
				All
			</div>
		</div>
	{/if}
	<a
		class="w-full flex justify-center items-center relative sticky z-10  top-[20px] left-0 top-0 "
		href="/"
	>
		<div
			class="bg-[#9900ff] text-white p-4 rounded-xl flex justify-between items-center max-w-[400px] mx-auto"
		>
			⚡️
			<div class="mx-2">Create your media assets in seconds</div>
			⚡️
		</div>
	</a>
	<h2 class="text-center text-2xl my-8">Explore <b>nice</b> content from Momentum creators 🤩</h2>

	<InfiniteScroll
		hasMore={true}
		threshold={100}
		elementScroll={'body'}
		onLoadMore={() => {
			getBrandFiles();
		}}
	/>

	<div class="sm:columns-3 columns-1">
		{#each brandFiles as brandFile (brandFile._id)}
			<div class="break-inside-avoid">
				<BrandFile file={brandFile} isWithCreator />
				{#if !isFeaturedOnly && $currentUser?.isAdmin}
					<div class="mx-4">
						{#if brandFile.isFeatured}
							<button class="w-full" on:click={() => unfeatureFile(brandFile)}>Unfeature</button>
						{:else}
							<button class="w-full" on:click={() => featureFile(brandFile)}>Feature</button>
						{/if}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

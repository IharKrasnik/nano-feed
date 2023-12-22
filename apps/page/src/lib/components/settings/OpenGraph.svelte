<script>
	import { post } from 'lib/api';
	import getPageMetaTags from 'lib/helpers/getPageMetaTags';
	import striptags from 'striptags';

	import Button from 'lib/components/Button.svelte';

	import FileInput from 'lib/components/FileInput.svelte';
	import { BRAND_URL } from 'lib/env';

	export let page;

	if (!page.openGraph) {
		page.openGraph = {};
		page.openGraph.imageUrl = getPageMetaTags({ page }).image;
	}

	let updateOpenGraph = async () => {
		await post(`pages/${page._id}/open-graph`, page.openGraph);
	};
</script>

<h3 class="text-xl font-bold mb-2">Open Graph</h3>
<div class="text-sm mb-4">
	Customize how your link will be shown when shared in social networks and web.
</div>

<div class="bg-[#fafafa]" style="padding: 32px 100px;">
	<div class="bg-zinc-900 text-white rounded-xl p-4">
		<div class="">
			{#key page.openGraph.imageUrl}
				<img
					class="rounded-xl w-full"
					style="aspect-ratio: 1200/630;"
					src={page.openGraph.imageUrl || `${BRAND_URL}/og.png?pageId=${page._id}`}
				/>
			{/key}
		</div>

		<div class="mt-4">
			<div class="font-bold">{striptags(page.openGraph.title || page.name)}</div>
			<div>{striptags(page.openGraph.description || page.heros[0]?.title)}</div>
		</div>
	</div>
</div>

<div class="mt-4">
	<div class="mb-4">
		<div class="flex w-full justify-between">
			<div class="w-full mr-4">
				<div class="text-sm mb-2">Title</div>
				<input
					bind:value={page.openGraph.title}
					class="w-full"
					type="text"
					placeholder={page.heros[0]?.title}
				/>
			</div>

			<div class="w-full ml-4">
				<div class="text-sm  mb-2">Image (1200px x 630px)</div>
				<FileInput theme="light" bind:url={page.openGraph.imageUrl} />
			</div>
		</div>

		<div class="text-sm mt-4 mb-2">Description</div>
		<input
			class="w-full"
			type="text"
			placeholder={page.heros[0]?.subtitle}
			bind:value={page.openGraph.description}
		/>
	</div>
</div>

<Button class="_primary _small mt-8" onClick={updateOpenGraph}>Update Open Graph</Button>

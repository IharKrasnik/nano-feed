<script>
	import { post } from 'lib/api';
	import getPageMetaTags from 'lib/helpers/getPageMetaTags';

	import Button from 'lib/components/Button.svelte';

	import FileInput from 'lib/components/FileInput.svelte';
	import { PAGE_URL } from 'lib/env';

	export let page;

	if (!page.openGraph) {
		page.openGraph = getPageMetaTags({ page });
	}

	let updateOpenGraph = async () => {
		await post(`pages/${page._id}/open-graph`, page.openGraph);
	};
</script>

<h3 class="text-xl font-bold mb-4">Open Graph</h3>

<div class="bg-[#fafafa]" style="padding: 32px 100px;">
	<div class="bg-zinc-900 text-white rounded-xl p-4">
		<div class="">
			{#key page.openGraph.imageUrl}
				<img
					class="rounded-xl w-full"
					style="aspect-ratio: 1200/630;"
					src={page.openGraph.imageUrl ||
						page.demoUrl ||
						`${PAGE_URL}/og.png?pageSlug=${page.slug}`}
				/>
			{/key}
		</div>

		<div class="mt-4">
			<div class="font-bold">{page.openGraph.title || page.name}</div>
			<div>{page.openGraph.description || page.title}</div>
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
					placeholder={page.name}
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
			placeholder={page.title}
			bind:value={page.openGraph.description}
		/>
	</div>
</div>

<Button class="_primary _small mt-8" onClick={updateOpenGraph}>Update Open Graph</Button>

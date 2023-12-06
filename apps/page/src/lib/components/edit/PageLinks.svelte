<script>
	import { dndzone } from 'svelte-dnd-action';

	export let page;

	// page.subPages = page.subPages.sort((sp1, sp2) => {
	// 	return sp1.slug.localeCompare(sp2.slug);
	// });

	page.subPages = page.subPages.map((sp) => ({
		...sp,
		id: sp._id
	}));

	let handleDndConsider = (e) => {
		page.subPages = e.detail.items;
	};

	let handleDndFinalize = (e) => {
		page.subPages = e.detail.items;
	};
</script>

<div class="text-lg font-bold mb-2">Page Links</div>
<div class="mt-2 mb-4">Links displayed in header and footer</div>

<div
	use:dndzone={{
		items: page.subPages,
		flipDurationMs: 300
	}}
	on:consider={handleDndConsider}
	on:finalize={handleDndFinalize}
>
	{#each page.subPages || [] as subPage (subPage.id)}
		<div class="flex gap-4 justify-between text-sm mb-4">
			<div class="overflow-hidden w-full">
				<input
					placeholder="https://twitter.com/_that_igor"
					type="url"
					class="w-full"
					theme="light"
					value={`${subPage.name}`}
				/>
				<div class="text-sm truncate opacity-60 mt-1">
					{`/${subPage.slug}`}
				</div>
			</div>
			<button on:click={() => {}}>🙈</button>
		</div>
	{/each}
</div>

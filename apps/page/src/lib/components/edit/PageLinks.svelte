<script>
	import _ from 'lodash';
	import { dndzone } from 'svelte-dnd-action';
	import { v4 as uuidv4 } from 'uuid';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';

	export let page;
	export let isShown = true;

	if (!page.links) {
		page.links =
			page.subPages
				?.map((sp) => {
					return _.cloneDeep({
						id: uuidv4(),
						...sp,
						isShowInFooter: !sp.slug.includes('/') && page.renderType !== 'article',
						isShowInHeader: !sp.slug.includes('/') && page.renderType !== 'article'
					});
				})
				.sort((sp) => {
					return sp.isShowInHeader ? -1 : 1;
				}) || [];
	}

	page.links.forEach((l) => {
		if (l.slug) {
			l.pageSlug = l.slug;
		}
	});

	let handleDndConsider = (e) => {
		page.links = e.detail.items;
	};

	let handleDndFinalize = (e) => {
		page.links = e.detail.items;
	};

	let addLink = () => {
		page.links = [
			{
				id: uuidv4(),
				name: '',
				url: '',
				isShowInHeader: true,
				isShowInFooter: true
			},
			...page.links
		];
	};
</script>

{#if isShown}
	<div class="flex w-full justify-between">
		<div>
			<div class="text-lg font-bold mb-2">Page Links</div>
			<div class="mt-2 mb-4">Links displayed in header and footer</div>
		</div>
		<div>
			<button class="_primary _small" on:click={addLink}>Add Link</button>
		</div>
	</div>

	<div>
		{#if page.links?.length}
			<div
				class="grid"
				use:dndzone={{
					items: page.links,
					flipDurationMs: 300
				}}
				on:consider={handleDndConsider}
				on:finalize={handleDndFinalize}
			>
				{#each page.links || [] as link (link.id)}
					<div class="flex justify-between items-center text-sm ">
						<FeatherIcon name="list" />
						<div class="overflow-hidden w-full flex">
							<div>
								<input
									placeholder="About"
									type="text"
									class="w-full min-w-[200px]"
									theme="light"
									bind:value={link.name}
								/>
							</div>

							{#if link.pageSlug}
								<input
									placeholder="https://twitter.com/_that_igor"
									type="url"
									class="w-full ml-4 opacity-20"
									theme="light"
									disabled
									value={`/${link.pageSlug}`}
								/>
							{:else}
								<input
									placeholder="https://twitter.com/_that_igor"
									type="url"
									class="w-full ml-4"
									theme="light"
									bind:value={link.url}
								/>
							{/if}

							<input
								placeholder="Group Name"
								type="text"
								class=" ml-4"
								theme="light"
								bind:value={link.groupName}
							/>
						</div>

						<div class="shrink-0">
							<input type="checkbox" bind:checked={link.isShowInHeader} /> Header
						</div>
						<div class="shrink-0">
							<input type="checkbox" bind:checked={link.isShowInFooter} /> Footer
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="_section _info">
				You don't have any links
				<button class="_primary _small mt-4 block" on:click={addLink}>Add Link</button>
			</div>
		{/if}
		<div>
			<button class="_primary _small mt-8" on:click={() => (isShown = false)}>Save and Close</button
			>
		</div>
	</div>
{/if}

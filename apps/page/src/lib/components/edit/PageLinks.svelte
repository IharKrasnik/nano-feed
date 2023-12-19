<script>
	import _ from 'lodash';
	import { dndzone } from 'svelte-dnd-action';
	import { v4 as uuidv4 } from 'uuid';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import RenderHeader from 'lib-render/components/render/Header.svelte';
	import RenderFooter from 'lib-render/components/render/Footer.svelte';
	import PageContainer from 'lib-render/components/PageContainer.svelte';

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

	let _refreshTimestamp = new Date();

	let refreshLinks = () => {
		_refreshTimestamp = new Date();
		console.log('refreshed');
	};

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

{#if page && isShown}
	<div class="_editor">
		<div class="flex w-full justify-between ">
			<div>
				<div class="text-lg font-bold mb-2">Page Header & Footer</div>
				<div class="mt-2 mb-4">Edit the links and styles of your header and footer</div>
			</div>
			<div>
				<button class="_primary _small" on:click={addLink}>Add Link</button>
			</div>
		</div>

		{#if page}
			<div class="flex justify-between">
				<div>
					{#key _refreshTimestamp}
						<PageContainer class="p-8 mb-4" {page}>
							<div>
								<RenderHeader bind:page isEmbed />

								<div class="mt-8">
									<RenderFooter bind:page />
								</div>
							</div>
						</PageContainer>
					{/key}
				</div>
			</div>
		{/if}
		<div class="_section flex items-center gap-4">
			<div class="font-bold">Header Styles</div>
			<div>
				<input class="mr-2" type="checkbox" bind:checked={page.theme.isHidePageName} />
				Hide brand name near logo
			</div>
			<div class="ml-4">
				Align links

				<select class="ml-2" bind:value={page.theme.headerAlign}>
					<option value="right">Right</option>
					<option value="left">Left</option>
					<option value="center">Center</option>
				</select>
			</div>
		</div>
		<div class="mt-8">
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
						<div class="flex justify-between items-center text-sm py-[1px]">
							<FeatherIcon name="list" class="opacity-30 mr-4" />
							<div class="overflow-hidden w-full flex">
								<div>
									<input
										placeholder="About"
										type="text"
										class="w-full min-w-[200px]"
										theme="light"
										on:blur={refreshLinks}
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
										on:blur={refreshLinks}
										theme="light"
										bind:value={link.url}
									/>
								{/if}

								<input
									placeholder="Group Name"
									type="text"
									class=" ml-4"
									on:blur={refreshLinks}
									theme="light"
									bind:value={link.groupName}
								/>
							</div>

							<div class="ml-4 shrink-0">
								<input type="checkbox" bind:checked={link.isShowInHeader} /> Header
							</div>
							<div class="ml-4 shrink-0">
								<input type="checkbox" bind:checked={link.isShowInFooter} /> Footer
							</div>

							<div
								class="ml-8 cursor-pointer"
								on:click={() => {
									page.links = page.links.filter((l) => l.id !== link.id);
								}}
							>
								<FeatherIcon name="trash-2" size="15" class="opacity-50 hover:opacity-100" />
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
				<button class="_primary _small mt-8" on:click={() => (isShown = false)}
					>Save and Close</button
				>
			</div>
		</div>
	</div>
{/if}

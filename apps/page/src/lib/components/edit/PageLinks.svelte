<script>
	import _ from 'lodash';
	import { dndzone } from 'svelte-dnd-action';
	import { v4 as uuidv4 } from 'uuid';
	import Button from 'lib/components/Button.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import ToggleGroup from '$lib/components/ToggleGroup.svelte';
	import RenderHeader from 'lib-render/components/render/Header.svelte';
	import RenderFooter from 'lib-render/components/render/Footer.svelte';
	import PageContainer from 'lib-render/components/PageContainer.svelte';
	import allPages from 'lib-render/stores/allPages';
	import pageDraft from 'lib-render/stores/pageDraft';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import { put, del } from 'lib/api';
	import { showSuccessMessage } from 'lib/services/toast';

	export let page;
	export let isShown = true;

	if (page.parentPage) {
		page.parentPage =
			$pageDraft[page.parentPage._id] || $allPages.find((p) => p._id === page.parentPage._id);
	}

	let parentPage = page.parentPage || page;

	if (!parentPage.links) {
		parentPage.links =
			parentPage.subPages
				?.map((sp) => {
					return _.cloneDeep({
						id: uuidv4(),
						...sp,
						isShowInFooter: !sp.slug.includes('/') && parentPage.renderType !== 'article',
						isShowInHeader: !sp.slug.includes('/') && parentPage.renderType !== 'article'
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

	parentPage.links.forEach((l) => {
		if (l.slug) {
			l.pageSlug = l.slug;
		}
		if (!l.id) {
			l.id = uuidv4();
		}
	});

	let handleDndConsider = (e) => {
		parentPage.links = e.detail.items;
	};

	let handleDndFinalize = (e) => {
		parentPage.links = e.detail.items;
	};

	let addLink = () => {
		parentPage.links = [
			{
				id: uuidv4(),
				name: '',
				url: '',
				isShowInHeader: true,
				isShowInFooter: true
			},
			...parentPage.links
		];
	};

	let updateSettings = async () => {
		await put(`pages/${parentPage._id}/nav-settings`, {
			theme: parentPage.theme,
			links: parentPage.links,
			logo: parentPage.logo,
			faviconUrl: parentPage.faviconUrl
		});

		showSuccessMessage('Page settings updated');
	};
</script>

{#if page && isShown}
	<div class="_editor">
		<div class="flex w-full justify-between items-center  mb-8">
			<div>
				<div class="text-xl font-bold mb-1">Website Header & Footer</div>
				<div class="mt-1 text-lg opacity-70">
					Edit the links and styles of your header and footer
				</div>
			</div>
			<div><Button class="_primary _small" onClick={updateSettings}>Save Changes</Button></div>
		</div>

		<div class="font-bold mb-2">Logo Styles</div>

		<div class="flex items-center gap-4">
			<div class="_section flex items-center">
				Logo <EmojiPicker
					theme={parentPage.theme?.theme}
					class="ml-4"
					bind:icon={parentPage.logo}
				/>
				<div class="flex items-center h-full ml-6">
					<input class="mr-2" type="checkbox" bind:checked={parentPage.theme.isHidePageName} />
					Hide brand name near logo
				</div>
			</div>
			<div class="ml-6 flex items-center _section">
				<div class="shrink-0 mr-2">Logo Size</div>
				<ToggleGroup
					bind:value={parentPage.theme.logoSize}
					tabs={[{ name: 'Square' }, { key: 'auto', name: 'Auto' }]}
				/>
			</div>

			<div class="_section flex items-center">
				Favicon <EmojiPicker
					isCustomOnly
					isNoSize
					isNoCode
					isNoBackgroundColor
					class="ml-4"
					bind:icon={parentPage.faviconUrl}
				/>
			</div>
		</div>

		<div class="w-full flex justify-between mb-2 mt-6">
			<div class="font-bold mb-2">Links</div>
			<div>
				<button class="_primary _small" on:click={addLink}>Add New Link</button>
			</div>
		</div>

		<div class="flex items-center _section">
			<div class="shrink-0 mr-4">Align Links</div>

			<ToggleGroup
				bind:value={parentPage.theme.headerAlign}
				tabs={[
					{ key: 'left', name: 'Left' },
					{ key: 'center', name: 'Center' },
					{ key: 'right', name: 'Right' }
				]}
			/>
		</div>

		<div class="mt-8">
			{#if parentPage.links?.length}
				<div
					class="grid"
					use:dndzone={{
						items: parentPage.links,
						flipDurationMs: 300
					}}
					on:consider={handleDndConsider}
					on:finalize={handleDndFinalize}
				>
					{#each parentPage.links || [] as link (link.id)}
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
									parentPage.links = parentPage.links.filter((l) => l.id !== link.id);
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
		</div>
		{#if page}
			<div class="font-bold mb-2 mt-16">Header & Foooter Preview</div>
			<div class="flex justify-between  mt-8">
				{#key _refreshTimestamp}
					<PageContainer class="mb-4 w-full" {page}>
						<div class="w-full">
							<RenderHeader bind:page={parentPage} isEmbed isEdit />
							<RenderFooter class="mt-8" bind:page />
						</div></PageContainer
					>
				{/key}
			</div>
		{/if}
	</div>
{/if}

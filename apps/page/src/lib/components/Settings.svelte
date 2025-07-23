<script>
	import { get, post, del } from 'lib/api';
	import Button from 'lib/components/Button.svelte';
	import EditOpenGraph from '$lib/components/settings/OpenGraph.svelte';
	import EditPageName from '$lib/components/settings/PageName.svelte';
	import EditCustomCode from '$lib/components/settings/CustomCode.svelte';
	import subPages from 'lib/stores/subPages';
	import allPages from 'lib-render/stores/allPages';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';

	export let page;
	export let onDeleted;

	let isUpdatingSyncing = false;
	let pulseDocId = page.source?.pulseDocId;

	let subscribe = async () => {
		let { url } = await get('stripe/subscribe', { pageId: page._id });
		window.location.href = url;
	};

	let deletePage = async () => {
		await del(`pages/${page._id}`);
		$subPages = $subPages.filter((sp) => sp._id !== page._id);
		$allPages = $allPages.filter((p) => p._id !== page._id);
		onDeleted();
	};

	let isDeleteIntent = false;
</script>

<div class="_editor">
	<h2 class="text-2xl font-bold mb-2">Page Settings</h2>
	<div class="mb-4">{page.name}</div>
	{#if page.renderType === 'article'}
		{#if !isUpdatingSyncing}
			<div>
				{#if page.source?.pulseDocId}
					<div class="flex items-center gap-x-2">
						<div>Synced with Pulse</div>
						<div class="text-sm text-[#8B786D]">
							<a
								href={`https://pulse.paralect.com/docs/id/${page.source?.pulseDocId}`}
								target="_blank"
							>
								<FeatherIcon name="external-link" size="16" color="#8B786D" />
							</a>
						</div>
					</div>
				{/if}

				<div
					class=" cursor-pointer text-[#8B786D]"
					on:click={() => {
						isUpdatingSyncing = true;
					}}
				>
					{page.source?.pulseDocId || 'Sync this page,,,'}
				</div>
			</div>
		{/if}

		{#if isUpdatingSyncing}
			<div class="text-sm mb-2">Pulse Doc Id</div>

			<input bind:value={pulseDocId} type="text" placeholder="688110ad858d9a0037a9495b" />

			<div class="mt-8 flex gap-x-2">
				<Button
					class="_primary _small"
					onClick={() => {
						page.source.pulseDocId = pulseDocId;
						page.isDirty = true;
						isUpdatingSyncing = false;
					}}>Update Pulse Doc Id</Button
				>
				<Button
					class="_secondary _small "
					onClick={() => {
						isUpdatingSyncing = false;
					}}>Cancel</Button
				>
			</div>
		{/if}
	{/if}
	<hr class="my-8 border-[#8B786D] opacity-30" />

	<EditPageName bind:page />
	<hr class="my-8 border-[#8B786D] opacity-30" />

	<EditOpenGraph bind:page />

	<hr class="my-8 border-[#8B786D] opacity-30" />

	<EditCustomCode bind:page />

	<hr class="my-8 border-[#8B786D] opacity-30" />

	<div>
		<div class="flex justify-between w-full">
			<div>
				<h3 class="text-xl font-bold mb-2">😱 Danger Zone</h3>
				<div class="mb-4">You scrolled too far, well...</div>
			</div>

			<div />
		</div>

		{#if isDeleteIntent}
			<Button class="_primary _small _red" onClick={deletePage}>
				😱 I am sure, delete {page.name} forever</Button
			>
		{:else}
			<Button class="_primary _small _red" onClick={() => (isDeleteIntent = true)}
				>🙈 Delete {page.name}</Button
			>
		{/if}
	</div>
</div>

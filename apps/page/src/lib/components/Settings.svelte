<script>
	import { get, post, del } from 'lib/api';
	import Button from 'lib/components/Button.svelte';
	import EditOpenGraph from '$lib/components/settings/OpenGraph.svelte';
	import EditPageName from '$lib/components/settings/PageName.svelte';
	import EditCustomCode from '$lib/components/settings/CustomCode.svelte';
	import subPages from 'lib/stores/subPages';
	import allPages from 'lib-render/stores/allPages';

	export let page;
	export let onDeleted;

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

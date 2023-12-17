<!-- <script>
	import Insert from '$lib/components/edit/Insert.svelte';
	import InsertTab from '$lib/components/tabs/InsertTab.svelte';

	let page = null;
	let isInsertPopupShown = true;
	let selectedTemplatePage = null;

	let pageName = '';
</script>

<div class="relative">
	<div
		class="fixed left-[400px] h-[60px] bg-white flex items-center justify-center"
		style="z-index: 200; width: calc(100% - 400px);"
	>
		<input bind:value={pageName} type="text" placeholder="Product Name" />
		<button class="_primary _small">Launch my page</button>
	</div>

	<div class="relative flex w-full">
		<div class="fixed w-[400px] overflow-y-scroll">
			<Insert isAbsolute={false} bind:isInsertPopupShown bind:selectedTemplatePage bind:page />
		</div>
		<div class="ml-[400px] w-full  pt-[60px]">
			<InsertTab bind:isInsertPopupShown bind:page bind:selectedTemplatePage />
		</div>
	</div>
</div> -->

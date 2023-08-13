<script>
	import { fly } from 'svelte/transition';
	import isShowContentEditableMenu from 'lib/stores/isShowContentEditableMenu';
	import clickOutside from 'lib/use/clickOutside';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	let rootEl;

	let choose = (formatType) => {
		const formatEvent = new CustomEvent('format', {
			bubbles: false,
			detail: { type: formatType }
		});

		rootEl.dispatchEvent(formatEvent);
	};
</script>

<div id="content-editable-menu" class="absolute z-10 rounded-lg opacity-90" bind:this={rootEl}>
	{#if $isShowContentEditableMenu}
		<div
			class="bg-black p-4 rounded-lg text-white"
			in:fly={{ y: 50, duration: 150 }}
			use:clickOutside
			on:clickOutside={() => {
				console.log('clickoutside');
				$isShowContentEditableMenu = false;
			}}
			class:hidden={!$isShowContentEditableMenu}
		>
			<div class="cursor-pointer p-2" on:click|stopPropagation={() => choose('h1')}>Heading 1</div>
			<div class="cursor-pointer p-2" on:click|stopPropagation={() => choose('h2')}>Heading 2</div>
			<div class="cursor-pointer p-2" on:click|stopPropagation={() => choose('h3')}>Heading 3</div>
			<div class="cursor-pointer p-2" on:click|stopPropagation={() => choose('regular')}>
				Regular
			</div>
		</div>
	{/if}
</div>

<style>
	#content-editable-menu {
		background: #111;
	}
</style>

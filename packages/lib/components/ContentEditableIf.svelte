<script>
	import clickOutside from 'lib/use/clickOutside';
	let clazz;
	export { clazz as class };
	export let style = '';
	export let innerHTML = '';
	export let condition = false;

	let isShowEditable = false;
	let editableEl;
</script>

{#if isShowEditable}
	<div
		{style}
		class="_preview {clazz}"
		contenteditable=""
		bind:innerHTML
		use:clickOutside
		bind:this={editableEl}
		on:clickOutside={() => {
			isShowEditable = false;
		}}
	/>
{:else if innerHTML}
	<div
		class={clazz}
		{style}
		on:click={() => {
			if (condition) {
				isShowEditable = true;
			}
		}}
	>
		{@html innerHTML}
	</div>
{/if}

<style>
</style>

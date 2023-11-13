<script>
	import clickOutside from 'lib/use/clickOutside';
	let clazz;
	export { clazz as class };
	export let innerHTML = '';
	export let condition = false;

	let isShowEditable = false;
</script>

{#if isShowEditable}
	<div
		class="_preview {clazz}"
		contenteditable=""
		bind:innerHTML
		use:clickOutside
		on:clickOutside={() => {
			isShowEditable = false;
		}}
	/>
{:else if innerHTML}
	<div
		class={clazz}
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
	._line-clamp-4 {
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
	}
</style>

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
{:else}
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

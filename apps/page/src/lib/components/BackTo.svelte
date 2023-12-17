<script>
	import BackArrowSvg from 'lib/icons/back-arrow.svelte';

	let clazz = '';
	export { clazz as class };
	export let to = 'Editor';
	export let onClick = () => {};
</script>

<a href="/" class="{clazz} flex items-center cursor-pointer text-[#8B786D] mb-4" on:click={onClick}>
	<BackArrowSvg />
	Back to {to}
</a>

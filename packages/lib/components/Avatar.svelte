<script>
	let clazz;
	export let user;
	export let size = '25px';
	export let style = '';

	export { clazz as class };
</script>

{#if user}
	<img
		src={user.avatarUrl}
		class="{clazz} rounded-full"
		style="width: {size}; height: {size}; {style};"
	/>
{/if}

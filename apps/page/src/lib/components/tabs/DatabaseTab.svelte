<script>
	import EditDatabase from '$lib/components/edit/Database.svelte';

	export let page;
</script>

<div class="px-8 py-16">
	<EditDatabase bind:page />
</div>

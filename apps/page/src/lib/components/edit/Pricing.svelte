<script>
	import EditSection from '$lib/components/edit/Section.svelte';

	export let page;

	page.pricing = page.pricing || {
		items: []
	};
</script>

<EditSection bind:section={page.pricing} isShort={false} isPricing />

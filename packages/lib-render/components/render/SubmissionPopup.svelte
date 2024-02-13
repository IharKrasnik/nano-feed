<script>
	import Popup from 'lib-render/components/Popup.svelte';
	import ServiceRequest from 'lib-render/components/ServiceRequest.svelte';

	export let page;
	export let submission;
	export let onClosed = () => {};
</script>

{#if submission}
	<Popup isShown position="right" isClickOutsideClose={false} bind:page {onClosed}>
		<div class="p-16 mb-[300px]">
			{#key submission._id}
				<ServiceRequest bind:page bind:submission />
			{/key}
		</div>
	</Popup>
{/if}

<script>
	import _ from 'lodash';
	export let customer;
	export let size = 34;
</script>

{#if customer.avatarUrl}
	<img src={customer.avatarUrl} class="rounded-full" style="width: {size}px; height: {size}px;" />
{:else}
	<div
		class="rounded-full border border-accent flex items-center justify-center"
		style="width: {size}px; height: {size}px;"
	>
		{_.capitalize((customer.email || customer.fullName)[0])}
	</div>
{/if}

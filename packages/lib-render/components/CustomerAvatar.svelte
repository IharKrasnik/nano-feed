<script>
	import _ from 'lodash';
	let clazz;
	export { clazz as class };

	export let customer;
	export let size = 34;
	let colors = ['border-green-300', 'border-yellow-300', 'border-purple-300'];
</script>

<div class="border-green-300 border-yellow-300 border-purple-300" />

{#if customer.avatarUrl}
	<img
		src={customer.avatarUrl}
		class="rounded-full {clazz}"
		style="width: {size}px; height: {size}px;"
	/>
{:else}
	<div
		class="rounded-full border {_.sample(colors)} flex items-center justify-center {clazz}"
		style="width: {size}px; height: {size}px;"
	>
		{_.capitalize((customer.email || customer.fullName || '')[0]) || '🥸'}
	</div>
{/if}

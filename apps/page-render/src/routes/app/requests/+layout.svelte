<script>
	import currentCustomer from 'lib/stores/currentCustomer';

	import submissionsOutbound, {
		refresh as refreshSubmissionsOutbound,
		isLoading as isSubmissionsOutboundLoading
	} from 'lib/stores/submissionsOutbound';

	if ($currentCustomer._id) {
		refreshSubmissionsOutbound({ customerId: $currentCustomer._id });
	}
</script>

{#if $currentCustomer?._id}
	{#if $submissionsOutbound?.length}
		{#each $submissionsOutbound as submission}
			{submission.message}
		{/each}
	{:else}
		You don't have any service requests yet
	{/if}
{:else}
	<button>Login</button>
{/if}

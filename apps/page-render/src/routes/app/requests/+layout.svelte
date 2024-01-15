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

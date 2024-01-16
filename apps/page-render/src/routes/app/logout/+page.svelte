<script>
	import currentCustomer from 'lib/stores/currentCustomer';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	if (browser) {
		$currentCustomer = null;
		goto('/');
	}
</script>

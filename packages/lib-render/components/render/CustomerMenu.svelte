<script>
	import _ from 'lodash';
	import currentCustomer from 'lib/stores/currentCustomer';
	import CustomerAvatar from 'lib-render/components/CustomerAvatar.svelte';
</script>

<div class="relative group ml-4 border border-accent rounded-full">
	<CustomerAvatar customer={$currentCustomer} size={34} />

	<div class="hidden group-hover:block absolute pt-[50px] top-0 right-0 ">
		<div class="_bg-cta min-w-[200px] rounded-lg overflow-hidden text-sm">
			<a class="flex shrink-0 px-4 py-4 hover:bg-cta-stronger" href="/app/profile">
				<div>Edit Profile</div>
			</a>
			<a class="flex shrink-0 px-4 py-4 hover:bg-cta-stronger" href="/app/requests">
				<div>My Requests</div>
			</a>
			<a class="flex px-4 py-4 hover:bg-cta-stronger" href="/app/logout"> Logout </a>
		</div>
	</div>
</div>

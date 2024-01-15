<script>
	export let page;
	import { page as sveltePage } from '$app/stores';
	import RenderServiceChat from 'lib-render/components/render/ServiceChat.svelte';
	import RenderSection from 'lib-render/components/render/Section.svelte';
	import RenderCustomerLoginForm from 'lib-render/components/render/CustomerLoginForm.svelte';
	import currentCustomer from 'lib/stores/currentCustomer';

	import submissionsOutbound, {
		refresh as refreshSubmissionsOutbound
	} from 'lib/stores/submissionsOutbound';

	if ($currentCustomer._id) {
		refreshSubmissionsOutbound({ customerId: $currentCustomer._id });
	}
	let submissionId = $sveltePage.params.requestId;
</script>

<div class="py-[100px]">
	<div class="mb-[200px]">
		<RenderSection {page} section={{ id: 'servicerequests', title: 'Service Requests' }} />

		{#if $currentCustomer._id}
			<div class="flex justify-center w-full">
				<div class="min-w-[300px]">
					{#each $submissionsOutbound as submission}
						<a class="_section-item block p-4 mb-4 w-full" href="/app/requests/{submission._id}"
							>{submission.vars.Message}</a
						>
					{/each}
				</div>
				{#key $sveltePage.params.requestId}
					<RenderServiceChat
						class="w-[600px] mx-16"
						{page}
						submissionId={$sveltePage.params.requestId}
					/>
				{/key}
			</div>
		{:else}
			<div>
				<RenderCustomerLoginForm
					{page}
					onLogin={() => {
						refreshSubmissionsOutbound({ customerId: $currentCustomer._id });
					}}
				/>
			</div>
		{/if}
	</div>
</div>

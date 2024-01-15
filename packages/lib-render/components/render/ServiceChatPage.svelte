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
	let submissionId = $sveltePage.params.serviceRequestId;
</script>

<div class="py-[100px] mb-[200px]">
	<RenderSection {page} section={{ id: 'servicerequests', title: 'Service Requests' }} />

	{#if $currentCustomer._id}
		<div class="flex justify-center w-full">
			<div class="min-w-[300px]">
				{#each $submissionsOutbound as submission}
					<a
						class="_section-item block p-4 mb-4 w-full"
						href="/service-requests/{submission._id}?pageSlug=lets-go">{submission.vars.Message}</a
					>
				{/each}
			</div>
			{#key $sveltePage.params.serviceRequestId}
				<RenderServiceChat
					class="w-[600px] mx-16"
					{page}
					submissionId={$sveltePage.params.serviceRequestId}
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

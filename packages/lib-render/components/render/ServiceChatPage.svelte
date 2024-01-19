<script>
	import { get, post } from 'lib/api';
	import { goto } from '$app/navigation';

	export let page;
	import { page as sveltePage } from '$app/stores';
	import RenderServiceChat from 'lib-render/components/render/ServiceChat.svelte';
	import RenderSection from 'lib-render/components/render/Section.svelte';
	import Button from 'lib/components/Button.svelte';
	import RenderCustomerLoginForm from 'lib-render/components/render/CustomerLoginForm.svelte';
	import currentCustomer from 'lib/stores/currentCustomer';

	import submissionsOutbound, {
		refresh as refreshSubmissionsOutbound
	} from 'lib/stores/submissionsOutbound';

	if ($currentCustomer._id) {
		refreshSubmissionsOutbound({ customerId: $currentCustomer._id });
	}

	let submissionId = $sveltePage.params.requestId;

	let currentSubmission;

	let getCurrentSubmission = async () => {
		currentSubmission =
			$submissionsOutbound.find((s) => s._id === $sveltePage.params.requestId) ||
			(await get(`serviceRequests/${submissionId}`));
	};

	let prevRequestId = $sveltePage.params.requestId;

	if (prevRequestId) {
		getCurrentSubmission();
	}

	let activateRequest = async () => {
		try {
			let result = await post(`serviceRequests/${currentSubmission._id}/activate`);
			currentSubmission = result.submission;
		} catch (err) {
			let { url } = await post(`customers/payment-methods?successUrl=${document.location.href}`);
			goto(url);
		}
	};

	let completeRequest = async () => {
		try {
			let result = await post(`serviceRequests/${currentSubmission._id}/complete`);
			currentSubmission = result.submission;
		} catch (err) {}
	};

	$: if ($sveltePage.params.requestId !== prevRequestId) {
		getCurrentSubmission();
	}

	let feedback = { message: '' };

	let submitFeedback = async () => {
		let result = await post(`serviceRequests/${submissionId}/feedback`, feedback);
		currentSubmission.customerFeedback = result.customerFeedback;
	};
</script>

<div class="py-[100px]">
	<div class="mb-[200px]">
		<RenderSection {page} section={{ id: 'servicerequests', title: 'Service Requests' }} />

		{#if $currentCustomer._id}
			<div class="flex justify-center w-full">
				<div class="min-w-[300px]">
					{#each $submissionsOutbound as submission}
						<a class="_section-item block p-4 mb-4 w-full" href="/app/requests/{submission._id}"
							>{submission.vars.Message || submission.page?.name || ''}</a
						>
					{/each}
				</div>

				{#if currentSubmission}
					<div>
						{#key $sveltePage.params.requestId}
							<RenderServiceChat class="w-[600px] mx-16" {page} submission={currentSubmission} />
						{/key}

						{#if currentSubmission.isActivated || !currentSubmission.activateAmount}
							{#if currentSubmission.amount && !currentSubmission.isPaid}
								<div class="pt-8 w-full justify-center items-center flex">
									<Button onClick={completeRequest}>Complete Request</Button>
								</div>
							{:else if currentSubmission.customerFeedback}{:else}
								{#if currentSubmission.isPaid || currentSubmission.isClosed}
									<div class="mt-8  _section">
										<div class="mb-2">Please leave your feedback on the service</div>
										<textarea
											bind:value={feedback.message}
											placeholder="feedback"
											class="w-full"
											rows="3"
										/>

										<Button onClick={submitFeedback}>Submit Feedback</Button>
									</div>
								{/if}
							{/if}
						{:else}
							<div class="pt-8 w-full justify-center items-center flex">
								<Button onClick={activateRequest}>Activate Request</Button>
							</div>
						{/if}
					</div>
				{/if}
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

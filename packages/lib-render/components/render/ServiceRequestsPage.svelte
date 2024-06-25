<script>
	import _ from 'lodash';
	import { browser } from '$app/environment';

	import { get } from 'lib/api';
	import currentUser from 'lib/stores/currentUser';
	import selectedSubmission from 'lib-render/stores/selectedSubmission';
	import currentCustomer, { isAuthorized, loginCustomer } from 'lib/stores/currentCustomer';
	import { page as sveltePage } from '$app/stores';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';

	import RenderCustomerLoginForm from 'lib-render/components/render/CustomerLoginForm.svelte';
	import Button from 'lib/components/Button.svelte';
	import ServiceRequestCard from 'lib-render/components/ServiceRequestCard.svelte';
	import SubmissionPopup from 'lib-render/components/render/SubmissionPopup.svelte';

	import submissions, { refresh as refreshSubmissions } from 'lib/stores/submissions';

	import submissionsOutbound, {
		refresh as refreshSubmissionsOutbound
	} from 'lib/stores/submissionsOutbound';

	export let selectedSubmissionsTab = 'outbound';
	export let page;

	let parentPage = page.parentPage || page;

	if (!$isAuthorized && $currentUser) {
		loginCustomer({ page: { _id: '654e6776c712c70014d65d77' } }).then(async () => {
			await refreshSubmissionsOutbound({ customerId: $currentCustomer._id });
		});
	} else if ($isAuthorized) {
		refreshSubmissionsOutbound({ customerId: $currentCustomer._id });
	}

	export let submissionId = $sveltePage.params.requestId;

	let getCurrentSubmission = async () => {
		if (browser) {
			$selectedSubmission =
				$submissionsOutbound?.find((s) => s._id === $sveltePage.params.requestId) ||
				(await get(`serviceRequests/${submissionId}`));
		}
	};

	let prevRequestId = $sveltePage.params.requestId;

	if (prevRequestId) {
		getCurrentSubmission();
	}

	$: if ($sveltePage.params.requestId !== prevRequestId) {
		getCurrentSubmission();
	}

	let isRequestAdding = false;

	let startAddingRequest = async () => {
		isRequestAdding = true;
	};
</script>

<div class="pt-[80px] ">
	<div class="p-4 sm:p-0 sm:flex justify-center w-full">
		<div>
			{#if $selectedSubmission || isRequestAdding}
				<SubmissionPopup
					bind:submission={$selectedSubmission}
					bind:page
					onClosed={() => {
						$selectedSubmission = null;
						isRequestAdding = false;
					}}
				/>
			{/if}
			<div class="sm:w-[900px] mx-auto">
				<div class="text-2xl font-bold mb-3 mt-8">Requests</div>
				<div class="opacity-70 mb-8 mt-3">Create service requests and track their status</div>
			</div>

			<div class="overflow-x-scroll">
				<div class="w-[900px] mx-auto">
					<div class="grid grid-cols-3 gap-4">
						<div class="my-2">
							<div />
							<div class="text-sm opacity-70 font-semibold mb-4">To Do</div>

							<Button
								class="mb-4 text-sm _transparent _app-section w-full  justify-start max-w-[300px]"
								onClick={startAddingRequest}
							>
								<div class="flex items-center">
									<div>
										<FeatherIcon
											theme={(page.parentPage || page).theme?.theme}
											class="mr-1"
											size={15}
											name="plus"
										/>
									</div>
									<div>Add Request</div>
								</div>
							</Button>

							{#each (selectedSubmissionsTab === 'inbound' ? $submissions : $submissionsOutbound).filter((s) => !s.isActivated && !s.isClosed) as submission}
								<ServiceRequestCard bind:submission />
							{/each}
						</div>
						<div class="my-2">
							<div class="text-sm opacity-70 font-semibold mb-4">In Progress</div>

							{#each (selectedSubmissionsTab === 'inbound' ? $submissions : $submissionsOutbound).filter((s) => s.isActivated && !s.isClosed && !s.isPaid) as submission}
								<ServiceRequestCard bind:submission />
							{/each}
						</div>
						<div class="my-2">
							<div class="text-sm opacity-70 font-semibold mb-4">Done</div>

							{#each (selectedSubmissionsTab === 'inbound' ? $submissions : $submissionsOutbound).filter((s) => s.isClosed || s.isPaid) as submission}
								<ServiceRequestCard bind:submission />
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	{#if $isAuthorized || $currentUser}{:else}
		<div class="flex items-center justify-center mt-16 w-full sm:w-auto">
			<RenderCustomerLoginForm
				isForceLoginCode={true}
				{page}
				onLogin={() => {
					refreshSubmissionsOutbound({ customerId: $currentCustomer._id });
				}}
			/>
		</div>
	{/if}
</div>

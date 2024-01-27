<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { get, post, put, del } from 'lib/api';
	import pageDraft from 'lib-render/stores/pageDraft';
	import allPages from 'lib-render/stores/allPages';
	import currentUser from 'lib/stores/currentUser';
	import subPages from 'lib/stores/subPages';
	import selectedSubmission from 'lib-render/stores/selectedSubmission';
	import formatSubmission from 'lib-render/helpers/formatSubmission';
	import currentCustomer, { isAuthorized } from 'lib/stores/currentCustomer';
	import { page as sveltePage } from '$app/stores';
	import toDollars from 'lib/helpers/toDollars';
	import Popup from 'lib-render/components/Popup.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';

	import RenderCustomerLoginForm from 'lib-render/components/render/CustomerLoginForm.svelte';
	import RenderForm from 'lib-render/components/render/Form.svelte';
	import Button from 'lib/components/Button.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import SitePreview from 'lib-render/components/SitePreview.svelte';
	import PageContainer from 'lib-render/components/PageContainer.svelte';
	import ServiceRequest from 'lib-render/components/ServiceRequest.svelte';
	import ServiceRequestCard from 'lib-render/components/ServiceRequestCard.svelte';
	import ContentEditable from 'lib/components/ContentEditable.svelte';

	import submissions, { refresh as refreshSubmissions } from 'lib/stores/submissions';
	import servicePages, { refresh as refreshServicePages } from 'lib-render/stores/servicePages';

	import submissionsOutbound, {
		refresh as refreshSubmissionsOutbound
	} from 'lib/stores/submissionsOutbound';

	export let selectedSubmissionsTab = 'outbound';
	export let page;

	let parentPage = page.parentPage || page;

	if ($currentUser) {
		refreshSubmissions({ page });
	} else if ($isAuthorized) {
		refreshSubmissionsOutbound({ customerId: $currentCustomer._id });
	}

	export let submissionId = $sveltePage.params.requestId;

	let getCurrentSubmission = async () => {
		$selectedSubmission =
			$submissionsOutbound.find((s) => s._id === $sveltePage.params.requestId) ||
			(await get(`serviceRequests/${submissionId}`));
	};

	let prevRequestId = $sveltePage.params.requestId;

	if (prevRequestId) {
		getCurrentSubmission();
	}

	$: if ($sveltePage.params.requestId !== prevRequestId) {
		getCurrentSubmission();
	}

	let isRequestAdding = false;

	let getDefaultSubmission = () => {
		return {
			title: '',
			description: '',
			page: null
		};
	};
	let newSubmission;

	let startAddingRequest = async () => {
		if (!$servicePages) {
			await refreshServicePages({ parentPageId: (page.parentPage || page)._id });
		}

		newSubmission = getDefaultSubmission();
		isRequestAdding = true;
		// isRequestAdding = true;
	};

	let createRequest = async () => {
		let { submission } = await post(`serviceRequests?pageId=${parentPage._id}`, {
			title: newSubmission.page.name,
			description: newSubmission.description,
			pageId: newSubmission.page._id,
			metadata: newSubmission.page.metadata
		});

		if (selectedSubmissionsTab === 'outbound') {
			$submissionsOutbound = [submission, ...$submissionsOutbound];
		} else {
			$submissions = [submission, ...$submissions];
		}
		$selectedSubmission = submission;

		newSubmission = getDefaultSubmission();
	};
</script>

<div class="pt-[80px]">
	<div class="flex justify-center w-full">
		<div>
			{#if $selectedSubmission || isRequestAdding}
				<Popup
					isShown
					position="right"
					bind:page
					onClosed={() => {
						$selectedSubmission = null;
						isRequestAdding = false;
					}}
				>
					<div class="p-16 mb-[300px]">
						{#if isRequestAdding}
							<ServiceRequest bind:page bind:submission={newSubmission} />
						{:else}
							{#key $selectedSubmission._id}
								<ServiceRequest bind:page bind:submission={$selectedSubmission} />
							{/key}
						{/if}

						<!-- {#if $servicePages}
												<select class="mb-2 w-full text-lg _bg-cta" bind:value={newSubmission.page}>
													{#each $servicePages as servicePage}
														<option value={servicePage}>{servicePage.name}</option>
													{/each}
												</select>

												<ContentEditable
													class="text-lg _bg-cta p-4 min-h-[200px]"
													placeholder="Task Description..."
													bind:value={newSubmission.description}
												/>
											{/if}

											<Button onClick={createRequest} class="mt-8">Submit Request</Button>
											<div class="text-sm font-semibold mt-2">
												{#if newSubmission.page?.metadata?.fullAmount}
													Price: {toDollars(newSubmission.page?.metadata.fullAmount)}
												{:else}
													Free
												{/if}
											</div> -->
					</div>
				</Popup>
			{/if}

			<div class="w-[900px] mx-auto">
				<div class="text-2xl font-bold mb-3 mt-8">Requests</div>
				<div class="opacity-70 mb-8 mt-3">Create service requests and track their status</div>

				<div class="grid grid-cols-3 gap-4">
					<div class="my-2">
						<div />
						<div class="text-sm opacity-70 font-semibold mb-4">To Do</div>

						{#if !$currentUser}
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
								<!-- <input placeholder="New Request" type="text" class="w-full" /> -->
							</Button>
						{/if}

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

	{#if $isAuthorized || $currentUser}{:else}
		<div class="flex items-center justify-center mt-16">
			<RenderCustomerLoginForm
				{page}
				onLogin={() => {
					refreshSubmissionsOutbound({ customerId: $currentCustomer._id });
				}}
			/>
		</div>
	{/if}
</div>

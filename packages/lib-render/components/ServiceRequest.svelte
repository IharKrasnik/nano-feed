<script>
	import currentUser from 'lib/stores/currentUser';
	import clickOutside from 'lib/use/clickOutside';
	import submissionsOutbound from 'lib/stores/submissionsOutbound';
	import submissions from 'lib/stores/submissions';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import { get, post, put, postFile } from 'lib/api';
	import Button from 'lib/components/Button.svelte';
	import RenderServiceChat from 'lib-render/components/render/ServiceChat.svelte';
	import toDollars from 'lib/helpers/toDollars';
	import CustomerAvatar from 'lib-render/components/CustomerAvatar.svelte';
	import { fade } from 'svelte/transition';
	import ContentEditable from 'lib/components/ContentEditable.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import currentCustomer from 'lib/stores/currentCustomer';
	import servicePages, { refresh as refreshServicePages } from 'lib-render/stores/servicePages';

	export let submission;
	export let page;
	let parentPage = page.parentPage || page;

	let isSubmissionEdit = !submission._id;
	let isMenuShown = false;

	let activateRequest = async () => {
		try {
			let result = await post(`serviceRequests/${submission._id}/activate`);
			submission = result.submission;
		} catch (err) {
			let { url } = await post(`customers/payment-methods?successUrl=${document.location.href}`);
			goto(url);
		}
	};

	let completeRequest = async () => {
		if (submission?.metadata?.completionLink) {
			window.open(submission?.metadata?.completionLink, '_blank');
		} else {
			try {
				let result = await post(`serviceRequests/${submission._id}/complete`);

				submission = result.submission;
			} catch (err) {}
		}
	};

	let closeRequest = async () => {
		let updatedSubmission = await put(`serviceRequests/${submission._id}/close`);
		submission = updatedSubmission;

		$submissionsOutbound = $submissionsOutbound.map((s) => {
			if (s._id === submission._id) {
				return submission;
			}
			return s;
		});

		$submissions = $submissions.map((s) => {
			if (s._id === submission._id) {
				return submission;
			}
			return s;
		});
	};

	let feedback = { message: '' };

	let submitFeedback = async () => {
		let result = await post(`serviceRequests/${submission._id}/feedback`, feedback);
		submission.customerFeedback = result.customerFeedback;
	};

	let descriptionEditEl;

	let saveRequest = async () => {
		let isNew = !submission._id;

		submission = submission._id
			? await put(`serviceRequests/${submission._id}?pageId=${parentPage._id}`, {
					title: submission.title,
					description: submission.description,
					files: submission.files
			  })
			: await post(`serviceRequests?pageId=${parentPage._id}`, {
					title: submission.page.name,
					description: submission.description,
					files: submission.files,
					pageId: submission.page._id,
					metadata: submission.page.metadata
			  });

		if (isNew) {
			$submissionsOutbound = [submission, ...$submissionsOutbound];
		}

		isSubmissionEdit = false;
	};
</script>

<div class="flex justify-between">
	<div class="w-full mt-4">
		<div class="flex items-center">
			<div class="text-lg font-bold mb-2 shrink-0">
				{#if submission._id}
					{submission.title}
				{:else if $servicePages}
					<select class="mb-2 w-full _bg-cta" bind:value={submission.page}>
						{#each $servicePages as servicePage}
							<option value={servicePage}>{servicePage.name}</option>
						{/each}
					</select>
				{/if}
			</div>
			<div class="mt-[-5px] ml-4">
				{#if submission.isClosed}
					<div class="text-center text-sm p-1 px-3 border rounded-full border-orange-300">
						Closed
					</div>
				{:else if submission._id}
					<div class="text-center text-sm p-1 px-3 border rounded-full border-green-300">
						Active
					</div>
				{:else}
					<div class="text-center text-sm p-1 px-3 border rounded-full border-orange-300">
						Draft
					</div>{/if}
			</div>
		</div>

		{#if isSubmissionEdit}
			<ContentEditable class="p-4 _bg-cta" bind:value={submission.description} />

			<!-- <button class="_alternative flex items-center mt-4">
				<FeatherIcon name="paperclip" class="mr-2" size={16} theme={page.theme?.theme} />
				Add Attachment</button
			> -->

			<label for="new-file" class="block my-4 cursor-pointer">
				<div class="flex">
					📂
					<div class="ml-2">Add Attachment</div>
				</div>

				<input
					id="new-file"
					type="file"
					on:change={async (e) => {
						let file = await postFile('files/customer', (e.target?.files || e.detail?.files)[0]);

						submission.files = [...(submission.files || []), file];
					}}
					hidden
				/>
			</label>
		{:else}
			<div
				class="cursor-pointer my-4 hover:p-4 hover:_bg-cta"
				on:click={() => {
					isSubmissionEdit = true;
				}}
			>
				{@html submission.description || 'No Description'}
			</div>
		{/if}

		{#if submission.files?.length}
			<div class="flex justify-start mt-8">
				{#each submission.files as file}
					<a href={isSubmissionEdit ? '' : file.url} target={isSubmissionEdit ? null : '_blank'}>
						<div class="group relative {isSubmissionEdit ? '' : 'cursor-pointer'}">
							{#if isSubmissionEdit}
								<div
									class="group-hover:block hidden cursor-pointer absolute left-0 top-0 w-full h-full z-10 backdrop-blur"
									on:click={() => {
										submission.files = submission.files.filter((f) => f !== file);
									}}
								>
									<!-- <div
									class="w-[30px] h-[30px] flex items-center justify-center border-2 _border-theme rounded-full"
								/> -->
								</div>
							{/if}
							<RenderUrl class="w-auto" imgClass="max-h-[100px] w-auto mr-4" url={file.url} />
						</div>
					</a>
				{/each}
			</div>
		{/if}

		{#if isSubmissionEdit}
			<div class="mt-8">
				<Button onClick={saveRequest} class="mt-4">Save Request</Button>
			</div>
		{/if}

		<!-- 
		<div class="text-lg mb-4 opacity-70">
			Chat with
			{#if $currentUser}
				{submission.customer?.fullName || 'anonymous'} ({submission.customer.email || 'no email'})
			{:else}
				{submission.page.parentPage.name}
			{/if}
		</div> -->
	</div>

	<div>
		{#if submission.isClosed || submission.isPaid}{:else}
			<div class="cursor-pointer relative" on:click={() => (isMenuShown = !isMenuShown)}>
				<FeatherIcon theme={(page.parentPage || page)?.theme?.theme} name="more-horizontal" />

				{#if isMenuShown}
					<div
						class="absolute right-0 top-0 min-w-[150px] "
						style="transform:translateY(100%);"
						use:clickOutside
						on:clickOutside={() => (isMenuShown = false)}
					>
						<div
							class="p-2 _border-accent rounded hover:bg-accent transition"
							on:click={closeRequest}
						>
							Close Request
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>

{#if !isSubmissionEdit}
	<div class="_border-theme rounded-xl mt-12 overflow-hidden">
		<div class="pl-4 my-4">
			<div class="flex items-center">
				<div class="font-semibold">
					Chat with {(submission.page.parentPage || submission.page).name}
				</div>
			</div>
			<div class="opacity-80">If you have any questions — ask!</div>
		</div>
		<RenderServiceChat class="w-full" bind:submission bind:page />
	</div>

	{#if submission.isActivated || !submission.metadata?.activateAmount}
		{#if submission.metadata?.fullAmount && submission.isActivated && !submission.isPaid}
			<div class="flex flex-col items-center">
				<div class="pt-8 w-full justify-center items-center flex">
					<Button onClick={completeRequest}>Complete Request</Button>
				</div>
				<div class="text-sm mt-2">
					Pay {toDollars(
						submission.metadata?.fullAmount - (submission.metadata?.activateAmount || 0)
					)}
				</div>
			</div>
		{:else if submission.isClosed || submission.isPaid}
			<div class="_app-section mt-12">
				<div class="text-lg font-bold mb-2">Feedback</div>

				{#if submission.customerFeedback}
					<div class="flex items-start mt-4">
						<CustomerAvatar class="mr-2" customer={submission.customer} />

						<div class="_bg-cta inline-flex rounded p-4 min-w-[400px]">
							{submission.customerFeedback.message}
						</div>
					</div>
				{:else if !$currentUser && (submission.isPaid || submission.isClosed)}
					<div class="mb-1">Please leave your feedback on the service</div>
					<div class="mt-8  _app-section flex items-start">
						<CustomerAvatar class="shrink-0 mr-4" customer={$currentCustomer} />
						<textarea
							bind:value={feedback.message}
							placeholder="I loved it!..."
							class="w-full"
							rows="3"
						/>

						<Button class="shrink-0 ml-4" onClick={submitFeedback}>Submit Feedback</Button>
					</div>
				{:else}
					<div class="opacity-80 ">No Feedback</div>
				{/if}
			</div>
		{/if}
	{/if}
	{#if !submission.isActivated}
		{#if submission.metadata?.activateAmount || $currentUser}
			<div class="grid grid-cols-2 gap-4 mt-8">
				<div class="rounded _border-theme p-4">
					<div class="w-full flex">
						<Button onClick={activateRequest}>Activate Request</Button>
					</div>

					{#if $currentUser}
						<div class="text-sm mt-2 opacity-80">
							Customer will be notified that request is in progress
						</div>
					{:else if submission.metadata?.activateAmount}
						<div class="text-sm mt-2">
							Pay {toDollars(submission.metadata?.activateAmount || 0)}
						</div>
					{/if}
				</div>
				<div class="rounded _border-theme p-4">
					<div class="w-full flex">
						<Button class="_alternative" onClick={closeRequest}>Close Request</Button>
					</div>

					{#if $currentUser}
						<div class="text-sm mt-2 opacity-80">
							Customer will be notified that request is closed
						</div>
					{:else if submission.metadata?.activateAmount}
						<div class="text-sm mt-2">Cancel your request</div>
					{/if}
				</div>
			</div>

			<div class="mt-8">The request is currently inactive</div>
		{/if}
	{/if}
{/if}

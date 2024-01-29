<script>
	import _ from 'lodash';
	import moment from 'moment';
	import currentUser from 'lib/stores/currentUser';
	import clickOutside from 'lib/use/clickOutside';
	import submissionsOutbound from 'lib/stores/submissionsOutbound';
	import submissions from 'lib/stores/submissions';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import { get, post, put, postFile } from 'lib/api';
	import Button from 'lib/components/Button.svelte';
	import RenderServiceComments from 'lib-render/components/render/ServiceComments.svelte';
	import toDollars from 'lib/helpers/toDollars';
	import CustomerAvatar from 'lib-render/components/CustomerAvatar.svelte';
	import { fade } from 'svelte/transition';
	import ContentEditable from 'lib/components/ContentEditable.svelte';
	import Emoji from 'lib/components/Emoji.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import FileInput from 'lib/components/FileInput.svelte';
	import ServiceRequestStatus from 'lib-render/components/ServiceRequestStatus.svelte';
	import currentCustomer, { isAuthorized } from 'lib/stores/currentCustomer';
	import servicePages from 'lib-render/stores/servicePages';
	import getPageUrl from 'lib-render/helpers/getPageUrl';
	import RenderCustomerLoginForm from 'lib-render/components/render/CustomerLoginForm.svelte';

	export let submission;
	export let page;
	let parentPage = page.parentPage || page;

	if (!submission.vars) {
		submission.vars = {};
	}

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
					files: submission.files,
					vars: submission.vars
			  })
			: await post(`serviceRequests?pageId=${submission.page._id}`, {
					title: submission.page.name,
					description: submission.description,
					files: submission.files,
					pageId: submission.page._id,
					vars: submission.vars,
					metadata: submission.page.metadata
			  });

		if (isNew) {
			$submissionsOutbound = [submission, ...$submissionsOutbound];
		}

		isSubmissionEdit = false;
	};

	let isSubmittingForReviewInProgress = false;

	// __ddd

	let newReview = $currentUser
		? {
				messageHTML: `Hey! It's ${
					$currentUser.fullName.split(' ')[0]
				}. <br/> Please review the updates and let me know what you think! <br/> Did I get your idea right? What do we need to change? <br/><br/> Thank you!`,
				deliverables: [{ url: '' }],
				files: []
		  }
		: null;

	let submitForReview = async () => {
		let { submission: updatedSubmission, message } = await post(
			`serviceRequests/${submission._id}/review`,
			{
				...newReview
			}
		);

		submission = updatedSubmission;

		isSubmittingForReviewInProgress = false;
	};

	let isRequestingChanges = false;

	let changeRequest = {
		messsageHTML: '',
		attachments: []
	};

	let requestChanges = async () => {
		let { submission: updatedSubmission, message } = await post(
			`serviceRequests/${submission._id}/request-changes`,
			{
				...changeRequest
			}
		);

		submission = updatedSubmission;

		isRequestingChanges = false;
	};
</script>

{#if submission.page}
	<div class="flex justify-between">
		<div class="w-full">
			<div class="flex items-center">
				<div class="text-3xl font-bold mb-2 shrink-0">
					{submission.title || submission.page.name}
				</div>
			</div>
			{#if !submission._id && submission.page.heros && submission.page.heros[0].subtitle}
				<div class="opacity-60 mt-3 text-lg">
					{submission.page.heros[0].subtitle}
				</div>
				<div>
					<a
						href={getPageUrl({ page: submission.page })}
						target="_blank"
						class="flex items-center opacity-70 hover:opacity-100 mt-4"
					>
						<FeatherIcon
							class="mr-2"
							size={16}
							name="help-circle"
							theme={parentPage.theme?.theme}
						/> See Service Page
					</a>
				</div>
			{/if}
			{#if !isSubmissionEdit}
				<div class="text-sm">
					{#if $currentUser}
						<div class="flex items-center my-4">
							<div class="flex items-center opacity-60 w-[170px]">
								<FeatherIcon class="mr-2" size={15} name="user" theme={parentPage.theme?.theme} />
								<div>Customer</div>
							</div>
							<div class="flex items-center text-sm">
								<CustomerAvatar class="mr-2" size={15} customer={submission.customer} />
								{submission.customer.fullName || submission.customer.email || 'Anonymous'}
							</div>
						</div>
					{/if}
					<div class="flex items-center my-4">
						<div class="flex items-center opacity-60 w-[170px]">
							<FeatherIcon class="mr-2" size={15} name="loader" theme={parentPage.theme?.theme} />
							<div>Status</div>
						</div>
						<div class="text-xs">
							<ServiceRequestStatus {submission} />
						</div>
					</div>
					<div class="flex items-center my-4">
						<div class="flex items-center opacity-60 w-[170px]">
							<FeatherIcon class="mr-2" size={15} name="calendar" theme={parentPage.theme?.theme} />
							<div>Submitted On</div>
						</div>
						<div class="text-sm">
							{moment(submission.createdOn).format('MMM DD, YYYY (dddd)')}
						</div>
					</div>
				</div>
			{/if}

			{#if (!submission._id || isSubmissionEdit) && (submission.fields.filter((f) => !f.isMustHaveField) || []).length}
				<div class="flex items-center opacity-60 mt-16 text-sm">Required Fields</div>
			{/if}
			<div class="text-sm">
				{#each submission.fields.filter((f) => !f.isMustHaveField) || [] as field}
					<div class="flex items-start my-4">
						<div>
							<div class="flex items-center opacity-60 w-[170px]">
								<Emoji
									width={15}
									emoji={field.emoji || 'feather:database'}
									theme={parentPage.theme?.theme}
									class="mr-2"
								/>

								<div>{field.title}</div>
							</div>
						</div>
						<div class="text-sm w-full">
							{#if !submission._id || isSubmissionEdit}
								{#if field.interactiveRenderType === 'textarea'}
									<textarea
										class="app-input w-full"
										rows="3"
										placeholder={field.placeholder || 'Start typing...'}
										bind:value={submission.vars[field.varName || field.title]}
									/>
								{:else}
									<input
										class="app-input w-full"
										placeholder={field.placeholder || 'Start typing...'}
										bind:value={submission.vars[field.varName || field.title]}
									/>
								{/if}
							{:else}
								<div
									class="cursor-pointer opacity-70 hover:opacity-100 transition"
									on:click={() => {
										submission.vars = submission.vars || {};
										isSubmissionEdit = true;
									}}
								>
									{#if submission.vars}
										{submission.vars[field.varName] || submission.vars[field.title] || 'Empty'}
									{:else}
										Empty
									{/if}
								</div>
							{/if}
							{#if field.description}
								<div class="mt-2 opacity-60">{field.description}</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>

			<div class="flex items-center opacity-60 w-[170px] mt-16 text-sm">
				<div>Description</div>
			</div>
			{#if isSubmissionEdit}
				<ContentEditable
					placeholder={submission.fields.find((f) => f.interactiveRenderType === 'description')
						?.interactivePlaceholder || 'Provide details about your request...'}
					class="p-4 mt-4 _bg-cta"
					bind:value={submission.description}
				/>

				<div class="flex items-center opacity-60 w-[170px] mt-16 mb-4">
					<div>Attachments</div>
				</div>
				{#each submission.files || [] as file}
					<div class="w-full flex items-center">
						<FileInput
							class="app-input w-full mb-2"
							bind:url={file.url}
							theme={parentPage.theme?.theme}
						/>
						<div
							class="ml-2 opacity-70 hover:opacity-100 cursor-pointer"
							on:click={() => {
								submission.files = submission.files.filter((f) => f !== file);
							}}
						>
							<FeatherIcon size={20} name="trash-2" theme={parentPage.theme?.theme} />
						</div>
					</div>
				{/each}

				<div
					class="inline-flex cursor-pointer mt-4 mb-4 _border-theme p-2 text-sm rounded"
					on:click={() => {
						submission.files = submission.files || [];
						submission.files = [{ url: '' }, ...submission.files];
					}}
				>
					📂
					<div class="ml-2">Add Attachment</div>
				</div>
			{:else}
				<div
					class="cursor-pointer my-4  hover:_bg-cta"
					on:click={() => {
						isSubmissionEdit = true;
					}}
				>
					{@html submission.description || 'No Description'}
				</div>
			{/if}

			{#if submission.files?.length && !isSubmissionEdit}
				<div class="flex justify-start mt-8">
					{#each submission.files || [] as file}
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

			{#if submission._id && !isSubmissionEdit}
				<div class="flex items-center opacity-60 w-[170px] mt-16 mb-8 text-sm">
					<div>Deliverables</div>
				</div>
				{#if submission.deliverables?.length}
					{#each submission.deliverables as deliverable}
						<div class="overflow-x-hidden ">
							<a
								href={deliverable.url}
								target="_blank"
								class="_bg-cta p-4 block mb-2 cursor-click text-lg truncate opacity-80 hover:opacity-100"
							>
								{deliverable.url}
							</a>
						</div>
						<!-- <a href={deliverable.url} target="_blank">
					<RenderUrl class="max-h-[200px] w-auto" url={deliverable.url} />
				</a> -->
					{/each}
				{:else}
					{#if !isSubmissionEdit && !submission.isActivated}
						{#if submission.metadata?.payType === 'on-activation' || submission.metadata?.payType === 'prepayment' || $currentUser}
							<div class="_app-section mt-8 ">
								<div class="text-lg font-semibold">Activate Request</div>
								<div class="mt-1 mb-4 opacity-50">The request is currently inactive</div>

								<div class="grid grid-cols-2 gap-4 mt-4">
									<div class="rounded _border-theme p-4">
										<div class="w-full flex">
											<Button class="app-button" onClick={activateRequest}>Activate Request</Button>
										</div>

										{#if $currentUser}
											<div class="text-sm mt-2 opacity-80">
												Customer will be notified that request is in progress
											</div>
										{:else if submission.metadata?.activateAmount}
											<div class="text-sm mt-2">
												Pay {toDollars(submission.metadata?.activateAmount || 0)}
											</div>
										{:else if submission.metadata?.payType === 'on-activation'}
											<div class="text-sm mt-2">
												Pay {toDollars(submission.metadata?.fullAmount || 0)}
											</div>
										{/if}
									</div>
									<div class="rounded _border-theme p-4">
										<div class="w-full flex">
											<Button class="app-button _alternative" onClick={closeRequest}
												>Close Request</Button
											>
										</div>

										{#if $currentUser}
											<div class="text-sm mt-2 opacity-80">
												Customer will be notified that request is closed
											</div>
										{:else}
											<div class="text-sm mt-2">Cancel your request</div>
										{/if}
									</div>
								</div>
							</div>
						{/if}
					{/if}

					{#if submission.isActivated || !submission.metadata?.fullAmount}
						<div class="opacity-80 mt-4">Work in progress...</div>
						{#if !$currentUser}
							<div class="opacity-80">
								You will be notified via email {$currentCustomer.email || ''} once ready to review
							</div>
						{/if}
					{/if}
				{/if}
			{/if}

			{#if !isRequestingChanges && !submission.isClosed && !submission.isPaid && _.last(submission.reviews)?.isPending && !$currentUser}
				<div class="_app-section mt-8 mb-4">
					<div class="text-lg font-semibold">Review the work</div>
					<div class="mt-1 opacity-50">Please review the deliverables and update the request</div>
					<div class="grid grid-cols-2 gap-4 mt-4">
						<div class="rounded _border-theme p-4">
							<div class="w-full flex">
								<Button class="app-button" onClick={completeRequest}>Approve & Close</Button>
							</div>
							{#if submission.metadata?.fullAmount}
								<div class="text-sm mt-2 opacity-70">
									{#if submission.metadata?.payType === 'on-activation'}
										Mark request as completed
									{:else}
										Pay {toDollars(
											submission.metadata?.fullAmount - (submission.metadata?.activateAmount || 0)
										)}
									{/if}
								</div>
							{/if}
						</div>
						<div class="rounded _border-theme p-4">
							<div class="w-full flex">
								<button
									class="app-button _alternative"
									on:click={() => (isRequestingChanges = true)}>Request Changes</button
								>
							</div>

							{#if submission.metadata.revisionsCount}
								<div class="text-sm mt-2 opacity-70">
									You have {submission.metadata.revisionsCount - submission.reviews.length + 1} revisions
									left
								</div>
							{:else}
								<div class="text-sm mt-2 opacity-70">Ask for the changes</div>
							{/if}
						</div>
					</div>
				</div>
			{/if}

			{#if isRequestingChanges}
				<div class="_app-section mt-8 mb-12">
					<div class="text-lg font-semibold">Request Changes</div>

					<div class="mt-1 opacity-50">Send a message with your change request</div>

					<div class="mt-12 font-semibold">Message</div>
					<div class="opacity-50 mt-1 mb-2">
						Please be specific about what exactly you don't like and need to change
					</div>
					<ContentEditable
						class="p-4 _bg-cta rounded mt-4"
						placeholder="Please review the work!"
						bind:value={changeRequest.messageHTML}
					/>

					<div class="mt-12 font-semibold">Attachments</div>

					{#each changeRequest.attachments || [] as attachment}
						<div class="flex items-center">
							<FileInput
								bind:url={attachment.url}
								class="app-input w-full mb-2 mt-2"
								theme={parentPage.theme?.theme}
							/>
							<div
								class="ml-2 opacity-70 hover:opacity-100 cursor-pointer"
								on:click={() => {
									changeRequest.attachments = changeRequest.attachments.filter(
										(a) => a !== attachment
									);
								}}
							>
								<FeatherIcon size={20} name="trash-2" theme={parentPage.theme?.theme} />
							</div>
						</div>
					{/each}

					<button
						class="app-button _alternative mt-4 "
						on:click={() => {
							changeRequest.attachments = [{ url: '' }, ...changeRequest.attachments];
						}}
						><FeatherIcon
							size={16}
							class="mr-2"
							name="paperclip"
							theme={parentPage.theme?.theme}
						/>Add {changeRequest.attachments?.length ? 'Another' : ''} File</button
					>

					<hr class="my-12 opacity-50" />

					<div class="flex items-center gap-4">
						<Button onClick={requestChanges} class="app-button">Request Changes</Button>
						<button
							on:click={() => {
								isRequestingChanges = false;
							}}
							class="app-button _alternative "
							>Cancel Review
						</button>
					</div>
					{#if submission.metadata.revisionsCount}
						<div class="text-sm mt-4">
							{#if submission.metadata.revisionsCount - submission.reviews.length + 1 > 1}
								You have {submission.metadata.revisionsCount - submission.reviews.length + 1} revisions
								left
							{:else}
								This is your last revision. You have no additional reviews left.
							{/if}
						</div>
					{/if}
				</div>
			{/if}

			{#if $currentUser && !submission.isClosed && !isSubmissionEdit}
				<div class="_app-section mt-8 mb-12">
					<div class="text-lg font-semibold">Submit work for review</div>

					<div class="mt-1 opacity-50">
						Notify the customer that the work is ready for review.
						<div>
							If you're unsure about the requirements, use the comments below to clarify your
							questions.
						</div>
					</div>

					{#if !isSubmittingForReviewInProgress}
						<button
							on:click={() => (isSubmittingForReviewInProgress = true)}
							class="app-button mt-4">Submit For Review</button
						>
					{/if}

					{#if isSubmittingForReviewInProgress}
						<div class="mt-12 font-semibold">Message</div>
						<div class="opacity-50 mt-1 mb-2">
							This message is sent to the comments. Friendly notify customer about your work.
							Clarify your specific concerns, if you have any.
						</div>
						<ContentEditable
							class="p-4 _bg-cta rounded mt-4"
							placeholder="Please review the work!"
							bind:value={newReview.messageHTML}
						/>

						<div class="mt-12 font-semibold">Deliverables</div>
						<div class="opacity-50 mt-1 mb-2">
							Add at least 1 file or URL. Customers approve your work based on the files that you've
							delivered.
						</div>
						{#each newReview.deliverables || [] as deliverable}
							<div class="flex items-center">
								<FileInput
									bind:url={deliverable.url}
									class="app-input w-full mb-2"
									theme={parentPage.theme?.theme}
								/>
								<div
									class="ml-2 opacity-70 hover:opacity-100 cursor-pointer"
									on:click={() => {
										newReview.deliverables = newReview.deliverables.filter(
											(d) => d !== deliverable
										);
										if (!newReview.deliverables.length) {
											newReview.deliverables = [{ url: '' }];
										}
									}}
								>
									<FeatherIcon size={20} name="trash-2" theme={parentPage.theme?.theme} />
								</div>
							</div>
						{/each}
						<button
							class="app-button _alternative mt-4"
							on:click={() => {
								newReview.deliverables = [{ url: '' }, ...newReview.deliverables];
							}}
							><FeatherIcon
								size={16}
								class="mr-2"
								name="paperclip"
								theme={parentPage.theme?.theme}
							/>Add Another Deliverable</button
						>

						<hr class="my-12 opacity-50" />

						<div class="flex items-center gap-4">
							<Button onClick={submitForReview} class="app-button">Submit For Review</Button>
							<button
								on:click={() => {
									isSubmittingForReviewInProgress = false;
								}}
								class="app-button _alternative ">Cancel Review</button
							>
						</div>
					{/if}
				</div>
			{/if}

			{#if isSubmissionEdit}
				{#if $isAuthorized}
					<div class="mt-8">
						<Button onClick={saveRequest} class="mt-4 app-button">Save Request</Button>
					</div>
				{:else}
					<div class="mt-16">
						<RenderCustomerLoginForm {page} onLogin={() => {}} />
					</div>
				{/if}
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
							{#if submission._id}
								<div
									class="p-2 _border-accent rounded hover:bg-accent transition"
									on:click={closeRequest}
								>
									Close Request
								</div>
							{:else}
								<div
									class="p-2 _border-accent rounded hover:bg-accent transition"
									on:click={() => {
										submission.page = null;
									}}
								>
									Choose Different Service
								</div>
							{/if}
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	{#if submission.isActivated || !submission.metadata?.activateAmount}
		{#if submission.metadata?.fullAmount && submission.isActivated && !submission.isPaid}{:else if submission.isClosed || submission.isPaid}
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

						<Button class="shrink-0 ml-4 app-button" onClick={submitFeedback}>Send Feedback</Button>
					</div>
				{:else}
					<div class="opacity-80 ">No Feedback</div>
				{/if}
			</div>
		{/if}
	{/if}

	{#if !isSubmissionEdit}
		<div class="text-sm opacity-70 mt-16">Comments (sent to email)</div>
		<div class="mt-8">
			<RenderServiceComments
				isCanSendMessage={!_.last(submission.reviews)?.isPending}
				class="w-full"
				bind:submission
				bind:page
			/>
		</div>
	{/if}
{:else}
	<div class="mt-4">
		<div class="font-semibold w-full text-center text-2xl mb-2 pt-8">Add New Request</div>
		<div class="w-full text-center mb-8 opacity-50 text-lg">
			Choose a service and fill your request
		</div>
		<div class="flex gap-8 justify-center flex-wrap">
			{#each $servicePages || [] as servicePage}
				<div
					class="_app-section text-left  mb-2 cursor-pointer  w-[300px] transition hover:translate-y-[-10px]"
					on:click={() => {
						submission.page = servicePage;
						submission.title = servicePage.name;

						submission.fields = (
							servicePage.proxyServicePage || servicePage
						).heros[0].formSection.items;
					}}
				>
					<div class="flex flex-col justify-between h-full">
						<div class="h-full">
							<div class="font-semibold">{servicePage.name}</div>

							<div class="opacity-60">
								{servicePage.heros[0].subtitle}
							</div>
							{#if servicePage.metadata?.coverImageUrl}
								<img
									class="mt-4 w-full h-auto object-cover aspect-image"
									src={servicePage.metadata.coverImageUrl}
								/>
							{/if}
						</div>

						<div style="justify-self: flex-end;">
							<div class="inline-flex items-center font-semibold mt-2 mb-2">
								<!-- <FeatherIcon size={14} name="tag" class="mr-1" theme={parentPage.theme?.theme} /> -->
								{#if servicePage.metadata?.fullAmount}
									{toDollars(servicePage.metadata.fullAmount)}
									<span class="ml-1 opacity-80" style="font-weight: normal;">
										/ {servicePage.metadata?.payPer}</span
									>
								{:else}
									Free 🔥
								{/if}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}

<script>
	import { get, post } from 'lib/api';
	import { fly } from 'svelte/transition';
	import currentCustomer, { isAuthorized, loginCustomer } from 'lib/stores/currentCustomer';
	import RenderSection from 'lib-render/components/render/Section.svelte';
	import trackForm from 'lib/services/trackForm';
	import submissions from 'lib/stores/submissions';
	import submissionsOutbound from 'lib/stores/submissionsOutbound';
	import Cookies from 'js-cookie';
	import toDollars from 'lib/helpers/toDollars';

	export let section;
	export let page;
	export let isEdit;
	export let isEmbed;
	export let handleSubmit = null;

	let formData = {};

	section.items.forEach((item) => {
		if (item.varName === 'email' || item.varName === 'name') {
			formData[item.id] = (section?.submission && section.submission[item.varName]) || '';
		} else {
			formData[item.id] =
				(section?.submission?.vars && section.submission.vars[item.varName]) || '';
		}
	});

	let isFormSubmitted = false;

	let isShowLoginCode = false;
	let loginCode = '';

	let loginCustomerForm = async () => {
		await loginCustomer({
			email: $currentCustomer.email,
			loginCode,
			page
		});
	};

	let submitForm = async () => {
		if (
			(section.isAuthRequired || section.actionType === 'service_chat') &&
			!$isAuthorized &&
			!loginCode
		) {
			if (!$currentCustomer.email) {
				return;
			}

			await post(`customers/auth/login-token?pageId=${page._id || page.parentPage?._id}`, {
				email: $currentCustomer.email
			});
			isShowLoginCode = true;
			return;
		}

		let postData = { vars: {}, sectionId: section.id, customer: $currentCustomer };

		section.items.forEach(({ id, title, varName, interactiveRenderType }) => {
			if (interactiveRenderType === 'email') {
				postData.email = $currentCustomer.email;
			} else if (interactiveRenderType === 'name') {
				postData.fullName = $currentCustomer.fullName;
			} else if (interactiveRenderType === 'description') {
				postData.description = formData.description;
				postData.title = postData.title || page.name;
			} else {
				postData.vars[varName || title] = formData[id];
			}
		});

		if (section.isAuthRequired && section.items.length === 1) {
			await loginCustomerForm();

			if (section.onSubmitted) {
				section.onSubmitted();
			}
		} else if (handleSubmit) {
			handleSubmit({ postData });
			isFormSubmitted = true;
		} else {
			if ((section.isAuthRequired || section.actionType === 'service_chat') && !$isAuthorized) {
				await loginCustomerForm();
			}

			trackForm({ sectionId: section.id, text: section.title || section.description });

			let submission = await post(
				`pages/${page._id || page.parentPage?._id}/submissions`,
				postData
			);

			$submissionsOutbound = [submission, ...$submissionsOutbound];

			if (submission.customer) {
				$currentCustomer = submission.customer;
			}

			if (section.actionType === 'url' && section.actionUrl) {
				window.location.href = section.actionUrl;
			}

			if (section.actionType === 'service_chat') {
				if (section.onSubmitted) {
					section.onSubmitted();
				} else {
					window.location.href = `/app/requests/${submission._id}`;
				}
			}
		}

		isFormSubmitted = true;
	};
</script>

{#if !isFormSubmitted}
	<div class="_section-item max-w-[600px] sm:min-w-[500px] w-full sm:mx-auto">
		<form class="w-full flex flex-col gap-8 p-8" on:submit|preventDefault={submitForm}>
			{#if isShowLoginCode}
				<div>
					<div class="mb-4">
						<div class="text-lg font-semibold opacity-80">Login Code</div>
						<div class="text-sm opacity-80 mb-3">
							Please insert the code that you've received to {$currentCustomer.email}.
							<span class="underline" on:click={() => (isShowLoginCode = false)}>Reset</span>
						</div>

						<input
							class="w-full _transparent"
							placeholder={'1312'}
							type="text"
							bind:value={loginCode}
						/>
					</div>

					<button class="_primary mt-8" type="submit">{section.callToActionText || 'Submit'}</button
					>
				</div>
			{:else}
				{#if section.items.length}
					{#each section.items.filter((formField) => {
						if (!isEdit && formField.interactiveRenderType === 'email' && $isAuthorized) {
							return false;
						}

						return true;
					}) as formField}
						<div>
							<div class="mb-4">
								<div class="text-lg font-semibold opacity-90">{@html formField.title}</div>
								<div class="text-sm opacity-60 mb-2">{@html formField.description || ''}</div>
							</div>

							{#if formField.interactiveRenderType === 'name'}
								{#if section.submission}
									<input
										class="w-full _transparent"
										type="text"
										disabled
										value={section.submission.fullName}
									/>
								{:else}
									<input
										class="w-full _transparent"
										placeholder={formField.interactivePlaceholder || 'Paul Graham'}
										type="text"
										bind:value={$currentCustomer.fullName}
									/>
								{/if}
							{:else if formField.interactiveRenderType === 'description'}
								<textarea
									class="w-full _transparent"
									placeholder={formField.interactivePlaceholder || 'Type your message...'}
									bind:value={formData.description}
								/>
							{:else if formField.interactiveRenderType === 'text'}
								<input
									class="w-full _transparent"
									placeholder={formField.interactivePlaceholder || 'Type your message...'}
									type="text"
									bind:value={formData[formField.id]}
								/>
							{:else if formField.interactiveRenderType === 'url'}
								<input
									class="w-full _transparent"
									placeholder={formField.interactivePlaceholder || 'https://www.mywebsite.com'}
									type="url"
									bind:value={formData[formField.id]}
								/>
							{:else if formField.interactiveRenderType === 'textarea'}
								<textarea
									class="w-full _transparent"
									placeholder={formField.interactivePlaceholder || 'Type your message...'}
									bind:value={formData[formField.id]}
								/>
							{:else if formField.interactiveRenderType === 'email'}
								{#if section.submission}
									<input
										class="w-full _transparent"
										type="email"
										disabled
										value={section.submission.email}
									/>
								{:else}
									<input
										class="w-full _transparent"
										type="email"
										placeholder={formField.interactivePlaceholder || 'my@email.com'}
										bind:value={$currentCustomer.email}
									/>
								{/if}
							{/if}
						</div>
					{/each}
				{:else if section.submission && section.submission.email}
					<input
						class="w-full _transparent"
						type="email"
						disabled
						bind:value={section.submission.email}
					/>
				{/if}

				{#if !section.submission}
					<div class="w-full">
						<button class="w-full _primary mt-4" type="submit"
							>{section.callToActionText || 'Submit'}</button
						>

						<div class="text-sm w-full text-center mt-3">
							Price: <span class="font-semibold"
								>{page.metadata?.fullAmount ? toDollars(page.metadata.fullAmount) : 'Free'}</span
							>

							{#if page.metadata.payType === 'prepayment'}
								<div class="opacity-70">
									Pay {toDollars(page.metadata.activateAmount)} to activate
								</div>
							{/if}
						</div>
					</div>
				{/if}
			{/if}
		</form>
	</div>
{/if}

{#if !section.submission}
	{#if section.ctaExplainer && !isFormSubmitted}
		<div class="text-sm mt-2 w-full text-center">{section.ctaExplainer}</div>
	{/if}
{/if}

{#if isEdit && section.actionType === 'success'}
	<div class="text-center py-2 text-black my-32 bg-green-100 w-full">
		On form submitted, show this message:
	</div>
{/if}

{#if section.actionType === 'service_chat'}
	<div class="text-sm mt-4 w-full text-center">
		Once submitted you'll be redirected to the <a class="underline" href="/app/requests"
			>requests board</a
		>
	</div>
{/if}

{#if section.actionSuccessSection && ((isEdit && section.actionType === 'success') || isFormSubmitted)}
	<div in:fly={{ y: 50, duration: 150 }}>
		<RenderSection section={section.actionSuccessSection} {page} />
	</div>
{/if}

<style>
	input,
	textarea {
		border: 1px var(--text-color) solid;
		opacity: 0.8;
	}

	input:focus,
	textarea:focus {
		opacity: 100;
	}
</style>

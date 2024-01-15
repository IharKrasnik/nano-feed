<script>
	import { get, post } from 'lib/api';
	import { fly } from 'svelte/transition';
	import currentCustomer from 'lib/stores/currentCustomer';
	import RenderSection from 'lib-render/components/render/Section.svelte';
	import trackForm from 'lib/services/trackForm';
	import submissions from 'lib/stores/submissions';
	import submissionsOutbound from 'lib/stores/submissionsOutbound';
	import Cookies from 'js-cookie';

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

	let submitForm = async () => {
		let postData = { vars: {}, sectionId: section.id, customer: $currentCustomer };

		section.items.forEach(({ id, title, varName, interactiveRenderType }) => {
			if (interactiveRenderType === 'email') {
				postData.email = $currentCustomer.email;
			} else {
				postData.vars[varName || title] = formData[id];
			}
		});

		if (handleSubmit) {
			await handleSubmit({ postData });
		} else {
			trackForm({ sectionId: section.id, text: section.title || section.description });

			if (!$currentCustomer._id) {
				let { customer, token } = await post(`customers/auth?pageId=${page._id}`, {
					email: postData.email,
					pageId: page._id
				});
				$currentCustomer = customer;
				Cookies.set('customer_access_token', token);
			}

			let submission = await post(`pages/${page._id}/submissions`, postData);

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
					window.location.href = `/service-requests/${submission._id}`;
				}
			}
		}

		isFormSubmitted = true;
	};
</script>

{#if !isFormSubmitted}
	<div class="_section-item max-w-[600px] sm:min-w-[500px] w-full sm:mx-auto">
		<form class="w-full flex flex-col gap-4 p-8" on:submit|preventDefault={submitForm}>
			{#if section.items.length}
				{#each section.items as formField}
					<div>
						<div class="mb-4">
							<div class="text-lg font-semibold opacity-80">{@html formField.title}</div>
							<div class="text-sm opacity-80 mb-2">{@html formField.description || ''}</div>
						</div>

						{#if formField.interactiveRenderType === 'text'}
							{#if formField.varName === 'name'}
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
							{:else}
								<input
									class="w-full _transparent"
									placeholder={formField.interactivePlaceholder || 'Type your message...'}
									type="text"
									bind:value={formData[formField.id]}
								/>
							{/if}
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
				<button class="_primary mt-8" type="submit">{section.callToActionText || 'Submit'}</button>
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
	<div class="text-sm mt-4 w-full text-center">Once submitted you'll be redirected to the chat</div>
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

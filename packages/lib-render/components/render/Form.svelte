<script>
	import { post } from 'lib/api';
	import { fly } from 'svelte/transition';
	import currentCustomer from 'lib/stores/currentCustomer';
	import RenderSection from 'lib-render/components/render/Section.svelte';
	import trackForm from 'lib/services/trackForm';

	export let section;
	export let page;
	export let isEdit;

	let formData = {};

	section.items.forEach((item) => {
		if (item.varName === 'email' || item.varName === 'name') {
			formData[item.varName] = (section?.submission && section.submission[item.varName]) || '';
		} else {
			formData[item.varName] =
				(section?.submission?.vars && section.submission.vars[item.varName]) || '';
		}
	});

	let isFormSubmitted = false;

	let submitForm = async () => {
		let postData = { vars: {}, sectionId: section.id };

		section.items.forEach(({ varName, interactiveRenderType }) => {
			if (interactiveRenderType === 'email') {
				postData.email = $currentCustomer.email;
			} else if (varName) {
				if (varName === 'name') {
					postData[varName] = $currentCustomer[varName];
				} else {
					postData.vars[varName] = formData[varName];
				}
			}
		});

		trackForm({ sectionId: section.id, text: section.title || section.description });

		let submission = await post(`pages/${page._id}/submissions`, postData);

		if (submission.customer) {
			$currentCustomer = submission.customer;
		}

		if (section.actionType === 'url' && section.actionUrl) {
			window.location.href = section.actionUrl;
		}

		if (section.actionType === 'service_chat') {
			window.location.href = `/service-requests/${submission._id}`;
		}

		isFormSubmitted = true;
	};
</script>

{#if !isFormSubmitted}
	<div class="_section-item max-w-[500px]  w-full mx-auto">
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
										value={section.submission.name}
									/>
								{:else}
									<input
										class="w-full _transparent"
										placeholder={formField.interactivePlaceholder || 'Paul Graham'}
										type="text"
										bind:value={$currentCustomer.name}
									/>
								{/if}
							{:else}
								<input
									class="w-full _transparent"
									placeholder={formField.interactivePlaceholder || 'Type your message...'}
									type="text"
									bind:value={formData[formField.varName]}
								/>
							{/if}
						{:else if formField.interactiveRenderType === 'textarea'}
							<textarea
								class="w-full _transparent"
								placeholder={formField.interactivePlaceholder || 'Type your message...'}
								bind:value={formData[formField.varName]}
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

<script>
	import { post } from 'lib/api';
	import { fly } from 'svelte/transition';
	import currentCustomer from 'lib/stores/currentCustomer';
	import RenderSection from '$lib/components/render/Section.svelte';
	import trackForm from 'lib/services/trackForm';

	export let section;
	export let page;
	export let isEdit;

	let formData = {};

	section.items.forEach((item) => {
		formData[item.varName] = '';
	});

	let isFormSubmitted = false;

	let submitForm = async () => {
		let postData = { vars: {} };

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

		trackForm({ sectionId: section.id });

		let submission = await post(`pages/${page.slug}/submissions`, postData);

		if (submission.customer) {
			$currentCustomer = submission.customer;
		}

		if (section.actionType === 'url' && section.actionUrl) {
			window.location.href = section.actionUrl;
		}

		isFormSubmitted = true;
	};
</script>

{#if !isFormSubmitted}
	<div class="_section-item max-w-[500px]  w-full mx-auto">
		<form class="w-full flex flex-col gap-4 p-8" on:submit|preventDefault={submitForm}>
			{#each section.items as formField}
				<div>
					<div class="mb-2">
						<div class="text-lg font-semibold opacity-80">{@html formField.title}</div>
						<div class="text-sm opacity-80 mb-2">{@html formField.description || ''}</div>
					</div>

					{#if formField.interactiveRenderType === 'text'}
						{#if formField.varName === 'name'}
							<input
								class="w-full _transparent"
								placeholder={formField.interactivePlaceholder || 'Paul Graham'}
								type="text"
								bind:value={$currentCustomer.name}
							/>
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
						<input
							class="w-full _transparent"
							type="email"
							placeholder={formField.interactivePlaceholder || 'my@email.com'}
							bind:value={$currentCustomer.email}
						/>
					{/if}
				</div>
			{/each}

			<button class="_primary mt-8" type="submit">{section.callToActionText || 'Submit'}</button>
		</form>
	</div>
{/if}

{#if section.ctaExplainer && !isFormSubmitted}
	<div class="text-sm mt-2 w-full text-center">{section.ctaExplainer}</div>
{/if}

{#if isEdit && section.actionType === 'success'}
	<div class="text-center py-2 text-black my-32 bg-green-100 w-full">
		On form submitted, show this message:
	</div>
{/if}

{#if section.actionSuccessSection && (isEdit || isFormSubmitted)}
	<div in:fly={{ y: 50, duration: 150 }}>
		<RenderSection section={section.actionSuccessSection} {page} />
	</div>
{/if}

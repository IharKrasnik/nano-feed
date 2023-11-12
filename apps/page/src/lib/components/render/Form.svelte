<script>
	import { post } from 'lib/api';
	import currentCustomer from 'lib/stores/currentCustomer';

	export let section;
	export let page;

	let formData = {};

	section.items.forEach((item) => {
		formData[item.varName] = '';
	});

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

		let submission = await post(`pages/${page.slug}/submissions`, postData);

		if (submission.customer) {
			$currentCustomer = submission.customer;
		}
	};
</script>

<div class="_section-item max-w-[500px]  w-full mx-auto">
	<form class="w-full flex flex-col gap-4 p-8" on:submit={submitForm}>
		{#each section.items as formField}
			<div>
				<div class="mb-2">
					<div class="text-lg font-semibold opacity-80">{@html formField.title}</div>
					<div class="text-sm opacity-80 mb-2">{@html formField.description || ''}</div>
				</div>

				{#if formField.interactiveRenderType === 'text'}
					{#if formField.varName === 'name'}
						<input class="w-full _transparent" type="text" bind:value={$currentCustomer.name} />
					{:else}
						<input
							class="w-full _transparent"
							type="text"
							bind:value={formData[formField.varName]}
						/>
					{/if}
				{:else if formField.interactiveRenderType === 'textarea'}
					<textarea
						class="w-full _transparent"
						placeholder=""
						bind:value={formData[formField.varName]}
					/>
				{:else if formField.interactiveRenderType === 'email'}
					<input
						class="w-full _transparent"
						type="email"
						placeholder="my@email.com"
						bind:value={$currentCustomer.email}
					/>
				{/if}
			</div>
		{/each}

		<button class="_primary mt-8" type="submit">Submit</button>
	</form>
</div>

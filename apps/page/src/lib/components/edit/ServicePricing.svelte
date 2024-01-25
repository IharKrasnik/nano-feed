<script>
	import _ from 'lodash';
	import ToggleGroup from '$lib/components/ToggleGroup.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import DollarInput from 'lib/components/DollarInput.svelte';
	import toDollars from 'lib/helpers/toDollars';

	export let page;

	export let isExpanded = false;

	if (!page.metadata) {
		page.metadata = {};
	}
</script>

<div class="flex w-full items-center justify-between mt-12 mb-8">
	<div class="font-bold text-lg">Pricing & Offer</div>

	{#if isExpanded}
		<div
			class="flex items-center opacity-50 hover:opacity-100 cursor-pointer"
			on:click={() => (isExpanded = false)}
		>
			<FeatherIcon class="mr-2" size="15" name="eye-off" /> Collapse
		</div>
	{/if}
</div>

{#if isExpanded}
	<div class="_section">
		<ToggleGroup
			class="mb-4"
			tabs={[
				{ key: false, name: '👏 Free' },
				{ key: true, name: '💰 Paid' }
			]}
			bind:value={page.metadata.isPaidService}
		/>

		{#if page.metadata.isPaidService}
			<div class="_info _section">Your service is paid.</div>

			<div class="_section">
				<div class="mb-2 font-bold">Service Price</div>
				<div class="flex items-center">
					<DollarInput
						class="mr-2"
						style="min-width: 100px;"
						bind:value={page.metadata.fullAmount}
						placeholder="99.99"
					/>

					<select class="shrink-0" bind:value={page.metadata.payPer}>
						<option value="one-time">One-Time</option>
						<option value="week">Week</option>
						<option value="month">Month</option>
					</select>
				</div>

				{#if page.metadata.payPer === 'one-time'}
					<div class="mb-2 font-bold mt-4">Payment Link</div>
				{:else}
					<div class="mb-2 font-bold mt-4">Subscription Link</div>
				{/if}

				<input
					class="mr-2 w-full "
					type="text"
					bind:value={page.metadata.completionLink}
					placeholder="https://buy.stripe.com/9AQ5mT89BdYKdHi8ww"
				/>
			</div>

			{#if page.metadata.payPer === 'one-time'}
				<div class="_section  mt-4">
					<div class="mb-2 font-bold">When to charge?</div>
					<ToggleGroup
						class="mb-4"
						tabs={[
							{ key: 'on-activation', name: 'Once Submitted' },
							{ key: 'on-completion', name: 'On Delivery' },
							{ key: 'prepayment', name: 'Pre-Payment' }
						]}
						bind:value={page.metadata.payType}
					/>
					<div class="_info _section">
						{#if page.metadata.payType === 'on-activation'}
							Customers will see "Activate" button that will open your Payment Link.
						{:else if page.metadata.payType === 'on-completion'}
							Customers are not required to pay to activate the request. You will "Activate"
							requests manually to filter good fits. Customers will see "Complete" button that will
							open your Payment Link.
						{:else if page.metadata.payType === 'prepayment'}
							Customers will see "Activate" button that will open your Activation Link. Once you
							deliver your work Customer will see "Complete" button that will open your Payment
							Link.
						{/if}
					</div>
				</div>
			{:else}
				<div class="_info _section">
					Customers will see "Activate" button that will open your Subscription Link.
				</div>
			{/if}

			{#if page.metadata.payPer === 'one-time' && page.metadata.payType === 'prepayment'}
				<div class="_section mt-8">
					<div class="mb-2 font-bold">Activation Price</div>
					<div class="flex items-center">
						<DollarInput
							class="mr-2"
							bind:value={page.metadata.activateAmount}
							placeholder="9.99"
						/>
					</div>

					<div class="mb-2 font-bold mt-4">Activation Link</div>
					<input
						class="mr-2 w-full "
						type="text"
						bind:value={page.metadata.activationLink}
						placeholder="https://buy.stripe.com/9AQ5mT89BdYKdHi8ww"
					/>
				</div>
			{/if}
		{:else}
			<div class="_info _section">
				Your service is free. Customers submit requests and you use "Activate" and "Complete"
				buttons to update the status.
			</div>
		{/if}

		{#if !page.metadata?.isPaidService || page.metadata.payPer === 'one-time'}
			<div class="_section">
				<div class="flex justify-between">
					<div class="mb-1 font-bold">Revisions</div>
				</div>
				<div class="mb-4 text-sm opacity-80">
					Limit the number of reviews of your work to align expectations with customers
				</div>
				<ToggleGroup
					class="mb-4"
					tabs={[
						{ key: 0, name: 'No Limit' },
						{ key: 1, name: '1' },
						{ key: 2, name: '2' }
					]}
					bind:value={page.metadata.revisionsCount}
				/>
			</div>
		{/if}
	</div>
{:else}
	<div
		class="_section cursor-pointer"
		on:click={() => {
			return (isExpanded = true);
		}}
	>
		<div>
			{#if page.metadata?.isPaidService}
				<div class="flex items-center">
					<div class="font-bold mr-2">
						{toDollars(page.metadata?.fullAmount) || 'Free'}
					</div>
					/

					<div class="opacity-80 ml-2">
						{#if page.metadata.payPer === 'one-time'}
							One-Time
						{:else}
							{_.capitalize(page.metadata.payPer)}
						{/if}
					</div>
				</div>
			{:else}
				<div class="font-bold mr-2">Free</div>
			{/if}
		</div>

		{page.metadata.revisionsCount
			? page.metadata.revisionsCount === 1
				? '1 revision'
				: `${page.metadata.revisionsCount} revisions`
			: 'Unlimited Revisions'}
	</div>
{/if}

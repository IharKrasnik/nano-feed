<script>
	import moment from 'moment';
	import { get, post, put, del } from 'lib/api';
	import { fade } from 'svelte/transition';
	import { countryCodeEmoji } from 'country-code-emoji';
	import Button from 'lib/components/Button.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';

	export let page;
	export let selectedCustomer;

	let customers = [];

	let loadCustomers = async () => {
		let customerResult = await get(`customers`, { pageId: page.parentPage?._id || page._id });

		customers = customerResult.results.map((c) => {
			c.isCollapsed = true;
			return c;
		});
	};

	loadCustomers();

	let saveCustomer = async (customer) => {
		let updatedCustomer = await put(
			`customers/${customer._id}?pageId=${page.parentPage?._id || page._id}`,
			customer
		);

		customers = customers.map((c) => {
			if (c._id === updatedCustomer._id) {
				updatedCustomer.isCollapsed = true;
				return updatedCustomer;
			}
			return c;
		});

		selectedCustomer = null;
	};
</script>

{#each customers as customer}
	{#if customer.isCollapsed}
		<div
			class="_section cursor-pointer"
			on:click={() => {
				customers = customers.map((c) => {
					c.isCollapsed = true;
					if (c._id === customer._id) {
						c.isCollapsed = false;
					}
					return c;
				});

				selectedCustomer = customer;
			}}
		>
			<div class=" flex justify-between items-center">
				{#if customer.name}
					<div class="flex items-center">
						{customer.name}
						<div class="ml-2 opacity-50">({customer.email})</div>
					</div>
				{:else}
					{customer.email || 'anonymous'}
				{/if}

				<div class="flex gap-2 items-center">
					{#if customer?.visitor?.payload?.deviceType}
						{#if customer.visitor.payload.deviceType === 'desktop'}
							<FeatherIcon theme="light" size="15" name="monitor" />
						{:else}
							<FeatherIcon theme="light" size="15" name="smartphone" />
						{/if}
					{/if}
					{#if customer?.visitor?.geoData?.country}
						{countryCodeEmoji(customer?.visitor?.geoData?.country)}
					{/if}
				</div>
			</div>
			<div class="text-sm mt-2">
				{moment(customer.createdOn).format('MMM DD')}
			</div>
		</div>
	{:else}
		<div class="_section flex flex-col gap-2" in:fade={{ duration: 150 }}>
			{#if customer.email}
				<input class="w-full" bind:value={customer.email} disabled />
				<input class="w-full" placeholder="Name" bind:value={customer.name} />
			{:else}
				<div class="flex justify-between items-center">
					Anonymous Visitor
					<div class="flex gap-2 items-center">
						{#if customer?.visitor?.payload?.deviceType}
							{#if customer.visitor.payload.deviceType === 'desktop'}
								<FeatherIcon theme="light" size="15" name="monitor" />
							{:else}
								<FeatherIcon theme="light" size="15" name="smartphone" />
							{/if}
						{/if}
						{#if customer?.visitor?.geoData?.country}
							{countryCodeEmoji(customer?.visitor?.geoData?.country)}
						{/if}
					</div>
				</div>
			{/if}
			<textarea rows="2" class="w-full" placeholder="Notes..." bind:value={customer.notes} />

			<Button class="_small _primary mt-4 block" onClick={() => saveCustomer(customer)}
				>💾 Save Customer</Button
			>
		</div>
	{/if}
{/each}

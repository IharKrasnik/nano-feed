<script>
	import moment from 'moment';
	import { get, post, put, del } from 'lib/api';
	import { fade } from 'svelte/transition';
	import { countryCodeEmoji } from 'country-code-emoji';
	import Button from 'lib/components/Button.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import ToggleGroup from '$lib/components/ToggleGroup.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import FileInput from 'lib/components/FileInput.svelte';

	export let customer;
	export let saveCustomer;
	export let removeCustomer;
	export let isCollapsed = false;
	export let onSelected = () => {};
</script>

{#if customer._id && isCollapsed}
	<div
		class="_section cursor-pointer"
		on:click={() => {
			onSelected();
		}}
	>
		<div class="flex items-center">
			{#if customer.avatarUrl}
				<img
					src={customer.avatarUrl || defaultAvatarUrl}
					class="w-[30px] h-[30px] rounded-full border"
				/>
			{:else}
				<div class="w-[30px] h-[30px] rounded-full border flex items-center justify-center">
					{(customer.name || customer.email || '')[0] || ''}
				</div>
			{/if}
			<div class="flex justify-between w-full items-center ml-2">
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
		</div>
		<div class="text-sm mt-2 opacity-50">
			{moment(customer.createdOn).format('MMM DD HH:mm')}
		</div>
	</div>
{:else}
	<div class="_section flex flex-col gap-2" in:fade={{ duration: 150 }}>
		{#if !customer._id}
			<div class="flex justify-between">
				<div />
				{#if removeCustomer}
					<div on:click={removeCustomer}>🗑</div>
				{/if}
			</div>
		{/if}

		{#if !customer._id || customer.email}
			<input class="w-full" placeholder="email@address.com" bind:value={customer.email} />

			{#if !customer._id}
				<div class="mb-2">
					<input class="text-sm" type="checkbox" bind:checked={customer.isTrigger} /> Should Run Triggers
				</div>
			{/if}

			<input class="w-full" placeholder="John Doe" bind:value={customer.fullName} />
			<FileInput class="w-full" placeholder="User Avatar Url" bind:url={customer.avatarUrl} />
		{/if}

		{#if customer._id && !customer.email}
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

		<input class="w-full" placeholder="Tag1, Tag2" bind:value={customer.tagsStr} />

		{#if saveCustomer}
			<Button
				class="_small _primary mt-4 block"
				onClick={() => {
					saveCustomer(customer);
				}}>💾 Save Customer</Button
			>
		{/if}
	</div>
{/if}

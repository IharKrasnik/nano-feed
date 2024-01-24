<script>
	import _ from 'lodash';
	import { put } from 'lib/api';
	import { page as sveltePage } from '$app/stores';
	import RenderSection from 'lib-render/components/render/Section.svelte';
	import RenderCustomerLoginForm from 'lib-render/components/render/CustomerLoginForm.svelte';
	import currentCustomer, { isAuthorized } from 'lib/stores/currentCustomer';
	import RenderForm from 'lib-render/components/render/Form.svelte';
	import FileInput from 'lib/components/FileInput.svelte';
	import { showSuccessMessage } from 'lib/services/toast';

	export let page;

	let customerEditData = _.pick($currentCustomer, ['fullName', 'avatarUrl', 'email']);

	let refreshCurrentCustomer = async () => {
		$currentCustomer = await put(`customers/current?pageId=${page.parentPage._id}`);
	};

	if ($isAuthorized) {
		refreshCurrentCustomer();
	}

	let updateProfile = async () => {
		let updatedCustomer = await put('customers/current', customerEditData);
		$currentCustomer = updatedCustomer;
		showSuccessMessage('Profile was updated');
	};
</script>

<div class="py-[100px]">
	<div class="mb-[200px]">
		<RenderSection {page} section={{ id: 'profile', title: 'Edit Profile' }} />

		{#if $isAuthorized}
			<div class="_section-item max-w-[500px] mx-auto">
				<div class="flex justify-center w-full px-8 py-16 w-full">
					<form class="w-full" on:submit|preventDefault={updateProfile}>
						<div class="font-bold pb-2">Full Name</div>
						<input
							class="_transparent w-full"
							placeholder="John Doe"
							type="text"
							bind:value={customerEditData.fullName}
						/>

						<div class="font-bold pb-2 mt-8">Avatar</div>
						<FileInput
							class="_transparent file-input w-full rounded"
							previewClass="rounded-full"
							bind:url={customerEditData.avatarUrl}
						/>

						<div class="font-bold pb-2 mt-8">Email</div>
						<input
							class="_transparent w-full"
							placeholder="John Doe"
							type="text"
							disabled
							bind:value={customerEditData.email}
						/>

						<hr class="opacity-50 my-16" />

						<button class="w-full" type="submit">Update Profile</button>
					</form>
				</div>
			</div>
		{:else}
			<div>
				<RenderCustomerLoginForm {page} onLogin={() => {}} />
			</div>
		{/if}
	</div>
</div>

<style>
	input,
	textarea,
	:global(.file-input) {
		border: 1px var(--text-color) solid;
		opacity: 0.8;
	}

	input:focus,
	textarea:focus,
	:global(.file-input):focus {
		opacity: 100;
	}
</style>

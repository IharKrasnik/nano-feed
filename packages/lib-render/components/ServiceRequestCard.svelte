<script>
	import moment from 'moment';
	import striptags from 'striptags';
	import formatSubmission from 'lib-render/helpers/formatSubmission';
	export let submission;
	import selectedSubmission from 'lib-render/stores/selectedSubmission';
	import CustomerAvatar from 'lib-render/components/CustomerAvatar.svelte';
	import ServiceRequestStatus from 'lib-render/components/ServiceRequestStatus.svelte';
	import currentUser from 'lib/stores/currentUser';

	export let onClick = () => {
		$selectedSubmission = submission;
	};
</script>

<div
	class="p-4 bg-theme rounded mb-2 cursor-pointer _border-theme hover:opacity-80 max-w-[300px]"
	on:click={onClick}
>
	<div class="truncate text-sm font-semibold">
		{formatSubmission(submission)}
	</div>

	{#if submission.description}
		<div class="truncate text-sm mb-2 mt-1 opacity-80">
			{@html striptags(submission.description)}
		</div>
	{/if}

	<ServiceRequestStatus
		sizeClass="text-xs p-1 rounded"
		class="inline-flex my-2"
		{submission}
		size="sm"
	/>

	{#if submission.chatRoom}
		<div class="_bg-cta p-3 rounded-lg mt-2 text-sm">
			{@html striptags(submission.chatRoom.lastMessageHTML || '')}

			<div class="text-sm mt-1">
				{moment(submission.chatRoom.lastMessageSentOn).fromNow()}
			</div>
		</div>
	{/if}
	<div class="text-sm mb-1 mt-2 opacity-80">
		{moment(submission.createdOn).fromNow()}
	</div>
	{#if $currentUser}
		<div class="flex text-sm items-center mt-4">
			<CustomerAvatar
				isRandomBorderColor
				size={20}
				class="mr-2 shrink-0"
				bind:customer={submission.customer}
			/>
			{submission.customer.fullName || submission.customer.email || 'Anonymous'}
		</div>
	{/if}
</div>

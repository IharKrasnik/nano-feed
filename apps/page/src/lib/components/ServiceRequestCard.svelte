<script>
	import moment from 'moment';
	import striptags from 'striptags';
	import formatSubmission from '$lib/helpers/formatSubmission';
	export let submission;
	import selectedSubmission from '$lib/stores/selectedSubmission';
	import CustomerAvatar from 'lib-render/components/CustomerAvatar.svelte';

	export let onClick = () => {
		$selectedSubmission = submission;
	};
</script>

<div class="p-4 bg-white rounded mb-2 cursor-pointer" on:click={onClick}>
	<div class="truncate">
		{formatSubmission(submission)}
	</div>

	{#if submission.chatRoom}
		<div class="bg-gray-300 p-4 rounded-lg mt-2">
			{@html striptags(submission.chatRoom.lastMessageHTML || '')}
			<div class="text-sm">
				{moment(submission.chatRoom.lastMessageSentOn).fromNow()}
			</div>
		</div>
	{/if}

	<div class="flex text-sm items-center mt-4">
		<CustomerAvatar class="mr-2 shrink-0" size={30} bind:customer={submission.customer} />
		{submission.customer.fullName || submission.customer.email}
	</div>
</div>

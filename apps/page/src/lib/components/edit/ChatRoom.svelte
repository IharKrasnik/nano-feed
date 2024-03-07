<script>
	import moment from 'moment';
	import striptags from 'striptags';
	export let chatRoom;

	export let openChatRoom = () => {};
	export let isActive;
</script>

<div
	class="my-4 _section p-4 truncate overflow-hidden cursor-pointer"
	class:_active={isActive}
	on:click={openChatRoom}
>
	{@html striptags(chatRoom.lastMessageHTML || '')}

	<div class="flex justify-between items-center mt-4 text-sm opacity-80">
		{moment(chatRoom.lastMessageSentOn).format('MMM DD, HH:mm')}

		<div class="text-sm" class:text-orange-700={!chatRoom.customers}>
			{chatRoom.customers ? chatRoom.customers[0]?.email || '' : 'chat with yourself'}
		</div>
	</div>
</div>

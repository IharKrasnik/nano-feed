<script>
	import _ from 'lodash';
	import moment from 'moment';
	import currentUser from 'lib/stores/currentUser';
	import { get, post } from 'lib/api';

	export let page;
	export let chatRoom;

	let parentPage = page.parentPage || page;

	let chatEl;

	let newMessage = {
		messageHTML: ''
	};

	let messages = [];

	const scrollToBottom = (node = chatEl) => {
		const scroll = () =>
			node.scroll({
				top: node.scrollHeight
			});
		scroll();

		return { update: scroll };
	};

	let loadMessages = async () => {
		let messagesResults = await get('customerMessages', {
			pageId: parentPage._id,
			chatRoomId: chatRoom._id
		});

		messages = _.reverse(messagesResults.results);

		setTimeout(() => {
			scrollToBottom(chatEl);
		}, 0);
	};

	let sendMessage = async () => {
		messages = [...messages, newMessage];
		let toCreate = newMessage;

		newMessage = { messageHTML: '', attachments: [] };

		let createdMessage = await post(`customerMessages?pageId=${parentPage._id}`, {
			...toCreate,
			chatRoomId: chatRoom._id
		});

		messages = [...messages.filter((m) => m._id), createdMessage];
	};

	$: if (chatRoom) {
		loadMessages();
	} else {
		messages = [];
	}
</script>

{#if chatRoom.customers}
	{#if chatRoom.customers?.length}
		<div class="max-w-[900px] mx-auto mb-4">
			<div class="text-lg mb-2 font-bold opacity-80">Chat with customer</div>

			<div>
				{chatRoom.customers[0].email || 'anonymous'}
			</div>
		</div>
	{:else}{/if}
{:else}
	<div class=" max-w-[900px] mx-auto mb-4">
		<div class="text-lg mb-2 font-bold opacity-80">Chat with yourself</div>

		<div>
			Use it to see how messaging work. Messages will be sent to your email ({$currentUser.email})
		</div>
	</div>
{/if}

<div class="flex flex-col flex-1 h-full justify-between max-w-[900px] mx-auto _section-item">
	<div
		class="h-full min-h-[400px] max-h-[600px] overflow-y-scroll justify-end p-8"
		bind:this={chatEl}
	>
		{#each messages as message}
			<div
				class="message mt-4 mb-2 p-4 rounded-lg _border-theme"
				class:my={message.customer}
				class:their={message.user}
			>
				<div class="content">
					{@html message.messageHTML || ''}
				</div>
			</div>
			<div class="mt-2 text-sm">
				{moment(message.createdOn).format('MMM DD, HH:mm')}
			</div>
		{/each}
	</div>

	<div>
		<div class="w-full flex gap-4 items-center justify-between _border-theme">
			<textarea
				class="w-full"
				placeholder="Your Message {chatRoom.customers
					? chatRoom.customers?.length > 0
						? `(will be sent to ${chatRoom.customers[0].email})`
						: ''
					: `will be sent to your ${$currentUser.email}`}"
				bind:value={newMessage.messageHTML}
			/>
			<button
				disabled={!newMessage.messageHTML}
				on:click={sendMessage}
				class="_primary _small shrink-0">Send Email</button
			>
		</div>
	</div>
</div>

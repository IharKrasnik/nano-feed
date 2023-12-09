<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { get, post, put } from 'lib/api';

	import Loader from 'lib/components/Loader.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import currentUser from 'lib/stores/currentUser';
	import getPageCssStyles from '$lib/services/getPageCssStyles';

	export let page;
	export let trigger;
	export let chatRoom;

	let newMessage = {
		messageHTML: ''
	};

	let cssVarStyles;
	let styles;

	$: if (page) {
		let res = getPageCssStyles(page);
		cssVarStyles = res.cssVarStyles;
		styles = res.styles;
	}

	let messages = [];

	let chatEl;

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
			pageId: page._id,
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

		let createdMessage = await post(`customerMessages?pageId=${page.parent?._id || page._id}`, {
			...toCreate,
			chatRoom: { _id: chatRoom._id }
		});

		messages = [...messages.filter((m) => m._id), createdMessage];
	};

	$: if (chatRoom) {
		loadMessages();
	} else {
		messages = [];
	}
</script>

<div class="px-8 py-16 bg-background overflow-y-auto" style={cssVarStyles}>
	{#if trigger}
		{#key trigger._id}
			<div class="flex flex-col items-center">
				<div class="text-2xl font-bold">
					When a user submits a {trigger.on.includes('email') ? 'email' : 'form'}..
				</div>

				<div class="relative my-4 h-[50px]">
					<div class="absolute left-[50%] border-r border-black/50 h-full" />
				</div>

				{#each trigger.actionSequence as triggerAction}
					<div class="w-full">
						<div class="text-xl font-bold  text-center">
							{trigger.inMinutes ? `In ${trigger.inMinutes} minutes` : 'Immediately'} send them message
						</div>

						<div class="border p-8 w-full max-w-[800px] mx-auto mt-8">
							<div>
								<span class="font-semibold">
									{$currentUser.fullName.split(' ')[0] || ''} from {page.parentPage?.name ||
										page.name}
								</span>
								<span class="opacity-80">(info@mmntm.build)</span>
							</div>
							<div class="text-lg mt-2 font-bold">{triggerAction.data.subject}</div>
							<hr class="_border-theme my-4" />
							<div class="mt-2">
								{@html triggerAction.data.messageHTML}
							</div>
							{#if triggerAction.data.imageUrl}
								<RenderUrl class="mt-2 rounded-lg" url={triggerAction.data.imageUrl} />
							{/if}

							{#if triggerAction.data.callToActionText}
								<div class="cursor-pointer bg-black text-white inline-block rounded px-8 py-2 mt-8">
									{triggerAction.data.callToActionText}
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/key}
	{:else if chatRoom}
		{#if chatRoom.customers}
			<div class="max-w-[900px] mx-auto mb-4">
				<div class="text-lg mb-2 font-bold opacity-80">Chat with customer</div>

				<div>
					{chatRoom.customers[0].email || 'anonymous'}
				</div>
			</div>
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
						class="message my-4  mb-8 p-4 rounded-lg _border-theme"
						class:my={message.customer}
						class:their={message.user}
					>
						<div class="content">
							{@html message.messageHTML || ''}
						</div>
						<div class="mt-2 text-sm">
							{moment(message.createdOn).format('MMM DD, HH:mm')}
						</div>
					</div>
				{/each}
			</div>

			<div>
				<div class="w-full flex gap-4 items-center justify-between _border-theme">
					<textarea
						class="w-full"
						placeholder="Your Message {chatRoom.customers
							? `(will be sent to ${chatRoom.customers[0].email})`
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
	{:else}
		<div class="" in:fly={{ y: 50, duration: 150 }} style="height: calc(100vh - 60px);">
			Messaging
		</div>
	{/if}
</div>

<style>
</style>

<script>
	import _ from 'lodash';
	let clazz = 'max-w-[600px] mx-auto';
	export { clazz as class };
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import getPageCssStyles from 'lib-render/services/getPageCssStyles';
	import { get, post, put } from 'lib/api';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import currentUser from 'lib/stores/currentUser';
	import currentCustomer from 'lib/stores/currentCustomer';
	import submissions from 'lib/stores/submissions';
	import submissionsOutbound from 'lib/stores/submissionsOutbound';
	import * as customerSocketIoService from 'lib-render/customerSocketIoService';
	import * as socketIoService from 'lib/socketIoService';
	import { v4 as uuidv4 } from 'uuid';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import linkifyHtml from 'linkify-html';
	import CustomerAvatar from 'lib-render/components/CustomerAvatar.svelte';

	export let page;
	let parentPage = page.parentPage || page;

	export let submission;
	export let submissionId = submission?._id;
	export let isCanSendMessage = true;
	import autofocus from 'lib/use/autofocus';
	import clickOutside from 'lib/use/clickOutside';

	let messages = [];

	let getDefaultNewMessage = () => {
		return {
			id: uuidv4(),
			content: '',
			attachments: []
		};
	};

	let newMessage = getDefaultNewMessage();

	const scrollToBottom = (node = chatEl) => {
		const scroll = () => {
			if (node) {
				node.scroll({
					top: node.scrollHeight
				});
			}
		};
		scroll();

		return { update: scroll };
	};

	let getMessages = async () => {
		let { results } = submission.chatRoom?._id
			? await get(`customerMessages`, {
					pageId: submission.page.parentPage?._id || submission.page._id,
					chatRoomId: submission.chatRoom._id
			  })
			: { results: [] };
		messages = _.reverse(results);

		setTimeout(() => {
			scrollToBottom();
		}, 0);

		let socketService = $currentUser ? socketIoService : customerSocketIoService;
		socketService.emit('subscribe', `customerChatRoom-${submissionId}`);

		socketService.on('submission:isUpdated', ({ submission: updatedSubmission }) => {
			if (updatedSubmission._id === submission._id) {
				submission = updatedSubmission;
			}
		});

		socketService.on('customerMessage:created', ({ customerMessage: message }) => {
			if (message.chatRoom._id === submission._id && !messages.find((m) => m.id === message.id)) {
				messages = [...messages, message];

				setTimeout(() => {
					scrollToBottom();
				}, 0);
			}
		});
	};

	let getSubmission = async () => {
		submission = await get(`serviceRequests/${submissionId}`);
		getMessages();
	};

	if (!submission) {
		getSubmission();
	}

	if (browser && submission) {
		getMessages();
	}

	let sendMessage = async () => {
		if (!submission.chatRoom) {
			let { chatRoom } = await post(
				`serviceRequests/${submission._id}/chatRoom?pageId=${parentPage._id}`
			);

			submission.chatRoom = chatRoom;
		}

		newMessage.fromUser = $currentUser;
		newMessage.fromCustomer = $currentCustomer;

		messages = [...messages, newMessage];
		let toCreate = newMessage;

		newMessage = getDefaultNewMessage();

		let createdMessage = await post(`customerMessages`, {
			...toCreate,
			pageId: submission.page.parentPage?._id || submission.page._id,
			chatRoomId: submission.chatRoom._id
		});

		messages = [...messages.filter((m) => m._id), createdMessage];
	};

	let chatEl;

	if (browser) {
		onMount(() => chatEl && scrollToBottom(chatEl));
	}

	let isMyMessage = (message) => {
		if ($currentUser) {
			return $currentUser._id === message.fromUser?._id;
		} else {
			return message.fromCustomer && !message.fromUser;
		}
	};

	let isMessageShown = false;

	onMount(() => {
		return () => {
			customerSocketIoService.emit('unsubscribe', `customerChatRoom-${submissionId}`);
		};
	});
</script>

<div class={clazz}>
	{#if page && submission}
		<div class="flex flex-col flex-1 h-full justify-between _section-item mt-4">
			<div
				class="h-full flex-1 min-h-[400px] max-h-[500px] overflow-y-scroll justify-end p-8"
				style="border-radius: 0;"
				bind:this={chatEl}
			>
				{#each messages as message}
					<div
						class="message my-4"
						class:my={isMyMessage(message)}
						class:their={!isMyMessage(message)}
					>
						{#if !isMyMessage(message)}
							<CustomerAvatar customer={message.fromUser || message.fromCustomer} size={25} />
						{/if}

						<div
							class="content bg-cta-stronger color-accent whitespace-pre-wrap"
							style="word-break: break-word;"
						>
							{@html linkifyHtml(message.messageHTML || '', { target: '_blank' })}
						</div>
						{#if isMyMessage(message)}
							<CustomerAvatar customer={message.fromUser || message.fromCustomer} size={25} />
						{/if}
					</div>

					{#if message.attachments?.length}
						<div class="flex">
							{#each message.attachments || [] as attachment}
								<RenderUrl
									isIframeFallback={false}
									imgClass="max-h-[100px] w-auto mr-4"
									url={attachment.url}
								/>
							{/each}
						</div>
					{/if}
				{/each}
			</div>

			{#if newMessage.attachments?.length}
				<div class="flex">
					{#each newMessage.attachments || [] as attachments}
						<RenderUrl
							isIframeFallback={false}
							imgClass="max-h-[100px] w-auto mr-4"
							url={attachments.url}
						/>
					{/each}
				</div>
			{/if}

			{#if submission.isClosed && !isMessageShown}
				<div>
					<div class="max-w-[300px] text-center mx-auto py-4">
						<div class="w-full text-center mb-2 text-sm">This chat is closed</div>
						<button
							class="_small w-auto"
							on:click={() => {
								isMessageShown = true;
							}}>Send message anyway</button
						>
					</div>
				</div>
			{:else if isCanSendMessage}
				<div class="w-full flex gap-0 items-center justify-between" style="border-radius: 0;">
					<textarea
						class="w-full"
						style="border-radius: 0;"
						placeholder="Your Message"
						bind:value={newMessage.messageHTML}
					/>
					<button
						disabled={!newMessage.messageHTML}
						on:click={sendMessage}
						class="_alternative min-w-[200px] h-[60px]"
						style="border-radius: 0;">Send Message</button
					>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.system {
		@apply flex justify-center;
	}

	.emoji {
		@apply flex justify-center items-center rounded-full bg-gray-800 w-[30px] h-[30px] mr-4;
	}

	.system .content {
		@apply flex items-center border border-gray-400  p-4 px-8 rounded-t-xl m-4;
	}

	:global(.message .content a) {
		color: var(--accent-color);
		border-bottom: 1px var(--accent-color) solid;
	}

	.message {
		@apply flex items-end;
	}

	.message .content {
		@apply rounded-xl  p-4 max-w-[70%];
	}

	.my {
		@apply justify-end;
	}

	.my .content {
		color: var(--text-color);

		@apply rounded-br-none mr-2 bg-cta-stronger;
	}

	.their .content {
		color: var(--text-color);

		@apply rounded-bl-none ml-2 whitespace-pre-wrap bg-cta-stronger;
	}
</style>

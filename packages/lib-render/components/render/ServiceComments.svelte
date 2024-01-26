<script>
	import _ from 'lodash';
	import moment from 'moment';
	let clazz = 'max-w-[600px] mx-auto';
	export { clazz as class };
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import getPageCssStyles from 'lib-render/services/getPageCssStyles';
	import { get, post, put, postFile } from 'lib/api';
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
	import ContentEditable from 'lib/components/ContentEditable.svelte';

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
			messageHTML: '',
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

		messages = results;

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
			if (
				message.chatRoom._id === submission._id &&
				!(message.id
					? messages.find((m) => m.id === message.id)
					: messages.find((m) => m._id === message._id))
			) {
				messages = [message, ...messages];
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

		messages = [newMessage, ...messages];
		let toCreate = newMessage;

		newMessage = getDefaultNewMessage();

		let createdMessage = await post(`customerMessages`, {
			...toCreate,
			pageId: submission.page.parentPage?._id || submission.page._id,
			chatRoomId: submission.chatRoom._id
		});

		messages = [createdMessage, ...messages.filter((m) => m._id)];
	};

	let chatEl;

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
		<div class="flex flex-col flex-1 h-full justify-between  mt-4">
			<div
				class="h-full flex-1 min-h-[400px] overflow-y-scroll justify-end"
				style="border-radius: 0;"
				bind:this={chatEl}
			>
				{#if isCanSendMessage}
					<div class="w-full flex gap-0 items-center justify-between" style="border-radius: 0;">
						<div class="w-full flex items-start" on:submit|preventDefault={sendMessage}>
							<ContentEditable
								class="w-full _bg-cta p-4 rounded-lg"
								placeholder="Write a comment..."
								bind:value={newMessage.messageHTML}
							/>

							<label for="new-file" class="ml-4 p-2 cursor-pointer">
								<FeatherIcon name="paperclip" theme={parentPage.theme?.theme} />

								<input
									id="new-file"
									type="file"
									on:change={async (e) => {
										let file = await postFile(
											'files/customer',
											(e.target?.files || e.detail?.files)[0]
										);

										newMessage.attachments = [...(newMessage.attachments || []), file];
									}}
									hidden
								/>
							</label>

							<button
								disabled={!newMessage.messageHTML}
								on:click={sendMessage}
								class="_transparent p-2"
								style="border-radius: 0;"
								><FeatherIcon name="send" theme={parentPage.theme?.theme} />
							</button>
						</div>
					</div>
				{/if}

				{#if newMessage.attachments?.length}
					<div class="flex mt-4">
						{#each newMessage.attachments || [] as attachments}
							<RenderUrl
								class="w-auto"
								isIframeFallback={false}
								imgClass="max-h-[100px] w-auto mr-4"
								url={attachments.url}
							/>
						{/each}
					</div>
				{/if}
				<hr class="opacity-0 my-4" />

				{#each messages as message}
					<div class="flex items-start my-4 mb-8 w-full">
						<CustomerAvatar customer={message.fromUser || message.fromCustomer} size={40} />

						<div class="ml-4 w-full">
							<div class="flex w-full justify-between">
								<div class="flex items-center  text-sm mb-2">
									<span class="font-semibold"
										>{(message.fromUser || message.fromCustomer).fullName || 'Anonymous'}</span
									>
									<span class="ml-2 opacity-70">
										{moment(message.createdOn).fromNow()}
									</span>
								</div>
								<div>
									{#if message.metadata?.type === 'review'}
										<div class="text-sm bg-green-300 text-black rounded py-1 px-2 mb-2">
											Revision #{message.metadata.reviewNumber}
										</div>
									{:else if message.metadata?.type === 'change-request'}
										<div class="text-sm bg-orange-300 text-black rounded py-1 px-2 mb-2">
											Changes requested
										</div>
									{/if}
								</div>
							</div>
							<div class="_bg-cta rounded-lg p-4 w-full">
								<div class="whitespace-pre-wrap opacity-90 w-full" style="word-break: break-word;">
									{@html linkifyHtml(message.messageHTML || '', { target: '_blank' })}
								</div>
								{#if message.attachments?.length}
									<div class="mt-4 flex">
										{#each message.attachments || [] as attachment}
											<a href={attachment.url} target="_blank">
												<RenderUrl
													isIframeFallback={false}
													imgClass="max-h-[150px] w-auto mr-4"
													url={attachment.url}
												/>
											</a>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
</style>

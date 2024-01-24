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

	export let page;
	export let submission;
	export let submissionId = submission?._id;
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
		const scroll = () =>
			node.scroll({
				top: node.scrollHeight
			});
		scroll();

		return { update: scroll };
	};

	let getMessages = async () => {
		let { results } = await get(`customerMessages`, {
			pageId: submission.page.parentPage?._id || submission.page._id,
			chatRoomId: submission._id
		});

		messages = _.reverse(results);

		setTimeout(() => {
			scrollToBottom();
		}, 0);

		let socketService = $currentUser ? socketIoService : customerSocketIoService;
		socketService.emit('subscribe', `customerChatRoom-${submissionId}`);

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
		newMessage.fromUser = $currentUser;
		newMessage.fromCustomer = $currentCustomer;

		messages = [...messages, newMessage];
		let toCreate = newMessage;

		newMessage = getDefaultNewMessage();

		let createdMessage = await post(`customerMessages`, {
			...toCreate,
			pageId: submission.page.parentPage?._id || submission.page._id,
			chatRoomId: submission._id
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

	let isMenuShown = false;

	let closeRequest = async () => {
		let updatedSubmission = await put(`serviceRequests/${submission._id}/close`);
		submission = updatedSubmission;

		$submissionsOutbound = $submissionsOutbound.map((s) => {
			if (s._id === submission._id) {
				return submission;
			}
			return s;
		});
		$submissions = $submissions.map((s) => {
			if (s._id === submission._id) {
				return submission;
			}
			return s;
		});
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
		<div class="flex justify-between">
			<div>
				<div class="flex items-center">
					<div class="text-lg font-bold mb-2 shrink-0">
						{submission.page.name}
					</div>
					<div class="mt-[-5px] ml-4">
						{#if submission.status === 'closed'}
							<div class="text-center text-sm p-1 px-3 border rounded-full border-orange-300">
								Closed
							</div>
						{:else}
							<div class="text-center text-sm p-1 px-3 border rounded-full border-green-300">
								Active
							</div>
						{/if}
					</div>
				</div>

				<div class="text-lg mb-4 opacity-70">
					Chat with
					{#if $currentUser}
						{submission.customer?.fullName || 'anonymous'} ({submission.customer.email ||
							'no email'})
					{:else}
						{submission.page.parentPage.name}
					{/if}
				</div>
			</div>

			<div>
				{#if submission.status === 'closed'}{:else}
					<div class="cursor-pointer relative" on:click={() => (isMenuShown = !isMenuShown)}>
						<FeatherIcon theme={(page.parentPage || page)?.theme?.theme} name="more-horizontal" />

						{#if isMenuShown}
							<div
								class="absolute right-0 top-0 min-w-[150px] "
								style="transform:translateY(100%);"
								use:clickOutside
								on:clickOutside={() => (isMenuShown = false)}
							>
								<div
									class="p-2 _border-accent rounded hover:bg-accent transition"
									on:click={closeRequest}
								>
									Close Request
								</div>
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>

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
							<img
								src={message.fromUser?.avatarUrl || message.fromCustomer?.avatarUrl}
								class="w-[25px] h-[25px] rounded-full"
							/>
						{/if}

						<div class="content bg-cta-stronger color-accent">
							{@html message.messageHTML}
						</div>
						{#if isMyMessage(message)}
							<img
								src={$currentUser?.avatarUrl || $currentCustomer?.avatarUrl}
								class="w-[25px] h-[25px] rounded-full"
							/>
						{/if}
					</div>
				{/each}
			</div>

			{#if submission.status === 'closed' && !isMessageShown}
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
			{:else}
				<div class="w-full flex gap-4 items-center justify-between" style="border-radius: 0;">
					<textarea
						class="w-full"
						placeholder="Your Message"
						use:autofocus
						bind:value={newMessage.messageHTML}
					/>
					<button
						disabled={!newMessage.messageHTML}
						on:click={sendMessage}
						class="_primary _small shrink-0">Send Message</button
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
		background: var(--accent-color);
		color: var(--button-color);

		@apply rounded-br-none mr-2;
	}

	.their .content {
		background: var(--accent-color);
		color: var(--button-color);

		@apply rounded-bl-none ml-2 whitespace-pre-wrap;
	}
</style>

<script>
	import getPageCssStyles from 'lib-render/services/getPageCssStyles';
	import { get, post } from 'lib/api';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	export let page;
	export let roomId;

	let messages = [];

	let newMessage = {
		content: '',
		attachments: []
	};

	let getMessages = async () => {
		let { results } = await get(`customerMessages`, {
			pageId: page.parentPage?._id || page._id,
			chatRoomId: roomId
		});

		messages = results;
	};

	let sendMessage = async () => {
		messages = [...messages, newMessage];
		let toCreate = newMessage;

		newMessage = { messageHTML: '', attachments: [] };

		let createdMessage = await post(`customerMessages`, {
			...toCreate,
			pageId: page.parentPage?._id || page._id,
			chatRoomId: roomId
		});

		messages = [...messages.filter((m) => m._id), createdMessage];
	};

	if (browser) {
		getMessages();
	}

	let chatEl;

	const scrollToBottom = (node = chatEl) => {
		const scroll = () =>
			node.scroll({
				top: node.scrollHeight
			});
		scroll();

		return { update: scroll };
	};

	if (browser) {
		onMount(() => scrollToBottom(chatEl));
	}
</script>

<div
	class="flex flex-col flex-1 h-full justify-between max-w-[600px] mx-auto _section-item"
	bind:this={chatEl}
>
	<div
		class="flex flex-col h-full flex-1 min-h-[400px] max-h-[400px] overflow-y-scroll justify-end p-8"
	>
		{#each messages as message}
			<div class="message my-4" class:my={message.customer} class:their={message.user}>
				<div class="content">
					{message.messageHTML}
				</div>
			</div>
		{/each}
	</div>

	<div class="w-full flex gap-4 items-center justify-between">
		<textarea class="w-full" placeholder="Your Message" bind:value={newMessage.messageHTML} />
		<button
			disabled={!newMessage.messageHTML}
			on:click={sendMessage}
			class="_primary _small shrink-0">Send Message</button
		>
	</div>
</div>

<style>
	.system {
		@apply flex justify-center;
	}

	.emoji {
		@apply flex justify-center items-center rounded-full bg-gray-800 w-[30px] h-[30px] mr-4;
	}

	.system .content {
		@apply flex items-center border border-gray-400 p-4 px-8 rounded-xl m-4;
	}

	.message {
		@apply flex items-end;
	}

	.message .content {
		@apply rounded-xl flex shrink-0 p-4 max-w-[70%];
	}

	.my {
		@apply justify-end;
	}

	.my .content {
		background: var(--accent-color);
		color: var(--button-text-color);

		@apply rounded-tr-none mr-2;
	}

	.their .content {
		background: var(--accent-color);
		color: var(--button-text-color);

		@apply rounded-bl-none ml-2 whitespace-pre-wrap;
	}
</style>

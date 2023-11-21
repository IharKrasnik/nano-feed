<script>
	import _ from 'lodash';
	import moment from 'moment';
	import { get, post, put, del } from 'lib/api';
	import { fade } from 'svelte/transition';
	import { countryCodeEmoji } from 'country-code-emoji';
	import Button from 'lib/components/Button.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import FileInput from 'lib/components/FileInput.svelte';
	import contenteditable from 'lib/use/contenteditable';
	import currentUser from 'lib/stores/currentUser';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';
	import striptags from 'striptags';

	export let page;
	export let selectedTrigger;
	export let selectedChatRoom;

	let triggers = [];

	let chatRooms = [];

	let getWelcomeEmailHtml = () => {
		if (!$currentUser) {
			return null;
		}

		return `
Hi! My name is ${$currentUser.fullName.split(' ')[0]}. 👋 <br />
Thank you for joining ${page.parentPage?.name || page.name} and welcome! <br />
Your participation means a lot for our tiny team, so I'm extremely grateful!
<br />
We'll keep in touch and let you know when we launch. <br /> <br />

Meanwhile, if you open for a call — I'd love to chat! <br />
Simply reply to this email and say "hi"! <br />

See you!
  `;
	};

	let formatTrigger = (trigger) => {
		if (trigger.on === 'email:submitted') {
			return 'Email Submitted';
		}
		if (trigger.on === 'form:submitted') {
			return 'Form Submitted';
		}
	};

	let selectTrigger = (trigger) => {
		if (trigger.isCollapsed) {
			triggers = triggers.map((t) => {
				t.isCollapsed = true;
				if (t._id === trigger._id) {
					t.isCollapsed = false;
				}
				return t;
			});

			selectedTrigger = trigger;
		}
	};

	let loadTriggers = async () => {
		let triggersResults = await get(`triggers`, {
			pageId: page.parentPage?._id || page._id
		});

		triggers = [
			...triggers,
			...triggersResults.results.map((s) => {
				s.isCollapsed = true;
				return s;
			})
		];

		if (!triggers.length) {
			triggers = [
				{
					isCollapsed: true,
					isEnabled: false,
					on: 'email:submitted',
					actionSequence: [
						{
							inMinutes: 0,
							type: 'send_message',
							data: {
								subject: `Welcome to ${page.name}!`,
								messageHTML: getWelcomeEmailHtml(),
								imageUrl: null
							}
						}
					]
				}
			];
		}
	};

	loadTriggers();

	let forms = [];

	let addFormTrigger = () => {
		let formTrigger = {
			isCollapsed: true,
			isEnabled: true,
			on: 'form:submitted',
			actionSequence: [
				{
					inMinutes: 0,
					type: 'send_message',
					data: {
						subject: `Thank you for your submission`,
						messageHTML: `We'll review it shortly!`,
						imageUrl: null
					}
				}
			]
		};

		triggers = [...triggers, formTrigger];

		selectTrigger(formTrigger);
	};

	let loadForms = async () => {
		forms = await get('forms', {
			pageId: page.parentPage?._id || page?._id
		});
	};

	loadForms();

	let saveTrigger = async () => {
		let updatedTrigger;

		if (selectedTrigger._id) {
			updatedTrigger = await put(
				`triggers/${selectedTrigger._id}?pageId=${page.parentPage?._id || page._id}`,
				selectedTrigger
			);
		} else {
			updatedTrigger = await post(
				`triggers?pageId=${page.parentPage?._id || page._id}`,
				selectedTrigger
			);
		}

		showSuccessMessage('Trigger saved');

		_.extend(selectedTrigger, updatedTrigger);
		selectedTrigger.isCollapsed = true;
		selectedTrigger = null;
	};

	let loadChatRooms = async () => {
		let chatRoomsResults = await get('customerChatRooms', {
			pageId: page._id
		});

		chatRooms = chatRoomsResults.results;
	};

	loadChatRooms();

	let openChatRoom = ({ chatRoom }) => {
		selectedChatRoom = chatRoom;
	};

	let sendTestEmail = async ({ triggerAction }) => {
		await post(`triggers/test-email?pageId=${page.parentPage?._id || page._id}`, {
			subject: triggerAction.data.subject,
			messageHTML: triggerAction.data.messageHTML,
			imageUrl: triggerAction.data.imageUrl,
			callToActionText: triggerAction.data.callToActionText,
			callToActionUrl: triggerAction.data.callToActionUrl
		});

		showSuccessMessage(`Sent test email to ${$currentUser.email}`);
	};
</script>

<div class="font-bold text-lg mb-4">Messaging Triggers</div>

{#each triggers as trigger}
	<div class="_section cursor-pointer" on:click={() => selectTrigger(trigger)}>
		<div class=" flex justify-between items-center">
			<div class="flex gap-2 items-center">
				On: <span class="font-semibold">{formatTrigger(trigger)}</span>
			</div>
			{#if trigger.isCollapsed}
				{trigger.isEnabled ? 'Enabled' : 'Disabled'}
			{:else}
				<div>
					<input type="checkbox" bind:checked={trigger.isEnabled} on:change={() => {}} /> Enabled
				</div>
			{/if}
		</div>
		{#if !trigger.isCollapsed}
			<div class="my-4" in:fade={{ duration: 150 }}>
				{#if !trigger.isEnabled}
					<div class="p-4 rounded-xl bg-orange-300">Trigger is currenty disabled</div>
				{:else}
					<div class="p-4 rounded-xl bg-green-300" in:fade={{ duration: 150 }}>
						Trigger is enabled
					</div>
				{/if}
			</div>

			{#each trigger.actionSequence as triggerAction}
				<div class="_section">
					<!-- <select bind:value={triggerAction.when}>
						<option>Immediately</option>
						<option>In 24 hours</option>
						<option>In 1 week</option>
					</select> -->

					<div>
						<div class="">
							<div class="text-sm opacity-70 mb-2">Subject</div>
							<input
								type="text"
								class="w-full"
								placeholder="Welcome to {page.name}!"
								bind:value={triggerAction.data.subject}
							/>
						</div>
						<div class="mt-2 w-full">
							<div class="text-sm opacity-70 mb-2">Email</div>

							<div
								contenteditable="true"
								use:contenteditable
								bind:innerHTML={triggerAction.data.messageHTML}
								class="w-full p-4 bg-[#fafafa]"
							/>
						</div>

						<hr class="my-8 border-[#8B786D] opacity-30" />

						<div class="mt-4">Call To Action (optional)</div>
						<div class="text-sm mb-2 opacity-70">
							Text & link for the button at the bottom of your email
						</div>

						<div class="flex w-full">
							<div class="w-full">
								<div class="text-sm mb-2">Button Text</div>
								<input
									class="w-full"
									placeholder="Join discovery call"
									bind:value={triggerAction.data.callToActionText}
								/>
							</div>

							<div class="ml-4 w-full">
								<div class="text-sm mb-2">URL</div>
								<input
									class="w-full"
									type="text"
									placeholder="https://cal.com/igor-krasnik-7uhewy/30min"
									bind:value={triggerAction.data.callToActionUrl}
								/>
							</div>
						</div>

						<div class="mt-4 mb-2">Image (optional)</div>
						<div class="text-sm mt-2 mb-4">
							Add friendly photo or product demo to the end of email.
						</div>
						<FileInput class="w-full" bind:url={triggerAction.data.imageUrl} />

						{#if selectedTrigger.on.includes('email')}
							<div class="my-4 p-4 bg-green-600 rounded-xl text-white">
								Welcome email is sent once a user <b>submitted</b> their email. <br />

								🤝 Make it friendly and personal <br />
								⏳ Keep it short and sweet <br />
								⚡️ Stimulate reader to take action: book a call, check out the link, reply to email,
								share in social media <br />
							</div>
						{/if}

						<div class="flex items-center">
							<Button class="_secondary my-8" onClick={() => sendTestEmail({ triggerAction })}
								>🔬 Send Test Message + Email</Button
							>
						</div>
					</div>
				</div>
			{/each}
		{/if}

		{#if !trigger.isCollapsed}
			<div class="mt-4  flex justify-between items-center">
				<div>
					<Button
						class="_primary transition {trigger.isEnabled ? '_green' : '_orange'}"
						onClick={saveTrigger}>Update Trigger</Button
					>
				</div>
				<div>
					<input type="checkbox" bind:checked={trigger.isEnabled} on:change={() => {}} /> Enabled
				</div>
			</div>
		{/if}
	</div>
{/each}

{#if forms.length && !triggers.find((t) => t.on === 'form:submitted')}
	<button class="_secondary w-full mt-4" on:click={addFormTrigger}> Add Form Trigger </button>
{/if}

<div class="font-bold text-lg mb-4 mt-8">Messages</div>

{#each chatRooms as chatRoom}
	<div
		class="my-4 _section p-4 truncate overflow-hidden cursor-pointer"
		class:_active={chatRoom._id === selectedChatRoom?._id}
		on:click={() => openChatRoom({ chatRoom })}
	>
		{@html striptags(chatRoom.lastMessageHTML || '')}

		<div class="mt-4 text-sm">
			<div class="text-sm mb-2" class:text-orange-700={!chatRoom.customers}>
				{chatRoom.customers ? chatRoom.customers[0].email : 'chat with yourself'}
			</div>

			{moment(chatRoom.lastMessageSentOn).format('MMM DD, HH:mm')}
		</div>
	</div>
{/each}

<style>
	._active {
		border-color: black;
	}
</style>

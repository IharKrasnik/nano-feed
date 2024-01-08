<script>
	import _ from 'lodash';
	import moment from 'moment';
	import { get, post, put, del } from 'lib/api';
	import { fade } from 'svelte/transition';
	import { countryCodeEmoji } from 'country-code-emoji';
	import Button from 'lib/components/Button.svelte';
	import EditChatRoom from '$lib/components/edit/ChatRoom.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import FileInput from 'lib/components/FileInput.svelte';
	import contenteditable from 'lib/use/contenteditable';
	import currentUser from 'lib/stores/currentUser';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';
	import striptags from 'striptags';
	import BackTo from '$lib/components/BackTo.svelte';
	import placeholder from 'lib/use/placeholder';

	export let page;
	export let selectedTrigger;
	export let selectedChatRoom;
	export let selectedNewsletter;
	export let selectedCustomer;

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

	let saveTrigger = async ({ isCollapse = true } = {}) => {
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
		if (isCollapse) {
			selectedTrigger.isCollapsed = true;
			selectedTrigger = null;
		}
	};

	let loadChatRooms = async () => {
		let chatRoomsResults = await get('customerChatRooms', {
			pageId: page._id
		});

		chatRooms = chatRoomsResults.results;
	};

	loadChatRooms();

	let openChatRoom = (chatRoom) => {
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

	let newBroadcastEmail = {
		subject: '',
		html: '',
		callToAction: {
			title: '',
			url: ''
		},
		imageUrl: ''
	};

	let broadcastEmails = [];

	let refreshBroadcastEmails = async () => {
		broadcastEmails = (await get(`pages/${page._id}/broadcast-emails-new`, {})).results;
	};

	refreshBroadcastEmails();

	let isBroadcastTestSent = false;

	let sendTestBroadcastEmail = async () => {
		if (selectedNewsletter.subject && selectedNewsletter.html) {
			await post(`pages/${page._id}/broadcast-email/test`, {
				subject: selectedNewsletter.subject,
				html: selectedNewsletter.html,
				callToAction: selectedNewsletter.callToAction,
				imageUrl: selectedNewsletter.imageUrl
			});

			isBroadcastTestSent = true;
		} else {
			alert('Fill all the required fields');
		}
	};

	let sendBroadcastEmail = async () => {
		let { customerIds } = await post(`pages/${page._id}/broadcast-emails`, {
			subject: selectedNewsletter.subject,
			html: selectedNewsletter.html,
			callToAction: selectedNewsletter.callToAction,
			imageUrl: selectedNewsletter.imageUrl
		});

		broadcastEmails = [
			{
				subject: selectedNewsletter.subject,
				customerIds,
				html: selectedNewsletter.html,
				createdOn: new Date()
			},
			...(broadcastEmails || [])
		];

		showSuccessMessage(`Newsletter was sent to ${customerIds.length} customers`);

		selectedNewsletter = null;
	};
</script>

{#if selectedTrigger || selectedNewsletter}
	<BackTo
		to={'Messaging'}
		onClick={() => {
			if (selectedTrigger) {
				selectedTrigger.isCollapsed = true;
			}
			selectedTrigger = null;
			selectedNewsletter = null;
		}}
	/>
{/if}

{#if !selectedTrigger}
	<div class="flex items-center w-full justify-between mb-4">
		<div class="font-bold text-lg ">Newsletters</div>

		{#if broadcastEmails?.length && !selectedNewsletter}
			<button
				class="_secondary _small"
				on:click={() => {
					selectedChatRoom = null;
					selectedNewsletter = { ...newBroadcastEmail };
				}}>Send new</button
			>
		{/if}
	</div>

	{#if broadcastEmails?.length && !selectedNewsletter}
		{#each broadcastEmails as broadcastEmail}
			<div class="_section">
				<div>{broadcastEmail.subject}</div>
			</div>
		{/each}
	{:else if !selectedNewsletter}
		<div class="_section _info">
			<div class="font-bold mb-2">No newsletters yet</div>
			<div>
				Send regular newsletters to engage your users and promote your best content or products
			</div>
			<div class="mt-4">
				<button
					class="_primary _small"
					on:click={() => {
						selectedChatRoom = null;
						selectedNewsletter = { ...newBroadcastEmail };
					}}>Send first newsletter</button
				>
			</div>
		</div>
	{/if}
{/if}

{#if !selectedNewsletter}
	<div class="font-bold text-lg mt-8 mb-4">Messaging Triggers</div>

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
						<input
							type="checkbox"
							bind:checked={trigger.isEnabled}
							on:change={() => saveTrigger({ isCollapse: false })}
						/> Enabled
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
									class="w-full p-4 bg-[#f1f1f1]"
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

							{#if selectedTrigger?.on?.includes('email')}
								<div class="my-4 p-4 bg-green-600 rounded-xl text-white _section bg-[#f1f1f1]">
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
						<input
							type="checkbox"
							bind:checked={trigger.isEnabled}
							on:change={() => saveTrigger({ isCollapse: false })}
						/> Enabled
					</div>
				</div>
			{/if}
		</div>
	{/each}

	{#if forms.length && !triggers.find((t) => t.on === 'form:submitted')}
		<button class="_secondary w-full mt-4" on:click={addFormTrigger}> Add Form Trigger </button>
	{/if}
{:else}
	<div class="_section">
		<div class=" mb-2 font-bold">Email Subject</div>

		<input
			placeholder="{moment().format('MMMM')} Update 🔥"
			class="w-full"
			bind:value={selectedNewsletter.subject}
		/>

		<div class="_section bg-[#f1f1f1] text-sm mt-2 mb-4">
			Subject is very important! <br /> Spark reader's curiosity and make them want to open your email.
		</div>

		<div class="mt-4 mb-2 font-bold">Message</div>

		<div
			class="w-full p-4 bg-[#f6f5f5] min-h-[200px] rounded-xl"
			bind:innerHTML={selectedNewsletter.html}
			contenteditable
			use:placeholder={'Hi! Here are some new features to make your life easier:'}
			use:contenteditable
		/>

		<div class="_section bg-[#f1f1f1] text-sm mt-2 mb-4">
			What's in your email for them? <br />
			Talk to your audience and solve their problems. <br />
			Genuinly lead them to call to action through storytelling.
		</div>

		<hr class="my-8 border-[#8B786D] opacity-30" />

		<div class="mt-4 font-bold mb-2">Call To Action (optional)</div>
		<div class="text-sm mb-2 opacity-70">
			Text & link for the button at the bottom of your email.
		</div>

		<div class="flex w-full">
			<div class="w-full">
				<div class="text-sm mb-2 font-bold">Title</div>
				<input
					class="w-full"
					placeholder="Join discovery call"
					bind:value={selectedNewsletter.callToAction.title}
				/>
			</div>
			<div class="ml-4 w-full">
				<div class="text-sm mb-2 font-bold">URL</div>
				<input
					class="w-full"
					type="text"
					placeholder="https://cal.com/igor-krasnik-7uhewy/30min"
					bind:value={selectedNewsletter.callToAction.url}
				/>
			</div>
		</div>

		<div class="mt-4 mb-2 font-bold">Image (optional)</div>
		<div class="text-sm mt-2 mb-4">Add a friendly photo or product demo to the end of email.</div>
		<FileInput class="w-full" bind:url={selectedNewsletter.imageUrl} />

		<div class="mt-8">
			<Button class="_primary _small" onClick={sendTestBroadcastEmail}>Send test email</Button>
		</div>
		<div class="mt-4" class:opacity-50={!isBroadcastTestSent}>
			<Button class="_primary _small" onClick={sendBroadcastEmail}>Broadcast</Button>
		</div>
	</div>
{/if}

{#if !selectedNewsletter && !selectedTrigger}
	<div class="font-bold text-lg mb-4 mt-8">Messages</div>

	{#if chatRooms.length}
		{#each chatRooms as chatRoom}
			<EditChatRoom
				isActive={chatRoom._id === selectedChatRoom?._id}
				{chatRoom}
				openChatRoom={() => openChatRoom(chatRoom)}
			/>
		{/each}
	{:else}
		<div class="_section _info">
			<div class="font-bold mb-2">No messages yet</div>

			{#if triggers.filter((t) => t.isEnabled).length}
				<div>Go get signups!</div>
			{:else}
				<div>You will see messages chats with your customers here</div>
			{/if}
		</div>
	{/if}
{/if}

<style>
	._active {
		border-color: black;
	}
</style>

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
	import ToggleGroup from '$lib/components/ToggleGroup.svelte';
	import allTriggers, {
		refresh as refreshTriggers,
		isLoading as isTriggersLoading
	} from '$lib/stores/allTriggers';

	import selectedTrigger from '$lib/stores/selectedTrigger';

	export let page;
	export let selectedChatRoom;
	export let selectedNewsletter;
	export let selectedCustomer;

	let parentPage = page.parentPage || page;

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
		if (trigger.on[0].eventName === 'email:submitted') {
			return 'Email Submitted';
		}
		if (trigger.on[0].eventName === 'form:submitted') {
			return 'Form Submitted';
		}
	};

	let selectTrigger = (trigger) => {
		$selectedTrigger = trigger;
		trigger.isEdit = true;
	};

	let getMessagingTriggers = () => {
		return $allTriggers.filter((t) =>
			t.on.find((e) => e.eventName === 'form:submitted' || e.eventName === 'email:submitted')
		);
	};

	let loadTriggers = async () => {
		await refreshTriggers({ pageId: parentPage._id });

		if (!getMessagingTriggers().length) {
			$allTriggers = [
				{
					isCollapsed: true,
					isEnabled: false,
					on: [{ eventName: 'email:submitted' }],
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
				},
				...$allTriggers
			];
		}
	};

	loadTriggers();

	let forms = [];

	let addFormTrigger = () => {
		let formTrigger = {
			isCollapsed: true,
			isEnabled: true,
			on: [{ eventName: 'form:submitted' }],
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
		if (!$selectedTrigger) {
			return;
		}
		let updatedTrigger;

		if ($selectedTrigger._id) {
			updatedTrigger = await put(
				`triggers/${$selectedTrigger._id}?pageId=${page.parentPage?._id || page._id}`,
				$selectedTrigger
			);
		} else {
			updatedTrigger = await post(
				`triggers?pageId=${page.parentPage?._id || page._id}`,
				$selectedTrigger
			);
		}

		showSuccessMessage('Trigger saved');

		_.extend($selectedTrigger, updatedTrigger);

		$selectedTrigger.isEdit = false;
		$selectedTrigger = null;
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

	let selectedMessagingTab = '';

	let addTriggerAction = () => {
		$selectedTrigger.actionSequence = [
			...$selectedTrigger.actionSequence,
			{
				data: {
					subject: 'Something Useful'
				},
				isDelayed: true,
				delay: { amount: 1, unit: 'days' }
			}
		];
	};
</script>

{#if selectedNewsletter}
	<BackTo
		to={'Messaging'}
		onClick={() => {
			if ($selectedTrigger) {
				$selectedTrigger.isEdit = false;
			}
			$selectedTrigger = null;
			selectedNewsletter = null;
			selectedMessagingTab = 'chats';
		}}
	/>
{/if}

{#if $selectedTrigger}
	<BackTo
		to={'Triggers'}
		onClick={() => {
			if ($selectedTrigger) {
				$selectedTrigger.isEdit = false;
			}
			$selectedTrigger = null;
		}}
	/>
{/if}

{#if !selectedNewsletter && !$selectedTrigger}
	<ToggleGroup
		bind:value={selectedMessagingTab}
		class="mb-8"
		tabs={[
			{
				key: 'chats',
				name: 'Chats'
			},
			{
				key: 'newsletters',
				name: 'Newsletters'
			},
			{
				key: 'triggers',
				name: 'Triggers'
			}
		]}
	/>
{/if}

{#if selectedMessagingTab === 'newsletters'}
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

{#if selectedMessagingTab === 'triggers'}
	{#if $selectedTrigger}
		<div class="font-bold text-lg mt-8 mb-4">Edit Trigger</div>
	{:else}
		<div class="font-bold text-lg mt-8 mb-4">Messaging Triggers</div>
	{/if}

	{#each getMessagingTriggers() as trigger}
		<div class="_section cursor-pointer" on:click={() => selectTrigger(trigger)}>
			<div class=" flex justify-between items-center">
				<div class="flex gap-2 items-center">
					On: <span class="font-semibold">{formatTrigger(trigger)}</span>
				</div>
			</div>
			{#if trigger === $selectedTrigger}
				<div class="my-4" in:fade={{ duration: 150 }}>
					{#if !trigger.isEnabled}
						<div class="p-4 rounded-xl bg-orange-300">Trigger is currenty disabled</div>
					{:else}
						<div class="p-4 rounded-xl bg-green-300" in:fade={{ duration: 150 }}>
							Trigger is enabled
						</div>
					{/if}
				</div>
			{/if}

			{#if trigger === $selectedTrigger}
				<div class="mt-4  flex justify-between items-center">
					<div>
						<Button
							class="_primary transition {trigger.isEnabled ? '_green' : '_orange'}"
							onClick={saveTrigger}>Update Trigger</Button
						>
					</div>
					<div>
						<input type="checkbox" bind:checked={trigger.isEnabled} /> Enabled
					</div>
				</div>
			{/if}
		</div>

		{#if trigger === $selectedTrigger}
			{#each $selectedTrigger.actionSequence as triggerAction}
				<div class="_section">
					<!-- <select bind:value={triggerAction.when}>
						<option>Immediately</option>
						<option>In 24 hours</option>
						<option>In 1 week</option>
					</select> -->

					<div>
						<div class="_section">
							<input
								type="checkbox"
								bind:checked={triggerAction.isDelayed}
								on:change={() => {
									if (triggerAction.isDelayed) {
										triggerAction.delay = { amount: '1', unit: 'day' };
									} else {
										triggerAction.delay = null;
									}
								}}
							/>
							Delay trigger

							{#if triggerAction.isDelayed && triggerAction.delay}
								<div class="flex items-center mt-4">
									<input
										class="max-w-[100px] mr-4"
										type="number"
										bind:value={triggerAction.delay.amount}
									/>
									<ToggleGroup
										bind:value={triggerAction.delay.unit}
										tabs={[
											{ name: 'Days', key: 'days' },
											{ name: 'Hours', key: 'hours' }
										]}
									/>
								</div>
							{/if}
						</div>
						<div class="">
							<div class="text-sm opacity-70 mb-2">Subject</div>
							<input
								type="text"
								class="w-full"
								placeholder="Welcome to {page.name}!"
								bind:value={triggerAction.data.subject}
							/>
						</div>
						<div class="mt-4 w-full">
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

						<div class="mt-8 mb-2">Image (optional)</div>
						<div class="text-sm mt-2 mb-4">
							Add friendly photo or product demo to the end of email.
						</div>
						<FileInput class="w-full" bind:url={triggerAction.data.imageUrl} />

						{#if $selectedTrigger?.on[0]?.eventName?.includes('email')}
							<div class="my-4 p-4 bg-green-600 rounded-xl text-white _section bg-[#f1f1f1]">
								Welcome email is sent once a user <b>submitted</b> their email. <br />

								🤝 Make it friendly and personal <br />
								⏳ Keep it short and sweet <br />
								⚡️ Stimulate reader to take action: book a call, check out the link, reply to email,
								share in social media <br />
							</div>
						{/if}

						<div class="flex items-center">
							<Button class="_secondary mt-8" onClick={() => sendTestEmail({ triggerAction })}
								>🔬 Send Test Message + Email</Button
							>
						</div>
					</div>
				</div>
			{/each}

			<button class="w-full _secondary" on:click={addTriggerAction}>Add Trigger Action</button>
		{/if}
	{/each}

	{#if forms.length && !$allTriggers.find((t) => t.on === 'form:submitted')}
		<button class="_secondary w-full mt-4" on:click={addFormTrigger}> Add Form Trigger </button>
	{/if}
{/if}

{#if selectedNewsletter}
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

{#if selectedMessagingTab === 'chats'}
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

			{#if $allTriggers.filter((t) => t.isEnabled).length}
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

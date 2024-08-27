<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { get, post, put } from 'lib/api';

	import BackArrowSvg from 'lib/icons/back-arrow.svelte';
	import Button from 'lib/components/Button.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import FileInput from '$lib/components/FileInput.svelte';
	import BackTo from '$lib/components/BackTo.svelte';

	import tooltip from 'lib/use/tooltip';
	import clickOutside from 'lib/use/clickOutside';
	import contenteditable from 'lib/use/contenteditable';

	import WaveDashboard from 'lib/components/wave/Dashboard.svelte';
	import currentUser from 'lib/stores/currentUser';

	export let page;

	let broadcastEmail = { subject: '', html: '', callToAction: {}, imageUrl: '' };
	let isNewInProgress;

	let isBroadcastTestSent = false;

	let broadcastEmails = null;

	let refreshBroadcastEmails = async () => {
		broadcastEmails = await get(`pages/${page._id}/broadcast-emails-new`, {});
	};

	refreshBroadcastEmails();

	let sendTestBroadcastEmail = async () => {
		if (broadcastEmail.subject && broadcastEmail.html) {
			await post(`pages/${page._id}/broadcast-email/test`, {
				subject: broadcastEmail.subject,
				html: broadcastEmail.html,
				callToAction: broadcastEmail.callToAction,
				imageUrl: broadcastEmail.imageUrl
			});

			isBroadcastTestSent = true;
		} else {
			alert('Fill all the required fields');
		}
	};

	let editBroadcastEmail = () => {
		isBroadcastTestSent = false;
	};

	let sendBroadcastEmail = async () => {
		let { customerIds } = await post(`pages/${page._id}/broadcast-emails`, {
			subject: broadcastEmail.subject,
			html: broadcastEmail.html,
			callToAction: broadcastEmail.callToAction,
			imageUrl: broadcastEmail.imageUrl
		});

		broadcastEmail.isSent = true;
		broadcastEmail.customerIds = customerIds;

		broadcastEmails.results = [
			{
				subject: broadcastEmail.subject,
				customerIds: broadcastEmail.customerIds,
				html: broadcastEmail.html,
				createdOn: new Date()
			},
			...(broadcastEmails.results || [])
		];
	};
</script>

<div class="px-8 py-16">
	{#if isNewInProgress}
		<BackTo to="Editor" onClick={() => (isNewInProgress = false)} />

		<div class="w-full">
			<div class="text-xl font-bold mb-4">Broadcast emails to your audience</div>

			{#if !isBroadcastTestSent}
				<div class="mt-4 mb-2">Email Subject</div>
				<div class="text-sm mt-2 mb-4">
					Subject is very important! <br /> Spark reader's curiosity and make them want to open your
					email.
				</div>
				<input
					placeholder="{moment().format('MMMM')} Update 🔥"
					class="w-full"
					bind:value={broadcastEmail.subject}
				/>

				<div class="mt-4 mb-2">Message</div>
				<div class="text-sm mt-2 mb-4">
					What's in your email for them? <br />
					Talk to your audience and solve their problems. <br />
					Genuinly lead them to call to action through storytelling.
				</div>

				<div
					class="w-full p-4 bg-[#f6f5f5] min-h-[200px] rounded-xl"
					bind:innerHTML={broadcastEmail.html}
					contenteditable
					use:contenteditable
				/>

				<hr class="my-8 border-[#8B786D] opacity-30" />

				<div class="mt-4">Call To Action (optional)</div>
				<div class="text-sm mb-2 opacity-70">
					Text & link for the button at the bottom of your email.
				</div>

				<div class="flex w-full">
					<div class="w-full">
						<div class="text-sm mb-2">Title</div>
						<input
							class="w-full"
							placeholder="Join discovery call"
							bind:value={broadcastEmail.callToAction.title}
						/>
					</div>
					<div class="ml-4 w-full">
						<div class="text-sm mb-2">URL</div>
						<input
							class="w-full"
							type="text"
							placeholder="https://cal.com/igor-krasnik-7uhewy/30min"
							bind:value={broadcastEmail.callToAction.url}
						/>
					</div>
				</div>

				<div class="mt-4 mb-2">Image (optional)</div>
				<div class="text-sm mt-2 mb-4">
					Add a friendly photo or product demo to the end of email.
				</div>
				<FileInput class="w-full" bind:url={broadcastEmail.imageUrl} />
			{/if}

			{#if isBroadcastTestSent}
				{#if broadcastEmail.isSent}
					<div class="my-8 mt-16 text-lg">
						🎉 Email was sent to {broadcastEmail.customerIds.length} subscribers! <br />

						<button
							class="mt-4 _secondary"
							on:click={() => {
								isNewInProgress = false;
							}}>✅ Cool, close the window</button
						>
					</div>
				{:else}
					<h3 class="text-lg mb-4">
						The test email was sent to&nbsp;<b> {$currentUser.email}</b>. <br />
					</h3>

					Does it look good? Ready to send it to your subscribers?<br />

					<div class="mt-4 bg-[#fafafa] p-4 rounded-xl">
						<b>🙅‍♀️ No Spam Area</b> <br />
						People like me and you don't like spam. <br />
						Your subscribers put effort to follow your work. <br />
						Put your heart into your messaging to turn your audience into potential clients.
					</div>

					<div class="flex mt-8">
						<Button class="mt-4 _primary" onClick={sendBroadcastEmail}>📢 Broadcast Email</Button>

						<button
							class="ml-4 mt-4 secondary"
							on:click={() => {
								isBroadcastTestSent = false;
							}}>🖊 Nah, continue editing</button
						>
					</div>
				{/if}
			{:else}
				<div class="mt-8">
					<Button class="mt-4 _secondary" onClick={sendTestBroadcastEmail}
						>🔬 Send Test Email</Button
					>
				</div>
			{/if}
		</div>
	{:else}
		<button class="_primary mt-8" on:click={() => (isNewInProgress = true)}>Send Group Email</button
		>

		{#if broadcastEmails?.results?.length}
			<div class="text-lg font-bold mt-8 mb-2">Previous Emails</div>
			{#each broadcastEmails.results as email}
				<div class="flex justify-between items-center mb-4">
					<div>
						<div>
							{email.subject}
						</div>
					</div>
					<div class="flex">
						<div class="mr-4 number-tag">{email.customerIds?.length || 0}</div>

						<div class="opacity-70">
							{moment(email.createdOn).format('MMM DD HH:MM')}
						</div>
					</div>
				</div>
			{/each}
		{/if}
	{/if}
</div>

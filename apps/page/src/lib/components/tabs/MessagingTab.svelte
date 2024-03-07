<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { get, post, put } from 'lib/api';

	import ChatRoomTab from '$lib/components/tabs/ChatRoomTab.svelte';
	import selectedTrigger from '$lib/stores/selectedTrigger';
	import allPages from 'lib-render/stores/allPages';
	import Loader from 'lib/components/Loader.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import currentUser from 'lib/stores/currentUser';
	import getPageCssStyles from 'lib-render/services/getPageCssStyles';
	import selectedBroadcastEmail from '$lib/stores/selectedBroadcastEmail';
	import getPercentage from 'lib/helpers/getPercentage';

	export let page;
	export let chatRoom;

	let cssVarStyles;
	let styles;

	let parentPage = page.parentPage ? $allPages.find((p) => p._id === page.parentPage._id) : page;

	$: if (page) {
		let res = getPageCssStyles(page);
		cssVarStyles = res.cssVarStyles;
		styles = res.styles;
	}
</script>

<div class="px-8 py-16 bg-background overflow-y-auto" style={cssVarStyles}>
	{#if $selectedTrigger}
		<div class="flex flex-col items-center">
			<div class="text-2xl font-bold">
				When a user submits a {$selectedTrigger.on.find((e) => e.eventName.includes('email'))
					? 'email'
					: 'form'}..
			</div>
			<div class="py-8 border-r border-accent mb-4" />
			<div class="relative my-4 h-[50px]">
				<div class="absolute left-[50%] border-r border-black/50 h-full" />
			</div>

			{#each $selectedTrigger.actionSequence as triggerAction, i}
				{#if i > 0}
					<div class="py-8 border-r border-accent mb-4" />
				{/if}
				<div class="w-full">
					<div class="text-xl font-bold  text-center">
						{triggerAction.isDelayed
							? `After ${triggerAction.delay?.amount} ${triggerAction.delay?.unit}`
							: 'Immediately'}
					</div>

					<div class="border p-8 w-full max-w-[800px] mx-auto mt-8">
						<div>
							<span class="font-semibold">
								{$currentUser.fullName.split(' ')[0] || ''} from {parentPage.name}
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
	{:else if chatRoom}
		<ChatRoomTab {page} {chatRoom} />
	{:else if $selectedBroadcastEmail}
		<div class="w-full">
			{#if $selectedBroadcastEmail._id && $selectedBroadcastEmail.stats}
				<div class=" w-full max-w-[800px] mx-auto mt-8">
					<div class="text-lg mb-1 font-bold">Newsletter Stats</div>
					{#if $selectedBroadcastEmail._id}
						<div class=" mb-4">
							Sent on {moment($selectedBroadcastEmail.createdOn).format('MMM DD, YYYY hh:mm a')}
						</div>
					{/if}

					<div class="grid grid-cols-3 gap-4">
						<div class="_section">
							<div class="text-sm opacity-80">Recipients</div>

							<div class="text-lg  font-medium">
								{$selectedBroadcastEmail.totalEmailsCount}
							</div>
						</div>
						<div class="_section">
							<div class="text-sm opacity-80">Seen</div>

							<div class="flex gap-4 items-center">
								<div class="text-lg  font-medium">
									{$selectedBroadcastEmail.stats.uniqueOpensCount}
								</div>
								<div class="text-lg  font-medium opacity-50">
									({getPercentage(
										$selectedBroadcastEmail.stats.uniqueOpensCount,
										$selectedBroadcastEmail.totalEmailsCount
									)})
								</div>
							</div>
						</div>
						<div class="_section">
							<div class="text-sm opacity-80">Clicked</div>

							<div class="flex gap-4 items-center">
								<div class="text-lg  font-medium">
									{$selectedBroadcastEmail.stats.uniqueClicksCount}
								</div>

								{#if $selectedBroadcastEmail.stats.uniqueClicksCount}
									<div class="text-lg font-medium opacity-50">
										({getPercentage(
											$selectedBroadcastEmail.stats.uniqueClicksCount,
											$selectedBroadcastEmail.totalEmailsCount
										)})
									</div>
								{/if}
							</div>
						</div>

						<!-- <div class="_section">
							<div class="text-sm opacity-80">Spam Reports</div>

							<div class="font-medium">
								{getPercentage(
									$selectedBroadcastEmail.stats.spamComplaintsCount,
									$selectedBroadcastEmail.totalEmailsCount
								)}
							</div>
						</div> -->
					</div>
					<div class="text-sm opacity-70">
						Unsubscribed: {$selectedBroadcastEmail.stats.unsubscribedCount}
					</div>
					<div class="text-sm opacity-70">
						Spam Complaints: {$selectedBroadcastEmail.stats.spamComplaintsCount}
					</div>
				</div>
			{/if}

			<div class="border p-8 w-full max-w-[800px] mx-auto mt-8">
				<div>
					<span class="font-semibold">
						{$currentUser.fullName.split(' ')[0] || ''} from {parentPage.name}
					</span>
					<span class="opacity-80">(info@mmntm.build)</span>
				</div>
				<div class="text-lg mt-2 font-bold">{$selectedBroadcastEmail.subject}</div>
				<hr class="_border-theme my-4" />
				<div class="mt-2">
					{@html $selectedBroadcastEmail.html || ''}
				</div>
				{#if $selectedBroadcastEmail.imageUrl}
					<RenderUrl class="mt-4 rounded-lg" url={$selectedBroadcastEmail.imageUrl} />
				{/if}

				{#if $selectedBroadcastEmail.callToAction?.title}
					<div class="cursor-pointer bg-black text-white inline-block rounded px-8 py-2 mt-8">
						{$selectedBroadcastEmail.callToAction?.title}
					</div>
				{/if}
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

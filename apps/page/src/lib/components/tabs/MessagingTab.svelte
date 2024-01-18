<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { get, post, put } from 'lib/api';

	import ChatRoomTab from '$lib/components/tabs/ChatRoomTab.svelte';
	import allPages from 'lib-render/stores/allPages';
	import Loader from 'lib/components/Loader.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import currentUser from 'lib/stores/currentUser';
	import getPageCssStyles from 'lib-render/services/getPageCssStyles';

	export let page;
	export let selectedTrigger;
	export let chatRoom;
	export let selectedNewsletter;

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
	{#if selectedTrigger}
		{#key selectedTrigger._id}
			<div class="flex flex-col items-center">
				<div class="text-2xl font-bold">
					When a user submits a {selectedTrigger.on.includes('email') ? 'email' : 'form'}..
				</div>

				<div class="relative my-4 h-[50px]">
					<div class="absolute left-[50%] border-r border-black/50 h-full" />
				</div>

				{#each selectedTrigger.actionSequence as triggerAction}
					<div class="w-full">
						<div class="text-xl font-bold  text-center">
							{selectedTrigger.inMinutes
								? `In ${selectedTrigger.inMinutes} minutes`
								: 'Immediately'} send them message
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
		{/key}
	{:else if chatRoom}
		<ChatRoomTab {page} {chatRoom} />
	{:else if selectedNewsletter}
		<div class="w-full">
			<div class="border p-8 w-full max-w-[800px] mx-auto mt-8">
				<div>
					<span class="font-semibold">
						{$currentUser.fullName.split(' ')[0] || ''} from {parentPage.name}
					</span>
					<span class="opacity-80">(info@mmntm.build)</span>
				</div>
				<div class="text-lg mt-2 font-bold">{selectedNewsletter.subject}</div>
				<hr class="_border-theme my-4" />
				<div class="mt-2">
					{@html selectedNewsletter.html || ''}
				</div>
				{#if selectedNewsletter.imageUrl}
					<RenderUrl class="mt-4 rounded-lg" url={selectedNewsletter.imageUrl} />
				{/if}

				{#if selectedNewsletter.callToAction.title}
					<div class="cursor-pointer bg-black text-white inline-block rounded px-8 py-2 mt-8">
						{selectedNewsletter.callToAction.title}
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

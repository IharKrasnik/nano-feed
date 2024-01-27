<script>
	import moment from 'moment';
	import { get, post, put, del } from 'lib/api';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { LINKEDIN_LOGIN_URL, TWITTER_LOGIN_URL } from 'lib/env';
	import DateTimeInput from 'lib/components/DateTimeInput.svelte';
	import Button from 'lib/components/Button.svelte';
	import feedCache, { getFeed, updateFeedSortOrder } from 'lib-render/stores/feedCache';
	import getEmbeddedStreamSlug from '$lib/helpers/getEmbeddedStreamSlug';
	import selectedFeedItem from '$lib/stores/selectedFeedItem';
	import currentUser from 'lib/stores/currentUser';
	import ToggleGroup from '$lib/components/ToggleGroup.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import striptags from 'striptags';
	import BackTo from '$lib/components/BackTo.svelte';

	let linkedInLogin = async () => {
		const { url } = await get(LINKEDIN_LOGIN_URL);
		window.document.location.href = url;
	};

	let twitterLogin = async () => {
		const { url } = await get(TWITTER_LOGIN_URL);
		window.document.location.href = url;
	};

	export let page;
	let parentPage = page.parentPage || page;

	let loadFeed = async () => {
		await getEmbeddedStreamSlug({ page, streamType: 'feed' });
		await getFeed({
			streamSlug: parentPage.streams.feed.slug,
			sort: '-createdOn',
			perPage: 100,
			isIncludeDrafts: true
		});
	};

	loadFeed();

	let addNewPost = async () => {
		let newFeedItem = await post('feed', {
			isDraft: true,
			projects: [{ slug: parentPage.streams.feed.slug }]
		});

		$feedCache[parentPage.streams.feed.slug] = {
			...$feedCache[parentPage.streams.feed.slug],
			feed: [newFeedItem, ...$feedCache[parentPage.streams.feed.slug].feed]
		};
	};

	let updateFeedItem = async (feedItem) => {
		feedItem.syncTo = [];

		Object.keys(syncTo).forEach((accountId) => {
			feedItem.syncTo.push($currentUser.socialProfiles.find((a) => a.accountId === accountId));
		});

		if (feedItem.scheduleOn && moment(feedItem.scheduleOn) < moment()) {
			alert(`Publish date can't be before now`);
			return;
		}
		feedItem.content = striptags(feedItem.content);
		let updatedFeedItem = await put(`feed/${feedItem._id}`, {
			...feedItem
		});

		$feedCache[parentPage.streams.feed.slug].feed = $feedCache[
			parentPage.streams.feed.slug
		].feed.map((fi) => {
			if (fi._id === updatedFeedItem._id) {
				return updatedFeedItem;
			} else {
				return fi;
			}
		});
	};

	let deleteFeedItem = async (feedItem) => {
		await del(`feed/${feedItem._id}`);
		$feedCache[parentPage.streams.feed.slug].feed = $feedCache[
			parentPage.streams.feed.slug
		].feed.filter((fi) => fi._id !== feedItem._id);
	};

	let selectedFeedTab = 'drafts';
	let isConnectingExpanded = false;

	let publishNow = async () => {
		$selectedFeedItem.scheduleOn = null;
		await updateFeedItem($selectedFeedItem);
		$selectedFeedItem = null;
	};

	let syncTo = {};

	if ($currentUser.socialProfiles) {
		$currentUser.socialProfiles.forEach((socialProfile) => {
			syncTo[socialProfile.accountId] = true;
		});
	}
</script>

{#if $selectedFeedItem}
	<div class="w-full flex justify-between">
		<BackTo
			to="All Feed"
			onClick={async () => {
				$selectedFeedItem.scheduleOn = null;
				await updateFeedItem($selectedFeedItem);
				$selectedFeedItem = null;
			}}
		/>
		<div
			class="text-sm opacity-80 cursor-pointer hover:opacity-100"
			on:click={async () => {
				await deleteFeedItem($selectedFeedItem);
				$selectedFeedItem = null;
			}}
		>
			🗑 Delete
		</div>
	</div>
	<div class="_section">
		<div class="mb-1 font-semibold">Edit Post</div>
		<div class="opacity-60 mb-4">Edit content, schedule and publish</div>

		{#if $selectedFeedItem.scheduleOn}
			<DateTimeInput bind:date={$selectedFeedItem.scheduleOn} />
		{/if}

		<div class="mt-8 flex items-center gap-3">
			<Button
				class="_primary"
				onClick={async () => {
					if (!$selectedFeedItem.scheduleOn) {
						$selectedFeedItem.scheduleOn = moment().add(2, 'hours').toDate();
						return { isNoStatus: true };
					}
					await updateFeedItem($selectedFeedItem);
					$selectedFeedItem = null;
				}}>Schedule</Button
			>
			<Button class="_secondary " onClick={publishNow}>Publish Now</Button>
		</div>
	</div>

	<div class="_section">
		<div class="font-semibold mb-1">Sync to profiles</div>
		<div class="mb-2">Automatically publish to your social accounts</div>
		{#each $currentUser.socialProfiles || [] as socialProfile}
			<div class="w-full flex items-center  mb-2 mt-4">
				<div class="mr-2">
					<input type="checkbox" bind:checked={syncTo[socialProfile.accountId]} />
				</div>
				<div
					class="flex items-center bg-[#fafafa] p-2 rounded-lg w-full"
					in:fade={{ duration: 150 }}
				>
					<img
						src={socialProfile.profile_image_url}
						class="w-[30px] h-[30px] shrink-0 rounded-full object-cover"
					/>
					<div class="ml-3 w-full text-sm">
						<div class="flex items-center">
							<div class="font-semibold">
								{socialProfile.name}
							</div>
						</div>
						<div class="opacity-50">
							@{socialProfile.username}
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{:else}
	<div
		class="_section _info {isConnectingExpanded ? '' : 'cursor-pointer'}"
		on:click={() => {
			if (!isConnectingExpanded) {
				isConnectingExpanded = true;
			}
		}}
		style={isConnectingExpanded ? '' : 'padding: 0px 16px;'}
	>
		<div class="flex justify-between items-center ">
			<div class="font-semibold">Connected Accounts</div>
			<div class="">
				{#if !isConnectingExpanded}
					<div class="flex p-2 px-4 rounded-lg cursor-pointer">
						{#each $currentUser.socialProfiles || [] as socialProfile}
							<img
								src={socialProfile.profile_image_url}
								class="w-[30px] h-[30px] shrink-0 rounded-full object-cover mr-[-10px]"
							/>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		{#if isConnectingExpanded}
			{#if $currentUser.socialProfiles}
				{#each $currentUser.socialProfiles || [] as socialProfile}
					<div
						class="flex items-center bg-[#fafafa] p-2 rounded-lg mb-2 mt-4"
						in:fade={{ duration: 150 }}
					>
						<div>
							<img
								src={socialProfile.profile_image_url}
								class="w-[30px] h-[30px] shrink-0 rounded-full object-cover"
							/>
						</div>
						<div class="ml-3 w-full text-sm">
							<div class="flex items-center">
								<div class="font-semibold">
									{socialProfile.name}
								</div>
							</div>
							<div class="opacity-50">
								@{socialProfile.username}
							</div>
						</div>
					</div>
				{/each}
			{/if}

			<div class="mt-4 flex flex-col gap-2">
				<div
					class="text-sm flex items-center opacity-70 hover:opacity-100 cursor-pointer"
					on:click={twitterLogin}
				>
					<FeatherIcon size={16} name={'plus'} theme={parentPage.theme?.theme} /> Link X(Twitter) Account
				</div>
				<div
					class="text-sm flex items-center opacity-70 hover:opacity-100 cursor-pointer"
					on:click={linkedInLogin}
				>
					<FeatherIcon size={16} name={'plus'} theme={parentPage.theme?.theme} />
					Link LinkedIn Account
				</div>
			</div>
		{:else}{/if}
	</div>

	<Button class="_primary _small mb-4 w-full" onClick={addNewPost}>Add New Post</Button>

	<ToggleGroup
		class="mb-4 mt-8"
		tabs={[
			{ name: 'Drafts', key: 'drafts' },
			{ name: 'Scheduled', key: 'scheduled' },
			{ name: 'Posted', key: 'posted' }
		]}
		bind:value={selectedFeedTab}
	/>

	{#if parentPage && parentPage.streams && parentPage.streams.feed}
		{#each $feedCache[parentPage.streams.feed.slug]?.feed || [] as feedItem}
			<div
				class="_section cursor-pointer"
				class:_selected={feedItem._id === selectedFeedItem._id}
				on:click={() => ($selectedFeedItem = feedItem)}
			>
				{feedItem.content || 'Empty Draft'}
			</div>
		{/each}
	{/if}
{/if}

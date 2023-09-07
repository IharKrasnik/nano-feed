<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { v4 as uuidv4 } from 'uuid';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { GOOGLE_LOGIN_URL } from 'lib/env';
	import { get, post, put, del } from 'lib/api';
	import currentUser from 'lib/stores/currentUser';
	import tooltip from 'lib/use/tooltip';
	import clickOutside from 'lib/use/clickOutside';
	import BrowserFrame from 'lib/components/BrowserFrame.svelte';
	import Avatar from 'lib/components/Avatar.svelte';
	import FileInput from 'lib/components/FileInput.svelte';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import Twitter from 'lib/icons/twitter.svelte';
	import JournalFeedItem from '$lib/components/JournalFeedItem.svelte';
	import MomentumLogo from 'lib/icons/momentum.svelte';
	import AchievedBadge from '$lib/components/AchievedBadge.svelte';

	let streamSlug = 'show-up-daily';

	let journalFeed = [];

	let isShown = false;

	onMount(() => {
		isShown = true;
	});

	let creator = null;

	const getCreator = async () => {
		creator = await get(`creators/${$page.params.username.replace('@', '')}`);
	};

	const getFeed = async () => {
		let feedResult = await get('feed', {
			projectSlug: streamSlug,
			creatorUsername: $page.params.username.replace('@', '')
		});

		journalFeed = feedResult.results;
	};

	let date = moment();
	let title = moment(date).format('dddd, MMM DD');

	$: if ($page.params.username) {
		getCreator();
		getFeed();
	}
</script>

{#if creator}
	<div class="container max-w-[700px] mx-auto">
		<div class="px-4 sm:px-0 py-4">
			<div class="my-8 mb-16">
				<div class=" flex flex-col items-center">
					{#if creator.bannerUrl}
						<img class="mb-[-50px] rounded-xl" src={creator.bannerUrl} />
					{/if}
					<Avatar size="75px" user={creator} />
					<h3 class="text-xl opacity-80 mt-4 mb-2 font-bold">{creator.fullName}</h3>
					{#if creator.description}
						<div class="opacity-80 my-2 text-lg mb-4">{creator.description}</div>
					{/if}

					<div class="flex gap-2">
						{#if creator.twitterData}
							<a
								class="flex bg-[#e4e4e4] items-center my-2 p-2 rounded-xl bg-[#]"
								target="_blank"
								href="https://twitter.com/{creator.twitterData.username}"
							>
								<div class="w-[20px] mr-1">
									<Twitter />
								</div>
								<div class="opacity-80">
									{creator.twitterData.username}
								</div>
							</a>
						{/if}

						<a
							class="flex bg-[#e4e4e4] items-center my-2 p-2 rounded-xl bg-[#]"
							target="_blank"
							href="https://feed.mmntm.build/@{creator.username}"
						>
							<div class="w-[20px] mr-1">
								<MomentumLogo />
							</div>
							<div class="opacity-80">
								{creator.username}
							</div>
						</a>
					</div>
					{#if $currentUser && $currentUser._id === creator._id}
						<a
							target="_blank"
							href="https://feed.mmntm.build/@{creator.username}/edit"
							class="button mt-2 py-2"
							style="padding: 8px 16px;">💥 Edit My Profile</a
						>
					{/if}
				</div>
			</div>

			{#each journalFeed as feedItem (feedItem._id)}
				<JournalFeedItem {feedItem} />
			{/each}
		</div>
	</div>
{/if}

<AchievedBadge />

<style>
	.blob {
		/* border-radius: 40px; */
	}
</style>

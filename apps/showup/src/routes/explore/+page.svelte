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
	import JournalFeedItem from '$lib/components/JournalFeedItem.svelte';
	import Twitter from 'lib/icons/twitter.svelte';
	import AchievedBadge from '$lib/components/AchievedBadge.svelte';

	let streamSlug = 'show-up-daily';

	let journalFeed = [];

	let isShown = false;

	onMount(() => {
		isShown = true;
	});

	let creator = null;

	const getFeed = async () => {
		let feedResult = await get('feed', {
			projectSlug: streamSlug
		});

		journalFeed = feedResult.results;
	};

	let date = moment();
	let title = moment(date).format('dddd, MMM DD');

	getFeed();
</script>

<div class="container max-w-[700px] mx-auto">
	<div class="mt-8 px-4 sm:px-0 py-4">
		{#each journalFeed as feedItem (feedItem._id)}
			<JournalFeedItem {feedItem} />
		{/each}
	</div>
</div>

{#if !$currentUser && isShown}
	<div class="w-full flex justify-center mt-16 mb-16" in:fade={{ delay: 300 }}>
		<a class="button" style="background: none; border: 3px #555 solid; color: #555;" href={'/'}
			>Publish your journal
		</a>
	</div>
{/if}

<AchievedBadge />

<style>
	.blob {
		/* border-radius: 40px; */
	}
</style>

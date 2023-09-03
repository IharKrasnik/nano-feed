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
			creatorUsername: $page.params.username.replace('@', ''),
			isMyOnly: true
		});

		journalFeed = feedResult.results;
	};

	let date = moment();
	let title = moment(date).format('dddd, MMM DD');

	getCreator();

	getFeed();
</script>

{#if creator}
	<div class="container max-w-[700px] mx-auto">
		<div class="p-4">
			<div class="my-8 mb-16">
				<a class="flex flex-col items-center">
					<Avatar size="75px" user={creator} />
					<h3 class="text-xl opacity-80 my-4">{creator.fullName}</h3>
				</a>
			</div>

			{#each journalFeed as feedItem (feedItem._id)}
				<h3 class="text-2xl font-bold flex items-center">
					{feedItem.title}
					{#if feedItem.twitterData}
						<a
							class="block ml-2"
							href="https://twitter.com/nano_fund/status/{feedItem.twitterData.id}"
							target="_blank"
						>
							<div class="w-[25px]">
								<Twitter />
							</div>
						</a>
					{/if}
				</h3>

				<div class="mt-4 whitespace-pre-wrap text-lg opacity-70">
					{feedItem.content.replace('Report #buildinpublic', '')}
				</div>

				<img
					class="max-w-[150px] mx-auto my-4"
					src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1693763239679-image.png"
				/>
			{/each}
		</div>
	</div>
{/if}

{#if !$currentUser && isShown}
	<img
		class="max-w-[150px] mx-auto my-8"
		src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1693763239679-image.png"
	/>

	<div class="w-full flex justify-center" in:fade={{ delay: 300 }}>
		<a class="button" style="background: none; border: 3px #555 solid; color: #555;" href={'/'}
			>Publish your journal
		</a>
	</div>
	<img
		class="max-w-[150px] mx-auto my-8"
		src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1693763239679-image.png"
	/>
{/if}

<style>
	.blob {
		/* border-radius: 40px; */
	}
</style>

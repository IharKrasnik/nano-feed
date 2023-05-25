<script>
	import _ from 'lodash';
	import dayjs from 'dayjs';
	import axios from 'axios';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import { get, post, put, del, postFile } from 'lib/api';
	import autofocus from 'lib/use/autofocus';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';

	import AutoCompleteInput from 'lib/components/AutoCompleteInput.svelte';
	import FeedItem from '$lib/components/FeedItem.svelte';
	import IndieFeedItem from '../[[username]]/embed-indienews/components/IndieFeedItem.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import Button from 'lib/components/Button.svelte';

	import sources from '$lib/stores/sources';
	import currentUser from 'lib/stores/currentUser';
	import { browser } from '$app/environment';
	import { toast } from '@zerodevx/svelte-toast';

	import EditMoment from './components/EditMoment.svelte';

	let projects;
	let isProjectsLoading = false;
	let creators;
	let urlIsDirty = false;
	let isFullUrlEdit = false;

	const fetchProjects = async () => {
		isProjectsLoading = true;

		try {
			const { results } = await get('projects');
			projects = results;

			if (browser && window.history.state.projectSlug) {
				feedItem.projects = [projects.find((p) => p.slug === history.state.projectSlug)];
			}
		} finally {
			isProjectsLoading = false;
		}
	};

	fetchProjects();

	const fetchCreators = async () => {
		const { results } = await get('creators');
		creators = results;
	};

	fetchCreators();

	let url;
	let attachmentUrl;
	let files = [];
	let addAttachmentClicked = false;

	let startTitle = browser ? window.history.state.title : null;

	function isValidHttpUrl(string) {
		let url;
		try {
			url = new URL(string);
		} catch (_) {
			return false;
		}
		return url.protocol === 'http:' || url.protocol === 'https:';
	}

	let urlIsLoading = false;

	const addUrl = async () => {
		urlIsLoading = true;

		try {
			const { data } = await axios({
				url: 'https://igor.npkn.net/fetch-meta-tags',
				params: { url }
			});

			feedItem.url = data.url || url;
			feedItem.embedUrl = data.embedUrl;

			feedItem.source = data.source;

			feedItem.title = data.title;
			feedItem.content = data.description;

			if (data.image) {
				feedItem.attachments = [{ type: 'image', url: data.image }];
			}

			if (data.creatorUsernames) {
				feedItem.creators = data.creatorUsernames.map((username) =>
					creators.find((c) => c.username === username)
				);
			}

			if (data.projectSlugs) {
				feedItem.projects = data.projectSlugs.map((projectSlug) =>
					projects.find((c) => c.slug === projectSlug)
				);
			}
		} finally {
			urlIsLoading = false;
		}
	};

	if (isValidHttpUrl(startTitle)) {
		url = startTitle;
	}

	onMount(() => {
		if (url) {
			addUrl();
		}
	});

	// let feedItem = {
	// 	publishedOn: new Date(),
	// 	creators: [$currentUser],
	// 	title: (!url && startTitle) || '',
	// 	content: '',
	// 	url,
	// 	source: null,
	// 	attachments: []
	// };

	const onProjectsSelected = (selectedProjects) => {
		projects = selectedProjects;
	};

	const deleteFeed = async () => {
		await del(`feed/${feedId}`);
		goto('/');
	};

	let feedItems = [];

	let addFeedItem = () => {
		feedItems.push({
			publishedOn: new Date(),
			creators: [$currentUser],
			title: (!url && startTitle) || '',
			content: '',
			url,
			source: null,
			attachments: []
		});
		feedItems = [...feedItems];
	};

	addFeedItem();

	let processStr = (s) => {
		s = '\n' + s;
		let results = [];

		let splitsHandle = s.split(/\n@/g);

		splitsHandle.forEach((splitHandle) => {
			let twitterUsernames = [];

			let [twitterUsername, ...msgs] = splitHandle.split(' ');
			twitterUsername = twitterUsername.toLowerCase();

			twitterUsername && twitterUsernames.push(twitterUsername);

			while (msgs[0]?.startsWith('@')) {
				let [addTwitterUsername, ...newMsgs] = msgs;
				addTwitterUsername = addTwitterUsername.toLowerCase().replace('@', '');

				addTwitterUsername && twitterUsernames.push(addTwitterUsername);
				msgs = newMsgs;
			}

			let [title, ...textMsgs] = msgs.join(' ').split('\n');

			results.push({
				title,
				twitterUsernames,
				message: textMsgs.join(' ')
			});
		});

		return results.filter((r) => r.message);
	};

	let tweetText;

	let parseFromTweet = async () => {
		let splits = processStr(tweetText);

		let allTwitterUsernames = [];

		splits.forEach((split) => {
			split.twitterUsernames.forEach((username) => {
				allTwitterUsernames.push(username.toLowerCase());
			});
		});

		let distinctTwitterUsernames = _.uniq(allTwitterUsernames);

		let users = await post('creators/by-twitter', { twitterUsernames: distinctTwitterUsernames });

		feedItems = [];

		splits.forEach((s) => {
			feedItems.push({
				publishedOn: new Date(),
				title: s.title || null,
				content: `${s.message}`,
				creators: s.twitterUsernames.map((twitterUsername) => {
					return (
						users.find((u) => u.twitterUsername.toLowerCase() === twitterUsername.toLowerCase()) ||
						$currentUser
					);
				}),
				attachments: []
			});
		});

		return feedItems;
	};

	let publishAll = async () => {
		let publishedMoments = await post('feed/batch', {
			projectSlug: projects[0].slug,
			feedItems
		});

		showSuccessMessage(`${publishedMoments.length} moments are published 😱`);

		if (projects[0]) {
			goto(`/${projects[0].slug}`);
		} else if (updatedFeedItem.creators[0]) {
			goto(`/@${updatedFeedItem.creators[0].username}`);
		} else {
			goto(`/`);
		}
	};
</script>

<svelte:head>
	<title>Batch Publish 😱</title>
</svelte:head>

{#if $currentUser}
	<div>
		<h2 class="mb-2">Publish multiple moments</h2>

		<h3 class="mb-4">Curate releases by featuring multiple posts at once.</h3>

		{#if projects}
			<div class="mb-8">
				<label>Streams</label>

				<AutoCompleteInput
					onChange={onProjectsSelected}
					placeholder="Search Streams"
					valueField="slug"
					searchField="title"
					isMulti
					allSuggestions={projects.filter((s) => s.slug)}
				>
					<!-- <div slot="item" let:item={item}>
					hey {item.label}
				</div> -->
				</AutoCompleteInput>
			</div>
		{/if}

		<div class="mb-8">
			<div class="font-bold">Parse from tweet</div>
			<textarea placeholder="@that_igor did something" bind:value={tweetText} />
			<Button class="small mt-2" onClick={parseFromTweet}>Parse</Button>
		</div>

		<div class="py-4">
			<button on:click={addFeedItem}>Add Moment</button>
		</div>

		{#each feedItems as feedItem}
			<EditMoment bind:feedItem />
		{/each}

		<button on:click={publishAll}>Publish All</button>
	</div>

	<div
		class="hidden md:flex w-[400px] overflow-y-auto h-screen overflow-y-scroll"
		style="
    position: fixed;
    top: 0;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    transform: translateX(600px);
    "
	>
		<h3 class="mb-4">Moment Preview</h3>

		{#each feedItems as feedItem}
			<IndieFeedItem bind:feedItem />
		{/each}
	</div>
{/if}

<style>
</style>

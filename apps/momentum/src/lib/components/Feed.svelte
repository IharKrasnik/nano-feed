<script>
	import _ from 'lodash';
	import { fly, fade, slide } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { GOOGLE_LOGIN_URL, LINKEDIN_LOGIN_URL, TWITTER_LOGIN_URL, PAGE_URL } from 'lib/env';
	import { get, post, del } from 'lib/api';

	let feed = [];

	import Modal from 'lib/components/Modal.svelte';
	import EmbedStream from '$lib/components/EmbedStream.svelte';

	import FeedItem from '$lib/components/FeedItem.svelte';
	import StreamCard from '$lib/components/StreamCard.svelte';
	import CadenceGrid from '$lib/components/CadenceGrid.svelte';
	import FollowButton from '$lib/components/FollowButton.svelte';
	import InfiniteScroll from 'lib/components/InfiniteScroll.svelte';
	import WaveIndicator from '$lib/components/WaveIndicator.svelte';

	import currentUser, { isLoading as isUserLoading } from 'lib/stores/currentUser';
	import allProjects from '$lib/stores/allProjects';
	import { fetch as fetchFeed } from '$lib/stores/feed';
	import creators, { update as updateCreators } from '$lib/stores/creators';

	import sources from '$lib/stores/sources';

	import { writable } from 'svelte/store';

	export let ogTitle = 'Momentum';
	export let ogDescription = 'Momentum is a tool to build in public and grow audience early.';

	let creator;
	let prevCreator;

	let projects = writable(null);

	let isProjectsLoading = false;
	let isCreatorLoading = false;
	let pageNumber = 1;

	const updateProjects = async ({ projectSlug, creatorUsername, isExplore = false }) => {
		let prevProjects = $projects;

		if (!creatorUsername) {
			$projects = $allProjects;
		} else {
			let query = { creatorUsername };

			isProjectsLoading = true;

			try {
				const { results } = await get('projects', query);
				$projects = results;
			} finally {
				isProjectsLoading = false;
			}
		}
	};

	const checkAndUpdateProjects = async (paramUsername) => {
		if (paramUsername === 'explore') {
			if (!isExploreProjectsModeOn) {
				toggleProjectsExploreMode();
			}
		} else {
			let username =
				paramUsername && paramUsername.startsWith('@') ? paramUsername.replace('@', '') : null;
			let projectSlug = paramUsername && !paramUsername.startsWith('@') ? paramUsername : null;

			if (username) {
				if (username !== prevCreator?.username) {
					isCreatorLoading = true;
					updateProjects({ creatorUsername: username });

					if (username !== $currentUser?.username) {
						creator = await get(`creators/${username}`);
					} else {
						creator = $currentUser;
					}

					if (!prevCreator) {
						setProject();
					}

					if (isExploreProjectsModeOn) {
						// toggleProjectsExploreMode();
						isExploreProjectsModeOn = false;
					}

					prevCreator = _.clone(creator);

					isCreatorLoading = false;
				}
			}

			if (projectSlug) {
				let forceRefresh = false;

				if (!username && creator) {
					creator = null;
					prevCreator = null;
					await updateProjects({});
					forceRefresh = true;
				}

				if ($projects) {
					let project = $projects.find((p) => p.slug === projectSlug);

					if (!project) {
						project = await get(`projects/${projectSlug}`);
					}

					setProject(project, forceRefresh);

					if ($page.url.searchParams.get('embed')) {
						embed();
					}
				} else {
					await updateProjects({});

					return checkAndUpdateProjects(paramUsername);
				}
			}

			if ($page.url.pathname === '/') {
				if (!username && !projectSlug) {
					creator = null;
					prevCreator = null;

					if (isExploreProjectsModeOn) {
						toggleProjectsExploreMode();
					} else {
						if (!$projects) {
							await updateProjects({});
						}

						setProject();
					}
				}
			}
		}
	};

	$: checkAndUpdateProjects($page.params.username);

	let selectedSource = null;

	const getDefaultProject = () => {
		return creator
			? {
					_id: creator._id,
					slug: null,
					title: creator.fullName,
					description: creator.description || `A feed from ${creator.fullName}`
			  }
			: {
					slug: null,
					title: isExploreProjectsModeOn
						? 'Explore Momentum'
						: $currentUser
						? 'My Feed'
						: 'Momentum Feed',
					description: isExploreProjectsModeOn
						? `Updates from streams that you don't follow yet.`
						: $currentUser
						? 'Latest updates from Momentum streams that I follow'
						: 'Latest updates from Momentum streams'
			  };
	};

	let selectedProject;

	let fetchFeedPage = ({ page = 1 } = {}) => {
		return fetchFeed({
			source: selectedSource,
			project: selectedProject?.slug,
			creatorUsername: creator?.username,
			isExplore: isExploreProjectsModeOn,
			page
		});
	};

	let refreshFeed = async () => {
		feed = [];
		isExploreModeOn = false;
		searchText = '';
		pageNumber = 1;

		feed = await fetchFeedPage();

		if (!creator) {
			updateCreators({ projectSlug: selectedProject?.slug, isExplore: isExploreProjectsModeOn });
		} else {
			$creators = [];
		}
	};

	const setProject = (newProject = getDefaultProject(), forceRefresh = false) => {
		if (!selectedProject || selectedProject?.slug !== newProject?.slug) {
			selectedProject = newProject;
			refreshFeed();
		} else if (!newProject?.slug) {
			selectedProject = newProject;
			refreshFeed();
		} else if (forceRefresh) {
			refreshFeed();
		}
	};

	let isExploreModeOn = false;

	const toggleExplore = () => {
		isExploreModeOn = !isExploreModeOn;
	};

	let isExploreProjectsModeOn = false;

	const toggleProjectsExploreMode = () => {
		isExploreProjectsModeOn = !isExploreProjectsModeOn;

		updateProjects({ isExplore: isExploreProjectsModeOn });

		if (creator) {
			creator = null;
		}

		setProject();

		refreshFeed();
	};

	let scrollY;

	let startWritingPlaceholder = 'What have you created today?';
	let startWritingFocusPlaceholder = 'Start typing or insert a link';
	let isStartWritingFocus = false;

	let searchText = '';

	let search = () => {};

	let isEmbed = false;

	let embed = () => {
		isEmbed = true;
	};

	let loadMore = async () => {
		pageNumber++;
		const feedPage = await fetchFeedPage({ page: pageNumber });
		feed = [...feed, ...feedPage];
	};

	let linkedInLogin = async () => {
		const { url } = await get(LINKEDIN_LOGIN_URL);
		window.document.location.href = url;
	};

	let twitterLogin = async () => {
		const { url } = await get(TWITTER_LOGIN_URL);
		window.document.location.href = url;
	};
</script>

<svelte:head>
	{#if !creator && selectedProject}
		<title
			>{selectedProject.slug
				? selectedProject.title + ' — Momentum Stream'
				: isExploreProjectsModeOn
				? 'Explore — Momentum'
				: 'My Feed — Momentum'}
		</title>
		<meta
			property="og:title"
			content={selectedProject.slug
				? selectedProject.title + ' — Momentum Stream'
				: isExploreProjectsModeOn
				? 'Explore — Momentum'
				: 'My Feed — Momentum'}
		/>
	{/if}

	{#if creator}
		<title>{creator.fullName} — Momentum Stream</title>
		<meta property="og:title" content="{creator.fullName} — Momentum Stream" />
	{/if}
</svelte:head>

<svelte:window bind:scrollY />

<!-- 
<blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">Most people don&#39;t grow on social media because they don&#39;t have anything interesting to say.</p>&mdash; Dakota Robertson (@WrongsToWrite) <a href="https://twitter.com/WrongsToWrite/status/1613440911249211392?ref_src=twsrc%5Etfw">January 12, 2023</a></blockquote> 

<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@spookzapp/video/7182249917174353158" data-video-id="7182249917174353158" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@spookzapp" href="https://www.tiktok.com/@spookzapp?refer=embed">@spookzapp</a> Wow 70% that’s freaking high🤯 <a title="spookz" target="_blank" href="https://www.tiktok.com/tag/spookz?refer=embed">#spookz</a> <a title="spookzstreaming" target="_blank" href="https://www.tiktok.com/tag/spookzstreaming?refer=embed">#spookzstreaming</a> <a title="getspookz" target="_blank" href="https://www.tiktok.com/tag/getspookz?refer=embed">#getspookz</a> <a title="fy" target="_blank" href="https://www.tiktok.com/tag/fy?refer=embed">#fy</a> <a title="foryou" target="_blank" href="https://www.tiktok.com/tag/foryou?refer=embed">#foryou</a> <a title="fyp" target="_blank" href="https://www.tiktok.com/tag/fyp?refer=embed">#fyp</a> <a title="twitch" target="_blank" href="https://www.tiktok.com/tag/twitch?refer=embed">#twitch</a> <a title="streaming" target="_blank" href="https://www.tiktok.com/tag/streaming?refer=embed">#streaming</a> <a title="spookzstreaming" target="_blank" href="https://www.tiktok.com/tag/spookzstreaming?refer=embed">#spookzstreaming</a> <a title="gamingontiktok" target="_blank" href="https://www.tiktok.com/tag/gamingontiktok?refer=embed">#gamingontiktok</a> <a title="smalltwitchstreamer" target="_blank" href="https://www.tiktok.com/tag/smalltwitchstreamer?refer=embed">#smalltwitchstreamer</a> <a title="twitchcommunitygamer" target="_blank" href="https://www.tiktok.com/tag/twitchcommunitygamer?refer=embed">#twitchcommunitygamer</a> <a target="_blank" title="♬ She Share Story (for Vlog) - 山口夕依" href="https://www.tiktok.com/music/She-Share-Story-for-Vlog-6722656094272883458?refer=embed">♬ She Share Story (for Vlog) - 山口夕依</a> </section> </blockquote> -->

{#if isEmbed}
	<Modal isShown onClosed={() => (isEmbed = false)} maxWidth={800}>
		<div class="p-8 min-h-[300px] max-w-[800px] mx-auto">
			<EmbedStream project={selectedProject} {creator} />
		</div>
	</Modal>
{/if}

<div>
	<!-- <div class="fixed w-full h-[65px] bg-black left-0 top-0 md:hidden" style="z-index: 1200; background-image: url({selectedProject?.bannerUrl})"> -->
	{#if scrollY > 65}
		{#key selectedProject?.slug}
			<div
				class="fixed w-full h-[65px] bg-black left-0 top-[0px] md:hidden"
				style="z-index: 1200;"
				transition:slide={{ duration: 100 }}
			>
				<div class="flex justify-between items-center px-8 h-full">
					<h1 style="font-size: 18px;">{selectedProject?.title || ''}</h1>
					{#if $currentUser}
						<FollowButton {creator} project={selectedProject} isShort class="small" />
					{:else}
						<a href={GOOGLE_LOGIN_URL} style="font-family: Montserrat; font-weight: bold;">
							<button class="flex items-center justify-center small">
								<svg
									class="mr-4"
									style="width: 20px; height: 20px; "
									xmlns="http://www.w3.org/2000/svg"
									xmlns:xlink="http://www.w3.org/1999/xlink"
									viewBox="0 0 48 48"
									><defs
										><path
											id="a"
											d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
										/></defs
									><clipPath id="b"><use xlink:href="#a" overflow="visible" /></clipPath><path
										clip-path="url(#b)"
										fill="#FBBC05"
										d="M0 37V11l17 13z"
									/><path
										clip-path="url(#b)"
										fill="#EA4335"
										d="M0 11l17 13 7-6.1L48 14V0H0z"
									/><path
										clip-path="url(#b)"
										fill="#34A853"
										d="M0 37l30-23 7.9 1L48 0v48H0z"
									/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" /></svg
								>

								Sign In
							</button>
						</a>
					{/if}
				</div>
			</div>
		{/key}
	{/if}

	<div>
		<section class="relative flex justify-between mb-8">
			<div class="flex w-full items-center">
				<div>
					<div class="items-center w-full">
						<h1 class="flex items-center text-xl font-bold" style="z-index: 100;">
							{selectedProject?.title || '...'}
						</h1>
					</div>
					<div
						class="text-lg mt-2"
						style="opacity: .8;"
						in:fly={{ y: -50, duration: 150, delay: 150 }}
					>
						{selectedProject?.description || '...'}
					</div>
				</div>
			</div>
		</section>
	</div>

	<div
		class="fixed top-0 left-0 md:left-auto md:ml-[-325px] w-full md:w-[250px] bg-black {isExploreModeOn
			? 'visible opacity-100'
			: 'invisible md:visible opacity-0 md:opacity-100'}"
		style="height: 100vh; overflow-y: scroll; padding-left: 5px; z-index: {isExploreModeOn
			? 1200
			: 0}; transition: all 0.1s linear;"
	>
		{#if isExploreModeOn}
			<button
				class="w-[60px] h-[60px] text-[30px] rounded-full flex items-center justify-center border-none fixed bg-black right-4 top-4 font-xl z-10"
				on:click|preventDefault={toggleExplore}
			>
				⤬
			</button>
		{/if}

		<div class="relative left-0 p-8 md:p-0">
			<div class="relative pt-16 md:pt-32">
				<div>
					<a
						class="cursor-pointer _menu_item flex items-center py-2 ml-[-10px]"
						class:_selected={!selectedProject?.slug &&
							!isExploreProjectsModeOn &&
							!isCreatorLoading &&
							!creator}
						href="/"
					>
						<div class="_emoji p-2 mr-2 rounded-full font-bold" style="color: gray; opacity: .7;">
							🌀
						</div>
						{$currentUser ? 'My Feed' : 'Momentum Feed'}
					</a>

					{#if $currentUser}
						<a
							class="cursor-pointer _menu_item flex items-center py-2 ml-[-10px]"
							class:_selected={selectedProject?._id === $currentUser._id}
							href="/@{$currentUser.username}"
						>
							<div
								class="_emoji p-2 mr-2 rounded-full text-[#00eaff] font-bold"
								style="opacity: .7;"
							>
								@
							</div>
							{$currentUser.fullName}
						</a>
					{/if}

					<!-- <a 
						class="cursor-pointer _menu_item flex items-center py-2 ml-[-10px]"
						class:_selected="{isExploreProjectsModeOn}"
						href="/explore"
					>

						<div class="_emoji p-2 mr-2 rounded-full font-bold" style="color: gray; opacity: .7;">
							<svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 1792 1792" width="15" style="background: black;width: 15px;height: 15px;"><path d="M991 1024l64-256h-254l-64 256h254zm768-504l-56 224q-7 24-31 24h-327l-64 256h311q15 0 25 12 10 14 6 28l-56 224q-5 24-31 24h-327l-81 328q-7 24-31 24h-224q-16 0-26-12-9-12-6-28l78-312h-254l-81 328q-7 24-31 24h-225q-15 0-25-12-9-12-6-28l78-312h-311q-15 0-25-12-9-12-6-28l56-224q7-24 31-24h327l64-256h-311q-15 0-25-12-10-14-6-28l56-224q5-24 31-24h327l81-328q7-24 32-24h224q15 0 25 12 9 12 6 28l-78 312h254l81-328q7-24 32-24h224q15 0 25 12 9 12 6 28l-78 312h311q15 0 25 12 9 12 6 28z" style="fill: #00ffa4;"/></svg>
						</div>
						Explore
					</a> -->
				</div>

				<div class="mt-16 w-full" in:fly>
					<a href="/launch" class="w-full">
						<button class="small w-full"> 🚀 Launch Your #Stream </button>
					</a>
				</div>

				<div class="mt-16">
					{#if creator}
						<h2 class="flex items-center py-2 mt-16 text-lg">
							{creator.fullName}
							<img
								src={creator.avatarUrl}
								class="w-[30px] h-[30px] rounded-full inline ml-4 mr-[13px] my-2"
							/>
						</h2>
					{/if}

					<div class="flex justify-between items-center font-bold block mt-8 mb-4">
						<div>
							{$currentUser && !creator ? 'All Streams' : ''}
							{creator ? `Contributions` : ''}
							{(!$currentUser && !creator && 'Explore Streams') || ''}
							{#if !isProjectsLoading && $projects?.length}
								<span class="number-tag">{creator ? $projects.length : $allProjects.length}</span>
							{/if}
						</div>
					</div>
				</div>

				{#if creator && creator._id !== $currentUser?._id}
					<a
						class="cursor-pointer _menu_item flex items-center py-2 ml-[-10px]"
						class:_selected={selectedProject?._id === creator._id}
						href="/@{creator.username}"
						on:click={() => {
							setProject();
						}}
					>
						<div
							class="_emoji p-2 mr-2 rounded-full font-bold"
							style="color: rgb(208, 145, 255); opacity: .7;"
						>
							@
						</div>
						{creator.fullName}
					</a>
				{/if}

				{#if isExploreProjectsModeOn}
					<a
						class="cursor-pointer _menu_item flex items-center py-2 ml-[-10px]"
						class:_selected={!selectedProject?.slug && !creator}
						href="/"
						on:click={() => {
							setProject();
						}}
					>
						<div class="_emoji p-2 mr-2 rounded-full font-bold" style="color: gray; opacity: .7;">
							#
						</div>
						All Streams
					</a>
				{/if}

				{#if !isProjectsLoading && $projects?.length}
					<input
						type="text"
						placeholder="Search streams.."
						style="border: none; padding-left: 0;"
						bind:value={searchText}
						on:input={search}
					/>

					<div class="pb-[200px]">
						{#if $projects?.length}
							<div in:fade>
								{#each (creator?.username ? $projects : $allProjects).filter((p) => p.title
										.toLowerCase()
										.startsWith(searchText.toLowerCase())) as project}
									<a
										class="cursor-pointer _menu_item flex items-center py-1 ml-[-10px]"
										class:_selected={selectedProject?.slug === project.slug}
										href={(creator ? `/@${creator.username}` : '') ||
											(project.slug ? `/${project.slug}` : '/')}
										on:click={() => {
											if (creator) {
												// as url not changing
												setProject(project);
											}
										}}
										style="border-color: {project.color}"
									>
										<div
											class="_emoji p-2 mr-2 rounded-full font-bold"
											style="color: {project.color}; opacity: .7;"
										>
											#
										</div>
										{project.title}
									</a>
								{/each}
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<div
	class="hidden md:block fixed w-[300px] top-0 overflow-y-scroll h-screen pb-32"
	style="margin-left: 605px; padding: 5px;"
>
	<div class="mt-24 xl:mt-6">
		<div>
			{#if $currentUser}{:else}
				<a
					class="mb-16"
					href={GOOGLE_LOGIN_URL}
					style="font-family: Montserrat; font-weight: bold;"
				>
					<button class="flex items-center justify-center w-full mb-8">
						<svg
							class="mr-4"
							style="width: 20px; height: 20px; margin-left: -20px;"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							viewBox="0 0 48 48"
							><defs
								><path
									id="a"
									d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
								/></defs
							><clipPath id="b"><use xlink:href="#a" overflow="visible" /></clipPath><path
								clip-path="url(#b)"
								fill="#FBBC05"
								d="M0 37V11l17 13z"
							/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" /><path
								clip-path="url(#b)"
								fill="#34A853"
								d="M0 37l30-23 7.9 1L48 0v48H0z"
							/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" /></svg
						>

						Join Momentum
					</button>
				</a>
			{/if}
		</div>

		<!-- <div class="mb-8">
				<label>Source</label>
				
				<AutoCompleteInput
					onChange={(selectedItem) => { 
						console.log('onchange')
						selectedSource = selectedItem?.value || null; 
						refreshFeed();
					}}
					placeholder="Select source.."
					limitItemsCount={20}
					allSuggestions={$sources.filter(s => s.value)}
					initialSelectedItem={ null }
				>
				</AutoCompleteInput>
			</div> -->

		{#if selectedProject || creator}
			<StreamCard isEditable stream={creator || selectedProject} creators={!creator && $creators} />

			<FollowButton class="w-full mb-8" project={!creator && selectedProject} {creator} />

			{#if creator && selectedProject.slug}
				<div class="mt-16">
					<StreamCard stream={selectedProject} />

					<FollowButton project={selectedProject} />
				</div>
			{/if}

			<!-- {#if $currentUser && (selectedProject?.slug || creator)}
				{#if $currentUser.isAdmin || (selectedProject && selectedProject.creator?._id === $currentUser._id) || (creator && creator._id === $currentUser._id)}
					<a class="w-full" href="/{creator ? `@${creator.username}` : selectedProject.slug}/edit">
						<button class="my-2 small w-full">
							Edit
							{#if creator}
								@{creator.fullName}
							{:else}
								#{selectedProject.title}
							{/if}
						</button>
					</a>
				{/if}
			{/if} -->
		{/if}

		{#if $currentUser && creator && creator._id === $currentUser._id}
			<div class="cursor-pointer w-full flex justify-center my-2">
				{#if $currentUser.oauth.linkedin}
					✅ LinkedIn Connected
				{:else}
					<a
						class="button w-full small flex items-center justify-center"
						on:click|preventDefault={linkedInLogin}
					>
						🟦 Connect LinkedIn
					</a>
				{/if}
			</div>
		{/if}

		{#if $currentUser && creator && creator._id === $currentUser._id}
			<div class="cursor-pointer w-full flex justify-center my-2">
				{#if $currentUser.oauth.twitter}
					✅ Twitter Connected
				{:else}
					<a
						class="button w-full small flex items-center justify-center"
						on:click|preventDefault={twitterLogin}
					>
						🐦 Connect Twitter
					</a>
				{/if}
			</div>
		{/if}

		{#if $currentUser && selectedProject?.page?._id && ($currentUser.isAdmin || selectedProject?.creator?._id === $currentUser._id)}
			<div class="cursor-pointer w-full flex justify-center my-2">
				<a class="button w-full small flex items-center justify-center" href={PAGE_URL}>
					📄 Edit Page
				</a>
			</div>
		{/if}

		{#if $currentUser && ($currentUser.isAdmin || selectedProject?.creator?._id === $currentUser._id)}
			<div class="cursor-pointer w-full flex justify-center my-4">
				<a class="button w-full small flex items-center justify-center" on:click={embed}>
					✨ Embed Stream
				</a>
			</div>
		{/if}

		<WaveIndicator bind:project={selectedProject} class="mt-4" />
	</div>

	<div class="mt-8">
		<div class="font-bold mb-4">Cadence</div>

		{#key selectedProject}
			<div in:fade>
				<CadenceGrid projectSlug={selectedProject?.slug} creatorUsername={creator?.username} />
			</div>
		{/key}
	</div>
	<!-- {#if feed?.length}
			<FeedItem feedItem={feed[0]} />
		{/if} -->
</div>

<div />

{#if !isProjectsLoading}
	{#if $currentUser && (!creator || creator._id === $currentUser._id)}
		<div class="relative">
			<img
				class="absolute left-4 rounded-full top-3"
				style="width: 30px; height: 30px"
				src={$currentUser.avatarUrl}
			/>

			<textarea
				class="pl-16 mb-4"
				placeholder={isStartWritingFocus ? startWritingFocusPlaceholder : startWritingPlaceholder}
				rows="1"
				on:input={(e) =>
					goto('/write', {
						state: {
							title: e.target.value,
							projectSlug: selectedProject?.slug || ''
						}
					})}
				on:focus={() => {
					isStartWritingFocus = true;
				}}
				on:blur={() => {
					isStartWritingFocus = false;
				}}
			/>
		</div>
	{/if}

	<FollowButton class="w-full mb-8 md:hidden" project={selectedProject} {creator} isOnlyFollow />

	{#if creator && selectedProject?._id !== creator._id}
		<div
			class="flex justify-start items-center py-4 mb-4 text-lg font-bold"
			style="font-family: 'Montserrat'"
		>
			Substream from {creator.fullName}
		</div>
	{/if}

	{#if selectedProject?.goal}
		<div class="p-2 text-center bg-zinc-900 flex items-center mb-8 rounded-3xl justify-center">
			<div class="rounded-full rounded-full flex items-center jusify-center mr-4">🎯</div>
			<div>{selectedProject.goal}</div>
		</div>
	{/if}

	{#if feed.length > 0}
		<div in:fly={{ y: 50, duration: 150, delay: 150 }} style="padding: 2px; padding-bottom: 300px;">
			<InfiniteScroll
				hasMore={true}
				threshold={100}
				elementScroll={'body'}
				onLoadMore={() => {
					loadMore();
				}}
			/>

			{#each feed as feedItem}
				<FeedItem {feedItem} />
			{/each}
		</div>
	{/if}

	<div
		class="md:hidden flex items-center justify-center"
		style="
		position: fixed;
		bottom: 120px;
		width: 60px;
		height: 60px;
		border: 1px solid rgba(255, 255, 255, 0.8);
		border-radius: 50%;
		z-index: 1001;
		background-color: black;
		box-shadow: 0px 0px 6px #c2daba;
		font-size: 30px;
		right: 20px;
		opacity: .95;
		"
		on:click={toggleExplore}
	>
		#
	</div>
{/if}

<style>
	._select {
		background: none;
		padding: 8px;
		border: 1px rgba(255, 255, 255, 0.3) solid;
		border-radius: 8px;
		min-width: 200px;
	}

	._project {
		outline: 2px rgba(255, 255, 255, 0.1) solid;
		transition: all 0.08s linear;
		padding: 16px;
	}

	._project:hover {
		/* transform: scale(1.05); */
		background: rgba(255, 255, 255, 0.03);
		outline: 1px rgba(255, 255, 255, 0.3) solid;
	}

	._author:hover {
		outline: 3px green solid;
	}

	._menu_item {
		cursor: pointer;
		transition: all linear 0.05s;
	}

	._menu_item:hover {
		background: rgba(255, 255, 255, 0.1);
		border-bottom: 1px rgba(255, 255, 255, 0.3) solid;
		margin-bottom: -1px;
	}

	._menu_item._selected {
		border-bottom: 1px solid;
		margin-bottom: -1px;
	}
</style>

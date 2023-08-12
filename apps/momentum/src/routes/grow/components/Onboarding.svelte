<script>
	import { get, post } from 'lib/api';
	import { PAGE_URL } from 'lib/env';
	import { page } from '$app/stores';
	import axios from 'axios';
	import moment from 'moment';
	import { onMount } from 'svelte';
	import tooltip from 'lib/use/tooltip';
	import { browser } from '$app/environment';
	import { GOOGLE_LOGIN_URL, LINKEDIN_LOGIN_URL, TWITTER_LOGIN_URL } from 'lib/env';
	import Modal from 'lib/components/Modal.svelte';
	import StreamCard from '$lib/components/StreamCard.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import allProjects from '$lib/stores/allProjects';
	import currentUser, { isLoading as isUserLoading } from 'lib/stores/currentUser';
	import { goto } from '$app/navigation';
	import Highlight from 'lib/components/Highlight.svelte';
	import * as socketIoService from 'lib/socketIoService';
	import getDomain from 'lib/helpers/getDomain';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import MomentumWidget from 'lib/components/MomentumWidget.svelte';
	import FeedItem from '$lib/components/FeedItem.svelte';
	import WhatToWriteAbout from './WhatToWriteAbout.svelte';
	import WaveDashboard from 'lib/components/wave/Dashboard.svelte';
	import KnowledgeBase from './KnowledgeBase.svelte';
	import KickstartPromo from 'lib/components/KickstartPromo.svelte';
	import SetGoal from 'lib/components/SetGoal.svelte';
	import EditPaidUsers from 'lib/components/EditPaidUsers.svelte';
	import EditRevenue from 'lib/components/EditRevenue.svelte';

	if (browser && !$currentUser) {
		goto(GOOGLE_LOGIN_URL);
	}

	import TwitterIcon from 'lib/icons/twitter.svelte';
	import LinkedinIcon from 'lib/icons/linkedin.svelte';

	let linkedInLogin = async () => {
		const { url } = await get(LINKEDIN_LOGIN_URL);
		window.document.location.href = url;
	};

	let twitterLogin = async () => {
		const { url } = await get(TWITTER_LOGIN_URL);
		window.document.location.href = url;
	};

	import {
		momentumPlaybook,
		nanoGrit,
		welcomeToTheInternet,
		clipWingJournal
	} from '$lib/components/db';

	export let project;

	let isWhatToWriteAboutShown = false;
	let isGoalModalOpen = false;

	let highlightCode = `<script async src="https://wave.mmntm.build/wave.js"><\/script>`;

	let isJustCopied = false;

	let copyEmbedCode = () => {
		navigator.clipboard.writeText(highlightCode);
		isJustCopied = true;
	};

	let selectedTab = 'knowledge-base';

	let isKickstartModalShown = false;
	let isAnalyticsModalShown = false;
	let isPaidUsersModalOpen = false;
	let isRevenueModalOpen = false;
</script>

{#if isKickstartModalShown}
	<Modal isShown={true} onClosed={() => (isKickstartModalShown = false)}>
		<KickstartPromo />
	</Modal>
{/if}

{#if isWhatToWriteAboutShown}
	<Modal
		isShown
		onClosed={() => {
			isWhatToWriteAboutShown = false;
		}}
	>
		<WhatToWriteAbout />
	</Modal>
{/if}

{#if isGoalModalOpen}
	<Modal
		isShown
		onClosed={() => {
			isGoalModalOpen = false;
		}}
		maxWidth="800"
	>
		<SetGoal
			class="p-8"
			onUpdated={(goal) => {
				isGoalModalOpen = false;
			}}
			bind:project
		/>
	</Modal>
{/if}

{#if isPaidUsersModalOpen}
	<Modal
		isShown
		onClosed={() => {
			isPaidUsersModalOpen = false;
		}}
		maxWidth="800"
	>
		<EditPaidUsers
			onUpdated={() => {
				isPaidUsersModalOpen = false;
			}}
			bind:project
			class="p-8"
		/>
	</Modal>
{/if}

{#if isRevenueModalOpen}
	<Modal
		isShown
		onClosed={() => {
			isRevenueModalOpen = false;
		}}
		onUpdated={() => {
			isRevenueModalOpen = false;
		}}
		maxWidth="800"
	>
		<EditRevenue bind:project class="p-8" />
	</Modal>
{/if}

{#if isAnalyticsModalShown}
	<Modal
		isShown
		onClosed={() => {
			isAnalyticsModalShown = false;
		}}
		maxWidth={1000}
	>
		<div class="p-8">
			{#if !project.page && !project.waveProject?.isActive}
				<h2 class="text-lg">
					Add analytics script to your page ({getDomain(project.url)})
				</h2>

				<div class="mt-1 opacity-90 mb-4">
					Analytics are used to monitor your progress and open it to the community.
				</div>

				<Highlight code={highlightCode} />

				<button class="small mt-4" on:click={copyEmbedCode}>
					{#if isJustCopied}
						✅ Copied
					{:else}
						{'</>'} Copy Embed Code
					{/if}
				</button>

				<div class="mt-4 opacity-70">
					Powered by Momentum Wave (see
					<a class="underline" href="https://wave.mmntm.build/p/nanohq.co" target="_blank"
						>example live dashboard</a
					>) <br />
					Your data is stored privately. We don't share your data.
				</div>

				<div class="mt-8 mb-4 opacity-90 text-lg">
					Waiting for incoming requests from {getDomain(project.url)}...
				</div>
				<Loader />
			{:else}
				<div class="mt-4">
					<WaveDashboard isShowSignups={!!project.page} {project} />
				</div>
			{/if}
		</div>
	</Modal>
{/if}

<h3>
	<a href={project.url} target="_blank">
		{project.page?.url ? project.page.url.replace('https://', '') : getDomain(project.url)}
	</a>

	<a use:tooltip title="View Public Stream" href={project.slug}
		><button class="ml-4 small rounded-full">📺</button></a
	>

	{#if project.page}
		<a use:tooltip title="Edit Page" href={PAGE_URL}
			><button class="ml-2 small rounded-full">📄</button></a
		>
	{/if}

	<a use:tooltip title="Edit Stream" href="{project.slug}/edit"
		><button class="ml-2 small rounded-full">✏️</button></a
	>
</h3>

<div class="left-0 w-full z-100 grid grid-cols-2 rounded-xl mb-4 mt-8">
	<div class="w-full">
		<!-- <div class="flex">
			<a
				class="cursor-pointer"
				on:click={() => (currentStep = 'script')}
				class:font-bold={currentStep === 'script'}
				class:opacity-70={currentStep !== 'script'}
				>{project?.waveProject?.isActive ? '✅' : '1.'} Add Analytics</a
			>
			<span class="mx-2 opacity-50">></span>
			<a
				class="cursor-pointer"
				on:click={() => (currentStep = 'intro')}
				class:font-bold={currentStep === 'intro'}
				class:opacity-70={currentStep !== 'intro'}>2. Introduce Yourself</a
			>
			<span class="mx-2 opacity-50">></span>
			<a
				class="cursor-pointer"
				on:click={() => (currentStep = 'share')}
				class:font-bold={currentStep === 'share'}
				class:opacity-70={currentStep !== 'share'}>3. Share Content & Grow</a
			>
			<span class="mx-2 opacity-50">></span>
			<a
				class="cursor-pointer"
				on:click={() => (currentStep = 'kickstart')}
				class:font-bold={currentStep === 'kickstart'}
				class:opacity-70={currentStep !== 'kickstart'}>4. Get ~$165k in discounts</a
			>
		</div>

		<hr class="my-8" style="border: 1px rgba(255, 255, 255, .3) solid;" /> -->

		<!-- <MomentumWidget
			isCollapsed={false}
			width="auto"
			streamSlug={project.slug}
			isPostOnly={true}
			title="Introduce Your Project and Yourself"
			description="Let community discover you."
			contentTextareaRows="10"
			placeholderTitle="Hey there 👋 It's Igor from Momentum"
			placeholderContent={`Hi! 
        
My name is Igor

I'm currently building:
• Momentum — a tool to launch startups quickly and build in public
• Nano — a community of genuine founders (and future fund)

We're working on SEO strategy for sustainable growth as we have bunch of validated content.
        `}
		/> -->

		<MomentumWidget
			title="Share Content & Grow"
			description="Share useful content about your product and journey"
			isCollapsed={false}
			streamSlug={project.slug}
			onSent={() => {
				selectedTab = 'my';
			}}
		/>

		<div class="my-8 flex items-center">
			<h2 class="mr-2">Stuck?</h2>
			<a
				class="cursor-pointer  button small"
				on:click={() => {
					isWhatToWriteAboutShown = true;
				}}>✍️ Generate content ideas</a
			>
		</div>
	</div>

	<div class="ml-8 p-8 bg-zinc-900 rounded-xl w-full">
		<div class="flex items-center">
			<h2>Traction Dashboard</h2>
		</div>

		<h3 class="mb-4">Focus traction and growth. Win true fans.</h3>

		<div>
			<button
				on:click={() => {
					isGoalModalOpen = true;
				}}
				class="small w-full mb-4 {project.goal ? 'flex justify-between items-center' : ''}"
			>
				{#if project.goal?.goal}
					<div class="truncate">
						🎯 {project.goal.goal}
					</div>
					<div class="ml-4 shrink-0">
						{moment(project.goal.deadlineOn).format('MMM DD')}
					</div>
				{:else}
					🎯 Set The Goal
				{/if}
			</button>
		</div>

		<div class="grid sm:grid-cols-2 gap-4">
			<div
				class="min-w-[50%] p-4 rounded-xl text-lg cursor-pointer transition {project.page ||
				project.statsCache
					? 'hover:bg-zinc-800 cursor-pointer'
					: ''}"
				on:click={() => {
					isAnalyticsModalShown = true;
				}}
				class:hover:bg-zinc-800={true}
				style="border: 1px rgba(255, 255, 255, 0.3) solid"
			>
				<h2 class="opacity-70">Views/Week</h2>

				{#if project.statsCache && project.statsCache['7_days']}
					<h2 class="text-2xl py-4">
						{project.statsCache['7_days']?.totalUsersCount}
					</h2>
				{:else if project.page}
					<h2 class="text-2xl py-4">0</h2>
				{:else}
					<button
						class="small mt-2"
						on:click={() => {
							isAnalyticsModalShown = true;
						}}>📈 Add Analytics</button
					>
				{/if}
			</div>

			<div
				class="p-4 rounded-xl text-lg cursor-pointer transition {project.page || project.statsCache
					? 'hover:bg-zinc-800 cursor-pointer'
					: ''}"
				on:click={() => {
					isAnalyticsModalShown = true;
				}}
				class:hover:bg-zinc-800={true}
				style="border: 1px rgba(255, 255, 255, 0.3) solid"
			>
				<h2 class="opacity-70">Signups</h2>

				<div class="flex items-center">
					{#if project.page}
						<h2 class="text-2xl mr-2 py-4">{project.page.totalSignupsCount || 'N/A'}</h2>
					{:else}
						<h2 class="text-2xl mr-2 py-4">{project.totalSignupsCount || 'N/A'}</h2>
					{/if}
				</div>
			</div>
			<div class="p-4 rounded-xl text-lg" style="border: 1px rgba(255, 255, 255, 0.3) solid">
				<h2 class="opacity-70">Paid Users</h2>
				<div class="flex items-center w-full">
					<h2 class="text-2xl mr-2 py-4">{project.totalPaidUsers || 'N/A'}</h2>
					<button class="small" on:click={() => (isPaidUsersModalOpen = true)}>Update</button>
				</div>
			</div>
			<div class="p-4 rounded-xl text-lg" style="border: 1px rgba(255, 255, 255, 0.3) solid">
				<h2 class="opacity-70">Revenue</h2>

				<div class="flex items-center">
					<div class="w-full">
						<h2 class="text-2xl mr-2 pt-4">
							{#if project.revenue?.monthly}
								${(project.revenue.monthly / 100).toFixed(2)}
							{:else if project.revenue?.total}
								${(project.revenue.total / 100).toFixed(2)}
							{:else}
								N/A
							{/if}
						</h2>
						{#if project.revenue?.monthly}
							<div class="opacity-70">per month</div>
						{/if}
					</div>

					<button class="small" on:click={() => (isRevenueModalOpen = true)}>Update</button>
				</div>
			</div>
			<div class="p-4 rounded-xl text-lg" style="border: 1px rgba(255, 255, 255, 0.3) solid">
				<h2 class="opacity-70 flex items-center">
					<span class="mr-2">Followers</span>
					<div class="ml-2 w-[20px] h-[20px]">
						<TwitterIcon />
					</div>
				</h2>

				<div class="flex items-center mt-2">
					{#if $currentUser?.twitterStats}
						<h2 class="text-2xl mr-2 py-4">{$currentUser.twitterStats.followerCount}</h2>
					{:else}
						<button class="small" on:click={twitterLogin}>Connect Twitter</button>
					{/if}
				</div>
			</div>

			<div class="p-4 rounded-xl text-lg" style="border: 1px rgba(255, 255, 255, 0.3) solid">
				<h2 class="opacity-70 flex items-center">
					<span class="mr-2">LinkedIn</span>

					<div class="ml-2 w-[20px] h-[20px]">
						<LinkedinIcon />
					</div>
				</h2>

				<div class="flex items-center mt-2">
					{#if $currentUser?.linkedinStats}
						<h2 class="text-2xl mr-2 py-4">{$currentUser.linkedinStats.firstDegreeSize}</h2>
					{:else}
						<button class="small" on:click={linkedInLogin}>Connect Linkedin</button>
					{/if}
				</div>
			</div>

			<!-- <div class="p-4 rounded-xl text-lg" style="border: 1px rgba(255, 255, 255, 0.3) solid">
				<h2 class="opacity-70">Posts/Week</h2>
				<div class="flex items-center">
					<h2 class="text-2xl mr-2 py-4">5</h2>
				</div>
			</div>

			<div class="p-4 rounded-xl text-lg" style="border: 1px rgba(255, 255, 255, 0.3) solid">
				<h2 class="opacity-70">Emails/Week</h2>
				<div class="flex items-center">
					<h2 class="text-2xl mr-2 py-4">N/A</h2>
				</div>
			</div> -->
		</div>
	</div>
</div>

<div class="flex justify-between mt-16">
	<div class="flex">
		<h2
			on:click={() => (selectedTab = 'knowledge-base')}
			class="mb-4 cursor-pointer mr-8 "
			class:opacity-90={selectedTab !== 'knowledge-base'}
			class:underline={selectedTab === 'knowledge-base'}
		>
			📚 Knowledge Base
		</h2>

		<h2
			class="mb-4  mr-8 cursor-pointer flex items-center"
			on:click={() => (selectedTab = 'nano')}
			class:opacity-90={selectedTab !== 'nano'}
			class:underline={selectedTab === 'nano'}
		>
			🤝 Nano Community
		</h2>

		<h2
			class="mb-4 cursor-pointer"
			on:click={() => (selectedTab = 'my')}
			class:opacity-90={selectedTab !== 'my'}
			class:underline={selectedTab === 'my'}
		>
			🍿 My Feed
		</h2>
	</div>

	<!-- <a class="mb-4 small text-green-400"> Grow 15 days and win $165k in discounts 🚀</a> -->
</div>
<hr style="border: 1px rgba(255, 255, 255, .3) solid;" class="mb-8" />

<div class="min-h-screen">
	<KnowledgeBase bind:type={selectedTab} />
</div>

<!-- <div class="mt-8">
  <h3>Get $165k in tech discounts in 14 days</h3>
  Publish content about your journey and startup to Nano 14 days and get Kickstart for free.
</div> -->

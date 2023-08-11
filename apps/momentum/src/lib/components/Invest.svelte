<script>
	import _ from 'lodash';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { get, post } from 'lib/api';
	import { browser } from '$app/environment';
	import allProjects from '$lib/stores/allProjects';
	import StreamCard from '$lib/components/StreamCard.svelte';
	import Stream from '$lib/components/Stream.svelte';
	import Modal from 'lib/components/Modal.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import Calendar from './Calendar.svelte';
	import creators from '$lib/stores/creators';
	import WaveIndicator from 'lib/components/wave/WaveIndicator.svelte';
	import FeedItem from '$lib/components/FeedItem.svelte';
	import BrowserFrame from 'lib/components/BrowserFrame.svelte';
	import clickOutside from 'lib/use/clickOutside';
	import Highlight from 'lib/components/Highlight.svelte';
	import * as socketIoService from 'lib/socketIoService';
	import getDomain from 'lib/helpers/getDomain';

	import {
		momentumPlaybook,
		nanoGrit,
		welcomeToTheInternet,
		clipWingJournal
	} from '$lib/components/db';
	let streamCreators;

	let loadMore = () => {};

	let isGrowModalOpen;
	let isInvestModalOpen;
	let isRequestSubmitted = false;

	let hubProject = {
		_id: '642e827852b497001703f41a',
		logoUrl:
			'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1683477275194-nano-logo-big.png',
		creator: {
			_id: 'rec4sLfwGXzHxLy54'
		},
		page: null,
		slug: 'nano',
		title: 'Nano Community & Fund',
		emoji: null,
		color: '#a263d9',
		description: 'We help decent makers to build $1M',
		url: 'https://nanohq.co',
		bannerUrl:
			'https://assets.website-files.com/64246fe509498c27897c2eaa/6425acab275655043392fea7_OpenGraph%20(1).png',

		pinnedUrl:
			'https://fra1.digitaloceanspaces.com/ship-app-assets/stream/rec4sLfwGXzHxLy54/1683479096968-nano_is_boxing.mp4',

		icon: 'https://assets.website-files.com/64246fe509498c27897c2eaa/6425ac1ac2c9ce73cd8bf44f_favicon.png',
		createdOn: new Date('2023-04-06T08:27:36.706Z'),
		hubProject: {
			_id: '63b60110cbd67400149e8059',
			slug: 'paralect'
		},
		longDescription:
			'Nano is a community of founders building their startups in public. \n\nWe believe that every company is a media company.',
		embedConfig: {
			limit: 15,
			columns: 3,
			theme: 'dark',
			bgColor: 'rgba(255, 255, 255, 0)',
			isViewAll: true
		},
		waveProject: {
			_id: '642acb3a1441ad00158375c6',
			url: 'www.nanohq.co'
		}
	};

	let projects = $allProjects.filter((p) => p.hubProject?.slug === 'nano');
	let shuffledCreators;

	let getCreators = async () => {
		streamCreators = (await get('creators', { projectSlug: hubProject.slug })).results;
		$creators = streamCreators;

		let shuffleCreators = () => {
			shuffledCreators = _.take(_.shuffle(streamCreators), 20);
		};

		shuffleCreators();

		const shuffleInterval = setInterval(() => {
			shuffleCreators();
		}, 5000);
	};

	getCreators();

	let isEmailSubmitted = false;

	let request = {
		email: '',
		message: ''
	};

	let requestInvest = () => {
		if (request.email) {
			post('nanoRequests', {
				...request,
				type: 'invest'
			});
			isRequestSubmitted = true;
		}
	};

	let streamProject;
	let waveProject;

	let isMobileSize = false;

	if (browser) {
		isMobileSize = window.innerWidth < 640;
	}

	let listStartup = async () => {
		if (request.contactLink) {
			post('nanoRequests', {
				...request,
				type: 'grow'
			});
		}

		waveProject = await post('waveProjects', { url: request.startupUrl });

		// let project = {};

		// const { data } = await axios({
		// 	url: 'https://igor.npkn.net/fetch-meta-tags',
		// 	params: { url: request.startupUrl }
		// });

		// let metatags = data;

		// project.title = (metatags.titleTag || metatags.title || '').split(' ')[0];
		// project.description = metatags.description;
		// project.bannerUrl = metatags.image;
		// project.icon = metatags.favicon;

		// streamProject = await post('projects', project);

		isRequestSubmitted = true;

		// document.location.href = 'https://feed.mmntm.build/launch';
	};

	let previewUrl;
	let isAnalyticsConfigured = false;

	let highlightCode = `<script async src="https://wave.mmntm.build/wave.js"><\/script>`;

	onMount(() => {
		socketIoService.on('waveProject:activated', (project) => {
			if (getDomain(project.url) === getDomain(request.startupUrl)) {
				isAnalyticsConfigured = true;
			}
		});
	});
</script>

<svelte:head>
	<title>Nano Fund</title>
</svelte:head>

{#if isGrowModalOpen}
	<Modal
		maxWidth={700}
		isShown={isGrowModalOpen}
		onClosed={() => {
			isGrowModalOpen = false;
		}}
	>
		<div class="p-8 sm:p-16">
			<div class="mb-8">
				<h1>Grow your startup 🕺</h1>

				<div class="mb-2">
					Join a public community of genuine builders. Get exposure. Learn from other makers.
					Attract investors and partners.
				</div>
			</div>

			{#if isRequestSubmitted}
				{#if isAnalyticsConfigured}
					<div class="text-5xl my-8">🥳</div>
					<div class="text-xl mt-8">
						Thank you for listing your startup on Nano! <br />

						Now, it's time to grow {getDomain(request.startupUrl)}!
					</div>
				{:else}
					<div class="text-lg mb-2">Add this script to your page ({request.startupUrl})</div>
					<Highlight code={highlightCode} />

					<div class="mt-8 opacity-90">
						Waiting for incoming requests from {getDomain(request.startupUrl)}...
					</div>
				{/if}
			{:else}
				<div>
					<div class="text-lg mb-2">What's your twitter profile (or other link to contact)?</div>
					<input
						bind:value={request.contactLink}
						type="text"
						required
						placeholder="https://twitter.com/that_igor_"
					/>
				</div>

				<div class="mt-8">
					<div class="text-lg mb-2">What's your Startup Url?</div>
					<input bind:value={request.startupUrl} type="text" placeholder="https://nanohq.co" />
					<div class="mt-2">Leave blank if you don't have a landing page yet</div>
				</div>
			{/if}

			{#if isAnalyticsConfigured}
				<a href="https://grit.nanohq.co/" target="_blank"
					><button class="mt-8">Grow my startup</button></a
				>
			{:else if !isRequestSubmitted}
				<button class="mt-8" on:click={listStartup}>List my startup on Nano</button>
			{/if}
		</div>
	</Modal>
{/if}

{#if isInvestModalOpen}
	<Modal
		maxWidth={700}
		isShown={isInvestModalOpen}
		onClosed={() => {
			isInvestModalOpen = false;
		}}
	>
		<div class="p-8 sm:p-16">
			<div class="mb-8">
				<h1>Invest in Nano startups 💥</h1>

				<div class="mb-2">
					Support startups that share their knowledge with the public community.
				</div>
			</div>

			{#if isRequestSubmitted}
				<div class="bg-zinc-900 rounded-xl p-8">
					Thank you for supporting genuine founders! <br /> <br />
					We'll keep in touch with you at <b>{request.email}</b>
					<hr class="my-8 opacity-20" />
					PS Feel free to DM Igor in Twitter:
					<a class="text-blue-700" href="https://twitter.com/that_igor_" target="_blank"
						>@that_igor_</a
					>
				</div>
			{:else}
				<div>
					<div>
						<div class="text-lg mb-2">What's your email?</div>
						<input bind:value={request.email} type="text" placeholder="igor@paralect.com" />
					</div>

					<div class="mt-4">
						<div class="text-lg mb-2">A short intro</div>
						<textarea
							bind:value={request.message}
							rows="3"
							placeholder={`Hi I'm Igor https://twitter.com/that_igor_. Nano is sick, I'd love to support "too early" startups and it looks have some decent founders here.. Looking forward to our chat!`}
						/>
					</div>
				</div>

				<button class="mt-8" on:click={requestInvest}>Book a chat</button>
			{/if}
		</div>
	</Modal>
{/if}

<div class="relative mt-4 sm:m-auto">
	<div class="container mx-auto flex flex-col justify-center" style="height: calc(100vh-150px)">
		<div class="flex justify-center mt-8">
			<img
				src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1683477275194-nano-logo-big.png"
				class="w-[50px] h-[50px] mb-4"
			/>
		</div>
		<h1 class="text-5xl text-center font-bold mb-4 ">Nano Fund</h1>

		<h2 class="text-3xl text-center sm:px-0 px-4">
			We help decent makers <span class="">grow</span> their startups to $1M+
		</h2>

		<h3 class="text-2xl mt-4 text-center">Nano is an Internet accelerator, community and fund</h3>

		{#if shuffledCreators}
			{#key shuffledCreators}
				<div class="flex justify-center my-8" in:fade>
					{#each shuffledCreators as creator}
						<a
							style="margin-right: -15px;"
							href="@{creator.username}"
							class="transition hover:scale-125"
						>
							<Avatar size="30px" user={creator} />
						</a>
					{/each}
				</div>
			{/key}
		{/if}

		<div class="sm:flex sm:flex-row sm:justify-between w-full px-2 sm:w-[600px] mx-auto my-8">
			<button
				class="rounded-xl text-lg w-full sm:mb-0 mb-4"
				on:click={() => {
					isGrowModalOpen = true;
				}}>📈 Grow My Startup</button
			>

			<button
				class="rounded-xl text-lg w-full sm:mx-2"
				on:click={() => {
					isInvestModalOpen = true;
				}}>🤑 Invest In Startup</button
			>
		</div>

		<!-- <div class="text-center text-xl mt-4">
			Not every startup should grow to billions. <br /> There are tons of opportunities around us to
			build sustainable and profitable businesses worth $1M+. <br /> Start from a nano niche, get traction
			with content, build a nano product and grow with your audience.
		</div> -->
	</div>

	<!-- <div class="mx-4">
		<div
			class="relative my-8 flex-col sm:flex-row flex justify-between p-8 rounded-2xl text-white max-w-[1200px] mx-auto"
			style="background: url('/backgrounds/gradient-1.svg');"
		>
			<div>
				<img src={hubProject.logoUrl} class="w-[50px] h-[50px] mb-4" />
				<div class="text-4xl font-bold mb-4">{hubProject.title}</div>
				<div class="text-2xl mb-4">{hubProject.description}</div>

				<a class="flex mt-6 overflow-hidden" style="max-width: 100%;" href="/creators">
					{#if streamCreators}
						{#each streamCreators as creator}
							<Avatar style="margin-right: -15px;" size="30px" user={creator} />
						{/each}
					{/if}
				</a>
			</div>

			<div
				class="max-w-[350px] flex-1 h-full flex flex-col justify-center items-center py-8 sm:p-8"
			>
				<h2 class="text-4xl">$50,000</h2>
				<h3 class="text-2xl">July Fund</h3>
				<button
					class="mt-8 rounded-xl text-xl w-full"
					on:click={() => {
						isInvestModalOpen = true;
					}}>Invest in open startups</button
				>
				<video muted controls autoplay src={hubProject.pinnedUrl} class="rounded-xl" />
				<RenderUrl url={hubProjec.pinnedUrl} />
				<img src={hubProject.bannerUrl} class="w-full max-h-[200px] object-cover rounded-lg" />
			</div>
		</div>
	</div> -->

	<img
		class="mx-auto"
		style="margin-bottom: -180px; margin-top: -90px; transform: scale(.5);"
		src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1683827850258-image.png"
	/>

	<!-- style="background: radial-gradient(circle at 50% 51.2%, rgb(26 29 70) 0%, rgb(0 0 0) 15.9%, rgb(0 0 0) 15.9%, rgb(38 33 50) 24.4%, rgb(19, 30, 37) 24.5%, rgb(30 26 34) 66%)" -->

	<div
		style="background: radial-gradient(circle at 50% 51.2%,  rgb(8 6 15) 24.5%, rgb(30, 26, 34) 66%)"
		class="pt-16 pb-8 mb-16"
	>
		<h1 class="text-3xl font-bold text-center mx-auto" style="max-width:540px;">Nano Startups</h1>

		<h3 class="container mx-auto max-w-[800px] text-center mt-2">
			Startups are <a
				class="underline"
				target="_blank"
				href="https://www.notion.so/How-Nano-measures-startup-performance-How-can-I-grow-faster-4e35bb3e5cf447b29be8d38536393b9a"
				>ranked</a
			> by traction, published content and support from the community
		</h3>
		{#if isMobileSize}
			<h3 class="sm:hidden my-4 w-full text-center">Scroll Right →</h3>

			<div class="mt-4 sm:pl-8 flex px-[1px] overflow-x-scroll">
				{#each projects as project}
					<div class="min-w-[300px] mr-6 ml-4 sm:ml-0">
						<StreamCard
							isIncludeChart={true}
							isWithUpvote={false}
							isWithPitch={false}
							isLink
							isWithDescription
							stream={project}
						/>
					</div>
				{/each}
			</div>
		{:else}
			<div class="container mx-auto max-w-[1000px]">
				<div class="p-4 mt-8 w-full" style="border: 1px rgba(255,255,255, .3) solid;">
					<table class="p-4 rounded-xl w-full">
						<thead>
							<tr style="border-bottom: 1px rgba(255,255,255, .3) solid;">
								<td class="py-2 pr-2"><h3>Name</h3></td>
								<!-- <td>Age</td> -->
								<td class="py-2 pr-2"><h3>Views/Week</h3></td>
								<td class="py-2 pr-2"><h3>Total Users</h3></td>
								<td class="py-2 pr-2"><h3>Revenue</h3></td>
								<td class="py-2" />
							</tr>
						</thead>

						<tbody>
							{#each _.take(projects, 8) as project}
								<tr>
									<td class="py-4 pr-8">
										<div class="flex text-lg font-bold items-center">
											<a
												target="_blank"
												on:click|preventDefault={() => {
													previewUrl = project.url;
												}}
												href={project.url}>{project.title}</a
											>
											<a href={project.slug}>
												<img
													class="ml-2 rounded-full w-[20px] h-[20px]"
													src={project.creator?.avatarUrl}
												/>
											</a>
										</div>
										<div class="text-sm max-w-[350px]">
											<div class="text-ellipsis overflow-hidden">
												{project.description}
											</div>
										</div>
									</td>
									<!-- <td>

						</td> -->
									<td class="p-2 mx-8">
										{#if project.statsCache && project.statsCache['7_days']}
											<!-- {project.statsCache['7_days'].totalUsersCount} -->

											<WaveIndicator
												class="my-4 w-auto"
												isUseCache={true}
												isNoTimeframeLabel={true}
												isChart={false}
												timeframe="7_days"
												{project}
											/>
										{:else}
											N/A
										{/if}
									</td>

									<td class="p-2 mx-4"> <h1>{project.totalUsers || ''}</h1></td>
									<td class="p-2 mx-4">
										<h1>
											{project?.revenue?.total
												? `$${(project?.revenue?.total / 100).toFixed(2)}`
												: ''}

											{project?.revenue?.monthly
												? `$${parseInt(project?.revenue?.monthly / 100)} MRR`
												: ''}
										</h1>
									</td>
									<td class="p-2 mx-4"
										><button on:click={() => (isInvestModalOpen = true)}>Invest</button></td
									>
								</tr>
							{/each}
						</tbody>
					</table>

					{#if previewUrl}
						<!-- links={[
					{ title: 'Website' },
					{ title: 'Analytics' },
					{ title: 'Feed' },
					{ title: 'Pitch' }
				]} -->
						<div
							class="fixed w-full pt-4"
							style="width: 50%; right: 0; top: 0; z-index: 101; max-height: calc(100vh-200px);"
							use:clickOutside
							on:clickOutside={() => (previewUrl = null)}
							in:fade={{ duration: 100 }}
						>
							<BrowserFrame
								onClose={() => {
									previewUrl = null;
								}}
							>
								{#key previewUrl}
									{#if previewUrl}
										<iframe class="w-full h-screen" src={previewUrl} />
									{/if}
								{/key}
							</BrowserFrame>
						</div>
					{/if}
				</div>

				<div class="flex justify-center">
					<button
						class="mt-8"
						on:click={() => {
							isGrowModalOpen = true;
						}}>List my Startup 📈</button
					>
				</div>
			</div>
		{/if}
	</div>

	<!-- <div
		style="background: radial-gradient(circle at 50% 51.2%,  rgb(8 6 15) 24.5%, rgb(30, 26, 34) 66%)"
		class="pt-16 pb-8 mb-16"
	>
		<div class="_header font-bold text-center mx-auto" style="max-width:540px;">
			Watch as {projects.length} early-stage startups grow their traction together, daily... <br />
		</div>

		<div class="mt-8 mb-16">
			<Calendar class="w-full" />
		</div>

		<div
			class="_header relative flex justify-between items-center font-bold text-left sm:mx-8 ml-4 mr-4 mt-16 opacity-80"
		>
			<div class="">Startups</div>
			<div class="text-base font-base">Scroll 👉</div>

		</div>

		<div class="mt-4 sm:pl-8 flex overflow-y-scroll px-[1px]">
			{#each projects as project}
				<div class="min-w-[300px] mr-6 ml-4 sm:ml-0">
					<StreamCard
						isIncludeGoal
						isIncludeChart={true}
						isLink
						isWithDescription
						stream={project}
					/>
				</div>
			{/each}
		</div>
	</div> -->

	<h2 class="_header text-center my-8 mt-16">
		We build in public <br />
		We share our goals, learnings and metrics in Social Media
	</h2>

	<div class="container relative max-w-[1200px] mx-auto relative pt-16 shrink-0 w-full">
		<!-- <img
			class="fixed"
			style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%) scale(5); opacity: 0.1;"
			src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1683829719307-nano-logo-big.png"
		/> -->
		<div class="shrink-0 sm:mx-16 mx-4">
			<Stream limit={9} projectSlug={'nano'} maxPagesCount={2} />
		</div>

		<div class="flex justify-center">
			<a href="nano" target="_blank">
				<button class="mt-8">🫶 Browse Community</button>
			</a>
		</div>
	</div>

	<div style="background: rgba(0,0,0, .3);" class="py-16 pb-32">
		<h2 class="_header text-center py-16">
			<div class="mb-4">⚡️🕺💥</div>
			Here we believe that every company is a media company.<br />
			You are no longer a CEO, you are Chief Executive Producer. <br />
		</h2>

		<div class="w-full flex justify-center my-8 mx-8 mx-auto" style="max-width: 1200px;">
			<RenderUrl class="px-4" url="https://www.youtube.com/watch?v=ekieA4-RS8k" />
		</div>
	</div>
	<div
		class="py-4 px-4 mx-4 sm:mx-16 mt-16 mb-32 rounded-3xl"
		style="background: radial-gradient(circle at 50% 51.2%,  rgb(8 6 15) 24.5%, rgb(30, 26, 34) 66%)"
	>
		<h2 class="_header text-center mb-4 sm:mb-16 mt-4 sm:mt-32">
			<div class="flex justify-center my-4">
				<div class="mx-2">🥳</div>
				<div class="mx-2">🥳</div>
				<div class="mx-2">🥳</div>
			</div>
			And it seems people love this "media" thing!<br />
		</h2>

		<div
			class="grid sm:grid-cols-2 gap-4 text-center w-full mb-16 mx-auto py-8 px-0 sm:px-8 rounded-2xl"
			style="max-width: 1200px;"
		>
			<div class="flex flex-col items-center sm:px-8 bg-zinc-900 rounded-xl py-8">
				<img
					class="max-w-[200px] h-[150px] mr-4 rounded-xl"
					src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1683560688826-image.png"
				/>
				<div>
					<h2 class="font-bold text-xl mb-2 mt-8">
						<a href="https://www.linkedin.com/in/norris-panton-82a064b/" target="_blank"
							>Norris Panton</a
						>, <a href="https://www.carouselboxing.com" target="_blank">CarouselBoxing</a>
					</h2>

					<div class="text-xl">
						Some people do yoga to relax, whereas I really need to work out on high intensity. <br
						/><br />
						Nano is more boxing, than it is yoga.
					</div>
				</div>
			</div>

			<div class="flex flex-col items-center px-8 text-xl bg-zinc-900 rounded-xl py-8">
				<img
					class="max-w-[200px] h-[150px] object-cover mr-4 rounded-xl"
					src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1683828380405-image.png"
				/>
				<div>
					<h2 class="font-bold text-xl mb-2 mt-8">
						<a href="https://www.tiktok.com/@fforwardai/video/7227119467535273222" target="_blank"
							>Cameron Westland</a
						>, <a href="https://fforward.ai" target="_blank">FForward</a>
					</h2>

					<div>
						My last startup raised $80M to date, it never was featured on HackerNews. <br /><br />
						I wrote 10 blog posts and my new startup was front-paged yesterday.
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="container max-w-[1200px] mx-auto">
		<h1 class="text-3xl text-center sm:px-0 px-4">Grow with content. We'll show how!</h1>
		<h3 class="mt-4 text-center sm:px-0 px-4">
			Check out free public playbooks validated by Nano Community
		</h3>

		<div class="sm:columns-2 columns-1 sm:gap-8 gap-4 mt-16 px-4">
			<div class="mb-4 break-inside-avoid">
				<h1 class="mb-4">Momentum Playbook</h1>

				<FeedItem feedItem={momentumPlaybook} />
			</div>

			<div class="mb-4 break-inside-avoid">
				<h1 class="mb-4">Nano Grit</h1>

				<FeedItem feedItem={nanoGrit} />
			</div>

			<div class="mb-4 break-inside-avoid">
				<h1 class="mb-4">ClipWing Journal (Case Study)</h1>

				<FeedItem feedItem={clipWingJournal} />
			</div>

			<div class="mb-4 break-inside-avoid">
				<h1 class="mb-4">Welcome To The Internet</h1>

				<FeedItem feedItem={welcomeToTheInternet} />
			</div>
		</div>

		<h3 class="mt-4 mb-8 text-center sm:max-w-[600px] sm:mx-auto">
			To go in line with our mission our goal is to create a $1M startup playbook and prove it
			works, in public. It won't be quick and easy playbook. But it will be the process you can
			understand, follow and repeat. Join and create with us!
		</h3>

		<div class="flex justify-center mb-8">
			<a href="knowledge-base" target="_blank">
				<button class="mt-8">🤓 See Knowledge Base</button>
			</a>
		</div>

		<hr style="border: 1px rgba(255, 255,255, .3) solid;" />
	</div>

	<h2 class="_header text-center mb-16 mt-32">
		Don't jump into tech early.

		<br />

		Launch your startup like it's 2030. Invest like it's 2030.
	</h2>

	<div class="container text-center w-full text-2xl mb-32 mx-auto" style="max-width: 1200px; ">
		<div class="mx-4 sm:columns-4">
			<div class="p-8 bg-zinc-900 rounded-xl mb-4">
				<div class="mb-2">📈</div>
				Focus profits and cashflow-positive startups
			</div>
			<div class="p-8 bg-zinc-900 rounded-xl mb-4">
				<div class="mb-2">🔬</div>
				See the progress of other startups and learn
			</div>
			<div class="p-8 bg-zinc-900 rounded-xl mb-4">
				<div class="mb-2">🤝</div>
				Discover founders, network, partner and build
			</div>
			<div class="p-8 bg-zinc-900 rounded-xl mb-4">
				<div class="mb-2">💰</div>
				Invest early in proven resourceful makers
			</div>
		</div>
	</div>
	<div
		class="py-8 mx-4 sm:mx-16 my-4 mb-32 rounded-3xl pb-32"
		style="background: radial-gradient(circle at 50% 51.2%,  rgb(8 6 15) 24.5%, rgb(30, 26, 34) 66%)"
	>
		<div class="_header text-center w-full mx-auto py-16" style="max-width: 600px;">
			Ready to work hard and have fun?

			<br />

			Choose your pill 👇
		</div>

		<div class="max-w-[600px] mx-auto px-4">
			<video
				muted={true}
				autoplay
				loop
				src={'https://fra1.digitaloceanspaces.com/ship-app-assets/stream/rec4sLfwGXzHxLy54/1683843864994-down_no_sound.mp4'}
				class="rounded-xl lazyload"
			/>
		</div>

		<div class="container mx-auto rounded-xl py-16" style="max-width: 1200px;">
			<div class="grid sm:grid-cols-2 gap-8 px-4 sm:px-0">
				<div class="mr-2 sm:mr-16 w-full text-center max-w-[1200px] mx-auto rounded-3xl">
					<a
						class="block button sm:mr-8 rounded-xl"
						style="font-size: 32px; background: #7900d9;"
						on:click={() => {
							isGrowModalOpen = true;
						}}
					>
						Grow my startup in public</a
					>
				</div>

				<div class="mt-4 sm:mt-0 sm:ml-2 w-full text-center mx-auto rounded-3xl">
					<a
						class="block button sm:ml-8 rounded-xl"
						style="font-size: 32px; background: #007b50;"
						on:click={() => {
							isInvestModalOpen = true;
						}}>Invest in open startups</a
					>
				</div>
			</div>
		</div>

		<div class="w-full flex flex-col items-center justify-center">
			<img
				style="width: 150px;"
				src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1683477275194-nano-logo-big.png"
			/>
			<h1 class="mt-4 text-3xl">Nano</h1>
			<h3 class="mt-2 text-center">Build your million dollars startups with media</h3>
		</div>
	</div>
</div>

<!-- <table>
	<thead>
		<td>Name</td>
		<td>Pitch</td>
		<td>Views</td>
		<td>Sign Ups</td>
		<td>Content</td>
		<td>MRR</td>
	</thead>
	{#each $allProjects.filter((p) => p.hubProject?.slug === 'nano') as project}
		<tr>
			<td>
				{project.title}
			</td>
			<td>
				{project.description}
			</td>
			<td />
			<td />
		</tr>
	{/each}
</table> -->
<style>
	._header {
		/* font-family: Archivo; */
		line-height: 1.4;

		font-size: 30px;
		line-height: 36px;
		padding-left: 16px;
		padding-right: 16px;
	}

	@media (max-width: 640px) {
		._header {
			font-size: 24px;
			line-height: 30px;
		}
	}
</style>

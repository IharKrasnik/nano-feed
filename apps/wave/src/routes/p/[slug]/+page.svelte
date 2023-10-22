<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { LinkedChart, LinkedLabel, LinkedValue } from 'svelte-tiny-linked-charts';

	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { GOOGLE_LOGIN_URL } from 'lib/env';

	import { fly, slide } from 'svelte/transition';

	import * as socketIoService from 'lib/socketIoService';

	import { get } from 'lib/api';

	import Loader from 'lib/components/Loader.svelte';
	import Dashboard from 'lib/components/wave/Dashboard.svelte';
	import SingleStat from 'lib/components/wave/SingleStat.svelte';

	import allProjects from '$lib/stores/allProjects';
	import currentUser, { isLoading as isUserLoading } from 'lib/stores/currentUser';

	let projectSlug = $page.params.slug;

	let timeframe = '7_days';

	const timeframeLabels = {
		'7_days': '7 days',
		'24_hours': '24 hours'
	};

	let timezone = moment.tz.guess();

	// if (browser && !$currentUser) {
	//   goto(GOOGLE_LOGIN_URL);
	// }

	let stats;

	let userChartData = null;
	let viewChartData = null;
	let maxViewsCount;
	let maxReferralCount;
	let chartWidth;
	let widthEl;

	let selectedProject;

	let isStatsLoading = true;

	const refreshStats = async (projects, url) => {
		isStatsLoading = true;

		if (url) {
			if (projects) {
				selectedProject = projects.find((p) => p.url === url);
			}

			if (!selectedProject || selectedProject.isActive) {
				stats = await get(`waveProjects/${url}/stats`, {
					timeframe: timeframe,
					timezone
				});
			}
		}

		isStatsLoading = false;
	};

	$: browser && refreshStats($allProjects, $page.params.slug);

	onMount(() => {
		socketIoService.on('waveProject:activated', (project) => {
			$allProjects = $allProjects.map((p) => {
				if (p._id === project._id) {
					return project;
				} else {
					return p;
				}
			});

			if (selectedProject._id === project._id) {
				selectedProject.isActive = true;
			}
		});
	});

	let embedCode = `<script async src="https://wave.mmntm.build/wave.js"><\/script>`;
</script>

<div>
	<div class="flex justify-between items-center mb-8">
		<div>
			<h1 class="text-xl font-bold">Analytics</h1>
			<div class="opacity-70">
				<a href="//{$page.params.slug}" target="_blank">
					{$page.params.slug}
				</a>
			</div>
		</div>
		<div class="flex items-center">
			{#if isStatsLoading}
				<div class="mr-2">
					<Loader />
				</div>
			{/if}
			<select
				bind:value={timeframe}
				on:change={() => refreshStats($allProjects, $page.params.slug)}
				class="max-w-[200px] small"
			>
				<option value="24_hours">Last 24 hours</option>
				<option value="7_days">Last 7 days</option>
				<option value="30_days">Last 30 days</option>
				<!-- <option>Last 14 days</option> -->
				<!-- <option>Last 30 days</option> -->
			</select>
		</div>
	</div>

	{#if !selectedProject || selectedProject.isActive}
		{#if !$isUserLoading && !$currentUser}
			<div class="p-4 md:p-8 bg-zinc-900 mb-8 rounded-xl">
				<div class="mb-2">Hey 👋 <br /></div>

				Momentum Wave is super-simple analytics dashboard that you can add to your website<b
					>in seconds</b
				>.

				<a href={GOOGLE_LOGIN_URL} class="block my-4">
					<button class="small">Add analytics to my website</button> <br />
				</a>

				<div>
					<span class="opacity-70"
						>Here's a public analytics dashboard for <a target="_blank" href={$page.params.slug}
							>{$page.params.slug}</a
						>
					</span>👇
				</div>
			</div>
		{/if}

		{#if stats}
			<Dashboard isShowSignups={selectedProject?.isTrackForms} bind:stats bind:timeframe />
		{/if}

		<!-- <SingleStat actionType="signup" projectId="63eaab5b0ebb830015458b95" bind:timeframe /> -->
	{:else}
		<div class="p-4 bg-zinc-900">
			<div class="text-lg font-bold">Waiting for data</div>
			Add the following script to your &lt;head&gt; tag. Once added, visit your website.

			<div class="mt-4 p-4 bg-black">
				{embedCode}
			</div>
		</div>
	{/if}
</div>

<style>
	._border-white {
		border: 1px rgba(255, 255, 255, 0.4) solid;
	}
</style>

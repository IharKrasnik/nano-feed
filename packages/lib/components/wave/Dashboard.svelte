<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { get } from 'lib/api';
	import { LinkedChart, LinkedLabel, LinkedValue } from 'svelte-tiny-linked-charts';
	import SingleStat from 'lib/components/wave/SingleStat.svelte';
	import { fade, fly } from 'svelte/transition';
	import { countryCodeEmoji } from 'country-code-emoji';
	import countryCodeLoockup from 'country-code-lookup';
	import getDomain from 'lib/helpers/getDomain';

	export let stats;
	export let project;
	export let timeframe = '7_days';
	export let isShowSignups = false;
	export let isSingleColumn;

	export let isSinglePage = false;

	let widthEl;
	let chartWidth;

	let userChartData = null;
	let viewChartData = null;
	let maxViewsCount;
	let maxReferralCount;
	let maxCountryCount;

	let isShowAll;

	const timeframeLabels = {
		'7_days': '7 days',
		'30_days': '30 days',
		'24_hours': '24 hours'
	};

	let isFirstTime = true;

	let loadMetrics = () => {
		return get(
			`waveProjects/${
				project.page ? 'page.mmntm.build' : project.waveProject._id || project.url
			}/stats`,
			{
				timeframe: timeframe,
				timezone: moment.tz.guess(),
				...(project.page ? { subProjectId: project.page?._id } : {})
			}
		).then((res) => (stats = res));
	};

	$: if (stats) {
		isShowAll = false;
		maxViewsCount = stats.pageStats[0]?.count;
		maxReferralCount = stats.referralStats[0]?.count;
		maxCountryCount = stats.userCountryStats[0]?.count;

		let dateFrom;
		let unitToAdd;
		let dateLabelFormat = 'yyyy-MM-DD';

		if (timeframe === '7_days') {
			dateFrom = moment().subtract(7, 'days');
			unitToAdd = 'day';
			dateLabelFormat = 'yyyy-MM-DD';
		} else if (timeframe === '30_days') {
			dateFrom = moment().subtract(30, 'days');
			unitToAdd = 'day';
			dateLabelFormat = 'yyyy-MM-DD';
		} else if (timeframe === '24_hours') {
			dateFrom = moment().subtract(24, 'hours');
			unitToAdd = 'hour';
			dateLabelFormat = 'DD-HH';
		}

		let now = moment().add(1, 'hour');

		userChartData = {};
		viewChartData = {};

		while (dateFrom < now) {
			let dateLabel = dateFrom.format(dateLabelFormat);

			userChartData[dateLabel] = stats.userStats.find((s) => s.date === dateLabel)?.count || 0;
			viewChartData[dateLabel] = stats.viewStats.find((s) => s.date === dateLabel)?.count || 0;
			dateFrom.add(1, unitToAdd);
		}

		setTimeout(() => {
			if (widthEl) {
				chartWidth = widthEl.offsetWidth;
				isFirstTime = false;
			}
		}, 0);
	} else {
		loadMetrics();
	}
</script>

<div class="flex justify-between items-center mb-4">
	<div>
		<h2 class="text-lg mb-4">Website Analytics</h2>
		{#if project}
			<h3>
				<a target="_blank" href={project.url}>
					{project.page?.url ? project.page.url.replace('https://', '') : getDomain(project.url)}
				</a>
			</h3>
		{/if}
	</div>

	<div>
		<select class="small" bind:value={timeframe} on:change={loadMetrics}>
			<option value="24_hours">24 hours</option>
			<option value="7_days">7 days</option>
			<option value="30_days">30 days</option>
		</select>
	</div>
</div>

{#key stats}
	{#if stats}
		<div class="md:grid-cols-1 md:grid-cols-2 md:grid-cols-3" />

		<div
			class="grid grid-cols-1 {isShowSignups
				? 'md:grid-cols-3'
				: isSingleColumn
				? ''
				: 'md:grid-cols-2'} gap-4"
		>
			<div class="rounded-xl p-4 _border-white">
				<div class="flex justify-between items-center mb-4" bind:this={widthEl}>
					<div class="text-lg">Unique Users</div>
					<div class="text-3xl font-bold">
						{stats.totalUsersCount}
					</div>
				</div>

				<hr class="_border-white my-4" style="border-width: .5px" />

				{#if userChartData && chartWidth}
					<LinkedChart
						linked="chart"
						uid="users"
						data={userChartData}
						fill="#8B786D"
						grow={true}
						barMinWidth={5}
						gap={10}
						height={150}
						width={chartWidth}
						transition={500}
					/>
				{/if}

				<div class="px-4 flex w-full justify-between">
					<div class="text-sm text-slate-300 mt-4 shrink-0">
						{Object.keys(userChartData)[0]}
					</div>

					<div class="text-sm text-slate-300 mt-4 shrink-0">
						{_.last(Object.keys(userChartData))}
					</div>
				</div>

				<div class="w-full text-center py-4">
					<LinkedLabel linked="chart" empty={timeframeLabels[timeframe]} /> —
					<LinkedValue uid="users" empty={stats.totalUsersCount} /> users
				</div>
			</div>

			<div class="rounded-xl p-4 border _border-white">
				<div class="flex justify-between items-center mb-4">
					<div class="text-lg">Page Views</div>
					<div class="text-3xl font-bold">
						{stats.totalViewsCount}
					</div>
				</div>

				<hr class="_border-white my-4" style="border-width: .5px" />

				{#if viewChartData && chartWidth}
					<LinkedChart
						linked="chart"
						uid="views"
						data={viewChartData}
						fill="#8B786D"
						grow={true}
						barMinWidth={5}
						gap={10}
						height={150}
						width={chartWidth}
						transition={500}
					/>
				{/if}

				<div class="px-4 flex w-full justify-between">
					<div class="text-sm text-slate-300 mt-4 shrink-0">
						{Object.keys(viewChartData)[0]}
					</div>

					<div class="text-sm text-slate-300 mt-4 shrink-0">
						{_.last(Object.keys(viewChartData))}
					</div>
				</div>

				<div class="w-full text-center py-4">
					<LinkedLabel linked="chart" empty={timeframeLabels[timeframe]} /> —
					<LinkedValue uid="views" empty={stats.totalViewsCount} /> views
				</div>
			</div>

			{#if isShowSignups}
				<SingleStat actionType="signup" projectId="63eaab5b0ebb830015458b95" bind:timeframe />
			{/if}
		</div>

		<div
			class="mt-8 grid grid-cols-1 {isSingleColumn ? '' : 'md:grid-cols-3'} gap-4"
			in:fly={{ y: 50, duration: isFirstTime ? 150 : 0 }}
		>
			{#if !isSinglePage}
				<div class="rounded-xl p-4 border _border-white">
					<div class="flex justify-between items-center mb-4">
						<div class="text-lg mb-4">Pages</div>
					</div>

					<div class="flex justify-between mb-2">
						<div>Page</div>
						<div class="w-[100px] text-right">Users</div>
					</div>

					<div>
						{#each isShowAll ? stats.pageStats : stats.pageStats.slice(0, 4) as pageStat, i}
							<div class="flex justify-between py-1 my-1">
								<div
									class="relative w-full"
									style="white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								flex-shrink: 1;
								max-width: 100%;
								min-width: 0;"
								>
									<div
										class="absolute h-full rounded top-0 left-[-5px] bg-[#8B786D] opacity-20"
										style="width: {(pageStat.count / maxViewsCount) * 100}%;"
									/>
									{pageStat.url.replace(/^.*\/\/[^\/]+/, '')}
								</div>
								<div class="w-[100px] shrink-0 text-right">
									{pageStat.count}
								</div>
							</div>

							<hr class="border-gray-600" />
						{/each}
						{#if !isShowAll && stats.pageStats.length > 4}
							<div
								class="w-full mt-8 p-4 text-center cursor-pointer"
								on:click={() => (isShowAll = true)}
							>
								Show More
							</div>
						{/if}
					</div>
				</div>
			{/if}

			<div class="rounded-xl p-4 border _border-white">
				<div class="flex justify-between items-center mb-4">
					<div class="text-lg mb-2">Referrers</div>
				</div>

				<div class="flex justify-between mb-2">
					<div>Page</div>
					<div class="w-[100px] text-right">Users</div>
				</div>

				<div>
					{#each isShowAll ? stats.referralStats : stats.referralStats.slice(0, 4) as referralStat, i}
						<div class="flex justify-between py-1 my-1">
							<div
								class="relative w-full"
								style="white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							flex-shrink: 1;
							max-width: 100%;
							min-width: 0;"
							>
								<div
									class="absolute h-full rounded top-0 left-[-5px] bg-[#8B786D] opacity-20"
									style="width: {(referralStat.count / maxReferralCount) * 100}%;"
								/>
								{referralStat.origin || '(none)'}
							</div>
							<div class="w-[100px] shrink-0 text-right">
								{referralStat.count}
							</div>
						</div>

						<hr class="_border-white" />
					{/each}
					{#if !isShowAll && stats.referralStats.length > 4}
						<div
							class="w-full mt-8 p-4 text-center cursor-pointer"
							on:click={() => (isShowAll = true)}
						>
							Show More
						</div>
					{/if}
				</div>
			</div>

			<div class="rounded-xl p-4 border _border-white">
				<div class="flex justify-between items-center mb-4">
					<div class="text-lg mb-2">Countries</div>
				</div>

				<div class="flex justify-between mb-2">
					<div>Country</div>
					<div class="w-[100px] text-right">Users</div>
				</div>

				<div>
					{#each isShowAll ? stats.userCountryStats : stats.userCountryStats.slice(0, 4) as userCountryStat, i}
						<div class="flex justify-between py-1 my-1">
							<div class="relative w-full">
								<div
									class="absolute h-full rounded top-0 left-[-5px] bg-[#8B786D] opacity-20"
									style="width: {(userCountryStat.count / maxCountryCount) * 100}%;"
								/>
								{userCountryStat.country ? countryCodeEmoji(userCountryStat.country) : ''}
								{userCountryStat.country
									? countryCodeLoockup.byIso(userCountryStat.country).country
									: '(none)'}
							</div>
							<div class="w-[100px] shrink-0 text-right">
								{userCountryStat.count}
							</div>
						</div>

						<hr class="_border-white" />
					{/each}
					{#if !isShowAll && stats.userCountryStats.length > 4}
						<div
							class="w-full mt-8 p-4 text-center cursor-pointer"
							on:click={() => (isShowAll = true)}
						>
							Show More
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}
{/key}

<style>
	._border-white {
		border: 1px rgba(139, 121, 108, 0.4) solid;
	}
</style>

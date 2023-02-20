<script>
	export let metrics;
	export let timeframe;
	import processStats from './processStats';

	import { LinkedChart, LinkedLabel, LinkedValue } from 'svelte-tiny-linked-charts';

	let userChartData, viewChartData, maxViewsCount, maxReferralCount, maxCountryCount, userGrowth;

	let timeframeLabel = {
		'7_days': 'Last Week',
		'24_hours': 'Last 24 Hours'
	};

	$: if (metrics) {
		let stats = processStats(metrics, timeframe);
		userChartData = stats.userChartData;
		viewChartData = stats.viewChartData;
		maxViewsCount = stats.maxViewsCount;
		maxReferralCount = stats.maxReferralCount;
		maxCountryCount = stats.maxCountryCount;
		userGrowth = stats.userGrowth;
	}
</script>

{#if metrics}
	<div class="flex w-full justify-between mb-2 items-end">
		<div class="flex items-end">
			<h1 class="text-base">Users</h1>
			<h3 class="ml-2 text-sm text-left">{timeframeLabel[timeframe]}</h3>
		</div>
		<div class="flex items-start">
			<h1>{metrics?.totalUsersCount}</h1>
			<div class="ml-2 text-green text-sm">{userGrowth > 0 ? `+${userGrowth}` : userGrowth}%</div>
		</div>
	</div>

	<div class="w-full">
		<div class="p-2 bg-[#222] rounded min-h-[70px]">
			<LinkedChart
				linked="chart"
				uid="users"
				data={userChartData}
				fill="#8B786D"
				grow={true}
				barMinWidth={5}
				gap={5}
				height={50}
				width={260}
				transition={500}
			/>
		</div>
	</div>
{/if}

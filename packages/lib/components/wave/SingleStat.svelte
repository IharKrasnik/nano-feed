<script>
	import moment from 'moment-timezone';
	import _ from 'lodash';
	import { browser } from '$app/environment';

	import { get } from 'lib/api';
	import { LinkedChart, LinkedLabel, LinkedValue } from 'svelte-tiny-linked-charts';
	import processSingleStats from 'lib/components/wave/processSingleStats';

	export let projectId;
	export let subProjectId;
	export let actionType;
	export let timeframe;
	export let timezone = moment.tz.guess();

	let actionLabels = {
		signup: 'Signups'
	};

	let stats;
	let chartData;

	let fetchStats = async () => {
		stats = (
			await get(`waveProjects/${projectId || subProjectId}/action-stats`, {
				...(subProjectId ? { subProjectId } : {}),
				actionType,
				timeframe,
				timezone
			})
		)[actionType][0];

		chartData = processSingleStats(stats, timeframe).chartData;

		if (browser && !chartWidth) {
			setTimeout(() => {
				chartWidth = widthEl.offsetWidth;
			}, 0);
		}
	};

	let refresh;
	$: refresh = fetchStats(projectId, timeframe);

	let widthEl;
	let chartWidth;

	const timeframeLabels = {
		'24_hours': '24 hours',
		'7_days': '7 days',
		'30_days': '30 days'
	};
</script>

<div class="rounded-xl p-4 _border-white" bind:this={widthEl}>
	{#if stats}
		<div class="flex justify-between items-center mb-4" bind:this={widthEl}>
			<div class="text-lg">{actionLabels[actionType]}</div>
			<div class="text-3xl font-bold">
				{stats.totalCount}
			</div>
		</div>

		<hr class="_border-white my-4" style="border-width: .5px" />

		{#if chartData && chartWidth}
			<LinkedChart
				linked="chart"
				uid="users"
				data={chartData}
				fill="#8B786D"
				grow={true}
				barMinWidth={20}
				gap={10}
				height={150}
				width={chartWidth}
				transition={500}
			/>
		{/if}

		<div class="px-4 flex w-full justify-between">
			<div class="text-sm text-slate-300 mt-4 shrink-0">
				{Object.keys(chartData)[0]}
			</div>

			<div class="text-sm text-slate-300 mt-4 shrink-0">
				{_.last(Object.keys(chartData))}
			</div>
		</div>
		<div class="w-full text-center py-4">
			<LinkedLabel linked="chart" empty={timeframeLabels[timeframe]} /> —
			<LinkedValue uid="users" empty={stats.totalCount} />
			{actionLabels[actionType].toLowerCase()}
		</div>
	{/if}
</div>

<style>
	._border-white {
		border: 1px rgba(139, 121, 108, 0.4) solid;
	}
</style>

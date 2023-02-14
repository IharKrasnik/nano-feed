<script>
  import _ from 'lodash';
  import moment from 'moment';
  import { LinkedChart, LinkedLabel, LinkedValue } from 'svelte-tiny-linked-charts';
  import { fly } from 'svelte/transition';

  export let stats;
  export let selectedTimeframe = '7_days';
  export let columns = 2;

  let widthEl;
  let chartWidth;
  
  let userChartData = null;
  let viewChartData = null;
  let maxViewsCount;
  let maxReferralCount;

  const timeframeLabels = {
    '7_days': '7 days',
    '24_hours': '24 hours'
  }

  $: if(stats) {
    maxViewsCount = stats.pageStats[0]?.count;
    maxReferralCount = stats.referralStats[0]?.count;

    let dateFrom;
    let unitToAdd;
    let dateLabelFormat = 'yyyy-MM-DD';

    if (selectedTimeframe === '7_days') {
      dateFrom = moment().subtract(7, 'days');
      unitToAdd = 'day';
      dateLabelFormat = 'yyyy-MM-DD';
    } else if (selectedTimeframe === '24_hours') {
      dateFrom = moment().subtract(24, 'hours');
      unitToAdd = 'hour';
      dateLabelFormat = 'DD-HH';
    }

    let now = moment().add(1, 'hour');

    userChartData = {};
    viewChartData = {};

    while (dateFrom < now) {
      let dateLabel = dateFrom.format(dateLabelFormat);
      
      userChartData[dateLabel] = stats.userStats.find(s => s.date === dateLabel)?.count || 0;
      viewChartData[dateLabel] = stats.viewStats.find(s => s.date === dateLabel)?.count || 0;
      dateFrom.add(1, unitToAdd);
    }

    if (!chartWidth) {
      setTimeout(() => {
        chartWidth = widthEl.offsetWidth;
      }, 0);
    } 
  }
</script>

{#if stats}
  <div 
    class="grid grid-cols-1 md:grid-cols-{columns} gap-4"
    in:fly={{ y: 50, duration: 150, delay: 150 }}
  >
    <div class="rounded-xl p-4 _border-white">
      <div class="flex justify-between items-center mb-4" bind:this={widthEl}>
        <div class="text-lg">Unique Users</div>
        <div class="text-3xl font-bold">
          {stats.totalUsersCount}
        </div>
      </div>

      <hr class="_border-white my-4" style="border-width: .5px"/>

      {#if userChartData && chartWidth}
        <LinkedChart 
          linked="chart"
          uid="users"
          data={userChartData}
          fill="#8B786D"
          grow={true}
          barMinWidth={20}
          gap={10}
          height={150}
          width={chartWidth}
          transition={500}
          >
        </LinkedChart>
      {/if}

      <div class="px-4 flex w-full justify-between">
        <div class="text-sm text-slate-300 mt-4">
          {Object.keys(userChartData)[0]}
        </div>
        <div class="py-4">
          <LinkedLabel linked="chart" empty="{timeframeLabels[selectedTimeframe]}"/> —
          <LinkedValue uid="users" empty={stats.totalUsersCount}/> users
        </div>
        <div class="text-sm text-slate-300 mt-4">
          {_.last(Object.keys(userChartData))}
        </div>
      </div>
    </div>
    
    <div class="rounded-xl p-4 border _border-white">
      <div class="flex justify-between items-center mb-4">
        <div class="text-lg">Page Views</div>
        <div class="text-3xl font-bold">
          {stats.totalViewsCount}
        </div>
      </div>

      <hr class="_border-white my-4" style="border-width: .5px"/>

      {#if viewChartData && chartWidth}
        <LinkedChart 
          linked="chart"
          uid="views"
          data={viewChartData}
          fill="#8B786D"
          grow={true}
          barMinWidth={20}
          gap={10}
          height={150}
          width={chartWidth}
          transition={500}
          >
        </LinkedChart>
      {/if}

      <div class="px-4 flex w-full justify-between">
        <div class="text-sm text-slate-300 mt-4">
          {Object.keys(viewChartData)[0]}
        </div>
        <div class="py-4">
          <LinkedLabel linked="chart" empty="{timeframeLabels[selectedTimeframe]}"/> —
          <LinkedValue uid="views" empty={stats.totalViewsCount}/> views
        </div>
        <div class="text-sm text-slate-300 mt-4">
          {_.last(Object.keys(viewChartData))}
        </div>
      </div>
    </div>

    <div class="rounded-xl p-4 border _border-white">
      <div class="flex justify-between items-center mb-4">
        <div class="text-lg mb-4">Pages</div>
      </div>

      <div class="flex justify-between mb-2">
        <div>Page</div>
        <div class="w-[100px] text-right">Users</div>
      </div>
      
      <div>
        {#each stats.pageStats as pageStat, i}
          <div class="flex justify-between py-1 my-1">
            <div class="relative w-full">
              <div class="absolute h-full rounded top-0 left-[-5px] bg-[#8B786D] opacity-20" style="width: {pageStat.count / maxViewsCount * 100}%;"></div>
              {pageStat.url.replace(/^.*\/\/[^\/]+/, '')}
            </div>
            <div class="w-[100px] shrink-0 text-right">
              {pageStat.count}
            </div>
          </div>

          <hr class="border-gray-600"/>
        {/each}
      </div>
    </div>

    <div class="rounded-xl p-4 border _border-white">
      <div class="flex justify-between items-center mb-4">
        <div class="text-lg mb-2">Referrers</div>
      </div>

      <div class="flex justify-between mb-2">
        <div>Page</div>
        <div class="w-[100px] text-right">Users</div>
      </div>
      
      <div>
        {#each stats.referralStats as referralStat, i}
          <div class="flex justify-between py-1 my-1">
            <div class="relative w-full">
              <div class="absolute h-full rounded top-0 left-[-5px] bg-[#8B786D] opacity-20" style="width: {referralStat.count / maxReferralCount * 100}%;"></div>
              {referralStat.origin || '(none)'}
            </div>
            <div class="w-[100px] shrink-0 text-right">
              {referralStat.count}
            </div>
          </div>

          <hr class="_border-white"/>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  ._border-white {
    border: 1px  rgba(139, 121, 108, .4) solid;
  }
 
</style>
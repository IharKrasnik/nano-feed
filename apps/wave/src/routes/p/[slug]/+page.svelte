<script>
  import _ from 'lodash';
  import moment from 'moment';

  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { GOOGLE_LOGIN_URL } from 'lib/env';

  import { fly, slide } from 'svelte/transition';

  // import * as socketIoService from '$lib/socketIoService';

  import { get } from 'lib/api';

  import Loader from 'lib/components/Loader.svelte';
  import allProjects from '$lib/stores/allProjects';
  import currentUser, { isLoading as isUserLoading } from 'lib/stores/currentUser';
  import { LinkedChart, LinkedLabel, LinkedValue } from 'svelte-tiny-linked-charts';

  let projectSlug = $page.params.slug;

  let selectedTimeframe = '7_days';
  
  const timeframeLabels = {
    '7_days': '7 days',
    '24_hours': '24 hours'
  }

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

  const refreshStats = async (projects, slug) => {
    isStatsLoading = true;

    if (slug) {
      if (projects) {
        selectedProject = projects.find(p => p.slug === slug);
      }
      
      if (!selectedProject || selectedProject.isActive) {
        stats = await get(`waveProjects/${slug}/stats`, {
          timeframe: selectedTimeframe,
        });
        
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
      }
    }

    isStatsLoading = false;

    if (!chartWidth) {
      setTimeout(() => {
        chartWidth = widthEl.offsetWidth;
      }, 0);
    } 
  }

	$: browser && refreshStats($allProjects, $page.params.slug);

  // onMount(() => {
  //   socketIoService.on('waveProject:activated', (project) => {
  //     $allProjects = $allProjects.map(p => {
  //       if (p._id === project._id){
  //         return project;
  //       } else {
  //         return p;
  //       }
  //     });

  //     if (selectedProject._id === project._id) {
  //       selectedProject.isActive = true;
  //     }
  //   });
  // });

  let embedCode = `<script async src="https://wave.mmntm.build/wave.js"><\/script>`;
</script>

<div class="flex justify-between items-center mb-8">
  <div>
    <h1 class="text-xl font-bold"> Analytics </h1>
    <div class="opacity-70">
      <a href="//{$page.params.slug}" target="_blank">
        {$page.params.slug}
      </a>
    </div>
  </div>
  <div class="flex items-center">
    {#if isStatsLoading}
      <div class="mr-2">
        <Loader></Loader>
      </div>
    {/if}
    <select
      bind:value={selectedTimeframe}
      on:change={() => refreshStats($allProjects, $page.params.slug)} class="max-w-[200px] small">
      <option value="7_days">Last 7 days</option>
      <option value="24_hours">Last 24 hours</option>
      <!-- <option>Last 14 days</option> -->
      <!-- <option>Last 30 days</option> -->
    </select>
  </div>
</div>

{#if !selectedProject || selectedProject.isActive}
  {#if !$isUserLoading && !$currentUser }
  <div class="p-4 md:p-8 bg-zinc-900 mb-8 rounded-xl">
    <div class="mb-2">Hey 👋 <br/></div>

    Momentum Wave is stupid-simple analytics dashboard that you can add to your website <b>in seconds</b>.

    <a href="{GOOGLE_LOGIN_URL}" class="block my-4">
      <button class="small">Add analytics to my website</button> <br />
    </a>

    <div>
      <span class="opacity-70">Here's a public analytics dashboard for <a target="_blank" href="{$page.params.slug}">{$page.params.slug}</a> </span>👇
    </div>
  </div>
  {/if}

  {#if stats}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4"
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

            <hr class="border-gray-600"/>
          {/each}
        </div>
      </div>
    </div>
  {/if}
{:else}
  <div class="p-4 bg-zinc-900">
    <div class="text-lg font-bold">Waiting for data</div>
    Add the following script to your &lt;head&gt; tag.
    Once added, visit your website.
    
    <div class="mt-4 p-4 bg-black">
      {embedCode}
    </div>
  </div>   
{/if}


<style>
  ._border-white {
    border: 1px rgba(255, 255, 255, .4) solid;
  }
 
  svg {
    width: 100%;
    height: 50px;
  }
</style>
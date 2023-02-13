<script>
  import _ from 'lodash';
  import moment from 'moment';

  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';

  import { fly } from 'svelte/transition';

  import * as socketIoService from '$lib/socketIoService';

  import { get } from 'lib/api';
	import { GOOGLE_LOGIN_URL } from 'lib/env';

  import Loader from 'lib/components/Loader.svelte';
  import Highlight from 'lib/components/Highlight.svelte';
  import allProjects from '$lib/stores/allProjects';
  import currentUser from 'lib/stores/currentUser';
  import { LinkedChart, LinkedLabel, LinkedValue } from 'svelte-tiny-linked-charts';

  let projectSlug = $page.params.slug;

  let selectedTimeframe = '7_days';
  
  const timeframeLabels = {
    '7_days': '7 days',
    '24_hours': '24 hours'
  }

  if (browser && !$currentUser) {
    goto(GOOGLE_LOGIN_URL);
  }

  let stats;

  let userChartData = null;
  let viewChartData = null;
  let maxViewsCount;
  let maxReferralCount;

  let selectedProject;

  let isStatsLoading = true;

  const refreshStats = async (projects, slug) => {
    isStatsLoading = true;

    if (projects?.length && slug) {
      selectedProject = $allProjects.find(p => p.slug === slug);
      
      if (selectedProject.isActive) {
        stats = await get(`waveProjects/${selectedProject._id}/stats`, {
          timeframe: selectedTimeframe,
        });
        
        maxViewsCount = stats.pageStats[0].count;
        maxReferralCount = stats.referralStats[0].count;

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
  }

	$: refreshStats($allProjects, $page.params.slug);

  socketIoService.on('waveProject:activated', (project) => {
    $allProjects = $allProjects.map(p => {
      if (p._id === project._id){
        return project;
      } else {
        return p;
      }
    });

    if (selectedProject._id === project._id) {
      selectedProject.isActive = true;
    }
  });
</script>

{#if $allProjects}
  <div class='flex items-center mb-8'>
    <select bind:value={projectSlug} class='small max-w-[300px]' on:change={() => goto(`/projects/${projectSlug}`)}>
      {#each $allProjects as project}
        <option value={project.slug}>{project.name}</option>
      {/each}
    </select>
    <a href='/new' style='margin-right: -60px;'>
      <button class='ml-4 small'>Add</button>
    </a>
  </div>

  <div class='flex justify-between items-center mb-8'>
    <h1 class='text-xl font-bold'> Analytics </h1>
    
    <div class="flex items-center">
      {#if isStatsLoading}
        <div class="mr-2">
          <Loader></Loader>
        </div>
      {/if}
      <select
        bind:value={selectedTimeframe}
        on:change={() => refreshStats($allProjects, $page.params.slug)} class='max-w-[200px] small'>
        <option value="7_days">Last 7 days</option>
        <option value="24_hours">Last 24 hours</option>
        <!-- <option>Last 14 days</option> -->
        <!-- <option>Last 30 days</option> -->
      </select>
    </div>
  </div>

  {#if selectedProject?.isActive}
    {#if stats}
      <div class='grid grid-cols-2 gap-4' 
        in:fly={{ y: 50, duration: 150, delay: 150 }}
      >
        <div class='rounded-xl p-4 _border-white'>
          <div class='flex justify-between items-center mb-4'>
            <div class='text-lg'>Unique Users</div>
            <div class='text-3xl font-bold'>
              {stats.totalUsersCount}
            </div>
          </div>

          <hr class="_border-white my-4" style="border-width: .5px"/>

          {#if userChartData}
            <LinkedChart 
              linked='chart'
              uid='users'
              data={userChartData}
              fill='#8B786D'
              grow={true}
              barMinWidth={20}
              gap={10}
              height={150}
              width={450}
              transition={500}
              >
            </LinkedChart>
          {/if}

          <div class='px-4 flex w-full justify-between'>
            <div class='text-sm text-slate-300 mt-4'>
              {Object.keys(userChartData)[0]}
            </div>
            <div class='py-4'>
              <LinkedLabel linked='chart' empty='{timeframeLabels[selectedTimeframe]}'/> —
              <LinkedValue uid='users' empty={stats.totalUsersCount}/> users
            </div>
            <div class='text-sm text-slate-300 mt-4'>
              {_.last(Object.keys(userChartData))}
            </div>
          </div>
        </div>
        <div class='rounded-xl p-4 border _border-white'>
          <div class='flex justify-between items-center mb-4'>
            <div class='text-lg'>Views</div>
            <div class='text-3xl font-bold'>
              {stats.totalViewsCount}
            </div>
          </div>

          <hr class='_border-white my-4' style="border-width: .5px"/>

          {#if viewChartData}
            <LinkedChart 
              linked='chart'
              uid='views'
              data={viewChartData}
              fill='#8B786D'
              grow={true}
              barMinWidth={20}
              gap={10}
              height={150}
              width={450}
              transition={500}
              >
            </LinkedChart>
          {/if}

          <div class='px-4 flex w-full justify-between'>
            <div class='text-sm text-slate-300 mt-4'>
              {Object.keys(viewChartData)[0]}
            </div>
            <div class='py-4'>
              <LinkedLabel linked='chart' empty='{timeframeLabels[selectedTimeframe]}'/> —
              <LinkedValue uid='views' empty={stats.totalViewsCount}/> views
            </div>
            <div class='text-sm text-slate-300 mt-4'>
              {_.last(Object.keys(viewChartData))}
            </div>
          </div>
        </div>

        <div class='rounded-xl p-4 border _border-white'>
          <div class='flex justify-between items-center mb-4'>
            <div class='text-lg mb-4'>Pages</div>
          </div>

          <div class='flex justify-between mb-2'>
            <div>Page</div>
            <div class='w-[100px] text-right'>Users</div>
          </div>
          
          <div>
            {#each stats.pageStats as pageStat, i}
              <div class='flex justify-between py-1 my-1'>
                <div class='relative w-full'>
                  <div class='absolute h-full rounded top-0 left-[-5px] bg-[#8B786D] opacity-20' style='width: {pageStat.count / maxViewsCount * 100}%;'></div>
                  {pageStat.url.replace(/^.*\/\/[^\/]+/, '')}
                </div>
                <div class='w-[100px] shrink-0 text-right'>
                  {pageStat.count}
                </div>
              </div>

              <hr class='border-gray-600'/>
            {/each}
          </div>
        </div>

        <div class='rounded-xl p-4 border _border-white'>
          <div class='flex justify-between items-center mb-4'>
            <div class='text-lg mb-2'>Referrers</div>
          </div>

          <div class='flex justify-between mb-2'>
            <div>Page</div>
            <div class='w-[100px] text-right'>Users</div>
          </div>
          
          <div>
            {#each stats.referralStats as referralStat, i}
              <div class='flex justify-between py-1 my-1'>
                <div class='relative w-full'>
                  <div class='absolute h-full rounded top-0 left-[-5px] bg-[#8B786D] opacity-20' style='width: {referralStat.count / maxReferralCount * 100}%;'></div>
                  {referralStat.origin || '(none)'}
                </div>
                <div class='w-[100px] shrink-0 text-right'>
                  {referralStat.count}
                </div>
              </div>
              {#if i !== 4}
              <hr class='border-gray-600'/>
              {/if} 
            {/each}
          </div>
        </div>
      </div>
    {:else}
      <Loader></Loader>
    {/if}
  {:else}
    <div class="p-4 bg-zinc-900">
      <div class="text-lg font-bold">Waiting for data</div>
      Add the following script to your &lt;head&gt; tag.
      Once added, visit your website.
      
      <div class="mt-4">
        <Highlight code={`<script async src="https://wave.mmntm.build/wave.js"></script>`}></Highlight>
      </div>
    </div>   
  {/if}
{:else}
  <Loader></Loader>
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
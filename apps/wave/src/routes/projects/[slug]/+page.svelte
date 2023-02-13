<script>
  import _ from 'lodash';
  import moment from 'moment';
  import { fly } from 'svelte/transition';
  import { get } from 'lib/api';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
	import { GOOGLE_LOGIN_URL } from 'lib/env';

  import Loader from 'lib/components/Loader.svelte';
  import AutoCompleteInput from 'lib/components/AutoCompleteInput.svelte';
  import allProjects from '$lib/stores/allProjects';
  import currentUser from 'lib/stores/currentUser';
  import { LinkedChart, LinkedLabel, LinkedValue } from 'svelte-tiny-linked-charts';

  let projectSlug = $page.params.slug;

  let chartData = {
    'Feb 7': 12,
    'Feb 8': 8,
    'Feb 9': 1,
    'Feb 10': 12,
    'Feb 11': 4,
    'Feb 12': 0,
    'Feb 13': 10,
  }

  debugger;
  
  if (browser && !$currentUser) {
    goto(GOOGLE_LOGIN_URL);
  }

  let stats;

  let userChartData = null;
  let viewChartData = null;
  let maxViewsCount;
  let maxReferralCount;

  const refreshStats = async (projects, slug) => {
    if (projects?.length && slug) {
      stats = await get(`waveProjects/${$allProjects.find(p => p.slug === slug)._id}/stats`);
      
      maxViewsCount = stats.pageStats[0].count;
      maxReferralCount = stats.referralStats[0].count;

      let dateFrom = moment().subtract(7, 'days');
      let now = moment();

      userChartData = {};
      viewChartData = {};

      while (dateFrom < now) {
        let dateLabel = dateFrom.format('yyyy-MM-DD');
        userChartData[dateLabel] = stats.userStats.find(s => s.date === dateLabel)?.count || 0;
        viewChartData[dateLabel] = stats.viewStats.find(s => s.date === dateLabel)?.count || 0;
        dateFrom.add(1, 'day');
      }
      debugger;
    }
  }

	$: refreshStats($allProjects, $page.params.slug);
  

  let pageStats = [{
    url: '/',
    usersCount: 17,
    percentage: 100
  }, {
    url: '/docs/intro',
    usersCount: 16,
    percentage: 98
  }, {
    url: '/docs/architecture',
    usersCount: 7,
    percentage: 40
  }, {
    url: '/#showcase',
    usersCount: 5,
    percentage: 30
  }, {
    url: '/docs/migrator',
    usersCount: 5,
    percentage: 30
  }];

  let referralStats = [{
    url: 'indiehackers.com',
    usersCount: '3,123',
    percentage: 100
  }, {
    url: 'google.com',
    usersCount: '1,234',
    percentage: 33
  }, {
    url: 't.co',
    usersCount: '987',
    percentage: 30
  }]

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
    <h2 class='text-xl font-bold'> Analytics</h2>
    <select class='max-w-[200px] small'>
      <option>Last 7 days</option>
      <option>Last 24 hours</option>
      <option>Last 14 days</option>
      <option>Last 30 days</option>
    </select>
  </div>

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
            {Object.keys(chartData)[0]}
          </div>
          <div class='py-4'>
            <LinkedLabel linked='chart' empty='7 days'/> —
            <LinkedValue uid='users' empty={stats.totalUsersCount}/> users
          </div>
          <div class='text-sm text-slate-300 mt-4'>
            {_.last(Object.keys(chartData))}
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
            {Object.keys(chartData)[0]}
          </div>
          <div class='py-4'>
            <LinkedLabel linked='chart' empty='7 days'/> —
            <LinkedValue uid='views' empty={stats.totalViewsCount}/> views
          </div>
          <div class='text-sm text-slate-300 mt-4'>
            {_.last(Object.keys(chartData))}
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
                {pageStat.url}
              </div>
              <div class='w-[100px] shrink-0 text-right'>
                {pageStat.count}
              </div>
            </div>
            {#if i !== 4}
            <hr class='border-gray-600'/>
            {/if} 
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
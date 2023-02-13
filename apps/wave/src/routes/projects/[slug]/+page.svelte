<script>
  import _ from 'lodash';
  import moment from 'moment';

  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';

  import { fly } from 'svelte/transition';

  // import * as socketIoService from '$lib/socketIoService';

  import { get } from 'lib/api';
	import { GOOGLE_LOGIN_URL } from 'lib/env';

  import Loader from 'lib/components/Loader.svelte';
  import Highlight from 'lib/components/Highlight.svelte';
  import allProjects from '$lib/stores/allProjects';
  import currentUser from 'lib/stores/currentUser';
  // import { LinkedChart, LinkedLabel, LinkedValue } from 'svelte-tiny-linked-charts';

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
</script>


<style>
  ._border-white {
    border: 1px rgba(255, 255, 255, .4) solid;
  }
 
  svg {
    width: 100%;
    height: 50px;
  }
</style>
<script>
  import _ from 'lodash';
  import moment from 'moment';
  import tooltip from '$lib/use/tooltip';

  import { get } from '$lib/api';

  export let projectSlug;
  export let creatorUsername;

  export let weeks = 4;

  let allWeeks = [];

  let load = async () => {
    let query = {
      weeks,
    };
    
    if (projectSlug) {
      query.projectSlug = projectSlug;
    }

    if (creatorUsername) {
      query.creatorUsername = creatorUsername;
    }

    const dayStats = await get('feed/stats', query);
    
    let now = moment();
    let lastMonday = now.clone().startOf('isoweek');

    _.range(0, weeks).forEach(weekNum => {
      allWeeks[weekNum] = [];

      _.range(0, 7).forEach(dayNum => {
        let date = lastMonday.clone().subtract(weekNum, 'weeks').add(dayNum, 'days');

        let dateLabel = date.format('YYYY-MM-DD');
        let dateStats = dayStats.find(d=> d.date === dateLabel);

        allWeeks[weekNum].push({
          count: dateStats?.count || 0,
          date: dateLabel,
          dateFormatted: moment(dateLabel).format('MMM DD'),
          isToday: now.isSame(date, 'day'),
          isFuture: date > now,
        })
      });
    });
  }

  load();
</script>

<div>
  <div class="flex w-full justify-between text-sm opacity-60 mb-2">
    <div class="flex justify-center items-center w-[14.3%]">Mo</div>
    <div class="flex justify-center items-center w-[14.3%]">Tu</div>
    <div class="flex justify-center items-center w-[14.3%]">We</div>
    <div class="flex justify-center items-center w-[14.3%]">Th</div>
    <div class="flex justify-center items-center w-[14.3%]">Fr</div>
    <div class="flex justify-center items-center w-[14.3%]">St</div>
    <div class="flex justify-center items-center w-[14.3%]">Su</div>
  </div>
    
  {#each allWeeks as weekDays}
    <div class="flex w-full justify-between">
      {#each weekDays as weekDay}
        <div class="_cell flex grow justify-center items-center text-sm p-2 text-gray-400 w-[14.3%]" 
          class:opacity-30={weekDay.isFuture}
          class:_today={weekDay.isToday}
          class:_empty={!weekDay.count}
          title={`${weekDay.dateFormatted} — ${weekDay.count || 'no'} posts`}
          use:tooltip
        >
          {weekDay.count}
        </div>
      {/each} 
    </div>
  {/each}
</div>

<style>
  ._cell {
    border: 1px rgba(255, 255, 255, .3) solid;
    cursor: default;
    /* flex: 1 0 0; */
  }

  ._today {
    border: 1px white solid;
    font-weight: bold;
  }

  ._empty {
    color: rgba(255, 255, 255, .3);
  }
</style>
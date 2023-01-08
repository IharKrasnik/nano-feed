<script>
  import SourceLogo from '$lib/components/SourceLogo.svelte';
  import { onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';

  import _ from 'lodash';

  export let project;
  export let creators;

  export let stream;

  export let creator;
  
  let shuffledCreators = [];

	let shuffleCreators = () => shuffledCreators = _.shuffle(creators);

	$: if (creators?.length) {
		shuffleCreators();
	}

  const shuffleInterval = setInterval(() => {
		shuffleCreators();
	}, 10000);


	onDestroy(() => {
		clearInterval(shuffleInterval)
	});
</script>

<div>
  {#if stream}
    <div class="_project mb-8 rounded-xl">

      <!-- <img src="https://assets.website-files.com/636cf54cf20a6ac090f7deb0/63773738962ed74d59268fbc_open-graph.png" class="w-full rounded-xl"/> -->

      {#if stream.bannerUrl}
        <img src="{stream.bannerUrl}" class="w-full rounded-xl max-h-[180px] object-cover" style="border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;"/>
      {/if}
       
      {#if stream.avatarUrl}
        <div class="ml-4 {stream.bannerUrl ? 'mt-[-30px]' : 'pt-4'}">
          <img src={stream.avatarUrl} class="w-[60px] h-[60px] rounded-full" />
        </div>
      {/if}

      <div class="p-4" >
        <div class="text-lg font-bold"> 
          {stream.title || stream.fullName}
        </div>
        
        {#if stream.longDescription}
          <div>
            { stream.longDescription }
          </div>
        {/if}
        
        <div class="flex justify-between items-center opacity-80 mt-2">
          <div class="text-sm font-normal w-full overflow-hidden text-ellipsis">
            {#if stream.url}
              <svg class="inline w-[10px] h-[10px] text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="&#10;    stroke: white;&#10;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              <a href="{stream.url}" target="_blank"> {stream.url.replace('https://', '').replace('http://', '')}</a>
            {/if}
          </div>
          {#if stream.links?.length}
            <div class="flex items-center my-2">
              {#each stream.links as link}
                <a href="{link.url}" target="_blank" class="ml-2"> <SourceLogo source={link.source} /> </a>
              {/each}
            </div>
          {/if}
        </div>

        {#if creators}
        <div class="w-full mt-4">
          <label class="font-bold block mb-2">
            Creators
            {#if creators?.length}
            
            <span class="number-tag">
              {creators.length}
            </span>
            {/if}
          </label>

          {#key shuffledCreators}
            {#if shuffledCreators.length}
              <a class="_creators w-full mt-4 flex" class:justify-between={shuffledCreators.length > 7} href="/creators" in:fade={{ duration: 200 }}>
                {#each shuffledCreators.slice(0, 7) as creator}
                <img src={creator.avatarUrl} class="w-[35px] h-[35px] inline rounded-full mr-[-10px]" />
                {/each}
              </a>
            {/if}
          {/key}
        </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
	._project {
    outline: 2px rgba(255,255,255, .1) solid;
    transition: all 0.08s linear;
	}

	._project:hover {
    /* transform: scale(1.05); */
    background: rgba(255,255,255, 0.03);
    outline: 1px rgba(255,255,255, .3) solid;
  }

  ._creators {
		transition: all linear 0.1s;
		border-radius: 8px;
	}

	._creators:hover {
		background: rgba(255, 255, 255, .1);
		padding: 16px;
	}
</style>
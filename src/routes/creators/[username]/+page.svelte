<script>
	  import FeedItem from '$lib/components/feed-item.svelte';
  	import { page } from '$app/stores';
    import creators from '$lib/stores/creators';
	  import feed, { update as updateFeed } from '$lib/stores/feed';
    import { fly } from 'svelte/transition';
		
    updateFeed({ creatorUserName: $page.params.username}); 

    $: creator = $creators.find(c => c.username === $page.params.username);
</script>

{#if creator}
  {#if creator.username !== 'Bachrimchuk'}

  <div class="flex items-center mb-8">
    <img class="w-[50px] h-[50px] rounded-full mr-4" src={creator.avatarUrl} />

    <div>
      {creator.username}
    </div>
  </div>

  {:else}
  <div class="flex flex-col items-center justify-center mb-16 mt-8" >
    <img class="w-[300px] h-[400px] mr-4" style="border: 1px #ffffff45 solid; object-fit: cover;" src={creator.avatarUrl} />

    <div class="text-[32px] mt-4 text-xl font-bold" style="font-family: 'UnifrakturCook', cursive;">
      {creator.username}
    </div>
  </div>
  {/if}

{/if}

{#key $feed}
	{#if $feed.length > 0}
  <div in:fly={{  y: 50, duration: 150, delay: 150 }}>
    {#each $feed as feedItem}
      <FeedItem feedItem={feedItem}></FeedItem>
    {/each}
  </div>
  {/if}
{/key}
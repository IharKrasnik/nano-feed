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
<div class="flex items-center mb-8">
  <img class="w-[50px] h-[50px] rounded-full mr-4" src={creator.avatarUrl} />

  <div>
    {creator.username}
  </div>
</div>
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
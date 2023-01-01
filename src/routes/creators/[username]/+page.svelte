<script>
	  import FeedItem from '$lib/components/FeedItem.svelte';
  	import { page } from '$app/stores';
    import creators from '$lib/stores/creators';
	  import feed, { update as updateFeed } from '$lib/stores/feed';
    import { fly, scale, blur } from 'svelte/transition';
		
    updateFeed({ creatorUserName: $page.params.username}); 

    $: creator = $creators.find(c => c.username === $page.params.username);
</script>

{#if creator}
  {#if creator.username !== 'bachrimchuk'}

  <div class="flex items-center mb-8">
    <img class="w-[50px] h-[50px] rounded-full mr-4" src={creator.avatarUrl} />

    <div>
      {creator.fullName}
    </div>
  </div>

  {:else}
  <div class="flex flex-col items-center justify-center mb-16 mt-8">
    <img 
      class="w-[300px] h-[400px] mr-4" style="border: 1px #ffffff45 solid; object-fit: cover;" src={creator.avatarUrl} in:scale={{ duration: 200 }} />

    <div class="text-[32px] mt-4 text-xl font-bold" style="font-family: 'UnifrakturCook', cursive;" in:blur={{ duration: 500, delay: 200 }}>
      Bachrimchuk
    </div>
  </div>

    <!-- <div class="flex flex-col items-center justify-center mb-16 mt-8">
    <img 
      class="mr-4"
      src="https://i.ibb.co/KqN0kSp/pngwing-com.png"
      in:scale={{ duration: 200 }} 
    />

    <div class="text-[32px] mt-4 text-xl font-bold" style="font-family: 'UnifrakturCook', cursive;" in:blur={{ duration: 500, delay: 700 }}>
      Bachrimchuk
    </div>
  </div> -->
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
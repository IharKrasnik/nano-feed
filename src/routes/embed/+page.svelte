<script>
	import { page } from '$app/stores'

  import FeedItem from '$lib/components/FeedItem.svelte';

	import feed, { update as updateFeed } from '$lib/stores/feed';
	import projects from '$lib/stores/feed';

	let selectedProject = $page.url.searchParams.get('project') ? $projects.find(p => p.value === $page.url.searchParams.get('project')) : $projects[0];

	let refreshFeed = () =>{
		updateFeed({ project: selectedProject?.value });
	}
	
	refreshFeed();

</script>

<div class="container mx-auto">
  <div class="text-[32px] font-bold w-full text-center p-4 mt-8" style="font-family: Montserrat; opacity: .9;">
    Paralect builds momentum in public
  </div>
  <div class="mt-8" style="display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: auto auto auto 1fr; gap: 10px;">
    {#key $feed}
      {#if $feed.length > 0}
        {#each $feed as feedItem}
          <div class="mr-8">
            <FeedItem feedItem={feedItem}></FeedItem>
          </div>
        {/each}
      {/if}
    {/key}
  </div>
</div>


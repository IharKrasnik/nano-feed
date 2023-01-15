<script>
	import { page } from '$app/stores'

  import { get } from '$lib/api';

  import FeedItem from '$lib/components/FeedItem.svelte';

	import { fetch as fetchFeed } from '$lib/stores/feed';

  let feed = [];
  let project;
  let creator;

  let username;

  let load =  async () => {
    if ($page.params.username.startsWith('@')) {
     
    } else {
  		feed = await fetchFeed({ project: $page.params.username });
      project = await get(`projects/${$page.params.username}`);
    } 
  }

  if (!project) {
    load()
  }

</script>

<svelte:head>
  <script sr="https://raw.githubusercontent.com/davidjbradshaw/iframe-resizer/master/js/iframeResizer.contentWindow.min.js" />
</svelte:head>

<div class="container mx-auto">
  <div class="text-[32px] font-bold w-full text-center p-4 mt-8" style="font-family: Montserrat; opacity: .9;">
    <!-- {project?.title} builds momentum in public -->
  </div>
  <!-- <div class="mt-8" style="display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: auto auto auto 1fr; gap: 10px;"> -->
  <div class="columns-1 md:columns-2 lg:columns-3 mt-8">
    {#key feed}
      {#if feed.length > 0}
        {#each feed as feedItem}
          <div class="px-2">
            <FeedItem feedItem={feedItem}></FeedItem>
          </div>
        {/each}
      {/if}
    {/key}
  </div>
</div>


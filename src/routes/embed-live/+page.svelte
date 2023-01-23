<script>
	import { page } from '$app/stores'
  import { fade } from 'svelte/transition';
  import FeedItem from '$lib/components/FeedItem.svelte';

	import feed, { update as updateFeed } from '$lib/stores/feed';
	import projects from '$lib/stores/projects';


  $: if ($projects.length) {
  	let selectedProject = $page.url.searchParams.get('project') ? $projects.find(p => p.slug === $page.url.searchParams.get('project')) : $projects[0];

    let refreshFeed = () =>{
      updateFeed({ project: selectedProject?.slug });
    }

  	refreshFeed();
  }

  let shownFeed;
  let index = 0;
  let showInterval;

  $: if ($feed.length && !showInterval) {
    shownFeed = $feed[index];
    
    showInterval = setInterval(() => {
      shownFeed = null;

      setTimeout(() => {
        shownFeed = $feed[++index];
      }, 400);
    }, 2000);
  }

</script>

<div class="p-4"> 
  <div class="container mx-auto">
    <div class="flex mt-8" style="width: 400x; height: 600px;">
      {#if shownFeed}
        <div class="mr-8" style="max-width: 100%; max-height: 100%;" transition:fade>
          <FeedItem feedItem={shownFeed} hideLikes></FeedItem>
        </div>
      {/if}
    </div>
</div>
</div>


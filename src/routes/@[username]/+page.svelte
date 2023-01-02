<script>
	  import Feed from '$lib/components/Feed.svelte';
	  
    import FeedItem from '$lib/components/FeedItem.svelte';
  	import { page } from '$app/stores';
    
    import creators from '$lib/stores/creators';
    import projects from '$lib/stores/projects';

    import { fly, scale, blur } from 'svelte/transition';
		
    let creator;

    $: if ($creators.length) {
      creator = $creators.find(c => c.username === $page.params.username);
    }

    let selectedProject;

    $: if ($projects.length) {
      if ($page.url.hash) {
        selectedProject = $projects.find(p => p.slug === $page.url.hash.replace('#', ''));
      } else {
        selectedProject = null;
      }
    }
</script>

{#if creator}
  <!-- {#if creator.username !== 'bachrimchuk'}
    <div class="text-lg mb-8" style="margin-top: -16px; opacity: .8;" in:fly={{  y: -50, duration: 150, delay: 150 }}>
      {#if selectedProject?.slug}
        {selectedProject?.description || ''}
      {:else}
        My goal is to be top tech partner for early-stage startups.
      {/if}
    </div>

  {:else}
    <div class="flex flex-col items-center justify-center mb-16 mt-8">
      <img 
        class="w-[300px] h-[400px] mr-4" style="border: 1px #ffffff45 solid; object-fit: cover;" src={creator.avatarUrl} in:scale={{ duration: 200 }} />

      <div class="text-[32px] mt-4 text-xl font-bold" style="font-family: 'UnifrakturCook', cursive;" in:blur={{ duration: 500, delay: 200 }}>
        Bachrimchuk
      </div>
    </div>
  {/if} -->

  {#if creator}
    <Feed bind:creator={creator} projectSlug={selectedProject?.slug} />
  {/if}
{/if}

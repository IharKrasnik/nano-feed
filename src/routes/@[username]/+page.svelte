<script>
	  import Feed from '$lib/components/Feed.svelte';
	  
    import FeedItem from '$lib/components/FeedItem.svelte';
  	import { page } from '$app/stores';
    
    import creators from '$lib/stores/creators';
    import projects from '$lib/stores/projects';

	  import feed, { update as updateFeed } from '$lib/stores/feed';
    import { fly, scale, blur } from 'svelte/transition';
		
    updateFeed({ creatorUsername: $page.params.username}); 

    $: creator = $creators.find(c => c.username === $page.params.username);

    let selectedProject;

    $: if ($projects.length) {
      if ($page.url.hash) {
        selectedProject = $projects.find(p => p.slug === $page.url.hash.replace('#', ''));
      } else {
        selectedProject = $projects.find(p => p.slug === null);
      }
    }
</script>

{#if creator}
  {#if creator.username !== 'bachrimchuk'}

  <!-- <div class="flex items-center mb-8">
    <img class="w-[50px] h-[50px] rounded-full mr-4" src={creator.avatarUrl} />

    <div>
      {creator.fullName}
    </div>
  </div> -->

  <div>
	{#if selectedProject && !$page.url.href.includes('/embed')}
	<section class="relative flex justify-between mb-8">
		<div class="flex items-center">
			<a class="flex" href="/">
				<h1 class="text-xl font-bold" style="z-index: 100;">
					{#if selectedProject.slug}
					{selectedProject.title}
					{:else}
					{creator.fullName}
					{/if}
				</h1>
			</a>
		</div>
	</section>
	{/if}
</div>

<div class="text-lg mb-8" style="margin-top: -16px; opacity: .8;" in:fly={{  y: -50, duration: 150, delay: 150 }}>
	{#if selectedProject.slug}
	  {selectedProject?.description || ''}
  {:else}
    <!-- Creator feed from {creator.fullName} -->
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

  {#if creator}
    <Feed creator={creator} projectSlug={selectedProject?.slug} />
  {/if}
{/if}

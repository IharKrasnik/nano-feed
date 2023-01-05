<script>
  import { onMount } from 'svelte';
  import dayjs from 'dayjs';
  import currentUser from '$lib/stores/currentUser';
  import SourceLogo from '$lib/components/SourceLogo.svelte';

  export let feedItem = {
	}

  let clazz = '';
  export { clazz as class };

  let videoEl;

  onMount(() => {
    if (videoEl) {
      videoEl.play();
    }
  });
</script>

<a class="_item mb-8 inline-block w-full relative {clazz}"
  class:_release="{feedItem.isRelease}"
  class:_link="{!!feedItem.url}"
  href="{feedItem.url}" 
  target="_blank"
>
  <div class="relative">
    {#if feedItem.title}
      <div class="font-bold" href="{feedItem.url}">{feedItem.title}</div>
      <hr class="my-4 opacity-20"/>
    {/if}

    {#if feedItem.content}
      <div class="whitespace-pre-wrap">
        {feedItem.content}
      </div>
    {/if}

    {#if ['youtube'].includes(feedItem.source) && feedItem.url}
      {#if feedItem.attachments?.length}
        <div class="absolute" style="left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%);">
          <svg xmlns="http://www.w3.org/2000/svg" style="width: 80px; height: 80px;" height="800" width="1200" viewBox="-35.20005 -41.33325 305.0671 247.9995"><path d="M229.763 25.817c-2.699-10.162-10.65-18.165-20.748-20.881C190.716 0 117.333 0 117.333 0S43.951 0 25.651 4.936C15.553 7.652 7.6 15.655 4.903 25.817 0 44.236 0 82.667 0 82.667s0 38.429 4.903 56.85C7.6 149.68 15.553 157.681 25.65 160.4c18.3 4.934 91.682 4.934 91.682 4.934s73.383 0 91.682-4.934c10.098-2.718 18.049-10.72 20.748-20.882 4.904-18.421 4.904-56.85 4.904-56.85s0-38.431-4.904-56.85" fill="red"/><path d="M93.333 117.559l61.333-34.89-61.333-34.894z" fill="#fff"/></svg>
        </div>
      {:else}
        <iframe
          class="w-full mt-2 min-h-[300px] pointer-events-none"
          src="https://www.youtube.com/embed/{new URL(feedItem.url).searchParams.get('v')}" 
          title="YouTube video player" frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
      {/if}
    {/if}

    {#if (['linkedin'].includes(feedItem.source)) && !feedItem.isRelease}
    <div class="flex justify-between opacity-50">
    <div>...</div>
    <div class="text-right">...see more</div>
    </div>
    {/if}

    {#if feedItem.attachments}
      <div class="mt-2">
        {#each feedItem.attachments as attachment}
          {#if attachment.type === 'image'}
            <img src={attachment.url} class="w-full " style="max-height: 500px; object-fit: cover;" />
          {/if}
          {#if attachment.type === 'video'}
          
          <video style="width: 100%; max-height: 300px;" muted loop autoplay bind:this={videoEl}>
            <source src={attachment.url} type="video/mp4">
          </video>

          {/if}
        {/each}
      </div>
    {/if}
   
    <div class="my-4 flex items-center justify-between">
      <div class="flex items-center text-sm opacity-80">
        {#if feedItem.isRelease}
            <div class="mr-2">
              🚀
            </div>
        {/if}

        <div class="shrink-0">
          {#if $currentUser && ($currentUser.isAdmin || feedItem.creators.find( c => c._id === $currentUser._id))}
            <a class="hover:underline opacity-90" href="/write?feedId={feedItem._id}">
              {dayjs(new Date(feedItem.publishedOn || feedItem.createdOn)).format('MMM DD, YYYY')}
            </a>
          {:else}
            {dayjs(new Date(feedItem.publishedOn || feedItem.createdOn)).format('MMM DD, YYYY')}
          {/if}
        </div>
 
         <div class="overflow-x-scroll mx-4">
          {#each (feedItem.projects || []).filter(p => !p.isHub) as project}
            <a class="hover:underline mr-4 opacity-90" href="/#{project.slug}">
              <span style="color: {project.color};">#</span>
              {project.title} 
            </a>
          {/each}
        </div>
      </div>
      
      <SourceLogo bind:source={feedItem.source} />
    </div>

    <hr class="my-4 opacity-20"/>
    
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        {#if feedItem?.creators}
          {#each feedItem.creators as creator, i}
          <a href="/@{creator.username}" class="shrink-0 w-[40px] mr-[-20px]" style="z-index: {100-i};">
            <img src="{creator.avatarUrl}" class="rounded-full w-[40px] h-[40px]" /> 
          </a>
          {/each}

          <div class="pl-4 text-sm ml-[20px]">
            {#each feedItem.creators as creator, i}
              <a href="/@{creator.username}" class="hover:underline">{creator.fullName}</a>{i !== feedItem.creators.length - 1 ? ', ' : ''}
            {/each}
          </div>
        {/if}
      </div>
    </div>

  </div>
</a>

<style>
  ._item {
    transition: all 0.08s linear;
    outline: 2px rgba(255,255,255, .1) solid;
    border-radius: 15px;
    padding: 16px;
    z-index: 1000;
    color: white;
    background: black;
  }

  ._item._link {
    cursor: pointer;
  }

  ._item._release {
    outline-color: #d87712 !important;
    outline-width: 1px;
  }

  ._item._release:hover {
  }

  ._item._link:hover {
    /* transform: scale(1.05); */
    background: rgba(255,255,255, 0.03);
    outline: 1px rgba(255,255,255, .3) solid;
  }
</style>
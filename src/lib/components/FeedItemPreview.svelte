<script>
  import { get } from '$lib/api';
  import StreamCard from '$lib/components/StreamCard.svelte';
  import Loader from '$lib/components/Loader.svelte';
  import allProjects from '$lib/stores/allProjects';
  
  import { Notion, fetchNotion } from "@leveluptuts/svelte-notion";
  export let feedItem;

  // const fetchNotionImage = (async () => {
  //   const splits = feedItem.url.split('-');

  //   let pageId = splits[splits.length - 1];
  //   return await fetchNotion({ id: pageId, context: this })
  // })();

  let isLoadingError = false;

  let isLoading = true;
  
  const load = async () => {
    if (feedItem.source === 'twitter' && !feedItem.previewUrl) {
      const twitterData = await get(`https://igor.npkn.net/452788/?url=${feedItem.url}`);
      setTimeout(() => {
        feedItem.embedHtml = twitterData.html;
      }, 0);
    } else if (feedItem.source === 'tiktok' && !feedItem.previewUrl) {
      const tiktokData = await get(`https://igor.npkn.net/embed-tiktok?url=${feedItem.url}`);
      feedItem.embedHtml = tiktokData.html;
    }

    isLoading = false;
  }

  load();

</script>

{#if isLoading}
  <Loader />
{:else}
  <div>
    <div class="_moment">
      <div class="p-4 md:p-8">
        <div class="flex justify-between">
          <div>
            {#if feedItem.title}
              <h1>{feedItem.title}</h1>
            {/if}
          </div>

          <div class="shrink-0">
            <!-- {#if feedItem.source !== 'momentum'}
              <a href="{feedItem.url}" target="_blank">
                <button>Open Link</button>
              </a>
            {/if} -->
          </div>

        </div>

        {#if feedItem.content}
        <div class="whitespace-pre-wrap mt-4">
          {feedItem.content}
        </div>
        {/if}
      </div>

      {#if feedItem.source !== 'momentum'}
        <div class="pl-8 mb-4">
          <a class="text-sm" href="{feedItem.url}" target="_blank">
            See Original Link
          </a>
        </div>
      {/if}

      {#if feedItem.source === 'momentum' || !feedItem.source }
        {#if feedItem.attachments}
          {#each feedItem.attachments as attachment}
            <div>
              {#if attachment.url.includes('.mov') || attachment.url.includes('.mp4')}
                <video src={attachment.url} controls autoplay class="w-full" />
              {:else}
                <img src="{attachment.url}" class="w-full"/>
              {/if}
            </div>
          {/each}
        {/if}
      {/if}
    </div>
    {#if feedItem.source === 'momentum'}
    {:else if feedItem.source === 'notion'}
      <!-- {#await fetchNotionImage}
        <p>...waiting</p>
      {:then blocks}
        <Notion {blocks} />
      {:catch error}
        <p>An error occurred!</p>
      {/await} -->
    {:else if feedItem.source === 'youtube'}
    <iframe
      class="w-full min-h-[600px] mt-2"
      src="https://www.youtube.com/embed/{new URL(feedItem.url).searchParams.get('v')}?autoplay=1" 
      title="YouTube video player" frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
    {:else if feedItem.embedHtml}
      {@html feedItem.embedHtml}
        <!-- <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> -->
      <!-- <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Sunsets don&#39;t get much better than this one over <a href="https://twitter.com/GrandTetonNPS?ref_src=twsrc%5Etfw">@GrandTetonNPS</a>. <a href="https://twitter.com/hashtag/nature?src=hash&amp;ref_src=twsrc%5Etfw">#nature</a> <a href="https://twitter.com/hashtag/sunset?src=hash&amp;ref_src=twsrc%5Etfw">#sunset</a> <a href="http://t.co/YuKy2rcjyU">pic.twitter.com/YuKy2rcjyU</a></p>&mdash; US Department of the Interior (@Interior) <a href="https://twitter.com/Interior/status/463440424141459456?ref_src=twsrc%5Etfw">May 5, 2014</a></blockquote>  -->
    {:else if feedItem.source === 'loom'}
      <iframe style="width: 100%; min-height: 600px" src={feedItem.url.replace('share/', 'embed/')} />
    {:else if !isLoadingError && feedItem.url && !feedItem.url.includes('.mp4') && !feedItem.url.includes('.mov')}
      <iframe 
        style="width: 100%; min-height: 600px"
        src={feedItem.embedUrl || feedItem.url} 
        on:load={(evt) => { debugger; }}
        on:error={() => { debugger; } }
      />
    {:else if isLoadingError}
      <button>Open Link</button>
    {/if}

    {#if feedItem.projects?.length}
      <div class="justify-center mb-8 md:mt-16 flex md:flex-row items-center md:items-start flex-col">
        {#each feedItem.projects as project}
          {#if !$allProjects.find(p => p._id === project._id)?.isHub}
            <div class="max-w-[300px] mr-8">
              <StreamCard stream={$allProjects.find(p => p._id === project._id)} />
            </div>
          {/if}
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  ._moment {
    font-size: 20px;
  }

  ._moment h1 {
    font-size: 32px;
  }
</style>
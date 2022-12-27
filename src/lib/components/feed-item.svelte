<script>
  import { onMount } from 'svelte';
  import { format as formatDate } from 'date-fns'

  export let feedItem = {
	}

  let videoEl;

  onMount(() => {
    if (videoEl) {
      videoEl.play();
    }
  });

let project;

 $: if(feedItem && feedItem.projects && feedItem.projects.length > 0) {
   project = feedItem.projects[0];
 }
</script>

<a class="_item mb-8 inline-block w-full relative"
  class:_release="{feedItem.isRelease}"
  href="{feedItem.url}" 
  target="_blank"
>
  <div class="mb-4">
    {#if feedItem.title}
      <div class="font-bold" href="{feedItem.url}">{feedItem.title}</div>
      <hr class="my-4 opacity-20"/>
    {/if}
    {#if feedItem.content}
      <div class="whitespace-pre-wrap">
        {feedItem.content}
      </div>
    {/if}
    {#if ['youtube', 'shipitsipit'].includes(feedItem.source)}
      <iframe
        class="w-full min-h-[300px] pointer-events-none"
        src="https://www.youtube.com/embed/{new URL(feedItem.url).searchParams.get('v')}" 
        title="YouTube video player" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
      </iframe>
    {/if}
    {#if !(['twitter', 'youtube'].includes(feedItem.source))}
    <div class="flex justify-between opacity-50">
    <div>...</div>
    <div class="text-right">...see more</div>
    </div>
    {/if}

    {#if feedItem.attachments}
      <div class="mt-2">
        {#each feedItem.attachments as attachment}
          {#if attachment.type === 'image'}
            <img src={attachment.url} class="w-full" />
          {/if}
          {#if attachment.type === 'video'}
          
          <video width="320" height="240" muted loop bind:this={videoEl}>
            <source id="mp4video" src="{attachment.url}" type="video/mp4" />
          </video>
          {/if}
        {/each}
      </div>
    {/if}

    <div class="mt-4 flex items-center justify-between">
      <div class="text-sm py-2 opacity-80">
        {formatDate(new Date(feedItem.createdOn), 'MMM dd')}
      </div>
       {#if feedItem.source === 'twitter'}
        <div class="font-bold w-[20px]">
          <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 248 204"><script xmlns=""/>
            <path fill="#1d9bf0" d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"/>
          </svg>
        </div>
        {/if}
        {#if feedItem.source === 'linkedin'}
          <div>
            <svg class="w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" version="1.1" id="Capa_1" width="800px" height="800px" viewBox="0 0 490.732 490.732" xml:space="preserve">
              <g style="fill: white;">
                <g>
                  <path d="M472.366,0.003H18.36C8.219,0.003,0,8.222,0,18.363v454.005c0,10.143,8.219,18.361,18.36,18.361h454.012    c10.142,0,18.36-8.219,18.36-18.361V18.363C490.727,8.222,482.507,0.003,472.366,0.003z M130.375,403.808    c0,6.762-5.478,12.238-12.24,12.238H69.132c-6.756,0-12.24-5.477-12.24-12.238V189.625c0-6.763,5.484-12.24,12.24-12.24h49.003    c6.762,0,12.24,5.477,12.24,12.24V403.808z M130.375,127.482c0,6.763-5.478,12.24-12.24,12.24H69.132    c-6.756,0-12.24-5.478-12.24-12.24V83.969c0-6.763,5.484-12.24,12.24-12.24h49.003c6.762,0,12.24,5.477,12.24,12.24V127.482z     M433.835,403.808c0,6.762-5.483,12.238-12.24,12.238h-49.003c-6.763,0-12.24-5.477-12.24-12.238v-90.436    c0-29.988-1.566-49.383-4.712-58.189c-3.14-8.807-8.237-15.649-15.3-20.526c-7.062-4.884-15.558-7.32-25.496-7.32    c-12.729,0-24.149,3.488-34.26,10.459c-10.11,6.977-17.038,16.211-20.79,27.717c-3.745,11.506-5.618,32.779-5.618,63.807v74.488    c0,6.762-5.483,12.238-12.24,12.238h-49.003c-6.756,0-12.24-5.477-12.24-12.238V189.625c0-6.763,5.483-12.24,12.24-12.24h43.771    c6.763,0,12.24,5.477,12.24,12.24v16.316c0,6.763,3.312,7.852,7.858,2.852c22.864-25.123,50.753-37.687,83.673-37.687    c16.212,0,31.028,2.919,44.455,8.758c13.422,5.838,23.58,13.292,30.466,22.356c6.885,9.063,11.683,19.351,14.382,30.857    c2.699,11.505,4.058,27.98,4.058,49.426V403.808L433.835,403.808z"/>
                </g>
              </g>
            </svg>
          </div>
       {/if}
       {#if feedItem.isRelease}
          <div>
            🔥
          </div>
       {/if}
    </div>
    

  </div>
  
  

  <hr class="my-4 opacity-20"/>
  
  <div class="flex justify-between items-center">
    <div class="flex items-center">
      {#if feedItem?.creators}
        {#each feedItem.creators as creator}
        <img src="{creator.avatarUrl}" class="rounded-full max-w-[40px]" /> 
        
        {/each}

        <div class="ml-2 mr-2 text-sm">
          {feedItem.creators.map(c=> c.username).join(', ')}
        </div>
      {/if}
    </div>

    
    <div class="shrink-0">
      {#if project}
        {#if project.name === 'therebel'}
          <span class="text-[#f87316] font-bold">THE</span>✊🏽<span class="text-[#f59e0c] font-bold">REBEL</span>
        {/if}
        {#if project.name === 'rnd'}
          <span class="text-[#f59e0c] font-bold">R🐝D</span>
        {/if}
        {#if project.name === 'growingproducts'}
          <div style="color: white; padding: 4px 12px; border-radius: 4px; border: 1px #53bf00 solid;">
            Growing 🌱 Products
          </div>
        {/if}
        {#if project.name === 'shipitsipit'}
          <div style="color: white; padding: 4px 12px; border-radius: 4px; border: 1px #d090ff solid;">
            Ship it 🍸 Sip It
          </div>
        {/if}
        {#if project.name === 'altos'}
          <div style="color: white; padding: 4px 12px; border-radius: 4px; border: 1px #fff291 solid;">
            Altos 📸
          </div>
        {/if}
        {#if project.name === 'igor'}
          <div class="flex items-center" style="color: white; padding: 4px 12px; border-radius: 4px; border: 1px #75c425 solid;">
            <img src="/igor-favicon.png" class="mr-2" style="width: 20px; border-radius: 50%; display: inline;"/> Igor
          </div>
        {/if}
      {/if}
    </div>
  </div>
</a>

<style>
  ._item {
    cursor: pointer;
    transition: all 0.08s linear;
    outline: 2px rgba(255,255,255, .1) solid;
    border-radius: 15px;
    padding: 16px;
    z-index: 1000;
  }

  ._item._release {
    outline-color: #d87712 !important;
    outline-width: 1px;
  }

  ._item._release:hover {
  }

  ._item:hover {
    transform: scale(1.05);
    background: rgba(255,255,255, 0.03);
    outline: 1px rgba(255,255,255, .3) solid;
  }
</style>
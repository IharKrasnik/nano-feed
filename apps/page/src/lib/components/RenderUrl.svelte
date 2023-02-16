<script>
  export let url;
  export let imgClass = '';

  let isUrl = () => {
    return url.startsWith('http');
  }

  const clazz = '';
  export { clazz as class };
</script>

{#if url}

  {#if isUrl()}
    <div class="w-full {clazz}">
      {#if url.includes('loom.com')}
        <iframe
          style="width: 100%; aspect-ratio: 536/300;"
          src={url.replace('share/', 'embed/')}
        />  
      {:else}
        {#if url.includes('.mp4') || url.includes('mov')}
          <video class="max-w-[600px] mx-auto {imgClass}" autoplay muted loop src={url}></video>
        {:else}
          <img class="rounded-xl {imgClass}" src="{url}" />
        {/if}
      {/if}
    </div>
  {:else}
    <div class="w-full h-full flex items-center justify-center" style="font-size: 70px">
      {url}
    </div>
  {/if}
{/if}
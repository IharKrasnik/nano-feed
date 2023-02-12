<script>
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { STREAM_URL, PAGE_URL } from 'lib/env';
  import { get } from 'lib/api';
  import iframeResize from 'iframe-resizer/js/iframeResizer';

  import SitePreview from '$lib/components/site-preview.svelte';

  let slug;

  let currentPage;

  if (browser) {
    slug = $page.params.slug;

    get(`pages/${slug}`)
      .then(page => {
        currentPage = page;
      });
  }

  let resize = () => {
    iframeResize({ log: true }, '#iframeResize');
  }
</script>

  <svelte:head>
    {#if currentPage}
      <title>{currentPage.name}</title>
      <meta name="description" content="{currentPage.title} {currentPage.subtitle}" />
      <meta name="og:description" content="{currentPage.title} {currentPage.subtitle}" />
      <meta name="image" content="{PAGE_URL}/og.png?pageSlug={currentPage.slug}" />
      <meta name="og:image" content="{PAGE_URL}/og.png?pageSlug={currentPage.slug}" />
    {/if}
  </svelte:head>

{#if currentPage}


  <SitePreview
    bind:page={currentPage}
  >
  </SitePreview>

  <div class=" mt-[-50px]">
    <h1 class="w-full text-center font-bold text-2xl opacity-80" style="font-family: Archivo;">⬇ We Build In Public</h1>
    <iframe id="iframeResize" on:load={resize} class="w-full" src="{STREAM_URL}/{currentPage.slug}/embed?theme=light"></iframe>
  </div>
{/if}

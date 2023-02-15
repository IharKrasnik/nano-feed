<script>
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { STREAM_URL, PAGE_URL } from 'lib/env';
  import { get } from 'lib/api';
  import iframeResize from 'iframe-resizer/js/iframeResizer';

  import SitePreview from '$lib/components/site-preview.svelte';

  let slug;

  let currentPage = $page.data.page;

  if (browser) {
    window.WAVE_SESSION_KEY = $page.params.slug;
    slug = $page.params.slug;
  }

  let resize = () => {
    iframeResize({ log: true }, '#iframeResize');
  }
</script>


{#if currentPage}
  <SitePreview
    bind:page={currentPage}
  >
  </SitePreview>

  <div class=" mt-[-50px]">
    <h1 class="w-full text-center font-bold text-2xl opacity-70" style="font-family: Inter;">We Build In Public</h1>
    <h1 class="w-full text-center text-lg opacity-70" style="font-family: Inter;">Follow our journey in social network and blogs.</h1>
    <iframe id="iframeResize" on:load={resize} class="w-full" src="{STREAM_URL}/{currentPage.slug}/embed?theme=light"></iframe>
  </div>
{/if}

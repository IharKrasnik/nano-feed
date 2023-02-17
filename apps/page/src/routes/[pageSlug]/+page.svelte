<script>
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { get } from 'lib/api';

  import SitePreview from '$lib/components/site-preview.svelte';

  let slug;

  let currentPage = $page.data.page;

  if (browser) {
    window.WAVE_SESSION_KEY = $page.params.pageSlug;
    slug = $page.params.pageSlug;
  }


</script>


{#if page}
  <SitePreview
    bind:page={currentPage}
  >
  </SitePreview>
{/if}

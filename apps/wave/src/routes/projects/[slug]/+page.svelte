<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';

  if (browser) {
    goto(`/p/${$page.params.slug}`)
  }
</script>
<script>
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';

  import Loader from 'lib/components/Loader.svelte';
  import { GOOGLE_LOGIN_URL } from 'lib/env';
  import currentUser from 'lib/stores/currentUser';
  import allProjects from '$lib/stores/allProjects';

  if (browser && !$currentUser) {
    goto(GOOGLE_LOGIN_URL);
  }

  $: if ($allProjects) {
    if ($allProjects.length) {
      goto(`/projects/${$allProjects[0].slug}`);
    } else {
      goto(`/new`);
    }
  }
</script>

<Loader></Loader>
<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import Loader from 'lib/components/Loader.svelte';

  export let threshold = 0;
  export let horizontal = false;
  export let elementScroll;
  export let hasMore = true;

  const dispatch = createEventDispatcher();
  export let onLoadMore;
  let isLoadMore = false;
  let component;
  let element;

  $: {
    if (component || elementScroll) {
      if (elementScroll) {
        if (elementScroll === 'body') {
          element = document;
        } else {
          element = component.parentNode;
        }

        element.addEventListener('scroll', onScroll);
        element.addEventListener('resize', onScroll);
      }
    }
  }

  let isLoading = false;

  const onScroll = async e => {
    if (!isLoading) {
      const element = e.target.scrollingElement;

      const offset = horizontal
        ? element.scrollWidth - element.clientWidth - element.scrollLeft
        : element.scrollHeight - element.clientHeight - element.scrollTop;

      if (offset <= threshold) {
        if (!isLoadMore && hasMore) {
          try {
            isLoading = true;
            await onLoadMore();
          } finally {
            isLoading = false;
          }
        }

        isLoadMore = true;
      } else {
        isLoadMore = false;
      }
    }
  };

  onDestroy(() => {
    if (element) {
      element.removeEventListener('scroll', null);
      element.removeEventListener('resize', null);
    }
  });
</script>

<div bind:this={component}>
  {#if isLoading}
    <div class="w-full flex justify-center">
      <Loader />
    </div>
  {/if}
</div>
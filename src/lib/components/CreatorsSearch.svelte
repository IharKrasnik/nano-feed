<script>
	import creators from '$lib/stores/creators';
  import { fly } from 'svelte/transition';

  import { onMount } from 'svelte';

  export let onSelect = null;
  export let showOnFocus = false;
  
  let showCreators = !showOnFocus;

  let inputEl;

  let search = '';

  onMount(() => {
    if (!showOnFocus) {
      setTimeout(() => {
        inputEl.focus();
      }, 500);
    }
  });

  const onFocus = () => {
    if (showOnFocus) {
      showCreators = true;
    }
  };

  const onBlur = (e) => {
    debugger;
    if (showOnFocus) {
      showCreators = false;
    }
  };

  const refresh = () => {

  };
</script>

<div class="relative">
  <input 
    class="_input w-full mb-4 mt-2" 
    placeholder="Search..." 
    on:focus={onFocus}
    on:blur={onBlur}
    bind:value={search} 
    on:updated={refresh} 
    bind:this={inputEl}
  />

  {#if $creators.length > 0 && showCreators}
  <div class="absolute w-full bg-black mt-4" style="z-index: 1000;" in:fly={{  y: 50, duration: 150, delay: 150 }}>
    {#each $creators.filter(c=> search ? c.username.includes(search ): true) as creator}
    
    <!-- <a
      on:click={() => onSelect(creator)} 
      href="/creators/{creator.username}"
      class="_item flex items-center p-4"
      style="border-bottom: 1px rgba(255, 255, 255, .3) solid;"
    > -->
    <a
      on:click={() => { debugger; onSelect(creator) }} 
      class="_item flex items-center p-4"
      style="border-bottom: 1px rgba(255, 255, 255, .3) solid;"
    >
      <img src={creator.avatarUrl} class="w-[40px] h-[40px] rounded-full mr-2"/>
      <div class="ml-2 text-lg">
        {creator.name}
      </div>
    </a>
    
    {/each}
  </div>
  {/if}
</div>

<style>
  ._input {
    background: none;
    padding: 16px;
    border: 1px rgba(255, 255, 255, .3) solid;
  }

  ._item {
		cursor: pointer;
		transition: all linear 0.1s;
	}

	._item:hover {
		background: rgba(255, 255, 255, .1);
		border-bottom: 1px rgba(255, 255, 255, 0.3) solid;
		margin-bottom: -1px;
	}

	._item._selected {
		border-bottom: 1px solid;
		margin-bottom: -1px;
	}
</style>
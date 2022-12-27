<script>
	import creators from '$lib/stores/creators';
  import { fly } from 'svelte/transition';

  import { onMount } from 'svelte';

  let inputEl;
  let search = '';

  onMount(() => {
    setTimeout(() => {
      inputEl.focus();
    }, 500);
  });

  const refresh = () => {

  };
</script>

<h1 class="text-lg font-bold"> Creators </h1>

<input class="_input w-full mb-4 mt-2" 
  bind:value={search} 
  on:updated={refresh} 
  placeholder="Search..." 
  bind:this={inputEl}
/>


{#if $creators.length > 0}
<div class="mt-4" in:fly={{  y: 50, duration: 150, delay: 150 }}>
  {#each $creators.filter(c=> search ? c.username.toLowerCase().includes(search ): true) as creator}
  <a href="/creators/{creator.username}" class="_item flex items-center p-4" style="border-bottom: 1px rgba(255, 255, 255, .3) solid;">
    <img src={creator.avatarUrl} class="w-[40px] h-[40px] rounded-full mr-2"/>
    <div class="ml-2 text-lg">
      {creator.username}
    </div>
  </a>
  {/each}
</div>
{/if}

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
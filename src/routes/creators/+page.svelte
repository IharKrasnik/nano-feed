<script>
	import AutoCompleteInput from '$lib/components/AutoCompleteInput.svelte';
  import creators from '$lib/stores/creators'; 

</script>

<div class="mb-8">
  <label>Creators</label>

  {#if $creators.length}
    <AutoCompleteInput
      searchField="fullName"
      placeholder="Search creators.."
      limitItemsCount={0}
      isMulti
      isAlwaysShown
      allSuggestions={$creators.map(c => ({ ...c, href: `/creators/${c.username}`}))}
      autofocus
      class="mb-4"
    >
      <div slot="item" let:item={item}>
        <div class="flex items-center">
          <img src={item.avatarUrl} class="w-[40px] h-[40px] mr-2 rounded-full"/>
          {item.fullName}
        </div>
      </div>
    </AutoCompleteInput>
  {/if}
</div>


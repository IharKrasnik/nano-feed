<script>
	import AutoCompleteInput from '$lib/components/AutoCompleteInput.svelte';
  import projects from '$lib/stores/projects'; 
  import creators, { update as updateCreators, filterQuery as creatorsFilterQuery } from '$lib/stores/creators'; 

  let selectedProject = null;

  $: if ($creatorsFilterQuery?.projectSlug && $projects.length) {
    selectedProject = $projects.find(c => c.slug === $creatorsFilterQuery?.projectSlug);
  }

  let onProjectSelected = async (newProject) => {
    selectedProject = newProject;
    await updateCreators({ projectSlug: selectedProject?.slug });
  }
</script>

<h2 class="mb-4">Momentum Creators</h2>

{#if $projects.length}
  <div class="mb-8">
    <label>Stream</label>

    <AutoCompleteInput
      onChange={onProjectSelected}
      placeholder="All Streams"
      valueField="slug"
      searchField="title"
      autofocusOnRemove={false}
      allSuggestions={$projects}
      initialSelectedItem={selectedProject}
    >
      <!-- <div slot="item" let:item={item}>
        hey {item.label}
      </div> -->
    </AutoCompleteInput>
  </div>
{/if}

<div class="mb-8">
  <label>Creators</label>

  {#if $creators.length}
    {#key selectedProject?.slug}
    <AutoCompleteInput
      searchField="fullName"
      placeholder="Search creators.."
      limitItemsCount={0}
      isMulti
      isAlwaysShown={false}
      allSuggestions={$creators.map(c => ({ ...c, href: `/@${c.username}`}))}
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
    
    {/key}
  {/if}

   
</div>


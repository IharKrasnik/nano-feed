<script>
  import dayjs from 'dayjs'
  import axios from 'axios';

  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition'; 
  import { page } from '$app/stores';
  import { get, post, put, del, postFile } from '$lib/api';
  import { API_URL } from '$lib/env';
  import autofocus from '$lib/use/autofocus';

  import AutoCompleteInput from '$lib/components/AutoCompleteInput.svelte';
  import FeedItem from '$lib/components/FeedItem.svelte';
  import Loader from '$lib/components/Loader.svelte';
  
  import sources from '$lib/stores/sources';
  import currentUser from '$lib/stores/currentUser';
  import { browser } from '$app/environment';

  let project;

  let loadProject =  async () => {
    project = await get(`projects/${$page.params.username}`);
  }

  if (!project) {
    loadProject()
  }


</script>

{#if $currentUser}
  {#if project}
    <h2 class="mb-2">Edit #{project.title}</h2>
  {:else}
    <h2 class="mb-2">Edit Stream</h2>
  {/if}
<!-- 
  <h3 class="mb-4">
    Moments are tiny yet important actions that you do daily. <br /> <br/>
    What you've created today?
  </h3> -->

  <!-- </div> -->

  {#if !project}
    <Loader />
  {:else}
    <form class="mb-16 mt-8" style="padding: 2px;">
      <div class="mb-8">
        <label> Tagline  </label>
        <input type="text" class="block" bind:value={project.description} />
      </div>

      <div class="mb-8">
        <label> Description  </label>
        <textarea type="text" rows="3" class="block" bind:value={project.longDescription}></textarea>
      </div>

     <div class="mb-8">
        <label>Attachments</label>

        {#if project.bannerUrl}
          <img class="max-w-[400px]" src={project.bannerUrl} />
        {:else}
            <input type="text" bind:value={attachmentUrl} placeholder="Insert URL or paste from clipboard" on:paste={pasteImage}/>

            {#if !feedItem.attachments.length && !attachmentUrl}
              <div class="my-4">Or</div>
              <input id="fileInput" type="file" on:change={onFileUpload}>
              {:else}
              <button class="mt-4" on:click={addAttachmentUrl}>
                Add URL
              </button>
            {/if}
        {/if}
      </div>

      <!-- {#if feedItem.url || currentPage === 'update'}
        <div class="mb-8">
          <label> Title </label>
          <input type="text" class="block" bind:value={feedItem.title} use:autofocus/>
        </div>
        <div class="mb-8">
          <label> Content </label>
          <textarea rows="5" class="block" bind:value={feedItem.content} />
        </div>

        <div class="mb-8">
          <label>Attachments</label>

          {#if feedItem.attachments.length}
            {#each feedItem.attachments as attachment}
              <div on:click={removeAttachments}>
                {#if attachment.type === 'video'  }
                  <video class="max-w-[400px]" src={attachment.url} muted autoplay/>
                {:else}
                  <img class="max-w-[400px]" src={attachment.url} />
                {/if}
              </div>
            {/each}
          {:else}
            {#if addAttachmentClicked}
              <input type="text" bind:value={attachmentUrl} placeholder="Insert URL or paste from clipboard" use:autofocus on:paste={pasteImage}/>

              {#if !feedItem.attachments.length && !attachmentUrl}
                <div class="my-4">Or</div>
                <input id="fileInput" type="file" on:change={onFileUpload}>
                {:else}
                <button class="mt-4" on:click={addAttachmentUrl}>
                  Add URL
                </button>
              {/if}

            {:else}
              <a class="cursor-pointer text-gray-400 underline" on:click={() => { addAttachmentClicked = true; }}> Add attachment </a>
            {/if}
          {/if}
        </div>

        {#if currentPage !== 'update'}
          <div class="mb-8">
            <label>Source</label>
            
            <AutoCompleteInput
              onChange={onSourceSelected}
              placeholder="Select source.."
              limitItemsCount={20}
              allSuggestions={$sources.filter(s => s.value)}
              initialSelectedItem={ feedItem.source ? { value: feedItem.source } : null }
            >
            </AutoCompleteInput>
          </div>
        {/if}

        {#if projects}
          <div class="mb-8">
            <label>Streams</label>
            <AutoCompleteInput
              onChange={onProjectsSelected}
              placeholder="Search Streams"
              valueField="slug"
              searchField="title"
              isMulti
              allSuggestions={projects.filter(s => s.slug)}
              initialSelectedItems={feedItem.projects}
            >
            </AutoCompleteInput>
          </div>
        {/if}

        
        {#if currentPage !== 'update'}
        <div class="mb-8">
          <label>Published On</label>

          <input type="datetime-local" bind:value="{internalDate}">
        </div>
        {/if}

        {#if $currentUser?.isAdmin && creators}
          <div class="mb-8">
            <label>Creators</label>

            <AutoCompleteInput
              onChange={onCreatorSelected}
              searchField="fullName"
              placeholder="Search creators.."
              limitItemsCount={5}
              isMulti
              bind:allSuggestions={creators}
              initialSelectedItems={feedItem.creators}
            >
              <div slot="item" let:item={item}>
                <div class="flex items-center">
                  <img src={item.avatarUrl} class="w-[40px] h-[40px] mr-2 rounded-full"/>
                  {item.fullName}
                </div>
              </div>
            </AutoCompleteInput>
          </div>
        {/if}


        <button class="p-4 mt-8" type="submit" on:click={postToFeed}>
          {feedId ? 'Update' : 'Publish'} Moment
        </button>

        {#if feedId}
        <button class="danger ml-8 p-4 mt-8" type="submit" on:click={deleteFeed}>
          Delete Moment
        </button>
        {/if}
      {/if} -->
    </form>
  {/if}

  {#if project }
    <div class="hidden md:flex" 
      style="
      position: fixed;
      right: 150px;
      top: 0;
      width: 400px;
      height: 100vh;
      flex-direction: column;
      justify-content: center;">
      <h3 class="mb-4">Moment Preview</h3>
    </div>
  {/if}
{/if}

<style>
  
</style>
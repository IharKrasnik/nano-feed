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
  import StreamCard from '$lib/components/StreamCard.svelte';
  import FileInput from '$lib/components/FileInput.svelte';
  
  import sources from '$lib/stores/sources';
  import currentUser from '$lib/stores/currentUser';
  import { browser } from '$app/environment';

  let project;
  let creator;

  let username;

  let load =  async () => {
    if ($page.params.username.startsWith('@')) {
      username = $page.params.username.replace('@', '');
      creator = await get(`creators/${username}`);

      stream = {
        title: creator.fullName,
        description: creator.description,
        longDescription: creator.longDescription,
        bannerUrl: creator.bannerUrl,
        url: creator.url,
      }
    } else {
      project = await get(`projects/${$page.params.username}`);

      stream = {
        title: project.title,
        description: project.description,
        longDescription: project.longDescription,
        bannerUrl: project.bannerUrl,
        url: project.url,
      }
    } 
  }

  if (!project) {
    load()
  }

  let stream;

  let updateStream = async () => {
    if (!creator) {
      await put(`projects/${project._id}`, stream);
      goto(`/${project.slug}`);
    } else {


      await put(`creators/${creator._id}`, {
        ...stream,
        fullName: stream.title,
      });
      goto(`/@${creator.username}`);
    }
  }

  let fileUploaded = ( (evt) => {
    let { url } = evt.detail;
    stream.bannerUrl = url;
  });

</script>

<svelte:head>
  <title>Edit {stream?.title || ''} — Momentum</title>
</svelte:head>

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

  {#if !stream}
    <Loader />
  {:else}
    <form class="mb-16 mt-8" style="padding: 2px;">
      <div class="mb-8">
        <label> Tagline  </label>
        <input type="text" class="block" bind:value={stream.description} />
      </div>

      <div class="mb-8">
        <label> Description  </label>
        <textarea type="text" rows="3" class="block" bind:value={stream.longDescription}></textarea>
      </div>

      <div class="mb-8">
        <label> Url  </label>
        <input type="text" class="block" bind:value={stream.url} />
      </div>

      <div class="mb-8">
        <label>Banner </label>
        
        <FileInput bind:url={stream.bannerUrl} on:fileUploaded={fileUploaded} />
      </div>

      <button class="p-4 mt-8" type="submit" on:click="{updateStream}">
        Update Stream
      </button>
    </form>
  {/if}

  {#if project || creator}
    <div class="hidden md:flex" 
      style="
      position: fixed;
      right: 150px;
      top: 0;
      width: 400px;
      height: 100vh;
      flex-direction: column;
      justify-content: center;">
      <!-- <h3 class="mb-4">Stream Preview</h3> -->

      {#if stream}
        <h1> {stream.title} </h1>
        <h3> {stream.description || 'No Tagline'} </h3>
      {/if}
      <div class="mt-4">
        <StreamCard {stream} />
      </div>
    </div>
  {/if}
{/if}

<style>
  
</style>
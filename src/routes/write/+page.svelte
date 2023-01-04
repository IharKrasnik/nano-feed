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

  let projects;
	let isProjectsLoading = false;
  let creators;
  let urlIsDirty = false;

	const fetchProjects = async () => {
		isProjectsLoading = true;
		
		try {
			const { results } = await get('projects');
			projects = results;
		} finally {
			isProjectsLoading = false;
		}
	};

  fetchProjects();

  const fetchCreators = async () => {
		const { results } = await get('creators');
    creators = results;
  }

  fetchCreators();

  let url;
  let attachmentUrl;
  let files = [];
  let addAttachmentClicked = false;

  let startTitle = $page.url.searchParams.get('title');

  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  let urlIsLoading = false;

  const addUrl = async () => {
    urlIsLoading = true;

    try {
      const { data } = await axios({
        url: 'https://igor.npkn.net/fetch-meta-tags',
        params: { url, }
      });

      feedItem.url = url;

      if (feedItem.url) {
        if (feedItem.url.includes('linkedin.com')) {
          feedItem.source = 'linkedin';
        } else if (feedItem.url.includes('twitter.com')) {
          feedItem.source = 'twitter';
        } else if (feedItem.url.includes('indiehackers')) {
          feedItem.source = 'indiehackers';
        } else if (feedItem.url.includes('youtube.com')) {
          feedItem.source = 'youtube';
        } else if (feedItem.url.includes('dribbble.com')) {
          feedItem.source = 'dribbble';
        }
      }

      feedItem.title = data.title;
      feedItem.content = data.description;

      if (data.image) {
        feedItem.attachments = [{ type: 'image', url: data.image}];
      }

      if (data.creatorUsernames) {
        feedItem.creators = data.creatorUsernames.map(username => creators.find(c => c.username === username));
      }

      if (data.projectSlugs) {
        feedItem.projects = data.projectSlugs.map(projectSlug => projects.find(c => c.slug === projectSlug));
      }
    } finally {
      urlIsLoading = false;
    }
  }

  if (isValidHttpUrl(startTitle)) {
    url = startTitle;
  }

  onMount(() => {
    if (url) {
      addUrl();
    }
  });

  let feedItem = {
    publishedOn: new Date(),
    creators: [$currentUser],
    title: (!url && startTitle) || '',
    content: '',
    url,
    source: null,
    attachments: [],
  };

  let currentPage;

  const setPage = page => {
    if (page === 'update') {
      feedItem.source = 'momentum';
    }

    currentPage = page;
  } 

  let feedId = $page.url.searchParams.get('feedId');

  $: if ($currentUser && !feedId) {
    if (url) {
      setPage('url')
    } else {
      setPage('update')
    }
  }

  if (feedId) {
    get(`feed/${$page.url.searchParams.get('feedId')}`).then(item => { 
      feedItem = item;

      url = feedItem.url;
      
      if (url) {
        setPage('url');
      } else {
        setPage('update')
      }
    });
  }

  let format = 'YYYY-MM-DDTHH:mm';
	
  let internalDate;

  const input = (x) => { internalDate = dayjs(x).format(format) }
  const output = (x) => { feedItem.publishedOn = dayjs(x, format).toDate(); console.log('feedItem.publishedOn', feedItem.publishedOn) }

  $: input(feedItem.publishedOn);
  $: output(internalDate);

  let selectedUsername;

  const setCreator = () => {
    feedItem.creators = [creators.find(c => c.username === selectedUsername)];
  }

  const uploadFile = async file => {
    const newFile = await postFile('files', file);
		files = [...files, newFile];

    if (!(newFile.url.startsWith('http'))) {
      newFile.url = `https://${newFile.url}`;
    }

    feedItem.attachments.push({ type: (newFile.url.includes('.mp4') || newFile.url.includes('.mov')) ? 'video' : 'image' , url: newFile.url });

    feedItem.attachments = [...feedItem.attachments];
  }

	const onFileUpload = async (e) => {
		return uploadFile(e.target.files[0]);
	};

  const addAttachmentUrl = () => {
    feedItem.attachments = [{ type: 'image', url: attachmentUrl }];
  }

  const onCreatorSelected = (selectedCreators) => {
    feedItem.creators = selectedCreators;
  }

  const onSourceSelected = (selectedSource) => {
    feedItem.source = selectedSource?.value;
  }

  const onProjectsSelected = (selectedProjects) => {
    feedItem.projects = selectedProjects;
  }

  const postToFeed = async () => {
    let updatedFeedItem;

    if (feedId) {
      updatedFeedItem = await put(`feed/${feedId}`, feedItem);
    } else {
      updatedFeedItem = await post('feed', feedItem);
    }

    if (updatedFeedItem.projects[0]){
      goto(`/#${updatedFeedItem.projects[0].slug}`);
    } else if (updatedFeedItem.creators[0]) {
      goto(`/@${updatedFeedItem.creators[0].username}`);
    } else {
      goto(`/`);
    }
  }

  const deleteFeed = async () => {
    await del(`feed/${feedId}`);
    goto('/');
  }

  const pasteImage = (e) => {
    Array.from(e.clipboardData.files).forEach(async (file) => {
      if (file.type.startsWith('image/')) {
        uploadFile(file);
      } else if (file.type.startsWith('text/')) {
        // const textarea = document.createElement('textarea');
        // textarea.value = await file.text();
        // document.body.append(textarea);
      }
    });
	};

  const removeAttachments = () => {
    feedItem.attachments = [];
  }
</script>

{#if $currentUser}
  <h2 class="mb-2">Post a Moment</h2>

  <h3 class="mb-4">
    Moments are tiny yet important actions that you do daily. <br /> <br/>
    What you've created today?
  </h3>

  <div class="mb-4" in:fade={{ duration: 100 }}>
    {#if !feedId}
    <button class="tab mb-4" class:selected={currentPage==='update'} on:click={() => setPage('update')}>Write Update</button>
    <button class="tab mb-4" class:selected={currentPage==='url'} on:click={() => setPage('url')}>Submit Url</button>
    {/if}

    {#if currentPage === 'url'}
      <label class="mt-4 mb-4"> URL </label>
      <input type="text" class="block" bind:value={url} use:autofocus on:input={() => urlIsDirty = true} />

      {#if urlIsDirty}
      <button class="mt-4" on:click={addUrl}>Set Url</button>
      {/if}
    {/if}
  </div>

  {#if urlIsLoading}
    <Loader />
  {:else}
    <form class="mb-16" style="padding: 2px;">
      {#if feedItem.url || currentPage === 'update'}
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
              <!-- <div slot="item" let:item={item}>
                hey {item.label}
              </div> -->
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

        <!-- <hr class="my-8" style="border-color: rgba(255, 255, 255, 0.3)"/> -->

        <button class="p-4 mt-8" type="submit" on:click={postToFeed}>
          {feedId ? 'Update' : 'Publish'} Moment
        </button>

        {#if feedId}
        <button class="danger ml-8 p-4 mt-8" type="submit" on:click={deleteFeed}>
          Delete Moment
        </button>
        {/if}
      {/if}
    </form>
  {/if}

  {#if feedItem }
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
      <FeedItem bind:feedItem />
    </div>
  {/if}
{/if}

<style>
  
</style>
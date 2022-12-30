<script>
  import axios from 'axios';
  import { format as formatDate } from 'date-fns'

  import { goto } from '$app/navigation';
  
  import { get, postFile } from '$lib/api';
  import autofocus from '$lib/use/autofocus';

  import AutoCompleteInput from '$lib/components/AutoCompleteInput.svelte';
  import FeedItem from '$lib/components/FeedItem.svelte';
  
  import sources from '$lib/stores/sources';
  import creators from '$lib/stores/creators';
  import projects from '$lib/stores/projects';
  import currentUser from '$lib/stores/currentUser';

  let currentCreator;

  $: currentCreator = ($currentUser ? $creators.find(c => c.username === $currentUser.username) : null);
  
  import CreatorsSearch from '$lib/components/CreatorsSearch.svelte';

  let url;
  let attachmentUrl;
  let files = [];
  let addAttachmentClicked = false;

  let feedItem = {
    createdOn: formatDate(new Date(), 'yyyy-MM-dd') + 'T' + formatDate(new Date(), 'HH:MM'),

    title: '',
    content: '',
    url: '',
    source: null,
    creators: [],
    attachments: [],
  };

  let selectedUsername;

  const setCreator = () => {
    feedItem.creators = [$creators.find(c => c.username === selectedUsername)];
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
    feedItem.projects = selectedProjects.map(p => ({ name: p.value, id: p.id }));
  }

  const addUrl = async () => {
    const { data } = await axios({
      url: 'https://igor.npkn.net/fetch-meta-tags',
      params: { url, }
    });

    // feedItem.title = data.title;

    feedItem.url = url;
    feedItem.content = data.description;

    // const foundCreator = $creators.find(c => c.username === data.meta.author.toLowerCase().split(' ').join('.'));
    
    // if (foundCreator) {
    //   feedItem.creators = [foundCreator];
    // }

    if (feedItem.url.includes('linkedin.com')) {
      feedItem.source = 'linkedin';
    } else if (feedItem.url.includes('twitter.com')) {
      feedItem.source = 'twitter';
    }

    if (data.image) {
      feedItem.attachments = [{ type: 'image', url: data.image}];
    }
  }

  const postToFeed = async () => {
    const { data } = await axios({
      method: 'post',
      url: 'https://igor.npkn.net/post-feed',
      data: feedItem,
    });

    goto('/');
  }

  let currentPage = 'url';

  const setPage = page => {
    if (page === 'update') {
      feedItem.creators = [currentCreator];
      feedItem.source = 'momentum';
    }
    currentPage = page;
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

<form class="mb-16">
  <div class="mb-4">
    
    <button class="tab mb-4" class:selected={currentPage==='url'} on:click={() => setPage('url')}>Post Url</button>
    <button class="tab mb-4" class:selected={currentPage==='update'} on:click={() => setPage('update')}>Write Update</button>
  
    {#if currentPage === 'url'}
      <label class="mt-4 mb-4"> URL </label>
      <input type="text" class="block" bind:value={url} use:autofocus />

      <button class="mt-4" on:click={addUrl}>Submit Link</button>
    {/if}
  </div>

  {#if feedItem.url || currentPage === 'update'}
    <div class="mb-8">
      <label> Title </label>
      <input type="text" class="block" bind:value={feedItem.title} autofocus/>
    </div>
    <div class="mb-8">
      <label> Description </label>
      <textarea rows="5" class="block" bind:value={feedItem.content} />
    </div>

    {#if currentPage !== 'update'}
    <div class="mb-8">
      <label>Creators</label>

      <AutoCompleteInput
        onChange={onCreatorSelected}
        searchField="name"
        placeholder="Search creators.."
        limitItemsCount={5}
        isMulti
        bind:allSuggestions={$creators}
        initialSelectedItems={feedItem.creators}
      >
        <div slot="item" let:item={item}>
          <div class="flex items-center">
            <img src={item.avatarUrl} class="w-[40px] h-[40px] mr-2 rounded-full"/>
            {item.name}
          </div>
        </div>
      </AutoCompleteInput>
    </div>

    <div class="mb-8">
      <label>Source</label>
      
      <AutoCompleteInput
        onChange={onSourceSelected}
        placeholder="Select source.."
        limitItemsCount={5}
        allSuggestions={$sources.filter(s => s.value)}
        initialSelectedItem={ feedItem.source ? { value: feedItem.source } : null }
      >
      </AutoCompleteInput>
    </div>
    {/if}

    <div class="mb-8">
      <label>Tags</label>
      <AutoCompleteInput
        onChange={onProjectsSelected}
        placeholder="Search Tags"
        isMulti
        allSuggestions={$projects.filter(s => s.value)}
        initialSelectedItems={feedItem.projects}
      >
        <!-- <div slot="item" let:item={item}>
          hey {item.label}
        </div> -->
      </AutoCompleteInput>
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
      <label>Posted On</label>

      <input type="datetime-local" bind:value="{feedItem.createdOn}">
    </div>
    {/if}

    <!-- <hr class="my-8" style="border-color: rgba(255, 255, 255, 0.3)"/> -->


    <button class="p-4 mt-8" type="submit" on:click={postToFeed}>
      Post Update
    </button>
  {/if}
</form>

{#if feedItem.url || feedItem.title || feedItem.content }
  <div style="position: fixed; right: 150px; top: 130px; width: 400px;">
    <FeedItem bind:feedItem />
  </div>
{/if}

<style>
  
</style>
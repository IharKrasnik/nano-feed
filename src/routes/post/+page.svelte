<script>
  import axios from 'axios';
  import { get, postFile } from '$lib/api';
  import AutoCompleteInput from '$lib/components/AutoCompleteInput.svelte';
  import FeedItem from '$lib/components/FeedItem.svelte';
  import sources from '$lib/stores/sources';
  import creators from '$lib/stores/creators';
  import projects from '$lib/stores/projects';
  
  import CreatorsSearch from '$lib/components/CreatorsSearch.svelte';

  let url;
  let attachmentUrl;
  let files = [];

  let feedItem = {
    createdOn: new Date(),

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

	const uploadFile = async (e) => {
		const file = e.target.files[0];
		const newFile = await postFile('files', file);
		files = [...files, newFile];

    feedItem.attachments.push({ type: 'image', url: newFile.url })
    feedItem.attachments = [...feedItem.attachments];
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
    feedItem.projects = selectedProjects.map(p => ({ name: p.value }));
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
</script>

<form class="mb-16">
  <div class="mb-4">
    <label> URL </label>
    <input type="text" class="block" bind:value={url} />
    
    <button class="mt-4" on:click={addUrl}>Add Url</button>
  </div>
  {#if feedItem.url}
    <div class="mb-8">
      <label> Title </label>
      <input type="text" class="block" bind:value={feedItem.title} />
    </div>
    <div class="mb-8">
      <label> Description </label>
      <textarea rows="3" class="block" bind:value={feedItem.content} />
    </div>
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
          <img src={attachment.url} class="max-w-[400px]"/>
        {/each}
      {:else}
      <input type="text" bind:value={attachmentUrl} placeholder="https://image.com/image.jpg"/>

        {#if !feedItem.attachments.length && !attachmentUrl}
          <div class="my-4">Or</div>
          <input id="fileInput" type="file" on:change={uploadFile} />
          {:else}
          <button class="mt-4" on:click={addAttachmentUrl}>
            Add URL
          </button>
          <img src={attachmentUrl} />
        {/if}
      {/if}
    </div>

    <hr class="my-8" style="border-color: rgba(255, 255, 255, 0.3)"/>

    <button class="p-4 mt-8" type="submit">
      Post
    </button>
  {/if}
</form>

{#if feedItem.url}
  <div style="position: fixed; right: 150px; top: 130px; width: 400px;">
    <FeedItem bind:feedItem />
  </div>
{/if}

<style>
  
</style>